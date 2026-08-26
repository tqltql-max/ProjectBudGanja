'use strict';

/** Capa 1200×630 — palavra Grok (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/grok-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1018"/>
      <stop offset="50%" stop-color="#1a2438"/>
      <stop offset="100%" stop-color="#0a0e14"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="38%">
      <stop offset="0%" stop-color="rgba(212,175,55,0.28)"/>
      <stop offset="100%" stop-color="rgba(212,175,55,0)"/>
    </radialGradient>
    <radialGradient id="glow2" cx="72%" cy="58%" r="30%">
      <stop offset="0%" stop-color="rgba(100,160,220,0.18)"/>
      <stop offset="100%" stop-color="rgba(100,160,220,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="280" r="220" fill="url(#glow)"/>
  <circle cx="820" cy="360" r="180" fill="url(#glow2)"/>
  <path d="M420 340 Q600 220 780 340" fill="none" stroke="rgba(232,210,140,0.35)" stroke-width="3" stroke-linecap="round"/>
  <path d="M440 360 Q600 280 760 360" fill="none" stroke="rgba(160,190,230,0.25)" stroke-width="2" stroke-linecap="round"/>
  <text x="600" y="140" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#d4af37" letter-spacing="6">PALAVRAS · COMPREENDER POR DENTRO</text>
  <text x="600" y="290" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f7f2e8">Grok</text>
  <text x="600" y="370" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#c8d0dc">to grok · falar limpo · Deus × tom</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
