import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const servicos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/servicos' }),
  schema: z.object({
    /** Nome do serviço exibido nos cards e no H1. */
    title: z.string(),
    /** Título SEO (<title>). Ideal: até ~60 caracteres, com palavra-chave + cidade. */
    seoTitle: z.string().max(70),
    /** Meta description. Ideal: 120–160 caracteres. */
    seoDescription: z.string().min(80).max(170),
    category: z.enum(['meio-ambiente', 'seguranca-do-trabalho', 'conformidade']),
    /** Nome de um ícone Lucide (PascalCase), ex.: "Leaf", "HardHat". */
    icon: z.string(),
    /** Resumo curto para cards (1–2 frases). */
    summary: z.string().max(200),
    /** Para quem é o serviço. */
    audience: z.array(z.string()).default([]),
    /** O que o cliente recebe. */
    deliverables: z.array(z.string()).default([]),
    /** Benefícios / dores resolvidas. */
    benefits: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
    /** Perguntas frequentes — também viram FAQPage no Schema.org. */
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    /** Palavras-chave relacionadas (busca interna do filtro). */
    keywords: z.array(z.string()).default([]),
    order: z.number().default(100),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { servicos };
