'use strict';

/** Capas 1200×630 — colchão e conexão. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function one(name, svg) {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes', name);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

async function main() {
  await one(
    'colchao-palavra-cover.jpg',
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#10141c"/>
      <stop offset="100%" stop-color="#0a0c12"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="40%">
      <stop offset="0%" stop-color="rgba(140,170,210,0.22)"/>
      <stop offset="100%" stop-color="rgba(10,12,18,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="260" rx="320" ry="180" fill="url(#glow)"/>
  <rect x="340" y="220" width="520" height="160" rx="28" fill="none" stroke="rgba(200,210,230,0.8)" stroke-width="8"/>
  <rect x="360" y="238" width="480" height="124" rx="18" fill="rgba(180,200,220,0.12)"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#a8c0d8" letter-spacing="5">PALAVRAS · AÇÃO DE DORMIR</text>
  <text x="600" y="460" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f4efe6">colchão</text>
  <text x="600" y="515" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c8b8a0">culcita · ≠ cola + chão · Valeu !!!</text>
</svg>`
  );

  await one(
    'conexao-palavra-cover.jpg',
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1412"/>
      <stop offset="100%" stop-color="#0a1014"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="430" cy="280" r="54" fill="none" stroke="rgba(223,194,98,0.75)" stroke-width="6"/>
  <circle cx="770" cy="280" r="54" fill="none" stroke="rgba(160,200,180,0.75)" stroke-width="6"/>
  <line x1="484" y1="280" x2="716" y2="280" stroke="rgba(223,194,98,0.7)" stroke-width="6"/>
  <text x="600" y="292" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="40" font-weight="700" fill="#dfc262">x</text>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#dfc262" letter-spacing="5">PALAVRAS · CONECTAR + AÇÃO</text>
  <text x="600" y="460" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f4efe6">conexão</text>
  <text x="600" y="515" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#c8b8a0">com x · não conecção · Valeu !!!</text>
</svg>`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
