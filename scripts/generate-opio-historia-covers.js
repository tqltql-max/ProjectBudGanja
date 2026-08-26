'use strict';

/** Capas 1200×630 — Ópio + Tosches + História das Coisas + Leonard. */
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
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="40" font-weight="700" fill="#f4fff8">${title}</text>
  <text x="600" y="370" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#d0e0d8">${subtitle}</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

async function main() {
  await makeCover(
    'imagens/inspecoes/a-ultima-casa-de-opio-cover.jpg',
    'ARTES · LIVRO',
    'A Última Casa de Ópio',
    '2002 · Nick Tosches · The Last Opium Den',
    ['#2a1e18', '#3c2a20', '#14100c']
  );
  await makeCover(
    'imagens/inspecoes/nick-tosches-cover.jpg',
    'PESSOAS · AUTOR',
    'Nick Tosches',
    '1949–2019 · Vanity Fair · A Última Casa de Ópio',
    ['#1e2430', '#2a3340', '#12161c']
  );
  await makeCover(
    'imagens/inspecoes/a-historia-das-coisas-cover.jpg',
    'ARTES · LIVRO',
    'A História das Coisas',
    '2010 · Annie Leonard · The Story of Stuff',
    ['#1a2824', '#243830', '#0e1612']
  );
  await makeCover(
    'imagens/inspecoes/annie-leonard-cover.jpg',
    'PESSOAS · AUTORA',
    'Annie Leonard',
    'Story of Stuff · sustentabilidade · livro 2010',
    ['#1e2830', '#2a3840', '#12181c']
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
