'use strict';

/**
 * Gera content/vida-poemas.json a partir dos poemas do laboratório.
 * Uso: node scripts/sync-vida-poemas.js
 */
const fs = require('fs');
const path = require('path');
const {
  poemPt,
  poemEn,
  poemEs
} = require('../lib/aguas-e-lagrimas-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'content', 'vida-poemas.json');

const doc = {
  updatedAt: new Date().toISOString(),
  poems: [
    {
      id: 'aguas-e-lagrimas',
      slug: 'aguas-e-lagrimas',
      title: 'Águas do Mar e Lágrimas',
      titleEn: 'Sea Waters and Tears',
      titleEs: 'Aguas del Mar y Lágrimas',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'O sal do mar e o da lágrima — máscara, porto no olho e o chamado a ficar.',
      teaserEn:
        'Sea salt and tear salt — mask, harbor in the eye, and the call to stay.',
      teaserEs:
        'Sal del mar y de la lágrima — máscara, puerto en el ojo y el llamado a quedarse.',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: '/posts/post-inspecao-arte-aguas-e-lagrimas.html',
      tags: ['poesia', 'vida', 'mar', 'lágrima']
    }
  ]
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(doc, null, 2) + '\n', 'utf8');
console.log('OK', path.relative(ROOT, OUT), '—', doc.poems.length, 'poema(s)');
