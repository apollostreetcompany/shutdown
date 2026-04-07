/**
 * Master registry of all 50 US states and their business shutdown metadata.
 * Single source of truth - agents write prose, not structure.
 */

export interface StateShutdownInfo {
  code: string;
  name: string;
  slug: string;
  agency: string;
  agencyAbbr: string;
  website: string;
  onlinePortal: string | null;
  phone: string;
  address: string;
  email: string | null;

  // Entity dissolution info
  entities: {
    llc: EntityDissolution;
    corporation: EntityDissolution;
    lp: EntityDissolution | null;
    llp: EntityDissolution | null;
    nonprofit: EntityDissolution | null;
    foreignEntity: EntityDissolution | null;
  };

  // Tax requirements
  tax: {
    clearanceRequired: boolean;
    finalReturnRequired: boolean;
    taxAgency: string;
    taxAgencyUrl: string;
    taxAgencyPhone: string;
    notes: string;
  };

  // Timeline
  timeline: {
    standardProcessingDays: string;
    expeditedAvailable: boolean;
    expeditedProcessingDays: string | null;
    expeditedFee: number | null;
    waitingPeriods: string | null;
  };

  // Additional requirements
  requirements: {
    publicationRequired: boolean;
    publicationDetails: string | null;
    employeeNotification: string;
    creditorNotification: string;
    registeredAgentNotes: string;
    windingUpPeriod: string | null;
    boardOrMemberApproval: string;
  };

  // Guide metadata
  guide: {
    price: number;
    tier: 'standard';
    includes: string[];
  };
}

export interface EntityDissolution {
  formName: string;
  formNumber: string | null;
  formUrl: string | null;
  fee: number;
  onlineFiling: boolean;
  onlineFilingUrl: string | null;
  steps: string[];
  notes: string | null;
}

// Will be populated from research agent data
export const STATES: Record<string, StateShutdownInfo> = {};

// State codes for iteration
export const STATE_CODES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
] as const;

export type StateCode = typeof STATE_CODES[number];

export const STATE_NAMES: Record<StateCode, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};

export const STATE_SLUGS: Record<StateCode, string> = Object.fromEntries(
  Object.entries(STATE_NAMES).map(([code, name]) => [
    code,
    name.toLowerCase().replace(/\s+/g, '-'),
  ])
) as Record<StateCode, string>;
