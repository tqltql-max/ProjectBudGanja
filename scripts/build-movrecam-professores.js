'use strict';

/**
 * Gera content/channels/movrecam-professores.json a partir dos títulos MovReCam.
 * Uso: node scripts/build-movrecam-professores.js
 */

const { writeMovrecamProfessorsJson } = require('../lib/movrecam-professor-series.js');
const { ROOT } = require('../lib/paths.js');

const { out, doc } = writeMovrecamProfessorsJson(ROOT);
console.log(
  'OK:',
  out,
  '·',
  doc.professorCount,
  'professores ·',
  doc.taggedVideoCount + '/' + doc.catalogVideoCount,
  'vídeos com nome'
);
doc.summary.slice(0, 15).forEach((p) => {
  console.log(' ', String(p.count).padStart(3), p.label);
});
