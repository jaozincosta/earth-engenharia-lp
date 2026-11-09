/**
 * Geradores de JSON-LD (schema.org). Todos leem os dados de src/config/site.ts.
 * Campos ainda em placeholder ("[ALGO]") são omitidos automaticamente.
 */
import { filled, site } from '@/config/site';

type Json = Record<string, unknown>;
const abs = (path: string, base: URL) => new URL(path, base).href;

export const orgId = (base: URL) => abs('/#organizacao', base);

export function localBusiness(base: URL): Json {
  const { address: a, contact: c, hours } = site;
  const sameAs = Object.values(site.social).filter(filled);
  return {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': orgId(base),
    name: site.name,
    ...(filled(site.legalName) && { legalName: site.legalName }),
    ...(filled(site.cnpj) && { taxID: site.cnpj }),
    description: site.description,
    slogan: site.slogans.main,
    url: base.href,
    logo: abs('/icon-512.png', base),
    image: abs('/og-default.jpg', base),
    telephone: c.phoneHref,
    ...(filled(c.email) && { email: c.email }),
    address: {
      '@type': 'PostalAddress',
      ...(filled(a.street) && { streetAddress: a.street }),
      addressLocality: a.city,
      addressRegion: a.state,
      ...(filled(a.postalCode) && { postalCode: a.postalCode }),
      addressCountry: a.country,
    },
    ...(filled(a.geo.lat) &&
      filled(a.geo.lng) && { geo: { '@type': 'GeoCoordinates', latitude: Number(a.geo.lat), longitude: Number(a.geo.lng) } }),
    ...(filled(site.social.googleBusiness) && { hasMap: site.social.googleBusiness }),
    areaServed: site.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
    ...(hours.schema && {
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: hours.schema.days, opens: hours.schema.opens, closes: hours.schema.closes },
      ],
    }),
    ...(sameAs.length && { sameAs }),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: c.phoneHref,
      contactType: 'customer service',
      areaServed: 'BR',
      availableLanguage: 'Portuguese',
    },
  };
}

export function website(base: URL): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: base.href,
    inLanguage: site.lang,
    publisher: { '@id': orgId(base) },
  };
}

export function breadcrumbs(items: { label: string; href: string }[], base: URL): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ label: 'Início', href: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      item: abs(it.href, base),
    })),
  };
}

export function faqPage(items: { q: string; a: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function service(opts: { name: string; description: string; url: string; category: string }, base: URL): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url: opts.url,
    category: opts.category,
    provider: { '@id': orgId(base) },
    areaServed: site.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
  };
}

export function course(opts: { name: string; description: string }, base: URL): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: opts.name,
    description: opts.description,
    inLanguage: site.lang,
    provider: { '@type': 'Organization', name: site.name, sameAs: base.href },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Onsite',
      location: { '@type': 'Place', name: 'In company — nas instalações do cliente', address: { '@type': 'PostalAddress', addressLocality: site.address.city, addressRegion: site.address.state, addressCountry: site.address.country } },
    },
  };
}

export function organizationAbout(base: URL): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId(base),
    name: site.name,
    url: base.href,
    logo: abs('/icon-512.png', base),
    slogan: site.slogans.signature,
    description: `Missão: ${site.institutional.mission} Visão: ${site.institutional.vision}`,
    knowsAbout: ['Engenharia ambiental', 'Segurança do trabalho', 'Licenciamento ambiental', 'Gerenciamento de resíduos', 'Gerenciamento de riscos ocupacionais'],
  };
}
