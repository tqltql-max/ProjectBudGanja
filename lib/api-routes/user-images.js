'use strict';

const { jsonResponse } = require('./_helpers.js');
const { getUserSession } = require('../user-auth-service.js');
const {
  ensureUserImagesFolder,
  listUserImages,
  saveUserImage,
  deleteUserImage
} = require('../user-images-service.js');
const { createRateLimiter } = require('../rate-limit.js');

const userImagesLimiter = createRateLimiter({
  prefix: 'user-images',
  windowMs: 60 * 60 * 1000,
  maxAttempts: 40
});

function getClientKey(req, headers) {
  const xf = headers['x-forwarded-for'] || headers['X-Forwarded-For'];
  if (xf) return String(xf).split(',')[0].trim();
  return (req && req.socket && req.socket.remoteAddress) || 'local';
}

async function match(ctx) {
  const { url, method, store, cookie, bodyRaw, req, headers } = ctx;

  if (url === '/api/user/images' && method === 'GET') {
    const session = await getUserSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    await ensureUserImagesFolder(store, session.userId);
    const result = await listUserImages(store, session.userId);
    return jsonResponse(200, {
      ok: true,
      folderUrl: result.folderUrl,
      items: result.items
    });
  }

  if (url === '/api/user/images' && method === 'POST') {
    const session = await getUserSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    const key = getClientKey(req, headers) + ':' + session.userId;
    if (userImagesLimiter.isLimited(key)) {
      return jsonResponse(429, { error: 'Limite de envio atingido. Tente mais tarde.' });
    }
    let payload;
    try {
      payload = JSON.parse(bodyRaw || '{}');
    } catch (e) {
      return jsonResponse(400, { error: 'Pedido inválido.' });
    }
    const result = await saveUserImage(store, session.userId, payload);
    if (!result.ok) {
      return jsonResponse(result.status || 400, { error: result.error });
    }
    userImagesLimiter.record(key);
    return jsonResponse(result.status || 201, { ok: true, item: result.item });
  }

  if (url === '/api/user/images' && method === 'DELETE') {
    const session = await getUserSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    let payload;
    try {
      payload = JSON.parse(bodyRaw || '{}');
    } catch (e) {
      return jsonResponse(400, { error: 'Pedido inválido.' });
    }
    const result = await deleteUserImage(store, session.userId, payload && payload.name);
    if (!result.ok) {
      return jsonResponse(result.status || 400, { error: result.error });
    }
    return jsonResponse(200, { ok: true });
  }

  return null;
}

module.exports = { match };
