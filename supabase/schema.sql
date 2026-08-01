-- Pinnacle AI — Supabase (Postgres) schema.
-- Run this ONCE in your Supabase project: Dashboard -> SQL Editor -> New query
-- -> paste -> Run. Free tier is plenty (500 MB DB).
--
-- What it stores:
--   student_state    one row per student: tutor memory, chats, journal, worksheets
--   schools          the schools the Master console manages (normalised for analytics)
--   school_resources materials a school admin uploads (kept as JSON documents)
--
-- Only `student_state` is auto-synced by the app today; the other two tables are
-- created and ready for when you move auth server-side (see README).

-- ---------------------------------------------------------------------------
-- Per-student learning state (the data students care about most)
-- ---------------------------------------------------------------------------
create table if not exists public.student_state (
  user_id     text primary key,
  memory      jsonb,
  chats       jsonb not null default '[]'::jsonb,
  blobs       jsonb not null default '[]'::jsonb,
  worksheets  jsonb not null default '[]'::jsonb,
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Schools (business data behind the Master console)
-- ---------------------------------------------------------------------------
create table if not exists public.schools (
  id                text primary key,
  name              text not null,
  city              text not null,
  plan              text not null default 'free',   -- free | standard | premium
  price_per_student integer not null default 0,     -- rupees per student per month
  students          integer not null default 0,
  joined            date not null default current_date,
  notes             text
);

-- ---------------------------------------------------------------------------
-- School-uploaded materials (multi-tenant: scoped by school_id)
-- ---------------------------------------------------------------------------
create table if not exists public.school_resources (
  id         text primary key,
  school_id  text,
  data       jsonb not null,
  created_at timestamptz not null default now()
);
create index if not exists school_resources_school_id_idx
  on public.school_resources (school_id);

-- ===========================================================================
-- Row Level Security
-- ===========================================================================
-- The anon key ships in the browser bundle, so these DEV policies make the
-- tables readable/writable by anyone who has the site URL — fine for a demo,
-- NOT safe for real student data at scale.
--
-- PRODUCTION next step: turn on Supabase Auth, key rows to auth.uid(), and
-- replace the permissive policies below with owner-scoped ones (an example is
-- commented at the bottom). See README "Locking down the database".

alter table public.student_state    enable row level security;
alter table public.schools          enable row level security;
alter table public.school_resources enable row level security;

-- DEV (demo) policies: allow all. Drop these before real launch.
drop policy if exists dev_all on public.student_state;
create policy dev_all on public.student_state
  for all using (true) with check (true);

drop policy if exists dev_all on public.schools;
create policy dev_all on public.schools
  for all using (true) with check (true);

drop policy if exists dev_all on public.school_resources;
create policy dev_all on public.school_resources
  for all using (true) with check (true);

-- ---------------------------------------------------------------------------
-- PRODUCTION policy example (enable after wiring Supabase Auth; keep rows keyed
-- to the authenticated user's id):
--
--   drop policy if exists dev_all on public.student_state;
--   create policy own_rows on public.student_state
--     for all using (auth.uid()::text = user_id)
--             with check (auth.uid()::text = user_id);
-- ---------------------------------------------------------------------------
