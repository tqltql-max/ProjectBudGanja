'use strict';

/** Capa 1200×630 — Pessoas · Leonardo da Vinci. */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { ROOT } = require('../lib/paths.js');

const OUT = path.join(ROOT, 'imagens', 'inspecoes', 'leonardo-da-vinci-cover.jpg');
const UA =
  'InspetorBudGanjaBot/1.0 (https://inspetorbudganja.com.br; inspection covers; contact tql.tql@gmail.com)';

const WIKI_THUMBS = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Francesco_Melzi_-_Portrait_of_Leonardo_-_WGA14795.jpg/800px-Francesco_Melzi_-_Portrait_of_Leonardo_-_WGA14795.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/f/f7/Francesco_Melzi_-_Portrait_of_Leonardo_-_WGA14795.jpg'
];

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': UA, Accept: 'image/*' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchBuffer(res.headers.location).then(resolve, reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error('HTTP ' + res.statusCode + ' ' + url));
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      })
      .on('error', reject);
  });
}

function atelierSvg() {
  return Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1410"/>
      <stop offset="48%" stop-color="#2a2218"/>
      <stop offset="100%" stop-color="#0e0c0a"/>
    </linearGradient>
    <radialGradient id="glow" cx="46%" cy="38%" r="40%">
      <stop offset="0%" stop-color="rgba(200,160,100,0.22)"/>
      <stop offset="100%" stop-color="rgba(200,160,100,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="540" cy="250" r="220" fill="url(#glow)"/>
  <circle cx="860" cy="300" r="78" fill="none" stroke="rgba(240,210,150,0.45)" stroke-width="3"/>
  <circle cx="860" cy="300" r="48" fill="none" stroke="rgba(240,210,150,0.28)" stroke-width="2"/>
  <line x1="860" y1="222" x2="860" y2="378" stroke="rgba(240,210,150,0.4)" stroke-width="2"/>
  <line x1="782" y1="300" x2="938" y2="300" stroke="rgba(240,210,150,0.4)" stroke-width="2"/>
  <path d="M390 430 L610 175 L632 198 L430 458 Z" fill="rgba(230,210,170,0.55)"/>
  <path d="M610 175 L648 148 L666 170 L632 198 Z" fill="rgba(245,225,180,0.75)"/>
</svg>`);
}

async function portraitBase(sharp) {
  for (const url of WIKI_THUMBS) {
    try {
      const buf = await fetchBuffer(url);
      return sharp(buf)
        .rotate()
        .resize(1200, 630, { fit: 'cover', position: 'attention' })
        .modulate({ brightness: 0.52, saturation: 0.65 })
        .toBuffer();
    } catch (e) {
      console.warn('Aviso capa Wikimedia', e.message);
    }
  }
  return sharp(atelierSvg()).jpeg({ quality: 84 }).toBuffer();
}

async function main() {
  const sharp = require('sharp');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  const baseBuf = await portraitBase(sharp);

  const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(18,14,12,0.30)"/>
      <stop offset="50%" stop-color="rgba(12,10,10,0.58)"/>
      <stop offset="100%" stop-color="rgba(6,6,6,0.90)"/>
    </linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#5a4030"/>
      <stop offset="55%" stop-color="#d4c4a0"/>
      <stop offset="100%" stop-color="#5a4030"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <rect x="0" y="0" width="1200" height="8" fill="url(#line)"/>
  <text x="600" y="88" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#e0c080" letter-spacing="7">PESSOAS · OFÍCIO</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="42" font-weight="700" fill="#f6efe4">Leonardo da Vinci</text>
  <text x="600" y="575" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#d4c4a4">1452–1519 · Santa Ceia</text>
</svg>`);

  await sharp(baseBuf)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(OUT);

  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
