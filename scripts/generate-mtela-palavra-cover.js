'use strict';

/** Capa 1200×630 — Palavras · mtela (em tela × papelão ≠ tele). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/mtela-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a140c"/>
      <stop offset="48%" stop-color="#12181c"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
    <linearGradient id="cardboard" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#c4a35a"/>
      <stop offset="100%" stop-color="#8a6a32"/>
    </linearGradient>
    <pattern id="corrugated" width="14" height="18" patternUnits="userSpaceOnUse">
      <path d="M0 9 Q3.5 2 7 9 T14 9" fill="none" stroke="#6e5228" stroke-width="1.6"/>
    </pattern>
    <pattern id="weave" width="12" height="12" patternUnits="userSpaceOnUse">
      <path d="M0 6 H12 M6 0 V12" stroke="rgba(232,220,196,0.35)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="8" fill="#c4a35a"/>
  <rect x="72" y="168" width="210" height="268" rx="6" fill="#2a241c" stroke="rgba(232,220,196,0.55)" stroke-width="4"/>
  <rect x="92" y="188" width="170" height="228" fill="#1c1814"/>
  <rect x="92" y="188" width="170" height="228" fill="url(#weave)"/>
  <line x1="92" y1="456" x2="78" y2="500" stroke="#c4a35a" stroke-width="4" stroke-linecap="round"/>
  <line x1="262" y1="456" x2="276" y2="500" stroke="#c4a35a" stroke-width="4" stroke-linecap="round"/>
  <rect x="918" y="178" width="196" height="248" rx="4" fill="url(#cardboard)"/>
  <rect x="918" y="178" width="196" height="248" rx="4" fill="url(#corrugated)" opacity="0.55"/>
  <rect x="938" y="204" width="156" height="104" fill="#1a120c" stroke="#3a2a18" stroke-width="3"/>
  <rect x="968" y="328" width="96" height="14" rx="3" fill="#6e5228"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c4a35a" letter-spacing="4">PALAVRAS · MTELA · EM TELA × PAPELÃO</text>
  <text x="600" y="318" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="86" font-weight="700" fill="#f4efe6">mtela</text>
  <text x="600" y="382" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="24" fill="#8eb4c8">em tela · lat. tēla · ≠ tele</text>
  <text x="600" y="520" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#d8c8a0">pano que mostra · cartão que faz de ecrã</text>
  <text x="600" y="568" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#c4a35a">relação de ofício · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
