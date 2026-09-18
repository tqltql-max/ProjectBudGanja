'use strict';

/**
 * Injeta a inspeção «craque» (série Palavras) e actualiza a irmã pedra.
 * Uso: node scripts/upsert-palavra-craque-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildCraquePost } = require('../lib/craque-inspecao-post.js');
const { buildPedraPost } = require('../lib/pedra-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const DUPLO_FILE = path.join(ROOT, 'content', 'palavras-duplo-sentido.json');
const HREF = '/posts/post-inspecao-palavra-craque.html';
const HREF_PEDRA = '/posts/post-inspecao-palavra-pedra.html';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeJsonRetry(file, data, tries = 8) {
  const payload = typeof data === 'string' ? data : JSON.stringify(data, null, 2) + '\n';
  let last;
  for (let i = 0; i < tries; i += 1) {
    try {
      fs.writeFileSync(file, payload, 'utf8');
      return;
    } catch (e) {
      last = e;
      await sleep(250 * (i + 1));
    }
  }
  throw last;
}

function stampFiles(post) {
  if (!post.filename) post.filename = 'posts/post-' + post.slug + '.html';
  if (!post.url) post.url = '/' + String(post.filename).replace(/^\/+/, '');
  return post;
}

function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
}

function upsertPost(posts, post) {
  stampFiles(post);
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

function upsertItem(items, entry, afterIds) {
  const i = items.findIndex((x) => x.id === entry.id);
  if (i >= 0) items[i] = Object.assign({}, items[i], entry);
  else {
    const after = (afterIds || []).map((id) => items.findIndex((x) => x.id === id)).find((n) => n >= 0);
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
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

function patchGlossary(gloss) {
  const craque =
    '    craque: { tone: "craft", category: "Léxico", mundane: "Estrela de ofício, sobretudo no futebol.", gloss: "Ing. crack «de primeira» → PT craque (jogador); a orelha cola o crack (droga) e a pedra-gíria; mineral πέτρα fica na ficha pedra; Valeu !!!", href: "/posts/post-inspecao-palavra-craque.html", en: "star player / ace", es: "figura / crack (deporte)" },\n';
  const crack =
    '    crack: { gloss: "Empréstimo EN da cocaína-base fumada; ≠ craque (jogador). Gíria pedra = naco, não πέτρα. Corte na ficha craque.", href: "/posts/post-inspecao-palavra-craque.html", en: "crack (cocaine)", es: "crack (droga)" },\n';

  if (/    craque:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    craque:\s*\{[\s\S]*?\},/, craque.trim().replace(/,$/, ''));
  } else if (/    cravelha:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    cravelha:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + craque);
  } else {
    console.warn('Aviso: glossário — ponto craque/cravelha não encontrado');
  }

  if (/    crack:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    crack:\s*\{[\s\S]*?\},/, crack.trim().replace(/,$/, ''));
  } else if (/    craque:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    craque:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + crack);
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-craque-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa', e.message);
  }

  const list = [stampFiles(buildCraquePost()), stampFiles(buildPedraPost())];
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  list.forEach((p) => upsertPost(posts, p));
  await writeJsonRetry(POSTS_FILE, posts);

  list.forEach((p) => {
    try {
      writeHtml(p);
    } catch (e) {
      console.warn('Aviso HTML', p.slug, e.message);
    }
  });

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  list.forEach((p) => writeI18n(i18n, p));
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(items, {
      id: 'palavra-craque',
      title: 'Craque — excelência no campo; a orelha cola crack e pedra',
      titleEn: 'Craque — pitch excellence; the ear glues crack and pedra',
      titleEs: 'Craque — excelencia en el campo; el oído pega crack y pedra',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: craque ← ing. crack «de primeira»; crack (droga) é outro empréstimo; pedra mineral × pedra-gíria.',
      whyEn: 'Words: craque ← Eng. crack “first-rate”; crack (drug) another loan; mineral vs slang pedra.',
      whyEs: 'Palabras: craque ← ing. crack «de primera»; crack (droga) otro préstamo; pedra mineral × jerga.',
      suggestedSlug: 'inspecao-palavra-craque',
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        'https://pt.wiktionary.org/wiki/craque',
        'https://pt.wiktionary.org/wiki/crack',
        HREF_PEDRA
      ],
      notes: 'Cap. ' + list[0].seriesOrder + ' — par pedra / crack droga.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (craque)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'craque',
        word: 'craque',
        simple:
          'Ing. crack «de primeira» → PT craque (jogador). A orelha cola o crack (droga) e a pedra-gíria. Valeu !!!',
        simpleEn:
          'Eng. crack “first-rate” → PT craque (player). The ear glues crack (drug) and slang pedra. Valeu !!!',
        simpleEs:
          'Ing. crack «de primera» → PT craque (jugador). El oído pega el crack (droga) y la pedra-jerga. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['cravelha', 'criatividade', 'coracao']
    );
    upsertItem(
      items,
      {
        id: 'crack',
        word: 'crack',
        simple:
          'Empréstimo EN da cocaína-base fumada. ≠ craque (jogador). Gíria pedra = naco, não πέτρα. Corte na ficha craque. Valeu !!!',
        simpleEn:
          'English loan for smoked cocaine base. ≠ craque (player). Slang pedra = rock, not πέτρα. Cut on the craque sheet. Valeu !!!',
        simpleEs:
          'Préstamo EN de cocaína-base fumada. ≠ craque (jugador). Jerga pedra = naco, no πέτρα. Corte en la ficha craque. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['craque']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (craque · crack)');
  }

  if (fs.existsSync(DUPLO_FILE)) {
    const duplo = JSON.parse(fs.readFileSync(DUPLO_FILE, 'utf8'));
    const items = Array.isArray(duplo.items) ? duplo.items : [];
    upsertItem(items, {
      id: 'craque',
      word: 'craque',
      original: 'Calque do inglês crack «de primeira» — estrela de ofício (futebol).',
      originalEn: 'Calque of English crack “first-rate” — craft star (football).',
      originalEs: 'Calco del inglés crack «de primera» — estrella de oficio (fútbol).',
      prejudicado: 'Homofonia e grafia popular colam o jogador ao crack (droga) e à pedra-gíria.',
      prejudicadoEn: 'Homophony and popular spelling glue the player to crack (drug) and slang pedra.',
      prejudicadoEs: 'Homofonía y grafía popular pegan el jugador al crack (droga) y a la pedra-jerga.',
      mudanca:
        'O inglês crack parte-se em dois empréstimos BR: craque (excelência) e crack (substância). A pedra mineral (πέτρα) é terceiro mapa — gíria pega o naco, não a geologia.',
      mudancaEn:
        'English crack splits into two BR loans: craque (excellence) and crack (substance). Mineral pedra (πέτρα) is a third map — slang takes the chunk, not geology.',
      mudancaEs:
        'El inglés crack se parte en dos préstamos BR: craque (excelencia) y crack (sustancia). La pedra mineral (πέτρα) es un tercer mapa.',
      href: HREF
    });
    duplo.items = items;
    duplo.updatedAt = new Date().toISOString();
    await writeJsonRetry(DUPLO_FILE, duplo);
    console.log('Duplo sentido actualizado (craque)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(GLOSS_FILE, next, 'utf8');
      console.log('Glossário actualizado (craque · crack)');
    }
  }

  try {
    await syncSql(list);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  try {
    execFileSync(process.execPath, [path.join(__dirname, 'sync-ferramentas-nav.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 60000
    });
  } catch (e) {
    console.warn('Aviso nav', e.message);
  }

  list.forEach((p) => console.log('OK Cap.', p.seriesOrder, p.title));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
