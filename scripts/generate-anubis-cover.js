'use strict';

/** Capa 1200×630 — Anúbis (Palavras · primeiro deus do catálogo). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/anubis-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0806"/>
      <stop offset="50%" stop-color="#1a120c"/>
      <stop offset="100%" stop-color="#0c1014"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="36%" r="46%">
      <stop offset="0%" stop-color="rgba(212,160,48,0.32)"/>
      <stop offset="55%" stop-color="rgba(160,90,30,0.12)"/>
      <stop offset="100%" stop-color="rgba(10,8,6,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="220" rx="340" ry="190" fill="url(#glow)"/>
  <!-- jackal ears -->
  <path d="M560 210 L575 128 L598 205 Z" fill="#1a1410" stroke="rgba(212,160,48,0.7)" stroke-width="3"/>
  <path d="M640 210 L625 128 L602 205 Z" fill="#1a1410" stroke="rgba(212,160,48,0.7)" stroke-width="3"/>
  <!-- jackal head oval -->
  <ellipse cx="600" cy="228" rx="58" ry="52" fill="#16110d" stroke="rgba(212,160,48,0.55)" stroke-width="3"/>
  <ellipse cx="600" cy="248" rx="22" ry="16" fill="rgba(212,160,48,0.18)"/>
  <!-- scale beam -->
  <rect x="430" y="268" width="340" height="6" fill="rgba(212,160,48,0.55)"/>
  <circle cx="600" cy="271" r="10" fill="none" stroke="rgba(212,160,48,0.7)" stroke-width="3"/>
  <circle cx="448" cy="310" r="28" fill="none" stroke="rgba(212,160,48,0.5)" stroke-width="3"/>
  <circle cx="752" cy="310" r="28" fill="none" stroke="rgba(212,160,48,0.5)" stroke-width="3"/>
  <line x1="448" y1="274" x2="448" y2="282" stroke="rgba(212,160,48,0.5)" stroke-width="2"/>
  <line x1="752" y1="274" x2="752" y2="282" stroke="rgba(212,160,48,0.5)" stroke-width="2"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#d4a030" letter-spacing="4">EGITO · JNPW · ALGUM DEUS</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="58" font-weight="700" fill="#f4e4c0">Anúbis</text>
  <text x="600" y="490" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,200,160,0.95)">chacal · balanca de Maat · catalogo /mitologia/</text>
  <text x="600" y="548" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#c4a050">≠ Deus · ≠ magia · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
