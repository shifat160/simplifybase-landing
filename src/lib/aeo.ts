/**
 * The markdown twin of a page.
 *
 * Every built page is mirrored as plain markdown by
 * scripts/generate-markdown.mjs, which runs after the Astro build. This is the
 * same path rule expressed from the page's side, so <head> can advertise the
 * twin it will be served alongside:
 *
 *   /                            ->  /index.md
 *   /about/                      ->  /about.md
 *   /product/x/docs/y/           ->  /product/x/docs/y.md
 *
 * The two implementations must agree. If you change the mapping in one, change
 * it in the other — a rel="alternate" pointing at a file the generator did not
 * write is a 404 advertised on every page.
 */
export function markdownPath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/index.md' : `${trimmed}.md`;
}
