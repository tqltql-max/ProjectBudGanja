'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { ASSET_VERSION } = require('../lib/asset-version.js');

const SOURCE_PNG = path.join(ROOT, 'imagens', 'iconsite.png');
const SOURCE_SVG = path.join(ROOT, 'imagens', 'app-icon.svg');
const SOURCE = fs.existsSync(SOURCE_PNG) ? SOURCE_PNG : SOURCE_SVG;
const OUT_DIR = path.join(ROOT, 'imagens');
const FAVICON_SVG = path.join(ROOT, 'favicon.svg');

/** Fundo do splash/ícone — preto puro (evita cinza no arranque da app). */
const BG = { r: 0, g: 0, b: 0, alpha: 1 };

/**
 * iconsite.png já traz moldura dourada — padding leve só para safe-zone,
 * sem “encolher” o emblema (o que fazia o app parecer outro ícone).
 */
const PAD_ANY = 0.06;
const PAD_MASKABLE = 0.18;
const PAD_FAVICON = 0.04;

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

async function buildPaddedIcon(sharp, size, padRatio) {
  const pad = Math.max(2, Math.round(size * padRatio));
  const inner = Math.max(8, size - pad * 2);

  let logoBuf;
  if (SOURCE === SOURCE_SVG) {
    const { data, info } = await sharp(SOURCE)
      .ensureAlpha()
      .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .raw()
      .toBuffer({ resolveWithObject: true });
    const cleaned = stripNearWhite(data, info);
    logoBuf = await sharp(cleaned.pixels, {
      raw: { width: cleaned.info.width, height: cleaned.info.height, channels: 4 }
    })
      .png()
      .toBuffer();
  } else {
    logoBuf = await sharp(SOURCE)
      .ensureAlpha()
      .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
  }

  return sharp({
    create: { width: size, height: size, channels: 4, background: BG }
  })
    .composite([{ input: logoBuf, gravity: 'centre' }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

function buildFaviconSvg(pngBase64) {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64">
  <defs>
    <clipPath id="round"><rect x="2" y="2" width="60" height="60" rx="14" ry="14"/></clipPath>
  </defs>
  <rect x="0" y="0" width="64" height="64" rx="16" ry="16" fill="#000000"/>
  <g clip-path="url(#round)">
    <image xlink:href="data:image/png;base64,${pngBase64}" width="64" height="64" preserveAspectRatio="xMidYMid meet"/>
  </g>
</svg>`;
}

async function writeIco(sizes) {
  const icoPath = path.join(ROOT, 'favicon.ico');
  const versionedIco = path.join(ROOT, `favicon.v${ASSET_VERSION}.ico`);
  try {
    const mod = require('png-to-ico');
    const pngToIco = typeof mod === 'function' ? mod : mod.default;
    if (typeof pngToIco !== 'function') throw new Error('png-to-ico sem export default');
    const ico = await pngToIco([sizes[16], sizes[32], sizes[48]]);
    fs.writeFileSync(icoPath, ico);
    fs.writeFileSync(versionedIco, ico);
    // Limpar .ico versionados antigos na raiz
    for (const name of fs.readdirSync(ROOT)) {
      const m = name.match(/^favicon\.v(\d+)\.ico$/i);
      if (m && m[1] !== String(ASSET_VERSION)) {
        try { fs.unlinkSync(path.join(ROOT, name)); } catch (_) { /* ignore */ }
      }
    }
    console.log('  → favicon.ico + favicon.v' + ASSET_VERSION + '.ico (16/32/48)');
  } catch (e) {
    fs.writeFileSync(icoPath, sizes[32]);
    fs.writeFileSync(versionedIco, sizes[32]);
    console.log('  → favicon.ico (png fallback:', e.message + ')');
  }
}

function writeBoth(name, buf) {
  fs.writeFileSync(path.join(OUT_DIR, name), buf);
  // Cópia versionada — PWA/Android/CDN ignoram ?v= no manifest; URL nova força refresh.
  const versioned = name.replace(/(\.[a-z0-9]+)$/i, `.v${ASSET_VERSION}$1`);
  fs.writeFileSync(path.join(OUT_DIR, versioned), buf);
  return versioned;
}

function stampManifestIcons() {
  const manifestPath = path.join(ROOT, 'manifest.json');
  if (!fs.existsSync(manifestPath)) return;
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const v = ASSET_VERSION;
  manifest.background_color = '#000000';
  manifest.icons = [
    {
      src: `/imagens/icon-192.v${v}.png`,
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any'
    },
    {
      src: `/imagens/icon-512.v${v}.png`,
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any'
    },
    {
      src: `/imagens/icon-512-maskable.v${v}.png`,
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable'
    }
  ];
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`  → manifest.json ícones v${v}`);
}

function stampTwaIconUrls() {
  const twaPath = path.join(ROOT, 'deploy', 'android', 'twa-manifest.json');
  if (!fs.existsSync(twaPath)) return;
  const twa = JSON.parse(fs.readFileSync(twaPath, 'utf8'));
  const base = 'https://inspetorbudganja.com.br/imagens';
  const v = ASSET_VERSION;
  twa.iconUrl = `${base}/icon-512.v${v}.png`;
  twa.maskableIconUrl = `${base}/icon-512-maskable.v${v}.png`;
  twa.monochromeIconUrl = `${base}/icon-512.v${v}.png`;
  twa.backgroundColor = '#000000';
  twa.themeColorDark = '#000000';
  twa.navigationColor = '#000000';
  twa.navigationColorDark = '#000000';
  fs.writeFileSync(twaPath, JSON.stringify(twa, null, 2) + '\n');
  console.log(`  → twa-manifest.json ícones v${v}`);
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    throw new Error('Ficheiro em falta: imagens/iconsite.png ou imagens/app-icon.svg');
  }
  console.log(`Fonte de ícones: ${path.basename(SOURCE)} (v${ASSET_VERSION})`);

  const sharp = await loadSharp();
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const app = {
    512: await buildPaddedIcon(sharp, 512, PAD_ANY),
    192: await buildPaddedIcon(sharp, 192, PAD_ANY),
    180: await buildPaddedIcon(sharp, 180, PAD_ANY)
  };
  const maskable = await buildPaddedIcon(sharp, 512, PAD_MASKABLE);
  const mark = {
    64: await buildPaddedIcon(sharp, 64, PAD_FAVICON),
    48: await buildPaddedIcon(sharp, 48, PAD_FAVICON),
    32: await buildPaddedIcon(sharp, 32, PAD_FAVICON),
    16: await buildPaddedIcon(sharp, 16, PAD_FAVICON)
  };

  writeBoth('icon-512.png', app[512]);
  writeBoth('icon-512-maskable.png', maskable);
  writeBoth('icon-192.png', app[192]);
  writeBoth('apple-touch-icon.png', app[180]);
  writeBoth('favicon-48.png', mark[48]);
  writeBoth('favicon-32.png', mark[32]);
  writeBoth('favicon-16.png', mark[16]);
  fs.writeFileSync(FAVICON_SVG, buildFaviconSvg(mark[64].toString('base64')));
  const faviconSvgVersioned = path.join(ROOT, `favicon.v${ASSET_VERSION}.svg`);
  fs.writeFileSync(faviconSvgVersioned, buildFaviconSvg(mark[64].toString('base64')));
  for (const name of fs.readdirSync(ROOT)) {
    const m = name.match(/^favicon\.v(\d+)\.svg$/i);
    if (m && m[1] !== String(ASSET_VERSION)) {
      try { fs.unlinkSync(path.join(ROOT, name)); } catch (_) { /* ignore */ }
    }
  }
  await writeIco(mark);

  writeBoth('app-icon.png', await buildPaddedIcon(sharp, 192, PAD_FAVICON));

  stampManifestIcons();
  stampTwaIconUrls();

  // Limpar cópias versionadas antigas (mantém só a versão actual).
  for (const name of fs.readdirSync(OUT_DIR)) {
    const m = name.match(/\.(v)(\d+)\.(png)$/i);
    if (!m) continue;
    if (m[2] !== String(ASSET_VERSION)) {
      try {
        fs.unlinkSync(path.join(OUT_DIR, name));
      } catch (_) { /* ignore */ }
    }
  }

  console.log('Ícones gerados a partir de imagens/' + path.basename(SOURCE));
  console.log('  → icon-192/512 (+ .v' + ASSET_VERSION + ') padding ' + Math.round(PAD_ANY * 100) + '%');
  console.log('  → icon-512-maskable (+ versionado)');
  console.log('  → favicon-*.png, favicon.svg, favicon.ico, app-icon.png');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
