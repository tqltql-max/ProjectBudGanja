'use strict';

/** Capa 1200×630 — guia receitas de plantas. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/receitas-plantas-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#12180e"/>
      <stop offset="50%" stop-color="#1e2818"/>
      <stop offset="100%" stop-color="#0e1410"/>
    </linearGradient>
    <radialGradient id="glow" cx="48%" cy="50%" r="45%">
      <stop offset="0%" stop-color="rgba(160,200,100,0.25)"/>
      <stop offset="55%" stop-color="rgba(100,140,70,0.12)"/>
      <stop offset="100%" stop-color="rgba(30,40,20,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="580" cy="320" rx="300" ry="200" fill="url(#glow)"/>
  <ellipse cx="520" cy="400" rx="50" ry="18" fill="none" stroke="rgba(200,180,120,0.45)" stroke-width="3"/>
  <ellipse cx="640" cy="410" rx="50" ry="18" fill="none" stroke="rgba(180,200,120,0.4)" stroke-width="3"/>
  <ellipse cx="760" cy="400" rx="50" ry="18" fill="none" stroke="rgba(200,160,100,0.4)" stroke-width="3"/>
  <path d="M400 360 Q420 280 450 360" fill="none" stroke="rgba(140,180,90,0.5)" stroke-width="3"/>
  <path d="M470 370 Q495 290 520 370" fill="none" stroke="rgba(160,200,100,0.45)" stroke-width="3"/>
  <circle cx="420" cy="270" r="8" fill="rgba(220,200,100,0.55)"/>
  <circle cx="500" cy="260" r="7" fill="rgba(180,220,120,0.5)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#b8d080" letter-spacing="4">GUIA · RECEITAS · LOTE 1</text>
  <text x="600" y="230" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#f0ffe0">receitas de plantas</text>
  <text x="600" y="300" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(220,240,190,0.95)">8 tisanas · medida · aviso · catálogo</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#c8d0a0">faça o melhor nesta receita</text>
  <text x="600" y="570" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#a8c878">chá · plantas · ofício</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
