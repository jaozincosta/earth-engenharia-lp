/**
 * Gera imagens PLACEHOLDER (JPG) em src/assets/fotos e a imagem Open Graph em public/.
 * Substitua os JPGs por fotos reais da equipe em campo mantendo os mesmos nomes de arquivo.
 * Uso: node scripts/generate-placeholders.mjs
 */
import sharp from 'sharp';
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const out = new URL('../src/assets/fotos/', import.meta.url);
mkdirSync(out, { recursive: true });

const photos = [
  ['equipe-campo.jpg', 1600, 1200, 'Foto: equipe EARTH em campo'],
  ['licenciamento.jpg', 1600, 1000, 'Foto: vistoria ambiental'],
  ['seguranca.jpg', 1600, 1000, 'Foto: inspeção de segurança do trabalho'],
  ['sobre.jpg', 1600, 1200, 'Foto: equipe técnica EARTH'],
];

const svg = (w, h, label) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1c6741"/><stop offset="1" stop-color="#072a19"/>
    </linearGradient>
    <pattern id="p" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity=".06"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#p)"/>
  <circle cx="${w * 0.82}" cy="${h * 0.18}" r="${h * 0.35}" fill="#7AC943" fill-opacity=".14"/>
  <g transform="translate(${w / 2} ${h / 2 - 40})" fill="none" stroke="#7AC943" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="-60" y="-42" width="120" height="84" rx="14"/><circle r="22"/><path d="M-30 -42l10-16h40l10 16"/>
  </g>
  <text x="50%" y="${h / 2 + 60}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.round(w / 34)}" font-weight="700" fill="#ffffff">${label}</text>
  <text x="50%" y="${h / 2 + 60 + w / 26}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.round(w / 56)}" fill="#c8eba9">PLACEHOLDER — substituir por foto real</text>
</svg>`;

for (const [name, w, h, label] of photos) {
  await sharp(Buffer.from(svg(w, h, label))).jpeg({ quality: 82 }).toFile(fileURLToPath(new URL(name, out)));
}

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0f4d2e"/><stop offset="1" stop-color="#04190f"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="1050" cy="80" r="260" fill="#7AC943" fill-opacity=".15"/>
  <g transform="translate(90 120)"><circle cx="44" cy="44" r="44" fill="#7AC943"/><path d="M44 14v60M44 44l-14-12M44 58l16-14" stroke="#0F4D2E" stroke-width="5" stroke-linecap="round" fill="none"/></g>
  <text x="90" y="320" font-family="Arial, sans-serif" font-size="84" font-weight="800" fill="#fff">EARTH Engenharia</text>
  <text x="90" y="390" font-family="Arial, sans-serif" font-size="36" fill="#c8eba9">Soluções técnicas para um futuro sustentável</text>
  <text x="90" y="520" font-family="Arial, sans-serif" font-size="28" fill="#ffffffb3">Meio ambiente · Segurança do trabalho · Conformidade</text>
</svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 85 }).toFile(fileURLToPath(new URL('../public/og-default.jpg', import.meta.url)));

console.log('Placeholders gerados.');
