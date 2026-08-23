'use strict';

/**
 * Injeta palavra «pipoca» na série Palavras.
 * Uso: node scripts/upsert-palavra-pipoca-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildPipocaPost } = require('../lib/pipoca-inspecao-post.js');

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

async function main() {
  // Re-read shared files at write time (other agents may land concurrently).
  const post = buildPipocaPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

  // Avoid Cap collision if another agent just claimed seriesOrder.
  const taken = new Set(
    posts
      .filter((p) => p.slug !== post.slug && typeof p.seriesOrder === 'number')
      .map((p) => p.seriesOrder)
  );
  let order = post.seriesOrder;
  while (taken.has(order) && order < 160) order += 1;
  if (order !== post.seriesOrder) {
    post.seriesOrder = order;
    console.log('seriesOrder ajustado para Cap.', order, '(evitar colisão)');
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
    const sugId = 'palavra-pipoca';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: "Pipoca — tupi pi'poka, milho que estoura, rua e cinema",
      titleEn: "Pipoca — Tupi pi'poka, corn that pops, street and cinema",
      titleEs: "Pipoca — tupí pi'poka, maíz que estalla, calle y cine",
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: "Palavras: pipoca (tupi pi'poka) — milho→calor→estouro; rua e cinema BR; Valeu !!!",
      whyEn: "Words: pipoca (Tupi pi'poka) — grain→heat→pop; BR street and cinema; Valeu !!!",
      whyEs: "Palabras: pipoca (tupí pi'poka) — grano→calor→estallido; calle y cine BR; ¡Valeu !!!",
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wikipedia.org/wiki/Pipoca',
        '/posts/post-inspecao-palavra-fogo.html',
        '/posts/post-inspecao-palavra-alegria.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        " — tupi pi'poka; rua/cinema; sem sermonário junk-food; ≠ coca/pouca/roça."
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-pipoca)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'pipoca',
      word: 'pipoca',
      simple:
        "Tupi pi'poka — milho que estoura; rua e cinema BR; transformação com calor certo; Valeu !!!",
      simpleEn:
        "Tupi pi'poka — corn that pops; BR street and cinema; craftful heat; Valeu !!!",
      simpleEs:
        "Tupí pi'poka — maíz que estalla; calle y cine BR; calor con oficio; ¡Valeu !!!",
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'fogo' || x.id === 'chocolate' || x.id === 'passar'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (pipoca)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const rich =
      '    pipoca: { gloss: "Tupi pi\'poka — milho que estoura; rua e cinema BR; transformação com calor certo; Valeu !!!", href: "/posts/post-inspecao-palavra-pipoca.html", en: "popcorn", es: "palomitas / pochoclos", fr: "pop-corn", it: "popcorn", de: "Popcorn", el: "ποπκόρν", la: "zea explosiva (mod.)", yo: "àgbàdo tí ó bú", sw: "bisi", gez: "popcorn", nl: "popcorn", pl: "popcorn", ru: "попкорн", uk: "попкорн", zh: "爆米花", ja: "ポップコーン", ko: "팝콘", ar: "فشار", he: "פופקורן", hi: "पॉपकॉर्न", tr: "patlamış mısır", sv: "popcorn", da: "popcorn", no: "popcorn", fi: "popcorn", cs: "popcorn", ro: "floricele", hu: "pattogatott kukorica", ca: "palomites", gl: "pipocas", eu: "krispetak", gn: "avati pytũ", qu: "sara t\'aqsna", eo: "krevmaizo", vi: "bắp rang", id: "berondong jagung", th: "ป๊อปคอร์น", hr: "kokice", sk: "popcorn", ga: "gránphlúir", cy: "reis corn", ha: "masara mai fashe", am: "ፖፕኮርን", fa: "پاپ‌کورن", bn: "পপকর্ন", zu: "uqhotho" },';
    if (/pipoca: \{[^}]*href: "\/posts\/post-inspecao-palavra-pipoca\.html"/.test(gloss)) {
      console.log('Glossário já tinha pipoca enriquecido');
    } else if (/pipoca: \{[\s\S]*?zu: "[^"]*" },/.test(gloss)) {
      gloss = gloss.replace(/pipoca: \{[\s\S]*?zu: "[^"]*" },/, rich);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (pipoca enriquecido)');
    } else {
      const reFogo = /(fogo: \{[\s\S]*?zu: "[^"]*" },\r?\n)/;
      if (reFogo.test(gloss)) {
        gloss = gloss.replace(reFogo, '$1' + rich + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (pipoca · após fogo)');
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

  console.log('OK:', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
