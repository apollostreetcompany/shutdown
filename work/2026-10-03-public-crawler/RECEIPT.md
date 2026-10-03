# Shutdown public crawler boundary — ops-gad.20

## Runtime correction, October 3, 2026

Initial PR3/main689b0c6/CI37155084476 and existing Pages ff967706 succeeded,
but live acceptance did not pass: Spanish robots retained a cached old301.
CF-Cache-Status HIT/Age752 confirms the stale successful response; a distinct
diagnostic cache key reaches the corrected root file. Both observations are
retained, not substituted for acceptance of the original URL. Exact Spanish
discovery redirects now carry no-store; four new actual-handler assertions
fail before this correction. Existing cache invalidation and full required
source/main/live acceptance remain root-owned. Other redirects/assets/config,
DNS/mail/bot settings and billing remain unchanged. No denied-client retry.

## Candidate evidence, October 3, 2026

Implementation prepared against main e148d70f488ad2ff2057549666ee4d1e8de3b307.
The existing Worker now rejects nineteen literal named non-search headers before
assets, analytics and logging. Exact discovery is exempt; Spanish discovery
redirects intentionally reach canonical root files, preserving query strings.
All other redirects and source content, assets, checkout, analytics and privacy
are unchanged. CI adds a syntax check for this existing Worker, no test framework.

External actual-handler checks: before 51 failures in 79 checks; after 79/79
pass. Fixtures exercise the actual Worker with isolated ASSETS/HTMLRewriter;
they do not establish live provider, real crawler IP or customer behavior.
Existing registry validation, build, Worker/helper syntax and sitemap coverage
pass: 219 canonical pages. All 232 non-Worker build files remain SHA256 exact.
Eight DNS records, two mail rules, catch-all, global bot and Pages configuration
fingerprints were collected before release; masked secrets remain unverified.
Ordinary before403 is retained without retry. Seventeen distinct predeclared
search-header/Spanish HTTP baselines were retained, not ordinary-client retries.

Evidence is retained once outside Git at /Users/future/dev/ops-metrics-evidence,
prefix shutdown-crawler-. The root canonical tracker owns live acceptance.
Normal source PR/current main CI, existing Pages release, actual runtime/native
journey and private report acceptance are still pending at this candidate stage.
No review, install, new resource/key/service, payment, customer/mail, DNS/bot
write, cleanup-guardrail retry or unrelated untracked-file modification.
