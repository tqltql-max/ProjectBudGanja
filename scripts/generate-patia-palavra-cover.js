'use strict';

/** Capa 1200×630 — Patia / -patia (Palavras). Quatro salas em volta de πάθος. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/patia-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#120a12"/>
      <stop offset="45%" stop-color="#1a1218"/>
      <stop offset="100%" stop-color="#0c1418"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="48%">
      <stop offset="0%" stop-color="rgba(200,120,140,0.28)"/>
      <stop offset="55%" stop-color="rgba(90,160,170,0.12)"/>
      <stop offset="100%" stop-color="rgba(12,18,22,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="360" ry="190" fill="url(#glow)"/>
  <rect x="118" y="148" width="220" height="86" rx="10" fill="none" stroke="rgba(220,160,170,0.45)" stroke-width="2"/>
  <rect x="862" y="148" width="220" height="86" rx="10" fill="none" stroke="rgba(160,190,210,0.45)" stroke-width="2"/>
  <rect x="118" y="268" width="220" height="86" rx="10" fill="none" stroke="rgba(200,180,110,0.45)" stroke-width="2"/>
  <rect x="862" y="268" width="220" height="86" rx="10" fill="none" stroke="rgba(140,180,150,0.45)" stroke-width="2"/>
  <text x="228" y="186" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="rgba(230,190,200,0.95)">A · afecto</text>
  <text x="228" y="212" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="16" fill="rgba(240,220,220,0.88)">empatia</text>
  <text x="972" y="186" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="rgba(180,210,220,0.95)">B · doença</text>
  <text x="972" y="212" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="16" fill="rgba(220,230,235,0.88)">neuropatia</text>
  <text x="228" y="306" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="rgba(220,200,130,0.95)">C · escola</text>
  <text x="228" y="332" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="16" fill="rgba(235,225,180,0.88)">homeopatia</text>
  <text x="972" y="306" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="rgba(160,200,170,0.95)">D · planta</text>
  <text x="972" y="332" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="16" fill="rgba(200,225,205,0.88)">alelopatia</text>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c8b878" letter-spacing="4">PALAVRAS · PÁTHOS · -PÁTHEIA</text>
  <text x="600" y="248" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" fill="rgba(240,220,180,0.92)">πάθος</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="62" font-weight="700" fill="#f4efe4">-patia</text>
  <text x="600" y="488" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(230,214,180,0.95)">sentir × sofrer × escola × planta</text>
  <text x="600" y="578" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(190,180,150,0.9)">≠ pato · ≠ pátria · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
