'use strict';

/**
 * Injeta palavra «magnífico» na série Palavras.
 * Uso: node scripts/upsert-palavra-magnifico-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildMagnificoPost } = require('../lib/magnifico-inspecao-post.js');

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

function collectUsedCaps(postsLive) {
  const used = new Set(
    postsLive.map((x) => x.seriesOrder).filter((n) => n != null)
  );
  // União com lib/*.js — posts.json pode perder seriesOrder sob race
  const libDir = path.join(ROOT, 'lib');
  for (const f of fs.readdirSync(libDir).filter((x) => x.endsWith('.js'))) {
    if (f === 'magnifico-inspecao-post.js') continue;
    const src = fs.readFileSync(path.join(libDir, f), 'utf8');
    for (const m of src.matchAll(/seriesOrder:\s*(\d+)/g)) {
      used.add(Number(m[1]));
    }
  }
  return used;
}

async function main() {
  // Re-ler Cap livre (agentes concorrentes)
  const postsLive = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const used = collectUsedCaps(postsLive);
  let nextCap = 1;
  while (used.has(nextCap)) nextCap++;
  const existing = postsLive.find((p) => p.slug === 'inspecao-palavra-magnifico');
  if (existing && existing.seriesOrder != null && existing.seriesOrder > 1) {
    console.log('Slug já existe — Cap.', existing.seriesOrder, '(deepen/update)');
  } else {
    console.log('Cap livre actual (posts∪lib):', nextCap);
  }

  const post = buildMagnificoPost();
  if (existing && existing.seriesOrder != null && existing.seriesOrder > 1 && !used.has(existing.seriesOrder)) {
    post.seriesOrder = existing.seriesOrder;
  } else if (
    !existing ||
    existing.seriesOrder == null ||
    existing.seriesOrder === 1 ||
    used.has(post.seriesOrder) ||
    post.seriesOrder !== nextCap
  ) {
    // Cap 1 = maconha no canónico; não ocupar se race zerou seriesOrders
    if (existing && existing.seriesOrder > 1 && !used.has(existing.seriesOrder)) {
      post.seriesOrder = existing.seriesOrder;
    } else {
      post.seriesOrder = nextCap;
      console.log('seriesOrder ajustado para Cap.', nextCap);
    }
  }

  // Sync lib file if Cap drifted
  const libPath = path.join(ROOT, 'lib', 'magnifico-inspecao-post.js');
  let libSrc = fs.readFileSync(libPath, 'utf8');
  const libCap = libSrc.match(/seriesOrder:\s*(\d+)/);
  if (libCap && Number(libCap[1]) !== post.seriesOrder) {
    libSrc = libSrc.replace(/seriesOrder:\s*\d+/, 'seriesOrder: ' + post.seriesOrder);
    fs.writeFileSync(libPath, libSrc);
    console.log('lib seriesOrder sincronizado →', post.seriesOrder);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-magnifico';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Magnífico — magnificus, elogio BR e Valeu !!!',
      titleEn: 'Magnífico — magnificus, BR praise and Valeu !!!',
      titleEs: 'Magnífico — magnificus, elogio BR y ¡Valeu !!!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: magnífico (lat. magnificus / magnificent) — elogio BR; escala legal/genial/fabuloso/fantástico/incrível/maravilhoso; tipografia mafianioddpo → magnífico.',
      whyEn: 'Words: magnífico (Lat. magnificus / magnificent) — BR praise; scale legal/genial/fabuloso/fantástico/incrível/maravilhoso; typo mafianioddpo → magnífico.',
      whyEs: 'Palabras: magnífico (lat. magnificus / magnificent) — elogio BR; escala legal/genial/fabuloso/fantástico/incrível/maravilhoso; tipografía mafianioddpo → magnífico.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wiktionary.org/wiki/magnificus',
        'https://pt.wiktionary.org/wiki/magno',
        '/posts/post-inspecao-palavra-genial.html',
        '/posts/post-inspecao-palavra-fabuloso.html',
        '/posts/post-inspecao-palavra-maravilhoso.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — elogio BR; rede só com slugs existentes; alt. máfia rejeitada.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-magnifico)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'magnifico',
      word: 'magnífico',
      simple:
        'Lat. magnificus / magnificent — elogio BR quotidiano («que grande!»); escala com legal, genial, fabuloso, fantástico, incrível, maravilhoso; Valeu !!! com rasto.',
      simpleEn:
        'Lat. magnificus / magnificent — everyday BR praise; scale with legal, genial, fabuloso, fantástico, incrível, maravilhoso; Valeu !!! with a trail.',
      simpleEs:
        'Lat. magnificus / magnificent — elogio BR cotidiano; escala con legal, genial, fabuloso, fantástico, incrível, maravilloso; Valeu !!! con rastro.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'magnífico' || x.word === 'magnifico');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'maravilhoso' || x.id === 'fabuloso' || x.id === 'genial' || x.id === 'legal'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (magnífico)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    magnifico: { gloss: "Lat. magnificus / magnificent — elogio BR quotidiano; escala legal→maravilhoso; tipografia mafianioddpo → magnífico.", href: "/posts/post-inspecao-palavra-magnifico.html", en: "magnificent / splendid", es: "magnífico", fr: "magnifique", it: "magnifico", de: "großartig", el: "μεγαλοπρεπής", la: "magnificus", yo: "ńlá", sw: "kubwa sana", gez: "ʿabbiyy", nl: "prachtig", pl: "wspaniały", ru: "великолепный", uk: "чудовий", zh: "壮丽的", ja: "壮大な", ko: "장대한", ar: "رائع", he: "נהדר", hi: "भव्य", tr: "muhteşem", sv: "magnifik", da: "storslået", no: "storslått", fi: "suurenmoinen", cs: "nádherný", ro: "magnific", hu: "nagyszerű", ca: "magnífic", gl: "magnífico", eu: "bikain", gn: "tuichaite", qu: "hatun", eo: "grandioza", vi: "tráng lệ", id: "megah", th: "งดงาม", hr: "veličanstven", sk: "veľkolepý", ga: "maorga", cy: "gwych", ha: "babba", am: "ግርማ ሞገስ", fa: "باشکوه", bn: "মহান", zu: "okuhle kakhulu" },';
    if (/magnifico:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    magnifico:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (magnifico · existente)');
    } else {
      const reMar = /(maravilhoso:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reFab = /(fabuloso:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reGenial = /(genial:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reMar.test(gloss)) {
        gloss = gloss.replace(reMar, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (magnifico · após maravilhoso)');
      } else if (reFab.test(gloss)) {
        gloss = gloss.replace(reFab, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (magnifico · após fabuloso)');
      } else if (reGenial.test(gloss)) {
        gloss = gloss.replace(reGenial, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (magnifico · após genial)');
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
