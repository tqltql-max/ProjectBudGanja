'use strict';

const { jsonResponse } = require('./_helpers.js');
const { getAdminSession } = require('../admin-access.js');

async function match(ctx) {
  const { url, method, store, cookie, bodyRaw } = ctx;

  // GET /api/series — público, com filtro opcional por categoria
  if (url.startsWith('/api/series') && method === 'GET') {
    const qs = ctx.req.query || '';
    const category = qs ? new URLSearchParams(qs).get('category') : null;
    const all = await store.getSeriesOptions();
    const list = category ? all.filter((s) => s.category === category) : all;
    return jsonResponse(200, list);
  }

  // POST /api/series — criar série (admin)
  if (url === '/api/series' && method === 'POST') {
    const session = await getAdminSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const id = String(payload.id || '').trim().toLowerCase().replace(/\s+/g, '-');
      const label = String(payload.label || '').trim();
      const category = String(payload.category || 'inspecao').trim();
      const sortOrder = Number(payload.sortOrder) || 0;
      if (!id || !label) return jsonResponse(400, { error: 'id and label required' });
      await store.upsertSeriesOption({ id, label, category, sortOrder });
      return jsonResponse(201, { ok: true, id });
    } catch (e) {
      return jsonResponse(400, { error: 'invalid payload' });
    }
  }

  // PUT /api/series/:id — actualizar série (admin)
  const putMatch = url.match(/^\/api\/series\/([^/]+)$/);
  if (putMatch && method === 'PUT') {
    const session = await getAdminSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    try {
      const id = decodeURIComponent(putMatch[1]);
      const payload = JSON.parse(bodyRaw || '{}');
      const label = String(payload.label || '').trim();
      const category = String(payload.category || 'inspecao').trim();
      const sortOrder = Number(payload.sortOrder) || 0;
      if (!label) return jsonResponse(400, { error: 'label required' });
      await store.upsertSeriesOption({ id, label, category, sortOrder });
      return jsonResponse(200, { ok: true, id });
    } catch (e) {
      return jsonResponse(400, { error: 'invalid payload' });
    }
  }

  // DELETE /api/series/:id — remover série (admin)
  const delMatch = url.match(/^\/api\/series\/([^/]+)$/);
  if (delMatch && method === 'DELETE') {
    const session = await getAdminSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    const id = decodeURIComponent(delMatch[1]);
    await store.deleteSeriesOption(id);
    return jsonResponse(200, { ok: true });
  }

  return null;
}

module.exports = { match };
