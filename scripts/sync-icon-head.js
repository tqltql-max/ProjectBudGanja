'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { ASSET_VERSION } = require('../lib/asset-version.js');

const V = `?v=${ASSET_VERSION}`;

// PNG/ICO primeiro — Google prefere ≥48px; SVG antigo em cache causava ícone diferente na aba.
const ICON_BLOCK = `    <link rel="icon" href="/imagens/icon-192.png${V}" sizes="192x192" type="image/png">
    <link rel="icon" href="/imagens/favicon-48.png${V}" sizes="48x48" type="image/png">
    <link rel="icon" href="/imagens/favicon-32.png${V}" sizes="32x32" type="image/png">
    <link rel="icon" href="/imagens/favicon-16.png${V}" sizes="16x16" type="image/png">
    <link rel="shortcut icon" href="/favicon.ico${V}" sizes="any">
    <link rel="icon" href="/favicon.svg${V}" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/imagens/apple-touch-icon.png${V}">
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#3d5c28">`;

const ICON_LINE_RE =
  /^\s*<link[^>]*(?:rel=["'](?:icon|shortcut icon|apple-touch-icon|manifest)["']|href=["'][^"']*favicon)[^>]*>\s*$/gim;
const THEME_LINE_RE = /^\s*<meta\s+name=["']theme-color["'][^>]*>\s*$/gim;

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git' || name === 'deploy') continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else if (name.endsWith('.html')) out.push(full);
  }
}

function syncFile(file) {
  let html = fs.readFileSync(file, 'utf8');
  if (!/<head[\s>]/i.test(html)) return false;

  // Remove todas as linhas de ícone / manifest / theme-color (em qualquer sítio do head)
  let next = html.replace(ICON_LINE_RE, '').replace(THEME_LINE_RE, '');

  // Inserir bloco limpo antes do primeiro stylesheet ou, em falta, antes de </head>
  if (/<link[^>]+rel=["']stylesheet["']/i.test(next)) {
    next = next.replace(/\n?[ \t]*(<link[^>]+rel=["']stylesheet["'][^>]*>)/i, '\n' + ICON_BLOCK + '\n    $1');
  } else if (/<\/head>/i.test(next)) {
    next = next.replace(/<\/head>/i, ICON_BLOCK + '\n</head>');
  } else {
    return false;
  }

  // Colapsar linhas em branco múltiplas no head (só excesso)
  next = next.replace(/(\r?\n){3,}/g, '\n\n');

  if (next === html) return false;
  fs.writeFileSync(file, next);
  return true;
}

const files = [];
walk(ROOT, files);
let changed = 0;
files.forEach((file) => {
  if (syncFile(file)) changed++;
});

console.log('sync-icon-head: ' + changed + ' HTML actualizados.');
