'use strict';

/** Capa 1200×630 — sexta-feira 13 (Palavras): apenas mais um dia. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/sexta-feira-13-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0c1820"/>
      <stop offset="50%" stop-color="#143044"/>
      <stop offset="100%" stop-color="#0a2230"/>
    </linearGradient>
    <radialGradient id="soft" cx="78%" cy="28%" r="42%">
      <stop offset="0%" stop-color="rgba(232,196,96,0.18)"/>
      <stop offset="100%" stop-color="rgba(232,196,96,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="940" cy="160" r="220" fill="url(#soft)"/>
  <!-- quiet calendar grid -->
  <rect x="86" y="168" width="268" height="292" rx="14" fill="none" stroke="rgba(200,220,232,0.28)" stroke-width="2"/>
  <text x="220" y="208" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" fill="#9eb4c6" letter-spacing="4">NOVEMBRO</text>
  <text x="220" y="368" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="92" fill="#f4f7fa">13</text>
  <text x="220" y="422" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#c5d4e0">sexta-feira · 2026</text>
  <text x="720" y="92" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#b8c8dc" letter-spacing="6">PALAVRAS · CALENDÁRIO</text>
  <text x="720" y="268" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" fill="#f7fbff">sexta-feira 13</text>
  <text x="720" y="340" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0dce8">apenas mais um dia qualquer</text>
  <text x="720" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#c4d4e4">o dia passa · o ofício continua</text>
  <text x="720" y="568" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#8aa0b8">tempo · medo · risco · verdade</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
