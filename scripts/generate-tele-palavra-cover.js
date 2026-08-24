'use strict';

/** Capa 1200×630 — Palavras · tele (τῆλε ≠ tela). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/tele-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071018"/>
      <stop offset="48%" stop-color="#12243a"/>
      <stop offset="100%" stop-color="#1a140c"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="38%" r="42%">
      <stop offset="0%" stop-color="rgba(90,170,220,0.32)"/>
      <stop offset="100%" stop-color="rgba(7,16,24,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="8" fill="#c4a35a"/>
  <ellipse cx="920" cy="240" rx="280" ry="170" fill="url(#glow)"/>
  <circle cx="160" cy="300" r="10" fill="#c4a35a"/>
  <circle cx="160" cy="300" r="28" fill="none" stroke="#8eb4c8" stroke-width="3" opacity="0.7"/>
  <circle cx="160" cy="300" r="48" fill="none" stroke="#8eb4c8" stroke-width="2" opacity="0.35"/>
  <line x1="210" y1="300" x2="820" y2="300" stroke="#8eb4c8" stroke-width="3" stroke-dasharray="10 12" stroke-linecap="round"/>
  <rect x="840" y="230" width="170" height="120" rx="8" fill="none" stroke="#c4a35a" stroke-width="5"/>
  <rect x="858" y="248" width="134" height="72" fill="#1c3048"/>
  <line x1="900" y1="350" x2="880" y2="390" stroke="#c4a35a" stroke-width="4" stroke-linecap="round"/>
  <line x1="950" y1="350" x2="970" y2="390" stroke="#c4a35a" stroke-width="4" stroke-linecap="round"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c4a35a" letter-spacing="5">PALAVRAS · ΤῆΛΕ ≠ TELA</text>
  <text x="520" y="280" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="86" font-weight="700" fill="#f4efe6">tele</text>
  <text x="520" y="340" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="26" fill="#8eb4c8">τῆλε · longe</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d8c8c0">a caixa na sala · ≠ a tela</text>
  <text x="600" y="568" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#c4a35a">telefone · telescópio · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
