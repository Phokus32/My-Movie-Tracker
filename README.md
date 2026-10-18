Blackwood Movie Log V7.5.0

Complete 7.4 release plus 7.5 features:
- Movie Awards 2.0: larger poster winner tiles, searchable eligible watched-in-year films.
- Smart Movie Suggester: TMDB discovery, genre/decade/runtime/score filters, limited natural-language parsing, exact TMDB ID and title search. Not a generative AI assistant.
- One-tap add recommendations to watchlist without creating viewings.
- Movie History Timeline: chronological poster cards with each completed viewing, rewatch, date and rating; year and title filters.
- Personal Movie Theater: Now Showing, Up Next, Recently Finished, shortcut to TMDB discovery. No media playback integration.
- Main viewing and watchlist TMDB search now accepts numeric IDs or titles.
- Clear All Filters reset with sort and view preserved.
- Original cloud storage schema, features, assets and official Blackwood logo preserved.

IMPORTANT: Back up JSON data before installing. Deploy all ZIP contents, not just index.html.
Testing: JavaScript syntax and ZIP integrity checked. Live iPhone, TMDB and Supabase integration still require testing.

V7.5.1 navigation: Movie History Timeline and Data Health now live in Statistics & Reports. Movie Awards and My Top 10 are accessed from Goals & Achievements. Existing functionality preserved.

V7.5.2: Movie Battles and Smart Lists removed from navigation.

V7.6: Fix mobile viewing-form date field overlap, sort same-day viewings by newest entry first, and reconcile mobile log layout on initial paint. Emby integration deferred to V8.0.


V7.7: Initial render deferred until all feature overrides load, preventing legacy V6 card layout and header on launch. Mobile Add/Edit form uses stable two-column field grouping and full-width dates, with search overflow correction. Movie detail hero uses TMDB landscape backdrop fetched on demand, cached locally, with title fallback. No Emby integration (reserved for V8.0).


V7.7.1: Adds Settings bulk TMDB backdrop image download to Cache Storage (with progress, stop, clear), and forces the compact mobile Add/Edit Viewing layout after legacy form decorators. Offline cache is device-specific and subject to browser eviction. Emby integration remains planned for V8.0.


## V7.7.2 corrective update
- Removed portrait poster from the landscape movie-details hero at its original creation point. The existing TMDB backdrop loader supplies the image.
- Added a final canonical mobile viewing form layout: ID/type, wife/rating, full-width dates.
- Retained Settings backdrop manager with actual image Cache Storage downloads, progress, stop and clear.
- Bumped service worker cache and visible version.


V7.7.3: artwork manager with poster/backdrop cache downloads, image loader timeout/retry and improved mobile viewing layout.


V7.7.4: Capture-phase Artwork Manager button handlers, immediate visible progress and errors, robust downloader, updated backdrop loader.


V7.7.6: Corrected JavaScript scope: V7.6+ functions now remain inside application closure (fixes renderLog undefined, artwork downloader state and backdrop loading). Retry cloud client initialization if Supabase script is initially unavailable. Service worker now preserves downloaded poster/backdrop caches when upgrading.


## V7.7.6 changes
- Saving a viewing returns to the originating screen and restores its scroll position.
- Opening Movie Details resets scroll to the top.
- Movie Log defaults to the current viewing year, with an always-visible year selector and All Years option.
- Movie Log renders 75 cards initially and loads more as the user scrolls or clicks Show next. Full history and statistics remain intact.


V7.7.7: Library and cloud sync baselines are stored in IndexedDB instead of localStorage. Original localStorage data is removed only after IndexedDB confirms successful storage. Cloud sync errors are not caused by localStorage quota errors. Back up your JSON before upgrading.


V7.7.8: Added 10 optimized WebP menu tiles for Holiday Fest, Statistics & Reports and Goals & Achievements. Original image files are not bundled. No database schema or storage changes.


V7.7.12: Movie Memory Card now uses the supplied Blackwood Theater artwork as a built-in WebP background with dynamically positioned poster, title, fractional rating stars, metadata and notes.

V7.7.13: Movie Memory Card date MM/DD/YY, smaller genre text, slightly larger wrapped movie title.


V7.7.15: Illustrated Horrorfest and Christmas Fest frame overlays on seasonal Movie Log cards. Original generated artwork embedded as optimized WebP in index.html; no additional asset requests. Existing frame settings: None disables artwork, other choices show the appropriate holiday artwork.


V7.7.17: festival border-image edges use repeat:round instead of stretch; clicking the Movie Memory Card opens a full-screen lightbox (Escape or close to exit), with 10% taller card proportions on mobile. External ratings cloud synchronization preserved.


V7.7.18: holiday frames replaced with non-stretched repeating Christmas light strands, falling snowflakes, red blood border with varied dripping streaks and jack-o-lantern corners. Fullscreen mobile Movie Memory Card is vertically scaled 10%; title font enlarged and wrapping preserved. Ratings cloud sync unchanged.


V7.7.19: replaced approximate SVG/emoji frames with transparent frame overlays extracted from the exact user-approved Christmas and Horror concept. Dedicated desktop and mobile 9-slice artwork; falling snow preserved.

V7.7.20: exact user-supplied transparent holiday frames, trimmed vertically to 2048x345 (5.94:1) without scaling pumpkins or lights; foreground overlays with click-through. Christmas snow and Supabase ratings sync preserved.


V7.7.21: Slimmed both seasonal overlays with independent compressed top/bottom artwork and a transparent central window. Kept existing card dimensions, controls, ratings cloud sync and Memory Card.

V7.7.22: Seasonal overlays use 9-slice borders with continuous narrow left/right edges and preserved corners. Added subtle animated bats to horror rows. Snow animation remains. Mobile fullscreen Memory Card stretch increased from 1.10x to 1.188x (additional 8%).
\nV7.7.23: four-edge independent seasonal artwork; removed bats; added falling blood drops with bottom splash; doubled Christmas snowflakes; gentle light flicker; preserved V7.7.22 fullscreen stretch.\n
V7.7.24: Restored nine-slice border art, added tiled side strings, reduced horror droplets from 12 to 9 and diameter by 25%, kept snow unchanged. Added missing sw.js with network-first HTML navigation and offline fallback to prevent stale PWA versions. No data/cache clearing needed.

V7.7.25: side borders shifted outward 6px desktop and 3px mobile; unchanged artwork, animation and data handling.


V7.7.26: More aggressive outward side alignment; 180-degree rotated right Horrorfest side; includes the actual artwork files referenced by the styles so they can load in production.\n
V7.7.27: memory card titles auto-shrink when wrapping to three lines, increased line height and padding. Fullscreen memory card is 5% narrower with 5% horizontal stretch; vertical stretch unchanged. Holiday frames unchanged.\n
V7.7.28: Reduced Memory Card title font and replaced overflow fitting with actual rendered text measurement, including fullscreen mode. Other app features unchanged.\n
V7.7.29: Unified holiday frames and animation controls, density scaling, simple frames; Movie Suggester year/runtime/rating ranges with TMDB discover API support.\n
V7.7.30: Independent Horror and Christmas frame styles, new Christmas simple frames, animated effects with appropriate movement, live settings preview, and restored missing holiday artwork files.\n
V7.8.0: eight dashboard stats including busiest date, removes duplicate stats heatmap, restores log filters after edits, watchlist Suggested By, 5:1 collection banner upload, red/green Christmas twinkles. PWA reload root cause still under investigation.

V7.8.1: Fix Edit button with delegated click handling; integrate collection banner upload controls directly into collection rendering.

V7.8.2: desktop IMDb/RT display, collapsible collection banners, TMDB collection search, quick Beth and finish-date buttons on movie cards.

V7.8.3: Restore missing desktop heart, finish-date checkmark, IMDb and RT displays by integrating actions into Movie Log card decoration and redraw handling.

V7.8.4: Stop mutation-observer infinite decoration loop introduced with dynamic holiday effects. Restore three quick-action buttons and festival frame rendering; guard rendering stages.

V7.8.5: Fixed root-cause scoping bug: V7.8.2+ action handlers were mistakenly defined outside the application closure. Restored buttons, ratings and holiday renderer; stable data-view-id added to cards.

V7.8.9 (based specifically on the user-supplied WORKING V7.8.5 ZIP)
- Desktop star, Beth heart and completion buttons in a single column.
- Mobile buttons 20% smaller (28px) and action bar 10px to the right.
- Movie Memory Card: dropdown with Original Theater, Classic, Horror, Christmas, Castle, Patriotic, Hero, Action and Comedy.
- Upload Frame saves a 1177 x 1337 WebP image into device-local IndexedDB; uploads are NOT synchronized across devices. A matching template is required for data overlays.
- Selecting a frame changes the report background without altering overlay text and preserves the click-to-fullscreen view.
- Service worker no longer caches HTML and has a new cache version. No data is cleared.

V7.8.10: Mobile movie action controls 24px high with 3px spacing to reduce card height; Delete Frame button removes only device-local custom frames after confirmation, never built-in frames.

V7.8.11: Desktop action controls forced into one column using the specificity of the original desktop grid selector; mobile column shifted 3px left. No card JavaScript or data changes.

V7.8.12: Year-specific dashboard streak with date range, iPhone Movie Log toolbar refinement.

V7.8.13: Mobile Movie Log full-width search; no viewing-year label; controls in second row with narrower sorting selectors; removed Pick a movie button; personal-rating star fills when viewing has a rating.

V7.8.14: 21 awards categories including existing Best Picture, TMDB individual performer/director winners, genre and viewing-year filters, rating ranking, rewatch and score-gap awards. Existing award data preserved.

V7.8.15: Movie Awards eligibility and year selector now use original movie release year, not viewing year. Existing award records are preserved.


## V7.8.16: Cross-device Movie Memory frames
Custom frames remain cached in IndexedDB and now upload/download through a **private Supabase Storage bucket** named `movie-memory-frames` when signed in.

### One-time Supabase setup
In Supabase Dashboard > Storage create a PRIVATE bucket named `movie-memory-frames`. In SQL Editor execute:

```sql
create policy "Memory frames read own" on storage.objects for select to authenticated using (bucket_id = 'movie-memory-frames' and (storage.foldername(name))[1] = (select auth.uid()::text));
create policy "Memory frames insert own" on storage.objects for insert to authenticated with check (bucket_id = 'movie-memory-frames' and (storage.foldername(name))[1] = (select auth.uid()::text));
create policy "Memory frames update own" on storage.objects for update to authenticated using (bucket_id = 'movie-memory-frames' and (storage.foldername(name))[1] = (select auth.uid()::text)) with check (bucket_id = 'movie-memory-frames' and (storage.foldername(name))[1] = (select auth.uid()::text));
create policy "Memory frames delete own" on storage.objects for delete to authenticated using (bucket_id = 'movie-memory-frames' and (storage.foldername(name))[1] = (select auth.uid()::text));
```

Previously uploaded device-only frames will remain available locally. To sync an older frame, select its source file and upload again after configuring Storage. All devices must be signed into the same Supabase account.
