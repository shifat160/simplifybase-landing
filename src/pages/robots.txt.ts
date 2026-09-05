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

  /*
    Non-production deliberately ALLOWS crawling.

    `Disallow: /` and a noindex meta tag are in direct conflict: Disallow stops
    the crawler fetching the page, so it never reads the noindex. A URL picked
    up from an external link can then still be listed — as a bare URL with no
    title — and there is no way to get it removed, because the instruction to
    remove it is inside a page the crawler is forbidden to read.

    Allowing the fetch is what makes `noindex, nofollow` (emitted by
    BaseLayout on every non-production host) actually take effect. No sitemap
    is advertised, so nothing is volunteered either.

    This keeps a preview out of search results. It does not keep it private —
    for that, put HTTP auth in front of the host.
  */
  const body = isProduction
    ? [
        'User-agent: *',
        'Allow: /',
        '',
        '# Every page is also served as plain markdown for answer engines:',
        '# append .md to any path, or start from the index below.',
        `# ${new URL('/llms.txt', base)}`,
        '',
        `Sitemap: ${new URL('/sitemap-index.xml', base)}`,
        '',
      ].join('\n')
    : [
        `# Non-production host (${base.hostname}).`,
        '# Crawling is allowed ON PURPOSE so the noindex meta tag on every page',
        '# can be read and honoured. Disallow would hide that instruction.',
        'User-agent: *',
        'Allow: /',
        '',
        '# The markdown twins are the exception. A .md file is served as plain',
        '# text, so there is no <head> to put a noindex in and no way to ask for',
        '# removal after the fact — Disallow is the only instrument available,',
        '# and unlike above it costs nothing, because there is no tag inside the',
        '# file that a crawler needs to fetch it to read.',
        'Disallow: /*.md$',
        'Disallow: /llms.txt',
        'Disallow: /llms-full.txt',
        '',
      ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
