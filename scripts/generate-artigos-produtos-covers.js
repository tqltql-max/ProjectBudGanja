'use strict';

/**
 * Capas 1200×630 para inspeções de artigos (rede Produtos nocivos).
 * Uso: node scripts/generate-artigos-produtos-covers.js
 */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

const COVERS = [
  {
    file: 'artigo-brouns-trigo-cover.jpg',
    eyebrow: 'J. CEREAL SCI. · 2013',
    title: 'O trigo engorda e adoece?',
    sub: 'Brouns, van Buul & Shewry · inspeção BudGanja',
    tag: 'Artigo · trigo · Barriga de Trigo'
  },
  {
    file: 'artigo-wieser-trigo-cover.jpg',
    eyebrow: 'FRONT. NUTR. · 2020',
    title: 'As duas faces do trigo',
    sub: 'Wieser, Koehler & Scherf · inspeção BudGanja',
    tag: 'Artigo · WRDs · glúten'
  },
  {
    file: 'artigo-hall-upf-cover.jpg',
    eyebrow: 'CELL METABOLISM · 2019',
    title: 'Dietas ultraprocessadas',
    sub: 'Hall et al. · RCT NIH · inspeção BudGanja',
    tag: 'Artigo · UPF · calorias'
  },
  {
    file: 'artigo-brooke-taylor-caseina-cover.jpg',
    eyebrow: 'ADV. NUTR. · 2017',
    title: 'Caseína A1 vs A2',
    sub: 'Brooke-Taylor et al. · inspeção BudGanja',
    tag: 'Artigo · leite · BCM-7'
  },
  {
    file: 'artigo-oms-acucares-cover.jpg',
    eyebrow: 'WHO GUIDELINE · 2015',
    title: 'Açúcares livres',
    sub: 'Diretriz OMS · inspeção BudGanja',
    tag: 'Norma · açúcar · saúde pública'
  }
];

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
    .modulate({ brightness: 0.55, saturation: 0.85 })
    .toBuffer();

  for (const c of COVERS) {
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
  <text x="120" y="230" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#d4af37" letter-spacing="4">${escapeXml(c.eyebrow)}</text>
  <text x="120" y="310" font-family="Segoe UI, Arial, sans-serif" font-size="44" font-weight="800" fill="#fff8e0">${escapeXml(c.title)}</text>
  <text x="120" y="370" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="#d7d7d7">${escapeXml(c.sub)}</text>
  <text x="120" y="440" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#b8b8b8">${escapeXml(c.tag)}</text>
</svg>`);

    const outPath = path.join(outDir, c.file);
    await sharp(base)
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:2:0' })
      .toFile(outPath);
    console.log('OK:', path.relative(ROOT, outPath), '(' + Math.round(fs.statSync(outPath).size / 1024) + ' KB)');
  }
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
