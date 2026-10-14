# Blackwood Movie Log V5.4 — Import & Sync

## Install
Upload index.html, sw.js, manifest.webmanifest, themes/ and backgrounds/ to your EXISTING GitHub Pages repository. Do not delete your Supabase project or change your sign-in. On iPhone reopen the Home Screen app after deployment and allow the service worker to update.

## Import without replacing your library
1. In the current app Settings, EXPORT JSON backup. Keep the file.
2. Deploy V5.4 and confirm the version label. Sign in to the same Supabase account on both devices.
3. On desktop go to Settings > V5.4 Historical import & TMDB matcher. Upload blackwood-historical-import-v5.4.csv from this ZIP.
4. In Settings > Movie metadata enter your TMDB Read Access Token on your PRIVATE device. Never commit the token to GitHub.
5. Click Find high-confidence TMDB IDs. The matcher requires an exact normalized title and exact release year with only one such candidate in the first 20 search results. This is a conservative heuristic, NOT a statistically calibrated 95% probability. Review before importing.
6. Click Download review CSV. Open in Excel. Correct any wrong or blank IDs. Save as CSV UTF-8, then re-upload that review CSV.
7. Review the dry-run preview and duplicates. Click Import only after verifying backup and preview. The import merges into existing movies/viewings and does NOT delete existing entries.
8. Wait for cloud sync; on phone reopen the app, tap Sync Now in Settings.

## Safety limitations
This app currently uses a single JSON payload per Supabase account. Concurrent edits on two devices can still conflict; resolve conflicts and ensure sync completes before switching devices. Do not use 'Upload local copy' to resolve conflicts unless you intend to overwrite cloud data. Duplicates are detected by movie identity + start/finish dates and may need manual review. The CSV contains personal movie history, so keep it private. Unfinished rows with a start date can be imported as in-progress; rows without valid start dates are held.
