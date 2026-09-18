'use strict';

/** Capa 1200×630 — planta soja (*Glycine max*). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/plantas/soja-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#142018"/>
      <stop offset="45%" stop-color="#2a4a22"/>
      <stop offset="100%" stop-color="#1a2810"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="42%" r="38%">
      <stop offset="0%" stop-color="rgba(210,190,70,0.28)"/>
      <stop offset="100%" stop-color="rgba(210,190,70,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <ellipse cx="860" cy="340" rx="28" ry="18" fill="rgba(196,214,90,0.55)" stroke="rgba(232,220,140,0.5)" stroke-width="2"/>
  <ellipse cx="900" cy="328" rx="26" ry="16" fill="rgba(176,200,70,0.5)" stroke="rgba(232,220,140,0.4)" stroke-width="2"/>
  <ellipse cx="938" cy="348" rx="24" ry="15" fill="rgba(160,186,64,0.48)" stroke="rgba(232,220,140,0.35)" stroke-width="2"/>
  <path d="M890 365 L890 500" fill="none" stroke="rgba(140,180,90,0.55)" stroke-width="7" stroke-linecap="round"/>
  <path d="M820 430 Q890 390 960 430" fill="none" stroke="rgba(120,170,80,0.35)" stroke-width="5"/>
  <ellipse cx="890" cy="520" rx="70" ry="16" fill="rgba(60,90,40,0.4)"/>
  <text x="600" y="148" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#c8dd9a" letter-spacing="7">PLANTA · GLYCINE MAX</text>
  <text x="600" y="290" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="78" font-weight="700" fill="#f4fff0">soja</text>
  <text x="600" y="370" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d8e8c8">feijão · isolado · glúten · farinha branca · risco</text>
  <text x="600" y="430" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#b8c8a8">como os ricos transformam as coisas</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
