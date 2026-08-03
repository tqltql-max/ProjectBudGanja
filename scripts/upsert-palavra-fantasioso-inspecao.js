'use strict';

/**
 * Injeta palavra «fantasioso» na série Palavras.
 * Uso: node scripts/upsert-palavra-fantasioso-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildFantasiosoPost } = require('../lib/fantasioso-inspecao-post.js');

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

function glossEntryLine() {
  return [
    '    fantasioso: {',
    ' gloss: "Fantasia + -oso — imaginativo / crítica leve «não seja fantasioso»; ≠ fantástico (Cap. irmã); Faça o melhor com rasto.",',
    ' href: "/posts/post-inspecao-palavra-fantasioso.html",',
    ' en: "fanciful / imaginative",',
    ' es: "fantasioso",',
    ' fr: "fantaisiste",',
    ' it: "fantasioso",',
    ' de: "phantasievoll",',
    ' el: "fantasiópliktos",',
    ' la: "phantasiosus",',
    ' yo: "aláàlá",',
    ' sw: "mwenye ndoto",',
    ' gez: "fantasioso",',
    ' nl: "fantasierijk",',
    ' pl: "fantazyjny",',
    ' ru: "fantastyor",',
    ' uk: "fantazer",',
    ' zh: "fanciful",',
    ' ja: "kusoteki",',
    ' ko: "gongsangjeogin",',
    ' ar: "khayali",',
    ' he: "dimyoni",',
    ' hi: "kalpanik",',
    ' tr: "hayalperest",',
    ' sv: "fantasifull",',
    ' da: "fantasifuld",',
    ' no: "fantasifull",',
    ' fi: "mielikuvituksellinen",',
    ' cs: "fantazijni",',
    ' ro: "fantezist",',
    ' hu: "fantaziadus",',
    ' ca: "fantasioso",',
    ' gl: "fantasioso",',
    ' eu: "irudimensuzko",',
    ' gn: "fantasioso",',
    ' qu: "musquyniyoq",',
    ' eo: "fantazia",',
    ' vi: "huyen tuong",',
    ' id: "penuh fantasi",',
    ' th: "fanciful",',
    ' hr: "mastovit",',
    ' sk: "fantazijny",',
    ' ga: "fantaisioch",',
    ' cy: "dychmygol",',
    ' ha: "mai tunani",',
    ' am: "fantasioso",',
    ' fa: "khialbaf",',
    ' bn: "kalpanaprobôn",',
    ' zu: "okucabangela"',
    ' },'
  ].join('');
}

async function main() {
  // Re-ler Cap livre (agentes concorrentes)
  const postsLive = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const used = new Set(
    postsLive
      .filter((x) => x.series === 'palavras-origem')
      .map((x) => x.seriesOrder)
      .filter((n) => n != null)
  );
  let nextCap = 1;
  while (used.has(nextCap)) nextCap++;
  const existing = postsLive.find((p) => p.slug === 'inspecao-palavra-fantasioso');
  if (existing && existing.seriesOrder != null) {
    console.log('Slug já existe — Cap.', existing.seriesOrder, '(deepen/update)');
  }

  const post = buildFantasiosoPost();
  if (existing && existing.seriesOrder != null) {
    post.seriesOrder = existing.seriesOrder;
  } else if (used.has(post.seriesOrder) || post.seriesOrder !== nextCap) {
    post.seriesOrder = nextCap;
    console.log('seriesOrder ajustado para Cap.', nextCap);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-fantasioso';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Fantasioso — fantasia, imaginação e ≠ fantástico',
      titleEn: 'Fantasioso — fantasy, imagination and ≠ fantástico',
      titleEs: 'Fantasioso — fantasía, imaginación y ≠ fantástico',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: fantasioso (fantasia + -oso) — imaginativo / crítica leve; tipografia fantatioso → fantasioso; ≠ fantástico (Cap. irmã).',
      whyEn: 'Words: fantasioso (fantasia + -oso) — fanciful / mild critique; typo fantatioso → fantasioso; ≠ fantástico (sister Cap.).',
      whyEs: 'Palabras: fantasioso (fantasia + -oso) — imaginativo / crítica leve; tipografía fantatioso → fantasioso; ≠ fantástico (Cap. hermana).',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/fantasia',
        'https://en.wiktionary.org/wiki/fanciful',
        '/posts/post-inspecao-palavra-criatividade.html',
        '/posts/post-inspecao-palavra-fantastico.html',
        '/posts/post-inspecao-palavra-verdade.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — fantasioso ≠ fantástico (Cap. irmã); rede só com slugs existentes.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-fantasioso)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'fantasioso',
      word: 'fantasioso',
      simple:
        'Fantasia + -oso — imaginativo / fanciful; elogio ou crítica leve («não seja fantasioso»); ≠ fantástico (Cap. irmã); Faça o melhor com rasto.',
      simpleEn:
        'Fantasia + -oso — fanciful / imaginative; praise or mild critique; ≠ fantástico (sister Cap.); Do your best with a trail.',
      simpleEs:
        'Fantasia + -oso — imaginativo; elogio o crítica leve; ≠ fantástico (Cap. hermana); Haz lo mejor con rastro.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'fantasioso');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'fabuloso' || x.id === 'fantastico' || x.id === 'criatividade' || x.id === 'genial'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (fantasioso)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine = glossEntryLine();
    if (/fantasioso:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    fantasioso:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (fantasioso · existente)');
    } else {
      const reFab = /(fabuloso:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reFan = /(fantástico:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reCri = /(criatividade:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reFan.test(gloss)) {
        gloss = gloss.replace(reFan, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (fantasioso · após fantástico)');
      } else if (reFab.test(gloss)) {
        gloss = gloss.replace(reFab, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (fantasioso · após fabuloso)');
      } else if (reCri.test(gloss)) {
        gloss = gloss.replace(reCri, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (fantasioso · após criatividade)');
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
