'use strict';

/**
 * Injeta palavra «deplorar» e o par com vomitar na série Palavras.
 * Uso: node scripts/upsert-palavra-deplorar-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildDeplorarPost } = require('../lib/deplorar-inspecao-post.js');
const { buildVomitarPost } = require('../lib/vomitar-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');

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

const ZU_TAIL = /zu:\s*"[^"]*"\s*\},?\r?\n/;

function insertAfterKey(gloss, key, block) {
  const re = new RegExp(
    '(    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?' + ZU_TAIL.source + ')'
  );
  if (!re.test(gloss)) return null;
  return gloss.replace(re, '$1' + block);
}

function patchGlossary(gloss, mainKey, mainLine, aliases, afterKey) {
  if (new RegExp('    ' + mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{').test(gloss)) {
    gloss = gloss.replace(
      new RegExp('    ' + mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},'),
      mainLine.trimEnd().replace(/,$/, '') + ','
    );
  } else {
    const inserted = insertAfterKey(gloss, afterKey, mainLine + aliases);
    if (inserted) gloss = inserted;
    else console.warn('Aviso: glossário — inserção falhou para', mainKey);
  }
  return gloss;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const href = '/posts/post-' + post.slug + '.html';
  const sugId = 'palavra-deplorar';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Deplorar — lastimar o dano; não é o mesmo que vomitar',
    titleEn: 'Deplorar — lament the damage; it is not the same as vomitar',
    titleEs: 'Deplorar — lamentar el daño; no es lo mismo que vomitar',
    tipo: 'palavra',
    priority: 2,
    status: 'feita',
    why: 'Palavras: deplorar (lat. dēplōrāre ← plōrāre) — luto × juízo; par vomitar por ofício, não por étimo; Valeu !!!',
    whyEn: 'Words: deplorar (Lat. dēplōrāre ← plōrāre) — grief × judgement; pair with vomitar by office, not etymon; Valeu !!!',
    whyEs: 'Palabras: deplorar (lat. dēplōrāre ← plōrāre) — duelo × juicio; par con vomitar por oficio, no por étimo; ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: href,
    seriesHint: 'palavras-origem',
    sources: [
      post.sourceUrl,
      '/posts/post-inspecao-palavra-vomitar.html',
      '/posts/post-inspecao-palavra-tonos.html',
      '/posts/post-inspecao-palavra-commitar.html',
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — par vomitar × deplorar; plōrāre ≠ vomere.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia, post) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const href = '/posts/post-' + post.slug + '.html';
  const entry = {
    id: 'deplorar',
    word: 'deplorar',
    group: 'lexico',
    fromTitle: false,
    href,
    simple:
      'Lat. dēplōrāre ← plōrāre — lastimar / condenar; par vomitar por ofício, não por étimo; ≠ êmese; Valeu !!!',
    simpleEn:
      'Lat. dēplōrāre ← plōrāre — lament / censure; pair with vomitar by office, not etymon; ≠ emesis; Valeu !!!',
    simpleEs:
      'Lat. dēplōrāre ← plōrāre — lamentar / condenar; par con vomitar por oficio, no por étimo; ≠ emesis; ¡Valeu !!!',
    history:
      'Deplorar vem do latim dēplōrāre (dē- + plōrāre, chorar / clamar). No português cobre o luto e o juízo. Não partilha raiz com vomitar (vomere).',
    curiosities:
      'No laboratório deplorar nomeia o dano; vomitar larga o que não fica. Queixar-se sem filtrar deixa o veneno no commit. Deplorável é o adjectivo irmão, não diagnóstico de náusea.',
    historyEn:
      'Portuguese deplorar comes from Latin dēplōrāre (dē- + plōrāre, to weep / cry out). It covers grief and judgement. It does not share a root with vomitar (vomere).',
    curiositiesEn:
      'In the lab deplorar names the damage; vomitar releases what must not stay. Complaining without filtering leaves poison in the commit. Deplorável is the sister adjective, not a nausea diagnosis.',
    historyEs:
      'Deplorar viene del latín dēplōrāre (dē- + plōrāre, llorar / clamar). En portugués cubre el duelo y el juicio. No comparte raíz con vomitar (vomere).',
    curiositiesEs:
      'En el laboratorio deplorar nombra el daño; vomitar suelta lo que no queda. Quejarse sin filtrar deja el veneno en el commit. Deplorável es el adjetivo hermano, no un diagnóstico de náusea.'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === 'deplorar');
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'vomitar');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;

  const vom = items.find((x) => x.id === 'vomitar');
  if (vom) {
    vom.curiosities =
      'No laboratório vomitar é o gesto do meio da tríade: depois de nomear a tensão (tónos) e antes de gravar o rasto (commitar). Par de ofício com deplorar (lastimar ≠ largar). Ficha ≠ bula antiemética.';
    vom.curiositiesEn =
      'In the lab vomitar is the middle gesture of the triad: after naming tension (tónos) and before recording the trace (commitar). Office pair with deplorar (lament ≠ release). Sheet ≠ antiemetic leaflet.';
    vom.curiositiesEs =
      'En el laboratorio vomitar es el gesto del medio de la tríada: después de nombrar la tensión (tónos) y antes de grabar el rastro (commitar). Par de oficio con deplorar (lamentar ≠ soltar). Ficha ≠ prospecto.';
  }
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'generate-deplorar-palavra-cover.js')], {
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

  const vomitarPost = stampFiles(buildVomitarPost());
  upsertPost(posts, vomitarPost);
  writeHtml(vomitarPost);
  writeI18n(i18n, vomitarPost);

  const post = stampFiles(buildDeplorarPost());
  upsertPost(posts, post);
  writeHtml(post);
  writeI18n(i18n, post);
  upsertSug(sug, post);
  upsertGuia(guia, post);

  if (gloss) {
    gloss = patchGlossary(
      gloss,
      'vomitar',
      '    vomitar: { tone: "caution", category: "Corpo", mundane: "Verbo — expulsar pela boca; também metáfora de despejo.", gloss: "Lat. vomitare — largar o que não fica; tríade tónos / commitar; par deplorar (ofício, não étimo); ≠ protocolo; Valeu !!!", href: "/posts/post-inspecao-palavra-vomitar.html", en: "to vomit / to spew", es: "vomitar", fr: "vomir", it: "vomitare", de: "erbrechen", el: "εμετώ", la: "vomitare", yo: "èèbì", sw: "tapika", gez: "vomitare", nl: "braken", pl: "wymiotować", ru: "blevat", uk: "blyuvaty", zh: "vomit", ja: "haku", ko: "to-hada", ar: "qaa", he: "lehakki", hi: "ulti", tr: "kusmak", sv: "kräkas", da: "kaste op", no: "kaste opp", fi: "oksentaa", cs: "zvracet", ro: "vomita", hu: "hány", ca: "vomitar", gl: "vomitar", eu: "oka egin", gn: "vomitar", qu: "vomitar", eo: "vomiti", vi: "non", id: "muntah", th: "vomit", hr: "povracati", sk: "vracat", ga: "aiseag", cy: "chwydu", ha: "toya", am: "vomit", fa: "estefragh", bn: "bomi", zu: "ukuhlanza" },\n',
      '',
      'vomitar'
    );
    gloss = patchGlossary(
      gloss,
      'deplorar',
      '    deplorar: { tone: "caution", category: "Juízo", mundane: "Verbo — lastimar / condenar o que se perdeu ou é indigno.", gloss: "Lat. dēplōrāre ← plōrāre — luto × juízo; par vomitar por ofício, não por étimo; ≠ êmese; Valeu !!!", href: "/posts/post-inspecao-palavra-deplorar.html", en: "to deplore / to lament", es: "deplorar", fr: "déplorer", it: "deplorare", de: "beklagen", el: "θρηνώ", la: "deplorare", yo: "ṣọ̀fọ̀", sw: "omboleza", gez: "deplorare", nl: "betreuren", pl: "ubolewać", ru: "sozhalet", uk: "zhaluvaty", zh: "deplore", ja: "nageku", ko: "tansikhada", ar: "yandub", he: "lehitabel", hi: "vilap", tr: "kınamak", sv: "beklaga", da: "beklage", no: "beklage", fi: "paheksua", cs: "odsuzovat", ro: "deplange", hu: "sajnál", ca: "deplorar", gl: "deplorar", eu: "deitoratu", gn: "deplorar", qu: "llakikuy", eo: "deplori", vi: "than van", id: "menyesali", th: "deplore", hr: "osuditi", sk: "odsudzovat", ga: "caoin", cy: "galaru", ha: "kuka", am: "deplore", fa: "taasof", bn: "shok", zu: "ukukhala" },\n',
      '    deploravel: { gloss: "Adjectivo irmão (deplorável) — ver deplorar; ≠ náusea clínica.", href: "/posts/post-inspecao-palavra-deplorar.html", en: "deplorable", es: "deplorable" },\n' +
        '    "deplorável": { gloss: "Adjectivo com acento — ver deplorar.", href: "/posts/post-inspecao-palavra-deplorar.html", en: "deplorable (accented)", es: "deplorable (con acento)" },\n',
      'vomitar'
    );
  }

  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  sug.updatedAt = new Date().toISOString();
  await writeJsonRetry(SUG_FILE, sug);
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(GUIA_FILE, guia);
  if (gloss) {
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado (vomitar · deplorar)');
  }

  for (const p of [vomitarPost, post]) {
    try {
      await syncSql(p);
    } catch (e) {
      console.warn('Aviso SQL store:', e.message);
    }
  }

  console.log('OK:', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
