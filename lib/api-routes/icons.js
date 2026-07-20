'use strict';

const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');
const { jsonResponse } = require('./_helpers.js');
const { getAdminSession } = require('../admin-access.js');

const ROOT = path.resolve(__dirname, '..', '..');
const ICONSITE_PATH = path.join(ROOT, 'imagens', 'iconsite.png');
const ASSET_VERSION_PATH = path.join(ROOT, 'lib', 'asset-version.js');
const MAX_ICON_BYTES = 8 * 1024 * 1024; // 8 MB

/** Ficheiros gerados por scripts/generate-pwa-icons.js — cobrem site, Google e PWA. */
const GENERATED_ICON_FILES = [
  'imagens/iconsite.png',
  'imagens/icon-192.png',
  'imagens/icon-512.png',
  'imagens/icon-512-maskable.png',
  'imagens/apple-touch-icon.png',
  'imagens/app-icon.png',
  'imagens/favicon-48.png',
  'imagens/favicon-32.png',
  'imagens/favicon-16.png',
  'favicon.svg',
  'favicon.ico'
];

function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    execFile(process.execPath, [scriptPath], { cwd: ROOT, timeout: 90000 }, (err, stdout, stderr) => {
      if (err) return reject(new Error((stderr || err.message || 'script falhou').slice(0, 500)));
      resolve(stdout);
    });
  });
}

function readCurrentVersion() {
  try {
    const src = fs.readFileSync(ASSET_VERSION_PATH, 'utf8');
    const m = src.match(/ASSET_VERSION\s*=\s*'(\d+)'/);
    return m ? parseInt(m[1], 10) : 208;
  } catch (e) {
    return 208;
  }
}

function bumpVersion(newVersion) {
  let src = fs.readFileSync(ASSET_VERSION_PATH, 'utf8');
  src = src.replace(/(ASSET_VERSION\s*=\s*')[^']*(')/, `$1${newVersion}$2`);
  fs.writeFileSync(ASSET_VERSION_PATH, src, 'utf8');
}

function iconUrls(version) {
  const v = String(version);
  return {
    iconsite: `/imagens/iconsite.png?v=${v}`,
    icon192: `/imagens/icon-192.png?v=${v}`,
    icon512: `/imagens/icon-512.png?v=${v}`,
    icon512Maskable: `/imagens/icon-512-maskable.png?v=${v}`,
    appleTouch: `/imagens/apple-touch-icon.png?v=${v}`,
    appIcon: `/imagens/app-icon.png?v=${v}`,
    favicon48: `/imagens/favicon-48.png?v=${v}`,
    favicon32: `/imagens/favicon-32.png?v=${v}`,
    favicon16: `/imagens/favicon-16.png?v=${v}`,
    favicon: `/imagens/favicon-48.png?v=${v}`,
    faviconIco: `/favicon.ico?v=${v}`,
    faviconSvg: `/favicon.svg?v=${v}`
  };
}

function verifyGeneratedFiles() {
  const missing = [];
  for (const rel of GENERATED_ICON_FILES) {
    if (!fs.existsSync(path.join(ROOT, rel))) missing.push(rel);
  }
  return missing;
}

async function match(ctx) {
  const { url, method, cookie, store, bodyRaw, root } = ctx;

  // GET /api/admin/icons — devolve versão atual e URLs dos ícones
  if (url === '/api/admin/icons' && method === 'GET') {
    const session = await getAdminSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    const version = readCurrentVersion();
    return jsonResponse(200, {
      version,
      icons: iconUrls(version),
      covers: {
        siteTab: ['favicon48', 'faviconIco', 'faviconSvg', 'icon192'],
        googleSearch: ['favicon48', 'icon192', 'faviconIco'],
        pwaApp: ['icon192', 'icon512', 'icon512Maskable', 'appleTouch', 'appIcon'],
        headerLogo: ['appIcon']
      },
      generatedFiles: GENERATED_ICON_FILES,
      missing: verifyGeneratedFiles()
    });
  }

  // POST /api/admin/update-icons — recebe PNG, regenera ícones, bump versão
  if (url === '/api/admin/update-icons' && method === 'POST') {
    if (!root) return jsonResponse(503, { error: 'Disponível apenas no servidor local.' });

    const session = await getAdminSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });

    let payload;
    try {
      payload = JSON.parse(bodyRaw || '{}');
    } catch (e) {
      return jsonResponse(400, { error: 'payload inválido' });
    }

    const data = String(payload.data || '');
    if (!data) return jsonResponse(400, { error: 'imagem em falta' });

    const m = data.match(/^data:(image\/(?:png|jpeg|jpg|webp));base64,(.+)$/i);
    if (!m) return jsonResponse(400, { error: 'formato inválido — use PNG, JPG ou WebP' });

    const buf = Buffer.from(m[2], 'base64');
    if (buf.length > MAX_ICON_BYTES) return jsonResponse(413, { error: 'imagem muito grande (máx. 8 MB)' });
    if (buf.length < 100) return jsonResponse(400, { error: 'imagem inválida' });

    // Guardar como iconsite.png (fonte do gerador)
    fs.writeFileSync(ICONSITE_PATH, buf);

    // Regenerar todos os ícones (site / Google / PWA / header)
    try {
      await runScript(path.join(ROOT, 'scripts', 'generate-pwa-icons.js'));
    } catch (e) {
      return jsonResponse(500, { error: 'Erro ao gerar ícones: ' + e.message });
    }

    const missingAfterGenerate = verifyGeneratedFiles();
    if (missingAfterGenerate.length) {
      return jsonResponse(500, {
        error: 'Geração incompleta — ficheiros em falta: ' + missingAfterGenerate.join(', ')
      });
    }

    // Bump versão (cache-bust browser / Cloudflare / SW)
    const newVersion = readCurrentVersion() + 1;
    bumpVersion(newVersion);

    // Versiona HTML, layout.js, sw.js, version.json, og:image
    try {
      await runScript(path.join(ROOT, 'scripts', 'stamp-assets.js'));
    } catch (e) {
      return jsonResponse(500, { error: 'Erro ao atualizar versão: ' + e.message });
    }

    // Garante bloco completo de ícones no <head> (inclui posts)
    try {
      await runScript(path.join(ROOT, 'scripts', 'sync-icon-head.js'));
    } catch (e) {
      return jsonResponse(500, { error: 'Erro ao sincronizar head dos ícones: ' + e.message });
    }

    return jsonResponse(200, {
      ok: true,
      version: newVersion,
      icons: iconUrls(newVersion),
      updated: {
        siteTab: true,
        googleSearch: true,
        pwaApp: true,
        headerLogo: true,
        files: GENERATED_ICON_FILES
      },
      note: 'Google Search pode demorar dias a refrescar o favicon (cache deles). Site, aba e PWA actualizam já após Ctrl+F5 / reinstalar atalho.'
    });
  }

  return null;
}

module.exports = { match };
