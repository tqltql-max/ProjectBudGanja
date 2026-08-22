'use strict';

/** Capa 1200×630 — Palavras · palavra (o vocábulo). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/palavra-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101820"/>
      <stop offset="50%" stop-color="#162028"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#3a6a78"/>
      <stop offset="55%" stop-color="#c4a35a"/>
      <stop offset="100%" stop-color="#5a8070"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="8" fill="url(#line)"/>
  <text x="600" y="160" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#c4a35a" letter-spacing="7">PALAVRAS · PARABOLA · VOCÁBULO</text>
  <text x="600" y="292" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f4efe6">&lt;&lt;palavra&gt;&gt;</text>
  <text x="600" y="372" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0c8b8">o vocábulo que nomeia a série</text>
  <text x="600" y="470" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#9aa8a0">≠ hub · ≠ verbo · ≠ Verbo</text>
  <text x="600" y="548" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#c4a35a">etimologia · língua · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
