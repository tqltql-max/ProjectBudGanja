'use strict';

// Aplica "cache-busting" (?v=VERSION) às referências de JS/CSS locais em
// todos os HTML estáticos, sincroniza a constante ASSET_V em js/layout.js e
// o CACHE_NAME do service worker. Idempotente: pode correr em todos os builds.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { ROOT } = require('../lib/paths.js');
const { ASSET_VERSION } = require('../lib/asset-version.js');

function listHtmlFiles(dir, acc) {
  acc = acc || [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['scripts', 'server', 'lib', 'deploy', 'uploads'].includes(entry.name)) continue;
      listHtmlFiles(full, acc);
    } else if (entry.name.endsWith('.html')) {
      acc.push(full);
    }
  }
  return acc;
}

const versionCheckTag = '<script src="/js/app-version-check.js?v=' + ASSET_VERSION + '"></script>';

function ensureVersionCheckScript(content) {
  if (content.includes('app-version-check.js')) {
    return content.replace(
      /\/js\/app-version-check\.js(?:\?v=[^"']*)?/g,
      '/js/app-version-check.js?v=' + ASSET_VERSION
    );
  }
  const firstScript = content.match(/\s*<script\s+src="[^"]*\/js\/[^"]+\.js[^"]*"><\/script>/);
  if (!firstScript) return content;
  return content.replace(firstScript[0], '\n  ' + versionCheckTag + firstScript[0]);
}

// Reescreve src/href de /js/*.js e /css/*.css (com ou sem ?v= anterior).
function stampHtml(content) {
  const skipFerramentasNav = content.includes('data-page="cultivo"') || content.includes('data-page="planejamento"');
  let next = content.replace(
    /((?:src|href)=")((?:\/)?(?:js|css)\/[^"?#]+\.(?:js|css))(?:\?v=[^"#]*)?((?:#[^"]*)?")/g,
    (m, pre, asset, post) => {
      const normalized = asset.startsWith('/') ? asset : '/' + asset;
      return pre + normalized + '?v=' + ASSET_VERSION + post;
    }
  );
  if (skipFerramentasNav) {
    next = next.replace(/\s*<script\s+src="[^"]*\/js\/ferramentas-nav-data\.js[^"]*"><\/script>\n?/g, '\n');
    if (!next.includes('pages/cultivo-perfil.css')) {
      next = next.replace(
        /(<link rel="stylesheet" href="\/css\/style\.css\?v=[^"]+">)/,
        '$1\n    <link rel="stylesheet" href="/css/pages/cultivo-perfil.css?v=' + ASSET_VERSION + '">'
      );
    }
    if (content.includes('data-page="planejamento"') && !next.includes('pages/planejamento.css')) {
      next = next.replace(
        /(<link rel="stylesheet" href="\/css\/pages\/cultivo-perfil\.css\?v=[^"]+">)/,
        '$1\n    <link rel="stylesheet" href="/css/pages/planejamento.css?v=' + ASSET_VERSION + '">'
      );
    }
  } else if (!next.includes('i18n-data.js') && next.includes('layout.js')) {
    next = next.replace(
      /(\s*<script\s+src="[^"]*\/js\/layout\.js[^"]*"><\/script>)/g,
      '\n    <script src="/js/i18n-data.js?v=' + ASSET_VERSION + '"></script>\n    <script src="/js/page-translations-data.js?v=' + ASSET_VERSION + '"></script>\n    <script src="/js/i18n.js?v=' + ASSET_VERSION + '"></script>\n    <script src="/js/ferramentas-nav-data.js?v=' + ASSET_VERSION + '"></script>$1'
    );
  }
  if (next.includes('i18n-data.js') && !next.includes('page-translations-data.js')) {
    next = next.replace(
      /(<script\s+src="[^"]*\/js\/i18n-data\.js[^"]*"><\/script>)/g,
      '$1\n    <script src="/js/page-translations-data.js?v=' + ASSET_VERSION + '"></script>'
    );
  }
  if (!next.includes('ferramentas-nav-data.js') && next.includes('layout.js') && !next.includes('i18n-data.js')) {
    next = next.replace(
      /(\s*<script\s+src="[^"]*\/js\/layout\.js[^"]*"><\/script>)/g,
      '\n    <script src="/js/ferramentas-nav-data.js?v=' + ASSET_VERSION + '"></script>$1'
    );
  }
  return ensureVersionCheckScript(next);
}

let changedHtml = 0;
for (const file of listHtmlFiles(ROOT)) {
  const original = fs.readFileSync(file, 'utf8');
  const updated = stampHtml(original);
  if (updated !== original) {
    fs.writeFileSync(file, updated);
    changedHtml++;
  }
}

// Sincroniza js/layout.js (constante ASSET_V usada para SW + scripts dinâmicos).
const layoutPath = path.join(ROOT, 'js', 'layout.js');
if (fs.existsSync(layoutPath)) {
  let layout = fs.readFileSync(layoutPath, 'utf8');
  const next = layout.replace(
    /(const\s+ASSET_V\s*=\s*')[^']*(')/,
    `$1${ASSET_VERSION}$2`
  );
  if (next !== layout) {
    fs.writeFileSync(layoutPath, next);
  }
}

const versionCheckPath = path.join(ROOT, 'js', 'app-version-check.js');
if (fs.existsSync(versionCheckPath)) {
  let versionCheck = fs.readFileSync(versionCheckPath, 'utf8');
  const next = versionCheck.replace(
    /(var\s+LOCAL_VERSION\s*=\s*')[^']*(')/,
    `$1${ASSET_VERSION}$2`
  );
  if (next !== versionCheck) {
    fs.writeFileSync(versionCheckPath, next);
  }
}

// Sincroniza ICON_V da Media Session (notificação da rádio).
const radioMediaPath = path.join(ROOT, 'js', 'radio-media-session.js');
if (fs.existsSync(radioMediaPath)) {
  let radioMedia = fs.readFileSync(radioMediaPath, 'utf8');
  const next = radioMedia.replace(
    /(var\s+ICON_V\s*=\s*')[^']*(')/,
    `$1${ASSET_VERSION}$2`
  );
  if (next !== radioMedia) {
    fs.writeFileSync(radioMediaPath, next);
  }
}

// Sincroniza APP_VERSION e CACHE_NAME do service worker.
const swPath = path.join(ROOT, 'sw.js');
if (fs.existsSync(swPath)) {
  let sw = fs.readFileSync(swPath, 'utf8');
  const next = sw.replace(
    /(const\s+APP_VERSION\s*=\s*')[^']*(')/,
    `$1${ASSET_VERSION}$2`
  );
  if (next !== sw) {
    fs.writeFileSync(swPath, next);
  }
}

// Manifest PWA: ícones SEM ?v= — alguns Chromium no desktop falham o critério
// de instalação (e o atalho) quando o src do ícone leva query string.
const manifestPath = path.join(ROOT, 'manifest.json');
if (fs.existsSync(manifestPath)) {
  let manifest = fs.readFileSync(manifestPath, 'utf8');
  const next = manifest.replace(
    /(\/imagens\/[^"?]+\.(?:png|svg))\?v=[^"]*(")/g,
    '$1$2'
  );
  if (next !== manifest) {
    fs.writeFileSync(manifestPath, next);
  }
}

// Versiona favicon / ícones PWA / og:image nos HTML (evita cache Cloudflare / oval verde).
for (const file of listHtmlFiles(ROOT)) {
  let html = fs.readFileSync(file, 'utf8');
  const next = html
    .replace(/(href="\/favicon\.svg)(?:\?v=[^"]*)?(")/g, `$1?v=${ASSET_VERSION}$2`)
    .replace(/(href="\/favicon\.ico)(?:\?v=[^"]*)?(")/g, `$1?v=${ASSET_VERSION}$2`)
    .replace(/(href="\/imagens\/favicon-\d+\.png)(?:\?v=[^"]*)?(")/g, `$1?v=${ASSET_VERSION}$2`)
    .replace(/(href="\/imagens\/icon-192\.png)(?:\?v=[^"]*)?(")/g, `$1?v=${ASSET_VERSION}$2`)
    .replace(/(href="\/imagens\/icon-512\.png)(?:\?v=[^"]*)?(")/g, `$1?v=${ASSET_VERSION}$2`)
    .replace(/(href="\/imagens\/icon-512-maskable\.png)(?:\?v=[^"]*)?(")/g, `$1?v=${ASSET_VERSION}$2`)
    .replace(/(href="\/imagens\/apple-touch-icon\.png)(?:\?v=[^"]*)?(")/g, `$1?v=${ASSET_VERSION}$2`)
    .replace(/(href="\/imagens\/app-icon\.png)(?:\?v=[^"]*)?(")/g, `$1?v=${ASSET_VERSION}$2`)
    .replace(/(src="\/imagens\/app-icon\.png)(?:\?v=[^"]*)?(")/g, `$1?v=${ASSET_VERSION}$2`)
    .replace(/(src="\/imagens\/icon-192\.png)(?:\?v=[^"]*)?(")/g, `$1?v=${ASSET_VERSION}$2`)
    .replace(/(content="\/imagens\/icon-512\.png)(?:\?v=[^"]*)?(")/g, `$1?v=${ASSET_VERSION}$2`)
    .replace(
      /(\/(?:imagens\/(?:icon-192|icon-512|icon-512-maskable|app-icon|apple-touch-icon|favicon-\d+)|favicon)\.v)\d+(\.(?:png|ico|svg))/g,
      `$1${ASSET_VERSION}$2`
    );
  if (next !== html) {
    fs.writeFileSync(file, next);
  }
}

// Manifesto de versão para o app verificar actualizações no telemóvel.
const versionPath = path.join(ROOT, 'version.json');

// Banner do hero: versão pelo hash do PNG fonte (variantes WebP/JPEG regeneram no build).
const heroPngPath = path.join(ROOT, 'imagens', 'background-hero.png');
const heroJpgPath = path.join(ROOT, 'imagens', 'background-hero.jpg');
const heroMetaPath = path.join(ROOT, 'imagens', 'background-hero.meta.json');
let heroCacheKey = ASSET_VERSION;
let heroWidth = 1400;
let heroHeight = 277;
if (fs.existsSync(heroPngPath)) {
  const heroBuf = fs.readFileSync(heroPngPath);
  heroCacheKey = crypto.createHash('sha1').update(heroBuf).digest('hex').slice(0, 10);
  if (heroBuf.length >= 24 && heroBuf[0] === 0x89 && heroBuf[1] === 0x50) {
    const srcW = heroBuf.readUInt32BE(16);
    const srcH = heroBuf.readUInt32BE(20);
    // Dimensões do JPEG/WebP de display (max 1400w do optimize-hero).
    heroWidth = Math.min(1400, srcW);
    heroHeight = Math.max(1, Math.round((srcH * heroWidth) / srcW));
  }
}
if (fs.existsSync(heroMetaPath)) {
  try {
    const meta = JSON.parse(fs.readFileSync(heroMetaPath, 'utf8'));
    const jpgMeta = meta && meta.files && meta.files['background-hero.jpg'];
    if (jpgMeta && jpgMeta.width && jpgMeta.height) {
      heroWidth = jpgMeta.width;
      heroHeight = jpgMeta.height;
    }
  } catch (e) { /* manter defaults */ }
}
if (!fs.existsSync(heroJpgPath)) {
  console.warn('stamp-assets: background-hero.jpg em falta — corre scripts/optimize-hero.js');
}

fs.writeFileSync(
  versionPath,
  JSON.stringify({
    version: ASSET_VERSION,
    hero: heroCacheKey,
    heroSize: heroWidth && heroHeight ? { width: heroWidth, height: heroHeight } : null,
    builtAt: new Date().toISOString()
  }, null, 2) + '\n',
  'utf8'
);

// Versiona imagens referenciadas no CSS (banner do hero → hash do ficheiro).
function stampHeroInCssFile(cssPath) {
  if (!fs.existsSync(cssPath)) return;
  let css = fs.readFileSync(cssPath, 'utf8');
  const nextCss = css.replace(
    /(url\(\s*['"]?(?:\.\.\/)?\/?imagens\/background-hero\.(?:png|svg|jpg|jpeg|webp|avif))(?:\?v=[^'")\s]*)?(['"]?\s*\))/g,
    `$1?v=${heroCacheKey}$2`
  );
  if (nextCss !== css) {
    fs.writeFileSync(cssPath, nextCss);
  }
}
stampHeroInCssFile(path.join(ROOT, 'css', 'style.css'));
stampHeroInCssFile(path.join(ROOT, 'css', 'atmosphere.css'));
stampHeroInCssFile(path.join(ROOT, 'css', 'pages', 'radio.css'));
stampHeroInCssFile(path.join(ROOT, 'css', 'pages', 'home.css'));

function stampHeroMediaAttrs(tag) {
  if (!heroWidth || !heroHeight) return tag;
  let next = tag;
  if (/\bwidth="/i.test(next)) next = next.replace(/\bwidth="\d+"/i, 'width="' + heroWidth + '"');
  else next = next.replace(/<img\b/i, '<img width="' + heroWidth + '"');
  if (/\bheight="/i.test(next)) next = next.replace(/\bheight="\d+"/i, 'height="' + heroHeight + '"');
  else next = next.replace(/<img\b/i, '<img height="' + heroHeight + '"');
  return next;
}

// Versiona o banner do hero em HTML + actualiza width/height ao tamanho de display
for (const file of listHtmlFiles(ROOT)) {
  let html = fs.readFileSync(file, 'utf8');
  let nextHtml = html.replace(
    /(\/imagens\/background-hero(?:-\d+)?\.(?:png|svg|jpg|jpeg|webp|avif))(?:\?v=[^"'\s>]*)?/g,
    '$1?v=' + heroCacheKey
  );
  nextHtml = nextHtml.replace(/<img\b[^>]*\bhero-media\b[^>]*>/gi, stampHeroMediaAttrs);
  if (nextHtml !== html) {
    fs.writeFileSync(file, nextHtml);
  }
}

console.log(
  'stamp-assets: versão v' + ASSET_VERSION + ' aplicada (' + changedHtml + ' HTML atualizados)' +
  '; hero ?v=' + heroCacheKey +
  (heroWidth && heroHeight ? ' (' + heroWidth + '×' + heroHeight + ')' : '') +
  '.'
);
