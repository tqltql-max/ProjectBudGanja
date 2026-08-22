'use strict';

/**
 * Injeta expressão «jesusudavi» (substitui meudeusdoceu).
 * Uso: node scripts/upsert-expressao-jesusudavi.js
 */

const fs = require('fs');
const path = require('path');
const { buildJesusudaviPost } = require('../lib/jesusudavi-inspecao-post.js');
const { buildMeudeusdoceuPost } = require('../lib/meudeusdoceu-inspecao-post.js');

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
  const post = buildJesusudaviPost();
  const oldPost = buildMeudeusdoceuPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  upsertPost(posts, oldPost);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  writeI18n(i18n, oldPost);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const entry = {
      id: 'expressao-jesusudavi',
      title: 'jesusudavi — assombro alto (substitui meudeusdoceu)',
      titleEn: 'jesusudavi — high awe (replaces meudeusdoceu)',
      titleEs: 'jesusudavi — asombro alto (sustituye meudeusdoceu)',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: jesusudavi substitui meudeusdoceu; meu Deus do céu; assombro; escala aff × jesusamado.',
      whyEn: 'Sayings: jesusudavi replaces meudeusdoceu; meu Deus do céu; awe; scale aff × jesusamado.',
      whyEs: 'Dichos: jesusudavi sustituye meudeusdoceu; meu Deus do céu; asombro; escala aff × jesusamado.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        '/posts/post-inspecao-expressao-jesusamado.html',
        '/posts/post-inspecao-expressao-meudeusdoceu.html',
        '/posts/post-inspecao-palavra-aff.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. 4 Expressões — troca lab meudeusdoceu → jesusudavi.'
    };
    const si = items.findIndex((x) => x.id === entry.id || x.id === 'expressao-meudeusdoceu');
    if (si >= 0) {
      items[si] = Object.assign({}, items[si], entry, { id: 'expressao-jesusudavi' });
    } else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-jesusudavi)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'jesusudavi',
      word: 'jesusudavi',
      simple:
        'Expressão oral BR — substitui meudeusdoceu; meu Deus do céu; assombro alto; escala entre aff e jesusamado.',
      simpleEn:
        'Brazilian oral saying — replaces meudeusdoceu; meu Deus do céu; high awe; between aff and jesusamado.',
      simpleEs:
        'Expresión oral BR — sustituye meudeusdoceu; meu Deus do céu; asombro alto; entre aff y jesusamado.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === 'jesusudavi' || x.id === 'meudeusdoceu');
    if (gi >= 0) {
      items[gi] = Object.assign({}, items[gi], entry);
    } else {
      const after = items.findIndex((x) => x.id === 'jesusamado' || x.id === 'aff');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    const oldGi = items.findIndex((x) => x.id === 'meudeusdoceu' && x.word === 'meudeusdoceu');
    if (oldGi >= 0 && items[oldGi].id !== 'jesusudavi') {
      items[oldGi] = {
        id: 'meudeusdoceu',
        word: 'meudeusdoceu',
        simple: 'Nome lab antigo — substituído por jesusudavi.',
        simpleEn: 'Old lab name — replaced by jesusudavi.',
        simpleEs: 'Nombre lab antiguo — sustituido por jesusudavi.',
        group: 'lexico',
        fromTitle: false,
        href
      };
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (jesusudavi)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryJesusudavi =
      '    jesusudavi: { tone: "awe", category: "Assombro", mundane: "Lab que substitui meudeusdoceu — meu Deus do céu; espanto alto.", gloss: "Termómetro de assombro — entre aff e jesusamado; substitui meudeusdoceu; depois Valeu !!!", href: "/posts/post-inspecao-expressao-jesusudavi.html", en: "oh my God / good heavens", es: "Dios mío del cielo", fr: "mon Dieu", it: "mio Dio", de: "mein Gott", el: "Thee mou", la: "Deus meus", yo: "Olorun mi", sw: "Mungu wangu", gez: "Egziabher", nl: "mijn God", pl: "moj Boze", ru: "Bozhe moi", uk: "Bozhe mii", zh: "oh my", ja: "nantekoto", ko: "mapsosa", ar: "ya ilahi", he: "elohim", hi: "he bhagwan", tr: "aman Allahim", sv: "herregud", da: "hold da", no: "herregud", fi: "voi luoja", cs: "paneboze", ro: "Doamne", hu: "Joistenem", ca: "Deu meu", gl: "meu Deus", eu: "Jainkoa", gn: "che Tupa", qu: "Taytallay", eo: "ho Dio", vi: "troi oi", id: "ya Tuhan", th: "oh my", hr: "Boze moj", sk: "Boze moj", ga: "a Dhia", cy: "duw annwyl", ha: "Allahna", am: "amlake", fa: "khodaya", bn: "hay re", zu: "Nkulunkulu wami" },';
    const entryOld =
      '    meudeusdoceu: { tone: "awe", category: "Assombro", mundane: "Nome lab antigo — ver jesusudavi.", gloss: "Substituída por jesusudavi — mesmo ofício (meu Deus do céu).", href: "/posts/post-inspecao-expressao-jesusudavi.html", en: "oh my God (old lab name)", es: "Dios mío (nombre lab antiguo)" },';

    if (/jesusudavi:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    jesusudavi:\s*\{[\s\S]*?\},/, entryJesusudavi);
    } else if (/meudeusdoceu:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    meudeusdoceu:\s*\{[\s\S]*?\},/, entryJesusudavi + '\n' + entryOld);
    } else {
      const re = /(jesusamado:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1' + entryJesusudavi + '\n' + entryOld + '\n');
      }
    }
    if (/meudeusdoceu:\s*\{/.test(gloss) && /jesusudavi:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    meudeusdoceu:\s*\{[\s\S]*?\},/, entryOld);
    }
    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (jesusudavi / meudeusdoceu)');
  }

  try {
    await syncSql(post);
    await syncSql(oldPost);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title);
  console.log('OK ponte:', oldPost.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
