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
const {
  poemVingancaPt,
  poemVingancaEn,
  poemVingancaEs
} = require('../lib/expressoes-ditados-inspecoes-posts.js');

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
    },
    {
      id: 'vinganca-nunca-e-plena',
      slug: 'vinganca-nunca-e-plena',
      title: 'A vingança nunca é plena',
      titleEn: 'Revenge Is Never Complete',
      titleEs: 'La venganza nunca es plena',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'O copo é nosso — vingança que nunca fecha a conta, e o chamado a ficar sem beber o rancor sozinho.',
      teaserEn:
        'The cup is ours — revenge that never settles the score, and the call to stay without drinking the grudge alone.',
      teaserEs:
        'El vaso es nuestro — venganza que nunca cierra la cuenta, y el llamado a quedarse sin beber el rencor solo.',
      body: poemVingancaPt(),
      bodyEn: poemVingancaEn(),
      bodyEs: poemVingancaEs(),
      inspectionHref:
        '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
      tags: ['poesia', 'vida', 'vingança', 'aviso', 'rancor']
    }
  ]
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(doc, null, 2) + '\n', 'utf8');
console.log('OK', path.relative(ROOT, OUT), '—', doc.poems.length, 'poema(s)');
