import type { APIContext } from 'astro';
import { PRODUCTION_HOST } from '~/site';

/**
 * Generated rather than a static file in public/, so the sitemap URL always
 * matches the host that was actually built and a preview deployment cannot
 * invite crawlers in.
 *
 * A hardcoded robots.txt on a preview host is worse than none: it points
 * crawlers at a sitemap full of production URLs while allowing the preview's
 * own duplicate pages to be indexed.
 */
export function GET({ site }: APIContext) {
  const base = site ?? new URL(`https://${PRODUCTION_HOST}`);
  const isProduction = base.hostname === PRODUCTION_HOST;

  const body = isProduction
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', base)}\n`
    : `# Non-production host (${base.hostname}) — not for indexing.\nUser-agent: *\nDisallow: /\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
