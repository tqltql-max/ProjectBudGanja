'use strict';

/**
 * Injeta palavra «inspiração» na série Palavras.
 * Uso: node scripts/upsert-palavra-inspiracao-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildInspiracaoPost } = require('../lib/inspiracao-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-inspiracao');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildInspiracaoPost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-inspiracao';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Inspiração — sopro, ideia acesa e Valeu !!!',
      titleEn: 'Inspiração — breath, lit idea and Valeu !!!',
      titleEs: 'Inspiração — aliento, idea encendida y ¡Valeu !!!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: inspiração (lat. īnspīrātiō) — sopro × ideia BR; criatividade/gesto/esperança; Valeu !!!',
      whyEn: 'Words: inspiração (Lat. īnspīrātiō) — breath × idea BR; creativity/gesture/hope; Valeu !!!',
      whyEs: 'Palabras: inspiração (lat. īnspīrātiō) — aliento × idea BR; creatividad/gesto/esperanza; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/inspirar',
        '/posts/post-inspecao-palavra-criatividade.html',
        '/posts/post-inspecao-palavra-gesto.html',
        '/posts/post-inspecao-palavra-esperanca.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — sopro vivo; tipografia spnresoarpi → inspiração.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-inspiracao)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'inspiracao',
      word: 'inspiração',
      simple:
        'Lat. īnspīrātiō — sopro × ideia BR; elos criatividade/gesto/esperança; Valeu !!! com o sopro.',
      simpleEn:
        'Lat. īnspīrātiō — breath × idea BR; links creativity/gesture/hope; Valeu !!! with the breath.',
      simpleEs:
        'Lat. īnspīrātiō — aliento × idea BR; vínculos creatividad/gesto/esperanza; Valeu !!! con el soplo.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'inspiração');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) =>
          x.id === 'esperanca' ||
          x.id === 'criatividade' ||
          x.id === 'gesto' ||
          x.id === 'coracao'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (inspiração)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    inspiração: { gloss: "Lat. īnspīrātiō — sopro × ideia BR; elos criatividade/gesto/esperança; Valeu !!!", href: "/posts/post-inspecao-palavra-inspiracao.html", en: "inspiration", es: "inspiración", fr: "inspiration", it: "ispirazione", de: "Inspiration", el: "έμπνευση", la: "inspiratio", yo: "ìmísí", sw: "msukumo", gez: "näfasä", nl: "inspiratie", pl: "inspiracja", ru: "вдохновение", uk: "натхнення", zh: "灵感", ja: "インスピレーション", ko: "영감", ar: "إلهام", he: "השראה", hi: "प्रेरणा", tr: "ilham", sv: "inspiration", da: "inspiration", no: "inspirasjon", fi: "inspiraatio", cs: "inspirace", ro: "inspirație", hu: "ihlet", ca: "inspiració", gl: "inspiración", eu: "inspirazio", gn: "py\'aguapy", qu: "samay", eo: "inspiro", vi: "cảm hứng", id: "inspirasi", th: "แรงบันดาลใจ", hr: "inspiracija", sk: "inšpirácia", ga: "inspioráid", cy: "ysbrydoliaeth", ha: "wahayi", am: "መነሳሳት", fa: "الهام", bn: "অনুপ্রেরণা", zu: "ugqozi" },';
    if (/inspiração:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    inspiração:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (inspiração · entrada existente enriquecida)');
    } else {
      const reEsp = /(esperança:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reCriat = /(criatividade:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reEsp.test(gloss)) {
        gloss = gloss.replace(reEsp, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (inspiração · após esperança)');
      } else if (reCriat.test(gloss)) {
        gloss = gloss.replace(reCriat, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (inspiração · após criatividade)');
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
