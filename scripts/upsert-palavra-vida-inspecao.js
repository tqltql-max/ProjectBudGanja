'use strict';

/**
 * Injeta palavra «vida» na série Palavras.
 * Uso: node scripts/upsert-palavra-vida-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildVidaPost } = require('../lib/vida-inspecao-post.js');

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

function nextFreeSeriesOrder(posts, preferred, selfSlug) {
  const taken = new Set(
    posts
      .filter((p) => p.slug !== selfSlug)
      .map((p) => Number(p.seriesOrder))
      .filter((n) => Number.isFinite(n) && n > 0)
  );
  let n = preferred;
  while (taken.has(n)) n += 1;
  return n;
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
  if (posts.some((p) => p.slug === 'inspecao-palavra-vida')) {
    console.log('Slug já existe — actualizando ficha (sem duplicar).');
  }
  const post = buildVidaPost();
  const free = nextFreeSeriesOrder(posts, post.seriesOrder, post.slug);
  if (free !== post.seriesOrder) {
    console.log('seriesOrder ajustado:', post.seriesOrder, '→', free);
    post.seriesOrder = free;
  }

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-vida';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Vida — facto, tempo, modo e Valeu !!!',
      titleEn: 'Vida — fact, time, mode and Valeu !!!',
      titleEs: 'Vida — hecho, tiempo, modo y ¡Valeu !!!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: vida (lat. vīta) — facto, tempo e modo; distinta da trilha /vida/ e da Árvore da Vida; elos alegria/coração/esperança.',
      whyEn: 'Words: vida (Lat. vīta) — fact, time and mode; distinct from Vida trail and Tree of Life; alegria/coração/esperança links.',
      whyEs: 'Palabras: vida (lat. vīta) — hecho, tiempo y modo; distinta de la trama /vida/ y del Árbol de la Vida; vínculos alegria/coração/esperança.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wikipedia.org/wiki/Vida',
        '/posts/post-inspecao-palavra-alegria.html',
        '/posts/post-inspecao-palavra-coracao.html',
        '/posts/post-inspecao-palavra-esperanca.html',
        '/vida/',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — palavra ≠ trilha /vida/ ≠ Árvore da Vida; sem sermão.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-vida)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'vida',
      word: 'vida',
      simple:
        'Lat. vīta — facto de viver, tempo e modo; ficha lexical distinta da trilha /vida/ e da Árvore da Vida; elos alegria/coração/esperança.',
      simpleEn:
        'Lat. vīta — fact of living, time and mode; lexical sheet distinct from the Vida trail and Tree of Life; alegria/coração/esperança links.',
      simpleEs:
        'Lat. vīta — hecho de vivir, tiempo y modo; ficha léxica distinta de la trama /vida/ y del Árbol de la Vida; vínculos alegria/coração/esperança.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex(
      (x) => x.id === entry.id || String(x.word || '').toLowerCase() === 'vida'
    );
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'verdade' || x.id === 'alegria' || x.id === 'coracao'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    // Manter atalho à trilha do projecto (sem roubar o id lexical).
    const trailId = 'vida-trilha';
    const trailEntry = {
      id: trailId,
      word: 'Vida (trilha)',
      simple:
        'Secção Vida do laboratório — contos, poemas e Diário da Sementinha (≠ ficha lexical «vida»).',
      simpleEn:
        'Lab Vida section — stories, poems and Little Seed Diary (≠ lexical “vida” sheet).',
      simpleEs:
        'Sección Vida del laboratorio — cuentos, poemas y Diario de la Semillita (≠ ficha léxica «vida»).',
      group: 'titulo',
      fromTitle: true,
      href: '/vida/'
    };
    const ti = items.findIndex((x) => x.id === trailId);
    if (ti >= 0) items[ti] = Object.assign({}, items[ti], trailEntry);
    else {
      const afterVida = items.findIndex((x) => x.id === 'vida');
      if (afterVida >= 0) items.splice(afterVida + 1, 0, trailEntry);
      else items.push(trailEntry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (vida + vida-trilha)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    vida: { gloss: "Lat. vīta — facto de viver, tempo e modo; ≠ trilha /vida/; elos alegria/coração/esperança.", href: "/posts/post-inspecao-palavra-vida.html", en: "life", es: "vida", fr: "vie", it: "vita", de: "Leben", yo: "aye", sw: "maisha", gez: "ḥeywat", el: "ζωή", la: "vita", nl: "leven", pl: "życie", ru: "жизнь", uk: "життя", zh: "生命", ja: "いのち", ko: "생명", ar: "حياة", he: "חיים", hi: "जीवन", tr: "yaşam", sv: "liv", da: "liv", no: "liv", fi: "elämä", cs: "život", ro: "viață", hu: "élet", ca: "vida", gl: "vida", eu: "bizitza", gn: "tekové", qu: "kawsay", eo: "vivo", vi: "su song", id: "hidup", th: "ชีวิต", hr: "život", sk: "život", ga: "saol", cy: "bywyd", ha: "rai", am: "hiywot", fa: "zendegi", bn: "জীবন", zu: "impilo" },';
    if (/vida:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    vida:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (vida · entrada existente enriquecida)');
    } else {
      const reAlegria = /(alegria:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reAlegria.test(gloss)) {
        gloss = gloss.replace(reAlegria, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (vida · após alegria)');
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

  console.log('OK Cap.', post.seriesOrder, post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
