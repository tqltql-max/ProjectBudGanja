'use strict';

/**
 * Gera radio/playlist.json a partir dos MP3 em radio/.
 * Deduplica por basename (preferindo o caminho mais curto) e ordena naturalmente.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { ROOT } = require('../lib/paths.js');

function trackIdFromFile(basename) {
  const hash = crypto.createHash('sha1').update(String(basename || '')).digest('hex').slice(0, 12);
  return 't_' + hash;
}

const RADIO_DIR = path.join(ROOT, 'radio');
const OUT_FILE = path.join(RADIO_DIR, 'playlist.json');

function walkMp3(dir, acc) {
  if (!fs.existsSync(dir)) return acc;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkMp3(full, acc);
      continue;
    }
    if (!entry.isFile()) continue;
    if (path.extname(entry.name).toLowerCase() !== '.mp3') continue;
    acc.push(full);
  }
  return acc;
}

function titleFromBasename(basename) {
  let name = basename.replace(/\.mp3$/i, '');
  name = name.replace(/^\d+\s*[-_.]\s*/, '');
  name = name.replace(/\s+/g, ' ').trim();
  return name || basename;
}

function artistFromRel(relPosix) {
  const parts = relPosix.split('/');
  if (parts.length < 2) return 'BudGanja Radio';
  // Pasta do álbum: "Bob Marley - 2002 - One Love..."
  const folder = parts[0];
  const artist = folder.split(/\s*-\s*\d{4}\s*-/)[0].trim();
  return artist || folder;
}

function naturalKey(basename) {
  return basename
    .toLowerCase()
    .replace(/(\d+)/g, (m) => m.padStart(6, '0'));
}

function build() {
  const files = walkMp3(RADIO_DIR, []);
  // Deduplicar por basename — preferir caminho mais curto (raiz ou pasta única).
  const byBase = new Map();
  for (const full of files) {
    const base = path.basename(full);
    const prev = byBase.get(base);
    if (!prev) {
      byBase.set(base, full);
      continue;
    }
    const relNew = path.relative(RADIO_DIR, full);
    const relOld = path.relative(RADIO_DIR, prev);
    // Preferir ficheiro na subpasta do álbum se ambos existem; senão o mais curto.
    const depthNew = relNew.split(path.sep).length;
    const depthOld = relOld.split(path.sep).length;
    if (depthNew > depthOld) byBase.set(base, full);
    else if (depthNew === depthOld && relNew.length < relOld.length) byBase.set(base, full);
  }

  const tracks = Array.from(byBase.values())
    .map((full) => {
      const rel = path.relative(RADIO_DIR, full).split(path.sep).join('/');
      const basename = path.basename(full);
      return {
        id: trackIdFromFile(basename),
        title: titleFromBasename(basename),
        artist: artistFromRel(rel),
        url: '/radio/' + rel.split('/').map(encodeURIComponent).join('/'),
        file: basename
      };
    })
    .sort((a, b) => naturalKey(a.file).localeCompare(naturalKey(b.file), 'pt-BR'));

  const playlist = {
    updatedAt: new Date().toISOString(),
    trackCount: tracks.length,
    tracks: tracks.map(({ id, title, artist, url }) => ({ id, title, artist, url }))
  };

  if (!fs.existsSync(RADIO_DIR)) fs.mkdirSync(RADIO_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(playlist, null, 2) + '\n', 'utf8');
  console.log('radio/playlist.json: ' + tracks.length + ' faixas');
}

build();
