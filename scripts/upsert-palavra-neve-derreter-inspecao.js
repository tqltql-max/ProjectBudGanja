'use strict';

/**
 * Injeta as palavras Neve e Derreter (pedido de campo: derver).
 * Uso: node scripts/upsert-palavra-neve-derreter-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildNevePost,
  poemPt: poemNevePt,
  poemEn: poemNeveEn,
  poemEs: poemNeveEs,
  WIKT: WIKT_NEVE,
  WIKT_EN_NIX,
  WIKT_NEVE_LA,
  WIKT_NEVER
} = require('../lib/neve-inspecao-post.js');
const {
  buildDerreterPost,
  poemPt: poemDerreterPt,
  poemEn: poemDerreterEn,
  poemEs: poemDerreterEs,
  WIKT: WIKT_DERR,
  WIKT_EN: WIKT_DERR_EN,
  WIKT_ES: WIKT_DERR_ES,
  WIKT_DETERO
} = require('../lib/derreter-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF_NEVE = '/posts/post-inspecao-palavra-neve.html';
const HREF_DERR = '/posts/post-inspecao-palavra-derreter.html';

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

const LANGS_NEVE =
  'en: "snow", es: "nieve", fr: "neige", it: "neve", de: "Schnee", el: "χιόνι", la: "nix / nivis", yo: "yìnyín", sw: "theluji", gez: "በረዶ", nl: "sneeuw", pl: "śnieg", ru: "снег", uk: "сніг", zh: "雪", ja: "雪", ko: "눈", ar: "ثلج", he: "שלג", hi: "बर्फ", tr: "kar", sv: "snö", da: "sne", no: "snø", fi: "lumi", cs: "sníh", ro: "zăpadă", hu: "hó", ca: "neu", gl: "neve", eu: "elur", gn: "yrypya", qu: "riti", eo: "neĝo", vi: "tuyết", id: "salju", th: "หิมะ", hr: "snijeg", sk: "sneh", ga: "sneachta", cy: "eira", ha: "dusar ƙanƙara", am: "በረዶ", fa: "برف", bn: "তুষার", zu: "iqhwa"';

const LANGS_DERR =
  'en: "to melt", es: "derretir", fr: "fondre", it: "fondere / sciogliere", de: "schmelzen", el: "λιώνω", la: "liquefacere / dēterere", yo: "yọ́", sw: "yeyuka", gez: "ቀለጠ", nl: "smelten", pl: "topić", ru: "таять / плавить", uk: "танути", zh: "融化", ja: "溶ける", ko: "녹다", ar: "يذوب", he: "להמיס", hi: "पिघलना", tr: "erimek", sv: "smälta", da: "smelte", no: "smelte", fi: "sulaa", cs: "tát", ro: "a se topi", hu: "olvad", ca: "fondre", gl: "derreter", eu: "urtu", gn: "sỹi", qu: "unuyay", eo: "degeli", vi: "tan chảy", id: "mencair", th: "ละลาย", hr: "topiti", sk: "topiť", ga: "leáigh", cy: "toddi", ha: "narke", am: "ቀልጦ", fa: "ذوب شدن", bn: "গলা", zu: "ncibilika"';

function patchGlossary(gloss) {
  const neveMain =
    '    neve: { tone: "craft", category: "Léxico", mundane: "Cristal que cai e cobertura branca — água no ar, não o bloco.", gloss: "Lat. nix, nivis — matéria × paisagem × cola (never / nēve / nix EN); ≠ gelo ≠ geada; par derreter (derver); Valeu !!!", href: "' +
    HREF_NEVE +
    '", ' +
    LANGS_NEVE +
    ' },\n';
  gloss = replaceOrInsertAfter(gloss, 'neve', neveMain, 'molhar');

  const neveAliases = [
    [
      'nevar',
      '    nevar: { gloss: "Verbo de neve — ningit latino; ver ficha Neve.", href: "' +
        HREF_NEVE +
        '", en: "to snow", es: "nevar" },\n'
    ],
    [
      'nieve',
      '    nieve: { gloss: "Cognato espanhol de neve (nix, nivis); ver ficha Neve.", href: "' +
        HREF_NEVE +
        '", en: "snow (ES nieve)", es: "nieve" },\n'
    ],
    [
      'never',
      '    never: { tone: "caution", category: "Cola", mundane: "Inglês — nenhuma vez; a orelha cola em neve.", gloss: "ne + ever — negação EN; ≠ lat. nix (neve); ver ficha Neve.", href: "' +
        HREF_NEVE +
        '", en: "never", es: "nunca" },\n'
    ]
  ];
  for (const [key, line] of neveAliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'neve');
  }

  const derrMain =
    '    derreter: { tone: "craft", category: "Léxico", mundane: "Verbo — sólido que volta a líquido pelo calor.", gloss: "Lat. dēterō × rēterō (terere); campo derver; ≠ dever ≠ derrota ≠ lava; par neve; Valeu !!!", href: "' +
    HREF_DERR +
    '", ' +
    LANGS_DERR +
    ' },\n';
  gloss = replaceOrInsertAfter(gloss, 'derreter', derrMain, 'dever');

  const derrAliases = [
    [
      'derver',
      '    derver: { tone: "caution", category: "Campo", mundane: "Boca rápida de derreter — não é lema, não é dever.", gloss: "Forma de campo de derreter; ≠ dever (dēbēre); par neve; Valeu !!!", href: "' +
        HREF_DERR +
        '", en: "slip / fast mouth for derreter (to melt)", es: "boca rápida de derretir" },\n'
    ],
    [
      'derretido',
      '    derretido: { gloss: "Particípio de derreter — estado ou figura de amor; ver ficha Derreter.", href: "' +
        HREF_DERR +
        '", en: "melted / smitten", es: "derretido" },\n'
    ],
    [
      'derretimento',
      '    derretimento: { gloss: "Substantivo do gesto — degelo; ver ficha Derreter.", href: "' +
        HREF_DERR +
        '", en: "melting / thaw", es: "derretimiento" },\n'
    ],
    [
      'derretir',
      '    derretir: { gloss: "Cognato espanhol de derreter; ver ficha Derreter.", href: "' +
        HREF_DERR +
        '", en: "to melt (ES derretir)", es: "derretir" },\n'
    ]
  ];
  for (const [key, line] of derrAliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'derreter');
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

function generateCover(scriptName) {
  try {
    execFileSync(process.execPath, [path.join(__dirname, scriptName)], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa', scriptName + ':', e.message);
  }
}

async function main() {
  generateCover('generate-neve-palavra-cover.js');
  generateCover('generate-derreter-palavra-cover.js');

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));

  const neve = stampFiles(buildNevePost());
  upsertPost(posts, neve);
  writeHtml(neve);
  writeI18n(i18n, neve);

  const derreter = stampFiles(buildDerreterPost());
  upsertPost(posts, derreter);
  writeHtml(derreter);
  writeI18n(i18n, derreter);

  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(
      items,
      {
        id: 'palavra-neve',
        title: 'Neve — nix, nivis; cobertura, não gelo',
        titleEn: 'Neve — nix, nivis; cover, not ice',
        titleEs: 'Neve — nix, nivis; cubierta, no hielo',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: Neve ← lat. nix, nivis — cristal que cai; ≠ gelo ≠ never ≠ nēve; par derreter (derver).',
        whyEn: 'Words: Neve ← Lat. nix, nivis — falling crystal; ≠ ice ≠ never ≠ nēve; pair derreter (derver).',
        whyEs: 'Palabras: Neve ← lat. nix, nivis — cristal que cae; ≠ hielo ≠ never ≠ nēve; par derreter (derver).',
        suggestedSlug: neve.slug,
        doneHref: HREF_NEVE,
        seriesHint: 'palavras-origem',
        sources: [
          HREF_NEVE,
          HREF_DERR,
          WIKT_NEVE,
          WIKT_EN_NIX,
          WIKT_NEVE_LA,
          WIKT_NEVER,
          '/posts/post-inspecao-palavra-gelo.html',
          '/posts/post-inspecao-arte-bom-dia-inverno.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + neve.seriesOrder + ' — ficha plena; lote Tamara fica sala B; par derreter.'
      },
      ['palavra-navegar', 'palavra-gelo']
    );
    upsertItem(
      items,
      {
        id: 'palavra-derreter',
        title: 'Derreter — o sólido volta a água (campo: derver)',
        titleEn: 'Derreter — the solid returns to water (field: derver)',
        titleEs: 'Derreter — el sólido vuelve al agua (campo: derver)',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: Derreter ← dēterō × rēterō; campo derver; ≠ dever ≠ derrota ≠ lava; par neve.',
        whyEn: 'Words: Derreter ← dēterō × rēterō; field derver; ≠ duty ≠ defeat ≠ lava; pair neve.',
        whyEs: 'Palabras: Derreter ← dēterō × rēterō; campo derver; ≠ deber ≠ derrota ≠ lava; par neve.',
        suggestedSlug: derreter.slug,
        doneHref: HREF_DERR,
        seriesHint: 'palavras-origem',
        sources: [
          HREF_DERR,
          HREF_NEVE,
          WIKT_DERR,
          WIKT_DERR_EN,
          WIKT_DERR_ES,
          WIKT_DETERO,
          '/posts/post-inspecao-palavra-gelo.html',
          '/posts/post-inspecao-palavra-agua.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + derreter.seriesOrder + ' — pedido de campo derver; par neve; sem manual de fundição.'
      },
      ['palavra-neve', 'palavra-desejos']
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
        id: 'neve',
        word: 'neve',
        simple:
          'Lat. nix, nivis — cristal que cai e cobertura branca; ≠ gelo ≠ never ≠ nēve latino; par derreter (derver). Valeu !!!',
        simpleEn:
          'Lat. nix, nivis — falling crystal and white cover; ≠ ice ≠ never ≠ Latin nēve; pair derreter (derver). Valeu !!!',
        simpleEs:
          'Lat. nix, nivis — cristal que cae y cubierta blanca; ≠ hielo ≠ never ≠ nēve latino; par derreter (derver). ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_NEVE,
        history:
          'Neve vem do latim nix, nivis (PIE snígʷʰs). Snow inglês é primo germânico, não empréstimo. O latim nēve («e não») e o inglês never são colas de orelha.',
        curiosities:
          'No Ártico de Tamara a neve é manta e água. O gelo prende o casco; derreter devolve o rio. Valeu !!! com a branca certa.',
        historyEn:
          'Portuguese neve comes from Latin nix, nivis (PIE snígʷʰs). English snow is a Germanic cousin, not a loan. Latin nēve (“and not”) and English never are ear-glues.',
        curiositiesEn:
          'In Tamara’s Arctic snow is cover and water. Ice holds the hull; melting gives back the river. Valeu !!! with the right white.',
        historyEs:
          'Neve viene del latín nix, nivis (PIE snígʷʰs). Snow inglés es primo germánico, no préstamo. El latín nēve («y no») y el inglés never son colas de oreja.',
        curiositiesEs:
          'En el Ártico de Tamara la nieve es cubierta y agua. El hielo prende el casco; derretir devuelve el río. ¡Valeu !!! con la blanca cierta.'
      },
      ['navegar', 'gelo']
    );
    upsertItem(
      items,
      {
        id: 'derreter',
        word: 'derreter',
        simple:
          'Lat. dēterō × rēterō (terere) — o sólido volta a água; campo derver; ≠ dever ≠ lava; par neve. Valeu !!!',
        simpleEn:
          'Lat. dēterō × rēterō (terere) — solid returns to water; field derver; ≠ duty ≠ lava; pair neve. Valeu !!!',
        simpleEs:
          'Lat. dēterō × rēterō (terere) — el sólido vuelve al agua; campo derver; ≠ deber ≠ lava; par neve. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_DERR,
        history:
          'Derreter é irmão do espanhol derretir, cruzamento latino de dēterō e rēterō (terere, esfregar). O galego medieval já junta neves que começam a derreter.',
        curiosities:
          'Derver é a boca rápida do mesmo verbo — não é dever. Melt inglês traduz e não herda. Valeu !!! com o grau certo.',
        historyEn:
          'Portuguese derreter is kin to Spanish derretir, a Latin portmanteau of dēterō and rēterō (terere, to rub). Medieval Galician already pairs snows that begin to melt.',
        curiositiesEn:
          'Derver is the fast mouth of the same verb — not duty (dever). English melt translates and does not inherit. Valeu !!! with the right degree.',
        historyEs:
          'Derreter es hermano de derretir, cruce latino de dēterō y rēterō (terere, frotar). El gallego medieval ya junta nieves que empiezan a derretir.',
        curiositiesEs:
          'Derver es la boca rápida del mismo verbo — no es deber. Melt inglés traduce y no hereda. ¡Valeu !!! con el grado cierto.'
      },
      ['neve', 'desejos']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = patchGlossary(gloss);
    fs.writeFileSync(GLOSS_FILE, gloss, 'utf8');
    console.log('Glossário actualizado');
  }

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'neve',
      slug: 'neve',
      title: 'Neve',
      titleEn: 'Neve',
      titleEs: 'Neve',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — neve cobre; gelo prende; ≠ never; Valeu !!!',
      teaserEn: 'BudGanja echo — snow covers; ice holds; ≠ never; Valeu !!!',
      teaserEs: 'Eco BudGanja — la nieve cubre; el hielo prende; ≠ never; ¡Valeu !!!',
      body: poemNevePt(),
      bodyEn: poemNeveEn(),
      bodyEs: poemNeveEs(),
      inspectionHref: HREF_NEVE,
      tags: ['poesia', 'vida', 'neve', 'gelo', 'inverno']
    });
    upsertVidaPoem(vida, {
      id: 'derreter',
      slug: 'derreter',
      title: 'Derreter',
      titleEn: 'Derreter',
      titleEs: 'Derreter',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — derreter solta; derver é a boca; ≠ dever; Valeu !!!',
      teaserEn: 'BudGanja echo — melting lets go; derver is the mouth; ≠ duty; Valeu !!!',
      teaserEs: 'Eco BudGanja — derretir suelta; derver es la boca; ≠ deber; ¡Valeu !!!',
      body: poemDerreterPt(),
      bodyEn: poemDerreterEn(),
      bodyEs: poemDerreterEs(),
      inspectionHref: HREF_DERR,
      tags: ['poesia', 'vida', 'derreter', 'neve', 'agua']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poema Vida actualizado');
  }

  try {
    await syncSql(neve);
    await syncSql(derreter);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', neve.title, '| Cap.', neve.seriesOrder);
  console.log('OK:', derreter.title, '| Cap.', derreter.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
