'use strict';

/**
 * Injeta palavra «noite» na série Palavras.
 * Uso: node scripts/upsert-palavra-noite-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildNoitePost } = require('../lib/noite-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextPalavrasOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'palavras-origem')
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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-noite');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildNoitePost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  i18n[post.slug] = {
    titleEn: post.titleEn,
    titleEs: post.titleEs,
    excerptEn: post.excerptEn,
    excerptEs: post.excerptEs,
    contentEn: post.contentEn,
    contentEs: post.contentEs
  };
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-noite';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Noite — ciclo, escuro e fotoperíodo',
      titleEn: 'Noite — cycle, dark and photoperiod',
      titleEs: 'Noite — ciclo, oscuridad y fotoperiodo',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: noite (lat. nox) — fase escura do ciclo; par com sol; elos luz e interruptor; cultivo; Valeu !!!',
      whyEn: 'Words: noite (Lat. nox) — dark phase of the cycle; pair with sol; links luz and interruptor; grow; Valeu !!!',
      whyEs: 'Palabras: noite (lat. nox) — fase oscura del ciclo; par con sol; vínculos luz e interruptor; cultivo; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wiktionary.org/wiki/nox#Latin',
        '/posts/post-inspecao-palavra-sol.html',
        '/posts/post-inspecao-palavra-luz.html',
        '/posts/post-inspecao-palavra-interruptor.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — par sol × noite; fotoperíodo; circuito artificial.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-noite)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'noite',
      word: 'noite',
      simple:
        'Lat. nox — fase escura do ciclo; par com sol; elos luz e interruptor; fotoperíodo; Valeu !!! com a noite certa.',
      simpleEn:
        'Lat. nox — dark phase of the cycle; pair with sol; links luz and interruptor; photoperiod; Valeu !!! with the right night.',
      simpleEs:
        'Lat. nox — fase oscura del ciclo; par con sol; vínculos luz e interruptor; fotoperiodo; Valeu !!! con la noche cierta.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'noite');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'sol' || x.id === 'luz' || x.id === 'inverno');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (noite)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    noite: { gloss: "Lat. nox — fase escura do ciclo; par com sol; elos luz e interruptor; fotoperíodo; Valeu !!!", href: "/posts/post-inspecao-palavra-noite.html", en: "night", es: "noche", fr: "nuit", it: "notte", de: "Nacht", el: "nyxta", la: "nox", yo: "oru", sw: "usiku", gez: "lelit", nl: "nacht", pl: "noc", ru: "noch", uk: "nich", zh: "ye", ja: "yoru", ko: "밤", ar: "layl", he: "layla", hi: "raat", tr: "gece", sv: "natt", da: "nat", no: "natt", fi: "yo", cs: "noc", ro: "noapte", hu: "ejjel", ca: "nit", gl: "noite", eu: "gau", gn: "pyhare", qu: "tuta", eo: "nokto", vi: "dem", id: "malam", th: "night", hr: "noc", sk: "noc", ga: "oiche", cy: "nos", ha: "dare", am: "lelit", fa: "shab", bn: "rat", zu: "ubusuku" },';
    if (/noite:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    noite:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (noite · existente)');
    } else {
      const reSol = /(sol:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reLuz = /(luz:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reSol.test(gloss)) {
        gloss = gloss.replace(reSol, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (noite · após sol)');
      } else if (reLuz.test(gloss)) {
        gloss = gloss.replace(reLuz, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (noite · após luz)');
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
