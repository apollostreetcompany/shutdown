import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outputDirectory = new URL('../dist/', import.meta.url);
const sitemap = await readFile(new URL('sitemap.xml', outputDirectory), 'utf8');
assert.match(sitemap, /^<\?xml[^>]+>\s*<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
assert.match(sitemap, /<\/urlset>\s*$/);
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.equal(new Set(locations).size, locations.length, 'Sitemap URLs must be unique.');
for (const location of locations) {
  assert.equal(new URL(location).origin, 'https://shutdownassistant.com');
}

async function canonicalUrls(directory) {
  const urls = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      urls.push(...await canonicalUrls(path));
    } else if (entry.name.endsWith('.html')) {
      const html = await readFile(path, 'utf8');
      if (/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html)) continue;
      const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/);
      assert.ok(canonical, `Missing canonical URL: ${path}`);
      urls.push(canonical[1]);
    }
  }
  return urls;
}

const canonicals = await canonicalUrls(fileURLToPath(outputDirectory));
assert.ok(canonicals.length, 'Built pages must exist before sitemap validation.');
assert.deepEqual([...locations].sort(), [...new Set(canonicals)].sort(), 'Sitemap must match every indexable built canonical.');
console.log(`Sitemap verified: ${locations.length} unique canonical URLs across ${canonicals.length} indexable pages.`);
