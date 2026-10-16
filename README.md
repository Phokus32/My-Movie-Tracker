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
