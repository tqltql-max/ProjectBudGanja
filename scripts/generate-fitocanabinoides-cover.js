'use strict';

/**
 * Capa 1200×630 da pesquisa «Fitocanabinoides».
 * Uso: node scripts/generate-fitocanabinoides-cover.js
 */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/pesquisas/fitocanabinoides-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1610"/>
      <stop offset="45%" stop-color="#142218"/>
      <stop offset="100%" stop-color="#10180c"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="38%" r="42%">
      <stop offset="0%" stop-color="rgba(180,200,90,0.32)"/>
      <stop offset="55%" stop-color="rgba(90,150,80,0.12)"/>
      <stop offset="100%" stop-color="rgba(20,30,20,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="860" cy="240" rx="280" ry="190" fill="url(#glow)"/>
  <circle cx="820" cy="220" r="78" fill="none" stroke="rgba(196,210,110,0.5)" stroke-width="3"/>
  <circle cx="820" cy="220" r="44" fill="none" stroke="rgba(160,190,90,0.4)" stroke-width="2"/>
  <circle cx="740" cy="168" r="11" fill="rgba(210,220,120,0.7)"/>
  <circle cx="900" cy="168" r="11" fill="rgba(210,220,120,0.7)"/>
  <circle cx="748" cy="282" r="9" fill="rgba(170,200,100,0.55)"/>
  <circle cx="892" cy="282" r="9" fill="rgba(170,200,100,0.55)"/>
  <path d="M740 168 Q820 118 900 168" fill="none" stroke="rgba(190,210,110,0.4)" stroke-width="2"/>
  <path d="M748 282 Q820 328 892 282" fill="none" stroke="rgba(160,190,90,0.35)" stroke-width="2"/>
  <path d="M740 168 L748 282" fill="none" stroke="rgba(150,180,80,0.25)" stroke-width="1.5"/>
  <path d="M900 168 L892 282" fill="none" stroke="rgba(150,180,80,0.25)" stroke-width="1.5"/>
  <text x="80" y="92" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#b8c86a" letter-spacing="4">PESQUISA · LABORATÓRIO</text>
  <text x="80" y="200" font-family="Georgia, Times New Roman, serif" font-size="46" font-weight="700" fill="#f4f7e4">Fitocanabinoides</text>
  <text x="80" y="270" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="rgba(220,230,190,0.95)">Catálogo da CBGA ao CBN</text>
  <text x="80" y="360" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c4d48a">Ácidos · neutros · THCA · CBD · CBG · varins</text>
  <text x="80" y="520" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#a8c090">literacia química, sem bula</text>
  <text x="80" y="568" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#789070">XIV Aula 10 · quimiotipos · endocanabinoidoma</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
