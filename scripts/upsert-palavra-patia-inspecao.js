'use strict';

/**
 * Injeta a palavra Patia / -patia (gr. páthos · -pátheia).
 * Uso: node scripts/upsert-palavra-patia-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildPatiaPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT,
  WIKT_EN,
  WIKT_GR,
  WIKT_GR_SFX,
  WIKI_GEO
} = require('../lib/patia-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-patia.html';

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
    'en: "-pathy", es: "-patía", fr: "-pathie", it: "-patia", de: "-pathie", el: "-πάθεια", la: "-pathia", yo: "-pathy", sw: "-pathy", gez: "-pathy", nl: "-pathie", pl: "-patia", ru: "-патия", uk: "-патія", zh: "-病 / -感", ja: "-パシー", ko: "-패시", ar: "-باثيا", he: "-פתיה", hi: "-पैथी", tr: "-pati", sv: "-pati", da: "-pati", no: "-pati", fi: "-patia", cs: "-patie", ro: "-patie", hu: "-pátia", ca: "-patia", gl: "-patía", eu: "-patia", gn: "-patia", qu: "-patia", eo: "-patio", vi: "-pathy", id: "-pati", th: "-พาที", hr: "-patija", sk: "-patia", ga: "-paite", cy: "-pathi", ha: "-pathy", am: "-ፓቲ", fa: "-پاتی", bn: "-প্যাথি", zu: "-pathy"';
  const main =
    '    patia: { tone: "craft", category: "Léxico", mundane: "Sufixo culto: sentir, sofrer, escola ou planta.", gloss: "Gr. páthos → -pátheia → PT -patia — afecto × doença × escola × alelopatia; ≠ pato ≠ pátria; Valeu !!!", href: "' +
    HREF +
    '", ' +
    langs +
    ' },\n';
  gloss = replaceOrInsertAfter(gloss, 'patia', main, 'pato');
  const aliases = [
    [
      '-patia',
      '    "-patia": { gloss: "Sufixo culto ← gr. páthos — ver ficha Patia (quatro salas).", href: "' +
        HREF +
        '", en: "-pathy", es: "-patía" },\n'
    ],
    [
      'pathos',
      '    pathos: { gloss: "Gr. páthos — sentir / sofrer; a peça nua da ficha Patia.", href: "' +
        HREF +
        '", en: "pathos", es: "pathos" },\n'
    ],
    [
      'empatia',
      '    empatia: { gloss: "Sala A de -patia: sentir dentro (en- + páthos); ≠ simpatia; ver ficha Patia.", href: "' +
        HREF +
        '", en: "empathy", es: "empatía" },\n'
    ],
    [
      'simpatia',
      '    simpatia: { gloss: "Sala A de -patia: sentir com (syn- + páthos); ≠ empatia; ver ficha Patia.", href: "' +
        HREF +
        '", en: "sympathy", es: "simpatía" },\n'
    ],
    [
      'apatia',
      '    apatia: { gloss: "Sala A de -patia: a- privativo + páthos; nome, não insulto clínico da ficha.", href: "' +
        HREF +
        '", en: "apathy", es: "apatía" },\n'
    ],
    [
      'homeopatia',
      '    homeopatia: { gloss: "Sala C de -patia: escola do símile; ≠ fitoterapia ≠ doença; ver ficha Patia.", href: "' +
        HREF +
        '", en: "homeopathy", es: "homeopatía" },\n'
    ],
    [
      'alopatia',
      '    alopatia: { gloss: "Sala C de -patia: nome histórico da medicina dos contrários; ver ficha Patia.", href: "' +
        HREF +
        '", en: "allopathy", es: "alopatía" },\n'
    ],
    [
      'neuropatia',
      '    neuropatia: { gloss: "Sala B de -patia: padecimento do nervo — nome, não protocolo; ver ficha Patia.", href: "' +
        HREF +
        '", en: "neuropathy", es: "neuropatía" },\n'
    ],
    [
      'patologia',
      '    patologia: { gloss: "páthos + lógos — estudo / quadro; irmã do sufixo, ficha Patia.", href: "' +
        HREF +
        '", en: "pathology", es: "patología" },\n'
    ],
    [
      'alelopatia',
      '    alelopatia: { gloss: "Sala D de -patia: química entre plantas; nome, não receita; ver ficha Patia.", href: "' +
        HREF +
        '", en: "allelopathy", es: "alelopatía" },\n'
    ],
    [
      'telepatia',
      '    telepatia: { gloss: "Sala A de -patia: têle- + páthos — nome cultural, não evidência; ver ficha Patia.", href: "' +
        HREF +
        '", en: "telepathy", es: "telepatía" },\n'
    ],
    [
      'patía',
      '    patía: { gloss: "ES -patía / homónimo geográfico Patía (Cauca) — ver ficha Patia.", href: "' +
        HREF +
        '", en: "-pathy / Patía", es: "patía" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'patia');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-patia-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildPatiaPost());
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
        id: 'palavra-patia',
        title: 'Patia — -patia ← páthos; quatro salas',
        titleEn: 'Patia — -patia ← páthos; four rooms',
        titleEs: 'Patia — -patia ← páthos; cuatro salas',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: Patia / -patia ← gr. páthos · -pátheia — afecto × doença × escola × alelopatia; ≠ pato ≠ pátria.',
        whyEn: 'Words: Patia / -patia ← Gk. páthos · -pátheia — feeling × disease × school × allelopathy; ≠ duck ≠ fatherland.',
        whyEs: 'Palabras: Patia / -patia ← gr. páthos · -pátheia — afecto × enfermedad × escuela × alelopatía; ≠ pato ≠ patria.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT,
          WIKT_EN,
          WIKT_GR,
          WIKT_GR_SFX,
          WIKI_GEO,
          '/posts/post-inspecao-palavra-pato.html',
          '/posts/post-inspecao-palavra-emocao.html',
          '/posts/post-inspecao-palavra-etimo.html',
          '/posts/post-inspecao-palavra-etimologia.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — sufixo culto; quatro salas; pato/pátria cortados; sem protocolo clínico.'
      },
      ['palavra-parabola', 'palavra-etimo', 'palavra-etimologia']
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
        id: 'patia',
        word: 'patia',
        simple:
          'Gr. páthos → -pátheia → PT -patia. Quatro salas: afecto (empatia), doença (neuropatia), escola (homeopatia), planta (alelopatia). ≠ pato ≠ pátria. Valeu !!!',
        simpleEn:
          'Gk. páthos → -pátheia → PT -patia. Four rooms: feeling (empathy), disease (neuropathy), school (homeopathy), plant (allelopathy). ≠ duck ≠ fatherland. Valeu !!!',
        simpleEs:
          'Gr. páthos → -pátheia → PT -patia. Cuatro salas: afecto (empatía), enfermedad (neuropatía), escuela (homeopatía), planta (alelopatía). ≠ pato ≠ patria. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Do grego páthos (sentir, sofrer, ser afectado) entra o sufixo culto -pátheia. O português guarda -patia numa só boca para quatro ofícios. O latim patī (paciência) é primo, não o pai. Pato, pátria e pátio são colas da orelha.',
        curiosities:
          'Empatia sente dentro; simpatia sente com. Homeopatia é escola, não doença. Alelopatia é química entre plantas, não empatia vegetal. Patía (Cauca) é homónimo geográfico.',
        historyEn:
          'From Greek páthos (to feel, to suffer, to be affected) comes the learned suffix -pátheia. Portuguese keeps -patia in one mouth for four crafts. Latin patī (patience) is a cousin, not the father. Duck, fatherland and courtyard are ear-glue.',
        curiositiesEn:
          'Empathy feels inward; sympathy feels with. Homeopathy is a school, not a disease. Allelopathy is chemistry between plants, not plant empathy. Patía (Cauca) is a geographic homonym.',
        historyEs:
          'Del griego páthos (sentir, sufrir, ser afectado) entra el sufijo culto -pátheia. El portugués guarda -patia en una sola boca para cuatro oficios. El latín patī (paciencia) es primo, no el padre. Pato, patria y patio son pegamento del oído.',
        curiositiesEs:
          'Empatía siente hacia dentro; simpatía siente con. Homeopatía es escuela, no enfermedad. Alelopatía es química entre plantas, no empatía vegetal. Patía (Cauca) es homónimo geográfico.'
      },
      ['etimo', 'etimologia', 'aglutinacao']
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
      id: 'patia',
      slug: 'patia',
      title: 'Patia',
      titleEn: 'Patia',
      titleEs: 'Patia',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — -patia herda o páthos; quatro salas, um sufixo; ≠ pato; Valeu !!!',
      teaserEn: 'BudGanja echo — -patia inherits páthos; four rooms, one suffix; ≠ duck; Valeu !!!',
      teaserEs: 'Eco BudGanja — -patia hereda el páthos; cuatro salas, un sufijo; ≠ pato; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'patia', 'pathos', 'empatia']
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
