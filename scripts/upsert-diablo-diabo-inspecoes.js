'use strict';

/**
 * Injeta palavra diabo + Caderno de jogo 3 (Diablo).
 * Uso: node scripts/upsert-diablo-diabo-inspecoes.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildDiaboPost } = require('../lib/diabo-inspecao-post.js');
const { buildDiabloCadernoPost } = require('../lib/diablo-caderno-jogo-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');

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

function upsertSug(items, entry) {
  const si = items.findIndex((x) => x.id === entry.id);
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
}

function upsertGuia(items, entry) {
  const gi = items.findIndex((x) => x.id === entry.id);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else items.push(entry);
}

function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename || 'posts/post-' + post.slug + '.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', path.relative(ROOT, out));
}

function nextJogoOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'cadernos-jogo')
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
}

function patchGlossary(gloss) {
  const entryLine =
    '    diabo: { tone: "caution", category: "Léxico", mundane: "Adversário na fala popular; no lab, acusador do étimo e nome que a orelha cola no jogo.", gloss: "Lat. diabolus ← gr. diábolos — acusador; Daibo lapso; Diablo = ES + jogo + monte; giaua vizinho oral ≠ étimo; ≠ diamba; Valeu !!!", href: "/posts/post-inspecao-palavra-diabo.html", en: "devil", es: "diablo", fr: "diable", it: "diavolo", de: "Teufel", el: "διάβολος", la: "diabolus", yo: "èṣù / bìlísì", sw: "shetani", gez: "diabolos", nl: "duivel", pl: "diabeł", ru: "дьявол", uk: "диявол", zh: "魔鬼", ja: "悪魔", ko: "악마", ar: "شيطان", he: "שטן", hi: "शैतान", tr: "şeytan", sv: "djävul", da: "djævel", no: "djevel", fi: "paholainen", cs: "ďábel", ro: "diavol", hu: "ördög", ca: "dimoni", gl: "demo", eu: "deabru", gn: "aña", qu: "supay", eo: "diablo", vi: "quỷ", id: "iblis", th: "ปีศาจ", hr: "đavao", sk: "diabol", ga: "diabhal", cy: "diafol", ha: "shaidan", am: "ሰይጣን", fa: "شیطان", bn: "শয়তান", zu: "uSathane" },';
  const aliases =
    '    daibo: { gloss: "Lapso / teclado de diabo — ver ficha.", href: "/posts/post-inspecao-palavra-diabo.html", en: "devil (slip)", es: "diablo (lapsus)" },\n' +
    '    diablo: { gloss: "ES diablo / título do jogo Blizzard / Mount Diablo — ver ficha diabo e caderno.", href: "/posts/post-inspecao-jogo-diablo.html", en: "Diablo (game / Spanish devil)", es: "Diablo" },\n' +
    '    giaua: { gloss: "Vizinho oral (Iavé / Yahweh) colado a diabo — não é o étimo; ver ficha diabo.", href: "/posts/post-inspecao-palavra-diabo.html", en: "oral neighbor of Yahweh", es: "vecino oral de Iavé" },\n';

  if (/diabo:\s*\{/.test(gloss) && !/daibo:\s*\{/.test(gloss)) {
    /* keep existing diabo if any, still add aliases below */
  }
  if (/    diabo:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    diabo:\s*\{[\s\S]*?\},/, entryLine);
  } else {
    const reDiamba = /(    diamba:\s*\{[\s\S]*?\},?\r?\n)/;
    if (reDiamba.test(gloss)) gloss = gloss.replace(reDiamba, '$1' + entryLine + '\n');
    else console.warn('Aviso: glossário — ponto diamba não encontrado');
  }
  if (!/daibo:\s*\{/.test(gloss)) {
    const reMain = /(    diabo:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
    if (reMain.test(gloss)) gloss = gloss.replace(reMain, '$1' + aliases);
  }
  return gloss;
}

async function syncSql(list) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  list.forEach((p) => upsertPost(posts, p));
  await store.setPosts(posts);
  console.log('SQL store actualizado:', list.map((p) => p.slug).join(', '));
}

async function main() {
  [
    'generate-diabo-palavra-cover.js',
    'generate-diablo-caderno-cover.js'
  ].forEach((script) => {
    try {
      execFileSync(process.execPath, [path.join(__dirname, script)], {
        cwd: ROOT,
        stdio: 'inherit',
        timeout: 45000
      });
    } catch (e) {
      console.warn('Aviso capa', script, e.message);
    }
  });

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const palavra = buildDiaboPost();
  const existingJogo = posts.find((p) => p.slug === 'inspecao-jogo-diablo');
  const jogoOrder = existingJogo
    ? Number(existingJogo.seriesOrder) || 3
    : nextJogoOrder(posts);
  const jogo = buildDiabloCadernoPost(jogoOrder || 3);
  const list = [jogo, palavra];

  list.forEach((p) => upsertPost(posts, p));
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  list.forEach((p) => writeI18n(i18n, p));
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const jogoHref = '/posts/post-' + jogo.slug + '.html';
  const palavraHref = '/posts/post-' + palavra.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertSug(items, {
      id: 'jogo-diablo-caderno-3',
      title: 'Diablo — caderno 3, a masmorra de 1997',
      titleEn: 'Diablo — notebook 3, the 1997 dungeon',
      titleEs: 'Diablo — cuaderno 3, la mazmorra de 1997',
      tipo: 'jogo',
      priority: 2,
      status: 'feita',
      why: 'Caderno 3: Diablo (Blizzard North, 1997) — génese, cópia legal; elo palavra diabo / Mount Diablo.',
      whyEn: 'Notebook 3: Diablo (1997) — genesis, legal copy; word sheet diabo / Mount Diablo.',
      whyEs: 'Cuaderno 3: Diablo (1997) — génesis, copia legal; ficha diabo / Mount Diablo.',
      suggestedSlug: jogo.slug,
      doneHref: jogoHref,
      seriesHint: 'cadernos-jogo',
      sources: [
        jogo.sourceUrl,
        'https://diablo.blizzard.com/',
        palavraHref,
        'https://www.youtube.com/watch?v=o_Kr5i5F43U'
      ],
      notes: 'Cap. ' + jogo.seriesOrder + ' — sem pirataria; ≠ diamba; giaua na ficha-palavra.'
    });
    upsertSug(items, {
      id: 'palavra-diabo',
      title: 'Diabo — Daibo, Diablo e o que parece giaua',
      titleEn: 'Diabo — Daibo, Diablo, and what sounds like giaua',
      titleEs: 'Diabo — Daibo, Diablo y lo que parece giaua',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: diabo ← diábolos; Daibo lapso; Diablo = ES + jogo + monte; giaua vizinho oral; ≠ diamba.',
      whyEn: 'Words: diabo ← diábolos; Daibo slip; Diablo = Spanish + game + mountain; giaua oral neighbor; ≠ diamba.',
      whyEs: 'Palabras: diabo ← diábolos; Daibo lapsus; Diablo = ES + juego + monte; giaua vecino oral; ≠ diamba.',
      suggestedSlug: palavra.slug,
      doneHref: palavraHref,
      seriesHint: 'palavras-origem',
      sources: [palavra.sourceUrl, jogoHref, '/posts/post-inspecao-palavra-diamba.html']
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (diablo + diabo)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertGuia(items, {
      id: 'diabo',
      word: 'diabo',
      simple:
        'Lat. diabolus ← gr. diábolos — acusador. Daibo é lapso; Diablo é o jogo / o espanhol / o monte; giaua é vizinho oral (Iavé), não o étimo. ≠ diamba.',
      simpleEn:
        'Lat. diabolus ← Gr. diábolos — accuser. Daibo is a slip; Diablo is the game / Spanish / the mountain; giaua is an oral neighbor (Yahweh), not the etymon. ≠ diamba.',
      simpleEs:
        'Lat. diabolus ← gr. diábolos — acusador. Daibo es lapsus; Diablo es el juego / el español / el monte; giaua es vecino oral (Iavé), no el étimo. ≠ diamba.',
      group: 'lexico',
      fromTitle: false,
      href: palavraHref
    });
    upsertGuia(items, {
      id: 'diablo-jogo',
      word: 'Diablo (jogo)',
      simple:
        'Action RPG da Blizzard North (1997). No site, caderno de jogo 3 — génese em Tristram; cópia legal no Battle.net; elo com a ficha-palavra diabo.',
      simpleEn:
        'Blizzard North action RPG (1997). On the site, game notebook 3 — Tristram genesis; legal copy on Battle.net; linked to the diabo word sheet.',
      simpleEs:
        'Action RPG de Blizzard North (1997). En el sitio, cuaderno 3 — génesis en Tristram; copia legal en Battle.net; vínculo con la ficha diabo.',
      group: 'lexico',
      fromTitle: false,
      href: jogoHref
    });
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = patchGlossary(gloss);
    fs.writeFileSync(GLOSS_FILE, gloss, 'utf8');
    console.log('Glossário actualizado (diabo)');
  }

  try {
    await syncSql(list);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  list.forEach((p) => {
    try {
      writeHtml(p);
    } catch (e) {
      console.warn('Aviso HTML', p.slug, e.message);
    }
  });

  list.forEach((p) => console.log('OK:', p.title));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
