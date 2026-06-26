const path = require('path');
const { connectLambda } = require('@netlify/blobs');
const { createBlobStore } = require('../../lib/store-blobs.js');
const { handleApiRequest } = require('../../lib/api-handler.js');
const { ensureBlobSeed } = require('../../lib/seed-blobs.js');

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
  connectLambda(event);

  const store = createBlobStore();
  await ensureBlobSeed(store, ROOT);

  const query = (event.rawQuery || event.rawUrl || '').split('?')[1] || '';

  const response = await handleApiRequest({
    method: event.httpMethod,
    path: resolveApiPath(event),
    headers: event.headers || {},
    body: event.body,
    isBase64Encoded: event.isBase64Encoded,
    query
  }, { store, root: null, fsFallback: ROOT });

  return {
    statusCode: response.status,
    headers: Object.assign({ 'Cache-Control': 'no-store' }, response.headers),
    body: response.body
  };
};
