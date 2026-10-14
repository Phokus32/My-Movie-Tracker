# Blackwood Movie Log V7.2

Hotfix for V7.1 navigation and Goals & Achievements. The V7.1 patch was accidentally appended outside the application JavaScript closure, so its changes were not executed. V7.2 moves the patch into the application scope and updates the PWA cache key.

## Installation

1. Export your current library as JSON before updating.
2. Upload all website files from this folder to your existing GitHub Pages repository (do not upload historical CSVs).
3. Wait for deployment, then refresh the site. Check Version 7.2.
4. Check Goals & Achievements, Dashboard calendar/heatmap, Collections franchise link, Statistics timeline link and movie posters.

This build has static JavaScript and package checks but has not been tested with your live library or Supabase account.
