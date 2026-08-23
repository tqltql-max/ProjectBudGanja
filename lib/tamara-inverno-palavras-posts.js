'use strict';

/**
 * Palavras do lote temático «Bom dia, Inverno» / Tamara Klink.
 * Fichas compactas da série palavras-origem — léxico do gelo.
 */

function palavraPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'palavras-origem',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Palavras',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

const BOM_DIA = '/posts/post-inspecao-arte-bom-dia-inverno.html';
const TAMARA = '/posts/post-inspecao-tamara-klink.html';
const AMYR = '/posts/post-inspecao-amyr-klink.html';
const BALDE = '/posts/post-inspecao-palavra-balde.html';
const CAMINHO = '/posts/post-inspecao-palavra-caminho.html';
const PASSAR = '/posts/post-inspecao-palavra-passar.html';
const GESTO = '/posts/post-inspecao-palavra-gesto.html';
const VERDADE = '/posts/post-inspecao-palavra-verdade.html';
const SIMBIOSE = '/posts/post-inspecao-palavra-simbiose.html';
const ANIMAL = '/posts/post-inspecao-palavra-animal.html';
const MEDO = '/posts/post-inspecao-palavra-medo.html';
const VIDA = '/vida/';
const VIDA_PALAVRA = '/posts/post-inspecao-palavra-vida.html';
const ANIMAIS = '/animais/';
const CULTIVO = '/guia/cultivo-basico.html';
const GUIA = '/guia/palavras.html';
const HUB = '/biblioteca/inspecoes/#inspecoes-palavras';
const VIDEO_QA = 'https://www.youtube.com/watch?v=V3GSlr5sp7c';
const COVER = '/imagens/inspecoes/bom-dia-inverno-cover.jpg';
const LUZ = '/posts/post-inspecao-palavra-luz.html';
const SOL = '/posts/post-inspecao-palavra-sol.html';
const TEMPO = '/posts/post-inspecao-palavra-tempo.html';
const MAO = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
const NOJINHO = '/posts/post-inspecao-palavra-nojinho.html';
const PLANTA = '/posts/post-inspecao-palavra-planta.html';
const INVERNO_HUB = '/inverno/';

function hrefFor(slugSuffix) {
  return '/posts/post-inspecao-palavra-' + slugSuffix + '.html';
}

/** @typedef {{ id: string, word: string, wordEn?: string, wordEs?: string, slugSuffix: string, seriesOrder: number, group: string, simple: string, simpleEn: string, simpleEs: string, chipPt?: string, chipEn?: string, chipEs?: string, classPt: string, etimo: string, leitura: string, leituraEn: string, leituraEs: string, elos: string }} TamaraWordCfg */

/** Rótulos curtos do hub /inverno/ — lote original de 14. */
const ICE_CHIP_I18N = {
  barco: {
    en: 'Boat',
    es: 'Barco',
    simplePt: 'Casa, oficina e corpo da invernagem.',
    simpleEn: 'Home, workshop and body of the overwintering.',
    simpleEs: 'Casa, taller y cuerpo de la invernada.'
  },
  mar: {
    en: 'Sea',
    es: 'Mar',
    simplePt: 'Horizonte da travessia — no gelo, deixa de passar.',
    simpleEn: 'Horizon of the crossing — on ice, it stops passing.',
    simpleEs: 'Horizonte de la travesía — en el hielo, deja de pasar.'
  },
  gelo: {
    en: 'Ice',
    es: 'Hielo',
    simplePt: 'Água sólida que prende o barco.',
    simpleEn: 'Solid water that holds the boat.',
    simpleEs: 'Agua sólida que atrapa el barco.'
  },
  inverno: {
    en: 'Winter',
    es: 'Invierno',
    simplePt: 'Estação e cumprimento: bom dia ao frio.',
    simpleEn: 'Season and greeting: good morning to the cold.',
    simpleEs: 'Estación y saludo: buenos días al frío.'
  },
  invernagem: {
    en: 'Overwintering',
    es: 'Invernada',
    simplePt: 'Ficar o inverno inteiro no gelo — eixo do livro.',
    simpleEn: 'Staying the whole winter in the ice — axis of the book.',
    simpleEs: 'Quedarse todo el invierno en el hielo — eje del libro.'
  },
  navegar: {
    en: 'Sail',
    es: 'Navegar',
    simplePt: 'Conduzir o barco e a própria rota.',
    simpleEn: 'Steering the boat and one’s own route.',
    simpleEs: 'Conducir el barco y la propia ruta.'
  },
  agua: {
    en: 'Water',
    es: 'Agua',
    simplePt: 'Líquido que vira terra quando congela.',
    simpleEn: 'Liquid that becomes land when it freezes.',
    simpleEs: 'Líquido que se vuelve tierra al congelarse.'
  },
  neve: {
    en: 'Snow',
    es: 'Nieve',
    simplePt: 'Cobertura branca — paisagem e ruído branco.',
    simpleEn: 'White cover — landscape and white noise.',
    simpleEs: 'Cubierta blanca — paisaje y ruido blanco.'
  },
  congelado: {
    en: 'Frozen',
    es: 'Congelado',
    simplePt: 'Estado do mar quando o tempo substitui o espaço.',
    simpleEn: 'State of the sea when time replaces space.',
    simpleEs: 'Estado del mar cuando el tiempo sustituye al espacio.'
  },
  risco: {
    en: 'Risk',
    es: 'Riesgo',
    simplePt: 'Perigo calculado — ofício, não romantismo.',
    simpleEn: 'Calculated danger — craft, not romance.',
    simpleEs: 'Peligro calculado — oficio, no romanticismo.'
  },
  solitario: {
    en: 'Solo',
    es: 'Solitario',
    simplePt: 'Sozinha no fiorde — sem romantizar o isolamento.',
    simpleEn: 'Alone in the fjord — without romanticizing isolation.',
    simpleEs: 'Sola en el fiordo — sin romantizar el aislamiento.'
  },
  groenlandia: {
    en: 'Greenland',
    es: 'Groenlandia',
    simplePt: 'Palco da invernagem ártica.',
    simpleEn: 'Stage of the Arctic overwintering.',
    simpleEs: 'Escenario de la invernada ártica.'
  },
  anzol: {
    en: 'Hook',
    es: 'Anzuelo',
    simplePt: 'Ofício miúdo no gelo — pescar para ficar.',
    simpleEn: 'Small craft on the ice — fishing in order to stay.',
    simpleEs: 'Oficio menudo en el hielo — pescar para quedarse.'
  },
  livro: {
    en: 'Book',
    es: 'Libro',
    simplePt: 'A invernagem vira página. Depois, pede para circular.',
    simpleEn: 'Overwintering becomes a page. Then it asks to circulate.',
    simpleEs: 'La invernada se hace página. Después pide circular.'
  }
};

/** @type {TamaraWordCfg[]} */
const TAMARA_INVERNO_CORE_WORD_CFGS = [
  {
    id: 'barco',
    word: 'Barco',
    slugSuffix: 'barco',
    seriesOrder: 50,
    group: 'lexico',
    simple:
      'Embarcação — no universo Tamara é casa, oficina e corpo da invernagem; elo do livro *Bom dia, Inverno*.',
    simpleEn:
      'Boat — in Tamara’s world: home, workshop and body of the overwintering; link to *Bom dia, Inverno*.',
    simpleEs:
      'Barco — en el universo Tamara: casa, taller y cuerpo de la invernada; enlace con *Bom dia, Inverno*.',
    classPt: 'Substantivo masculino',
    etimo: 'Lat. *barca* (via romance) — embarcação pequena/média',
    leitura:
      'No Q&A e no livro, o barco é **casa** presa no gelo — não só meio de transporte. No BudGanja cruza com [caminho](' +
      CAMINHO +
      '), [gesto](' +
      GESTO +
      ') e o hub [Bom dia, Inverno](' +
      BOM_DIA +
      ').',
    leituraEn:
      'In the Q&A and book the boat is **home** locked in ice — not only transport. Links [caminho](' +
      CAMINHO +
      ') and [Bom dia, Inverno](' +
      BOM_DIA +
      ').',
    leituraEs:
      'En el Q&A y el libro el barco es **casa** presa en el hielo. Enlaces [caminho](' +
      CAMINHO +
      ') y [Bom dia, Inverno](' +
      BOM_DIA +
      ').',
    elos: `[Tamara](${TAMARA}) · [Bom dia, Inverno](${BOM_DIA}) · [caminho](${CAMINHO}) · [gesto](${GESTO}) · [Vida](${VIDA})`
  },
  {
    id: 'mar',
    word: 'Mar',
    slugSuffix: 'mar',
    seriesOrder: 51,
    group: 'lexico',
    simple:
      'Oceano e horizonte — no laboratório cruza com caminho, Vida e a travessia solitária de Tamara.',
    simpleEn:
      'Ocean and horizon — in the lab it crosses caminho, Vida and Tamara’s solo crossing.',
    simpleEs:
      'Océano y horizonte — en el laboratorio cruza camino, Vida y la travesía solitaria de Tamara.',
    classPt: 'Substantivo masculino',
    etimo: 'Lat. *mare*',
    leitura:
      'Horizonte da travessia e do sal — irmão de [Águas do Mar e Lágrimas](/posts/post-inspecao-arte-aguas-e-lagrimas.html). No gelo, o mar **congela** e deixa de «passar».',
    leituraEn:
      'Horizon of crossing and salt — sister to Águas…. On ice the sea **freezes** and stops “passing”.',
    leituraEs:
      'Horizonte de la travesía y la sal — hermano de Águas…. En el hielo el mar **congela** y deja de «pasar».',
    elos: `[Bom dia, Inverno](${BOM_DIA}) · [passar](${PASSAR}) · [caminho](${CAMINHO}) · [Águas…](/posts/post-inspecao-arte-aguas-e-lagrimas.html)`
  },
  {
    id: 'gelo',
    word: 'Gelo',
    slugSuffix: 'gelo',
    seriesOrder: 52,
    group: 'lexico',
    simple:
      'Água sólida que prende o barco — matéria da invernagem ártica narrada em *Bom dia, Inverno*.',
    simpleEn:
      'Solid water that holds the boat — matter of the Arctic overwintering in *Bom dia, Inverno*.',
    simpleEs:
      'Agua sólida que atrapa el barco — materia de la invernada ártica en *Bom dia, Inverno*.',
    classPt: 'Substantivo masculino',
    etimo: 'Lat. *gelu* («geada, frio intenso»)',
    leitura:
      'Matéria da invernagem: prende o [barco](' +
      hrefFor('barco') +
      '), mede [risco](' +
      hrefFor('risco') +
      ') e activa [medo](' +
      MEDO +
      ') sem romantizar. Elo central de [Bom dia, Inverno](' +
      BOM_DIA +
      ').',
    leituraEn:
      'Matter of overwintering: holds the boat, measures risk, activates fear without romance.',
    leituraEs:
      'Materia de la invernada: atrapa el barco, mide riesgo, activa miedo sin romanticismo.',
    elos: `[Bom dia, Inverno](${BOM_DIA}) · [barco](${hrefFor('barco')}) · [invernagem](${hrefFor('invernagem')}) · [medo](${MEDO}) · [risco](${hrefFor('risco')})`
  },
  {
    id: 'inverno',
    word: 'Inverno',
    slugSuffix: 'inverno',
    seriesOrder: 53,
    group: 'lexico',
    simple:
      'Estação e título — *Bom dia, Inverno*: cumprimentar o frio sem romantizar o isolamento.',
    simpleEn:
      'Season and title — *Bom dia, Inverno*: greeting the cold without romanticizing isolation.',
    simpleEs:
      'Estación y título — *Bom dia, Inverno*: saludar el frío sin romantizar el aislamiento.',
    classPt: 'Substantivo masculino',
    etimo: 'Lat. *hibernum*',
    leitura:
      'Estação e **cumprimento** do título — «bom dia» ao frio. No cultivo BudGanja, fase lenta de observação ([cultivo](' +
      CULTIVO +
      ')); na obra, tempo inteiro da [invernagem](' +
      hrefFor('invernagem') +
      ').',
    leituraEn:
      'Season and title greeting — “good morning” to the cold. In the grow: slow observation phase.',
    leituraEs:
      'Estación y saludo del título — «buenos días» al frío. En el cultivo: fase lenta de observación.',
    elos: `[Bom dia, Inverno](${BOM_DIA}) · [invernagem](${hrefFor('invernagem')}) · [cultivo](${CULTIVO}) · [Vida](${VIDA})`
  },
  {
    id: 'invernagem',
    word: 'Invernagem',
    slugSuffix: 'invernagem',
    seriesOrder: 54,
    group: 'tecnico',
    simple:
      'Permanecer o inverno inteiro no gelo — feito âncora de Tamara no Ártico; eixo do livro.',
    simpleEn:
      'Staying the whole winter in the ice — Tamara’s Arctic anchor feat; axis of the book.',
    simpleEs:
      'Permanecer todo el invierno en el hielo — hazaña ancla de Tamara en el Ártico; eje del libro.',
    classPt: 'Substantivo feminino (náutico / técnico)',
    etimo: 'De *invernar* + *-agem* — permanecer o inverno (no gelo / ancorado)',
    leitura:
      'Feito âncora de [Tamara](' +
      TAMARA +
      '): ficar o inverno no [gelo](' +
      hrefFor('gelo') +
      ') da [Groenlândia](' +
      hrefFor('groenlandia') +
      '). No laboratório = **ficar com método** quando não se pode [passar](' +
      PASSAR +
      ') depressa ([Vida](' +
      VIDA +
      ')).',
    leituraEn:
      'Tamara’s anchor feat: winter locked in Greenland ice. In the lab = staying with method when you cannot pass fast.',
    leituraEs:
      'Hazaña ancla de Tamara: invierno en el hielo de Groenlandia. En el lab = quedarse con método.',
    elos: `[Tamara](${TAMARA}) · [Bom dia, Inverno](${BOM_DIA}) · [gelo](${hrefFor('gelo')}) · [passar](${PASSAR}) · [Vida](${VIDA}) · [Q&A](${VIDEO_QA})`
  },
  {
    id: 'navegar',
    word: 'Navegar',
    slugSuffix: 'navegar',
    seriesOrder: 55,
    group: 'lexico',
    simple:
      'Conduzir o barco e a própria rota — ofício Klink; no BudGanja liga a caminho e gesto.',
    simpleEn:
      'Steering the boat and one’s route — Klink craft; in BudGanja links to caminho and gesto.',
    simpleEs:
      'Conducir el barco y la propia ruta — oficio Klink; en BudGanja une camino y gesto.',
    classPt: 'Verbo',
    etimo: 'Lat. *navigare*',
    leitura:
      'Ofício Klink: conduzir [barco](' +
      hrefFor('barco') +
      ') e rota. Elo directo com [caminho](' +
      CAMINHO +
      ') e [gesto](' +
      GESTO +
      '); tensiona com [Amyr](' +
      AMYR +
      ') (planeamento) e Tamara (assumir o próprio).',
    leituraEn: 'Klink craft: boat and route. Links caminho and gesto; tension Amyr × Tamara.',
    leituraEs: 'Oficio Klink: barco y ruta. Une camino y gesto; tensión Amyr × Tamara.',
    elos: `[Tamara](${TAMARA}) · [Amyr](${AMYR}) · [barco](${hrefFor('barco')}) · [caminho](${CAMINHO}) · [gesto](${GESTO})`
  },
  {
    id: 'agua',
    word: 'Água',
    slugSuffix: 'agua',
    seriesOrder: 56,
    group: 'lexico',
    simple:
      'Elemento que o balde carrega e o gelo retém — volume, sede e limite na invernagem.',
    simpleEn:
      'Element the bucket carries and ice retains — volume, thirst and limit in overwintering.',
    simpleEs:
      'Elemento que el balde lleva y el hielo retiene — volumen, sed y límite en la invernada.',
    classPt: 'Substantivo feminino',
    etimo: 'Lat. *aqua*',
    leitura:
      'Volume, sede e limite: o [balde](' +
      BALDE +
      ') carrega; o [gelo](' +
      hrefFor('gelo') +
      ') retém. Cruza cultivo (rega) e narrativa ártica ([Bom dia, Inverno](' +
      BOM_DIA +
      ')).',
    leituraEn: 'Volume and limit: the bucket carries; ice retains. Grow watering × Arctic narrative.',
    leituraEs: 'Volumen y límite: el balde lleva; el hielo retiene. Riego × narrativa ártica.',
    elos: `[balde](${BALDE}) · [gelo](${hrefFor('gelo')}) · [cultivo](${CULTIVO}) · [Bom dia, Inverno](${BOM_DIA})`
  },
  {
    id: 'neve',
    word: 'Neve',
    slugSuffix: 'neve',
    seriesOrder: 57,
    group: 'lexico',
    simple:
      'Cobertura branca do Ártico — paisagem e ruído branco da narrativa de Tamara.',
    simpleEn:
      'White Arctic cover — landscape and white noise of Tamara’s narrative.',
    simpleEs:
      'Cubierta blanca del Ártico — paisaje y ruido blanco de la narrativa de Tamara.',
    classPt: 'Substantivo feminino',
    etimo: 'Lat. *nix, nivis*',
    leitura:
      'Paisagem e «ruído branco» da [Groenlândia](' +
      hrefFor('groenlandia') +
      ') — coberta que isola e revela. Elo visual da capa e do Q&A.',
    leituraEn: 'Landscape and white noise of Greenland — cover that isolates and reveals.',
    leituraEs: 'Paisaje y ruido blanco de Groenlandia — cubierta que aísla y revela.',
    elos: `[Groenlândia](${hrefFor('groenlandia')}) · [gelo](${hrefFor('gelo')}) · [Bom dia, Inverno](${BOM_DIA}) · [Q&A](${VIDEO_QA})`
  },
  {
    id: 'congelado',
    word: 'Congelado',
    slugSuffix: 'congelado',
    seriesOrder: 58,
    group: 'lexico',
    simple:
      'Estado do mar preso — o barco deixa de «passar» e passa a *ficar*; elo com Vida.',
    simpleEn:
      'State of the locked sea — the boat stops “passing” and starts *staying*; link to Vida.',
    simpleEs:
      'Estado del mar atrapado — el barco deja de «pasar» y empieza a *quedarse*; enlace con Vida.',
    classPt: 'Adjectivo / particípio',
    etimo: 'De *congelar* ← lat. *congelare*',
    leitura:
      'Estado do [mar](' +
      hrefFor('mar') +
      ') preso: o barco deixa de [passar](' +
      PASSAR +
      ') e passa a **ficar** — metáfora operacional de [Vida](' +
      VIDA +
      ') / diário.',
    leituraEn: 'Locked sea: the boat stops passing and starts staying — Vida / diary metaphor.',
    leituraEs: 'Mar atrapado: el barco deja de pasar y empieza a quedarse — metáfora Vida / diario.',
    elos: `[mar](${hrefFor('mar')}) · [passar](${PASSAR}) · [Vida](${VIDA}) · [invernagem](${hrefFor('invernagem')}) · [Bom dia, Inverno](${BOM_DIA})`
  },
  {
    id: 'risco',
    word: 'Risco',
    slugSuffix: 'risco',
    seriesOrder: 59,
    group: 'lexico',
    simple:
      'Perigo calculado × traço (*riscar*); elos medo, sinal, caminho, EXIT, Tamara/Amyr; Valeu !!!',
    simpleEn:
      'Calculated danger × stroke (*riscar*); links medo, sinal, caminho, EXIT, Tamara/Amyr; Valeu !!!',
    simpleEs:
      'Peligro calculado × trazo (*riscar*); vínculos medo, sinal, caminho, EXIT, Tamara/Amyr; ¡Valeu !!!',
    classPt: 'Substantivo masculino',
    etimo: 'It. *risco* / *rischio* (debate remoto) · traço via *riscar*',
    leitura:
      'Perigo **com método**: [Amyr](' +
      AMYR +
      ') planeia; [Tamara](' +
      TAMARA +
      ') assume o próprio. Elo com [verdade](' +
      VERDADE +
      ') e [medo](' +
      MEDO +
      ') — nomear sem pose. Ficha completa: [risco](' +
      hrefFor('risco') +
      ').',
    leituraEn: 'Danger with method: Amyr plans; Tamara owns hers. Full sheet: risco.',
    leituraEs: 'Peligro con método: Amyr planifica; Tamara asume el suyo. Ficha completa: risco.',
    elos: `[Tamara](${TAMARA}) · [Amyr](${AMYR}) · [verdade](${VERDADE}) · [medo](${MEDO}) · [solitário](${hrefFor('solitario')}) · [Bom dia, Inverno](${BOM_DIA})`
  },
  {
    id: 'solitario',
    word: 'Solitário',
    slugSuffix: 'solitario',
    seriesOrder: 60,
    group: 'lexico',
    simple:
      'Navegar e invernar sozinha — não isolamento romântico: método, medo e escrita.',
    simpleEn:
      'Sailing and overwintering alone — not romantic isolation: method, fear and writing.',
    simpleEs:
      'Navegar e invernar sola — no aislamiento romántico: método, miedo y escritura.',
    classPt: 'Adjectivo / substantivo',
    etimo: 'Lat. *solitarius*',
    leitura:
      'Navegar e invernar **sozinha** — não romantizar: método, [medo](' +
      MEDO +
      '), escrita. Distinto de solidão vazia; próximo de [verdade](' +
      VERDADE +
      ') do corpo no gelo.',
    leituraEn: 'Alone sailing/overwintering — not romantic: method, fear, writing.',
    leituraEs: 'Navegar e invernar sola — no romanticismo: método, miedo, escritura.',
    elos: `[Tamara](${TAMARA}) · [medo](${MEDO}) · [verdade](${VERDADE}) · [risco](${hrefFor('risco')}) · [Bom dia, Inverno](${BOM_DIA})`
  },
  {
    id: 'groenlandia',
    word: 'Groenlândia',
    slugSuffix: 'groenlandia',
    seriesOrder: 61,
    group: 'tecnico',
    simple:
      'Palco da invernagem ártica de Tamara — gelo, animais e o livro *Bom dia, Inverno*.',
    simpleEn:
      'Stage of Tamara’s Arctic overwintering — ice, animals and *Bom dia, Inverno*.',
    simpleEs:
      'Escenario de la invernada ártica de Tamara — hielo, animales y *Bom dia, Inverno*.',
    classPt: 'Topónimo',
    etimo: 'Do nórdico *Grœnland* («terra verde») — grafia PT *Groenlândia*',
    leitura:
      'Palco da [invernagem](' +
      hrefFor('invernagem') +
      '): [gelo](' +
      hrefFor('gelo') +
      '), [neve](' +
      hrefFor('neve') +
      '), [animais](' +
      ANIMAIS +
      ') (raposas, focas, corvos). Cronologia em [Tamara · Legado](' +
      TAMARA +
      ').',
    leituraEn: 'Stage of overwintering: ice, snow, animals. Chronology on Tamara Legacy.',
    leituraEs: 'Escenario de la invernada: hielo, nieve, animales. Cronología en Tamara Legado.',
    elos: `[Tamara](${TAMARA}) · [invernagem](${hrefFor('invernagem')}) · [animais](${ANIMAIS}) · [animal](${ANIMAL}) · [Bom dia, Inverno](${BOM_DIA})`
  },
  {
    id: 'anzol',
    word: 'Anzol',
    slugSuffix: 'anzol',
    seriesOrder: 62,
    group: 'lexico',
    simple:
      'Ferramenta de pesca na narrativa — gesto concreto de sobrevivência no gelo.',
    simpleEn:
      'Fishing hook in the narrative — concrete survival gesture on the ice.',
    simpleEs:
      'Anzuelo en la narrativa — gesto concreto de supervivencia en el hielo.',
    classPt: 'Substantivo masculino',
    etimo: 'Árabe *al-zall* / via romance (debate) — gancho de pesca',
    leitura:
      '[Gesto](' +
      GESTO +
      ') concreto de sobrevivência no gelo — irmão do [balde](' +
      BALDE +
      ') como utensílio narrado. Equipamento sem romantizar o heroísmo.',
    leituraEn: 'Concrete survival gesture on ice — sibling of the bucket as narrated tool.',
    leituraEs: 'Gesto concreto de supervivencia en el hielo — hermano del balde como utensilio.',
    elos: `[gesto](${GESTO}) · [balde](${BALDE}) · [Bom dia, Inverno](${BOM_DIA}) · [Q&A](${VIDEO_QA}) · [objectos](/objetos/)`
  },
  {
    id: 'livro',
    word: 'Livro',
    slugSuffix: 'livro',
    seriesOrder: 63,
    group: 'lexico',
    simple:
      'Objecto e ofício — *Bom dia, Inverno* (Companhia das Letras): a invernagem vira página.',
    simpleEn:
      'Object and craft — *Bom dia, Inverno* (Companhia das Letras): overwintering becomes page.',
    simpleEs:
      'Objeto y oficio — *Bom dia, Inverno* (Companhia das Letras): la invernada se hace página.',
    classPt: 'Substantivo masculino',
    etimo: 'Lat. *liber*',
    leitura:
      'Objecto e ofício: a [invernagem](' +
      hrefFor('invernagem') +
      ') vira página em [*Bom dia, Inverno*](' +
      BOM_DIA +
      ') (Companhia das Letras). Elo com [criatividade](/posts/post-inspecao-palavra-criatividade.html) que documenta.',
    leituraEn: 'Object and craft: overwintering becomes page in Bom dia, Inverno.',
    leituraEs: 'Objeto y oficio: la invernada se hace página en Bom dia, Inverno.',
    elos: `[Bom dia, Inverno](${BOM_DIA}) · [Tamara](${TAMARA}) · [criatividade](/posts/post-inspecao-palavra-criatividade.html) · [verdade](${VERDADE})`
  }
];

/**
 * Palavras da homepage /inverno/ que faltavam no léxico de 14.
 * Deep = já têm ficha completa noutro módulo — não regenerar stub.
 */
const TAMARA_INVERNO_PAGE_WORD_CFGS = [
  {
    id: 'balde',
    word: 'Balde',
    wordEn: 'Bucket',
    wordEs: 'Balde',
    slugSuffix: 'balde',
    seriesOrder: 64,
    group: 'lexico',
    chipPt: 'Utensílio da narrativa ártica — volume e limite.',
    chipEn: 'Tool of the Arctic narrative — volume and limit.',
    chipEs: 'Utensilio de la narrativa ártica — volumen y límite.',
    simple:
      'Recipiente com asa — volume e transporte no cultivo; no Q&A Tamara, utensílio da narrativa ártica.',
    simpleEn:
      'Handled bucket — volume and transport in the grow; in Tamara’s Q&A, a tool of the Arctic narrative.',
    simpleEs:
      'Recipiente con asa — volumen y transporte en el cultivo; en el Q&A de Tamara, utensilio de la narrativa ártica.',
    classPt: 'Substantivo masculino',
    etimo: 'Origem debate (talvez céltico / germânico via romance)',
    leitura: 'Utensílio narrado no Q&A — irmão do [anzol](' + hrefFor('anzol') + ').',
    leituraEn: 'Narrated tool in the Q&A — sibling of the hook.',
    leituraEs: 'Utensilio narrado en el Q&A — hermano del anzuelo.',
    elos: `[balde](${BALDE}) · [Bom dia, Inverno](${BOM_DIA})`
  },
  {
    id: 'gesto',
    word: 'Gesto',
    wordEn: 'Gesture',
    wordEs: 'Gesto',
    slugSuffix: 'gesto',
    seriesOrder: 65,
    group: 'lexico',
    chipPt: 'Acto mínimo: voar, ficar, registar.',
    chipEn: 'Minimal act: fly, stay, record.',
    chipEs: 'Acto mínimo: volar, quedarse, registrar.',
    simple:
      'Acto mínimo concreto — regar, escrever, puxar anzol, abraçar o balde, mandar o drone ao céu.',
    simpleEn:
      'Concrete minimal act — water, write, pull a hook, hold the bucket, send the drone to the sky.',
    simpleEs:
      'Acto mínimo concreto — regar, escribir, tirar del anzuelo, abrazar el balde, mandar el dron al cielo.',
    classPt: 'Substantivo masculino',
    etimo: 'Lat. *gestus*',
    leitura: 'Na capa: o [gesto](' + GESTO + ') é o polegar nos sticks.',
    leituraEn: 'On the cover: the gesture is the thumb on the sticks.',
    leituraEs: 'En la portada: el gesto es el pulgar en los sticks.',
    elos: `[gesto](${GESTO}) · [Bom dia, Inverno](${BOM_DIA})`
  },
  {
    id: 'medo',
    word: 'Medo',
    wordEn: 'Fear',
    wordEs: 'Miedo',
    slugSuffix: 'medo',
    seriesOrder: 66,
    group: 'lexico',
    chipPt: 'Limite real da invernagem — nomear, não negar.',
    chipEn: 'Real limit of overwintering — name it, do not deny it.',
    chipEs: 'Límite real de la invernada — nombrarlo, no negarlo.',
    simple:
      'Afecto inspecionado sem romantizar — limite real da invernagem solitária; o poema pede não negar o medo.',
    simpleEn:
      'Inspected affect without romance — real limit of solo overwintering; the poem asks not to deny fear.',
    simpleEs:
      'Afecto inspeccionado sin romanticismo — límite real de la invernada solitaria; el poema pide no negar el miedo.',
    classPt: 'Substantivo masculino',
    etimo: 'Lat. *metus*',
    leitura: 'O poema: cumprimentar a estação difícil sem negar o [medo](' + MEDO + ').',
    leituraEn: 'The poem: greet the hard season without denying fear.',
    leituraEs: 'El poema: saludar la estación difícil sin negar el miedo.',
    elos: `[medo](${MEDO}) · [solitário](${hrefFor('solitario')}) · [Bom dia, Inverno](${BOM_DIA})`
  },
  {
    id: 'passar',
    word: 'Passar',
    wordEn: 'Pass',
    wordEs: 'Pasar',
    slugSuffix: 'passar',
    seriesOrder: 67,
    group: 'lexico',
    chipPt: 'No gelo o barco deixa de passar — e a mudinha não passa sozinha.',
    chipEn: 'On ice the boat stops passing — and the seedling does not pass alone.',
    chipEs: 'En el hielo el barco deja de pasar — y la plantita no pasa sola.',
    simple:
      'Atravessar / o que se passou — e também não poder passar no gelo; no poema, não deixar a mudinha passar sozinha.',
    simpleEn:
      'To cross / what happened — and also not being able to pass on the ice; in the poem, not letting the seedling pass alone.',
    simpleEs:
      'Cruzar / lo que pasó — y también no poder pasar en el hielo; en el poema, no dejar a la plantita pasar sola.',
    classPt: 'Verbo',
    etimo: 'Lat. *passare* / *passus*',
    leitura: 'Léxico da página: ficar quando o barco não [passa](' + PASSAR + ').',
    leituraEn: 'Page lexicon: stay when the boat does not pass.',
    leituraEs: 'Léxico de la página: quedarse cuando el barco no pasa.',
    elos: `[passar](${PASSAR}) · [congelado](${hrefFor('congelado')}) · [Bom dia, Inverno](${BOM_DIA})`
  },
  {
    id: 'caminho',
    word: 'Caminho',
    wordEn: 'Path',
    wordEs: 'Camino',
    slugSuffix: 'caminho',
    seriesOrder: 68,
    group: 'lexico',
    chipPt: 'Rota própria — tensão produtiva com Amyr.',
    chipEn: 'Own route — productive tension with Amyr.',
    chipEs: 'Ruta propia — tensión productiva con Amyr.',
    simple:
      'Via, método e hub lexical — procura de caminhos próprios após o «zero ajuda» (UOL / Tamara × Amyr).',
    simpleEn:
      'Way, method and lexical hub — seeking one’s own paths after “zero help” (UOL / Tamara × Amyr).',
    simpleEs:
      'Vía, método y hub léxico — busca de caminos propios tras el «cero ayuda» (UOL / Tamara × Amyr).',
    classPt: 'Substantivo masculino',
    etimo: 'Lat. *camminus* (via céltico)',
    leitura: 'No mapa: [Amyr](' + AMYR + ') é «pai e tensão do [caminho](' + CAMINHO + ')».',
    leituraEn: 'On the map: Amyr is “father and tension of the path”.',
    leituraEs: 'En el mapa: Amyr es «padre y tensión del camino».',
    elos: `[caminho](${CAMINHO}) · [Amyr](${AMYR}) · [navegar](${hrefFor('navegar')})`
  },
  {
    id: 'mao',
    word: 'Mão',
    wordEn: 'Hand',
    wordEs: 'Mano',
    slugSuffix: 'mao-esquerda-direita',
    seriesOrder: 69,
    group: 'lexico',
    chipPt: 'Na capa: a esquerda segura o drone.',
    chipEn: 'On the cover: the left hand holds the drone.',
    chipEs: 'En la portada: la izquierda sostiene el dron.',
    simple:
      'Ferramenta do gesto — na capa de *Bom dia, Inverno* a mão esquerda segura o comando do drone.',
    simpleEn:
      'Tool of the gesture — on the *Bom dia, Inverno* cover the left hand holds the drone controller.',
    simpleEs:
      'Herramienta del gesto — en la portada de *Bom dia, Inverno* la mano izquierda sostiene el mando del dron.',
    classPt: 'Substantivo feminino',
    etimo: 'Lat. *manus*',
    leitura: 'Capa: [mão esquerda](' + MAO + ') no controlo; o peito ainda cabe na mão (poema).',
    leituraEn: 'Cover: left hand on the controller; the chest still fits in a hand (poem).',
    leituraEs: 'Portada: mano izquierda en el mando; el pecho aún cabe en la mano (poema).',
    elos: `[mão](${MAO}) · [gesto](${GESTO}) · [drone](${hrefFor('drone')})`
  },
  {
    id: 'luz',
    word: 'Luz',
    wordEn: 'Light',
    wordEs: 'Luz',
    slugSuffix: 'luz',
    seriesOrder: 70,
    group: 'lexico',
    chipPt: 'A mudinha pede luz fraca — não sol a mais.',
    chipEn: 'The seedling asks for weak light — not extra sun.',
    chipEs: 'La plantita pide luz débil — no más sol.',
    simple:
      'Claridade que se mede — no poema a mudinha pede luz fraca; no Ártico, meses sem sol.',
    simpleEn:
      'Measurable brightness — in the poem the seedling asks for weak light; in the Arctic, months without sun.',
    simpleEs:
      'Claridad que se mide — en el poema la plantita pide luz débil; en el Ártico, meses sin sol.',
    classPt: 'Substantivo feminino',
    etimo: 'Lat. *lux, lucis*',
    leitura: 'Poema: luz fraca, água certa. Ficha: [luz](' + LUZ + ').',
    leituraEn: 'Poem: weak light, right water.',
    leituraEs: 'Poema: luz débil, agua justa.',
    elos: `[luz](${LUZ}) · [sol](${SOL}) · [cultivo](${CULTIVO})`
  },
  {
    id: 'sol',
    word: 'Sol',
    wordEn: 'Sun',
    wordEs: 'Sol',
    slugSuffix: 'sol',
    seriesOrder: 71,
    group: 'lexico',
    chipPt: 'Não pedimos sol a mais — só ficar.',
    chipEn: 'We do not ask for more sun — only to stay.',
    chipEs: 'No pedimos más sol — solo quedarnos.',
    simple:
      'Astro e luz natural — o poema recusa pedir sol a mais; na invernagem há meses sem ele.',
    simpleEn:
      'Star and natural light — the poem refuses to ask for extra sun; overwintering has months without it.',
    simpleEs:
      'Astro y luz natural — el poema rechaza pedir más sol; la invernada tiene meses sin él.',
    classPt: 'Substantivo masculino',
    etimo: 'Lat. *sol*',
    leitura: 'Primeiro verso: «Não pedimos [sol](' + SOL + ') a mais». Distinto de [solitário](' + hrefFor('solitario') + ').',
    leituraEn: 'First line: “We do not ask for more sun.” Distinct from solo.',
    leituraEs: 'Primer verso: «No pedimos más sol». Distinto de solitario.',
    elos: `[sol](${SOL}) · [luz](${LUZ}) · [inverno](${hrefFor('inverno')})`
  },
  {
    id: 'tempo',
    word: 'Tempo',
    wordEn: 'Time',
    wordEs: 'Tiempo',
    slugSuffix: 'tempo',
    seriesOrder: 72,
    group: 'lexico',
    chipPt: 'A mudinha só pede tempo — no gelo o tempo substitui o espaço.',
    chipEn: 'The seedling only asks for time — on ice time replaces space.',
    chipEs: 'La plantita solo pide tiempo — en el hielo el tiempo sustituye al espacio.',
    simple:
      'Duração e estação — a mudinha pede tempo; no mar congelado o tempo substitui o espaço.',
    simpleEn:
      'Duration and season — the seedling asks for time; on the frozen sea time replaces space.',
    simpleEs:
      'Duración y estación — la plantita pide tiempo; en el mar congelado el tiempo sustituye al espacio.',
    classPt: 'Substantivo masculino',
    etimo: 'Lat. *tempus*',
    leitura: 'Poema e Q&A: [tempo](' + TEMPO + ') como ofício, não pressa.',
    leituraEn: 'Poem and Q&A: time as craft, not haste.',
    leituraEs: 'Poema y Q&A: tiempo como oficio, no prisa.',
    elos: `[tempo](${TEMPO}) · [estação](${hrefFor('estacao')}) · [ficar](${hrefFor('ficar')})`
  },
  {
    id: 'enjoo',
    word: 'Enjoo',
    wordEn: 'Nausea',
    wordEs: 'Mareo',
    slugSuffix: 'nojinho',
    seriesOrder: 73,
    group: 'lexico',
    chipPt: 'O balde não julga o enjoo.',
    chipEn: 'The bucket does not judge the nausea.',
    chipEs: 'El balde no juzga el mareo.',
    simple:
      'Limite corporal na travessia — elo com nojinho e balde na divulgação *Bom dia, Inverno*.',
    simpleEn:
      'Bodily limit at sea — links to nojinho and balde in the *Bom dia, Inverno* promotion.',
    simpleEs:
      'Límite corporal en la travesía — enlace con nojinho y balde en la divulgación *Bom dia, Inverno*.',
    classPt: 'Substantivo masculino',
    etimo: 'De *enjoar* — náusea / enjoo de mar',
    leitura: 'Poema: um [balde](' + BALDE + ') que não julga o enjoo → [nojinho](' + NOJINHO + ').',
    leituraEn: 'Poem: a bucket that does not judge nausea → nojinho.',
    leituraEs: 'Poema: un balde que no juzga el mareo → nojinho.',
    elos: `[nojinho](${NOJINHO}) · [balde](${BALDE}) · [Bom dia, Inverno](${BOM_DIA})`
  },
  {
    id: 'vida',
    word: 'Vida',
    wordEn: 'Vida',
    wordEs: 'Vida',
    slugSuffix: 'vida',
    seriesOrder: 74,
    group: 'lexico',
    chipPt: 'Ficar, registar, cuidar — o canto do laboratório.',
    chipEn: 'Stay, record, care — the laboratory’s corner.',
    chipEs: 'Quedarse, registrar, cuidar — el rincón del laboratorio.',
    simple:
      'Palavra-eixo do laboratório — no hub Inverno a Vida é ficar, registar, cuidar; a mudinha raiz no mapa.',
    simpleEn:
      'Axis-word of the lab — on the Inverno hub Vida is stay, record, care; the seedling roots on the map.',
    simpleEs:
      'Palabra-eje del laboratorio — en el hub Inverno Vida es quedarse, registrar, cuidar; la plantita echa raíces.',
    classPt: 'Substantivo feminino',
    etimo: 'Lat. *vita*',
    leitura: 'Mapa: [Vida](' + VIDA + ') · ficha [vida](' + VIDA_PALAVRA + ').',
    leituraEn: 'Map: Vida hub · word sheet vida.',
    leituraEs: 'Mapa: hub Vida · ficha vida.',
    elos: `[Vida](${VIDA}) · [vida](${VIDA_PALAVRA}) · [ficar](${hrefFor('ficar')})`
  },
  {
    id: 'fiorde',
    word: 'Fiorde',
    wordEn: 'Fjord',
    wordEs: 'Fiordo',
    slugSuffix: 'fiorde',
    seriesOrder: 75,
    group: 'tecnico',
    chipPt: 'Onde o barco fica preso — −40 °C no fiorde.',
    chipEn: 'Where the boat stays locked — −40 °C in the fjord.',
    chipEs: 'Donde el barco queda preso — −40 °C en el fiordo.',
    simple:
      'Braço de mar entre montanhas — palco da invernagem: o barco preso no fiorde da Groenlândia.',
    simpleEn:
      'Sea arm between mountains — stage of overwintering: the boat locked in a Greenland fjord.',
    simpleEs:
      'Brazo de mar entre montañas — escenario de la invernada: el barco preso en un fiordo de Groenlandia.',
    classPt: 'Substantivo masculino (geografia)',
    etimo: 'Norueguês *fjord* ← nórdico *fjǫrðr* («travessia, braço de mar»)',
    leitura:
      'Na homepage: **−40 °C no fiorde**. A capa mostra o [barco](' +
      hrefFor('barco') +
      ') preso no fiorde — não há [fotógrafo](' +
      INVERNO_HUB +
      '#capa) no gelo. Elo com [Groenlândia](' +
      hrefFor('groenlandia') +
      ') e [invernagem](' +
      hrefFor('invernagem') +
      ').',
    leituraEn:
      'On the homepage: −40 °C in the fjord. The cover shows the boat locked there. Links Greenland and overwintering.',
    leituraEs:
      'En la homepage: −40 °C en el fiordo. La portada muestra el barco preso. Enlaces Groenlandia e invernada.',
    elos: `[Groenlândia](${hrefFor('groenlandia')}) · [barco](${hrefFor('barco')}) · [invernagem](${hrefFor('invernagem')}) · [Bom dia, Inverno](${BOM_DIA}) · [hub](${INVERNO_HUB})`
  },
  {
    id: 'drone',
    word: 'Drone',
    wordEn: 'Drone',
    wordEs: 'Dron',
    slugSuffix: 'drone',
    seriesOrder: 76,
    group: 'lexico',
    chipPt: 'A câmara no céu — a mão esquerda ainda conduz.',
    chipEn: 'The camera in the sky — the left hand still steers.',
    chipEs: 'La cámara en el cielo — la mano izquierda aún conduce.',
    simple:
      'Aeronave sem piloto a bordo — na capa, a câmara que Tamara mandou ao céu; na página, o mesmo gesto a voar.',
    simpleEn:
      'Uncrewed aircraft — on the cover, the camera Tamara sent to the sky; on the page, the same gesture flying.',
    simpleEs:
      'Aeronave sin piloto a bordo — en la portada, la cámara que Tamara mandó al cielo; en la página, el mismo gesto volando.',
    classPt: 'Substantivo masculino (anglicismo técnico)',
    etimo: 'Inglês *drone* (zangão / aparelho) — no BR, aeronave remotamente pilotada',
    leitura:
      'A capa **não** é retrato de estúdio: quem dispara é o drone; quem segura o controlo é a [mão esquerda](' +
      MAO +
      '). O drone da [página](' +
      INVERNO_HUB +
      '#capa) é o mesmo [gesto](' +
      GESTO +
      '): voar, ficar, [registar](' +
      hrefFor('registar') +
      ').',
    leituraEn:
      'The cover is not a studio portrait: the drone shoots; the left hand holds the controller. Same gesture as the page drone.',
    leituraEs:
      'La portada no es retrato de estudio: dispara el dron; la mano izquierda sostiene el mando. El mismo gesto de la página.',
    elos: `[mão](${MAO}) · [gesto](${GESTO}) · [câmara](${hrefFor('camara')}) · [céu](${hrefFor('ceu')}) · [hub](${INVERNO_HUB}#capa) · [Bom dia, Inverno](${BOM_DIA})`
  },
  {
    id: 'circular',
    word: 'Circular',
    wordEn: 'Circulate',
    wordEs: 'Circular',
    slugSuffix: 'circular',
    seriesOrder: 77,
    group: 'lexico',
    chipPt: 'O livro pede para circular — não para ficar na estante.',
    chipEn: 'The book asks to circulate — not to stay on the shelf.',
    chipEs: 'El libro pide circular — no quedarse en el estante.',
    simple:
      'Pedido da autora: empresta, doa, deixa o papel viver — o gelo pede para circular.',
    simpleEn:
      'The author’s request: lend, donate, let the paper live — the ice asks to circulate.',
    simpleEs:
      'Pedido de la autora: presta, dona, deja vivir el papel — el hielo pide circular.',
    classPt: 'Verbo / adjectivo',
    etimo: 'Lat. *circulare* ← *circulus* («círculo»)',
    leitura:
      'Eixo da homepage: [Tamara](' +
      TAMARA +
      ') pediu que os exemplares **circulem**. Elos [emprestar](' +
      hrefFor('emprestar') +
      '), [doar](' +
      hrefFor('doar') +
      '), [livro](' +
      hrefFor('livro') +
      ') e [estante](' +
      hrefFor('estante') +
      ') — circular ≠ abandonar o ofício de [ficar](' +
      hrefFor('ficar') +
      ') no gelo.',
    leituraEn:
      'Homepage axis: Tamara asked copies to circulate. Links lend, donate, book, shelf — circulating ≠ abandoning the craft of staying on ice.',
    leituraEs:
      'Eje de la homepage: Tamara pidió que los ejemplares circulen. Enlaces prestar, donar, libro, estante.',
    elos: `[livro](${hrefFor('livro')}) · [emprestar](${hrefFor('emprestar')}) · [doar](${hrefFor('doar')}) · [estante](${hrefFor('estante')}) · [Tamara](${TAMARA}) · [hub](${INVERNO_HUB}#circular)`
  },
  {
    id: 'oficio',
    word: 'Ofício',
    wordEn: 'Craft',
    wordEs: 'Oficio',
    slugSuffix: 'oficio',
    seriesOrder: 78,
    group: 'lexico',
    chipPt: 'Voar, ficar, registar — o ofício no gelo.',
    chipEn: 'Fly, stay, record — craft on the ice.',
    chipEs: 'Volar, quedarse, registrar — el oficio en el hielo.',
    simple:
      'Trabalho habitual com método — na capa o ofício é voar, ficar, registar; não pedestal.',
    simpleEn:
      'Habitual work with method — on the cover the craft is fly, stay, record; not a pedestal.',
    simpleEs:
      'Trabajo habitual con método — en la portada el oficio es volar, quedarse, registrar; no pedestal.',
    classPt: 'Substantivo masculino',
    etimo: 'Lat. *officium* («dever, serviço, tarefa»)',
    leitura:
      'A homepage nomeia o **ofício** várias vezes: da [invernagem](' +
      hrefFor('invernagem') +
      '), da [mão esquerda](' +
      MAO +
      '), do [gesto](' +
      GESTO +
      '). Distinto de [ídolo](/posts/post-inspecao-palavra-idolo.html) de pedestal. Fecho: o ofício fica quando o barco não [passa](' +
      PASSAR +
      ').',
    leituraEn:
      'The homepage names craft many times: overwintering, left hand, gesture. Distinct from a pedestal idol.',
    leituraEs:
      'La homepage nombra el oficio muchas veces: invernada, mano izquierda, gesto. Distinto de ídolo de pedestal.',
    elos: `[gesto](${GESTO}) · [invernagem](${hrefFor('invernagem')}) · [mão](${MAO}) · [navegar](${hrefFor('navegar')}) · [Bom dia, Inverno](${BOM_DIA})`
  },
  {
    id: 'voar',
    word: 'Voar',
    wordEn: 'Fly',
    wordEs: 'Volar',
    slugSuffix: 'voar',
    seriesOrder: 79,
    group: 'lexico',
    chipPt: 'Ela sobe a câmara — o ofício inclui voar.',
    chipEn: 'She sends the camera up — craft includes flying.',
    chipEs: 'Ella sube la cámara — el oficio incluye volar.',
    simple:
      'Mandar a câmara ao céu — na invernagem a solo, voar é o gesto que faz o retrato.',
    simpleEn:
      'Sending the camera to the sky — in solo overwintering, flying is the gesture that makes the portrait.',
    simpleEs:
      'Mandar la cámara al cielo — en la invernada a solas, volar es el gesto que hace el retrato.',
    classPt: 'Verbo',
    etimo: 'Lat. *volare*',
    leitura:
      'Capa: «A foto guarda o ofício: [voar](' +
      hrefFor('voar') +
      '), [ficar](' +
      hrefFor('ficar') +
      '), [registar](' +
      hrefFor('registar') +
      ')». Sem fotógrafo no [fiorde](' +
      hrefFor('fiorde') +
      '), o [drone](' +
      hrefFor('drone') +
      ') voa porque ela o mandou.',
    leituraEn:
      'Cover: the photo keeps the craft — fly, stay, record. No photographer on the fjord.',
    leituraEs:
      'Portada: la foto guarda el oficio — volar, quedarse, registrar. No hay fotógrafo en el fiordo.',
    elos: `[drone](${hrefFor('drone')}) · [céu](${hrefFor('ceu')}) · [gesto](${GESTO}) · [Bom dia, Inverno](${BOM_DIA})`
  },
  {
    id: 'ficar',
    word: 'Ficar',
    wordEn: 'Stay',
    wordEs: 'Quedarse',
    slugSuffix: 'ficar',
    seriesOrder: 80,
    group: 'lexico',
    chipPt: 'Pedir só ficar quando o gelo prende o barco.',
    chipEn: 'Ask only to stay when the ice holds the boat.',
    chipEs: 'Pedir solo quedarse cuando el hielo atrapa el barco.',
    simple:
      'Permanecer com método — eixo da invernagem e da Vida: ficar quando não se pode passar.',
    simpleEn:
      'Remaining with method — axis of overwintering and Vida: stay when you cannot pass.',
    simpleEs:
      'Permanecer con método — eje de la invernada y de Vida: quedarse cuando no se puede pasar.',
    classPt: 'Verbo',
    etimo: 'Lat. *figicare* ← *figere* («fixar, pregar»)',
    leitura:
      'H1 da obra: a [invernagem](' +
      hrefFor('invernagem') +
      ') é **ficar** quando não se pode [passar](' +
      PASSAR +
      ') depressa ([Vida](' +
      VIDA +
      ')). O poema: «pedimos só ficar». Distinto de [circular](' +
      hrefFor('circular') +
      ') o [livro](' +
      hrefFor('livro') +
      ') — o papel circula; o ofício fica.',
    leituraEn:
      'Thesis: overwintering is staying when you cannot pass fast. The poem: “we only ask to stay.”',
    leituraEs:
      'Tesis: la invernada es quedarse cuando no se puede pasar de prisa. El poema: «pedimos solo quedarnos».',
    elos: `[invernagem](${hrefFor('invernagem')}) · [passar](${PASSAR}) · [Vida](${VIDA}) · [congelado](${hrefFor('congelado')}) · [Bom dia, Inverno](${BOM_DIA})`
  },
  {
    id: 'registar',
    word: 'Registar',
    wordEn: 'Record',
    wordEs: 'Registrar',
    slugSuffix: 'registar',
    seriesOrder: 81,
    group: 'lexico',
    chipPt: 'A foto guarda o ofício: voar, ficar, registar.',
    chipEn: 'The photo keeps the craft: fly, stay, record.',
    chipEs: 'La foto guarda el oficio: volar, quedarse, registrar.',
    simple:
      'Fixar o que aconteceu — capa, diário e livro: o ofício inclui registar sem fotógrafo no gelo.',
    simpleEn:
      'Fixing what happened — cover, diary and book: craft includes recording with no photographer on the ice.',
    simpleEs:
      'Fijar lo que pasó — portada, diario y libro: el oficio incluye registrar sin fotógrafo en el hielo.',
    classPt: 'Verbo (grafia PT *registar*)',
    etimo: 'Lat. *regestare* / *regesta* — pôr no registo',
    leitura:
      'Tríade da capa: [voar](' +
      hrefFor('voar') +
      '), [ficar](' +
      hrefFor('ficar') +
      '), **registar**. Elo com [gesto](' +
      GESTO +
      '), [câmara](' +
      hrefFor('camara') +
      ') e o [livro](' +
      hrefFor('livro') +
      ') que vira a invernagem em página. Mapa Vida: ficar, registar, cuidar.',
    leituraEn:
      'Cover triad: fly, stay, record. Links gesture, camera and the book.',
    leituraEs:
      'Tríada de la portada: volar, quedarse, registrar. Enlaces gesto, cámara y el libro.',
    elos: `[gesto](${GESTO}) · [voar](${hrefFor('voar')}) · [câmara](${hrefFor('camara')}) · [livro](${hrefFor('livro')}) · [Vida](${VIDA})`
  },
  {
    id: 'camara',
    word: 'Câmara',
    wordEn: 'Camera',
    wordEs: 'Cámara',
    slugSuffix: 'camara',
    seriesOrder: 82,
    group: 'lexico',
    chipPt: 'Está no céu porque ela a mandou para o céu.',
    chipEn: 'It is in the sky because she sent it there.',
    chipEs: 'Está en el cielo porque ella la mandó al cielo.',
    simple:
      'Olho do drone — no gelo não havia fotógrafo; a câmara sobe porque Tamara a sobe.',
    simpleEn:
      'The drone’s eye — there was no photographer on the ice; the camera rises because Tamara raises it.',
    simpleEs:
      'Ojo del dron — no había fotógrafo en el hielo; la cámara sube porque Tamara la sube.',
    classPt: 'Substantivo feminino',
    etimo: 'Lat. *camera* («câmara, quarto») → aparelho fotográfico',
    leitura:
      'Lead da capa: a [câmara](' +
      hrefFor('camara') +
      ') está no [céu](' +
      hrefFor('ceu') +
      ') porque ela a mandou. Elo [drone](' +
      hrefFor('drone') +
      ') × [mão](' +
      MAO +
      ') × [registar](' +
      hrefFor('registar') +
      ').',
    leituraEn: 'Cover lead: the camera is in the sky because she sent it there.',
    leituraEs: 'Lead de la portada: la cámara está en el cielo porque ella la mandó.',
    elos: `[drone](${hrefFor('drone')}) · [céu](${hrefFor('ceu')}) · [mão](${MAO}) · [registar](${hrefFor('registar')}) · [hub](${INVERNO_HUB}#capa)`
  },
  {
    id: 'ceu',
    word: 'Céu',
    wordEn: 'Sky',
    wordEs: 'Cielo',
    slugSuffix: 'ceu',
    seriesOrder: 83,
    group: 'lexico',
    chipPt: 'A câmara está no céu porque ela a mandou.',
    chipEn: 'The camera is in the sky because she sent it.',
    chipEs: 'La cámara está en el cielo porque ella la mandó.',
    simple:
      'Alto da capa — o céu é o sítio de onde o drone olha o fiorde; também palco do Q&A.',
    simpleEn:
      'Height of the cover — the sky is where the drone looks at the fjord; also a stage in the Q&A.',
    simpleEs:
      'Alto de la portada — el cielo es desde donde el dron mira el fiordo; también escenario del Q&A.',
    classPt: 'Substantivo masculino',
    etimo: 'Lat. *caelum*',
    leitura:
      'A homepage repete o [céu](' +
      hrefFor('ceu') +
      ') como ofício, não cenário: mandar a [câmara](' +
      hrefFor('camara') +
      ') para cima. Elo [drone](' +
      hrefFor('drone') +
      ') e Q&A (céu / céu do Ártico).',
    leituraEn: 'The homepage repeats the sky as craft, not scenery: sending the camera up.',
    leituraEs: 'La homepage repite el cielo como oficio, no paisaje: mandar la cámara arriba.',
    elos: `[drone](${hrefFor('drone')}) · [câmara](${hrefFor('camara')}) · [voar](${hrefFor('voar')}) · [Q&A](${VIDEO_QA})`
  },
  {
    id: 'emprestar',
    word: 'Emprestar',
    wordEn: 'Lend',
    wordEs: 'Prestar',
    slugSuffix: 'emprestar',
    seriesOrder: 84,
    group: 'lexico',
    chipPt: 'Primeiro passo: empresta a quem ainda não leu.',
    chipEn: 'First step: lend it to someone who has not read it yet.',
    chipEs: 'Primer paso: préstalo a quien aún no lo leyó.',
    simple:
      'Primeiro gesto de circular o livro — empresta a família, colega, a mesa do lado.',
    simpleEn:
      'First gesture of circulating the book — lend it to family, a colleague, the next table.',
    simpleEs:
      'Primer gesto de circular el libro — préstalo a la familia, un colega, la mesa de al lado.',
    classPt: 'Verbo',
    etimo: 'De *em-* + *préstimo* ← lat. *praestare* («pôr à disposição»)',
    leitura:
      'Pedido da autora, passo 1: **Empresta**. Elo [circular](' +
      hrefFor('circular') +
      ') e [doar](' +
      hrefFor('doar') +
      ') — a [estante](' +
      hrefFor('estante') +
      ') não é o destino do [livro](' +
      hrefFor('livro') +
      ').',
    leituraEn: 'Author’s request, step 1: lend. The shelf is not the book’s destiny.',
    leituraEs: 'Pedido de la autora, paso 1: prestar. El estante no es el destino del libro.',
    elos: `[circular](${hrefFor('circular')}) · [doar](${hrefFor('doar')}) · [livro](${hrefFor('livro')}) · [hub](${INVERNO_HUB}#circular)`
  },
  {
    id: 'doar',
    word: 'Doar',
    wordEn: 'Donate',
    wordEs: 'Donar',
    slugSuffix: 'doar',
    seriesOrder: 85,
    group: 'lexico',
    chipPt: 'Doa a uma biblioteca — sobretudo se o título ainda não está no bairro.',
    chipEn: 'Donate to a library — especially if the title is not yet in the neighbourhood.',
    chipEs: 'Dona a una biblioteca — sobre todo si el título aún no está en el barrio.',
    simple:
      'Segundo gesto de circular — doar o exemplar a uma biblioteca, principalmente se faltar no acervo.',
    simpleEn:
      'Second circulating gesture — donate the copy to a library, especially if it is missing from the holdings.',
    simpleEs:
      'Segundo gesto de circular — donar el ejemplar a una biblioteca, sobre todo si falta en el acervo.',
    classPt: 'Verbo',
    etimo: 'Lat. *donare* ← *donum* («dádiva»)',
    leitura:
      'Passo 2 da homepage: **Doa a uma biblioteca**. Completa [emprestar](' +
      hrefFor('emprestar') +
      ') e [circular](' +
      hrefFor('circular') +
      '). Dois exemplares saíram da [estante](' +
      hrefFor('estante') +
      ') do laboratório.',
    leituraEn: 'Homepage step 2: donate to a library. Two copies left the lab shelf.',
    leituraEs: 'Paso 2 de la homepage: dona a una biblioteca. Dos ejemplares salieron del estante del lab.',
    elos: `[circular](${hrefFor('circular')}) · [emprestar](${hrefFor('emprestar')}) · [estante](${hrefFor('estante')}) · [livro](${hrefFor('livro')})`
  },
  {
    id: 'estante',
    word: 'Estante',
    wordEn: 'Shelf',
    wordEs: 'Estante',
    slugSuffix: 'estante',
    seriesOrder: 86,
    group: 'lexico',
    chipPt: 'O gelo pede para circular. Não para ficar na estante.',
    chipEn: 'The ice asks to circulate. Not to stay on the shelf.',
    chipEs: 'El hielo pide circular. No quedarse en el estante.',
    simple:
      'Onde o livro espera — no laboratório a estante é o contrário do pedido: dois exemplares já saíram.',
    simpleEn:
      'Where the book waits — in the lab the shelf is the opposite of the request: two copies have already left.',
    simpleEs:
      'Donde el libro espera — en el laboratorio el estante es lo contrario del pedido: dos ejemplares ya salieron.',
    classPt: 'Substantivo feminino',
    etimo: 'De *estar* — móvel onde as coisas estão',
    leitura:
      'Nota do laboratório: o gelo pede para [circular](' +
      hrefFor('circular') +
      '), **não** para ficar na estante. Contraponto de [ficar](' +
      hrefFor('ficar') +
      ') no gelo (ofício) vs. ficar na estante (arquivo morto).',
    leituraEn:
      'Lab note: ice asks to circulate, not to stay on the shelf. Staying on ice ≠ staying on a shelf.',
    leituraEs:
      'Nota del lab: el hielo pide circular, no quedarse en el estante. Quedarse en el hielo ≠ quedarse en el estante.',
    elos: `[circular](${hrefFor('circular')}) · [livro](${hrefFor('livro')}) · [ficar](${hrefFor('ficar')}) · [hub](${INVERNO_HUB}#circular)`
  },
  {
    id: 'peito',
    word: 'Peito',
    wordEn: 'Chest',
    wordEs: 'Pecho',
    slugSuffix: 'peito',
    seriesOrder: 87,
    group: 'lexico',
    chipPt: 'O peito ainda cabe na mão — corpo no gelo.',
    chipEn: 'The chest still fits in a hand — body on the ice.',
    chipEs: 'El pecho aún cabe en la mano — cuerpo en el hielo.',
    simple:
      'Corpo que a invernagem mede — no poema o peito ainda cabe na mão quando o gelo prende o barco.',
    simpleEn:
      'Body that overwintering measures — in the poem the chest still fits in a hand when the ice holds the boat.',
    simpleEs:
      'Cuerpo que la invernada mide — en el poema el pecho aún cabe en la mano cuando el hielo atrapa el barco.',
    classPt: 'Substantivo masculino',
    etimo: 'Lat. *pectus, pectoris*',
    leitura:
      'Primeira estrofe: o [gelo](' +
      hrefFor('gelo') +
      ') prende o [barco](' +
      hrefFor('barco') +
      ') «e o peito ainda cabe na [mão](' +
      MAO +
      ')». Corpo, não heroísmo. Elo [medo](' +
      MEDO +
      ') e [solitário](' +
      hrefFor('solitario') +
      ').',
    leituraEn: 'First stanza: ice holds the boat and the chest still fits in a hand. Body, not heroism.',
    leituraEs: 'Primera estrofa: el hielo atrapa el barco y el pecho aún cabe en la mano. Cuerpo, no heroicidad.',
    elos: `[mão](${MAO}) · [medo](${MEDO}) · [gelo](${hrefFor('gelo')}) · [poema](${INVERNO_HUB}#poema)`
  },
  {
    id: 'semente',
    word: 'Semente',
    wordEn: 'Seed',
    wordEs: 'Semilla',
    slugSuffix: 'semente',
    seriesOrder: 88,
    group: 'lexico',
    chipPt: 'A semente não grita. A mudinha também não.',
    chipEn: 'The seed does not shout. Neither does the seedling.',
    chipEs: 'La semilla no grita. La plantita tampoco.',
    simple:
      'Partida do arco Vida — a semente ainda cabe na mão; no gelo vira mudinha.',
    simpleEn:
      'Start of the Vida arc — the seed still fits in a hand; on ice it becomes a seedling.',
    simpleEs:
      'Partida del arco Vida — la semilla aún cabe en la mano; en el hielo se hace plantita.',
    classPt: 'Substantivo feminino',
    etimo: 'Lat. *sementis* ← *serere* («semear»)',
    leitura:
      'Tese cultural: **semente** = a partida; [mudinha](' +
      hrefFor('mudinha') +
      ') = a [invernagem](' +
      hrefFor('invernagem') +
      '). Poema: «A semente não grita». Elo [planta](' +
      PLANTA +
      ') e o [conto do laboratório](/posts/post-inspecao-conto-vida-laboratorio.html).',
    leituraEn: 'Thesis: seed = leaving; seedling = overwintering. The seed does not shout.',
    leituraEs: 'Tesis: semilla = la partida; plantita = la invernada. La semilla no grita.',
    elos: `[mudinha](${hrefFor('mudinha')}) · [planta](${PLANTA}) · [Vida](${VIDA}) · [conto](/posts/post-inspecao-conto-vida-laboratorio.html) · [Bom dia, Inverno](${BOM_DIA})`
  },
  {
    id: 'mudinha',
    word: 'Mudinha',
    wordEn: 'Seedling',
    wordEs: 'Plantita',
    slugSuffix: 'mudinha',
    seriesOrder: 89,
    group: 'lexico',
    chipPt: 'Figura Vida do livro — planta jovem no gelo.',
    chipEn: 'Vida figure of the book — young plant on the ice.',
    chipEs: 'Figura Vida del libro — planta joven en el hielo.',
    simple:
      'Planta jovem — *Bom dia, Inverno* entra no laboratório como mudinha da Vida, não árvore sénior.',
    simpleEn:
      'Young plant — *Bom dia, Inverno* enters the lab as Vida’s seedling, not a senior tree.',
    simpleEs:
      'Planta joven — *Bom dia, Inverno* entra al laboratorio como plantita de Vida, no árbol sénior.',
    classPt: 'Substantivo feminino (diminutivo de muda)',
    etimo: 'De *muda* (planta para transplante) + *-inha*',
    leitura:
      'H2 da divulgação: o livro é **mudinha**, não árvore sénior. Pede [luz](' +
      LUZ +
      ') fraca, [água](' +
      hrefFor('agua') +
      ') certa, [tempo](' +
      TEMPO +
      '). Irmã da [semente](' +
      hrefFor('semente') +
      '); horizonte: [Árvore da Vida](/posts/post-inspecao-palavra-arvore-da-vida.html).',
    leituraEn:
      'The book is a seedling, not a senior tree. It asks for weak light, right water, time.',
    leituraEs:
      'El libro es plantita, no árbol sénior. Pide luz débil, agua justa, tiempo.',
    elos: `[semente](${hrefFor('semente')}) · [invernagem](${hrefFor('invernagem')}) · [Vida](${VIDA}) · [Árvore da Vida](/posts/post-inspecao-palavra-arvore-da-vida.html) · [Bom dia, Inverno](${BOM_DIA})`
  },
  {
    id: 'estacao',
    word: 'Estação',
    wordEn: 'Season',
    wordEs: 'Estación',
    slugSuffix: 'estacao',
    seriesOrder: 90,
    group: 'lexico',
    chipPt: 'Inverno é estação — fase, não fim.',
    chipEn: 'Winter is a season — a phase, not an end.',
    chipEs: 'Invierno es estación — fase, no fin.',
    simple:
      'Tempo do ciclo — o poema recusa o inverno como fim: é estação em que se inspeciona a raiz.',
    simpleEn:
      'Time in the cycle — the poem refuses winter as an end: it is a season for inspecting the root.',
    simpleEs:
      'Tiempo del ciclo — el poema rechaza el invierno como fin: es estación en que se inspecciona la raíz.',
    classPt: 'Substantivo feminino',
    etimo: 'Lat. *statio, stationis* («paragem, posto»)',
    leitura:
      '«Dizem que o [inverno](' +
      hrefFor('inverno') +
      ') é fim. Mentira antiga. Inverno é **estação**.» Elo [tempo](' +
      TEMPO +
      '), [raiz](' +
      hrefFor('raiz') +
      '), [flor](' +
      hrefFor('flor') +
      ') — não se força floração.',
    leituraEn: 'They say winter is an end. Old lie. Winter is a season.',
    leituraEs: 'Dicen que el invierno es fin. Mentira antigua. Invierno es estación.',
    elos: `[inverno](${hrefFor('inverno')}) · [tempo](${TEMPO}) · [raiz](${hrefFor('raiz')}) · [flor](${hrefFor('flor')}) · [poema](${INVERNO_HUB}#poema)`
  },
  {
    id: 'flor',
    word: 'Flor',
    wordEn: 'Flower',
    wordEs: 'Flor',
    slugSuffix: 'flor',
    seriesOrder: 91,
    group: 'lexico',
    chipPt: 'Fase em que não se força flor.',
    chipEn: 'A phase when you do not force the flower.',
    chipEs: 'Fase en que no se fuerza la flor.',
    simple:
      'Desfecho visível do cultivo — no inverno não se força flor; inspeciona-se a raiz.',
    simpleEn:
      'Visible outcome of the grow — in winter you do not force the flower; you inspect the root.',
    simpleEs:
      'Desenlace visible del cultivo — en invierno no se fuerza la flor; se inspecciona la raíz.',
    classPt: 'Substantivo feminino',
    etimo: 'Lat. *flos, floris*',
    leitura:
      'Poema: fase em que não se força flor, fase em que se inspeciona a [raiz](' +
      hrefFor('raiz') +
      '). Cultivo BudGanja ([cultivo](' +
      CULTIVO +
      ')) × [estação](' +
      hrefFor('estacao') +
      ') difícil.',
    leituraEn: 'Poem: a phase when you do not force the flower; you inspect the root.',
    leituraEs: 'Poema: fase en que no se fuerza la flor; se inspecciona la raíz.',
    elos: `[raiz](${hrefFor('raiz')}) · [estação](${hrefFor('estacao')}) · [cultivo](${CULTIVO}) · [mudinha](${hrefFor('mudinha')})`
  },
  {
    id: 'raiz',
    word: 'Raiz',
    wordEn: 'Root',
    wordEs: 'Raíz',
    slugSuffix: 'raiz',
    seriesOrder: 92,
    group: 'lexico',
    chipPt: 'Fase em que se inspeciona a raiz.',
    chipEn: 'A phase when you inspect the root.',
    chipEs: 'Fase en que se inspecciona la raíz.',
    simple:
      'O que fica debaixo no inverno — ofício do laboratório: inspecionar a raiz sem forçar a flor.',
    simpleEn:
      'What stays underneath in winter — lab craft: inspect the root without forcing the flower.',
    simpleEs:
      'Lo que queda debajo en el invierno — oficio del lab: inspeccionar la raíz sin forzar la flor.',
    classPt: 'Substantivo feminino',
    etimo: 'Lat. *radix, radicis*',
    leitura:
      'O poema define o [inverno](' +
      hrefFor('inverno') +
      ') como inspeção da raiz. Elo [semente](' +
      hrefFor('semente') +
      ') / [mudinha](' +
      hrefFor('mudinha') +
      ') e o método BudGanja: olhar o que não se vê ainda.',
    leituraEn: 'The poem defines winter as inspecting the root. Look at what is not yet visible.',
    leituraEs: 'El poema define el invierno como inspección de la raíz. Mirar lo que aún no se ve.',
    elos: `[flor](${hrefFor('flor')}) · [estação](${hrefFor('estacao')}) · [mudinha](${hrefFor('mudinha')}) · [semente](${hrefFor('semente')}) · [poema](${INVERNO_HUB}#poema)`
  },
  {
    id: 'partir',
    word: 'Partir',
    wordEn: 'Leave',
    wordEs: 'Partir',
    slugSuffix: 'partir',
    seriesOrder: 93,
    group: 'lexico',
    chipPt: 'Tamara já sabia: partir, ficar, escrever.',
    chipEn: 'Tamara already knew: leave, stay, write.',
    chipEs: 'Tamara ya sabía: partir, quedarse, escribir.',
    simple:
      'A decisão de ir — no poema, tríade Tamara: partir, ficar, escrever.',
    simpleEn:
      'The decision to go — in the poem, Tamara’s triad: leave, stay, write.',
    simpleEs:
      'La decisión de ir — en el poema, tríada Tamara: partir, quedarse, escribir.',
    classPt: 'Verbo',
    etimo: 'Lat. *partire* / *partiri* («dividir, separar»)',
    leitura:
      'Estrofe: «Tamara já sabia no [gelo](' +
      hrefFor('gelo') +
      '): partir, [ficar](' +
      hrefFor('ficar') +
      '), [escrever](' +
      hrefFor('escrever') +
      ')». A [semente](' +
      hrefFor('semente') +
      ') é a partida; a [mudinha](' +
      hrefFor('mudinha') +
      ') é o ficar.',
    leituraEn: 'Stanza: Tamara already knew on the ice — leave, stay, write.',
    leituraEs: 'Estrofa: Tamara ya sabía en el hielo — partir, quedarse, escribir.',
    elos: `[ficar](${hrefFor('ficar')}) · [escrever](${hrefFor('escrever')}) · [semente](${hrefFor('semente')}) · [Tamara](${TAMARA}) · [navegar](${hrefFor('navegar')})`
  },
  {
    id: 'escrever',
    word: 'Escrever',
    wordEn: 'Write',
    wordEs: 'Escribir',
    slugSuffix: 'escrever',
    seriesOrder: 94,
    group: 'lexico',
    chipPt: 'A invernagem vira página — partir, ficar, escrever.',
    chipEn: 'Overwintering becomes a page — leave, stay, write.',
    chipEs: 'La invernada se hace página — partir, quedarse, escribir.',
    simple:
      'Terceiro verbo da tríade Tamara — o ofício que transforma invernagem em livro.',
    simpleEn:
      'Third verb of Tamara’s triad — the craft that turns overwintering into a book.',
    simpleEs:
      'Tercer verbo de la tríada Tamara — el oficio que transforma la invernada en libro.',
    classPt: 'Verbo',
    etimo: 'Lat. *scribere*',
    leitura:
      '«Partir, ficar, **escrever**.» Elo [livro](' +
      hrefFor('livro') +
      '), [criatividade](/posts/post-inspecao-palavra-criatividade.html) e [registar](' +
      hrefFor('registar') +
      ') — a escrita é o registo que circula.',
    leituraEn: 'Leave, stay, write. The book is the record that then circulates.',
    leituraEs: 'Partir, quedarse, escribir. El libro es el registro que después circula.',
    elos: `[livro](${hrefFor('livro')}) · [partir](${hrefFor('partir')}) · [ficar](${hrefFor('ficar')}) · [registar](${hrefFor('registar')}) · [Tamara](${TAMARA})`
  }
];

const TAMARA_INVERNO_WORD_CFGS = TAMARA_INVERNO_CORE_WORD_CFGS.concat(
  TAMARA_INVERNO_PAGE_WORD_CFGS
);

function buildTamaraInvernoPalavraBodies(cfg) {
  const inspected = cfg.inspected || (cfg.seriesOrder >= 75 ? '2026-08-23' : '2026-08-02');
  const body = `## Escopo

Inspeção editorial da palavra **${cfg.word}** no léxico do gelo de [Tamara Klink](${TAMARA}) — lote temático de [*Bom dia, Inverno*](${BOM_DIA}). Ficha de **Palavras** no laboratório BudGanja: nomear o vocábulo, fixar leitura no projecto e ligar ao mapa (Vida, cultivo, Artes, Legado).

> **Nota metodológica:** auditoria independente. Fontes: [Q&A Tamara](${VIDEO_QA}), divulgação [*Bom dia, Inverno*](${BOM_DIA}), [Guia de Palavras](${GUIA}). **Sem afiliação** editorial. Palavra ≠ biografia; catalogar ≠ vender o livro.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **${cfg.word}** |
| Classe | ${cfg.classPt} |
| Étimo (trabalho) | ${cfg.etimo} |
| Tipo BudGanja | Palavra — léxico Tamara / Inverno |
| Hub obra | [Bom dia, Inverno](${BOM_DIA}) |
| Pessoa | [Tamara · Legado](${TAMARA}) |
| Guia | [${cfg.word}](${GUIA}?q=${encodeURIComponent(cfg.word)}) |
| Data | ${inspected} |

## Leitura no laboratório

${cfg.leitura}

## Rede BudGanja

${cfg.elos}

Também: [Palavras](${HUB}) · [simbiose](${SIMBIOSE}) · [Q&A](${VIDEO_QA}).

## Status

**Aprovado** — «${cfg.word}» fichada no lote Tamara / Inverno; elo vivo em [Bom dia, Inverno](${BOM_DIA}) e no [Guia](${GUIA}).

[▶ Bom dia, Inverno](${BOM_DIA}) · [▶ Tamara](${TAMARA}) · [▶ Guia](${GUIA}) · [▶ Palavras](${HUB})
`;

  const contentEn = `## Scope

Word sheet for **${cfg.word}** in Tamara Klink’s ice lexicon — [*Bom dia, Inverno*](${BOM_DIA}).

${cfg.leituraEn}

## Status

**Approved** — linked from [Bom dia, Inverno](${BOM_DIA}) and the [Words Guide](${GUIA}).

[▶ Bom dia, Inverno](${BOM_DIA}) · [▶ Tamara](${TAMARA}) · [▶ Words](${HUB})
`;

  const contentEs = `## Alcance

Ficha de **${cfg.word}** en el léxico del hielo de Tamara Klink — [*Bom dia, Inverno*](${BOM_DIA}).

${cfg.leituraEs}

## Estado

**Aprobada** — enlace vivo en [Bom dia, Inverno](${BOM_DIA}) y la [Guía](${GUIA}).

[▶ Bom dia, Inverno](${BOM_DIA}) · [▶ Tamara](${TAMARA}) · [▶ Palabras](${HUB})
`;

  return { body, contentEn, contentEs };
}

function buildTamaraInvernoPalavraPost(cfg) {
  const { body, contentEn, contentEs } = buildTamaraInvernoPalavraBodies(cfg);
  const w = cfg.word;
  return palavraPost({
    title: `Inspeção: ${w} — léxico Tamara / Bom dia, Inverno`,
    titleEn: `Inspection: ${w} — Tamara / Bom dia, Inverno lexicon`,
    titleEs: `Inspección: ${w} — léxico Tamara / Bom dia, Inverno`,
    excerpt: cfg.simple,
    excerptEn: cfg.simpleEn,
    excerptEs: cfg.simpleEs,
    slug: 'inspecao-palavra-' + cfg.slugSuffix,
    date: cfg.date || (cfg.seriesOrder >= 75 ? '2026-08-23T04:00:00.000Z' : '2026-08-02T20:10:00.000Z'),
    seriesOrder: cfg.seriesOrder,
    seriesLabel: w + ' · palavra',
    coverImage: COVER,
    sourceUrl: BOM_DIA,
    body,
    contentEn,
    contentEs
  });
}

/** Fichas profundas noutros módulos — não regenerar stub do gelo. */
const TAMARA_INVERNO_DEEP_IDS = new Set([
  'risco',
  'balde',
  'gesto',
  'medo',
  'passar',
  'caminho',
  'mao',
  'luz',
  'sol',
  'tempo',
  'enjoo',
  'vida'
]);

const TAMARA_INVERNO_PALAVRAS_POSTS = TAMARA_INVERNO_WORD_CFGS.filter(
  (c) => !TAMARA_INVERNO_DEEP_IDS.has(c.id)
).map(buildTamaraInvernoPalavraPost);

const TAMARA_INVERNO_PALAVRA_HREFS = Object.fromEntries(
  TAMARA_INVERNO_WORD_CFGS.map((c) => [c.id, hrefFor(c.slugSuffix)])
);

function guiaItemsFromTamaraInvernoPalavras() {
  return TAMARA_INVERNO_WORD_CFGS.map((c) => ({
    id: c.id,
    word: c.word,
    simple: c.simple,
    simpleEn: c.simpleEn,
    simpleEs: c.simpleEs,
    group: c.group,
    fromTitle: false,
    href: hrefFor(c.slugSuffix)
  }));
}

function invernoLexiconWords() {
  return TAMARA_INVERNO_WORD_CFGS.map((c) => {
    const chip = ICE_CHIP_I18N[c.id] || {};
    return {
      id: c.id,
      href: hrefFor(c.slugSuffix),
      pt: c.word,
      en: c.wordEn || chip.en || c.word,
      es: c.wordEs || chip.es || c.word,
      simplePt: c.chipPt || chip.simplePt || c.simple,
      simpleEn: c.chipEn || chip.simpleEn || c.simpleEn,
      simpleEs: c.chipEs || chip.simpleEs || c.simpleEs
    };
  });
}

module.exports = {
  TAMARA_INVERNO_WORD_CFGS,
  TAMARA_INVERNO_PALAVRAS_POSTS,
  TAMARA_INVERNO_PALAVRA_HREFS,
  buildTamaraInvernoPalavraPost,
  buildTamaraInvernoPalavraBodies,
  guiaItemsFromTamaraInvernoPalavras,
  invernoLexiconWords,
  hrefFor
};
