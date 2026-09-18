'use strict';

/**
 * Injeta palavra «gêmeos» na série Palavras (alias gemeos / Gemini).
 * Uso: node scripts/upsert-palavra-gemeos-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildGemeosPost } = require('../lib/gemeos-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const HREF = '/posts/post-inspecao-palavra-gemeos.html';

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

function patchGlossary(gloss) {
  const main =
    '    gêmeos: { tone: "caution", category: "Par", mundane: "Irmãos nascidos juntos; também o signo Gemini. Grafia viva: gemeos.", gloss: "Lat. geminus (par) ≠ genius (gênio/genial); Gemini = o par no céu; ≠ génio da lâmpada; elos relação/genial; Faça o melhor em cada mão.", href: "/posts/post-inspecao-palavra-gemeos.html", en: "twins / Gemini", es: "gemelos / Géminis", fr: "jumeaux / Gémeaux", it: "gemelli", de: "Zwillinge", el: "δίδυμοι", la: "gemini", yo: "ìbejì", sw: "mapacha", gez: "mäntäw", nl: "tweelingen", pl: "bliźnięta", ru: "близнецы", uk: "близнюки", zh: "双子", ja: "双子", ko: "쌍둥이", ar: "توأم", he: "תאומים", hi: "जुड़वाँ", tr: "ikizler", sv: "tvillingar", da: "tvillinger", no: "tvillinger", fi: "kaksoset", cs: "dvojčata", ro: "gemeni", hu: "ikrek", ca: "bessons", gl: "xemelgos", eu: "bikiak", gn: "mokõi", qu: "iskay wawqikuna", eo: "ĝemeloj", vi: "sinh đôi", id: "kembar", th: "ฝาแฝด", hr: "blizanci", sk: "dvojčatá", ga: "cúpla", cy: "gefelliaid", ha: "tagwaye", am: "መንትዮች", fa: "دوقلو", bn: "যমজ", zu: "amawele" },\n';
  const aliases =
    '    gemeos: { gloss: "Grafia sem acento de gêmeos — ver ficha do par.", href: "/posts/post-inspecao-palavra-gemeos.html", en: "twins (unaccented)", es: "gemelos (sin acento)" },\n' +
    '    gêmeo: { gloss: "Singular de gêmeos — ver ficha do par.", href: "/posts/post-inspecao-palavra-gemeos.html", en: "twin", es: "gemelo" },\n' +
    '    gemeo: { gloss: "Singular sem acento de gêmeo — ver ficha.", href: "/posts/post-inspecao-palavra-gemeos.html", en: "twin (unaccented)", es: "gemelo" },\n' +
    '    gemini: { gloss: "Lat. Gemini = gêmeos (constelação / signo / nome de marca) — ver ficha gêmeos, não génio da lâmpada.", href: "/posts/post-inspecao-palavra-gemeos.html", en: "Gemini", es: "Géminis" },\n' +
    '    gémeos: { gloss: "Grafia PT-PT de gêmeos — mesma ficha.", href: "/posts/post-inspecao-palavra-gemeos.html", en: "twins (PT-PT)", es: "gemelos" },\n';

  if (/gêmeos:\s*\{/.test(gloss)) {
    gloss = gloss.replace(
      /    gêmeos:\s*\{[\s\S]*?\},/,
      main.trimEnd().replace(/,$/, '') + ','
    );
  }
  if (!/gêmeos:\s*\{/.test(gloss)) {
    const reGenial = /(genial:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
    if (reGenial.test(gloss)) gloss = gloss.replace(reGenial, '$1' + main + aliases);
    else {
      const reAff = /(aff:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reAff.test(gloss)) gloss = gloss.replace(reAff, '$1' + main + aliases);
      else console.warn('Aviso: glossário — ponto de inserção não encontrado');
    }
  } else if (!/gemeos:\s*\{/.test(gloss)) {
    const reMain = /(gêmeos:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
    if (reMain.test(gloss)) gloss = gloss.replace(reMain, '$1' + aliases);
  }
  return gloss;
}

async function main() {
  const post = buildGemeosPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-gemeos';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Gêmeos — par, signo Gemini e a armadilha com gênio',
      titleEn: 'Gêmeos — twins, Gemini, and the trap with gênio',
      titleEs: 'Gêmeos — gemelos, Gemini y la trampa con gênio',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: gêmeos (geminus) ≠ gênio (genius); signo Gemini; ≠ lâmpada de Aladim; elos relação/genial; Faça o melhor!',
      whyEn: 'Words: gêmeos (geminus) ≠ gênio (genius); Gemini sign; ≠ Aladdin lamp; links relação/genial; Do your best!',
      whyEs: 'Palabras: gêmeos (geminus) ≠ gênio (genius); signo Gemini; ≠ lámpara de Aladino; vínculos relação/genial; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wiktionary.org/wiki/Gemini',
        '/posts/post-inspecao-palavra-genial.html',
        '/posts/post-inspecao-palavra-abracadabra.html',
        '/posts/post-inspecao-palavra-relacao.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — geminus ≠ genius; alias gemeos/gemini; ficha ≠ horóscopo.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-gemeos)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'gemeos',
      word: 'Gêmeos',
      simple:
        'Lat. geminus — par / signo Gemini; ≠ gênio (genius) nem génio da lâmpada; grafia gemeos; elos relação e genial; Faça o melhor em cada mão.',
      simpleEn:
        'Lat. geminus — twins / Gemini sign; ≠ gênio (genius) or lamp genie; typed gemeos; links relação and genial; Do your best in each hand.',
      simpleEs:
        'Lat. geminus — gemelos / signo Géminis; ≠ gênio ni genio de la lámpara; grafía gemeos; vínculos relação y genial; Haz lo mejor en cada mano.',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    const gi = items.findIndex(
      (x) => x.id === 'gemeos' || x.id === 'gêmeos' || x.word === 'Gêmeos' || x.word === 'Gemeos'
    );
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'genial' || x.id === 'gesto');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (Gêmeos)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(glossPath, next);
      console.log('Glossário actualizado (gêmeos · gemeos · gemini)');
    } else {
      console.warn('Aviso: glossário sem alteração');
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
