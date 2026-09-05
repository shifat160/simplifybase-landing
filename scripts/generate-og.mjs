/**
 * Generates the Open Graph share images into public/og/.
 *
 *   node scripts/generate-og.mjs
 *
 * Playwright is NOT a project dependency — this is a dev-only utility and the
 * PNGs it produces are committed. Run it with `npx playwright` available:
 *
 *   npm i -D playwright && npx playwright install chromium
 *
 * ...or just leave the committed PNGs alone. Re-run it when the wordmark, the
 * accent palette or a product's headline changes.
 *
 * One image per product plus a default, because a product page shared into
 * Slack should carry that product's own hue and headline rather than the
 * company card.
 */
import { chromium } from 'playwright';
import { parse } from 'yaml';
import { readFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public/og');

const SIZE = { width: 1200, height: 630 };

/* The site's brand constants, duplicated rather than imported: src/site.ts is
   TypeScript and this script has no build step. Keep them in sync. */
const BRAND = '#FF7A45';
const INK = '#16130f';
const MUTED = '#635c53';
const PAPER = '#ffffff';

/*
  Same FNV-1a + mulberry32 pair as src/components/ui/Mosaic.astro, so a card's
  mosaic is the same deterministic pattern the site would draw for that seed.
  If the algorithm there changes, change it here too.
*/
function makeRandom(input) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let state = h >>> 0;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function mosaic(seed, accent, cols = 48, rows = 5) {
  const ramp = [
    accent,
    `color-mix(in oklab, ${accent} 80%, #ffffff)`,
    `color-mix(in oklab, ${accent} 55%, #ffffff)`,
    `color-mix(in oklab, ${accent} 85%, #c81e3c)`,
    `color-mix(in oklab, ${accent} 65%, #ffcf5c)`,
  ];
  const rand = makeRandom(seed);
  const cells = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const probability = 1.02 - (x / (cols - 1)) * 0.9;
      const filled = rand() < probability;
      const colour = filled ? ramp[Math.floor(rand() * ramp.length)] : null;
      const diamond = filled && rand() < 0.06;
      cells.push(
        `<span style="${colour ? `background:${colour};` : ''}${
          diamond ? 'transform:rotate(45deg) scale(.78);' : ''
        }"></span>`,
      );
    }
  }
  return `<div class="mosaic" style="grid-template-columns:repeat(${cols},1fr)">${cells.join('')}</div>`;
}

/** The wordmark from src/components/ui/Logo.astro, inlined. */
const mark = (accent) => `
  <svg viewBox="0 0 24 24" fill="none" width="40" height="40">
    <rect x="2" y="16" width="20" height="6" rx="2" fill="${INK}"/>
    <rect x="5" y="9" width="14" height="5" rx="1.75" fill="${INK}" opacity=".55"/>
    <rect x="8.5" y="2" width="7" height="5" rx="1.75" fill="${accent}"/>
  </svg>`;

const esc = (s) =>
  String(s).replace(
    /[&<>]/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c],
  );

function card({ eyebrow, headline, sub, accent, seed, fontCss }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    ${fontCss}
    *{margin:0;padding:0;box-sizing:border-box}
    body{width:${SIZE.width}px;height:${SIZE.height}px;background:${PAPER};
      font-family:'Geist Variable',system-ui,sans-serif;
      display:flex;flex-direction:column;justify-content:space-between;
      -webkit-font-smoothing:antialiased}
    .top{padding:72px 72px 0}
    .brandrow{display:flex;align-items:center;gap:14px;margin-bottom:56px}
    .brandrow span{font-size:27px;font-weight:500;letter-spacing:-.02em;color:${INK}}
    .eyebrow{font-family:'Geist Mono Variable',ui-monospace,monospace;
      font-size:16px;letter-spacing:.16em;text-transform:uppercase;
      color:${accent === BRAND ? MUTED : accent};margin-bottom:22px}
    h1{font-size:${headline.length > 42 ? 62 : 72}px;line-height:1.06;
      letter-spacing:-.035em;font-weight:500;color:${INK};max-width:15.5em}
    p{margin-top:26px;font-size:27px;line-height:1.45;color:${MUTED};max-width:26em}
    .mosaic{display:grid;width:100%;aspect-ratio:48/5;flex-shrink:0}
    .mosaic > span{display:block;aspect-ratio:1}
  </style></head><body>
    <div class="top">
      <div class="brandrow">${mark(accent)}<span>SimplifyBase</span></div>
      ${eyebrow ? `<div class="eyebrow">${esc(eyebrow)}</div>` : ''}
      <h1>${esc(headline)}</h1>
      ${sub ? `<p>${esc(sub)}</p>` : ''}
    </div>
    ${mosaic(seed, accent)}
  </body></html>`;
}

/* Fonts have to be embedded: the page is set with setContent and has no origin
   to resolve a relative file:// URL against. */
function fontFace(family, path) {
  const b64 = readFileSync(join(ROOT, 'node_modules', path)).toString('base64');
  return `@font-face{font-family:'${family}';font-weight:100 900;font-display:block;
    src:url(data:font/woff2;base64,${b64}) format('woff2-variations')}`;
}

const fontCss =
  fontFace(
    'Geist Variable',
    '@fontsource-variable/geist/files/geist-latin-wght-normal.woff2',
  ) +
  fontFace(
    'Geist Mono Variable',
    '@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2',
  );

const products = readdirSync(join(ROOT, 'src/content/products'))
  .filter((f) => f.endsWith('.yml'))
  .map((f) => parse(readFileSync(join(ROOT, 'src/content/products', f), 'utf8')))
  .sort((a, b) => a.order - b.order);

const cards = [
  {
    file: 'default.png',
    eyebrow: 'AI automation, made simple',
    headline: 'Helping small teams compete with the big ones',
    sub: 'Five focused products for commerce, operations and customer workflows.',
    accent: BRAND,
    seed: 'simplifybase-home',
  },
  ...products.map((p) => ({
    file: `${p.slug}.png`,
    eyebrow: p.name,
    headline: p.hero?.headline ?? p.tagline,
    sub: p.tagline,
    accent: p.accent,
    seed: `og-${p.slug}`,
  })),
];

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: SIZE,
  deviceScaleFactor: 1,
});

for (const c of cards) {
  await page.setContent(card({ ...c, fontCss }), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(OUT, c.file) });
  console.log('✓ public/og/' + c.file);
}

await browser.close();
