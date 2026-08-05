import { getCollection, type CollectionEntry } from 'astro:content';

export type Doc = CollectionEntry<'docs'>;

/**
 * `docs` is one flat collection across all products. An entry id is
 * `<product>/<path...>`, and `index` is the product's docs root:
 *
 *   simplifystock/index         -> /product/simplifystock/docs/
 *   simplifystock/installation  -> /product/simplifystock/docs/installation/
 */
export function docProduct(entry: Doc): string {
  return entry.id.split('/')[0]!;
}

/** The path segment after /docs/, or '' for a product's docs root. */
export function docSlug(entry: Doc): string {
  const rest = entry.id.split('/').slice(1).join('/');
  return rest === 'index' ? '' : rest;
}

export function docHref(entry: Doc): string {
  const slug = docSlug(entry);
  return `/product/${docProduct(entry)}/docs/${slug ? `${slug}/` : ''}`;
}

/**
 * Every published doc for a product, in sidebar order: ungrouped pages first
 * (the docs root and anything else pinned to the top), then groups in the order
 * their first page appears, each sorted by `order`.
 */
export async function getDocsForProduct(product: string): Promise<Doc[]> {
  const all = await getCollection(
    'docs',
    (d) => !d.data.draft && docProduct(d) === product,
  );

  return all.sort((a, b) => {
    // The docs root always leads, whatever its order value.
    const aRoot = docSlug(a) === '';
    const bRoot = docSlug(b) === '';
    if (aRoot !== bRoot) return aRoot ? -1 : 1;

    if (a.data.order !== b.data.order) return a.data.order - b.data.order;
    return a.data.title.localeCompare(b.data.title);
  });
}

export interface SidebarGroup {
  /** null for pages with no `group`, which render above every named group. */
  title: string | null;
  items: Doc[];
}

/**
 * Groups sorted docs for the sidebar rail. Group order follows the lowest
 * `order` value inside each group, so moving a page can promote its whole
 * section — which is usually what you want, and is easy to see in the diff.
 */
export function buildSidebar(docs: Doc[]): SidebarGroup[] {
  const groups = new Map<string | null, Doc[]>();

  for (const doc of docs) {
    const key = doc.data.group ?? null;
    const bucket = groups.get(key);
    if (bucket) bucket.push(doc);
    else groups.set(key, [doc]);
  }

  const ordered = [...groups.entries()].map(([title, items]) => ({
    title,
    items,
    weight: Math.min(...items.map((i) => i.data.order)),
  }));

  ordered.sort((a, b) => {
    if (a.title === null) return -1;
    if (b.title === null) return 1;
    return a.weight - b.weight;
  });

  return ordered.map(({ title, items }) => ({ title, items }));
}

/** Previous/next in the same flattened order the sidebar shows. */
export function getNeighbours(docs: Doc[], current: Doc) {
  const flat = buildSidebar(docs).flatMap((g) => g.items);
  const i = flat.findIndex((d) => d.id === current.id);
  return {
    prev: i > 0 ? flat[i - 1] : undefined,
    next: i >= 0 && i < flat.length - 1 ? flat[i + 1] : undefined,
  };
}

/** Products that actually have documentation, for conditional nav links. */
export async function getDocumentedProducts(): Promise<Set<string>> {
  const all = await getCollection('docs', (d) => !d.data.draft);
  return new Set(all.map(docProduct));
}
