'use strict';

/**
 * Capa 1200×630 da pesquisa «Da molécula ao lixo».
 * Uso: node scripts/generate-molecula-ao-lixo-cover.js
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

  const outDir = path.join(ROOT, 'imagens', 'pesquisas');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'molecula-ao-lixo-cover.jpg');

  const base = await sharp(heroPath)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: 0.38, saturation: 0.75 })
    .toBuffer();

  const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(6,8,10,0.35)"/>
      <stop offset="50%" stop-color="rgba(6,8,10,0.72)"/>
      <stop offset="100%" stop-color="rgba(6,8,10,0.94)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <rect x="80" y="120" width="8" height="380" fill="#c4a35a"/>
  <text x="120" y="180" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#c4a35a" letter-spacing="4">PESQUISA · LABORATÓRIO</text>
  <text x="120" y="270" font-family="Segoe UI, Arial, sans-serif" font-size="48" font-weight="800" fill="#fff8e0">Da molécula ao lixo</text>
  <text x="120" y="340" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#d7d7d7">Fármacos, industrialização e desigualdade</text>
  <text x="120" y="410" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#b8b8b8">Extrair → fabricar → vender → descartar</text>
  <text x="120" y="470" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#9a9a9a">Resíduos · exagero · plantas · animais · pessoas</text>
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
