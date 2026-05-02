# Analytics and Edge Logging

This site uses two complementary analytics paths:

- DataFast for browser pageviews, human sessions, and conversion goals.
- Cloudflare Pages Function logs for every HTML request that reaches the edge, including bots and non-JavaScript clients.

## DataFast Setup

1. Create a DataFast website for `shutdownassistant.com`.
2. Add the website ID to the Cloudflare Pages project:

```sh
wrangler pages secret put DATAFAST_WEBSITE_ID --project-name shutdownassistant
```

Optional runtime settings:

```sh
wrangler pages secret put DATAFAST_DOMAIN --project-name shutdownassistant
wrangler pages secret put DATAFAST_SCRIPT_SRC --project-name shutdownassistant
```

Defaults:

- `DATAFAST_DOMAIN=shutdownassistant.com`
- `DATAFAST_SCRIPT_SRC=https://datafa.st/js/script.js`
- `DATAFAST_DISABLE_CONSOLE=true`

The Pages worker injects the DataFast script into HTML responses at runtime. The static Astro pages include the DataFast queue and funnel event collector, so the website ID does not need to be committed to source.

## DataFast Goals

The global event collector sends these goals:

- `find_state_clicked`
- `state_link_clicked`
- `premium_guide_link_clicked`
- `pricing_link_clicked`
- `agent_link_clicked`
- `internal_link_clicked`
- `external_link_clicked`
- `guide_checkout_started`
- `bundle_checkout_started`
- `agent_checkout_started`
- `scroll_25`
- `scroll_50`
- `scroll_75`
- `scroll_90`

Each goal includes context where available:

- `page_path`
- `page_type`
- `locale`
- `state`
- `link_path`
- `link_text`
- `link_domain`
- `product`

## Suggested Funnels

Create these in the DataFast dashboard:

1. State guide funnel
   - Page visit: URL contains `/states/`
   - Goal: `pricing_link_clicked` or `premium_guide_link_clicked`
   - Goal: `guide_checkout_started`

2. Paid guide sales page funnel
   - Page visit: URL contains `/guides/`
   - Goal: `scroll_50`
   - Goal: `guide_checkout_started`

3. Agent funnel
   - Page visit: URL equals `/shutdown-agent` or `/es/shutdown-agent`
   - Goal: `scroll_50`
   - Goal: `agent_checkout_started`

4. Homepage discovery funnel
   - Page visit: URL equals `/` or `/es`
   - Goal: `find_state_clicked`
   - Goal: `state_link_clicked`
   - Goal: `pricing_link_clicked` or `agent_link_clicked`

## Cloudflare Logs

Tail structured edge visit logs:

```sh
npm run logs:cloudflare
```

Use JSON output for filtering:

```sh
npm run logs:cloudflare:json
```

Each edge log line is a JSON object with `event=edge_visit` and includes:

- request method, host, path, query presence, status, and referrer host
- visitor type: `bot`, `likely_bot`, `likely_human`, or `unknown`
- classification reason
- Cloudflare bot score and verified bot category when the plan exposes them
- user agent, country, colo, ASN, and AS organization
- Cloudflare Ray ID

The worker intentionally avoids logging visitor IP addresses.
