/**
 * Product and pricing registry.
 * Single source of truth for all monetization.
 */

export interface Product {
  id: string;
  name: string;
  slug: string;
  type: 'guide' | 'service';
  price: number; // cents
  currency: 'usd';
  description: string;
  includes: string[];
  stripePriceId: string | null; // set after Stripe product creation
}

// Per-state shutdown guide - $49 each
export const STATE_GUIDE_PRODUCT: Omit<Product, 'id' | 'name' | 'slug' | 'stripePriceId'> = {
  type: 'guide',
  price: 4900,
  currency: 'usd',
  description: 'Complete step-by-step shutdown guide with every form, fee, timeline, and filing requirement.',
  includes: [
    'Step-by-step dissolution checklist',
    'Every required form with direct download links',
    'Complete fee schedule',
    'Tax clearance requirements and process',
    'Timeline with expedited options',
    'Creditor and employee notification templates',
    'Post-dissolution compliance checklist',
    'Annual report and final filing deadlines',
    'Registered agent requirements',
    'Common mistakes to avoid',
  ],
};

// Full shutdown agent service - $1,000
export const SHUTDOWN_AGENT_SERVICE: Product = {
  id: 'shutdown-agent-service',
  name: 'Shutdown Agent Service',
  slug: 'shutdown-agent',
  type: 'service',
  price: 100000,
  currency: 'usd',
  description: 'We handle your entire business shutdown. Our AI-powered agent + human review team navigates every form, filing, and deadline for you.',
  includes: [
    'Complete dissolution filing with your state',
    'Tax clearance coordination',
    'Final tax return preparation guidance',
    'Creditor notification management',
    'Employee notification templates and guidance',
    'Registered agent termination',
    'EIN closure with IRS',
    'State tax account closure',
    'Business license cancellations',
    'Bank account closure checklist',
    'Insurance policy cancellation guidance',
    'Domain and digital asset transfer checklist',
    'Final compliance verification',
    'Certificate of dissolution procurement',
    'Post-dissolution monitoring (90 days)',
  ],
  stripePriceId: 'price_1TJuLBG0PuTic3wear6iqvi3',
};

// Bundle: All 50 state guides
export const ALL_STATES_BUNDLE: Product = {
  id: 'all-states-bundle',
  name: 'All 50 States Shutdown Guide Bundle',
  slug: 'all-states-bundle',
  type: 'guide',
  price: 9900,
  currency: 'usd',
  description: 'Every state guide in one package. Perfect for attorneys, accountants, and business consultants.',
  includes: [
    'All 50 individual state shutdown guides',
    'Cross-state comparison matrix',
    'Multi-state dissolution playbook',
    'Professional license included for client use',
    'Quarterly updates for 1 year',
  ],
  stripePriceId: 'price_1TJuL5G0PuTic3we4FT8xF4k',
};
