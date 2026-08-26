/**
 * Site-wide constants. Anything that appears in more than one layout or that a
 * non-developer might reasonably want to change lives here rather than being
 * typed into markup twice.
 *
 * Product entries are NOT here — they come from the `products` content
 * collection so the nav, the family grid and the product pages can never
 * disagree. See src/lib/products.ts for the helpers that read it.
 */
/**
 * The one host that is allowed to be indexed and to advertise itself as
 * canonical. Every other host a build lands on — preview deployments, staging,
 * a colleague's laptop — is treated as non-production: it self-canonicalises,
 * emits noindex, and serves a Disallow-all robots.txt.
 *
 * Set SITE_URL at build time so a preview knows its own host:
 *   SITE_URL=https://aged-moss.1wp.site npm run build
 *
 * Without it, a preview builds absolute URLs pointing at production — a
 * canonical to a domain that may not exist yet, and a sitemap listing pages
 * that are not there.
 */
export const PRODUCTION_HOST = 'simplifybase.com';

export const SITE = {
  name: 'SimplifyBase',
  url: `https://${PRODUCTION_HOST}`,
  tagline: 'AI automation, made simple',
  description:
    'SimplifyBase is a product studio building focused software for commerce, operations and customer workflows. Practical AI and automation, without the complexity.',
  promise: 'Fewer clicks. Cleaner decisions. Faster execution.',
  email: 'hello@simplifybase.com',
  ogImage: '/og/default.png',
  locale: 'en_US',
} as const;

/**
 * The "by the numbers" strip on the home page.
 *
 * PLACEHOLDERS. Only the first two are derivable from the repo; the rest are
 * claims about the business that need real figures before launch. Better to
 * ship an honest small number than a made-up big one — a stat nobody can back
 * up is the fastest way to lose a technical buyer.
 */
export const STATS = [
  { value: '5', label: 'Products in the family', note: 'One shipping, four in build.' },
  { value: '100%', label: 'Bootstrapped', note: 'No outside investment, no board to answer to.' },
  { value: '~2 min', label: 'Typical daily use', note: 'Per product, once it is set up.' },
  { value: '0', label: 'Data sold, ever', note: 'Models are per-customer and never pooled.' },
] as const;

/**
 * Rendered in the footer and on /contact/. Every entry must resolve — a 404 in
 * the footer appears on all 38 pages at once.
 *
 * GitHub is out until the org exists: github.com/simplifybase returned 404.
 * Add it back the day it is created.
 */
export const SOCIAL = [
  { label: 'X', href: 'https://x.com/simplifybase' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/simplifybase' },
] as const;

export interface NavItem {
  label: string;
  href: string;
  /** Renders as a products dropdown rather than a plain link. */
  dropdown?: boolean;
}

/**
 * Top-level nav. The Products entry is rendered as a dropdown, not a link.
 *
 * The bar draws one divided cell per item edge to edge, so a short list leaves
 * a conspicuous empty run — these five are the minimum that makes it read as a
 * navigation bar rather than a logo with three afterthoughts.
 *
 * Docs points at the flagship product's documentation; every other product's
 * docs are reachable from its own page and from the products menu.
 */
export const NAV: readonly NavItem[] = [
  { label: 'Products', href: '/product/', dropdown: true },
  { label: 'Docs', href: '/product/simplifystock/docs/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Changelog', href: '/changelog/' },
  { label: 'About', href: '/about/' },
];

export const FOOTER_COLUMNS = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'Changelog', href: '/changelog/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'All products', href: '/product/' },
      { label: 'RSS', href: '/rss.xml' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy/' },
      { label: 'Terms', href: '/terms/' },
    ],
  },
] as const;
