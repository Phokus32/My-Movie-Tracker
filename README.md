# Blackwood Movie Log V6.0

Upgrade your EXISTING GitHub Pages repository. Upload all files and both asset folders. Do not create a new Supabase project or import your historical CSV again if you have already imported it.

## New in V6.0
- 40 achievement paths, 8 levels each, unique category monogram medallions, responsive progress and filters.
- Dedicated Horrorfest and Christmas Fest navigation, annual/all-time statistics, poster galleries and top rated films. Eligibility uses viewing START date and seasonal tags/classification.
- Seasonal movie frame options under Settings.
- Year in Review deduplicates highest-rated movies within each year, shows posters and opens Movie Details.
- TMDB UNVERIFIED badge only when the numeric TMDB ID is missing or invalid.
- Data Health missing TMDB ID summary.
- Header and offline service worker cache updated to V6.0.

## Safeguards
1. Export JSON backup from Settings before deploying.
2. Upload extracted files into your current GitHub Pages repository. Keep `themes/` and `backgrounds/` directories.
3. Wait for GitHub Pages Actions deployment, then reload and confirm Version 6.0.
4. Verify Supabase is connected. 'Saved on this device' means cloud sync has not been confirmed.
5. Do not repeat historical CSV import if it already succeeded.

## Notes
Achievements calculate from completed viewings; counts rely on available genres and seasonal tags. Individual achievement medallions use unique initials per category; more elaborate bespoke illustrations can be added in a future release. Frame decorations are CSS border designs. Browser/Supabase live testing is still needed.
