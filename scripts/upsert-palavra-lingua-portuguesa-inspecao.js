'use strict';

/**
 * Injeta palavra «língua portuguesa» na série Palavras.
 * Uso: node scripts/upsert-palavra-lingua-portuguesa-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildLinguaPortuguesaPost
} = require('../lib/lingua-portuguesa-inspecao-post.js');

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
  const post = buildLinguaPortuguesaPost();
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
    const sugId = 'palavra-lingua-portuguesa';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Língua portuguesa — originalidade, para que serve e Faça o melhor!',
      titleEn: 'Portuguese language — originality, purpose and Do your best!',
      titleEs: 'Lengua portuguesa — originalidad, para qué sirve y ¡Haz lo mejor!',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Língua do projecto: originalidade (raiz×BR×criação); para que serve; Faça o melhor nesta língua.',
      whyEn: 'Project language: originality; purpose; Do your best in this language.',
      whyEs: 'Lengua del proyecto: originalidad; para qué sirve; Haz lo mejor en esta lengua.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wikipedia.org/wiki/Portugu%C3%AAs_brasileiro',
        '/posts/post-inspecao-figura-duvivier.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html',
        '/guia/palavras.html'
      ],
      notes: 'Cap. 32 — meio do laboratório inteiro.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-lingua-portuguesa)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'lingua-portuguesa',
      word: 'língua portuguesa',
      simple:
        'Meio do Inspetor BudGanja: originalidade (raiz × BR × criação); serve para nomear, inspecionar e cuidar; Faça o melhor nesta língua.',
      simpleEn:
        'Medium of Inspetor BudGanja: originality; serves to name, inspect and care; Do your best in this language.',
      simpleEs:
        'Medio de Inspetor BudGanja: originalidad; sirve para nombrar, inspeccionar y cuidar; Haz lo mejor en esta lengua.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'esquerdo' || x.id === 'genial' || x.id === 'gesto'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (língua portuguesa)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (
      !gloss.includes('português: {') &&
      !gloss.includes('portugues: {') &&
      !gloss.includes('lingua-portuguesa')
    ) {
      const re = /(esquerdo: \{[\s\S]*?zu: "kwesokunxele" },\r?\n)/;
      const reGenial = /(genial: \{[\s\S]*?zu: "uhlakaniphile" },\r?\n)/;
      const entry =
        '    português: { gloss: "Língua do laboratório — originalidade × para que serve; Faça o melhor nesta língua.", href: "/posts/post-inspecao-palavra-lingua-portuguesa.html", en: "Portuguese", es: "portugués", fr: "portugais", it: "portoghese", de: "Portugiesisch", el: "πορτογαλικά", la: "lingua Lusitana", yo: "èdè Portuguese", sw: "Kireno", gez: "portugaliñña", nl: "Portugees", pl: "portugalski", ru: "португальский", uk: "португальська", zh: "葡萄牙语", ja: "ポルトガル語", ko: "포르투갈어", ar: "البرتغالية", he: "פורטוגזית", hi: "पुर्तगाली", tr: "Portekizce", sv: "portugisiska", da: "portugisisk", no: "portugisisk", fi: "portugali", cs: "portugalština", ro: "portugheză", hu: "portugál", ca: "portuguès", gl: "portugués", eu: "portuges", gn: "poytugañe\'ẽ", qu: "purtuges simi", eo: "portugala", vi: "tiếng Bồ Đào Nha", id: "Portugis", th: "ภาษาโปรตุเกส", hr: "portugalski", sk: "portugalčina", ga: "Portaingéilis", cy: "Portiwgaleg", ha: "Harshen Portuguese", am: "ፖርቱጋልኛ", fa: "پرتغالی", bn: "পর্তুগিজ", zu: "isiPutukezi" },\n';
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (português)');
      } else if (reGenial.test(gloss)) {
        gloss = gloss.replace(reGenial, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (português · após genial)');
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
