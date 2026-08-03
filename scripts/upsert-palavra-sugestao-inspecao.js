'use strict';

/**
 * Injeta palavra «sugestão» na série Palavras.
 * Uso: node scripts/upsert-palavra-sugestao-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildSugestaoPost } = require('../lib/sugestao-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-sugestao');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildSugestaoPost(seriesOrder);

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
    const sugId = 'palavra-sugestao';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Sugestão — proposta, palpite e fila de ofício',
      titleEn: 'Sugestão — proposal, tip and craft queue',
      titleEs: 'Sugestão — propuesta, tip y cola de oficio',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: sugestão (lat. suggestio) — propor; meta-lab da fila; Faça o melhor!',
      whyEn: 'Words: sugestão (Lat. suggestio) — propose; meta-lab queue; Do your best!',
      whyEs: 'Palabras: sugestão (lat. suggestio) — proponer; meta-lab de cola; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-mensagem.html',
        '/posts/post-inspecao-palavra-objetos.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — proposta ≠ ordem; fila editorial.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-sugestao)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'sugestao',
      word: 'sugestão',
      simple:
        'Lat. suggestio — ato de sugerir / palpite; no lab, item da fila de inspeções; Faça o melhor nesta proposta.',
      simpleEn:
        'Lat. suggestio — act of suggesting / tip; in the lab, inspection-queue item; Do your best in this proposal.',
      simpleEs:
        'Lat. suggestio — acto de sugerir / tip; en el lab, ítem de la cola de inspecciones; Haz lo mejor en esta propuesta.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'sugestão' || x.word === 'sugestao');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'mensagem' || x.id === 'objetos');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (sugestão)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    sugestao: { gloss: "Lat. suggestio — ato de sugerir; meta-lab da fila de inspeções; Faça o melhor!", href: "/posts/post-inspecao-palavra-sugestao.html", en: "suggestion", es: "sugerencia", fr: "suggestion", it: "suggerimento", de: "Vorschlag", el: "protasi", la: "suggestio", yo: "imọran", sw: "pendekezo", gez: "məkr", nl: "suggestie", pl: "sugestia", ru: "predlozhenie", uk: "propozytsiia", zh: "jianyi", ja: "teian", ko: "jean", ar: "iqtirah", he: "hatzaa", hi: "sujhav", tr: "oneri", sv: "forslag", da: "forslag", no: "forslag", fi: "ehdotus", cs: "navrh", ro: "sugestie", hu: "javaslat", ca: "suggeriment", gl: "suxestion", eu: "iradokizun", gn: "ñe\'ẽnguéra", qu: "yuyay", eo: "sugesto", vi: "de xuat", id: "saran", th: "ข้อเสนอ", hr: "prijedlog", sk: "navrh", ga: "moladh", cy: "awgrym", ha: "shawara", am: "ጥቆማ", fa: "pishnahad", bn: "পরামর্শ", zu: "isiphakamiso" },';
    if (/sugestao:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    sugestao:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (sugestao · existente)');
    } else {
      const reMsg = /(mensagem:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reMsg.test(gloss)) {
        gloss = gloss.replace(reMsg, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (sugestao · após mensagem)');
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
