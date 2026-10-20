-- Blackwood Movie Log V7.10.8: secure, isolated Emby webhook inbox.
-- Apply in Supabase SQL Editor. Does not alter movie_tracker_data.
create table if not exists public.emby_sync_events (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 emby_user_id text not null,
 emby_server_id text,
 emby_item_id text not null,
 item_title text,
 item_year integer,
 item_type text not null default 'Movie',
 tmdb_id text,
 imdb_id text,
 event_type text not null check (event_type in ('playback.start','playback.stop','playback.pause','playback.resume','playback.progress')),
 position_ticks bigint,
 played_to_completion boolean not null default false,
 occurred_at timestamptz not null,
 received_at timestamptz not null default now(),
 fingerprint text not null unique,
 status text not null default 'new' check (status in ('new','pending','done','ignored'))
);
create index if not exists emby_sync_events_user_status_time on public.emby_sync_events(user_id,status,received_at);
create index if not exists emby_sync_events_user_item_time on public.emby_sync_events(user_id,emby_item_id,occurred_at desc);
alter table public.emby_sync_events enable row level security;
-- No INSERT policy for browsers: only the verified Edge Function can INSERT.
drop policy if exists "Read your Emby sync events" on public.emby_sync_events;
create policy "Read your Emby sync events" on public.emby_sync_events
 for select to authenticated using (auth.uid()=user_id);
drop policy if exists "Update your Emby event acknowledgements" on public.emby_sync_events;
create policy "Update your Emby event acknowledgements" on public.emby_sync_events
 for update to authenticated using (auth.uid()=user_id)
 with check (auth.uid()=user_id);
revoke all on public.emby_sync_events from anon;
grant select on public.emby_sync_events to authenticated;
grant update (status) on public.emby_sync_events to authenticated;
-- A future retention policy can remove handled events older than 90 days.
