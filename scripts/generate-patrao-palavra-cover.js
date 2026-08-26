'use strict';

/** Capa 1200×630 — patrão (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/patrao-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#141010"/>
      <stop offset="50%" stop-color="#1e1814"/>
      <stop offset="100%" stop-color="#101418"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="48%" r="44%">
      <stop offset="0%" stop-color="rgba(200,160,100,0.22)"/>
      <stop offset="55%" stop-color="rgba(140,110,70,0.1)"/>
      <stop offset="100%" stop-color="rgba(30,25,15,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="330" rx="290" ry="190" fill="url(#glow)"/>
  <rect x="540" y="340" width="120" height="70" rx="6" fill="none" stroke="rgba(220,180,120,0.45)" stroke-width="3"/>
  <path d="M560 340 Q600 300 640 340" fill="none" stroke="rgba(220,180,120,0.4)" stroke-width="3"/>
  <circle cx="600" cy="290" r="28" fill="none" stroke="rgba(220,180,120,0.5)" stroke-width="3"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#d0b070" letter-spacing="4">PALAVRAS · CHEFE · RESPEITO</text>
  <text x="600" y="230" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f5efe6">Patrão</text>
  <text x="600" y="300" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(235,220,190,0.95)">chefe · empregador · patronus</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#d0b888">faça o melhor com ou sem olhar</text>
  <text x="600" y="570" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#a89870">respeito · pattern · gesto</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
