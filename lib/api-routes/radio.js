'use strict';

const { jsonResponse } = require('./_helpers.js');
const { loadRadioCatalog, resolveRadioPlaylist } = require('../radio-service.js');

async function match(ctx) {
  const { url, method } = ctx;

  if (url === '/api/radio/catalog' && method === 'GET') {
    const tracks = loadRadioCatalog();
    return jsonResponse(200, {
      ok: true,
      tracks,
      trackCount: tracks.length
    });
  }

  if (url === '/api/radio/playlist' && method === 'GET') {
    const result = await resolveRadioPlaylist();
    return jsonResponse(200, {
      ok: true,
      source: result.source,
      tracks: result.tracks,
      catalogCount: result.catalogCount
    });
  }

  // Endpoints antigos de rádio pessoal — desactivados.
  if (url === '/api/user/radio') {
    return jsonResponse(410, {
      error: 'A rádio pessoal foi descontinuada. Use /radio/ para a playlist do laboratório.'
    });
  }

  return null;
}

module.exports = { match };
