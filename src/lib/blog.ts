import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Posts per page on the blog index. */
export const POSTS_PER_PAGE = 12;

/** Published posts, newest first. Drafts never ship. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', (p) => !p.data.draft);
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export const postHref = (post: Post) => `/blog/${post.id}/`;

/** Slugified tag, for /blog/tag/<slug>/. */
export const tagSlug = (tag: string) =>
  tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const tagHref = (tag: string) => `/blog/tag/${tagSlug(tag)}/`;

/**
 * Every tag with its post count, most-used first. Keyed by slug so two tags
 * that differ only in case or punctuation collapse into one archive rather
 * than silently splitting it.
 */
export async function getTags(): Promise<
  { tag: string; slug: string; count: number }[]
> {
  const posts = await getPosts();
  const counts = new Map<string, { tag: string; count: number }>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = tagSlug(tag);
      const existing = counts.get(slug);
      if (existing) existing.count += 1;
      else counts.set(slug, { tag, count: 1 });
    }
  }

  return [...counts.entries()]
    .map(([slug, { tag, count }]) => ({ slug, tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** Rough read time. Rounded up, floored at 1 — "0 min read" reads as broken. */
export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
