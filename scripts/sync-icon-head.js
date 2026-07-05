'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { ASSET_VERSION } = require('../lib/asset-version.js');

const V = `?v=${ASSET_VERSION}`;

const ICON_BLOCK = `    <link rel="icon" href="/favicon.svg${V}" type="image/svg+xml">
    <link rel="icon" href="/favicon.ico" sizes="32x32" type="image/x-icon">
    <link rel="icon" href="/imagens/favicon-32.png${V}" sizes="32x32" type="image/png">
    <link rel="icon" href="/imagens/favicon-16.png${V}" sizes="16x16" type="image/png">
    <link rel="apple-touch-icon" href="/imagens/apple-touch-icon.png${V}">
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#3d5c28">`;

const PATTERNS = [
  /<link rel="icon" href="(?:\/)?favicon\.svg(?:\?v=[^"]*)?"\s+type="image\/svg\+xml">\s*<link rel="icon" href="(?:\/)?imagens\/favicon-32\.png(?:\?v=[^"]*)?"\s+sizes="32x32"[^>]*>\s*<link rel="icon" href="(?:\/)?imagens\/favicon-16\.png(?:\?v=[^"]*)?"\s+sizes="16x16"[^>]*>\s*<link rel="apple-touch-icon"[^>]*>\s*<link rel="manifest"[^>]*>\s*<meta name="theme-color"[^>]*>/gi,
  /<link rel="icon" href="(?:\/)?favicon\.svg(?:\?v=[^"]*)?"\s+type="image\/svg\+xml">\s*<link rel="manifest" href="(?:\/)?manifest\.json(?:\?v=[^"]*)?">\s*<meta name="theme-color" content="#27ae60">/gi,
  /<link rel="icon" href="(?:\/)?favicon\.svg(?:\?v=[^"]*)?"\s+type="image\/svg\+xml">\s*<link rel="manifest" href="(?:\/)?manifest\.json(?:\?v=[^"]*)?">/gi
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
  PATTERNS.forEach((re) => {
    next = next.replace(re, ICON_BLOCK);
  });
  if (next !== html) {
    fs.writeFileSync(file, next);
    changed++;
  }
});

console.log('sync-icon-head: ' + changed + ' HTML actualizados.');
