'use strict';

/**
 * Gera capa do card da inspeção JAMA / Albaugh et al. (1200×630 JPEG).
 * Uso: node scripts/generate-jama-cover.js
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
  const outPath = path.join(outDir, 'jama-albaugh-cover.jpg');

  const base = await sharp(heroPath)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: 0.55, saturation: 0.85 })
    .toBuffer();

  const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(8,10,9,0.25)"/>
      <stop offset="50%" stop-color="rgba(8,10,9,0.55)"/>
      <stop offset="100%" stop-color="rgba(8,10,9,0.82)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <rect x="80" y="170" width="8" height="280" fill="#d4af37"/>
  <text x="120" y="230" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700" fill="#d4af37" letter-spacing="6">JAMA PSYCHIATRY · 2021</text>
  <text x="120" y="310" font-family="Segoe UI, Arial, sans-serif" font-size="48" font-weight="800" fill="#fff8e0">Cannabis e neurodesenvolvimento</text>
  <text x="120" y="370" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="#d7d7d7">Albaugh et al. · IMAGEN · inspeção BudGanja</text>
  <text x="120" y="440" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#b8b8b8">Artigo científico · adolescência · córtex pré-frontal</text>
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
