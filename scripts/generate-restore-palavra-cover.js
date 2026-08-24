'use strict';

/** Capa 1200×630 — restore · back · backup · up (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/restore-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071018"/>
      <stop offset="52%" stop-color="#102018"/>
      <stop offset="100%" stop-color="#1a1408"/>
    </linearGradient>
    <radialGradient id="glow" cx="74%" cy="36%" r="42%">
      <stop offset="0%" stop-color="rgba(90,210,150,0.30)"/>
      <stop offset="60%" stop-color="rgba(40,120,90,0.10)"/>
      <stop offset="100%" stop-color="rgba(7,16,24,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="880" cy="220" rx="270" ry="180" fill="url(#glow)"/>

  <polygon points="880,108 908,168 852,168" fill="none" stroke="rgba(160,230,190,0.85)" stroke-width="4"/>
  <line x1="880" y1="168" x2="880" y2="228" stroke="rgba(160,230,190,0.85)" stroke-width="4"/>
  <text x="880" y="258" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(180,230,200,0.85)">up</text>

  <polygon points="1048,300 988,278 988,322" fill="none" stroke="rgba(230,200,140,0.85)" stroke-width="4"/>
  <line x1="988" y1="300" x2="918" y2="300" stroke="rgba(230,200,140,0.85)" stroke-width="4"/>
  <text x="988" y="352" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(230,200,140,0.85)">back</text>

  <ellipse cx="168" cy="248" rx="78" ry="18" fill="none" stroke="rgba(200,210,180,0.55)" stroke-width="3"/>
  <ellipse cx="168" cy="272" rx="78" ry="18" fill="none" stroke="rgba(200,210,180,0.70)" stroke-width="3"/>
  <ellipse cx="168" cy="296" rx="78" ry="18" fill="none" stroke="rgba(200,210,180,0.90)" stroke-width="3"/>
  <text x="168" y="348" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(200,210,180,0.85)">backup</text>

  <rect x="118" y="400" width="100" height="72" rx="6" fill="none" stroke="rgba(140,220,170,0.8)" stroke-width="3"/>
  <path d="M138,424 L158,444 L202,412" fill="none" stroke="rgba(140,220,170,0.9)" stroke-width="4"/>
  <text x="168" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(140,220,170,0.85)">restore</text>

  <text x="600" y="72" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#9ad8b4" letter-spacing="4">PALAVRAS · RESTAURARE · BÆC · UPP</text>
  <text x="600" y="478" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="68" font-weight="700" fill="#f2efe4">restore</text>
  <text x="600" y="528" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(230,220,190,0.95)">back · backup · up</text>
  <text x="600" y="574" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(190,180,150,0.9)">≠ Restoure · ≠ restore back · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
