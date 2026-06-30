'use strict';

const { defaultProfile, getUserById, sanitizeIsoDate } = require('./user-auth-service.js');

const VALID_CATEGORIES = new Set([
  'estufa',
  'iluminacao',
  'ventilacao',
  'irrigacao',
  'substrato',
  'medicao',
  'seguranca',
  'outro'
]);

function sanitizeInfraItem(raw, index) {
  const src = raw && typeof raw === 'object' ? raw : {};
  const name = String(src.name || '').trim().slice(0, 120);
  if (!name) return null;
  const category = VALID_CATEGORIES.has(String(src.category || '')) ? String(src.category) : 'outro';
  let estimatedPrice = null;
  if (src.estimatedPrice !== null && src.estimatedPrice !== undefined && src.estimatedPrice !== '') {
    const n = parseFloat(String(src.estimatedPrice).replace(',', '.'));
    if (!isNaN(n) && n >= 0 && n <= 9999999) estimatedPrice = Math.round(n * 100) / 100;
  }
  const qtyRaw = parseInt(src.qty, 10);
  const qty = isNaN(qtyRaw) ? 1 : Math.max(1, Math.min(99, qtyRaw));
  const now = new Date().toISOString();
  return {
    id: String(src.id || 'i' + Date.now() + index).slice(0, 28),
    name: name,
    category: category,
    qty: qty,
    estimatedPrice: estimatedPrice,
    productUrl: String(src.productUrl || '').trim().slice(0, 500),
    storeName: String(src.storeName || '').trim().slice(0, 80),
    notes: String(src.notes || '').trim().slice(0, 400),
    purchased: !!(src.purchased),
    createdAt: sanitizeIsoDate(src.createdAt) || now,
    updatedAt: sanitizeIsoDate(src.updatedAt) || now
  };
}

function sanitizeInfraPlan(raw) {
  const src = raw && typeof raw === 'object' ? raw : {};
  const items = Array.isArray(src.items)
    ? src.items.map((item, i) => sanitizeInfraItem(item, i)).filter(Boolean).slice(0, 120)
    : [];
  return {
    title: String(src.title || '').trim().slice(0, 80),
    notes: String(src.notes || '').trim().slice(0, 1200),
    items: items,
    updatedAt: sanitizeIsoDate(src.updatedAt) || (items.length ? new Date().toISOString() : null)
  };
}

function defaultInfraPlan() {
  return sanitizeInfraPlan({});
}

async function getInfraPlanForUser(store, userId) {
  const user = await getUserById(store, userId);
  if (!user || !user.profile) return defaultInfraPlan();
  return sanitizeInfraPlan(user.profile.infraPlan);
}

async function updateInfraPlanForUser(store, userId, payload) {
  const users = await store.getUsers();
  const user = users[userId];
  if (!user) return null;
  const prev = sanitizeInfraPlan(user.profile && user.profile.infraPlan);
  const src = payload && typeof payload === 'object' ? payload : {};
  const merged = sanitizeInfraPlan(Object.assign({}, prev, src));
  merged.updatedAt = new Date().toISOString();
  if (!user.profile) user.profile = defaultProfile();
  user.profile.infraPlan = merged;
  user.updatedAt = new Date().toISOString();
  users[userId] = user;
  await store.setUsers(users);
  return merged;
}

function publicInfraPlanView(plan) {
  return sanitizeInfraPlan(plan);
}

module.exports = {
  VALID_CATEGORIES,
  sanitizeInfraPlan,
  sanitizeInfraItem,
  defaultInfraPlan,
  getInfraPlanForUser,
  updateInfraPlanForUser,
  publicInfraPlanView
};
