'use strict';

const {
  createUserSession,
  destroyUserSession,
  getUserSession,
  setUserSessionCookie,
  clearUserSessionCookie,
  registerLocalUser,
  loginLocalUser,
  requestLocalPasswordReset,
  resetLocalPassword,
  getUserById,
  publicUserView
} = require('./user-auth-service.js');

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
    statusCode: status,
    headers,
    setCookies,
    body: JSON.stringify(obj)
  };
}

function parseBody(raw, isBase64) {
  if (!raw) return '';
  if (isBase64) return Buffer.from(raw, 'base64').toString('utf8');
  return raw;
}

function getClientIp(headers) {
  const h = headers || {};
  const forwarded = String(h['x-forwarded-for'] || h['X-Forwarded-For'] || '').trim();
  if (forwarded) return forwarded.split(',')[0].trim().slice(0, 120);
  return String(h['x-real-ip'] || h['X-Real-IP'] || '').trim().slice(0, 120);
}

function isLightAuthRoute(apiPath, method) {
  const m = String(method || 'GET').toUpperCase();
  if (apiPath === '/api/auth/local/register' && m === 'POST') return true;
  if (apiPath === '/api/auth/local/login' && m === 'POST') return true;
  if (apiPath === '/api/auth/local/request-reset' && m === 'POST') return true;
  if (apiPath === '/api/auth/local/reset' && m === 'POST') return true;
  if (apiPath === '/api/user/me' && m === 'GET') return true;
  if (apiPath === '/api/user/logout' && m === 'POST') return true;
  return false;
}

async function handleLightAuth(event, store, apiPath) {
  const method = String(event.httpMethod || 'GET').toUpperCase();
  const headers = event.headers || {};
  const cookie = headers.cookie || headers.Cookie || '';
  const authMeta = {
    ipAddress: getClientIp(headers),
    userAgent: String(headers['user-agent'] || headers['User-Agent'] || '').slice(0, 220)
  };
  const bodyRaw = parseBody(event.body, event.isBase64Encoded);

  if (apiPath === '/api/auth/local/register' && method === 'POST') {
    const payload = JSON.parse(bodyRaw || '{}');
    const result = await registerLocalUser(store, payload, authMeta);
    if (!result.ok) {
      return jsonResponse(result.status || 400, {
        error: result.error || 'Não foi possível criar conta.'
      });
    }
    const token = await createUserSession(store, result.user.id);
    return jsonResponse(200, {
      ok: true,
      linked: !!result.linked,
      user: publicUserView(result.user)
    }, {
      'Set-Cookie': setUserSessionCookie(headers, token)
    });
  }

  if (apiPath === '/api/auth/local/login' && method === 'POST') {
    const payload = JSON.parse(bodyRaw || '{}');
    const result = await loginLocalUser(store, payload, authMeta);
    if (!result.ok) {
      return jsonResponse(result.status || 401, {
        error: result.error || 'E-mail ou senha inválidos.'
      });
    }
    const token = await createUserSession(store, result.user.id);
    return jsonResponse(200, {
      ok: true,
      user: publicUserView(result.user)
    }, {
      'Set-Cookie': setUserSessionCookie(headers, token)
    });
  }

  if (apiPath === '/api/auth/local/request-reset' && method === 'POST') {
    const payload = JSON.parse(bodyRaw || '{}');
    const result = await requestLocalPasswordReset(store, payload, headers);
    return jsonResponse(200, result);
  }

  if (apiPath === '/api/auth/local/reset' && method === 'POST') {
    const payload = JSON.parse(bodyRaw || '{}');
    const result = await resetLocalPassword(store, payload);
    if (!result.ok) {
      return jsonResponse(result.status || 400, {
        error: result.error || 'Não foi possível atualizar a senha.'
      });
    }
    const token = await createUserSession(store, result.user.id);
    return jsonResponse(200, {
      ok: true,
      user: publicUserView(result.user)
    }, {
      'Set-Cookie': setUserSessionCookie(headers, token)
    });
  }

  if (apiPath === '/api/user/logout' && method === 'POST') {
    const session = await getUserSession(store, cookie);
    await destroyUserSession(store, session && session.token);
    return jsonResponse(200, { ok: true }, {
      'Set-Cookie': clearUserSessionCookie(headers)
    });
  }

  if (apiPath === '/api/user/me' && method === 'GET') {
    const session = await getUserSession(store, cookie);
    if (!session) return jsonResponse(401, { authenticated: false });
    const user = await getUserById(store, session.userId);
    if (!user) return jsonResponse(401, { authenticated: false });
    return jsonResponse(200, Object.assign({ authenticated: true }, publicUserView(user)));
  }

  return null;
}

module.exports = {
  isLightAuthRoute,
  handleLightAuth
};
