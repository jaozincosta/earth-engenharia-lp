# EARTH Engenharia — site institucional

Site estático (SSG) em **Astro 7 + Tailwind CSS 4 + TypeScript**, mobile first, focado em SEO técnico e local.

## Comandos

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # astro check + build em dist/
npm run preview
```

## Antes de publicar no domínio definitivo

1. **Dados da empresa** — edite `src/config/site.ts` (todos os campos com `TODO`): WhatsApp, telefone, e-mail, endereço, CNPJ, redes sociais e cidades atendidas. Esses dados alimentam o Schema.org (`ProfessionalService`), rodapé, contato e botões de WhatsApp.
2. **Domínio** — defina a variável `SITE_URL` (ex.: `https://www.earthengenharia.com.br`) na Vercel/Netlify. Ela gera canonical, Open Graph, sitemap e robots.txt.
3. **Logo** — substitua `src/assets/logo.svg` (placeholder) mantendo o nome.
4. **Fotos** — substitua os JPGs em `src/assets/fotos/` por fotos reais da equipe em campo (mesmos nomes). O Astro gera AVIF/WebP em vários tamanhos automaticamente. `public/og-default.jpg` (1200×630) é a imagem de compartilhamento.
5. **Textos institucionais** — revise `src/pages/sobre.astro` e `src/pages/politica-de-privacidade.astro` (marcados com `TODO`).

## Editar / adicionar serviços

Cada serviço é um arquivo Markdown em `src/content/servicos/`. O schema (validado com Zod) está em `src/content.config.ts`. Para criar um novo, copie um arquivo existente; o nome do arquivo vira a URL (`/servicos/<nome-do-arquivo>/`). Campos principais:

| Campo | Uso |
| --- | --- |
| `title`, `summary` | Nome e resumo exibidos em cards e no topo da página |
| `seoTitle`, `seoDescription` | `<title>` e meta description (validados por tamanho) |
| `category` | `meio-ambiente`, `seguranca-do-trabalho` ou `conformidade` |
| `icon` | Nome de um ícone [Lucide](https://lucide.dev/icons) em PascalCase |
| `audience`, `deliverables`, `benefits`, `faq` | Seções da página; `faq` também gera `FAQPage` no Schema.org |
| `keywords` | Termos usados pela busca do filtro de serviços |
| `order`, `featured`, `draft` | Ordenação, destaque e rascunho |

## Estrutura

```
src/
  config/site.ts          dados da empresa, navegação e categorias
  content/servicos/*.md   conteúdo dos serviços (Content Collections)
  layouts/BaseLayout      <head> SEO, Open Graph, JSON-LD, header/footer
  components/             Header (menu mobile), filtro de serviços, FAQ (<details>), CTA…
  pages/                  /, /servicos/, /servicos/[slug]/, /sobre/, /contato/, 404
  styles/global.css       tokens da marca (@theme) e componentes
```

JavaScript no cliente: apenas menu mobile, filtro de serviços, accordion de FAQ e o formulário de contato (que monta a mensagem e abre o WhatsApp — sem backend). Animações respeitam `prefers-reduced-motion`.

## Deploy

- **Vercel**: importe o repositório (framework Astro detectado; `vercel.json` já define headers de cache e segurança).
- **Netlify**: `netlify.toml` incluído.

`scripts/generate-placeholders.mjs` regenera as imagens placeholder, se necessário.
