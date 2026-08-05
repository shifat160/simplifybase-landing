/**
 * Site-wide constants. Anything that appears in more than one layout or that a
 * non-developer might reasonably want to change lives here rather than being
 * typed into markup twice.
 *
 * Product entries are NOT here — they come from the `products` content
 * collection so the nav, the family grid and the product pages can never
 * disagree. See src/lib/products.ts for the helpers that read it.
 */
export const SITE = {
  name: 'SimplifyBase',
  url: 'https://simplifybase.com',
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

export const SOCIAL = [
  { label: 'GitHub', href: 'https://github.com/simplifybase' },
  { label: 'X', href: 'https://x.com/simplifybase' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/simplifybase' },
] as const;

export interface NavItem {
  label: string;
  href: string;
  /** Renders as a products dropdown rather than a plain link. */
  dropdown?: boolean;
}

/** Top-level nav. The Products entry is rendered as a dropdown, not a link. */
export const NAV: readonly NavItem[] = [
  { label: 'Products', href: '/product/', dropdown: true },
  { label: 'Blog', href: '/blog/' },
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
