'use strict';

/** Capa 1200×630 — cinta (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/cinta-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#12100e"/>
      <stop offset="50%" stop-color="#1e1814"/>
      <stop offset="100%" stop-color="#0c1210"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="50%" r="45%">
      <stop offset="0%" stop-color="rgba(180,140,80,0.25)"/>
      <stop offset="55%" stop-color="rgba(100,120,70,0.12)"/>
      <stop offset="100%" stop-color="rgba(30,40,20,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="580" cy="320" rx="320" ry="200" fill="url(#glow)"/>
  <path d="M320 380 Q480 280 600 360 Q720 440 880 320" fill="none" stroke="rgba(210,170,100,0.55)" stroke-width="10" stroke-linecap="round"/>
  <path d="M340 400 Q500 300 620 380 Q740 460 860 340" fill="none" stroke="rgba(160,190,110,0.35)" stroke-width="4" stroke-linecap="round"/>
  <line x1="600" y1="180" x2="600" y2="480" stroke="rgba(140,160,100,0.35)" stroke-width="3"/>
  <circle cx="600" cy="200" r="8" fill="rgba(180,210,120,0.55)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8b080" letter-spacing="4">PALAVRAS · SUPORTE · GESTO</text>
  <text x="600" y="240" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="78" font-weight="700" fill="#f5efe0">cinta</text>
  <text x="600" y="310" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(230,220,190,0.95)">cingere · faixa · tutor com folga</text>
  <text x="600" y="510" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#c8d0a0">faça o melhor neste aperto</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#b0a070">gesto · planta · cultivo · risco</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
