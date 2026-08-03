'use strict';

/**
 * Injeta palavra «patrão» na série Palavras.
 * Uso: node scripts/upsert-palavra-patrao-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildPatraoPost } = require('../lib/patrao-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextPalavrasOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'palavras-origem')
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-patrao');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildPatraoPost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  i18n[post.slug] = {
    titleEn: post.titleEn,
    titleEs: post.titleEs,
    excerptEn: post.excerptEn,
    excerptEs: post.excerptEs,
    contentEn: post.contentEn,
    contentEs: post.contentEs
  };
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-patrao';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Patrão — chefe, poder e respeito',
      titleEn: 'Patrão — boss, power and respect',
      titleEs: 'Patrão — jefe, poder y respeto',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: patrão — chefe/empregador (patronus); respeito/pattern/gesto; Faça o melhor!',
      whyEn: 'Words: patrão — boss/employer (patronus); respeito/pattern/gesto; Do your best!',
      whyEs: 'Palabras: patrão — jefe/empleador (patronus); respeito/pattern/gesto; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-pattern.html',
        '/posts/post-inspecao-palavra-respeito.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — mesma raiz que pattern/padrão.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-patrao)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'patrao',
      word: 'patrão',
      simple:
        'Chefe / empregador (lat. patronus); mesma raiz de padrão e pattern; elos respeito/gesto; Faça o melhor com ou sem olhar.',
      simpleEn:
        'Boss / employer (Lat. patronus); same root as padrão and pattern; links respeito/gesto; Do your best with or without watching.',
      simpleEs:
        'Jefe / empleador (lat. patronus); misma raíz que padrão y pattern; vínculos respeito/gesto; Haz lo mejor con o sin mirada.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'patrão' || x.word === 'patrao');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'pattern' || x.id === 'respeito' || x.word === 'pattern');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (patrão)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    patrao: { gloss: "Chefe / empregador (lat. patronus); mesma raiz de pattern/padrão; elos respeito/gesto; Faça o melhor!", href: "/posts/post-inspecao-palavra-patrao.html", en: "boss / employer", es: "patron / jefe", fr: "patron", it: "padrone", de: "Chef / Arbeitgeber", el: "afentiko", la: "patronus", yo: "oga", sw: "bosi", gez: "əgzi", nl: "baas", pl: "szef", ru: "хозяин", uk: "хазяїн", zh: "老板", ja: "上司", ko: "사장", ar: "رئيس", he: "בוס", hi: "मालिक", tr: "patron", sv: "chef", da: "chef", no: "sjef", fi: "pomo", cs: "sef", ro: "patron", hu: "fonok", ca: "patro", gl: "patron", eu: "nagusi", gn: "jára", qu: "apu", eo: "estro", vi: "ong chu", id: "bos", th: "เจ้านาย", hr: "sef", sk: "sef", ga: "patrún", cy: "patrwn", ha: "shugaba", am: "አለቃ", fa: "رئیس", bn: "মালিক", zu: "umphathi" },';
    if (/patrao:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    patrao:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (patrao · existente)');
    } else {
      const rePattern = /(pattern:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reRespeito = /(respeito:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (rePattern.test(gloss)) {
        gloss = gloss.replace(rePattern, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (patrao · após pattern)');
      } else if (reRespeito.test(gloss)) {
        gloss = gloss.replace(reRespeito, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (patrao · após respeito)');
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
