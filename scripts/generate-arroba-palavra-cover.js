'use strict';

/** Capa 1200×630 — @ / arroba × olhos (Palavras). */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function main() {
  const sharp = require('sharp');
  const OUT = path.join(ROOT, 'imagens/inspecoes/arroba-palavra-cover.jpg');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const bg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c1014"/>
      <stop offset="50%" stop-color="#141c1e"/>
      <stop offset="100%" stop-color="#100e0c"/>
    </linearGradient>
    <radialGradient id="iris" cx="48%" cy="46%" r="58%">
      <stop offset="0%" stop-color="rgba(90,160,170,0.9)"/>
      <stop offset="50%" stop-color="rgba(30,80,90,0.75)"/>
      <stop offset="100%" stop-color="rgba(10,16,18,0.15)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <!-- left: @ as eye -->
  <ellipse cx="340" cy="290" rx="132" ry="84" fill="none" stroke="rgba(220,210,180,0.45)" stroke-width="3"/>
  <circle cx="340" cy="290" r="78" fill="none" stroke="rgba(232,220,190,0.85)" stroke-width="10"/>
  <circle cx="340" cy="290" r="52" fill="url(#iris)"/>
  <circle cx="340" cy="290" r="20" fill="#0a0c0e"/>
  <circle cx="354" cy="276" r="7" fill="rgba(240,240,230,0.55)"/>
  <path d="M 410 268 C 430 300, 408 348, 368 352" fill="none" stroke="rgba(232,220,190,0.85)" stroke-width="10" stroke-linecap="round"/>
  <text x="340" y="188" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" fill="#f4f0e4">@</text>
  <!-- right: organic eye -->
  <ellipse cx="860" cy="290" rx="132" ry="84" fill="none" stroke="rgba(220,200,150,0.5)" stroke-width="4"/>
  <ellipse cx="860" cy="290" rx="72" ry="72" fill="url(#iris)"/>
  <circle cx="860" cy="290" r="26" fill="#0a0c0e"/>
  <circle cx="874" cy="276" r="8" fill="rgba(240,230,200,0.5)"/>
  <!-- relation X -->
  <line x1="520" y1="268" x2="680" y2="312" stroke="rgba(244,232,216,0.45)" stroke-width="3" stroke-linecap="round"/>
  <line x1="520" y1="312" x2="680" y2="268" stroke="rgba(244,232,216,0.45)" stroke-width="3" stroke-linecap="round"/>
  <circle cx="600" cy="290" r="18" fill="#0c1014" stroke="rgba(244,232,216,0.65)" stroke-width="2"/>
  <text x="600" y="68" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8c090" letter-spacing="5">PALAVRAS · O OLHO COLA · A ORELHA NÃO</text>
  <text x="600" y="468" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f4f0e4">@ × olhos</text>
  <text x="600" y="518" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(220,210,180,0.95)">arroba · ar-rubʿ · at · ≠ oculus</text>
  <text x="600" y="558" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="rgba(190,180,150,0.85)">pictograma · não étimo · Valeu !!!</text>
</svg>`);

  await sharp(bg).jpeg({ quality: 84, mozjpeg: true }).toFile(OUT);
  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
