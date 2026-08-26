'use strict';

/**
 * Injeta palavra «inseto» na série Palavras.
 * Uso: node scripts/upsert-palavra-inseto-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildInsetoPost } = require('../lib/inseto-inspecao-post.js');

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

function nextFreeSeriesOrder(posts, preferred, selfSlug) {
  const taken = new Set(
    posts
      .filter((p) => p.slug !== selfSlug)
      .map((p) => Number(p.seriesOrder))
      .filter((n) => Number.isFinite(n) && n > 0)
  );
  let n = preferred;
  while (taken.has(n)) n += 1;
  return n;
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
  const post = buildInsetoPost();
  const free = nextFreeSeriesOrder(posts, post.seriesOrder, post.slug);
  if (free !== post.seriesOrder) {
    console.log('seriesOrder ajustado:', post.seriesOrder, '→', free);
    post.seriesOrder = free;
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
    const sugId = 'palavra-inseto';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Inseto — vida, ecologia, cultura e Valeu !!!',
      titleEn: 'Inseto — life, ecology, culture and Valeu !!!',
      titleEs: 'Inseto — vida, ecología, cultura y ¡Valeu !!!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: inseto / insetos (lat. insectum) — vida, ecologia e cultura; elos joaninha, abelha, animal, simbiose; contraste buguei.',
      whyEn: 'Words: inseto / insetos (Lat. insectum) — life, ecology and culture; links ladybug, bee, animal, symbiosis; contrast buguei.',
      whyEs: 'Palabras: inseto / insetos (lat. insectum) — vida, ecología y cultura; vínculos joaninha, abeja, animal, simbiosis; contraste buguei.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/inseto',
        '/posts/post-inspecao-palavra-animal.html',
        '/posts/post-inspecao-personagem-joaninha-joana.html',
        '/posts/post-inspecao-animal-abelha.html',
        '/posts/post-inspecao-palavra-simbiose.html',
        '/posts/post-inspecao-palavra-buguei.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — inseto/insetos; vida × ecologia × cultura.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-inseto)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'inseto',
      word: 'inseto',
      simple:
        'Lat. insectum — lemma inseto / plural insetos; vida, ecologia e cultura; elos joaninha, abelha, animal, simbiose; contraste buguei.',
      simpleEn:
        'Lat. insectum — lemma inseto / plural insetos; life, ecology and culture; links ladybug, bee, animal, symbiosis; contrast buguei.',
      simpleEs:
        'Lat. insectum — lema inseto / plural insetos; vida, ecología y cultura; vínculos joaninha, abeja, animal, simbiosis; contraste buguei.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'inseto');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'animal' || x.id === 'buguei' || x.id === 'simbiose'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (inseto)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    inseto: { gloss: "Lat. insectum — lemma; plural insetos; vida, ecologia e cultura; elos joaninha/abelha/animal/simbiose.", href: "/posts/post-inspecao-palavra-inseto.html", en: "insect", es: "insecto", fr: "insecte", it: "insetto", de: "Insekt", el: "έντομο", la: "insectum", yo: "kòkòrò", sw: "mdudu", gez: "ḥənṣä", nl: "insect", pl: "owad", ru: "насекомое", uk: "комаха", zh: "昆虫", ja: "昆虫", ko: "곤충", ar: "حشرة", he: "חרק", hi: "कीट", tr: "böcek", sv: "insekt", da: "insekt", no: "insekt", fi: "hyönteinen", cs: "hmyz", ro: "insectă", hu: "rovar", ca: "insecte", gl: "insecto", eu: "intsektu", gn: "tymba\'i", qu: "uru", eo: "insekto", vi: "côn trùng", id: "serangga", th: "แมลง", hr: "kukac", sk: "hmyz", ga: "feithid", cy: "pryfedyn", ha: "kwari", am: "ነፍሳት", fa: "حشره", bn: "পোকা", zu: "isinambuzane" },\n' +
      '    insetos: { gloss: "Plural de inseto — rede viva (ecologia); ver ficha inseto.", href: "/posts/post-inspecao-palavra-inseto.html", en: "insects", es: "insectos", fr: "insectes", it: "insetti", de: "Insekten", el: "έντομα", la: "insecta", yo: "àwọn kòkòrò", sw: "wadudu", gez: "ḥənṣät", nl: "insecten", pl: "owady", ru: "насекомые", uk: "комахи", zh: "昆虫们", ja: "昆虫たち", ko: "곤충들", ar: "حشرات", he: "חרקים", hi: "कीटों", tr: "böcekler", sv: "insekter", da: "insekter", no: "insekter", fi: "hyönteiset", cs: "hmyz", ro: "insecte", hu: "rovarok", ca: "insectes", gl: "insectos", eu: "intsektuak", gn: "tymba\'ikuéra", qu: "urukuna", eo: "insektoj", vi: "các côn trùng", id: "serangga-serangga", th: "แมลงทั้งหลาย", hr: "kukci", sk: "hmyz", ga: "feithidí", cy: "pryfed", ha: "kwari", am: "ነፍሳት", fa: "حشرات", bn: "পোকামাকড়", zu: "izinambuzane" },';
    if (/inseto:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    inseto:\s*\{[\s\S]*?\},/, entryLine.split('\n')[0]);
      if (!/insetos:\s*\{/.test(gloss)) {
        gloss = gloss.replace(/(    inseto:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + entryLine.split('\n')[1] + '\n');
      }
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (inseto · existente)');
    } else {
      const reAnimal = /(animal:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reBuguei = /(buguei:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reAnimal.test(gloss)) {
        gloss = gloss.replace(reAnimal, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (inseto · após animal)');
      } else if (reBuguei.test(gloss)) {
        gloss = gloss.replace(reBuguei, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (inseto · após buguei)');
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

  console.log('OK Cap.', post.seriesOrder, post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
