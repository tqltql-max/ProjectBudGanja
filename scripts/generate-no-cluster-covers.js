'use strict';

/** Capas 1200×630 — cluster nó / corda / desatar / desastre / ufa / expressões / codorna. */
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

function shell(bg0, bg1, glow, kicker, word, line) {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg0}"/>
      <stop offset="100%" stop-color="${bg1}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="42%">
      <stop offset="0%" stop-color="${glow}"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="250" rx="340" ry="180" fill="url(#glow)"/>
  ${kicker}
  ${word}
  ${line}
</svg>`;
}

async function main() {
  await one(
    'no-palavra-cover.jpg',
    shell(
      '#14100c',
      '#0a0c10',
      'rgba(223,194,98,0.22)',
      '<text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#dfc262" letter-spacing="5">PALAVRAS · LAÇO</text>',
      '<path d="M430 250 C470 180, 530 180, 570 250 S670 320, 710 250 S790 180, 830 250" fill="none" stroke="#e2c15a" stroke-width="10" stroke-linecap="round"/><text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="72" font-weight="700" fill="#f4efe6">nó</text>',
      '<text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#c8b8a0">nodus · mora na corda · Faça o melhor!</text>'
    )
  );

  await one(
    'corda-palavra-cover.jpg',
    shell(
      '#12160e',
      '#0a100c',
      'rgba(160,180,90,0.18)',
      '<text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c8d48a" letter-spacing="5">OBJECTO · FIO</text>',
      '<line x1="220" y1="260" x2="980" y2="260" stroke="#c8b070" stroke-width="14" stroke-linecap="round"/><line x1="220" y1="278" x2="980" y2="278" stroke="#8a7048" stroke-width="4"/><text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700" fill="#f4efe6">corda</text>',
      '<text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#c8b8a0">chorda · ≠ codorna · Faça o melhor!</text>'
    )
  );

  await one(
    'desatar-palavra-cover.jpg',
    shell(
      '#0e1418',
      '#0a0c12',
      'rgba(126,200,180,0.18)',
      '<text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#7ec8b4" letter-spacing="5">PALAVRAS · SOLTAR</text>',
      '<path d="M380 270 C460 210, 540 330, 620 270 S780 210, 840 270" fill="none" stroke="#7ec8b4" stroke-width="8" stroke-dasharray="18 12" stroke-linecap="round"/><text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#f4efe6">desatar</text>',
      '<text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#c8b8a0">des- + atar · ≠ desastre · Faça o melhor!</text>'
    )
  );

  await one(
    'desastre-palavra-cover.jpg',
    shell(
      '#1a1010',
      '#0c0808',
      'rgba(226,90,70,0.2)',
      '<text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#e27a5a" letter-spacing="5">PALAVRAS · MÁ ESTRELA</text>',
      '<polygon points="600,170 618,230 682,230 630,268 648,330 600,292 552,330 570,268 518,230 582,230" fill="none" stroke="#e2c15a" stroke-width="4"/><text x="600" y="450" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#f4efe6">desastre</text>',
      '<text x="600" y="520" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#c8b8a0">dis + astro · ≠ desatar · Faça o melhor!</text>'
    )
  );

  await one(
    'ufa-palavra-cover.jpg',
    shell(
      '#101418',
      '#0a0c10',
      'rgba(180,200,220,0.2)',
      '<text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#a8c0d8" letter-spacing="5">PALAVRAS · ALÍVIO</text>',
      '<text x="600" y="310" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="120" font-weight="700" fill="#f4efe6">ufa</text>',
      '<text x="600" y="430" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#c8b8a0">sopro depois de desatar o nó · ≠ aff</text>'
    )
  );

  await one(
    'no-na-vida-cover.jpg',
    shell(
      '#121018',
      '#0a0c12',
      'rgba(180,140,200,0.18)',
      '<text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#c9b0ef" letter-spacing="5">EXPRESSÕES · LAÇO</text>',
      '<text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#f4efe6">nó na vida!</text>',
      '<text x="600" y="380" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#c8b8a0">ainda não é desastre · Faça o melhor!</text>'
    )
  );

  await one(
    'desatar-o-no-cover.jpg',
    shell(
      '#0e1614',
      '#0a100e',
      'rgba(110,231,197,0.16)',
      '<text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#6ee7c5" letter-spacing="5">EXPRESSÕES · OFÍCIO</text>',
      '<text x="600" y="300" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="48" font-weight="700" fill="#f4efe6">desatar o nó</text>',
      '<text x="600" y="380" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#c8b8a0">o ofício, não o desastre · ufa depois</text>'
    )
  );

  await one(
    'codorna-animal-cover.jpg',
    shell(
      '#12140c',
      '#0c1008',
      'rgba(180,160,80,0.2)',
      '<text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="700" fill="#d4c070" letter-spacing="5">ANIMAIS · AVE</text>',
      '<ellipse cx="560" cy="250" rx="90" ry="50" fill="none" stroke="#d4c070" stroke-width="6"/><ellipse cx="640" cy="230" rx="36" ry="28" fill="none" stroke="#d4c070" stroke-width="5"/><text x="600" y="430" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="56" font-weight="700" fill="#f4efe6">codorna</text>',
      '<text x="600" y="500" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#c8b8a0">Coturnix · ≠ corda · Faça o melhor!</text>'
    )
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
