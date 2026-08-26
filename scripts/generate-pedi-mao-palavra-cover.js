'use strict';

/** Capa 1200×630 — pedi a mão (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/pedi-mao-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#120e10"/>
      <stop offset="50%" stop-color="#1e181c"/>
      <stop offset="100%" stop-color="#0e1410"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="45%">
      <stop offset="0%" stop-color="rgba(200,150,120,0.22)"/>
      <stop offset="55%" stop-color="rgba(140,120,100,0.1)"/>
      <stop offset="100%" stop-color="rgba(30,25,20,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="320" rx="300" ry="200" fill="url(#glow)"/>
  <path d="M420 380 Q480 300 540 360 Q560 400 520 420" fill="none" stroke="rgba(220,180,140,0.5)" stroke-width="4" stroke-linecap="round"/>
  <path d="M780 380 Q720 300 660 360 Q640 400 680 420" fill="none" stroke="rgba(180,200,140,0.45)" stroke-width="4" stroke-linecap="round"/>
  <path d="M520 400 Q600 360 680 400" fill="none" stroke="rgba(200,180,140,0.35)" stroke-width="3"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8b090" letter-spacing="4">PALAVRAS · PEDIDO · MÃO</text>
  <text x="600" y="230" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#f5efe6">pedi a mão</text>
  <text x="600" y="300" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(230,220,200,0.95)">ajuda · compromisso · gesto aberto</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#c8b8a0">faça o melhor ao pedir e ao dar</text>
  <text x="600" y="570" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#a89878">mãos · gesto · respeito</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
