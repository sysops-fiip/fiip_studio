# fixitinpost.in — content & site operations

Handover doc for any agent (or human) picking this repo up. Read this before editing copy.

## 1. Where the truth lives

`content/studio.json` is the **single source of truth** for studio content:
identity, contact, roster, external collaborators, IMDb-verified credits, disciplines,
Frames description, clients, and open questions.

```
content/studio.json      # master content (edit here)
scripts/sync-content.mjs # generates data/team.json from content/studio.json
data/team.json           # GENERATED — do not hand-edit roles
data/projects.json       # commercial deliverables (YouTube-backed cards)
npm run sync:content     # run after every content/studio.json change
```

Rules:
- Never invent a credit, client, phone number, address or award. If it is not in
  `content/studio.json` with a `source`, it does not go on the site. Unverified
  items live under `open_questions` / `pending_verification`.
- `data/team.json` is machine-generated from the roster. Editing it directly is how the
  old wrong titles ("Supervising Colorist" for a VFX generalist) survived so long.

## 2. Roster truth (dictated by Iniyavan, 2026-11-16)

| Person | Position (public) | Actual skill set |
|---|---|---|
| Iniyavan Pandiyan | Creative Director & VFX Producer | pipeline architect, editor, VFX production, IMDb 20+ credits |
| Udhaya Kumar | VFX Generalist | comp/roto/prep, light editorial |
| Ganesh | Commercial Editor | editorial, conform, mastering |
| Ahilendra D | Conform & Mastering Artist | conform/mastering, developing colorist |
| Koushik Raj | Colorist & Conform Artist | color, conform, light VFX/editorial, cinematographer |
| Sanjay Kandasamy | Editor | narrative/story editing, generative AI VFX |
| Venkat | Post Production Supervisor & Editor | editorial, VFX, grading, story/writing |
| Balaji Sripathi | Cinematographer (collaborator) | external DP — Asian Paints commercial |
| Shivraj | Cinematographer (collaborator) | external DP — The Akaali (graded here), Pumbu Har ad series |

Titles are deliberately consolidated: one public position per person, extra skills in the
body copy only. Do not re-inflate ("Supervising", "Head of", "Lead") without instruction.

## 3. Verified credits (IMDb nm8451602)

Pull from `content/studio.json → imdb_credits`. Source:
`https://www.imdb.com/name/nm8451602/fullcredits/` (fetched 2026-11-16 via r.jina.ai —
IMDb returns HTTP 202 to plain curl from this host).

Notable: The Akaali (VFX supervisor), DeAr / Hot Spot / Athomugam / Fight Club / Kolai
(VFX producer), A1 Express (VFX supervisor), Rocket Driver (VFX + editor),
Birthmark (VFX supervisor + editor), Two Worlds / Cobwebs (editor),
Dharala Prabhu / Oh Manapenne! (assistant editor), Jalan Lain (color dept).

## 4. Build & deploy

```
npm run sync:content   # only if content/studio.json changed
npm run build          # must exit 0
vercel --prod --yes    # deploys to fixitinpost.in
```

There is no Vercel Git integration on this project — deploys are CLI-only from this
checkout (`/home/fiipadmin/workspace/fiip_studio`). Always verify live afterwards:

```
curl -sL https://fixitinpost.in/ | grep -i "<string you changed>"
```

## 5. Known defects / open work

- Hero 3D: the old sphere+crossbar scene read as a cartoon eyeball. Replaced with a
  lens-assembly product shot (2026-11-16).
- Hero HUD overlays (`OPTICS · 50MM…`, timecode card) previously overlapped the
  capability row — keep them inside the hero container only.
- "10G NVME / 4K 8K RAW / 30+ DELIVERIES / FRAMES APP" jargon row replaced with plain
  capabilities.
- Commissioning page: pricing tiers were invented by the earlier generator
  (₹300–₹500 style). Do not restore invented numbers; needs real engagement models.
- Archive page: user wants it to populate automatically from Frames output (stretch goal).
- Contact: needs real enquiry routing (studio email IDs) + Google Maps embed — see
  `content/studio.json → contact` (`open_questions` lists what is still missing).
- Site-wide: too blocky; direction is curves, glass/UI-glass panels, dotted textures,
  more colour on Commissioning.

## 6. Design direction (client-approved)

- Apple-style scroll-driven product-launch motion; things animate as you scroll.
- Monochrome black/white/grey base, premium and classy — add texture (dot grids),
  glass panels, and soft curves to break the boxy grid.
- Overview = a little of everything, not everything in one place.
- Frames gets its own page: client benefit, workflow, artist sitting next to you for notes.
- Core Disciplines is approved — keep, improve slightly, give it a dedicated page.
