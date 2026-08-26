'use strict';

/** Capas 1200×630 — Log In · Internet discada · DSL. */
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

async function writeCover(name, svg) {
  const sharp = require('sharp');
  const out = path.join(ROOT, 'imagens/inspecoes', name);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(out);
  console.log('OK', path.relative(ROOT, out), Math.round(fs.statSync(out).size / 1024) + 'KB');
}

async function main() {
  await writeCover(
    'login-palavra-cover.jpg',
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#081018"/>
      <stop offset="100%" stop-color="#122030"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="46%">
      <stop offset="0%" stop-color="rgba(90,180,255,0.28)"/>
      <stop offset="100%" stop-color="rgba(90,180,255,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <ellipse cx="600" cy="240" rx="380" ry="190" fill="url(#glow)"/>
  <rect x="360" y="168" width="480" height="150" rx="10" fill="none" stroke="rgba(140,200,255,0.5)" stroke-width="3"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#8ec8ff" letter-spacing="3">PALAVRAS · PORTA · ≠ CANO</text>
  <text x="600" y="262" text-anchor="middle" font-family="Consolas, Courier New, monospace" font-size="56" font-weight="700" fill="#e8f4ff">LOG IN</text>
  <text x="600" y="400" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(210,230,255,0.95)">login · Longin · entrar na sessão</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#9cc8e8">a porta, não o modem</text>
  <text x="600" y="558" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#8ec8ff">Log Out · Save Game · Valeu !!!</text>
</svg>`
  );

  await writeCover(
    'internet-discada-palavra-cover.jpg',
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#100808"/>
      <stop offset="100%" stop-color="#1a1010"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <path d="M80 320 Q160 220 240 320 T400 320 T560 320 T720 320 T880 320 T1040 320 T1160 320" fill="none" stroke="rgba(255,140,90,0.7)" stroke-width="4"/>
  <path d="M80 360 Q200 420 320 360 T560 360 T800 360 T1040 360 T1160 360" fill="none" stroke="rgba(255,200,120,0.35)" stroke-width="2"/>
  <rect x="470" y="210" width="80" height="50" rx="6" fill="none" stroke="rgba(255,180,100,0.55)" stroke-width="2"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#ffb070" letter-spacing="2.5">PALAVRAS · MEIO · OCUPA A VOZ</text>
  <text x="600" y="180" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#ffe8d0">Internet discada</text>
  <text x="600" y="470" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="rgba(255,220,190,0.95)">dial-up · niocenchcadaro · 56k</text>
  <text x="600" y="530" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="20" fill="#e8b080">o cano que telefona</text>
  <text x="600" y="578" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#ffb070">DSL · conexão · Valeu !!!</text>
</svg>`
  );

  await writeCover(
    'dsl-palavra-cover.jpg',
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0c1410"/>
      <stop offset="100%" stop-color="#102018"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <line x1="200" y1="300" x2="1000" y2="300" stroke="rgba(180,160,80,0.55)" stroke-width="8"/>
  <line x1="200" y1="318" x2="1000" y2="318" stroke="rgba(80,180,140,0.45)" stroke-width="4"/>
  <text x="600" y="78" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700" fill="#a8e0b8" letter-spacing="3">PALAVRAS · SIGLA · SEMPRE NO AR</text>
  <text x="600" y="250" text-anchor="middle" font-family="Consolas, Courier New, monospace" font-size="72" font-weight="700" fill="#d8ffe8">DSL</text>
  <text x="600" y="400" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="rgba(210,240,220,0.95)">Digital Subscriber Line</text>
  <text x="600" y="500" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="22" fill="#9ed8b0">a linha do assinante, digital</text>
  <text x="600" y="558" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="#a8e0b8">≠ discada · ≠ login · Valeu !!!</text>
</svg>`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
