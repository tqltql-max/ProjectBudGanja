'use strict';

const path = require('path');
require('../../lib/load-env.js');
const { connectLambda } = require('@netlify/blobs');
const { handleGoogleAuth } = require('../../lib/auth-google-oauth.js');
const { toNetlifyResponse } = require('../../lib/auth-google-start.js');

const ROOT = path.resolve(__dirname, '../..');

function queryFromEvent(event) {
  if (event.rawQuery) return event.rawQuery;
  if (event.rawUrl && String(event.rawUrl).includes('?')) return String(event.rawUrl).split('?')[1];
  return new URLSearchParams(event.queryStringParameters || {}).toString();
}

function redirect(location) {
  return {
    statusCode: 302,
    headers: { Location: location, 'Cache-Control': 'no-store' },
    body: ''
  };
}

exports.handler = async (event) => {
  try {
    try {
      connectLambda(event);
    } catch (e) {
      /* sem blobs ainda dá para validar o state pelo cookie */
    }
    // Require tardio: create-store só carrega o driver SQL se houver Turso configurado.
    let store = null;
    try {
      const { createAppStore } = require('../../lib/create-store.js');
      store = await createAppStore({ root: ROOT, netlify: true });
    } catch (e) {
      store = null;
    }
    if (!store) return redirect('/entrar.html?error=server_error');
    const response = await handleGoogleAuth({
      method: event.httpMethod || 'GET',
      path: '/api/auth/google/callback',
      headers: event.headers || {},
      query: queryFromEvent(event)
    }, { store });
    if (!response) return redirect('/entrar.html?error=server_error');
    return toNetlifyResponse(response);
  } catch (e) {
    return redirect('/entrar.html?error=server_error');
  }
};
