# My Movie Tracker — Version 3.0

## What's new in V3.0

- TMDB movie search is available from the movie-entry form. Select the correct film to fill release year, runtime, original title, genres, synopsis and poster. Review the fields before saving. Manual entry still works without metadata credentials.
- A new **Movie metadata lookup** settings section stores your TMDB API Read Access Token in this browser only. Enter it separately on any other device where you want metadata search.
- New viewing entries default to **Solo / watched alone** (`No` for watched with wife). Editing an existing viewing preserves its existing answer.
- Account settings include an explicit **Sign out** button and **Test / retry connection** action. Both devices should use the same Supabase project URL, public publishable/anon key and the same Supabase email account.
- Cloud connection errors now display the Supabase error code and more explicit troubleshooting text. Initial cloud upload failures no longer get reported as successful.
- Selected TMDB posters appear on movie detail pages.

## Important setup notes

1. Before updating, export a JSON backup from the existing app on your PC. Do not clear the PC browser data.
2. Replace the deployed `index.html`, `manifest.webmanifest` and `sw.js` with the files in this package. Keep the files together at the root of your GitHub Pages site.
3. On both PC and phone, open **Settings → Cloud account and sync**. Confirm the same Supabase Project URL and publishable/anon key. Use the same email/password account on both devices.
4. Use **Test / retry connection**. If the app reports `PGRST205`, the Supabase REST API still cannot see `public.movie_tracker_data`. That is a backend schema-cache/API visibility problem, not a password issue. Don't repeatedly create accounts or clear local data.
5. Once cloud connection works, carefully resolve any local-vs-cloud data prompt. Keep the PC library backup before choosing either copy.
6. For movie search, create a TMDB account and request a developer API credential at <https://www.themoviedb.org/settings/api>. The API Read Access Token is accepted by this build. Add it in **Settings → Movie metadata lookup**. Do not put it in GitHub source code. The app stores it in local browser storage; enter it on each device.

## TMDB attribution

This product uses the TMDB API but is not endorsed or certified by TMDB. TMDB requires attribution and its official logo/branding according to its terms. API access is free for qualifying non-commercial use, subject to TMDB's current terms: <https://developer.themoviedb.org/docs/faq>.

## Security and data safety

- Only use the Supabase public publishable key or legacy public `anon` key in the browser. Never use a Supabase `service_role` or `sb_secret_` key.
- Do not disable Row Level Security. The SQL schema restricts data to the authenticated user's own row.
- Export JSON backups regularly. Supabase Free does not replace a backup plan.
- Cloud sync and TMDB lookup require internet access. Manual movie entry still works when TMDB lookup is not configured.

## Package contents

- `index.html` — app
- `manifest.webmanifest` — installable web app metadata
- `sw.js` — service worker
- `supabase-schema.sql` — database table and RLS setup (for new setup only; do not rerun casually on a populated project)
