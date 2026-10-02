Build my personal portfolio. My name is Saheem Nakhwa.

I have attached my resume and photo. Read the resume before writing content and inspect the photo before creating any personalized character. If either attachment is inaccessible, tell me clearly.

Complete PHASE 1 in this turn. The full vision below gives you context for later phases.

FIRST ACTIONS
1. Inspect the current workspace and any existing project instructions.
2. If there is an existing app, preserve its conventions and useful work.
3. If starting from an empty workspace, initialize the stack below.
4. Create PORTFOLIO_BRIEF.md documenting these requirements and a phase checklist so subsequent tasks retain the direction.
5. Implement Phase 1, run it locally, and verify the result.

TECH STACK
- React + TypeScript + Vite.
- Tailwind CSS plus custom CSS for the retro visual design.
- Motion for React for purposeful interface animations.
- Selected React Bits components where appropriate.
- HTML Canvas with TypeScript for the game in a later phase.
- Transparent character sprite assets for the animated companion later.
- Central typed data files for portfolio content.
- localStorage for preferences and high scores later.
- A cached serverless endpoint for GitHub data later if needed.
- No database or full backend server unless a concrete requirement needs one.
Check current official documentation when configuring dependencies.

CREATIVE DIRECTION
I want a unique, nerdy, gaming-themed portfolio with an impressive first screen and professional, readable content.

Theme: dark retro arcade + developer terminal.
Use near-black backgrounds, charcoal surfaces, warm off-white text, mint accents, and restrained lavender highlights.
Use pixel-style fonts for short headings and readable fonts for body text.
Create intentional spacing, crisp borders, subtle pixel details, and a cohesive visual identity.

Avoid:
- Generic SaaS landing-page styling.
- Excessive glowing effects.
- Random gradients and decorative cards everywhere.
- Tiny unreadable text.
- Long loading intros.
- Fake skill percentages, stats, testimonials, and achievements.
- Emojis and em dashes in portfolio copy.

REFERENCES
https://anubhavchoubey.com/
Inspect the small animated face in the top-right and the speech bubble beside it. This is the reference for how my navbar companion should feel. Create original artwork and styling for me.

https://reactbits.dev/
Inspect the official catalog and use suitable components selectively. Decrypted Text and Pixel Transition are possible candidates. Match effects to the design rather than adding many unrelated animations.
If you cannot inspect a reference, disclose that and proceed using this written brief.

PAGE STRUCTURE

1. STICKY HORIZONTAL NAVBAR
- Left: Saheem or an original SN monogram.
- Middle: About, Experience, Projects, Activity, Contact.
- Right: Terminal button and a reserved space for my animated face.
- Compact mobile navigation.
- No desktop sidebar.

2. HERO
Desktop split: approximately 55% introduction and 45% game.

LEFT:
- A small introductory label.
- My name as the dominant heading.
- Full-stack developer positioning grounded in my resume.
- A concise two- or three-line summary.
- Primary buttons: Hire Me and Resume.
- Secondary GitHub, LinkedIn, and LeetCode links.
- Hire Me scrolls to contact.
- Resume opens the attached PDF with an accessible download option.

RIGHT:
A custom retro arcade window reserved for my playable game.
For Phase 1, build a visually polished static preview containing:
- A maze.
- A clearly temporary player icon.
- Sleep collectibles represented by Zzz.
- Two visually distinct enemies: College and Procrastination.
- A short instruction line.
- A clearly labeled “Game coming in Phase 3” state.
Do not display controls that pretend gameplay is already functional.

Do not place a large portrait on the right. That space belongs to the game.

3. ABOUT
A short personal introduction using accurate resume information, with room for my interest in coding, DSA, and building useful applications.

4. EXPERIENCE
Use the actual roles and dates from my resume, including Royal Consultants, Emirates Solutions, and freelance development.
Explain contributions clearly without inventing quantified results.

5. PROJECTS
Feature Instagram Clone and Urban Tracker using the resume.
Each project card should contain:
- Title.
- Short explanation of the problem and solution.
- Main features and my contribution.
- Technology tags.
- Repository and demo links only when supplied or verified.
- An actual screenshot when available.

If screenshots are unavailable, use a deliberate themed visual labeled as a preview placeholder. Do not fabricate a screenshot and imply it is the real app.

6. SKILLS
Group actual skills into frontend, backend, databases, languages, AI/ML, and tools.
No percentage bars.
Prioritize the skills most relevant to my projects.

7. ACHIEVEMENTS AND EDUCATION
Use the exact supplied information. Keep these sections compact and visually consistent.

8. CODING ACTIVITY
Prepare a styled container for my GitHub contribution heatmap.
GitHub username: saheemOlogN.
For this phase, show an honest pending-integration state and a working profile link.
Do not generate fake contribution data.

9. CONTACT
A clear invitation to discuss work or projects.
Use my email from the resume and these profile links:
GitHub: https://github.com/saheemOlogN
LinkedIn: https://www.linkedin.com/in/saheemnakhwa/
LeetCode: https://leetcode.com/u/xiaowarma/

Do not publicly display my phone number.

FULL INTERACTIVE VISION FOR LATER PHASES

NAVBAR COMPANION
A personalized cartoon/pixel face based on my attached photo.
Small face at the far right, with a speech bubble extending left.
Gentle continuous idle motion, blinking, talking, and contextual expressions.
Special animations: sleepy, curious, annoyed, celebration, Gear 5-inspired, and “67.”
It reacts to the terminal, portfolio sections, and game events.
Use a consistent identity across the companion and game.
In Phase 1, reserve the space and use a clearly identified temporary asset if final artwork is not available. Do not claim the character is finished.

GAME
My character follows cursor-directed paths through the maze.
Collect sleep points.
Escape College and Procrastination.
Respect maze walls.
Add keyboard and mobile controls.
Play, pause, restart, score, and locally saved high score.
A temporary Gear 5-inspired power-up provides protection.
The game pauses when off-screen or when the terminal opens.

TERMINAL
The navbar Terminal button opens a centered CLI-style dialog.
Commands eventually include:
help, whoami, skills, experience, projects, github, contact,
resume, play, clear, exit.
Hidden commands: gear5 and 67.
It is a portfolio interface, not a real system shell.

In Phase 1, implement a small accessible terminal dialog with
working help, whoami, and exit commands.
Clearly identify the remaining commands as planned.
Support Escape, focus trapping, and focus restoration.

PHASE 1 QUALITY REQUIREMENTS
- Build the whole responsive content foundation.
- Make the first screen feel deliberately designed and memorable.
- Use subtle animation without delaying readable content.
- Ensure every visible active control works.
- Respect reduced-motion preferences.
- Keep important content accessible by keyboard.
- Avoid horizontal page overflow.
- Use semantic headings and visible focus states.
- Keep images and fonts efficient.
- Do not deploy yet.

VALIDATION
Run the production build.
If browser tools are available, inspect the actual page at desktop and mobile widths and fix visual defects.
Check navigation, resume access, contact links, and terminal opening/closing.
Report anything you could not verify instead of claiming it passed.

Finish with:
1. What Phase 1 implemented.
2. How to open the local preview.
3. Any missing assets or content.
4. What remains for the next phase.

Proceed with implementation, not just a proposed plan.
## Implementation record and phase checklist

### Phase 1
- [x] Empty workspace inspected; no existing app or AGENTS.md found.
- [x] Resume read, embedded project links extracted, supplied photo inspected.
- [x] React + TypeScript + Vite, Tailwind CSS, Motion for React installed.
- [x] Whole responsive content foundation, sticky horizontal navbar and mobile menu.
- [x] Split hero, static Sleep Quest maze, explicit Phase 3 state; no pretend gameplay controls.
- [x] Resume view/download, mail contact, supplied social links, project repository links.
- [x] Typed centralized content in src/data.ts; actual roles, dates, education and achievements.
- [x] Clearly labeled project screenshot placeholders and pending GitHub integration.
- [x] Accessible native terminal dialog: help, whoami, exit, Escape, trapped/restored focus.
- [x] Reduced-motion support, skip link, visible focus and semantic headings.
- [x] Production build and desktop/mobile browser checks.
- [x] Local-only preview; no deployment.

### Suggested Phase 2
- [ ] Original transparent companion assets based on reference/saheem-photo.png; replace temporary SN tile.
- [ ] Idle, blink, talking and contextual expression states, speech bubble extending left.
- [ ] Expanded terminal commands and hidden gear5 / 67 interactions.
- [ ] Actual project screenshots when supplied and verified demos if available.
- [ ] GitHub contribution integration, optional cached serverless endpoint if needed.

### Phase 3
- [ ] TypeScript Canvas maze, wall collision and cursor-directed paths.
- [ ] Keyboard and mobile controls; College and Procrastination enemies; Zzz collectibles.
- [ ] Play, pause, restart, score, local high score, temporary Gear 5-inspired protection.
- [ ] Pause off-screen or while terminal opens; consistent companion/game identity.

### Sources and decisions
- Resume remains unmodified in public/Saheem_Nakhwa_Resume.pdf. Website copy does not display a phone number. The attached PDF already has a masked phone contact in its header.
- User-supplied LinkedIn URL takes precedence over the different link embedded in the PDF.
- Repository URLs came from PDF hyperlink annotations; no demo URLs supplied.
- Photo is retained outside public assets for later character work. Phase 1 does not create a personalized character.
- Anubhav Choubey reference visually inspected: compact face at right and speech bubble to its left. No artwork copied.
- React Bits Decrypted Text retrieved from official source, license retained. Modified screen-reader span to expose original stable text and remove visibility:hidden; reduced-motion bypass at caller.
- Official Vite, Tailwind Vite plugin, Motion React and React Bits documentation consulted during configuration.

## October 1 hero art-direction update
The original Phase 1 visual placeholders in the navbar/hero are superseded. See docs/HERO_REDESIGN.md for implementation, image-generation prompts, asset paths, integration hooks and verification.
- [x] Personalized static face asset integrated; animated expression states remain future work.
- [x] Midnight pixel-city background, subtle pointer-responsive depth, touch/reduced-motion guards.
- [x] Exact revised copy, pixel name typography, slim navbar, dominant maze, compact Coming soon state.
- [x] Original College book and Procrastination ghost icons; original maze geometry retained.
- [x] Selected React Bits heading/button/project effects with motion preference support.
- [x] Production build and desktop/mobile checks, screenshots saved.

## Cartoon artwork correction
The photo-like pixel portrait is superseded by a drawn cartoon character and nine transparent expression states. See docs/CHARACTER_ART.md. Navbar and maze share the neutral identity; blinking/talking respect reduced motion. Full gameplay reactions remain later work.

## October 1, 2026: lower-page completion (current status)
This record supersedes older placeholder and phase-status notes above. Preserve the hero, skyline and cartoon identity in future work.

- [x] About with verified introduction and four interactive illustrated interests.
- [x] Expandable experience timeline: company, role and dates always visible.
- [x] Large alternating project showcases, accessible detail dialogs, focus trapping/restoration and short pixel transitions.
- [x] Verified Urban Tracker public demo and actual sign-in screenshot. Instagram Clone uses an explicitly labeled concept illustration; no screenshot or demo invented.
- [x] Skill inventory with category filters, local technology icons and visible selected/focus states.
- [x] Accurate trophy shelf and education; once-per-visit proud companion reaction.
- [x] Real GitHub contribution calendar, month labels, legend, keyboard day exploration, refresh and retrieval timestamp. Public token-free API; no browser credentials. Honest saved-snapshot fallback.
- [x] Contact email, copy confirmation, socials, resume view/download and once-per-visit farewell reaction. No phone number on page.
- [x] Terminal commands help, whoami, skills, experience, projects, github, contact, resume, clear, exit plus gear5 and 67 reactions. Play truthfully explains current static status.
- [x] Consistent cartoon assets throughout; retired photo-like face moved out of public assets. Blink/talk timers stop off-screen and in hidden tabs, and respect reduced motion.
- [x] Production build passed. Desktop 1440 and mobile 390/320 checks, accessible dialogs, filters, timeline, copy confirmation and terminal interactions verified. Full-page screenshots in docs/portfolio-desktop.jpg and docs/portfolio-mobile.jpg.
- [x] No deployment.

Remaining: Sleep Quest was still a static SVG maze when this pass began, not a working game. Its structure and artwork are preserved; full gameplay remains Phase 3. Instagram Clone needs an actual application screenshot. No certificate images were supplied, so no certificate-preview controls are offered. The cartoon expression assets are available; extended frame-by-frame gestures/game reactions remain future work.

See docs/PORTFOLIO_POLISH.md for sources, limitations and validation.

## October 1, 2026: facial animation and interaction pass

This supersedes the separate WebP-expression rendering implementation. The starting assets were individual static WebP images, not animated files or sprite sheets. The new Character.tsx is an original transparent layered SVG preserving dark swept curls, warm skin, clear glasses, face shape and facial hair. It is shared by navbar, maze preview and farewell.

### Implemented and verified
- Independently animated facial layers: blink/eye scale, gaze, mouth syllables, sleepy lids/yawn, smile cheeks/eyes/mouth, celebration bounce, white Gear 5-inspired hair/clouds, alternating hands for 67.
- Shared Companion.tsx state controller with temporary-state return, accessible controls (Idle, Smile, Talking, Sleepy, Celebration, Gear 5, 67, Pause/Resume), Escape, dismissible dialogue and automatic-message cooldown. Direct actions take priority over automatic comments.
- Terminal opens a curious face; project dialogs reveal project-specific dialogue with mouth cycling; achievement uses smile; terminal gear5/67 and future game-win event share the controller.
- Typewriter uses 75ms typing, 35ms deletion, 1800ms hold and 350ms next-phrase pause. Stable accessible label and reserved height. All four user-specified phrases.
- Removed hero technology strip and redundant Download résumé link. Main Resume and contact resume links remain.
- Compact About: interests sit below the heading on desktop. Original hat tip, knight L-step on tiny board, cube turn and football bounce, triggered by pointer/focus/tap with captions.
- Reused short pixel preview transition, added subtle pointer lift and accessible View project controls. Existing project dialogs preserved.
- Production build passed; desktop/mobile inspection and no horizontal overflow. No production console errors. Full-page images: docs/interactive-desktop.jpg and docs/interactive-mobile.jpg.

### Motion verification details
Browser controls exercised every expression, pause/resume, Escape and terminal/project events. Smile changed cheek opacity to .65 and mouth path; Talking displayed a time-varying mouth scale; sleepy showed lids and yawn animation; Gear 5 switched hair to #f4f0e6 and showed clouds; celebration used its short bounce. The 67 gesture was corrected after testing found both hands synchronized: final sampled left/right translations were +2.67px and -6.67px. Idle gaze samples changed from 0px to 2px. Blink uses a 4.6-second cycle with a brief eyelid-close interval; its exact blink timing was source-reviewed rather than captured as video.
Typewriter samples included AI/ML and C++ phrases; paragraph document Y stayed 392.8125px at desktop and 284.265625px at mobile across phrase changes. Menu controls were exercised at mobile size. Interest focus selected Chess, and click/tap controls exercised hat, cube and football. Project preview opens native details and relevant companion text; Escape closes it.

### Implemented but not verified with environment emulation
Reduced-motion renders the stable Full-Stack Developer role and disables decorative animation. Hidden-tab/off-screen character guards stop animation, and typewriter/dialogue timers stop advancing while hidden. These source paths were reviewed; OS reduced-motion and browser visibility emulation were not available in this test session. Touch-equivalent controls were clicked at mobile width, not tested on physical touch hardware. No recording capability was exposed, so screenshots are layout evidence only.

### Still unfinished / unavailable
- Sleep Quest is still a static SVG maze; no disconnected gameplay/collision/score implementation was found. Coming soon remains. game-win is an integration hook only, not a claim that the game works.
- Only the actual Urban Tracker login screenshot exists in available assets. No dashboard/complaint/facilities screenshots or multiple-image gallery could be added honestly. Login remains the lead image; add a real dashboard capture when supplied.
- Instagram Clone still has an explicitly labeled concept illustration, not a fabricated screenshot.
- No deployment performed.
