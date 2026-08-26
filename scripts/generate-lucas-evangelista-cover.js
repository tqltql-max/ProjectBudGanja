'use strict';

/** Capa 1200×630 — Pessoas · Lucas Evangelista. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/lucas-evangelista-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#12180f"/>
      <stop offset="48%" stop-color="#1c2414"/>
      <stop offset="100%" stop-color="#0a0c08"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="48%">
      <stop offset="0%" stop-color="rgba(200,170,90,0.28)"/>
      <stop offset="55%" stop-color="rgba(140,160,90,0.10)"/>
      <stop offset="100%" stop-color="rgba(200,170,90,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="236" rx="240" ry="168" fill="url(#glow)"/>

  <!-- open scroll -->
  <path d="M470 168 Q600 148 730 168 L738 292 Q600 318 462 292 Z" fill="none" stroke="rgba(232,214,160,0.72)" stroke-width="2.4"/>
  <path d="M490 188 Q600 174 710 188" fill="none" stroke="rgba(232,214,160,0.35)" stroke-width="1.6"/>
  <path d="M486 214 Q600 200 714 214" fill="none" stroke="rgba(232,214,160,0.28)" stroke-width="1.4"/>
  <path d="M490 240 Q600 226 710 240" fill="none" stroke="rgba(232,214,160,0.22)" stroke-width="1.4"/>

  <!-- winged ox (simplified) -->
  <ellipse cx="600" cy="268" rx="54" ry="28" fill="none" stroke="rgba(232,214,160,0.78)" stroke-width="2.4"/>
  <circle cx="560" cy="252" r="16" fill="none" stroke="rgba(232,214,160,0.78)" stroke-width="2.2"/>
  <path d="M548 244 Q540 228 552 222" fill="none" stroke="rgba(232,214,160,0.7)" stroke-width="2"/>
  <path d="M568 242 Q580 226 574 220" fill="none" stroke="rgba(232,214,160,0.7)" stroke-width="2"/>
  <path d="M640 248 Q700 210 742 188" fill="none" stroke="rgba(232,214,160,0.55)" stroke-width="2"/>
  <path d="M636 262 Q690 236 728 214" fill="none" stroke="rgba(232,214,160,0.38)" stroke-width="1.6"/>
  <path d="M458 248 Q400 210 358 188" fill="none" stroke="rgba(232,214,160,0.55)" stroke-width="2"/>
  <path d="M464 262 Q410 236 372 214" fill="none" stroke="rgba(232,214,160,0.38)" stroke-width="1.6"/>

  <!-- staff of Asclepius (single snake) -->
  <line x1="600" y1="300" x2="600" y2="392" stroke="rgba(232,214,160,0.55)" stroke-width="2.2"/>
  <path d="M600 318 Q624 330 600 342 Q576 354 600 366 Q618 376 600 386" fill="none" stroke="rgba(180,200,120,0.75)" stroke-width="2.2"/>

  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8be7a" letter-spacing="4">PESSOAS · CORPO × ALMA</text>
  <text x="600" y="460" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f5f0e4">Lucas</text>
  <text x="600" y="508" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,180,0.95)">médico de homens e de almas</text>
  <text x="600" y="556" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#b8a878">Col 4,14 — tradição — fora dos Doze</text>
  <text x="600" y="596" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="#c8be7a">templo · alma · faça o melhor</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log(
    'OK',
    path.relative(ROOT, OUT),
    Math.round(fs.statSync(OUT).size / 1024) + 'KB'
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
