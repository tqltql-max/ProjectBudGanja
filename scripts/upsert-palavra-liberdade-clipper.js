'use strict';

/**
 * Publica Liberdade + isqueiro Clipper; regenera BIC e DSL (elos).
 * Uso: node scripts/upsert-palavra-liberdade-clipper.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildLiberdadePost, poemPt: libPt, poemEn: libEn, poemEs: libEs } = require('../lib/liberdade-inspecao-post.js');
const {
  buildIsqueiroClipperPost,
  poemPt: clipPt,
  poemEn: clipEn,
  poemEs: clipEs
} = require('../lib/isqueiro-clipper-inspecao-post.js');
const { buildIsqueiroBicPost } = require('../lib/isqueiro-bic-inspecao-post.js');
const { buildDslPost } = require('../lib/dsl-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');

const LIB_HREF = '/posts/post-inspecao-palavra-liberdade.html';
const CLIP_HREF = '/posts/post-inspecao-palavra-isqueiro-clipper.html';
const BIC_HREF = '/posts/post-inspecao-palavra-isqueiro-bic.html';

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
  const taken = new Set(
    posts
      .filter((x) => x.slug !== post.slug && x.series === 'palavras-origem')
      .map((x) => Number(x.seriesOrder) || 0)
  );
  let order = Number(post.seriesOrder) || 0;
  if (idx >= 0 && Number(posts[idx].seriesOrder)) order = Number(posts[idx].seriesOrder);
  while (taken.has(order)) order += 1;
  post.seriesOrder = order;
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
  const libMain =
    '    liberdade: { tone: "craft", category: "Léxico", mundane: "Condição de quem é livre — o nome, não o bairro.", gloss: "Lat. lībertās; livre/libre; ≠ bairro SP ≠ Shawshank ≠ DSL; Cantouou · Ufa!!!; Valeu !!!", href: "' +
    LIB_HREF +
    '", en: "freedom / liberty", es: "libertad", fr: "liberté", it: "libertà", de: "Freiheit", el: "ελευθερία", la: "libertas", yo: "òmìnira", sw: "uhuru", gez: "ḫarənnät", nl: "vrijheid", pl: "wolność", ru: "свобода", uk: "свобода", zh: "自由", ja: "自由", ko: "자유", ar: "حرية", he: "חופש", hi: "स्वतंत्रता", tr: "özgürlük", sv: "frihet", da: "frihed", no: "frihet", fi: "vapaus", cs: "svoboda", ro: "libertate", hu: "szabadság", ca: "llibertat", gl: "liberdade", eu: "askatasun", gn: "sãso", qu: "qispi kay", eo: "libereco", vi: "tự do", id: "kebebasan", th: "เสรีภาพ", hr: "sloboda", sk: "sloboda", ga: "saoirse", cy: "rhyddid", ha: "yanci", am: "ነፃነት", fa: "آزادی", bn: "স্বাধীনতা", zu: "inkululeko" },\n';
  gloss = replaceOrInsertAfter(gloss, 'liberdade', libMain, 'ufa');
  const libAliases = [
    '    livre: { gloss: "Adjectivo — qualidade; o nome é liberdade.", href: "' +
      LIB_HREF +
      '", en: "free (adj.)", es: "libre (adj.)" },\n',
    '    libre: { gloss: "ES/FR irmã de livre — ver liberdade; ≠ DSL.", href: "' +
      LIB_HREF +
      '", en: "libre", es: "libre" },\n',
    '    "estou livre": { gloss: "Adjectivo ou linha DSL livre — ver liberdade e DSL.", href: "' +
      LIB_HREF +
      '", en: "I am free", es: "estoy libre" },\n',
    '    "liberdade total": { gloss: "Pedido de olhar todas as salas — não carta branca; ver liberdade.", href: "' +
      LIB_HREF +
      '", en: "total freedom (all rooms)", es: "libertad total" },\n',
    '    liberdaded: { gloss: "Lapso de liberdade — ver a ficha.", href: "' + LIB_HREF + '", en: "slip for liberdade", es: "lapsus de liberdade" },\n'
  ];
  for (const line of libAliases) {
    const key = line.match(/^\s+("[^"]+"|[a-z0-9-]+):/)[1];
    gloss = replaceOrInsertAfter(gloss, key, line, 'liberdade');
  }

  const clipMain =
    '    clipper: { tone: "caution", category: "Utensílio", mundane: "Isqueiro Flamagas recarregável; também máquina de cabelo / navio.", gloss: "Aqui = isqueiro Clipper; ≠ cabelo ≠ navio ≠ clipe; irmão BIC; Valeu !!!", href: "' +
    CLIP_HREF +
    '", en: "Clipper (lighter)", es: "Clipper (encendedor)" },\n';
  gloss = replaceOrInsertAfter(gloss, 'clipper', clipMain, 'bic');
  gloss = replaceOrInsertAfter(
    gloss,
    '"isqueiro clipper"',
    '    "isqueiro clipper": { gloss: "Tipo recarregável — ver Clipper; par BIC.", href: "' +
      CLIP_HREF +
      '", en: "Clipper lighter", es: "encendedor Clipper" },\n',
    'clipper'
  );
  gloss = replaceOrInsertAfter(
    gloss,
    'flamagas',
    '    flamagas: { gloss: "Casa de Barcelona do isqueiro Clipper — ver Clipper.", href: "' +
      CLIP_HREF +
      '", en: "Flamagas", es: "Flamagas" },\n',
    'clipper'
  );
  return gloss;
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

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-liberdade-clipper-covers.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capas:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE) ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8')) : { items: [] };
  const guia = fs.existsSync(GUIA_FILE) ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8')) : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';
  const vida = fs.existsSync(VIDA_FILE) ? JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8')) : { poems: [] };

  const list = [
    {
      post: stampFiles(buildLiberdadePost()),
      sugId: 'palavra-liberdade',
      sugTitle: 'Liberdade — o nome, as salas',
      why: 'Palavras: liberdade (lībertās); ≠ bairro ≠ filme ≠ DSL; Valeu !!!',
      guiaId: 'liberdade',
      guiaWord: 'liberdade',
      guiaSimple:
        'Lat. lībertās — o nome. Livre/libre = adjectivo. ≠ bairro SP ≠ Shawshank ≠ linha DSL. Valeu !!!',
      guiaAfter: ['ufa', 'legal', 'dsl'],
      poem: {
        id: 'liberdade',
        title: 'Liberdade',
        teaser: 'O nome — todas as salas, nenhuma fundida.',
        pt: libPt,
        en: libEn,
        es: libEs,
        tags: ['poesia', 'vida', 'liberdade']
      }
    },
    {
      post: stampFiles(buildIsqueiroClipperPost()),
      sugId: 'palavra-isqueiro-clipper',
      sugTitle: 'Isqueiro Clipper — irmão recarregável do BIC',
      why: 'Palavras: Clipper = isqueiro Flamagas; ≠ cabelo ≠ navio; par BIC; Valeu !!!',
      guiaId: 'clipper',
      guiaWord: 'Clipper',
      guiaSimple:
        'Isqueiro Flamagas recarregável. ≠ máquina de cabelo ≠ navio ≠ clipe. Irmão do BIC. Valeu !!!',
      guiaAfter: ['isqueiro-bic', 'bic', 'fogo'],
      poem: {
        id: 'clipper',
        title: 'Clipper',
        teaser: 'O isqueiro que volta ao gás — irmão do BIC.',
        pt: clipPt,
        en: clipEn,
        es: clipEs,
        tags: ['poesia', 'vida', 'clipper', 'isqueiro']
      }
    }
  ];

  for (const cfg of list) {
    const post = cfg.post;
    upsertPost(posts, post);
    try {
      writeHtml(post);
    } catch (e) {
      console.warn('Aviso HTML', post.slug, e.message);
    }
    writeI18n(i18n, post);
    upsertItem(sug.items || (sug.items = []), {
      id: cfg.sugId,
      title: cfg.sugTitle,
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: cfg.why,
      suggestedSlug: post.slug,
      doneHref: '/' + String(post.filename).replace(/^\/+/, ''),
      seriesHint: 'palavras-origem',
      notes: 'Cap. ' + post.seriesOrder
    });
    upsertItem(
      guia.items || (guia.items = []),
      {
        id: cfg.guiaId,
        word: cfg.guiaWord,
        group: 'lexico',
        fromTitle: false,
        href: '/' + String(post.filename).replace(/^\/+/, ''),
        simple: cfg.guiaSimple,
        simpleEn: cfg.guiaSimple,
        simpleEs: cfg.guiaSimple
      },
      cfg.guiaAfter
    );
    if (cfg.poem) {
      upsertVidaPoem(vida, {
        id: cfg.poem.id,
        slug: cfg.poem.id,
        title: cfg.poem.title,
        titleEn: cfg.poem.title,
        titleEs: cfg.poem.title,
        author: 'Laboratório BudGanja',
        teaser: cfg.poem.teaser,
        body: cfg.poem.pt(),
        bodyEn: cfg.poem.en(),
        bodyEs: cfg.poem.es(),
        inspectionHref: '/' + String(post.filename).replace(/^\/+/, ''),
        tags: cfg.poem.tags
      });
    }
    try {
      await syncSql(post);
    } catch (e) {
      console.warn('Aviso SQL:', e.message);
    }
    console.log('OK:', post.title, '· Cap.', post.seriesOrder);
  }

  try {
    const bic = stampFiles(buildIsqueiroBicPost());
    upsertPost(posts, bic);
    writeHtml(bic);
    writeI18n(i18n, bic);
  } catch (e) {
    console.warn('Aviso BIC:', e.message);
  }
  try {
    const dsl = stampFiles(buildDslPost());
    upsertPost(posts, dsl);
    writeHtml(dsl);
    writeI18n(i18n, dsl);
  } catch (e) {
    console.warn('Aviso DSL:', e.message);
  }

  if (gloss) gloss = patchGlossary(gloss);

  sug.updatedAt = new Date().toISOString();
  guia.updatedAt = new Date().toISOString();

  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  await writeJsonRetry(SUG_FILE, sug);
  await writeJsonRetry(GUIA_FILE, guia);
  if (gloss) await writeJsonRetry(GLOSS_FILE, gloss);
  await writeJsonRetry(VIDA_FILE, vida);

  console.log('OK cluster Liberdade + Clipper. Elos:', LIB_HREF, CLIP_HREF, BIC_HREF);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
