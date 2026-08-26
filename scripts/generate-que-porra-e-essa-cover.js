'use strict';

/** Capa 1200×630 — que porra é essa !!!? (relação porrada de boxe; lapso boxi). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/que-porra-e-essa-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a100c"/>
      <stop offset="48%" stop-color="#241410"/>
      <stop offset="100%" stop-color="#0c0806"/>
    </linearGradient>
    <radialGradient id="glow" cx="58%" cy="42%" r="48%">
      <stop offset="0%" stop-color="rgba(200,80,56,0.28)"/>
      <stop offset="100%" stop-color="rgba(20,10,8,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="700" cy="250" rx="300" ry="160" fill="url(#glow)"/>
  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" fill="#e09070" letter-spacing="2.8">EXPRESSÕES · VÁLVULA INTERROGATIVA · ≠ PORRADA ≠ FIGHT</text>
  <text x="600" y="248" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#fff4ea">que porra é essa !!!?</text>
  <text x="600" y="330" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(240,200,160,0.95)">a pergunta · não o soco</text>
  <text x="600" y="488" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#d8b090">porrada de boxe = família + desporto</text>
  <text x="600" y="542" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#e09070">boxi cai o e · Valeu !!! fica</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
