# Blackwood Movie Log V7.10.0 — Emby Integration

Builds on V7.9.1 and retains People Explorer, movie records, cloud sync and existing views.

## New features
- Optional **Emby Library** item in navigation
- Emby username/password sign-in, with password never stored, access token retained only in browser sessionStorage (cleared on disconnect/session end)
- Browse Emby movies in pages of 100 with search, posters and resume markers
- **Watch on Emby** button in Blackwood Movie Log movie details, matching TMDB ID first then title + release year
- Integrated browser video player with resume, basic playback reporting and native browser controls
- **Open in Emby** alternative for incompatible browser playback

## Setup
1. Deploy the ZIP files, replacing the prior site contents as usual.
2. Open **Emby Library** in navigation.
3. Enter a browser-reachable Emby server URL, username and password. Do not use your LAN-only address unless your device can reach that network.
4. Select **Connect to Emby**.
5. Browse the library or open one of your Blackwood movie cards and select **Watch on Emby**.

## Security and playback limitations
- Use a trusted HTTPS proxy, HTTPS tunnel or other protected HTTPS endpoint for remote access. HTTPS pages cannot load insecure HTTP media URLs. The app rejects plain HTTP Emby endpoints when the app is running on HTTPS (except localhost for testing).
- Emby must permit cross-origin requests (CORS) from the Blackwood application's origin. A browser integration cannot evade CORS restrictions. Configure Emby/reverse proxy accordingly.
- The password is never saved. Your Emby access token is kept only in browser sessionStorage, and is used in video and poster URLs because HTML video/image elements cannot attach custom authentication headers. Avoid sharing browser session or copying those URLs.
- The built-in player uses browser-native playback of direct streams, or Emby-generated HLS / progressive streams. Not every server, container, subtitle track, audio codec or browser is supported. **Open in Emby** is the fallback. Subtitle and audio track switching may be better in the native Emby app.
- An Emby access token does not travel to Supabase. Movie record schema and cloud database are unchanged.
- The external Emby button uses the standard web client's item deep link. Emby versions and reverse proxy setups vary. If the deep link does not open the movie, open Emby from its home page.
- Some advanced features of official Emby clients, including full transcoding profiles, audio/subtitle selection and perfect remote playback reporting, are not replicated here.

## Verification
Static JS syntax was checked with Node.js. Browser integration against an actual Emby server and responsive layout have NOT been live tested. Test login, search, playback and logout before replacing your primary deployment.
