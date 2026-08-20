'use strict';

const { handleApiRequest } = require('./api-handler.js');
const { createSqlStore } = require('./store-sql.js');
const { createR2UploadStore, createNoopUploadStore } = require('./store-r2.js');
const { handleGoogleStart } = require('./auth-google-start.js');
const { isGoogleAuthRoute, handleGoogleAuth } = require('./auth-google-oauth.js');
const { isLightAuthRoute, handleLightAuth } = require('./auth-api-light.js');
const { areNewRegistrationsAllowed, REGISTRATION_CLOSED_MESSAGE } = require('./registration-gate.js');
const { getGoogleClientId, getGoogleClientSecret } = require('./utils.js');

let storePromise = null;

function applyEnv(env) {
  if (!env) return;
  const keys = Object.keys(env);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const val = env[key];
    if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
      process.env[key] = String(val);
    }
  }
  process.env.CF_PAGES = '1';
  process.env.STORE_BACKEND = process.env.STORE_BACKEND || 'sql';
}

function bindUploads(sqlStore, uploads) {
  return Object.assign({}, sqlStore, {
    saveUpload: uploads.saveUpload.bind(uploads),
    getUpload: uploads.getUpload.bind(uploads),
    listUploads: uploads.listUploads.bind(uploads),
    deleteUpload: uploads.deleteUpload.bind(uploads)
  });
}

async function createCloudflareStore(env) {
  const url = String(env.TURSO_DATABASE_URL || process.env.TURSO_DATABASE_URL || '').trim();
  if (!url) {
    throw new Error('TURSO_DATABASE_URL em falta na Cloudflare Pages.');
  }
  const sqlStore = await createSqlStore(null);
  const uploads = env.UPLOADS
    ? createR2UploadStore(env.UPLOADS)
    : createNoopUploadStore();
  return bindUploads(sqlStore, uploads);
}

function getStore(env) {
  if (!storePromise) {
    storePromise = createCloudflareStore(env);
  }
  return storePromise;
}

function headersFromRequest(request) {
  const headers = {};
  request.headers.forEach(function (value, key) {
    headers[key] = value;
    headers[key.toLowerCase()] = value;
  });
  if (!headers['x-forwarded-for'] && headers['cf-connecting-ip']) {
    headers['x-forwarded-for'] = headers['cf-connecting-ip'];
  }
  return headers;
}

async function requestToApiReq(request, url, apiPath) {
  const buf = await request.arrayBuffer();
  const hasBody = buf && buf.byteLength > 0;
  const method = request.method || 'GET';
  const contentType = String(request.headers.get('content-type') || '').toLowerCase();
  const jsonLike = contentType.indexOf('application/json') !== -1 || contentType.indexOf('text/') === 0;
  return {
    method: method,
    httpMethod: method,
    path: apiPath || url.pathname,
    headers: headersFromRequest(request),
    body: hasBody
      ? (jsonLike ? Buffer.from(buf).toString('utf8') : Buffer.from(buf).toString('base64'))
      : '',
    isBase64Encoded: !!(hasBody && !jsonLike),
    query: url.search.startsWith('?') ? url.search.slice(1) : url.search
  };
}

function jsonResponse(status, obj) {
  return new Response(JSON.stringify(obj), {
    status: status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  });
}

function toPagesResponse(result) {
  if (result instanceof Response) return result;
  const headers = new Headers();
  const src = (result && result.headers) || {};
  Object.keys(src).forEach(function (key) {
    if (String(key).toLowerCase() === 'set-cookie') return;
    if (src[key] == null) return;
    headers.set(key, String(src[key]));
  });
  if (!headers.has('Cache-Control')) headers.set('Cache-Control', 'no-store');
  const cookies = ((result && result.setCookies) || []).slice();
  if (src['Set-Cookie']) cookies.push(src['Set-Cookie']);
  if (src['set-cookie']) cookies.push(src['set-cookie']);
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i]) headers.append('Set-Cookie', String(cookies[i]));
  }
  const status = (result && (result.status || result.statusCode)) || 200;
  const body = result && result.body != null ? result.body : '';
  return new Response(body, { status: status, headers: headers });
}

async function handleApi(context) {
  const request = context.request;
  const env = context.env || {};
  applyEnv(env);

  const url = new URL(request.url);
  const apiPath = url.pathname.startsWith('/api/') ? url.pathname : '/api' + (url.pathname === '/' ? '' : url.pathname);
  const method = (request.method || 'GET').toUpperCase();
  const lightAuth = (
    apiPath === '/api/auth/registration-status'
    || apiPath === '/api/auth/config'
    || apiPath === '/api/auth/google/start'
  ) && method === 'GET';

  if (apiPath === '/api/auth/registration-status' && method === 'GET') {
    const open = areNewRegistrationsAllowed();
    return jsonResponse(200, {
      open: open,
      message: open ? '' : REGISTRATION_CLOSED_MESSAGE
    });
  }

  if (apiPath === '/api/auth/config' && method === 'GET') {
    const googleClientId = getGoogleClientId();
    return jsonResponse(200, {
      googleEnabled: !!googleClientId,
      googleClientId: googleClientId || null,
      googleRedirectEnabled: !!(googleClientId && getGoogleClientSecret())
    });
  }

  if (apiPath === '/api/auth/google/start' && method === 'GET') {
    try {
      return toPagesResponse(handleGoogleStart({
        headers: headersFromRequest(request),
        query: url.search.startsWith('?') ? url.search.slice(1) : url.search
      }));
    } catch (e) {
      return Response.redirect(new URL('/entrar.html?error=server_error', url.origin).toString(), 302);
    }
  }

  let store;
  try {
    store = await getStore(env);
  } catch (e) {
    if (lightAuth) {
      return jsonResponse(503, { error: 'Servidor de contas indisponível. Tente novamente em instantes.' });
    }
    return jsonResponse(503, { error: 'Servidor de contas indisponível. Tente novamente em instantes.' });
  }

  const apiReq = await requestToApiReq(request, url, apiPath);

  if (isGoogleAuthRoute(apiPath, method)) {
    try {
      const response = await handleGoogleAuth(apiReq, { store: store });
      if (!response) return jsonResponse(404, { error: 'Rota não encontrada.' });
      return toPagesResponse(response);
    } catch (e) {
      return Response.redirect(new URL('/entrar.html?error=server_error', url.origin).toString(), 302);
    }
  }

  if (isLightAuthRoute(apiPath, method)) {
    try {
      const response = await handleLightAuth(apiReq, store, apiPath);
      if (!response) return jsonResponse(404, { error: 'Rota não encontrada.' });
      return toPagesResponse(response);
    } catch (e) {
      return jsonResponse(400, { error: 'Pedido inválido.' });
    }
  }

  try {
    const response = await handleApiRequest(apiReq, {
      store: store,
      root: null,
      fsFallback: null
    });
    return toPagesResponse(response);
  } catch (e) {
    return jsonResponse(500, { error: 'Servidor indisponível. Tente novamente em instantes.' });
  }
}

async function handleUploads(context) {
  const request = context.request;
  const env = context.env || {};
  applyEnv(env);

  const url = new URL(request.url);
  const name = decodeURIComponent(url.pathname.replace(/^\/uploads\//, '')).replace(/^\/+/, '');
  if (!name || name.includes('..') || name.includes('\\')) {
    return new Response('Invalid filename', { status: 400 });
  }

  try {
    const store = await getStore(env);
    const file = await store.getUpload(name);
    if (!file) return new Response('Not found', { status: 404 });
    return new Response(file.buffer, {
      status: 200,
      headers: {
        'Content-Type': file.contentType,
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } catch (e) {
    return new Response('Not found', { status: 404 });
  }
}

async function handleCloudflarePagesRequest(context, options) {
  const kind = (options && options.kind) || 'api';
  if (kind === 'uploads') return handleUploads(context);
  return handleApi(context);
}

module.exports = {
  handleCloudflarePagesRequest,
  handleApi,
  handleUploads
};
