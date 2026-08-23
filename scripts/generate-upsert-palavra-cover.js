'use strict';

/** Capa 1200×630 — opsert / upsert (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/upsert-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a1218"/>
      <stop offset="48%" stop-color="#102018"/>
      <stop offset="100%" stop-color="#070c0e"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="36%" r="46%">
      <stop offset="0%" stop-color="rgba(70,190,170,0.28)"/>
      <stop offset="100%" stop-color="rgba(70,190,170,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="220" rx="380" ry="200" fill="url(#glow)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#7ecfc0" letter-spacing="3">PALAVRAS · UPDATE ∪ INSERT</text>
  <text x="600" y="228" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="78" font-weight="700" fill="#e8faf4">opsert</text>
  <text x="600" y="292" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#b8e0d4">mãos à obra  ·  levante e insira</text>
  <text x="600" y="360" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(200,230,220,0.85)">upsert · boca BR</text>
  <text x="600" y="470" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="rgba(200,230,220,0.95)">MERGE ≠ replace  ·  ≠ commitar</text>
  <text x="600" y="530" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#98d4c8">chave visível · merge inspeccionável</text>
  <text x="600" y="586" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#7ecfc0">Opsert.</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
