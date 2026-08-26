'use strict';

/**
 * Injeta palavra «coração» na série Palavras.
 * Uso: node scripts/upsert-palavra-coracao-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildCoracaoPost } = require('../lib/coracao-inspecao-post.js');

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
  const post = buildCoracaoPost();
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
    const sugId = 'palavra-coracao';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Coração — órgão, afeto, centro, coragem e Valeu !!!',
      titleEn: 'Coração — organ, affect, center, courage and Valeu !!!',
      titleEs: 'Coração — órgano, afecto, centro, coraje y ¡Valeu !!!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: coração (lat. cor) — órgão, afeto, centro, coragem; elo mãos/esquerdo; Valeu !!! de coração.',
      whyEn: 'Words: coração (Lat. cor) — organ, affect, center, courage; hands/esquerdo; Valeu !!! from the heart.',
      whyEs: 'Palabras: coração (lat. cor) — órgano, afecto, centro, coraje; manos/esquerdo; Valeu !!! de corazón.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wikipedia.org/wiki/Cora%C3%A7%C3%A3o',
        '/posts/post-inspecao-palavra-mao-esquerda-direita.html',
        '/posts/post-inspecao-palavra-esquerdo.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. 35 — peito × mãos (complementaridade); sem dogma anatómico.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-coracao)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'coracao',
      word: 'coração',
      simple:
        'Lat. cor — órgão, afeto, centro e coragem; elo mãos/esquerdo (gesto cultural, não dogma); Valeu !!! de coração.',
      simpleEn:
        'Lat. cor — organ, affect, center and courage; hands/esquerdo link (cultural gesture, not dogma); Valeu !!! from the heart.',
      simpleEs:
        'Lat. cor — órgano, afecto, centro y coraje; vínculo manos/esquerdo (gesto cultural, no dogma); Valeu !!! de corazón.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'coração');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'esquerdo' || x.id === 'alegria' || x.id === 'mao'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (coração)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    coração: { gloss: "Lat. cor — órgão, afeto, centro e coragem; elo mãos/gesto; Valeu !!! de coração.", href: "/posts/post-inspecao-palavra-coracao.html", en: "heart", es: "corazón", fr: "cœur", it: "cuore", de: "Herz", el: "καρδιά", la: "cor", yo: "ọkàn", sw: "moyo", gez: "ləbb", nl: "hart", pl: "serce", ru: "сердце", uk: "серце", zh: "心", ja: "心", ko: "마음", ar: "قلب", he: "לב", hi: "हृदय", tr: "kalp", sv: "hjärta", da: "hjerte", no: "hjerte", fi: "sydän", cs: "srdce", ro: "inimă", hu: "szív", ca: "cor", gl: "corazón", eu: "bihotz", gn: "korasõ", qu: "sunqu", eo: "koro", vi: "trái tim", id: "hati", th: "หัวใจ", hr: "srce", sk: "srdce", ga: "croí", cy: "calon", ha: "zuciya", am: "ልብ", fa: "دل", bn: "হৃদয়", zu: "inhliziyo" },';
    if (/coração:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    coração:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (coração · entrada existente enriquecida)');
    } else {
      const reMao = /(mão:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reAlegria = /(alegria:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reMao.test(gloss)) {
        gloss = gloss.replace(reMao, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (coração · após mão)');
      } else if (reAlegria.test(gloss)) {
        gloss = gloss.replace(reAlegria, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (coração · após alegria)');
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
