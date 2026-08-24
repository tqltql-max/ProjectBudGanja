'use strict';

/**
 * Injeta / levanta for · if · else na série Palavras e no catálogo /tecnologia/.
 * Uso: node scripts/upsert-palavra-for-if-else-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildForIfElsePost } = require('../lib/for-if-else-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const TEC_FILE = path.join(ROOT, 'content', 'tecnologia.json');
const HREF = '/posts/post-inspecao-palavra-for-if-else.html';
const MARIA_HREF = '/posts/post-inspecao-palavra-maria.html';

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

function glossHasQuoted(src, key) {
  return new RegExp('    "' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '": \\{').test(src);
}

function replaceQuotedGloss(src, key, line) {
  const re = new RegExp(
    '    "' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '": \\{[\\s\\S]*?\\},\\r?\\n'
  );
  if (re.test(src)) return src.replace(re, line);
  return src;
}

function insertAfterQuoted(src, afterKey, line) {
  const re = new RegExp(
    '(    "' + afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '": \\{[\\s\\S]*?\\},\\r?\\n)'
  );
  if (re.test(src)) return src.replace(re, '$1' + line);
  return src + line;
}

function patchGlossary(gloss) {
  const forLine =
    '    "for": { tone: "craft", category: "Léxico", mundane: "EN preposição de destino; PT homógrafo = conjuntivo; código = laço (aula 0).", gloss: "Sala A/B: EN for ≈ PT para — aponta a Maria. Sala C: for (…) do código — aula for/if/else em /tecnologia/. ≠ formaria ≠ por; Valeu !!!", href: "' +
    MARIA_HREF +
    '", en: "for", es: "para / por / for (código)" },\n';
  const ifLine =
    '    "if": { tone: "lab", category: "Ofício", mundane: "Palavra-reservada — se a condição for verdade, faz o bloco.", gloss: "Aula 0 em /tecnologia/: if pergunta; else é o outro pé; for repete com porta; ≠ destino; Valeu !!!", href: "' +
    HREF +
    '", en: "if", es: "si (código)", fr: "if / si", it: "if / se", de: "if / falls", el: "if", la: "si", yo: "bí", sw: "kama", gez: "ʾəmma", nl: "if", pl: "if", ru: "if", uk: "if", zh: "if", ja: "if", ko: "if", ar: "if", he: "if", hi: "if", tr: "if" },\n';
  const elseLine =
    '    "else": { tone: "lab", category: "Ofício", mundane: "Palavra-reservada — o outro caminho do if.", gloss: "Aula 0: else herda a pergunta do if e toma o contrário; irmão do interruptor; Valeu !!!", href: "' +
    HREF +
    '", en: "else", es: "si no / else", fr: "else / sinon", it: "else / altrimenti", de: "else / sonst", el: "else", la: "aliter", yo: "bí kò ṣe bẹ́ẹ̀", sw: "vinginevyo", gez: "ʾaw", nl: "else", pl: "else", ru: "else", zh: "else", ja: "else", ko: "else", ar: "else", he: "else", hi: "else", tr: "else" },\n';
  const forLoopLine =
    '    "for-loop": { tone: "lab", category: "Ofício", mundane: "Laço for do código — repetir com começo, porta e passo.", gloss: "Sala C do grafema for; aula 0 for/if/else; ≠ for da Maria; ≠ loop infinito; Valeu !!!", href: "' +
    HREF +
    '", en: "for loop", es: "bucle for" },\n';

  if (glossHasQuoted(gloss, 'for')) gloss = replaceQuotedGloss(gloss, 'for', forLine);
  else gloss = insertAfterQuoted(gloss, 'for', forLine);

  if (glossHasQuoted(gloss, 'if')) gloss = replaceQuotedGloss(gloss, 'if', ifLine);
  else gloss = insertAfterQuoted(gloss, 'for', ifLine);

  if (glossHasQuoted(gloss, 'else')) gloss = replaceQuotedGloss(gloss, 'else', elseLine);
  else gloss = insertAfterQuoted(gloss, 'if', elseLine);

  if (glossHasQuoted(gloss, 'for-loop')) gloss = replaceQuotedGloss(gloss, 'for-loop', forLoopLine);
  else gloss = insertAfterQuoted(gloss, 'else', forLoopLine);

  return gloss;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'palavra-for-if-else';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'For / If / Else — aula 0 de programar',
    titleEn: 'For / If / Else — programming lesson 0',
    titleEs: 'For / If / Else — aula 0 de programar',
    tipo: 'palavra',
    priority: 1,
    status: 'feita',
    why: 'Palavras: for / if / else — decidir, outro caminho, repetir com fim; aula 0 no catálogo Tecnologia; ≠ Maria ≠ loop infinito.',
    whyEn: 'Words: for / if / else — decide, other path, repeat with an end; lesson 0 in Tecnologia; ≠ Maria ≠ infinite loop.',
    whyEs: 'Palabras: for / if / else — decidir, otro camino, repetir con fin; aula 0 en Tecnologia; ≠ Maria ≠ loop infinito.',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'palavras-origem',
    sources: [
      'https://en.wikipedia.org/wiki/Control_flow',
      'https://en.wiktionary.org/wiki/if',
      'https://en.wiktionary.org/wiki/else',
      'https://en.wiktionary.org/wiki/for',
      '/tecnologia/',
      '/posts/post-inspecao-palavra-script.html',
      '/posts/post-inspecao-palavra-loop.html',
      MARIA_HREF,
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — aula 0; bancada no hub /tecnologia/.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuiaEntry(items, entry, afterIds) {
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) {
    items[gi] = Object.assign({}, items[gi], entry);
    return;
  }
  const after = items.findIndex((x) => afterIds.indexOf(x.id) >= 0);
  if (after >= 0) items.splice(after + 1, 0, entry);
  else items.push(entry);
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  upsertGuiaEntry(
    items,
    {
      id: 'for',
      word: 'for',
      group: 'lexico',
      fromTitle: false,
      href: MARIA_HREF,
      simple:
        'Três salas: A EN preposição ≈ PT para (Maria); B conjuntivo ser/ir; C laço de código — aula for/if/else em /tecnologia/. Valeu !!!',
      simpleEn:
        'Three rooms: A EN preposition ≈ PT para (Maria); B ser/ir subjunctive; C code loop — for/if/else lesson at /tecnologia/. Valeu !!!',
      simpleEs:
        'Tres salas: A preposición EN ≈ PT para (Maria); B subjuntivo ser/ir; C bucle de código — aula for/if/else en /tecnologia/. ¡Valeu !!!'
    },
    ['maria']
  );
  upsertGuiaEntry(
    items,
    {
      id: 'if',
      word: 'if',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        'Palavra-reservada: se a condição for verdade, faz o bloco. Aula 0 em /tecnologia/ com else e for. Valeu !!!',
      simpleEn:
        'Reserved word: if the condition is true, run the block. Lesson 0 at /tecnologia/ with else and for. Valeu !!!',
      simpleEs:
        'Palabra reservada: si la condición es verdad, hace el bloque. Aula 0 en /tecnologia/ con else y for. ¡Valeu !!!',
      history:
        'If vem do inglês «se». No código é a pergunta. No laboratório é a aula 0: o interruptor do texto. Irmãos else (o outro pé) e for (repetir com porta).',
      curiosities:
        'Não é destino. A bancada em /tecnologia/ demonstra com vasos — não executa texto livre. Valeu !!!',
      historyEn:
        'If comes from English “if”. In code it is the question. In the lab it is lesson 0: the switch in text. Siblings else (the other foot) and for (repeat with a door).',
      curiositiesEn:
        'It is not destiny. The bench at /tecnologia/ demos with pots — it does not run free text. Valeu !!!',
      historyEs:
        'If viene del inglés «si». En código es la pregunta. En el laboratorio es el aula 0: el interruptor del texto. Hermanos else (el otro pie) y for (repetir con puerta).',
      curiositiesEs:
        'No es destino. La bancada en /tecnologia/ demuestra con macetas — no ejecuta texto libre. ¡Valeu !!!'
    },
    ['for', 'script']
  );
  upsertGuiaEntry(
    items,
    {
      id: 'else',
      word: 'else',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        'Palavra-reservada: o outro caminho do if. Aula 0 em /tecnologia/. Valeu !!!',
      simpleEn:
        'Reserved word: the other path of if. Lesson 0 at /tecnologia/. Valeu !!!',
      simpleEs:
        'Palabra reservada: el otro camino del if. Aula 0 en /tecnologia/. ¡Valeu !!!'
    },
    ['if']
  );
  upsertGuiaEntry(
    items,
    {
      id: 'for-loop',
      word: 'for (código)',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        'Laço for: repetir com começo, porta e passo. Sala C do grafema for; ≠ Maria ≠ loop infinito. Aula 0. Valeu !!!',
      simpleEn:
        'For loop: repeat with start, door and step. Room C of the glyph for; ≠ Maria ≠ infinite loop. Lesson 0. Valeu !!!',
      simpleEs:
        'Bucle for: repetir con inicio, puerta y paso. Sala C del grafema for; ≠ Maria ≠ loop infinito. Aula 0. ¡Valeu !!!'
    },
    ['else', 'loop']
  );
  guia.items = items;
}

function upsertTecnologia(catalog) {
  const items = Array.isArray(catalog.items) ? catalog.items : [];
  const entry = {
    id: 'for-if-else',
    slug: 'for-if-else',
    nome: 'For / If / Else',
    nomeEn: 'For / If / Else',
    nomeEs: 'For / If / Else',
    kicker: 'Programação · aula 0',
    kickerEn: 'Programming · lesson 0',
    kickerEs: 'Programación · aula 0',
    summary:
      'Decidir, o outro caminho, repetir com fim. Aula 0 de programar neste catálogo.',
    summaryEn:
      'Decide, the other path, repeat with an end. Programming lesson 0 in this catalog.',
    summaryEs:
      'Decidir, el otro camino, repetir con fin. Aula 0 de programar en este catálogo.',
    category: 'programacao',
    tags: ['if', 'else', 'for', 'aula', 'javascript'],
    href: HREF,
    featured: true
  };
  const idx = items.findIndex((x) => x.id === entry.id || x.slug === entry.slug);
  if (idx >= 0) items[idx] = Object.assign({}, items[idx], entry);
  else {
    const after = items.findIndex((x) => x.id === 'script' || x.id === 'node');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  catalog.items = items;
  catalog.updatedAt = new Date().toISOString();
  catalog.disclaimer =
    catalog.disclaimer ||
    'Catálogo educacional de ofício técnico: vocábulos, aparelhos e jargão de informática. Não é manual de montagem, não é loja, não é metáfora de pessoas.';
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-for-if-else-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE)
    ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'))
    : { items: [] };
  const guia = fs.existsSync(GUIA_FILE)
    ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'))
    : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';
  const tec = fs.existsSync(TEC_FILE)
    ? JSON.parse(fs.readFileSync(TEC_FILE, 'utf8'))
    : { items: [] };

  const post = stampFiles(buildForIfElsePost());
  upsertPost(posts, post);
  writeHtml(post);
  writeI18n(i18n, post);
  upsertSug(sug, post);
  upsertGuia(guia);
  upsertTecnologia(tec);
  if (gloss) gloss = patchGlossary(gloss);

  sug.updatedAt = new Date().toISOString();
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  await writeJsonRetry(SUG_FILE, sug);
  await writeJsonRetry(GUIA_FILE, guia);
  await writeJsonRetry(TEC_FILE, tec);
  if (gloss) {
    fs.writeFileSync(GLOSS_FILE, gloss, 'utf8');
    console.log('Glossário actualizado (if / else / for-loop)');
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
