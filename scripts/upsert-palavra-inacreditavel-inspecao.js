'use strict';

/**
 * Injeta palavra «inacreditável» na série Palavras.
 * Uso: node scripts/upsert-palavra-inacreditavel-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildInacreditavelPost } = require('../lib/inacreditavel-inspecao-post.js');

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
  const post = buildInacreditavelPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

  // Avoid Cap collision only among inspecao-palavra-* (guias may share numbers).
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
  while (taken.has(order) && order < 120) order += 1;
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
    const sugId = 'palavra-inacreditavel';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Inacreditável — beyond belief, elogio BR e Faça o melhor!',
      titleEn: 'Inacreditável — beyond belief, BR praise, and Do your best!',
      titleEs: 'Inacreditável — más allá de lo creíble, elogio BR y ¡Haz lo mejor!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: inacreditável (in- + acreditável ← credere) — incredulidade e elogio BR; escala com incrível/fabuloso/genial; gatilho ianfreditala.',
      whyEn: 'Words: inacreditável (in- + acreditável ← credere) — unbelief and BR praise; scale with incrível/fabuloso/genial; trigger ianfreditala.',
      whyEs: 'Palabras: inacreditável (in- + acreditável ← credere) — incredulidad y elogio BR; escala con incrível/fabuloso/genial; gatillo ianfreditala.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/acreditar',
        '/posts/post-inspecao-palavra-incrivel.html',
        '/posts/post-inspecao-palavra-genial.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — beyond belief × elogio; irmão de incrível.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-inacreditavel)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'inacreditavel',
      word: 'inacreditável',
      simple:
        'in- + acreditável (← credere) — não acreditável / elogio BR «beyond belief»; irmão de incrível; Faça o melhor depois do «não acredito».',
      simpleEn:
        'in- + acreditável (← credere) — unbelievable / BR praise “beyond belief”; sister of incrível; Do your best after the wow.',
      simpleEs:
        'in- + acreditável (← credere) — increíble / elogio BR «beyond belief»; hermana de incrível; Haz lo mejor después del «no lo creo».',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'incrivel' || x.id === 'genial' || x.id === 'fabuloso'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (inacreditavel)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (!gloss.includes('inacreditavel: {')) {
      const entry =
        '    inacreditavel: { gloss: "in- + acreditável ← credere — beyond belief / elogio BR; escala com incrível e genial; Faça o melhor!", href: "/posts/post-inspecao-palavra-inacreditavel.html", en: "unbelievable / beyond belief", es: "increíble / inacreditável", fr: "incroyable", it: "incredibile", de: "unglaublich", el: "απίστευτος", la: "incredibilis", yo: "àìgbàgbọ́", sw: "asiyeaminika", gez: "ዘኢይትአመን", nl: "ongelooflijk", pl: "niewiarygodny", ru: "невероятный", uk: "неймовірний", zh: "难以置信的", ja: "信じられない", ko: "믿을 수 없는", ar: "لا يصدق", he: "לא ייאמן", hi: "अविश्वसनीय", tr: "inanılmaz", sv: "otrolig", da: "utrolig", no: "utrolig", fi: "uskomaton", cs: "neuvěřitelný", ro: "de necrezut", hu: "hihetetlen", ca: "inacreditable", gl: "inacreditábel", eu: "sinestezina", gn: "ndaikatúiva jerovia", qu: "mana iñinapaq", eo: "nekredebla", vi: "không thể tin được", id: "luar biasa", th: "เหลือเชื่อ", hr: "nevjerojatan", sk: "neuveriteľný", ga: "dochreidte", cy: "anhygoel", ha: "abin mamaki", am: "የማይታመን", fa: "باورنکردنی", bn: "অবিশ্বাস্য", zu: "okungakholeki" },\n';
      const reIncrivel = /(incrivel: \{[\s\S]*?zu: "[^"]*" },\r?\n)/;
      const reGenial = /(genial: \{[\s\S]*?zu: "[^"]*" },\r?\n)/;
      if (reIncrivel.test(gloss)) {
        gloss = gloss.replace(reIncrivel, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (inacreditavel · após incrivel)');
      } else if (reGenial.test(gloss)) {
        gloss = gloss.replace(reGenial, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (inacreditavel · após genial)');
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
