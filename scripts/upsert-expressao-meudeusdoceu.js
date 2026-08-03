'use strict';

/**
 * Injeta expressão «meudeusdoceu».
 * Uso: node scripts/upsert-expressao-meudeusdoceu.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildMeudeusdoceuPost
} = require('../lib/meudeusdoceu-inspecao-post.js');

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
  const post = buildMeudeusdoceuPost();
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
    const sugId = 'expressao-meudeusdoceu';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'meudeusdoceu — assombro alto e oralidade BR',
      titleEn: 'meudeusdoceu — high awe and Brazilian orality',
      titleEs: 'meudeusdoceu — asombro alto y oralidad BR',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: meu Deus do céu colado; assombro alto; escala aff × meudeusdoceu × jesusamando.',
      whyEn: 'Sayings: meu Deus do céu as one word; high awe; scale aff × meudeusdoceu × jesusamando.',
      whyEs: 'Dichos: meu Deus do céu pegado; asombro alto; escala aff × meudeusdoceu × jesusamando.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        '/posts/post-inspecao-expressao-jesusamando.html',
        '/posts/post-inspecao-palavra-aff.html',
        '/posts/post-inspecao-palavra-lingua-portuguesa.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. 4 Expressões — termómetro de espanto.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-meudeusdoceu)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'meudeusdoceu',
      word: 'meudeusdoceu',
      simple:
        'Expressão oral BR — meu Deus do céu colado; assombro alto; escala entre aff e jesusamando; depois Faça o melhor!',
      simpleEn:
        'Brazilian oral saying — meu Deus do céu as one word; high awe; between aff and jesusamando; then Do your best!',
      simpleEs:
        'Expresión oral BR — meu Deus do céu pegado; asombro alto; entre aff y jesusamando; luego ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'jesusamando' || x.id === 'aff');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (meudeusdoceu)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (!gloss.includes('meudeusdoceu: {')) {
      const re = /(jesusamando: \{[\s\S]*?zu: "Nkosi yami" },\r?\n)/;
      const entry =
        '    meudeusdoceu: { tone: "awe", category: "Assombro", mundane: "Exclamação BR — meu Deus do céu (colado); espanto alto.", gloss: "Termómetro de assombro — entre aff e jesusamando; depois Faça o melhor!", href: "/posts/post-inspecao-expressao-meudeusdoceu.html", en: "oh my God / good heavens", es: "Dios mío del cielo", fr: "mon Dieu", it: "mio Dio", de: "mein Gott", el: "Θεέ μου", la: "Deus meus", yo: "Ọlọ́run mi", sw: "Mungu wangu", gez: "ʼƎgziʼabəḥer", nl: "mijn God", pl: "mój Boże", ru: "Боже мой", uk: "Боже мій", zh: "我的天啊", ja: "なんてこと", ko: "맙소사", ar: "يا إلهي", he: "אלוהים אדירים", hi: "हे भगवान", tr: "aman Allahım", sv: "herregud", da: "hold da kæft", no: "herregud", fi: "voi luoja", cs: "panebože", ro: "Doamne Dumnezeule", hu: "Jóistenem", ca: "Déu meu", gl: "meu Deus do ceo", eu: "Jainkoa", gn: "che Tupã", qu: "Taytalláy", eo: "ho Dio", vi: "trời ơi", id: "ya Tuhan", th: "พระเจ้าช่วย", hr: "Bože moj", sk: "Bože môj", ga: "a Dhia", cy: "duw annwyl", ha: "Allahna", am: "አምላኬ", fa: "خدایا", bn: "হায় রে", zu: "Nkulunkulu wami" },\n';
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (meudeusdoceu)');
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
