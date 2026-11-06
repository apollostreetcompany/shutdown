import { OpenPanel } from '@openpanel/web';

const OPT_OUT_KEY = 'shutdown-assistant-posthog-opt-out';
let optedOutInMemory = false;
let controlsBound = false;

function publicPaths() {
  try {
    return new Set(JSON.parse(document.querySelector('[data-posthog-public-paths]')?.dataset.posthogPublicPaths || '[]'));
  } catch {
    return new Set();
  }
}

function preferenceAllowsTracking() {
  if (optedOutInMemory) return false;
  try {
    const stored = window.localStorage.getItem(OPT_OUT_KEY);
    if (stored !== null && stored !== '0') return false;
    const probe = `${OPT_OUT_KEY}-storage-check`;
    window.localStorage.setItem(probe, '1');
    const writable = window.localStorage.getItem(probe) === '1';
    window.localStorage.removeItem(probe);
    return writable;
  } catch {
    return false;
  }
}

function allowed(location = window.location) {
  const doNotTrack = [window.navigator.doNotTrack, window.doNotTrack, window.navigator.msDoNotTrack]
    .some((value) => value === '1' || value === 'yes');
  return location.protocol === 'https:' && location.host === 'shutdownassistant.com' &&
    publicPaths().has(location.pathname) && preferenceAllowsTracking() && !doNotTrack &&
    window.navigator.globalPrivacyControl !== true && !window.navigator.webdriver;
}

function filter(event) {
  if (event.type !== 'track' || event.payload.name !== 'screen_view' || !allowed()) return false;
  const pathname = event.payload.properties?.__path;
  if (typeof pathname !== 'string') return false;
  let page;
  try { page = new URL(pathname); } catch { return false; }
  if (!allowed(page)) return false;
  // Match the existing public-page policy: no referrer, title, or query data.
  event.payload.properties = { __path: `${page.origin}${page.pathname}` };
  return true;
}

export function initOpenPanelPageviews() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;
  if (!controlsBound) {
    controlsBound = true;
    document.addEventListener('click', (event) => {
      if (event.target?.closest?.('[data-posthog-opt-out]')) optedOutInMemory = true;
    }, true);
  }
  if (!allowed()) return null;
  if (window.__shutdownOpenPanel) return window.__shutdownOpenPanel;
  window.__shutdownOpenPanel = new OpenPanel({
    clientId: '1d311288-54a7-468c-9d9f-3d1ac0225980',
    trackScreenViews: true,
    trackOutgoingLinks: false,
    trackAttributes: false,
    sessionReplay: { enabled: false },
    filter,
  });
  // The pinned SDK transport otherwise retries 403 responses.
  window.__shutdownOpenPanel.api.maxRetries = 0;
  const transport = window.__shutdownOpenPanel.api;
  const send = transport.fetch.bind(transport);
  transport.fetch = (path, body, options = {}) => send(path, body, {
    ...options, credentials: 'omit', referrerPolicy: 'no-referrer',
  });
  return window.__shutdownOpenPanel;
}
