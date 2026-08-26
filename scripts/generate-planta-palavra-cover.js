'use strict';

/** Capa 1200×630 — palavra planta (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/planta-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#121c14"/>
      <stop offset="42%" stop-color="#1f3d24"/>
      <stop offset="100%" stop-color="#0a100c"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="58%" r="34%">
      <stop offset="0%" stop-color="rgba(120,190,100,0.30)"/>
      <stop offset="100%" stop-color="rgba(120,190,100,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="840" cy="360" r="210" fill="url(#glow)"/>
  <path d="M760 470 C790 320 860 280 900 360 C930 420 890 480 840 470 C800 462 770 490 760 470 Z" fill="rgba(244,255,248,0.09)" stroke="rgba(159,212,192,0.38)" stroke-width="3"/>
  <path d="M820 470 L820 540" fill="none" stroke="rgba(140,200,150,0.45)" stroke-width="6" stroke-linecap="round"/>
  <ellipse cx="820" cy="555" rx="48" ry="12" fill="rgba(90,140,80,0.35)"/>
  <path d="M220 500 Q340 220 480 500" fill="none" stroke="rgba(125,214,140,0.16)" stroke-width="10" stroke-linecap="round"/>
  <path d="M300 500 Q400 280 520 500" fill="none" stroke="rgba(125,214,140,0.10)" stroke-width="7" stroke-linecap="round"/>
  <text x="600" y="155" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#9fd4c0" letter-spacing="8">PALAVRAS · SER VIVO</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4fff8">planta</text>
  <text x="600" y="380" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0e0d8">plantare · cultivo · plantas · farmácia viva</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
