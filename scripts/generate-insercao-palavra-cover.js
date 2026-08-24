'use strict';

/** Capa 1200×630 — par inserir → inserção (-ção). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/insercao-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#10161c"/>
      <stop offset="48%" stop-color="#1a2a28"/>
      <stop offset="100%" stop-color="#0c1210"/>
    </linearGradient>
    <linearGradient id="arrow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(120,190,200,0.18)"/>
      <stop offset="100%" stop-color="rgba(180,210,140,0.55)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="120" y="248" width="280" height="88" rx="12" fill="rgba(200,220,210,0.08)" stroke="rgba(180,210,190,0.35)"/>
  <rect x="800" y="248" width="300" height="88" rx="12" fill="rgba(180,210,140,0.12)" stroke="rgba(180,210,140,0.45)"/>
  <path d="M430 292 L760 292 L730 268 L790 292 L730 316 Z" fill="url(#arrow)"/>
  <circle cx="200" cy="500" r="10" fill="rgba(140,200,210,0.45)"/>
  <circle cx="1000" cy="140" r="7" fill="rgba(200,220,150,0.4)"/>
  <path d="M180 520 Q420 470 640 500 Q860 530 1040 470" fill="none" stroke="rgba(160,200,190,0.14)" stroke-width="3"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#a8d0c8" letter-spacing="5">PALAVRAS · DERIVAÇÃO · -ÇÃO</text>
  <text x="260" y="304" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" fill="#e8f4f0">inserir</text>
  <text x="950" y="304" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="40" font-weight="700" fill="#f4faf6">inserção</text>
  <text x="600" y="400" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#c5ddd0">gesto · nome do acto · Valeu !!!</text>
  <text x="600" y="448" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(180,200,190,0.75)">inserere · ≠ inseto · ≠ upsert</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
