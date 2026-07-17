'use strict';

const { getLojaProject, resolveOrderPackage } = require('./loja-catalog.js');
const { notifyInspectorNewLojaOrder, sendLojaOrderConfirmationEmail } = require('./mail-notify.js');
const { normalizeLojaOrderInput, normalizeLojaOrderOutput } = require('./persistence-naming.js');

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function normalizePhone(phone) {
  return String(phone || '').replace(/\D/g, '');
}

function validateLojaOrderPayload(payload) {
  const input = normalizeLojaOrderInput(payload);
  const productId = String(input.productId || payload.produto || '').trim();
  const project = getLojaProject(productId);
  if (!project || !project.orderOffer || project.orderOffer.enabled === false) {
    return { ok: false, status: 400, error: 'Produto inválido ou indisponível para encomenda.' };
  }

  const packageId = String(input.packageId || payload.pacote || '').trim();
  const options = project.orderOffer.packageOptions || [];
  let pkg = null;
  if (options.length) {
    pkg = resolveOrderPackage(project, packageId);
    if (!pkg) {
      return { ok: false, status: 400, error: 'Selecione uma opção de encomenda (montagem ou completa).' };
    }
  }

  const nome = String(input.nome || '').trim();
  const email = normalizeEmail(input.email);
  const telefone = normalizePhone(input.telefone);
  const cidade = String(input.cidade || '').trim();
  const estado = String(input.estado || '').trim().toUpperCase().slice(0, 2);
  const mensagem = String(input.mensagem || '').trim().slice(0, 2000);

  if (nome.length < 3) {
    return { ok: false, status: 400, error: 'Informe seu nome completo.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, status: 400, error: 'Informe um e-mail válido.' };
  }
  if (telefone.length < 10 || telefone.length > 11) {
    return { ok: false, status: 400, error: 'Informe um telefone ou WhatsApp válido (com DDD).' };
  }
  if (cidade.length < 2) {
    return { ok: false, status: 400, error: 'Informe sua cidade.' };
  }
  if (!/^[A-Z]{2}$/.test(estado)) {
    return { ok: false, status: 400, error: 'Informe o estado com 2 letras (ex.: SP).' };
  }
  if (!payload.aceite) {
    return { ok: false, status: 400, error: 'É necessário aceitar o uso dos dados para contato da encomenda.' };
  }

  return {
    ok: true,
    order: {
      productId,
      productTitle: project.title,
      packageId: pkg ? pkg.id : '',
      packageLabel: pkg ? pkg.label : '',
      packagePriceNote: pkg ? (pkg.priceNote || '') : '',
      nome,
      email,
      telefone,
      cidade,
      estado,
      mensagem
    }
  };
}

async function listLojaOrders(store) {
  if (!store.getLojaOrders) return [];
  const rows = await store.getLojaOrders();
  return Array.isArray(rows) ? rows.map(normalizeLojaOrderOutput) : [];
}

async function createLojaOrder(store, payload, options) {
  const validated = validateLojaOrderPayload(payload);
  if (!validated.ok) return validated;

  if (!store.getLojaOrders || !store.setLojaOrders) {
    return { ok: false, status: 503, error: 'Servidor indisponível. Tente com o site em execução local.' };
  }

  const entries = await listLojaOrders(store);
  const id = 'ord-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  const createdAt = new Date().toISOString();
  const entry = Object.assign({}, validated.order, {
    id,
    userId: options && options.userId ? String(options.userId) : '',
    status: 'novo',
    createdAt
  });

  entries.unshift(entry);
  await store.setLojaOrders(entries);

  let notifyInspector = { sent: false, reason: 'smtp_not_configured' };
  let notifyCustomer = { sent: false, reason: 'smtp_not_configured' };
  try {
    notifyInspector = await notifyInspectorNewLojaOrder(entry);
    notifyCustomer = await sendLojaOrderConfirmationEmail(entry);
  } catch (e) {
    console.error('[loja-order] notify failed:', e.message);
  }

  return {
    ok: true,
    status: 201,
    id,
    notify: { inspector: notifyInspector, customer: notifyCustomer },
    message: 'Encomenda recebida! Responderemos em até 48 h úteis.'
  };
}

module.exports = {
  validateLojaOrderPayload,
  listLojaOrders,
  createLojaOrder
};
