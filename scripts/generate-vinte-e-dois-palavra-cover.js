'use strict';

/** Capa 1200×630 — 22 / vinte e dois · invertido → s2. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/vinte-e-dois-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#140814"/>
      <stop offset="48%" stop-color="#1c1020"/>
      <stop offset="100%" stop-color="#0e1218"/>
    </linearGradient>
    <radialGradient id="glow" cx="32%" cy="46%" r="42%">
      <stop offset="0%" stop-color="rgba(220,160,120,0.22)"/>
      <stop offset="100%" stop-color="rgba(20,8,20,0)"/>
    </radialGradient>
    <radialGradient id="heart" cx="72%" cy="44%" r="38%">
      <stop offset="0%" stop-color="rgba(210,90,110,0.28)"/>
      <stop offset="100%" stop-color="rgba(20,8,20,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="380" cy="290" rx="260" ry="190" fill="url(#glow)"/>
  <ellipse cx="860" cy="280" rx="240" ry="180" fill="url(#heart)"/>
  <text x="340" y="390" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="268" font-weight="700" fill="rgba(244,236,220,0.94)">22</text>
  <path d="M560 300 C610 250, 650 250, 700 300" fill="none" stroke="rgba(220,180,140,0.7)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="692,286 718,300 692,314" fill="rgba(220,180,140,0.75)"/>
  <text x="860" y="280" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="168" fill="rgba(230,140,150,0.96)">s</text>
  <text x="980" y="280" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="168" fill="rgba(244,220,200,0.96)">2</text>
  <text x="920" y="400" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" fill="rgba(230,140,150,0.62)">♥</text>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#d4a090" letter-spacing="3">PALAVRAS · VĪGINTĪ + DUO · 22 → s2</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="40" font-weight="700" fill="#f4ece4">vinte e dois</text>
  <text x="600" y="548" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(230,210,200,0.95)">2×11 · inverter o 2 cola no S · s2 = peito do chat</text>
  <text x="600" y="586" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#c89098">≠ Catch-22 · ≠ órgão · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
