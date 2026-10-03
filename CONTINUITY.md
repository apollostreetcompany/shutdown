## Current public crawler boundary — ops-gad.20, October3,2026

Initial source PR3/main689b0c6/current CI37155084476 passed; existing Pages
ff967706 deployed21:29:56Z without asset uploads or configuration changes.
Actual acceptance found Spanish robots still redirected into /es/robots.txt:
fresh readback CF-Cache-Status HIT/Age752 proves a stale successful301; a
distinct cache-key request reaches the corrected root file. No client denial
was retried or disguised. Add no-store only to exact Spanish discovery redirects
and invalidate only the existing robots cache if existing access permits.
The original76 observations and failed acceptance remain evidence, not a pass.
Four new actual-handler discovery-cache assertions fail before this correction.
Existing current cf OAuth recovers expired Wrangler auth without a new token,
scope expansion or global login changes. Root still owns runtime acceptance.

Previous goal turn PROGRESS: Mecerss source/runtime/canonical report accepted;
one approved mail pilot sent, arrival INCONCLUSIVE. Full86 scope unchanged.
Root now owns this independently acceptable existing Shutdown Pages boundary.
Fresh source/main e148d70f488ad2ff2057549666ee4d1e8de3b307 matches existing
shutdownassistant production815dd9ad-8af1-452b-a2f4-c63458d808c5. Its truthful
dirty=true metadata and unrelated apollo-workspace/session-summaries remain
preserved, not treated as a clean deployment. Public Worker unchanged since
e263500; existing source/normal build reuse and provider readbacks precede edits.

High-risk request/deploy boundary. Root immediate implementation/integration;
confidence high after exact metadata binding, bounded recovery inspects actual
state and holds mismatches instead of replaying deployment. Existing Node24,
cf OAuth/account3a0bfe287d4dfb27f802ee5d7e4b21e1, deps/cache and47GB disk
guard. No install/review/clone/worktree or new test runner. Parallel GPT-6.1-Sol
worker reads other products only; no concurrent writer to this source observed.
CLI positional-argument stop and nullable preview env_vars parsing stop were
local read/receipt errors, not authentication failures; corrected reads succeed.
One ordinary before request403/17bytes is retained without retry/disguise.

Contract work/2026-10-03-public-crawler/CONTRACT.md and canonical ops-gad.20
define actual-Worker fail-before/passing-after, existing validation/build/XML
checks, normal source PR/current CI, existing Pages/runtime/native/public assets
and canonical root publication. No checkout/form/payment or fresh mail action.
Preserve all original content/billing, browser/edge logging and Datafast/PostHog
policies. Only named public denials and exact Spanish discovery redirect repair
are intended. Rollback reference is existing815dd9ad on the same Pages project;
no unrelated infrastructure/customer/data mutation. Acceptance remains pending.

## Previous sitemap repair — September 30, 2026 (historical)

Canonical `ops-gad.7` is owned by root in the existing Ops Metrics tracker. Branch `codex/fix/bead-ops-gad-7-sitemap` starts at accepted live analytics main `db328517011a3cd6b4621831f9e78d551f58b218`. Production robots advertises `/sitemap.xml`, but that path returns the HTML homepage fallback. Implement route/state-derived XML and built-output canonical coverage validation, without changing analytics, payments, content or the Worker. Contract: `work/2026-09-30-portfolio-sitemap/CONTRACT.md`. Existing dependencies and output are reused, unrelated untracked directories retained, and no autoreview is run. Source/live acceptance remains pending until normal PR/CI integration and exact Pages deployment.

## Portfolio operational repair — September 30, 2026

Canonical task `ops-gad.5` is tracked by the root coordinator in `/Users/future/dev/ops-metrics`, not a new local queue. Source base is `fa8cda9807b07da89f3148b03624be68f6c4853a`; branch `codex/feat/bead-ops-gad-5-browser-analytics`. Baseline normal registry validation and full build pass (50 states, zero warnings/errors, 219 pages). Existing unrelated untracked directories are preserved. No matching source process or open GitHub PR was observed; Herdr inspection is unavailable from this tool environment, so prior session inventory is not a current ownership proof.

Pre-flight found no plan-changing question: the already authorized scope is restricted production-only PostHog pageviews alongside the existing Datafast loader/goals, accurate English/Spanish disclosure, a persisted PostHog-only opt-out, and a direct company support contact. Public tracking excludes queries/fragments, referrers, forms, business/customer content and unknown/private paths; memory-only SDK identities, no autocapture/replay/flags/geographic enrichment. Only the actual production apex is eligible; the Spanish host redirects there. Preserve Stripe URLs, prices, state research, content and runtime secrets. Existing browser and edge metrics remain estimates, not verified people.

Read-only provider binding: Pages `shutdownassistant`, production main, apex/Spanish hosts. Current deployment `879892ce-d31e-481c-9016-4f78365533cb` reports source `e263500e5c0f76a46020ae33d4939466a04a2605`, dirty=true; metadata alone cannot identify the actual served source. Live home, English/Spanish Privacy and California guide return 200 with Datafast but no PostHog. Required release evidence is exact intended source, ordinary PR/build acceptance, deployed HTML, actual received hostname-attributed event, persisted production opt-out and retained Datafast/checkout/Spanish/crawler behavior. Root owns provider/browser/tracker/Git/deploy; worker owns only bounded implementation. No autoreview under the user's explicit waiver. Direct Gmail contact is not proof of domain forwarding, which remains separately pending.

## Goal (previous delivery)

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

## ops-gad.5 bounded implementation evidence — September 30, 2026

Worker prepared restricted browser PostHog, same-host persisted PostHog-only opt-out with localized English/Spanish controls/disclosures, and direct Gmail support in the shared footers and Privacy pages. Changed scope: `public/browser-analytics.js`, `src/components/PostHogAnalytics.astro`, both shared layouts, both Privacy pages and `docs/analytics-logging.md`. Root-owned instructions, contract, tracker, provider, Git refs and deployment were not changed by the worker; unrelated untracked directories were preserved. No autoreview, substitute review, subagents, installation or purchases/forms.

Candidate at base `fa8cda9807b07da89f3148b03624be68f6c4853a` plus the uncommitted owned files: normal validate VERIFIED (50 states, zero warnings/errors); normal build VERIFIED (219 pages), matching the recorded pre-change baseline. Existing content-collection/Browserslist build warnings remain. Eight focused ad hoc checks VERIFIED using existing Playwright and installed Chromium 1243; no test framework added. Coverage includes exact protocol/host/route gating, unsafe URL/property exclusion and required ingestion identity, storage denial/read-only, DNT, persisted/late/cross-tab opt-out, duplicate loads, SDK failure/timeout, localized controls, packaging, retained Datafast queue, unchanged Stripe URL inventory and local Worker Spanish redirect behavior. Both rendered desktop controls were inspected; 390px/1280px overflow and control visibility checks passed. Real hosted SDK 1.435.1 capture was exercised with a simulated normal browser navigator and all outbound analytics requests intercepted; identities left no local/session storage or cookies before opt-out. This is NOT a provider receipt or production acceptance.

Root integration blocker: paid guides bypass both shared layouts. The helper is packaged on 119 pages (118 eligible plus excluded wizard), while 100 independent English/Spanish guide shells lack it. Their routes are whitelisted, but the helper is not loaded there. Root must integrate `PostHogAnalytics` into `src/pages/guides/[slug].astro` and `src/pages/es/guides/[slug].astro` for guide coverage; worker did not edit these unowned content pages or `public/_worker.js`. Production/source/event/opt-out acceptance and any edge guard remain root-owned and NOT VERIFIED.

Evidence: `/Users/future/dev/ops-metrics-evidence/ops-gad-5-checks.mjs`, `ops-gad-5-checks.txt`, `ops-gad-5-validate.txt`, `ops-gad-5-build.txt`, `ops-gad-5-sdk-request.json`, `ops-gad-5-packaging.json` and English/Spanish Privacy viewport PNGs in that same evidence root. Final manifest/receipt is `ops-gad-5-worker-result.json`; earlier SDK diagnostics are exploratory, not final acceptance.

## ops-gad.5 root integration — September 30, 2026

Root fixed the guide-shell coverage gap in both guide Astro routes and added localized analytics-choice and direct company-support links to their shared React footer. All 219 built pages now package the helper; the wizard remains excluded at runtime. Normal registry validation and full build pass again, and all eight focused browser checks pass against the integrated candidate, including English/Spanish guide packaging and links. Datafast queue/goals, Worker behavior and three Stripe URLs/eight occurrences remain unchanged. Evidence: `shutdown-root-validate.log`, `shutdown-root-build.log`, `shutdown-root-browser-checks.log` and updated `ops-gad-5-packaging.json` in the evidence root above. Added a meaningful Site checks CI job for syntax, registry validation and full build; no test framework or autoreview.

Live GitHub discovery identifies the existing repository as PUBLIC, not private. Preserve its established visibility; use its normal topic PR rather than claiming a private PR or changing repository visibility. Ops Metrics remains the private source/state dashboard repository. Current production event and persisted opt-out acceptance remain NOT VERIFIED until root completes normal PR/CI integration and deployment to the existing Pages project.
