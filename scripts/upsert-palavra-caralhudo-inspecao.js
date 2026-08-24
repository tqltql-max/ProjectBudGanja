'use strict';

/**
 * Injeta a palavra caralhudo cruzada com cara de alho e cara de olho (olaho).
 * Uso: node scripts/upsert-palavra-caralhudo-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildCaralhudoPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT_CARALHUDO,
  WIKT_CARALHO,
  WIKT_ALHO,
  WIKT_OLHO
} = require('../lib/caralhudo-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-caralhudo.html';

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
  if (!post.filename) post.filename = 'posts/post-inspecao-palavra-caralhudo.html';
  if (!post.url) post.url = HREF;
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
    '    caralhudo: { tone: "caution", category: "Léxico", mundane: "Adjectivo BR de tamanho / intensidade — caralho + -udo.", gloss: "Caralho + -udo (lat. -ūtus); cruzar com cara de alho (trocadilho, não étimo) e cara de olho (visual); olaho = cola olho×alho; ≠ insulto como ofício; Valeu !!!", href: "' +
    HREF +
    '", en: "huge / damned (vulgar intensifier)", es: "cojonudo / enorme", fr: "vachement grand", it: "enorme (volg.)", de: "verdammt groß", el: "τεράστιος (χυδ.)", la: "ingens", yo: "ńlá", sw: "kubwa sana", gez: "ዓቢይ", nl: "reuze / verdomd groot", pl: "cholernie wielki", ru: "здоровый (груб.)", uk: "здоровезний", zh: "巨大（粗口）", ja: "とんでもなく大きい", ko: "엄청나다 (속어)", ar: "ضخم (سوقي)", he: "ענק (גס)", hi: "बहुत बड़ा (अश्लील)", tr: "kocaman (kaba)", sv: "jävligt stor", da: "pisse stor", no: "jævlig stor", fi: "helvetin suuri", cs: "sakra velky", ro: "nasol de mare", hu: "kurva nagy", ca: "enorme (vulgar)", gl: "caralludo", eu: "izugarrizko", gn: "tuichaitere", qu: "hatun", eo: "ege granda", vi: "to den kinh", id: "gede banget", th: "ใหญ่โต (หยาบ)", hr: "prokleti velik", sk: "sakramentsky velky", ga: "an-mhor", cy: "mawr iawn", ha: "kato", am: "ትልቅ", fa: "گنده", bn: "বিশাল", zu: "khulu kakhulu" },\n';
  gloss = replaceOrInsertAfter(gloss, 'caralhudo', main, 'trocadilho');
  const aliases = [
    [
      'caralhuda',
      '    caralhuda: { gloss: "Feminino de caralhudo — o mesmo ofício de tamanho; ver caralhudo.", href: "' +
        HREF +
        '", en: "huge (fem.)", es: "cojonuda / enorme" },\n'
    ],
    [
      'caralho',
      '    caralho: { tone: "caution", gloss: "Lat. caraculum (estaca) → náutica → tabu; cara+alho é trocadilho, não étimo; o adjectivo desta casa é caralhudo; Valeu !!!", href: "' +
        HREF +
        '", en: "swear / tabu (PT)", es: "carajo" },\n'
    ],
    [
      '"cara de alho"',
      '    "cara de alho": { gloss: "Trocadilho cara+alho — leitura da base tabu; não é étimo de caralhudo; ver caralhudo e trocadilho.", href: "' +
        HREF +
        '", en: "garlic-face pun", es: "cara de ajo" },\n'
    ],
    [
      '"cara de olho"',
      '    "cara de olho": { gloss: "Visual do pedido — um rosto que é (ou tem) um olho; cruzado com caralhudo; olaho = cola; ver caralhudo.", href: "' +
        HREF +
        '", en: "eye-face", es: "cara de ojo" },\n'
    ],
    [
      'olaho',
      '    olaho: { gloss: "Grafia de campo — a orelha entre olho (oculus) e alho (allium); cola, não lema; ver caralhudo.", href: "' +
        HREF +
        '", en: "olho×alho field spelling", es: "ojo×ajo (grafía de campo)" },\n'
    ],
    [
      '-udo',
      '    "-udo": { gloss: "Sufixo PT ← lat. -ūtus — ter muito (barbudo, sortudo); em caralhudo mede tamanho sobre a base tabu; ver caralhudo.", href: "' +
        HREF +
        '", en: "-udo suffix (having a lot)", es: "sufijo -udo" },\n'
    ],
    [
      'alho',
      '    alho: { gloss: "Lat. allium — Allium sativum; peça do trocadilho cara+alho, não étimo de caralho; ver caralhudo e trocadilho.", href: "' +
        HREF +
        '", en: "garlic", es: "ajo" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'caralhudo');
  }
  return gloss;
}

async function syncSql(post) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase().trim() === 'fs') return;
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-caralhudo-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildCaralhudoPost());
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
        id: 'palavra-caralhudo',
        title: 'Caralhudo — -udo no tabu; cruzar com cara de alho e cara de olho',
        titleEn: 'Caralhudo — -udo on the taboo; cross with garlic-face and eye-face',
        titleEs: 'Caralhudo — -udo en el tabú; cruzar con cara de ajo y cara de ojo',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Palavras: caralhudo (caralho + -udo) × cara de alho (trocadilho, não étimo) × cara de olho (visual); olaho = cola.',
        whyEn: 'Words: caralhudo (caralho + -udo) × garlic-face (pun, not etymon) × eye-face (visual); olaho = glue.',
        whyEs: 'Palabras: caralhudo (caralho + -udo) × cara de ajo (calambur, no étimo) × cara de ojo (visual); olaho = cola.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT_CARALHUDO,
          WIKT_CARALHO,
          WIKT_ALHO,
          WIKT_OLHO,
          'https://en.wiktionary.org/wiki/caraculum',
          'https://pt.wiktionary.org/wiki/-udo',
          '/posts/post-inspecao-palavra-trocadilho.html',
          '/posts/post-inspecao-palavra-aglutinacao.html',
          '/posts/post-inspecao-palavra-etimologia.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes:
          'Cap. ' +
          post.seriesOrder +
          ' — pedido: inspeção em caralahdo cruze com cara de olaho; três salas; ficha ≠ insulto.'
      },
      ['palavra-trocadilho', 'palavra-aglutinacao', 'palavra-etimologia']
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
        id: 'caralhudo',
        word: 'caralhudo',
        simple:
          'Caralho + -udo (lat. -ūtus) — adjectivo BR de tamanho / intensidade. Cruzado com cara de alho (trocadilho, não étimo) e cara de olho (visual). Olaho = cola olho×alho. Valeu !!!',
        simpleEn:
          'Caralho + -udo (Lat. -ūtus) — BR adjective of size / intensity. Crossed with garlic-face (pun, not etymon) and eye-face (visual). Olaho = olho×alho glue. Valeu !!!',
        simpleEs:
          'Caralho + -udo (lat. -ūtus) — adjetivo BR de tamaño / intensidad. Cruzado con cara de ajo (calambur, no étimo) y cara de ojo (visual). Olaho = cola ojo×ajo. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Caralhudo junta a base tabu caralho (hipótese dominante: lat. caraculum, estaca, via náutica) ao sufixo -udo (lat. -ūtus: ter muito — barbudo, sortudo). Cara+alho é trocadilho e etimologia popular: a terceira forma já existia. Cara de olho é o visual do pedido de campo (olaho = orelha entre olho e alho).',
        curiosities:
          'O sufixo -udo não é pejorativo por si (sortudo). O tabu vem da base. Intensificador («um som caralhudo») mede volume; não é licença de humilhar. A capa com olho no alho ilustra o pedido, não a genealogia.',
        historyEn:
          'Caralhudo joins the taboo base caralho (working etymon: Lat. caraculum, a stake, via nautical use) to the suffix -udo (Lat. -ūtus: having a lot). Cara+alho is a pun and folk etymology. Eye-face is the field visual; olaho is the ear between olho and alho.',
        curiositiesEn:
          'The suffix -udo is not pejorative by itself (sortudo). The taboo is in the base. As an intensifier it measures size; it is not a licence to humiliate. The garlic-eye cover illustrates the request, not the genealogy.',
        historyEs:
          'Caralhudo junta la base tabú caralho (hipótesis dominante: lat. caraculum, estaca, vía náutica) al sufijo -udo (lat. -ūtus). Cara+alho es calambur y etimología popular. Cara de ojo es el visual del pedido; olaho es el oído entre ojo y ajo.',
        curiositiesEs:
          'El sufijo -udo no es peyorativo por sí (sortudo). El tabú viene de la base. Como intensificador mide volumen; no es licencia para humillar.'
      },
      ['trocadilho', 'aglutinacao', 'etimologia']
    );
    upsertItem(
      items,
      {
        id: 'olaho',
        word: 'olaho',
        simple:
          'Grafia de campo — a orelha entre olho (lat. oculus) e alho (lat. allium). Cola, não lema. Vive na ficha caralhudo. Valeu !!!',
        simpleEn:
          'Field spelling — the ear between olho (Lat. oculus) and alho (Lat. allium). Glue, not a headword. Lives on the caralhudo sheet. Valeu !!!',
        simpleEs:
          'Grafía de campo — el oído entre olho (lat. oculus) y alho (lat. allium). Cola, no lema. Vive en la ficha caralhudo. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['caralhudo']
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
      id: 'caralhudo',
      slug: 'caralhudo',
      title: 'Caralhudo',
      titleEn: 'Caralhudo',
      titleEs: 'Caralhudo',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'Eco BudGanja — -udo no tabu; cara de alho é piada, cara de olho é o visual; olaho no meio; Valeu !!!',
      teaserEn:
        'BudGanja echo — -udo on the taboo; garlic-face is the joke, eye-face is the visual; olaho in between; Valeu !!!',
      teaserEs:
        'Eco BudGanja — -udo en el tabú; cara de ajo es el juego, cara de ojo es el visual; olaho en el medio; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'caralhudo', 'alho', 'olho', 'trocadilho']
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
