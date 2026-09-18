'use strict';

/**
 * Injeta palavra «prosseguir» (+ derivações) na série Palavras.
 * Uso: node scripts/upsert-palavra-prosseguir-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildProsseguirPost } = require('../lib/prosseguir-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextPalavrasOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'palavras-origem')
    .map((p) => Number(p.seriesOrder) || 0);
  const max = orders.length ? Math.max(...orders) : 0;
  return max + 1;
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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-prosseguir');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildProsseguirPost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-prosseguir';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Prosseguir — continuar, retomar e Faça o melhor!',
      titleEn: 'Prosseguir — continue, resume and Do your best!',
      titleEs: 'Prosseguir — continuar, retomar y ¡Haz lo mejor!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: prosseguir (lat. prōsequī) — continuar × retomar; prosseguimento; elos sempre/já/caminho; Faça o melhor!',
      whyEn: 'Words: prosseguir (Lat. prōsequī) — continue × resume; prosseguimento; links sempre/já/caminho; Do your best!',
      whyEs: 'Palabras: prosseguir (lat. prōsequī) — continuar × retomar; prosseguimento; vínculos sempre/já/caminho; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-sempre.html',
        '/posts/post-inspecao-palavra-ja.html',
        '/posts/post-inspecao-palavra-caminho.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — tipografia Proceguir → prosseguir; par com sempre.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-prosseguir)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'prosseguir',
      word: 'prosseguir',
      simple:
        'Lat. prōsequī — continuar × retomar BR; derivações prosseguimento; elos sempre/já/caminho; Faça o melhor e prossiga.',
      simpleEn:
        'Lat. prōsequī — continue × resume BR; derivatives prosseguimento; links sempre/já/caminho; Do your best and proceed.',
      simpleEs:
        'Lat. prōsequī — continuar × retomar BR; derivaciones prosseguimento; vínculos sempre/já/caminho; Haz lo mejor y prosigue.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'prosseguir');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'sempre' || x.id === 'ja' || x.id === 'caminho');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (prosseguir)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryMain =
      '    prosseguir: { gloss: "Lat. prōsequī — continuar × retomar BR; derivações prosseguimento; elos sempre/já/caminho; Faça o melhor!", href: "/posts/post-inspecao-palavra-prosseguir.html", en: "to proceed / continue", es: "proseguir", fr: "poursuivre", it: "proseguire", de: "fortfahren", el: "synehizo", la: "prosequi", yo: "tesi", sw: "endelea", gez: "tänäggäsä", nl: "doorgaan", pl: "kontynuowac", ru: "prodolzhat", uk: "prodovzhuvaty", zh: "jixu", ja: "susumeru", ko: "gyesokhada", ar: "yuwasil", he: "lehamshikh", hi: "jari rakhna", tr: "devam etmek", sv: "fortsatta", da: "fortsaette", no: "fortsette", fi: "jatkaa", cs: "pokracovat", ro: "continua", hu: "folytatni", ca: "prosseguir", gl: "proseguir", eu: "jarraitu", gn: "jekutu", qu: "qatiy", eo: "dauxrigi", vi: "tiep tuc", id: "melanjutkan", th: "proceed", hr: "nastaviti", sk: "pokracovat", ga: "lean ar aghaidh", cy: "parhau", ha: "ci gaba", am: "quey", fa: "edame dadan", bn: "agiye jaoa", zu: "qhubeka" },';
    const entryDeriv =
      '    prosseguimento: { gloss: "Derivação — continuação / andamento.", href: "/posts/post-inspecao-palavra-prosseguir.html", en: "continuation", es: "prosecución" },';
    const entryLine = entryMain + '\n' + entryDeriv;
    if (/prosseguir:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    prosseguir:\s*\{[\s\S]*?\},/, entryMain);
      if (!/prosseguimento:\s*\{/.test(gloss)) {
        gloss = gloss.replace(/(prosseguir:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + entryDeriv + '\n');
      }
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (prosseguir · existente)');
    } else {
      const reSempre = /(sempre:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reJa = /(já:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reSempre.test(gloss)) {
        gloss = gloss.replace(reSempre, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (prosseguir · após sempre)');
      } else if (reJa.test(gloss)) {
        gloss = gloss.replace(reJa, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (prosseguir · após já)');
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
