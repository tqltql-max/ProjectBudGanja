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
const {
  poemArvoreDaVidaPt,
  poemArvoreDaVidaEn,
  poemArvoreDaVidaEs
} = require('../lib/palavras-inspecoes-posts.js');
const {
  poemCultivoOInicioPt,
  poemCultivoOInicioEn,
  poemCultivoOInicioEs
} = require('../lib/cultivo-o-inicio-inspecao-post.js');
const {
  poemKillingInTheNamePt,
  poemKillingInTheNameEn,
  poemKillingInTheNameEs
} = require('../lib/killing-in-the-name-inspecao-post.js');
const {
  poemAllRightNowPt,
  poemAllRightNowEn,
  poemAllRightNowEs
} = require('../lib/all-right-now-inspecao-post.js');
const {
  poemUnderPressurePt,
  poemUnderPressureEn,
  poemUnderPressureEs
} = require('../lib/under-pressure-inspecao-post.js');
const {
  poemUpsideDownPt,
  poemUpsideDownEn,
  poemUpsideDownEs
} = require('../lib/upside-down-inspecao-post.js');
const {
  poemHowBizarrePt,
  poemHowBizarreEn,
  poemHowBizarreEs
} = require('../lib/how-bizarre-inspecao-post.js');
const {
  poemSementeFoiPlantadaPt,
  poemSementeFoiPlantadaEn,
  poemSementeFoiPlantadaEs
} = require('../lib/semente-foi-plantada-poem.js');

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
    },
    {
      id: 'arvore-da-vida',
      slug: 'arvore-da-vida',
      title: 'Árvore da Vida',
      titleEn: 'Tree of Life',
      titleEs: 'Árbol de la Vida',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'A fase sénior — semente e mudinha guardadas na madeira; ficar e faça o melhor.',
      teaserEn:
        'The senior phase — seed and seedling kept in the wood; stay and do your best.',
      teaserEs:
        'La fase sénior — semilla y plantita guardadas en la madera; quedarse y haz lo mejor.',
      body: poemArvoreDaVidaPt(),
      bodyEn: poemArvoreDaVidaEn(),
      bodyEs: poemArvoreDaVidaEs(),
      inspectionHref: '/posts/post-inspecao-palavra-arvore-da-vida.html',
      tags: ['poesia', 'vida', 'árvore', 'sénior', 'semente']
    },
    {
      id: 'o-inicio',
      slug: 'o-inicio',
      title: 'O Início',
      titleEn: 'The Beginning',
      titleEs: 'El Inicio',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'Semente e dossel × tanques de guerra — fundação de vida, não de blindagem; ficar e faça o melhor.',
      teaserEn:
        'Seed and canopy × war tanks — foundation of life, not armor; stay and do your best.',
      teaserEs:
        'Semilla y dosel × tanques de guerra — fundación de vida, no de blindaje; quedarse y haz lo mejor.',
      body: poemCultivoOInicioPt(),
      bodyEn: poemCultivoOInicioEn(),
      bodyEs: poemCultivoOInicioEs(),
      inspectionHref: '/posts/post-inspecao-arte-o-inicio.html',
      tags: ['poesia', 'vida', 'cultivo', 'semente', 'início', 'tanque', 'guerra']
    },
    {
      id: 'killing-in-the-name',
      slug: 'killing-in-the-name',
      title: 'Killing in the Name',
      titleEn: 'Killing in the Name',
      titleEs: 'Killing in the Name',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'Eco BudGanja da RATM — raiva nomeada contra a máquina; não tanque, não matar no nome; faça o melhor.',
      teaserEn:
        'BudGanja echo of RATM — named rage against the machine; no tank, no killing in the name; do your best.',
      teaserEs:
        'Eco BudGanja de RATM — rabia nombrada contra la máquina; no tanque, no matar en el nombre; haz lo mejor.',
      body: poemKillingInTheNamePt(),
      bodyEn: poemKillingInTheNameEn(),
      bodyEs: poemKillingInTheNameEs(),
      inspectionHref: '/posts/post-inspecao-arte-killing-in-the-name.html',
      tags: ['poesia', 'vida', 'rage', 'máquina', 'raiva', 'proibição']
    },
    {
      id: 'all-right-now',
      slug: 'all-right-now',
      title: 'All Right Now',
      titleEn: 'All Right Now',
      titleEs: 'All Right Now',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'Eco BudGanja da Free — o agora depois do silêncio; ficar, já, e faça o melhor.',
      teaserEn:
        'BudGanja echo of Free — the now after silence; stay, already, and do your best.',
      teaserEs:
        'Eco BudGanja de Free — el ahora después del silencio; quedarse, ya, y haz lo mejor.',
      body: poemAllRightNowPt(),
      bodyEn: poemAllRightNowEn(),
      bodyEs: poemAllRightNowEs(),
      inspectionHref: '/posts/post-inspecao-arte-all-right-now.html',
      tags: ['poesia', 'vida', 'free', 'agora', 'já', 'esperança']
    },
    {
      id: 'under-pressure',
      slug: 'under-pressure',
      title: 'Under Pressure',
      titleEn: 'Under Pressure',
      titleEs: 'Under Pressure',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'Eco BudGanja de Queen e Bowie — medir o aperto sem esmagar o peito; coração, medo, e faça o melhor.',
      teaserEn:
        'BudGanja echo of Queen and Bowie — measure the squeeze without crushing the chest; heart, fear, and do your best.',
      teaserEs:
        'Eco BudGanja de Queen y Bowie — medir el aprieto sin aplastar el pecho; corazón, miedo, y haz lo mejor.',
      body: poemUnderPressurePt(),
      bodyEn: poemUnderPressureEn(),
      bodyEs: poemUnderPressureEs(),
      inspectionHref: '/posts/post-inspecao-arte-under-pressure.html',
      tags: ['poesia', 'vida', 'queen', 'bowie', 'pressão', 'coração']
    },
    {
      id: 'upside-down',
      slug: 'upside-down',
      title: 'Upside Down',
      titleEn: 'Upside Down',
      titleEs: 'Upside Down',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'Eco BudGanja de Jack Johnson — inverter o olhar sem virar a casa; criatividade, alegria, e faça o melhor.',
      teaserEn:
        'BudGanja echo of Jack Johnson — invert the gaze without turning the house over; creativity, joy, and do your best.',
      teaserEs:
        'Eco BudGanja de Jack Johnson — invertir la mirada sin voltear la casa; creatividad, alegría, y haz lo mejor.',
      body: poemUpsideDownPt(),
      bodyEn: poemUpsideDownEn(),
      bodyEs: poemUpsideDownEs(),
      inspectionHref: '/posts/post-inspecao-arte-upside-down.html',
      tags: ['poesia', 'vida', 'johnson', 'curiosidade', 'ângulo', 'alegria']
    },
    {
      id: 'how-bizarre',
      slug: 'how-bizarre',
      title: 'How Bizarre',
      titleEn: 'How Bizarre',
      titleEs: 'How Bizarre',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'Eco BudGanja da OMC — nomear o estranho sem rir da vida nem entrar em pânico; criatividade, alegria, e faça o melhor.',
      teaserEn:
        'BudGanja echo of OMC — name the strange without laughing at life or panicking; creativity, joy, and do your best.',
      teaserEs:
        'Eco BudGanja de OMC — nombrar lo extraño sin reírse de la vida ni entrar en pánico; creatividad, alegría, y haz lo mejor.',
      body: poemHowBizarrePt(),
      bodyEn: poemHowBizarreEn(),
      bodyEs: poemHowBizarreEs(),
      inspectionHref: '/posts/post-inspecao-arte-how-bizarre.html',
      tags: ['poesia', 'vida', 'omc', 'bizarro', 'ōtara', 'alegria']
    },
    {
      id: 'a-semente-foi-plantada',
      slug: 'a-semente-foi-plantada',
      title: 'A semente foi plantada',
      titleEn: 'The Seed Was Planted',
      titleEs: 'La semilla fue plantada',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'Encerramento da Vida — a semente sai da palma, fica na terra, e o mantra: faça o melhor.',
      teaserEn:
        'Vida’s closing — the seed leaves the palm, stays in the soil, and the mantra: do your best.',
      teaserEs:
        'Cierre de Vida — la semilla sale de la palma, queda en la tierra, y el mantra: haz lo mejor.',
      body: poemSementeFoiPlantadaPt(),
      bodyEn: poemSementeFoiPlantadaEn(),
      bodyEs: poemSementeFoiPlantadaEs(),
      inspectionHref: '/posts/post-inspecao-conto-vida-laboratorio.html',
      tags: ['poesia', 'vida', 'semente', 'plantada', 'ficar']
    }
  ]
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(doc, null, 2) + '\n', 'utf8');
console.log('OK', path.relative(ROOT, OUT), '—', doc.poems.length, 'poema(s)');
