'use strict';

/**
 * Gera content/videos-hub.json (fallback estático / SW) a partir dos catálogos.
 * Uso: node scripts/build-videos-hub.js
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { buildVideosHub } = require('../lib/videos-hub.js');

const OUT = path.join(ROOT, 'content', 'videos-hub.json');
const hub = buildVideosHub(ROOT);
fs.writeFileSync(OUT, JSON.stringify(hub, null, 2) + '\n', 'utf8');
console.log(
  'videos-hub.json:',
  hub.videos.length,
  'vídeos ·',
  hub.channels.map((c) => c.id + '=' + c.count).join(', ')
);
