'use strict';

/**
 * Injeta a palavra mtela (em tela × papelão; ≠ tele).
 * Uso: node scripts/upsert-palavra-mtela-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildMtelaPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT_TELA,
  WIKT_TELA_LA,
  WIKT_PAPELAO,
  WIKT_PAPEL,
  WIKT_PAPYRUS,
  WIKT_TEIA,
  WIKI_PAPELAO,
  WIKI_CARDBOARD
} = require('../lib/mtela-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-mtela.html';
const HREF_TELE = '/posts/post-inspecao-palavra-tele.html';

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
    const after = (afterIds || [])
      .map((id) => items.findIndex((x) => x.id === id))
      .find((n) => n >= 0);
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
}

function upsertVidaPoem(vida, entry) {
  const poems = Array.isArray(vida.poems) ? vida.poems : [];
  const i = poems.findIndex((p) => p.id === entry.id || p.slug === entry.slug);
  if (i >= 0) poems[i] = Object.assign({}, poems[i], entry);
  else poems.unshift(entry);
  vida.poems = poems;
  vida.updatedAt = new Date().toISOString();
}

function replaceOrInsertAfter(gloss, key, line, afterKey) {
  const re = new RegExp(
    '    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n'
  );
  if (re.test(gloss)) return gloss.replace(re, line);
  const afterRe = new RegExp(
    '(    ' + afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n)'
  );
  if (afterRe.test(gloss)) return gloss.replace(afterRe, '$1' + line);
  console.warn('Aviso glossário: falhou', key);
  return gloss;
}

function patchGlossary(gloss) {
  const main =
    '    mtela: { tone: "craft", category: "Léxico", mundane: "Smash de campo de «em tela» — ecrã / tela de pintar.", gloss: "mtela = smash de em tela; tela ← lat. tēla (pano → ecrã) × papelão (papel + -ão); ≠ tele (têle); Valeu !!!", href: "' +
    HREF +
    '", en: "mtela (smash of em tela / on screen)", es: "mtela (smash de em tela)", fr: "mtela (em tela)", it: "mtela", de: "mtela", el: "mtela", la: "tēla (via)", yo: "mtela", sw: "mtela", gez: "mtela", nl: "mtela", pl: "mtela", ru: "mtela", uk: "mtela", zh: "mtela", ja: "mtela", ko: "mtela", ar: "mtela", he: "mtela", hi: "mtela", tr: "mtela", sv: "mtela", da: "mtela", no: "mtela", fi: "mtela", cs: "mtela", ro: "mtela", hu: "mtela", ca: "mtela", gl: "mtela", eu: "mtela", gn: "mtela", qu: "mtela", eo: "mtela", vi: "mtela", id: "mtela", th: "mtela", hr: "mtela", sk: "mtela", ga: "mtela", cy: "mtela", ha: "mtela", am: "mtela", fa: "mtela", bn: "mtela", zu: "mtela" },\n';
  gloss = replaceOrInsertAfter(gloss, 'mtela', main, 'mola');
  const aliases = [
    [
      'tela',
      '    tela: { gloss: "Lat. tēla — pano / teia / ecrã; smash de campo mtela = em tela; × papelão (uso, não sangue); ≠ tele (têle); Valeu !!!", href: "' +
        HREF +
        '", en: "screen / canvas", es: "tela" },\n'
    ],
    [
      '"em tela"',
      '    "em tela": { gloss: "Locução — no ecrã / na tela de pintar / em cartaz; smash de campo mtela; ver mtela.", href: "' +
        HREF +
        '", en: "on screen / on canvas", es: "en pantalla / en lienzo" },\n'
    ],
    [
      'papelão',
      '    papelão: { gloss: "Papel + -ão — papel grosso / cartão; cruzado com tela por ofício (superfície / caixa); ≠ étimo de tela; ver mtela.", href: "' +
        HREF +
        '", en: "cardboard", es: "cartón" },\n'
    ],
    [
      'papelao',
      '    papelao: { gloss: "Sem til — lema papelão; papel grosso; ver mtela.", href: "' +
        HREF +
        '", en: "cardboard (unaccented)", es: "cartón (sin tilde)" },\n'
    ],
    [
      '"tela de papelão"',
      '    "tela de papelão": { gloss: "Cartão a fazer de ecrã — relação de ofício, não de sangue; ver mtela.", href: "' +
        HREF +
        '", en: "cardboard screen", es: "pantalla de cartón" },\n'
    ],
    [
      '"fazer um papelão"',
      '    "fazer um papelão": { gloss: "Gíria BR — constranger-se; outra sala de papelão, não o cruzamento com tela; ver mtela.", href: "' +
        HREF +
        '", en: "to make a fool of oneself", es: "hacer un papelón" },\n'
    ]
  ];
  aliases.forEach(([key, line]) => {
    gloss = replaceOrInsertAfter(gloss, key, line, 'mtela');
  });
  return gloss;
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
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-mtela-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildMtelaPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  await writeJsonRetry(POSTS_FILE, posts);

  try {
    writeHtml(post);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(
      items,
      {
        id: 'palavra-mtela',
        title: 'mtela — em tela × papelão; ≠ tele',
        titleEn: 'mtela — em tela × cardboard; ≠ tele',
        titleEs: 'mtela — em tela × cartón; ≠ tele',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: mtela = smash de em tela; tela ← lat. tēla × papelão (papel + -ão); ≠ tele (têle).',
        whyEn: 'Words: mtela = smash of em tela; tela ← Lat. tēla × papelão (cardboard); ≠ tele (têle).',
        whyEs: 'Palabras: mtela = smash de em tela; tela ← lat. tēla × papelão (cartón); ≠ tele (têle).',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT_TELA,
          WIKT_TELA_LA,
          WIKT_PAPELAO,
          WIKT_PAPEL,
          WIKT_PAPYRUS,
          WIKT_TEIA,
          WIKI_PAPELAO,
          WIKI_CARDBOARD,
          HREF_TELE,
          '/posts/post-inspecao-palavra-relacao.html',
          '/posts/post-inspecao-palavra-tenda.html',
          '/posts/post-inspecao-palavra-objetos.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes:
          'Cap. ' +
          post.seriesOrder +
          ' — mtela smash de em tela; cruzamento papelão por ofício; cola tele cortada.'
      },
      ['palavra-tele', 'palavra-tenda', 'palavra-objetos']
    );
    upsertItem(
      items,
      {
        id: 'palavra-tela',
        title: 'Tela — lat. tēla; smash mtela; × papelão',
        titleEn: 'Tela — Lat. tēla; smash mtela; × cardboard',
        titleEs: 'Tela — lat. tēla; smash mtela; × cartón',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Palavras: tela ← lat. tēla (pano → ecrã); smash mtela = em tela; ver ficha mtela.',
        whyEn: 'Words: tela ← Lat. tēla (cloth → screen); smash mtela = em tela; see mtela.',
        whyEs: 'Palabras: tela ← lat. tēla (paño → pantalla); smash mtela = em tela; ver mtela.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [HREF, WIKT_TELA],
        notes: 'Cap. ' + post.seriesOrder + ' — mesma ficha que mtela.'
      },
      ['palavra-mtela']
    );
    upsertItem(
      items,
      {
        id: 'palavra-papelao',
        title: 'Papelão — papel + -ão; cruzado com tela',
        titleEn: 'Papelão — paper + -ão; crossed with tela',
        titleEs: 'Papelão — papel + -ão; cruzado con tela',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Palavras: papelão = papel grosso / cartão; relação de ofício com tela; ver mtela.',
        whyEn: 'Words: papelão = cardboard; office relation with tela; see mtela.',
        whyEs: 'Palabras: papelão = cartón; relación de oficio con tela; ver mtela.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [HREF, WIKT_PAPELAO, WIKI_PAPELAO],
        notes: 'Cap. ' + post.seriesOrder + ' — mesma ficha que mtela.'
      },
      ['palavra-mtela']
    );
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'mtela',
        word: 'mtela',
        simple:
          'Smash de campo de «em tela» (ecrã / tela de pintar). Tela ← lat. tēla. Cruzada com papelão por ofício, não por sangue. ≠ tele. Valeu !!!',
        simpleEn:
          'Field smash of em tela (on screen / on canvas). Tela ← Lat. tēla. Crossed with cardboard by office, not by blood. ≠ tele. Valeu !!!',
        simpleEs:
          'Smash de campo de em tela (en pantalla / en lienzo). Tela ← lat. tēla. Cruzada con cartón por oficio, no por sangre. ≠ tele. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'mtela é rasto de teclado de em tela: a preposição em (lat. in) cola no lema tela. Tela vem do latim tēla, a urdidura / o pano — família de texere (tecer). No português alargou a ecrã, cinema e tela de pintar. Papelão é papel + aumentativo -ão (papel grosso), árvore do lat. papȳrus / gr. πάπυρος. A relação é de superfície que segura imagem (caixa-TV, cartaz, tampão), não de étimo.',
        curiosities:
          'A orelha cola mtela em tela e em tele (têle = longe). O étimo corta as três: pano, prefixo grego, papiro. A criança que desenha um ecrã na caixa de papelão cruza as salas no gesto. Fazer um papelão (constranger-se) é outra sala do vocábulo. Valeu !!!',
        historyEn:
          'mtela is a keyboard trail of em tela: the preposition em (Lat. in) sticks to tela. Tela comes from Latin tēla, the warp / the cloth — family of texere (to weave). In Portuguese it widened to screen, cinema and painting canvas. Papelão is papel + augmentative -ão (thick paper), the tree of Lat. papȳrus / Gr. πάπυρος. The relation is an image-bearing surface (box-TV, poster, light block), not an etymon.',
        curiositiesEn:
          'The ear glues mtela to tela and to tele (têle = far). The etymon cuts the three: cloth, Greek prefix, papyrus. A child who draws a screen on a cardboard box crosses the rooms in gesture. Fazer um papelão (to embarrass oneself) is another room of the word. Valeu !!!',
        historyEs:
          'mtela es rastro de teclado de em tela: la preposición em (lat. in) se pega al lema tela. Tela viene del latín tēla, la urdimbre / el paño — familia de texere (tejer). En portugués se ensanchó a pantalla, cine y lienzo. Papelão es papel + aumentativo -ão (papel grueso), árbol del lat. papȳrus / gr. πάπυρος. La relación es superficie que sostiene imagen, no étimo.',
        curiositiesEs:
          'El oído pega mtela a tela y a tele (têle = lejos). El étimo corta las tres: paño, prefijo griego, papiro. El niño que dibuja una pantalla en la caja de cartón cruza las salas en el gesto. Fazer um papelão (hacer un papelón) es otra sala del vocablo. ¡Valeu !!!'
      },
      ['tele', 'tenda', 'objetos']
    );
    upsertItem(
      items,
      {
        id: 'tela',
        word: 'tela',
        simple:
          'Lat. tēla — pano / teia / ecrã. Smash de campo mtela = em tela. × papelão por ofício. ≠ tele (têle). Valeu !!!',
        simpleEn:
          'Lat. tēla — cloth / web / screen. Field smash mtela = em tela. × cardboard by office. ≠ tele (têle). Valeu !!!',
        simpleEs:
          'Lat. tēla — paño / tela / pantalla. Smash de campo mtela = em tela. × cartón por oficio. ≠ tele (têle). ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['mtela']
    );
    upsertItem(
      items,
      {
        id: 'papelao',
        word: 'papelão',
        simple:
          'Papel + -ão — papel grosso / cartão. Cruzado com tela por ofício (caixa, recorte, TV de papelão). ≠ étimo de tela. Ver mtela. Valeu !!!',
        simpleEn:
          'Paper + -ão — cardboard. Crossed with tela by office (box, cutout, cardboard TV). ≠ etymon of tela. See mtela. Valeu !!!',
        simpleEs:
          'Papel + -ão — cartón. Cruzado con tela por oficio (caja, recorte, TV de cartón). ≠ étimo de tela. Ver mtela. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['mtela']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = patchGlossary(gloss);
    fs.writeFileSync(GLOSS_FILE, gloss);
    console.log('Glossário actualizado');
  }

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'mtela',
      slug: 'mtela',
      title: 'mtela',
      titleEn: 'mtela',
      titleEs: 'mtela',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — mtela é em tela; tela × papelão; ≠ tele; Valeu !!!',
      teaserEn: 'BudGanja echo — mtela is em tela; tela × cardboard; ≠ tele; Valeu !!!',
      teaserEs: 'Eco BudGanja — mtela es em tela; tela × cartón; ≠ tele; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'mtela', 'tela', 'papelao']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poema Vida actualizado');
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
