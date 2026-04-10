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
- Current Wrangler OAuth is logged in but has only `zone:read` for zones; Cloudflare DNS-record API calls require DNS edit permission and currently return authentication errors.
- `apollo-workspace/` is unrelated untracked work and should not be modified.

## Key Decisions

- Removed local fake purchase confirmation and fake urgency/social-proof signals from guide pages.
- Kept purchase conversion through Stripe Checkout: `https://buy.stripe.com/14A00jdmt51r6xFfh2co007`.
- Created a new Cloudflare Pages project, `shutdownassistant`, because the old default hostname `shutdown-assistant.pages.dev` retained a Google Safe Browsing social-engineering flag after content was fixed.
- Moved pending custom-domain attachments to the new `shutdownassistant` project.

## State

### Done

- [x] Bead 1: Verified phishing warning, removed deceptive guide checkout flow, deployed fixed site to Cloudflare.

### Now

- Bead 2: Wire `shutdownassistant.com` DNS to Cloudflare Pages. Blocked on DNS record write permission.

### Next

- Export a Cloudflare API token with `Zone:DNS:Edit` for `shutdownassistant.com`, then create DNS records:
  - `CNAME shutdownassistant.com -> shutdownassistant.pages.dev`
  - `CNAME es.shutdownassistant.com -> shutdownassistant.pages.dev`
- Retry Cloudflare Pages custom-domain validation after DNS records exist.
- If the old `shutdown-assistant.pages.dev` hostname must remain usable, submit a Google Safe Browsing incorrect-warning review for that hostname.

## Open Questions

- Should the old Cloudflare Pages project `shutdown-assistant` be deleted after the new URL is confirmed everywhere?
- Can Ryan provide/export a Cloudflare API token with DNS edit permission, or create the two CNAME records in the Cloudflare dashboard?

## Working Set

- `src/components/StateGuidePage.tsx`
- `src/lib/guide-translations.ts`
- `src/pages/guides/[slug].astro`
- `src/pages/es/guides/[slug].astro`
- `package.json`
- `wrangler.toml`
- `public/_headers`
- `public/_redirects`

Commands:
- `npm run build`
- `npm run deploy:cloudflare`
- `wrangler pages deployment list --project-name shutdownassistant`
