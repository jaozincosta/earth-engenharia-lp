import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const categoria = z.enum(['meio-ambiente', 'seguranca-do-trabalho', 'treinamentos-e-palestras']);

const servicos = defineCollection({
  // O nome do arquivo vira a URL: /servicos/<nome-do-arquivo>/
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/servicos' }),
  schema: z.object({
    /** Nome curto do serviço (cards, menu, breadcrumb). */
    title: z.string(),
    /** H1 da página: palavra-chave principal + localidade. */
    h1: z.string(),
    /** <title> completo — 50 a 60 caracteres (validado no build). */
    seoTitle: z.string().min(50).max(60),
    /** Meta description — 140 a 160 caracteres, com CTA (validado no build). */
    seoDescription: z.string().min(140).max(160),
    /** Primeira categoria = categoria principal (agrupamento do menu). */
    categories: z.array(categoria).min(1),
    /** Ícone Lucide (PascalCase), ex.: "FileCheck". */
    icon: z.string(),
    /** Uma linha para o card. */
    summary: z.string().max(120),
    audience: z.array(z.string()).min(3),
    steps: z.array(z.object({ title: z.string(), text: z.string() })).min(3),
    legislation: z.array(z.object({ name: z.string(), text: z.string() })).min(2),
    benefits: z.array(z.string()).min(2),
    risks: z.array(z.string()).min(2),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).min(4).max(6),
    /** Slugs de 3 serviços relacionados. */
    related: z.array(z.string()).length(3),
    /** Termos para a busca do hub (não são exibidos como meta keywords). */
    keywords: z.array(z.string()).default([]),
    /** Cursos (gera schema Course). */
    courses: z.array(z.object({ name: z.string(), description: z.string() })).optional(),
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

export const collections = { servicos };
