# Blackwood Movie Log V4.3

## New
- Bulk TMDB refresh now processes only movies referenced by viewing-log entries. Watchlist-only and orphaned/deleted-viewing movie records are excluded. A preview lists the titles and shows stored, logged and unreferenced record counts. No automatic deletion or database migration.
- New Watch and Rewatch labels derived from completed viewing history.
- Third Text Only log display: compact, single-line rows with no posters.
- Annual movie goal: editable target with percentage and progress bar, synced in the existing UI settings.
- 100 Years of Cinema tab: 1926–2026 inclusive (101 release years), completed viewings from existing history credited, with sequential progress and watched-ahead tracking; click a year for matching completed films and a TMDB discovery link.

## Install
1. Export a JSON backup of the currently working library.
2. Replace index.html, manifest.webmanifest and sw.js in the existing GitHub Pages repo.
3. Commit and reload the page, confirm V4.3.
4. Test cloud sync, bulk-refresh preview and existing movie records before a full metadata refresh.

No Supabase schema changes. Do not run SQL again.

## Notes
Movie records without viewing-log or watchlist references are not deleted; they are simply excluded from bulk refresh. The app's original delete-viewing behavior retains the underlying movie record, which explains why counts can differ. Live browser/Supabase integration is not covered by JavaScript syntax validation.
