'use strict';

/** Capa 1200×630 — México (Palavras · país). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/mexico-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a2818"/>
      <stop offset="42%" stop-color="#141210"/>
      <stop offset="58%" stop-color="#141210"/>
      <stop offset="100%" stop-color="#081018"/>
    </linearGradient>
    <radialGradient id="land" cx="38%" cy="48%" r="46%">
      <stop offset="0%" stop-color="rgba(180,90,50,0.38)"/>
      <stop offset="100%" stop-color="rgba(12,8,6,0)"/>
    </radialGradient>
    <radialGradient id="sea" cx="78%" cy="52%" r="44%">
      <stop offset="0%" stop-color="rgba(40,120,160,0.40)"/>
      <stop offset="100%" stop-color="rgba(6,10,16,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="420" cy="310" rx="280" ry="190" fill="url(#land)"/>
  <ellipse cx="900" cy="330" rx="260" ry="170" fill="url(#sea)"/>
  <path d="M820 300 Q900 250 980 310 Q940 380 820 360 Q800 330 820 300 Z" fill="rgba(50,130,170,0.55)" stroke="rgba(140,200,220,0.45)" stroke-width="2"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" fill="#d8b070" letter-spacing="2.5">PALAVRAS · INSPEÇÃO ESPECIAL · GOSFO → GOLFO · ≠ GOLFE ≠ CONGO</text>
  <text x="600" y="168" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#f4eee4">México</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(220,210,190,0.95)">Mēxihco · o país · o golfo ao lado</text>
  <text x="600" y="552" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#c8b080">não colar o jogo, o gongo nem o Congo</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
