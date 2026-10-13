-- My Movie Tracker V2.1
-- Run this in Supabase Dashboard > SQL Editor > New query.
-- One JSONB payload per authenticated user. Row Level Security prevents cross-account access.

create table if not exists public.movie_tracker_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{"movies":[],"viewings":[],"watchlist":[],"tags":[]}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.movie_tracker_data enable row level security;

-- Drop/recreate policies so this script can be rerun safely.
drop policy if exists "Users can read their own movie tracker data" on public.movie_tracker_data;
drop policy if exists "Users can insert their own movie tracker data" on public.movie_tracker_data;
drop policy if exists "Users can update their own movie tracker data" on public.movie_tracker_data;

create policy "Users can read their own movie tracker data"
  on public.movie_tracker_data for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can insert their own movie tracker data"
  on public.movie_tracker_data for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own movie tracker data"
  on public.movie_tracker_data for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- No anonymous access policy is created. The app uses only the public publishable/anon key.
