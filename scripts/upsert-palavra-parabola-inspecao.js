'use strict';

/**
 * Injeta a palavra parábola (lat. parabola ← gr. parabolḗ).
 * Uso: node scripts/upsert-palavra-parabola-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildParabolaPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT,
  WIKT_LA,
  WIKT_GR,
  WIKT_EN_CURVE,
  WIKT_EN_STORY
} = require('../lib/parabola-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-parabola.html';

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
    'en: "parable / parabola", es: "parábola", fr: "parabole", it: "parabola", de: "Parabel / Parabel", el: "παραβολή", la: "parabola", yo: "àpèjúwe", sw: "mfano", gez: "mesalē", nl: "parabel / parabool", pl: "przypowieść / parabola", ru: "притча / парабола", uk: "притча / парабола", zh: "寓言 / 抛物线", ja: "たとえ話 / 放物線", ko: "비유 / 포물선", ar: "مثل / قطع مكافئ", he: "משל / פרבולה", hi: "दृष्टांत / परवलय", tr: "mesel / parabol", sv: "liknelse / parabel", da: "lignelse / parabel", no: "lignelse / parabel", fi: "vertaus / paraabeli", cs: "podobenství / parabola", ro: "pildă / parabolă", hu: "példázat / parabola", ca: "paràbola", gl: "parábola", eu: "parabola", gn: "mombe\'u / parabola", qu: "rikuchiy / parabola", eo: "parabolo", vi: "dụ ngôn / parabol", id: "perumpamaan / parabola", th: "อุปมา / พาราโบลา", hr: "prispodoba / parabola", sk: "podobenstvo / parabola", ga: "parabail", cy: "dammeg / parabol", ha: "misali", am: "ምሳሌ", fa: "مَثَل / سهمی", bn: "উপমা / পরাবৃত্ত", zu: "umzekeliso"';
  const main =
    '    parábola: { tone: "craft", category: "Léxico", mundane: "História que compara; também a curva (foco e directriz).", gloss: "Gr. parabolḗ «lançar ao lado» → lat. parabola → PT parábola — narrativa × curva na mesma página; filha palavra noutra ficha; EN parable × parabola; Valeu !!!", href: "' +
    HREF +
    '", ' +
    langs +
    ' },\n';
  gloss = replaceOrInsertAfter(gloss, 'parábola', main, 'palavra');
  const aliases = [
    [
      'parabola',
      '    parabola: { gloss: "Latim / EN da curva / lapso sem acento de parábola — ver ficha (duas salas).", href: "' +
        HREF +
        '", en: "parabola (curve) / parable (story)", es: "parábola" },\n'
    ],
    [
      'parábolas',
      '    parábolas: { gloss: "Plural — estudar narrativa e curva na ficha parábola.", href: "' +
        HREF +
        '", en: "parables / parabolas", es: "parábolas" },\n'
    ],
    [
      'parable',
      '    parable: { gloss: "EN da sala narrativa de parábola — não é a curva (parabola); ver ficha.", href: "' +
        HREF +
        '", en: "parable", es: "parábola (relato)" },\n'
    ],
    [
      'parabole',
      '    parabole: { gloss: "FR de parábola (história e curva); ver ficha.", href: "' +
        HREF +
        '", en: "parable / parabola (FR parabole)", es: "parábola" },\n'
    ],
    [
      'parabólica',
      '    parabólica: { gloss: "Adjectivo da curva (antena, trajectória); sala B da ficha parábola.", href: "' +
        HREF +
        '", en: "parabolic", es: "parabólica" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'parábola');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-parabola-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildParabolaPost());
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
        id: 'palavra-parabola',
        title: 'Parábola — lançar ao lado; latim e português na mesma página',
        titleEn: 'Parábola — throw beside; Latin and Portuguese on the same page',
        titleEs: 'Parábola — lanzar al lado; latín y portugués en la misma página',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: parábola ← lat. parabola ← gr. parabolḗ — página de estudo (narrativa × curva); filha palavra noutra ficha; EN parable × parabola.',
        whyEn: 'Words: parábola ← Lat. parabola ← Gk. parabolḗ — study page (story × curve); daughter palavra elsewhere; EN parable × parabola.',
        whyEs: 'Palabras: parábola ← lat. parabola ← gr. parabolḗ — página de estudio (narrativa × curva); hija palavra en otra ficha; EN parable × parabola.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT,
          WIKT_LA,
          WIKT_GR,
          WIKT_EN_CURVE,
          WIKT_EN_STORY,
          '/posts/post-inspecao-palavra-palavra.html',
          '/posts/post-inspecao-palavra-latim.html',
          '/posts/post-inspecao-palavra-etimologia.html',
          '/posts/post-inspecao-palavra-lemniscata.html',
          '/posts/post-inspecao-arte-o-alquimista.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — uma página latim+PT; duas salas; sem catecismo nem caderno de cónicas.'
      },
      ['palavra-palavra', 'palavra-etimologia', 'palavra-latim']
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
        id: 'parabola',
        word: 'parábola',
        simple:
          'Gr. parabolḗ «lançar ao lado» → lat. parabola → PT parábola. Duas salas na mesma página: história que compara e curva (foco / directriz). Filha palavra = outra ficha. EN parable × parabola. Valeu !!!',
        simpleEn:
          'Gk. parabolḗ “throw beside” → Lat. parabola → PT parábola. Two rooms on one page: the comparing story and the curve (focus / directrix). Daughter palavra = another sheet. EN parable × parabola. Valeu !!!',
        simpleEs:
          'Gr. parabolḗ «lanzar al lado» → lat. parabola → PT parábola. Dos salas en la misma página: historia que compara y curva (foco / directriz). Hija palavra = otra ficha. EN parable × parabola. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Do grego parabolḗ (para- «ao lado» + bállein «lançar») entra o latim parabola: comparação, fala, história que ensina. O português guarda parábola para a narrativa e para a cónica; a filha palavra especializou-se em vocábulo. O inglês corta: parable × parabola.',
        curiosities:
          'A antena parabólica usa a propriedade do foco; o laboratório usa «parábola» em Artes como comparação metódica (não cosmologia). A lemniscata é outra curva. Hipérbole e elipse têm o mesmo fork duplo — salas futuras.',
        historyEn:
          'From Greek parabolḗ (para- “beside” + bállein “to throw”) Latin parabola takes comparison, speech, teaching story. Portuguese keeps parábola for both the narrative and the conic; daughter palavra specialised as “word”. English splits: parable × parabola.',
        curiositiesEn:
          'A dish antenna uses the focus property; the lab uses “parable” in Arts as methodical comparison (not cosmology). The lemniscate is another curve. Hyperbola and ellipse share the same double fork — future rooms.',
        historyEs:
          'Del griego parabolḗ (para- «al lado» + bállein «lanzar») el latín parabola toma comparación, habla, historia que enseña. El portugués guarda parábola para la narrativa y la cónica; la hija palavra se especializó en vocablo. El inglés corta: parable × parabola.',
        curiositiesEs:
          'La antena parabólica usa la propiedad del foco; el laboratorio usa «parábola» en Artes como comparación metódica. La lemniscata es otra curva. Hipérbola y elipse tienen el mismo fork — salas futuras.'
      },
      ['etimologia', 'etimo', 'latim']
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
      id: 'parabola',
      slug: 'parabola',
      title: 'Parábola',
      titleEn: 'Parábola',
      titleEs: 'Parábola',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — lançar ao lado; narrativa e curva na mesma página; Valeu !!!',
      teaserEn: 'BudGanja echo — throw beside; story and curve on one page; Valeu !!!',
      teaserEs: 'Eco BudGanja — lanzar al lado; narrativa y curva en la misma página; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'parabola', 'parabola', 'palavra']
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
