# Compliance and readiness sweep — 22 November 2026

Automated checks run against https://fixitinpost.in (and the local build for the last fixes). Evidence: `~/.cache/fiip-tools/compliance.py` output. Not legal advice; items needing the owner or an adviser are listed at the end.

## Verified
| Area | Result |
|---|---|
| Accessibility (axe-core 4.10, WCAG 2.0/2.1 A+AA) | 0 violations on 9 pages × desktop 1440 / mobile 390 (after fixing archive-tab contrast) |
| Headings / language | exactly one h1 per page; `lang="en"` |
| Images | every `<img>` has alt (decorative = empty alt) |
| Titles, descriptions, canonicals | unique per page; homepage title now leads with the studio name; canonical on every page |
| Social previews | 1200×630 `/og/fiip-og.jpg` on every page incl. homepage; twitter `summary_large_image` |
| Structured data | Organization JSON-LD with legal name, GSTIN (taxID), registered address, email, IMDb |
| Sitemap / robots | 9 URLs with real dates; robots allows all and points to the sitemap |
| Redirects | http → https (301); www → apex (308, set in next.config.js) |
| 404 | custom page, real 404 status |
| Security headers | HSTS (preload), X-Content-Type-Options, Referrer-Policy, X-Frame-Options, Permissions-Policy |
| Privacy claims | no cookies, no localStorage/sessionStorage on any page; the only host contacted on load is fixitinpost.in (fonts self-hosted, YouTube only after pressing play via youtube-nocookie) |
| Links | 33 external/internal links all return 200 |
| Legal pages | /privacy and /terms with Fix It In Post Studios LLP, registered address and GSTIN 33AAHFF7663D1ZI; linked in every footer |
| Motion | prefers-reduced-motion respected with an explicit "Play the shot" opt-in; menus and loops honour it |

## Owner / adviser items still open
- Have the Privacy and Terms wording reviewed by a legal adviser (DPDP Act obligations phase in; the site collects no data itself, enquiries arrive by email).
- Confirm permissions for client films, logos and stills shown in Work and the Work hero.
- Verify Search Console / Bing Webmaster ownership and submit the sitemap (needs the owner's Google account).
- Real-device pass: iPhone Safari, Samsung Internet (with and without power saving), desktop Safari.
- Optional: Content-Security-Policy in report-only mode before enforcing (inline JSON-LD and Next runtime need nonces/hashes).
