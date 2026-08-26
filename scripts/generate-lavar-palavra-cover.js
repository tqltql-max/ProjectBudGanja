'use strict';

/** Capa 1200×630 — palavra lavar (Palavras · mãos). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/lavar-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1418"/>
      <stop offset="50%" stop-color="#121a16"/>
      <stop offset="100%" stop-color="#0a1012"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="45%" r="42%">
      <stop offset="0%" stop-color="rgba(120,180,200,0.22)"/>
      <stop offset="55%" stop-color="rgba(223,194,98,0.12)"/>
      <stop offset="100%" stop-color="rgba(120,180,200,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="270" r="240" fill="url(#glow)"/>
  <!-- two hands / water suggestion -->
  <ellipse cx="480" cy="300" rx="90" ry="50" fill="none" stroke="rgba(180,210,220,0.55)" stroke-width="4"/>
  <ellipse cx="720" cy="300" rx="90" ry="50" fill="none" stroke="rgba(223,194,98,0.55)" stroke-width="4"/>
  <path d="M560 280 Q600 340 640 280" fill="none" stroke="rgba(160,200,210,0.7)" stroke-width="3"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#dfc262" letter-spacing="6">PALAVRAS · MÃOS → ALMA</text>
  <text x="600" y="420" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4efe6">lavar</text>
  <text x="600" y="490" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(200,184,160,0.95)">água · ≠ lava · ≠ larva · lava-pé noutra sala</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#8ec4d4">cuidado sim · fuga e vingança não</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
