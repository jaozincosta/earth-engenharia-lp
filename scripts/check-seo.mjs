/**
 * Auditoria de SEO do HTML gerado em dist/ (rode depois do build: npm run check:seo).
 * Verifica por página: <title> (50–60), meta description (140–160), canonical, um único H1,
 * hierarquia de títulos, alt em imagens, JSON-LD válido e — nas páginas de serviço —
 * 600 a 1000 palavras de conteúdo e os schemas Service, FAQPage e BreadcrumbList.
 */
import { parse } from 'node-html-parser';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist', import.meta.url));
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : f.endsWith('.html') && files.push(join(d, f))));
walk(dist);

let errors = 0;
const rows = [];
const len = (s) => [...(s ?? '')].length;

for (const file of files.sort()) {
  const route = '/' + relative(dist, file).split(sep).join('/').replace(/index\.html$/, '').replace(/\.html$/, '/');
  const root = parse(readFileSync(file, 'utf8'));
  const problems = [];
  const robots = root.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '';
  const indexable = !robots.includes('noindex');

  const title = root.querySelector('title')?.text.trim();
  const desc = root.querySelector('meta[name="description"]')?.getAttribute('content');
  if (indexable && (len(title) < 50 || len(title) > 60)) problems.push(`title com ${len(title)} caracteres`);
  if (indexable && (len(desc) < 140 || len(desc) > 160)) problems.push(`description com ${len(desc)} caracteres`);
  if (!root.querySelector('link[rel="canonical"]')) problems.push('sem canonical');
  if (root.querySelector('html')?.getAttribute('lang') !== 'pt-BR') problems.push('lang diferente de pt-BR');

  const h1s = root.querySelectorAll('h1');
  if (h1s.length !== 1) problems.push(`${h1s.length} H1`);

  // Hierarquia: não pular níveis (ex.: H2 → H4), ignorando header/footer
  let prev = 1;
  for (const h of root.querySelectorAll('main h1, main h2, main h3, main h4')) {
    const lvl = Number(h.tagName[1]);
    if (lvl > prev + 1) problems.push(`salto de H${prev} para H${lvl} em "${h.text.trim().slice(0, 40)}"`);
    prev = lvl;
  }

  const noAlt = root.querySelectorAll('img').filter((i) => !i.hasAttribute('alt'));
  if (noAlt.length) problems.push(`${noAlt.length} imagem(ns) sem alt`);

  const types = [];
  for (const s of root.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const j = JSON.parse(s.text);
      types.push([j['@type']].flat().join('/'));
    } catch (e) {
      problems.push(`JSON-LD inválido: ${e.message}`);
    }
  }

  let words = '';
  if (/^\/servicos\/[^/]+\/$/.test(route)) {
    const article = root.querySelector('main article');
    const n = (article?.text ?? '').split(/\s+/).filter((w) => /\p{L}/u.test(w)).length;
    words = String(n);
    if (n < 600 || n > 1000) problems.push(`conteúdo com ${n} palavras (meta: 600–1000)`);
    for (const t of ['Service', 'FAQPage', 'BreadcrumbList']) if (!types.includes(t)) problems.push(`sem schema ${t}`);
  }

  errors += problems.length;
  rows.push({ rota: route, title: len(title), desc: len(desc), h1: h1s.length, palavras: words, schemas: types.join(', '), problemas: problems.join('; ') || 'ok' });
}

console.table(rows);
if (errors) {
  console.error(`\n✗ ${errors} problema(s) encontrado(s).`);
  process.exit(1);
}
console.log(`\n✓ ${rows.length} páginas verificadas, nenhum problema.`);
