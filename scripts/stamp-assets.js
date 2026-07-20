'use strict';

// Aplica "cache-busting" (?v=VERSION) às referências de JS/CSS locais em
// todos os HTML estáticos, sincroniza a constante ASSET_V em js/layout.js e
// o CACHE_NAME do service worker. Idempotente: pode correr em todos os builds.

const fs = require('fs');
const path = require('path');
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
      '\n    <script src="/js/i18n-data.js?v=' + ASSET_VERSION + '"></script>\n    <script src="/js/i18n.js?v=' + ASSET_VERSION + '"></script>\n    <script src="/js/ferramentas-nav-data.js?v=' + ASSET_VERSION + '"></script>$1'
    );
  } else if (!next.includes('ferramentas-nav-data.js') && next.includes('layout.js')) {
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

// Versiona favicon / ícones PWA / og:image nos HTML (evita cache Cloudflare).
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
    .replace(/(content="\/imagens\/icon-512\.png)(?:\?v=[^"]*)?(")/g, `$1?v=${ASSET_VERSION}$2`);
  if (next !== html) {
    fs.writeFileSync(file, next);
  }
}

// Manifesto de versão para o app verificar actualizações no telemóvel.
const versionPath = path.join(ROOT, 'version.json');
fs.writeFileSync(
  versionPath,
  JSON.stringify({ version: ASSET_VERSION, builtAt: new Date().toISOString() }, null, 2) + '\n',
  'utf8'
);

console.log(`stamp-assets: versão v${ASSET_VERSION} aplicada (${changedHtml} HTML atualizados).`);
