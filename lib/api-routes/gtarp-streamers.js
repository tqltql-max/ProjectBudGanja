'use strict';

const { jsonResponse } = require('./_helpers.js');
const { getAdminSession } = require('../admin-access.js');
const { getClientKey, createRateLimiter } = require('../rate-limit.js');
const {
  submitApplication,
  listAdminApplications,
  getAdminApplication,
  approveApplication,
  rejectApplication
} = require('../gtarp-streamers-service.js');

const applyLimiter = createRateLimiter({
  prefix: 'gtarp-apply',
  windowMs: 60 * 60 * 1000,
  maxAttempts: 4
});

async function match(ctx) {
  const { url, method, store, cookie, bodyRaw, headers, req, root } = ctx;
  const query = ctx.req.query ? new URLSearchParams(ctx.req.query) : new URLSearchParams();
  const base = root || process.cwd();

  if (url === '/api/gtarp/apply' && method === 'POST') {
    const clientKey = getClientKey(req, headers);
    if (applyLimiter.isLimited(clientKey)) {
      return jsonResponse(429, { error: 'Muitas candidaturas. Tenta mais tarde.' });
    }
    let payload;
    try {
      payload = JSON.parse(bodyRaw || '{}');
    } catch (e) {
      return jsonResponse(400, { error: 'Pedido inválido.' });
    }
    try {
      const result = await submitApplication(base, payload);
      if (!result.ok) {
        applyLimiter.record(clientKey);
        return jsonResponse(result.status || 400, { error: result.error });
      }
      applyLimiter.record(clientKey);
      return jsonResponse(result.status || 201, { ok: true, application: result.application || null });
    } catch (e) {
      console.error('[gtarp/apply]', e && e.stack ? e.stack : e);
      return jsonResponse(500, { error: 'Não foi possível enviar a candidatura.' });
    }
  }

  if (url === '/api/admin/gtarp-streamers' && method === 'GET') {
    const admin = await getAdminSession(store, cookie);
    if (!admin) return jsonResponse(401, { error: 'authentication required' });
    const status = query.get('status') || '';
    const list = await listAdminApplications(base, status || null);
    return jsonResponse(200, { ok: true, applications: list });
  }

  const detail = url.match(/^\/api\/admin\/gtarp-streamers\/([^/]+)$/);
  if (detail && method === 'GET') {
    const admin = await getAdminSession(store, cookie);
    if (!admin) return jsonResponse(401, { error: 'authentication required' });
    const application = await getAdminApplication(base, decodeURIComponent(detail[1]));
    if (!application) return jsonResponse(404, { error: 'Candidatura não encontrada.' });
    return jsonResponse(200, { ok: true, application });
  }

  const approve = url.match(/^\/api\/admin\/gtarp-streamers\/([^/]+)\/approve$/);
  if (approve && method === 'POST') {
    const admin = await getAdminSession(store, cookie);
    if (!admin) return jsonResponse(401, { error: 'authentication required' });
    let payload = {};
    try {
      payload = JSON.parse(bodyRaw || '{}');
    } catch (e) {
      return jsonResponse(400, { error: 'Pedido inválido.' });
    }
    const result = await approveApplication(base, decodeURIComponent(approve[1]), payload);
    if (!result.ok) return jsonResponse(result.status || 400, { error: result.error });
    return jsonResponse(200, { ok: true, application: result.application, character: result.character });
  }

  const reject = url.match(/^\/api\/admin\/gtarp-streamers\/([^/]+)\/reject$/);
  if (reject && method === 'POST') {
    const admin = await getAdminSession(store, cookie);
    if (!admin) return jsonResponse(401, { error: 'authentication required' });
    let payload = {};
    try {
      payload = JSON.parse(bodyRaw || '{}');
    } catch (e) {
      return jsonResponse(400, { error: 'Pedido inválido.' });
    }
    const result = await rejectApplication(base, decodeURIComponent(reject[1]), payload.reviewerNote || payload.note);
    if (!result.ok) return jsonResponse(result.status || 400, { error: result.error });
    return jsonResponse(200, { ok: true, application: result.application });
  }

  return null;
}

module.exports = { match };
