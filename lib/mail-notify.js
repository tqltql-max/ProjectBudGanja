'use strict';

const {
  getSmtpCredentials,
  enqueueEmail,
  notifyInspector
} = require('./email-service.js');
const { renderEmailTemplate } = require('./email-templates.js');

async function wrapSend(promise) {
  const result = await promise;
  if (result.sent !== undefined) return result;
  if (result.inline) {
    return { sent: !!result.ok, error: result.error, reason: result.reason };
  }
  if (result.duplicate) return { sent: true, duplicate: true };
  if (result.queued) return { sent: true, queued: true };
  return { sent: !!result.ok, error: result.error, reason: result.reason };
}

async function notifyInspectorNewAlertSubscriber({ name, email }) {
  console.log('[notify] Novo inscrito avisos sorteio -', email);
  return wrapSend(notifyInspector('sorteio_alert_inspector', {
    name,
    email,
    createdAt: new Date().toISOString()
  }));
}

async function sendSorteioBroadcastEmail(subscriber, config) {
  return wrapSend(enqueueEmail(null, {
    template: 'sorteio_broadcast',
    to: subscriber.email,
    toName: subscriber.name,
    vars: { subscriber, config }
  }));
}

async function notifyInspectorBroadcastSummary({ config, sent, failed, total }) {
  return wrapSend(notifyInspector('sorteio_broadcast_summary', { config, sent, failed, total }));
}

async function notifyInspectorNewLojaOrder(order) {
  console.log('[notify] Nova encomenda -', order.email);
  return wrapSend(notifyInspector('loja_order_inspector', { order }));
}

async function sendLojaOrderConfirmationEmail(order) {
  return wrapSend(enqueueEmail(null, {
    template: 'loja_order_confirmation',
    to: order.email,
    toName: order.nome,
    vars: { order }
  }));
}

function buildSorteioBroadcastText({ subscriber, config }) {
  return renderEmailTemplate('sorteio_broadcast', { subscriber, config });
}

module.exports = {
  getSmtpCredentials,
  notifyInspectorNewAlertSubscriber,
  sendSorteioBroadcastEmail,
  notifyInspectorBroadcastSummary,
  buildSorteioBroadcastText,
  notifyInspectorNewLojaOrder,
  sendLojaOrderConfirmationEmail
};
