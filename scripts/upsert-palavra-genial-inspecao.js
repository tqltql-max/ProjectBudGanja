'use strict';

/**
 * Injeta palavra «genial» na série Palavras.
 * Uso: node scripts/upsert-palavra-genial-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildGenialPost } = require('../lib/palavras-inspecoes-posts.js');

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
  const post = buildGenialPost();
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
    const sugId = 'palavra-genial';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Genial — engenho, elogio e culto vazio',
      titleEn: 'Genial — ingenuity, praise and empty cult',
      titleEs: 'Genial — ingenio, elogio y culto vacío',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: «genial» — elogio de engenho; com método sim; culto vazio = ressalva; elo Valeu !!! / criatividade.',
      whyEn: 'Words: “genial” — praise of ingenuity; method yes; empty cult = caveat; link Valeu !!! / creativity.',
      whyEs: 'Palabras: «genial» — elogio de ingenio; método sí; culto vacío = salvedad; vínculo Valeu !!! / creatividad.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        'https://pt.wiktionary.org/wiki/genial',
        '/posts/post-inspecao-palavra-criatividade.html',
        '/posts/post-inspecao-palavra-legal.html',
        '/posts/post-inspecao-palavra-maravilhoso.html',
        '/posts/post-inspecao-palavra-fantastico.html',
        '/posts/post-inspecao-palavra-idolo.html',
        '/posts/post-inspecao-palavra-valeu.html',
        '/posts/post-inspecao-figura-ayrton-senna.html'
      ],
      notes: 'Cap. 30 — falso amigo EN genial (amável); escala legal → genial → maravilhoso / fantástico; contraste ídolo.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-genial)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'genial',
      word: 'genial',
      simple:
        '*Gênio* + *-al* — elogio de engenho no BR; no BudGanja, celebra o feito com método; culto vazio = ressalva.',
      simpleEn:
        '*Gênio* + *-al* — BR praise of ingenuity; in BudGanja, celebrate the deed with method; empty cult = caveat.',
      simpleEs:
        '*Gênio* + *-al* — elogio BR de ingenio; en BudGanja, celebrar el hecho con método; culto vacío = salvedad.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'ja' || x.id === 'criatividade');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (genial)');
  }

  // Glossário Aprender
  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (!gloss.includes('genial: {')) {
      const re = /(já: \{[\s\S]*?zu: "sevele" },\r?\n)/;
      const entry =
        '    genial: { gloss: "Gênio+-al — elogio de engenho; celebra o feito; culto vazio = ressalva.", href: "/posts/post-inspecao-palavra-genial.html", en: "brilliant / genius (BR praise)", es: "genial", fr: "génial", it: "geniale", de: "genial", el: "ιδιοφυής", la: "ingeniosus", yo: "ọlọ́gbọ́n", sw: "bobezi", gez: "ṭäbab", nl: "geniaal", pl: "genialny", ru: "гениальный", uk: "геніальний", zh: "天才的", ja: "天才的", ko: "천재적인", ar: "عبقري", he: "גאוני", hi: "प्रतिभाशाली", tr: "dahi", sv: "genial", da: "genial", no: "genial", fi: "nerokas", cs: "geniální", ro: "genial", hu: "zseniális", ca: "genial", gl: "xenial", eu: "jenial", gn: "arandu", qu: "yachaysapa", eo: "genia", vi: "thiên tài", id: "jenius", th: "อัจฉริยะ", hr: "genijalan", sk: "geniálny", ga: "éirimiúil", cy: "athrylithgar", ha: "haziki", am: "ብልህ", fa: "نابغه", bn: "প্রতিভাধর", zu: "uhlakaniphile" },\n';
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (genial)');
      } else {
        console.warn('Aviso: ponto de inserção do glossário não encontrado');
      }
    }
    gloss = fs.readFileSync(glossPath, 'utf8');
    if (gloss.includes('genial: {') && !gloss.includes('geneo: {')) {
      const aliases =
        '    geneo: { gloss: "Lapso oral de gênio / génio da lâmpada — ver ficha genial (≠ gêmeos).", href: "/posts/post-inspecao-palavra-genial.html", en: "slip of génio", es: "lapsus de genio" },\n' +
        '    "gênio da lâmpada": { gloss: "Génio do conto de Aladim — desejo sem rasto; ver genial e abracadabra; ≠ gêmeos.", href: "/posts/post-inspecao-palavra-genial.html", en: "genie of the lamp", es: "genio de la lámpara" },\n' +
        '    "genio da lampada": { gloss: "Grafia sem acento do génio da lâmpada — ver genial.", href: "/posts/post-inspecao-palavra-genial.html", en: "genie of the lamp", es: "genio de la lámpara" },\n';
      gloss = gloss.replace(/(genial:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/, '$1' + aliases);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (aliases geneo / lâmpada)');
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
