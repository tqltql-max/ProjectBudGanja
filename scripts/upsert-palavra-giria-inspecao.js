'use strict';

/**
 * Injeta a palavra «gíria» na série Palavras
 * (girino / gerino · anival · sala das gírias).
 * Uso: node scripts/upsert-palavra-giria-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildGiriaPost } = require('../lib/giria-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-giria.html';

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

function patchGlossary(gloss) {
  const block =
    '    giria: { tone: "craft", category: "Literacia", mundane: "Fala de grupo; vocabulário informal.", gloss: "Origem controversa / jerigonza — fala de grupo; a orelha cola girino (γυρῖνος); sala das gírias; Valeu !!!", href: "/posts/post-inspecao-palavra-giria.html", en: "slang / in-group speech", es: "jerga", fr: "argot / jargon", it: "gergo / gergale", de: "Slang / Jargon", el: "αργκό", la: "sermo peculiaris", yo: "èdè ẹgbẹ́", sw: "lugha ya kundi", gez: "ləsan", nl: "straattaal", pl: "gwara / slang", ru: "сленг", uk: "сленг", zh: "俚语", ja: "俗語", ko: "속어", ar: "عامية", he: "סלנג", hi: "गली भाषा", tr: "argo", sv: "slang", da: "slang", no: "slang", fi: "slangi", cs: "slang", ro: "argou", hu: "szleng", ca: "argot", gl: "xerga", eu: "berbeta", gn: "ñe\'ẽ aty", qu: "huq simi", eo: "slango", vi: "tiếng lóng", id: "slang", th: "สแลง", hr: "sleng", sk: "slang", ga: "bearla eile", cy: "lleferydd grŵp", ha: "yaren ƙungiya", am: "የቡድን ቋንቋ", fa: "زبان عامیانه", bn: "স্ল্যাং", zu: "ulimi lweqembu" },\n' +
    '    girino: { gloss: "Gr. γυρῖνος / lat. gyrinus — larva de anfíbio (redonda); ≠ gíria. Animal primeiro. Corte na ficha gíria.", href: "/posts/post-inspecao-palavra-giria.html", en: "tadpole", es: "renacuajo" },\n' +
    '    gerino: { gloss: "Lapso de girino — gatilho anival gerino. Corte na ficha gíria.", href: "/posts/post-inspecao-palavra-giria.html", en: "slip for girino", es: "lapsus de girino" },\n' +
    '    anival: { gloss: "Lapso de animal — gatilho de campo na ficha gíria (relação com girino).", href: "/posts/post-inspecao-palavra-giria.html", en: "slip for animal", es: "lapsus de animal" },\n' +
    '    jargao: { gloss: "Fala de ofício — primo de gíria, não sinónimo. Corte na ficha gíria.", href: "/posts/post-inspecao-palavra-giria.html", en: "jargon (craft speech)", es: "jerga profesional" },\n' +
    '    calao: { gloss: "Camada grosseira / obscena — ≠ gíria de grupo. Corte na ficha gíria.", href: "/posts/post-inspecao-palavra-giria.html", en: "coarse slang / swearing", es: "lenguaje soez" },\n';

  if (/    giria:\s*\{/.test(gloss)) {
    console.log('Glossário: giria já existia — bloco não duplicado');
    return gloss;
  }
  if (/    gesso:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    gesso:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + block);
  } else {
    console.warn('Aviso: glossário — ponto gesso não encontrado');
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-giria-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildGiriaPost());
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
    const sugId = 'palavra-giria';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Gíria — fala de grupo; a orelha cola girino',
      titleEn: 'Gíria — in-group speech; the ear glues girino',
      titleEs: 'Gíria — habla de grupo; el oído pega girino',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: gíria (origem controversa / jerigonza). Girino ← γυρῖνος (animal). Gatilho anival gerino. Sala das gírias.',
      whyEn: 'Words: gíria (controversial / jerigonza). Girino ← γυρῖνος (animal). Slip anival gerino. Slang room.',
      whyEs: 'Palabras: gíria (origen controvertido / jerigonza). Girino ← γυρῖνος (animal). Lapsus anival gerino. Sala de jergas.',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/girino',
        'https://pt.wikipedia.org/wiki/Girino',
        '/posts/post-inspecao-palavra-animal.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — jerigonza × gyrinus; animal primeiro.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (palavra-giria)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'giria',
        word: 'gíria',
        simple:
          'Origem controversa / jerigonza — fala de grupo. A orelha cola girino (γυρῖνος). Sala das gírias. Valeu !!!',
        simpleEn:
          'Controversial / jerigonza — in-group speech. The ear glues girino (γυρῖνος). Slang room. Valeu !!!',
        simpleEs:
          'Origen controvertido / jerigonza — habla de grupo. El oído pega girino (γυρῖνος). Sala de jergas. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['gesso', 'gesto', 'ganja']
    );
    upsertItem(
      items,
      {
        id: 'girino',
        word: 'girino',
        simple:
          'Gr. γυρῖνος / lat. gyrinus — larva de anfíbio. ≠ gíria. Animal primeiro. Corte na ficha gíria. Valeu !!!',
        simpleEn:
          'Gk. γυρῖνος / Lat. gyrinus — amphibian larva. ≠ gíria. Animal first. Cut on the gíria sheet. Valeu !!!',
        simpleEs:
          'Gr. γυρῖνος / lat. gyrinus — larva de anfibio. ≠ gíria. Animal primero. Corte en la ficha gíria. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['giria']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (gíria · girino)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(GLOSS_FILE, next, 'utf8');
      console.log('Glossário actualizado (gíria)');
    }
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK Cap.', post.seriesOrder, post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
