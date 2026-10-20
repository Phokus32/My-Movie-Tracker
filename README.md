# Blackwood Movie Log V7.10.9 — Bandwidth Optimization

This version is based directly on V7.10.8 and retains its movie data model, Emby player, Watchlist, dashboards, TMDB integration, cloud authentication and separate Emby Sync webhook integration. No database migration is required for the bandwidth optimization.

## What changed

- Removed the duplicate 30-second full-library cloud download timer.
- Replaced the 60-second full-library download with a **five-minute lightweight `updated_at` check** while the app is visible. Focus/return triggers an earlier check (with a 30-second throttle). The manual Sync Now button still checks immediately.
- Only downloads the full `movie_tracker_data.payload` when the timestamp indicates another device has modified the library, or on initial sign-in/manual cloud recovery.
- Saves no longer download the full previous payload; they use a **version-constrained atomic update** based on `updated_at`, which prevents overwriting cloud data changed by another device. After a successful save the new timestamp is retained.
- Unchanged state no longer triggers redundant Supabase cloud writes when sync is explicitly invoked by other features.
- Custom Movie Memory frames are cached by their Supabase Storage object version in IndexedDB and only downloaded again if a frame changed. New devices still download images once.
- Supabase Edge Function/webhook code and Emby Sync polling remain unchanged; this version does not fix any existing webhook 503 errors.

## Important tradeoff

While the app is open, changes saved on another device may take **up to five minutes** to appear automatically. Reopening the app usually checks sooner. The **Sync Now** control checks immediately. Local edits still save to the cloud after the normal short debounce. Conflicting edits are not silently overwritten; use the cloud conflict resolution controls if necessary.

## Safe testing sequence

1. **Export a JSON backup** from V7.10.8 and keep its deployment ZIP for rollback.
2. Deploy this ZIP's normal frontend files in the same place as V7.10.8. Keep Supabase schema, account credentials, frames and Edge Function unchanged.
3. On device A, add a clearly marked test movie or change a harmless note. Verify the app says **Saved to cloud**.
4. On device B, use **Sync Now** or wait for the next check; verify the edit appears.
5. Modify the movie on device B and sync on A. Verify it appears without duplicate viewings.
6. If both devices edit simultaneously, confirm conflict protection stops one of the writes rather than silently overwriting changes.
7. Check Supabase egress after a full day. This reduces redundant Blackwood transfers but does not address egress from the separate **Our Quest** app or custom images stored in Supabase.

## Sources of network traffic

- TMDB posters and TMDB API searches: fetched directly from TMDB (not Supabase egress).
- Emby video playback: delivered directly from your Emby/Tailscale endpoint (not Supabase egress).
- Supabase: cloud JSON payload on initial login, on changes, and on deliberate cloud saves; Emby event records and custom frame assets.

## Important operational notes

- The existing Supabase `movie_tracker_data.updated_at` column must continue to be updated on each edit. This version uses it as a token for conflict-safe writes, not as a device-local clock.
- Avoid using V7.10.8 and V7.10.9 simultaneously to modify the same cloud movie library while testing: older builds can still overwrite the cloud using an unconditional upsert.
- An image stored in Supabase Storage (custom memory frame) consumes Supabase egress when transferred, unlike a TMDB image.
- A failure to write cloud changes leaves them locally stored and must be resolved before editing on another device.

---

## Original V7.10.8 notes

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
