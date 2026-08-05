import { getCollection, type CollectionEntry } from 'astro:content';

export type Product = CollectionEntry<'products'>;

/** Products in display order. The single read-path for the whole site. */
export async function getProducts(): Promise<Product[]> {
  const products = await getCollection('products');
  return products.sort((a, b) => {
    if (a.data.order !== b.data.order) return a.data.order - b.data.order;
    return a.data.name.localeCompare(b.data.name);
  });
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.data.slug === slug);
}

export const productHref = (slug: string) => `/product/${slug}/`;
export const productDocsHref = (slug: string) => `/product/${slug}/docs/`;

export const STATUS_LABEL: Record<Product['data']['status'], string> = {
  live: 'Live',
  beta: 'Beta',
  planned: 'Planned',
};
