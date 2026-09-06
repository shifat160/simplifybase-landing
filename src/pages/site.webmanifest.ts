import { SITE } from '~/site';

/**
 * The web app manifest, generated rather than kept as a static file so the
 * name and description cannot drift from src/site.ts.
 *
 * Deliberately minimal. This is a marketing site, not an installable app —
 * `display` is omitted so it stays "browser", and there is no start_url beyond
 * the root. What it is actually for is the icon Android uses when someone adds
 * the site to their home screen, which otherwise falls back to a screenshot.
 */
export function GET() {
  const manifest = {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: '/',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    /* The light canvas, matching the default theme and the light
       theme-color in BaseLayout. A manifest gets one value, not a pair. */
    theme_color: '#ffffff',
    background_color: '#ffffff',
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
}
