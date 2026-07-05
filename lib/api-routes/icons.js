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

function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    execFile(process.execPath, [scriptPath], { cwd: ROOT, timeout: 60000 }, (err, stdout, stderr) => {
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
  src = src.replace(/(ASSET_VERSION\s*=\s*')[^']*(')/,  `$1${newVersion}$2`);
  fs.writeFileSync(ASSET_VERSION_PATH, src, 'utf8');
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
      icons: {
        iconsite: `/imagens/iconsite.png?v=${version}`,
        icon192: `/imagens/icon-192.png?v=${version}`,
        icon512: `/imagens/icon-512.png?v=${version}`,
        favicon: `/favicon.svg?v=${version}`
      }
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

    // Guardar como iconsite.png (o build script usa este ficheiro como fonte)
    fs.writeFileSync(ICONSITE_PATH, buf);

    // Regenerar todos os ícones
    try {
      await runScript(path.join(ROOT, 'scripts', 'generate-pwa-icons.js'));
    } catch (e) {
      return jsonResponse(500, { error: 'Erro ao gerar ícones: ' + e.message });
    }

    // Bump versão
    const newVersion = readCurrentVersion() + 1;
    bumpVersion(newVersion);

    // Aplicar stamp (versiona HTML, manifest, sw.js)
    try {
      await runScript(path.join(ROOT, 'scripts', 'stamp-assets.js'));
    } catch (e) {
      return jsonResponse(500, { error: 'Erro ao atualizar versão: ' + e.message });
    }

    return jsonResponse(200, {
      ok: true,
      version: newVersion,
      icons: {
        iconsite: `/imagens/iconsite.png?v=${newVersion}`,
        icon192: `/imagens/icon-192.png?v=${newVersion}`,
        icon512: `/imagens/icon-512.png?v=${newVersion}`,
        favicon: `/favicon.svg?v=${newVersion}`
      }
    });
  }

  return null;
}

module.exports = { match };
