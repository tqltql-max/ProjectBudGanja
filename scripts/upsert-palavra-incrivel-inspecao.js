'use strict';

/**
 * Injeta palavra «incrível» na série Palavras.
 * Uso: node scripts/upsert-palavra-incrivel-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildIncrivelPost } = require('../lib/incrivel-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug);
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
  // Re-read shared files at write time (other agents may land concurrently).
  const post = buildIncrivelPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

  // Avoid Cap collision if another agent just claimed seriesOrder.
  const taken = new Set(
    posts
      .filter((p) => p.slug !== post.slug && typeof p.seriesOrder === 'number')
      .map((p) => p.seriesOrder)
  );
  let order = post.seriesOrder;
  while (taken.has(order) && order < 120) order += 1;
  if (order !== post.seriesOrder) {
    post.seriesOrder = order;
    console.log('seriesOrder ajustado para Cap.', order, '(evitar colisão)');
  }

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-incrivel';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Incrível — incredibilis, elogio BR e a escala legal→genial',
      titleEn: 'Incrível — incredibilis, BR praise, and the legal→genial scale',
      titleEs: 'Incrível — incredibilis, elogio BR y la escala legal→genial',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: incrível (lat. incredibilis) — incredulidade e elogio BR; escala legal/especial/genial; Valeu !!!',
      whyEn: 'Words: incrível (Lat. incredibilis) — unbelief and BR praise; legal/especial/genial scale; Valeu !!!',
      whyEs: 'Palabras: incrível (lat. incredibilis) — incredulidad y elogio BR; escala legal/especial/genial; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wiktionary.org/wiki/incredibilis',
        '/posts/post-inspecao-palavra-legal.html',
        '/posts/post-inspecao-palavra-genial.html',
        '/posts/post-inspecao-palavra-fantastico.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — incredibilis × elogio BR; escala só com fichas existentes.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-incrivel)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'incrivel',
      word: 'incrível',
      simple:
        'Lat. incredibilis — inacreditável e elogio BR «uau»; escala legal → especial → genial → incrível; Valeu !!!',
      simpleEn:
        'Lat. incredibilis — unbelievable and BR praise “wow”; scale legal → especial → genial → incrível; Valeu !!!',
      simpleEs:
        'Lat. incredibilis — inacreditável y elogio BR «uau»; escala legal → especial → genial → incrível; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'genial' || x.id === 'legal' || x.id === 'especial'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (incrível)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const rich =
      '    incrivel: { gloss: "Lat. incredibilis — inacreditável / elogio BR «uau»; escala legal→genial; Valeu !!!", href: "/posts/post-inspecao-palavra-incrivel.html", en: "incredible / unbelievable", es: "increíble", fr: "incroyable", it: "incredibile", de: "unglaublich", el: "απίστευτος", la: "incredibilis", yo: "àìgbàgbọ́", sw: "asiyeaminika", gez: "ዘኢይትአመን", nl: "ongelooflijk", pl: "niesamowity", ru: "невероятный", uk: "неймовірний", zh: "不可思议的", ja: "信じられない", ko: "믿을 수 없는", ar: "لا يصدق", he: "מדהים", hi: "अविश्वसनीय", tr: "inanılmaz", sv: "otrolig", da: "utrolig", no: "utrolig", fi: "uskomaton", cs: "neuvěřitelný", ro: "incredibil", hu: "hihetetlen", ca: "increïble", gl: "incríbel", eu: "sinestezina", gn: "ndaikatúiva jerovia", qu: "mana iñinapaq", eo: "nekredebla", vi: "không thể tin được", id: "luar biasa", th: "เหลือเชื่อ", hr: "nevjerojatan", sk: "neuveriteľný", ga: "dochreidte", cy: "anhygoel", ha: "abin mamaki", am: "የማይታመን", fa: "باورنکردنی", bn: "অবিশ্বাস্য", zu: "okungakholeki" },';
    if (/incrivel: \{[^}]*href: "\/posts\/post-inspecao-palavra-incrivel\.html"/.test(gloss)) {
      console.log('Glossário já tinha incrivel enriquecido');
    } else if (/incrivel: \{[\s\S]*?zu: "[^"]*" },/.test(gloss)) {
      gloss = gloss.replace(/incrivel: \{[\s\S]*?zu: "[^"]*" },/, rich);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (incrivel enriquecido)');
    } else {
      const re = /(genial: \{[\s\S]*?zu: "[^"]*" },\r?\n)/;
      const reLegal = /(legal: \{[\s\S]*?zu: "[^"]*" },\r?\n)/;
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1' + rich + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (incrivel · após genial)');
      } else if (reLegal.test(gloss)) {
        gloss = gloss.replace(reLegal, '$1' + rich + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (incrivel · após legal)');
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

  console.log('OK:', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
