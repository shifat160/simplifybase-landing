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
// THIS IS THE staging BRANCH. The default below is the staging host, NOT
// production. `main` carries the same block with simplifybase.com — that one
// line is the ONLY intended difference between the two branches.
//
// Defaulting rather than relying on a SITE_URL env var at deploy time is
// deliberate on both branches: it makes the safe outcome the automatic one.
// A staging build that forgot the variable would claim production's canonical
// URLs and be fully indexable, and duplicate content is far more expensive to
// unpick than a wrong hostname.
//
// DO NOT TRUST THE MERGE CONFLICT TO CATCH THIS. It only fires when the two
// branches have diverged. Merge main into staging after main was itself
// branched OFF staging — which is how the redesign got to production — and
// git sees the production URL as a linear change staging is merely missing,
// takes it silently, and staging starts advertising production's canonicals.
// That happened on this very merge. After ANY merge from main, re-read this
// line before you push.
//
// Both failure modes have now occurred once each:
//   · the staging build was deployed to simplifybase.com, so the live site
//     served `noindex, nofollow` on all 38 pages and canonicalised itself to
//     test.simplifybase.com;
//   · this line silently became production's during a main → staging merge.
// Check which host a branch builds for, and which branch a host is building.
// ─────────────────────────────────────────────────────────────────────────────
const SITE_URL = process.env.SITE_URL ?? 'https://test.simplifybase.com';

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
