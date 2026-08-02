'use strict';

const path = require('path');

const MAX_IMAGE_BYTES = Math.floor(3.5 * 1024 * 1024);
const MAX_FILES_PER_USER = 200;
const ALLOWED_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);
const MIME_TO_EXT = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/pjpeg': '.jpg',
  'image/webp': '.webp',
  'image/gif': '.gif'
};

function safeUserFolderId(userId) {
  return String(userId || 'user').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64) || 'user';
}

function userImagesPrefix(userId) {
  return 'users/' + safeUserFolderId(userId) + '/';
}

function publicUrlFor(relPath) {
  return '/uploads/' + String(relPath || '').replace(/\\/g, '/');
}

function basenameSafe(name) {
  return path.basename(String(name || '')).replace(/[^a-zA-Z0-9._-]/g, '_');
}

function isOwnedImageUrl(photoUrl, userId) {
  const prefix = '/uploads/' + userImagesPrefix(userId);
  return String(photoUrl || '').startsWith(prefix);
}

function parseDataImage(dataUrl) {
  const data = String(dataUrl || '');
  const m = data.match(/^data:(image\/(?:png|jpeg|jpg|pjpeg|webp|gif));base64,(.+)$/i);
  if (!m) return null;
  const mime = m[1].toLowerCase();
  const buf = Buffer.from(m[2], 'base64');
  const ext = MIME_TO_EXT[mime] || '.jpg';
  return { mime, buf, ext };
}

async function ensureUserImagesFolder(store, userId) {
  const prefix = userImagesPrefix(userId);
  const keepName = prefix + '.keep';
  if (typeof store.getUpload === 'function') {
    const existing = await store.getUpload(keepName);
    if (existing) return { ok: true, prefix, folderUrl: publicUrlFor(prefix) };
  }
  if (typeof store.saveUpload === 'function') {
    await store.saveUpload(keepName, Buffer.from(''));
  }
  return { ok: true, prefix, folderUrl: publicUrlFor(prefix) };
}

async function listUserImages(store, userId) {
  await ensureUserImagesFolder(store, userId);
  const prefix = userImagesPrefix(userId);
  if (typeof store.listUploads !== 'function') {
    return { ok: true, folderUrl: publicUrlFor(prefix), items: [] };
  }
  const names = await store.listUploads(prefix);
  const items = (names || [])
    .filter((name) => {
      const base = path.basename(String(name || ''));
      if (!base || base === '.keep') return false;
      const ext = path.extname(base).toLowerCase();
      return ALLOWED_EXT.has(ext);
    })
    .map((name) => {
      const rel = String(name).replace(/\\/g, '/');
      return {
        name: path.basename(rel),
        url: publicUrlFor(rel),
        path: rel
      };
    })
    .sort((a, b) => String(b.name).localeCompare(String(a.name)));
  return { ok: true, folderUrl: publicUrlFor(prefix), items };
}

async function saveUserImage(store, userId, payload) {
  const parsed = parseDataImage(payload && payload.data);
  if (!parsed) {
    return { ok: false, status: 400, error: 'Formato de imagem inválido.' };
  }
  if (parsed.buf.length > MAX_IMAGE_BYTES) {
    return { ok: false, status: 413, error: 'Imagem muito grande (máx. 3,5 MB).' };
  }

  const listed = await listUserImages(store, userId);
  if (listed.items.length >= MAX_FILES_PER_USER) {
    return { ok: false, status: 400, error: 'Limite de imagens na pasta pessoal atingido.' };
  }

  const prefix = userImagesPrefix(userId);
  const label = basenameSafe(payload && payload.filename);
  const base = label
    ? path.basename(label, path.extname(label)).slice(0, 48) || 'imagem'
    : 'imagem';
  const uniqueName = prefix + base + '-' + Date.now() + parsed.ext;
  const url = await store.saveUpload(uniqueName, parsed.buf);
  return {
    ok: true,
    status: 201,
    item: {
      name: path.basename(uniqueName),
      url,
      path: uniqueName
    }
  };
}

async function deleteUserImage(store, userId, fileName) {
  const base = basenameSafe(fileName);
  if (!base || base === '.keep') {
    return { ok: false, status: 400, error: 'Nome de ficheiro inválido.' };
  }
  const rel = userImagesPrefix(userId) + base;
  if (typeof store.deleteUpload !== 'function') {
    return { ok: false, status: 500, error: 'Eliminação não disponível.' };
  }
  const removed = await store.deleteUpload(rel);
  if (!removed) {
    return { ok: false, status: 404, error: 'Imagem não encontrada.' };
  }
  return { ok: true };
}

async function importUploadIntoUserImages(store, userId, sourceUploadPath, preferredName) {
  const src = String(sourceUploadPath || '').replace(/^\/uploads\//, '').replace(/\\/g, '/');
  if (!src || src.includes('..')) {
    return { ok: false, error: 'Caminho de origem inválido.' };
  }
  const file = await store.getUpload(src);
  if (!file || !file.buffer) {
    return { ok: false, error: 'Ficheiro de origem em falta: ' + src };
  }
  const ext = path.extname(src).toLowerCase() || '.jpg';
  if (!ALLOWED_EXT.has(ext)) {
    return { ok: false, error: 'Tipo de ficheiro não suportado: ' + ext };
  }
  const prefix = userImagesPrefix(userId);
  const label = basenameSafe(preferredName || path.basename(src));
  const base = path.basename(label, path.extname(label)).slice(0, 48) || 'feed';
  const uniqueName = prefix + base + ext;
  // Avoid overwrite collisions by adding timestamp if needed.
  let target = uniqueName;
  if (typeof store.getUpload === 'function') {
    const exists = await store.getUpload(target);
    if (exists) {
      target = prefix + base + '-' + Date.now() + ext;
    }
  }
  const url = await store.saveUpload(target, file.buffer);
  return { ok: true, url, path: target };
}

module.exports = {
  safeUserFolderId,
  userImagesPrefix,
  isOwnedImageUrl,
  ensureUserImagesFolder,
  listUserImages,
  saveUserImage,
  deleteUserImage,
  importUploadIntoUserImages
};
