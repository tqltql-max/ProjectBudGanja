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
const ANIMAIS = '/animais/';
const CULTIVO = '/guia/cultivo-basico.html';
const GUIA = '/guia/palavras.html';
const HUB = '/biblioteca/inspecoes/#inspecoes-palavras';
const VIDEO_QA = 'https://www.youtube.com/watch?v=V3GSlr5sp7c';
const COVER = '/imagens/inspecoes/bom-dia-inverno-cover.jpg';

function hrefFor(slugSuffix) {
  return '/posts/post-inspecao-palavra-' + slugSuffix + '.html';
}

/** @typedef {{ id: string, word: string, slugSuffix: string, seriesOrder: number, group: string, simple: string, simpleEn: string, simpleEs: string, classPt: string, etimo: string, leitura: string, leituraEn: string, leituraEs: string, elos: string }} TamaraWordCfg */

/** @type {TamaraWordCfg[]} */
const TAMARA_INVERNO_WORD_CFGS = [
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
      'Perigo calculado × traço (*riscar*); elos medo, sinal, caminho, EXIT, Tamara/Amyr; Faça o melhor!',
    simpleEn:
      'Calculated danger × stroke (*riscar*); links medo, sinal, caminho, EXIT, Tamara/Amyr; Do your best!',
    simpleEs:
      'Peligro calculado × trazo (*riscar*); vínculos medo, sinal, caminho, EXIT, Tamara/Amyr; ¡Haz lo mejor!',
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
    elos: `[gesto](${GESTO}) · [balde](${BALDE}) · [Bom dia, Inverno](${BOM_DIA}) · [Q&A](${VIDEO_QA}) · [equipamentos](/equipamentos/)`
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

function buildTamaraInvernoPalavraBodies(cfg) {
  const inspected = '2026-08-02';
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
    date: '2026-08-02T20:10:00.000Z',
    seriesOrder: cfg.seriesOrder,
    seriesLabel: w + ' · palavra',
    coverImage: COVER,
    sourceUrl: BOM_DIA,
    body,
    contentEn,
    contentEs
  });
}

/** «risco» tem ficha completa em lib/risco-inspecao-post.js — não regenerar stub. */
const TAMARA_INVERNO_DEEP_IDS = new Set(['risco']);

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

module.exports = {
  TAMARA_INVERNO_WORD_CFGS,
  TAMARA_INVERNO_PALAVRAS_POSTS,
  TAMARA_INVERNO_PALAVRA_HREFS,
  buildTamaraInvernoPalavraPost,
  buildTamaraInvernoPalavraBodies,
  guiaItemsFromTamaraInvernoPalavras,
  hrefFor
};
