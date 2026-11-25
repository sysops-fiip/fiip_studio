# fixitinpost.in on Cloudflare Pages (free) — LIVE since 26 Nov 2026

**How it's deployed now:** direct upload with Wrangler (no Git integration):
```
npm run build    # static export -> out/
set -a; . ~/.config/fiip/cloudflare.env; set +a      # CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID (token "fiip-server-ops")
~/.cache/fiip-tools/wrangler/node_modules/.bin/wrangler pages deploy out --project-name fiip-studio --branch main
```
- Pages project `fiip-studio` (https://fiip-studio.pages.dev), custom domains `fixitinpost.in` + `www.fixitinpost.in`.
- DNS: apex and www are proxied CNAMEs to `fiip-studio.pages.dev`. Rollback = set both back to
  `5a86b235e75450f2.vercel-dns-017.com` (Vercel project still exists).
- www -> apex: zone redirect rule "www to apex" (301, keeps the query string).
- The old Vercel deployment still exists until the owner removes the domains there.

---
## Original plan (kept for reference)

Branch `cloudflare-pages` holds a static export (`output: 'export'`, `images.unoptimized`), security/cache headers in
`public/_headers`, and static sitemap/robots. Verified under Wrangler's Pages emulator: all routes 200, real 404,
headers applied, axe 0 violations, no storage, ~1,880 files (limit 20,000), largest file < 25 MiB, "No Functions".

## Why it stays free
- Static assets on Pages are "free and unlimited" (Cloudflare docs). This site serves only static assets.
- No Pages Functions / Workers are used, so nothing metered exists. (Free-plan Functions over the daily limit return
  error 1027, not a bill.)
- Never add a payment method and never enable "Workers Paid" on this account.

## Steps (owner, ~5 minutes)
1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → repo `fiip_studio`.
2. Production branch: `cloudflare-pages` (switch to `main` after the move). Framework preset: None.
   Build command: `npm run build` · Build output directory: `out` · Environment variable: `NODE_VERSION = 22`.
3. Check the `*.pages.dev` URL it gives (every page, the heroes on a phone).
4. Custom domains (in the Pages project): add `fixitinpost.in` and `www.fixitinpost.in`. DNS is already on Cloudflare.
5. Rules → Redirect Rules → new rule: hostname equals `www.fixitinpost.in` → dynamic redirect to
   `concat("https://fixitinpost.in", http.request.uri.path)`, 301, preserve query string.
6. In Vercel: remove the two domains from the project (and later delete or pause the project).
7. Merge `cloudflare-pages` into `main` and set the Pages production branch to `main`.
