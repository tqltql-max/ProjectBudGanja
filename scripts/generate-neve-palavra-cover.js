'use strict';

/** Capa 1200×630 — Neve (Palavras). Lat. nix, nivis — cobertura, não gelo. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/neve-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a1624"/>
      <stop offset="55%" stop-color="#122030"/>
      <stop offset="100%" stop-color="#1a2838"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="42%">
      <stop offset="0%" stop-color="rgba(230,242,255,0.28)"/>
      <stop offset="55%" stop-color="rgba(140,180,220,0.10)"/>
      <stop offset="100%" stop-color="rgba(10,22,36,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="380" ry="180" fill="url(#glow)"/>
  <path d="M80 470 Q240 390 420 430 T760 400 T1120 460 L1120 630 L80 630 Z" fill="rgba(236,246,255,0.16)"/>
  <path d="M80 520 Q300 450 560 490 T1120 510 L1120 630 L80 630 Z" fill="rgba(220,236,250,0.22)"/>
  <g fill="rgba(236,248,255,0.92)">
    <circle cx="220" cy="140" r="3.2"/>
    <circle cx="340" cy="88" r="2.4"/>
    <circle cx="480" cy="160" r="3.6"/>
    <circle cx="610" cy="72" r="2.8"/>
    <circle cx="740" cy="128" r="3.2"/>
    <circle cx="880" cy="96" r="2.6"/>
    <circle cx="980" cy="176" r="3.4"/>
    <circle cx="160" cy="230" r="2.2"/>
    <circle cx="300" cy="210" r="2.8"/>
    <circle cx="920" cy="240" r="2.4"/>
    <circle cx="1040" cy="120" r="2.2"/>
    <circle cx="520" cy="108" r="2.0"/>
    <circle cx="680" cy="198" r="2.6"/>
  </g>
  <path d="M600 168 L606 188 L628 188 L610 200 L616 222 L600 210 L584 222 L590 200 L572 188 L594 188 Z" fill="rgba(245,252,255,0.92)" stroke="rgba(200,224,240,0.7)" stroke-width="1.2"/>
  <text x="600" y="70" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#9ec4e0" letter-spacing="4">PALAVRAS · LAT. NIX, NIVIS · COBERTURA</text>
  <text x="600" y="330" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4f8fc">Neve</text>
  <text x="600" y="392" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="rgba(210,230,245,0.92)">cristal que cai · não é gelo · não é never</text>
  <text x="600" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(180,204,220,0.9)">≠ gelo · ≠ geada · ≠ nēve latino · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
