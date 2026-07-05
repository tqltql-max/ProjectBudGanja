'use strict';

const {
  notifyInspectorNewAlertSubscriber,
  sendSorteioBroadcastEmail,
  notifyInspectorBroadcastSummary,
  getSmtpCredentials
} = require('./mail-notify.js');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
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

  let sent = 0;
  let failed = 0;
  const failures = [];

  for (let i = 0; i < subscribers.length; i++) {
    const sub = subscribers[i];
    const result = await sendSorteioBroadcastEmail(sub, config);
    if (result.sent) {
      sent += 1;
    } else {
      failed += 1;
      failures.push({ email: sub.email, error: result.error || result.reason || 'unknown' });
    }
    if (i < subscribers.length - 1) {
      await sleep(400);
    }
  }

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
    failures: failures.slice(0, 5),
    message: sent === subscribers.length
      ? 'Avisos enviados para ' + sent + ' pessoa(s).'
      : 'Enviados ' + sent + ' de ' + subscribers.length + ' avisos.' + (failed ? ' Alguns falharam.' : '')
  };
}

module.exports = {
  listAlertSubscribers,
  getAlertStatus,
  subscribeToSorteioAlerts,
  unsubscribeFromSorteioAlerts,
  broadcastSorteioAlerts
};
