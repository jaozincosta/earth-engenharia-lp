/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  MAPA ÚNICO DE MÍDIA — troque fotos e vídeo aqui.
 * ─────────────────────────────────────────────────────────────────────────────
 *  - Fotos de banco (alta resolução): src/assets/media/*.jpg
 *  - Fotos reais da EARTH em campo:   src/assets/media/campo/*.jpg
 *  O Astro gera AVIF/WebP em vários tamanhos automaticamente.
 *  Fotos com menos de ~1200px de largura não devem ir para fundos de tela cheia
 *  (ficam borradas): use-as em cards, galerias e "registros de campo".
 *  Origem/licença das fotos de banco (registro interno): src/data/media-credits.json.
 *  Lista completa: MEDIA.md
 */
import type { ImageMetadata } from 'astro';
import heroPoster from '@/assets/media/hero-poster.jpg';
import natureza from '@/assets/media/natureza-mata-atlantica.jpg';
import aerea from '@/assets/media/aerea-rio-floresta.jpg';
import cta from '@/assets/media/cta-corrego-mata-atlantica.jpg';
import saoPaulo from '@/assets/media/sao-paulo-ibirapuera.jpg';
import licenciamento from '@/assets/media/servico-licenciamento-ambiental.jpg';
import outorga from '@/assets/media/servico-outorga-de-uso-de-agua.jpg';
import pgrs from '@/assets/media/servico-pgrs-pgrcc.jpg';
import pgr from '@/assets/media/servico-pgr-engenharia-seguranca-do-trabalho.jpg';
import cursos from '@/assets/media/servico-cursos-nr-33-e-nr-35.jpg';
import palestras from '@/assets/media/servico-palestras-ambientais-e-seguranca-do-trabalho.jpg';
import supressao from '@/assets/media/servico-supressao-de-arvores.jpg';
// Fotos reais da EARTH
import campoRit from '@/assets/media/campo/rit-levantamento-transito.jpg';
import campoVoc from '@/assets/media/campo/gac-medicao-voc-amostras.jpg';
import campoSondagem from '@/assets/media/campo/gac-sondagem-trado.jpg';
import campoDrenagem from '@/assets/media/campo/drenagem-reuso-agua-chuva.jpg';
import campoJardim from '@/assets/media/campo/jardim-aquatico-obra.jpg';
import campoEquipe from '@/assets/media/campo/equipe-analise-projeto-obra.jpg';
import campoOds from '@/assets/media/campo/conferencia-nacional-ods.jpg';
import campoTieteObra from '@/assets/media/campo/rio-tiete-obra-canal.jpg';
import campoTieteCanal from '@/assets/media/campo/rio-tiete-canal-viaduto.jpg';
import campoConfCidades from '@/assets/media/campo/conferencia-cidades-meio-ambiente.jpg';
import campoSabao from '@/assets/media/campo/comunidade-sabao-mapa-lotes.jpg';
import campoMineracao from '@/assets/media/campo/visita-tecnica-mineracao.jpg';

export interface MediaImage {
  src: ImageMetadata;
  alt: string;
  /** Ponto focal para object-position (ex.: "50% 30%"). */
  position?: string;
  /** Legenda (registros de campo). */
  caption?: string;
}

/** Vídeo do hero (arquivos em public/media/, servidos sem processamento). */
export const heroVideo = {
  webm: '/media/hero.webm',
  mp4: '/media/hero.mp4',
  /** Versão leve (540p, ~1,2 MB) usada em telas < 768px. */
  webmMobile: '/media/hero-mobile.webm',
  mp4Mobile: '/media/hero-mobile.mp4',
  poster: { src: heroPoster, alt: 'Vista aérea de drone sobre a copa de uma floresta preservada' } satisfies MediaImage,
};

export const sectionImages = {
  natureza: { src: natureza, alt: 'Mata Atlântica preservada com vegetação densa e luz entre as árvores' },
  aerea: { src: aerea, alt: 'Vista aérea de rio sinuoso atravessando floresta tropical' },
  cta: { src: cta, alt: 'Córrego de águas limpas entre pedras na Mata Atlântica' },
  saoPaulo: { src: saoPaulo, alt: 'Parque Ibirapuera com os prédios da Avenida Paulista ao fundo, em São Paulo' },
} satisfies Record<string, MediaImage>;

/** Fotos reais da EARTH em campo. */
export const fieldPhotos = {
  rit: { src: campoRit, alt: 'Profissional da EARTH com colete refletivo fazendo levantamento de tráfego para Relatório de Impacto de Trânsito', position: '50% 40%' },
  voc: { src: campoVoc, alt: 'Medidor de compostos orgânicos voláteis (VOC) analisando testemunhos e amostras de solo de sondagem' },
  sondagem: { src: campoSondagem, alt: 'Equipe da EARTH com EPI executando sondagem a trado em galpão para gerenciamento de área contaminada' },
  drenagem: { src: campoDrenagem, alt: 'Tubos corrugados de drenagem instalados em vala para sistema de drenagem de jardim e reúso de água de chuva' },
  jardim: { src: campoJardim, alt: 'Construção de jardim aquático com acompanhamento de profissional de capacete' },
  equipe: { src: campoEquipe, alt: 'Profissionais da EARTH analisando projeto impresso em obra' },
  ods: { src: campoOds, alt: 'Representante da EARTH na Conferência Nacional pelos ODS', position: '50% 30%' },
  tieteObra: { src: campoTieteObra, alt: 'Obra de canal sob viaduto com escavadeira, no Braço Morto do Rio Tietê' },
  tieteCanal: { src: campoTieteCanal, alt: 'Canal do Braço Morto do Rio Tietê sob viadutos, área de licenciamento ambiental e outorga' },
  confCidades: { src: campoConfCidades, alt: 'Representante da EARTH na 7ª Conferência Estadual das Cidades Paulistas, eixo Meio Ambiente e Mudanças Climáticas', position: '50% 30%' },
  sabao: { src: campoSabao, alt: 'Mapa de lotes anotado à mão do projeto de revitalização da Comunidade do Sabão, junto ao Córrego Guardinha, em Osasco' },
  mineracao: { src: campoMineracao, alt: 'Visita técnica de profissional da EARTH em área de mineração, com equipe usando EPI', position: '50% 35%' },
} satisfies Record<string, MediaImage>;

/**
 * Serviço (slug do arquivo em src/content/servicos) →
 *  - card:  imagem do card na home (pode ser foto real, mesmo pequena)
 *  - hero:  fundo do topo da página do serviço (precisa de alta resolução)
 *  - field: fotos reais exibidas em "Registro de campo" dentro da página
 */
export const serviceMedia: Record<string, { card: MediaImage; hero: MediaImage; field?: MediaImage[] }> = {
  'licenciamento-ambiental': {
    card: fieldPhotos.tieteCanal,
    hero: { src: licenciamento, alt: 'Área industrial à beira de um rio, atividade sujeita a licenciamento ambiental' },
    field: [
      { ...fieldPhotos.tieteCanal, caption: 'Licenciamento ambiental e outorga — Braço Morto do Rio Tietê' },
      { ...fieldPhotos.tieteObra, caption: 'Acompanhamento da obra no canal' },
    ],
  },
  'outorga-de-uso-de-agua': {
    card: fieldPhotos.tieteObra,
    hero: { src: outorga, alt: 'Rio com ilhas de vegetação visto do alto, recurso hídrico sujeito a outorga de uso de água' },
    field: [
      { ...fieldPhotos.tieteObra, caption: 'Outorga e licenciamento — Braço Morto do Rio Tietê' },
      { ...fieldPhotos.drenagem, caption: 'Drenagem de jardins e reúso de água de chuva' },
    ],
  },
  'pgrs-pgrcc': {
    card: { src: pgrs, alt: 'Fardos de garrafas plásticas prensadas para reciclagem em central de triagem de resíduos' },
    hero: { src: pgrs, alt: 'Fardos de garrafas plásticas prensadas para reciclagem em central de triagem de resíduos' },
  },
  'pgr-engenharia-seguranca-do-trabalho': {
    card: { src: pgr, alt: 'Equipe de obra com capacete e cinto de segurança, gerenciamento de riscos ocupacionais', position: '50% 35%' },
    hero: { src: pgr, alt: 'Equipe de obra com capacete e cinto de segurança, gerenciamento de riscos ocupacionais', position: '50% 35%' },
    field: [{ ...fieldPhotos.sondagem, caption: 'Equipe com EPI e área isolada durante serviço de campo' }],
  },
  'gerenciamento-de-areas-contaminadas': {
    card: { ...fieldPhotos.voc, position: '35% 50%' },
    hero: fieldPhotos.sondagem,
    field: [
      { ...fieldPhotos.sondagem, caption: 'Sondagem a trado para gerenciamento de área contaminada (GAC)' },
      { ...fieldPhotos.voc, caption: 'Medição de VOC nas amostras de solo coletadas' },
    ],
  },
  'cursos-nr-33-e-nr-35': {
    card: { src: cursos, alt: 'Trabalhador com cinto paraquedista em estrutura elevada, trabalho em altura conforme a NR 35', position: '50% 30%' },
    hero: { src: cursos, alt: 'Trabalhador com cinto paraquedista em estrutura elevada, trabalho em altura conforme a NR 35', position: '50% 30%' },
  },
  'palestras-ambientais-e-seguranca-do-trabalho': {
    card: fieldPhotos.confCidades,
    hero: { src: palestras, alt: 'Público assistindo a uma palestra em auditório' },
    field: [
      { ...fieldPhotos.confCidades, caption: '7ª Conferência Estadual das Cidades — Meio Ambiente e Mudanças Climáticas' },
      { ...fieldPhotos.ods, caption: 'Conferência Nacional pelos ODS — delegado da região Oeste' },
    ],
  },
  'supressao-de-arvores': {
    card: { src: supressao, alt: 'Toras de árvores cortadas empilhadas na floresta' },
    hero: { src: supressao, alt: 'Toras de árvores cortadas empilhadas na floresta' },
  },
};

const fallback = { card: sectionImages.natureza, hero: sectionImages.natureza };
export const serviceImage = (slug: string): MediaImage => (serviceMedia[slug] ?? fallback).card;
export const serviceHero = (slug: string): MediaImage => (serviceMedia[slug] ?? fallback).hero;
export const serviceField = (slug: string): MediaImage[] => serviceMedia[slug]?.field ?? [];

/**
 * Projetos e experiência (informados pela empresa).
 * Para adicionar um projeto: inclua um item; `image` é opcional.
 */
export const projects: { title: string; tag: string; image?: MediaImage; icon: string }[] = [
  { title: 'Licenciamento ambiental e outorga do Braço Morto do Rio Tietê', tag: 'Meio Ambiente', image: fieldPhotos.tieteCanal, icon: 'Droplets' },
  { title: 'Sondagem a trado para gerenciamento de área contaminada (GAC)', tag: 'Áreas contaminadas', image: fieldPhotos.voc, icon: 'Layers' },
  { title: 'Projeto de revitalização da Comunidade do Sabão, em Osasco', tag: 'Urbanismo e meio ambiente', image: fieldPhotos.sabao, icon: 'Map' },
  { title: 'R.I.T — Relatório de Impacto de Trânsito', tag: 'Estudos técnicos', image: fieldPhotos.rit, icon: 'TrafficCone' },
  { title: 'Sistema de drenagem de jardins e reúso de água de chuva', tag: 'Recursos hídricos', image: fieldPhotos.drenagem, icon: 'CloudRain' },
  { title: 'Jardins aquáticos', tag: 'Projetos e obras', image: fieldPhotos.jardim, icon: 'Sprout' },
  { title: 'Aumento de capacidade de usina hidrelétrica', tag: 'Energia', icon: 'Zap' },
  { title: 'Delegado da região Oeste — Conferência Nacional pelos ODS', tag: 'Atuação institucional', image: fieldPhotos.ods, icon: 'Globe' },
];
