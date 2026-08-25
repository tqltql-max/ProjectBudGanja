'use strict';

/**
 * Injeta JSON na série Palavras e cruza com PARK.
 * Uso: node scripts/upsert-palavra-json-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildJsonPost, poemPt, poemEn, poemEs, HREF, WIKT, WIKI } = require('../lib/json-inspecao-post.js');
const { buildParkinsonPost, HREF_P, HREF_Q, HREF_Y } = require('../lib/parkinson-parque-party-cluster.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');

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

function langsJson() {
  return 'en: "JSON", es: "JSON", fr: "JSON", it: "JSON", de: "JSON", el: "JSON", la: "JSON", yo: "JSON", sw: "JSON", gez: "JSON", nl: "JSON", pl: "JSON", ru: "JSON", uk: "JSON", zh: "JSON", ja: "JSON", ko: "JSON", ar: "JSON", he: "JSON", hi: "JSON", tr: "JSON", sv: "JSON", da: "JSON", no: "JSON", fi: "JSON", cs: "JSON", ro: "JSON", hu: "JSON", ca: "JSON", gl: "JSON", eu: "JSON", gn: "JSON", qu: "JSON", eo: "JSON", vi: "JSON", id: "JSON", th: "JSON", hr: "JSON", sk: "JSON", ga: "JSON", cy: "JSON", ha: "JSON", am: "JSON", fa: "JSON", bn: "JSON", zu: "i-JSON"';
}

function patchGlossary(gloss) {
  const main =
    '    json: { tone: "craft", category: "Léxico", mundane: "Notação de objectos — JavaScript Object Notation.", gloss: "JSON = notação; PARK parqueia objectos no ficheiro; ≠ Jason ≠ Parkinson (jay-son); Valeu !!!", href: "' +
    HREF +
    '", ' +
    langsJson() +
    ' },\n';
  gloss = replaceOrInsertAfter(gloss, 'json', main, 'script');
  if (!/    json:\s*\{/.test(gloss)) {
    gloss = replaceOrInsertAfter(gloss, 'json', main, 'node');
  }
  const aliases = [
    [
      '"JSON"',
      '    "JSON": { gloss: "Maiúsculas — o mesmo acrónimo; ver json.", href: "' +
        HREF +
        '", en: "JSON", es: "JSON" },\n'
    ],
    [
      'jason',
      '    jason: { gloss: "Nome / homófona EN de JSON — não é a notação; ver json.", href: "' +
        HREF +
        '", en: "Jason (name; not JSON)", es: "Jason (nombre; no es JSON)" },\n'
    ],
    [
      '"jay-son"',
      '    "jay-son": { gloss: "Pronúncia EN de JSON — cola no -son de Parkinson; ver json.", href: "' +
        HREF +
        '", en: "jay-son (pronunciation)", es: "jay-son (pronunciación)" },\n'
    ],
    [
      '"to park"',
      '    "to park": { gloss: "Verbo EN — deixar no recinto; no lab, parquear objectos em JSON; ver json e parque de diversões.", href: "' +
        HREF +
        '", en: "to park", es: "aparcar / estacionar" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'json');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-json-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildJsonPost());
  const parkinson = stampFiles(buildParkinsonPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  upsertPost(posts, parkinson);
  await writeJsonRetry(POSTS_FILE, posts);

  writeHtml(post);
  writeHtml(parkinson);

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  writeI18n(i18n, parkinson);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(
      items,
      {
        id: 'palavra-json',
        title: 'JSON — notação; PARK parqueia objectos; ≠ Jason ≠ Parkinson',
        titleEn: 'JSON — notation; PARK parks objects; ≠ Jason ≠ Parkinson',
        titleEs: 'JSON — notación; PARK aparca objetos; ≠ Jason ≠ Parkinson',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: JSON = JavaScript Object Notation; relacionar PARK (recinto / to park); cola jay-son com Parkinson recusada; Valeu !!!',
        whyEn: 'Words: JSON = JavaScript Object Notation; relate PARK (enclosure / to park); jay-son glue to Parkinson refused.',
        whyEs: 'Palabras: JSON = JavaScript Object Notation; relacionar PARK (recinto / to park); cola jay-son con Parkinson rechazada.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [HREF, HREF_P, HREF_Q, HREF_Y, WIKT, WIKI, '/posts/post-inspecao-palavra-script.html'],
        notes: 'Cap. ' + post.seriesOrder + ' — PARK × JSON; notação ≠ apelido.'
      },
      ['palavra-parkinson', 'palavra-party', 'palavra-script']
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
        id: 'json',
        word: 'JSON',
        simple:
          'JavaScript Object Notation. Relacionar PARK: o lab parqueia objectos no ficheiro. Soa jay-son — ≠ Jason ≠ Parkinson. Valeu !!!',
        simpleEn:
          'JavaScript Object Notation. Relate PARK: the lab parks objects in the file. Sounds like jay-son — ≠ Jason ≠ Parkinson. Valeu !!!',
        simpleEs:
          'JavaScript Object Notation. Relacionar PARK: el lab aparca objetos en el archivo. Suena jay-son — ≠ Jason ≠ Parkinson. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'JSON é acrónimo de JavaScript Object Notation (cunhagem de Douglas Crockford, ~2001; ECMA-404 / RFC 8259). Não vem de Jason nem do patronímico -son.',
        curiosities:
          'A orelha EN ouve jay-son e cola no -son de Parkinson. PARK é o recinto e o verbo to park: no laboratório os objectos ficam no .json. Quatro letras, outro mapa.',
        historyEn:
          'JSON is the acronym for JavaScript Object Notation (Crockford, ~2001). It does not come from Jason or from the patronymic -son.',
        curiositiesEn:
          'The English ear hears jay-son and glues it to Parkinson’s -son. PARK is the enclosure and the verb to park: in the lab, objects sit in .json.',
        historyEs:
          'JSON es el acrónimo de JavaScript Object Notation (Crockford, ~2001). No viene de Jason ni del patronímico -son.',
        curiositiesEs:
          'El oído EN oye jay-son y lo pega al -son de Parkinson. PARK es el recinto y el verbo to park: en el laboratorio los objetos quedan en .json.'
      },
      ['parkinson', 'party', 'script']
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
      id: 'json',
      slug: 'json',
      title: 'JSON',
      titleEn: 'JSON',
      titleEs: 'JSON',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — notação; PARK parqueia objectos; ≠ Jason ≠ Parkinson; Valeu !!!',
      teaserEn: 'BudGanja echo — notation; PARK parks objects; ≠ Jason ≠ Parkinson; Valeu !!!',
      teaserEs: 'Eco BudGanja — notación; PARK aparca objetos; ≠ Jason ≠ Parkinson; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'json', 'park', 'parkinson']
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
