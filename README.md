# EARTH Engenharia — site institucional

Site estático (SSG) em **Astro 7 + Tailwind CSS 4 + TypeScript**, mobile first, focado em SEO técnico e local para **engenharia ambiental e segurança do trabalho em São Paulo**.

Produção atual: https://earth-engenharia-lp.vercel.app

## Como rodar

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # astro check + build em dist/
npm run check:seo    # audita o HTML de dist/ (title, meta, H1, JSON-LD, palavras)
npm run preview      # serve dist/ localmente
npm run build:logo   # regenera logo, favicons, ícones do manifest e imagem OG
```

## Estrutura

```
src/
  config/site.ts            ← TODOS os dados da empresa (NAP, WhatsApp, redes, formulário, números)
  content/servicos/*.md     ← os 8 serviços (Content Collections, schema em src/content.config.ts)
  components/SEO.astro      ← <head>: title, description, canonical, OG, Twitter, preloads, JSON-LD
  lib/schema.ts             ← geradores de JSON-LD (LocalBusiness, Service, Course, FAQPage, Breadcrumb, Organization)
  layouts/BaseLayout.astro  ← estrutura da página + header, footer e botão flutuante de WhatsApp
  pages/                    ← /, /servicos/, /servicos/[slug]/, /sobre/, /contato/, /politica-de-privacidade/, 404
scripts/
  build-logo.mjs            ← logo vetorial (texto em curvas) e todos os ícones
  check-seo.mjs             ← auditoria de SEO pós-build
brand/                      ← logo com slogan (SVG/PNG) para materiais
```

## Como editar ou adicionar serviços

Cada serviço é um arquivo em `src/content/servicos/`. **O nome do arquivo vira a URL** (`/servicos/<arquivo>/`): use minúsculas, hífens e sem acentos. Para criar um novo, copie um arquivo existente e ajuste:

| Campo | O que é | Regras |
| --- | --- | --- |
| `title` | Nome curto (cards, menu, breadcrumb) | — |
| `h1` | Título da página: palavra-chave + localidade | — |
| `seoTitle` | `<title>` | **50 a 60 caracteres** (o build falha fora disso) |
| `seoDescription` | Meta description com CTA | **140 a 160 caracteres** |
| `categories` | `meio-ambiente`, `seguranca-do-trabalho`, `treinamentos-e-palestras` | a 1ª é a principal (menu) |
| `icon` | Ícone [Lucide](https://lucide.dev/icons) em PascalCase | ex.: `FileCheck` |
| `summary` | Uma linha para o card | até 120 caracteres |
| `audience`, `steps`, `legislation`, `benefits`, `risks` | Seções "Para quem é", "Como funciona", "Legislação", "Benefícios e riscos" | — |
| `faq` | Perguntas da página (gera FAQPage) | 4 a 6 |
| `related` | Slugs de 3 serviços relacionados | exatamente 3, devem existir |
| `courses` | (opcional) gera schema `Course` | — |
| `order` | Ordem de exibição | — |

O texto abaixo do frontmatter é a **introdução** (2 a 3 parágrafos). O `npm run check:seo` confere se cada página de serviço tem entre 600 e 1000 palavras.

## Placeholders para preencher

Todos ficam em **`src/config/site.ts`**. Enquanto um valor estiver entre colchetes, ele aparece no site como texto (para não ser esquecido), mas **não** entra nos dados estruturados nem vira link.

| Placeholder | Onde aparece |
| --- | --- |
| `[RAZÃO SOCIAL]` | rodapé, política de privacidade, schema |
| `[CNPJ]` | rodapé, política de privacidade, schema (`taxID`) |
| `[E-MAIL]` | rodapé, contato, política de privacidade, schema |
| `[ENDEREÇO]`, `[BAIRRO]`, `[CEP]` | rodapé, contato, mapa, schema (NAP) |
| `[LATITUDE]`, `[LONGITUDE]` | schema (`geo`) |
| `[HORÁRIO DE ATENDIMENTO]` + `hours.schema` | rodapé, contato, schema (`openingHours`) |
| `[URL_INSTAGRAM]`, `[URL_LINKEDIN]` | ícones do rodapé e `sameAs` (só aparecem quando preenchidos) |
| `[URL_GOOGLE_MEU_NEGOCIO]` | link "Abrir no Google Maps" e `hasMap` |
| `[FORMSPREE_ID]` | envio do formulário de contato (veja abaixo) |
| `stats` — `[00]`, `[000]`… | números da home ("Por que escolher a EARTH") |
| `differentials` — `[Diferencial 1]`… | diferenciais na home e em /sobre |
| `areaServed` | regiões atendidas (hoje: São Paulo e Grande São Paulo) — confirme/amplie |

Outros itens a substituir:

- **Fotos** em `src/assets/fotos/` (`equipe-campo.jpg` é a do hero, `sobre.jpg` a da página Sobre): troque por fotos reais da equipe em campo **mantendo os nomes**. O Astro gera AVIF/WebP automaticamente.
- **Textos institucionais complementares** em `src/pages/sobre.astro` (marcado com `TODO`) e revisão jurídica de `src/pages/politica-de-privacidade.astro`.
- **Domínio**: quando houver domínio próprio, defina `SITE_URL` (ex.: `https://www.earthengenharia.com.br`) nas variáveis de ambiente da Vercel. Canonical, Open Graph, sitemap e robots.txt passam a usá-lo.

### Formulário de contato

Configurado em `site.form`:

- **Formspree** (padrão, funciona na Vercel): crie um formulário gratuito em formspree.io e cole o ID em `formspreeId`.
- **Netlify Forms**: se hospedar na Netlify, use `provider: 'netlify'` (a página de confirmação é `/contato/obrigado/`).
- Enquanto o ID do Formspree for placeholder, o formulário valida os campos e **abre o WhatsApp** com a mensagem pronta.

O formulário tem validação, seleção do serviço (pré-selecionado ao vir de uma página de serviço), aviso LGPD e checkbox de consentimento obrigatório.

## Checklist pós-publicação

- [ ] Preencher todos os placeholders acima e publicar novamente
- [ ] Configurar o domínio próprio na Vercel e a variável `SITE_URL`
- [ ] **Google Search Console**: adicionar a propriedade do domínio e verificar (registro DNS)
- [ ] **Enviar o sitemap**: `https://SEU-DOMINIO/sitemap-index.xml` no Search Console
- [ ] Inspecionar a home e 2–3 páginas de serviço no Search Console e solicitar indexação
- [ ] Validar os dados estruturados no [Teste de pesquisa aprimorada](https://search.google.com/test/rich-results)
- [ ] **Google Meu Negócio (Perfil da Empresa)**: criar/verificar o perfil com o **mesmo** nome, endereço e telefone do site (NAP idêntico), categoria principal, serviços, fotos e link para o site; depois colar a URL em `social.googleBusiness`
- [ ] **Google Analytics 4**: criar a propriedade e adicionar a tag (ou via Google Tag Manager) — lembre de atualizar a política de privacidade/aviso de cookies ao incluir rastreamento
- [ ] Configurar conversões no GA4 para cliques de WhatsApp (os links têm o atributo `data-track`) e envios do formulário
- [ ] Rodar o Lighthouse/PageSpeed Insights no domínio final (meta: 95+ em tudo no mobile)

## Deploy

- **Vercel** (atual): integrado ao GitHub — cada push na `main` publica automaticamente. O `vercel.json` define cache, cabeçalhos de segurança, barra final nas URLs e redirecionamentos das URLs antigas.
- **Netlify**: `netlify.toml` incluído.
