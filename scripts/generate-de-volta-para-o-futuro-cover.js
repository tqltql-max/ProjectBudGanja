'use strict';

/** Capa 1200×630 — Artes · De Volta para o Futuro (1985). */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { ROOT } = require('../lib/paths.js');
const { YT_ID } = require('../lib/de-volta-para-o-futuro-inspecoes-posts.js');

const OUT = path.join(ROOT, 'imagens', 'inspecoes', 'de-volta-para-o-futuro-cover.jpg');

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
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

async function main() {
  const sharp = require('sharp');
  fs.mkdirSync(path.dirname(OUT), { recursive: true });

  let baseBuf;
  try {
    const thumb = await fetchBuffer('https://i.ytimg.com/vi/' + YT_ID + '/maxresdefault.jpg');
    baseBuf = await sharp(thumb)
      .rotate()
      .resize(1200, 630, { fit: 'cover', position: 'attention' })
      .modulate({ brightness: 0.58, saturation: 0.9 })
      .toBuffer();
  } catch (e) {
    const heroPath = path.join(ROOT, 'imagens', 'background-hero.png');
    baseBuf = await sharp(heroPath)
      .rotate()
      .resize(1200, 630, { fit: 'cover', position: 'attention' })
      .modulate({ brightness: 0.5, saturation: 1.05 })
      .toBuffer();
  }

  const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(8,18,28,0.28)"/>
      <stop offset="50%" stop-color="rgba(8,18,28,0.58)"/>
      <stop offset="100%" stop-color="rgba(6,10,16,0.92)"/>
    </linearGradient>
    <linearGradient id="neon" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ff6a00"/>
      <stop offset="55%" stop-color="#ffd15c"/>
      <stop offset="100%" stop-color="#3ec8ff"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <rect x="0" y="0" width="1200" height="8" fill="url(#neon)"/>
  <text x="600" y="168" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#ffd15c" letter-spacing="7">ARTES · CINEMA · 1985</text>
  <text x="600" y="292" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="52" font-weight="700" fill="#fff6e4">De Volta para o Futuro</text>
  <text x="600" y="368" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#d7e6f0">homenagem aos actores · Fox · Lloyd · o elenco</text>
  <text x="600" y="470" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="18" fill="#9ad4c8">pessoa antes da persona · 88 mph</text>
</svg>`);

  await sharp(baseBuf)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(OUT);

  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
