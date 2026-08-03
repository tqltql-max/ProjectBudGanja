'use strict';

/**
 * Injeta palavra «respeito» na série Palavras.
 * Uso: node scripts/upsert-palavra-respeito-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildRespeitoPost } = require('../lib/respeito-inspecao-post.js');

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
  const post = buildRespeitoPost();
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
    const sugId = 'palavra-respeito';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Respeito — olhar de novo, prática social e Faça o melhor!',
      titleEn: 'Respeito — looking again, social practice and Do your best!',
      titleEs: 'Respeito — volver a mirar, práctica social y ¡Haz lo mejor!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: respeito (lat. respectus / respicere) — consideração e prática social, sem sermão; elo verdade/gesto; contraste vingança.',
      whyEn: 'Words: respeito (Lat. respectus / respicere) — consideration and social practice, no sermon; truth/gesture; contrast with revenge.',
      whyEs: 'Palabras: respeito (lat. respectus / respicere) — consideración y práctica social, sin sermón; verdad/gesto; contraste venganza.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wikipedia.org/wiki/Respeito',
        '/posts/post-inspecao-palavra-verdade.html',
        '/posts/post-inspecao-palavra-gesto.html',
        '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — respeito como prática; sem sermão.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-respeito)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'respeito',
      word: 'respeito',
      simple:
        'Lat. respectus / respicere — olhar de novo; consideração e prática social (sem sermão); elo verdade/gesto; contraste com vingança.',
      simpleEn:
        'Lat. respectus / respicere — look again; consideration and social practice (no sermon); truth/gesture; contrast with revenge.',
      simpleEs:
        'Lat. respectus / respicere — volver a mirar; consideración y práctica social (sin sermón); verdad/gesto; contraste con venganza.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'respeito');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'verdade' || x.id === 'gesto' || x.id === 'raiva'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (respeito)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    respeito: { gloss: "Lat. respectus / respicere — olhar de novo; consideração e prática social, sem sermão; elo verdade/gesto.", href: "/posts/post-inspecao-palavra-respeito.html", en: "respect", es: "respeto", fr: "respect", it: "rispetto", de: "Respekt", el: "σεβασμός", la: "respectus", yo: "ọ̀wọ̀", sw: "heshima", gez: "kibər", nl: "respect", pl: "szacunek", ru: "уважение", uk: "повага", zh: "尊重", ja: "尊敬", ko: "존중", ar: "احترام", he: "כבוד", hi: "सम्मान", tr: "saygı", sv: "respekt", da: "respekt", no: "respekt", fi: "kunnioitus", cs: "úcta", ro: "respect", hu: "tisztelet", ca: "respecte", gl: "respecto", eu: "errespetu", gn: "jerovia", qu: "respetu", eo: "respekto", vi: "tôn trọng", id: "hormat", th: "ความเคารพ", hr: "poštovanje", sk: "úcta", ga: "meas", cy: "parch", ha: "girmamawa", am: "አክብሮት", fa: "احترام", bn: "সম্মান", zu: "inhlonipho" },';
    if (/respeito:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    respeito:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (respeito · entrada existente enriquecida)');
    } else {
      const reVerdade = /(verdade:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reGesto = /(gesto:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reVerdade.test(gloss)) {
        gloss = gloss.replace(reVerdade, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (respeito · após verdade)');
      } else if (reGesto.test(gloss)) {
        gloss = gloss.replace(reGesto, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (respeito · após gesto)');
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
