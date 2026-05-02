# CONTRACT.md - Analytics and Edge Logging

## Ask

Set up DataFast and Cloudflare logging to see whether Shutdown Assistant gets bot visits, human visits, and conversion-funnel activity across all pages.

## Done Criteria

- [x] DataFast tracking script is present on every English, Spanish, and premium guide page.
- [x] Conversion goal events are attached to navigation and checkout actions across the site.
- [x] Cloudflare Pages worker emits structured request logs that classify bot, likely bot, likely human, and unknown traffic.
- [x] Documentation explains how to configure DataFast and tail Cloudflare logs after deploy.
- [x] Build and validation pass.

## Evidence

- `npm run validate`
- `npm run build`
- Source diff for analytics and worker changes

## Executor

Codex

## Constraints

- Keep the site static on Cloudflare Pages.
- Do not require a secret DataFast ID in source; use Cloudflare Pages environment variables.
- Do not modify `apollo-workspace/`.
