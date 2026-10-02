# Cartoon character correction

Generated with the built-in image_gen tool from the original photograph as a likeness reference. The new base is drawn cartoon art, not a filtered photo. Expression atlas derived only from the new base.

## Assets

- `public/art/character/neutral.webp` is shared by the navbar and maze player.
- Nine equal 192 x 192 transparent frames: neutral, blinking, talking, smiling, sleepy, annoyed, celebrating, gear5, 67.
- `public/art/character/manifest.json` lists every path. Atlas cells extracted without independent trimming to retain their shared anchor and proportions. Generated art has slight natural drawing variation; it is not a hand-registered production animation rig.
- Original base and atlas retained under `reference/character/`.
- Preview contact sheet: `docs/character-expressions.png`. Row-major order matches the list above.

## Integration

`Character.tsx` implements reduced-motion-aware blinking and talking. Existing terminal events select talking/smiling; maze hover selects sleepy. Every expression is addressable through `signalCompanion(state)` with the existing typed event hook. Celebrating, annoyed, Gear 5-inspired and 67 are prepared assets/hooks; full gameplay triggers are not implemented. The maze remains static.

Build passed. Browser confirmed the new shared asset loads, old photo-like asset is no longer referenced, terminal opens and selects talking. Equal canvas dimensions and transparent alpha verified during extraction.

## Base prompt

Create ORIGINAL DRAWN cartoon retro-game avatar HEAD ONLY on transparent background. Supplied photo is ONLY a likeness reference, NOT source pixels. Radically simplify into a cute expressive 2D game mascot: large simple eyes, clear thick eyebrows, small readable smile, slim rounded angular face, warm medium-brown skin, clear pale rectangular glasses, big tousled wavy black hair represented by just 5 chunky locks, thin moustache and tiny chin beard. Thick clean near-black outline, only 8 flat colors, one flat shadow tone. A hand-drawn chibi cartoon with a few stepped pixel-art corners, NOT a portrait rendering. NO photographic texture, NO realistic skin, NO fine hair strands, NO photo cutout, NO pixelation filter, NO dithering, NO glossy realistic lighting. Strong silhouette and broad shapes readable at 48px navbar size. Front facing, perfectly upright, symmetrical eye level, head centered on square canvas, head occupies 75% width and 80% height, fixed generous margins for later gestures. No neck/body/hands in this neutral base. Friendly neutral closed mouth. No text or decorations. Actual alpha transparency.

## Expression atlas prompt

Create production character expression SPRITE ATLAS from this exact supplied CARTOON base, not from any photograph. Actual transparent background. Square 1536x1536 canvas, exactly 3 columns by 3 rows of equal 512x512 cells, no gutters, NO labels, NO borders, NO text other than 67 gesture numerals if needed. Nine heads: row 1 neutral, blinking (both eyes shut), talking (small open mouth); row 2 smiling (happy grin), sleepy (drooping lids), annoyed (angled brows); row 3 celebrating (joyful eyes and two small raised hands), Gear 5-inspired (same face/glasses/brown skin/facial hair, whimsical white cloud-like hair, laughing mouth, tiny white curls), '67' (same black-haired head, playful raised brows, two small hands palms up in alternating-height shrug, small 6 above left palm and 7 above right palm). Draw EXACT SAME ORIGINAL CHARACTER in every cell. Preserve base hair silhouette except white-haired state, glasses, facial proportions, skin, moustache and chin beard. Clean simple 2D cartoon, thick outline, broad flat shading, limited colors, no photographic texture. Every head exactly same size, upright front-facing, center x at 256 within its cell, hair top y=65, chin y=445, eyes center y=280, head width=330 pixels; keep these landmarks consistent so frames can swap without jump. Hands within same cell and never beyond margins. One complete head per cell, no bodies/necks. No photorealism, no pixelation filter. All blank area truly alpha transparent.
