-- OnTour DMC — Supabase schema for the circuit CMS
-- Run this once in the Supabase SQL editor (project → SQL → New query).
-- Bootstrap only: apply every migration before use. Never rerun after migrations;
-- this legacy bootstrap would restore broad policies.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Circuits
-- ---------------------------------------------------------------------------
create table if not exists public.circuits (
  id                text primary key,
  days              integer not null default 1 check (days > 0),
  nights            integer not null default 0 check (nights >= 0),
  image             text not null default '',
  color_theme       text not null default 'cultura',
  region            text not null default 'andes',
  map_embed_url     text not null default '',
  brochure_url      text not null default '',
  brochure_pdf_url  text not null default '',
  published         boolean not null default true,
  sort_order        integer not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists circuits_published_sort_idx
  on public.circuits (published, sort_order, id);

-- ---------------------------------------------------------------------------
-- One translated row per circuit and locale
-- ---------------------------------------------------------------------------
create table if not exists public.circuit_translations (
  circuit_id   text not null references public.circuits(id) on delete cascade,
  locale       text not null check (locale in ('es', 'en', 'de', 'fr')),
  name         text not null default '',
  description  text not null default '',
  price        text not null default '',
  highlights   jsonb not null default '[]'::jsonb,
  itinerary    jsonb not null default '[]'::jsonb,
  primary key (circuit_id, locale)
);

-- ---------------------------------------------------------------------------
-- Photos and videos attached to a circuit
-- ---------------------------------------------------------------------------
create table if not exists public.circuit_media (
  id          uuid primary key default gen_random_uuid(),
  circuit_id  text not null references public.circuits(id) on delete cascade,
  kind        text not null default 'image' check (kind in ('image', 'video')),
  url         text not null,
  location    text not null default '',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists circuit_media_circuit_idx
  on public.circuit_media (circuit_id, sort_order);

-- ---------------------------------------------------------------------------
-- Optional price table (hotel categories, extensions, single supplements)
-- ---------------------------------------------------------------------------
create table if not exists public.circuit_prices (
  id          uuid primary key default gen_random_uuid(),
  circuit_id  text not null references public.circuits(id) on delete cascade,
  label       text not null,
  amount      numeric(12, 2),
  currency    text not null default 'USD',
  notes       text not null default '',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists circuit_prices_circuit_idx
  on public.circuit_prices (circuit_id, sort_order);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists circuits_set_updated_at on public.circuits;
create trigger circuits_set_updated_at
before update on public.circuits
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row level security
--   • anonymous visitors read only published circuits and their content;
--   • any authenticated user is an editor (invite editors from Supabase Auth).
-- ---------------------------------------------------------------------------
alter table public.circuits enable row level security;
alter table public.circuit_translations enable row level security;
alter table public.circuit_media enable row level security;
alter table public.circuit_prices enable row level security;

drop policy if exists "Published circuits are public" on public.circuits;
create policy "Published circuits are public"
  on public.circuits for select
  to anon, authenticated
  using (published = true);

drop policy if exists "Editors manage circuits" on public.circuits;
create policy "Editors manage circuits"
  on public.circuits for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Translations of published circuits are public" on public.circuit_translations;
create policy "Translations of published circuits are public"
  on public.circuit_translations for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.circuits c
      where c.id = circuit_translations.circuit_id and c.published
    )
  );

drop policy if exists "Editors manage translations" on public.circuit_translations;
create policy "Editors manage translations"
  on public.circuit_translations for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Media of published circuits is public" on public.circuit_media;
create policy "Media of published circuits is public"
  on public.circuit_media for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.circuits c
      where c.id = circuit_media.circuit_id and c.published
    )
  );

drop policy if exists "Editors manage media" on public.circuit_media;
create policy "Editors manage media"
  on public.circuit_media for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Prices of published circuits are public" on public.circuit_prices;
create policy "Prices of published circuits are public"
  on public.circuit_prices for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.circuits c
      where c.id = circuit_prices.circuit_id and c.published
    )
  );

drop policy if exists "Editors manage prices" on public.circuit_prices;
create policy "Editors manage prices"
  on public.circuit_prices for all
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------------
-- Helper used by the public site to distinguish an empty project (fall back
-- to the bundled circuits) from a project where every circuit is a draft.
-- ---------------------------------------------------------------------------
create or replace function public.has_any_circuits()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (select 1 from public.circuits);
$$;

grant execute on function public.has_any_circuits() to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Storage: public read, authenticated upload/update/delete
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('circuit-media', 'circuit-media', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can read circuit media" on storage.objects;
create policy "Public can read circuit media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'circuit-media');

drop policy if exists "Editors can upload circuit media" on storage.objects;
create policy "Editors can upload circuit media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'circuit-media');

drop policy if exists "Editors can update circuit media" on storage.objects;
create policy "Editors can update circuit media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'circuit-media')
  with check (bucket_id = 'circuit-media');

drop policy if exists "Editors can delete circuit media" on storage.objects;
create policy "Editors can delete circuit media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'circuit-media');
