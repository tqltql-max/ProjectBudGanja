'use strict';

/**
 * Injeta palavra «esperança» na série Palavras.
 * Uso: node scripts/upsert-palavra-esperanca-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildEsperancaPost } = require('../lib/esperanca-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-esperanca');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildEsperancaPost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-esperanca';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Esperança — afecto vivo, espera com ofício e Faça o melhor!',
      titleEn: 'Esperança — lived hope, waiting with craft and Do your best!',
      titleEs: 'Esperança — esperanza vivida, espera con oficio y ¡Haz lo mejor!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: esperança (lat. spēs / sperantia) — afecto vivo BR; esperar × esperança; rede alegria/medo/tristeza; Faça o melhor!',
      whyEn: 'Words: esperança (Lat. spēs / sperantia) — lived BR hope; wait vs hope; joy/fear/sadness net; Do your best!',
      whyEs: 'Palabras: esperança (lat. spēs / sperantia) — esperanza vivida BR; esperar × esperança; red alegría/miedo/tristeza; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/esperar',
        '/posts/post-inspecao-palavra-alegria.html',
        '/posts/post-inspecao-palavra-medo.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — fresta viva; sem sermão; tipografia epseramja → esperança.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-esperanca)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'esperanca',
      word: 'esperança',
      simple:
        'Lat. spēs / sperantia — afecto vivo BR; esperar × esperança; fresta junto a medo/tristeza; Faça o melhor com ofício.',
      simpleEn:
        'Lat. spēs / sperantia — lived BR hope; wait vs hope; crack of light beside fear/sadness; Do your best with craft.',
      simpleEs:
        'Lat. spēs / sperantia — esperanza vivida BR; esperar × esperança; rendija junto a miedo/tristeza; Haz lo mejor con oficio.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'esperança');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'emocao' || x.id === 'alegria' || x.id === 'medo' || x.id === 'coracao'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (esperança)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    esperança: { gloss: "Lat. spēs / sperantia — afecto vivo BR; esperar × esperança; fresta com ofício; Faça o melhor!", href: "/posts/post-inspecao-palavra-esperanca.html", en: "hope", es: "esperanza", fr: "espoir", it: "speranza", de: "Hoffnung", el: "ελπίδα", la: "spes", yo: "ìrètí", sw: "tumaini", gez: "tesfā", nl: "hoop", pl: "nadzieja", ru: "надежда", uk: "надія", zh: "希望", ja: "希望", ko: "희망", ar: "أمل", he: "תקווה", hi: "आशा", tr: "umut", sv: "hopp", da: "håb", no: "håp", fi: "toivo", cs: "naděje", ro: "speranță", hu: "remény", ca: "esperança", gl: "esperanza", eu: "espero", gn: "jerovia", qu: "suyay", eo: "espero", vi: "hy vọng", id: "harapan", th: "ความหวัง", hr: "nada", sk: "nádej", ga: "dóchas", cy: "gobaith", ha: "bege", am: "ተስፋ", fa: "امید", bn: "আশা", zu: "ithemba" },';
    if (/esperança:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    esperança:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (esperança · entrada existente enriquecida)');
    } else {
      const reMedo = /(medo:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reAlegria = /(alegria:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reMedo.test(gloss)) {
        gloss = gloss.replace(reMedo, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (esperança · após medo)');
      } else if (reAlegria.test(gloss)) {
        gloss = gloss.replace(reAlegria, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (esperança · após alegria)');
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
