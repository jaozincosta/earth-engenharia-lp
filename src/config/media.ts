/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  MAPA ÚNICO DE MÍDIA — troque fotos e vídeo aqui.
 * ─────────────────────────────────────────────────────────────────────────────
 *  Para usar fotos reais da EARTH: coloque o arquivo em src/assets/media/ e
 *  troque o import correspondente (ou substitua o arquivo mantendo o nome).
 *  O Astro gera AVIF/WebP em vários tamanhos automaticamente.
 *  Créditos/licenças das imagens atuais: src/data/media-credits.json (página /creditos/).
 *  Lista completa e sugestões de busca: MEDIA.md
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
import areas from '@/assets/media/servico-gerenciamento-de-areas-contaminadas.jpg';
import cursos from '@/assets/media/servico-cursos-nr-33-e-nr-35.jpg';
import palestras from '@/assets/media/servico-palestras-ambientais-e-seguranca-do-trabalho.jpg';
import supressao from '@/assets/media/servico-supressao-de-arvores.jpg';

export interface MediaImage {
  src: ImageMetadata;
  alt: string;
  /** Ponto focal para object-position (ex.: "50% 30%"). */
  position?: string;
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

/** Serviço (slug do arquivo em src/content/servicos) → imagem. */
export const serviceImages: Record<string, MediaImage> = {
  'licenciamento-ambiental': { src: licenciamento, alt: 'Área industrial à beira de um rio, atividade sujeita a licenciamento ambiental' },
  'outorga-de-uso-de-agua': { src: outorga, alt: 'Rio com ilhas de vegetação visto do alto, recurso hídrico sujeito a outorga de uso de água' },
  'pgrs-pgrcc': { src: pgrs, alt: 'Fardos de garrafas plásticas prensadas para reciclagem em central de triagem de resíduos' },
  'pgr-engenharia-seguranca-do-trabalho': { src: pgr, alt: 'Equipe de obra com capacete e cinto de segurança, gerenciamento de riscos ocupacionais', position: '50% 35%' },
  'gerenciamento-de-areas-contaminadas': { src: areas, alt: 'Técnico coletando amostra de solo em campo para investigação ambiental' },
  'cursos-nr-33-e-nr-35': { src: cursos, alt: 'Trabalhador com cinto paraquedista em estrutura elevada, trabalho em altura conforme a NR 35', position: '50% 30%' },
  'palestras-ambientais-e-seguranca-do-trabalho': { src: palestras, alt: 'Público assistindo a uma palestra em auditório' },
  'supressao-de-arvores': { src: supressao, alt: 'Toras de árvores cortadas empilhadas na floresta' },
};

export const serviceImage = (slug: string): MediaImage => serviceImages[slug] ?? sectionImages.natureza;
