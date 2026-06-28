'use strict';

const { jsonResponse, redirectResponse } = require('./_helpers.js');
const {
  getSession,
  createSession,
  destroySession,
  setSessionCookie,
  clearSessionCookie,
  checkCredentials
} = require('../auth-service.js');
const { getAdminSession, getAdminAccess } = require('../admin-access.js');
const {
  getClientKey,
  isLoginRateLimited,
  recordLoginFailure,
  clearLoginAttempts
} = require('../login-rate-limit.js');
const { getGoogleClientId, getGoogleClientSecret, getGoogleOAuthOrigins, getGoogleRedirectUri } = require('../utils.js');
const {
  createUserSession,
  destroyUserSession,
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
  publicUserView
} = require('../user-auth-service.js');
const { saveOAuthState, consumeOAuthState, safeReturnPath } = require('../oauth-state-service.js');

async function match(ctx) {
  const { url, method, store, cookie, bodyRaw, headers, req } = ctx;

  if (url === '/api/login' && method === 'POST') {
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const username = String(payload.username || '').trim();
      const password = String(payload.password || '');
      const clientKey = getClientKey(req, headers);
      if (isLoginRateLimited(clientKey)) {
        return jsonResponse(429, { error: 'Muitas tentativas. Aguarde cerca de 15 minutos.' });
      }
      if (checkCredentials(username, password)) {
        clearLoginAttempts(clientKey);
        const token = await createSession(store, username);
        return jsonResponse(200, { ok: true, username }, {
          'Set-Cookie': setSessionCookie(headers, token)
        });
      }
      recordLoginFailure(clientKey);
      return jsonResponse(401, { error: 'Credenciais inválidas' });
    } catch (e) {
      return jsonResponse(400, { error: 'invalid payload' });
    }
  }

  if (url === '/api/logout' && method === 'POST') {
    const adminAccess = await getAdminAccess(store, cookie);
    const setCookies = [clearSessionCookie(headers)];
    if (adminAccess && adminAccess.via === 'password') {
      await destroySession(store, adminAccess.token);
    } else {
      const session = await getSession(store, cookie);
      if (session) await destroySession(store, session.token);
    }
    if (adminAccess && adminAccess.via === 'google') {
      await destroyUserSession(store, adminAccess.token);
      setCookies.push(clearUserSessionCookie(headers));
    }
    return {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      setCookies: setCookies,
      body: JSON.stringify({ ok: true })
    };
  }

  if (url === '/api/me' && method === 'GET') {
    const session = await getAdminSession(store, cookie);
    if (!session) return jsonResponse(401, { authenticated: false });
    return jsonResponse(200, { authenticated: true, username: session.username, via: session.via || 'password' });
  }

  if (url === '/api/auth/config' && method === 'GET') {
    const googleClientId = getGoogleClientId();
    const redirectUri = getGoogleRedirectUri(headers);
    return jsonResponse(200, {
      googleEnabled: !!googleClientId,
      googleClientId: googleClientId || null,
      googleRedirectEnabled: !!(googleClientId && getGoogleClientSecret()),
      redirectUri,
      requiredOrigins: getGoogleOAuthOrigins(),
      requiredRedirectUris: [redirectUri]
    });
  }

  if (url === '/api/auth/google/start' && method === 'GET') {
    const clientId = getGoogleClientId();
    const clientSecret = getGoogleClientSecret();
    if (!clientId || !clientSecret) {
      return redirectResponse(302, '/entrar.html?error=redirect_not_configured');
    }
    const redirectUri = getGoogleRedirectUri(headers);
    const state = createOAuthState();
    const queryParams = new URLSearchParams(req.query || '');
    const returnTo = safeReturnPath(queryParams.get('returnTo'));
    await saveOAuthState(store, state, { returnTo });
    const authUrl = buildGoogleAuthUrl(clientId, redirectUri, state);
    return redirectResponse(302, authUrl, {}, [setOAuthStateCookie(headers, state)]);
  }

  if (url === '/api/auth/google/callback' && method === 'GET') {
    const clientId = getGoogleClientId();
    const clientSecret = getGoogleClientSecret();
    if (!clientId || !clientSecret) {
      return redirectResponse(302, '/entrar.html?error=redirect_not_configured');
    }
    const queryParams = new URLSearchParams(req.query || '');
    const code = queryParams.get('code');
    const state = queryParams.get('state');
    const cookieState = readOAuthState(cookie);
    if (!code || !state || state !== cookieState) {
      return redirectResponse(302, '/entrar.html?error=oauth_state');
    }
    const saved = await consumeOAuthState(store, state);
    const redirectUri = getGoogleRedirectUri(headers);
    try {
      const tokens = await exchangeGoogleAuthCode(clientId, clientSecret, code, redirectUri);
      const googleUser = await verifyGoogleIdToken(tokens.id_token, clientId);
      const user = await upsertGoogleUser(store, googleUser);
      const token = await createUserSession(store, user.id);
      const returnTo = (saved && saved.returnTo) || '/perfil.html';
      return redirectResponse(302, returnTo, {}, [
        setUserSessionCookie(headers, token),
        clearOAuthStateCookie(headers)
      ]);
    } catch (e) {
      return redirectResponse(302, '/entrar.html?error=oauth_failed');
    }
  }

  if (url === '/api/auth/google' && method === 'POST') {
    try {
      const payload = JSON.parse(bodyRaw || '{}');
      const clientId = getGoogleClientId();
      if (!clientId) return jsonResponse(503, { error: 'Google login not configured' });
      const googleUser = await verifyGoogleIdToken(payload.credential, clientId);
      const user = await upsertGoogleUser(store, googleUser);
      const token = await createUserSession(store, user.id);
      return jsonResponse(200, { ok: true, user: publicUserView(user) }, {
        'Set-Cookie': setUserSessionCookie(headers, token)
      });
    } catch (e) {
      return jsonResponse(401, { error: 'invalid google token' });
    }
  }

  return null;
}

module.exports = { match };
