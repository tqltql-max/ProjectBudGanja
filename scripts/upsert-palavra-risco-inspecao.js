'use strict';

/**
 * Injeta / actualiza palavra «risco» na série Palavras (ficha completa).
 * Uso: node scripts/upsert-palavra-risco-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildRiscoPost } = require('../lib/risco-inspecao-post.js');

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
  if (String(process.env.STORE_BACKEND || '').toLowerCase().trim() === 'fs') return;
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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-risco');
  const seriesOrder = existing && Number(existing.seriesOrder)
    ? Number(existing.seriesOrder)
    : 59;
  // If Cap. 59 free and existing had no order, keep 59 (lote Tamara).
  let order = seriesOrder;
  const taken = new Set(
    posts
      .filter((p) => p.slug !== 'inspecao-palavra-risco' && typeof p.seriesOrder === 'number')
      .map((p) => p.seriesOrder)
  );
  if (!existing || !Number(existing.seriesOrder)) {
    order = taken.has(59) ? nextPalavrasOrder(posts) : 59;
  }
  while (taken.has(order) && order < 200) order += 1;

  const post = buildRiscoPost(order);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-risco';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Risco — perigo calculado, traço e ofício',
      titleEn: 'Risco — calculated danger, stroke and craft',
      titleEs: 'Risco — peligro calculado, trazo y oficio',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: risco — perigo calculado × traço (riscar); elos medo, sinal, caminho, EXIT, Tamara/Amyr; Valeu !!!',
      whyEn: 'Words: risco — calculated danger × stroke (riscar); links medo, sinal, caminho, EXIT, Tamara/Amyr; Valeu !!!',
      whyEs: 'Palabras: risco — peligro calculado × trazo (riscar); vínculos medo, sinal, caminho, EXIT, Tamara/Amyr; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wiktionary.org/wiki/rischio',
        '/posts/post-inspecao-palavra-medo.html',
        '/posts/post-inspecao-palavra-sinal.html',
        '/posts/post-inspecao-tamara-klink.html',
        '/posts/post-inspecao-arte-bom-dia-inverno.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — ficha completa (antes lote Tamara curto); perigo × traço; medo ≠ risco.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-risco)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'risco',
      word: 'Risco',
      simple:
        'Perigo calculado × traço (*riscar*); elos medo, sinal, caminho, EXIT, Tamara/Amyr; Valeu !!!',
      simpleEn:
        'Calculated danger × stroke (*riscar*); links medo, sinal, caminho, EXIT, Tamara/Amyr; Valeu !!!',
      simpleEs:
        'Peligro calculado × trazo (*riscar*); vínculos medo, sinal, caminho, EXIT, Tamara/Amyr; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'Risco');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else items.push(entry);
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (risco)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const rich =
      '    risco: { tone: "caution", gloss: "Perigo calculado × traço (riscar); elos medo, sinal, caminho, EXIT, Tamara/Amyr; Valeu !!!", href: "/posts/post-inspecao-palavra-risco.html", en: "risk", es: "riesgo", fr: "risque", it: "rischio", de: "Risiko", el: "κίνδυνος / ρίσκο", la: "periculum / alea", yo: "ewu", sw: "hatari", gez: "አደጋ", nl: "risico", pl: "ryzyko", ru: "риск", uk: "ризик", zh: "风险", ja: "リスク", ko: "위험 / 리스크", ar: "مخاطرة", he: "סיכון", hi: "जोखिम", tr: "risk", sv: "risk", da: "risiko", no: "risiko", fi: "riski", cs: "riziko", ro: "risc", hu: "kockázat", ca: "risc", gl: "risco", eu: "arrisku", gn: "kyhyje", qu: "chhikchi", eo: "risko", vi: "rủi ro", id: "risiko", th: "ความเสี่ยง", hr: "rizik", sk: "riziko", ga: "riosca", cy: "risg", ha: "haɗari", am: "አደጋ", fa: "ریسک", bn: "ঝুঁকি", zu: "ingozi" },';
    if (/risco: \{[\s\S]*?zu: "[^"]*" },/.test(gloss)) {
      gloss = gloss.replace(/risco: \{[\s\S]*?zu: "[^"]*" },/, rich);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (risco enriquecido)');
    } else {
      console.warn('Aviso: glossário — entrada risco não encontrada');
    }
  }

  // Nav label / description (ferramentas-nav-data + site.json sync via build)
  const navPath = path.join(ROOT, 'js', 'ferramentas-nav-data.js');
  if (fs.existsSync(navPath)) {
    let nav = fs.readFileSync(navPath, 'utf8');
    const oldLabel = /"label": "Inspeção: Risco — léxico Tamara \/ Bom dia, Inverno"/;
    const newLabel =
      '"label": "Inspeção: Risco — perigo calculado, traço e ofício"';
    const oldTile = /"tileLabel": "Inspeção: Risco — léxico Tamara…"/;
    const newTile = '"tileLabel": "Inspeção: Risco — perigo calculado…"';
    const oldDesc =
      /"href": "\/posts\/post-inspecao-palavra-risco\.html",\s*"slug": "post-inspecao-palavra-risco",\s*"description": "[^"]*"/;
    if (oldLabel.test(nav)) {
      nav = nav.replace(oldLabel, newLabel);
      nav = nav.replace(oldTile, newTile);
      nav = nav.replace(
        oldDesc,
        '"href": "/posts/post-inspecao-palavra-risco.html",\n              "slug": "post-inspecao-palavra-risco",\n              "description": "Palavras: «risco» — perigo calculado × traço (riscar); elos medo, sinal, caminho, EXIT, Tamara/Amyr; Valeu !!!"'
      );
      fs.writeFileSync(navPath, nav);
      console.log('Nav actualizado (risco)');
    } else if (nav.includes('post-inspecao-palavra-risco')) {
      console.log('Nav já tinha label novo ou estrutura diferente');
    }
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
