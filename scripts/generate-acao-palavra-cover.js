'use strict';

/** Capa 1200×630 — palavra ação (agere · gesto · ≠ bolsa). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/acao-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1812"/>
      <stop offset="48%" stop-color="#163024"/>
      <stop offset="100%" stop-color="#0a1210"/>
    </linearGradient>
    <linearGradient id="arrow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(200,180,90,0.15)"/>
      <stop offset="100%" stop-color="rgba(180,210,140,0.55)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <path d="M160 340 L780 250 L760 290 L1040 220 L790 370 L810 330 L160 420 Z" fill="url(#arrow)"/>
  <circle cx="180" cy="380" r="14" fill="rgba(232,220,150,0.7)"/>
  <circle cx="980" cy="200" r="8" fill="rgba(232,220,150,0.45)"/>
  <path d="M220 480 Q420 450 640 470 Q860 490 1020 440" fill="none" stroke="rgba(180,210,170,0.14)" stroke-width="3"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#b8d4a8" letter-spacing="6">PALAVRAS · AGERE · ≠ BOLSA</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="84" font-weight="700" fill="#f4faf6">ação</text>
  <text x="600" y="380" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#c5ddd0">gesto · caminho · Valeu !!!</text>
  <text x="600" y="430" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(180,200,190,0.75)">acção · ato · outras salas</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
