# simplifybase-landing

Astro 7 static site for simplifybase.com. Read `README.md` first — it covers the
URL scheme, the content model and how to add a product or a docs page.

## Things that will bite you

**Trailing slashes are mandatory.** `trailingSlash: 'always'`. An internal link
without one works but redirects, and the docs URLs are deep enough that it
matters. Always write `/product/simplifystock/docs/`.

**Never hardcode a colour.** Everything routes through the `--sb-*` tokens in
`src/styles/global.css`, exposed to Tailwind via `@theme inline`. Use `bg-bg`,
`text-ink`, `text-muted`, `border-line`. A raw hex will look correct in dark
mode and wrong in light.

**Accent has three tokens, not one.** `--sb-accent` is a *fill* — text on top of
it must use `--sb-accent-ink`. `--sb-accent-text` is the same hue tuned to be
read as text against the page background. They diverge sharply in light mode:
the raw amber is 7.7:1 on the dark canvas and 2.6:1 on white. Mixing them up
produces text that is unreadable in exactly one theme.

A fourth, `--sb-brand`, is the SimplifyBase mark's amber and never changes.
The logo uses it precisely so it does not follow a product's accent.

**The per-product accent override uses `:root:root`.** Astro emits `global.css`
as a `<link>` that lands *after* `BaseLayout`'s inline `<style>`, so a plain
`:root` there ties on specificity, loses on order, and the product accent
silently falls back to amber. If you touch that block, keep the doubled
selector and check a non-amber product page in both themes.

**The search script is `is:inline` and must stay that way.** Pagefind's index at
`/pagefind/` is written *after* the Astro build, so it can never be resolved at
build time. A processed `<script>` goes through Vite, which wraps every dynamic
import in its preload helper and emits an unreplaced `__VITE_PRELOAD__` for one
it was told to ignore. That throws, the `try/catch` swallows it, and search
degrades to "index unavailable" on a site whose index is present and correct —
with no error anywhere. Neither `/* @vite-ignore */` nor
`rollupOptions.external` prevents the wrapper; only keeping the script out of
the bundler does. The cost is plain JS in `SiteSearch.astro` — no TypeScript,
no imports.

**The docs product slug comes from the folder name.** `src/content/docs/` is one
flat collection; the first path segment of an entry id is the product. That is
what lets a single `[...slug]` route serve every product's docs. Do not
introduce a per-product collection.

**Section spacing is owned by `Section.astro`.** `--sb-section-y` is applied to
both edges, so a join between two sections is twice that value. The `divider`
prop draws its hairline *outside* the padded inner div deliberately — giving it
its own margin stacks three gaps into one join.

**The home hero is two screens tall on desktop, and the borders are drawn by
the wrong cells on purpose.** `HomeHero` pins one screen of quadrants while a
CSS scroll-driven animation grows the top-right panel over the rest of it. The
panel is absolutely positioned across the whole frame and revealed by a
`clip-path`, not by width, so the hairlines it must not eat are drawn by the
cells to its LEFT (`border-right`) and BELOW it (`border-top`). Move either to
the panel side and it clips them a frame early. The 200dvh height, the pin and
the whole scroll act live inside one `@supports (animation-timeline: scroll())`
block: without it — Firefox today — the hero is one static screen and there is
no dead scroll to fall through.

**`aria-hidden="true"` now decides more than screen-reader output.** Every built
page gets a plain-markdown twin (`/about/` → `/about.md`) written by
`scripts/generate-markdown.mjs` for answer engines, and that script drops every
`aria-hidden` subtree. That is deliberate — it is what keeps `AppWindow`,
`ReorderMock` and `RosterMock`'s invented sample data from being quoted as
fact. The consequence is that marking real content `aria-hidden` deletes it
from the markdown as well as from assistive tech, and marking a new decorative
mock *without* it puts fiction into `/llms-full.txt`.

The twin's path rule is written twice — `markdownPath()` in `src/lib/aeo.ts`
for the `<link rel="alternate">` in `BaseLayout`, and `mdPathFor()` in the
generator. Change one and you must change the other, or every page advertises a
404. `README.md` has the rest.

**`<meta name="sb:lastmod">` is not decoration.** `BaseLayout` emits it on any
page given a `publishedTime` or `modifiedTime`, and `add-sitemap-lastmod.mjs`
reads it back out of the built HTML after the build to fill in the sitemap's
`<lastmod>`. Remove the tag and the sitemap quietly loses its dates; there is
no error, because a URL without `<lastmod>` is valid. It is done this way round
because `@astrojs/sitemap` cannot see the content collections and the
alternative puts URL-derivation logic in `astro.config.mjs` — the one file that
differs between `main` and `staging`.

## Conventions

- Components take a `class` prop and merge it last, so callers can override.
- `Button` renders `<a>` when given `href`, `<button>` otherwise.
- Marketing pages use `MarketingLayout`; docs use `DocsLayout`. Both wrap
  `BaseLayout`, which owns `<head>`, SEO tags and the no-FOUC theme script.
- Scroll reveals: add `class="reveal"`. The observer in `BaseLayout` handles the
  rest, and content stays visible if JS or IntersectionObserver is unavailable.
- Prefer native elements over JS. The FAQ is `<details>`; the theme toggle and
  nav dropdown are the only components with real behaviour.

## Verifying a change

```bash
npm run build      # catches schema errors, broken imports, bad links in routes
npm run preview    # the only way to exercise Pagefind search
```

`npm run build` also writes the markdown twins and `llms.txt`; if you touched a
layout, check `dist/llms.txt` and spot-check one `.md` for markup that leaked
in. `npm run preview` now runs the full build rather than repeating its steps.

Check both themes. The light-mode toggle is in the nav; the stored key is
`sb-theme` in localStorage.
