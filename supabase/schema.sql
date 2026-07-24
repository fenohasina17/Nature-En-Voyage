-- Nature en Voyage — back-office schema
-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query).

create extension if not exists "pgcrypto";

-- Road axes (fixed set: Antananarivo, RN2, RN7, RN34, RN4, RN6)
create table if not exists axes (
  key text primary key,
  road_fr text not null,
  road_en text not null,
  title_fr text not null,
  title_en text not null,
  pitch_fr text not null,
  pitch_en text not null,
  vehicle_hint_fr text not null,
  vehicle_hint_en text not null,
  accent text not null default 'canopy',
  position int not null default 0
);

-- Tourist sites, grouped by axis
create table if not exists sites (
  id uuid primary key default gen_random_uuid(),
  axis_key text not null references axes(key) on delete cascade,
  name text not null,
  badge_fr text not null default '',
  badge_en text not null default '',
  description_fr text not null default '',
  description_en text not null default '',
  tags text[] not null default '{}',
  image_url text,
  lat double precision,
  lng double precision,
  position int not null default 0,
  created_at timestamptz not null default now()
);

-- Rental vehicles
create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type_fr text not null,
  type_en text not null,
  seats int not null default 4,
  bags int not null default 2,
  terrain_fr text not null default '',
  terrain_en text not null default '',
  fuel_fr text not null default '',
  fuel_en text not null default '',
  rate numeric not null default 0, -- MGA per day
  available int not null default 1,
  image_url text,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists sites_axis_key_idx on sites (axis_key);

-- Row Level Security: anyone can read (the public site needs this),
-- only authenticated users (the admin, logged in via the back-office) can write.
alter table axes enable row level security;
alter table sites enable row level security;
alter table vehicles enable row level security;

drop policy if exists "public read axes" on axes;
create policy "public read axes" on axes for select using (true);
drop policy if exists "auth write axes" on axes;
create policy "auth write axes" on axes for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public read sites" on sites;
create policy "public read sites" on sites for select using (true);
drop policy if exists "auth write sites" on sites;
create policy "auth write sites" on sites for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public read vehicles" on vehicles;
create policy "public read vehicles" on vehicles for select using (true);
drop policy if exists "auth write vehicles" on vehicles;
create policy "auth write vehicles" on vehicles for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Storage bucket for uploaded photos (vehicles + sites)
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

drop policy if exists "public read site-images" on storage.objects;
create policy "public read site-images" on storage.objects for select
  using (bucket_id = 'site-images');

drop policy if exists "auth upload site-images" on storage.objects;
create policy "auth upload site-images" on storage.objects for insert
  with check (bucket_id = 'site-images' and auth.role() = 'authenticated');

drop policy if exists "auth update site-images" on storage.objects;
create policy "auth update site-images" on storage.objects for update
  using (bucket_id = 'site-images' and auth.role() = 'authenticated');

drop policy if exists "auth delete site-images" on storage.objects;
create policy "auth delete site-images" on storage.objects for delete
  using (bucket_id = 'site-images' and auth.role() = 'authenticated');
