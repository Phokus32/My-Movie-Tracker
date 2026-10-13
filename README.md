# Blackwood Movie Log V5.1

Builds on V5.0.1, including the explicit Rewatch badge fix.

## Changes
- Ten immersive illustrated themes (six existing plus Gothic Theater, Midnight Drive-In, Deep Blue Cinema, Cosmic Odyssey). Theme art is bundled as offline-friendly SVG assets.
- Mobile **List** view uses tighter movie rows by default to show more movies per screen. A **Tight mobile list** checkbox on Movie Log toggles this per device. Poster and Text Only modes remain unchanged.
- All existing V5.0 features, records and Supabase configuration retained.
- New service-worker cache version for updates.

## Install
Export a JSON backup from the current app first. Extract and upload **all files and the themes folder** into the existing GitHub Pages repository root. Do not upload the outer version-named folder. Do not clear browser data or log out.

## Verification
Static JS syntax and ZIP integrity checks only. Not yet tested in a live browser or with Supabase.
