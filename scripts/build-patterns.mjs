/**
 * Gera o padrão de curvas de nível (topográfico) usado como textura de fundo.
 * Saída: public/patterns/topo.svg   Uso: node scripts/build-patterns.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const W = 1200, H = 800;
// ruído determinístico (soma de senoides) para deformar círculos concêntricos
const noise = (a, r, seed) =>
  Math.sin(a * 3 + seed) * 0.08 + Math.sin(a * 5 + seed * 1.7) * 0.05 + Math.sin(a * 2 + r * 0.01 + seed * 0.3) * 0.06;

const peaks = [
  { x: 260, y: 220, rings: 14, step: 26, seed: 1.2 },
  { x: 900, y: 560, rings: 16, step: 28, seed: 3.4 },
  { x: 1050, y: 120, rings: 9, step: 24, seed: 5.1 },
  { x: 120, y: 700, rings: 8, step: 30, seed: 2.2 },
];

let paths = '';
for (const p of peaks) {
  for (let i = 1; i <= p.rings; i++) {
    const r = i * p.step;
    let d = '';
    for (let k = 0; k <= 96; k++) {
      const a = (k / 96) * Math.PI * 2;
      const rr = r * (1 + noise(a, r, p.seed + i * 0.15));
      const x = (p.x + Math.cos(a) * rr * 1.25).toFixed(1);
      const y = (p.y + Math.sin(a) * rr).toFixed(1);
      d += (k ? 'L' : 'M') + x + ' ' + y;
    }
    const strong = i % 5 === 0;
    paths += `<path d="${d}Z" stroke-width="${strong ? 1.2 : 0.7}" stroke-opacity="${strong ? 0.9 : 0.55}"/>`;
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="#7AC943">${paths}</g></svg>\n`;
const out = fileURLToPath(new URL('../public/patterns/', import.meta.url));
mkdirSync(out, { recursive: true });
writeFileSync(out + 'topo.svg', svg);
console.log('topo.svg', (svg.length / 1024).toFixed(1) + 'KB');
