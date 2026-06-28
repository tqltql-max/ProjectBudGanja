'use strict';

const { sendSmtpMail } = require('./smtp-send.js');

function getSmtpCredentials() {
  const user = String(process.env.GMAIL_USER || process.env.SMTP_USER || '').trim();
  const pass = String(process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || '').trim();
  return { user, pass, configured: !!(user && pass) };
}

function getSiteUrl() {
  return String(process.env.SITE_URL || 'https://inspetorbudganja.com.br').replace(/\/$/, '');
}

function formatSorteioDateServer(value) {
  if (!value) return '';
  const raw = String(value).trim();
  if (!/^\d{4}-\d{2}/.test(raw)) return raw;
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function buildSorteioBroadcastText({ subscriber, config, siteUrl }) {
  const name = String(subscriber.name || '').trim() || 'cultivador(a)';
  const titulo = String(config.titulo || 'Sorteio do Inspetor BudGanja').trim();
  const descricao = String(config.descricao || '').trim();
  const data = formatSorteioDateServer(config.dataSorteio);
  const premios = (config.premios || []).map((p) => p.label).filter(Boolean);
  const sorteioUrl = siteUrl + '/sorteios/';

  let text =
    'Olá ' + name + ',\n\n' +
    'Abrimos um novo sorteio no Inspetor BudGanja!\n\n' +
    'Título: ' + titulo + '\n';

  if (data) text += 'Data prevista: ' + data + '\n';
  if (premios.length) text += 'Prémio(s): ' + premios.join(' · ') + '\n';
  if (descricao) text += '\n' + descricao + '\n';

  text +=
    '\nParticipar agora:\n' + sorteioUrl + '\n\n' +
    '— Inspetor BudGanja\n' +
    siteUrl + '\n';

  return { subject: '[BudGanja] Novo sorteio: ' + titulo, text };
}

async function sendMail(opts) {
  const { user, pass, configured } = getSmtpCredentials();
  if (!configured) {
    return { sent: false, reason: 'smtp_not_configured' };
  }
  try {
    await sendSmtpMail({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 587),
      user,
      pass,
      from: user,
      to: opts.to,
      subject: opts.subject,
      text: opts.text
    });
    return { sent: true };
  } catch (e) {
    console.error('[notify] falha SMTP para', opts.to, ':', e.message);
    return { sent: false, error: e.message };
  }
}

async function notifyInspectorNewAlertSubscriber({ name, email }) {
  const inspectorEmail =
    String(process.env.NOTIFY_EMAIL || process.env.CONTACT_EMAIL || 'inspetorbudganja@gmail.com').trim();
  const subject = '[BudGanja] Novo inscrito em avisos de sorteio';
  const text =
    'Nova inscrição na lista de avisos de sorteios do site:\n\n' +
    'Nome: ' + (name || '(sem nome)') + '\n' +
    'E-mail: ' + email + '\n' +
    'Data: ' + new Date().toISOString() + '\n';

  console.log('[notify]', subject, '-', email);
  return sendMail({ to: inspectorEmail, subject, text });
}

async function sendSorteioBroadcastEmail(subscriber, config) {
  const siteUrl = getSiteUrl();
  const { subject, text } = buildSorteioBroadcastText({ subscriber, config, siteUrl });
  return sendMail({ to: subscriber.email, subject, text });
}

async function notifyInspectorBroadcastSummary({ config, sent, failed, total }) {
  const inspectorEmail =
    String(process.env.NOTIFY_EMAIL || process.env.CONTACT_EMAIL || 'inspetorbudganja@gmail.com').trim();
  const subject = '[BudGanja] Avisos de sorteio enviados';
  const text =
    'Resumo do envio de avisos de sorteio:\n\n' +
    'Sorteio: ' + (config.titulo || '—') + '\n' +
    'Total inscritos: ' + total + '\n' +
    'Enviados com sucesso: ' + sent + '\n' +
    'Falhas: ' + failed + '\n' +
    'Data: ' + new Date().toISOString() + '\n';

  return sendMail({ to: inspectorEmail, subject, text });
}

async function notifyInspectorNewLojaOrder(order) {
  const inspectorEmail =
    String(process.env.NOTIFY_EMAIL || process.env.CONTACT_EMAIL || 'inspetorbudganja@gmail.com').trim();
  const subject = '[BudGanja] Nova encomenda — ' + (order.productTitle || order.productId || 'Loja');
  const text =
    'Nova encomenda na loja do Inspetor BudGanja:\n\n' +
    'Produto: ' + (order.productTitle || '—') + ' (' + (order.productId || '—') + ')\n' +
    (order.packageLabel ? 'Opção: ' + order.packageLabel + (order.packagePriceNote ? ' · ' + order.packagePriceNote : '') + '\n' : '') +
    'Nome: ' + (order.nome || '—') + '\n' +
    'E-mail: ' + (order.email || '—') + '\n' +
    'Telefone/WhatsApp: ' + (order.telefone || '—') + '\n' +
    'Cidade/UF: ' + (order.cidade || '—') + '/' + (order.estado || '—') + '\n' +
    (order.mensagem ? 'Mensagem: ' + order.mensagem + '\n' : '') +
    'ID: ' + (order.id || '—') + '\n' +
    'Data: ' + (order.createdAt || new Date().toISOString()) + '\n';

  console.log('[notify]', subject, '-', order.email);
  return sendMail({ to: inspectorEmail, subject, text });
}

async function sendLojaOrderConfirmationEmail(order) {
  const siteUrl = getSiteUrl();
  const name = String(order.nome || '').trim() || 'cultivador(a)';
  const subject = '[BudGanja] Recebemos sua encomenda — ' + (order.productTitle || 'Clonadora');
  const text =
    'Olá ' + name + ',\n\n' +
    'Recebemos seu pedido de encomenda no Inspetor BudGanja.\n\n' +
    'Produto: ' + (order.productTitle || '—') + '\n' +
    (order.packageLabel ? 'Opção: ' + order.packageLabel + (order.packagePriceNote ? ' (' + order.packagePriceNote + ')' : '') + '\n' : '') +
    'Referência: ' + (order.id || '—') + '\n\n' +
    'Vamos responder em até 48 h úteis com valores, prazo e formas de pagamento/envio.\n\n' +
    'Guia de montagem: ' + siteUrl + '/loja/\n\n' +
    '— Inspetor BudGanja\n' +
    siteUrl + '\n';

  return sendMail({ to: order.email, subject, text });
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
