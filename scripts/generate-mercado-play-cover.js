'use strict';

/**
 * Capa 1200×630 — Mercado Play (Lojas / streaming · TV grátis).
 */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/mercado-play-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d1524"/>
      <stop offset="48%" stop-color="#152238"/>
      <stop offset="100%" stop-color="#1a2a18"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="18" fill="#ffe600"/>
  <rect x="0" y="612" width="1200" height="18" fill="#3483fa"/>
  <rect x="88" y="72" width="1024" height="486" fill="none" stroke="#ffe600" stroke-width="2" opacity="0.45"/>
  <text x="600" y="150" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#ffe600" letter-spacing="5">LOJAS · STREAMING · TV GRÁTIS</text>
  <text x="600" y="290" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f4ead8">Mercado Play</text>
  <text x="600" y="360" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#cdd8ee">filmes legais com anúncios · não é domínio público</text>
  <text x="600" y="470" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#ffe600">indicação datada · só no player oficial</text>
  <text x="600" y="530" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#a8b4c8">play.mercadolivre.com.br · faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
