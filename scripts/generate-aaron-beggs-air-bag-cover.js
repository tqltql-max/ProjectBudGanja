'use strict';

/** Capa 1200×630 — cruzamento Aaron Beggs × Air Bag (colete NI × saco que infla). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const out = path.join(
    ROOT,
    'imagens',
    'inspecoes',
    'aaron-beggs-air-bag-cover.jpg'
  );
  fs.mkdirSync(path.dirname(out), { recursive: true });

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1428"/>
      <stop offset="42%" stop-color="#16305a"/>
      <stop offset="100%" stop-color="#1a1810"/>
    </linearGradient>
    <linearGradient id="bag" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(245,230,190,0.95)"/>
      <stop offset="55%" stop-color="rgba(232,210,140,0.55)"/>
      <stop offset="100%" stop-color="rgba(200,180,110,0.18)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="548" width="1200" height="8" fill="#f5d44a"/>
  <rect x="0" y="556" width="1200" height="6" fill="#f4f6f0"/>
  <ellipse cx="600" cy="268" rx="310" ry="128" fill="url(#bag)" opacity="0.92"/>
  <ellipse cx="600" cy="268" rx="310" ry="128" fill="none" stroke="rgba(245,212,74,0.55)" stroke-width="4"/>
  <circle cx="430" cy="430" r="38" fill="#f5d44a"/>
  <rect x="408" y="468" width="44" height="86" rx="8" fill="#1e4a9a"/>
  <circle cx="600" cy="418" r="36" fill="#e8e4dc"/>
  <rect x="580" y="454" width="40" height="90" rx="8" fill="#3a3a38"/>
  <circle cx="770" cy="430" r="38" fill="#2a6a3a"/>
  <rect x="748" y="468" width="44" height="86" rx="8" fill="#1a3a28"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#f5d44a" letter-spacing="7">PESSOAS · CRUZAMENTO</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="44" font-weight="700" fill="#0c1428">Aaron Beggs × Air Bag</text>
  <text x="600" y="318" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#16305a">o saco dispara · o homem escolhe</text>
  <text x="600" y="600" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(232,220,180,0.8)">Boston 2026 · Boylston Street · Valeu !!!</text>
</svg>`;

  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
  console.log(
    'OK',
    path.relative(ROOT, out),
    Math.round(fs.statSync(out).size / 1024) + 'KB'
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
