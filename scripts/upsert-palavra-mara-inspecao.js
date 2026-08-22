'use strict';

/**
 * Injeta palavra «Mara» na série Palavras.
 * Uso: node scripts/upsert-palavra-mara-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildMaraPost } = require('../lib/mara-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-mara');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildMaraPost(seriesOrder);

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
    const sugId = 'palavra-mara';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Mara — o nome que chegou, a maravilha e os barquinhos de papel',
      titleEn: 'Mara — the name that arrived, wonder and paper boats',
      titleEs: 'Mara — el nombre que llegó, la maravilla y los barquitos de papel',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: Mara — nome que chegou sem lista; cola em maravilha; hebr. mārāh é camada, não veredicto; poema dos barquinhos de papel; Faça o melhor!',
      whyEn: 'Words: Mara — name that arrived unplanned; glued to maravilha; Heb. mārāh is a layer, not a verdict; paper-boat poem; Do your best!',
      whyEs: 'Palabras: Mara — nombre que llegó sin lista; pega en maravilha; el hebr. mārāh es capa, no veredicto; poema de barquitos; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/maravilha',
        '/posts/post-inspecao-palavra-maravilhoso.html',
        '/posts/post-inspecao-palavra-mae.html',
        '/vida/#poema=barquinhos-de-papel',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — nome × maravilha × barquinho; ≠ Tamara / Maria.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-mara)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'mara',
      word: 'Mara',
      simple:
        'Nome próprio BR que chegou ao mapa; cola no som de maravilha; hebr. mārāh (amarga) é camada, não veredicto; ≠ Tamara / Maria; barquinhos de papel; Faça o melhor!',
      simpleEn:
        'BR given name that arrived on the map; glued to the sound of maravilha (wonder); Heb. mārāh (bitter) is a layer, not a verdict; ≠ Tamara / Maria; paper boats; Do your best!',
      simpleEs:
        'Nombre propio BR que llegó al mapa; pega en el sonido de maravilha; hebr. mārāh (amarga) es capa, no veredicto; ≠ Tamara / Maria; barquitos de papel; ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Mara no Brasil é antropónimo (muitas vezes hipocorístico de Maria e parentes). O hebraico mārāh («amarga», Rute 1:20) existe como camada etimológica. Nesta ficha o elo pedido é maravilha — o nome que cabe no assombro pequeno dos barquinhos de papel.',
      curiosities:
        'Não fundir com Tamara (palmeira), Maria, mar ou o sânscrito Māra. Poema Vida: barquinhos de papel.',
      historyEn:
        'In Brazil Mara is a given name (often a hypocoristic of Maria and kin). Hebrew mārāh (“bitter”, Ruth 1:20) is an etymological layer. This sheet’s requested glue is maravilha — the name that fits in the small wonder of paper boats.',
      curiositiesEn:
        'Do not merge with Tamara (palm), Maria, mar, or Sanskrit Māra. Vida poem: paper boats.',
      historyEs:
        'En Brasil Mara es antropónimo (a menudo hipocorístico de Maria y parientes). El hebreo mārāh («amarga», Rut 1:20) es capa etimológica. El pegamento pedido es maravilha — el nombre que cabe en la maravilla pequeña de los barquitos de papel.',
      curiositiesEs:
        'No fusionar con Tamara (palmera), Maria, mar o el sánscrito Māra. Poema Vida: barquitos de papel.'
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'Mara');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'mae');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (Mara)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    mara: { gloss: "Nome BR que chegou; cola em maravilha; hebr. mārāh é camada, não veredicto; ≠ Tamara/Maria; barquinhos de papel; Faça o melhor!", href: "/posts/post-inspecao-palavra-mara.html", en: "Mara (given name)", es: "Mara (nombre)", fr: "Mara", it: "Mara", de: "Mara", yo: "Mara", sw: "Mara", gez: "Mara", el: "Μάρα", la: "Mara", nl: "Mara", pl: "Mara", ru: "Мара", uk: "Мара", zh: "玛拉", ja: "マラ", ko: "마라", ar: "مارا", he: "מרה", hi: "मारा", tr: "Mara", sv: "Mara", da: "Mara", no: "Mara", fi: "Mara", cs: "Mara", ro: "Mara", hu: "Mara", ca: "Mara", gl: "Mara", eu: "Mara", gn: "Mara", qu: "Mara", eo: "Mara", vi: "Mara", id: "Mara", th: "มารา", hr: "Mara", sk: "Mara", ga: "Mara", cy: "Mara", ha: "Mara", am: "ማራ", fa: "مارا", bn: "মারা", zu: "uMara" },';
    if (/mara:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    mara:\s*\{[\s\S]*?\},/, entryLine);
      console.log('Glossário: mara enriquecida');
    } else {
      const reMae = /(mãe:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reMae.test(gloss)) {
        gloss = gloss.replace(reMae, '$1' + entryLine + '\n');
        console.log('Glossário: mara após mãe');
      } else {
        console.warn('Aviso: glossário — ponto de inserção mara não encontrado');
      }
    }
    fs.writeFileSync(glossPath, gloss);
  }

  const navPath = path.join(ROOT, 'js', 'ferramentas-nav-data.js');
  if (fs.existsSync(navPath)) {
    let nav = fs.readFileSync(navPath, 'utf8');
    if (!nav.includes('"slug": "post-inspecao-palavra-mara"')) {
      const maeBlock =
        /("slug": "post-inspecao-palavra-mae",\s*"description": "[^"]*"\s*\},)/;
      const insert =
        '$1\n            {\n              "label": "Inspeção: Mara — o nome que chegou, a maravilha e os barquinhos de papel",\n              "tileLabel": "Inspeção: Mara — o nome que che…",\n              "href": "/posts/post-inspecao-palavra-mara.html",\n              "icon": "🔍",\n              "slug": "post-inspecao-palavra-mara",\n              "description": "Palavras: «Mara» — nome que chegou sem lista; cola em maravilha; hebr. mārāh é camada, não veredicto; poema dos barquinhos de papel; Faça o melhor!"\n            },';
      if (maeBlock.test(nav)) {
        nav = nav.replace(maeBlock, insert);
        fs.writeFileSync(navPath, nav);
        console.log('Nav: Mara após mãe');
      } else {
        console.warn('Aviso: nav — bloco mãe não encontrado para inserir Mara');
      }
    } else {
      console.log('Nav já tinha Mara');
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
