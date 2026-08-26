'use strict';

/** Capa 1200×630 — deplorar (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/deplorar-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101418"/>
      <stop offset="50%" stop-color="#141c24"/>
      <stop offset="100%" stop-color="#080a0e"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="40%" r="46%">
      <stop offset="0%" stop-color="rgba(90,150,180,0.30)"/>
      <stop offset="100%" stop-color="rgba(90,150,180,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="580" cy="240" rx="370" ry="190" fill="url(#glow)"/>
  <path d="M600 300 C600 300 560 360 600 410 C640 360 600 300 600 300 Z" fill="rgba(160,210,230,0.22)" stroke="rgba(180,220,235,0.55)" stroke-width="2"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#8ec0d0" letter-spacing="3">PALAVRAS · LAT. DĒPLŌRĀRE · LASTIMAR</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#e4f0f6">deplorar</text>
  <text x="600" y="340" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#b8d0dc">o dano, não a êmese</text>
  <text x="600" y="470" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(200,224,232,0.95)">luto · juízo · par vomitar</text>
  <text x="600" y="530" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#9cbcc8">plōrāre ≠ vomere</text>
  <text x="600" y="580" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#8ec0d0">lastimar depois de largar o que não fica</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
