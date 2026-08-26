'use strict';

/**
 * Upsert lote Tamara / Bom dia, Inverno:
 * — léxico do gelo da homepage /inverno/ (lote original + palavras da página)
 * — Guia de Palavras (href → ficha)
 * — refresh da divulgação Artes
 *
 * Uso: node scripts/upsert-tamara-inverno-palavras.js
 */

const fs = require('fs');
const path = require('path');
const {
  TAMARA_INVERNO_PALAVRAS_POSTS,
  TAMARA_INVERNO_PALAVRA_HREFS,
  invernoLexiconWords
} = require('../lib/tamara-inverno-palavras-posts.js');
const {
  GUIA_TAMARA_INVERNO_ITEMS,
  buildBomDiaInvernoPost
} = require('../lib/bom-dia-inverno-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const CATALOG_FILE = path.join(
  ROOT,
  'content',
  'transcripts',
  'tamara-klink',
  'V3GSlr5sp7c-palavras.json'
);

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) posts[idx] = Object.assign({}, posts[idx], post);
  else posts.unshift(post);
}

function patchInvernoJs() {
  const file = path.join(ROOT, 'js', 'inverno.js');
  let src = fs.readFileSync(file, 'utf8');
  const words = invernoLexiconWords();
  const lines = words.map((w) => {
    return (
      '    { id: ' +
      JSON.stringify(w.id) +
      ', href: ' +
      JSON.stringify(w.href) +
      ', pt: ' +
      JSON.stringify(w.pt) +
      ', en: ' +
      JSON.stringify(w.en) +
      ', es: ' +
      JSON.stringify(w.es) +
      ', simplePt: ' +
      JSON.stringify(w.simplePt) +
      ', simpleEn: ' +
      JSON.stringify(w.simpleEn) +
      ', simpleEs: ' +
      JSON.stringify(w.simpleEs) +
      ' }'
    );
  });
  const block = '  var WORDS = [\n' + lines.join(',\n') + '\n  ];';
  if (!/  var WORDS = \[[\s\S]*?\n  \];/.test(src)) {
    throw new Error('inverno.js: bloco WORDS não encontrado');
  }
  src = src.replace(/  var WORDS = \[[\s\S]*?\n  \];/, block);
  fs.writeFileSync(file, src, 'utf8');
  console.log('js/inverno.js: %d palavras no léxico do gelo', words.length);
}

function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
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

async function syncSql(postsToSync) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  for (const post of postsToSync) upsertPost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store: %d posts sync', postsToSync.length);
}

async function main() {
  const palavraPosts = TAMARA_INVERNO_PALAVRAS_POSTS.slice();
  const arte = buildBomDiaInvernoPost();
  const all = palavraPosts.concat([arte]);

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  for (const post of all) upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');
  console.log('posts.json: %d palavras + divulgação', palavraPosts.length);

  patchInvernoJs();

  for (const post of all) {
    try {
      writeHtml(post);
    } catch (e) {
      console.warn('HTML aviso', post.slug, e.message);
    }
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  for (const post of all) writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    let n = 0;
    for (const entry of GUIA_TAMARA_INVERNO_ITEMS) {
      const gi = items.findIndex((x) => x.id === entry.id);
      if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
      else items.push(entry);
      n += 1;
    }
    // Boost deep words that the divulgação already links
    const deepBoost = [
      { id: 'caminho', href: '/posts/post-inspecao-palavra-caminho.html' },
      { id: 'passar', href: '/posts/post-inspecao-palavra-passar.html' },
      { id: 'gesto', href: '/posts/post-inspecao-palavra-gesto.html' },
      { id: 'verdade', href: '/posts/post-inspecao-palavra-verdade.html' },
      { id: 'criatividade', href: '/posts/post-inspecao-palavra-criatividade.html' },
      { id: 'simbiose', href: '/posts/post-inspecao-palavra-simbiose.html' },
      { id: 'animal', href: '/posts/post-inspecao-palavra-animal.html' },
      { id: 'coelho', href: '/posts/post-inspecao-palavra-coelho.html' },
      { id: 'emocao', href: '/posts/post-inspecao-palavra-emocao.html' },
      { id: 'medo', href: '/posts/post-inspecao-palavra-medo.html' },
      { id: 'alegria', href: '/posts/post-inspecao-palavra-alegria.html' },
      { id: 'tristeza', href: '/posts/post-inspecao-palavra-tristeza.html' },
      { id: 'raiva', href: '/posts/post-inspecao-palavra-raiva.html' },
      { id: 'nojinho', href: '/posts/post-inspecao-palavra-nojinho.html' }
    ];
    for (const b of deepBoost) {
      const gi = items.findIndex((x) => x.id === b.id);
      if (gi >= 0) items[gi] = Object.assign({}, items[gi], { href: b.href });
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia: lote Tamara/Inverno %d entradas (href → ficha)', n);
  }

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    for (const post of palavraPosts) {
      const sugId = 'palavra-' + post.slug.replace(/^inspecao-palavra-/, '');
      const href = '/posts/post-' + post.slug + '.html';
      const entry = {
        id: sugId,
        title: post.title.replace(/^Inspeção:\s*/, ''),
        titleEn: post.titleEn,
        titleEs: post.titleEs,
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: post.excerpt,
        whyEn: post.excerptEn,
        whyEs: post.excerptEs,
        suggestedSlug: post.slug,
        doneHref: href,
        seriesHint: 'palavras-origem',
        sources: [
          '/posts/post-inspecao-arte-bom-dia-inverno.html',
          '/posts/post-inspecao-tamara-klink.html',
          'https://www.youtube.com/watch?v=V3GSlr5sp7c'
        ],
        notes: 'Lote Tamara / Bom dia, Inverno'
      };
      const si = items.findIndex((x) => x.id === sugId);
      if (si >= 0) items[si] = Object.assign({}, items[si], entry);
      else items.push(entry);
    }
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões: %d palavras lote marcadas feitas', palavraPosts.length);
  }

  if (fs.existsSync(CATALOG_FILE)) {
    const catalog = JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf8'));
    const hrefByStem = Object.assign({}, TAMARA_INVERNO_PALAVRA_HREFS, {
      balde: '/posts/post-inspecao-palavra-balde.html',
      caminho: '/posts/post-inspecao-palavra-caminho.html',
      passar: '/posts/post-inspecao-palavra-passar.html',
      gesto: '/posts/post-inspecao-palavra-gesto.html',
      verdade: '/posts/post-inspecao-palavra-verdade.html',
      animal: '/posts/post-inspecao-palavra-animal.html',
      medo: '/posts/post-inspecao-palavra-medo.html',
      vida: '/vida/',
      animais: '/animais/',
      envernagem: TAMARA_INVERNO_PALAVRA_HREFS.invernagem,
      fjord: TAMARA_INVERNO_PALAVRA_HREFS.fiorde,
      fiordo: TAMARA_INVERNO_PALAVRA_HREFS.fiorde,
      camera: TAMARA_INVERNO_PALAVRA_HREFS.camara,
      cielo: TAMARA_INVERNO_PALAVRA_HREFS.ceu,
      escrevo: TAMARA_INVERNO_PALAVRA_HREFS.escrever,
      escrevi: TAMARA_INVERNO_PALAVRA_HREFS.escrever,
      fiquei: TAMARA_INVERNO_PALAVRA_HREFS.ficar,
      ficava: TAMARA_INVERNO_PALAVRA_HREFS.ficar
    });
    let mapped = 0;
    for (const w of catalog.words || []) {
      const key = String(w.word || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      if (hrefByStem[key]) {
        w.href = hrefByStem[key];
        mapped += 1;
      }
    }
    catalog.mappedAt = new Date().toISOString();
    catalog.mappedCount = mapped;
    fs.writeFileSync(CATALOG_FILE, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
    console.log('Catálogo Q&A: %d palavras com href', mapped);
  }

  try {
    await syncSql(all);
  } catch (e) {
    console.warn('SQL sync aviso:', e.message);
  }

  console.log('OK — lote Tamara/Inverno linkado e catalogado');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
