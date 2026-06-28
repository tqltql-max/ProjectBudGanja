'use strict';

/**
 * Valida Digital Asset Links para TWA Android.
 * Uso: npm run check:assetlinks
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

const configPath = path.join(ROOT, 'deploy', 'android', 'assetlinks.config.json');
const outPath = path.join(ROOT, '.well-known', 'assetlinks.json');

function loadJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    return null;
  }
}

let ok = true;

const config = loadJson(configPath);
const built = loadJson(outPath);

if (!config) {
  console.error('FAIL: deploy/android/assetlinks.config.json ausente ou inválido');
  process.exit(1);
}

const fps = (config.sha256CertFingerprints || []).filter(Boolean);
if (!fps.length) {
  console.warn('AVISO: sha256CertFingerprints vazio — TWA não verificará o domínio.');
  console.warn('  → .\\deploy\\android\\init-twa.ps1');
  console.warn('  → .\\deploy\\android\\get-signing-fingerprint.ps1');
  console.warn('  → npm run build');
  ok = false;
} else {
  console.log('OK  config:', fps.length, 'fingerprint(s) · package', config.packageName);
}

if (!built || !Array.isArray(built) || !built.length) {
  console.error('FAIL: .well-known/assetlinks.json ausente — rode npm run build');
  process.exit(1);
}

const builtFps = built[0] && built[0].target && built[0].target.sha256_cert_fingerprints;
if (!builtFps || !builtFps.length) {
  console.warn('AVISO: assetlinks.json publicado sem fingerprints');
  ok = false;
} else {
  console.log('OK  publicado:', builtFps.length, 'fingerprint(s)');
}

process.exit(ok ? 0 : 1);
