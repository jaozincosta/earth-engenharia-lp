// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Defina SITE_URL no painel da Vercel/Netlify quando o domínio próprio estiver ativo.
const site = process.env.SITE_URL ?? 'https://earth-engenharia-lp.vercel.app';

export default defineConfig({
  site,
  output: 'static',
  build: { format: 'directory' },
  trailingSlash: 'always',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/contato/obrigado'),
      i18n: { defaultLocale: 'pt-BR', locales: { 'pt-BR': 'pt-BR' } },
    }),
  ],
  image: { responsiveStyles: true },
  vite: { plugins: [tailwindcss()] },
});
