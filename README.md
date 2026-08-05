# simplifybase-landing

The site behind [simplifybase.com](https://simplifybase.com) — company landing
page, a marketing page for each product, per-product documentation, and the
blog. One Astro project, statically built.

## Getting started

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # astro build + pagefind index into dist/
npm run preview    # build, index, then serve dist/
```

Node 22.12 or newer.

## URL scheme

```
/                                     company landing page
/product/                             the product family
/product/<slug>/                      product marketing page
/product/<slug>/docs/                 that product's docs home
/product/<slug>/docs/<page>/          a docs page
/blog/  /blog/<slug>/  /blog/tag/<t>/ blog
```

All URLs carry a trailing slash (`trailingSlash: 'always'`). Link to them that
way; a link without one costs a redirect.

## Where things live

| Path | What |
|---|---|
| `src/content/products/*.yml` | One file per product. Drives the nav, the family grid and the whole product page. |
| `src/content/docs/<slug>/*.md` | Docs. The folder name **is** the product slug and the URL segment. |
| `src/content/blog/*.md` | Blog posts. |
| `src/content.config.ts` | Schemas for all three collections. |
| `src/styles/global.css` | Theme tokens, type scale, custom utilities. |
| `src/site.ts` | Brand constants, nav and footer links. |

## Adding a product

1. Add `src/content/products/<slug>.yml` — copy an existing one; the schema in
   `src/content.config.ts` will tell you what is missing.
2. Add `src/content/docs/<slug>/index.md` so `/product/<slug>/docs/` resolves.

That is the whole job. The nav, the family grid, `/product/`, the product page
and the docs routes all pick it up from those two files.

## Adding a docs page

Drop a `.md` or `.mdx` file in `src/content/docs/<slug>/`. Frontmatter:

```yaml
---
title: Installation
description: Getting SimplifyStock running on your store.
group: Getting started   # sidebar heading; omit to pin above all groups
order: 20                # within the group, ascending
---
```

## Theming

Dark is the default. Colour is defined once as `--sb-*` custom properties on
`:root` in `src/styles/global.css` and re-pointed by `[data-theme='light']`;
Tailwind utility names map onto them via `@theme inline`. Use `bg-bg`,
`text-muted`, `border-line` and friends rather than raw hex anywhere.

A product may set an `accent` hex in its YAML. `BaseLayout` derives the
light-mode variants from it — see the comment there before changing that logic,
because the failure mode is invisible in dark mode.

## Deploying

The build is a plain static `dist/` — any host that serves files will do.

### Branches

| Branch | Host | Indexed |
|---|---|---|
| `main` | `simplifybase.com` | Yes |
| `staging` | `test.simplifybase.com` | **No** — every page emits `noindex, nofollow` |

**You are on `staging`.** It differs from `main` by exactly one line: the
default `SITE_URL` in `astro.config.mjs`. Everything else — the noindex, the
robots.txt, the canonical URLs — follows from that automatically, because any
host other than `PRODUCTION_HOST` is treated as non-production.

Merging `main` → `staging` will conflict on that line. **Keep the staging
value.** The conflict is the safety mechanism working; resolving it the other
way would silently make staging indexable.

Confirm a staging build before shipping it:

```bash
npm run build
grep -c 'content="noindex' dist/index.html   # must be 1
head -1 dist/robots.txt                      # must name the staging host
```

### Tell a preview build its own host

```bash
SITE_URL=https://your-preview-host npm run build
```

Every absolute URL in the output comes from `site`: canonical, `og:url`,
sitemap entries, RSS links. Build a preview without `SITE_URL` and it claims
production's URLs for pages that only exist on the preview — a canonical
pointing at a domain that may not be live yet.

Any host other than `simplifybase.com` (see `PRODUCTION_HOST` in `src/site.ts`)
automatically self-canonicalises, emits `noindex, nofollow`, and serves a
`Disallow: /` robots.txt. Production needs no env var.

### The server must not fall back to index.html

A static site needs a **file-or-404** rule, not the SPA rewrite that many
static presets ship with. With an SPA fallback, every mistyped URL returns the
home page with HTTP 200: visitors never see the 404 page, and crawlers index
unlimited duplicate copies of the home page under junk URLs.

For nginx:

```nginx
location / {
    try_files $uri $uri/ $uri/index.html =404;
}

error_page 404 /404.html;
```

Verify it with `curl -I https://your-host/definitely-not-a-page/` — it must
return `404`, not `200`.

## Search

Pagefind indexes `dist/` after every build, so search only works against a
built site (`npm run preview`), not `npm run dev` — in dev the box says so
rather than silently returning nothing.

A page is only indexed if it carries `data-pagefind-body`. Docs pages and blog
posts do; marketing pages deliberately do not. Each also sets a filter —
`product:<slug>` on docs, `type:blog` on posts — which is what scopes the
search box in a product's sidebar to that product alone.
