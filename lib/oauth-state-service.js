'use strict';

const OAUTH_STATE_MAX_AGE_MS = 10 * 60 * 1000;

async function loadStates(store) {
  const raw = await store.getOAuthStates();
  const now = Date.now();
  const next = {};
  for (const [key, entry] of Object.entries(raw || {})) {
    if (entry && entry.expiresAt > now) next[key] = entry;
  }
  return next;
}

async function saveOAuthState(store, state, payload) {
  const states = await loadStates(store);
  states[state] = {
    returnTo: payload && payload.returnTo ? String(payload.returnTo) : '/perfil.html',
    createdAt: Date.now(),
    expiresAt: Date.now() + OAUTH_STATE_MAX_AGE_MS
  };
  await store.setOAuthStates(states);
}

async function consumeOAuthState(store, state) {
  if (!state) return null;
  const states = await loadStates(store);
  const entry = states[state];
  delete states[state];
  await store.setOAuthStates(states);
  if (!entry || entry.expiresAt <= Date.now()) return null;
  return entry;
}

function isSafeReturnPath(path) {
  const value = String(path || '').trim();
  if (!/^\/[a-z0-9/-]+$/i.test(value)) return false;
  return value.endsWith('.html') || value.endsWith('/');
}

function safeReturnPath(path) {
  return isSafeReturnPath(path) ? String(path).trim() : '/perfil.html';
}

module.exports = {
  OAUTH_STATE_MAX_AGE_MS,
  saveOAuthState,
  consumeOAuthState,
  safeReturnPath,
  isSafeReturnPath
};
