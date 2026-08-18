const path = require('path');
const { connectLambda } = require('@netlify/blobs');

const ROOT = path.resolve(__dirname, '../..');

function resolveApiPath(event) {
  const raw = event.rawUrl || event.path || '';
  try {
    const u = new URL(raw, 'https://localhost');
    if (u.pathname.startsWith('/api/')) return u.pathname;
  } catch (e) { /* ignore */ }

  const p = event.path || '';
  if (p.includes('/.netlify/functions/api/')) {
    return '/api/' + p.split('/.netlify/functions/api/')[1];
  }
  if (p.startsWith('/api/')) return p;

  const route = event.queryStringParameters && event.queryStringParameters.route;
  if (route) return '/api/' + route;

  return '/api';
}

exports.handler = async (event) => {
  const apiPath = resolveApiPath(event);
  const method = event.httpMethod || 'GET';
  const lightAuth = (apiPath === '/api/auth/registration-status' || apiPath === '/api/auth/config') && method === 'GET';
  try {
    connectLambda(event);
  } catch (e) {
    if (!lightAuth) {
      return {
        statusCode: 503,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        body: JSON.stringify({ error: 'Servidor de contas indisponível. Tente novamente em instantes.' })
      };
    }
  }

  if (apiPath === '/api/auth/registration-status' && method === 'GET') {
    const {
      areNewRegistrationsAllowed,
      REGISTRATION_CLOSED_MESSAGE
    } = require('../../lib/registration-gate.js');
    const open = areNewRegistrationsAllowed();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({
        open: open,
        message: open ? '' : REGISTRATION_CLOSED_MESSAGE
      })
    };
  }

  if (apiPath === '/api/auth/config' && method === 'GET') {
    const { getGoogleClientId, getGoogleClientSecret } = require('../../lib/utils.js');
    const googleClientId = getGoogleClientId();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({
        googleEnabled: !!googleClientId,
        googleClientId: googleClientId || null,
        googleRedirectEnabled: !!(googleClientId && getGoogleClientSecret())
      })
    };
  }

  const { isLightAuthRoute, handleLightAuth } = require('../../lib/auth-api-light.js');
  if (isLightAuthRoute(apiPath, method)) {
    let authStore;
    try {
      const { createAppStore } = require('../../lib/create-store.js');
      authStore = await createAppStore({ root: ROOT, netlify: true });
    } catch (e) {
      return {
        statusCode: 503,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        body: JSON.stringify({ error: 'Servidor de contas indisponível. Tente novamente em instantes.' })
      };
    }
    try {
      const response = await handleLightAuth(event, authStore, apiPath);
      if (!response) {
        return {
          statusCode: 404,
          headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
          body: JSON.stringify({ error: 'Rota não encontrada.' })
        };
      }
      const outHeaders = Object.assign({ 'Cache-Control': 'no-store' }, response.headers || {});
      if (response.setCookies && response.setCookies.length) {
        outHeaders['Set-Cookie'] = response.setCookies;
      }
      return {
        statusCode: response.statusCode,
        headers: outHeaders,
        body: response.body
      };
    } catch (e) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        body: JSON.stringify({ error: 'Pedido inválido.' })
      };
    }
  }

  let store;
  let handleApiRequest;
  try {
    const { createAppStore } = require('../../lib/create-store.js');
    store = await createAppStore({ root: ROOT, netlify: true });
    handleApiRequest = require('../../lib/api-handler.js').handleApiRequest;
  } catch (e) {
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({
        error: 'Servidor de contas indisponível. Tente novamente em instantes.'
      })
    };
  }

  const query = (event.rawQuery || event.rawUrl || '').split('?')[1] || '';

  const response = await handleApiRequest({
    method: method,
    path: apiPath,
    headers: event.headers || {},
    body: event.body,
    isBase64Encoded: event.isBase64Encoded,
    query
  }, { store, root: null, fsFallback: ROOT });

  const outHeaders = Object.assign({ 'Cache-Control': 'no-store' }, response.headers || {});
  if (response.setCookies && response.setCookies.length) {
    outHeaders['Set-Cookie'] = response.setCookies;
  }

  return {
    statusCode: response.status,
    headers: outHeaders,
    body: response.body
  };
};
