'use strict';

/**
 * Capa 1200×630 da inspeção Di Forti et al. (Lancet Psychiatry 2019).
 * Uso: node scripts/generate-artigo-diforti-cover.js
 */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

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

  const base = await sharp(heroPath)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: 0.5, saturation: 0.8 })
    .toBuffer();

  const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(8,10,9,0.3)"/>
      <stop offset="55%" stop-color="rgba(8,10,9,0.62)"/>
      <stop offset="100%" stop-color="rgba(8,10,9,0.88)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <rect x="80" y="160" width="8" height="300" fill="#d4af37"/>
  <text x="120" y="220" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#d4af37" letter-spacing="4">${escapeXml('LANCET PSYCHIATRY · 2019')}</text>
  <text x="120" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="800" fill="#fff8e0">${escapeXml('Cannabis de alta potência')}</text>
  <text x="120" y="354" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="800" fill="#fff8e0">${escapeXml('e primeiro episódio')}</text>
  <text x="120" y="420" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#d7d7d7">${escapeXml('Di Forti et al. · EU-GEI · inspeção BudGanja')}</text>
  <text x="120" y="470" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#b8b8b8">${escapeXml('Artigo · caso-controlo · associação ≠ destino · SAMU 192')}</text>
</svg>`);

  const outPath = path.join(outDir, 'lancet-diforti-cover.jpg');
  await sharp(base)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:2:0' })
    .toFile(outPath);
  console.log('OK:', path.relative(ROOT, outPath), '(' + Math.round(fs.statSync(outPath).size / 1024) + ' KB)');
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
