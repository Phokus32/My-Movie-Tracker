# My Movie Tracker V3.6

Upgrade to the existing My Movie Tracker GitHub Pages app. No database schema changes.

## New features
- Visible version number on the main page
- Seasonal Horrorfest and Christmas frames (automatic, always, off)
- Optional poster thumbnails and sizes, plus poster-grid layout
- TMDB community scores beside personal ratings for movies selected via TMDB search
- Quick rewatch button that creates a separate viewing
- Movie diary calendar and random watchlist picker with genre filters
- Seasonal dashboards, yearly horror statistics, viewing hours, average and maximum runtime, and personal awards
- Optional director, cast, collections and horror/Christmas classification
- Display settings synced via the existing Supabase JSON payload

## Upgrade safely
1. Export a JSON backup from the currently working app.
2. Keep the same GitHub repository and Supabase project.
3. Replace index.html, manifest.webmanifest and sw.js in the GitHub Pages repository root.
4. Do not run supabase-schema.sql again.
5. Reload the app, verify existing records and cloud sync, then test on your phone.

## Notes
TMDB scores are saved for new or refreshed movie lookups. Existing movies without saved TMDB scores will not show an invented score. TMDB API tokens remain device-specific. The calendar and awards use your existing viewing records.
