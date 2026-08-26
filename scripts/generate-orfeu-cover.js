'use strict';

/** Capa 1200×630 — Orfeu (Palavras · nome · lira · ≠ Morpheus). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/orfeu-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1408"/>
      <stop offset="48%" stop-color="#241c10"/>
      <stop offset="100%" stop-color="#061410"/>
    </linearGradient>
    <radialGradient id="gold" cx="38%" cy="40%" r="46%">
      <stop offset="0%" stop-color="rgba(255,210,110,0.38)"/>
      <stop offset="55%" stop-color="rgba(180,140,50,0.10)"/>
      <stop offset="100%" stop-color="rgba(255,210,110,0)"/>
    </radialGradient>
    <radialGradient id="code" cx="78%" cy="58%" r="42%">
      <stop offset="0%" stop-color="rgba(40,220,140,0.22)"/>
      <stop offset="100%" stop-color="rgba(40,220,140,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="430" cy="240" r="260" fill="url(#gold)"/>
  <circle cx="920" cy="380" r="240" fill="url(#code)"/>
  <text x="600" y="82" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#e8d8a8" letter-spacing="3.2">PALAVRAS · NOME · ≠ MORPHEUS</text>
  <text x="600" y="248" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="88" font-weight="700" fill="#fff4d6">ORFEU</text>
  <text x="600" y="312" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(240,230,200,0.92)">lira e Eurídice · ouvido cola no Matrix</text>
  <!-- lira simples -->
  <g transform="translate(320,430)" fill="none" stroke="#e8d090" stroke-width="3">
    <path d="M0,70 C0,10 28,-8 52,18 C76,-8 104,10 104,70"/>
    <line x1="18" y1="28" x2="18" y2="78" stroke="#f4e4b0" stroke-width="1.6"/>
    <line x1="36" y1="22" x2="36" y2="78" stroke="#f4e4b0" stroke-width="1.6"/>
    <line x1="52" y1="18" x2="52" y2="78" stroke="#f4e4b0" stroke-width="1.6"/>
    <line x1="68" y1="22" x2="68" y2="78" stroke="#f4e4b0" stroke-width="1.6"/>
    <line x1="86" y1="28" x2="86" y2="78" stroke="#f4e4b0" stroke-width="1.6"/>
    <line x1="0" y1="70" x2="104" y2="70"/>
  </g>
  <!-- pílula (contraste, não conselho) -->
  <g transform="translate(860,430)">
    <rect x="0" y="18" rx="16" ry="16" width="86" height="32" fill="#c42a3a" opacity="0.9"/>
    <rect x="43" y="18" rx="16" ry="16" width="43" height="32" fill="#3aa0e0" opacity="0.85"/>
  </g>
  <text x="600" y="560" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#d8c090">primo do ouvido, não do étimo</text>
  <text x="600" y="598" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#8fd4b0">faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
