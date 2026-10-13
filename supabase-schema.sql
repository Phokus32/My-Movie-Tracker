-- My Movie Tracker V3.0 Supabase schema
-- Safe to run in a project where this table already exists; does not drop the table or its rows.
create table if not exists public.movie_tracker_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{"movies":[],"viewings":[],"watchlist":[],"tags":[]}'::jsonb,
  updated_at timestamptz not null default now()
);

grant usage on schema public to authenticated;
grant select, insert, update on table public.movie_tracker_data to authenticated;
alter table public.movie_tracker_data enable row level security;

drop policy if exists "Users can read their own movie tracker data" on public.movie_tracker_data;
drop policy if exists "Users can insert their own movie tracker data" on public.movie_tracker_data;
drop policy if exists "Users can update their own movie tracker data" on public.movie_tracker_data;

create policy "Users can read their own movie tracker data"
  on public.movie_tracker_data for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Users can insert their own movie tracker data"
  on public.movie_tracker_data for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Users can update their own movie tracker data"
  on public.movie_tracker_data for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

notify pgrst, 'reload schema';
