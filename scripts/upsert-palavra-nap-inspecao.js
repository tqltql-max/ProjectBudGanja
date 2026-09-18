'use strict';

/**
 * Injeta palavra «nap» na série Palavras.
 * Uso: node scripts/upsert-palavra-nap-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildNapPost } = require('../lib/nap-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-nap');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildNapPost(seriesOrder);

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
    const sugId = 'palavra-nap';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Nap — sono curto e pausa de ofício',
      titleEn: 'Nap — short sleep and craft pause',
      titleEs: 'Nap — sueño corto y pausa de oficio',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: nap (EN) — cochilo/power nap; gesto/alma/vida; Faça o melhor!',
      whyEn: 'Words: nap (EN) — short sleep/power nap; gesto/alma/vida; Do your best!',
      whyEs: 'Palabras: nap (EN) — siesta corta/power nap; gesto/alma/vida; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [post.sourceUrl, '/posts/post-inspecao-palavra-alma.html', '/posts/post-inspecao-palavra-gesto.html'],
      notes: 'Cap. ' + post.seriesOrder + ' — ≠ húngaro nap (dia).'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-nap)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'nap',
      word: 'nap',
      simple:
        'EN — sono curto / power nap no BR; pausa de ofício; elos gesto/alma; Faça o melhor depois de parar.',
      simpleEn:
        'EN — short sleep / power nap in BR; craft pause; links gesto/alma; Do your best after stopping.',
      simpleEs:
        'EN — sueño corto / power nap en BR; pausa de oficio; vínculos gesto/alma; Haz lo mejor después de parar.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'nap');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'alma' || x.id === 'gesto');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (nap)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    nap: { gloss: "EN — sono curto / power nap; pausa de ofício; elos gesto/alma; Faça o melhor!", href: "/posts/post-inspecao-palavra-nap.html", en: "nap", es: "siesta corta", fr: "somme", it: "pisolino", de: "Nickerchen", el: "ypnako", la: "somnus brevis", yo: "oorun kukuru", sw: "usingizi mfupi", gez: "nəwam", nl: "dutje", pl: "drzemka", ru: "dremota", uk: "drymoty", zh: "xiaoshui", ja: "hirune", ko: "guljam", ar: "gafwa", he: "tnuna", hi: "jhapki", tr: "kestirme", sv: "tupplur", da: "lur", no: "blund", fi: "torkut", cs: "zdrimnuti", ro: "aţipire", hu: "szundi (≠ nap=day)", ca: "becaina", gl: "sesta", eu: "siesta", gn: "kecha\'i", qu: "puñuy", eo: "dormeto", vi: "ngu gat", id: "tidur siang", th: "งีบ", hr: "drijemez", sk: "zdriemnutie", ga: "neos", cy: "hep", ha: "barci", am: "እንቅልፍ", fa: "chort", bn: "তন্দ্রা", zu: "ukozela" },';
    if (/nap:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    nap:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (nap · existente)');
    } else {
      const reAlma = /(alma:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reGesto = /(gesto:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reAlma.test(gloss)) {
        gloss = gloss.replace(reAlma, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (nap · após alma)');
      } else if (reGesto.test(gloss)) {
        gloss = gloss.replace(reGesto, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (nap · após gesto)');
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
