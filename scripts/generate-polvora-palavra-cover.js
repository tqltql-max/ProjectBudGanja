'use strict';

/** Capa 1200×630 — pólvora (Palavras · pulvis; sem receita). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/polvora-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a100c"/>
      <stop offset="48%" stop-color="#12100e"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
    <radialGradient id="dust" cx="36%" cy="58%" r="42%">
      <stop offset="0%" stop-color="rgba(90,70,50,0.45)"/>
      <stop offset="100%" stop-color="rgba(12,10,8,0)"/>
    </radialGradient>
    <radialGradient id="glow" cx="72%" cy="40%" r="38%">
      <stop offset="0%" stop-color="rgba(200,90,40,0.22)"/>
      <stop offset="100%" stop-color="rgba(12,8,6,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="400" cy="400" rx="260" ry="140" fill="url(#dust)"/>
  <ellipse cx="860" cy="240" rx="220" ry="160" fill="url(#glow)"/>
  <circle cx="340" cy="430" r="3" fill="rgba(180,160,130,0.55)"/>
  <circle cx="410" cy="390" r="2" fill="rgba(180,160,130,0.45)"/>
  <circle cx="480" cy="450" r="2.5" fill="rgba(180,160,130,0.40)"/>
  <circle cx="370" cy="360" r="1.5" fill="rgba(180,160,130,0.35)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" fill="#d8b070" letter-spacing="2.2">PALAVRAS · PULVIS · ≠ RECEITA · FOFO ≠ FOGO · FOSFORO ≠ MODO</text>
  <text x="600" y="168" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#f4eee4">pólvora</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(220,210,190,0.95)">o nome do pó · não a mistura</text>
  <text x="600" y="552" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#c8b080">esqueiro · fósforo · fogo — salas ao lado</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
