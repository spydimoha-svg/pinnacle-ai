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

-- user_id stores auth.users.id as text (see api/state.ts), so a real foreign
-- key can't be declared (uuid vs text). Deleting the auth account instead
-- must cascade through this trigger, or a right-to-erasure delete in the
-- Supabase dashboard leaves the student's memory/chats/journal orphaned.
create or replace function public.handle_deleted_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.student_state where user_id = old.id::text;
  return old;
end;
$$;

drop trigger if exists on_auth_user_deleted on auth.users;
create trigger on_auth_user_deleted
  after delete on auth.users
  for each row execute function public.handle_deleted_user();

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

-- schools is business + admin data (plan, price_per_student, notes) and no
-- shipped code reads or writes it client-side, so anon/authenticated get NO
-- policy and NO grants at all, same treatment as school_resources: only the
-- service-role key can touch it.
drop policy if exists dev_all on public.schools;
drop policy if exists dev_read on public.schools;
revoke all on public.schools from anon, authenticated;

-- school_resources holds school-uploaded materials but no shipped code reads
-- or writes it yet, so anon/authenticated get NO policy and NO grants at all,
-- same treatment as student_state: only the service-role key can touch it.
drop policy if exists dev_all on public.school_resources;
drop policy if exists dev_read on public.school_resources;
revoke all on public.school_resources from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Rate limiting (shared Postgres row instead of a per-instance in-memory Map)
-- ---------------------------------------------------------------------------
-- api/chat.ts and api/master-login.ts used to throttle with a module-level
-- Map, which Vercel resets on every cold start and keeps separate per
-- concurrent instance — under horizontal scaling the real ceiling was
-- (per-instance limit) x (instance count), not the stated limit. This table
-- plus rate_limit_hit() give every instance one shared, atomically-updated
-- counter per key+window.
create table if not exists public.rate_limits (
  key          text primary key,
  window_start timestamptz not null default now(),
  count        integer not null default 0
);
alter table public.rate_limits enable row level security;
revoke all on public.rate_limits from anon, authenticated;

-- Atomically bump the counter for `p_key` and report whether it has exceeded
-- `p_max` hits inside the trailing `p_window_ms` window, resetting the window
-- once it has elapsed. The INSERT ... ON CONFLICT DO UPDATE takes a row lock
-- on `p_key`, so concurrent hits from different serverless instances still
-- serialize correctly instead of racing.
--
-- Every call also has a 1% chance of sweeping rows whose window started over
-- an hour ago (the longest window in use is master-login's 5 minutes, so an
-- hour is well clear of any live key). This keeps a scripted client rotating
-- keys from growing the table without bound, without needing pg_cron or a
-- separate scheduled job.
create or replace function public.rate_limit_hit(p_key text, p_window_ms integer, p_max integer)
returns boolean
language plpgsql
as $$
declare
  v_window interval := make_interval(secs => p_window_ms / 1000.0);
  v_count integer;
begin
  if random() < 0.01 then
    delete from public.rate_limits where window_start < now() - interval '1 hour';
  end if;

  insert into public.rate_limits (key, window_start, count)
  values (p_key, now(), 1)
  on conflict (key) do update
    set window_start = case when public.rate_limits.window_start <= now() - v_window
                             then now() else public.rate_limits.window_start end,
        count = case when public.rate_limits.window_start <= now() - v_window
                      then 1 else public.rate_limits.count + 1 end
  returning count into v_count;
  return v_count > p_max;
end;
$$;

revoke all on function public.rate_limit_hit(text, integer, integer) from public;
grant execute on function public.rate_limit_hit(text, integer, integer) to service_role;
