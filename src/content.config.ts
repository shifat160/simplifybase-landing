import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// Astro 7 deprecates re-exporting `z` from astro:content and expects zod v4
// directly. Imported from the package so the version is pinned in
// package.json rather than inherited from whatever astro happens to depend on.
import { z } from 'zod';

/**
 * `products` is the spine of the site. One YAML file per product feeds the nav
 * dropdown, the home page family grid, /product/, and the whole of each
 * /product/<slug>/ landing page. Adding a product is one file here plus a
 * folder under content/docs/ — no new routes, no new components.
 */
const cta = z.object({
  label: z.string(),
  href: z.string(),
  variant: z.enum(['primary', 'secondary', 'ghost']).default('secondary'),
});

const products = defineCollection({
  loader: glob({ base: './src/content/products', pattern: '**/*.yml' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      // Not derived from the filename: the id is the URL slug and we want a
      // hard error if a file is ever renamed out from under its links.
      slug: z.string(),
      tagline: z.string(),
      status: z.enum(['live', 'beta', 'planned']),
      summary: z.string(),
      // Display order in the nav and on the family grid. Lower comes first.
      order: z.number().default(100),
      // Per-product tint. Set as --sb-accent on that product's pages only, so
      // the family reads as one system with five distinguishable members.
      // Omit to inherit the SimplifyBase amber.
      accent: z
        .string()
        .regex(/^#[0-9a-fA-F]{6}$/, 'accent must be a 6-digit hex colour')
        .optional(),
      icon: z.string().optional(),
      appUrl: z.string().optional(),
      hero: z.object({
        eyebrow: z.string().optional(),
        headline: z.string(),
        sub: z.string(),
        ctas: z.array(cta).default([]),
        image: image().optional(),
      }),
      features: z
        .array(
          z.object({
            title: z.string(),
            body: z.string(),
            icon: z.string().optional(),
            // One feature per product may be flagged `wide` to anchor the
            // bento grid; the rest fill in around it.
            wide: z.boolean().default(false),
          }),
        )
        .default([]),
      /*
        The long-form alternative to `features`. A product with enough surface
        area to need chapters gets the walkthrough layout — a sticky rail of
        chapter names beside a ruled column of capabilities — and the flat
        feature grid is skipped for it. Products still in build stay on
        `features`, which is the right shape for six one-liners.
      */
      chapters: z
        .array(
          z.object({
            id: z.string(),
            title: z.string(),
            lede: z.string(),
            items: z
              .array(
                z.object({
                  title: z.string(),
                  body: z.string(),
                  // Takes the full width of the column rather than half of it.
                  wide: z.boolean().default(false),
                }),
              )
              .default([]),
          }),
        )
        .default([]),
      howItWorks: z
        .array(z.object({ title: z.string(), body: z.string() }))
        .default([]),
      integrations: z.array(z.string()).default([]),
      pricing: z
        .array(
          z.object({
            name: z.string(),
            price: z.string(),
            period: z.string().optional(),
            body: z.string(),
            features: z.array(z.string()).default([]),
            cta: cta.optional(),
            featured: z.boolean().default(false),
          }),
        )
        .default([]),
      faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    }),
});

/**
 * `docs` is one flat collection across every product. The FIRST path segment of
 * an entry id is the product slug — that is what lets a single [...slug] route
 * render /product/<product>/docs/<rest> for all products at once, and what the
 * sidebar filters on.
 *
 *   src/content/docs/simplifystock/installation.md
 *     -> id "simplifystock/installation"
 *     -> /product/simplifystock/docs/installation/
 *
 * `index.md` in a product folder becomes that product's /docs/ root.
 */
const docs = defineCollection({
  loader: glob({ base: './src/content/docs', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Sidebar heading this page sits under. Pages with no group are pinned
    // above every group, in `order`.
    group: z.string().optional(),
    order: z.number().default(100),
    // Overrides the sidebar label when the H1 is too long for the rail.
    sidebarLabel: z.string().optional(),
    draft: z.boolean().default(false),
    lastUpdated: z.coerce.date().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      author: z.string().default('SimplifyBase'),
      cover: image().optional(),
      // Ties a post to a product so the product page can surface it and the
      // post can link back. Must match a products slug.
      product: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { products, docs, blog };
