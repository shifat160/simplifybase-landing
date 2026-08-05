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

**The docs product slug comes from the folder name.** `src/content/docs/` is one
flat collection; the first path segment of an entry id is the product. That is
what lets a single `[...slug]` route serve every product's docs. Do not
introduce a per-product collection.

**Section spacing is owned by `Section.astro`.** `--sb-section-y` is applied to
both edges, so a join between two sections is twice that value. The `divider`
prop draws its hairline *outside* the padded inner div deliberately — giving it
its own margin stacks three gaps into one join.

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

Check both themes. The light-mode toggle is in the nav; the stored key is
`sb-theme` in localStorage.
