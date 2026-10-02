# Hero redesign, October 1, 2026

## Result
Focused navbar and hero redesign. Lower-page copy, central data, section links, resume, social links and terminal commands preserved. Projects receive a restrained one-time transition without content changes.

- Warm pixel display typography and exact requested hero copy.
- Original midnight-city illustration with two cursor-depth planes, maximum image travel 5px horizontally and 3px vertically; foreground at 1.7x / 1.3x.
- Movement disabled for coarse/touch pointers and reduced-motion preferences. Game surface ignores decorative pointer movement and resets the backdrop.
- Compact static maze retaining original 440 x 276 coordinates and wall path. Original pixel angry-book and sleepy-ghost icons. Shared generated face for player and navbar.
- Face-only companion and left-extending dialogue. Typed `portfolio:companion` event hook supports idle, terminal-open, terminal-close and game-preview; expression animation and gameplay remain future work.
- React Bits DecryptedText for the name, adapted ClickSpark square feedback on primary links only, adapted FadeContent for projects using existing Motion rather than adding GSAP. License retained. Reduced-motion bypasses all three; touch still has native button press feedback.

## Art assets
Built-in image_gen was used, not API/CLI fallback. Supplied photograph inspected before generation. Transparency verified on the face output. Optimized WebP assets used by the app:
- `public/art/saheem-face.webp` (192 x 192, 37.6 KB, alpha)
- `public/art/midnight-city.webp` (1536 x 1024, 76 KB)
Original generated PNGs preserved in `reference/` (ignored, not served).

### Face prompt
Use case: stylized-concept. Create a single original pixel-art face-only avatar for a personal developer portfolio navbar, based faithfully on the supplied photograph of Saheem. Preserve recognizable features: thick voluminous wavy black hair, clear rectangular glasses, medium warm brown skin, slim face, slight moustache and short narrow chin beard, friendly slight smile. Front-facing head only, no shoulders, no neck, no surrounding badge or box. Crisp deliberate 48x48-style pixel clusters enlarged with nearest-neighbor look, limited warm ivory/muted brown/near-black palette, restrained mint glints in glasses. Actual transparent background. Center head fills canvas with small transparent margins. No text, no other characters, no unrelated reference character.

### Background prompt
Use case: illustration-story. Asset type: wide background environment for a retro arcade developer portfolio hero. Original crisp pixel art, panoramic 3:2 or wider composition. A quiet midnight urban rooftop overlooking layered distant apartment silhouettes. Dark ink navy charcoal sky, desaturated indigo building silhouettes, a few tiny warm amber and pale mint lit windows. Sparse architectural rooftop antennas and a small crescent moon in upper right. Foreground low rooftop ledge runs along very bottom. Top and left 60 percent primarily quiet dark negative space so ivory text can overlay; right center similarly uncluttered for an arcade maze overlay. Depth through 3 planes, subtle atmosphere without blur or neon glow. Restrained 16-bit pixel clusters, coherent authored scene, not random decorative icons or particles. No people, no text, no UI, no borders, no computer mockup, no large gradients. Mostly very dark values with readable understated skyline detail in bottom third.

## Validation
- Production TypeScript/Vite build passed.
- Desktop 1440 x 900: full hero ends at approximately 715px, including full maze and primary buttons.
- Mobile 390px and narrow 320px: no horizontal document overflow, readable stacked layout, face visible.
- Terminal whoami, Tab focus trap, Escape and restored opener focus verified after redesign.
- Mobile menu and Projects navigation verified. Resume and new art routes return HTTP 200; original PDF and link destinations preserved.
- Cursor response verified in browser from computed transforms; game entry resets depth and updates dialogue.
- Reduced-motion and coarse-pointer guards inspected in source; OS preference emulation not available in browser API, so not claimed as exercised.
- Earlier transient Vite reload error occurred while component files were being authored; final build succeeds and completed UI renders.
- Screenshots: `docs/hero-desktop.png`, `docs/hero-mobile.png`.
- No deployment, gameplay implementation, GitHub integration or full character animation performed.

Reference inspected: https://anubhavchoubey.com/ . React Bits sources: https://github.com/DavidHDev/react-bits . No reference artwork copied.
