'use strict';

/**
 * Injeta expressão «deu certo, galera».
 * Uso: node scripts/upsert-expressao-deu-certo-galera.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildDeuCertoGaleraPost
} = require('../lib/deu-certo-galera-inspecao-post.js');

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
  const post = buildDeuCertoGaleraPost();
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
    const sugId = 'expressao-deu-certo-galera';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'deu certo, galera — celebração colectiva e oralidade BR',
      titleEn: 'deu certo, galera — collective celebration and Brazilian orality',
      titleEs: 'deu certo, galera — celebración colectiva y oralidad BR',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: deucer galerra; celebração colectiva; contraste aff × buguei × deu certo, galera.',
      whyEn: 'Sayings: deucer galerra; collective celebration; contrast aff × buguei × deu certo, galera.',
      whyEs: 'Dichos: deucer galerra; celebración colectiva; contraste aff × buguei × deu certo, galera.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        '/posts/post-inspecao-expressao-jesusamando.html',
        '/posts/post-inspecao-expressao-meudeusdoceu.html',
        '/posts/post-inspecao-palavra-aff.html',
        '/posts/post-inspecao-palavra-buguei.html',
        '/posts/post-inspecao-palavra-genial.html',
        '/posts/post-inspecao-palavra-lingua-portuguesa.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. 5 Expressões — termómetro de acerto partilhado.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-deu-certo-galera)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'deu-certo-galera',
      word: 'deu certo, galera',
      simple:
        'Expressão oral BR — deucer galerra; celebração colectiva de acerto; contraste com aff e buguei; depois Faça o melhor!',
      simpleEn:
        'Brazilian oral saying — deucer galerra; collective celebration of success; contrast with aff and buguei; then Do your best!',
      simpleEs:
        'Expresión oral BR — deucer galerra; celebración colectiva de acierto; contraste con aff y buguei; luego ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'meudeusdoceu' || x.id === 'jesusamando' || x.id === 'genial'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (deu-certo-galera)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (!gloss.includes('deuCertoGalera: {') && !gloss.includes("'deu certo, galera': {")) {
      const re = /(meudeusdoceu: \{[\s\S]*?zu: "Nkulunkulu wami" },\r?\n)/;
      const entry =
        '    "deu certo, galera": { tone: "joy", category: "Celebração", mundane: "Exclamação BR — deucer galerra; acerto partilhado com o grupo.", gloss: "Termómetro de celebração colectiva — contraste com aff e buguei; depois Faça o melhor!", href: "/posts/post-inspecao-expressao-deu-certo-galera.html", en: "it worked, folks", es: "salió bien, gente", fr: "ça a marché, les gars", it: "è andata, gente", de: "hat geklappt, Leute", el: "πέτυχε, παιδιά", la: "successit, sodales", yo: "ó ṣiṣẹ́, ẹgbẹ́", sw: "imefanikiwa, jamii", gez: "täśänä", nl: "het lukte, lui", pl: "udało się, ekipo", ru: "получилось, народ", uk: "вийшло, люде", zh: "成了，伙计们", ja: "うまくいったよ", ko: "됐다, 얘들아", ar: "نجحت يا جماعة", he: "זה עבד, חברה", hi: "हो गया, लोगो", tr: "oldu, millet", sv: "det gick, gänget", da: "det lykkedes, folkens", no: "det gikk, gjeng", fi: "onnistui, porukka", cs: "vyšlo to, lidi", ro: "a mers, băieți", hu: "sikerült, banda", ca: "ha sortit bé, gent", gl: "deu certo, xente", eu: "atera da, jendea", gn: "ojapo porã, irũnguéra", qu: "allinmi, runakuna", eo: "sukcesis, uloj", vi: "xong rồi, mọi người", id: "berhasil, kawan", th: "ได้แล้วเพื่อน", hr: "uspjelo je, ekipo", sk: "vyšlo to, ľudia", ga: "d\'éirigh leis, a mhuintir", cy: "mi weithiodd, bobl", ha: "ya yi, jama\'a", am: "ሆነ፣ ሰዎች", fa: "شد، رفقا", bn: "হয়ে গেল, সবাই", zu: "kusebenze, bantu" },\n';
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (deu certo, galera)');
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
