'use strict';

/** Capas 1200×630 para fichas Palavras (duplo sentido). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

const WORDS = [
  ['ganja', 'GANJA'],
  ['diamba', 'DIAMBA'],
  ['cannabis', 'CANNABIS'],
  ['marijuana', 'MARIJUANA'],
  ['erva', 'ERVA'],
  ['droga', 'DROGA'],
  ['canhamo', 'CÂNHAMO']
];

async function makeCover(slugSuffix, word) {
  const sharp = require('sharp');
  const outRel = 'imagens/inspecoes/' + slugSuffix + '-palavra-cover.jpg';
  const OUT = path.join(ROOT, outRel);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a2420"/>
      <stop offset="55%" stop-color="#243028"/>
      <stop offset="100%" stop-color="#0e1410"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="980" cy="120" r="180" fill="rgba(255,255,255,0.04)"/>
  <circle cx="160" cy="520" r="220" fill="rgba(0,0,0,0.18)"/>
  <text x="600" y="180" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#9fd4c0" letter-spacing="6">PALAVRAS · DUPLO SENTIDO</text>
  <text x="600" y="310" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#f4fff8">${word}</text>
  <text x="600" y="380" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#d0e0d8">originalidade · mudança · mapa</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT));
}

async function main() {
  for (const [slug, word] of WORDS) {
    await makeCover(slug, word);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
