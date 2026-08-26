'use strict';

/** Capa 1200×630 — inspiração (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/inspiracao-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#081018"/>
      <stop offset="45%" stop-color="#152830"/>
      <stop offset="100%" stop-color="#0a1014"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="52%" r="52%">
      <stop offset="0%" stop-color="rgba(120,210,230,0.34)"/>
      <stop offset="50%" stop-color="rgba(80,150,180,0.14)"/>
      <stop offset="100%" stop-color="rgba(30,50,60,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="580" cy="320" rx="340" ry="220" fill="url(#glow)"/>
  <path d="M420 380 C480 300, 540 260, 620 250 C700 240, 760 270, 820 340" fill="none" stroke="rgba(180,230,240,0.45)" stroke-width="3"/>
  <path d="M460 400 C520 330, 580 290, 660 280 C740 270, 800 300, 850 360" fill="none" stroke="rgba(140,200,220,0.28)" stroke-width="2"/>
  <circle cx="620" cy="248" r="10" fill="rgba(220,250,255,0.75)"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#8ec8d8" letter-spacing="4">PALAVRAS · SOPRO · IDEIA</text>
  <text x="600" y="230" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f0f8ff">inspiração</text>
  <text x="600" y="320" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(200,230,240,0.95)">īnspīrātiō · sopro · ideia acesa</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#a8d0e0">faça o melhor com o sopro</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#8ec8d8">criatividade · gesto · esperança · caminho</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
