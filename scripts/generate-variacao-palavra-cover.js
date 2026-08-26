'use strict';

/** Capa 1200×630 — variação (Palavras · varius × é nois × Legal !!!). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/variacao-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#12100c"/>
      <stop offset="50%" stop-color="#1a1610"/>
      <stop offset="100%" stop-color="#0c1412"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="44%">
      <stop offset="0%" stop-color="rgba(201,162,39,0.28)"/>
      <stop offset="60%" stop-color="rgba(124,179,66,0.10)"/>
      <stop offset="100%" stop-color="rgba(18,16,12,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="380" ry="170" fill="url(#glow)"/>
  <rect x="70" y="150" width="280" height="88" rx="12" fill="none" stroke="rgba(232,210,140,0.45)" stroke-width="2"/>
  <rect x="460" y="118" width="280" height="88" rx="12" fill="none" stroke="rgba(124,179,66,0.5)" stroke-width="2"/>
  <rect x="850" y="150" width="280" height="88" rx="12" fill="none" stroke="rgba(232,210,140,0.45)" stroke-width="2"/>
  <text x="210" y="204" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="rgba(232,210,140,0.92)">VRAICAO</text>
  <text x="600" y="172" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="rgba(180,220,160,0.95)">VARIACAO</text>
  <text x="990" y="204" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="rgba(232,210,140,0.92)">VAIRACAO</text>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c9a227" letter-spacing="4">PALAVRAS · VARIUS · E NOIS</text>
  <text x="600" y="360" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#f4efe4">variacao</text>
  <text x="600" y="428" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="28" fill="rgba(232,210,140,0.95)">e nois · Legal !!!</text>
  <text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(200,190,160,0.92)">tres bocas · a mesma peca · bacana, nao a lei</text>
  <text x="600" y="568" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(190,180,150,0.9)">≠ vibracao · ≠ oracao · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
