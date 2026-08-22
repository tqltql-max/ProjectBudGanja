'use strict';

/** Capa 1200×630 — afinador (objecto de cordas de violão). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/afinador-objeto-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#12180e"/>
      <stop offset="48%" stop-color="#1a2214"/>
      <stop offset="100%" stop-color="#0a0c08"/>
    </linearGradient>
    <radialGradient id="glow" cx="36%" cy="40%" r="44%">
      <stop offset="0%" stop-color="rgba(80,200,120,0.30)"/>
      <stop offset="100%" stop-color="rgba(80,200,120,0)"/>
    </radialGradient>
    <radialGradient id="glow2" cx="72%" cy="38%" r="36%">
      <stop offset="0%" stop-color="rgba(226,193,90,0.22)"/>
      <stop offset="100%" stop-color="rgba(226,193,90,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="400" cy="270" r="240" fill="url(#glow)"/>
  <circle cx="860" cy="240" r="190" fill="url(#glow2)"/>
  <rect x="318" y="268" width="164" height="92" rx="14" fill="#1c2418" stroke="#6ee08a" stroke-width="3"/>
  <rect x="336" y="284" width="128" height="44" rx="6" fill="#0e1610" stroke="#3a8a52" stroke-width="1.5"/>
  <polygon points="400,292 412,316 388,316" fill="#6ee08a"/>
  <text x="400" y="348" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="700" fill="#8ef0a8">E</text>
  <path d="M370 360 L370 392 L430 392 L430 360" fill="none" stroke="#c9a227" stroke-width="5" stroke-linejoin="round"/>
  <line x1="378" y1="392" x2="378" y2="430" stroke="#d4c48a" stroke-width="2"/>
  <line x1="392" y1="392" x2="392" y2="438" stroke="#d4c48a" stroke-width="2"/>
  <line x1="408" y1="392" x2="408" y2="438" stroke="#d4c48a" stroke-width="2"/>
  <line x1="422" y1="392" x2="422" y2="430" stroke="#d4c48a" stroke-width="2"/>
  <circle cx="820" cy="300" r="52" fill="none" stroke="#e8c547" stroke-width="4"/>
  <line x1="820" y1="248" x2="820" y2="228" stroke="#e8c547" stroke-width="5"/>
  <line x1="804" y1="228" x2="836" y2="228" stroke="#e8c547" stroke-width="5"/>
  <text x="600" y="82" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#6ee08a" letter-spacing="3.2">OBJECTO · CORDAS · TOM</text>
  <text x="600" y="200" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#f4ead0">afinador</text>
  <text x="600" y="268" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(110,224,138,0.95)">clip · diapasão · app — lê a corda</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#dfc262">a tarraxa escreve o tónos</text>
  <text x="600" y="558" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#6ee08a">muleta, não dono · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
