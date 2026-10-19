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


## V7.10.4 Emby playback changes
- Default stream quality: 1080p up to 4 Mbps.
- Optional Adaptive buffering (on by default): after repeated stalls, progressively steps down to 720p at 2.5 Mbps, then 480p at 1.5 Mbps. Preserves the approximate playback position, but switching streams may cause a brief pause.
- Emby Remember login (on by default on the login screen): stores the access token in browser localStorage, not the password. Disconnect removes it, and expired/revoked tokens require sign-in again. Avoid on shared devices.
- The Emby server/browser may have limits; no guarantee of uninterrupted playback.


## V7.10.5 — Theater Player
- Redesigned the Emby video experience into an edge-to-edge, dark theater player with a floating seek bar, centered pause/play controls, ten-second skips, unobtrusive status and a separate translucent settings sheet. Controls fade while a movie plays and reappear on interaction. Mobile-safe-area spacing and keyboard controls are included.
- Removed the **forced HLS-to-MP4 switch when selecting speeds above 2.0x**, which could cause stream errors. Playback speed now changes continuously without restarting; ranges 0.5x–2.5x in 0.1x steps using a slider and +/- buttons. Native browser rate and pitch support vary, especially on iOS. 2.1x–2.5x continuous playback is not guaranteed on all devices.
- Added an optional **HLS.js compatibility engine** for browsers with Media Source Extensions (MSE); available under Settings. Switching engines intentionally restarts near the current time.
- Retained 1080p/4 Mbps default, buffering-related quality reduction, audio and subtitle selection, MP4 fallback, Emby login persistence and contextual playback.
- Does not automatically invoke the browser's native fullscreen player, which can replace custom overlays on iOS. Uses a full-viewport web player by default, with an optional native fullscreen button.

### Verification
Package/source syntax and static browser UI testing are performed locally, but playback needs real-world testing against your Emby server and phone. In particular, some iOS WebKit configurations implement >2x as fast-forward/trick-play rather than continuous video and audio. A frontend alone cannot override hardware/OS playback limits.
