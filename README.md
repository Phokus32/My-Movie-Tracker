# Blackwood Movie Log V5.2 — Cinematic Environments

Built from V5.1. Adds 50 bundled SVG backgrounds across Horror, Classic, Retro, Sci-Fi, Christmas and Minimal categories. Includes both simple outline patterns and detailed illustrated scenes, a searchable-by-category/style gallery, live preview, dimming, favorites and random favorite selection. The background can be paired with any of the existing ten color themes. Existing movie features and the compact mobile layout are preserved.

## Installation
Export a JSON backup from the running app. Copy **index.html**, **sw.js**, **manifest.webmanifest**, **supabase-schema.sql**, and the complete **themes/** and **backgrounds/** directories to your existing GitHub Pages repository root. Preserve the folder structure. No Supabase schema changes required. On iPhone, reopen the Home Screen app to check for updates. Do not clear site data or delete the installed app unless you have verified cloud sync and backup.

## Technical notes
Background selection, favorites and dimming are stored in localStorage on each device. No credentials or cloud records are cleared. Background SVGs are bundled; images are cached as requested by the service worker. This build was syntax-checked but has not been live-tested on your phone or against your Supabase account.
