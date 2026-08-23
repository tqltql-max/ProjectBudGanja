'use strict';

/**
 * Injeta a palavra «México» (inspeção especial; cola golfo/golfe/gongo/Congo).
 * Uso: node scripts/upsert-palavra-mexico-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildMexicoPost } = require('../lib/mexico-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-mexico.html';

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

const ZU_TAIL = /zu:\s*"[^"]*"\s*\},?\r?\n/;

function insertAfterKey(gloss, key, block) {
  const re = new RegExp(
    '(    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?' + ZU_TAIL.source + ')'
  );
  if (!re.test(gloss)) return null;
  return gloss.replace(re, '$1' + block);
}

function patchGlossary(gloss, mainKey, mainLine, aliases, afterKey) {
  if (new RegExp('    ' + mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{').test(gloss)) {
    gloss = gloss.replace(
      new RegExp('    ' + mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},'),
      mainLine.trimEnd().replace(/,$/, '') + ','
    );
  } else {
    const inserted = insertAfterKey(gloss, afterKey, mainLine + aliases);
    if (inserted) gloss = inserted;
    else console.warn('Aviso: glossário — inserção falhou para', mainKey);
  }
  return gloss;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'palavra-mexico';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'México — país, golfo, golfe; lapsus gosfo / coongo / gongo',
    titleEn: 'México — country, gulf, golf; slips gosfo / coongo / gongo',
    titleEs: 'México — país, golfo, golf; lapsus gosfo / coongo / gongo',
    tipo: 'palavra',
    priority: 2,
    status: 'feita',
    why: 'Palavras: México (Mēxihco) — país ≠ golfo ≠ golfe ≠ gongo ≠ Congo; Valeu !!!',
    whyEn: 'Words: México (Mēxihco) — country ≠ gulf ≠ golf ≠ gong ≠ Congo; Valeu !!!',
    whyEs: 'Palabras: México (Mēxihco) — país ≠ golfo ≠ golf ≠ gongo ≠ Congo; ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'palavras-origem',
    sources: [
      post.sourceUrl,
      'https://pt.wiktionary.org/wiki/M%C3%A9xico',
      'https://pt.wikipedia.org/wiki/Golfo_do_M%C3%A9xico',
      '/posts/post-inspecao-planta-abacate.html',
      '/posts/post-inspecao-serie-chaves-el-chavo.html',
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — inspeção especial do país; cola golfo/golfe/gongo/Congo.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entries = [
    {
      id: 'mexico',
      word: 'México',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        'Náuatle Mēxihco — o país; golfo toma o nome; ≠ golfe ≠ gongo ≠ Congo; gosfo→golfo; Valeu !!!',
      simpleEn:
        'Nahuatl Mēxihco — the country; the gulf borrows the name; ≠ golf ≠ gong ≠ Congo; Valeu !!!',
      simpleEs:
        'Náhuatl Mēxihco — el país; el golfo toma el nombre; ≠ golf ≠ gongo ≠ Congo; ¡Valeu !!!',
      history:
        'México vem do náuatle Mēxihco (lugar dos Mexica), via castelhano. O Golfo do México herda o nome; não é o Estado inteiro.',
      curiosities:
        'Pedido especial de campo, com lapsus gosfo / coongo / gongo e o jogo golfe. A orelha cola; o étimo corta cinco salas.',
      historyEn:
        'Portuguese México comes from Nahuatl Mēxihco (place of the Mexica), via Spanish. The Gulf of Mexico inherits the name; it is not the whole State.',
      curiositiesEn:
        'Special field request, with slips gosfo / coongo / gongo and the sport golf. The ear glues; etymology cuts five rooms.',
      historyEs:
        'México viene del náhuatl Mēxihco (lugar de los Mexica), vía castellano. El Golfo de México hereda el nombre; no es todo el Estado.',
      curiositiesEs:
        'Pedido especial de campo, con lapsus gosfo / coongo / gongo y el deporte golf. La oreja pega; el étimo corta cinco salas.'
    },
    {
      id: 'golfo',
      word: 'golfo',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        'Mar / enseada (gr. κόλπος) — o Golfo do México empresta o nome do país; ≠ golfe; Valeu !!!',
      simpleEn:
        'Gulf (Gk. kolpos) — the Gulf of Mexico borrows the country’s name; ≠ golf; Valeu !!!',
      simpleEs:
        'Golfo (gr. κόλπος) — el Golfo de México toma el nombre del país; ≠ golf; ¡Valeu !!!',
      history:
        'Golfo vem, via italiano/latim, do grego κόλπος (seio, enseada). Não é o desporto golfe nem o país México.',
      curiosities:
        'Lapso gosfo perde o l. Coongo cola Congo. Ver ficha México.',
      historyEn:
        'Portuguese golfo comes, via Italian/Latin, from Greek κόλπος (bosom, bay). It is not the sport golf nor the country Mexico.',
      curiositiesEn:
        'The slip gosfo loses the l. Coongo glues Congo. See the México sheet.',
      historyEs:
        'Golfo viene, vía italiano/latín, del griego κόλπος. No es el deporte golf ni el país México.',
      curiositiesEs:
        'El lapsus gosfo pierde la l. Coongo pega Congo. Ver la ficha México.'
    },
    {
      id: 'golfe',
      word: 'golfe',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        'Desporto ← ing. golf (Escócia) — taco e percurso; ≠ golfo (mar) ≠ México; Valeu !!!',
      simpleEn:
        'Sport ← Eng. golf (Scotland) — club and course; ≠ gulf ≠ Mexico; Valeu !!!',
      simpleEs:
        'Deporte ← ing. golf (Escocia) — palo y campo; ≠ golfo ≠ México; ¡Valeu !!!',
      history:
        'Golfe é empréstimo do inglês golf. A orelha cola em golfo por uma letra. O étimo não cola.',
      curiosities:
        'Pedido: inspeção do jogo golfe. Não é caderno de videojogo. Ver México.',
      historyEn:
        'Portuguese golfe is a loan from English golf. The ear glues it to golfo by one letter. The etymon does not.',
      curiositiesEn:
        'Request: inspect the game of golf. Not a video-game notebook. See México.',
      historyEs:
        'Golfe es préstamo del inglés golf. La oreja lo pega a golfo por una letra. El étimo no.',
      curiositiesEs:
        'Pedido: inspección del juego golf. No es cuaderno de videojuego. Ver México.'
    }
  ];
  for (const entry of entries.slice().reverse()) {
    const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'paraguai');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'generate-mexico-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE)
    ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'))
    : { items: [] };
  const guia = fs.existsSync(GUIA_FILE)
    ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'))
    : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';

  const post = stampFiles(buildMexicoPost());
  upsertPost(posts, post);
  writeHtml(post);
  writeI18n(i18n, post);
  upsertSug(sug, post);
  upsertGuia(guia);

  if (gloss) {
    gloss = patchGlossary(
      gloss,
      'mexico',
      '    mexico: { tone: "warm", category: "País", mundane: "Estados Unidos Mexicanos — o país; náuatle Mēxihco.", gloss: "Mēxihco → México — país ≠ golfo ≠ golfe ≠ gongo ≠ Congo; gosfo→golfo; Valeu !!!", href: "' +
        HREF +
        '", en: "Mexico", es: "México", fr: "Mexique", it: "Messico", de: "Mexiko", el: "Μεξικό", la: "Mexicum", yo: "Mexico", sw: "Meksiko", gez: "Meksiko", nl: "Mexico", pl: "Meksyk", ru: "Мексика", uk: "Мексика", zh: "墨西哥", ja: "メキシコ", ko: "멕시코", ar: "المكسيك", he: "מקסיקו", hi: "मेक्सिको", tr: "Meksika", sv: "Mexiko", da: "Mexico", no: "Mexico", fi: "Meksiko", cs: "Mexiko", ro: "Mexic", hu: "Mexikó", ca: "Mèxic", gl: "México", eu: "Mexiko", gn: "Méjiko", qu: "Mishiku", eo: "Meksiko", vi: "México", id: "Meksiko", th: "เม็กซิโก", hr: "Meksiko", sk: "Mexiko", ga: "Meicsiceo", cy: "Mecsico", ha: "Meksiko", am: "ሜክሲኮ", fa: "مکزیک", bn: "মেক্সিকো", zu: "iMexico" },\n',
      '    "México": { gloss: "Grafia com acento — o mesmo país; ver mexico.", href: "' +
        HREF +
        '", en: "Mexico", es: "México" },\n' +
        '    golfo: { tone: "caution", category: "Mar", mundane: "Enseada / golfo — o Golfo do México toma o nome do país.", gloss: "Gr. κόλπος — ≠ golfe (jogo) ≠ México (país); lapso gosfo; Valeu !!!", href: "' +
        HREF +
        '", en: "gulf", es: "golfo" },\n' +
        '    golfe: { tone: "caution", category: "Jogo", mundane: "Desporto de taco e bola (Escócia).", gloss: "Ing. golf → PT golfe — ≠ golfo (mar) ≠ México; Valeu !!!", href: "' +
        HREF +
        '", en: "golf", es: "golf" },\n' +
        '    gongo: { gloss: "Instrumento de percussão (malaio gong) — ≠ golfo; ver México.", href: "' +
        HREF +
        '", en: "gong", es: "gong" },\n' +
        '    congo: { gloss: "África (rio / países) — ≠ México; a orelha cola coongo; ver México e maconha.", href: "' +
        HREF +
        '", en: "Congo", es: "Congo" },\n' +
        '    gosfo: { gloss: "Lapso de golfo — ver México / golfo do México.", href: "' +
        HREF +
        '", en: "slip for golfo", es: "lapsus de golfo" },\n' +
        '    coongo: { gloss: "Lapso de golfo que cola Congo — ver México.", href: "' +
        HREF +
        '", en: "slip for golfo / Congo", es: "lapsus de golfo / Congo" },\n' +
        '    "golfo do mexico": { gloss: "Bacia que toma o nome — ≠ o país inteiro; ver México.", href: "' +
        HREF +
        '", en: "Gulf of Mexico", es: "Golfo de México" },\n',
      'paraguai'
    );
  }

  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  sug.updatedAt = new Date().toISOString();
  await writeJsonRetry(SUG_FILE, sug);
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(GUIA_FILE, guia);
  if (gloss) {
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado (México)');
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
