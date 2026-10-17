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
