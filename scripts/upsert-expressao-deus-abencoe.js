'use strict';

/**
 * Injeta expressão «Deus abençoe».
 * Uso: node scripts/upsert-expressao-deus-abencoe.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildDeusAbencoePost
} = require('../lib/deus-abencoe-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

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
  const post = buildDeusAbencoePost();
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
    const sugId = 'expressao-deus-abencoe';
    const si = items.findIndex(
      (x) => x.id === sugId || x.id === 'expressao-deus-abenco'
    );
    const entry = {
      id: sugId,
      title: 'Deus abençoe — bênção, despedida e tipografia Deus Abenço',
      titleEn: 'Deus abençoe — blessing, farewell and tipography Deus Abenço',
      titleEs: 'Deus abençoe — bendición, despedida y tipografía Deus Abenço',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: Deus abençoe — bênção/despedida BR; tipografia Deus Abenço → Deus abençoe; sem proselitismo.',
      whyEn: 'Sayings: Deus abençoe — BR blessing/farewell; tipography Deus Abenço → Deus abençoe; no proselytizing.',
      whyEs: 'Dichos: Deus abençoe — bendición/despedida BR; tipografía Deus Abenço → Deus abençoe; sin proselitismo.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        '/posts/post-inspecao-expressao-jesusamando.html',
        '/posts/post-inspecao-expressao-filho-de-deus.html',
        '/posts/post-inspecao-expressao-muito-obrigado.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. 11 Expressões — tipografia Deus Abenço → Deus abençoe; ficha ≠ catecismo.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-deus-abencoe)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'deus-abencoe',
      word: 'Deus abençoe',
      simple:
        'Expressão — bênção e despedida BR; tipografia Deus Abenço → Deus abençoe; respeito à fé, sem proselitismo; depois Faça o melhor!',
      simpleEn:
        'Saying — BR blessing and farewell; tipography Deus Abenço → Deus abençoe; respect for faith, no proselytizing; then Do your best!',
      simpleEs:
        'Expresión — bendición y despedida BR; tipografía Deus Abenço → Deus abençoe; respeto a la fe, sin proselitismo; luego ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex(
      (x) => x.id === entry.id || x.id === 'deus-abenco' || x.word === 'Deus abençoe'
    );
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) =>
          x.id === 'filho-de-deus' ||
          x.id === 'jesusamando' ||
          x.id === 'muito-obrigado'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (Deus abençoe)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entry = `    "deus abençoe": { tone: "warm", category: "Bênção", mundane: "Bênção / despedida BR — desejo de bem.", gloss: "Bênção viva — tipografia Deus Abenço → Deus abençoe; ficha ≠ catecismo; depois Faça o melhor!", href: "/posts/post-inspecao-expressao-deus-abencoe.html", en: "God bless / may God bless you", es: "Dios te bendiga", fr: "Que Dieu te bénisse", it: "Dio ti benedica", de: "Gott segne dich", el: "ο Θεός να σε ευλογεί", la: "Deus te benedicat", yo: "Ọlọ́run kí ó bùkún", sw: "Mungu akubariki", gez: "ʼƎgziʼabəḥer yəbärəkəka", nl: "God zegene je", pl: "Niech Bóg ci błogosławi", ru: "Бог благословит", uk: "Бог благословить", zh: "愿上帝保佑你", ja: "神のご加護を", ko: "신의 축복을", ar: "بارك الله فيك", he: "אלוהים יברך אותך", hi: "भगवान आपको आशीर्वाद दें", tr: "Tanrı seni kutsasın", sv: "Gud välsigne dig", da: "Gud velsigne dig", no: "Gud velsigne deg", fi: "Jumala siunatkoon sinua", cs: "Bůh tě požehnej", ro: "Dumnezeu să te binecuvânteze", hu: "Isten áldjon meg", ca: "Déu et beneeixi", gl: "Deus te bendiga", eu: "Jainkoak bedeinka zaitzala", gn: "Tupã toñemoĩnde", qu: "Diyus qanman bendiciyasunki", eo: "Dio benu vin", vi: "Chúa phù hộ", id: "Tuhan memberkati", th: "ขอพระเจ้าอวยพร", hr: "Bog te blagoslovio", sk: "Boh ťa žehnaj", ga: "Go mbeannaí Dia thú", cy: "Duw a'th fendithio", ha: "Allah ya albarkace ka", am: "እግዚአብሔር ይባርክህ", fa: "خدا برکت دهد", bn: "ঈশ্বর তোমাকে আশীর্বাদ করুন", zu: "UNkulunkulu akubusise" },`;
    const alias = `    "deus abenço": { gloss: "Tipografia / oral truncado → ver «Deus abençoe» (canónico).", href: "/posts/post-inspecao-expressao-deus-abencoe.html", en: "see Deus abençoe", es: "ver Deus abençoe", fr: "voir Deus abençoe", it: "vedi Deus abençoe", de: "siehe Deus abençoe", el: "βλ. Deus abençoe", la: "vide Deus abençoe", yo: "Deus abençoe", sw: "Deus abençoe", gez: "Deus abençoe", nl: "zie Deus abençoe", pl: "zob. Deus abençoe", ru: "см. Deus abençoe", uk: "див. Deus abençoe", zh: "见 Deus abençoe", ja: "Deus abençoe を参照", ko: "Deus abençoe 참조", ar: "انظر Deus abençoe", he: "ראה Deus abençoe", hi: "Deus abençoe देखें", tr: "Deus abençoe bak", sv: "se Deus abençoe", da: "se Deus abençoe", no: "se Deus abençoe", fi: "ks. Deus abençoe", cs: "viz Deus abençoe", ro: "vezi Deus abençoe", hu: "lásd Deus abençoe", ca: "vegeu Deus abençoe", gl: "ver Deus abençoe", eu: "ikusi Deus abençoe", gn: "Deus abençoe", qu: "Deus abençoe", eo: "vidu Deus abençoe", vi: "xem Deus abençoe", id: "lihat Deus abençoe", th: "ดู Deus abençoe", hr: "vidi Deus abençoe", sk: "pozri Deus abençoe", ga: "féach Deus abençoe", cy: "gweler Deus abençoe", ha: "duba Deus abençoe", am: "Deus abençoe", fa: "Deus abençoe", bn: "Deus abençoe", zu: "Deus abençoe" },`;

    if (/"deus abençoe":\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    "deus abençoe":\s*\{[\s\S]*?\},/, entry);
      console.log('Glossário: deus abençoe actualizado');
    } else {
      const re = /("filho de deus":\s*\{[\s\S]*?\},)/;
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1\n' + entry);
        console.log('Glossário: deus abençoe após filho de deus');
      } else {
        const re2 = /(jesusamando:\s*\{[\s\S]*?\},)/;
        if (re2.test(gloss)) {
          gloss = gloss.replace(re2, '$1\n' + entry);
          console.log('Glossário: deus abençoe após jesusamando');
        } else {
          console.warn('Aviso: glossário — ponto de inserção não encontrado');
        }
      }
    }
    if (/"deus abenço":\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    "deus abenço":\s*\{[\s\S]*?\},/, alias);
      console.log('Glossário: alias deus abenço actualizado');
    } else if (/"deus abençoe":\s*\{/.test(gloss)) {
      gloss = gloss.replace(/("deus abençoe":\s*\{[\s\S]*?\},)/, '$1\n' + alias);
      console.log('Glossário: alias deus abenço inserido');
    }
    fs.writeFileSync(glossPath, gloss);
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
