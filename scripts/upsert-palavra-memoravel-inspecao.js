'use strict';

/**
 * Injeta palavra «memorável» na série Palavras.
 * Uso: node scripts/upsert-palavra-memoravel-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildMemoravelPost } = require('../lib/memoravel-inspecao-post.js');

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
  const post = buildMemoravelPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

  const taken = new Set(
    posts
      .filter(
        (p) =>
          p.slug !== post.slug &&
          p.series === 'palavras-origem' &&
          /^inspecao-palavra-/.test(p.slug || '')
      )
      .map((p) => p.seriesOrder)
  );
  let order = post.seriesOrder;
  while (taken.has(order) && order < 90) order += 1;
  if (order !== post.seriesOrder) {
    post.seriesOrder = order;
    console.log('seriesOrder ajustado para Cap.', order, '(evitar colisão palavra)');
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
    const sugId = 'palavra-memoravel';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Memorável — o que fica na memória e o elogio com rasto',
      titleEn: 'Memorável — what sticks in memory and praise with a trace',
      titleEs: 'Memorável — lo que queda en la memoria y el elogio con rastro',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: memorável (lat. memorabilis) — retenção digna; elogio BR; ≠ escala genial/especial; Valeu !!!',
      whyEn: 'Words: memorável (Lat. memorabilis) — worthy retention; BR praise; ≠ genial/especial scale; Valeu !!!',
      whyEs: 'Palabras: memorável (lat. memorabilis) — retención digna; elogio BR; ≠ escala genial/especial; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wiktionary.org/wiki/memorabilis',
        '/posts/post-inspecao-palavra-genial.html',
        '/posts/post-inspecao-palavra-especial.html',
        '/posts/post-inspecao-palavra-livro.html',
        '/posts/post-inspecao-filme-divertida-mente.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — memorabilis; retenção ≠ intensidade.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-memoravel)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'memoravel',
      word: 'memorável',
      simple:
        'Lat. memorabilis — digno de memória; elogio BR com rasto; retenção ≠ escala genial/especial; Valeu !!!',
      simpleEn:
        'Lat. memorabilis — worth remembering; BR praise with a trace; retention ≠ genial/especial scale; Valeu !!!',
      simpleEs:
        'Lat. memorabilis — digno de memoria; elogio BR con rastro; retención ≠ escala genial/especial; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'genial' || x.id === 'especial' || x.id === 'criatividade'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (memoravel)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const rich =
      '    memoravel: { gloss: "Lat. memorabilis — digno de memória; elogio com rasto; retenção ≠ genial/especial; Valeu !!!", href: "/posts/post-inspecao-palavra-memoravel.html", en: "memorable", es: "memorable", fr: "mémorable", it: "memorabile", de: "denkwürdig", el: "αξέχαστος", la: "memorabilis", yo: "àárínrán", sw: "ya kukumbukwa", gez: "zäkäre", nl: "gedenkwaardig", pl: "niezapomniany", ru: "памятный", uk: "пам\'ятний", zh: "难忘的", ja: "記憶に残る", ko: "기억에 남는", ar: "لا يُنسى", he: "בלתי נשכח", hi: "यादगार", tr: "unutulmaz", sv: "minnesvärd", da: "mindeværdig", no: "minneverdig", fi: "ikimuistoinen", cs: "nezapomenutelný", ro: "memorabil", hu: "emlékezetes", ca: "memorable", gl: "memorable", eu: "ahaztezin", gn: "mandu\'arã", qu: "yuyarina", eo: "memoriginda", vi: "đáng nhớ", id: "berkesan", th: "น่าจดจำ", hr: "nezaboravan", sk: "nezabudnuteľný", ga: "i gcuimhne", cy: "cofadwy", ha: "abun tuna", am: "የማይረሳ", fa: "به‌یادماندنی", bn: "স্মরণীয়", zu: "okukhumbulekayo" },';
    if (/memoravel: \{[^}]*href: "\/posts\/post-inspecao-palavra-memoravel\.html"/.test(gloss)) {
      console.log('Glossário já tinha memoravel enriquecido');
    } else if (/memoravel: \{[\s\S]*?zu: "[^"]*" },/.test(gloss)) {
      gloss = gloss.replace(/memoravel: \{[\s\S]*?zu: "[^"]*" },/, rich);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (memoravel enriquecido)');
    } else {
      const re = /(genial: \{[\s\S]*?zu: "[^"]*" },\r?\n)/;
      const reEsp = /(especial: \{[\s\S]*?zu: "[^"]*" },\r?\n)/;
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1' + rich + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (memoravel · após genial)');
      } else if (reEsp.test(gloss)) {
        gloss = gloss.replace(reEsp, '$1' + rich + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (memoravel · após especial)');
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
