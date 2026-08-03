'use strict';

/**
 * Injeta palavra «mãe» na série Palavras.
 * Uso: node scripts/upsert-palavra-mae-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildMaePost } = require('../lib/mae-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-mae');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildMaePost(seriesOrder);

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
    const sugId = 'palavra-mae';
    const si = items.findIndex((x) => x.id === sugId || x.id === 'palavra-fia');
    const entry = {
      id: sugId,
      title: 'Mãe — origem, cuidado e tipografia fia → mãe',
      titleEn: 'Mãe — origin, care and tipography fia → mãe',
      titleEs: 'Mãe — origen, cuidado y tipografía fia → mãe',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: mãe (lat. mater) — origem/cuidado; tipografia fia → mãe; fia NE (= filha) ≠ mãe; elos Dona Maria/alma; Faça o melhor!',
      whyEn: 'Words: mãe (Lat. mater) — origin/care; tipography fia → mãe; NE fia (= daughter) ≠ mother; Dona Maria/alma; Do your best!',
      whyEs: 'Palabras: mãe (lat. mater) — origen/cuidado; tipografía fia → mãe; fia NE (= hija) ≠ madre; Dona Maria/alma; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-personagem-dona-maria.html',
        '/posts/post-inspecao-palavra-alma.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — tipografia fia → mãe; oral NE fia ≠ mãe.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-mae)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'mae',
      word: 'mãe',
      simple:
        'Lat. mater — origem e cuidado; tipografia fia → mãe; fia (NE/filha) ≠ mãe; elos Dona Maria/alma; Faça o melhor!',
      simpleEn:
        'Lat. mater — origin and care; tipography fia → mãe; NE fia (= daughter) ≠ mother; Dona Maria/alma; Do your best!',
      simpleEs:
        'Lat. mater — origen y cuidado; tipografía fia → mãe; fia NE (= hija) ≠ madre; Dona Maria/alma; ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'mãe' || x.id === 'fia');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'alma' || x.id === 'coracao' || x.id === 'vida' || x.id === 'respeito'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (mãe)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    mãe: { gloss: "Lat. mater — origem e cuidado; tipografia fia → mãe; fia (NE/filha) ≠ mãe; elos Dona Maria/alma; Faça o melhor!", href: "/posts/post-inspecao-palavra-mae.html", en: "mother", es: "madre", fr: "mère", it: "madre", de: "Mutter", yo: "ìyá", sw: "mama", gez: "əmm", el: "μητέρα", la: "mater", nl: "moeder", pl: "matka", ru: "мама", uk: "мати", zh: "母亲", ja: "母", ko: "어머니", ar: "أم", he: "אמא", hi: "माँ", tr: "anne", sv: "mamma", da: "mor", no: "mor", fi: "äiti", cs: "matka", ro: "mamă", hu: "anya", ca: "mare", gl: "nai", eu: "ama", gn: "sy", qu: "mama", eo: "patrino", vi: "me", id: "ibu", th: "แม่", hr: "majka", sk: "matka", ga: "máthair", cy: "mam", ha: "uwa", am: "enat", fa: "madar", bn: "মা", zu: "umama" },';
    const fiaAlias =
      '    fia: { gloss: "Tipografia / pedido → ver «mãe» (canónico). Oral NE «fia» = filha — ≠ mãe.", href: "/posts/post-inspecao-palavra-mae.html", en: "see mãe / NE daughter", es: "ver mãe / NE hija", fr: "voir mãe", it: "vedi mãe", de: "siehe mãe", el: "βλ. mãe", la: "vide mãe", yo: "mãe", sw: "mãe", gez: "mãe", nl: "zie mãe", pl: "zob. mãe", ru: "см. mãe", uk: "див. mãe", zh: "见 mãe", ja: "mãe を参照", ko: "mãe 참조", ar: "انظر mãe", he: "ראה mãe", hi: "mãe देखें", tr: "mãe bak", sv: "se mãe", da: "se mãe", no: "se mãe", fi: "ks. mãe", cs: "viz mãe", ro: "vezi mãe", hu: "lásd mãe", ca: "vegeu mãe", gl: "ver mãe", eu: "ikusi mãe", gn: "mãe", qu: "mãe", eo: "vidu mãe", vi: "xem mãe", id: "lihat mãe", th: "ดู mãe", hr: "vidi mãe", sk: "pozri mãe", ga: "féach mãe", cy: "gweler mãe", ha: "duba mãe", am: "mãe", fa: "mãe", bn: "mãe", zu: "mãe" },';
    if (/mãe:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    mãe:\s*\{[\s\S]*?\},/, entryLine);
      console.log('Glossário: mãe enriquecida');
    } else {
      const reAlma = /(alma:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reAlma.test(gloss)) {
        gloss = gloss.replace(reAlma, '$1' + entryLine + '\n');
        console.log('Glossário: mãe após alma');
      } else {
        console.warn('Aviso: glossário — ponto de inserção mãe não encontrado');
      }
    }
    if (/fia:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    fia:\s*\{[\s\S]*?\},/, fiaAlias);
      console.log('Glossário: fia → alias mãe');
    } else if (/mãe:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/(mãe:\s*\{[\s\S]*?\},)/, '$1\n' + fiaAlias);
      console.log('Glossário: alias fia inserido');
    }
    fs.writeFileSync(glossPath, gloss);
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
