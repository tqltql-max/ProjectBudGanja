'use strict';

/** Capa 1200×630 para inspeção Artes · Alice no País das Maravilhas (1951). */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { ROOT } = require('../lib/paths.js');

const YT_ID = 'PA-h3-0wheo';
const OUT = path.join(
  ROOT,
  'imagens',
  'inspecoes',
  'alice-no-pais-das-maravilhas-cover.jpg'
);

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

  let thumb;
  try {
    thumb = await fetchBuffer('https://i.ytimg.com/vi/' + YT_ID + '/maxresdefault.jpg');
  } catch (e) {
    thumb = await fetchBuffer('https://i.ytimg.com/vi/' + YT_ID + '/hqdefault.jpg');
  }

  const base = await sharp(thumb)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: 0.68, saturation: 0.9 })
    .toBuffer();

  const overlay = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(8,18,28,0.2)"/>
      <stop offset="40%" stop-color="rgba(8,18,28,0.5)"/>
      <stop offset="100%" stop-color="rgba(8,18,28,0.9)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#veil)"/>
  <text x="600" y="180" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="700" fill="#9fd4c0" letter-spacing="8">ARTES · LIVRO</text>
  <text x="600" y="290" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="46" font-weight="700" fill="#f4fff8">Alice no País das Maravilhas</text>
  <text x="600" y="360" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#d0e0d8">1865 · Lewis Carroll · o início de tudo</text>
</svg>`);

  await sharp(base)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(OUT);

  console.log('OK', path.relative(ROOT, OUT), Math.round(fs.statSync(OUT).size / 1024) + 'KB');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
