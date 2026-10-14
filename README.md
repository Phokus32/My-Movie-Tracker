# Blackwood Movie Log V5.5

## Historical import
1. Export a JSON backup of your existing library in Settings.
2. Deploy this version to your existing GitHub Pages repository, keeping all folders.
3. Open Settings and upload `blackwood-historical-review-v5.5.csv` (2,141 entries).
4. Review the dry-run preview. Records with no valid start date are held, not silently assigned a date.
5. Import using **merge only**. Imported movies are marked **TMDB UNVERIFIED**, even if the CSV supplied a TMDB ID.
6. In Movie Log, open Filters → TMDB verification → Unverified only. Open a movie and choose **Find TMDB Match**, then select the correct film to verify.

## Notes
- TMDB IDs in the CSV are supplied matches, not guaranteed correct; they are intentionally not marked verified.
- An import is a substantial change. Keep an offline JSON backup and try a small test batch first.
- Rows are protected from repeat import using source year and source row.
- This release accepts ISO and US M/D/YYYY dates.
- Cloud sync uses the existing single Supabase JSON record; concurrent edits may still conflict. Wait for sync before changing devices.
- Do not publish your TMDB token in GitHub.
