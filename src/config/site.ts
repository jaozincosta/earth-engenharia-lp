/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DADOS CENTRAIS DA EARTH ENGENHARIA — todo o site e os schemas leem daqui.
 * ─────────────────────────────────────────────────────────────────────────────
 *  Valores entre colchetes, como "[CNPJ]", são PLACEHOLDERS: substitua pelos
 *  dados reais. Enquanto um campo for placeholder, ele aparece no site como
 *  texto (para ninguém esquecer) mas NÃO é enviado aos dados estruturados
 *  (JSON-LD) nem vira link. A lista completa está no README.
 */

/** true quando o valor ainda é um placeholder do tipo "[ALGO]" ou vazio. */
export const isPlaceholder = (v: unknown): boolean => typeof v !== 'string' || v.trim() === '' || /^\[.*\]$/.test(v.trim());
export const filled = (v: string | undefined | null): v is string => !isPlaceholder(v);

export const site = {
  name: 'EARTH Engenharia',
  legalName: '[RAZÃO SOCIAL]',
  cnpj: '[CNPJ]',

  slogans: {
    main: 'Soluções técnicas para um futuro sustentável',
    partner: 'Meio ambiente, segurança e conformidade em um só parceiro!',
    future: 'Construindo um amanhã melhor',
    signature: 'Engenharia responsável, soluções para o futuro.',
  },
  description:
    'Engenharia ambiental e segurança do trabalho em São Paulo: licenciamento ambiental, outorga de uso de água, PGRS, PGR, áreas contaminadas, cursos NR 33 e NR 35, palestras e supressão de árvores.',
  locale: 'pt_BR',
  lang: 'pt-BR',

  /** Conteúdo institucional (texto oficial — não alterar sem aprovação). */
  institutional: {
    mission: 'Oferecer soluções em engenharia com qualidade, responsabilidade ambiental, segurança e compromisso com os resultados.',
    vision: 'Ser referência em engenharia ambiental e soluções técnicas, reconhecida pela excelência, confiança e inovação.',
    values: [
      'Ética e transparência',
      'Excelência técnica',
      'Responsabilidade ambiental',
      'Segurança e valorização da vida',
      'Comprometimento com o cliente',
      'Inovação e sustentabilidade',
    ],
  },

  contact: {
    /** WhatsApp: só dígitos, com DDI 55 + DDD. */
    whatsapp: '5511974280016',
    phoneDisplay: '(11) 97428-0016',
    phoneHref: '+5511974280016',
    email: '[E-MAIL]',
    whatsappMessage: 'Olá! Vim pelo site da EARTH Engenharia e gostaria de solicitar um orçamento.',
  },

  address: {
    street: '[ENDEREÇO]', // ex.: "Rua Exemplo, 123 – Sala 4"
    district: '[BAIRRO]',
    city: 'São Paulo',
    state: 'SP',
    postalCode: '[CEP]',
    country: 'BR',
    /** Coordenadas do escritório (usadas no schema somente se preenchidas). */
    geo: { lat: '[LATITUDE]', lng: '[LONGITUDE]' },
  },

  /** Cidades/regiões atendidas — aparecem no rodapé, na página de contato e no schema (areaServed). */
  areaServed: ['São Paulo', 'Grande São Paulo'], // TODO: confirmar/ampliar a lista de cidades atendidas

  hours: {
    label: '[HORÁRIO DE ATENDIMENTO]', // ex.: "Segunda a sexta, 8h às 18h"
    /** Preencha para gerar openingHours no schema. Ex.: { days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '18:00' } */
    schema: null as null | { days: string[]; opens: string; closes: string },
  },

  social: {
    instagram: '[URL_INSTAGRAM]',
    linkedin: '[URL_LINKEDIN]',
    googleBusiness: '[URL_GOOGLE_MEU_NEGOCIO]',
  },

  /**
   * Formulário de contato (site estático).
   *  - 'formspree': crie um formulário em formspree.io e cole o ID (ex.: "xyzabcd").
   *  - 'netlify'  : use se o site for hospedado na Netlify (Netlify Forms).
   * Enquanto o ID do Formspree for placeholder, o formulário abre o WhatsApp com a mensagem preenchida.
   */
  form: {
    provider: 'formspree' as 'formspree' | 'netlify',
    formspreeId: '[FORMSPREE_ID]',
  },

  /**
   * Diferenciais e números da home — PLACEHOLDERS EDITÁVEIS.
   * Não publique números, clientes ou certificações que não possam ser comprovados.
   */
  stats: [
    { value: '[00]', label: '[anos de experiência]' },
    { value: '[000]', label: '[projetos entregues]' },
    { value: '[00]', label: '[empresas atendidas]' },
    { value: '[00]', label: '[profissionais na equipe]' },
  ],
  differentials: [
    { title: '[Diferencial 1]', text: '[Descreva um diferencial real da EARTH — ex.: equipe, metodologia, atendimento.]' },
    { title: '[Diferencial 2]', text: '[Descreva um diferencial real da EARTH.]' },
    { title: '[Diferencial 3]', text: '[Descreva um diferencial real da EARTH.]' },
  ],
} as const;

export const whatsappUrl = (message: string = site.contact.whatsappMessage) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;

export const serviceWhatsappMessage = (serviceTitle: string) =>
  `Olá! Vim pelo site da EARTH Engenharia e gostaria de um orçamento para: ${serviceTitle}.`;

export const nav = [
  { label: 'Início', href: '/' },
  { label: 'Serviços', href: '/servicos/' },
  { label: 'Sobre', href: '/sobre/' },
  { label: 'Contato', href: '/contato/' },
] as const;

export const categories = {
  'meio-ambiente': {
    label: 'Meio Ambiente',
    description: 'Licenciamento, outorga, resíduos, áreas contaminadas e supressão de vegetação.',
  },
  'seguranca-do-trabalho': {
    label: 'Segurança do Trabalho',
    description: 'PGR, gerenciamento de riscos ocupacionais e capacitação conforme as NRs.',
  },
  'treinamentos-e-palestras': {
    label: 'Treinamentos e Palestras',
    description: 'Cursos NR 33 e NR 35, SIPAT, Semana do Meio Ambiente e integrações.',
  },
} as const;

export type CategoryKey = keyof typeof categories;
export const categoryKeys = Object.keys(categories) as [CategoryKey, ...CategoryKey[]];

/** Pilares da marca (barra da home). */
export const pillars = ['Meio Ambiente', 'Conformidade Legal', 'Responsabilidade Social', 'Soluções Personalizadas'] as const;
