'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { ROOT } = require('./paths.js');

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
      const url = String((t && t.url) || '').trim();
      const title = String((t && t.title) || '').trim() || 'Faixa ' + (i + 1);
      const artist = String((t && t.artist) || '').trim() || 'BudGanja Radio';
      const id =
        String((t && t.id) || '').trim() ||
        trackIdFromFile(path.basename(decodeURIComponent(url.split('/').pop() || String(i))));
      if (!url.startsWith('/radio/')) return null;
      return { id, title, artist, url };
    }).filter(Boolean);
  } catch (e) {
    return [];
  }
}

/**
 * Playlist do laboratório (catálogo completo).
 * Personalização por utilizador foi removida.
 */
async function resolveRadioPlaylist() {
  const catalog = loadRadioCatalog();
  return {
    ok: true,
    source: 'catalog',
    owner: null,
    tracks: catalog,
    catalog,
    catalogCount: catalog.length
  };
}

module.exports = {
  trackIdFromFile,
  loadRadioCatalog,
  resolveRadioPlaylist
};
