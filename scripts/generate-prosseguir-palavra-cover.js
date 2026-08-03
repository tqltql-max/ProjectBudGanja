'use strict';

/** Capa 1200×630 — prosseguir (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/prosseguir-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a1410"/>
      <stop offset="50%" stop-color="#162820"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
    <radialGradient id="glow" cx="65%" cy="50%" r="48%">
      <stop offset="0%" stop-color="rgba(120,210,160,0.32)"/>
      <stop offset="55%" stop-color="rgba(70,140,100,0.12)"/>
      <stop offset="100%" stop-color="rgba(20,40,30,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="780" cy="310" rx="300" ry="200" fill="url(#glow)"/>
  <path d="M280 360 L520 360 L520 300 L780 360 L520 420 L520 360" fill="rgba(160,230,180,0.55)"/>
  <text x="600" y="90" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#8fd4a8" letter-spacing="4">PALAVRAS · CONTINUAR · RETOMAR</text>
  <text x="600" y="210" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#eefaf0">prosseguir</text>
  <text x="600" y="290" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(200,235,210,0.95)">prōsequī · prosseguimento · próximo passo</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#a8d8b8">faça o melhor e prossiga</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#8fd4a8">sempre · já · caminho · gesto</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
