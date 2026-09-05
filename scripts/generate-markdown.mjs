/**
 * Writes a plain-markdown twin of every built page into dist/, plus the two
 * llms.txt index files. Runs after `astro build` and Pagefind, as part of
 * `npm run build` — see package.json.
 *
 *   /about/                              ->  /about.md
 *   /product/simplifystock/              ->  /product/simplifystock.md
 *   /product/simplifystock/docs/setup/   ->  /product/simplifystock/docs/setup.md
 *   /                                    ->  /index.md
 *
 * WHY THIS EXISTS
 *
 * Answer engines — ChatGPT, Perplexity, Claude, Google's AI surfaces — quote
 * pages they can read cheaply. Handing them the prose without the nav, the
 * footer, the theme toggle and forty kilobytes of Tailwind means the part they
 * quote is the part we wrote. That is the whole of AEO here: same content, one
 * fetch, no markup to wade through.
 *
 * WHY IT READS dist/ RATHER THAN THE SOURCE
 *
 * The alternative is generating markdown from the content collections and the
 * product YAML. That is cleaner for docs and blog posts, whose bodies are
 * already markdown — but it cannot see /about/, /privacy/ or /terms/, whose
 * prose lives inside .astro markup and exists nowhere else. Reading the built
 * HTML covers every page by the same rule, and no page can be added later and
 * silently miss out. The cost is that this file knows about <main id="main">;
 * both layouts emit it, and that is the contract.
 *
 * Nothing here is committed. dist/ is gitignored and rebuilt every deploy.
 */
import TurndownService from 'turndown';
import { tables, strikethrough, taskListItems } from 'turndown-plugin-gfm';
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
  mkdirSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

/* /404.html has no canonical page URL to advertise and nothing worth quoting.
   The skipped directories hold build assets, not pages. */
const SKIP_FILES = new Set(['404.html']);
const SKIP_DIRS = new Set(['pagefind', '_astro', 'og', 'fonts']);

/* ------------------------------------------------------------------ walking */

function htmlFiles(dir = DIST, prefix = '') {
  const found = [];
  for (const name of readdirSync(dir).sort()) {
    if (prefix === '' && SKIP_DIRS.has(name)) continue;
    const abs = join(dir, name);
    const rel = prefix ? `${prefix}/${name}` : name;
    if (statSync(abs).isDirectory()) found.push(...htmlFiles(abs, rel));
    else if (name.endsWith('.html') && !SKIP_FILES.has(rel)) found.push(rel);
  }
  return found;
}

/* ------------------------------------------------------------- HTML reading */

const ENTITIES = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&nbsp;': ' ',
};

const decode = (s = '') =>
  s
    .replace(/&(?:amp|lt|gt|quot|#39|apos|nbsp);/g, (m) => ENTITIES[m])
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));

const first = (html, re) => decode((html.match(re) ?? [])[1] ?? '');

const titleOf = (html) => first(html, /<title>([\s\S]*?)<\/title>/);
const descOf = (html) =>
  first(html, /<meta\s+name="description"\s+content="([^"]*)"/);
const canonicalOf = (html) =>
  first(html, /<link\s+rel="canonical"\s+href="([^"]*)"/);
const siteNameOf = (html) =>
  first(html, /<meta\s+property="og:site_name"\s+content="([^"]*)"/);

/**
 * The inner HTML of <main id="main">, found by counting tags rather than by
 * regex: a lazy match would stop at the first </main> and a greedy one at the
 * last, and neither is right if <main> is ever nested. Both layouts emit
 * exactly one today, so this is cheap insurance rather than a live concern.
 */
function extractMain(html) {
  const open = html.indexOf('<main');
  if (open === -1) return null;
  const start = html.indexOf('>', open) + 1;
  if (start === 0) return null;

  let depth = 1;
  let i = start;
  while (depth > 0) {
    const nextOpen = html.indexOf('<main', i);
    const nextClose = html.indexOf('</main', i);
    if (nextClose === -1) return null;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      i = nextOpen + 5;
    } else {
      depth -= 1;
      if (depth === 0) return html.slice(start, nextClose);
      i = nextClose + 6;
    }
  }
  return null;
}

/* ------------------------------------------------------- block-level spans */

/**
 * Class names the built stylesheets give a block-level `display`.
 *
 * Turndown decides block-versus-inline from the tag name, and a <span> is
 * always inline to it. This site has spans that are not: the home page splits
 * its headline into one <span class="hero-line"> per line — and, inside those,
 * one span per word and one per character, for the rise-in animation. Rendered,
 * .hero-line is display:block and the lines are separate. Converted naively
 * they are concatenated, and the headline reads "Helping small teamscompete
 * with the big ones".
 *
 * Rather than keep a list of class names here that would rot the first time
 * someone renames one, read the CSS the build just emitted and believe it.
 * Tailwind's own `block` utility comes along for free.
 */
function loadBlockRules() {
  const BLOCK_DISPLAYS = new Set([
    'block',
    'flow-root',
    'flex',
    'grid',
    'list-item',
    'table',
  ]);
  /* A flex or grid container blockifies its children whatever display they
     were given, which is how the docs prev/next links break onto two lines
     from `<a class="flex flex-col"><span>Previous</span><span>…</span></a>`. */
  const BLOCKIFIES_CHILDREN = new Set([
    'flex',
    'grid',
    'inline-flex',
    'inline-grid',
  ]);
  const assets = join(DIST, '_astro');
  /* Classes that are themselves block-level, and classes whose child spans
     are. The second covers both of the ways that happens: a container that
     blockifies its children, and a rule written at the parent because the
     child has no class of its own — `.hero-statement > span`. */
  const own = new Set();
  const parents = new Set();

  const classesIn = (compound) =>
    [...compound.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map((m) => m[1]);

  let files;
  try {
    files = readdirSync(assets).filter((f) => f.endsWith('.css'));
  } catch {
    return { own, parents };
  }

  for (const file of files) {
    const css = readFileSync(join(assets, file), 'utf8').replace(
      /\/\*[\s\S]*?\*\//g,
      '',
    );

    for (const chunk of css.split('}')) {
      const brace = chunk.lastIndexOf('{');
      if (brace === -1) continue;

      const declarations = chunk.slice(brace + 1);
      /* The whole value, not a substring of it: "inline-block" must not read
         as "block", or every animated word becomes its own line. */
      const display = declarations.match(/(?:^|;)\s*display\s*:\s*([a-z-]+)/);
      const value = display?.[1];
      const isBlock = value !== undefined && BLOCK_DISPLAYS.has(value);
      const blockifies = value !== undefined && BLOCKIFIES_CHILDREN.has(value);
      if (!isBlock && !blockifies) continue;

      /* Anything before the last unclosed brace is an at-rule prelude —
         @media, @supports — not part of the selector. */
      const selectorPart = chunk.slice(0, brace);
      const selector = selectorPart.slice(selectorPart.lastIndexOf('{') + 1);
      if (selector.includes('@')) continue;

      for (const part of selector.split(',')) {
        /* Only the last compound is the element being styled: `.a .b` makes
           .b a block, not .a. */
        const compounds = part.trim().split(/[\s>+~]+/).filter(Boolean);
        const last = compounds.pop();
        if (!last) continue;

        const named = classesIn(last);
        if (named.length > 0) {
          for (const name of named) {
            if (isBlock) own.add(name);
            if (blockifies) parents.add(name);
          }
        } else if (isBlock && /^span\b/.test(last) && compounds.length > 0) {
          for (const name of classesIn(compounds[compounds.length - 1])) {
            parents.add(name);
          }
        }
      }
    }
  }

  return { own, parents };
}

const BLOCK = loadBlockRules();

const classTokens = (node) => (node?.getAttribute?.('class') ?? '').split(/\s+/);

/**
 * Only the immediate parent is consulted for the inherited case, which matches
 * the child combinator these rules actually use. A descendant selector two
 * levels up would be missed — no such rule exists today, and the failure is a
 * missing space rather than a wrong one.
 */
const isBlockSpan = (node) =>
  node.nodeName === 'SPAN' &&
  (classTokens(node).some((name) => BLOCK.own.has(name)) ||
    classTokens(node.parentNode).some((name) => BLOCK.parents.has(name)));

/* -------------------------------------------------------------- conversion */

const turndown = new TurndownService({
  headingStyle: 'atx',
  hr: '---',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '_',
});

/* Turndown has no table support of its own: without this a docs table
   collapses into a run of unlabelled lines, which is worse than useless — the
   figures survive and the thing that said what they measured does not. */
turndown.use([tables, strikethrough, taskListItems]);

/* Presentation with no textual meaning. The decorative SVGs are icons and the
   buttons are the theme toggle and the search trigger — all of them read as
   stray punctuation once the styling is gone. */
turndown.remove([
  'script',
  'style',
  'noscript',
  'template',
  'svg',
  'form',
  'button',
]);

/**
 * Anything hidden from assistive technology, and everything inside it.
 *
 * This is the site's own convention doing the work: AppWindow, ReorderMock and
 * RosterMock are hand-built stand-ins for screenshots, and each is marked
 * aria-hidden precisely because none of it is real. Left in, a product page's
 * markdown claims SimplifyBase sells "Dark roast, 1kg" with four days of
 * cover — invented sample data, indistinguishable from fact once an answer
 * engine has quoted it. A screen reader is told to skip this; so is a crawler.
 */
turndown.remove(
  (node) => node.getAttribute?.('aria-hidden') === 'true',
);

/**
 * The base URL of the page currently being converted, so a root-relative href
 * becomes a citable absolute one. Module-level rather than threaded through
 * every rule because Turndown's rule signature gives no place to put it; it is
 * set immediately before each turndown() call below and read nowhere else.
 */
let currentBase = null;

function absolute(href) {
  if (!href) return href;
  /* mailto:, tel: and external links are already absolute, or are
     intentionally not page URLs. Only relative hrefs need a base. */
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return href;
  try {
    return new URL(href, currentBase).href;
  } catch {
    return href;
  }
}

/* The permalink the autolink plugin appends to every docs heading. Its text is
   a bare "#", which converts to a stray link on the end of each heading. */
turndown.addRule('headingAnchor', {
  filter: (node) =>
    node.nodeName === 'A' &&
    (node.getAttribute('class') ?? '').includes('heading-anchor'),
  replacement: () => '',
});

/**
 * A single newline, not a blank line. These spans are the lines a sentence was
 * broken across for the layout, not separate thoughts — the hero statement is
 * one <p> split into three. A blank line would make three paragraphs and cut
 * the sentence in half; a soft break is what markdown has for exactly this,
 * and readers fold it back into one paragraph.
 */
turndown.addRule('blockSpan', {
  filter: isBlockSpan,
  replacement: (content) => (content.trim() ? `\n${content.trim()}\n` : ''),
});

/* A markdown heading is one line and a markdown link label cannot contain a
   newline, so the breaks blockSpan introduces have to come back out again in
   both — as the single space that was missing in the first place. */
const oneLine = (text) => text.replace(/\s+/g, ' ').trim();

turndown.addRule('heading', {
  filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  replacement: (content, node) => {
    const text = oneLine(content);
    if (!text) return '';
    return `\n\n${'#'.repeat(Number(node.nodeName.charAt(1)))} ${text}\n\n`;
  },
});

turndown.addRule('absoluteLink', {
  filter: (node) => node.nodeName === 'A' && node.getAttribute('href'),
  replacement: (content, node) => {
    const text = oneLine(content);
    if (!text) return '';
    return `[${text}](${absolute(node.getAttribute('href'))})`;
  },
});

turndown.addRule('absoluteImage', {
  filter: 'img',
  replacement: (_content, node) => {
    const src = node.getAttribute('src');
    if (!src) return '';
    return `![${node.getAttribute('alt') ?? ''}](${absolute(src)})`;
  },
});

/* Shiki ships both themes in one block, so a code sample arrives as a nest of
   coloured <span>s that Turndown would faithfully reproduce as markdown. Take
   the text and the language Shiki already recorded, and drop the rest. */
turndown.addRule('shikiCodeBlock', {
  filter: (node) => node.nodeName === 'PRE',
  replacement: (_content, node) => {
    const language = node.getAttribute('data-language') ?? '';
    const code = node.textContent.replace(/\n+$/, '');
    return `\n\n\`\`\`${language}\n${code}\n\`\`\`\n\n`;
  },
});

/* The FAQ is a list of <details>. Turndown would flatten a question into a
   plain paragraph, losing the pairing that makes an FAQ worth quoting at all;
   bolding the summary keeps question and answer visibly attached. */
turndown.addRule('summary', {
  filter: 'summary',
  replacement: (content) => `\n\n**${content.trim()}**\n\n`,
});

const tidy = (md) =>
  md
    .replace(/ /g, ' ')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

/* ------------------------------------------------------------------ writing */

/** dist-relative .html path -> dist-relative .md path. */
const mdPathFor = (htmlPath) =>
  htmlPath === 'index.html'
    ? 'index.md'
    : htmlPath.replace(/\/index\.html$/, '.md');

/* JSON is a subset of YAML for double-quoted scalars, so this escapes a title
   containing a colon or a quote without pulling in a YAML serialiser. */
const yamlString = (value) => JSON.stringify(value ?? '');

/* ------------------------------------------------------------- llms.txt map */

/**
 * Which llms.txt section a page belongs to. The order here is the order they
 * are printed: what the site sells, then how to use it, then everything else.
 * "Optional" is llms.txt's own convention for links a reader short on context
 * may skip — tag archives are navigation, not content.
 */
const SECTIONS = [
  'Products',
  'Documentation',
  'Blog',
  'Company',
  'Legal',
  'Optional',
];

function sectionFor(pathname) {
  if (/^\/product\/[^/]+\/docs\//.test(pathname)) return 'Documentation';
  if (/^\/product\//.test(pathname)) return 'Products';
  if (/^\/blog\/tag\//.test(pathname)) return 'Optional';
  if (/^\/blog\//.test(pathname)) return 'Blog';
  if (/^\/(privacy|terms)\//.test(pathname)) return 'Legal';
  return 'Company';
}

/* ---------------------------------------------------------------- the build */

const pages = [];

for (const htmlPath of htmlFiles()) {
  const html = readFileSync(join(DIST, htmlPath), 'utf8');
  const canonical = canonicalOf(html);
  const main = extractMain(html);

  if (!canonical || !main) {
    const why = !canonical ? 'no canonical URL' : 'no <main id="main">';
    console.warn(`  ! skipped ${htmlPath} — ${why}`);
    continue;
  }

  currentBase = canonical;
  const body = tidy(turndown.turndown(main));
  currentBase = null;

  const title = titleOf(html);
  const description = descOf(html);
  const mdPath = mdPathFor(htmlPath);

  const frontmatter = [
    '---',
    `title: ${yamlString(title)}`,
    `description: ${yamlString(description)}`,
    `url: ${yamlString(canonical)}`,
    '---',
    '',
  ].join('\n');

  const out = join(DIST, mdPath);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, `${frontmatter}\n${body}\n`, 'utf8');

  pages.push({
    title,
    description,
    canonical,
    pathname: new URL(canonical).pathname,
    mdUrl: new URL(`/${mdPath}`, canonical).href,
    body,
  });
}

if (pages.length === 0) {
  console.error('generate-markdown: no pages in dist/. Did the build run?');
  process.exit(1);
}

/* Read off the built home page rather than duplicated from src/site.ts, which
   is TypeScript this script cannot import — and off the built page rather than
   hardcoded, so a preview build describes itself with its own host. */
const home = pages.find((p) => p.pathname === '/') ?? pages[0];
const origin = new URL(home.canonical).origin;
const siteName =
  siteNameOf(readFileSync(join(DIST, 'index.html'), 'utf8')) || 'SimplifyBase';

const grouped = new Map(SECTIONS.map((s) => [s, []]));
for (const page of pages) grouped.get(sectionFor(page.pathname)).push(page);

/* Shallowest path first, so a section leads with its index — /blog/ above the
   posts, / above the rest of the company pages — rather than sorting the index
   into the middle of its own children alphabetically. */
const depth = (pathname) => pathname.split('/').filter(Boolean).length;
for (const entries of grouped.values()) {
  entries.sort(
    (a, b) =>
      depth(a.pathname) - depth(b.pathname) ||
      a.pathname.localeCompare(b.pathname),
  );
}

const index = [
  `# ${siteName}`,
  '',
  `> ${home.description}`,
  '',
  'Every page on this site is also served as markdown: append `.md` to its',
  'path, or follow the links below. `/llms-full.txt` is all of it in one file.',
  '',
];

for (const section of SECTIONS) {
  const entries = grouped.get(section);
  if (entries.length === 0) continue;
  index.push(`## ${section}`, '');
  for (const page of entries) {
    const label = page.title.replace(
      new RegExp(`\\s+—\\s+${siteName}$`),
      '',
    );
    const note = page.description ? `: ${page.description}` : '';
    index.push(`- [${label}](${page.mdUrl})${note}`);
  }
  index.push('');
}

writeFileSync(join(DIST, 'llms.txt'), `${index.join('\n').trim()}\n`, 'utf8');

const full = [
  `# ${siteName}`,
  '',
  `> ${home.description}`,
  '',
  `Every page of ${origin}, as markdown, in one file.`,
  '',
];

for (const page of pages) {
  full.push(
    '---',
    '',
    `# ${page.title}`,
    '',
    `URL: ${page.canonical}`,
    '',
    page.body,
    '',
  );
}

writeFileSync(
  join(DIST, 'llms-full.txt'),
  `${full.join('\n').trim()}\n`,
  'utf8',
);

console.log(
  `\n[markdown] ${pages.length} .md pages, llms.txt and llms-full.txt -> dist/\n`,
);
