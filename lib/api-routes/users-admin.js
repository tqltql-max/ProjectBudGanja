'use strict';

const { jsonResponse } = require('./_helpers.js');
const { getAdminSession } = require('../admin-access.js');
const {
  listUsersForAdmin,
  getUserDetailForAdmin,
  setUserAdmin
} = require('../users-admin-service.js');

async function match(ctx) {
  const { url, method, store, cookie, bodyRaw } = ctx;
  const query = ctx.req.query ? new URLSearchParams(ctx.req.query) : new URLSearchParams();

  if (url === '/api/admin/users' && method === 'GET') {
    const admin = await getAdminSession(store, cookie);
    if (!admin) return jsonResponse(401, { error: 'authentication required' });
    const q = query.get('q') || '';
    const result = await listUsersForAdmin(store, q);
    if (!result.ok) return jsonResponse(result.status || 500, { error: result.error });
    return jsonResponse(200, { ok: true, users: result.users, total: result.total });
  }

  const detailMatch = url.match(/^\/api\/admin\/users\/([^/]+)$/);
  if (detailMatch && method === 'GET') {
    const admin = await getAdminSession(store, cookie);
    if (!admin) return jsonResponse(401, { error: 'authentication required' });
    const id = decodeURIComponent(detailMatch[1]);
    const result = await getUserDetailForAdmin(store, id);
    if (!result.ok) return jsonResponse(result.status || 404, { error: result.error });
    return jsonResponse(200, { ok: true, user: result.user });
  }

  const patchMatch = url.match(/^\/api\/admin\/users\/([^/]+)\/admin$/);
  if (patchMatch && method === 'POST') {
    const admin = await getAdminSession(store, cookie);
    if (!admin) return jsonResponse(401, { error: 'authentication required' });
    try {
      const id = decodeURIComponent(patchMatch[1]);
      const payload = JSON.parse(bodyRaw || '{}');
      const result = await setUserAdmin(store, id, !!payload.isAdmin, admin);
      if (!result.ok) return jsonResponse(result.status || 500, { error: result.error });
      return jsonResponse(200, { ok: true, user: result.user });
    } catch (e) {
      return jsonResponse(400, { error: 'Pedido inválido.' });
    }
  }

  return null;
}

module.exports = { match };
