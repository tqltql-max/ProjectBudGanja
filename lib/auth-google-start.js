'use strict';

const crypto = require('crypto');
const {
  getGoogleClientId,
  getGoogleClientSecret,
  getGoogleRedirectUri,
  cookieHeader,
  isSecureRequest
} = require('./utils.js');
const { safeReturnPath } = require('./oauth-state-service.js');

const OAUTH_STATE_COOKIE = 'budganja_oauth_state';
const OAUTH_STATE_MAX_AGE_SEC = 10 * 60;

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

function encodeOAuthState(returnTo) {
  const nonce = crypto.randomBytes(24).toString('hex');
  const dest = safeReturnPath(returnTo);
  return nonce + '.' + Buffer.from(dest, 'utf8').toString('base64url');
}

function decodeOAuthReturnTo(state) {
  const parts = String(state || '').split('.');
  if (parts.length < 2) return '/perfil.html';
  try {
    return safeReturnPath(Buffer.from(parts[1], 'base64url').toString('utf8'));
  } catch (e) {
    return '/perfil.html';
  }
}

function redirectResponse(location, setCookies) {
  return {
    status: 302,
    statusCode: 302,
    headers: { Location: location, 'Cache-Control': 'no-store' },
    setCookies: setCookies || [],
    body: ''
  };
}

function handleGoogleStart(req) {
  const headers = (req && req.headers) || {};
  const clientId = getGoogleClientId();
  const clientSecret = getGoogleClientSecret();
  if (!clientId || !clientSecret) {
    return redirectResponse('/entrar.html?error=redirect_not_configured');
  }
  const returnTo = safeReturnPath(queryFrom(req).get('returnTo'));
  const state = encodeOAuthState(returnTo);
  const redirectUri = getGoogleRedirectUri(headers);
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state: state,
    access_type: 'online',
    prompt: 'select_account'
  });
  const cookie = cookieHeader(
    OAUTH_STATE_COOKIE,
    state,
    OAUTH_STATE_MAX_AGE_SEC,
    isSecureRequest(headers),
    'Lax'
  );
  return redirectResponse(
    'https://accounts.google.com/o/oauth2/v2/auth?' + params.toString(),
    [cookie]
  );
}

function toNetlifyResponse(response) {
  const outHeaders = Object.assign({ 'Cache-Control': 'no-store' }, (response && response.headers) || {});
  const cookies = (response && response.setCookies) || [];
  if (cookies.length === 1) {
    outHeaders['Set-Cookie'] = cookies[0];
  }
  const result = {
    statusCode: (response && (response.statusCode || response.status)) || 302,
    headers: outHeaders,
    body: (response && response.body) || ''
  };
  if (cookies.length > 1) {
    result.multiValueHeaders = { 'Set-Cookie': cookies };
  }
  return result;
}

module.exports = {
  OAUTH_STATE_COOKIE,
  handleGoogleStart,
  encodeOAuthState,
  decodeOAuthReturnTo,
  toNetlifyResponse
};
