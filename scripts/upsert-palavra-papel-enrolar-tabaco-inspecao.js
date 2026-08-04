'use strict';

/**
 * Injeta palavra «papel de enrolar × tabaco» na série Palavras.
 * Uso: node scripts/upsert-palavra-papel-enrolar-tabaco-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const {
  buildPapelEnrolarTabacoPost
} = require('../lib/papel-enrolar-tabaco-inspecao-post.js');

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
  const slug = 'inspecao-palavra-papel-enrolar-tabaco';
  const existing = posts.find((p) => p.slug === slug);
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildPapelEnrolarTabacoPost(seriesOrder);

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
    const sugId = 'palavra-papel-enrolar-tabaco';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Papel de enrolar × tabaco — dupla origem',
      titleEn: 'Rolling paper × tobacco — dual origin',
      titleEs: 'Papel de liar × tabaco — doble origen',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Origem do papel (Europa/mortalha) e origem do tabaco (Américas).',
      whyEn: 'Origin of rolling paper (Europe) and of tobacco (Americas).',
      whyEs: 'Origen del papel de liar (Europa) y del tabaco (Américas).',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wikipedia.org/wiki/Rolling_paper',
        'https://en.wikipedia.org/wiki/Rizla',
        '/posts/post-inspecao-palavra-cinzeiro.html',
        '/posts/post-inspecao-palavra-maconha.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — ficha ≠ incentivo ao fumo; lore Rizla/Napoleão com ressalva.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-papel-enrolar-tabaco)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entries = [
      {
        id: 'papel-de-enrolar',
        word: 'papel de enrolar',
        simple:
          'Mortalha / seda — papel fino para enrolar; origem europeia industrial (ex. Rizla); elo tabaco e cinzeiro.',
        simpleEn:
          'Rolling paper — thin paper for rolling; modern European industry (e.g. Rizla); links tobacco and cinzeiro.',
        simpleEs:
          'Papel de liar — papel fino; origen europea industrial (p. ej. Rizla); vínculo tabaco y cinzeiro.',
        group: 'lexico',
        fromTitle: false,
        href
      },
      {
        id: 'tabaco',
        word: 'tabaco',
        simple:
          'Planta americana (Nicotiana); vocábulo via espanhol; distinto de maconha; elo papel de enrolar.',
        simpleEn:
          'American plant (Nicotiana); word via Spanish; distinct from maconha; link to rolling paper.',
        simpleEs:
          'Planta americana (Nicotiana); vocablo vía español; distinto de maconha; vínculo papel de liar.',
        group: 'lexico',
        fromTitle: false,
        href
      }
    ];
    entries.forEach((entry) => {
      const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
      if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
      else {
        const after = items.findIndex((x) => x.id === 'cinzeiro' || x.id === 'maconha');
        if (after >= 0) items.splice(after + 1, 0, entry);
        else items.push(entry);
      }
    });
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (papel-de-enrolar · tabaco)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryTabaco =
      '    tabaco: { gloss: "Planta americana (Nicotiana); distinto de maconha; elo papel de enrolar.", href: "/posts/post-inspecao-palavra-papel-enrolar-tabaco.html", en: "tobacco", es: "tabaco", fr: "tabac", it: "tabacco", de: "Tabak", el: "καπνός", la: "tabacum", yo: "taba", sw: "tumbaku", nl: "tabak", pl: "tytoń", ru: "tabak", uk: "tiutiun", zh: "yancao", ja: "tabako", ko: "dambae", ar: "tabgh", he: "tabak", hi: "tambaku", tr: "tütün", sv: "tobak", da: "tobak", no: "tobakk", fi: "tupakka", cs: "tabák", ro: "tutun", hu: "dohány", ca: "tabac", gl: "tabaco", eu: "tabako", gn: "petỹ", qu: "sayri", eo: "tabako", vi: "thuốc lá", id: "tembakau", th: "ยาสูบ", hr: "duhan", sk: "tabak", ga: "tobac", cy: "tybaco", ha: "taba", am: "ትምባሆ", fa: "tanbaku", bn: "তামাক", zu: "ugwayi" },';
    const entryPapel =
      '    "papel de enrolar": { gloss: "Mortalha / seda — papel fino; origem europeia; elo tabaco e cinzeiro.", href: "/posts/post-inspecao-palavra-papel-enrolar-tabaco.html", en: "rolling paper", es: "papel de liar", fr: "papier à rouler", it: "cartina", de: "Zigarettenpapier", el: "χιζάκι", nl: "vloei", pl: "bibułka", ru: "bumaga dlya samokrutok", zh: "juanyan zhi", ja: "makigami", ko: "malji", ar: "waraq alfaf", he: "niyar gilgul", hi: "rolling paper", tr: "sarma kağıdı", sv: "cigarrettpapper", pt: "papel de enrolar", ca: "paper d\'embolicar", gl: "papel de enrolar", eu: "paperra", eo: "rula papero" },';
    if (/tabaco:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    tabaco:\s*\{[\s\S]*?\},/, entryTabaco);
    } else if (/(cinzeiro:\s*\{[\s\S]*?\},?\r?\n)/.test(gloss)) {
      gloss = gloss.replace(/(cinzeiro:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + entryTabaco + '\n');
    } else {
      console.warn('Aviso: glossário — inserção tabaco falhou');
    }
    if (/"papel de enrolar":\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    "papel de enrolar":\s*\{[\s\S]*?\},/, entryPapel);
    } else if (/(tabaco:\s*\{[\s\S]*?\},?\r?\n)/.test(gloss)) {
      gloss = gloss.replace(/(tabaco:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + entryPapel + '\n');
    }
    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (tabaco · papel de enrolar)');
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
