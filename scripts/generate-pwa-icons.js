'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

const SOURCE_PNG = path.join(ROOT, 'imagens', 'iconsite.png');
const SOURCE_SVG = path.join(ROOT, 'imagens', 'app-icon.svg');
const SOURCE = fs.existsSync(SOURCE_PNG) ? SOURCE_PNG : SOURCE_SVG;
const OUT_DIR = path.join(ROOT, 'imagens');
const FAVICON_SVG = path.join(ROOT, 'favicon.svg');

const BG = { r: 26, g: 26, b: 26, alpha: 1 };
const GLOW = { r: 39, g: 174, b: 96 };

async function loadSharp() {
  try {
    return require('sharp');
  } catch (e) {
    console.error('Instale sharp: npm install sharp');
    throw e;
  }
}

function stripNearWhite(raw, info) {
  const pixels = Buffer.from(raw);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    if (r > 235 && g > 235 && b > 235) {
      pixels[i + 3] = 0;
    }
  }
  return { pixels, info };
}

async function prepareLogo(sharp, maxSize) {
  const { data, info } = await sharp(SOURCE)
    .ensureAlpha()
    .resize(maxSize, maxSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .raw()
    .toBuffer({ resolveWithObject: true });

  // só remove pixels quase-brancos quando a fonte é SVG (PNGs já têm transparência)
  const cleaned = SOURCE === SOURCE_SVG ? stripNearWhite(data, info) : { pixels: data, info };
  return sharp(cleaned.pixels, {
    raw: { width: cleaned.info.width, height: cleaned.info.height, channels: 4 }
  }).png().toBuffer();
}

async function buildAppIcon(sharp, size) {
  // PNG já tem background próprio — apenas redimensiona
  if (SOURCE === SOURCE_PNG) {
    return sharp(SOURCE)
      .resize(size, size, { fit: 'cover', position: 'centre' })
      .png({ compressionLevel: 9 })
      .toBuffer();
  }

  // SVG: fundo escuro + glow (comportamento original)
  const maskable = false;
  const pad = Math.round(size * 0.08);
  const inner = size - pad * 2;
  const logo = await prepareLogo(sharp, inner);

  const glow = await sharp(logo)
    .blur(Math.max(2, Math.round(size * 0.03)))
    .modulate({ brightness: 1.15, saturation: 1.4 })
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: BG }
  })
    .composite([
      { input: glow, gravity: 'centre', blend: 'screen' },
      { input: logo, gravity: 'centre' }
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

function buildFaviconSvg(pngBase64) {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
  <defs>
    <filter id="glow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="1" stdDeviation="2.2" flood-color="#27ae60" flood-opacity="0.5"/>
    </filter>
    <clipPath id="round"><circle cx="32" cy="32" r="30"/></clipPath>
  </defs>
  <circle cx="32" cy="32" r="30" fill="#1a1a1a"/>
  <g clip-path="url(#round)" filter="url(#glow)">
    <image xlink:href="data:image/png;base64,${pngBase64}" width="64" height="64" preserveAspectRatio="xMidYMid meet"/>
  </g>
</svg>`;
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    throw new Error('Ficheiro em falta: imagens/iconsite.png ou imagens/app-icon.svg');
  }
  console.log(`Fonte de ícones: ${path.basename(SOURCE)}`);

  const sharp = await loadSharp();
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const icon192 = await buildAppIcon(sharp, 192);
  const icon512 = await buildAppIcon(sharp, 512);
  const icon512Mask = await buildAppIcon(sharp, 512);
  const appleTouch = await buildAppIcon(sharp, 180);
  const fav32 = await buildAppIcon(sharp, 32);
  const fav16 = await buildAppIcon(sharp, 16);
  const fav64 = await buildAppIcon(sharp, 64);

  fs.writeFileSync(path.join(OUT_DIR, 'icon-192.png'), icon192);
  fs.writeFileSync(path.join(OUT_DIR, 'icon-512.png'), icon512);
  fs.writeFileSync(path.join(OUT_DIR, 'icon-512-maskable.png'), icon512Mask);
  fs.writeFileSync(path.join(OUT_DIR, 'apple-touch-icon.png'), appleTouch);
  fs.writeFileSync(path.join(OUT_DIR, 'favicon-32.png'), fav32);
  fs.writeFileSync(path.join(OUT_DIR, 'favicon-16.png'), fav16);
  fs.writeFileSync(FAVICON_SVG, buildFaviconSvg(fav64.toString('base64')));

  // favicon.ico na raiz (Google e browsers antigos preferem este formato)
  fs.writeFileSync(path.join(ROOT, 'favicon.ico'), fav32);

  console.log(`Ícones gerados a partir de imagens/${path.basename(SOURCE)}`);
  console.log('  → imagens/icon-192.png, icon-512.png, apple-touch-icon.png, favicon-*.png');
  console.log('  → favicon.svg (com brilho verde)');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
