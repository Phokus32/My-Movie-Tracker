# My Movie Tracker V3.5

## Before upgrading
Export a JSON backup in the currently working app (Settings > Export JSON). Keep the same GitHub repository and Supabase project. **Do not run the included SQL file again.**

## What is new
- TMDB director and top eight cast members populated during movie lookup
- Manual director, cast, collection tags, horror and Christmas classifications
- October Horrorfest frames for horror viewings and December Christmas frames for Christmas viewings
- Yearly Horrorfest, Christmas, all-horror and all-time horror statistics, including separate rewatches
- Toggle between list and poster-grid views in Movie Log
- Movie details display director, cast and collections

## Deployment
Upload `index.html`, `manifest.webmanifest` and `sw.js` to the root of the existing GitHub Pages repository, replacing the existing files. Commit to your current publishing branch. Reload the site after Pages publishes. Keep your existing Supabase credentials and log in normally. TMDB tokens are browser-specific and may need to be entered on each device.

## Data compatibility
This release keeps the existing single-record Supabase cloud data format, movie IDs, viewing IDs, JSON backup format and existing functionality. New movie properties are optional and are saved only when a viewing is edited or created. Existing movie and viewing records are not erased. The `supabase-schema.sql` file is included for reference only.
