'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');

const CONFIG_PATH = path.join(ROOT, 'deploy', 'android', 'assetlinks.config.json');
const OUT_DIR = path.join(ROOT, '.well-known');
const OUT_FILE = path.join(OUT_DIR, 'assetlinks.json');

function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.warn('build-assetlinks: config ausente em deploy/android/assetlinks.config.json');
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  } catch (e) {
    console.warn('build-assetlinks: JSON inválido —', e.message);
    return null;
  }
}

function normalizeFingerprint(value) {
  return String(value || '')
    .trim()
    .replace(/:/g, '')
    .toUpperCase()
    .replace(/(.{2})(?=.)/g, '$1:');
}

function main() {
  const config = loadConfig();
  if (!config) return;

  const packageName = String(config.packageName || '').trim();
  const fingerprints = (config.sha256CertFingerprints || [])
    .map(normalizeFingerprint)
    .filter(Boolean);

  if (!packageName) {
    console.warn('build-assetlinks: packageName vazio — ignorado.');
    return;
  }

  const payload = [{
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: packageName,
      sha256_cert_fingerprints: fingerprints
    }
  }];

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(payload, null, 2) + '\n', 'utf8');

  if (!fingerprints.length) {
    console.warn(
      'build-assetlinks: .well-known/assetlinks.json gerado SEM fingerprints.\n' +
      '  → Gere o keystore (deploy/android/init-twa.ps1) e execute deploy/android/get-signing-fingerprint.ps1\n' +
      '  → Cole o SHA-256 em deploy/android/assetlinks.config.json e rode npm run build'
    );
    return;
  }

  console.log('assetlinks.json: package', packageName, '·', fingerprints.length, 'fingerprint(s)');
}

main();
