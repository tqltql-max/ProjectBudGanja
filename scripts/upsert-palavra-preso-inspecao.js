'use strict';

/**
 * Injeta palavra «preso» na série Palavras.
 * Uso: node scripts/upsert-palavra-preso-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildPresoPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT
} = require('../lib/preso-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-preso.html';

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

function upsertVidaPoem(vida, entry) {
  const poems = Array.isArray(vida.poems) ? vida.poems : [];
  const i = poems.findIndex((p) => p.id === entry.id || p.slug === entry.slug);
  if (i >= 0) poems[i] = Object.assign({}, poems[i], entry);
  else poems.unshift(entry);
  vida.poems = poems;
  vida.updatedAt = new Date().toISOString();
}

function replaceOrInsertAfter(gloss, key, line, afterKey) {
  const re = new RegExp('    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n');
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
    '    preso: { tone: "caution", category: "Léxico", mundane: "Estado de quem ficou tomado — particípio de prender, não o nome da pessoa.", gloss: "Lat. prehendere / prēnsus; prender → preso; estado ≠ identidade; ≠ escravidão ≠ Shawshank; irmã liberdade; Valeu !!!", href: "' +
    HREF +
    '", en: "imprisoned / stuck / captive", es: "preso / atrapado", fr: "pris / prisonnier", it: "preso / prigioniero", de: "gefangen", el: "φυλακισμένος", la: "prensus", yo: "tí wọ́n mú", sw: "amefungwa", gez: "ታሰረ", nl: "gevangen", pl: "uwięziony", ru: "заключённый", uk: "увʼязнений", zh: "被关押", ja: "拘束された", ko: "갇힌", ar: "مسجون", he: "כלוא", hi: "कैद", tr: "tutuklu", sv: "fängslad", da: "fængslet", no: "fengslet", fi: "vangittu", cs: "vězněný", ro: "închis", hu: "fogoly", ca: "pres", gl: "preso", eu: "preso", gn: "prañá", qu: "watasqa", eo: "malliberulo", vi: "bị giam", id: "tahanan", th: "ถูกจับ", hr: "zatvoren", sk: "väznený", ga: "i bpríosún", cy: "caeth", ha: "fursuna", am: "ታስሯል", fa: "زندانی", bn: "বন্দি", zu: "uboshwe" },\n';
  gloss = replaceOrInsertAfter(gloss, 'preso', main, 'liberdade');
  const aliases = [
    [
      'presa',
      '    presa: { gloss: "Feminino de preso *ou* caça/vítima — homógrafo; ver preso.", href: "' +
        HREF +
        '", en: "held (f.) / prey", es: "presa" },\n'
    ],
    [
      'prender',
      '    prender: { gloss: "Verbo-mãe de preso — agarrar / deter; o estado é preso.", href: "' +
        HREF +
        '", en: "to seize / to arrest / to fasten", es: "prender" },\n'
    ],
    [
      'prisao',
      '    prisao: { gloss: "Grafia sem acento de prisão — lugar/pena; família de preso.", href: "' +
        HREF +
        '", en: "prison", es: "prisión" },\n'
    ],
    [
      'prisão',
      '    "prisão": { gloss: "Lugar / pena — irmã de preso, não a mesma peça.", href: "' +
        HREF +
        '", en: "prison", es: "prisión" },\n'
    ],
    [
      'prisioneiro',
      '    prisioneiro: { gloss: "Pessoa no sistema — vizinho de «o preso»; ver preso.", href: "' +
        HREF +
        '", en: "prisoner", es: "prisionero" },\n'
    ],
    [
      '"estar preso"',
      '    "estar preso": { gloss: "Estado (dura) — cela, trânsito, parafuso ou afeto; ≠ ser preso.", href: "' +
        HREF +
        '", en: "to be stuck / held", es: "estar preso" },\n'
    ],
    [
      '"ser preso"',
      '    "ser preso": { gloss: "Evento da detenção — não o mesmo que estar preso.", href: "' +
        HREF +
        '", en: "to be arrested", es: "ser detenido" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'preso');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-preso-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildPresoPost());
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
        id: 'palavra-preso',
        title: 'Preso — o estado depois de prender',
        titleEn: 'Preso — the state after seizing',
        titleEs: 'Preso — el estado después de prender',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: preso (prehendere / prēnsus) — particípio de prender; estado ≠ identidade; derivação prisão; irmã liberdade; Valeu !!!',
        whyEn: 'Words: preso — participle of prender; state ≠ identity; prison family; sister liberdade.',
        whyEs: 'Palabras: preso — participio de prender; estado ≠ identidad; familia prisión; hermana liberdade.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT,
          '/posts/post-inspecao-palavra-liberdade.html',
          '/posts/post-inspecao-filme-um-sonho-de-liberdade.html',
          '/posts/post-inspecao-palavra-escravidao.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — estado ≠ identidade; sem tutorial de cela.'
      },
      ['palavra-liberdade', 'palavra-escravidao']
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
        id: 'preso',
        word: 'preso',
        simple:
          'Lat. prehendere / prēnsus — particípio de prender; estado de quem ficou tomado, não o nome da pessoa. ≠ escravidão ≠ filme. Irmã: liberdade. Valeu !!!',
        simpleEn:
          'Lat. prehendere / prēnsus — participle of prender; a held state, not a person’s name. ≠ slavery ≠ film. Sister: liberdade. Valeu !!!',
        simpleEs:
          'Lat. prehendere / prēnsus — participio de prender; estado de quien quedó tomado, no el nombre de la persona. ≠ esclavitud ≠ filme. Hermana: liberdade. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['liberdade', 'escravidao', 'ilegal']
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
      id: 'preso',
      slug: 'preso',
      title: 'Preso',
      titleEn: 'Preso',
      titleEs: 'Preso',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — o estado depois de prender, sem virar o nome da pessoa; Valeu !!!',
      teaserEn: 'BudGanja echo — the state after seizing, without becoming the person’s name; Valeu !!!',
      teaserEs: 'Eco BudGanja — el estado después de prender, sin volverse el nombre de la persona; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'preso', 'prender', 'liberdade']
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
