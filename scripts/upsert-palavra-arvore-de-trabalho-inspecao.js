'use strict';

/**
 * Injeta a palavra «árvore de trabalho» (working tree / work three).
 * Uso: node scripts/upsert-palavra-arvore-de-trabalho-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildArvoreDeTrabalhoPost } = require('../lib/arvore-de-trabalho-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-arvore-de-trabalho.html';

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
    '    worktree: { tone: "craft", category: "Ofício", mundane: "Árvore de ficheiros que se edita no git; comando para uma árvore a mais.", gloss: "Working tree = chão de ficheiros; worktree = checkout extra; a orelha cola work three; ≠ Árvore da Vida; Valeu !!!", href: "/posts/post-inspecao-palavra-arvore-de-trabalho.html", en: "working tree / worktree", es: "árbol de trabajo", fr: "arbre de travail", it: "albero di lavoro", de: "Arbeitsbaum", el: "δέντρο εργασίας", la: "arbor laboris", yo: "igi iṣẹ́", sw: "mti wa kazi", gez: "ʕəṣ", nl: "werkboom", pl: "drzewo robocze", ru: "рабочее дерево", uk: "робоче дерево", zh: "工作树", ja: "作業ツリー", ko: "작업 트리", ar: "شجرة العمل", he: "עץ עבודה", hi: "कार्य वृक्ष", tr: "çalışma ağacı", sv: "arbetsträd", da: "arbejdstræ", no: "arbeidstre", fi: "työpuu", cs: "pracovní strom", ro: "arbore de lucru", hu: "munkafa", ca: "arbre de treball", gl: "árbore de traballo", eu: "lan-zuhaitz", gn: "yvyra ñemba´apo", qu: "llank\'ana sacha", eo: "laborarbo", vi: "cây làm việc", id: "pohon kerja", th: "ต้นไม้ทำงาน", hr: "radno stablo", sk: "pracovný strom", ga: "crann oibre", cy: "coeden waith", ha: "bishiyar aiki", am: "የሥራ ዛፍ", fa: "درخت کار", bn: "কাজের গাছ", zu: "isihlahla somsebenzi" },\n' +
    '    workingtree: { gloss: "EN working tree — chão de ficheiros checked out. Calco PT: árvore de trabalho. Corte na ficha árvore de trabalho.", href: "/posts/post-inspecao-palavra-arvore-de-trabalho.html", en: "working tree", es: "árbol de trabajo" },\n' +
    '    workthree: { gloss: "Lapso de work tree — a orelha cola three (três) em tree (árvore). Corte na ficha árvore de trabalho.", href: "/posts/post-inspecao-palavra-arvore-de-trabalho.html", en: "slip for work tree", es: "lapsus de work tree" },\n' +
    '    arvoredetrabalho: { gloss: "Calco PT de working tree — o chão de ficheiros. ≠ Árvore da Vida (planta). ≠ git worktree (árvore extra).", href: "/posts/post-inspecao-palavra-arvore-de-trabalho.html", en: "working tree", es: "árbol de trabajo" },\n';

  if (/    worktree:\s*\{/.test(gloss)) {
    console.log('Glossário: worktree já existia — bloco não duplicado');
    return gloss;
  }
  if (/    giria:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    giria:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + block);
  } else {
    console.warn('Aviso: glossário — ponto giria não encontrado');
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-arvore-de-trabalho-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildArvoreDeTrabalhoPost());
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
    const sugId = 'palavra-arvore-de-trabalho';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Árvore de trabalho — working tree; a orelha cola work three',
      titleEn: 'Working tree — árvore de trabalho; the ear glues work three',
      titleEs: 'Árbol de trabajo — working tree; el oído pega work three',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: árvore de trabalho (working tree). Work three = lapso. ≠ git worktree ≠ Árvore da Vida.',
      whyEn: 'Words: working tree. Work three = slip. ≠ git worktree ≠ Árvore da Vida.',
      whyEs: 'Palabras: working tree. Work three = lapsus. ≠ git worktree ≠ Árvore da Vida.',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://git-scm.com/docs/git-worktree',
        '/posts/post-inspecao-palavra-commitar.html',
        '/posts/post-inspecao-palavra-arvore-da-vida.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — tree × three; planta fica planta.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (palavra-arvore-de-trabalho)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'arvore-de-trabalho',
        word: 'árvore de trabalho',
        simple:
          'Calco de working tree — chão de ficheiros. A orelha cola work three. ≠ git worktree ≠ Árvore da Vida. Valeu !!!',
        simpleEn:
          'Calque of working tree — files on disk. The ear glues work three. ≠ git worktree ≠ Árvore da Vida. Valeu !!!',
        simpleEs:
          'Calco de working tree — ficheros en disco. El oído pega work three. ≠ git worktree ≠ Árvore da Vida. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['commitar', 'giria', 'arvore', 'árvore']
    );
    upsertItem(
      items,
      {
        id: 'work-three',
        word: 'work three',
        simple:
          'Lapso de work tree — three (três) ≠ tree (árvore). Corte na ficha árvore de trabalho. Valeu !!!',
        simpleEn:
          'Slip for work tree — three ≠ tree. Cut on the working-tree sheet. Valeu !!!',
        simpleEs:
          'Lapsus de work tree — three ≠ tree. Corte en la ficha árvore de trabalho. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['arvore-de-trabalho']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (árvore de trabalho · work three)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(GLOSS_FILE, next, 'utf8');
      console.log('Glossário actualizado (worktree)');
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
