/**
 * Gera o logo vetorial da EARTH Engenharia (texto convertido em curvas — não depende de fonte instalada).
 * Saídas:
 *   src/assets/logo.svg           horizontal, cores para fundo claro
 *   src/assets/logo-white.svg     horizontal, para fundo escuro
 *   src/assets/logo-mark.svg      apenas o símbolo
 *   brand/logo-tagline.svg        horizontal com slogan (uso em materiais)
 *   public/favicon.svg, public/apple-touch-icon.png, public/og-default.jpg
 * Uso: node scripts/build-logo.mjs
 */
import opentype from 'opentype.js';
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const p = (rel) => fileURLToPath(new URL(rel, import.meta.url));
const font = (w, style = 'normal') =>
  { const b = readFileSync(p(`../node_modules/@fontsource/montserrat/files/montserrat-latin-${w}-${style}.woff`)); return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)); };

const F800 = font(800);
const F600 = font(600);
const F600i = font(600, 'italic');

const C = {
  forest: '#0F4D2E',
  forest2: '#1C6741',
  leaf: '#7AC943',
  leafDark: '#3E8E2A',
  sky: '#E9F6EE',
};

/* ───────────── Símbolo (viewBox 0 0 120 120) ───────────── */
const markDefs = (id) => `
  <radialGradient id="${id}o" cx="40%" cy="35%" r="70%">
    <stop offset="0" stop-color="#FFFFFF"/><stop offset=".65" stop-color="#EAF6E6"/><stop offset="1" stop-color="#BFE3B0"/>
  </radialGradient>
  <linearGradient id="${id}c" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${C.forest2}"/><stop offset="1" stop-color="${C.forest}"/>
  </linearGradient>
  <linearGradient id="${id}l" x1="0" y1="1" x2="1" y2="0">
    <stop offset="0" stop-color="${C.leafDark}"/><stop offset="1" stop-color="${C.leaf}"/>
  </linearGradient>
  <linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${C.leaf}"/><stop offset=".55" stop-color="#3E9B3A"/><stop offset="1" stop-color="${C.forest}"/>
  </linearGradient>
  <clipPath id="${id}g"><circle cx="64" cy="64" r="36"/></clipPath>`;

const leaf = (x, y, rot, s, id) =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
     <path d="M0 0C5-11 18-17 31-15C27-3 15 5 0 0Z" fill="url(#${id}l)"/>
     <path d="M1-.5C10-5 19-9 27-13" stroke="#FFFFFF" stroke-opacity=".55" stroke-width="1.1" fill="none" stroke-linecap="round"/>
   </g>`;

const markBody = (id) => `
  <!-- arco envolvente -->
  <path d="M27 40C17 58 20 84 38 99C56 114 84 114 101 98C86 107 61 108 45 94C29 80 25 58 27 40Z" fill="url(#${id}s)"/>
  <!-- globo -->
  <circle cx="64" cy="64" r="36" fill="url(#${id}o)"/>
  <g clip-path="url(#${id}g)" fill="url(#${id}c)">
    <!-- América do Norte -->
    <path d="M33 46C38 36 52 31 66 33C73 34 76 39 71 43C67 46 66 51 61 54C57 56 56 60 59 64C55 64 51 61 47 57C42 53 34 53 33 46Z"/>
    <!-- América Central -->
    <path d="M59 64C61 66 63 68 66 69C65 70 62 70 60 68C59 67 58 65 59 64Z"/>
    <!-- América do Sul -->
    <path d="M66 70C74 68 82 72 84 78C86 84 80 90 76 96C73 100 70 100 70 94C70 88 66 84 64 78C63 74 63 71 66 70Z"/>
    <!-- Europa / África (borda) -->
    <path d="M89 38C95 37 101 42 103 50L103 74C97 72 93 66 90 60C87 54 84 44 89 38Z"/>
    <!-- Groenlândia -->
    <path d="M73 29C78 27 84 28 85 31C83 34 78 35 74 33C72 32 72 30 73 29Z"/>
  </g>
  <!-- linhas de latitude/longitude sutis (toque técnico) -->
  <g clip-path="url(#${id}g)" fill="none" stroke="${C.forest}" stroke-opacity=".12" stroke-width=".8">
    <ellipse cx="64" cy="64" rx="36" ry="12"/><ellipse cx="64" cy="64" rx="14" ry="36"/><line x1="28" y1="64" x2="100" y2="64"/>
  </g>
  <circle cx="64" cy="64" r="36" fill="none" stroke="${C.forest}" stroke-opacity=".35" stroke-width="1.2"/>
  <!-- brilho -->
  <path d="M42 40C48 33 57 30 65 30" stroke="#FFFFFF" stroke-opacity=".9" stroke-width="2.4" stroke-linecap="round" fill="none"/>
  <!-- folhas -->
  ${leaf(30, 34, -112, 0.9, id)}
  ${leaf(31, 33, -78, 1.05, id)}
  ${leaf(32, 34, -40, 0.85, id)}
  ${leaf(98, 99, -20, 0.62, id)}`;

const markSvg = (id = 'm') => `<defs>${markDefs(id)}</defs>${markBody(id)}`;

/* ───────────── Wordmark ───────────── */
function wordmark({ x, y, capH, color, accent, subColor, tagline, tagColor }) {
  const size = capH / 0.7; // Montserrat cap height ≈ 0.70 em
  const tracking = capH * 0.06;
  let cx = x;
  let out = '';
  for (const ch of 'EARTH') {
    if (ch === 'A') {
      // "A" sem travessão + triângulo de destaque (assinatura da marca)
      const w = F800.charToGlyph('A').advanceWidth * (size / F800.unitsPerEm);
      const stem = capH * 0.24;
      const l = cx + capH * 0.02, r = cx + w - capH * 0.02, top = y - capH, mid = (l + r) / 2;
      const k = stem / Math.cos(Math.atan((r - l) / 2 / capH)); // espessura horizontal da perna
      out += `<path d="M${l} ${y}L${mid - stem * 0.45} ${top}L${mid + stem * 0.45} ${top}L${r} ${y}L${r - k} ${y}L${mid} ${top + stem * 1.15}L${l + k} ${y}Z" fill="${color}"/>`;
      const th = capH * 0.36;
      out += `<path d="M${mid} ${y - th}L${mid + th * 0.62} ${y}L${mid - th * 0.62} ${y}Z" fill="${accent}"/>`;
      cx += w + tracking;
    } else {
      const g = F800.getPath(ch, cx, y, size);
      out += `<path d="${g.toPathData(2)}" fill="${color}"/>`;
      cx += F800.getAdvanceWidth(ch, size) + tracking;
    }
  }
  const wordW = cx - tracking - x;

  // ENGENHARIA justificado na largura de EARTH
  const subCap = capH * 0.3;
  const subSize = subCap / 0.7;
  const letters = 'ENGENHARIA'.split('');
  const raw = letters.reduce((s, ch) => s + F600.getAdvanceWidth(ch, subSize), 0);
  const gap = (wordW - raw) / (letters.length - 1);
  let sx = x;
  const sy = y + capH * 0.22 + subCap;
  for (const ch of letters) {
    out += `<path d="${F600.getPath(ch, sx, sy, subSize).toPathData(2)}" fill="${subColor}"/>`;
    sx += F600.getAdvanceWidth(ch, subSize) + gap;
  }
  let bottom = sy;
  if (tagline) {
    const tSize = (capH * 0.24) / 0.7;
    const tw = F600i.getAdvanceWidth(tagline, tSize);
    const scale = Math.min(1, wordW / tw);
    const ty = sy + capH * 0.42;
    out += `<g transform="translate(${x} ${ty}) scale(${scale} 1)"><path d="${F600i.getPath(tagline, 0, 0, tSize).toPathData(2)}" fill="${tagColor}"/></g>`;
    bottom = ty + capH * 0.06;
  }
  return { svg: out, width: wordW, bottom };
}

function horizontal({ dark = false, tagline = false }) {
  const capH = 56;
  const s = 1.1; // escala do símbolo
  const markSize = 118 * s;
  const x = 113 * s + 10;
  const y = 76;
  const w = wordmark({
    x, y, capH,
    color: dark ? '#FFFFFF' : C.forest,
    accent: C.leaf,

    subColor: dark ? C.leaf : C.forest2,
    tagline: tagline ? 'Soluções técnicas para um futuro sustentável' : null,
    tagColor: dark ? '#D5ECDD' : C.forest2,
  });
  const width = Math.ceil(x + w.width + 4);
  const height = Math.ceil(Math.max(markSize, w.bottom + 10));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="EARTH Engenharia">
<title>EARTH Engenharia</title>
<g transform="translate(${-5 * s} ${(height - markSize) / 2 + 5 * s}) scale(${s})">${markSvg(dark ? 'd' : 'l')}</g>
${w.svg}
</svg>
`;
}

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="8 -4 116 116" width="116" height="116" role="img" aria-label="EARTH Engenharia"><title>EARTH Engenharia</title>${markSvg('k')}</svg>\n`;

mkdirSync(p('../brand'), { recursive: true });
writeFileSync(p('../src/assets/logo.svg'), horizontal({}));
writeFileSync(p('../src/assets/logo-white.svg'), horizontal({ dark: true }));
writeFileSync(p('../src/assets/logo-mark.svg'), mark);
writeFileSync(p('../brand/logo-tagline.svg'), horizontal({ tagline: true }));
writeFileSync(p('../brand/logo-tagline-white.svg'), horizontal({ dark: true, tagline: true }));
writeFileSync(p('../public/favicon.svg'), mark);

// Prévia PNG da marca (para conferência e materiais)
await sharp(Buffer.from(horizontal({ tagline: true })), { density: 300 }).png().toFile(p('../brand/logo-tagline.png'));
await sharp(Buffer.from(mark), { density: 400 }).resize(180, 180, { fit: 'contain', background: '#ffffff' }).flatten({ background: '#ffffff' }).png().toFile(p('../public/apple-touch-icon.png'));

// Imagem Open Graph 1200×630
const logoW = horizontal({ dark: true, tagline: true });
const logoPng = await sharp(Buffer.from(logoW), { density: 260 }).resize({ width: 760 }).png().toBuffer();
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#06170E"/>
  <g stroke="#FFFFFF" stroke-opacity=".06">${Array.from({ length: 26 }, (_, i) => `<line x1="${i * 48}" y1="0" x2="${i * 48}" y2="630"/>`).join('')}${Array.from({ length: 14 }, (_, i) => `<line x1="0" y1="${i * 48}" x2="1200" y2="${i * 48}"/>`).join('')}</g>
  <rect x="0" y="560" width="1200" height="70" fill="#0F4D2E"/>
  <text x="80" y="604" font-family="Arial, sans-serif" font-size="26" fill="#C8EBA9">Meio ambiente · Segurança do trabalho · Conformidade — São Paulo/SP</text>
</svg>`;
await sharp(Buffer.from(og)).composite([{ input: logoPng, top: 170, left: 80 }]).jpeg({ quality: 88 }).toFile(p('../public/og-default.jpg'));

console.log('Logo gerado.');
