'use strict';

/**
 * Injeta JavaScript na série Palavras (Java + Script).
 * Uso: node scripts/upsert-palavra-javascript-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildJavascriptPost,
  poemPt,
  poemEn,
  poemEs,
  HREF,
  WIKT,
  WIKI,
  WIKT_JAVA,
  WIKI_ES
} = require('../lib/javascript-inspecao-post.js');
const { buildScriptPost } = require('../lib/script-inspecao-post.js');
const { buildJsonPost } = require('../lib/json-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const SCRIPT_HREF = '/posts/post-inspecao-palavra-script.html';
const JSON_HREF = '/posts/post-inspecao-palavra-json.html';
const NODE_HREF = '/posts/post-inspecao-palavra-node.html';

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

function langsJs() {
  return 'en: "JavaScript", es: "JavaScript", fr: "JavaScript", it: "JavaScript", de: "JavaScript", el: "JavaScript", la: "JavaScript", yo: "JavaScript", sw: "JavaScript", gez: "JavaScript", nl: "JavaScript", pl: "JavaScript", ru: "JavaScript", uk: "JavaScript", zh: "JavaScript", ja: "JavaScript / ジャバスクリプト", ko: "자바스크립트", ar: "جافا سكريبت", he: "JavaScript", hi: "जावास्क्रिप्ट", tr: "JavaScript", sv: "JavaScript", da: "JavaScript", no: "JavaScript", fi: "JavaScript", cs: "JavaScript", ro: "JavaScript", hu: "JavaScript", ca: "JavaScript", gl: "JavaScript", eu: "JavaScript", gn: "JavaScript", qu: "JavaScript", eo: "Ĝavaskripto", vi: "JavaScript", id: "JavaScript", th: "จาวาสคริปต์", hr: "JavaScript", sk: "JavaScript", ga: "JavaScript", cy: "JavaScript", ha: "JavaScript", am: "ጃቫስክሪፕት", fa: "جاوااسکریپت", bn: "জাভাস্ক্রিপ্ট", zu: "i-JavaScript"';
}

function patchGlossary(gloss) {
  const main =
    '    javascript: { tone: "craft", category: "Léxico", mundane: "Composto EN Java + Script — língua do browser e do Node.", gloss: "Java + Script; o + é cartaz de 1995, não sangue; ≠ Java a língua ≠ café; elos script/JSON/Node; Valeu !!!", href: "' +
    HREF +
    '", ' +
    langsJs() +
    ' },\n';
  gloss = replaceOrInsertAfter(gloss, 'javascript', main, 'script');
  if (!/    javascript:\s*\{/.test(gloss)) {
    gloss = replaceOrInsertAfter(gloss, 'javascript', main, 'json');
  }
  const aliases = [
    [
      '"JavaScript"',
      '    "JavaScript": { gloss: "CamelCase — o mesmo composto Java + Script; ver javascript.", href: "' +
        HREF +
        '", en: "JavaScript", es: "JavaScript" },\n'
    ],
    [
      'js',
      '    js: { gloss: "Sigla de JavaScript / extensão .js — ver javascript.", href: "' +
        HREF +
        '", en: "JS", es: "JS" },\n'
    ],
    [
      'ecmascript',
      '    ecmascript: { gloss: "Nome da norma (ECMA-262) — a língua sem o cartaz Sun; ver javascript.", href: "' +
        HREF +
        '", en: "ECMAScript", es: "ECMAScript" },\n'
    ],
    [
      'livescript',
      '    livescript: { gloss: "Nome intermédio 1995 (live + script) antes do cartaz Java; ver javascript.", href: "' +
        HREF +
        '", en: "LiveScript", es: "LiveScript" },\n'
    ],
    [
      'java',
      '    java: { gloss: "Outra língua (e café / ilha) — não é JavaScript; o composto cola o íman; ver javascript.", href: "' +
        HREF +
        '", en: "Java (other language)", es: "Java (otra lengua)" },\n'
    ],
    [
      '"java + script"',
      '    "java + script": { gloss: "Pedido de campo — partir o camelCase; o + é cartaz, não sangue; ver javascript.", href: "' +
        HREF +
        '", en: "Java + Script", es: "Java + Script" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'javascript');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-javascript-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildJavascriptPost());
  const scriptPost = stampFiles(buildScriptPost());
  const jsonPost = stampFiles(buildJsonPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  upsertPost(posts, scriptPost);
  upsertPost(posts, jsonPost);
  await writeJsonRetry(POSTS_FILE, posts);

  writeHtml(post);
  writeHtml(scriptPost);
  writeHtml(jsonPost);

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  writeI18n(i18n, scriptPost);
  writeI18n(i18n, jsonPost);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(
      items,
      {
        id: 'palavra-javascript',
        title: 'JavaScript — Java + Script; o + é cartaz, não sangue',
        titleEn: 'JavaScript — Java + Script; the plus is a billboard, not blood',
        titleEs: 'JavaScript — Java + Script; el más es cartel, no sangre',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: JavaScript ← Java + Script; cola «é o Java» recusada; ≠ café ≠ ilha; elos script/JSON/Node; Valeu !!!',
        whyEn: 'Words: JavaScript ← Java + Script; “it is Java” glue refused; ≠ coffee ≠ island; links script/JSON/Node.',
        whyEs: 'Palabras: JavaScript ← Java + Script; cola «es el Java» rechazada; ≠ café ≠ isla; vínculos script/JSON/Node.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [HREF, SCRIPT_HREF, JSON_HREF, NODE_HREF, WIKT, WIKI, WIKT_JAVA, WIKI_ES],
        notes: 'Cap. ' + post.seriesOrder + ' — Java + Script; cartaz 1995; ≠ Java.'
      },
      ['palavra-script', 'palavra-json', 'palavra-node']
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
        id: 'javascript',
        word: 'JavaScript',
        simple:
          'Composto Java + Script. O + é cartaz de 1995, não sangue. ≠ Java a língua ≠ café ≠ ilha. Elos script / JSON / Node. Valeu !!!',
        simpleEn:
          'Compound Java + Script. The plus is a 1995 billboard, not blood. ≠ Java the language ≠ coffee ≠ island. Links script / JSON / Node. Valeu !!!',
        simpleEs:
          'Compuesto Java + Script. El más es cartel de 1995, no sangre. ≠ Java la lengua ≠ café ≠ isla. Vínculos script / JSON / Node. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'JavaScript é composto de marketing (Netscape, 1995): Mocha → LiveScript → JavaScript, para colar no hype da língua Java (Sun). Não é dialecto de Java. A norma chama-se ECMAScript. A peça Script é lat. scrīptum.',
        curiosities:
          'O pedido java + sCRIPT parte o camelCase: duas peças, um cartaz. No laboratório a língua vive em .js, na tag <script> e no Node. JSON é a notação de objectos desta língua.',
        historyEn:
          'JavaScript is a 1995 marketing compound (Netscape): Mocha → LiveScript → JavaScript, to ride Java’s (Sun) hype. It is not a dialect of Java. The standard is ECMAScript. Script is Lat. scrīptum.',
        curiositiesEn:
          'The request java + sCRIPT splits the camelCase: two pieces, one billboard. In the lab the language lives in .js, in the <script> tag and in Node. JSON is this language’s object notation.',
        historyEs:
          'JavaScript es compuesto de marketing (Netscape, 1995): Mocha → LiveScript → JavaScript, para pegarse al hype de Java (Sun). No es dialecto de Java. La norma es ECMAScript. Script es lat. scrīptum.',
        curiositiesEs:
          'El pedido java + sCRIPT parte el camelCase: dos piezas, un cartel. En el laboratorio la lengua vive en .js, en la etiqueta <script> y en Node. JSON es la notación de objetos de esta lengua.'
      },
      ['script', 'json', 'node']
    );
    upsertItem(
      items,
      {
        id: 'java',
        word: 'Java',
        simple:
          'Outra língua (e café / ilha). No composto JavaScript é só o íman de 1995. ≠ JavaScript. Valeu !!!',
        simpleEn:
          'Another language (and coffee / island). In the JavaScript compound it is only the 1995 magnet. ≠ JavaScript. Valeu !!!',
        simpleEs:
          'Otra lengua (y café / isla). En el compuesto JavaScript es solo el imán de 1995. ≠ JavaScript. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['javascript']
    );
    upsertItem(
      items,
      {
        id: 'js',
        word: 'JS',
        simple: 'Sigla de JavaScript / extensão .js. Ver JavaScript. Valeu !!!',
        simpleEn: 'Abbreviation of JavaScript / .js extension. See JavaScript. Valeu !!!',
        simpleEs: 'Sigla de JavaScript / extensión .js. Ver JavaScript. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['javascript']
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
      id: 'javascript',
      slug: 'javascript',
      title: 'JavaScript',
      titleEn: 'JavaScript',
      titleEs: 'JavaScript',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — Java + Script; o + é cartaz, não sangue; ≠ Java; Valeu !!!',
      teaserEn: 'BudGanja echo — Java + Script; the plus is a billboard, not blood; ≠ Java; Valeu !!!',
      teaserEs: 'Eco BudGanja — Java + Script; el más es cartel, no sangre; ≠ Java; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'javascript', 'java', 'script']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poema Vida actualizado');
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store', e.message);
  }

  console.log('OK:', post.title, '| Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
