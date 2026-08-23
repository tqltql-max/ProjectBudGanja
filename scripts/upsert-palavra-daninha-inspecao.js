'use strict';

/**
 * Injeta palavra «daninha» na série Palavras.
 * Uso: node scripts/upsert-palavra-daninha-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildDaninhaPost } = require('../lib/daninha-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-daninha');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildDaninhaPost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-daninha';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Daninha — juízo de cultivo e planta viva',
      titleEn: 'Daninha — cultivation judgment and living plant',
      titleEs: 'Daninha — juicio de cultivo y planta viva',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: daninha (dano+-inha) — planta daninha como juízo de lugar; planta/cultivo/selvagem; Valeu !!!',
      whyEn: 'Words: daninha (dano+-inha) — weed as place-judgment; planta/cultivo/selvagem; Valeu !!!',
      whyEs: 'Palabras: daninha (dano+-inha) — planta daninha como juicio de lugar; planta/cultivo/selvagem; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-planta.html',
        '/cultivo/',
        '/posts/post-inspecao-palavra-selvagem.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — weed ≠ maconha; juízo relativo ao plano.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-daninha)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'daninha',
      word: 'daninha',
      simple:
        'Dano + -inha — planta daninha como juízo de lugar no cultivo; elos planta/selvagem; Valeu !!! com o juízo certo.',
      simpleEn:
        'Dano + -inha — weed as place-judgment in cultivation; links planta/selvagem; Valeu !!! with the right judgment.',
      simpleEs:
        'Dano + -inha — planta daninha como juicio de lugar; vínculos planta/selvagem; Valeu !!! con el juicio correcto.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'daninha');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'planta' || x.id === 'selvagem' || x.id === 'erva'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (daninha)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    daninha: { gloss: "Dano + -inha — planta daninha como juízo de lugar; elos planta/cultivo/selvagem; Valeu !!!", href: "/posts/post-inspecao-palavra-daninha.html", en: "weed (agronomic)", es: "maleza / danina", fr: "mauvaise herbe", it: "malerba", de: "Unkraut", el: "zizanio", la: "herba noxia", yo: "ewe buburu", sw: "magugu", gez: "asar", nl: "onkruid", pl: "chwast", ru: "sorniak", uk: "burian", zh: "zacao", ja: "zasso", ko: "japcho", ar: "hashish dar", he: "esev", hi: "gajar ghas", tr: "yaban otu", sv: "ogras", da: "ukrudt", no: "ugress", fi: "rikkaruoho", cs: "plevel", ro: "buruiana", hu: "gyom", ca: "mala herba", gl: "mala herba", eu: "belar txar", gn: "kaaigo", qu: "qura", eo: "malherbo", vi: "co dai", id: "gulma", th: "weed", hr: "korov", sk: "burina", ga: "fiaile", cy: "chwyn", ha: "cive", am: "sar", fa: "alaf", bn: "agacha", zu: "ukhula" },';
    if (/daninha:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    daninha:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (daninha · existente)');
    } else {
      const rePlanta = /(planta:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reSelv = /(selvagem:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (rePlanta.test(gloss)) {
        gloss = gloss.replace(rePlanta, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (daninha · após planta)');
      } else if (reSelv.test(gloss)) {
        gloss = gloss.replace(reSelv, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (daninha · após selvagem)');
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
