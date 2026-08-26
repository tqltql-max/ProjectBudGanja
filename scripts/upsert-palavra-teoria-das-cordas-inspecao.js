'use strict';

/**
 * Injeta palavra-conceito «teoria das cordas» na série Palavras.
 * Uso: node scripts/upsert-palavra-teoria-das-cordas-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildTeoriaDasCordasPost } = require('../lib/teoria-das-cordas-inspecao-post.js');
const { buildCordaPost } = require('../lib/corda-inspecao-post.js');
const { buildAfinarPost } = require('../lib/afinar-inspecao-post.js');
const { buildTonosPost } = require('../lib/tonos-inspecao-post.js');
const { buildOrfeuPost } = require('../lib/orfeu-inspecao-post.js');
const { buildEtimologiaPost } = require('../lib/etimologia-inspecao-post.js');
const { buildPolimorfismoPost } = require('../lib/polimorfismo-inspecao-post.js');
const { buildSolPost } = require('../lib/sol-inspecao-post.js');
const {
  buildTodaCriancaNasceCientistaPost
} = require('../lib/toda-crianca-nasce-cientista-inspecao-post.js');

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

async function syncSqlAll(posts) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  await store.setPosts(posts);
  console.log('SQL store actualizado (lote teoria das cordas)');
}

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-teoria-das-cordas');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildTeoriaDasCordasPost(seriesOrder);
  function keepOrder(slug, builder, arg) {
    const existingOne = posts.find((p) => p.slug === slug);
    const order =
      existingOne && typeof existingOne.seriesOrder === 'number'
        ? existingOne.seriesOrder
        : undefined;
    return builder.length ? builder(arg !== undefined ? arg : order) : builder();
  }
  const related = [
    post,
    keepOrder('inspecao-palavra-corda', buildCordaPost),
    buildAfinarPost(),
    buildTonosPost(),
    keepOrder('inspecao-palavra-orfeu', buildOrfeuPost),
    buildEtimologiaPost(),
    buildPolimorfismoPost(),
    keepOrder('inspecao-palavra-sol', buildSolPost),
    keepOrder(
      'inspecao-expressao-toda-crianca-nasce-cientista',
      buildTodaCriancaNasceCientistaPost
    )
  ];

  for (const p of related) upsertPost(posts, p);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  for (const p of related) writeI18n(i18n, p);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-teoria-das-cordas';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Teoria das cordas — a física, não o fio',
      titleEn: 'String theory — the physics, not the rope',
      titleEs: 'Teoría de cuerdas — la física, no el hilo',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: teoria das cordas — calque de string theory; ≠ objecto corda; programa aberto; Valeu !!!',
      whyEn: 'Words: teoria das cordas — calque of string theory; ≠ rope object; open program; Valeu !!!',
      whyEs: 'Palabras: teoria das cordas — calco de string theory; ≠ objeto cuerda; programa abierto; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wikipedia.org/wiki/String_theory',
        '/posts/post-inspecao-palavra-corda.html',
        '/posts/post-inspecao-palavra-afinar.html',
        '/posts/post-inspecao-palavra-tonos.html',
        '/posts/post-inspecao-palavra-orfeu.html',
        '/posts/post-inspecao-expressao-toda-crianca-nasce-cientista.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — conceito de física; distinta da ficha objecto corda.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-teoria-das-cordas)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'teoria-das-cordas',
      word: 'teoria das cordas',
      simple:
        'Calque de string theory — partículas como cordas a vibrar; ≠ objecto corda; programa aberto; Valeu !!!',
      simpleEn:
        'Calque of string theory — particles as vibrating strings; ≠ rope object; open program; Valeu !!!',
      simpleEs:
        'Calco de string theory — partículas como cuerdas que vibran; ≠ objeto cuerda; programa abierto; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'teoria das cordas');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'corda');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (teoria das cordas)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    "teoria das cordas": { tone: "craft", category: "Física", mundane: "Programa de física teórica — partículas como cordas a vibrar.", gloss: "Calque de string theory; ≠ objecto corda; unificação QM×GR; programa aberto; Valeu !!!", href: "/posts/post-inspecao-palavra-teoria-das-cordas.html", en: "string theory", es: "teoría de cuerdas", fr: "théorie des cordes", it: "teoria delle stringhe", de: "Stringtheorie", el: "θεωρία χορδών", la: "theoria chordarum", yo: "ìmọ̀ okùn", sw: "nadharia ya kamba", gez: "string theory", nl: "snaartheorie", pl: "teoria strun", ru: "теория струн", uk: "теорія струн", zh: "弦理论", ja: "弦理論", ko: "끈 이론", ar: "نظرية الأوتار", he: "תורת המיתרים", hi: "स्ट्रिंग सिद्धांत", tr: "sicim teorisi", sv: "strängteori", da: "strengteori", no: "strengteori", fi: "säieteoria", cs: "teorie strun", ro: "teoria corzilor", hu: "húrelmélet", ca: "teoria de cordes", gl: "teoría das cordas", eu: "soka teoria", gn: "teoría soga", qu: "watu yachay", eo: "kordoteorio", vi: "thuyết dây", id: "teori string", th: "ทฤษฎีสตริง", hr: "teorija struna", sk: "teória strún", ga: "teoiric na dtéad", cy: "theori llinyn", ha: "ka\'idar igiya", am: "የገመድ ንድፈ ሐሳብ", fa: "نظریه ریسمان", bn: "স্ট্রিং তত্ত্ব", zu: "ithiyori yezintambo" },';
    if (/"teoria das cordas":\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    "teoria das cordas":\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (teoria das cordas · existente)');
    } else {
      const reCorda = /(    corda:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reCorda.test(gloss)) {
        gloss = gloss.replace(reCorda, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (teoria das cordas · após corda)');
      } else {
        console.warn('Aviso: glossário — ponto de inserção não encontrado');
      }
    }
  }

  try {
    await syncSqlAll(posts);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '| Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
