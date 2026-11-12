-- LOCAL ISOLATED TEST DATABASE ONLY. Never run this file in Supabase.
create role anon;
create role authenticated;
create role service_role bypassrls;
create schema auth;
create schema storage;
create table auth.users(id uuid primary key);
create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
create function auth.jwt() returns jsonb language sql stable as $$select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb$$;
create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
create table storage.objects(id uuid default gen_random_uuid(),bucket_id text,name text);
alter table storage.objects enable row level security;
grant usage on schema auth,public,storage to anon,authenticated,service_role;
grant all on all tables in schema storage to anon,authenticated,service_role;
-- Deliberately omit table defaults: migrations must grant required access explicitly.
-- Simulate legacy platform function grants as well as PostgreSQL PUBLIC execute.
alter default privileges in schema public grant execute on functions to anon,authenticated,service_role;
