/**
 * Route patterns for the shutdown assistant site.
 * All routes derive from this registry - no hardcoded paths.
 */

export const ROUTES = {
  // Landing pages
  home: '/',
  about: '/about',
  pricing: '/pricing',
  contact: '/contact',

  // State pages
  stateIndex: '/states',
  stateGuide: (slug: string) => `/states/${slug}`,
  stateGuideSection: (slug: string, section: string) => `/states/${slug}#${section}`,

  // Paid guides
  guideCheckout: (slug: string) => `/guides/${slug}/checkout`,
  guideDownload: (slug: string) => `/guides/${slug}/download`,

  // Agent service
  agentService: '/shutdown-agent',
  agentCheckout: '/shutdown-agent/checkout',

  // Legal
  terms: '/terms',
  privacy: '/privacy',
  disclaimer: '/disclaimer',
} as const;

export const ROUTE_PATTERNS = {
  stateGuide: '/states/[slug]',
  guideCheckout: '/guides/[slug]/checkout',
} as const;
