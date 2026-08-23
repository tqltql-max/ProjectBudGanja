'use strict';

/**
 * Injeta palavra «pato» na série Palavras.
 * Uso: node scripts/upsert-palavra-pato-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildPatoPost } = require('../lib/pato-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextPalavrasOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'palavras-origem')
    .map((p) => Number(p.seriesOrder) || 0);
  const max = orders.length ? Math.max(...orders) : 0;
  return max + 1;
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

async function syncSql(post) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  upsertPost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store actualizado:', post.slug);
}

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-pato');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildPatoPost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-pato';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Pato — a palavra da ave, da culpa e da água',
      titleEn: 'Pato — the word of the bird, blame, and water',
      titleEs: 'Pato — la palabra del ave, de la culpa y del agua',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: pato (árabe-hispânico) — ave, pagar o pato, jambu/tucupi; animal/água/coelho; Valeu !!!',
      whyEn: 'Words: pato (Arabic-Hispanic) — bird, take the blame, jambu/tucupi; animal/água/coelho; Valeu !!!',
      whyEs: 'Palabras: pato (árabe-hispánico) — ave, pagar el pato, jambu/tucupi; animal/água/coelho; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-animal.html',
        '/posts/post-inspecao-palavra-agua.html',
        '/posts/post-inspecao-palavra-coelho.html',
        '/posts/post-inspecao-planta-jambu.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — ave ≠ gíria; étimo árabe ≠ lat. anas.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-pato)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'pato',
      word: 'pato',
      simple:
        'Árabe-hispânico — ave aquática, pagar o pato e pato no tucupi; elos animal/água/jambu; Valeu !!!',
      simpleEn:
        'Arabic-Hispanic — waterbird, take the blame and duck in tucupi; links animal/água/jambu; Valeu !!!',
      simpleEs:
        'Árabe-hispánico — ave acuática, pagar el pato y pato en tucupi; vínculos animal/água/jambu; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'pato');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'animal' || x.id === 'coelho' || x.id === 'agua'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (pato)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    pato: { gloss: "Ave aquática (árabe-hispânico) — pagar o pato, culinária amazónica; elos animal/água/jambu.", href: "/posts/post-inspecao-palavra-pato.html", en: "duck", es: "pato", fr: "canard", it: "anatra", de: "Ente", el: "πάπια", la: "anas", yo: "pepe", sw: "bata", gez: "daqy", nl: "eend", pl: "kaczka", ru: "utka", uk: "kachka", zh: "yazi", ja: "ahiru", ko: "ori", ar: "batta", he: "barvaz", hi: "batakh", tr: "ordek", sv: "anka", da: "and", no: "and", fi: "ankka", cs: "kachna", ro: "rata", hu: "kacsa", ca: "anec", gl: "pato", eu: "ahate", gn: "ypa", qu: "anu", eo: "anaso", vi: "vit", id: "bebek", th: "ped", hr: "patka", sk: "kacka", ga: "lacha", cy: "hwyaden", ha: "agwagwa", am: "duk", fa: "bat", bn: "hans", zu: "idada" },';
    if (/pato:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    pato:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (pato · existente)');
    } else {
      const reAnimal = /(animal:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reCoelho = /(coelho:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reAnimal.test(gloss)) {
        gloss = gloss.replace(reAnimal, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (pato · após animal)');
      } else if (reCoelho.test(gloss)) {
        gloss = gloss.replace(reCoelho, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (pato · após coelho)');
      } else {
        console.warn('Aviso: glossário — ponto de inserção não encontrado');
      }
    }
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '| Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
