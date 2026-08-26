'use strict';

/**
 * Injeta a palavra lua (lat. lūna; irmã de lūx; dar à luz).
 * Uso: node scripts/upsert-palavra-lua-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildLuaPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT
} = require('../lib/lua-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-lua.html';

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
    '    lua: { tone: "craft", category: "Léxico", mundane: "Satélite e vocábulo — lat. lūna, a luminosa; brilho emprestado do sol.", gloss: "Lat. lūna ← *lewk- (brilhar); irmã de luz/lūx; dar à luz = claridade, não o astro; moon/mês medem (*mēh₁-); ≠ horóscopo; Valeu !!!", href: "' +
    HREF +
    '", en: "moon", es: "luna", fr: "lune", it: "luna", de: "Mond", el: "σελήνη", la: "luna", yo: "òṣùpá", sw: "mwezi", gez: "wärəh", nl: "maan", pl: "księżyc", ru: "луна", uk: "місяць", zh: "月亮", ja: "月", ko: "달", ar: "قمر", he: "ירח", hi: "चाँद", tr: "ay", sv: "måne", da: "måne", no: "måne", fi: "kuu", cs: "měsíc", ro: "lună", hu: "hold", ca: "lluna", gl: "lúa", eu: "ilargi", gn: "jasy", qu: "killa", eo: "luno", vi: "mặt trăng", id: "bulan", th: "พระจันทร์", hr: "mjesec", sk: "mesiac", ga: "gealach", cy: "lleuad", ha: "wata", am: "ጨረቃ", fa: "ماه", bn: "চাঁদ", zu: "inyanga" },\n';
  gloss = replaceOrInsertAfter(gloss, 'lua', main, 'luz');
  const aliases = [
    [
      'luna',
      '    luna: { gloss: "Lat./ES de lua — lūna, a luminosa; ver lua.", href: "' +
        HREF +
        '", en: "luna / moon", es: "luna" },\n'
    ],
    [
      'lunar',
      '    lunar: { gloss: "Do astro lua — ciclo, calendário, relevo; ≠ horóscopo; ver lua.", href: "' +
        HREF +
        '", en: "lunar", es: "lunar" },\n'
    ],
    [
      'lunatico',
      '    lunatico: { gloss: "Grafia sem acento de lunático — história da palavra (a lua desregra); ≠ clínica; ver lua.", href: "' +
        HREF +
        '", en: "lunatic (history of the word)", es: "lunático" },\n'
    ],
    [
      'lunático',
      '    "lunático": { gloss: "História da palavra: a lua como desregra do ânimo — não diagnóstico; ver lua.", href: "' +
        HREF +
        '", en: "lunatic (word-history)", es: "lunático" },\n'
    ],
    [
      'lux',
      '    lux: { gloss: "Lat. lūx — claridade; unidade SI; irmã de lua (lūna), não o astro; ver lua e luz.", href: "' +
        HREF +
        '", en: "lux (unit / Lat. light)", es: "lux" },\n'
    ],
    [
      '"dar à luz"',
      '    "dar à luz": { gloss: "Perífrase de claridade / parto — lūx, não lūna; lapso dar a lux; ver lua.", href: "' +
        HREF +
        '", en: "to give birth / bring to light", es: "dar a luz" },\n'
    ],
    [
      '"dar a luz"',
      '    "dar a luz": { gloss: "Grafia sem crase de dar à luz — ver lua.", href: "' +
        HREF +
        '", en: "give to the light", es: "dar a luz" },\n'
    ],
    [
      '"dar a lux"',
      '    "dar a lux": { gloss: "Lapso que acerta o latim lūx e erra a preposição; ver lua / dar à luz.", href: "' +
        HREF +
        '", en: "slip for dar à luz", es: "lapsus de dar a luz" },\n'
    ],
    [
      '"lua de mel"',
      '    "lua de mel": { gloss: "Calco de honeymoon — o mês doce; a lua PT importou o astro; ver lua.", href: "' +
        HREF +
        '", en: "honeymoon", es: "luna de miel" },\n'
    ],
    [
      '"estar na lua"',
      '    "estar na lua": { gloss: "Figurado — distraído; ≠ astronauta; ver lua.", href: "' +
        HREF +
        '", en: "to be daydreaming", es: "estar en la luna" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'lua');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-lua-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildLuaPost());
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
        id: 'palavra-lua',
        title: 'Lua — lūna, a luminosa; irmã de lūx',
        titleEn: 'Lua — lūna, the luminous one; sister of lūx',
        titleEs: 'Lua — lūna, la luminosa; hermana de lūx',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Palavras: lua (lat. lūna) — a luminosa; irmã de luz/lūx; dar à luz (claridade, não o astro); moon/mês medem; ≠ horóscopo.',
        whyEn: 'Words: lua (Lat. lūna) — luminous one; sister of luz/lūx; dar à luz = clarity not orb; moon/mês measure.',
        whyEs: 'Palabras: lua (lat. lūna) — la luminosa; hermana de luz/lūx; dar à luz = claridad, no el astro; moon/mês miden.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT,
          'https://en.wiktionary.org/wiki/luna#Latin',
          'https://en.wiktionary.org/wiki/lux#Latin',
          'https://en.wiktionary.org/wiki/moon',
          'https://pt.wiktionary.org/wiki/dar_%C3%A0_luz',
          '/posts/post-inspecao-palavra-luz.html',
          '/posts/post-inspecao-palavra-sol.html',
          '/posts/post-inspecao-palavra-noite.html',
          '/posts/post-inspecao-palavra-pariu.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — lūna × lūx × dar à luz; moon/mês noutra árvore; sem horóscopo.'
      },
      ['palavra-luz', 'palavra-sol', 'palavra-noite']
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
        id: 'lua',
        word: 'lua',
        simple:
          'Lat. lūna — a luminosa (raiz *lewk-, brilhar). Irmã de luz/lūx. Dar à luz é claridade/parto, não o astro. Moon e mês medem o tempo. ≠ horóscopo. Valeu !!!',
        simpleEn:
          'Lat. lūna — the luminous one (*lewk-, to shine). Sister of luz/lūx. Dar à luz is clarity/birth, not the orb. Moon and mês measure time. ≠ horoscope. Valeu !!!',
        simpleEs:
          'Lat. lūna — la luminosa (*lewk-, brillar). Hermana de luz/lūx. Dar à luz es claridad/parto, no el astro. Moon y mês miden el tiempo. ≠ horóscopo. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Lua vem do latim lūna, «a luminosa», da mesma raiz *lewk- que deu lūx (luz) e a unidade lux. O n intervocálico caiu (luna > lua). O inglês moon e o português mês vêm de outra raiz (*mēh₁-, medir): em inglês o astro e o mês são família; em PT o astro brilha e o mês mede. Dar à luz é perífrase de claridade (trazer ao claro / parto), não «oferecer a lua».',
        curiosities:
          'Segunda-feira em espanhol ainda é lunes (dies Lunae); em português o astro saiu do dia civil. Lua de mel é calco de honeymoon — o mês doce; a boca PT importou o astro. A linguagem Lua (PUC-Rio, 1993) herdou o nome do satélite depois de uma linguagem chamada SOL. Lunático guarda a crença antiga; não é diagnóstico.',
        historyEn:
          'Lua is from Latin lūna, “the luminous one”, the same *lewk- root as lūx (light) and the SI unit lux. Intervocalic n dropped (luna > lua). English moon and Portuguese mês come from another root (*mēh₁-, to measure): English fused orb and month; Portuguese split shine (lua) from measure (mês). Dar à luz is a clarity periphrasis (bring into the light / give birth), not “offer the moon”.',
        curiositiesEn:
          'Spanish Monday is still lunes (dies Lunae); Portuguese dropped the orb from the weekday. Lua de mel is a calque of honeymoon — the sweet month; PT imported the orb. The Lua language (PUC-Rio, 1993) took the satellite’s name after a language called SOL. Lunático keeps an old belief; it is not a diagnosis.',
        historyEs:
          'Lua viene del latín lūna, «la luminosa», de la misma raíz *lewk- que dio lūx (luz) y la unidad lux. Cayó la n intervocálica (luna > lua). El inglés moon y el portugués mês vienen de otra raíz (*mēh₁-, medir). Dar à luz es perífrasis de claridad (traer a lo claro / parto), no «ofrecer la luna».',
        curiositiesEs:
          'El lunes español sigue siendo dies Lunae; en portugués el astro salió del día civil. Lua de mel es calco de honeymoon. El lenguaje Lua (PUC-Rio, 1993) tomó el nombre del satélite después de SOL. Lunático guarda una creencia antigua; no es diagnóstico.'
      },
      ['luz', 'sol', 'noite']
    );
    upsertItem(
      items,
      {
        id: 'dar-a-luz',
        word: 'dar à luz',
        simple:
          'Perífrase de claridade / parto — lat. lūx, não lūna. Lapso «dar a lux» acerta o étimo e erra a preposição (à). Ver lua. Valeu !!!',
        simpleEn:
          'Clarity / birth periphrasis — Lat. lūx, not lūna. The slip “dar a lux” hits the etymon and misses the preposition. See lua. Valeu !!!',
        simpleEs:
          'Perífrasis de claridad / parto — lat. lūx, no lūna. El lapsus «dar a lux» acierta el étimo y falla la preposición. Ver lua. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['lua', 'luz']
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
      id: 'lua',
      slug: 'lua',
      title: 'Lua',
      titleEn: 'Lua',
      titleEs: 'Lua',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — a luminosa; irmã de lūx; brilho emprestado, sem fingir que é sol; Valeu !!!',
      teaserEn: 'BudGanja echo — the luminous one; sister of lūx; borrowed shine, without pretending to be the sun; Valeu !!!',
      teaserEs: 'Eco BudGanja — la luminosa; hermana de lūx; brillo prestado, sin fingir que es sol; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'lua', 'luz', 'lux']
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
