# Blackwood Movie Log V7.3 — test build

Install: back up your library as JSON, then replace your GitHub Pages repository files with the contents of this archive. Keep your Supabase and TMDB settings private.

Implemented: Holiday Fest navigation hub; Statistics & Reports hub; mobile compact movie ratings and condensed card styling; modal scroll reset; TMDB-wide Top 10 search without creating viewing events; browser-side PNG export with mobile share-sheet support where available; preserved existing features.

IMPORTANT: Read-only public share links are NOT active. They require a secure Supabase public-reports table, row-level security and explicit deployment; the app will not publish a private report without that setup. PNG capture uses html2canvas loaded from CDN; external TMDB poster CORS restrictions may prevent some images from appearing in the export.

This is a code-checked test build, not a verified live-browser release. Confirm filtering and card appearance on iPhone before treating it as production-ready.
