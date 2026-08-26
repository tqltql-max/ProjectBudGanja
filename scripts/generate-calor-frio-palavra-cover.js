'use strict';

/** Capa 1200×630 — calor × frio (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/calor-frio-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2a1208"/>
      <stop offset="48%" stop-color="#141418"/>
      <stop offset="52%" stop-color="#10141c"/>
      <stop offset="100%" stop-color="#081018"/>
    </linearGradient>
    <radialGradient id="hot" cx="28%" cy="46%" r="42%">
      <stop offset="0%" stop-color="rgba(255,160,60,0.50)"/>
      <stop offset="55%" stop-color="rgba(180,70,20,0.14)"/>
      <stop offset="100%" stop-color="rgba(20,8,4,0)"/>
    </radialGradient>
    <radialGradient id="cold" cx="74%" cy="46%" r="42%">
      <stop offset="0%" stop-color="rgba(140,200,230,0.40)"/>
      <stop offset="55%" stop-color="rgba(50,90,130,0.14)"/>
      <stop offset="100%" stop-color="rgba(6,10,18,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="340" cy="300" rx="260" ry="180" fill="url(#hot)"/>
  <ellipse cx="870" cy="300" rx="260" ry="180" fill="url(#cold)"/>
  <circle cx="340" cy="268" r="54" fill="rgba(255,200,90,0.88)"/>
  <circle cx="340" cy="268" r="28" fill="rgba(255,240,180,0.95)"/>
  <path d="M870 210 L878 238 L908 238 L884 256 L894 286 L870 268 L846 286 L856 256 L832 238 L862 238 Z" fill="rgba(210,236,248,0.88)" stroke="rgba(180,220,240,0.7)" stroke-width="1.5"/>
  <rect x="586" y="168" width="28" height="294" rx="14" fill="rgba(24,26,32,0.95)" stroke="rgba(200,200,210,0.35)" stroke-width="2"/>
  <rect x="592" y="178" width="16" height="120" rx="8" fill="rgba(255,140,50,0.85)"/>
  <rect x="592" y="298" width="16" height="148" rx="8" fill="rgba(140,190,220,0.55)"/>
  <circle cx="600" cy="454" r="22" fill="rgba(230,236,244,0.9)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d8b070" letter-spacing="3">PALAVRAS · LAT. CALOR × FRĪGUS · QUALIDADE</text>
  <text x="600" y="148" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#f4eee4">calor × frio</text>
  <text x="600" y="530" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(220,210,190,0.95)">não é fogo · não é gelo · mede-se</text>
  <text x="600" y="580" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c8b080">quente e frio no mesmo termómetro</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
