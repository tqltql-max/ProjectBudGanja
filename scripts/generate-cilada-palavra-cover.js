'use strict';

/** Capa 1200×630 — Cilada (Palavras). Celada cobre o rosto; cilada cobre a intenção. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/cilada-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c100c"/>
      <stop offset="50%" stop-color="#16120c"/>
      <stop offset="100%" stop-color="#0a0e12"/>
    </linearGradient>
    <radialGradient id="bait" cx="50%" cy="44%" r="38%">
      <stop offset="0%" stop-color="rgba(201,162,39,0.32)"/>
      <stop offset="55%" stop-color="rgba(120,80,40,0.12)"/>
      <stop offset="100%" stop-color="rgba(12,16,12,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="270" rx="340" ry="170" fill="url(#bait)"/>
  <ellipse cx="600" cy="278" rx="280" ry="118" fill="none" stroke="rgba(201,162,39,0.35)" stroke-width="2" stroke-dasharray="8 10"/>
  <ellipse cx="600" cy="278" rx="210" ry="78" fill="none" stroke="rgba(201,162,39,0.22)" stroke-width="1.5" stroke-dasharray="4 8"/>
  <rect x="96" y="168" width="248" height="92" rx="10" fill="none" stroke="rgba(180,190,200,0.4)" stroke-width="2"/>
  <rect x="856" y="168" width="248" height="92" rx="10" fill="none" stroke="rgba(201,162,39,0.5)" stroke-width="2"/>
  <rect x="96" y="292" width="248" height="92" rx="10" fill="none" stroke="rgba(160,140,110,0.4)" stroke-width="2"/>
  <rect x="856" y="292" width="248" height="92" rx="10" fill="none" stroke="rgba(140,170,150,0.45)" stroke-width="2"/>
  <text x="220" y="206" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" fill="rgba(200,210,220,0.95)">A · tocaia</text>
  <text x="220" y="232" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="17" fill="rgba(230,230,235,0.88)">espera escondida</text>
  <text x="980" y="206" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" fill="rgba(220,190,110,0.95)">B · ardil</text>
  <text x="980" y="232" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="17" fill="rgba(240,220,170,0.9)">foi uma cilada</text>
  <text x="220" y="330" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" fill="rgba(200,180,140,0.95)">C · situação</text>
  <text x="220" y="356" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="17" fill="rgba(230,215,180,0.88)">o isco sem vilão</text>
  <text x="980" y="330" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" fill="rgba(160,200,170,0.95)">D · ofício</text>
  <text x="980" y="356" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="17" fill="rgba(200,225,205,0.9)">anti-armadilha</text>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#c9a227" letter-spacing="4">PALAVRAS · CĒLĀTA · CĒLĀRE</text>
  <text x="600" y="250" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="36" fill="rgba(230,210,160,0.88)">cēlāta</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f4efe4">Cilada</text>
  <text x="600" y="486" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(230,214,180,0.95)">o que se esconde para apanhar</text>
  <text x="600" y="576" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(190,180,150,0.9)">≠ celada · ≠ desastre · ≠ risco · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
