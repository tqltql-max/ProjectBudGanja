'use strict';

/** Capas 1200×630 — siglas AO90 (acordo / ano) e AOC (monitor). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function writeCover(outRel, svg) {
  const sharp = require('sharp');
  const out = path.join(ROOT, outRel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
  console.log('OK', path.relative(ROOT, out), Math.round(fs.statSync(out).size / 1024) + 'KB');
}

async function main() {
  await writeCover(
    'imagens/inspecoes/ao90-palavra-cover.jpg',
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#14100c"/>
      <stop offset="48%" stop-color="#2a2418"/>
      <stop offset="100%" stop-color="#0c0a08"/>
    </linearGradient>
    <linearGradient id="page" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(232,220,180,0.16)"/>
      <stop offset="100%" stop-color="rgba(180,160,110,0.06)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="340" y="70" width="520" height="360" rx="8" fill="url(#page)" stroke="rgba(232,213,163,0.28)" stroke-width="2"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#d4c48a" letter-spacing="5">PALAVRAS · SIGLA · 1990</text>
  <text x="520" y="280" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="92" font-weight="700" fill="#f4ead0">AO</text>
  <text x="720" y="280" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="92" font-weight="700" fill="#e8d48a">90</text>
  <text x="780" y="200" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="36" fill="rgba(200,180,140,0.35)">c</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d8ccb0">Acordo Ortográfico · o ano, não o hertz</text>
  <text x="600" y="548" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#b8a070">grafia ≠ étimo · ≠ AOC</text>
</svg>`
  );

  await writeCover(
    'imagens/inspecoes/aoc-palavra-cover.jpg',
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a1218"/>
      <stop offset="50%" stop-color="#122430"/>
      <stop offset="100%" stop-color="#080c10"/>
    </linearGradient>
    <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a3a48"/>
      <stop offset="100%" stop-color="#0e2430"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g2)"/>
  <rect x="330" y="90" width="540" height="320" rx="14" fill="#12181c" stroke="rgba(154,212,200,0.35)" stroke-width="10"/>
  <rect x="350" y="110" width="500" height="260" fill="url(#screen)"/>
  <text x="600" y="270" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="96" font-weight="700" fill="#9ad4c8" letter-spacing="12">AOC</text>
  <rect x="560" y="410" width="80" height="28" fill="#1a2228"/>
  <rect x="420" y="438" width="360" height="16" rx="4" fill="#1a2228"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#9ad4c8" letter-spacing="4">PALAVRAS · SIGLA · MONITOR</text>
  <text x="600" y="520" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#c5ddd0">Admiral Overseas Corporation</text>
  <text x="600" y="568" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#b8a070">objeto electrónico · ≠ AO90</text>
</svg>`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
