/**
 * Fills in <lastmod> on the sitemap entries whose page knows its own date.
 * Runs after `astro build`, as part of `npm run build`.
 *
 * WHY IT READS THE BUILT PAGES
 *
 * @astrojs/sitemap has no access to the content collections, so the obvious
 * implementation — a `serialize` hook in astro.config.mjs — would have to
 * re-derive every URL from the markdown files itself. That means a third copy
 * of the rules that already live in src/lib/blog.ts and src/lib/docs.ts, in
 * the one file that differs between `main` and `staging` and is therefore the
 * riskiest place in the repo to touch.
 *
 * Instead BaseLayout emits <meta name="sb:lastmod"> on any page that has a
 * date, and this reads it back out of the page the sitemap is pointing at. The
 * URL-to-file mapping is Astro's own output layout, and nothing is derived
 * twice.
 *
 * Pages with no date — the home page, /about/, the legal pages — get no
 * <lastmod>, which is correct: the element is optional per URL, and inventing
 * a date for them is exactly the kind of noise that teaches Google to ignore
 * the field.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITEMAP = join(DIST, 'sitemap-0.xml');

if (!existsSync(SITEMAP)) {
  console.error('add-sitemap-lastmod: dist/sitemap-0.xml missing. Build first.');
  process.exit(1);
}

/** Astro's output layout: /about/ -> dist/about/index.html, / -> dist/index.html. */
function pageFor(loc) {
  const { pathname } = new URL(loc);
  return join(DIST, pathname.replace(/^\/|\/$/g, ''), 'index.html');
}

/**
 * A date-only value where the time carries no information, which is every case
 * here — the frontmatter dates are plain days and coerce to midnight UTC.
 * `2026-06-12` is a valid W3C datetime and reads as what it is.
 */
function format(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.valueOf())) return null;
  return date.toISOString().endsWith('T00:00:00.000Z')
    ? date.toISOString().slice(0, 10)
    : date.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function lastmodFor(loc) {
  const file = pageFor(loc);
  if (!existsSync(file)) return null;
  const html = readFileSync(file, 'utf8');
  const found = html.match(/<meta\s+name="sb:lastmod"\s+content="([^"]+)"/);
  return found ? format(found[1]) : null;
}

let added = 0;
let total = 0;

const xml = readFileSync(SITEMAP, 'utf8').replace(
  /<url>\s*<loc>([^<]+)<\/loc>([\s\S]*?)<\/url>/g,
  (whole, loc, rest) => {
    total += 1;
    /* Never write a second one if the integration ever starts emitting them. */
    if (rest.includes('<lastmod>')) return whole;
    const lastmod = lastmodFor(loc);
    if (!lastmod) return whole;
    added += 1;
    return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod>${rest}</url>`;
  },
);

writeFileSync(SITEMAP, xml, 'utf8');
console.log(`\n[sitemap] lastmod on ${added} of ${total} URLs\n`);
