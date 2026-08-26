'use strict';

/**
 * Injeta palavra «vassoura» na série Palavras.
 * Uso: node scripts/upsert-palavra-vassoura-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildVassouraPost } = require('../lib/vassoura-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-vassoura');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildVassouraPost(seriesOrder);

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
    const sugId = 'palavra-vassoura';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Vassoura — varrer, cabo e o conto que não é receita',
      titleEn: 'Vassoura — sweeping, the handle, and the tale that is not a recipe',
      titleEs: 'Vassoura — barrer, el mango y el cuento que no es receta',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: vassoura (versōria) — utensílio; folclore XIV sem receita; cacau; Valeu !!!',
      whyEn: 'Words: vassoura (versōria) — broom; XIV folklore, no recipe; cacao; Valeu !!!',
      whyEs: 'Palabras: vassoura (versōria) — escoba; folclore XIV sin receta; cacao; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-esfregar.html',
        '/biblioteca/unifesp/livro-xiv.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — história e curiosidades; tropano = documentar ≠ receitar.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-vassoura)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'vassoura',
      word: 'vassoura',
      simple:
        'Lat. versōria — utensílio de varrer; folclore da bruxa é hipótese histórica (XIV), não receita; vassoura-de-bruxa = doença do cacau.',
      simpleEn:
        'Lat. versōria — broom; witch folklore is a historical hypothesis (XIV), not a recipe; witches’ broom = cacao disease.',
      simpleEs:
        'Lat. versōria — escoba; el folclore de la bruja es hipótesis histórica (XIV), no receta; escoba de bruja = enfermedad del cacao.',
      history:
        'Do latim versōria (fazer virar / varrer). O inglês broom nomeou primeiro o arbusto e depois o utensílio. No Brasil clássico, cerdas de piaçava.',
      historyEn:
        'From Latin versōria (to turn / sweep). English broom named the shrub first, then the tool. Classic Brazilian brooms often used piaçava fibre.',
      historyEs:
        'Del latín versōria (hacer girar / barrer). El inglés broom nombró primero el arbusto y después el utensilio. En el Brasil clásico, cerdas de piaçava.',
      curiosities:
        'No Livro XIV da UNIFESP, o cabo da bruxa aparece como hipótese tropânica — tóxica, não psicadélica clássica — e a aula recusa pôr «tudo na conta da mulher». No cacau, vassoura-de-bruxa é fungo, não sabbat.',
      curiositiesEn:
        'UNIFESP Book XIV files the witch’s handle as a tropane hypothesis — toxic, not a classic psychedelic — and refuses to blame only women. In cacao, witches’ broom is a fungus, not a sabbat.',
      curiositiesEs:
        'El Libro XIV de la UNIFESP ficha el mango de la bruja como hipótesis tropánica — tóxica, no psicodélico clásico — y rechaza dejarlo «todo en la cuenta de la mujer». En el cacao, la escoba de bruja es un hongo, no un aquelarre.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || /^vassoura$/i.test(x.word || ''));
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'valeu' || x.id === 'verdade');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (vassoura)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    vassoura: { gloss: "Lat. versōria — utensílio de varrer; folclore da bruxa = hipótese XIV, não receita; cacau; Valeu !!!", href: "/posts/post-inspecao-palavra-vassoura.html", en: "broom", es: "escoba", fr: "balai", it: "scopa", de: "Besen", el: "σκούπα", la: "versoria / scopa", yo: "ìgbálẹ̀", sw: "ufagio", gez: "mäṣfäri", nl: "bezem", pl: "miotła", ru: "metla", uk: "mitla", zh: "saozhou", ja: "hoki", ko: "bitjalu", ar: "miknasa", he: "matate", hi: "jhadu", tr: "süpürge", sv: "kvast", da: "kost", no: "kost", fi: "luuta", cs: "koště", ro: "mătură", hu: "seprű", ca: "escombra", gl: "vasoira", eu: "erratz", gn: "jaguaha", qu: "pichana", eo: "balailo", vi: "chổi", id: "sapu", th: "ไม้กวาด", hr: "metla", sk: "metla", ga: "scuab", cy: "ysgubell", ha: "tsintsiya", am: "መጥረጊያ", fa: "جارو", bn: "ঝাড়ু", zu: "umshanelo" },';
    if (/vassoura:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    vassoura:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (vassoura · existente)');
    } else {
      const reValeu = /(valeu:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reValeu.test(gloss)) {
        gloss = gloss.replace(reValeu, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (vassoura · após valeu)');
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
