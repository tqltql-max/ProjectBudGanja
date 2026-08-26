'use strict';

/**
 * Injeta palavra «luz» na série Palavras.
 * Uso: node scripts/upsert-palavra-luz-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildLuzPost } = require('../lib/luz-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-luz');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildLuzPost(seriesOrder);

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
    const sugId = 'palavra-luz';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Luz — efeito do circuito e claridade',
      titleEn: 'Luz — circuit effect and clarity',
      titleEs: 'Luz — efecto del circuito y claridad',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: luz (lat. lux) — claridade e efeito do clique; tríade circuito + sol; cultivo; Valeu !!!',
      whyEn: 'Words: luz (Lat. lux) — clarity and click effect; circuit triad + sol; grow; Valeu !!!',
      whyEs: 'Palabras: luz (lat. lux) — claridad y efecto del clic; tríada circuito + sol; cultivo; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wiktionary.org/wiki/lux#Latin',
        '/posts/post-inspecao-palavra-interruptor.html',
        '/posts/post-inspecao-palavra-ligar-desligar.html',
        '/posts/post-inspecao-palavra-sol.html',
        '/posts/post-inspecao-palavra-noite.html',
        '/posts/post-inspecao-palavra-fogo.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — tríade circuito: peça × verbo × efeito (luz).'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-luz)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'luz',
      word: 'luz',
      simple:
        'Lat. lux — claridade e efeito do clique; tríade circuito + sol (fonte natural); Valeu !!! com a luz certa.',
      simpleEn:
        'Lat. lux — clarity and click effect; circuit triad + sol (natural source); Valeu !!! with the right light.',
      simpleEs:
        'Lat. lux — claridad y efecto del clic; tríada circuito + sol (fuente natural); Valeu !!! con la luz cierta.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'luz');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'ligar' || x.id === 'desligar' || x.id === 'interruptor' || x.id === 'fogo'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (luz)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    luz: { gloss: "Lat. lux — claridade e efeito do clique; tríade circuito + sol; cultivo; Valeu !!!", href: "/posts/post-inspecao-palavra-luz.html", en: "light", es: "luz", fr: "lumiere", it: "luce", de: "Licht", el: "fos", la: "lux", yo: "imole", sw: "nuru", gez: "berhan", nl: "licht", pl: "swiatlo", ru: "svet", uk: "svitlo", zh: "guang", ja: "hikari", ko: "빛", ar: "daw", he: "or", hi: "prakash", tr: "isik", sv: "ljus", da: "lys", no: "lys", fi: "valo", cs: "svetlo", ro: "lumina", hu: "feny", ca: "llum", gl: "luz", eu: "argi", gn: "tendy", qu: "kancha", eo: "lumo", vi: "anh sang", id: "cahaya", th: "light", hr: "svjetlo", sk: "svetlo", ga: "solas", cy: "golau", ha: "haske", am: "birhan", fa: "nur", bn: "alo", zu: "ukukhanya" },';
    if (/luz:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    luz:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (luz · existente)');
    } else {
      const reLigar = /(ligar:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reInt = /(interruptor:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reLigar.test(gloss)) {
        gloss = gloss.replace(reLigar, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (luz · após ligar)');
      } else if (reInt.test(gloss)) {
        gloss = gloss.replace(reInt, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (luz · após interruptor)');
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
