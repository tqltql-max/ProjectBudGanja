'use strict';

/**
 * Injeta palavra «remo» na série Palavras.
 * Uso: node scripts/upsert-palavra-remo-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildRemoPost } = require('../lib/remo-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-remo.html';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeJsonRetry(file, data, tries = 8) {
  const payload = typeof data === 'string' ? data : JSON.stringify(data, null, 2) + '\n';
  let last;
  for (let i = 0; i < tries; i += 1) {
    try {
      fs.writeFileSync(file, payload, 'utf8');
      return;
    } catch (e) {
      last = e;
      await sleep(250 * (i + 1));
    }
  }
  throw last;
}

function stampFiles(post) {
  if (!post.filename) post.filename = 'posts/post-' + post.slug + '.html';
  if (!post.url) post.url = '/' + String(post.filename).replace(/^\/+/, '');
  return post;
}

function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
}

function upsertPost(posts, post) {
  stampFiles(post);
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

function patchGlossary(gloss) {
  const entry =
    '    remo: { tone: "craft", category: "Objecto", mundane: "Pá náutica; o gesto é remar.", gloss: "Lat. rēmus — remo / remar; gatilho rEMO; ≠ REM (sono / sigla lab); elos barco, Tamara, Amyr; Valeu !!!", href: "/posts/post-inspecao-palavra-remo.html", en: "oar", es: "remo", fr: "aviron", it: "remo", de: "Ruder", el: "κουπί", la: "remus", yo: "ẹ̀kọ́ ojú omi", sw: "kasia", gez: "mäqdäf", nl: "riem", pl: "wiosło", ru: "весло", uk: "весло", zh: "桨", ja: "オール", ko: "노", ar: "مجذاف", he: "משוט", hi: "चप्पू", tr: "kürek", sv: "åra", da: "åre", no: "åre", fi: "airo", cs: "veslo", ro: "vâslă", hu: "evező", ca: "rem", gl: "remo", eu: "arraun", gn: "ypykua", qu: "wamp\'u k\'aspi", eo: "remilo", vi: "mái chèo", id: "dayung", th: "ไม้พาย", hr: "veslo", sk: "veslo", ga: "rama", cy: "rhwyf", ha: "fil", am: "ቀዝፋ", fa: "پارو", bn: "বইঠা", zu: "iphini" },\n' +
    '    remar: { gloss: "Verbo de remo (lat. rēmus) — puxar a pá; ≠ REM do sono.", href: "/posts/post-inspecao-palavra-remo.html", en: "to row", es: "remar" },\n';

  if (/    remo:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    remo:\s*\{[\s\S]*?\},/, entry.trimEnd().replace(/,\s*$/, '') + ',');
  } else if (/    rem:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    rem:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + entry);
  } else {
    console.warn('Aviso: glossário — ponto rem não encontrado');
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-remo-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildRemoPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  await writeJsonRetry(POSTS_FILE, posts);

  try {
    writeHtml(post);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-remo';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Remo — a pá, o remar, e o lapso rEMO',
      titleEn: 'Remo — the oar, the rowing, and the slip rEMO',
      titleEs: 'Remo — la pala, el remar, y el lapsus rEMO',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: remo (lat. rēmus) ≠ REM (sono / sigla lab); gatilho rEMO; elos barco, Tamara, Amyr; Valeu !!!',
      whyEn: 'Words: remo (Lat. rēmus) ≠ REM (sleep / lab acronym); trigger rEMO; links boat, Tamara, Amyr; Valeu !!!',
      whyEs: 'Palabras: remo (lat. rēmus) ≠ REM (sueño / sigla lab); gatillo rEMO; vínculos barco, Tamara, Amyr; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-sinais-rem.html',
        '/posts/post-inspecao-palavra-barco.html',
        '/posts/post-inspecao-amyr-klink.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — pá náutica; REM fica na ficha-irmã.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (palavra-remo)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'remo',
      word: 'remo',
      simple:
        'Lat. rēmus — pá náutica / remar. Gatilho rEMO. ≠ REM (sono). Elos barco, Tamara, Amyr. Valeu !!!',
      simpleEn:
        'Lat. rēmus — oar / to row. Trigger rEMO. ≠ REM (sleep). Links boat, Tamara, Amyr. Valeu !!!',
      simpleEs:
        'Lat. rēmus — pala / remar. Gatillo rEMO. ≠ REM (sueño). Vínculos barco, Tamara, Amyr. ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'sinais-rem' || x.id === 'barco' || x.id === 'navegar');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (remo)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(GLOSS_FILE, next, 'utf8');
      console.log('Glossário actualizado (remo)');
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
