'use strict';

/** Capa 1200×630 — curar (Palavras): cūra · tratar × secar. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/curar-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1410"/>
      <stop offset="48%" stop-color="#142018"/>
      <stop offset="100%" stop-color="#0a100c"/>
    </linearGradient>
    <radialGradient id="glow" cx="36%" cy="44%" r="48%">
      <stop offset="0%" stop-color="rgba(120,180,110,0.28)"/>
      <stop offset="100%" stop-color="rgba(120,180,110,0)"/>
    </radialGradient>
    <radialGradient id="glow2" cx="72%" cy="38%" r="36%">
      <stop offset="0%" stop-color="rgba(226,193,90,0.22)"/>
      <stop offset="100%" stop-color="rgba(226,193,90,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="400" cy="290" r="250" fill="url(#glow)"/>
  <circle cx="860" cy="230" r="190" fill="url(#glow2)"/>
  <!-- hanging harvest (cure / dry) -->
  <line x1="318" y1="168" x2="318" y2="248" stroke="rgba(210,190,140,0.7)" stroke-width="2"/>
  <ellipse cx="318" cy="278" rx="28" ry="42" fill="none" stroke="rgba(160,200,130,0.85)" stroke-width="3"/>
  <line x1="368" y1="158" x2="368" y2="238" stroke="rgba(210,190,140,0.55)" stroke-width="2"/>
  <ellipse cx="368" cy="268" rx="24" ry="38" fill="none" stroke="rgba(226,193,90,0.7)" stroke-width="2.5"/>
  <!-- leaf / care -->
  <path d="M820 200 c40 -48 96 -42 118 8 c18 42 -8 86 -52 108 c-28 14 -58 8 -78 -18 c-22 -28 -18 -62 12 -98z" fill="none" stroke="rgba(170,210,140,0.9)" stroke-width="3"/>
  <path d="M848 228 c22 18 40 48 46 78" fill="none" stroke="rgba(226,193,90,0.55)" stroke-width="2"/>
  <text x="600" y="84" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#dfc262" letter-spacing="4">PALAVRAS · CŪRA · OFÍCIO</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="76" font-weight="700" fill="#f4efe6">curar</text>
  <text x="600" y="332" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(200,184,160,0.95)">tratar · secar a colheita · ≠ milagre</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#d4c48a">curar a planta  ·  a planta cura</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#8ec4a0">cuidar ≠ curar · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
