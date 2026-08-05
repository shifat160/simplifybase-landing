import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '~/site';
import { getPosts, postHref } from '~/lib/blog';

export async function GET(context: APIContext) {
  const posts = await getPosts();

  return rss({
    title: `${SITE.name} blog`,
    description: SITE.description,
    // context.site comes from `site` in astro.config.mjs; rss() requires an
    // absolute origin to build item links.
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: postHref(post),
      categories: post.data.tags,
      author: post.data.author,
    })),
    customData: '<language>en-gb</language>',
  });
}
