const crypto = require('crypto');
const { parseCookies, cookieHeader, getAdminUser, getAdminPass, isSecureRequest } = require('./utils.js');

const SESSION_COOKIE = 'budganja_session';
const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000;

async function loadSessionsMap(store) {
  const raw = await store.getSessions();
  const map = new Map();
  const now = Date.now();
  for (const [token, session] of Object.entries(raw || {})) {
    if (session.expiresAt > now) map.set(token, session);
  }
  return map;
}

async function persistSessions(store, map) {
  const obj = {};
  for (const [token, session] of map.entries()) obj[token] = session;
  await store.setSessions(obj);
}

async function createSession(store, username) {
  const sessions = await loadSessionsMap(store);
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (session.expiresAt <= now) sessions.delete(token);
  }
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, { username, expiresAt: Date.now() + SESSION_MAX_AGE_MS });
  await persistSessions(store, sessions);
  return token;
}

async function destroySession(store, token) {
  if (!token) return;
  const sessions = await loadSessionsMap(store);
  sessions.delete(token);
  await persistSessions(store, sessions);
}

async function getSession(store, cookieHeaderValue) {
  const cookies = parseCookies(cookieHeaderValue);
  const token = cookies[SESSION_COOKIE];
  if (!token) return null;
  const sessions = await loadSessionsMap(store);
  const session = sessions.get(token);
  if (!session || session.expiresAt <= Date.now()) {
    sessions.delete(token);
    await persistSessions(store, sessions);
    return null;
  }
  return { token, username: session.username };
}

function setSessionCookie(headers, token) {
  const maxAge = Math.floor(SESSION_MAX_AGE_MS / 1000);
  const secure = isSecureRequest(headers);
  return cookieHeader(SESSION_COOKIE, token, maxAge, secure);
}

function clearSessionCookie(headers) {
  const secure = isSecureRequest(headers);
  return cookieHeader(SESSION_COOKIE, '', 0, secure);
}

function timingSafeEqual(a, b) {
  const left = Buffer.from(String(a), 'utf8');
  const right = Buffer.from(String(b), 'utf8');
  if (left.length !== right.length) {
    crypto.timingSafeEqual(left, left);
    return false;
  }
  return crypto.timingSafeEqual(left, right);
}

function checkCredentials(username, password) {
  return timingSafeEqual(username, getAdminUser()) && timingSafeEqual(password, getAdminPass());
}

module.exports = {
  SESSION_COOKIE,
  getSession,
  createSession,
  destroySession,
  setSessionCookie,
  clearSessionCookie,
  checkCredentials
};
