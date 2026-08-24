'use strict';

/**
 * Injeta palavra «tele» na série Palavras.
 * Uso: node scripts/upsert-palavra-tele-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildTelePost,
  WIKT,
  WIKT_TELE_GR,
  WIKT_TV,
  WIKT_TEL,
  WIKT_TELA
} = require('../lib/tele-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-tele.html';

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
    '    tele: { tone: "craft", category: "Léxico", mundane: "Prefixo grego «longe»; no BR, recorte de televisão.", gloss: "Gr. têle — longe; recorte «a tele» (TV); ≠ tela (lat. tēla); família telefone/telescópio; Valeu !!!", href: "' +
    HREF +
    '", en: "tele- / TV (clipping)", es: "tele- / tele (TV)", fr: "télé-", it: "tele-", de: "tele- / Fern-", el: "τῆλε", la: "tele- (gr.)", yo: "jìnnà", sw: "mbali", gez: "ruhuq", nl: "tele-", pl: "tele-", ru: "теле-", uk: "теле-", zh: "远距", ja: "テレ", ko: "텔레", ar: "عن بُعد", he: "טל-", hi: "टेली", tr: "tele-", sv: "tele-", da: "tele-", no: "tele-", fi: "tele-", cs: "tele-", ro: "tele-", hu: "tele-", ca: "tele-", gl: "tele-", eu: "tele-", gn: "mombyry", qu: "karu", eo: "tele-", vi: "viễn", id: "tele-", th: "เทเล", hr: "tele-", sk: "tele-", ga: "tele-", cy: "tele-", ha: "nisa", am: "ሩቅ", fa: "تل-", bn: "টেলি", zu: "kude" },\n';
  gloss = replaceOrInsertAfter(gloss, 'tele', main, 'tenda');
  const aliases = [
    [
      '"a tele"',
      '    "a tele": { gloss: "Recorte BR de televisão — a caixa, o canal; o prefixo está em tele; ≠ tela.", href: "' +
        HREF +
        '", en: "the TV (clipping)", es: "la tele" },\n'
    ],
    [
      'tela',
      '    tela: { gloss: "Lat. tēla — pano / teia / ecrã; a orelha cola em tele (têle = longe); ver tele.", href: "' +
        HREF +
        '", en: "screen / canvas", es: "tela" },\n'
    ],
    [
      'televisao',
      '    televisao: { gloss: "Sem acento — lema televisão; origem do recorte a tele; ver tele.", href: "' +
        HREF +
        '", en: "television (unaccented)", es: "televisión (sin acento)" },\n'
    ],
    [
      'televisão',
      '    televisão: { gloss: "têle + visão — ver ao longe; o recorte vivo é a tele; ficha em tele.", href: "' +
        HREF +
        '", en: "television", es: "televisión" },\n'
    ],
    [
      'telefone',
      '    telefone: { gloss: "têle + phōnē — voz ao longe; gesto ligar; o prefixo está na ficha tele.", href: "' +
        HREF +
        '", en: "telephone", es: "teléfono" },\n'
    ]
  ];
  aliases.forEach(([key, line]) => {
    gloss = replaceOrInsertAfter(gloss, key, line, 'tele');
  });
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-tele-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildTelePost());
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
        id: 'palavra-tele',
        title: 'Tele — longe no grego, a caixa na sala',
        titleEn: 'Tele — far in Greek, the box in the room',
        titleEs: 'Tele — lejos en griego, la caja en la sala',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: tele ← gr. têle (longe); recorte BR «a tele» (TV); ≠ tela; família telefone/telescópio; Valeu !!!',
        whyEn: 'Words: tele ← Gr. têle (far); BR clipping “a tele” (TV); ≠ tela; family telephone/telescope; Valeu !!!',
        whyEs: 'Palabras: tele ← gr. têle (lejos); recorte BR «a tele» (TV); ≠ tela; familia teléfono/telescopio; ¡Valeu !!!',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          WIKT,
          WIKT_TELE_GR,
          WIKT_TV,
          WIKT_TEL,
          WIKT_TELA,
          '/posts/post-inspecao-palavra-ligar-desligar.html',
          '/posts/post-inspecao-palavra-conexao.html',
          '/posts/post-inspecao-palavra-olho.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — prefixo × recorte; tela fica como cola cortada.'
      },
      ['palavra-tenda', 'palavra-tempo', 'palavra-luz', 'palavra-ligar']
    );
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (palavra-tele)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'tele',
        word: 'tele',
        simple:
          'Gr. têle — longe. Prefixo (telefone, telescópio) e recorte BR «a tele» (TV). ≠ tela (lat. tēla). Valeu !!!',
        simpleEn:
          'Gr. têle — far. Prefix (telephone, telescope) and BR clipping “a tele” (TV). ≠ tela (Lat. tēla, screen). Valeu !!!',
        simpleEs:
          'Gr. têle — lejos. Prefijo (teléfono, telescopio) y recorte BR «a tele» (TV). ≠ tela (lat. tēla). ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Tele entra no português pelo grego τῆλε (têle), «longe». Nos compostos marca distância (telefone, televisão, telescópio). No Brasil a fala corta televisão em a tele — a caixa, o canal, o hábito. Tela vem de outro étimo (lat. tēla, pano).',
        curiosities:
          'A orelha cola tele em tela: uma é distância grega, a outra é pano latino que virou ecrã. Telê (alcunha) não é o prefixo. Valeu !!!',
        historyEn:
          'Portuguese tele comes from Greek τῆλε (têle), “far”. In compounds it marks distance (telephone, television, telescope). In Brazil speech clips televisão to a tele — the set, the channel, the habit. Tela is another etymon (Lat. tēla, cloth).',
        curiositiesEn:
          'The ear glues tele to tela: one is Greek distance, the other Latin cloth that became a screen. Telê (a nickname) is not the prefix. Valeu !!!',
        historyEs:
          'Tele entra al portugués por el griego τῆλε (têle), «lejos». En los compuestos marca distancia. En Brasil el habla corta televisão en a tele. Tela viene de otro étimo (lat. tēla, paño).',
        curiositiesEs:
          'La oreja pega tele a tela: una es distancia griega, la otra paño latino vuelto pantalla. Telê (apodo) no es el prefijo. ¡Valeu !!!'
      },
      ['tenda', 'tempo', 'luz', 'ligar']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (tele)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const next = patchGlossary(gloss);
    fs.writeFileSync(GLOSS_FILE, next, 'utf8');
    console.log('Glossário actualizado (tele)');
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
