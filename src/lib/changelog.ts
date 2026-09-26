import { getCollection, type CollectionEntry } from 'astro:content';

export type Release = CollectionEntry<'changelog'>;

/** Folder under content/changelog/ used for company-wide notes. */
export const COMPANY = 'simplifybase';

/** The product a release belongs to, from the first path segment of its id. */
export function releaseProduct(entry: Release): string {
  return entry.id.split('/')[0]!;
}

/** URL segment of a release: its file name, e.g. "1.4.0" or "0.2.0-beta". */
export function releaseSlug(entry: Release): string {
  return entry.id.split('/').slice(1).join('/');
}

export const productChangelogHref = (slug: string) => `/product/${slug}/changelog/`;

/** A release's own page, or null for company notes, which have none. */
export function releaseHref(entry: Release): string | null {
  const product = releaseProduct(entry);
  return product === COMPANY
    ? null
    : `/product/${product}/changelog/${releaseSlug(entry)}/`;
}

/** Published releases, newest first, optionally for one product. */
export async function getReleases(product?: string): Promise<Release[]> {
  const all = await getCollection(
    'changelog',
    (r) => !r.data.draft && (!product || releaseProduct(r) === product),
  );
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const formatReleaseDate = (d: Date) =>
  d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
