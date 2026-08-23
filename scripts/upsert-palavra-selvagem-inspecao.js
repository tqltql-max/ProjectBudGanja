'use strict';

/**
 * Injeta palavra «selvagem» na série Palavras.
 * Uso: node scripts/upsert-palavra-selvagem-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildSelvagemPost } = require('../lib/selvagem-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

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
  // Re-read shared files (parallel agents may have finished)
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const post = buildSelvagemPost();
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
    const sugId = 'palavra-selvagem';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Selvagem — silva, natureza e o limiar do domesticado',
      titleEn: 'Selvagem — silva, nature, and the edge of the domesticated',
      titleEs: 'Selvagem — silva, naturaleza y el umbral de lo domesticado',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: selvagem (lat. silvaticus ← silva) — natureza; selvagem × domesticado; bicho selvagem; elos planta/animal/inseto; sem romantizar dano.',
      whyEn: 'Words: selvagem (Lat. silvaticus ← silva) — nature; wild vs domesticated; plant/animal/insect links; no romance of harm.',
      whyEs: 'Palabras: selvagem (lat. silvaticus ← silva) — naturaleza; salvaje × domesticado; vínculos planta/animal/insecto; sin romantizar daño.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/silva#Latim',
        '/posts/post-inspecao-palavra-planta.html',
        '/posts/post-inspecao-palavra-animal.html',
        '/posts/post-inspecao-palavra-inseto.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — tipografia silvaogsn → selvagem; cluster natureza; não romantizar dano.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-selvagem)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'selvagem',
      word: 'selvagem',
      simple:
        'Lat. silvaticus ← silva — da mata; selvagem × domesticado; «bicho selvagem»; elos planta/animal/inseto; sem romantizar dano.',
      simpleEn:
        'Lat. silvaticus ← silva — of the forest; wild vs domesticated; plant/animal/insect links; no romance of harm.',
      simpleEs:
        'Lat. silvaticus ← silva — del bosque; salvaje × domesticado; vínculos planta/animal/insecto; sin romantizar daño.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'selvagem');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) =>
          x.id === 'inseto' ||
          x.id === 'planta' ||
          x.id === 'animal' ||
          x.id === 'simbiose'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (selvagem)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    selvagem: { gloss: "Lat. silvaticus ← silva — da mata; selvagem × domesticado; bicho selvagem; elos planta/animal/inseto; sem romantizar dano.", href: "/posts/post-inspecao-palavra-selvagem.html", en: "wild", es: "salvaje", fr: "sauvage", it: "selvaggio", de: "wild", el: "άγριος", la: "silvaticus", yo: "ẹgan", sw: "mwitu", gez: "gädäm", nl: "wild", pl: "dziki", ru: "дикий", uk: "дикий", zh: "野生", ja: "野生", ko: "야생", ar: "بري", he: "פראי", hi: "जंगली", tr: "vahşi", sv: "vild", da: "vild", no: "vill", fi: "villi", cs: "divoký", ro: "sălbatic", hu: "vad", ca: "salvatge", gl: "salvaxe", eu: "basati", gn: "ka\'aguygua", qu: "sacha", eo: "sovaĝa", vi: "hoang dã", id: "liar", th: "ป่า", hr: "divlji", sk: "divý", ga: "fiáin", cy: "gwyllt", ha: "daji", am: "የዱር", fa: "وحشی", bn: "বন্য", zu: "asendle" },';
    if (/selvagem:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    selvagem:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (selvagem · entrada existente enriquecida)');
    } else {
      const reInseto = /(inseto:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const rePlanta = /(planta:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reAnimal = /(animal:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reInseto.test(gloss)) {
        gloss = gloss.replace(reInseto, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (selvagem · após inseto)');
      } else if (rePlanta.test(gloss)) {
        gloss = gloss.replace(rePlanta, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (selvagem · após planta)');
      } else if (reAnimal.test(gloss)) {
        gloss = gloss.replace(reAnimal, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (selvagem · após animal)');
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
