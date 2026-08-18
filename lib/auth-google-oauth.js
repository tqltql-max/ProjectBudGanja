'use strict';

const { getGoogleClientId, getGoogleClientSecret, getGoogleRedirectUri } = require('./utils.js');
const {
  createUserSession,
  setUserSessionCookie,
  verifyGoogleIdToken,
  exchangeGoogleAuthCode,
  clearOAuthStateCookie,
  readOAuthState,
  upsertGoogleUser,
  publicUserView
} = require('./user-auth-service.js');
const { saveOAuthState, consumeOAuthState, safeReturnPath } = require('./oauth-state-service.js');
const { handleGoogleStart, decodeOAuthReturnTo } = require('./auth-google-start.js');
const { createRateLimiter } = require('./rate-limit.js');

const googleAuthLimiter = createRateLimiter({
  prefix: 'google-auth',
  windowMs: 15 * 60 * 1000,
  maxAttempts: 25
});

function isGoogleAuthRoute(path, method) {
  const m = String(method || 'GET').toUpperCase();
  const p = String(path || '');
  if (p === '/api/auth/google/start' && m === 'GET') return true;
  if (p === '/api/auth/google/callback' && m === 'GET') return true;
  if (p === '/api/auth/google' && m === 'POST') return true;
  return false;
}

function redirectResponse(status, location, setCookies) {
  return {
    status,
    statusCode: status,
    headers: { Location: location, 'Cache-Control': 'no-store' },
    setCookies: setCookies || [],
    body: ''
  };
}

function jsonResponse(status, obj, extraHeaders) {
  const headers = Object.assign(
    { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    extraHeaders || {}
  );
  const setCookies = [];
  if (headers['Set-Cookie']) {
    setCookies.push(headers['Set-Cookie']);
    delete headers['Set-Cookie'];
  }
  return {
    status,
    statusCode: status,
    headers,
    setCookies,
    body: JSON.stringify(obj)
  };
}

function getClientKey(headers) {
  const h = headers || {};
  const forwarded = String(h['x-forwarded-for'] || h['X-Forwarded-For'] || '').trim();
  if (forwarded) return forwarded.split(',')[0].trim().slice(0, 120);
  return String(h['x-real-ip'] || h['X-Real-IP'] || 'unknown').trim().slice(0, 120);
}

function queryFrom(req) {
  if (!req) return new URLSearchParams();
  if (typeof req.query === 'string') {
    const raw = req.query.startsWith('?') ? req.query.slice(1) : req.query;
    if (raw.includes('?')) return new URLSearchParams(raw.split('?')[1] || raw);
    return new URLSearchParams(raw);
  }
  if (req.query && typeof req.query === 'object') {
    return new URLSearchParams(req.query);
  }
  return new URLSearchParams();
}

function parseBody(raw, isBase64) {
  if (!raw) return '';
  if (isBase64) return Buffer.from(raw, 'base64').toString('utf8');
  return raw;
}

async function handleGoogleAuth(req, options) {
  const path = req.path || '';
  const method = String(req.method || 'GET').toUpperCase();
  if (!isGoogleAuthRoute(path, method)) return null;

  const headers = req.headers || {};
  const store = options && options.store;
  const cookie = headers.cookie || headers.Cookie || '';
  const authMeta = {
    ipAddress: getClientKey(headers),
    userAgent: String(headers['user-agent'] || headers['User-Agent'] || '').slice(0, 220)
  };

  if (path === '/api/auth/google/start' && method === 'GET') {
    const authKey = getClientKey(headers);
    if (googleAuthLimiter.isLimited(authKey)) {
      return redirectResponse(302, '/entrar.html?error=rate_limited');
    }
    googleAuthLimiter.record(authKey);
    const started = handleGoogleStart(req);
    const location = started && started.headers && started.headers.Location;
    if (store && location && String(location).includes('accounts.google.com')) {
      const stateMatch = /[?&]state=([^&]+)/.exec(String(location));
      const state = stateMatch ? decodeURIComponent(stateMatch[1]) : '';
      if (state) {
        try {
          await saveOAuthState(store, state, { returnTo: decodeOAuthReturnTo(state) });
        } catch (e) {
          /* o cookie de state ainda cobre o callback */
        }
      }
    }
    return started;
  }

  if (path === '/api/auth/google/callback' && method === 'GET') {
    const clientId = getGoogleClientId();
    const clientSecret = getGoogleClientSecret();
    const params = queryFrom(req);
    const error = params.get('error');
    if (error) {
      return redirectResponse(302, '/entrar.html?error=' + encodeURIComponent(error));
    }
    const code = params.get('code');
    const state = params.get('state');
    let savedState = null;
    if (store && state) {
      try {
        savedState = await consumeOAuthState(store, state);
      } catch (e) {
        savedState = null;
      }
    }
    const cookieState = readOAuthState(cookie);
    const stateOk = !!(state && savedState) || !!(state && cookieState && state === cookieState);
    if (!code || !stateOk) {
      return redirectResponse(302, '/entrar.html?error=invalid_state', [clearOAuthStateCookie(headers)]);
    }
    if (!clientId || !clientSecret) {
      return redirectResponse(302, '/entrar.html?error=redirect_not_configured', [
        clearOAuthStateCookie(headers)
      ]);
    }
    if (!store) {
      return redirectResponse(302, '/entrar.html?error=server_error', [clearOAuthStateCookie(headers)]);
    }
    const redirectUri = getGoogleRedirectUri(headers);
    const googleUser = await exchangeGoogleAuthCode(code, clientId, clientSecret, redirectUri);
    if (!googleUser) {
      return redirectResponse(302, '/entrar.html?error=invalid_client', [clearOAuthStateCookie(headers)]);
    }
    let user;
    try {
      user = await upsertGoogleUser(store, googleUser, authMeta);
    } catch (e) {
      if (e && e.code === 'registration_closed') {
        return redirectResponse(302, '/entrar.html?error=registration_closed', [
          clearOAuthStateCookie(headers)
        ]);
      }
      return redirectResponse(302, '/entrar.html?error=server_error', [clearOAuthStateCookie(headers)]);
    }
    const token = await createUserSession(store, user.id);
    const returnTo = savedState
      ? safeReturnPath(savedState.returnTo)
      : decodeOAuthReturnTo(state);
    return redirectResponse(302, returnTo, [
      clearOAuthStateCookie(headers),
      setUserSessionCookie(headers, token)
    ]);
  }

  if (path === '/api/auth/google' && method === 'POST') {
    const authKey = getClientKey(headers);
    if (googleAuthLimiter.isLimited(authKey)) {
      return jsonResponse(429, { error: 'Muitas tentativas de login. Aguarde cerca de 15 minutos.' });
    }
    googleAuthLimiter.record(authKey);
    const clientId = getGoogleClientId();
    if (!clientId) {
      return jsonResponse(503, {
        error: 'Login com Google não configurado. Defina GOOGLE_CLIENT_ID no servidor.'
      });
    }
    if (!store) {
      return jsonResponse(503, { error: 'Servidor de contas indisponível. Tente novamente em instantes.' });
    }
    try {
      const payload = JSON.parse(parseBody(req.body, req.isBase64Encoded) || '{}');
      const credential = String(payload.credential || '').trim();
      if (!credential) return jsonResponse(400, { error: 'Credencial Google em falta.' });
      const googleUser = await verifyGoogleIdToken(credential, clientId);
      if (!googleUser) return jsonResponse(401, { error: 'Não foi possível validar a conta Google.' });
      let user;
      try {
        user = await upsertGoogleUser(store, googleUser, authMeta);
      } catch (e) {
        if (e && e.code === 'registration_closed') {
          return jsonResponse(503, { error: e.message || 'Cadastros novos temporariamente indisponíveis.' });
        }
        throw e;
      }
      const token = await createUserSession(store, user.id);
      return jsonResponse(200, { ok: true, user: publicUserView(user) }, {
        'Set-Cookie': setUserSessionCookie(headers, token)
      });
    } catch (e) {
      return jsonResponse(400, { error: 'Pedido inválido.' });
    }
  }

  return null;
}

module.exports = {
  isGoogleAuthRoute,
  handleGoogleAuth
};
