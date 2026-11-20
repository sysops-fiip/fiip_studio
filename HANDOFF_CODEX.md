# HANDOFF — FIIP Studio website (for Codex)

**Date:** 2026-11-17 · **Repo:** `/home/fiipadmin/workspace/fiip_studio` (this directory)
**Stack:** Next 16.4.6 · React 19 · Tailwind v4 · framer-motion 12 · three 0.187
**Production (Vercel):** `fixitinpost.in` — Audit fixes commit `8f0776c` published on 2026-11-19. Vercel reports Ready and assigns both apex and www domains.

Read this whole file before touching code. Then confirm the plan in one short message and start.

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
