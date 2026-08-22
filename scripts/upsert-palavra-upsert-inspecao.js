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
      title: 'Upsert — inserir ou actualizar sem duplicar a identidade',
      titleEn: 'Upsert — insert or update without duplicating identity',
      titleEs: 'Upsert — insertar o actualizar sin duplicar la identidad',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: upsert (update+insert) — chave/slug; MERGE ≠ replace; calco upsertar; elo commitar; o lab já pratica o gesto; Valeu !!!',
      whyEn: 'Words: upsert (update+insert) — key/slug; MERGE ≠ replace; BR calque upsertar; link commitar; the lab already does the gesture; Valeu !!!',
      whyEs: 'Palabras: upsert (update+insert) — clave/slug; MERGE ≠ replace; calco upsertar; vínculo commitar; el lab ya practica el gesto; ¡Valeu !!!',
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
        ' — portmanteau update+insert; identidade (slug); ≠ replace; depois commitar.'
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
          'Portmanteau EN update+insert — inserir se a chave é nova, actualizar se já existe; MERGE ≠ replace; calco upsertar; elo commitar; Valeu !!!',
        simpleEn:
          'EN portmanteau update+insert — insert if the key is new, update if it exists; MERGE ≠ replace; BR calque upsertar; link commitar; Valeu !!!',
        simpleEs:
          'Portmanteau EN update+insert — insertar si la clave es nueva, actualizar si ya existe; MERGE ≠ replace; calco upsertar; vínculo commitar; ¡Valeu !!!',
        history:
          'Upsert é portmanteau inglês de update + insert, jargão de bases de dados (MERGE no SQL:2003; UPSERT no PostgreSQL e no MongoDB). No laboratório nomeia o gesto de não duplicar a identidade — o slug decide insert ou update.',
        curiosities:
          'Os scripts da casa já se chamam upsert-palavra-*.js: a ficha entra no catálogo pelo verbo que inspecciona. Upsertar é calco BR, como commitar; o commit grava o rasto depois do merge.',
        historyEn:
          'Upsert is an English portmanteau of update + insert, database jargon (SQL MERGE in SQL:2003; UPSERT in PostgreSQL and MongoDB). In the lab it names the gesture of not duplicating identity — the slug decides insert or update.',
        curiositiesEn:
          'House scripts are already named upsert-palavra-*.js: the sheet enters the catalogue by the verb it inspects. Upsertar is a BR calque, like commitar; the commit records the trace after the merge.',
        historyEs:
          'Upsert es un portmanteau inglés de update + insert, jerga de bases de datos (MERGE en SQL:2003; UPSERT en PostgreSQL y MongoDB). En el laboratorio nombra el gesto de no duplicar la identidad — el slug decide insert o update.',
        curiositiesEs:
          'Los scripts de la casa ya se llaman upsert-palavra-*.js: la ficha entra al catálogo por el verbo que inspecciona. Upsertar es calco BR, como commitar; el commit graba el rastro después del merge.',
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
          'Calco BR de to upsert — inserir ou actualizar pela chave; ≠ replace; ≠ commitar; ver ficha upsert.',
        simpleEn:
          'BR calque of to upsert — insert or update by key; ≠ replace; ≠ commitar; see upsert sheet.',
        simpleEs:
          'Calco BR de to upsert — insertar o actualizar por clave; ≠ replace; ≠ commitar; ver ficha upsert.',
        group: 'lexico',
        fromTitle: false,
        href
      },
      ['upsert']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (upsert / upsertar)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const hrefU = '/posts/post-inspecao-palavra-upsert.html';
    const entries = {
      upsert:
        '    upsert: { tone: "caution", category: "Ofício", mundane: "EN — inserir se novo, actualizar se a chave já existe.", gloss: "Portmanteau update+insert; MERGE ≠ replace; calco upsertar; elo commitar; o lab pratica no slug; Valeu !!!", href: "' +
        hrefU +
        '", en: "upsert", es: "upsert / insertar o actualizar", fr: "upsert", it: "upsert", de: "upsert", el: "upsert", la: "inserere vel renovare", yo: "upsert", sw: "upsert", gez: "upsert", nl: "upsert", pl: "upsert", ru: "upsert", uk: "upsert", zh: "upsert", ja: "upsert", ko: "upsert", ar: "upsert", he: "upsert", hi: "upsert", tr: "upsert", sv: "upsert", da: "upsert", no: "upsert", fi: "upsert", cs: "upsert", ro: "upsert", hu: "upsert", ca: "upsert", gl: "upsert", eu: "upsert", gn: "upsert", qu: "upsert", eo: "upserti", vi: "upsert", id: "upsert", th: "upsert", hr: "upsert", sk: "upsert", ga: "upsert", cy: "upsert", ha: "upsert", am: "upsert", fa: "upsert", bn: "upsert", zu: "i-upsert" },\n',
      upsertar:
        '    upsertar: { gloss: "Calco BR de to upsert — inserir ou actualizar pela chave; ≠ replace; ≠ commitar; ver ficha upsert.", href: "' +
        hrefU +
        '", en: "to upsert", es: "hacer upsert" },\n'
    };

    const chain = [
      ['commitar', 'upsert'],
      ['upsert', 'upsertar']
    ];
    for (const [after, key] of chain) {
      if (glossHas(gloss, key)) gloss = replaceGloss(gloss, key, entries[key]);
      else gloss = insertAfterKey(gloss, after, entries[key]);
    }

    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (upsert / upsertar)');
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
