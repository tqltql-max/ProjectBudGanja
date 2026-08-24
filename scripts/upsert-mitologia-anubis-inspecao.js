'use strict';

/**
 * Injeta «mitologia» + «Anúbis» na série Palavras e no catálogo /mitologia/.
 * Uso: node scripts/upsert-mitologia-anubis-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const mito = require('../lib/mitologia-inspecao-post.js');
const anubis = require('../lib/anubis-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF_MITO = '/posts/post-inspecao-palavra-mitologia.html';
const HREF_ANU = '/posts/post-inspecao-palavra-anubis.html';

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
  const mitoLine =
    '    mitologia: { tone: "craft", category: "Léxico", mundane: "Ofício de contar os deuses — mŷthos + lógos; lema do catálogo Mitologia.", gloss: "Gr. mŷthos + lógos; hub /mitologia/; Anúbis noutra sala; ≠ teologia ≠ magia; Valeu !!!", href: "' +
    HREF_MITO +
    '", en: "mythology", es: "mitología", fr: "mythologie", it: "mitologia", de: "Mythologie", el: "μυθολογία", la: "mythologia", yo: "ìtàn-àròsọ", sw: "hekaya", nl: "mythologie", pl: "mitologia", ru: "мифология", uk: "міфологія", zh: "神话", ja: "神話", ko: "신화", ar: "ميثولوجيا", he: "מיתולוגיה", hi: "पुराणकथा", tr: "mitoloji" },\n';
  const anuLine =
    '    anúbis: { tone: "warm", category: "Nome", mundane: "Deus egípcio jnpw — chacal que pesa o coração; primeiro deus do catálogo Mitologia.", gloss: "jnpw → Ἄνουβις; balança de Maat; ≠ Deus ≠ Wepwawet ≠ magia; Valeu !!!", href: "' +
    HREF_ANU +
    '", en: "Anubis", es: "Anubis", fr: "Anubis", it: "Anubi", de: "Anubis", el: "Άνουβις", la: "Anubis", yo: "Anubis", sw: "Anubis", nl: "Anubis", pl: "Anubis", ru: "Анубис", zh: "阿努比斯", ja: "アヌビス", ko: "아누비스", ar: "أنوبيس" },\n';
  gloss = replaceOrInsertAfter(gloss, 'mitologia', mitoLine, 'astrologia');
  gloss = replaceOrInsertAfter(gloss, 'anúbis', anuLine, 'mitologia');
  const aliases = [
    [
      'anubis',
      '    anubis: { gloss: "Grafia sem acento de Anúbis — ver Anúbis.", href: "' +
        HREF_ANU +
        '", en: "Anubis", es: "Anubis" },\n'
    ],
    [
      'anpu',
      '    anpu: { gloss: "Reconstrução de jnpw — ver Anúbis.", href: "' +
        HREF_ANU +
        '", en: "Anpu", es: "Anpu" },\n'
    ],
    [
      'inpu',
      '    inpu: { gloss: "Reconstrução de jnpw — ver Anúbis.", href: "' +
        HREF_ANU +
        '", en: "Inpu", es: "Inpu" },\n'
    ],
    [
      'mito',
      '    mito: { gloss: "Uma história pontual — o sistema é mitologia.", href: "' +
        HREF_MITO +
        '", en: "myth", es: "mito" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'mitologia');
  }
  return gloss;
}

async function syncSql(postsToWrite) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  postsToWrite.forEach((post) => upsertPost(posts, post));
  await store.setPosts(posts);
  console.log('SQL store actualizado: mitologia + anubis');
}

async function main() {
  ['generate-mitologia-palavra-cover.js', 'generate-anubis-cover.js'].forEach((script) => {
    try {
      execFileSync(process.execPath, [path.join(__dirname, script)], {
        cwd: ROOT,
        stdio: 'inherit',
        timeout: 45000
      });
    } catch (e) {
      console.warn('Aviso capa', script + ':', e.message);
    }
  });

  const postMito = stampFiles(mito.buildMitologiaPost());
  const postAnu = stampFiles(anubis.buildAnubisPost());
  if (Number(postAnu.seriesOrder) === Number(postMito.seriesOrder)) {
    postAnu.seriesOrder = Number(postMito.seriesOrder) + 1;
  }
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, postMito);
  upsertPost(posts, postAnu);
  await writeJsonRetry(POSTS_FILE, posts);

  try {
    writeHtml(postMito);
    writeHtml(postAnu);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, postMito);
  writeI18n(i18n, postAnu);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(
      items,
      {
        id: 'palavra-mitologia',
        title: 'Mitologia — mŷthos + lógos; lema do catálogo',
        titleEn: 'Mitologia — mŷthos + lógos; catalog lemma',
        titleEs: 'Mitologia — mŷthos + lógos; lema del catálogo',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: mitologia (mŷthos + lógos) — ofício de contar os deuses; página /mitologia/; Anúbis noutra sala; Valeu !!!',
        whyEn: 'Words: mitologia — craft of telling the gods; /mitologia/ hub; Anubis in another room.',
        whyEs: 'Palabras: mitologia — oficio de contar a los dioses; hub /mitologia/; Anubis en otra sala.',
        suggestedSlug: postMito.slug,
        doneHref: HREF_MITO,
        seriesHint: 'palavras-origem',
        sources: [HREF_MITO, '/mitologia/', HREF_ANU, mito.WIKT, '/posts/post-inspecao-palavra-valeu.html'],
        notes: 'Cap. ' + postMito.seriesOrder + ' — lema do catálogo Mitologia.'
      },
      ['palavra-deus', 'astrologia']
    );
    upsertItem(
      items,
      {
        id: 'palavra-anubis',
        title: 'Anúbis — jnpw; chacal; algum deus',
        titleEn: 'Anubis — jnpw; jackal; some god',
        titleEs: 'Anubis — jnpw; chacal; algún dios',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: Anúbis (jnpw → Ἄνουβις) — chacal que pesa o coração; primeiro deus de /mitologia/; ≠ Deus ≠ magia; Valeu !!!',
        whyEn: 'Words: Anubis (jnpw → Ἄνουβις) — jackal who weighs the heart; first god of /mitologia/; ≠ Deus ≠ magic.',
        whyEs: 'Palabras: Anubis (jnpw → Ἄνουβις) — chacal que pesa el corazón; primer dios de /mitologia/; ≠ Deus ≠ magia.',
        suggestedSlug: postAnu.slug,
        doneHref: HREF_ANU,
        seriesHint: 'palavras-origem',
        sources: [
          HREF_ANU,
          '/mitologia/',
          anubis.WIKI_PT,
          '/posts/post-inspecao-palavra-deus.html',
          HREF_MITO,
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + postAnu.seriesOrder + ' — primeiro deus; salas cortadas.'
      },
      ['palavra-mitologia', 'palavra-deus']
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
        id: 'mitologia',
        word: 'mitologia',
        simple:
          'Gr. mŷthos + lógos — ofício de contar os deuses. Lema do catálogo /mitologia/. Anúbis noutra sala. Valeu !!!',
        simpleEn:
          'Gr. mŷthos + lógos — craft of telling the gods. Lemma of /mitologia/. Anubis in another room. Valeu !!!',
        simpleEs:
          'Gr. mŷthos + lógos — oficio de contar a los dioses. Lema de /mitologia/. Anubis en otra sala. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_MITO
      },
      ['deus', 'astrologia']
    );
    upsertItem(
      items,
      {
        id: 'anubis',
        word: 'Anúbis',
        simple:
          'jnpw → Ἄνουβις. Chacal que pesa o coração. Primeiro deus de /mitologia/. ≠ Deus ≠ magia. Valeu !!!',
        simpleEn:
          'jnpw → Ἄνουβις. Jackal who weighs the heart. First god of /mitologia/. ≠ Deus ≠ magic. Valeu !!!',
        simpleEs:
          'jnpw → Ἄνουβις. Chacal que pesa el corazón. Primer dios de /mitologia/. ≠ Deus ≠ magia. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_ANU
      },
      ['mitologia', 'deus']
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
      id: 'mitologia',
      slug: 'mitologia',
      title: 'Mitologia',
      titleEn: 'Mythology',
      titleEs: 'Mitología',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — o ofício de contar os deuses, sem culto de ficha; Valeu !!!',
      teaserEn: 'BudGanja echo — the craft of telling the gods, without a cult of the sheet; Valeu !!!',
      teaserEs: 'Eco BudGanja — el oficio de contar a los dioses, sin culto de ficha; ¡Valeu !!!',
      body: mito.poemPt(),
      bodyEn: mito.poemEn(),
      bodyEs: mito.poemEs(),
      inspectionHref: HREF_MITO,
      tags: ['poesia', 'vida', 'mitologia', 'mythos']
    });
    upsertVidaPoem(vida, {
      id: 'anubis',
      slug: 'anubis',
      title: 'Anúbis',
      titleEn: 'Anubis',
      titleEs: 'Anubis',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — o chacal que pesa, sem invocar o nome; Valeu !!!',
      teaserEn: 'BudGanja echo — the jackal who weighs, without invoking the name; Valeu !!!',
      teaserEs: 'Eco BudGanja — el chacal que pesa, sin invocar el nombre; ¡Valeu !!!',
      body: anubis.poemPt(),
      bodyEn: anubis.poemEn(),
      bodyEs: anubis.poemEs(),
      inspectionHref: HREF_ANU,
      tags: ['poesia', 'vida', 'anubis', 'egito', 'mitologia']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poemas Vida actualizados');
  }

  try {
    await syncSql([postMito, postAnu]);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', postMito.title, '| Cap.', postMito.seriesOrder);
  console.log('OK:', postAnu.title, '| Cap.', postAnu.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
