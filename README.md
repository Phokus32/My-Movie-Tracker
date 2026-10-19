# Blackwood Movie Log V7.10.6

This release updates Emby integration on top of V7.10.5. All existing app data is retained.

## Highlights

- Prefer direct linked Emby IDs, then IMDb IDs, TMDB IDs and strict title/year checks. Server-side Emby provider lookup and full-library indexing improve Watchlist and Smart Suggester matching. Ambiguous matches prompt you to choose a film.
- Remember resume positions locally, complementing playback positions from Emby. Browser storage is per-device, and Emby's user data varies based on playback reporting.
- Create or resume an in-progress Movie Log viewing once playback begins. Upon playback ending, or via the Finish control, prompt for start/finish dates, first watch vs rewatch, 1–10 rating and whether Beth watched with you. After saving, show TMDB recommendations with actions for Watchlist or Emby. All changes use the existing Movie Log cloud-save mechanism when connected.
- Theater styling; picture X/Y stretch 75–150%; grid/list library explorer; cover-size slider; configurable stats; watchlist filters and sorting.
- The Watchlist Edit Details action opens the existing editing form with notes, suggested-by, priority and movie title/year.

## Limitations

- 2.1×–2.5× playback remains experimental. Device/browser media pipelines may enter trick play (scrubbing without audio). This release labels that limitation rather than claiming universal support; smooth 2.5× with audio on those devices may require server-side time-stretched transcoding and a backend.
- Streaming, remote access and automatic Emby progress reporting depend on the Emby server, network and codecs. 4 Mbps/1080p is still the default playback preset.
- Check your specific library with multiple titles and watchlist items. Not live-tested against your private Emby server.
- IMDb rating is shown when an actual IMDb rating has been saved by the Movie Log's OMDb integration. Emby's CommunityRating is labeled separately to avoid misrepresenting its source.
