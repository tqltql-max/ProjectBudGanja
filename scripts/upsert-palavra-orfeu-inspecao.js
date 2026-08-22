'use strict';

/**
 * Injeta palavra «Orfeu» na série Palavras.
 * Uso: node scripts/upsert-palavra-orfeu-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildOrfeuPost } = require('../lib/orfeu-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-orfeu');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildOrfeuPost(seriesOrder);

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
    const sugId = 'palavra-orfeu';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Orfeu — o nome, a lira e o Morpheus que não é ele',
      titleEn: 'Orfeu — the name, the lyre, and the Morpheus he is not',
      titleEs: 'Orfeu — el nombre, la lira y el Morpheus que no es él',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: Orfeu (gr. Ὀρφεύς) — mito da lira; BR Orfeu Negro; cola de ouvido com Morpheus do Matrix, não de étimo; Faça o melhor!',
      whyEn: 'Words: Orfeu / Orpheus — lyre myth; BR Black Orpheus; ear-glue with Matrix Morpheus, not the same etymon; Do your best!',
      whyEs: 'Palabras: Orfeu — mito de la lira; BR Orfeu Negro; pegamento de oído con Morpheus de Matrix, no el mismo étimo; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wiktionary.org/wiki/Orpheus',
        'https://en.wiktionary.org/wiki/Morpheus',
        '/posts/post-inspecao-filme-the-matrix.html',
        '/posts/post-inspecao-figura-tom-jobim.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — Orfeu ≠ Morpheus / Morfeu; ouvido cola, étimo não.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-orfeu)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'orfeu',
      word: 'Orfeu',
      simple:
        'Nome / mitónimo PT ← lat. Orpheus ← gr. Ὀρφεύς (étimo incerto); mito da lira e Eurídice; no BR, Orfeu da Conceição / Orfeu Negro; cola de ouvido com Morpheus do Matrix, não de étimo (Morfeu ← morphē); Faça o melhor!',
      simpleEn:
        'PT name / mythonym ← Lat. Orpheus ← Gk. Ὀρφεύς (uncertain etymon); lyre and Eurydice; in BR, Black Orpheus; ear-glue with Matrix Morpheus, not the same etymon (Morpheus ← morphē); Do your best!',
      simpleEs:
        'Nombre / mitónimo PT ← lat. Orpheus ← gr. Ὀρφεύς (étimo incerto); lira y Eurídice; en BR, Orfeu Negro; pegamento de oído con Morpheus de Matrix, no el mismo étimo (Morfeo ← morphē); ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Orfeu é a forma portuguesa de Orpheus / Ὀρφεύς. O étimo grego é incerto. O mito (lira, Hades, Eurídice) e o cinema BR (Orfeu Negro) são camadas. Morpheus do Matrix herda Morfeu (μορφή, forma) — primo do ouvido, não do étimo.',
      curiosities:
        'Não fundir Orfeu com Morpheus / Morfeu, nem com Orfeo / Orphée. Elo: ficha Matrix e ficha Jobim.',
      historyEn:
        'Orfeu is the Portuguese form of Orpheus / Ὀρφεύς. The Greek etymon is uncertain. The myth (lyre, Hades, Eurydice) and BR cinema (Black Orpheus) are layers. Matrix Morpheus inherits Ovid’s Morpheus (morphē, form) — a cousin of the ear, not of the etymon.',
      curiositiesEn:
        'Do not merge Orfeu with Morpheus / Morfeu, nor with Orfeo / Orphée. Links: Matrix sheet and Jobim sheet.',
      historyEs:
        'Orfeu es la forma portuguesa de Orpheus / Ὀρφεύς. El étimo griego es incerto. El mito (lira, Hades, Eurídice) y el cine BR (Orfeu Negro) son capas. Morpheus de Matrix hereda a Morfeo (morphē, forma) — primo del oído, no del étimo.',
      curiositiesEs:
        'No fusionar Orfeu con Morpheus / Morfeo, ni con Orfeo / Orphée. Vínculos: ficha Matrix y ficha Jobim.'
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'Orfeu');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'mara');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (Orfeu)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    orfeu: { gloss: "Nome/mitónimo ← Ὀρφεύς (étimo incerto); lira e Eurídice; BR Orfeu Negro; cola de ouvido com Morpheus do Matrix, não de étimo (Morfeu ← morphē); Faça o melhor!", href: "/posts/post-inspecao-palavra-orfeu.html", en: "Orpheus", es: "Orfeo", fr: "Orphée", it: "Orfeo", de: "Orpheus", yo: "Orfeu", sw: "Orfeu", gez: "Orfeu", el: "Ορφεύς", la: "Orpheus", nl: "Orpheus", pl: "Orfeusz", ru: "Орфей", uk: "Орфей", zh: "俄耳甫斯", ja: "オルフェウス", ko: "오르페우스", ar: "أورفيوس", he: "אורפאוס", hi: "ऑर्फियस", tr: "Orfeus", sv: "Orfeus", da: "Orfeus", no: "Orfeus", fi: "Orfeus", cs: "Orfeus", ro: "Orfeu", hu: "Orfeusz", ca: "Orfeu", gl: "Orfeo", eu: "Orfeo", gn: "Orfeu", qu: "Orfeu", eo: "Orfeo", vi: "Orpheus", id: "Orfeus", th: "ออร์ฟิวส์", hr: "Orfej", sk: "Orfeus", ga: "Orpheus", cy: "Orffews", ha: "Orfeu", am: "ኦርፌውስ", fa: "اورفئوس", bn: "অর্ফিয়াস", zu: "u-Orfeu" },';
    const morpheusLine =
      '    morpheus: { gloss: "Personagem Matrix (Fishburne) ← Morfeu / μορφή morphē = forma; ≠ Orfeu (Ὀρφεύς); cola de ouvido, não de étimo; Faça o melhor!", href: "/posts/post-inspecao-filme-the-matrix.html", en: "Morpheus", es: "Morpheus", fr: "Morpheus", it: "Morpheus", de: "Morpheus", yo: "Morpheus", sw: "Morpheus", gez: "Morpheus", el: "Μορφεύς", la: "Morpheus", nl: "Morpheus", pl: "Morfeusz", ru: "Морфей", uk: "Морфей", zh: "墨菲斯", ja: "モーフィウス", ko: "모피어스", ar: "مورفيوس", he: "מורפיאוס", hi: "मॉर्फियस", tr: "Morpheus", sv: "Morpheus", da: "Morpheus", no: "Morpheus", fi: "Morpheus", cs: "Morpheus", ro: "Morpheus", hu: "Morpheus", ca: "Morpheus", gl: "Morpheus", eu: "Morpheus", gn: "Morpheus", qu: "Morpheus", eo: "Morfeuso", vi: "Morpheus", id: "Morpheus", th: "มอร์เฟียส", hr: "Morfej", sk: "Morfeus", ga: "Morpheus", cy: "Morffews", ha: "Morpheus", am: "ሞርፊየስ", fa: "مورفیوس", bn: "মর্ফিয়াস", zu: "u-Morpheus" },';
    if (/orfeu:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    orfeu:\s*\{[\s\S]*?\},/, entryLine);
      console.log('Glossário: orfeu enriquecida');
    } else {
      const reOrelha = /(orelha:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reOrelha.test(gloss)) {
        gloss = gloss.replace(reOrelha, '$1' + entryLine + '\n');
        console.log('Glossário: orfeu após orelha');
      } else {
        console.warn('Aviso: glossário — ponto de inserção orfeu não encontrado');
      }
    }
    if (/morpheus:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    morpheus:\s*\{[\s\S]*?\},/, morpheusLine);
      console.log('Glossário: morpheus enriquecida');
    } else if (gloss.includes('orfeu: {')) {
      gloss = gloss.replace(/(    orfeu:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + morpheusLine + '\n');
      console.log('Glossário: morpheus após orfeu');
    }
    fs.writeFileSync(glossPath, gloss);
  }

  const navPath = path.join(ROOT, 'js', 'ferramentas-nav-data.js');
  if (fs.existsSync(navPath)) {
    let nav = fs.readFileSync(navPath, 'utf8');
    if (!nav.includes('"slug": "post-inspecao-palavra-orfeu"')) {
      const maraBlock =
        /("slug": "post-inspecao-palavra-mara",\s*"description": "[^"]*"\s*\},)/;
      const insert =
        '$1\n            {\n              "label": "Inspeção: Orfeu — o nome, a lira e o Morpheus que não é ele",\n              "tileLabel": "Inspeção: Orfeu — o nome, a lir…",\n              "href": "/posts/post-inspecao-palavra-orfeu.html",\n              "icon": "🔍",\n              "slug": "post-inspecao-palavra-orfeu",\n              "description": "Palavras: «Orfeu» (gr. Ὀρφεύς) — mito da lira; BR Orfeu Negro; cola de ouvido com Morpheus do Matrix, não de étimo; Faça o melhor!"\n            },';
      if (maraBlock.test(nav)) {
        nav = nav.replace(maraBlock, insert);
        fs.writeFileSync(navPath, nav);
        console.log('Nav: Orfeu após Mara');
      } else {
        console.warn('Aviso: nav — bloco Mara não encontrado para inserir Orfeu');
      }
    } else {
      console.log('Nav já tinha Orfeu');
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
