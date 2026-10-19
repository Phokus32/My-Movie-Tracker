# Blackwood Movie Log V7.10.2

Built from Blackwood Movie Log V7.10.1. Original movie tracking features retained.

## Emby playback changes
- Built-in video player now requests H.264/AAC HLS transcoding by default.
- On browsers without native HLS playback, it loads hls.js 1.6.13 from jsDelivr (internet access and compatible CORS permissions required).
- Speed selection: 0.5x through 2.5x, in 0.1x increments.
- Quality selection: 16 / 8 / 4 / 1.5 Mbps transcoding bitrates (labels are target presets, not guaranteed resolution).
- Audio and subtitle selectors based on Emby MediaStreams.
- MP4 transcoding fallback button, with a way to open the movie in Emby's own web player.
- Resume position and playback reporting with stream offsets.

## Important caveats
- The streaming functionality has not been tested against your Emby server. Some playback formats, server settings, subtitle formats or transcoding permissions may require more work.
- Browser CORS restrictions and HTTPS mixed-content restrictions still apply.
- Server transcoding uses CPU/GPU resources, may require Emby permissions and can impact playback at higher speeds.
- Some browsers may not support accurate seeking or burned-in subtitles in all transcoded streams.
- API access tokens are used in Emby stream URLs within the browser session; use trusted devices and HTTPS for remote access.
- A remote Tailscale Serve address works only while the client is connected to the same permitted tailnet.

## Install
Deploy these files over the existing site. Your Supabase movie tracking database is unchanged.


## V7.10.3
- Playback shortcuts added to Watchlist and Smart Movie Suggester.
- Full-viewport Emby player with floating controls and optional native fullscreen.
- Emby actor/director availability cross-reference.
- Emby collection view filters and sorting, plus full-library indexing.
- Over-2x playback attempts MP4 fallback; whether 2.1x–2.5x works smoothly is browser/codec-dependent, not guaranteed.
