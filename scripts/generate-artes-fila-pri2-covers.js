'use strict';

/** Capas 1200×630 para artes prioridade 2. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { ARTES_FILA_PRI2_META } = require('../lib/artes-fila-pri2-inspecoes-posts.js');

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function main() {
  const sharp = require('sharp');
  const heroPath = path.join(ROOT, 'imagens', 'background-hero.png');
  fs.mkdirSync(path.join(ROOT, 'imagens', 'inspecoes'), { recursive: true });

  for (const meta of ARTES_FILA_PRI2_META) {
    const slugTail = String(meta.slug).replace(/^inspecao-arte-/, '');
    const outPath = path.join(ROOT, 'imagens', 'inspecoes', slugTail + '-cover.jpg');
    const base = await sharp(heroPath)
      .rotate()
      .resize(1200, 630, { fit: 'cover', position: 'attention' })
      .modulate({ brightness: 0.55, saturation: 0.9 })
      .toBuffer();
    const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(8,14,10,0.3)"/>
      <stop offset="100%" stop-color="rgba(8,14,10,0.92)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <text x="600" y="190" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#8fbc8f" letter-spacing="8">ARTES · LIVRO PRIMEIRO</text>
  <text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="44" font-weight="700" fill="#e8ffe8">${escapeXml(meta.coverTitle)}</text>
  <text x="600" y="370" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0e0d0">${escapeXml(meta.coverSub)}</text>
</svg>`);
    await sharp(base)
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(outPath);
    console.log('OK', path.relative(ROOT, outPath));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
