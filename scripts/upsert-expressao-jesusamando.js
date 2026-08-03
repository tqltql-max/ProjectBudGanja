'use strict';

/**
 * Injeta expressão «jesusamando» e remove a palavra historiografia (pivot).
 * Uso: node scripts/upsert-expressao-jesusamando.js
 */

const fs = require('fs');
const path = require('path');
const { buildJesusamandoPost } = require('../lib/jesusamando-inspecao-post.js');

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

function removeSlug(posts, slug) {
  const before = posts.length;
  const next = posts.filter((p) => p.slug !== slug);
  if (next.length < before) console.log('Removido', slug);
  return next;
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
  let posts = await store.getPosts();
  posts = removeSlug(posts, 'inspecao-palavra-historiografia');
  upsertPost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store actualizado:', post.slug);
}

async function main() {
  const post = buildJesusamandoPost();
  let posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  posts = removeSlug(posts, 'inspecao-palavra-historiografia');
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  delete i18n['inspecao-palavra-historiografia'];
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';
  const histHtml = path.join(ROOT, 'posts', 'post-inspecao-palavra-historiografia.html');
  if (fs.existsSync(histHtml)) {
    fs.unlinkSync(histHtml);
    console.log('HTML historiografia removido');
  }

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    let items = Array.isArray(sug.items) ? sug.items : [];
    items = items.filter((x) => x.id !== 'palavra-historiografia');
    const sugId = 'expressao-jesusamando';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'jesusamando — assombro, afeto e oralidade BR',
      titleEn: 'jesusamando — awe, affection and Brazilian orality',
      titleEs: 'jesusamando — asombro, afecto y oralidad BR',
      tipo: 'expressao',
      priority: 2,
      status: 'feita',
      why: 'Expressões: sopro BR de assombro e afeto; contraste com aff e meudeusdoceu; nota de campo (cuidado/carona); Faça o melhor!',
      whyEn: 'Sayings: Brazilian breath of awe and affection; contrast with aff and meudeusdoceu; field note (care/ride); Do your best!',
      whyEs: 'Dichos: soplo BR de asombro y afecto; contraste con aff y meudeusdoceu; nota de campo (cuidado/aventón); ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'expressoes-ditados',
      sources: [
        '/posts/post-inspecao-palavra-lingua-portuguesa.html',
        '/posts/post-inspecao-palavra-aff.html',
        '/posts/post-inspecao-expressao-meudeusdoceu.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html',
        '/biblioteca/inspecoes/#inspecoes-expressoes'
      ],
      notes: 'Cap. 3 Expressões — nota de campo 2026-08-03: calor em contexto de cuidado (vs meudeusdoceu = espanto).'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (expressao-jesusamando)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    let items = Array.isArray(guia.items) ? guia.items : [];
    items = items.filter((x) => x.id !== 'historiografia');
    const entry = {
      id: 'jesusamando',
      word: 'jesusamando',
      simple:
        'Expressão oral BR — assombro e afeto num sopro; contraste com aff; depois, Faça o melhor!',
      simpleEn:
        'Brazilian oral saying — awe and affection in one breath; contrast with aff; then Do your best!',
      simpleEs:
        'Expresión oral BR — asombro y afecto en un soplo; contraste con aff; luego ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'aff' || x.id === 'genial');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (jesusamando; sem historiografia)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    gloss = gloss.replace(/\r?\n\s*historiografia: \{[\s\S]*?zu: "[^"]+" },/, '');
    if (!gloss.includes('jesusamando: {')) {
      const re = /(aff: \{[\s\S]*?zu: "hawu" },\r?\n)/;
      const entry =
        '    jesusamando: { tone: "warm", category: "Afeto", mundane: "Exclamação BR de assombro/afeto (Jesus amando, colado).", gloss: "Sopro de calor e espanto — contraste com aff; depois Faça o melhor!", href: "/posts/post-inspecao-expressao-jesusamando.html", en: "good heavens (affectionate)", es: "¡Dios mío! (cálido)", fr: "mon Dieu (affectueux)", it: "oddio (affettuoso)", de: "ach du liebe Güte", el: "Θεέ μου", la: "Iesu amans", yo: "Jesu ńfẹ́", sw: "Yesu anapenda", gez: "Iyesus yäwäddädä", nl: "lieve help", pl: "o rany", ru: "боже мой", uk: "боже мій", zh: "我的天", ja: "まあ", ko: "아이고", ar: "يا إلهي", he: "אלי", hi: "हे भगवान", tr: "aman Tanrım", sv: "du milde", da: "hold da op", no: "du milde", fi: "voi luoja", cs: "proboha", ro: "Doamne", hu: "Jézusom", ca: "Déu meu", gl: "meu Deus", eu: "Jainkoa", gn: "che Tupã", qu: "Tayta", eo: "dia mia", vi: "ối trời", id: "ya ampun", th: "พระเจ้าช่วย", hr: "Bože", sk: "bože môj", ga: "a Thiarna", cy: "duw annwyl", ha: "Allah", am: "እግዚአብሔር", fa: "خدایا", bn: "হে প্রভু", zu: "Nkosi yami" },\n';
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1' + entry);
        console.log('Glossário actualizado (jesusamando)');
      } else {
        console.warn('Aviso: glossário — inserção não encontrada');
      }
    }
    fs.writeFileSync(glossPath, gloss);
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
