# Blackwood Movie Log V7.10.8 — Emby Sync Foundation

Built on the user's V7.10.7 application; existing movie records, cloud payload layout, dashboards, player, metadata repair and movie cards are retained.

## What is implemented in this package

- **Emby Sync** page: an authenticated synchronization health screen, pending-completion inbox and manual check button, plus polling every two minutes while the app is open (switchable).
- **External Emby events**: Supabase table isolated from the main Movie Log JSON payload, row-level security and a secret-checked Edge Function. It imports Emby movie playback activity only for the selected user.
- **Safety**: duplicate event fingerprints, movie matching from actual Emby items, reuse existing in-progress viewings, optional TMDB metadata enrichment and no automatic personal ratings.
- **Completion review**: Emby reports a completed movie; Movie Log asks for start/finish dates, rating, first-time/rewatch and whether Beth watched. Only confirmation marks the log complete.
- **Watchlist availability**: a check button cross-indexes watchlist films against the full Emby catalog using identifiers and exact title/year matches, skipping uncertain links.
- **Two-way watched marking**: confirming completion in Blackwood Theater also sends an Emby watched-status update; any Emby API failure is reported without deleting the Movie Log viewing.
- **More reliable resume**: refreshes Emby's per-user playback checkpoint before opening a movie, rather than trusting an outdated device-only record.
- Existing Emby browsing, Watchlist, Smart Suggester and theatrical player features remain intact.

**Not yet implemented:** background push notifications while the app is closed, remote Emby device control, deep analytics, marathon features, new Theater recommendations UI. These are slated for V7.11–7.12. A deployed webhook is required for activity originating on other Emby devices. Emby webhook event payload fields vary by version; test start/stop and completed flags before relying on unattended syncing.

## Safest deployment order

1. **Back up Blackwood Movie Log** using its existing export/backup controls. Keep V7.10.7 ZIP as rollback.
2. In your Supabase project open **SQL Editor**, paste and run `supabase/migrations/20261020_0001_emby_sync_events.sql`. The migration creates only `emby_sync_events`; it does not alter `movie_tracker_data`.
3. Open your new V7.10.8 app, connect Emby and sign into Supabase. Visit **Emby Sync** and copy your **Supabase owner user ID** and **Emby user ID**. Keep both for server setup.
4. Install the Supabase CLI or deploy the Edge Function through Supabase's supported deployment flow. From this extracted project folder, link your project with `supabase login` and `supabase link --project-ref YOUR_PROJECT_REF`, then run `supabase functions deploy blackwood-emby-webhook`.
5. Set the following **Supabase Edge Function secrets on the server**, never in `index.html` or any publicly served file:
   - `BLACKWOOD_OWNER_USER_ID` — UUID from the Emby Sync screen.
   - `BLACKWOOD_EMBY_USER_ID` — Emby user ID from the same screen.
   - `BLACKWOOD_ADMIN_KEY` — Supabase **server-side service role/secret key**, stored as an Edge Function secret. **Never paste it into chat or the browser.**
   - `BLACKWOOD_EMBY_WEBHOOK_SECRET` — Generate a unique random secret (at least 32 characters). Treat it like a password.
   - Optional: `BLACKWOOD_EMBY_SERVER_ID` — restrict accepted events to one Emby server, if known.
   - `SUPABASE_URL` is provided by Supabase at runtime.
6. In **Emby Server Dashboard → Plugins → Webhooks** (Emby Premiere), configure your Emby user profile with movie playback start, pause, resume and stop events. The generic webhook destination URL is:

   `https://YOUR_PROJECT_REF.supabase.co/functions/v1/blackwood-emby-webhook?bw_token=YOUR_UNIQUE_WEBHOOK_SECRET`

   **Security:** query-string secrets can appear in intermediary URL logs. If your Emby Webhooks version supports custom request headers, use `X-Blackwood-Secret` instead of `bw_token`. Never share the complete secret-bearing URL. Do not use your Emby API key for this token. Enable the webhook for your Emby account only. This endpoint does not require Tailscale access because Emby sends events outbound over HTTPS.
7. Open a movie in Emby on your television and stop it. Open Blackwood Movie Log → **Emby Sync** → **Sync Now**. Verify an in-progress viewing was created or resumed, that its artwork populates and that the item matches the correct movie. Test an actual Emby watched-completion event and review the pending completion prompt.
8. Check the Emby Server dashboard or function invocation logs if events aren't arriving. Don't deploy the old frontend in parallel to the same cloud movie record while testing; this app's JSON storage has conflict protection.

## Critical behavior notes

- Incoming external events are **not** written directly into `movie_tracker_data` by an unauthenticated webhook. They enter a separate table. The signed-in browser imports them and writes through the existing cloud conflict checks.
- The app does **not** continuously run in the background when closed; the webhook holds events until the browser opens and syncs. This is intentional for the first release.
- The app will only auto-suggest completion when the webhook explicitly signals it. Depending on Emby version, a `played_to_completion` flag may be absent; if so, the item will stay in progress. This is safer than falsely completing a film.
- Auto import requires the app's **Emby login and Supabase login** to be connected, so it can verify a movie's identity against Emby before writing into your personal log.
- If SQL isn't applied yet, the Emby Sync page can show a missing-table error; the normal movie tracker continues functioning.

## Testing / rollback

Syntax checks validate the JavaScript but **do not** prove that your private Emby server's webhook payload or Supabase account works. Test with a few films before enabling unattended events. Rollback the frontend to V7.10.7 without deleting the new table. Once deployed, disable the Emby webhook if you want to suspend inbound event collection.
