'use strict';

/**
 * Injeta a palavra Danger cruzada com perigo (relação).
 * Uso: node scripts/upsert-palavra-danger-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildDangerPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT_DANGER,
  WIKT_PERIGO
} = require('../lib/danger-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-danger.html';

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
  if (!post.filename) post.filename = 'posts/post-inspecao-palavra-danger.html';
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
  const perigo =
    '    perigo: { tone: "caution", gloss: "Lat. periculum — a prova que se atravessa; equivalente de placa de Danger (*dominus*), não cognato; ≠ risco ≠ medo; caso pipa em cola/colar; Valeu !!!", href: "' +
    HREF +
    '", en: "danger / peril", es: "peligro", fr: "péril / danger", it: "pericolo", de: "Gefahr", el: "κίνδυνος", la: "periculum", yo: "ewu", sw: "hatari", gez: "አደጋ", nl: "gevaar", pl: "niebezpieczenstwo", ru: "опасность", uk: "небезпека", zh: "危险", ja: "危険", ko: "위험", ar: "خطر", he: "סכנה", hi: "खतरा", tr: "tehlike", sv: "fara", da: "fare", no: "fare", fi: "vaara", cs: "nebezpeci", ro: "pericol", hu: "veszely", ca: "perill", gl: "perigo", eu: "arrisku", gn: "kyhyje", qu: "chhikchi", eo: "dangxero", vi: "nguy hiem", id: "bahaya", th: "อันตราย", hr: "opasnost", sk: "nebezpecenstvo", ga: "contuirt", cy: "perygl", ha: "hadari", am: "አደጋ", fa: "خطر", bn: "বিপদ", zu: "ingozi" },\n';
  gloss = replaceOrInsertAfter(gloss, 'perigo', perigo, 'risco');
  const danger =
    '    danger: { tone: "caution", category: "Léxico", mundane: "EN da placa — aviso; avô lat. dominus (poder do senhor).", gloss: "EN danger ← OF dangier ← dominus (poder); cruzar com perigo (periculum, a prova) pelo método relação — equivalentes de placa, não cognatos; ≠ risco ≠ medo; Valeu !!!", href: "' +
    HREF +
    '", en: "danger", es: "peligro / danger", fr: "danger", it: "pericolo", de: "Gefahr", el: "κίνδυνος", la: "dominium / periculum", yo: "ewu", sw: "hatari", gez: "አደጋ", nl: "gevaar", pl: "niebezpieczenstwo", ru: "опасность", uk: "небезпека", zh: "危险", ja: "危険", ko: "위험", ar: "خطر", he: "סכנה", hi: "खतरा", tr: "tehlike", sv: "fara", da: "fare", no: "fare", fi: "vaara", cs: "nebezpeci", ro: "pericol", hu: "veszely", ca: "perill", gl: "perigo", eu: "arrisku", gn: "kyhyje", qu: "chhikchi", eo: "dangxero", vi: "nguy hiem", id: "bahaya", th: "อันตราย", hr: "opasnost", sk: "nebezpecenstvo", ga: "contuirt", cy: "perygl", ha: "hadari", am: "አደጋ", fa: "خطر", bn: "বিপদ", zu: "ingozi" },\n';
  gloss = replaceOrInsertAfter(gloss, 'danger', danger, 'perigo');
  const aliases = [
    [
      'peril',
      '    peril: { gloss: "EN primo de perigo (periculum) — vive ao lado de danger, não o substitui; ver Danger.", href: "' +
        HREF +
        '", en: "peril", es: "peligro / periplo" },\n'
    ],
    [
      'peligro',
      '    peligro: { gloss: "ES cognato de perigo (periculum) — não de danger (dominus); ver Danger × perigo.", href: "' +
        HREF +
        '", en: "danger / peril", es: "peligro" },\n'
    ],
    [
      'perigoso',
      '    perigoso: { gloss: "Adjectivo de perigo — o que avisa; mapa = risco; peito = medo; ver Danger.", href: "' +
        HREF +
        '", en: "dangerous", es: "peligroso" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'danger');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-danger-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildDangerPost());
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
        id: 'palavra-danger',
        title: 'Danger — *dominus*; cruzar com perigo (*periculum*)',
        titleEn: 'Danger — *dominus*; cross with perigo (*periculum*)',
        titleEs: 'Danger — *dominus*; cruzar con perigo (*periculum*)',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Palavras: Danger (EN, poder do senhor) × perigo (PT, a prova) — relação sem fundir; ≠ risco ≠ medo.',
        whyEn: 'Words: Danger (EN, lord’s power) × perigo (PT, the trial) — relation without fusing; ≠ risk ≠ fear.',
        whyEs: 'Palabras: Danger (EN, poder del señor) × perigo (PT, la prueba) — relación sin fundir; ≠ riesgo ≠ miedo.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT_DANGER,
          WIKT_PERIGO,
          'https://en.wiktionary.org/wiki/dominus#Latin',
          'https://en.wiktionary.org/wiki/periculum#Latin',
          'https://en.wiktionary.org/wiki/peril',
          '/posts/post-inspecao-palavra-relacao.html',
          '/posts/post-inspecao-palavra-risco.html',
          '/posts/post-inspecao-palavra-medo.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — étimo dominus × periculum; método relação; sem NR/laudo.'
      },
      ['palavra-risco', 'palavra-relacao', 'palavra-medo']
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
        id: 'danger',
        word: 'Danger',
        simple:
          'EN da placa ← lat. dominus (poder do senhor). Cruzar com perigo (periculum, a prova): equivalentes de aviso, não cognatos. ≠ risco ≠ medo. Valeu !!!',
        simpleEn:
          'EN of the sign ← Lat. dominus (the lord’s power). Cross with perigo (periculum, the trial): warning equivalents, not cognates. ≠ risk ≠ fear. Valeu !!!',
        simpleEs:
          'EN de la placa ← lat. dominus (poder del señor). Cruzar con perigo (periculum, la prueba): equivalentes de aviso, no cognados. ≠ riesgo ≠ miedo. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Danger chega ao inglês pelo francês antigo dangier: poder, jurisdição, a mão do senhor (lat. dominus). «Estar no danger de alguém» era estar na alçada dele. O sentido moderno (ameaça) é metonímia: o poder podia magoar; a palavra ficou com o dano e esqueceu o senhor. Primo: dungeon (donjon).',
        curiosities:
          'O francês e o inglês guardam as duas linhagens: danger (dominus) e péril / peril (periculum). O português ficou com perigo e importa DANGER pela placa. Espanhol peligro é cognato de perigo, não de danger. Relação = cruzar sem fundir.',
        historyEn:
          'Danger reaches English via Old French dangier: power, jurisdiction, the lord’s hand (Lat. dominus). To be in someone’s danger was to be in their reach. The modern sense (threat) is metonymy. Cousin: dungeon (donjon).',
        curiositiesEn:
          'French and English keep both lines: danger (dominus) and péril / peril (periculum). Portuguese kept perigo and imports DANGER on the sign. Spanish peligro is a cognate of perigo, not of danger.',
        historyEs:
          'Danger llega al inglés por el francés antiguo dangier: poder, jurisdicción, la mano del señor (lat. dominus). El sentido moderno (amenaza) es metonimia. Primo: dungeon (donjon).',
        curiositiesEs:
          'El francés y el inglés guardan ambas líneas: danger (dominus) y péril / peril (periculum). El portugués se quedó con perigo e importa DANGER en la placa. El español peligro es cognado de perigo, no de danger.'
      },
      ['risco', 'relacao', 'medo']
    );
    upsertItem(
      items,
      {
        id: 'perigo',
        word: 'perigo',
        simple:
          'Lat. periculum — a prova que se atravessa. Equivalente de placa de Danger, não cognato (*dominus*). O mapa é risco; o peito é medo. Caso pipa: cola/colar. Valeu !!!',
        simpleEn:
          'Lat. periculum — the trial you go through. Sign equivalent of Danger, not a cognate (*dominus*). The map is risco; the chest is medo. Valeu !!!',
        simpleEs:
          'Lat. periculum — la prueba que se atraviesa. Equivalente de placa de Danger, no cognado (*dominus*). El mapa es risco; el pecho es medo. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Perigo vem do latim periculum: tentativa, ensaio, risco. Família de experior — experiência, experimento, perito. O aviso antigo é a prova no caminho. Cognatos: esp. peligro, it. pericolo, fr. péril, EN peril.',
        curiosities:
          'Brasil com P de Perigo (linha de pipa) é carimbo de caso na ficha cola/colar — não é o étimo desta palavra. Danger e perigo fazem o mesmo ofício na placa; os avôs divergem.'
      },
      ['danger', 'perigo-cola']
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
      id: 'danger',
      slug: 'danger',
      title: 'Danger',
      titleEn: 'Danger',
      titleEs: 'Danger',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — o senhor e a prova; a placa cola, o étimo corta; Valeu !!!',
      teaserEn: 'BudGanja echo — the lord and the trial; the sign glues, the etymon cuts; Valeu !!!',
      teaserEs: 'Eco BudGanja — el señor y la prueba; la placa pega, el étimo corta; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'danger', 'perigo', 'relação']
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
