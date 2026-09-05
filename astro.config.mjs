// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { unified } from '@astrojs/markdown-remark';

// Every route here is authored — there is no mirrored/legacy half to work
// around, unlike xcloud-landing-site. Three content collections (products,
// docs, blog) drive nearly all of it; see src/content.config.ts.
// Every absolute URL in the output — canonical, og:url, sitemap entries, RSS
// links — is derived from `site`. See PRODUCTION_HOST in src/site.ts for what
// else keys off this.
//
// ─────────────────────────────────────────────────────────────────────────────
// THIS IS THE PRODUCTION DEFAULT. `staging` carries the same block with
// test.simplifybase.com instead — that one line is the ONLY intended
// difference between the two branches, and it is why merging either way
// conflicts here. Resolve it by keeping whichever host belongs to the branch
// you are merging INTO: production on `main`, staging on `staging`.
//
// Defaulting rather than relying on a SITE_URL env var at deploy time is
// deliberate on both branches: it makes the safe outcome the automatic one.
// A staging build that forgot the variable would claim production's canonical
// URLs and be fully indexable, and duplicate content is far more expensive to
// unpick than a wrong hostname.
//
// The failure this guards against has already happened once: the staging
// build was deployed to simplifybase.com, so the live site served
// `noindex, nofollow` on every page and canonicalised itself to
// test.simplifybase.com. Check which branch a host is building before
// assuming a deploy is fine.
// ─────────────────────────────────────────────────────────────────────────────
const SITE_URL = process.env.SITE_URL ?? 'https://simplifybase.com';

export default defineConfig({
  output: 'static',
  site: SITE_URL,

  // Docs URLs are deep (/product/simplifystock/docs/installation/) and get
  // linked from outside, so pin one canonical form and never emit the other.
  trailingSlash: 'always',

  markdown: {
    // Astro 7 moved remark/rehype plugins off `markdown.*` and onto a processor
    // built with unified() — passing them at the top level still works but is
    // deprecated.
    //
    // Astro already slugs headings; autolink adds the hover permalink beside
    // them. `behavior: 'append'` keeps the anchor out of the heading's text
    // content, so the sidebar TOC and Pagefind results stay clean.
    processor: unified({
      rehypePlugins: [
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'append',
            properties: {
              class: 'heading-anchor',
              ariaHidden: true,
              tabIndex: -1,
            },
            content: { type: 'text', value: '#' },
          },
        ],
      ],
    }),
    shikiConfig: {
      // Both themes ship in the same HTML; global.css picks one with
      // `--shiki-dark`/`--shiki-light` so code follows the theme toggle
      // without a re-render.
      themes: { light: 'github-light', dark: 'github-dark-default' },
      wrap: false,
    },
  },

  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
