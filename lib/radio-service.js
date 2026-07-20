'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { ROOT } = require('./paths.js');
const { getUserById, publicUserView, sanitizeUsername } = require('./user-auth-service.js');

const MAX_USER_TRACKS = 5;
const PLAYLIST_PATH = path.join(ROOT, 'radio', 'playlist.json');

function trackIdFromFile(basename) {
  const hash = crypto.createHash('sha1').update(String(basename || '')).digest('hex').slice(0, 12);
  return 't_' + hash;
}

function loadRadioCatalog() {
  try {
    const raw = JSON.parse(fs.readFileSync(PLAYLIST_PATH, 'utf8'));
    const tracks = Array.isArray(raw && raw.tracks) ? raw.tracks : [];
    return tracks.map((t, i) => {
      const url = String(t && t.url || '').trim();
      const title = String(t && t.title || '').trim() || ('Faixa ' + (i + 1));
      const artist = String(t && t.artist || '').trim() || 'BudGanja Radio';
      const id = String(t && t.id || '').trim() || trackIdFromFile(path.basename(decodeURIComponent(url.split('/').pop() || String(i))));
      if (!url.startsWith('/radio/')) return null;
      return { id, title, artist, url };
    }).filter(Boolean);
  } catch (e) {
    return [];
  }
}

function sanitizeRadioTrackIds(raw, catalog) {
  const byId = new Map((catalog || loadRadioCatalog()).map((t) => [t.id, t]));
  if (!Array.isArray(raw)) return [];
  const out = [];
  const seen = new Set();
  for (const item of raw) {
    const id = String(item || '').trim().slice(0, 40);
    if (!id || seen.has(id) || !byId.has(id)) continue;
    seen.add(id);
    out.push(id);
    if (out.length >= MAX_USER_TRACKS) break;
  }
  return out;
}

function sanitizeRadioTrackIdsLoose(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  const seen = new Set();
  for (const item of raw) {
    const id = String(item || '').trim().slice(0, 40);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push(id);
    if (out.length >= MAX_USER_TRACKS) break;
  }
  return out;
}

function tracksFromIds(ids, catalog) {
  const byId = new Map((catalog || []).map((t) => [t.id, t]));
  return (ids || []).map((id) => byId.get(id)).filter(Boolean);
}

async function findUserByUsername(store, usernameRaw) {
  const username = sanitizeUsername(usernameRaw);
  if (!username) return null;
  const users = await store.getUsers();
  const needle = username.toLowerCase();
  for (const user of Object.values(users || {})) {
    const u = sanitizeUsername(user && user.username);
    if (u && u.toLowerCase() === needle) return user;
  }
  return null;
}

async function updateUserRadioTracks(store, userId, trackIds) {
  const users = await store.getUsers();
  const user = users[userId];
  if (!user) return null;
  const catalog = loadRadioCatalog();
  const sanitized = sanitizeRadioTrackIds(trackIds, catalog);
  const prev = user.profile && typeof user.profile === 'object' ? user.profile : {};
  user.profile = Object.assign({}, prev, { radioTrackIds: sanitized });
  user.updatedAt = new Date().toISOString();
  users[userId] = user;
  await store.setUsers(users);
  return user;
}

function publicRadioOwner(user) {
  if (!user) return null;
  const view = publicUserView(user);
  return {
    username: view.username || '',
    name: (view.profile && view.profile.displayName) || view.name || 'Cultivador',
    picture: view.picture || ''
  };
}

/**
 * Resolve playlist for mini-player / página.
 * options: { username } para rádio partilhada; senão usa sessão se existir.
 */
async function resolveRadioPlaylist(store, options) {
  const catalog = loadRadioCatalog();
  const username = String(options && options.username || '').trim();

  if (username) {
    const user = await findUserByUsername(store, username);
    if (!user) {
      return { ok: false, status: 404, error: 'Utilizador não encontrado.' };
    }
    const ids = sanitizeRadioTrackIds(
      user.profile && user.profile.radioTrackIds,
      catalog
    );
    const tracks = tracksFromIds(ids, catalog);
    if (!tracks.length) {
      return {
        ok: true,
        source: 'user-empty',
        owner: publicRadioOwner(user),
        tracks: [],
        catalogCount: catalog.length,
        maxTracks: MAX_USER_TRACKS
      };
    }
    return {
      ok: true,
      source: 'user',
      owner: publicRadioOwner(user),
      tracks,
      catalogCount: catalog.length,
      maxTracks: MAX_USER_TRACKS
    };
  }

  let owner = null;
  let tracks = catalog;
  let source = 'catalog';

  if (options && options.userId) {
    const user = await getUserById(store, options.userId);
    if (user) {
      owner = publicRadioOwner(user);
      const ids = sanitizeRadioTrackIds(
        user.profile && user.profile.radioTrackIds,
        catalog
      );
      const personal = tracksFromIds(ids, catalog);
      if (personal.length) {
        tracks = personal;
        source = 'user';
      }
    }
  }

  return {
    ok: true,
    source,
    owner,
    tracks,
    catalog,
    catalogCount: catalog.length,
    maxTracks: MAX_USER_TRACKS
  };
}

module.exports = {
  MAX_USER_TRACKS,
  trackIdFromFile,
  loadRadioCatalog,
  sanitizeRadioTrackIds,
  sanitizeRadioTrackIdsLoose,
  updateUserRadioTracks,
  findUserByUsername,
  resolveRadioPlaylist,
  publicRadioOwner
};
