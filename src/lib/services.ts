import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { categories, categoryKeys } from '@/config/site';

export type Service = CollectionEntry<'servicos'>;

export async function getServices(): Promise<Service[]> {
  const all = await getCollection('servicos', ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Agrupa pela categoria principal (primeira da lista) — usado no menu e no rodapé. */
export async function getServicesByCategory() {
  const services = await getServices();
  return categoryKeys.map((key) => ({
    key,
    ...categories[key],
    services: services.filter((s) => s.data.categories[0] === key),
  }));
}

export async function getRelated(service: Service): Promise<Service[]> {
  const entries = await Promise.all(service.data.related.map((slug) => getEntry('servicos', slug)));
  const missing = service.data.related.filter((_, i) => !entries[i]);
  if (missing.length) throw new Error(`Serviço "${service.id}": related inexistente(s): ${missing.join(', ')}`);
  return entries as Service[];
}

export const serviceUrl = (s: Service | string) => `/servicos/${typeof s === 'string' ? s : s.id}/`;
