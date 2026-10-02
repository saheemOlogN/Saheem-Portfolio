# Portfolio polish record

Completed October 1, 2026. Local only; no deployment.

## Implementation

Lower sections live in src/components/Portfolio.tsx and Portfolio.css, reusing src/data.ts, FadeContent, Character and the existing portfolio:companion event. Hero layout, skyline, maze geometry and navigation were preserved. Activity.tsx owns contribution fetching and keyboard navigation. Terminal commands reuse the same content data.

The navy/ivory presentation uses distinct prose, timeline, alternating project, inventory, trophy and closing layouts. Essential information is visible without hover. Dialogs use native showModal, named close buttons, Escape, forward/reverse Tab wrapping and opener restoration. Reduced-motion rules suppress decorative transitions. Section reveals and achievement/farewell messages run once per mount; character timers stop off-screen or when the document is hidden.

## Verified content and assets

- Resume-based roles, dates, achievements, education and project claims remain centralized in src/data.ts.
- GitHub repositories verified: https://github.com/saheemOlogN/Instagram-Clone and https://github.com/saheemOlogN/Urban-Tracker .
- Urban Tracker repository homepage points to https://urban-tracker-vcdu.vercel.app . Public login screen was inspected and captured to public/art/projects/urban-tracker-login.png. Authentication-only screens were not accessed. The caption identifies the sign-in screen and account requirement.
- Instagram Clone had no verified application screenshot or live demo. Its original SVG concept illustration is explicitly identified as such.
- Technology icons: Simple Icons, https://github.com/simple-icons/simple-icons . Local SVG extraction script: docs/prepare-icons.mjs. CC0 license retained in public/icons/LICENSE.md. Brands remain their owners' trademarks.
- Existing cartoon expression assets are reused, not replaced by photographic cutouts. Retired photo-like asset is outside public in reference/character/retired-photo-like.webp.

## GitHub data

Public endpoint: https://github-contributions-api.jogruber.de/v4/saheemOlogN?y=last . Documentation: https://github.com/grubersjoe/github-contributions-api . No access token is used or bundled. The service caches upstream responses for up to one hour. The page shows the returned date range, summed real contributions, and last retrieval time; this is not a claim that upstream data updates in real time.

public/data/github-contributions.json contains an actual retrieved snapshot with its original timestamp. Live requests replace it when successful. Failure explicitly identifies the saved snapshot; failure without valid saved data presents an unavailable message and GitHub profile/retry controls. No LeetCode counts are inferred or combined.

## Validation

- npm run build passed (TypeScript and Vite production output).
- Production preview tested at http://127.0.0.1:4173/ .
- Inspected complete desktop at 1440 x 1000 and mobile at 390 x 844; 320 x 740 checked for document overflow. No horizontal page overflow or broken loaded images found. Heatmap scrolls within its own region on narrow screens.
- Interest selection, timeline expansion, skill category count/selection, project details, dialog focus wrap and Escape restoration, copy-email success confirmation, heatmap arrow navigation, mobile menu and terminal commands checked in browser.
- Terminal skills/clear and Gear 5 reaction worked; existing help/whoami/exit behavior retained. Native terminal Escape restores opener focus.
- No production-page console errors observed. The development preview had Vite websocket connection errors in the browser tool; production checks exclude those old development logs.
- Reduced-motion and off-screen guards inspected in source; OS preference emulation was not performed.
- Full-page screenshots: portfolio-desktop.jpg and portfolio-mobile.jpg.

## Explicit limitations

Sleep Quest was a static preview before this pass and remains one; gameplay cannot be regression-tested as working. Full game/extended character gestures are future work. An Instagram Clone screenshot and certificate assets are unavailable. No certificate or fabricated demo controls were added.

Lint completed with no errors and eight warnings (render-time year, Fast Refresh mixed exports, and state-reset effects in existing animation components). Final production build passed after removing a contact-image drop-shadow that rendered inconsistently in the browser. Production console had no errors.
