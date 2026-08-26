'use strict';

/** Capa 1200×630 — palavra juntos (iungere · estado × elos). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/juntos-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#10181c"/>
      <stop offset="48%" stop-color="#1a3028"/>
      <stop offset="100%" stop-color="#0c1210"/>
    </linearGradient>
    <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(232,210,120,0.15)"/>
      <stop offset="100%" stop-color="rgba(180,210,150,0.55)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="430" cy="330" rx="118" ry="78" fill="none" stroke="url(#ring)" stroke-width="14"/>
  <ellipse cx="770" cy="330" rx="118" ry="78" fill="none" stroke="url(#ring)" stroke-width="14"/>
  <path d="M520 330 Q600 250 680 330 Q600 410 520 330" fill="none" stroke="rgba(232,220,150,0.35)" stroke-width="3"/>
  <circle cx="600" cy="330" r="10" fill="rgba(232,220,150,0.7)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#b8d4a8" letter-spacing="6">PALAVRAS · IUNGERE · × ELOS</text>
  <text x="600" y="210" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="84" font-weight="700" fill="#f4faf6">juntos</text>
  <text x="600" y="470" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#c5ddd0">estado · elos · Valeu !!!</text>
  <text x="600" y="518" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(180,200,190,0.75)">junto · juntas · ≠ slogan</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
