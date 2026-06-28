'use strict';

function jsonResponse(status, obj, extraHeaders) {
  const headers = Object.assign({ 'Content-Type': 'application/json' }, extraHeaders || {});
  const setCookies = [];
  if (headers['Set-Cookie']) {
    setCookies.push(headers['Set-Cookie']);
    delete headers['Set-Cookie'];
  }
  return {
    status,
    headers,
    setCookies,
    body: JSON.stringify(obj)
  };
}

function redirectResponse(status, location, extraHeaders, setCookies) {
  return {
    status,
    headers: Object.assign({ Location: location }, extraHeaders || {}),
    setCookies: setCookies || [],
    body: ''
  };
}

function parseBody(raw, isBase64) {
  if (!raw) return '';
  if (isBase64) return Buffer.from(raw, 'base64').toString('utf8');
  return raw;
}

module.exports = { jsonResponse, redirectResponse, parseBody };
