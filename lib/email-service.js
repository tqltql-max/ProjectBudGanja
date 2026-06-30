'use strict';

const crypto = require('crypto');
const { sendSmtpMail } = require('./smtp-send.js');
const { renderEmailTemplate } = require('./email-templates.js');

const INSPECTOR_EMAIL = () =>
  String(process.env.NOTIFY_EMAIL || process.env.CONTACT_EMAIL || 'inspetorbudganja@gmail.com').trim();

function getSmtpCredentials() {
  const user = String(process.env.GMAIL_USER || process.env.SMTP_USER || '').trim();
  const pass = String(process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || '').trim();
  return { user, pass, configured: !!(user && pass) };
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeEmailId() {
  return 'em-' + Date.now().toString(36) + '-' + crypto.randomBytes(4).toString('hex');
}

async function sendRawEmail({ to, subject, text }) {
  const { user, pass, configured } = getSmtpCredentials();
  if (!configured) {
    return { sent: false, reason: 'smtp_not_configured' };
  }
  if (!isValidEmail(to)) {
    return { sent: false, reason: 'invalid_email' };
  }
  try {
    await sendSmtpMail({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 587),
      user,
      pass,
      from: user,
      to: normalizeEmail(to),
      subject: String(subject || '').trim(),
      text: String(text || '')
    });
    return { sent: true };
  } catch (e) {
    console.error('[email] falha SMTP para', to, ':', e.message);
    return { sent: false, error: e.message };
  }
}

async function deliverRenderedEmail(job, rendered) {
  return sendRawEmail({
    to: job.toEmail,
    subject: rendered.subject || job.subject,
    text: rendered.text
  });
}

async function enqueueEmail(store, options) {
  const template = String(options.template || '').trim();
  const toEmail = normalizeEmail(options.to);
  const toName = String(options.toName || '').trim();
  const vars = options.vars && typeof options.vars === 'object' ? options.vars : {};
  const idempotencyKey = String(options.idempotencyKey || '').trim() || null;

  if (!template) return { ok: false, error: 'template_required' };
  if (!isValidEmail(toEmail)) return { ok: false, error: 'invalid_email' };

  let rendered;
  try {
    rendered = renderEmailTemplate(template, vars);
  } catch (e) {
    return { ok: false, error: e.message };
  }

  if (!store || !store.enqueueEmail) {
    const result = await sendRawEmail({
      to: toEmail,
      subject: rendered.subject,
      text: rendered.text
    });
    return Object.assign({ ok: result.sent, queued: false, inline: true }, result);
  }

  if (idempotencyKey && store.findEmailByIdempotencyKey) {
    const existing = await store.findEmailByIdempotencyKey(idempotencyKey);
    if (existing) {
      return { ok: true, queued: false, duplicate: true, job: existing };
    }
  }

  const job = {
    id: makeEmailId(),
    template,
    toEmail,
    toName,
    subject: rendered.subject,
    payload: vars,
    status: 'pending',
    idempotencyKey,
    createdAt: new Date().toISOString()
  };

  await store.enqueueEmail(job);
  return { ok: true, queued: true, job };
}

async function processEmailQueue(store, options) {
  const limit = Math.max(1, Math.min(Number(options && options.limit) || 20, 100));
  const delayMs = Math.max(0, Number(options && options.delayMs) || 350);

  if (!store || !store.listPendingEmails) {
    return { ok: false, error: 'queue_not_available', processed: 0, sent: 0, failed: 0 };
  }

  if (!getSmtpCredentials().configured) {
    return { ok: false, error: 'smtp_not_configured', processed: 0, sent: 0, failed: 0 };
  }

  const jobs = await store.listPendingEmails(limit);
  let sent = 0;
  let failed = 0;

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    let rendered;
    try {
      rendered = renderEmailTemplate(job.template, job.payload);
    } catch (e) {
      await store.markEmailFailed(job.id, e.message, job.attempts);
      failed += 1;
      continue;
    }

    const result = await deliverRenderedEmail(job, rendered);
    if (result.sent) {
      await store.markEmailSent(job.id);
      sent += 1;
    } else {
      const status = await store.markEmailFailed(job.id, result.error || result.reason, job.attempts);
      if (status === 'failed') failed += 1;
    }

    if (i < jobs.length - 1 && delayMs > 0) {
      await sleep(delayMs);
    }
  }

  return {
    ok: true,
    processed: jobs.length,
    sent,
    failed,
    remaining: (await store.getEmailQueueStats()).pending
  };
}

async function sendWelcomeEmail(store, user) {
  if (!user || !user.email) return { ok: false, error: 'no_user' };
  const name = String(user.name || user.profile?.displayName || '').trim();
  const result = await enqueueEmail(store, {
    template: 'welcome',
    to: user.email,
    toName: name,
    vars: { name, email: user.email },
    idempotencyKey: 'welcome:' + user.id
  });
  if (result.queued && !result.duplicate) {
    processEmailQueue(store, { limit: 3, delayMs: 0 }).catch((e) => {
      console.error('[email] welcome process failed:', e.message);
    });
  } else if (!result.queued && result.inline) {
    return result;
  }
  return result;
}

async function notifyInspector(template, vars, idempotencyKey) {
  return enqueueEmail(null, {
    template,
    to: INSPECTOR_EMAIL(),
    toName: 'Inspetor BudGanja',
    vars,
    idempotencyKey
  });
}

function sorteioBroadcastKey(config, email) {
  const titulo = String(config && config.titulo || '').trim();
  const data = String(config && config.dataSorteio || '').trim();
  const hash = crypto.createHash('sha1').update(titulo + '|' + data).digest('hex').slice(0, 12);
  return 'sorteio:' + hash + ':' + normalizeEmail(email);
}

module.exports = {
  getSmtpCredentials,
  sendRawEmail,
  enqueueEmail,
  processEmailQueue,
  sendWelcomeEmail,
  notifyInspector,
  sorteioBroadcastKey,
  normalizeEmail,
  isValidEmail,
  INSPECTOR_EMAIL
};
