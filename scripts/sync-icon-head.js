'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { ASSET_VERSION } = require('../lib/asset-version.js');

const ICON_BLOCK = `    <link rel="icon" href="/favicon.svg?v=${ASSET_VERSION}" type="image/svg+xml">
  <link rel="icon" href="/imagens/favicon-32.png?v=${ASSET_VERSION}" sizes="32x32" type="image/png">
  <link rel="icon" href="/imagens/favicon-16.png?v=${ASSET_VERSION}" sizes="16x16" type="image/png">
  <link rel="apple-touch-icon" href="/imagens/apple-touch-icon.png?v=${ASSET_VERSION}">
  <link rel="manifest" href="/manifest.json?v=${ASSET_VERSION}">
    <meta name="theme-color" content="#3d5c28">`;

const PATTERNS = [
  /<link rel="icon" href="(?:\/)?favicon\.svg(?:\?v=[^"]*)?" type="image\/svg\+xml">\s*<link rel="icon" href="(?:\/)?imagens\/favicon-32\.png(?:\?v=[^"]*)?" sizes="32x32" type="image\/png">\s*<link rel="icon" href="(?:\/)?imagens\/favicon-16\.png(?:\?v=[^"]*)?" sizes="16x16" type="image\/png">\s*<link rel="apple-touch-icon" href="(?:\/)?imagens\/apple-touch-icon\.png(?:\?v=[^"]*)?">\s*<link rel="manifest" href="(?:\/)?manifest\.json(?:\?v=[^"]*)?">\s*<meta name="theme-color" content="#3d5c28">/gi,
  /<link rel="icon" href="(?:\/)?favicon\.svg" type="image\/svg\+xml">\s*<link rel="manifest" href="(?:\/)?manifest\.json">\s*<meta name="theme-color" content="#27ae60">/gi,
  /<link rel="icon" href="(?:\/)?favicon\.svg" type="image\/svg\+xml">\s*<link rel="manifest" href="(?:\/)?manifest\.json">/gi
];

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git') continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else if (name.endsWith('.html')) out.push(full);
  }
}

const files = [];
walk(ROOT, files);
let changed = 0;

files.forEach((file) => {
  let html = fs.readFileSync(file, 'utf8');
  let next = html;

  next = next
    .replace(/<link rel="icon" href="(?:\/)?favicon\.svg(?:\?v=[^"]*)?" type="image\/svg\+xml">/gi, `<link rel="icon" href="/favicon.svg?v=${ASSET_VERSION}" type="image/svg+xml">`)
    .replace(/<link rel="icon" href="(?:\/)?imagens\/favicon-32\.png(?:\?v=[^"]*)?" sizes="32x32" type="image\/png">/gi, `<link rel="icon" href="/imagens/favicon-32.png?v=${ASSET_VERSION}" sizes="32x32" type="image/png">`)
    .replace(/<link rel="icon" href="(?:\/)?imagens\/favicon-16\.png(?:\?v=[^"]*)?" sizes="16x16" type="image\/png">/gi, `<link rel="icon" href="/imagens/favicon-16.png?v=${ASSET_VERSION}" sizes="16x16" type="image/png">`)
    .replace(/<link rel="apple-touch-icon" href="(?:\/)?imagens\/apple-touch-icon\.png(?:\?v=[^"]*)?">/gi, `<link rel="apple-touch-icon" href="/imagens/apple-touch-icon.png?v=${ASSET_VERSION}">`)
    .replace(/<link rel="manifest" href="(?:\/)?manifest\.json(?:\?v=[^"]*)?">/gi, `<link rel="manifest" href="/manifest.json?v=${ASSET_VERSION}">`);

  PATTERNS.forEach((re) => {
    next = next.replace(re, ICON_BLOCK);
  });
  if (next !== html) {
    fs.writeFileSync(file, next);
    changed++;
  }
});

console.log('sync-icon-head: ' + changed + ' HTML actualizados.');
