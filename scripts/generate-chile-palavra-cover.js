'use strict';

/** Capa 1200×630 — Chile (Palavras · país). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/chile-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#071018"/>
      <stop offset="38%" stop-color="#0a1a28"/>
      <stop offset="62%" stop-color="#1a1410"/>
      <stop offset="100%" stop-color="#2a1810"/>
    </linearGradient>
    <linearGradient id="strip" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(196,140,70,0.55)"/>
      <stop offset="45%" stop-color="rgba(80,90,70,0.45)"/>
      <stop offset="100%" stop-color="rgba(40,70,90,0.50)"/>
    </linearGradient>
    <radialGradient id="sea" cx="22%" cy="50%" r="48%">
      <stop offset="0%" stop-color="rgba(30,90,140,0.55)"/>
      <stop offset="100%" stop-color="rgba(6,12,20,0)"/>
    </radialGradient>
    <radialGradient id="andes" cx="78%" cy="48%" r="42%">
      <stop offset="0%" stop-color="rgba(200,170,140,0.40)"/>
      <stop offset="100%" stop-color="rgba(20,12,8,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="260" cy="320" rx="300" ry="220" fill="url(#sea)"/>
  <ellipse cx="960" cy="300" rx="280" ry="210" fill="url(#andes)"/>
  <rect x="548" y="70" width="104" height="490" rx="8" fill="url(#strip)" stroke="rgba(220,190,140,0.45)" stroke-width="2"/>
  <path d="M640 110 L700 160 L660 210 L730 280 L650 340 L710 410 L640 470 L680 530" fill="none" stroke="rgba(230,210,180,0.55)" stroke-width="3"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" fill="#d8b070" letter-spacing="2.5">PALAVRAS · PAÍS · ≠ CHILI · ≠ AJÍ COLADO</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f4eee4">Chile</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(220,210,190,0.95)">a faixa · Andes e Pacífico · o país</text>
  <text x="600" y="552" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#c8b080">não colar a pimenta no mapa</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
