'use strict';

const { jsonResponse } = require('./_helpers.js');
const { getAdminSession } = require('../admin-access.js');
const {
  getSmtpCredentials,
  processEmailQueue
} = require('../email-service.js');
const { renderEmailTemplate, listEmailTemplates } = require('../email-templates.js');

async function match(ctx) {
  const { url, method, store, bodyRaw } = ctx;

  if (url === '/api/admin/email/status' && method === 'GET') {
    const admin = await getAdminSession(store, ctx.cookie);
    if (!admin) return jsonResponse(401, { error: 'authentication required' });
    const smtp = getSmtpCredentials();
    const stats = store.getEmailQueueStats ? await store.getEmailQueueStats() : null;
    const recent = store.listRecentEmails ? await store.listRecentEmails(15) : [];
    return jsonResponse(200, {
      ok: true,
      smtp: { configured: smtp.configured, user: smtp.user ? smtp.user.replace(/(.{2}).+(@.+)/, '$1…$2') : '' },
      queueAvailable: !!store.listPendingEmails,
      stats: stats || { pending: 0, sent: 0, failed: 0, total: 0 },
      templates: listEmailTemplates(),
      recent
    });
  }

  if (url === '/api/admin/email/process' && method === 'POST') {
    const admin = await getAdminSession(store, ctx.cookie);
    if (!admin) return jsonResponse(401, { error: 'authentication required' });
    let limit = 20;
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      if (payload.limit != null) limit = Number(payload.limit);
    } catch (e) { /* ignore */ }
    const result = await processEmailQueue(store, { limit, delayMs: 350 });
    if (!result.ok && result.error === 'smtp_not_configured') {
      return jsonResponse(503, {
        error: 'E-mail não configurado. Defina GMAIL_USER e GMAIL_APP_PASSWORD no .env e reinicie o servidor.'
      });
    }
    return jsonResponse(result.ok ? 200 : 500, result);
  }

  if (url === '/api/admin/email/preview' && method === 'POST') {
    const admin = await getAdminSession(store, ctx.cookie);
    if (!admin) return jsonResponse(401, { error: 'authentication required' });
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const template = String(payload.template || 'welcome').trim();
      const vars = payload.vars && typeof payload.vars === 'object' ? payload.vars : { name: 'Cultivador Teste' };
      const rendered = renderEmailTemplate(template, vars);
      return jsonResponse(200, { ok: true, template, rendered });
    } catch (e) {
      return jsonResponse(400, { error: e.message || 'Pedido inválido.' });
    }
  }

  return null;
}

module.exports = { match };
