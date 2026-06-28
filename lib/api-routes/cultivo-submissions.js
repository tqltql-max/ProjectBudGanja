'use strict';

const { jsonResponse } = require('./_helpers.js');
const { getAdminSession } = require('../admin-access.js');
const { getUserSession } = require('../user-auth-service.js');
const {
  submitGrowForPublication,
  listUserSubmissions,
  listAdminSubmissions,
  getSubmissionForAdmin,
  approveSubmission,
  rejectSubmission
} = require('../cultivo-submissions-service.js');

async function match(ctx) {
  const { url, method, store, cookie, bodyRaw, root, exportStaticFiles, triggerRebuild } = ctx;
  const query = ctx.req.query ? new URLSearchParams(ctx.req.query) : new URLSearchParams();

  if (url === '/api/cultivo/submit' && method === 'POST') {
    const session = await getUserSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const result = await submitGrowForPublication(store, session.userId, payload);
      if (!result.ok) {
        return jsonResponse(result.status || 400, { error: result.error, postSlug: result.postSlug });
      }
      return jsonResponse(result.status || 201, { ok: true, submission: result.submission });
    } catch (e) {
      return jsonResponse(400, { error: 'Pedido inválido.' });
    }
  }

  if (url === '/api/cultivo/submissions' && method === 'GET') {
    const session = await getUserSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    const growId = query.get('growId') || '';
    const list = await listUserSubmissions(store, session.userId, growId || null);
    return jsonResponse(200, { ok: true, submissions: list });
  }

  if (url === '/api/admin/cultivo-submissions' && method === 'GET') {
    const admin = await getAdminSession(store, cookie);
    if (!admin) return jsonResponse(401, { error: 'authentication required' });
    const status = query.get('status') || '';
    const list = await listAdminSubmissions(store, status || null);
    return jsonResponse(200, { ok: true, submissions: list });
  }

  const detailMatch = url.match(/^\/api\/admin\/cultivo-submissions\/([^/]+)$/);
  if (detailMatch && method === 'GET') {
    const admin = await getAdminSession(store, cookie);
    if (!admin) return jsonResponse(401, { error: 'authentication required' });
    const id = decodeURIComponent(detailMatch[1]);
    const submission = await getSubmissionForAdmin(store, id);
    if (!submission) return jsonResponse(404, { error: 'Submissão não encontrada.' });
    return jsonResponse(200, { ok: true, submission });
  }

  const approveMatch = url.match(/^\/api\/admin\/cultivo-submissions\/([^/]+)\/approve$/);
  if (approveMatch && method === 'POST') {
    const admin = await getAdminSession(store, cookie);
    if (!admin) return jsonResponse(401, { error: 'authentication required' });
    try {
      const id = decodeURIComponent(approveMatch[1]);
      const payload = JSON.parse(bodyRaw || '{}');
      const result = await approveSubmission(
        store,
        id,
        payload,
        exportStaticFiles,
        triggerRebuild,
        root
      );
      if (!result.ok) return jsonResponse(result.status || 500, { error: result.error });
      return jsonResponse(200, { ok: true, submission: result.submission, post: result.post });
    } catch (e) {
      return jsonResponse(400, { error: 'Pedido inválido.' });
    }
  }

  const rejectMatch = url.match(/^\/api\/admin\/cultivo-submissions\/([^/]+)\/reject$/);
  if (rejectMatch && method === 'POST') {
    const admin = await getAdminSession(store, cookie);
    if (!admin) return jsonResponse(401, { error: 'authentication required' });
    try {
      const id = decodeURIComponent(rejectMatch[1]);
      const payload = JSON.parse(bodyRaw || '{}');
      const result = await rejectSubmission(store, id, payload.note);
      if (!result.ok) return jsonResponse(result.status || 500, { error: result.error });
      return jsonResponse(200, { ok: true, submission: result.submission });
    } catch (e) {
      return jsonResponse(400, { error: 'Pedido inválido.' });
    }
  }

  return null;
}

module.exports = { match };
