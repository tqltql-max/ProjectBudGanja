'use strict';

/**
 * Injeta expressão «em pé» (oito erguido / postura vertical).
 * Uso: node scripts/upsert-expressao-em-pe.js
 */

const fs = require('fs');
const path = require('path');
const { buildEmPePost } = require('../lib/em-pe-inspecao-post.js');
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
  console.log('SQL store actualizado (lote em pé)');
}

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find((p) => p.slug === 'inspecao-expressao-em-pe');
  const order = existing
    ? Number(existing.seriesOrder) || nextOrder(posts, 'expressoes-ditados')
    : nextOrder(posts, 'expressoes-ditados');
  const post = buildEmPePost(order);

  const related = [
    post,
    keepOrder(posts, 'inspecao-expressao-em-pe-e-deitado', buildEmPeEDeitadoPost),
    keepOrder(posts, 'inspecao-palavra-lemniscata', buildLemniscataPost),
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

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'expressao-em-pe';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'em pé — o oito erguido, o corpo como caminho',
      titleEn: 'em pé — the standing eight, the body as a path',
      titleEs: 'em pé — el ocho erguido, el cuerpo como camino',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: em pé — postura vertical; oito erguido da lemniscata; aula XIV Kassia (corpo); Valeu !!!',
      whyEn: 'Sayings: em pé — standing; standing eight of the lemniscate; UNIFESP XIV Kassia; Valeu !!!',
      whyEs: 'Dichos: em pé — de pie; ocho erguido de la lemniscata; aula XIV Kassia; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/p%C3%A9',
        '/biblioteca/unifesp/livro-xiv.html#aula-8',
        '/posts/post-inspecao-expressao-em-pe-e-deitado.html',
        '/posts/post-inspecao-palavra-lemniscata.html',
        '/posts/post-inspecao-expressao-elo-de-ligacao.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' Expressões — postura vertical; oito erguido.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-em-pe)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'em-pe',
      word: 'em pé',
      simple:
        'Locução — postura vertical; oito erguido da lemniscata; aula XIV Kassia (corpo). Valeu !!!',
      simpleEn:
        'Locution — standing; the standing eight of the lemniscate; UNIFESP XIV Kassia (body). Valeu !!!',
      simpleEs:
        'Locución — de pie; el ocho erguido de la lemniscata; aula XIV Kassia (cuerpo). ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Em pé vem de pēs, pedis (pé, apoio). A locução nomeia quem está erguido — não sentado, não deitado. Variante de pé. No laboratório, é o oito vertical da lemniscata.',
      curiosities:
        'Na 8.ª aula do XIV Curso UNIFESP, Dra. Kassia Martins põe a lemniscata em pé quando pensa o corpo: comunicação cima↔baixo. O par fica em em pé e deitado; o cruzamento em elo de ligação.',
      historyEn:
        'Portuguese em pé comes from pēs, pedis (foot, support). The locution names who is upright — not sitting, not lying. Variant de pé. In the lab it is the standing eight of the lemniscate.',
      curiositiesEn:
        'In UNIFESP XIV lesson 8, Dr. Kassia Martins stands the lemniscate up when she thinks of the body: up↔down communication. The pair stays on em pé e deitado; the crossing on elo de ligação.',
      historyEs:
        'Em pé viene de pēs, pedis (pie, apoyo). La locución nombra a quien está erguido. Variante de pé. En el laboratorio es el ocho de pie de la lemniscata.',
      curiositiesEs:
        'En la 8.ª aula del XIV Curso UNIFESP, la Dra. Kassia Martins pone la lemniscata de pie cuando piensa el cuerpo. El par queda en em pé e deitado; el cruce en elo de ligação.'
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'em pé');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'em-pe-e-deitado' || x.id === 'elo-de-ligacao');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (em pé)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    gloss = gloss.replace(
      /    "em pé": \{ tone: "craft", category: "Postura", mundane: "Erguido; o oito em pé\.", gloss: "[^"]+", href: "[^"]+"/,
      '    "em pé": { tone: "craft", category: "Postura", mundane: "Erguido; o oito em pé.", gloss: "Locução — postura vertical; oito erguido da lemniscata; aula XIV Kassia (corpo); Valeu !!!", href: "/posts/post-inspecao-expressao-em-pe.html"'
    );
    if (!gloss.includes('"de pé"')) {
      gloss = gloss.replace(
        /(    "em pé": \{[\s\S]*?es: "de pie" \},)/,
        '$1\n    "de pé": { tone: "craft", category: "Postura", mundane: "Variante de em pé.", gloss: "Mesma locução — ver em pé.", href: "/posts/post-inspecao-expressao-em-pe.html", en: "standing", es: "de pie" },'
      );
    }
    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (em pé href)');
  }

  try {
    await syncSqlAll(posts);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
