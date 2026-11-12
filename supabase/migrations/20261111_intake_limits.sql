begin;
create table public.intake_limits(bucket_key text primary key,hits integer not null,expires_at timestamptz not null);
alter table public.intake_limits enable row level security;
revoke all on public.intake_limits from anon,authenticated;
create or replace function public.consume_intake_limit(key_hash text,max_hits integer,seconds integer)
returns boolean language plpgsql security definer set search_path='' as $$
declare hits_now integer;
begin
 if length(key_hash)<>64 or max_hits not between 1 and 100 or seconds not between 60 and 86400 then raise exception 'Invalid limiter';end if;
 delete from public.intake_limits where expires_at<now();
 insert into public.intake_limits(bucket_key,hits,expires_at) values(key_hash,1,now()+make_interval(secs=>seconds))
 on conflict(bucket_key) do update set hits=public.intake_limits.hits+1
 returning hits into hits_now;
 return hits_now<=max_hits;
end$$;
revoke all on function public.consume_intake_limit(text,integer,integer) from public, anon, authenticated;
grant execute on function public.consume_intake_limit(text,integer,integer) to service_role;
commit;
