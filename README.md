# Blackwood Movie Log V5.0

Major upgrade from V4.3. Includes immersive themes, interactive statistics, collections, awards, achievements, year in review, timeline, data health and update manager.

## Install
Upload the contents of this folder (index.html, sw.js, manifest.webmanifest, supabase-schema.sql) to the root of your existing GitHub Pages repository. Do not create a nested folder. Keep the same GitHub Pages URL. Allow the service worker to update, then fully close and reopen your iPhone Home Screen app.

## Safety
Export a JSON backup in Settings before upgrading. This release preserves existing localStorage keys, Supabase configuration and auth sessions. Collections and award winners are included in the synced JSON state. No database schema change is needed.

## Caveats
The current cloud model stores one JSON library row. Concurrent editing on multiple devices requires care. Update Now only appears after the next service worker version has downloaded. The current V4.3 app cannot use the V5 update manager until it has loaded V5. Live iPhone and Supabase sync tests have not been performed.
