'use strict';

/**
 * Injeta expressão «em pé e deitado» (*bodiado*) e palavra lemniscata.
 * Uso: node scripts/upsert-expressao-em-pe-e-deitado.js
 */

const fs = require('fs');
const path = require('path');
const { buildEmPeEDeitadoPost } = require('../lib/em-pe-e-deitado-inspecao-post.js');
const { buildLemniscataPost } = require('../lib/lemniscata-inspecao-post.js');
const { buildEloDeLigacaoPost } = require('../lib/elo-de-ligacao-inspecao-post.js');
const {
  buildEndocanabinoidomaNeurocienciaPost
} = require('../lib/endocanabinoidoma-neurociencia-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextOrder(posts, series) {
  const orders = posts
    .filter((p) => p.series === series)
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
}

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug, 'Cap.', post.seriesOrder);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug, 'Cap.', post.seriesOrder);
  }
}

function writeI18n(i18n, post) {
  i18n[post.slug] = {
    titleEn: post.titleEn,
    titleEs: post.titleEs,
    excerptEn: post.excerptEn,
    excerptEs: post.excerptEs,
    contentEn: post.contentEn,
    contentEs: post.contentEs
  };
}

function keepOrder(posts, slug, builder) {
  const existingOne = posts.find((p) => p.slug === slug);
  const order =
    existingOne && typeof existingOne.seriesOrder === 'number'
      ? existingOne.seriesOrder
      : undefined;
  return builder.length ? builder(order) : builder();
}

async function syncSqlAll(posts) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  await store.setPosts(posts);
  console.log('SQL store actualizado (lote em pé e deitado)');
}

function upsertSug(sug, entry) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia, entry, afterIds) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    let after = -1;
    for (const id of afterIds || []) {
      after = items.findIndex((x) => x.id === id);
      if (after >= 0) break;
    }
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

  const existingExpr = posts.find((p) => p.slug === 'inspecao-expressao-em-pe-e-deitado');
  const exprOrder = existingExpr
    ? Number(existingExpr.seriesOrder) || nextOrder(posts, 'expressoes-ditados')
    : nextOrder(posts, 'expressoes-ditados');
  const expr = buildEmPeEDeitadoPost(exprOrder);

  const existingWord = posts.find((p) => p.slug === 'inspecao-palavra-lemniscata');
  const wordOrder = existingWord
    ? Number(existingWord.seriesOrder) || nextOrder(posts, 'palavras-origem')
    : nextOrder(posts, 'palavras-origem');
  const word = buildLemniscataPost(wordOrder);

  const related = [
    expr,
    word,
    keepOrder(posts, 'inspecao-expressao-elo-de-ligacao', buildEloDeLigacaoPost),
    keepOrder(
      posts,
      'inspecao-neurociencia-endocanabinoidoma',
      buildEndocanabinoidomaNeurocienciaPost
    )
  ];

  for (const p of related) upsertPost(posts, p);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  for (const p of related) writeI18n(i18n, p);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const hrefExpr = '/posts/post-' + expr.slug + '.html';
  const hrefWord = '/posts/post-' + word.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    upsertSug(sug, {
      id: 'expressao-em-pe-e-deitado',
      title: 'em pé e deitado — as duas posturas da lemniscata (*bodiado*)',
      titleEn: 'em pé e deitado — the two postures of the lemniscate (*bodiado*)',
      titleEs: 'em pé e deitado — las dos posturas de la lemniscata (*bodiado*)',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: em pé e deitado — par de posturas da lemniscata; bodiado → deitado (+ body); aula XIV Kassia; Valeu !!!',
      whyEn: 'Sayings: em pé e deitado — pair of lemniscate postures; bodiado → deitado (+ body); UNIFESP XIV Kassia; Valeu !!!',
      whyEs: 'Dichos: em pé e deitado — par de posturas de la lemniscata; bodiado → deitado (+ body); aula XIV Kassia; ¡Valeu !!!',
      suggestedSlug: expr.slug,
      doneHref: hrefExpr,
      seriesHint: 'expressoes-ditados',
      sources: [
        expr.sourceUrl,
        'https://pt.wiktionary.org/wiki/p%C3%A9',
        'https://pt.wiktionary.org/wiki/deitar',
        '/biblioteca/unifesp/livro-xiv.html#aula-8',
        hrefWord,
        '/posts/post-inspecao-expressao-elo-de-ligacao.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + expr.seriesOrder + ' Expressões — posturas da lemniscata; gatilho bodiado.'
    });
    upsertSug(sug, {
      id: 'palavra-lemniscata',
      title: 'Lemniscata — a fita em oito, não a eternidade',
      titleEn: 'Lemniscate — the ribbon in an eight, not eternity',
      titleEs: 'Lemniscata — la cinta en ocho, no la eternidad',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: lemniscata — curva-fita (λημνίσκος); ≠ infinito-conceito; OCR lemeniscata; Valeu !!!',
      whyEn: 'Words: lemniscata — ribbon-curve; ≠ infinity-as-concept; OCR lemeniscata; Valeu !!!',
      whyEs: 'Palabras: lemniscata — curva-cinta; ≠ infinito-concepto; OCR lemeniscata; ¡Valeu !!!',
      suggestedSlug: word.slug,
      doneHref: hrefWord,
      seriesHint: 'palavras-origem',
      sources: [
        word.sourceUrl,
        'https://en.wikipedia.org/wiki/Lemniscate',
        'https://en.wiktionary.org/wiki/lemniscus',
        hrefExpr,
        '/posts/post-inspecao-expressao-elo-de-ligacao.html'
      ],
      notes: 'Cap. ' + word.seriesOrder + ' Palavras — nome da curva; posturas na expressão irmã.'
    });
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (em pé e deitado + lemniscata)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    upsertGuia(
      guia,
      {
        id: 'em-pe-e-deitado',
        word: 'em pé e deitado',
        simple:
          'Locução — par de posturas da lemniscata; bodiado → deitado (+ body). Deitado = ∞; em pé = corpo. Aula XIV Kassia. Valeu !!!',
        simpleEn:
          'Locution — pair of lemniscate postures; bodiado → deitado (+ body). Lying = ∞; standing = body. UNIFESP XIV Kassia. Valeu !!!',
        simpleEs:
          'Locución — par de posturas de la lemniscata; bodiado → deitado (+ body). Acostada = ∞; de pie = cuerpo. Aula XIV Kassia. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: hrefExpr,
        history:
          'Em pé vem de pēs, pedis (pé); deitado é o particípio de deitar. A locução nomeia as duas posturas da mesma lemniscata: deitada = ∞; em pé = caminho no corpo. O ouvido trouxe bodiado — gatilho para deitado, com rasto do inglês body.',
        curiosities:
          'Na 8.ª aula do XIV Curso UNIFESP, Dra. Kassia Martins põe a lemniscata em pé quando pensa o corpo: comunicação cima↔baixo do SEC. O laboratório guarda o par — não afirma que ela usou as palavras. O cruzamento fica em elo de ligação.',
        historyEn:
          'Portuguese em pé comes from pēs, pedis (foot); deitado is the participle of deitar (to lie down). The locution names the two postures of the same lemniscate: lying = ∞; standing = a path in the body. The ear brought bodiado — a trigger for deitado, with a trace of English body.',
        curiositiesEn:
          'In UNIFESP XIV lesson 8, Dr. Kassia Martins stands the lemniscate up when she thinks of the body: up↔down communication in the ECS. The lab keeps the pair — it does not claim she used these words. The crossing stays on elo de ligação.',
        historyEs:
          'Em pé viene de pēs, pedis (pie); deitado es el participio de deitar. La locución nombra las dos posturas de la misma lemniscata: acostada = ∞; de pie = camino en el cuerpo. El oído trajo bodiado — gatillo para deitado, con rastro del inglés body.',
        curiositiesEs:
          'En la 8.ª aula del XIV Curso UNIFESP, la Dra. Kassia Martins pone la lemniscata de pie cuando piensa el cuerpo: comunicación arriba↔abajo del SEC. El laboratorio guarda el par — no afirma que ella usara esas palabras. El cruce queda en elo de ligação.'
      },
      ['elo-de-ligacao', 'link']
    );
    upsertGuia(
      guia,
      {
        id: 'lemniscata',
        word: 'lemniscata',
        simple:
          'Palavra — curva-fita (λημνίσκος); ≠ infinito-conceito; OCR lemeniscata. Posturas: em pé e deitado. Valeu !!!',
        simpleEn:
          'Word — ribbon-curve (λημνίσκος); ≠ infinity-as-concept; OCR lemeniscata. Postures: standing and lying. Valeu !!!',
        simpleEs:
          'Palabra — curva-cinta (λημνίσκος); ≠ infinito-concepto; OCR lemeniscata. Posturas: de pie y acostada. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: hrefWord,
        history:
          'Lemniscata vem do latim lemniscus (fita) ← grego λημνίσκος. É o nome da curva em oito — não o conceito de eternidade nem o glifo ∞ sozinho. OCR da aula: lemeniscata / lemenescata.',
        curiosities:
          'Wallis (1655) desenhou o glifo; Bernoulli (1694) estudou uma curva com esse ar. As posturas em pé × deitado e o cruzamento (elo de ligação) ficam nas fichas irmãs.',
        historyEn:
          'Portuguese lemniscata comes from Latin lemniscus (ribbon) ← Greek λημνίσκος. It is the name of the figure-eight curve — not eternity-as-concept and not the ∞ glyph alone. Classroom OCR: lemeniscata / lemenescata.',
        curiositiesEn:
          'Wallis (1655) drew the glyph; Bernoulli (1694) studied a curve with that look. Standing × lying postures and the crossing (elo de ligação) live on the sister sheets.',
        historyEs:
          'Lemniscata viene del latín lemniscus (cinta) ← griego λημνίσκος. Es el nombre de la curva en ocho — no el concepto de eternidad ni el glifo ∞ solo. OCR del aula: lemeniscata / lemenescata.',
        curiositiesEs:
          'Wallis (1655) dibujó el glifo; Bernoulli (1694) estudió una curva con ese aire. Las posturas de pie × acostada y el cruce (elo de ligação) quedan en las fichas hermanas.'
      },
      ['em-pe-e-deitado', 'elo-de-ligacao']
    );
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (em pé e deitado + lemniscata)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    gloss = gloss.replace(
      /    lemniscata: \{ tone: "craft", category: "Figura", mundane: "Curva em forma de fita; o oito deitado\.", gloss: "[^"]+", href: "[^"]+"/,
      '    lemniscata: { tone: "craft", category: "Figura", mundane: "Curva em forma de fita; o oito deitado.", gloss: "Lat. lemniscus «fita» — nome da curva; ≠ eternidade; OCR lemeniscata; posturas em pé × deitado.", href: "/posts/post-inspecao-palavra-lemniscata.html"'
    );
    gloss = gloss.replace(
      /    "símbolo do infinito": \{ tone: "craft", category: "Figura", mundane: "O oito deitado; marca do sem-fim\.", gloss: "[^"]+", href: "[^"]+"/,
      '    "símbolo do infinito": { tone: "craft", category: "Figura", mundane: "O oito deitado; marca do sem-fim.", gloss: "∞ deitado = infinito; 8 em pé = comunicação (Kassia); ver em pé e deitado.", href: "/posts/post-inspecao-expressao-em-pe-e-deitado.html"'
    );
    if (!gloss.includes('"em pé e deitado"')) {
      const block =
        '    "em pé e deitado": { tone: "craft", category: "Figura", mundane: "Par de posturas da mesma figura em oito.", gloss: "Locução — deitado = ∞; em pé = corpo; bodiado → deitado (+ body); aula XIV Kassia; Valeu !!!", href: "/posts/post-inspecao-expressao-em-pe-e-deitado.html", en: "standing and lying", es: "de pie y acostada", fr: "debout et couché", it: "in piedi e sdraiato", de: "stehend und liegend", el: "όρθιο και ξαπλωμένο", la: "stans et iacens" },\n' +
        '    bodiado: { tone: "craft", category: "Gatilho", mundane: "Ouvido para «deitado» (e rasto de body).", gloss: "Gatilho — bodiado → deitado (+ EN body); ver em pé e deitado.", href: "/posts/post-inspecao-expressao-em-pe-e-deitado.html", en: "lying down (ear trigger)", es: "acostado (gatillo)" },\n' +
        '    deitado: { tone: "craft", category: "Postura", mundane: "Na horizontal; o oito deitado.", gloss: "Particípio de deitar — postura ∞ da lemniscata; gatilho bodiado; ver em pé e deitado.", href: "/posts/post-inspecao-expressao-em-pe-e-deitado.html", en: "lying down", es: "acostado" },\n' +
        '    "em pé": { tone: "craft", category: "Postura", mundane: "Erguido; o oito em pé.", gloss: "Locução — postura vertical da lemniscata (aula XIV Kassia = comunicação); ver em pé e deitado.", href: "/posts/post-inspecao-expressao-em-pe-e-deitado.html", en: "standing", es: "de pie" },\n';
      gloss = gloss.replace(/(    lemniscata: \{[\s\S]*?la: "lemniscus" \},)/, '$1\n' + block);
    }
    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (em pé e deitado + lemniscata href)');
  }

  try {
    await syncSqlAll(posts);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', expr.title, '· Cap.', expr.seriesOrder);
  console.log('OK:', word.title, '· Cap.', word.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
