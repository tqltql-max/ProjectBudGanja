'use strict';

/** Capa 1200×630 — palavra incrível (credere · × acreditar / fé). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/incrivel-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#10141c"/>
      <stop offset="48%" stop-color="#1a2438"/>
      <stop offset="100%" stop-color="#0c1016"/>
    </linearGradient>
    <radialGradient id="glow" cx="52%" cy="40%" r="48%">
      <stop offset="0%" stop-color="rgba(220,190,110,0.28)"/>
      <stop offset="55%" stop-color="rgba(140,170,220,0.12)"/>
      <stop offset="100%" stop-color="rgba(40,50,70,0)"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(220,190,110,0)"/>
      <stop offset="50%" stop-color="rgba(220,190,110,0.55)"/>
      <stop offset="100%" stop-color="rgba(220,190,110,0)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="270" rx="340" ry="170" fill="url(#glow)"/>
  <rect x="340" y="318" width="520" height="2" fill="url(#bar)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8d8f0" letter-spacing="5">PALAVRAS · CREDERE · × ACREDITAR / FÉ</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="78" font-weight="700" fill="#f4f6fa">incrível</text>
  <text x="600" y="380" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d5c89a">incredibilis · acreditar · fé</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#b8c8d8">mesmo tronco ≠ outro étimo</text>
  <text x="600" y="558" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(180,200,220,0.8)">credere · fides · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
