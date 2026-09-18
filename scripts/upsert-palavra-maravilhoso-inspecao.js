'use strict';

/**
 * Injeta palavra «maravilhoso» na série Palavras.
 * Uso: node scripts/upsert-palavra-maravilhoso-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildMaravilhosoPost } = require('../lib/maravilhoso-inspecao-post.js');

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
  // Re-ler Cap livre (agentes concorrentes)
  const postsSnap = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const post = buildMaravilhosoPost();
  const used = new Set(
    postsSnap
      .filter(
        (x) =>
          x.series === 'palavras-origem' &&
          x.seriesOrder != null &&
          x.slug !== post.slug
      )
      .map((x) => Number(x.seriesOrder))
  );
  if (used.has(Number(post.seriesOrder))) {
    let next = Number(post.seriesOrder);
    while (used.has(next)) next += 1;
    console.warn(
      'Cap',
      post.seriesOrder,
      'ocupado — a usar Cap',
      next
    );
    post.seriesOrder = next;
  }

  const posts = postsSnap;
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-maravilhoso';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Maravilhoso — maravilha, assombro, elogio BR e Faça o melhor!',
      titleEn: 'Maravilhoso — marvel, wonder, BR praise and Do your best!',
      titleEs: 'Maravilhoso — maravilla, asombro, elogio BR y ¡Haz lo mejor!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: maravilhoso — de maravilha/mirabilia; assombro e elogio BR; escala legal/genial/aff; Faça o melhor depois do uau.',
      whyEn: 'Words: maravilhoso — from maravilha/mirabilia; wonder and BR praise; scale legal/genial/aff; Do your best after the wow.',
      whyEs: 'Palabras: maravilhoso — de maravilha/mirabilia; asombro y elogio BR; escala legal/genial/aff; Haz lo mejor después del guau.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/maravilha',
        '/posts/post-inspecao-palavra-legal.html',
        '/posts/post-inspecao-palavra-genial.html',
        '/posts/post-inspecao-palavra-aff.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — maravilha × assombro × escala de elogio.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-maravilhoso)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'maravilhoso',
      word: 'maravilhoso',
      simple:
        'De maravilha (lat. mirabilia) — assombro e elogio BR («que maravilhoso!»); na escala aff ← legal ← genial ← maravilhoso; depois do uau, Faça o melhor!',
      simpleEn:
        'From maravilha (Lat. mirabilia) — wonder and BR praise; scale aff ← legal ← genial ← maravilhoso; after the wow, Do your best!',
      simpleEs:
        'De maravilha (lat. mirabilia) — asombro y elogio BR; escala aff ← legal ← genial ← maravilhoso; después del guau, ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'genial' || x.id === 'alegria' || x.id === 'aff'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (maravilhoso)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (!gloss.includes('maravilhoso: {')) {
      const re = /(genial: \{[\s\S]*?zu: "uhlakaniphile" },\r?\n)/;
      const entry =
        '    maravilhoso: { tone: "warm", category: "Assombro", mundane: "Admirável / elogio BR quente (de maravilha).", gloss: "Maravilha→assombro→elogio; escala aff←legal←genial←maravilhoso; depois Faça o melhor!", href: "/posts/post-inspecao-palavra-maravilhoso.html", en: "wonderful / marvelous", es: "maravilloso", fr: "merveilleux", it: "meraviglioso", de: "wunderbar", el: "θαυμάσιος", la: "mirabilis", yo: "iyẹnú", sw: "ajabu", gez: "dǝnk", nl: "prachtig", pl: "wspaniały", ru: "чудесный", uk: "чудовий", zh: "美妙的", ja: "素晴らしい", ko: "멋진", ar: "رائع", he: "נפלא", hi: "अद्भुत", tr: "harika", sv: "underbar", da: "vidunderlig", no: "vidunderlig", fi: "ihmeellinen", cs: "nádherný", ro: "minunat", hu: "csodálatos", ca: "meravellós", gl: "marabilloso", eu: "miragarri", gn: "iporãité", qu: "musphay", eo: "mirinda", vi: "tuyệt vời", id: "menakjubkan", th: "มหัศจรรย์", hr: "divan", sk: "úžasný", ga: "iontach", cy: "rhyfeddol", ha: "ban mamaki", am: "ድንቅ", fa: "شگفت‌انگیز", bn: "অপূর্ব", zu: "esimangalisayo" },\n' +
        '    maravilha: { gloss: "Substantivo — espanto/prodígio; ver ficha maravilhoso.", href: "/posts/post-inspecao-palavra-maravilhoso.html", en: "marvel / wonder", es: "maravilla", fr: "merveille", it: "meraviglia", de: "Wunder", el: "θαύμα", la: "mirabilia", yo: "ìyanu", sw: "ajabu", gez: "mänfäq", nl: "wonder", pl: "cud", ru: "чудо", uk: "диво", zh: "奇迹", ja: "驚異", ko: "경이", ar: "أعجوبة", he: "פלא", hi: "आश्चर्य", tr: "harika", sv: "under", da: "vidunder", no: "under", fi: "ihme", cs: "div", ro: "minune", hu: "csoda", ca: "meravella", gl: "marabilla", eu: "mirari", gn: "mba\'e guasu", qu: "musphay", eo: "mirindaĵo", vi: "kỳ quan", id: "keajaiban", th: "ความมหัศจรรย์", hr: "čudo", sk: "zázrak", ga: "iontas", cy: "rhyfeddod", ha: "abin mamaki", am: "ድንቅ ነገር", fa: "شگفتی", bn: "বিস্ময়", zu: "isimanga" },\n';
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (maravilhoso / maravilha)');
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
