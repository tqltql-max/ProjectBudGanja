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
  poemVingancaEs,
  poemFacaOMelhorPt,
  poemFacaOMelhorEn,
  poemFacaOMelhorEs
} = require('../lib/expressoes-ditados-inspecoes-posts.js');
const {
  poemBomDiaInvernoPt,
  poemBomDiaInvernoEn,
  poemBomDiaInvernoEs
} = require('../lib/bom-dia-inverno-inspecao-post.js');

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
        'O sal do mar e o da lágrima — máscara, porto no olho, ficar e o mantra: faça o melhor.',
      teaserEn:
        'Sea salt and tear salt — mask, harbor in the eye, stay, and the mantra: do your best.',
      teaserEs:
        'Sal del mar y de la lágrima — máscara, puerto en el ojo, quedarse y el mantra: haz lo mejor.',
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
        'O copo é nosso — ficar sem beber o rancor sozinho, e o mantra: faça o melhor.',
      teaserEn:
        'The cup is ours — stay without drinking the grudge alone, and the mantra: do your best.',
      teaserEs:
        'El vaso es nuestro — quedarse sin beber el rencor solo, y el mantra: haz lo mejor.',
      body: poemVingancaPt(),
      bodyEn: poemVingancaEn(),
      bodyEs: poemVingancaEs(),
      inspectionHref:
        '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
      tags: ['poesia', 'vida', 'vingança', 'aviso', 'rancor']
    },
    {
      id: 'faca-o-melhor',
      slug: 'faca-o-melhor',
      title: 'Faça o melhor!',
      titleEn: 'Do Your Best!',
      titleEs: '¡Haz lo mejor!',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'Mantra do laboratório — ofício diário contra o roubo e a proibição que tentam calar a inspeção.',
      teaserEn:
        'Lab mantra — daily craft against theft and prohibition that try to silence the inspection.',
      teaserEs:
        'Mantra del laboratorio — oficio diario contra el robo y la prohibición que intentan callar la inspección.',
      body: poemFacaOMelhorPt(),
      bodyEn: poemFacaOMelhorEn(),
      bodyEs: poemFacaOMelhorEs(),
      inspectionHref: '/posts/post-inspecao-expressao-faca-o-melhor.html',
      tags: ['poesia', 'vida', 'mantra', 'melhor', 'ofício']
    },
    {
      id: 'bom-dia-inverno',
      slug: 'bom-dia-inverno',
      title: 'Bom dia, Inverno',
      titleEn: 'Good Morning, Winter',
      titleEs: 'Buenos días, Invierno',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'A mudinha no gelo — cumprimentar a estação difícil, ficar e faça o melhor.',
      teaserEn:
        'The seedling on the ice — greet the hard season, stay, and do your best.',
      teaserEs:
        'La plantita en el hielo — saludar la estación difícil, quedarse y haz lo mejor.',
      body: poemBomDiaInvernoPt(),
      bodyEn: poemBomDiaInvernoEn(),
      bodyEs: poemBomDiaInvernoEs(),
      inspectionHref: '/posts/post-inspecao-arte-bom-dia-inverno.html',
      tags: ['poesia', 'vida', 'inverno', 'mudinha', 'gelo']
    }
  ]
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(doc, null, 2) + '\n', 'utf8');
console.log('OK', path.relative(ROOT, OUT), '—', doc.poems.length, 'poema(s)');
