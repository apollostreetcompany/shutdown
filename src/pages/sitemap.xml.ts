import type { APIRoute } from 'astro';
import stateData from '../../data/states/index.json';

const stateRoutes = new Set([
  '/states/[slug]',
  '/guides/[slug]',
  '/es/states/[slug]',
  '/es/guides/[slug]',
]);

function canonicalPath(route: string): string {
  if (route === '/') return route;
  if (route === '/es' || route.startsWith('/es/') || route.startsWith('/guides/')) {
    return route;
  }
  return `${route}/`;
}

function escapeXml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('A configured site URL is required for the sitemap.');

  const paths = Object.keys(import.meta.glob('./**/*.astro')).flatMap((filename) => {
    const route = filename.replace(/^\./, '').replace(/\.astro$/, '').replace(/\/index$/, '') || '/';
    if (stateRoutes.has(route)) {
      return Object.values(stateData).map((state) => canonicalPath(route.replace('[slug]', state.slug)));
    }
    if (route.includes('[')) throw new Error(`Unexpanded sitemap route: ${route}`);
    return [canonicalPath(route)];
  });

  const entries = [...new Set(paths)].sort().map((path) => {
    return `  <url><loc>${escapeXml(new URL(path, site).href)}</loc></url>`;
  });
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
