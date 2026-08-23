'use strict';

/**
 * Injeta palavra «objetos» na série Palavras.
 * Uso: node scripts/upsert-palavra-objetos-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildObjetosPost } = require('../lib/objetos-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-objetos');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildObjetosPost(seriesOrder);

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
    const sugId = 'palavra-objetos';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Objetos — o que fica diante e o foco da ficha',
      titleEn: 'Objetos — what stands before and the sheet’s focus',
      titleEs: 'Objetos — lo que queda delante y el foco de la ficha',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: objetos (lat. obiectum) — plural; meta-lab do objeto inspecionado; Valeu !!!',
      whyEn: 'Words: objetos (Lat. obiectum) — plural; meta-lab inspected object; Valeu !!!',
      whyEs: 'Palabras: objetos (lat. obiectum) — plural; meta-lab del objeto inspeccionado; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-verdade.html',
        '/posts/post-inspecao-palavra-caminho.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — um objeto por ficha; plural pede ordem.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-objetos)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'objetos',
      word: 'objetos',
      simple:
        'Lat. obiectum — plural de objeto; no lab, o foco do «objeto inspecionado»; Valeu !!! neste objeto.',
      simpleEn:
        'Lat. obiectum — plural of objeto; in the lab, focus of the inspected object; Valeu !!! on this object.',
      simpleEs:
        'Lat. obiectum — plural de objeto; en el lab, el foco del «objeto inspeccionado»; Valeu !!! en este objeto.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'objetos' || x.word === 'objeto');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'verdade' || x.id === 'caminho');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (objetos)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    objetos: { gloss: "Lat. obiectum — plural de objeto; meta-lab do objeto inspecionado; Valeu !!!", href: "/posts/post-inspecao-palavra-objetos.html", en: "objects", es: "objetos", fr: "objets", it: "oggetti", de: "Objekte", el: "antikeimena", la: "obiecta", yo: "nkan", sw: "vitu", gez: "nägärat", nl: "objecten", pl: "obiekty", ru: "obekty", uk: "obiekty", zh: "wuti", ja: "mono / object", ko: "gaekche", ar: "ashya", he: "atzamim", hi: "vastuyen", tr: "nesneler", sv: "objekt", da: "objekter", no: "objekter", fi: "objektit", cs: "objekty", ro: "obiecte", hu: "targyak", ca: "objectes", gl: "obxectos", eu: "objektuak", gn: "mba\'ekuéra", qu: "imakuna", eo: "objektoj", vi: "doi tuong", id: "objek", th: "วัตถุ", hr: "objekti", sk: "objekty", ga: "readaí", cy: "gwrthrychau", ha: "abubuwa", am: "ነገሮች", fa: "ashya", bn: "বস্তু", zu: "izinto" },';
    if (/objetos:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    objetos:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (objetos · existente)');
    } else {
      const reVerdade = /(verdade:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reVerdade.test(gloss)) {
        gloss = gloss.replace(reVerdade, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (objetos · após verdade)');
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
