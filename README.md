# Blackwood Movie Log V4.2

## Features
- Click BLACKWOOD logo to return to Movie Log.
- Cloud-first startup and automatic cloud pull on focus, tab visibility and once per minute while open. Existing local/cloud divergence requires conflict resolution instead of overwriting. Cloud writes check the last fetched baseline first. Supabase stores one JSON row, so concurrent writes still carry a small race risk; keep JSON backups.
- Watchlist Add/Edit includes TMDB search with selectable results, poster, community rating, runtime, genres, synopsis, director and cast. Manual entry remains available.
- All-time Top 10 ranked favorites with badges in the log, watchlist and detail page.
- Annual and all-time statistics: hours, averages per day/week, Beth viewing stats, unique films, genre/decade/director, rewatches and heatmap.
- Seasonal decorative lights and Halloween ornaments, with Classic/Decorative/Off choices.
- Existing viewing data, Supabase configuration, TMDB token storage, backups and V4.1 metadata refresh retained.

## Install
Export JSON backup first. Replace index.html, sw.js and manifest.webmanifest in your existing GitHub Pages repository. Do not run SQL or replace Supabase. Hard refresh the app if a previous version remains cached. Verify on both devices.

## Notes
This build was syntax-checked but not tested against your live Supabase/TMDB projects. Average viewing hours assume full runtime for each completed viewing. Annual new/repeat counts use recorded viewing history. Watched with Beth uses the existing watchedWithWife=yes field.
