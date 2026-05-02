## Goal

Deploy Shutdown Assistant on Cloudflare only, with no deceptive checkout or phishing-like content, and keep a clean public URL available.

Success criteria:
- Cloudflare Pages build succeeds.
- Public Cloudflare URL returns HTTP 200.
- Guide purchase actions route to Stripe Checkout instead of a fake local confirmation.
- Google Safe Browsing status for the active public URL has no unsafe flags.

## Constraints/Assumptions

- Use Cloudflare Pages, not Netlify.
- `shutdownassistant.com` is registered through Cloudflare and the zone is active.
- Current Wrangler OAuth is logged in but has only `zone:read` for zones. Use `CLOUDFLARE_API_TOKEN` for DNS-record writes and unset it when using Wrangler/Pages APIs that need the OAuth token.
- `apollo-workspace/` is unrelated untracked work and should not be modified.

## Key Decisions

- Removed local fake purchase confirmation and fake urgency/social-proof signals from guide pages.
- Kept purchase conversion through Stripe Checkout: `https://buy.stripe.com/14A00jdmt51r6xFfh2co007`.
- Created a new Cloudflare Pages project, `shutdownassistant`, because the old default hostname `shutdown-assistant.pages.dev` retained a Google Safe Browsing social-engineering flag after content was fixed.
- Moved pending custom-domain attachments to the new `shutdownassistant` project.
- DNS for `shutdownassistant.com` and `es.shutdownassistant.com` points to `shutdownassistant.pages.dev`; the apex uses DNS-only CNAME flattening, while the `es` subdomain is proxied.
- Added a Pages `_worker.js` to redirect `es.shutdownassistant.com/*` to `shutdownassistant.com/es/*`, because the host-specific `_redirects` rule did not fire on Cloudflare Pages.
- Added edge-level visit logging in `_worker.js` so bot and likely-human HTML requests can be tailed from Cloudflare Pages logs.
- Added DataFast queue and funnel goal collection across English, Spanish, and premium guide pages. The external DataFast script is injected by the Pages worker when the runtime `DATAFAST_WEBSITE_ID` secret is present.
- Set the Cloudflare Pages `DATAFAST_WEBSITE_ID` secret to `dfid_JDKpEC4aorgxtiKEgpz8Z` for `shutdownassistant.com`.

## State

### Done

- [x] Bead 1: Verified phishing warning, removed deceptive guide checkout flow, deployed fixed site to Cloudflare.
- [x] Bead 2: Wired `shutdownassistant.com` and `es.shutdownassistant.com` to Cloudflare Pages.
- [x] Bead 3: Added and activated DataFast funnel tracking plus Cloudflare edge visit logging.

### Now

- None.

### Next

- Monitor DNS/Pages propagation and old Chrome/Safe Browsing caches.
- If the old `shutdown-assistant.pages.dev` hostname must remain usable, submit a Google Safe Browsing incorrect-warning review for that hostname.

## Open Questions

- Should the old Cloudflare Pages project `shutdown-assistant` be deleted after the new URL is confirmed everywhere?
- Should the old host-specific entries in `public/_redirects` be removed now that `_worker.js` handles `es` redirects?

## Working Set

- `src/components/StateGuidePage.tsx`
- `src/lib/guide-translations.ts`
- `src/pages/guides/[slug].astro`
- `src/pages/es/guides/[slug].astro`
- `package.json`
- `wrangler.toml`
- `public/_headers`
- `public/_redirects`
- `public/_worker.js`
- `src/components/DataFastAnalytics.astro`
- `docs/analytics-logging.md`

Commands:
- `npm run build`
- `npm run deploy:cloudflare`
- `wrangler pages deployment list --project-name shutdownassistant`
- `npm run logs:cloudflare`
- `wrangler pages secret put DATAFAST_WEBSITE_ID --project-name shutdownassistant`
