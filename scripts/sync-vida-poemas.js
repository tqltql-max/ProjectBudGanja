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
  poemBitterSweetSymphonyPt,
  poemBitterSweetSymphonyEn,
  poemBitterSweetSymphonyEs
} = require('../lib/bitter-sweet-symphony-inspecao-post.js');
const {
  poemEveryBreathYouTakePt,
  poemEveryBreathYouTakeEn,
  poemEveryBreathYouTakeEs
} = require('../lib/every-breath-you-take-inspecao-post.js');
const {
  poemTheMiddlePt,
  poemTheMiddleEn,
  poemTheMiddleEs
} = require('../lib/the-middle-inspecao-post.js');
const {
  poemPeladosEmSantosPt,
  poemPeladosEmSantosEn,
  poemPeladosEmSantosEs
} = require('../lib/pelados-em-santos-inspecao-post.js');
const {
  poemViraViraPt,
  poemViraViraEn,
  poemViraViraEs
} = require('../lib/vira-vira-inspecao-post.js');
const {
  poemSementeFoiPlantadaPt,
  poemSementeFoiPlantadaEn,
  poemSementeFoiPlantadaEs
} = require('../lib/semente-foi-plantada-poem.js');
const {
  poemDozeApostolosPt,
  poemDozeApostolosEn,
  poemDozeApostolosEs
} = require('../lib/doze-apostolos-inspecao-post.js');
const {
  poemLucasPt,
  poemLucasEn,
  poemLucasEs
} = require('../lib/lucas-evangelista-inspecao-post.js');
const {
  poemTodaCriancaNasceCientistaPt,
  poemTodaCriancaNasceCientistaEn,
  poemTodaCriancaNasceCientistaEs
} = require('../lib/toda-crianca-nasce-cientista-inspecao-post.js');
const {
  poemEloDeLigacaoPt,
  poemEloDeLigacaoEn,
  poemEloDeLigacaoEs
} = require('../lib/elo-de-ligacao-inspecao-post.js');
const {
  poemEmPeEDeitadoPt,
  poemEmPeEDeitadoEn,
  poemEmPeEDeitadoEs
} = require('../lib/em-pe-e-deitado-inspecao-post.js');
const {
  poemEmPePt,
  poemEmPeEn,
  poemEmPeEs
} = require('../lib/em-pe-inspecao-post.js');
const {
  maraPoemPt,
  maraPoemEn,
  maraPoemEs
} = require('../lib/mara-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'content', 'vida-poemas.json');

const doc = {
  updatedAt: new Date().toISOString(),
  poems: [
    {
      id: 'barquinhos-de-papel',
      slug: 'barquinhos-de-papel',
      title: 'Barquinhos de papel',
      titleEn: 'Paper Boats',
      titleEs: 'Barquitos de papel',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'A maravilha pequena — dobrar, soprar, flutuar; o nome Mara chegou, e o mantra: faça o melhor.',
      teaserEn:
        'The small wonder — fold, breathe, float; the name Mara arrived, and the mantra: do your best.',
      teaserEs:
        'La maravilla pequeña — doblar, soplar, flotar; el nombre Mara llegó, y el mantra: haz lo mejor.',
      body: maraPoemPt(),
      bodyEn: maraPoemEn(),
      bodyEs: maraPoemEs(),
      inspectionHref: '/posts/post-inspecao-palavra-mara.html',
      tags: ['poesia', 'vida', 'mara', 'maravilha', 'barquinho']
    },
    {
      id: 'toda-crianca-nasce-cientista',
      slug: 'toda-crianca-nasce-cientista',
      title: 'Toda criança nasce cientista',
      titleEn: 'Every Child Is Born a Scientist',
      titleEs: 'Toda niña y niño nace científico',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'A mãe mandou o recado — o campo devolve o método, e o mantra: faça o melhor.',
      teaserEn:
        'Mother sent the note — the field returns the method, and the mantra: do your best.',
      teaserEs:
        'La madre mandó el recado — el campo devuelve el método, y el mantra: haz lo mejor.',
      body: poemTodaCriancaNasceCientistaPt(),
      bodyEn: poemTodaCriancaNasceCientistaEn(),
      bodyEs: poemTodaCriancaNasceCientistaEs(),
      inspectionHref:
        '/posts/post-inspecao-expressao-toda-crianca-nasce-cientista.html',
      tags: ['poesia', 'vida', 'ciência', 'campo', 'mãe']
    },
    {
      id: 'elo-de-ligacao',
      slug: 'elo-de-ligacao',
      title: 'Elo de ligação',
      titleEn: 'Connecting Link',
      titleEs: 'Eslabón de ligación',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'O oito deitado chama-se infinito; no cruzamento mora o elo — simbuklo endereçou símbolo, e o mantra: faça o melhor.',
      teaserEn:
        'The eight lying down is called infinity; at the crossing lives the link — simbuklo addressed símbolo, and the mantra: do your best.',
      teaserEs:
        'El ocho acostado se llama infinito; en el cruce vive el eslabón — simbuklo enderezó símbolo, y el mantra: haz lo mejor.',
      body: poemEloDeLigacaoPt(),
      bodyEn: poemEloDeLigacaoEn(),
      bodyEs: poemEloDeLigacaoEs(),
      inspectionHref: '/posts/post-inspecao-expressao-elo-de-ligacao.html',
      tags: ['poesia', 'vida', 'elo', 'infinito', 'lemniscata']
    },
    {
      id: 'em-pe-e-deitado',
      slug: 'em-pe-e-deitado',
      title: 'Em pé e deitado',
      titleEn: 'Standing and Lying',
      titleEs: 'De pie y acostada',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'Bodiado endereçou deitado; o oito em pé chama-se corpo — a mesma fita, rodada, e o mantra: faça o melhor.',
      teaserEn:
        'Bodiado addressed deitado; the standing eight is called a body — the same ribbon, turned, and the mantra: do your best.',
      teaserEs:
        'Bodiado enderezó deitado; el ocho de pie se llama cuerpo — la misma cinta, girada, y el mantra: haz lo mejor.',
      body: poemEmPeEDeitadoPt(),
      bodyEn: poemEmPeEDeitadoEn(),
      bodyEs: poemEmPeEDeitadoEs(),
      inspectionHref: '/posts/post-inspecao-expressao-em-pe-e-deitado.html',
      tags: ['poesia', 'vida', 'lemniscata', 'corpo', 'infinito']
    },
    {
      id: 'em-pe',
      slug: 'em-pe',
      title: 'Em pé',
      titleEn: 'Standing',
      titleEs: 'De pie',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'Em pé não é o pé sozinho — o oito erguido chama-se caminho, e o mantra: faça o melhor.',
      teaserEn:
        'Standing is not the foot alone — the standing eight is called a path, and the mantra: do your best.',
      teaserEs:
        'De pie no es el pie solo — el ocho erguido se llama camino, y el mantra: haz lo mejor.',
      body: poemEmPePt(),
      bodyEn: poemEmPeEn(),
      bodyEs: poemEmPeEs(),
      inspectionHref: '/posts/post-inspecao-expressao-em-pe.html',
      tags: ['poesia', 'vida', 'lemniscata', 'corpo', 'postura']
    },
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
      title: 'Valeu !!!',
      titleEn: 'Do Your Best!',
      titleEs: '¡Valeu !!!',
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
      inspectionHref: '/posts/post-inspecao-palavra-valeu.html',
      tags: ['poesia', 'vida', 'mantra', 'melhor', 'ofício']
    },
    {
      id: 'os-doze-apostolos',
      slug: 'os-doze-apostolos',
      title: 'Os doze',
      titleEn: 'The Twelve',
      titleEs: 'Los doce',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'Doze assentos, um envio — Tomé vê, Pedro levanta, a mesa não é pedestal: faça o melhor.',
      teaserEn:
        'Twelve seats, one sending — Thomas sees, Peter rises, the table is not a pedestal: do your best.',
      teaserEs:
        'Doce asientos, un envío — Tomás ve, Pedro se levanta, la mesa no es pedestal: haz lo mejor.',
      body: poemDozeApostolosPt(),
      bodyEn: poemDozeApostolosEn(),
      bodyEs: poemDozeApostolosEs(),
      inspectionHref: '/posts/post-inspecao-expressao-os-doze-apostolos.html',
      tags: ['poesia', 'vida', 'apóstolos', 'envio', 'doze']
    },
    {
      id: 'lucas-medico-de-homens-e-de-almas',
      slug: 'lucas-medico-de-homens-e-de-almas',
      title: 'Médico de homens e de almas',
      titleEn: 'Physician of Men and of Souls',
      titleEs: 'Médico de hombres y de almas',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'Lucas trata o corpo e não abandona a alma — fora dos Doze, dois tomos, faça o melhor.',
      teaserEn:
        'Luke treats the body and does not abandon the soul — not of the Twelve, two volumes, do your best.',
      teaserEs:
        'Lucas trata el cuerpo y no abandona el alma — fuera de los Doce, dos tomos, haz lo mejor.',
      body: poemLucasPt(),
      bodyEn: poemLucasEn(),
      bodyEs: poemLucasEs(),
      inspectionHref: '/posts/post-inspecao-figura-lucas-evangelista.html',
      tags: ['poesia', 'vida', 'lucas', 'médico', 'alma']
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
      id: 'bitter-sweet-symphony',
      slug: 'bitter-sweet-symphony',
      title: 'Bitter Sweet Symphony',
      titleEn: 'Bitter Sweet Symphony',
      titleEs: 'Bitter Sweet Symphony',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'Eco BudGanja da Verve — o doce e o amargo no mesmo pulso; vida, legal, e faça o melhor.',
      teaserEn:
        'BudGanja echo of The Verve — sweet and bitter in the same pulse; life, legal, and do your best.',
      teaserEs:
        'Eco BudGanja de The Verve — lo dulce y lo amargo en el mismo pulso; vida, legal, y haz lo mejor.',
      body: poemBitterSweetSymphonyPt(),
      bodyEn: poemBitterSweetSymphonyEn(),
      bodyEs: poemBitterSweetSymphonyEs(),
      inspectionHref: '/posts/post-inspecao-arte-bitter-sweet-symphony.html',
      tags: ['poesia', 'vida', 'verve', 'doce', 'amargo', 'legal']
    },
    {
      id: 'every-breath-you-take',
      slug: 'every-breath-you-take',
      title: 'Every Breath You Take',
      titleEn: 'Every Breath You Take',
      titleEs: 'Every Breath You Take',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'Eco BudGanja da Police — olhar sem possuir; perseguição, coração, e faça o melhor.',
      teaserEn:
        'BudGanja echo of The Police — look without owning; pursuit, heart, and do your best.',
      teaserEs:
        'Eco BudGanja de The Police — mirar sin poseer; persecución, corazón, y haz lo mejor.',
      body: poemEveryBreathYouTakePt(),
      bodyEn: poemEveryBreathYouTakeEn(),
      bodyEs: poemEveryBreathYouTakeEs(),
      inspectionHref: '/posts/post-inspecao-arte-every-breath-you-take.html',
      tags: ['poesia', 'vida', 'police', 'olhar', 'perseguição', 'coração']
    },
    {
      id: 'the-middle',
      slug: 'the-middle',
      title: 'The Middle',
      titleEn: 'The Middle',
      titleEs: 'The Middle',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'Eco BudGanja de Jimmy Eat World — ficar no meio da viagem sem se apagar; caminho, já, e faça o melhor.',
      teaserEn:
        'BudGanja echo of Jimmy Eat World — stay in the middle of the ride without erasing yourself; path, já, and do your best.',
      teaserEs:
        'Eco BudGanja de Jimmy Eat World — quedarse en medio del viaje sin apagarse; camino, já, y haz lo mejor.',
      body: poemTheMiddlePt(),
      bodyEn: poemTheMiddleEn(),
      bodyEs: poemTheMiddleEs(),
      inspectionHref: '/posts/post-inspecao-arte-the-middle.html',
      tags: ['poesia', 'vida', 'jimmy-eat-world', 'meio', 'caminho', 'já']
    },
    {
      id: 'pelados-em-santos',
      slug: 'pelados-em-santos',
      title: 'Pelados em Santos',
      titleEn: 'Pelados em Santos',
      titleEs: 'Pelados em Santos',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'Eco BudGanja dos Mamonas — rir do ofício; sabiam e cairam no lugar certo — ou não; faça o melhor.',
      teaserEn:
        'BudGanja echo of Mamonas — laugh at the craft; they knew and fell in the right place — or not; do your best.',
      teaserEs:
        'Eco BudGanja de Mamonas — reír del oficio; lo sabían y cayeron en el lugar justo — o no; haz lo mejor.',
      body: poemPeladosEmSantosPt(),
      bodyEn: poemPeladosEmSantosEn(),
      bodyEs: poemPeladosEmSantosEs(),
      inspectionHref: '/posts/post-inspecao-arte-pelados-em-santos.html',
      tags: ['poesia', 'vida', 'mamonas', 'santos', 'alegria', 'verdade']
    },
    {
      id: 'vira-vira',
      slug: 'vira-vira',
      title: 'Vira-Vira',
      titleEn: 'Vira-Vira',
      titleEs: 'Vira-Vira',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'Eco BudGanja dos Mamonas — virar o género sem esmagar o vizinho; o outro clipe; faça o melhor.',
      teaserEn:
        'BudGanja echo of Mamonas — turn the genre without crushing the neighbour; the other clip; do your best.',
      teaserEs:
        'Eco BudGanja de Mamonas — virar el género sin aplastar al vecino; el otro videoclip; haz lo mejor.',
      body: poemViraViraPt(),
      bodyEn: poemViraViraEn(),
      bodyEs: poemViraViraEs(),
      inspectionHref: '/posts/post-inspecao-arte-vira-vira.html',
      tags: ['poesia', 'vida', 'mamonas', 'vira', 'alegria', 'respeito']
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
