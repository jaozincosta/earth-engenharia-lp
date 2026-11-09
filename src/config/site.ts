/**
 * Dados institucionais da EARTH Engenharia.
 * ⚠️ Substitua os valores marcados com TODO pelos dados reais antes de publicar
 * no domínio definitivo — eles alimentam o SEO local (Schema.org), o rodapé,
 * o botão de WhatsApp e a página de contato.
 */
export const site = {
  name: 'EARTH Engenharia',
  legalName: 'EARTH Engenharia', // TODO: razão social completa
  cnpj: '', // TODO: CNPJ (aparece no rodapé quando preenchido)
  tagline: 'Soluções técnicas para um futuro sustentável',
  slogans: {
    main: 'Soluções técnicas para um futuro sustentável',
    partner: 'Meio ambiente, segurança e conformidade em um só parceiro!',
    future: 'Construindo um amanhã melhor',
  },
  description:
    'Consultoria em engenharia ambiental e segurança do trabalho: licenciamento ambiental, PGRS, PGR, LTCAT, laudos técnicos, treinamentos de NRs e regularização de empresas.',
  locale: 'pt_BR',
  lang: 'pt-BR',

  contact: {
    // WhatsApp: só dígitos com DDI 55 + DDD
    whatsapp: '5511974280016',
    phoneDisplay: '(11) 97428-0016',
    phoneHref: '+5511974280016',
    email: 'contato@earthengenharia.com.br', // TODO
    whatsappMessage: 'Olá! Vim pelo site e gostaria de um orçamento com a EARTH Engenharia.',
  },

  address: {
    // TODO: endereço real (essencial para SEO local / Google Business Profile)
    street: '', // TODO: logradouro e número
    district: '', // TODO: bairro
    city: 'São Paulo',
    state: 'SP',
    postalCode: '', // TODO: CEP
    country: 'BR',
    geo: { lat: -23.5505, lng: -46.6333 }, // TODO: coordenadas exatas do escritório
  },

  /** Cidades/regiões atendidas — usadas em textos e no Schema.org (areaServed). */
  areaServed: ['São Paulo', 'Guarulhos', 'Osasco', 'Barueri', 'Santo André', 'São Bernardo do Campo', 'Grande São Paulo'],

  hours: { days: 'Segunda a sexta', open: '08:00', close: '18:00' },

  social: {
    instagram: '', // TODO: https://instagram.com/...
    linkedin: '', // TODO: https://linkedin.com/company/...
  },
} as const;

export const whatsappUrl = (message: string = site.contact.whatsappMessage) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;

export const nav = [
  { label: 'Início', href: '/' },
  { label: 'Serviços', href: '/servicos/' },
  { label: 'Sobre', href: '/sobre/' },
  { label: 'Contato', href: '/contato/' },
] as const;

export const categories = {
  'meio-ambiente': {
    label: 'Meio Ambiente',
    short: 'Ambiental',
    description: 'Licenciamento, resíduos, recursos hídricos e estudos ambientais.',
  },
  'seguranca-do-trabalho': {
    label: 'Segurança do Trabalho',
    short: 'SST',
    description: 'Programas, laudos e treinamentos conforme as Normas Regulamentadoras.',
  },
  conformidade: {
    label: 'Conformidade & Gestão',
    short: 'Conformidade',
    description: 'Prevenção de incêndio, eSocial SST e gestão de obrigações legais.',
  },
} as const;

export type CategoryKey = keyof typeof categories;
