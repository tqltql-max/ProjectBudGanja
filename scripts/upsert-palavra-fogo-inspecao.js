'use strict';

/**
 * Injeta palavra «fogo» na série Palavras.
 * Uso: node scripts/upsert-palavra-fogo-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildFogoPost } = require('../lib/fogo-inspecao-post.js');

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
  const post = buildFogoPost();
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
    const sugId = 'palavra-fogo';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Fogo — elemento, ardor, cuidado e Faça o melhor!',
      titleEn: 'Fogo — element, ardor, care and Do your best!',
      titleEs: 'Fogo — elemento, ardor, cuidado y ¡Haz lo mejor!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: fogo (lat. focus) — elemento e metáfora; elos água, raiva, cultivo; Faça o melhor com medida.',
      whyEn: 'Words: fogo (Lat. focus) — element and metaphor; água, raiva, cultivo; Do your best with measure.',
      whyEs: 'Palabras: fogo (lat. focus) — elemento y metáfora; água, raiva, cultivo; Haz lo mejor con medida.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wikipedia.org/wiki/Fogo',
        '/posts/post-inspecao-palavra-agua.html',
        '/posts/post-inspecao-palavra-raiva.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. 33 — lareira × labareda; par com água.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-fogo)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'fogo',
      word: 'fogo',
      simple:
        'Lat. focus — lareira / chama; elemento e metáfora; equilibrar com água; raiva com ofício; Faça o melhor com medida.',
      simpleEn:
        'Lat. focus — hearth / flame; element and metaphor; balance with water; anger with craft; Do your best with measure.',
      simpleEs:
        'Lat. focus — hogar / llama; elemento y metáfora; equilibrar con agua; ira con oficio; Haz lo mejor con medida.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'agua' || x.id === 'raiva' || x.id === 'gelo');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (fogo)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (!gloss.includes('fogo: {')) {
      const re = /(luz: \{[\s\S]*?zu: "ukukhanya" },\r?\n)/;
      const reAgua = /(água: \{[\s\S]*?zu: "[^"]+" },\r?\n)/;
      const entry =
        '    fogo: { gloss: "Lat. focus — lareira/chama; elemento e metáfora; equilibrar com água; Faça o melhor com medida.", href: "/posts/post-inspecao-palavra-fogo.html", en: "fire", es: "fuego", fr: "feu", it: "fuoco", de: "Feuer", el: "φωτιά", la: "focus / ignis", yo: "iná", sw: "moto", gez: "ʼǝsat", nl: "vuur", pl: "ogień", ru: "огонь", uk: "вогонь", zh: "火", ja: "火", ko: "불", ar: "نار", he: "אש", hi: "आग", tr: "ateş", sv: "eld", da: "ild", no: "ild", fi: "tuli", cs: "oheň", ro: "foc", hu: "tűz", ca: "foc", gl: "lume", eu: "su", gn: "tata", qu: "nina", eo: "fajro", vi: "lửa", id: "api", th: "ไฟ", hr: "vatra", sk: "oheň", ga: "tine", cy: "tân", ha: "wuta", am: "እሳት", fa: "آتش", bn: "আগুন", zu: "umlilo" },\n';
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (fogo · após luz)');
      } else if (reAgua.test(gloss)) {
        gloss = gloss.replace(reAgua, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (fogo · após água)');
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
