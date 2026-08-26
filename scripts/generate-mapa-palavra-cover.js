'use strict';

/** Capa 1200×630 — palavra mapa (Palavras): mappa × manus. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/mapa-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#10140c"/>
      <stop offset="48%" stop-color="#1a1812"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
    <radialGradient id="glowMap" cx="32%" cy="42%" r="42%">
      <stop offset="0%" stop-color="rgba(90,140,110,0.28)"/>
      <stop offset="100%" stop-color="rgba(90,140,110,0)"/>
    </radialGradient>
    <radialGradient id="glowHand" cx="70%" cy="44%" r="40%">
      <stop offset="0%" stop-color="rgba(223,194,98,0.24)"/>
      <stop offset="100%" stop-color="rgba(223,194,98,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="360" cy="268" r="230" fill="url(#glowMap)"/>
  <circle cx="840" cy="270" r="210" fill="url(#glowHand)"/>

  <!-- folded cloth-map -->
  <rect x="210" y="168" width="300" height="210" rx="8" fill="rgba(38,52,40,0.92)" stroke="rgba(160,190,150,0.7)" stroke-width="3"/>
  <line x1="210" y1="238" x2="510" y2="238" stroke="rgba(180,200,160,0.28)" stroke-width="1.5"/>
  <line x1="210" y1="308" x2="510" y2="308" stroke="rgba(180,200,160,0.28)" stroke-width="1.5"/>
  <line x1="310" y1="168" x2="310" y2="378" stroke="rgba(180,200,160,0.28)" stroke-width="1.5"/>
  <line x1="410" y1="168" x2="410" y2="378" stroke="rgba(180,200,160,0.28)" stroke-width="1.5"/>
  <path d="M240 250 C280 210, 340 220, 380 248 C420 276, 460 250, 490 268" fill="none" stroke="rgba(210,190,120,0.85)" stroke-width="3"/>
  <line x1="268" y1="220" x2="448" y2="300" stroke="rgba(200,170,90,0.55)" stroke-width="2.5"/>
  <line x1="300" y1="300" x2="430" y2="210" stroke="rgba(200,170,90,0.55)" stroke-width="2.5"/>
  <circle cx="360" cy="255" r="6" fill="rgba(223,194,98,0.95)"/>
  <text x="360" y="358" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="rgba(220,210,180,0.9)">mappa</text>

  <!-- palm -->
  <ellipse cx="840" cy="268" rx="108" ry="132" fill="rgba(48,42,30,0.92)" stroke="rgba(223,194,98,0.75)" stroke-width="4"/>
  <text x="840" y="286" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="72" fill="rgba(223,194,98,0.88)">✋</text>
  <text x="840" y="412" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="rgba(220,210,180,0.9)">manus</text>

  <line x1="530" y1="268" x2="710" y2="268" stroke="rgba(200,184,160,0.4)" stroke-width="3" stroke-dasharray="8 10"/>
  <text x="620" y="258" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c8b8a0">×</text>

  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8c090" letter-spacing="5">PALAVRAS · MAPPA · × MANUS</text>
  <text x="600" y="488" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="76" font-weight="700" fill="#f4f0e4">mapa</text>
  <text x="600" y="542" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,210,180,0.95)">MApa · Maão · o pano da viagem</text>
  <text x="600" y="580" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(190,180,150,0.85)">mappa ≠ manus ≠ strata · mapa na mão · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
