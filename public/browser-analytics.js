const PROJECT_TOKEN = 'phc_A3jp2cuP6qTXg627mtsrzMjgdhDGzZudciWkf3g8u457';
const OPT_OUT_KEY = 'shutdown-assistant-posthog-opt-out';
const SAFE_SDK_PROPERTIES = ['distinct_id', '$insert_id', '$device_id', '$time', '$lib', '$lib_version', '$session_id', '$window_id'];
const messages = document.documentElement.lang === 'es' ? {
  unavailable: 'PostHog está desactivado porque este navegador no puede guardar la preferencia.',
  off: 'PostHog está desactivado en este navegador. Esta elección no cambia Datafast.',
  unsaved: 'PostHog está desactivado en esta página. El navegador no pudo guardar esta elección para futuras visitas.',
  failed: 'PostHog no pudo cargarse en esta visita. Aún puedes guardar tu elección de desactivarlo.',
  dnt: 'PostHog está desactivado porque este navegador envía Do Not Track.',
  excluded: 'PostHog no se carga en esta dirección. Puedes guardar tu elección de desactivarlo.',
  on: 'Se permiten visitas de página de PostHog en las páginas públicas de producción. Puedes desactivarlas en este navegador.',
} : {
  unavailable: 'PostHog is off because this browser cannot save the analytics preference.',
  off: 'PostHog is off in this browser. This choice does not change Datafast.',
  unsaved: 'PostHog is off for this page. Your browser could not save this choice for later visits.',
  failed: 'PostHog could not load on this visit. You can still save your opt-out choice.',
  dnt: 'PostHog is off because this browser sends Do Not Track.',
  excluded: 'PostHog does not load at this address. You can save your opt-out choice.',
  on: 'PostHog pageviews are permitted on public production pages. You can turn them off in this browser.',
};
let analyticsState = 'idle';
let optedOutInMemory = false;
let preferenceSaved = true;
let analyticsScript;
let loadTimer;
let controlsBound = false;
let pageviewCaptured = false;
let publicPaths = new Set();
try {
  publicPaths = new Set(JSON.parse(document.querySelector('[data-posthog-public-paths]')?.dataset.posthogPublicPaths || '[]'));
} catch {}

function preference() {
  if (optedOutInMemory) return 'off';
  try {
    const stored = window.localStorage.getItem(OPT_OUT_KEY);
    if (stored === '1') return 'off';
    if (stored !== null && stored !== '0') return 'unavailable';
    const availabilityKey = `${OPT_OUT_KEY}-storage-check`;
    window.localStorage.setItem(availabilityKey, '1');
    const writable = window.localStorage.getItem(availabilityKey) === '1';
    window.localStorage.removeItem(availabilityKey);
    return writable ? 'on' : 'unavailable';
  } catch {
    return 'unavailable';
  }
}

function isPublicProductionPage() {
  return window.location.protocol === 'https:' &&
    window.location.host === 'shutdownassistant.com' && publicPaths.has(window.location.pathname);
}

function doNotTrack() {
  return [window.navigator.doNotTrack, window.doNotTrack, window.navigator.msDoNotTrack]
    .some((value) => value === '1' || value === 'yes');
}

function canCapture() {
  return isPublicProductionPage() && preference() === 'on' && !doNotTrack() &&
    analyticsState !== 'failed' && analyticsState !== 'off';
}

export function sanitizePostHogEvent(event) {
  if (!event || event.event !== '$pageview' || !canCapture()) return null;
  const safeProperties = {};
  for (const property of SAFE_SDK_PROPERTIES) {
    const value = event.properties?.[property];
    if (typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value))) {
      safeProperties[property] = value;
    }
  }
  safeProperties.token = PROJECT_TOKEN;
  safeProperties.$geoip_disable = true;
  safeProperties.$process_person_profile = false;
  safeProperties.$host = window.location.hostname;
  safeProperties.$pathname = window.location.pathname;
  safeProperties.$current_url = `${window.location.origin}${window.location.pathname}`;
  const safeEvent = { event: '$pageview', properties: safeProperties };
  for (const property of ['uuid', 'timestamp']) {
    const value = event[property];
    if (typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value))) safeEvent[property] = value;
  }
  if (event.timestamp instanceof Date && Number.isFinite(event.timestamp.getTime())) safeEvent.timestamp = event.timestamp;
  return safeEvent;
}

function updateControls() {
  const button = document.querySelector('[data-posthog-opt-out]');
  const status = document.querySelector('[data-posthog-status]');
  if (!button || !status) return;
  const choice = preference();
  button.disabled = choice !== 'on';
  const message = choice === 'unavailable' ? 'unavailable' : choice === 'off' ? (preferenceSaved ? 'off' : 'unsaved') :
    doNotTrack() ? 'dnt' : !isPublicProductionPage() ? 'excluded' : analyticsState === 'failed' ? 'failed' : 'on';
  status.textContent = messages[message];
}

function stopPendingLoad() {
  window.clearTimeout(loadTimer);
  if (Array.isArray(window.posthog)) {
    window.posthog.length = 0;
    window.posthog._i.length = 0;
  }
  if (analyticsScript) {
    analyticsScript.onerror = null;
    analyticsScript.remove();
  }
}

export function optOutPostHog() {
  optedOutInMemory = true;
  analyticsState = 'off';
  stopPendingLoad();
  preferenceSaved = false;
  try {
    window.localStorage.setItem(OPT_OUT_KEY, '1');
    preferenceSaved = window.localStorage.getItem(OPT_OUT_KEY) === '1';
  } catch {}
  try { window.posthog?.opt_out_capturing?.(); } catch {}
  updateControls();
}

function bindControls() {
  if (controlsBound) return;
  controlsBound = true;
  document.querySelector('[data-posthog-opt-out]')?.addEventListener('click', optOutPostHog);
  window.addEventListener('storage', (event) => {
    if (event.key !== OPT_OUT_KEY && event.key !== null) return;
    if (event.newValue === '1' || preference() !== 'on') {
      optedOutInMemory = true;
      analyticsState = 'off';
      stopPendingLoad();
      try { window.posthog?.opt_out_capturing?.(); } catch {}
    }
    updateControls();
  });
}

export function initPostHogPageviews() {
  bindControls();
  updateControls();
  if (!canCapture() || analyticsState !== 'idle' || window.__shutdownPostHogInitialized) return;
  window.__shutdownPostHogInitialized = true;
  analyticsState = 'loading';
  const queue = [];
  queue._i = [];
  queue.__SV = 1;
  queue.toString = () => 'posthog (stub)';
  queue.init = (token, configuration) => queue._i.push([token, configuration, 'posthog']);
  window.posthog = queue;
  queue.init(PROJECT_TOKEN, {
    api_host: 'https://us.i.posthog.com',
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    capture_dead_clicks: false,
    capture_performance: false,
    capture_exceptions: false,
    disable_session_recording: true,
    disable_surveys: true,
    disable_web_experiments: true,
    disable_conversations: true,
    disable_product_tours: true,
    advanced_disable_flags: true,
    advanced_disable_decide: true,
    advanced_disable_feature_flags: true,
    advanced_disable_toolbar_metrics: true,
    disable_external_dependency_loading: true,
    persistence: 'memory',
    disable_persistence: true,
    person_profiles: 'never',
    save_campaign_params: false,
    save_referrer: false,
    respect_dnt: true,
    debug: false,
    ip: false,
    disable_geoip: true,
    request_batching: false,
    before_send: sanitizePostHogEvent,
    loaded: (client) => {
      window.clearTimeout(loadTimer);
      if (analyticsState !== 'loading' || !canCapture() || pageviewCaptured) return;
      analyticsState = 'active';
      pageviewCaptured = true;
      client.capture('$pageview', {
        $host: window.location.hostname,
        $pathname: window.location.pathname,
        $current_url: `${window.location.origin}${window.location.pathname}`,
      });
    },
  });
  analyticsScript = document.createElement('script');
  analyticsScript.async = true;
  analyticsScript.crossOrigin = 'anonymous';
  analyticsScript.referrerPolicy = 'no-referrer';
  analyticsScript.src = 'https://us-assets.i.posthog.com/static/array.js';
  analyticsScript.dataset.shutdownPosthog = 'true';
  const failLoad = () => {
    if (analyticsState !== 'loading') return;
    analyticsState = 'failed';
    stopPendingLoad();
    updateControls();
  };
  analyticsScript.onerror = failLoad;
  loadTimer = window.setTimeout(failLoad, 8000);
  document.head.append(analyticsScript);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPostHogPageviews, { once: true });
} else {
  initPostHogPageviews();
}
