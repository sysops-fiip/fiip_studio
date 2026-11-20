# FIIP Studio website readiness checklist

Reviewed 20 November 2026. Working tracker for the marketing website, not a certification of legal compliance or the authenticated Frames product. Owners: Studio = business owner; Engineering = website implementation; Legal = qualified adviser. Close an item only with evidence, date and owner. Review after each release and monthly for broken links/content.

## Immediate priorities

| Status | Priority | Task / acceptance evidence | Owner |
|---|---|---|---|
| Open | P0 | Confirm legal entity name, business address and privacy/grievance contact. `content/studio.json` still explicitly lists legal name as unconfirmed. | Studio |
| Open | P0 | Prepare and review privacy notice: enquiries, hosting logs, email providers, external fonts, YouTube embeds, purposes, sharing, retention, rights and contact route. Publish a dated page and footer link after facts are confirmed. | Studio + Legal + Engineering |
| Open | P0 | Prepare website terms: ownership, permitted use, portfolio rights, third-party links and enquiry limitations. Distinguish website use from signed client service agreements. Confirm jurisdiction and liability clauses with adviser; do not invent these. | Studio + Legal |
| Open | P0 | Confirm commissioning claims: delivery schedules, SLA, revision/deliverable limits, payment/tax, cancellation/refund, IP transfer and confidentiality. Put agreed service terms in proposals/contracts and make public pricing consistent. | Studio + Legal |
| Open | P0 | Confirm permission for client footage, logos, music, portraits and generated portrait use; retain permissions. Verify Galle/Picasso/Crime Patrol project video attribution. | Studio |
| Open | P1 | Inventory cookies/storage/network requests before and after video playback, including hosting integrations. Determine consent requirements from actual tracking and visitor markets; implement blocking/withdrawal where required. A banner alone is not completion. | Engineering + Legal |
| Open | P1 | Assess Indian DPDP obligations and applicable commencement dates. Rules/Act have phased commencement; verify the official notices and corrigenda at implementation, rather than declaring all provisions applicable now. Keep enquiry retention, deletion and access procedures documented. | Legal + Studio |

## Design and portraits

- [x] Keep current lens as requested; record replacement concept as future work focused on editing, VFX, colour and finishing.
- [x] Preserve headline and selected-work direction.
- [x] Add restrained pointer tilt to homepage Frames illustration; reset on exit; disable on touch and reduced motion.
- [x] Remove page-wide fixed grain and repeating stage dots; reduce local grain.
- [x] Extend ochre sparingly through small rules, link/focus states and review indicators.
- [x] Confirm Iniyavan generated image is wired in source content and generated team data.
- [x] Save user-confirmed Koushik pillar reference and Ganesh glasses/white-shirt reference under `public/images/team/`.
- [ ] Produce and review matching Ganesh and Koushik generated portraits from saved references; publish after likeness inspection.
- [x] Udhaya Kumar reference received 20 November; supplied portrait connected locally with existing grayscale styling.
- [ ] Await Ahilendra/Akhil reference; confirm display-name spelling with owner.
- [ ] Confirm whether collaborators Balaji and Shivraj need portraits; retain intentional initials meanwhile.

## SEO and discovery

- [x] Source includes distinct route titles/descriptions/canonicals, sitemap and robots. Prior live check: 19 November, all seven routes HTTP 200 and correct canonicals.
- [ ] Verify Search Console ownership, submit sitemap, inspect indexing and monitor coverage. Requires account access; no ranking or indexing guarantee.
- [ ] Replace shared logo-only social image with an accurately sized, legible 1200×630 card; inspect previews for each route. Current layout declares dimensions that should be checked against actual asset.
- [ ] Add truthful Organization structured data after legal/entity facts are confirmed; validate. Avoid invented address/reviews/ratings.
- [ ] Use actual content-change timestamps in sitemap rather than build-time `new Date()`.
- [ ] Check redirect chain apex/www and HTTPS, canonical consistency, 404 status, internal links and production robots after release.
- [ ] Confirm local business listing ownership and consistent contact details if relevant to studio discovery.

## Accessibility and functional QA

- [x] Prior 19 November audit: 14 desktop/mobile route checks, no Axe violations, JS errors, failed resources or overflow. This is historical evidence, not a new certification.
- [x] Current local release: 14 route/viewport checks (1440px/390px), HTTP 200, zero Axe violations, JS errors, failed resources, broken loaded images or horizontal overflow. Frames hover/reset/reduced-motion assertions passed; desktop Frames and full mobile homepage captures inspected.
- [ ] Complete manual keyboard, zoom and assistive-technology checks; automated checks do not prove full accessibility.
- [ ] Check actual iOS Safari, Android Chrome, desktop Safari/Firefox and assistive technology; automated Chromium is not equivalent.
- [ ] Verify contact mailto in an actual configured mail client and successful receipt. UI prepares an email; there is no website submission backend.
- [ ] Verify video playback/audio, rights and captions/descriptions as appropriate; dialog opening alone does not prove playback.
- [ ] Make archive filter state shareable/persistent via URL.
- [ ] Audit authenticated Frames separately: permissions, uploads, retention, security and product accessibility are outside this marketing review.

## Performance, security and operations

- [ ] Measure Lighthouse/mobile lab performance and field Core Web Vitals when sufficient traffic exists; track LCP, INP and CLS. Set budgets from measured baseline.
- [ ] Review external Google Fonts CSS import: self-host appropriately licensed fonts and verify layout/fallback after measured change.
- [ ] Repair obsolete `next lint` script with a supported lint setup and run in CI alongside build/typechecking.
- [ ] Audit dependencies and hosting security configuration; verify headers and compatible CSP in report-only mode before enforcement. Confirm third-party iframe/font needs.
- [ ] Confirm deployment ownership, MFA, least privilege, domain renewal, rollback procedure and uptime/error alerts. Never put credentials in this tracker.
- [ ] Review public repository/assets for unintended personal or confidential material; decide whether source reference photos should remain publicly served.
- [ ] Release only after build and visual/interaction QA; record deployed commit and immutable URL, then repeat production smoke checks.

## Completion workflow

Engineering closes implementation items with build/browser evidence. Studio supplies legal identity, policies, rights and missing photos. Legal checks applicable obligations and proposed public wording. Publish factual approved legal pages, link them in the footer and add to sitemap. Track unresolved items explicitly rather than presenting draft policies as finished compliance.

## Sources checked

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): crawlable content, useful titles, links and sitemap discovery.
- [MeitY DPDP Rules and notices](https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa?pageTitle=Digital-Personal-Data-Protection-Rules-2025): primary legal materials, including commencement and corrigenda.
- [Act commencement notification](https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf): phased entry into force.
- [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md): UI review reference.
- Local evidence: `design/audit/2026-11-19.md`; current build/browser results in `delivery/audit/`.
