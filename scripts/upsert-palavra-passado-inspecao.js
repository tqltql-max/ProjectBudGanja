'use strict';

/**
 * Injeta palavra «passado» na série Palavras.
 * Uso: node scripts/upsert-palavra-passado-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildPassadoPost } = require('../lib/passado-inspecao-post.js');

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
  // Re-read shared files at write time (sibling agents may touch posts.json).
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-passado');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildPassadoPost(seriesOrder);

  // Fresh re-read before write (concurrent agents).
  const postsNow = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const taken = new Set(
    postsNow
      .filter(
        (p) =>
          p.slug !== post.slug &&
          p.series === 'palavras-origem' &&
          /^inspecao-palavra-/.test(p.slug || '')
      )
      .map((p) => Number(p.seriesOrder))
      .filter((n) => Number.isFinite(n) && n > 0)
  );
  let order = post.seriesOrder;
  while (taken.has(order) && order < 200) order += 1;
  if (order !== post.seriesOrder) {
    post.seriesOrder = order;
    console.log('seriesOrder ajustado para Cap.', order, '(evitar colisão palavra)');
  }

  upsertPost(postsNow, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(postsNow, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-passado';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Passado — tempo decorrido, memória e o rasto que inspeciona',
      titleEn: 'Passado — elapsed time, memory and the trace you inspect',
      titleEs: 'Passado — tiempo trascurrido, memoria y el rastro que se inspecciona',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: passado (de passar / lat. passāre) — tempo decorrido; memória × história; elos memorável/verdade/língua; Valeu !!!',
      whyEn: 'Words: passado (from passar / Lat. passāre) — elapsed time; memory × history; memorável/truth/language; Valeu !!!',
      whyEs: 'Palabras: passado (de passar / lat. passāre) — tiempo trascurrido; memoria × historia; memorável/verdad/lengua; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/passar',
        '/posts/post-inspecao-palavra-passar.html',
        '/posts/post-inspecao-palavra-memoravel.html',
        '/posts/post-inspecao-palavra-verdade.html',
        '/posts/post-inspecao-palavra-lingua-portuguesa.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — tipografia psasafo → passado; filho de passar.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-passado)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'passado',
      word: 'passado',
      simple:
        'De passar / lat. passāre — tempo já decorrido; memória × história; elos memorável, verdade, língua; Valeu !!!',
      simpleEn:
        'From passar / Lat. passāre — elapsed time; memory × history; links memorável, truth, language; Valeu !!!',
      simpleEs:
        'De passar / lat. passāre — tiempo trascurrido; memoria × historia; vínculos memorável, verdad, lengua; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'passado');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'passar' || x.id === 'memoravel' || x.id === 'ja' || x.id === 'caminho'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (passado)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    passado: { gloss: "De passar / lat. passāre — tempo decorrido; memória × história; elos memorável/verdade/língua; Valeu !!!", href: "/posts/post-inspecao-palavra-passado.html", en: "past", es: "pasado", fr: "passé", it: "passato", de: "Vergangenheit", el: "παρελθόν", la: "praeteritum", yo: "àtijọ́", sw: "zamani", gez: "zämän zäläfä", nl: "verleden", pl: "przeszłość", ru: "прошлое", uk: "минуле", zh: "过去", ja: "過去", ko: "과거", ar: "ماضٍ", he: "עבר", hi: "अतीत", tr: "geçmiş", sv: "förflutet", da: "fortid", no: "fortid", fi: "menneisyys", cs: "minulost", ro: "trecut", hu: "múlt", ca: "passat", gl: "pasado", eu: "iragan", gn: "oykéva", qu: "ñawpa", eo: "pasinto", vi: "quá khứ", id: "masa lalu", th: "อดีต", hr: "prošlost", sk: "minulosť", ga: "am atá thart", cy: "gorffennol", ha: "baya", am: "ያለፈ", fa: "گذشته", bn: "অতীত", zu: "okudlule" },';
    if (/passado:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    passado:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (passado · entrada existente enriquecida)');
    } else {
      const rePassar = /(passar:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reMemoravel = /(memoravel:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (rePassar.test(gloss)) {
        gloss = gloss.replace(rePassar, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (passado · após passar)');
      } else if (reMemoravel.test(gloss)) {
        gloss = gloss.replace(reMemoravel, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (passado · após memoravel)');
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
