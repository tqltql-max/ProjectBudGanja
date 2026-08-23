'use strict';

/**
 * Injeta palavra «upsert» na série Palavras.
 * Uso: node scripts/upsert-palavra-upsert-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildUpsertPost } = require('../lib/upsert-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function upsertPost(posts, post) {
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

function upsertGuia(items, entry, afterIds) {
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) {
    items[gi] = Object.assign({}, items[gi], entry);
    return;
  }
  const after = items.findIndex((x) => afterIds.indexOf(x.id) >= 0);
  if (after >= 0) items.splice(after + 1, 0, entry);
  else items.push(entry);
}

function glossHas(src, key) {
  return new RegExp('    ' + key + ': \\{').test(src);
}

function replaceGloss(src, key, line) {
  const re = new RegExp('    ' + key + ': \\{[\\s\\S]*?\\},\\r?\\n');
  if (re.test(src)) return src.replace(re, line);
  return src;
}

function insertAfterKey(src, afterKey, line) {
  const re = new RegExp('(    ' + afterKey + ': \\{[\\s\\S]*?\\},\\r?\\n)');
  if (re.test(src)) return src.replace(re, '$1' + line);
  return src + line;
}

async function main() {
  const post = buildUpsertPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-upsert';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Opsert — inserir ou actualizar sem duplicar a identidade',
      titleEn: 'Opsert — insert or update without duplicating identity',
      titleEs: 'Opsert — insertar o actualizar sin duplicar la identidad',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: opsert (boca BR de upsert) — mãos a obra (plural); chave/slug; MERGE ≠ replace; calco upsertar; elo commitar; Valeu !!!',
      whyEn: 'Words: opsert (BR mouth of upsert) — mãos a obra (plural); key/slug; MERGE ≠ replace; calque upsertar; link commitar; Valeu !!!',
      whyEs: 'Palabras: opsert (boca BR de upsert) — mãos a obra (plural); clave/slug; MERGE ≠ replace; calco upsertar; vínculo commitar; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wikipedia.org/wiki/Merge_(SQL)',
        '/posts/post-inspecao-palavra-commitar.html',
        '/posts/post-inspecao-palavra-pattern.html',
        '/posts/post-inspecao-palavra-skill.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — opsert (boca BR); mãos a obra (plural); identidade (slug); ≠ replace; depois commitar.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-upsert)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertGuia(
      items,
      {
        id: 'upsert',
        word: 'upsert',
        simple:
          'Portmanteau EN update+insert — nome nosso opsert; mãos a obra (plural); inserir se a chave é nova, actualizar se já existe; MERGE ≠ replace; calco upsertar; elo commitar; Valeu !!!',
        simpleEn:
          'EN portmanteau update+insert — lab name opsert; mãos a obra (plural); insert if the key is new, update if it exists; MERGE ≠ replace; BR calque upsertar; link commitar; Valeu !!!',
        simpleEs:
          'Portmanteau EN update+insert — nombre vivo opsert; mãos a obra (plural); insertar si la clave es nueva, actualizar si ya existe; MERGE ≠ replace; calco upsertar; vínculo commitar; ¡Valeu !!!',
        history:
          'Upsert é portmanteau inglês de update + insert (MERGE no SQL:2003; UPSERT no PostgreSQL e no MongoDB). No laboratório o nome nosso é opsert — boca BR do lema, como commitar tomou o git. O slug decide insert ou update.',
        curiosities:
          'Os scripts da casa continuam upsert-*.js (lema EN no disco). Grito: mãos a obra (plural, sem crase — o acento dificulta). Upsertar é calco, não a fala. O commit grava o rasto depois do opsert.',
        historyEn:
          'Upsert is an English portmanteau of update + insert (SQL MERGE in SQL:2003; UPSERT in PostgreSQL and MongoDB). In the lab the living name is opsert — BR mouth of the lemma, as commitar took git. The slug decides insert or update.',
        curiositiesEn:
          'House scripts stay upsert-*.js (EN lemma on disk). Cry: mãos a obra (plural, no crase — the accent gets in the way). Upsertar is a calque, not lab speech. The commit records the trace after the opsert.',
        historyEs:
          'Upsert es un portmanteau inglés de update + insert (MERGE en SQL:2003; UPSERT en PostgreSQL y MongoDB). En el laboratorio el nombre vivo es opsert — boca BR del lema, como commitar tomó el git. El slug decide insert o update.',
        curiositiesEs:
          'Los scripts de la casa siguen upsert-*.js (lema EN en disco). Grito: mãos a obra (plural, sin crasis — el acento estorba). Upsertar es calco, no el habla. El commit graba el rastro después del opsert.',
        group: 'lexico',
        fromTitle: false,
        href
      },
      ['commitar', 'pattern', 'skill']
    );
    upsertGuia(
      items,
      {
        id: 'upsertar',
        word: 'upsertar',
        simple:
          'Calco BR de to upsert — inserir ou actualizar pela chave; ≠ nome nosso (opsert); ≠ replace; ≠ commitar; ver ficha upsert.',
        simpleEn:
          'BR calque of to upsert — insert or update by key; ≠ living name (opsert); ≠ replace; ≠ commitar; see upsert sheet.',
        simpleEs:
          'Calco BR de to upsert — insertar o actualizar por clave; ≠ nombre vivo (opsert); ≠ replace; ≠ commitar; ver ficha upsert.',
        group: 'lexico',
        fromTitle: false,
        href
      },
      ['upsert']
    );
    upsertGuia(
      items,
      {
        id: 'opsert',
        word: 'opsert',
        simple:
          'Nome nosso de upsert — boca BR do lema EN; verbo opsertar; fecho Opsert.; grito mãos a obra (plural); ≠ upsertar; ≠ replace; elo commitar; Valeu !!!',
        simpleEn:
          'Lab living name for upsert — BR mouth of the EN lemma; verb opsertar; close Opsert.; cry mãos a obra (plural); ≠ upsertar; ≠ replace; link commitar; Valeu !!!',
        simpleEs:
          'Nombre vivo de upsert — boca BR del lema EN; verbo opsertar; cierre Opsert.; grito mãos a obra (plural); ≠ upsertar; ≠ replace; vínculo commitar; ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href
      },
      ['upsertar']
    );
    upsertGuia(
      items,
      {
        id: 'opsertar',
        word: 'opsertar',
        simple:
          'Verbo de ofício de opsert — opsertar a ficha (levantar se o slug existe; inserir se não); ≠ upsertar; depois commitar.',
        simpleEn:
          'Craft verb of opsert — opsertar the sheet (raise if the slug exists; insert if not); ≠ upsertar; then commitar.',
        simpleEs:
          'Verbo de oficio de opsert — opsertar la ficha (levantar si el slug existe; insertar si no); ≠ upsertar; luego commitar.',
        group: 'lexico',
        fromTitle: false,
        href
      },
      ['opsert']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (upsert / upsertar / opsert / opsertar)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const hrefU = '/posts/post-inspecao-palavra-upsert.html';
    const entries = {
      upsert:
        '    upsert: { tone: "caution", category: "Ofício", mundane: "EN — inserir se novo, actualizar se a chave já existe.", gloss: "Portmanteau update+insert; nome nosso opsert; mãos a obra (plural); MERGE ≠ replace; calco upsertar; elo commitar; Valeu !!!", href: "' +
        hrefU +
        '", en: "upsert", es: "upsert / insertar o actualizar", fr: "upsert", it: "upsert", de: "upsert", el: "upsert", la: "inserere vel renovare", yo: "upsert", sw: "upsert", gez: "upsert", nl: "upsert", pl: "upsert", ru: "upsert", uk: "upsert", zh: "upsert", ja: "upsert", ko: "upsert", ar: "upsert", he: "upsert", hi: "upsert", tr: "upsert", sv: "upsert", da: "upsert", no: "upsert", fi: "upsert", cs: "upsert", ro: "upsert", hu: "upsert", ca: "upsert", gl: "upsert", eu: "upsert", gn: "upsert", qu: "upsert", eo: "upserti", vi: "upsert", id: "upsert", th: "upsert", hr: "upsert", sk: "upsert", ga: "upsert", cy: "upsert", ha: "upsert", am: "upsert", fa: "upsert", bn: "upsert", zu: "i-upsert" },\n',
      upsertar:
        '    upsertar: { gloss: "Calco BR de to upsert — ≠ nome nosso (opsert); inserir ou actualizar pela chave; ≠ replace; ≠ commitar; ver ficha upsert.", href: "' +
        hrefU +
        '", en: "to upsert", es: "hacer upsert" },\n',
      opsert:
        '    opsert: { tone: "caution", category: "Ofício", mundane: "Nome nosso — boca BR de upsert; mãos a obra (sem crase).", gloss: "Opsert / opsertar / Opsert.; mãos a obra (plural, sem crase; o acento dificulta); lema EN upsert no ficheiro; ≠ upsertar; elo commitar; Valeu !!!", href: "' +
        hrefU +
        '", en: "opsert (lab name of upsert)", es: "opsert" },\n',
      opsertar:
        '    opsertar: { gloss: "Verbo de ofício de opsert — opsertar a ficha pelo slug; ≠ upsertar; depois commitar.", href: "' +
        hrefU +
        '", en: "to opsert", es: "opsertar" },\n'
    };

    const chain = [
      ['commitar', 'upsert'],
      ['upsert', 'upsertar'],
      ['upsertar', 'opsert'],
      ['opsert', 'opsertar']
    ];
    for (const [after, key] of chain) {
      if (glossHas(gloss, key)) gloss = replaceGloss(gloss, key, entries[key]);
      else gloss = insertAfterKey(gloss, after, entries[key]);
    }

    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (upsert / upsertar / opsert / opsertar)');
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
