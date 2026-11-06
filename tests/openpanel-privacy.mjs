import assert from 'node:assert/strict';

const listeners = new Map();
const values = new Map();
const requests = [];
const requestOptions = [];
const window = {
  location: new URL('https://shutdownassistant.com/pricing?session_id=secret#section'),
  navigator: { doNotTrack: null, globalPrivacyControl: false },
  localStorage: { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key) },
  addEventListener(name, fn) { const callbacks = listeners.get(name) ?? []; callbacks.push(fn); listeners.set(name, callbacks); },
  dispatchEvent(event) { for (const fn of listeners.get(event.type) ?? []) fn(event); },
};
const document = {
  title: 'Private title should not be sent', referrer: 'https://shutdownassistant.com/?session_id=secret',
  querySelector: () => ({ dataset: { posthogPublicPaths: JSON.stringify(['/', '/pricing', '/es/pricing', '/guides/california']) } }),
  addEventListener(name, fn) { listeners.set(`document:${name}`, [fn]); },
};
Object.assign(globalThis, {
  window, document,
  history: { pushState(_state, _title, url) { window.location = new URL(url, window.location); }, replaceState() {} },
  sessionStorage: { getItem: () => null },
  fetch: async (_url, init) => { requests.push(JSON.parse(init.body)); requestOptions.push(init); return { status: 202, text: async () => '' }; },
});
const { initOpenPanelPageviews } = await import('../src/lib/openpanel-pageviews.mjs');
window.navigator.doNotTrack = 'yes';
assert.equal(initOpenPanelPageviews(), null, 'DNT disables tracking');
window.navigator.doNotTrack = null;
window.location = new URL('https://preview.pages.dev/pricing');
assert.equal(initOpenPanelPageviews(), null, 'preview hosts are excluded');
window.location = new URL('https://shutdownassistant.com/pricing?session_id=secret#section');
values.set('shutdown-assistant-posthog-opt-out', '1');
assert.equal(initOpenPanelPageviews(), null, 'saved opt-out is respected');
values.set('shutdown-assistant-posthog-opt-out', 'unexpected');
assert.equal(initOpenPanelPageviews(), null, 'unknown preference fails closed');
values.delete('shutdown-assistant-posthog-opt-out');
const client = initOpenPanelPageviews();
assert.strictEqual(initOpenPanelPageviews(), client, 'single SDK instance');
assert.equal(client.options.clientId, '1d311288-54a7-468c-9d9f-3d1ac0225980');
assert.equal(client.options.trackScreenViews, true);
assert.equal(client.options.trackOutgoingLinks, false);
assert.equal(client.options.trackAttributes, false);
assert.equal(client.options.sessionReplay.enabled, false);
assert.equal(client.api.maxRetries, 0);
const wait = () => new Promise((resolve) => setTimeout(resolve, 80));
await wait();
assert.equal(requests.length, 1);
assert.equal(requests[0].payload.name, 'screen_view');
assert.equal(requestOptions[0].credentials, 'omit');
assert.equal(requestOptions[0].referrerPolicy, 'no-referrer');
assert.deepEqual(requests[0].payload.properties, { __path: 'https://shutdownassistant.com/pricing' });
assert.ok(!JSON.stringify(requests).includes('secret'));
window.navigator.globalPrivacyControl = true;
history.pushState({}, '', '/');
await wait();
window.navigator.globalPrivacyControl = false;
history.pushState({}, '', '/wizard');
await wait();
assert.equal(requests.length, 1, 'GPC and paths absent from the existing public allowlist are excluded');
window.location = new URL('https://shutdownassistant.com/privacy');
listeners.get('document:click')[0]({ target: { closest: () => ({}) } });
history.pushState({}, '', '/es/pricing');
await wait();
assert.equal(requests.length, 1, 'a clicked opt-out remains effective even if it cannot be persisted');
console.log('PASS: OpenPanel privacy and allowlist checks with a local transport stub');
