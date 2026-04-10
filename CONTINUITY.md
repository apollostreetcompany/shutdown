## Goal

Deploy Shutdown Assistant on Cloudflare only, with no deceptive checkout or phishing-like content, and keep a clean public URL available.

Success criteria:
- Cloudflare Pages build succeeds.
- Public Cloudflare URL returns HTTP 200.
- Guide purchase actions route to Stripe Checkout instead of a fake local confirmation.
- Google Safe Browsing status for the active public URL has no unsafe flags.

## Constraints/Assumptions

- Use Cloudflare Pages, not Netlify.
- `shutdownassistant.com` is intended as the custom domain, but WHOIS currently reports no registration for it.
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

- None.

### Next

- Register `shutdownassistant.com`, add its zone/DNS in Cloudflare, then let the pending Pages custom domains validate.
- If the old `shutdown-assistant.pages.dev` hostname must remain usable, submit a Google Safe Browsing incorrect-warning review for that hostname.

## Open Questions

- Should the old Cloudflare Pages project `shutdown-assistant` be deleted after the new URL is confirmed everywhere?

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

