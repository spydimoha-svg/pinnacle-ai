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

-- student_state holds every student's tutor memory and chat/journal history, so
-- the anon/authenticated roles get NO policy and NO grants at all: every direct
-- REST call (select/insert/update/delete) fails with permission-denied, for
-- anyone holding only the public anon key. The only reader/writer is the
-- api/state.ts server function, which uses the service_role key (bypasses RLS
-- by design) and only ever touches the row matching the caller's verified
-- Supabase auth token — see src/lib/cloud.ts.
drop policy if exists dev_all on public.student_state;
revoke all on public.student_state from anon, authenticated;

-- schools is business + admin data: anon may read (needed for the app today)
-- but must NOT write. Only the service-role key (server-side, once the Master
-- console is wired that way) can insert/update/delete here.
drop policy if exists dev_all on public.schools;
drop policy if exists dev_read on public.schools;
create policy dev_read on public.schools
  for select using (true);

-- school_resources holds school-uploaded materials but no shipped code reads
-- or writes it yet, so anon/authenticated get NO policy and NO grants at all,
-- same treatment as student_state: only the service-role key can touch it.
drop policy if exists dev_all on public.school_resources;
drop policy if exists dev_read on public.school_resources;
revoke all on public.school_resources from anon, authenticated;
