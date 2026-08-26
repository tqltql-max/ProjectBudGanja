'use strict';

/**
 * Capa 1200×630 — Principia (Lojas / marca).
 */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/principia-marca-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f4f1ea"/>
      <stop offset="48%" stop-color="#e8efe8"/>
      <stop offset="100%" stop-color="#dce6e0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="72" y="72" width="1056" height="486" fill="none" stroke="#1a3d32" stroke-width="2" opacity="0.35"/>
  <text x="600" y="150" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#1a3d32" letter-spacing="4">LOJAS · DERMOCOSMÉTICO · CLAIM</text>
  <text x="600" y="280" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#12241e">Principia</text>
  <text x="600" y="350" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#2a4a40">rótulo com concentração · não é receita</text>
  <text x="600" y="460" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#1a3d32">«mais recomendada» = claim a auditar</text>
  <text x="600" y="520" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#3d6b5c">Memed 2ª prescrita no recorte · ANVISA · faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
