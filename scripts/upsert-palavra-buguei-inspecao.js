'use strict';

/**
 * Injeta palavra «buguei» na série Palavras.
 * Uso: node scripts/upsert-palavra-buguei-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildBugueiPost } = require('../lib/buguei-inspecao-post.js');

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
  const post = buildBugueiPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-buguei';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Buguei — do inseto ao «deu ruim» e Faça o melhor!',
      titleEn: 'Buguei — from insect to “it went bad” and Do your best!',
      titleEs: 'Buguei — del insecto al «salió mal» y ¡Haz lo mejor!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: buguei — bug (inseto) → falha → peito; alteração que parece ruim; Faça o melhor depois do tranco.',
      whyEn: 'Words: buguei — bug (insect) → fault → chest; shift that sounds bad; Do your best after the stall.',
      whyEs: 'Palabras: buguei — bug (insecto) → fallo → pecho; alteración que suena mala; Haz lo mejor después del tranco.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wiktionary.org/wiki/bug',
        'https://pt.wikipedia.org/wiki/Inseto',
        '/posts/post-inspecao-palavra-animal.html',
        '/posts/post-inspecao-palavra-aff.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. 34 — inseto × pejorativo × desbugar com ofício.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-buguei)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'buguei',
      word: 'buguei',
      simple:
        'De bug (inseto) à falha e ao peito BR; o sentido foi puxado para «ruim»; depois do tranco, Faça o melhor!',
      simpleEn:
        'From bug (insect) to fault and the BR chest; sense pulled toward “bad”; after the stall, Do your best!',
      simpleEs:
        'De bug (insecto) al fallo y al pecho BR; el sentido se tiró a «malo»; después del tranco, ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'aff' || x.id === 'meudeusdoceu' || x.id === 'animal'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (buguei)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (!gloss.includes('buguei: {') && !gloss.includes('bugar: {')) {
      const re = /(aff: \{[\s\S]*?zu: "hawu" },\r?\n)/;
      const entry =
        '    buguei: { tone: "caution", category: "Tranco", mundane: "Gíria BR — travei/confundi (de bug = inseto/falha).", gloss: "Inseto→falha→peito; parece «ruim» por selecção de sentido; depois Faça o melhor!", href: "/posts/post-inspecao-palavra-buguei.html", en: "I glitched / froze", es: "me trabé", fr: "j\'ai bugué", it: "ho buggato", de: "ich habe einen Hänger", el: "κόλλησα", la: "haesi", yo: "mo dáwọ́ duro", sw: "nimesimama", gez: "täwaḳḳäfku", nl: "ik hing", pl: "zaciąłem się", ru: "завис", uk: "завис", zh: "卡住了", ja: "フリーズした", ko: "버벅였다", ar: "تعثرت", he: "נתקעתי", hi: "अटक गया", tr: "takıldım", sv: "jag hängde", da: "jeg hang", no: "jeg hang", fi: "jäin jumiin", cs: "zasekl jsem se", ro: "m-am blocat", hu: "beragadtam", ca: "m\'he bloquejat", gl: "travei", eu: "trabatu naiz", gn: "ajejoko", qu: "sayarqani", eo: "mi blokiĝis", vi: "bị đơ", id: "saya nge-bug", th: "ค้าง", hr: "zaglavio sam", sk: "zasekol som sa", ga: "chuaigh mé i bhfostú", cy: "mi wnes i rewi", ha: "na tsaya", am: "ተጣበቅኩ", fa: "گیر کردم", bn: "আটকে গেছি", zu: "ngibambekile" },\n' +
        '    bugar: { gloss: "Verbo informal — travar/falhar (de bug); ver ficha buguei.", href: "/posts/post-inspecao-palavra-buguei.html", en: "to glitch / freeze", es: "buguear", fr: "buguer", it: "buggare", de: "hängen", el: "κολλάω", la: "haerere", yo: "dáwọ́ duro", sw: "kusimama", gez: "wäḳḳäfä", nl: "hangen", pl: "zacinać się", ru: "зависать", uk: "зависати", zh: "卡死", ja: "バグる", ko: "버그나다", ar: "يتعطل", he: "לתקוע", hi: "अटकना", tr: "takılmak", sv: "hänga", da: "hænge", no: "henge", fi: "jumittua", cs: "zaseknout se", ro: "a se bloca", hu: "beragadni", ca: "bloquejar-se", gl: "travar", eu: "trabatu", gn: "jejoko", qu: "sayay", eo: "blokiĝi", vi: "bị đơ", id: "ngebug", th: "ค้าง", hr: "zaglaviti", sk: "zaseknúť sa", ga: "dul i bhfostú", cy: "rhewi", ha: "tsayawa", am: "መጣበቅ", fa: "گیر کردن", bn: "আটকে যাওয়া", zu: "ukubambeka" },\n';
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (buguei / bugar)');
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

  console.log('OK:', post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
