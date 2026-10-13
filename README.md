# Blackwood Movie Log V4.0

This release builds on the existing movie tracker and keeps the same localStorage keys, Supabase table and authentication. **Do not run the SQL schema again.**

## Changes
- Blackwood Movie Log branding with a stylized gold BLACKWOOD wordmark, B icon and visible Version 4.0 label.
- Movie log rows redesigned to match the supplied mockup with poster, seasonal badge, status, personal score, TMDB score, runtime and edit/detail actions.
- Settings toggle to show/hide poster thumbnails, plus small, medium and large sizes. Missing posters use a placeholder.
- Removed the manual Status dropdown from the viewing editor. A finish date means Completed, a start without finish means In Progress and an Abandoned checkbox means Did Not Finish. Date changes update the visible status automatically.
- Existing viewing history, favorites, TMDB lookup, Supabase sync, dashboard, seasonal statistics, calendar, watchlist and JSON backups retained from V3.6.

## Install safely
1. Export a JSON backup from the currently working app.
2. Keep your existing GitHub repository and Supabase project.
3. Upload `index.html`, `manifest.webmanifest` and `sw.js` to the same GitHub Pages repository root, replacing those files.
4. Commit and wait for GitHub Pages to deploy.
5. Hard-refresh the browser if the version label is not 4.0. Test existing records, editing, TMDB lookup and cloud sync on both devices.

## Notes
The version has passed a JavaScript syntax check but has not been tested against your live Supabase project. Do not overwrite or reset your database. TMDB token settings remain per browser. New settings are stored with the cloud JSON library.
