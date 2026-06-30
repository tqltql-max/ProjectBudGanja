'use strict';

const {
  notifyInspectorNewAlertSubscriber,
  notifyInspectorBroadcastSummary
} = require('./mail-notify.js');
const {
  getSmtpCredentials,
  enqueueEmail,
  processEmailQueue,
  sorteioBroadcastKey
} = require('./email-service.js');

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

async function listAlertSubscribers(store) {
  if (!store.getSorteioAlertSubscribers) return [];
  const list = await store.getSorteioAlertSubscribers();
  return Array.isArray(list) ? list : [];
}

async function getAlertStatus(store, userId) {
  if (!store.getSorteioAlertSubscriber) return { subscribed: false };
  const row = await store.getSorteioAlertSubscriber(userId);
  return { subscribed: !!(row && row.active !== false) };
}

async function subscribeToSorteioAlerts(store, user) {
  if (!user || !user.id) {
    return { ok: false, status: 401, error: 'É necessário entrar com a conta Google.' };
  }

  const email = normalizeEmail(user.email);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, status: 400, error: 'A conta Google não tem um e-mail válido.' };
  }

  if (!store.subscribeSorteioAlert) {
    return { ok: false, status: 503, error: 'Servidor indisponível. Tente com o site em execução local.' };
  }

  const name = String(user.name || user.profile?.displayName || '').trim();
  const existing = store.getSorteioAlertSubscriber
    ? await store.getSorteioAlertSubscriber(user.id)
    : null;

  if (existing && existing.active !== false) {
    return {
      ok: true,
      status: 200,
      alreadySubscribed: true,
      subscriber: existing,
      message: 'Você já está inscrito para receber avisos de sorteios.'
    };
  }

  const subscriber = {
    userId: user.id,
    email,
    name,
    subscribedAt: new Date().toISOString(),
    active: true
  };

  await store.subscribeSorteioAlert(subscriber);

  let notify = { sent: false, reason: 'smtp_not_configured' };
  if (!existing) {
    notify = await notifyInspectorNewAlertSubscriber({ name, email });
  }

  return {
    ok: true,
    status: 201,
    alreadySubscribed: false,
    subscriber,
    notify,
    message: 'Pronto! Você receberá avisos quando abrirmos um novo sorteio.'
  };
}

async function unsubscribeFromSorteioAlerts(store, userId) {
  if (!userId) {
    return { ok: false, status: 401, error: 'É necessário entrar com a conta Google.' };
  }
  if (!store.unsubscribeSorteioAlert) {
    return { ok: false, status: 503, error: 'Servidor indisponível.' };
  }
  await store.unsubscribeSorteioAlert(userId);
  return { ok: true, status: 200, message: 'Inscrição em avisos cancelada.' };
}

async function broadcastSorteioAlerts(store, config) {
  if (!config || config.ativo !== true) {
    return {
      ok: false,
      status: 400,
      error: 'O sorteio precisa estar com inscrições abertas antes de enviar avisos.'
    };
  }

  const subscribers = await listAlertSubscribers(store);
  if (!subscribers.length) {
    return {
      ok: true,
      status: 200,
      sent: 0,
      failed: 0,
      total: 0,
      message: 'Não há ninguém inscrito na lista de avisos.'
    };
  }

  if (!getSmtpCredentials().configured) {
    return {
      ok: false,
      status: 503,
      error: 'E-mail não configurado. Defina GMAIL_USER e GMAIL_APP_PASSWORD no .env e reinicie o servidor.'
    };
  }

  let queued = 0;
  for (const sub of subscribers) {
    const result = await enqueueEmail(store, {
      template: 'sorteio_broadcast',
      to: sub.email,
      toName: sub.name,
      vars: { subscriber: sub, config },
      idempotencyKey: sorteioBroadcastKey(config, sub.email)
    });
    if (result.ok && !result.duplicate) queued += 1;
  }

  const processResult = await processEmailQueue(store, {
    limit: Math.max(queued, subscribers.length),
    delayMs: 400
  });

  const sent = processResult.sent || 0;
  const failed = processResult.failed || 0;

  await notifyInspectorBroadcastSummary({
    config,
    sent,
    failed,
    total: subscribers.length
  });

  return {
    ok: true,
    status: 200,
    sent,
    failed,
    total: subscribers.length,
    queued,
    message: sent === subscribers.length
      ? 'Avisos enviados para ' + sent + ' pessoa(s).'
      : 'Enviados ' + sent + ' de ' + subscribers.length + ' avisos.' + (failed ? ' Alguns falharam — veja a fila de e-mail.' : '')
  };
}

module.exports = {
  listAlertSubscribers,
  getAlertStatus,
  subscribeToSorteioAlerts,
  unsubscribeFromSorteioAlerts,
  broadcastSorteioAlerts
};
