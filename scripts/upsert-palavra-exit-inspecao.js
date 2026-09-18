'use strict';

/**
 * Injeta palavra «EXIT» na série Palavras.
 * Uso: node scripts/upsert-palavra-exit-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildExitPost } = require('../lib/exit-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-exit');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildExitPost(seriesOrder);

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
    const sugId = 'palavra-exit';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'EXIT — saída, limiar e salvação de ofício',
      titleEn: 'EXIT — way out, threshold and craft-salvation',
      titleEs: 'EXIT — salida, umbral y salvación de oficio',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: EXIT (lat. exīre/exitus) — saída/quit/teatro; no lab, salvação = sair do aperto; caminho/risco/alma; Faça o melhor!',
      whyEn: 'Words: EXIT (Lat. exīre/exitus) — exit/quit/theatre; lab salvation = leaving the squeeze; caminho/risco/alma; Do your best!',
      whyEs: 'Palabras: EXIT (lat. exīre/exitus) — salida/quit/teatro; salvación lab = salir del aprieto; caminho/risco/alma; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-caminho.html',
        '/posts/post-inspecao-palavra-alma.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — «essa é a salvação»; ofício sem sermão.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-exit)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'exit',
      word: 'EXIT',
      simple:
        'EN/lat. exīre · exitus — saída, quit, teatro; no lab BudGanja, salvação = ofício de sair do aperto; elos caminho/alma/risco; Faça o melhor!',
      simpleEn:
        'EN/Lat. exīre · exitus — way out, quit, theatre; in the BudGanja lab, salvation = craft of leaving the squeeze; links caminho/alma/risco; Do your best!',
      simpleEs:
        'EN/lat. exīre · exitus — salida, quit, teatro; en el lab BudGanja, salvación = oficio de salir del aprieto; vínculos caminho/alma/risco; ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex(
      (x) => x.id === entry.id || String(x.word || '').toLowerCase() === 'exit'
    );
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'alma' || x.id === 'caminho' || x.id === 'esperanca'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (EXIT)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    exit: { gloss: "EN/lat. exīre·exitus — saída, quit, teatro; no lab, salvação = sair do aperto; elos caminho/alma/risco; Faça o melhor!", href: "/posts/post-inspecao-palavra-exit.html", en: "exit", es: "salida", fr: "sortie", it: "uscita", de: "Ausgang", el: "εξοδος", la: "exitus", yo: "jade", sw: "kutoka", gez: "wäṣä", nl: "uitgang", pl: "wyjscie", ru: "vykhod", uk: "vykhid", zh: "出口", ja: "出口", ko: "출구", ar: "مخرج", he: "יציאה", hi: "निकास", tr: "cikis", sv: "utgang", da: "udgang", no: "utgang", fi: "uloskaynti", cs: "vychod", ro: "iesire", hu: "kijarat", ca: "sortida", gl: "saida", eu: "irteera", gn: "ñesẽ", qu: "lluqsiy", eo: "elirejo", vi: "loi ra", id: "keluar", th: "ทางออก", hr: "izlaz", sk: "vychod", ga: "imeacht", cy: "allanfa", ha: "fitowa", am: "መውጫ", fa: "خروج", bn: "প্রস্থান", zu: "ukuphuma" },';
    if (/exit:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    exit:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (exit · existente)');
    } else {
      const reAlma = /(alma:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reCaminho = /(caminho:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reAlma.test(gloss)) {
        gloss = gloss.replace(reAlma, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (exit · após alma)');
      } else if (reCaminho.test(gloss)) {
        gloss = gloss.replace(reCaminho, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (exit · após caminho)');
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
