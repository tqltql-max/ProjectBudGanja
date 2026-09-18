'use strict';

/**
 * Injeta palavra «cinzeiro» na série Palavras.
 * Uso: node scripts/upsert-palavra-cinzeiro-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildCinzeiroPost } = require('../lib/cinzeiro-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-cinzeiro');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildCinzeiroPost(seriesOrder);

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
    const sugId = 'palavra-cinzeiro';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Cinzeiro — lugar da cinza e ofício do fogo',
      titleEn: 'Cinzeiro — ash place and fire craft',
      titleEs: 'Cinzeiro — lugar de la ceniza y oficio del fuego',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: cinzeiro (cinza+-eiro) — recipiente/monte; fogo/gesto/risco; Faça o melhor!',
      whyEn: 'Words: cinzeiro (cinza+-eiro) — ashtray/heap; fogo/gesto/risco; Do your best!',
      whyEs: 'Palabras: cinzeiro (cinza+-eiro) — cenicero/montón; fogo/gesto/risco; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-fogo.html',
        '/posts/post-inspecao-palavra-gesto.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — grafia canónica cinzeiro (pedido Cinzerio).'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-cinzeiro)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'cinzeiro',
      word: 'cinzeiro',
      simple:
        'Cinza + -eiro — recipiente ou monte da cinza; elos fogo/gesto/risco; Faça o melhor no fim do fogo.',
      simpleEn:
        'Cinza + -eiro — ashtray or ash heap; links fogo/gesto/risco; Do your best at the end of the fire.',
      simpleEs:
        'Cinza + -eiro — cenicero o montón de ceniza; vínculos fogo/gesto/risco; Haz lo mejor al final del fuego.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'cinzeiro');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'fogo' || x.id === 'cinta');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (cinzeiro)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    cinzeiro: { gloss: "Cinza + -eiro — recipiente/monte da cinza; elos fogo/gesto/risco; Faça o melhor!", href: "/posts/post-inspecao-palavra-cinzeiro.html", en: "ashtray", es: "cenicero", fr: "cendrier", it: "posacenere", de: "Aschenbecher", el: "τασάκι", la: "cinerarium", yo: "apo eérú", sw: "chombo cha majivu", gez: "ṣǝḥn ḥamad", nl: "asbak", pl: "popielniczka", ru: "pepel\'nitsa", uk: "popil\'nychka", zh: "yanhui gang", ja: "haizara", ko: "jaetong", ar: "minfada", he: "ma\'afera", hi: "raakhdaan", tr: "küllük", sv: "askfat", da: "askebæger", no: "askebeger", fi: "tuhkakuppi", cs: "popelnik", ro: "scrumiera", hu: "hamutarto", ca: "cendre", gl: "cineiro", eu: "hautsontzi", gn: "tuguái rysýi", qu: "uchpa wayaqa", eo: "cindrujo", vi: "gat tan", id: "asbak", th: "ที่เขี่ยบุหรี่", hr: "pepeljara", sk: "popolník", ga: "luaithreachán", cy: "blwch lludw", ha: "kwandon toka", am: "አመድ ማስቀመጫ", fa: "زيرسيگاري", bn: "অ্যাশট্রে", zu: "isitsha somlotha" },';
    if (/cinzeiro:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    cinzeiro:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (cinzeiro · existente)');
    } else {
      const reFogo = /(fogo:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reFogo.test(gloss)) {
        gloss = gloss.replace(reFogo, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (cinzeiro · após fogo)');
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
