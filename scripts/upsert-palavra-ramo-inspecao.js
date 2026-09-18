'use strict';

/**
 * Injeta a palavra «ramo» (branch / brunch).
 * Uso: node scripts/upsert-palavra-ramo-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildRamoPost } = require('../lib/ramo-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-ramo.html';

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
    '    ramo: { tone: "craft", category: "Ofício", mundane: "Braço da planta; no git, a linha de commits (branch).", gloss: "Lat. ramus — planta primeiro; git branch = linha de rasto; a orelha cola brunch; ≠ árvore de trabalho ≠ Árvore da Vida; Faça o melhor!", href: "/posts/post-inspecao-palavra-ramo.html", en: "branch (git) / plant limb", es: "rama", fr: "branche", it: "ramo", de: "Zweig / Branch", el: "κλαδί", la: "ramus", yo: "ẹ̀ka", sw: "tawi", gez: "qʷəṣl", nl: "tak", pl: "gałąź", ru: "ветка", uk: "гілка", zh: "分支", ja: "枝 / ブランチ", ko: "가지 / 브랜치", ar: "فرع", he: "ענף", hi: "शाखा", tr: "dal / branch", sv: "gren", da: "gren", no: "gren", fi: "oksa", cs: "větev", ro: "ramură", hu: "ág", ca: "branca", gl: "rama", eu: "adarra", gn: "rakã", qu: "k\'allma", eo: "branĉo", vi: "nhánh", id: "cabang", th: "กิ่ง", hr: "grana", sk: "vetva", ga: "brainse", cy: "cangen", ha: "reshe", am: "ቅርንጫፍ", fa: "شاخه", bn: "শাখা", zu: "igatsha" },\n' +
    '    branch: { gloss: "EN git — linha de rasto. Calco PT: ramo. ≠ brunch. ≠ árvore de trabalho. Corte na ficha ramo.", href: "/posts/post-inspecao-palavra-ramo.html", en: "branch", es: "rama / branch" },\n' +
    '    brunch: { gloss: "Lapso de branch — breakfast + lunch. A orelha cola. Corte na ficha ramo.", href: "/posts/post-inspecao-palavra-ramo.html", en: "brunch (slip for branch)", es: "brunch (lapsus de branch)" },\n';

  if (/    ramo:\s*\{/.test(gloss) && /href: "\/posts\/post-inspecao-palavra-ramo.html"/.test(gloss)) {
    console.log('Glossário: ramo já existia — bloco não duplicado');
    return gloss;
  }
  if (/    worktree:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    worktree:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + block);
  } else if (/    giria:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    giria:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + block);
  } else {
    console.warn('Aviso: glossário — ponto de inserção não encontrado');
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-ramo-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildRamoPost());
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
    const sugId = 'palavra-ramo';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Ramo — branch; a planta primeiro; a orelha cola brunch',
      titleEn: 'Ramo — branch; the plant first; the ear glues brunch',
      titleEs: 'Ramo — branch; la planta primero; el oído pega brunch',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: ramo (lat. ramus) × git branch. Brunch = lapso. ≠ árvore de trabalho ≠ Árvore da Vida.',
      whyEn: 'Words: ramo (Lat. ramus) × git branch. Brunch = slip. ≠ working tree ≠ Árvore da Vida.',
      whyEs: 'Palabras: ramo (lat. ramus) × git branch. Brunch = lapsus. ≠ árvore de trabalho ≠ Árvore da Vida.',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://git-scm.com/docs/git-branch',
        '/posts/post-inspecao-palavra-arvore-de-trabalho.html',
        '/posts/post-inspecao-palavra-arvore-da-vida.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — planta primeiro; brunch ≠ branch.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (palavra-ramo)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'ramo',
        word: 'ramo',
        simple:
          'Lat. ramus — planta primeiro. Git branch = linha de rasto. A orelha cola brunch. ≠ árvore de trabalho ≠ Árvore da Vida. Faça o melhor!',
        simpleEn:
          'Lat. ramus — plant first. Git branch = line of history. The ear glues brunch. ≠ working tree ≠ Árvore da Vida. Do your best!',
        simpleEs:
          'Lat. ramus — planta primero. Git branch = línea de rastro. El oído pega brunch. ≠ árvore de trabalho ≠ Árvore da Vida. ¡Haz lo mejor!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['arvore-de-trabalho', 'commitar', 'arvore']
    );
    upsertItem(
      items,
      {
        id: 'brunch',
        word: 'brunch',
        simple:
          'Lapso de branch — breakfast + lunch. Corte na ficha ramo. Faça o melhor!',
        simpleEn:
          'Slip for branch — breakfast + lunch. Cut on the ramo sheet. Do your best!',
        simpleEs:
          'Lapsus de branch — breakfast + lunch. Corte en la ficha ramo. ¡Haz lo mejor!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['ramo']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (ramo · brunch)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(GLOSS_FILE, next, 'utf8');
      console.log('Glossário actualizado (ramo)');
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
