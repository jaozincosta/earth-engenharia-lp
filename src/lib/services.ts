import { getCollection, type CollectionEntry } from 'astro:content';
import { categories, type CategoryKey } from '@/config/site';

export type Service = CollectionEntry<'servicos'>;

export async function getServices(): Promise<Service[]> {
  const all = await getCollection('servicos', ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getServicesByCategory() {
  const services = await getServices();
  return (Object.keys(categories) as CategoryKey[]).map((key) => ({
    key,
    ...categories[key],
    services: services.filter((s) => s.data.category === key),
  }));
}

export const serviceUrl = (s: Service) => `/servicos/${s.id}/`;
