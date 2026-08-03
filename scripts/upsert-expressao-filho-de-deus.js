'use strict';

/**
 * Injeta expressão «filho de deus».
 * Uso: node scripts/upsert-expressao-filho-de-deus.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildFilhoDeDeusPost
} = require('../lib/filho-de-deus-inspecao-post.js');

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
  const post = buildFilhoDeDeusPost();
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
    const sugId = 'expressao-filho-de-deus';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'filho de deus — título, oralidade e dignidade',
      titleEn: 'filho de deus — title, orality and dignity',
      titleEs: 'filho de deus — título, oralidad y dignidad',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: título teológico × intensidade oral BR × metáfora de dignidade/cuidado; sem proselitismo.',
      whyEn: 'Sayings: theological title × BR oral intensity × dignity/care metaphor; no proselytizing.',
      whyEs: 'Dichos: título teológico × intensidad oral BR × metáfora de dignidad/cuidado; sin proselitismo.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        '/posts/post-inspecao-expressao-jesusamando.html',
        '/posts/post-inspecao-expressao-meudeusdoceu.html',
        '/posts/post-inspecao-palavra-lingua-portuguesa.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html',
        '/posts/post-inspecao-padre-ticao.html'
      ],
      notes: 'Cap. 6 Expressões — mapa de usos; ficha ≠ catecismo.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-filho-de-deus)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'filho-de-deus',
      word: 'filho de deus',
      simple:
        'Expressão — título teológico, intensidade oral BR e metáfora de dignidade/cuidado; respeito à fé, sem proselitismo; depois Faça o melhor!',
      simpleEn:
        'Saying — theological title, BR oral intensity and dignity/care metaphor; respect for faith, no proselytizing; then Do your best!',
      simpleEs:
        'Expresión — título teológico, intensidad oral BR y metáfora de dignidad/cuidado; respeto a la fe, sin proselitismo; luego ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'meudeusdoceu' || x.id === 'jesusamando'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (filho-de-deus)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (!gloss.includes("'filho de deus':") && !gloss.includes('filhoDeDeus:')) {
      const re = /(meudeusdoceu: \{[\s\S]*?zu: "Nkulunkulu wami" },\r?\n)/;
      const entry =
        '    "filho de deus": { tone: "warm", category: "Dignidade", mundane: "Título teológico / exclamação / metáfora de dignidade e cuidado.", gloss: "Mapa de usos — título × oralidade BR × cuidado; ficha ≠ catecismo; depois Faça o melhor!", href: "/posts/post-inspecao-expressao-filho-de-deus.html", en: "son of God", es: "hijo de Dios", fr: "fils de Dieu", it: "figlio di Dio", de: "Sohn Gottes", el: "υιός του Θεού", la: "Filius Dei", yo: "ọmọ Ọlọ́run", sw: "Mwana wa Mungu", gez: "Waldä ʼƎgziʼabəḥer", nl: "zoon van God", pl: "Syn Boży", ru: "Сын Божий", uk: "Син Божий", zh: "神的儿子", ja: "神の子", ko: "하느님의 아들", ar: "ابن الله", he: "בן האלוהים", hi: "ईश्वर का पुत्र", tr: "Tanrı\'nın oğlu", sv: "Guds son", da: "Guds søn", no: "Guds sønn", fi: "Jumalan poika", cs: "Boží syn", ro: "Fiul lui Dumnezeu", hu: "Isten fia", ca: "fill de Déu", gl: "fillo de Deus", eu: "Jainkoaren seme", gn: "Tupã ra\'y", qu: "Diyuspa churin", eo: "Filo de Dio", vi: "con Thiên Chúa", id: "Putra Allah", th: "บุตรของพระเจ้า", hr: "Sin Božji", sk: "Boží syn", ga: "Mac Dé", cy: "Mab Duw", ha: "Ɗan Allah", am: "የእግዚአብሔር ልጅ", fa: "پسر خدا", bn: "ঈश्वरের পুত্র", zu: "iNdodana kaNkulunkulu" },\n';
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (filho de deus)');
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
