'use strict';

/** Capas 1200×630 — O Dia do Curinga (Artes) + Jostein Gaarder (Pessoas). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function makeCover(outRel, eyebrow, title, subtitle, tone) {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, outRel);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${tone[0]}"/>
      <stop offset="55%" stop-color="${tone[1]}"/>
      <stop offset="100%" stop-color="${tone[2]}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="980" cy="120" r="180" fill="rgba(255,255,255,0.04)"/>
  <circle cx="160" cy="520" r="220" fill="rgba(0,0,0,0.18)"/>
  <text x="600" y="180" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#9fd4c0" letter-spacing="8">${eyebrow}</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#f4fff8">${title}</text>
  <text x="600" y="370" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0e0d8">${subtitle}</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

async function main() {
  await makeCover(
    'imagens/inspecoes/o-dia-do-curinga-cover.jpg',
    'ARTES · LIVRO',
    'O Dia do Curinga',
    '1990 · Jostein Gaarder · Kabalmysteriet',
    ['#1a2a22', '#243828', '#0e1812']
  );
  await makeCover(
    'imagens/inspecoes/jostein-gaarder-cover.jpg',
    'PESSOAS · AUTOR',
    'Jostein Gaarder',
    'Oslo · filosofia narrada · O Dia do Curinga',
    ['#1e2430', '#2a3340', '#12161c']
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
