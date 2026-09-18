'use strict';

/**
 * Injeta palavra «meneia» na série Palavras.
 * Uso: node scripts/upsert-palavra-meneia-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildMeneiaPost } = require('../lib/meneia-inspecao-post.js');

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
  const post = buildMeneiaPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';
  const gestoHref = '/posts/post-inspecao-palavra-gesto.html';
  const maosHref = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-meneia';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Meneia — balanço, corpo e a mão no étimo',
      titleEn: 'Meneia — sway, body, and the hand in the etymon',
      titleEs: 'Meneia — balanceo, cuerpo y la mano en el étimo',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: «meneia» / menear (*manear* ← mão) — balanço do corpo e ofício; elos gesto e mãos; Faça o melhor!',
      whyEn: 'Words: “meneia” / menear (*manear* ← hand) — body sway and craft; links gesto and mãos; Do your best!',
      whyEs: 'Palabras: «meneia» / menear (*manear* ← mano) — balanceo del cuerpo y oficio; vínculos gesto y mãos; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        'https://pt.wiktionary.org/wiki/menear',
        'https://www.aulete.com.br/menear',
        gestoHref,
        maosHref,
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Forma viva de menear; irmã rítmica de gesto.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-meneia)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'meneia',
      word: 'meneia',
      simple:
        'Forma viva de menear (*manear* ← mão) — balanço do corpo e ofício; elos gesto/mãos; Faça o melhor!',
      simpleEn:
        'Living form of menear (*manear* ← hand) — body sway and craft; links gesto/mãos; Do your best!',
      simpleEs:
        'Forma viva de menear (*manear* ← mano) — balanceo del cuerpo y oficio; vínculos gesto/mãos; ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'gesto' || x.id === 'relacao' || x.id === 'tempo'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (meneia)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (!gloss.includes('meneia: {') && !gloss.includes('menear: {')) {
      const re = /(gesto: \{[\s\S]*?zu: "gesture" },\r?\n)/;
      const entry =
        '    meneia: { gloss: "Forma viva de menear (*manear* ← mão) — balanço do corpo e ofício; elos gesto/mãos; Faça o melhor!", href: "/posts/post-inspecao-palavra-meneia.html", en: "sways / sway!", es: "menea", fr: "balance", it: "dondola", de: "schwenkt", el: "κουνάει", la: "iactat", yo: "mi n yí", sw: "inatikisa", gez: "yənaqəṭ", nl: "zwaait", pl: "kołysze", ru: "качает", uk: "гойдає", zh: "摇摆", ja: "揺らす", ko: "흔들다", ar: "يهز", he: "מניע", hi: "हिलाता", tr: "sallar", sv: "vippar", da: "vipper", no: "vipper", fi: "heiluttaa", cs: "kývá", ro: "legănă", hu: "leng", ca: "balanceja", gl: "menea", eu: "kulunkatu", gn: "mýi", qu: "kuyuy", eo: "balancas", vi: "lắc", id: "menggoyang", th: "แกว่ง", hr: "njiše", sk: "kýva", ga: "luascann", cy: "sigla", ha: "girkawa", am: "ያንቀሳቅሳል", fa: "تکان می‌دهد", bn: "দোলায়", zu: "nyakazisa" },\n' +
        '    menear: { gloss: "Lema de meneia — mover de um lado ao outro; manejar; elo gesto/mãos.", href: "/posts/post-inspecao-palavra-meneia.html", en: "to sway / to wag", es: "menear", fr: "balancer", it: "dondolare", de: "schwenken", el: "κουνώ", la: "iactare", yo: "yí", sw: "tikisa", gez: "naqəṭä", nl: "zwaaien", pl: "kołysać", ru: "качать", uk: "гойдати", zh: "摇摆", ja: "揺らす", ko: "흔들다", ar: "هز", he: "להניע", hi: "हिलाना", tr: "sallamak", sv: "vippa", da: "vippe", no: "vippe", fi: "heiluttaa", cs: "kývat", ro: "a legăna", hu: "lengeni", ca: "balancejar", gl: "menear", eu: "kulunkatu", gn: "mýi", qu: "kuyuy", eo: "balanci", vi: "lắc", id: "menggoyang", th: "แกว่ง", hr: "njihati", sk: "kývať", ga: "luascaidh", cy: "siglo", ha: "girkawa", am: "ማንቀሳቀስ", fa: "تکان دادن", bn: "দোলানো", zu: "ukunyakazisa" },\n';
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (meneia / menear)');
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

  console.log('OK:', post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
