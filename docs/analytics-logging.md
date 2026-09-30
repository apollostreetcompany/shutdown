# Analytics and Edge Logging

This site uses three complementary analytics paths:

- DataFast for browser pageviews, human sessions, and conversion goals.
- PostHog for restricted public production pageviews, with a separate browser opt-out.
- Cloudflare Pages Function logs for every HTML request that reaches the edge, including bots and non-JavaScript clients.

## Restricted PostHog pageviews

`PostHogAnalytics.astro` packages `/browser-analytics.js` with a whitelist derived from the actual state content registry and existing safe static English/Spanish routes. Only HTTPS `shutdownassistant.com` on its standard port may load the SDK. Trailing slashes are allowed. Localhost, Pages previews, other hosts (including the redirecting Spanish host), unknown slugs and wizard/form/private/customer/API/auth/checkout/download/success paths are excluded. Navigation queries remain intact but are never included in PostHog events.

The public ingestion token belongs to Portfolio Web, PostHog project 635580 (US); it is not a provider read credential. The SDK loads from `https://us-assets.i.posthog.com/static/array.js` and ingests at `https://us.i.posthog.com`. Only manual `$pageview` survives `before_send`. Allowed event properties are SDK identities (`distinct_id`, `$insert_id`, `$device_id`, `$time`, `$lib`, `$lib_version`, `$session_id`, `$window_id`), the ingestion token, disabled geo/person-profile markers, hostname, pathname and origin plus pathname. Only SDK event `uuid` and `timestamp` may also survive at the event envelope. Queries, fragments, referrers, titles, content, customer/business/email/payment/form/audio/chat data and custom events/properties are discarded.

Identities use memory only; persistence, person profiles, autocapture, replay, flags, geographic enrichment and external dependency loading are disabled. Do Not Track is honored. The provider still receives the network IP during browser connections; disabling enrichment does not conceal that IP. Counts are estimates, not verified people.

Both Privacy pages offer a readable, localized opt-out, linked from their shared footers. `shutdown-assistant-posthog-opt-out=1` in same-host local storage blocks loading and future capture. The preference covers English and Spanish on that host, not other hosts/devices/browsers, and clearing storage removes it. Storage denial, invalid preference values or read-only storage fail closed. Opt-out also blocks an in-flight loader's late callback and later events; storage events synchronize saved opt-out across tabs. One SDK load and pageview are allowed per document; failed loading times out after eight seconds without retry. This control changes neither Datafast nor edge logs, and does not retract requests already sent.

Datafast's queue/goals and Worker runtime settings remain separate. Direct support and privacy questions use `mailto:apollostreetcompany@gmail.com`; no domain alias or forwarding is verified by this implementation. Production acceptance additionally requires root-owned source/deployment verification and an actual provider receipt; local intercepted SDK checks are not that receipt.

Root integration includes the two independent paid-guide shells as well as the shared layouts: all 219 built pages package the helper, while the wizard still fails the runtime route gate. Guide footers link to the localized Privacy/analytics choice and direct company support. Loader packaging alone is not a production event receipt.

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
