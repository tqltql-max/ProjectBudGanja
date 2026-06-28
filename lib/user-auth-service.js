const crypto = require('crypto');
const { parseCookies, cookieHeader, isSecureRequest } = require('./utils.js');

const USER_SESSION_COOKIE = 'budganja_user';
const OAUTH_STATE_COOKIE = 'budganja_oauth_state';
const USER_SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
const OAUTH_STATE_MAX_AGE_MS = 10 * 60 * 1000;

const MIN_USER_AGE = 18;

function sanitizeAvatarUrl(raw) {
  const url = String(raw || '').trim().slice(0, 500);
  if (!url) return '';
  if (/^\/imagens\/avatars\/[a-z0-9\-]+\.svg$/i.test(url)) return url;
  if (/^\/uploads\/avatar-[a-zA-Z0-9\-_.]+\.(png|jpe?g|webp)$/i.test(url)) return url;
  return '';
}

function resolveUserPicture(user) {
  if (!user) return '';
  const custom = sanitizeAvatarUrl(user.profile && user.profile.avatarUrl);
  if (custom) return custom;
  return String(user.picture || '').trim().slice(0, 500);
}

function defaultProfile() {
  return {
    displayName: '',
    age: null,
    avatarUrl: '',
    experience: '',
    environment: '',
    substrate: '',
    method: '',
    phase: '',
    tentSize: '',
    lighting: '',
    genetics: '',
    goals: '',
    notes: '',
    journal: '',
    customGuide: '',
    planTasks: [],
    growLogs: [],
    activeGrowLogId: '',
    phaseStartedAt: null,
    guideWeekNotes: {},
    updatedAt: null
  };
}

function sanitizeIsoDate(val) {
  if (!val) return null;
  const d = new Date(val);
  if (isNaN(d.getTime())) return null;
  return d.toISOString();
}

function sanitizeGuideWeekNotes(raw) {
  const src = raw && typeof raw === 'object' ? raw : {};
  const out = {};
  for (const [key, value] of Object.entries(src)) {
    const week = parseInt(key, 10);
    if (week >= 1 && week <= 24) {
      const text = String(value || '').trim().slice(0, 2000);
      if (text) out[String(week)] = text;
    }
  }
  return out;
}

function sanitizeAge(raw) {
  if (raw === null || raw === undefined || raw === '') return null;
  const n = parseInt(raw, 10);
  if (isNaN(n) || n < MIN_USER_AGE || n > 120) return null;
  return n;
}

function sanitizePlanTasks(raw) {
  if (!Array.isArray(raw)) return [];
  const validActions = new Set(['', 'rega', 'adubo']);
  return raw.slice(0, 60).map((t, i) => {
    const dueAt = sanitizeDateOnly(t && t.dueAt) || '';
    const actionType = validActions.has(String(t && t.actionType || ''))
      ? String(t.actionType || '')
      : '';
    return {
      id: String(t && t.id ? t.id : 't' + i).slice(0, 24),
      label: String(t && t.label || '').trim().slice(0, 240),
      done: !!(t && t.done),
      toolHref: String(t && t.toolHref || '').trim().slice(0, 200),
      dueAt: dueAt,
      actionType: actionType,
      growId: String(t && t.growId || '').trim().slice(0, 24)
    };
  }).filter((t) => t.label);
}

const VALID_PHASES = new Set(['planejamento', 'germinacao', 'vegetativo', 'floracao', 'colheita']);

function sanitizeGrowPhase(raw) {
  const p = String(raw || '').trim();
  return VALID_PHASES.has(p) ? p : 'germinacao';
}

function sanitizeDateOnly(val) {
  if (!val) return null;
  const d = new Date(val);
  if (isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

function sanitizeEntryMetrics(raw) {
  const src = raw && typeof raw === 'object' ? raw : {};
  const out = {};
  const pick = (key, min, max, decimals) => {
    if (src[key] === null || src[key] === undefined || src[key] === '') return;
    const n = parseFloat(String(src[key]).replace(',', '.'));
    if (isNaN(n) || n < min || n > max) return;
    out[key] = decimals === 0 ? Math.round(n) : Math.round(n * 10) / 10;
  };
  pick('ph', 0, 14, 1);
  pick('ec', 0, 10, 1);
  pick('temp', -10, 60, 0);
  pick('rh', 0, 100, 0);
  pick('vpd', 0, 5, 2);
  pick('dli', 0, 100, 1);
  if (src.calculator) {
    const slug = String(src.calculator).trim().slice(0, 32);
    if (/^[a-z0-9-]+$/.test(slug)) out.calculator = slug;
  }
  return out;
}

function sanitizeEntryPhotos(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 4).map((item) => {
    const url = String(item || '').trim().slice(0, 200);
    if (!url.startsWith('/uploads/')) return null;
    if (url.includes('..')) return null;
    return url;
  }).filter(Boolean);
}

const VALID_ENTRY_SOURCES = new Set(['manual', 'week-note', 'system', 'calculator']);

const VALID_ENTRY_ACTIONS = new Set(['rega', 'adubo', 'obs', 'treino', 'roteiro']);

function sanitizeEntryActionType(raw, source) {
  if (source === 'week-note') return 'roteiro';
  if (source === 'calculator') {
    const id = String(raw || '').trim();
    return VALID_ENTRY_ACTIONS.has(id) ? id : 'obs';
  }
  const id = String(raw || '').trim();
  return VALID_ENTRY_ACTIONS.has(id) ? id : 'obs';
}

function sanitizeGrowLogEntries(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 300).map((e, i) => {
    const sourceRaw = String(e && e.source || 'manual');
    const source = VALID_ENTRY_SOURCES.has(sourceRaw) ? sourceRaw : 'manual';
    const text = String(e && e.text || '').trim().slice(0, 2000);
    const metrics = sanitizeEntryMetrics(e && e.metrics);
    const photos = sanitizeEntryPhotos(e && e.photos);
    const actionType = sanitizeEntryActionType(e && e.actionType, source);
    if (!text && !Object.keys(metrics).length && !photos.length && source === 'manual') return null;
    const fallbackText = text
      || (source === 'calculator' ? 'Registo de calculadora.' : '')
      || (actionType === 'rega' ? 'Rega registada.' : actionType === 'adubo' ? 'Adubação registada.' : 'Registo.');
    return {
      id: String(e && e.id ? e.id : 'e' + i).slice(0, 24),
      date: sanitizeDateOnly(e && e.date) || new Date().toISOString().slice(0, 10),
      text: fallbackText,
      source: source,
      actionType: actionType,
      metrics: metrics,
      photos: photos,
      createdAt: sanitizeIsoDate(e && e.createdAt) || new Date().toISOString()
    };
  }).filter(Boolean);
}

function sanitizeGrowLogs(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 24).map((g, i) => {
    const name = String(g && g.name || '').trim().slice(0, 80);
    if (!name) return null;
    return {
      id: String(g && g.id ? g.id : 'g' + i).slice(0, 24),
      name: name,
      plantedAt: sanitizeIsoDate(g && g.plantedAt) || sanitizeIsoDate(g && g.createdAt) || new Date().toISOString(),
      phase: sanitizeGrowPhase(g && g.phase),
      plantCount: Math.max(1, Math.min(99, parseInt(g && g.plantCount, 10) || 1)),
      species: String(g && g.species || '').trim().slice(0, 120),
      entries: sanitizeGrowLogEntries(g && g.entries),
      createdAt: sanitizeIsoDate(g && g.createdAt) || new Date().toISOString()
    };
  }).filter(Boolean);
}

function sanitizeActiveGrowLogId(raw, logs) {
  const id = String(raw || '').trim().slice(0, 24);
  if (id && logs.some((log) => log.id === id)) return id;
  return logs.length ? logs[0].id : '';
}

function sanitizeProfile(raw) {
  const src = raw && typeof raw === 'object' ? raw : {};
  const pick = (key, max) => String(src[key] || '').trim().slice(0, max);
  const growLogs = sanitizeGrowLogs(src.growLogs);
  return {
    displayName: pick('displayName', 80),
    age: sanitizeAge(src.age),
    avatarUrl: sanitizeAvatarUrl(src.avatarUrl),
    experience: pick('experience', 40),
    environment: pick('environment', 40),
    substrate: pick('substrate', 80),
    method: pick('method', 40),
    phase: sanitizeGrowPhase(src.phase),
    tentSize: pick('tentSize', 80),
    lighting: pick('lighting', 120),
    genetics: pick('genetics', 120),
    goals: pick('goals', 800),
    notes: pick('notes', 1200),
    journal: pick('journal', 8000),
    customGuide: pick('customGuide', 6000),
    planTasks: sanitizePlanTasks(src.planTasks),
    growLogs: growLogs,
    activeGrowLogId: sanitizeActiveGrowLogId(src.activeGrowLogId, growLogs),
    phaseStartedAt: sanitizeIsoDate(src.phaseStartedAt),
    guideWeekNotes: sanitizeGuideWeekNotes(src.guideWeekNotes),
    updatedAt: new Date().toISOString()
  };
}

function isProfileComplete(profile) {
  if (!profile) return false;
  const name = String(profile.displayName || '').trim();
  return name.length >= 2 && profile.age !== null && profile.age >= MIN_USER_AGE;
}

async function loadUserSessionsMap(store) {
  const raw = await store.getUserSessions();
  const map = new Map();
  const now = Date.now();
  for (const [token, session] of Object.entries(raw || {})) {
    if (session.expiresAt > now) map.set(token, session);
  }
  return map;
}

async function persistUserSessions(store, map) {
  const obj = {};
  for (const [token, session] of map.entries()) obj[token] = session;
  await store.setUserSessions(obj);
}

async function createUserSession(store, userId) {
  const sessions = await loadUserSessionsMap(store);
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, { userId, expiresAt: Date.now() + USER_SESSION_MAX_AGE_MS });
  await persistUserSessions(store, sessions);
  return token;
}

async function destroyUserSession(store, token) {
  if (!token) return;
  const sessions = await loadUserSessionsMap(store);
  sessions.delete(token);
  await persistUserSessions(store, sessions);
}

async function getUserSession(store, cookieHeaderValue) {
  const cookies = parseCookies(cookieHeaderValue);
  const token = cookies[USER_SESSION_COOKIE];
  if (!token) return null;
  const sessions = await loadUserSessionsMap(store);
  const session = sessions.get(token);
  if (!session || session.expiresAt <= Date.now()) {
    sessions.delete(token);
    await persistUserSessions(store, sessions);
    return null;
  }
  return { token, userId: session.userId };
}

function setUserSessionCookie(headers, token) {
  const maxAge = Math.floor(USER_SESSION_MAX_AGE_MS / 1000);
  return cookieHeader(USER_SESSION_COOKIE, token, maxAge, isSecureRequest(headers));
}

function clearUserSessionCookie(headers) {
  return cookieHeader(USER_SESSION_COOKIE, '', 0, isSecureRequest(headers));
}

async function verifyGoogleIdToken(idToken, clientId) {
  if (!idToken || !clientId) return null;
  const url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(idToken);
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  if (data.aud !== clientId) return null;
  if (Number(data.exp) * 1000 < Date.now()) return null;
  if (!data.sub) return null;
  return {
    id: String(data.sub),
    email: String(data.email || ''),
    name: String(data.name || data.email || 'Utilizador'),
    picture: String(data.picture || '')
  };
}

async function exchangeGoogleAuthCode(code, clientId, clientSecret, redirectUri) {
  if (!code || !clientId || !clientSecret || !redirectUri) return null;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code: String(code),
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    })
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.id_token) return null;
  return verifyGoogleIdToken(data.id_token, clientId);
}

function createOAuthState() {
  return crypto.randomBytes(24).toString('hex');
}

function setOAuthStateCookie(headers, state) {
  const maxAge = Math.floor(OAUTH_STATE_MAX_AGE_MS / 1000);
  return cookieHeader(OAUTH_STATE_COOKIE, state, maxAge, isSecureRequest(headers), 'Lax');
}

function clearOAuthStateCookie(headers) {
  return cookieHeader(OAUTH_STATE_COOKIE, '', 0, isSecureRequest(headers));
}

function readOAuthState(cookieHeaderValue) {
  const cookies = parseCookies(cookieHeaderValue);
  return cookies[OAUTH_STATE_COOKIE] || null;
}

function buildGoogleAuthUrl(clientId, redirectUri, state) {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state: state,
    access_type: 'online',
    prompt: 'select_account'
  });
  return 'https://accounts.google.com/o/oauth2/v2/auth?' + params.toString();
}

async function upsertGoogleUser(store, googleUser) {
  const users = await store.getUsers();
  const now = new Date().toISOString();
  const existing = users[googleUser.id] || {};
  const profile = sanitizeProfile(Object.assign({}, defaultProfile(), existing.profile || {}));
  if (!existing.profile && googleUser.name && !profile.displayName) {
    profile.displayName = String(googleUser.name).trim().slice(0, 80);
  }
  const user = {
    id: googleUser.id,
    email: googleUser.email,
    name: profile.displayName || googleUser.name,
    picture: googleUser.picture,
    provider: 'google',
    isAdmin: !!existing.isAdmin,
    createdAt: existing.createdAt || now,
    updatedAt: now,
    profile: profile
  };
  users[googleUser.id] = user;
  await store.setUsers(users);
  return user;
}

async function getUserById(store, userId) {
  if (!userId) return null;
  const users = await store.getUsers();
  return users[userId] || null;
}

async function updateUserProfile(store, userId, payload) {
  const users = await store.getUsers();
  const user = users[userId];
  if (!user) return null;
  const prev = user.profile || defaultProfile();
  const src = payload && typeof payload === 'object' ? payload : {};
  const merged = Object.assign({}, prev, src);

  if (!Object.prototype.hasOwnProperty.call(src, 'avatarUrl')) {
    merged.avatarUrl = prev.avatarUrl || '';
  }

  if (merged.age !== undefined && merged.age !== null && merged.age !== '') {
    const attempt = parseInt(merged.age, 10);
    if (isNaN(attempt) || attempt < MIN_USER_AGE) {
      const err = new Error('underage');
      err.code = 'underage';
      throw err;
    }
  }

  const profile = sanitizeProfile(merged);
  profile.phase = '';
  profile.phaseStartedAt = null;
  profile.activeGrowLogId = '';
  profile.customGuide = '';
  profile.guideWeekNotes = {};
  profile.growLogs = [];
  profile.planTasks = [];
  profile.journal = '';

  if (profile.displayName) {
    user.name = profile.displayName;
  }

  user.profile = profile;
  user.updatedAt = new Date().toISOString();
  users[userId] = user;
  await store.setUsers(users);
  return user;
}

async function updateUserAvatar(store, userId, avatarUrlRaw) {
  const users = await store.getUsers();
  const user = users[userId];
  if (!user) return null;
  const prev = user.profile || defaultProfile();
  const avatarUrl = sanitizeAvatarUrl(avatarUrlRaw);
  const profile = sanitizeProfile(Object.assign({}, prev, { avatarUrl: avatarUrl }));
  user.profile = profile;
  user.updatedAt = new Date().toISOString();
  users[userId] = user;
  await store.setUsers(users);
  return user;
}

function publicUserView(user) {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    picture: resolveUserPicture(user),
    googlePicture: String(user.picture || '').trim().slice(0, 500),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    profile: user.profile || defaultProfile(),
    profileComplete: isProfileComplete(user.profile)
  };
}

module.exports = {
  USER_SESSION_COOKIE,
  OAUTH_STATE_COOKIE,
  USER_SESSION_MAX_AGE_MS,
  MIN_USER_AGE,
  defaultProfile,
  sanitizeProfile,
  sanitizeAvatarUrl,
  resolveUserPicture,
  isProfileComplete,
  createUserSession,
  destroyUserSession,
  getUserSession,
  setUserSessionCookie,
  clearUserSessionCookie,
  verifyGoogleIdToken,
  exchangeGoogleAuthCode,
  createOAuthState,
  setOAuthStateCookie,
  clearOAuthStateCookie,
  readOAuthState,
  buildGoogleAuthUrl,
  upsertGoogleUser,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  publicUserView,
  sanitizeIsoDate
};
