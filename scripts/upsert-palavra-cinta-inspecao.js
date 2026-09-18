'use strict';

/**
 * Injeta palavra «cinta» na série Palavras.
 * Uso: node scripts/upsert-palavra-cinta-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildCintaPost } = require('../lib/cinta-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-cinta');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildCintaPost(seriesOrder);

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
    const sugId = 'palavra-cinta';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Cinta — faixa que cinge e suporte no cultivo',
      titleEn: 'Cinta — girding band and cultivation support',
      titleEs: 'Cinta — banda que ciñe y soporte en el cultivo',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: cinta (*cingere*) — faixa/suporte; gesto no tutoramento; ≠ sinta; Faça o melhor!',
      whyEn: 'Words: cinta (*cingere*) — band/support; staking craft; ≠ sinta; Do your best!',
      whyEs: 'Palabras: cinta (*cingere*) — banda/soporte; oficio de tutorado; ≠ sinta; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-gesto.html',
        '/cultivo/',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — ≠ cinta ID (amor); folga no aperto.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-cinta)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'cinta',
      word: 'cinta',
      simple:
        'Lat. cincta / cingere — faixa que segura; no cultivo, tutor com folga; ≠ sinta; Faça o melhor neste aperto.',
      simpleEn:
        'Lat. cincta / cingere — band that holds; in cultivation, stake with slack; ≠ sinta; Do your best on this grip.',
      simpleEs:
        'Lat. cincta / cingere — banda que sujeta; en cultivo, tutor con holgura; ≠ sinta; Haz lo mejor en este apriete.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'cinta');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'gesto' || x.id === 'caminho');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (cinta)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    cinta: { gloss: "Lat. cincta / cingere — faixa que segura; tutor com folga; ≠ sinta; Faça o melhor!", href: "/posts/post-inspecao-palavra-cinta.html", en: "belt / strap / tape", es: "cinta", fr: "bande / ceinture", it: "cintura / nastro", de: "Band / Gurt", el: "ζώνη", la: "cincta", yo: "okùn", sw: "ukanda", gez: "ḥabl", nl: "band", pl: "tasma", ru: "lenta", uk: "strichka", zh: "daizi", ja: "obi / tape", ko: "tti", ar: "hizam", he: "hetora", hi: "peti", tr: "kemer / bant", sv: "band", da: "bånd", no: "bånd", fi: "nauha", cs: "paska", ro: "banda", hu: "szalag", ca: "cinta", gl: "cinta", eu: "zinta", gn: "soga", qu: "watu", eo: "zono", vi: "dai", id: "sabuk (≠ cinta=amor)", th: "belt", hr: "traka", sk: "pasik", ga: "crios", cy: "gwregys", ha: "mara", am: "meret", fa: "navar", bn: "beltt", zu: "ibhande" },';
    if (/cinta:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    cinta:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (cinta · existente)');
    } else {
      const reGesto = /(gesto:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reGesto.test(gloss)) {
        gloss = gloss.replace(reGesto, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (cinta · após gesto)');
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
