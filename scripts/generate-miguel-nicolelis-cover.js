'use strict';

/**
 * Capa 1200×630 — Homenagem Miguel Nicolelis (Neurociências Cap. 2).
 * Estilo retrato/homenagem: foto real (Roda Viva, 2008, CC BY-SA 2.0) + véu + texto.
 */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const portraitPath = path.join(ROOT, 'imagens', 'inspecoes', 'miguel-nicolelis-portrait.jpg');
  if (!fs.existsSync(portraitPath)) {
    throw new Error('Retrato em falta: imagens/inspecoes/miguel-nicolelis-portrait.jpg');
  }
  const outPath = path.join(ROOT, 'imagens', 'inspecoes', 'miguel-nicolelis-neurociencia-cover.jpg');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const base = await sharp(portraitPath)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'right' })
    .modulate({ brightness: 0.72, saturation: 0.82 })
    .toBuffer();

  const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(8,12,18,0.96)"/>
      <stop offset="42%" stop-color="rgba(8,12,18,0.82)"/>
      <stop offset="68%" stop-color="rgba(8,12,18,0.35)"/>
      <stop offset="100%" stop-color="rgba(8,12,18,0.05)"/>
    </linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(8,12,18,0)"/>
      <stop offset="100%" stop-color="rgba(8,12,18,0.55)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <rect width="1200" height="630" fill="url(#floor)"/>
  <rect x="0" y="0" width="1200" height="6" fill="#8ec8d8"/>
  <text x="80" y="150" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#8ec8d8" letter-spacing="5">NEUROCIÊNCIAS · CAP. 2 · HOMENAGEM</text>
  <text x="80" y="230" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f4f8fa">Miguel Nicolelis</text>
  <text x="80" y="280" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#dbe8ee">interfaces cérebro-máquina · Andar de Novo</text>
  <text x="80" y="360" font-family="Segoe UI, Arial, sans-serif" font-size="19" fill="#aecbd6">USP → Duke · pontapé da Copa 2014</text>
  <text x="80" y="560" font-family="Georgia, Times New Roman, serif" font-size="21" fill="#9fc4d0">faça o melhor ao registrar sinal — mérito e limites</text>
</svg>`);

  await sharp(base)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:2:0' })
    .toFile(outPath);

  console.log('OK', path.relative(ROOT, outPath), Math.round(fs.statSync(outPath).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
