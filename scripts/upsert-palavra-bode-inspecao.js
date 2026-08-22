'use strict';

/**
 * Injeta palavra «bode» na série Palavras.
 * Uso: node scripts/upsert-palavra-bode-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildBodePost } = require('../lib/bode-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const HREF = '/posts/post-inspecao-palavra-bode.html';

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
  const entryLine =
    '    bode: { gloss: "Macho caprino (étimo incerto) — bode expiatório e gíria BR (estar de bode); ≠ adega ES; elo preguiça; Valeu !!!", href: "/posts/post-inspecao-palavra-bode.html", en: "billy goat / scapegoat", es: "macho cabrío / chivo expiatorio", fr: "bouc", it: "becco / caprone", de: "Bock", el: "τράγος", la: "hircus", yo: "òbúko", sw: "beberu", gez: "ṭäyəs", nl: "bok", pl: "kozioł", ru: "козёл", uk: "цап", zh: "公山羊", ja: "雄ヤギ", ko: "숫염소", ar: "تيس", he: "תיש", hi: "बकरा", tr: "teke", sv: "bock", da: "gedebuk", no: "geitebukk", fi: "pukki", cs: "kozel", ro: "țap", hu: "bakkecske", ca: "boc", gl: "bode", eu: "ahuntz arrak", gn: "kavara kuimba\'e", qu: "chivo", eo: "virkapro", vi: "dê đực", id: "kambing jantan", th: "แพะตัวผู้", hr: "jarac", sk: "cap", ga: "pocán", cy: "bwch gafr", ha: "bunsuru", am: "ፍየል ወንድ", fa: "نر بز", bn: "ছাগল", zu: "impongo" },';
  const aliases =
    '    "bode expiatório": { gloss: "Quem leva a culpa alheia — calque do scapegoat; ver ficha bode.", href: "/posts/post-inspecao-palavra-bode.html", en: "scapegoat", es: "chivo expiatorio" },\n' +
    '    "bode expiatorio": { gloss: "Grafia sem acento de bode expiatório — ver ficha bode.", href: "/posts/post-inspecao-palavra-bode.html", en: "scapegoat", es: "chivo expiatorio" },\n';

  if (/    bode:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    bode:\s*\{[\s\S]*?\},/, entryLine);
  } else {
    const rePreguica = /(    preguiça:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
    const rePato = /(    pato:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
    const reAnimal = /(    animal:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
    if (rePreguica.test(gloss)) {
      gloss = gloss.replace(rePreguica, '$1' + entryLine + '\n');
    } else if (rePato.test(gloss)) {
      gloss = gloss.replace(rePato, '$1' + entryLine + '\n');
    } else if (reAnimal.test(gloss)) {
      gloss = gloss.replace(reAnimal, '$1' + entryLine + '\n');
    } else {
      console.warn('Aviso: glossário — ponto de inserção não encontrado (bode)');
      return gloss;
    }
  }
  if (!/bode expiat/.test(gloss)) {
    const reMain = /(    bode:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
    if (reMain.test(gloss)) gloss = gloss.replace(reMain, '$1' + aliases);
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-bode-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = buildBodePost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-bode';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Bode — o caprino, o expiatório e o mau humor',
      titleEn: 'Bode — the billy goat, the scapegoat, and the bad mood',
      titleEs: 'Bode — el macho cabrío, el chivo expiatorio y el mal humor',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: bode — macho caprino (étimo incerto), bode expiatório e gíria BR; elo preguiça; Valeu !!!',
      whyEn: 'Words: bode — billy goat (uncertain etymon), scapegoat and BR slang; link preguiça; Valeu !!!',
      whyEs: 'Palabras: bode — macho cabrío (étimo incerto), chivo expiatorio y jerga BR; vínculo preguiça; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/bode_expiat%C3%B3rio',
        '/posts/post-inspecao-palavra-preguica.html',
        '/posts/post-inspecao-palavra-animal.html',
        '/posts/post-inspecao-palavra-pato.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — ≠ capra; ≠ adega ES; par com preguiça; pagar o pato ≈ expiatório.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-bode)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'bode',
      word: 'bode',
      simple:
        'Macho caprino (étimo incerto) — bode expiatório e gíria BR; ≠ adega ES; elo preguiça; Valeu !!!',
      simpleEn:
        'Billy goat (uncertain etymon) — scapegoat and BR slang; ≠ Spanish wine cellar; link preguiça; Valeu !!!',
      simpleEs:
        'Macho cabrío (étimo incerto) — chivo expiatorio y jerga BR; ≠ bodega ES; vínculo preguiça; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'bode');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'preguica' || x.id === 'animal' || x.id === 'pato'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (bode)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(glossPath, next);
      console.log('Glossário actualizado (bode)');
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
