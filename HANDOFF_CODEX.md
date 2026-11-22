# HANDOFF — FIIP Studio website (for Codex)

**Date:** 2026-11-17 · **Repo:** `/home/fiipadmin/workspace/fiip_studio` (this directory)
**Stack:** Next 16.4.6 · React 19 · Tailwind v4 · framer-motion 12 · three 0.187
**Production (Vercel):** `fixitinpost.in` — Audit fixes commit `8f0776c` published on 2026-11-19. Vercel reports Ready and assigns both apex and www domains.

Read this whole file before touching code. Then confirm the plan in one short message and start.

---

## ⚡⚡⚡⚡⚡⚡ LATEST — 22 Nov 2026 (`025d707`, `db13e0d`, live). Codex: your shorter-hero change was kept.
- **Comfy Cloud is gone** (subscription cancelled by the user; credits exhausted). Use the studio's Magnific workflows (frames MCP: edit_image, run_magnific_*) for generation. Topaz: run locally on ws03 (`scripts/topaz-upscale.sh`, `scripts/topaz-interpolate.sh`). ws03 drops off Tailscale at times.
- **Hero** (`components/ScrollShot.tsx`): ONE hold now (Depth, Geometry, Normals, Clay at frame 150), then the shot continues and the headline/CTAs land at the end as a handoff. Height = `--stage-h` (locked from JS) × 6.5 desktop / 5.5 mobile, i.e. your shortened length. Per-frame work writes to the DOM; frames are ImageBitmaps. Sequence = 384 frames from the Topaz 4K master, in a VERSIONED folder `public/sequences/shot-YYYYMMDD…` (immutable cache header) built by `scripts/build-hero-sequence.py <video> <holdFrame> <passesDir>`. Mobile measured at a steady 16.7 ms/frame; desktop is fine in medians, but headless Chromium has no GPU, so check on real hardware.
- **AI passes were evaluated and rejected**: GPT-Image 2.6 / Nano Banana Pro repaint the scene 25–130 px off the frame (see `scripts/select-passes.py`, `design/cinematic-v3/v4/`). The shipped passes are frame-accurate procedural ones. UV and Object ID were dropped as weak.
- **Design consistency**: Work and Commissioning rebuilt in the editorial system. Commissioning's unverified claims (turnarounds, unlimited, SLA, 24h bids) were removed; `data/pricing.json` is now unused. Nav is square and full-bleed (glass frame disabled on `.glass-nav`). Mnemonics rebuilt: SMIL-only, `shape="square|wide|tall"`.
- **Legal/SEO**: /privacy and /terms (verified facts only), custom 404, self-hosted fonts in `public/fonts` (no Google requests), youtube-nocookie, Organization JSON-LD, `/og/fiip-og.jpg` 1200×630, dated sitemap, security headers in next.config.js.
- **Waiting on the user**: (1) sign-off on the page-hero concepts in `design/page-heroes/CONCEPTS.md`; (2) the registered legal entity name, address and GSTIN for /privacy, /terms and the JSON-LD; (3) whether the brand is "Fix It In Post Studio" or "Studios" (content says Studio, logo says Studios).

## ⚡⚡⚡⚡⚡ LATEST — portraits v5 (`2a63d53`, live)
User: Balaji Sripathi should look more like his reference, Shivraj trimmed and toned down, Sri Karthik "really bad". Fix: three-panel refs (`refs4/`: tight face crop + original + template) and per-person notes in `design/portraits/studio-v3/cand4.py`. 27 candidates; ArcFace picks: Balaji Sripathi 0.885 (was 0.797), Sri Karthik 0.666 (was 0.554), Shivraj 0.735 (trimmed look chosen on purpose; the bushier older candidates are in `out_superseded/`). Exposure re-matched across all 11 → `*-studio-v5.webp`. gpt-image-2 rejects size 1024x1280 (unbilled).

## (previous) portraits v4 + Balaji D (`ec2614f`)
User: Ganesh overexposed; Balaji (Sripathi) and Shivraj "off"; supplied Balaji D photo (`public/images/team/balaji-d-reference.jpg`).
- 4 Nano Banana Pro candidates per flagged person (`design/portraits/studio-v3/cand.py`), scored by ArcFace identity similarity vs the real photo (`scripts/score-portraits.py`). Winners: Ganesh 0.786, Balaji Sripathi 0.797, Shivraj 0.762, Balaji D 0.796. The same script normalises face-region exposure across all 11 (Ganesh face median was 136 vs set 94). Then `scripts/align-portraits.py`. Live files: `*-studio-v4.webp`; all 11 people now have portraits.
- Weakest identity score: **Sri Karthik 0.554**. His reference is a seated, side-lit candid. Consider asking the user for a frontal photo or generating candidates.

## ⚡⚡⚡ NEWEST — Claude, 21 Nov 2026 night (`ec44a06`, live)

User feedback: the scroll needs to be smoother (they asked for Topaz in-betweens), and the pass plates, Object ID especially, were weak, so regenerate them, cross-compare, and only use what is agreed.
- **Smoothness**: `scripts/topaz-interpolate.sh <src> <out.mov> apo-8 96` runs Topaz `tvai_fi` (Apollo) on fiip-ws03 over SSH, like the studio's topaz_upscale.sh. The "Unable to parse option value 0" lines are harmless. Master: `design/cinematic-v3/out/shot-apo8-96.mov` (1541 frames, git-ignored). The sequence is now 384 frames (desktop 1440w q62 = 22 MB, mobile 720w q58 = 7 MB). ScrollShot blends neighbouring frames at fractional positions and eases the displayed scroll position (lerp 0.16 per rAF).
- **Passes** (`scripts/procedural-passes.py`, run with the hermes venv python `-I`; system python lacks cv2 under -I):
  - Depth = median of 12 estimates (Depth Anything V2 Small+Base ONNX in `~/.cache/fiip-models/`, 3 scales, mirrored), scale/shift-aligned, trust-weighted by MAD, guided-filtered.
  - Normals/clay are from the back-projected depth.
  - Object ID = AI voters (Nano Banana Pro, GPT-Image-2, Nano Banana 2, Flux Kontext Max) generated from the exact hold frame. They are gated on flat-colour share (>0.8) and skyline registration (affine ECC on sky masks, IoU >0.88). Kontext is rejected every time because it returns a recoloured photo. The consensus is the medoid voter by mean adjusted Rand index, with edges snapped to the frame by a guided filter. UV = one planar island per ID object. Wire is seeded on ID boundaries.
  - Rebuild: see the `--voters` usage in `scripts/build-scroll-shot.py`. Voter maps are in `design/cinematic-v3/ids/` (git-ignored); the submit scripts are committed.
- Comfy helper moved to `~/.cache/fiip-tools/fiip_comfy.py` (+ `batch_wait.py`, `route_check.py`), because /tmp gets wiped.
- Possible next: Safari/iOS scroll test on a real device; lighter desktop sequence (AVIF) if load time is a concern.

---

## ⚡⚡ NEWEST — Claude, 21 Nov 2026 evening (supersedes the section below where they differ)

Published: `3c6bc37` (cinematic pass, Vercel `dpl_BryyFQWx49jLT1EMGpE2rZr3eWei` Ready) and `f9ada46` (mnemonics + team order). User iterates from their phone, so keep publishing increments.

Done and live:
- **Team order** (user request): roster Iniyavan, Venkat, Ganesh, Udhay, Koushik, Sanjay, Ahilendra ("Akhil" = Ahilendra, unconfirmed). Collaborators: Sri Karthik, Balaji D, Balaji Sripathi, Shivraj.
- **Mnemonics**: `components/Mnemonic.tsx` + `.mn-*` CSS in globals.css. Procedural animated SVG line loops (transparent, about 2 KB) for editorial/vfx/colour/conform/generative/review/archive/contact/studio. Placed on homepage craft rows, /services rows + intro, /about, /contact, /frames, /pricing, /portfolio. They pause offscreen and freeze under reduced motion. The user asked for "GIF with alpha". SVG was chosen instead and the user was told why.

Also live now (`f18fa94`, verified on fixitinpost.in):
- **Portraits v3**: Nano Banana Pro, one input image per person = a side-by-side of [their photo | grey bust template at `design/portraits/studio-v3/template.png`]. The model only accepts one image, which is why they're combined. Then `scripts/align-portraits.py` locks the eye line and scale (1200×1500 canvas). Roll is ≤2° on all 10 (was up to 9°). Web files: `public/images/team/<slug>-studio-v3.webp`. Balaji D still has no photo.
- **Scroll hero**: `components/ScrollShot.tsx` replaces CinematicHero + ShotBreakdown on the homepage (both files kept, unused). Shot = Seedance 2.0 first/last-frame (lens → plate, 6 s) + Seedance 2.5 i2v (plate push, 10 s), joined to `design/cinematic-v3/out/shot-full.mp4` (git-ignored). The sequence was built with `python3 -I scripts/build-scroll-shot.py design/cinematic-v3/out/shot-full.mp4 --holds 0.38,0.93 --frames 168 --titles "Frame 1 · The world|Frame 2 · The portal"`. It is 13 MB desktop / 5.4 MB mobile, loaded coarse-to-fine. Passes are procedural from the held frame (Depth Anything V2 ONNX at `~/.cache/fiip-models/da2s.onnx`).
- Ideas for later: lighter sequence (AVIF, or fewer frames on mobile); a Frames-feature film in the same style; offer an export of the mnemonics as GIF/WebM for socials.
- Gotcha: the global rule `main section > div:not(.absolute):not(.fixed):not(.sticky)` bit twice today. Any positioned wrapper must carry the matching utility class.

---

## ⚡ LATEST — Claude takeover, 21 Nov 2026 (read this first, Codex)

Codex hit its usage limit at 15:36 IST mid-way through the user's 21 Nov request (Comfy Cloud portraits + "inside the shot" cinematic hero + full Frames overview page). Claude picked it up. **State: everything built and verified locally, NOT committed, NOT pushed, NOT deployed.** The user has not yet said "publish" for this pass. Ask before pushing (pushing `main` auto-deploys to fixitinpost.in via Vercel Git).

**1. Team portraits (done).** Codex's v2 Comfy batch (gpt-image-2 edits, one shared studio spec) completed: 10/10. Reference-vs-generated sheet checked, and likeness/consistency is good. Web files: `public/images/team/<slug>-studio-v2.webp` (800×1000). Masters + prompts: `design/portraits/studio-v2/` (PNGs git-ignored). `content/studio.json` now points all 10 people at `-studio-v2.webp`; `npm run sync:content` was run. Balaji D still has no reference photo (initials).

**2. Cinematic hero (done).** Plate `observatory-final` (from Codex's batch) plus 6 passes generated by Claude via Comfy (user approved spend): lens, splat, wire, clay, normal, uv. Batch files: `design/cinematic-v2/batch-passes-*.json`. Web stills: `public/images/cinematic/observatory-*.webp`. Hero film is a HyperFrames project at `design/cinematic-v2/film/` (`compositions/shot.html`, 20 s: lens push 0–4, splat 4–8, wire/clay/normal/uv wipes 8–16, final 16–20, fade to black for loop). Master render: `design/cinematic-v2/out/inside-the-shot-master.mp4` (git-ignored via `out/`). Web encode is `public/videos/fiip-inside-the-shot.mp4` (1600w, CRF 27, 2.7 MB, no audio, faststart). Re-render: `HYPERFRAMES_CACHE_DIR=~/.hf-cache node ~/.claude/skills/hyperframes/scripts/plugin-cli.mjs render` inside `film/` (the shared default cache dir is group-writable and is refused).
   - Passes are AI-generated so registration with the final is close, not pixel-exact. The wipes hide most of the drift. A real 3D/Blender pass set would be the upgrade.

**3. Components (Codex wrote them, Claude fixed them).** `CinematicHero.tsx`, `ShotBreakdown.tsx` (added a 6th "Splat reconstruction" tab), `FramesExperience.tsx` (homepage compact + `/frames` full). Fixes: `findLastIndex` TS error (lib target) replaced with a reduce; `.cinema-transport` needed the `absolute` class because the documented `main section > div:not(.absolute)` rule was pushing it into flow and over the hero buttons (same bug class as Pass 1); hero h1/padding tightened; mobile `.cinema-shade` now matches the picture box (no hard edge); text-shadow for copy over the image.

**4. Verification.** `npm run build` exit 0, `tsc` clean, 10 routes static. Playwright checks at 1440×900, 1280×720, 1920×1080 and 390×844: zero page/console errors, zero ≥400 responses, no horizontal overflow, no broken images. Hero video autoplays and advances. Reduced-motion shows the poster. Hero action-to-chapter-bar clearance is 176 px at 1440×900 and 119 px at 390. Screenshots inspected: home hero, breakdown, /frames, /about roster. NOT checked: Axe pass, real Safari/iOS playback, FramesExperience interactions beyond render.

**Next for Codex:** (a) get the user's go-ahead, then commit ("feat: cinematic inside-the-shot hero, studio-v2 portraits, Frames overview") and push. (b) Run Axe and test FramesExperience interactions (wipe slider, note add/resolve, assign). (c) Optional: an iOS-safe smaller mobile video (~720w), and a Frames walkthrough film in the same HyperFrames style if the user wants one.

---

---

## Team portraits — 2026-11-20

User clarified that photos should be used as references for consistent generated portraits. Iniyavan, Sanjay and Venkat now have matching monochrome editorial portraits generated with the built-in image tool. Originals remain in `public/images/team/`; masters and exact prompts are in `design/portraits/`; web derivatives are `*-generated-v1.webp`. Source content was synced into `data/team.json`.

Iniyavan’s photo was reattached and processed on 2026-11-20. Three named reference photos are now available. Udhay’s previously reported photo still needs reattachment. Remaining roster portraits must use actual references.

Generated portrait source commit: `0ab63f7`. Deployment `dpl_7R2R95XHZsj3Ld36i6dMuhbfyvFE` reports Ready. Build passes; desktop/mobile profile captures inspected, no JS errors, failed portraits or overflow. Generated masters delivered to Telegram messages 736 and 737.

## Page-by-page audit — 2026-11-19

User requested a complete page-by-page check. Report: `design/audit/2026-11-19.md`; screenshot/JSON pack delivered to Telegram (message 697). All seven live pages reviewed at desktop/mobile widths, plus 320px overflow checks. Corrected local build has zero Axe violations, JS errors, failed resources or broken images across 14 route/viewport checks.

Fixed commissioning-to-contact scope handoff, route canonicals and metadata, heading order, selected button states, mobile navigation Escape/landscape scrolling, skip link and archive image loading. Source commit `8f0776c` deployed through the previously approved CLI workflow. Vercel Ready: `dpl_FQMbteZFB3vQFEi8bvfR83r5No7z`; https://fiip-studio-d997ar9sb-sysops-fiips-projects.vercel.app; apex/www aliases assigned. All seven production routes returned 200 with corrected canonicals and metadata after deployment.

Still open: real team photos; Galle/Picasso/Crime Patrol project video attribution; owner confirmation of pricing-card SLA/unlimited/schedule promises; URL-persistent archive filters; font performance and lint configuration. Do not describe YouTube playback, email delivery, authenticated Frames features or real-device browser coverage as fully tested.

## Production deployment — 2026-11-19

The user explicitly approved the authenticated CLI override (“Yeah go ahead”) after being told the handoff required MCP-only deployment. Deployment of source commit `23faf70` completed via Vercel CLI to the existing fiip-studio production project.

- Deployment: `dpl_NKHN53Cm8hhQ5viQ6L7hHWMMSnA7`
- Immutable URL: https://fiip-studio-8ik0yp5b3-sysops-fiips-projects.vercel.app
- Vercel inspection reports **Ready**, target **production**, build duration **24s**.
- Production aliases: https://fixitinpost.in and https://www.fixitinpost.in.
- Status and aliases were checked via `vercel inspect --wait`; no new production browser audit was performed in this deployment turn. Previous desktop/mobile validation remains recorded below.
- Team portraits still await real reference photos.

The following Pass 3 pre-deployment notes are historical; their connection blocker is resolved by the explicit CLI override above.

## Pass 3 — ready for publication, 2026-11-18

The user explicitly authorized completing and publishing this work: “Do it all,” followed by “keep it going and publish it at sompoint.” This supersedes the historical no-deploy instruction below. The MCP-only deployment method still applies.

- New image-led homepage, three selected projects, composed studio-reel cover, shorter editorial copy, discipline summaries, Frames preview and compact people section.
- Generated lens hero reference with responsive local WebPs. Optional lit 3D study loads Three.js and its GLB only on request, with keyboard controls and WebGL fallback. The Comfy-generated mesh failed visual QA; the shipped model is a clean reference-led reconstruction, reproducible with `node scripts/build-lens.mjs`.
- Dedicated `/frames` page and sitemap entry; simplified `/about` and `/services`; revised footer and mobile navigation breakpoint.
- Portraits await real reference photos. Seven staff and two collaborators retain styled initials. Identity-preserving portrait direction is saved in `design/pass3/PORTRAITS.md`.
- Contact now explicitly prepares an email draft instead of showing a false submission-success message. Removed unverified contact details from the revised contact page/footer. No backend or mail infrastructure changes.
- Fixed the existing Preethi archive thumbnail 404 with a working local asset.
- Build passes, TypeScript clean, all 11 routes prerender. Desktop/mobile route checks: no console errors, HTTP failures, broken loaded images or horizontal overflow. Showreel and lens dialog Escape/focus restoration checked. Reduced-motion default has no canvas. Final 3D framing and no-WebGL checks are recorded in `delivery/pass3/final-check.json`.
- Review assets and validation records: `delivery/pass3/` (ignored). Implementation/provenance and original lens reference: `design/pass3/`.
- Vercel target from `.vercel/repo.json`: project `fiip-studio`, `prj_2nI2HSLmTOFoN9tv9Uvl6Y3QZNEQ`, team `team_CTMriR7xexy5mswAMgIixehC`. Vercel integration was not connected in this session; connection was requested. Do not claim it is published or substitute a shell deploy.
- The Galle archive video points at a motion-graphics reel title card; excluded from the new homepage selection and documented for owner verification.

## Pass 2 completion — 2026-11-17

Pass 1 and Pass 2 are included in the commit containing this update. No deployment was performed.

- Replaced gapped iris polygons with nine swept sectors around a regular aperture; added per-blade material contrast and made shader fourth powers well-defined with absolute inputs.
- Narrowed front metal trim and reduced desktop/mobile lens scale; raised the mobile lens and added 48px before the discipline slate. Preserved the absolute-wrapper CSS exclusion.
- Contrary to the original handoff, `public/` contains no team portraits. Cleared the nine invalid image paths in `content/studio.json`, regenerated `data/team.json`, and made TeamCard render initials immediately for absent images. Real portraits remain outstanding.
- Reviewed the Pass 1 VideoDialog and VisualQuality components. Showreel open/Escape close works. Reduced motion renders the CSS poster without a canvas; sustained slow software rendering also falls back correctly.
- Validation: production build passes, TypeScript clean, all 10 pages generated; restarted port 3111 and received HTTP 200. Inspected 1440×760 and 390×844 WebGL screenshots, static/reduced-motion fallback, body sections and roster. No page/console errors, HTTP failures, loaded broken images or horizontal overflow in the browser checks.
- Review captures: `/tmp/p2_desktop_webgl.png`, `/tmp/p2_mobile_webgl.png`, `/tmp/p2_reduced.png`, `/tmp/p2_roster_False.png`. Checks: `/tmp/p2-check.log`; build: `/tmp/fiip-build.log`.
- Remaining visual limitation: optics are stylized, with a dark housing and simplified reflections rather than a photoreal product render. Initials are an intentional interim roster presentation.

The original handoff below is retained as historical context.

## 1. State at Pass 1 handoff

| Item | State |
|---|---|
| `npm run build` | exit 0, TypeScript clean, all 10 routes prerender |
| Local server | `npx next start -p 3111` → HTTP 200 |
| Desktop hero | Fixed. Canvas wrapper is `absolute` at top 0, h=760; content starts y=144 |
| Mobile 390px hero | Headline visible, no clipping; buttons full width |
| Body sections | Good — discipline cards, texture, Frames panel all read clean |
| Console | Zero JS errors on desktop + mobile |
| Roster | **9 headshot 404s** still open |
| Git | Pass 1 changes **uncommitted**; `components/ui/VideoDialog.tsx` + `components/ui/VisualQuality.ts` untracked |

### The bug that was just fixed (do not regress it)
`app/globals.css` had an unlayered rule added during the glass pass:

```css
main section > div:not([aria-hidden="true"]) { position: relative; z-index: 2; }
```

It beat Tailwind's `.absolute` on the hero canvas wrapper, so the wrapper sat in document flow, ate 760px, and pushed the `<h1>` to y≈967 — off-screen. It is now:

```css
main section > div:not([aria-hidden="true"]):not(.absolute):not(.fixed):not(.sticky) { position: relative; z-index: 2; }
```

If you add a positioned wrapper inside `main section`, keep this exclusion intact.

---

## 2. Your job — in priority order

### P0 — desktop hero iris
`components/Cinematic3DHero.tsx` renders the aperture centre as a flat black spiky star on desktop 1440×760, while mobile 390px renders proper iris blades. That is a scale/shader-contrast defect, not a design choice. Make the desktop lens read as *optics*: concentric barrel, believable blade geometry, material contrast between glass and housing, subtle rim light. It is currently a dull grey disc — the hero's typography now works, the object behind it does not.

Constraints: raw three.js only, **no `@react-three/fiber`**, no new npm deps in this pass, must degrade gracefully on mobile and respect `prefers-reduced-motion`.

### P1 — roster headshots
9 × 404. Assets live under `public/`. Fix paths or generate real crops — do not ship broken `<img>`.

### P2 — mobile polish
At 390px the mono discipline slate's last line grazes the lens rim. Give it clearance.

### P3 — then commit
One clean commit for Pass 1 + these fixes. Message style: imperative, scoped. **Do not deploy.**

---

## 3. Verification protocol (mandatory — exit 0 is not acceptance)

1. `npm run build` — must be exit 0 with no TS errors.
2. `fuser -k 3111/tcp; sleep 1` then `npx next start -p 3111`, poll `curl` until 200.
3. Screenshot 1440×760 and 390×844 with Playwright (`--use-gl=swiftshader`), zero console errors.
4. Look at the screenshots. Actually inspect them. A green build with an off-screen headline is exactly the failure that already happened once here.
5. Report: files changed, what the screenshot shows, what is still weak.

Helper scripts already exist: `/tmp/shot_p1.py` (screenshots), `/tmp/probe_hero.py` (DOM/canvas probe). `/tmp/verify_site.py` has a **broken canvas metric** — it reports `canvas=0` when the canvas is present. Do not trust it.

---

## 4. Hard rules

- **Deployment is Vercel MCP only.** Not `vercel deploy` from the shell.
- `content/studio.json` is the single source of truth for copy; `npm run sync:content` writes `data/team.json`. Never hand-edit `data/team.json`.
- Design direction: professional / exclusive / clean, Apple product-launch scroll feel. Black-and-white approved. Dotted patterns, UI glass, texture. Exactly one ochre accent `rgb(202 148 62)`, and only in the commissioning section. Fewer blocks, more curves.
- Mobile parity is a hard filter: no desktop-only gimmicks.
- **Never** run `pkill -f "next start"` — the pattern matches your own shell and kills it. Use `fuser -k 3111/tcp`.
- Terminal output in this environment intermittently collapses multiline results. Write findings to files and read them back rather than trusting piped output.
- Do not touch mail, AD, Samba, Nextcloud, or any credential store.

## 5. Files worth reading first
`app/HomePage.tsx` · `app/globals.css` · `components/Cinematic3DHero.tsx` · `components/ui/VideoDialog.tsx` (new, uninspected) · `components/ui/VisualQuality.ts` (new, uninspected) · `app/PricingPage.tsx` · `CONTENT.md`

## 6. Out of scope
Backend, auth, Frames portal integration, next/Content work. This pass is the marketing site only.

## Refinement request — 20 November 2026

User wants lens retained temporarily but future hero concept aligned with post-production, not acquisition. Preserve headline/selected-work direction. User now permits restrained ochre across pages, superseding commissioning-only rule. Current pass extracts FramesPreview with pointer tilt, removes fixed grain and stage dot field, reduces panel grain, adds small accent rules/interaction states. Checklist: `design/audit/WEBSITE-CHECKLIST.md` covers legal/business dependencies and technical acceptance. No fabricated legal policies.

User explicitly identified uploaded pillar photo as Kousik (roster Koushik Raj) and glasses/white-shirt photo as Ganesh. Originals saved as `public/images/team/koushik-reference.jpg` and `ganesh-reference.jpg`. Matching generated versions pending. Iniyavan already wired; Udhay reference still unavailable; Akhil image expected later. Preserve all pre-existing portrait work.

Validation: production build/typecheck passed; 14 local desktop/mobile route checks passed with zero Axe violations/errors/failed resources/broken images/overflow. Frames hover/reset/reduced-motion assertions passed. Desktop Frames and mobile homepage captures inspected. Changes are local; not deployed in this turn. Checklist and preview delivered via @codexfiipbot.

Udhay reference received and explicitly identified by user on 20 November 2026 (upload 131433). Saved as public/images/team/udhay-reference.jpg and connected to Udhaya Kumar in source content. Uses supplied portrait directly with existing grayscale presentation; no newly generated portrait claimed. Local change, not deployed.

## Published release — 20 November 2026

User requested “push them all live.” Committed prepared portrait/site changes as `41c3bf4` and pushed main. Vercel Git deployment `dpl_E1HHSuAbsui2RGvtoftntyBv9nzF` confirmed READY for production with fixitinpost.in and www.fixitinpost.in assigned, no alias error. Build and TypeScript passed. All referenced local images exist; desktop homepage capture inspected. Fresh full browser audit stopped on a screenshot timeout; subsequent smoke browser launch stalled, so no new complete mobile/accessibility pass is claimed. Earlier refinement audit remains recorded above.

Published portraits: generated Iniyavan, Sanjay, Venkat; supplied Udhay photo. Ganesh and Koushik reference files are saved but not connected; matching generated portraits remain pending. No new portraits generated in this deployment turn.

Ganesh correction: user pointed out his missing photo. Connected supplied `/images/team/ganesh-reference.jpg` in source content and regenerated data. Commit `4936ac4` pushed; production deployment `dpl_8BgjaFDBtaqvoGTAJRy9gf153FSc` READY with apex/www aliases. Build/typecheck passed; built about HTML contains Ganesh photo. Uses original supplied photo, not a generated portrait. Koushik remains pending.

Landing-page portraits: `d95fd5b` replaces initials with the shared roster photos where connected, retaining initials for missing portraits. All seven icons link to `/about#<person.id>`; TeamCard provides matching IDs with header scroll clearance. Five photo sources and all seven links/targets verified in generated production HTML; build/typecheck passed. Deployment `dpl_FTwdxzsQf7TZskte6KZ4BWDJMDnr` READY, apex/www assigned. No fresh browser screenshot audit in this turn.

Koushik photo received: user explicitly requested upload `20261120-181219_photo.jpg` for Kousik. Saved unchanged as `public/images/team/koushik-portrait.jpg`, connected source roster, regenerated team data. Both homepage thumbnail and profile now use this supplied photo; profile link verified in built HTML. Build/typecheck passed. Commit `19c0f14`, deployment `dpl_J77TKF863SKkxayHpwRAgepJC8g5` READY with apex/www assigned. Supersedes earlier Koushik pending-photo notes; no generated portrait claimed.

Ahilendra photo received: user requested upload `20261120-181530_photo.jpg` for Ahilendra D. Saved unchanged as `public/images/team/ahilendra-portrait.jpg`, connected source roster and synced team data. Homepage thumbnail and profile use supplied photo, matching profile anchor verified in production HTML. Build/typecheck passed. Commit `09c7fae`, deployment `dpl_BWqPBLVJbPDkGv2EELgyV5rp7mvf` READY with apex/www assigned. All seven core roster members now have connected photos. No new generated portrait or browser screenshot audit claimed.

21 November 2026 collaborators: user supplied `20261121-142243_photo.jpg` for Sri Karthik (FX Artist & 3D Generalist) and requested Balaji D (3D Generalist), photo to follow. Added distinct collaborator entries `collab-sri-karthik` and `collab-balaji-d`; preserved existing Balaji Sripathi cinematographer entry. Sri Karthik uses supplied photo at `public/images/team/sri-karthik-portrait.jpg`; Balaji D uses BD initials. Synced data, build/typecheck passed, both profiles/photo/fallback verified in built HTML. Commit `11613ff` pushed. Vercel CLI inspection confirms production deployment `dpl_DpyKzLsavvHJw2NChwoSbHJSRMNn` Ready with apex/www aliases. No new browser screenshot audit claimed.

Shivraj photo: user identified upload `20261121-142432_photo.jpg` as Shiva Raj. Connected supplied photo unchanged to existing `collab-shivraj` via `public/images/team/shivraj-portrait.jpg`; synced team data. Build/typecheck and built profile image checks passed. Commit `29dd347` pushed; deployment `dpl_3gK2hHMX5bVE3THcUHJfkN6Q8woe` confirmed Ready with apex/www aliases. Balaji D photo still pending.

Balaji Sripathi photo: user identified upload `20261121-142605_photo.jpg` for Balaji sripathy. Saved unchanged as `public/images/team/balaji-sripathi-portrait.jpg` and connected existing `collab-balaji` cinematographer profile. Synced data; build/typecheck and built profile image checks passed. Separate Balaji D remains without photo. Commit `2302b3f` pushed; deployment `dpl_TcAaWTiK64wkeWWMYGr2zkWd4A6W` Ready with apex/www aliases.
