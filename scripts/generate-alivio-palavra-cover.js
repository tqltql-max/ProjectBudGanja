'use strict';

/** Capa 1200×630 — palavra alívio (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/alivio-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#10140f"/>
      <stop offset="48%" stop-color="#161c14"/>
      <stop offset="100%" stop-color="#0a0c09"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="40%" r="50%">
      <stop offset="0%" stop-color="rgba(180,200,140,0.28)"/>
      <stop offset="55%" stop-color="rgba(80,90,50,0.10)"/>
      <stop offset="100%" stop-color="rgba(30,35,20,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(190,200,150,0)"/>
      <stop offset="50%" stop-color="rgba(190,200,150,0.55)"/>
      <stop offset="100%" stop-color="rgba(190,200,150,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="380" ry="200" fill="url(#glow)"/>
  <path d="M430 280 C480 200 540 190 600 230 C660 190 720 200 770 280" fill="none" stroke="rgba(220,230,190,0.28)" stroke-width="3"/>
  <rect x="280" y="338" width="640" height="2" fill="url(#bar)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8d090" letter-spacing="4">PALAVRAS · LEVIS · TORNAR LEVE</text>
  <text x="600" y="292" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f4f8e8">alívio</text>
  <text x="600" y="392" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(210,220,180,0.95)">aliviado = estado · a orelha cola veado</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#b8c080">venātus · o animal fica animal</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#c8d090">o étimo corta</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
