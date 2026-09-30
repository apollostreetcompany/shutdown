# Shutdown searchable sitemap — ops-gad.7

## Ask and delivery target
Fulfil the existing portfolio SEO requirement by replacing the production HTML fallback at `https://shutdownassistant.com/sitemap.xml` with valid XML. Root owns implementation, normal topic PR integration and deployment to the existing `shutdownassistant` Pages project on main. The canonical tracker remains `/Users/future/dev/ops-metrics/.beads/`.

## Done criteria and evidence
- Generate URLs from actual Astro routes and the existing state registry, including every currently indexable built page and matching its canonical URL.
- Normal registry validation and build pass; generated-output validation detects omissions, duplicates and canonical drift; independent XML parsing passes.
- Normal public source PR and Site checks pass; exact merged source is deployed to the existing target.
- Actual production and search-agent responses are valid XML with the correct content type, and representative listed pages remain reachable.
- Existing analytics helper bytes, Stripe URLs, content, Datafast runtime and Spanish redirects are unchanged.

## Constraints
No dependencies, test framework, provider credentials, Worker changes, customer operations or unrelated source changes. Preserve `apollo-workspace/` and `session-summaries/`. The explicit portfolio NO AUTOREVIEW instruction applies. Domain email delivery and payment completion are separate outstanding portfolio requirements.
