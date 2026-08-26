'use strict';

/**
 * Injeta a palavra Cilada (lat. cēlāta ← cēlāre).
 * Uso: node scripts/upsert-palavra-cilada-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildCiladaPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT,
  WIKT_EN,
  WIKT_CELADA,
  WIKT_CELO,
  WIKI_TV
} = require('../lib/cilada-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-cilada.html';

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
  const langs =
    'en: "trap / ambush / setup", es: "celada / trampa", fr: "embuscade / piège", it: "imboscata / trappola", de: "Hinterhalt / Falle", el: "ενέδρα", la: "cēlāta / insidiae", yo: "ìkọ̀kọ̀", sw: "tege / vizio", gez: "መፋንን", nl: "hinderlaag / val", pl: "zasadzka / pułapka", ru: "засада", uk: "засідка", zh: "埋伏", ja: "待ち伏せ", ko: "매복", ar: "كمين", he: "מארב", hi: "घात", tr: "pusu / tuzak", sv: "bakhåll / fälla", da: "baghold / fælde", no: "bakhold / felle", fi: "väijytys / ansa", cs: "léčka / past", ro: "capcană / ambuscadă", hu: "csapda / les", ca: "emboscada / parany", gl: "cilada / trampa", eu: "segada / tranpa", gn: "monda", qu: "chinkachiy", eo: "embusko / kaptilo", vi: "mai phục", id: "penyergapan / jebakan", th: "ซุ่มโจมตี", hr: "zasjeda / zamka", sk: "liečka / pasca", ga: "luíochán", cy: "cynllwyn / magl", ha: "kwanton bauna", am: "አድፍጦ", fa: "کمین", bn: "ঘাঁটি", zu: "ukuqamekela"';
  const main =
    '    cilada: { tone: "caution", category: "Léxico", mundane: "Ardil escondido — tocaia, setup, situação-isco.", gloss: "Lat. cēlāta ← cēlāre — esconder para apanhar; tocaia × ardil × situação × ofício (anti-armadilha); ≠ celada ≠ desastre ≠ risco; Valeu !!!", href: "' +
    HREF +
    '", ' +
    langs +
    ' },\n';
  gloss = replaceOrInsertAfter(gloss, 'cilada', main, 'cinzeiro');
  const aliases = [
    [
      'celada',
      '    celada: { gloss: "Elmo / viseira — mesma raiz de cilada (cēlāta); ofício distinto; ver ficha Cilada.", href: "' +
        HREF +
        '", en: "visor / sallet", es: "celada" },\n'
    ],
    [
      'armadilha',
      '    armadilha: { gloss: "Dispositivo / mecanismo — vizinha de cilada (a situação); ver ficha Cilada.", href: "' +
        HREF +
        '", en: "trap (device)", es: "trampa (dispositivo)" },\n'
    ],
    [
      'tocaia',
      '    tocaia: { gloss: "Sala A de cilada — espera escondida; ≠ perseguição; ver ficha Cilada.", href: "' +
        HREF +
        '", en: "ambush / lying in wait", es: "tocaia / acecho" },\n'
    ],
    [
      'emboscada',
      '    emboscada: { gloss: "Sala A de cilada — tocaia de ataque; ver ficha Cilada.", href: "' +
        HREF +
        '", en: "ambush", es: "emboscada" },\n'
    ],
    [
      'ardil',
      '    ardil: { gloss: "Sala B de cilada — o desenho da queda; ver ficha Cilada.", href: "' +
        HREF +
        '", en: "ruse / wile", es: "ardid" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'cilada');
  }
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-cilada-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildCiladaPost());
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
        id: 'palavra-cilada',
        title: 'Cilada — cēlāta, o que se esconde para apanhar',
        titleEn: 'Cilada — cēlāta, what hides in order to catch',
        titleEs: 'Cilada — cēlāta, lo que se esconde para atrapar',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: Cilada ← lat. cēlāta / cēlāre — tocaia × ardil × situação × ofício; ≠ celada ≠ desastre ≠ risco.',
        whyEn: 'Words: Cilada ← Lat. cēlāta / cēlāre — ambush × setup × situation × craft; ≠ helmet ≠ disaster ≠ risk.',
        whyEs: 'Palabras: Cilada ← lat. cēlāta / cēlāre — tocaia × ardid × situación × oficio; ≠ celada ≠ desastre ≠ riesgo.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT,
          WIKT_EN,
          WIKT_CELADA,
          WIKT_CELO,
          WIKI_TV,
          '/posts/post-inspecao-palavra-risco.html',
          '/posts/post-inspecao-palavra-desastre.html',
          '/posts/post-inspecao-palavra-danger.html',
          '/posts/post-inspecao-palavra-verdade.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — ficha-mãe da linha Anti-armadilha; celada/ciliada/selada cortadas; sem manual de golpe.'
      },
      ['palavra-cinzeiro', 'palavra-cinta', 'palavra-risco']
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
        id: 'cilada',
        word: 'cilada',
        simple:
          'Lat. cēlāta ← cēlāre: esconder para apanhar. Quatro salas: tocaia, ardil, situação-isco, ofício (anti-armadilha). ≠ celada (elmo) ≠ desastre ≠ risco. Valeu !!!',
        simpleEn:
          'Lat. cēlāta ← cēlāre: hide in order to catch. Four rooms: ambush, setup, lure-situation, craft (anti-trap). ≠ helmet ≠ disaster ≠ risk. Valeu !!!',
        simpleEs:
          'Lat. cēlāta ← cēlāre: esconder para atrapar. Cuatro salas: tocaia, ardid, situación-cebo, oficio (anti-trampa). ≠ celada (yelmo) ≠ desastre ≠ riesgo. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Do latim cēlāta («coisa oculta»), de cēlāre «esconder». O espanhol celada guardou uma boca para o elmo e para a tocaia. O português cortou: celada = capacete; cilada = ardil.',
        curiosities:
          'A linha Anti-armadilha das fichas do lab é esta palavra em ofício. Conceal (EN) é primo de cēlāre. O programa de TV Cilada é homónimo, não étimo.',
        historyEn:
          'From Latin cēlāta (“something hidden”), from cēlāre “to hide”. Spanish celada kept one mouth for the helmet and the ambush. Portuguese split: celada = helmet; cilada = the snare.',
        curiositiesEn:
          'The lab’s Anti-trap line is this word as craft. English conceal is a cousin of cēlāre. The TV show Cilada is a homonym, not the etymon.',
        historyEs:
          'Del latín cēlāta («cosa oculta»), de cēlāre «esconder». El español celada guardó una boca para el yelmo y la emboscada. El portugués cortó: celada = casco; cilada = el ardid.',
        curiositiesEs:
          'La línea Anti-trampa de las fichas del lab es esta palabra en oficio. Conceal (EN) es primo de cēlāre. El programa de TV Cilada es homónimo, no étimo.'
      },
      ['cinzeiro', 'cinta', 'risco']
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
      id: 'cilada',
      slug: 'cilada',
      title: 'Cilada',
      titleEn: 'Cilada',
      titleEs: 'Cilada',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — cilada espera; desastre cai; ≠ celada; Valeu !!!',
      teaserEn: 'BudGanja echo — the trap waits; disaster falls; ≠ helmet; Valeu !!!',
      teaserEs: 'Eco BudGanja — la cilada espera; el desastre cae; ≠ celada; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'cilada', 'armadilha', 'tocaia']
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
