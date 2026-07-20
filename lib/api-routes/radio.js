'use strict';

const { jsonResponse } = require('./_helpers.js');
const { getUserSession, publicUserView } = require('../user-auth-service.js');
const {
  loadRadioCatalog,
  resolveRadioPlaylist,
  updateUserRadioTracks,
  MAX_USER_TRACKS
} = require('../radio-service.js');

async function match(ctx) {
  const { url, method, store, cookie, bodyRaw } = ctx;
  const query = ctx.req.query ? new URLSearchParams(ctx.req.query) : new URLSearchParams();

  if (url === '/api/radio/catalog' && method === 'GET') {
    const tracks = loadRadioCatalog();
    return jsonResponse(200, {
      ok: true,
      tracks,
      trackCount: tracks.length,
      maxTracks: MAX_USER_TRACKS
    });
  }

  if (url === '/api/radio/playlist' && method === 'GET') {
    const username = query.get('u') || query.get('username') || '';
    const session = await getUserSession(store, cookie);
    const result = await resolveRadioPlaylist(store, {
      username,
      userId: !username && session ? session.userId : null
    });
    if (!result.ok) return jsonResponse(result.status || 404, { error: result.error });
    return jsonResponse(200, {
      ok: true,
      source: result.source,
      owner: result.owner,
      tracks: result.tracks,
      catalogCount: result.catalogCount,
      maxTracks: result.maxTracks
    });
  }

  if (url === '/api/user/radio' && method === 'GET') {
    const session = await getUserSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    const { getUserById } = require('../user-auth-service.js');
    const { sanitizeRadioTrackIds } = require('../radio-service.js');
    const user = await getUserById(store, session.userId);
    const catalog = loadRadioCatalog();
    const selectedIds = sanitizeRadioTrackIds(
      user && user.profile && user.profile.radioTrackIds,
      catalog
    );
    const result = await resolveRadioPlaylist(store, { userId: session.userId });
    return jsonResponse(200, {
      ok: true,
      source: result.source,
      owner: result.owner,
      tracks: result.tracks,
      catalog,
      selectedIds,
      maxTracks: MAX_USER_TRACKS
    });
  }

  if (url === '/api/user/radio' && method === 'PUT') {
    const session = await getUserSession(store, cookie);
    if (!session) return jsonResponse(401, { error: 'authentication required' });
    let payload;
    try {
      payload = JSON.parse(bodyRaw || '{}');
    } catch (e) {
      return jsonResponse(400, { error: 'Pedido inválido.' });
    }
    const trackIds = payload && Array.isArray(payload.trackIds)
      ? payload.trackIds
      : (payload && Array.isArray(payload.radioTrackIds) ? payload.radioTrackIds : []);
    const user = await updateUserRadioTracks(store, session.userId, trackIds);
    if (!user) return jsonResponse(404, { error: 'utilizador não encontrado' });
    const result = await resolveRadioPlaylist(store, { userId: session.userId });
    return jsonResponse(200, {
      ok: true,
      user: publicUserView(user),
      tracks: result.tracks,
      source: result.source,
      maxTracks: MAX_USER_TRACKS
    });
  }

  return null;
}

module.exports = { match };
