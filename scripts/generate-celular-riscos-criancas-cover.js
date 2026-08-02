'use strict';

/**
 * Gera capa editorial 1200×630 da inspeção Celular / riscos à saúde infantil.
 * Uso: node scripts/generate-celular-riscos-criancas-cover.js
 */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    throw new Error('sharp em falta — npm install');
  }

  const heroPath = path.join(ROOT, 'imagens', 'background-hero.png');
  if (!fs.existsSync(heroPath)) {
    throw new Error('imagens/background-hero.png em falta');
  }

  const outDir = path.join(ROOT, 'imagens', 'inspecoes');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'celular-riscos-criancas-cover.jpg');

  const base = await sharp(heroPath)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: 0.42, saturation: 0.85 })
    .toBuffer();

  const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(8,10,9,0.28)"/>
      <stop offset="45%" stop-color="rgba(8,10,9,0.62)"/>
      <stop offset="100%" stop-color="rgba(8,10,9,0.92)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <rect x="80" y="130" width="8" height="360" fill="#6b8e4e"/>
  <text x="120" y="190" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#9bc86a" letter-spacing="4">EQUIPAMENTO · SAÚDE INFANTIL</text>
  <text x="120" y="280" font-family="Segoe UI, Arial, sans-serif" font-size="52" font-weight="800" fill="#fff8e0">Celular</text>
  <text x="120" y="345" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="#d7d7d7">Os riscos para a saúde das crianças</text>
  <text x="120" y="410" font-family="Segoe UI, Arial, sans-serif" font-size="21" fill="#b8b8b8">Sociedade brasileira · debate mundial</text>
  <text x="120" y="470" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#9a9a9a">SBP · Guia federal 2025 · Lei 15.100/2025 · UNESCO</text>
</svg>`);

  await sharp(base)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:2:0' })
    .toFile(outPath);

  const size = fs.statSync(outPath).size;
  console.log('OK:', path.relative(ROOT, outPath), '(' + Math.round(size / 1024) + ' KB)');
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
