-- Apply after schema.sql, before granting staff access. Never grant roles from user_metadata.
begin;
create extension if not exists btree_gist;
create table if not exists public.staff (
 user_id uuid primary key references auth.users(id) on delete cascade,
 role text not null check (role in ('admin','editor','sales')),
 active boolean not null default true,
 require_mfa boolean not null default true
);
alter table public.staff enable row level security;
create policy "Read own staff membership" on public.staff for select to authenticated using (user_id = auth.uid());
create or replace function public.has_staff_role(roles text[])
returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.staff s where s.user_id = auth.uid() and s.active
 and s.role = any(roles) and (not s.require_mfa or auth.jwt()->>'aal' = 'aal2'));
$$;
revoke all on function public.has_staff_role(text[]) from public, anon, authenticated;
grant execute on function public.has_staff_role(text[]) to authenticated;
alter table public.circuits add column if not exists kind text not null default 'circuit' check (kind in ('circuit','day_trip'));
alter table public.circuits add column if not exists archived_at timestamptz;
alter table public.circuits alter column published set default false;
alter table public.circuit_translations add column if not exists duration text not null default '';
alter table public.circuit_translations add column if not exists activities jsonb not null default '[]';
alter table public.circuit_translations add column if not exists included text not null default '';
alter table public.circuit_translations add column if not exists excluded text not null default '';
alter table public.circuit_prices add column if not exists audience text not null default 'public' check (audience in ('public','agency','internal'));
alter table public.circuit_prices add column if not exists valid_from date not null default current_date;
alter table public.circuit_prices add column if not exists valid_until date not null default (current_date + 365);
alter table public.circuit_prices add column if not exists min_guests int not null default 1;
alter table public.circuit_prices add column if not exists max_guests int not null default 500;
alter table public.circuit_prices add column if not exists occupancy text not null default 'double';
alter table public.circuit_prices add column if not exists weekdays int[] not null default array[0,1,2,3,4,5,6];
alter table public.circuit_prices add constraint prices_amount_valid check (amount is null or amount >= 0);
alter table public.circuit_prices add constraint prices_currency_valid check (currency in ('COP','USD','EUR','CHF'));
alter table public.circuit_prices add constraint prices_validity check (valid_until >= valid_from and min_guests > 0 and max_guests >= min_guests and max_guests <= 500);
alter table public.circuit_prices add constraint prices_weekdays check (cardinality(weekdays) > 0 and weekdays <@ array[0,1,2,3,4,5,6]);
create table if not exists public.departures (
 id uuid primary key default gen_random_uuid(),
 circuit_id text not null references public.circuits(id) on delete cascade,
 departure_date date not null,
 capacity int not null check (capacity between 1 and 500),
 available int not null check (available >= 0),
 status text not null default 'scheduled' check (status in ('scheduled','closed','cancelled')),
 check (available <= capacity), unique(circuit_id,departure_date)
);
alter table public.departures enable row level security;
-- Replace every legacy authenticated-all policy, including Storage policies.
do $$ declare t text; p record; begin
 foreach t in array array['circuits','circuit_translations','circuit_media','circuit_prices','departures'] loop
  for p in select policyname from pg_policies where schemaname='public' and tablename=t loop
   execute format('drop policy %I on public.%I',p.policyname,t);
  end loop;
  execute format('create policy staff_catalog on public.%I for all to authenticated using (public.has_staff_role(array[''admin'',''editor''])) with check (public.has_staff_role(array[''admin'',''editor'']))',t);
 end loop;
end $$;
create policy published on public.circuits for select to anon,authenticated using (published and archived_at is null);
create policy published on public.circuit_translations for select to anon,authenticated using (exists(select 1 from public.circuits c where c.id=circuit_id and c.published and c.archived_at is null));
create policy published on public.circuit_media for select to anon,authenticated using (exists(select 1 from public.circuits c where c.id=circuit_id and c.published and c.archived_at is null));
create policy published on public.circuit_prices for select to anon,authenticated using (audience='public' and exists(select 1 from public.circuits c where c.id=circuit_id and c.published and c.archived_at is null));
create policy published on public.departures for select to anon,authenticated using (status='scheduled' and available > 0 and departure_date >= current_date and exists(select 1 from public.circuits c where c.id=circuit_id and c.published and c.archived_at is null));
drop policy if exists "Editors can upload circuit media" on storage.objects;
drop policy if exists "Editors can update circuit media" on storage.objects;
drop policy if exists "Editors can delete circuit media" on storage.objects;
create policy staff_upload on storage.objects for insert to authenticated with check (bucket_id='circuit-media' and public.has_staff_role(array['admin','editor']));
create policy staff_update on storage.objects for update to authenticated using (bucket_id='circuit-media' and public.has_staff_role(array['admin','editor'])) with check (bucket_id='circuit-media' and public.has_staff_role(array['admin','editor']));
create policy staff_delete on storage.objects for delete to authenticated using (bucket_id='circuit-media' and public.has_staff_role(array['admin','editor']));
update storage.buckets set file_size_limit=12582912, allowed_mime_types=array['image/jpeg','image/png','image/webp','image/avif','video/mp4','video/webm'] where id='circuit-media';
-- CRM records are never readable by anonymous visitors or editorial staff.
create table if not exists public.agencies (
 id uuid primary key default gen_random_uuid(), name text not null,
 country text not null default '', language text not null default 'es',
 contact_name text not null default '', email text not null, phone text not null default '',
 agreement text not null default '', created_at timestamptz not null default now()
);
create table if not exists public.opportunities (
 id uuid primary key default gen_random_uuid(),
 agency_id uuid references public.agencies(id), contact_name text not null,
 email text not null, agency_name text not null default '', country text not null default '',
 phone text not null default '', travelers int check(travelers between 1 and 500),
 travel_dates text not null default '', destination text not null default '',
 notes text not null default '', source text not null default 'manual',
 stage text not null default 'new' check(stage in ('new','qualified','preparing','sent','negotiating','won','lost')),
 owner_id uuid references public.staff(user_id), next_task text not null default '',
 due_date date, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.quote_versions (
 id uuid primary key default gen_random_uuid(),
 opportunity_id uuid not null references public.opportunities(id),
 version int not null, currency text not null check(currency in ('COP','USD','EUR','CHF')),
 valid_until date not null, terms text not null, items jsonb not null,
 total numeric(14,2) not null check(total>=0), created_by uuid references auth.users(id),
 created_at timestamptz not null default now(), unique(opportunity_id,version)
);
create table if not exists public.audit_log (
 id bigint generated always as identity primary key, actor uuid,
 table_name text not null, record_id text not null, operation text not null,
 before_data jsonb, after_data jsonb, created_at timestamptz not null default now()
);
do $$ declare t text; begin
 foreach t in array array['agencies','opportunities'] loop
  execute format('alter table public.%I enable row level security',t);
  execute format('create policy staff_crm on public.%I for all to authenticated using (public.has_staff_role(array[''admin'',''sales''])) with check (public.has_staff_role(array[''admin'',''sales'']))',t);
 end loop;
end $$;
alter table public.quote_versions enable row level security;
create policy read_quotes on public.quote_versions for select to authenticated using(public.has_staff_role(array['admin','sales']));
-- Version snapshots are immutable. Only the validated RPC may insert.
alter table public.audit_log enable row level security;
create policy read_audit on public.audit_log for select to authenticated using(public.has_staff_role(array['admin']));
create or replace function public.record_change() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.audit_log(actor,table_name,record_id,operation,before_data,after_data)
 values(auth.uid(),TG_TABLE_NAME,coalesce(to_jsonb(NEW)->>'id',to_jsonb(OLD)->>'id',to_jsonb(NEW)->>'circuit_id',to_jsonb(OLD)->>'circuit_id'),TG_OP,
 case when TG_OP <> 'INSERT' then to_jsonb(OLD) end,case when TG_OP <> 'DELETE' then to_jsonb(NEW) end);
 return coalesce(NEW,OLD);
end $$;
do $$ declare t text; begin
 foreach t in array array['circuits','circuit_translations','circuit_prices','departures','agencies','opportunities','quote_versions'] loop
  execute format('create trigger audit_changes after insert or update or delete on public.%I for each row execute function public.record_change()',t);
 end loop;
end $$;
create or replace function public.replace_circuit_prices(product_id text, rows jsonb)
returns void language plpgsql security invoker set search_path='' as $$
begin
 if not public.has_staff_role(array['admin','editor']) then raise exception 'Forbidden'; end if;
 if jsonb_typeof(rows) <> 'array' or jsonb_array_length(rows)>100 then raise exception 'Invalid tariffs'; end if;
 perform 1 from public.circuits where id=product_id for update;
 if not found then raise exception 'Product not found'; end if;
 delete from public.circuit_prices where circuit_id=product_id;
 insert into public.circuit_prices(circuit_id,label,amount,currency,notes,sort_order,audience,valid_from,valid_until,min_guests,max_guests,occupancy,weekdays)
 select product_id,x.label,x.amount,x.currency,coalesce(x.notes,''),x.sort_order,x.audience,x.valid_from,x.valid_until,x.min_guests,x.max_guests,x.occupancy,x.weekdays
 from jsonb_to_recordset(rows) as x(label text,amount numeric,currency text,notes text,sort_order int,audience text,valid_from date,valid_until date,min_guests int,max_guests int,occupancy text,weekdays int[]);
 if exists(select 1 from public.circuit_prices a join public.circuit_prices b on a.id<b.id and a.circuit_id=b.circuit_id
 and a.label=b.label and a.audience=b.audience and a.currency=b.currency and a.occupancy=b.occupancy
 and daterange(a.valid_from,a.valid_until,'[]') && daterange(b.valid_from,b.valid_until,'[]')
 and int4range(a.min_guests,a.max_guests,'[]') && int4range(b.min_guests,b.max_guests,'[]')
 and a.weekdays && b.weekdays where a.circuit_id=product_id)
 then raise exception 'Hay tarifas superpuestas para la misma categoría, ocupación y público.'; end if;
end $$;
create or replace function public.create_quote(opportunity uuid, currency_code text, expiry date, conditions text, lines jsonb)
returns uuid language plpgsql security definer set search_path='' as $$
declare next_version int; quote_id uuid; sum_total numeric;
begin
 if not public.has_staff_role(array['admin','sales']) then raise exception 'Forbidden'; end if;
 if expiry < current_date or jsonb_typeof(lines)<>'array' or jsonb_array_length(lines) not between 1 and 50 then raise exception 'Invalid quote'; end if;
 perform 1 from public.opportunities where id=opportunity for update;
 if not found then raise exception 'Opportunity not found'; end if;
 if exists(select 1 from jsonb_to_recordset(lines) as x(description text,quantity numeric,unit_price numeric)
 where x.description is null or length(trim(x.description))=0 or x.quantity is null or x.quantity<=0 or x.unit_price is null or x.unit_price<0) then raise exception 'Invalid line'; end if;
 select round(sum(x.quantity*x.unit_price),2) into sum_total from jsonb_to_recordset(lines) as x(quantity numeric,unit_price numeric);
 select coalesce(max(version),0)+1 into next_version from public.quote_versions where opportunity_id=opportunity;
 insert into public.quote_versions(opportunity_id,version,currency,valid_until,terms,items,total,created_by)
 values(opportunity,next_version,currency_code,expiry,conditions,lines,sum_total,auth.uid()) returning id into quote_id;
 return quote_id;
end $$;
revoke all on function public.create_quote(uuid,text,date,text,jsonb) from public, anon, authenticated;
grant execute on function public.create_quote(uuid,text,date,text,jsonb) to authenticated;
revoke all on function public.replace_circuit_prices(text,jsonb) from public, anon, authenticated;
grant execute on function public.replace_circuit_prices(text,jsonb) to authenticated;
create policy staff_directory on public.staff for select to authenticated using (public.has_staff_role(array['admin','sales']));
create policy sales_tariffs on public.circuit_prices for select to authenticated using (public.has_staff_role(array['admin','sales']));
-- Explicit object privileges: do not depend on platform default grants.
grant usage on schema public to anon, authenticated, service_role;
revoke all on public.circuits, public.circuit_translations, public.circuit_media,
 public.circuit_prices, public.departures, public.staff, public.agencies,
 public.opportunities, public.quote_versions, public.audit_log from public, anon, authenticated;
grant select on public.circuits, public.circuit_translations, public.circuit_media,
 public.circuit_prices, public.departures to anon, authenticated;
grant insert, update, delete on public.circuits, public.circuit_translations,
 public.circuit_media, public.circuit_prices, public.departures to authenticated;
grant select on public.staff, public.quote_versions, public.audit_log to authenticated;
grant select, insert, update, delete on public.agencies, public.opportunities to authenticated;
grant insert on public.opportunities to service_role;
revoke all on sequence public.audit_log_id_seq from public, anon, authenticated;
revoke all on function public.record_change(), public.has_any_circuits(), public.set_updated_at() from public, anon, authenticated;
commit;
