'use strict';

/**
 * Injeta palavra «cortar» na série Palavras.
 * Uso: node scripts/upsert-palavra-cortar-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildCortarPost } = require('../lib/cortar-inspecao-post.js');
const { buildPostHtml } = require('../lib/posts-service.js');
const { publishStaticAssets } = require('../lib/publish-static.js');
const { ROOT } = require('../lib/paths.js');

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
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-cortar-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-cortar');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildCortarPost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';
  const htmlPath = path.join(ROOT, post.filename);
  fs.mkdirSync(path.dirname(htmlPath), { recursive: true });
  fs.writeFileSync(htmlPath, buildPostHtml(post), 'utf8');
  console.log('HTML', post.filename);

  try {
    publishStaticAssets(ROOT);
    console.log('Feed público actualizado');
  } catch (e) {
    console.warn('Aviso publish-static:', e.message);
  }

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-cortar';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Cortar — o étimo corta (≠ colar ≠ caedere)',
      titleEn: 'Cortar — the etymon cuts (≠ glue ≠ caedere)',
      titleEs: 'Cortar — el étimo corta (≠ pegar ≠ caedere)',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: cortar (lat. curtāre) — o étimo corta o que a orelha cola; ≠ tesoura-caedere ≠ colar; Valeu !!!',
      whyEn: 'Words: cortar (Lat. curtāre) — the etymon cuts what the ear glued; ≠ scissors-caedere ≠ paste; Valeu !!!',
      whyEs: 'Palabras: cortar (lat. curtāre) — el étimo corta lo que el oído pegó; ≠ tijera-caedere ≠ pegar; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-etimo.html',
        '/posts/post-inspecao-palavra-cola-colar.html',
        '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — cortar; cluster cola/copiar e caedere como corte.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-cortar)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'cortar',
      word: 'cortar',
      simple:
        'Lat. curtāre / curtus — encurtar; o étimo corta o que a orelha cola; ≠ tesoura-caedere ≠ colar ≠ copiar; Valeu !!!',
      simpleEn:
        'Lat. curtāre / curtus — to shorten; the etymon cuts what the ear glued; ≠ scissors-caedere ≠ paste ≠ copy; Valeu !!!',
      simpleEs:
        'Lat. curtāre / curtus — acortar; el étimo corta lo que el oído pegó; ≠ tijera-caedere ≠ pegar ≠ copiar; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex(
      (x) => x.id === entry.id || x.word === 'cortar' || x.word === 'corte'
    );
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'cola' || x.id === 'etimo');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (cortar)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    cortar: { tone: "craft", category: "Léxico", mundane: "Encurtar / separar — o gesto que tira o que sobra.", gloss: "Lat. curtāre ← curtus — o étimo corta o que a orelha cola; ≠ tesoura-caedere ≠ colar ≠ copiar; Valeu !!!", href: "/posts/post-inspecao-palavra-cortar.html", en: "to cut", es: "cortar", fr: "couper", it: "tagliare", de: "schneiden", el: "κόβω", la: "curtare", yo: "gé", sw: "kata", gez: "curtare", nl: "knippen", pl: "ciąć", ru: "резать", uk: "різати", zh: "切", ja: "切る", ko: "자르다", ar: "قطع", he: "לחתוך", hi: "काटना", tr: "kesmek", sv: "skära", da: "skære", no: "kutte", fi: "leikata", cs: "řezat", ro: "tăia", hu: "vágni", ca: "tallar", gl: "cortar", eu: "ebaki", gn: "kytĩ", qu: "kuchuy", eo: "tranĉi", vi: "cắt", id: "memotong", th: "ตัด", hr: "rezati", sk: "rezať", ga: "gearr", cy: "torri", ha: "yanke", am: "መቁረጥ", fa: "بریدن", bn: "কাটা", zu: "sika" },';
    const entryCorte =
      '    corte: { gloss: "Nome do gesto cortar — lat. curtāre; ≠ tesoura (caedere); ver ficha cortar.", href: "/posts/post-inspecao-palavra-cortar.html", en: "cut / court", es: "corte" },';
    if (/cortar:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    cortar:\s*\{[\s\S]*?\},/, entryLine);
      if (/    corte:\s*\{/.test(gloss)) {
        gloss = gloss.replace(/    corte:\s*\{[\s\S]*?\},/, entryCorte);
      } else {
        gloss = gloss.replace(/(    cortar:\s*\{[\s\S]*?\},)/, '$1\n' + entryCorte);
      }
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (cortar · existente)');
    } else {
      const reCola = /(    colar:\s*\{[\s\S]*?\},?\r?\n)/;
      if (reCola.test(gloss)) {
        gloss = gloss.replace(reCola, '$1' + entryLine + '\n' + entryCorte + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (cortar · após colar)');
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
