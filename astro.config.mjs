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
export default defineConfig({
  output: 'static',
  site: 'https://simplifybase.com',

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
