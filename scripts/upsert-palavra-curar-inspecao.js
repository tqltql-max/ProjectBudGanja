'use strict';

/**
 * Injeta palavra «curar» na série Palavras.
 * Uso: node scripts/upsert-palavra-curar-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildCurarPost } = require('../lib/curar-inspecao-post.js');

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
  return new RegExp('    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ': \\{').test(src);
}

function replaceGloss(src, key, line) {
  const re = new RegExp(
    '    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ': \\{[\\s\\S]*?\\},\\r?\\n'
  );
  if (re.test(src)) return src.replace(re, line);
  return src;
}

function insertAfterKey(src, afterKey, line) {
  const re = new RegExp(
    '(    ' + afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ': \\{[\\s\\S]*?\\},\\r?\\n)'
  );
  if (re.test(src)) return src.replace(re, '$1' + line);
  return src + line;
}

async function main() {
  const post = buildCurarPost();
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
    const sugId = 'palavra-curar';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Curar — cūra, tratar e secar, sem milagre',
      titleEn: 'Curar — cūra, to treat and to dry, without miracle',
      titleEs: 'Curar — cūra, tratar y secar, sin milagro',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: curar (lat. cūrāre ← cūra) — tratar × secar a colheita; ≠ cuidar (cōgitāre); curar a planta ≠ a planta cura.',
      whyEn: 'Words: curar (Lat. cūrāre ← cūra) — treat × dry the harvest; ≠ cuidar (cōgitāre); curing the plant ≠ the plant cures.',
      whyEs: 'Palabras: curar (lat. cūrāre ← cūra) — tratar × secar la cosecha; ≠ cuidar (cōgitāre); curar la planta ≠ la planta cura.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/cura',
        'https://en.wiktionary.org/wiki/cura#Latin',
        'https://pt.wiktionary.org/wiki/cuidar',
        '/posts/post-inspecao-palavra-planta.html',
        '/posts/post-inspecao-planta-cannabis-sativa.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — lat. cūra; ofícios tratar/secar/pároco; ≠ cuidar; corte colheita × slogan.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-curar)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertGuia(
      items,
      {
        id: 'curar',
        word: 'curar',
        simple:
          'Lat. cūrāre ← cūra — tratar × secar a colheita; ≠ cuidar (cōgitāre); curar a planta ≠ a planta cura; Valeu !!!',
        simpleEn:
          'Lat. cūrāre ← cūra — treat × dry the harvest; ≠ cuidar (cōgitāre); curing the plant ≠ the plant cures; Valeu !!!',
        simpleEs:
          'Lat. cūrāre ← cūra — tratar × secar la cosecha; ≠ cuidar (cōgitāre); curar la planta ≠ la planta cura; ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href,
        history:
          'Curar vem do latim cūrāre ← cūra (cuidado, trato). No português especializou: sarar o corpo, secar a colheita, e o homónimo cura (pároco).',
        curiosities:
          'Cuidar parece primo mas vem de cōgitāre (pensar). No lab, curar a planta (secagem) não é o slogan a planta cura.',
        historyEn:
          'Portuguese curar comes from Latin cūrāre ← cūra (care, charge). It specialised: heal the body, dry the harvest, and the homonym cura (parish priest).',
        curiositiesEn:
          'Cuidar looks related but comes from cōgitāre (to think). In the lab, curing the plant (drying) is not the slogan the plant cures.',
        historyEs:
          'Curar viene del latín cūrāre ← cūra (cuidado, encargo). En portugués se especializó: sanar el cuerpo, secar la cosecha, y el homónimo cura (párroco).',
        curiositiesEs:
          'Cuidar parece primo pero viene de cōgitāre (pensar). En el lab, curar la planta (secado) no es el eslogan la planta cura.'
      },
      ['planta', 'cultivo', 'lavar', 'alma']
    );
    upsertGuia(
      items,
      {
        id: 'cura',
        word: 'cura',
        simple:
          'Substantivo de curar (tratamento) e homónimo pároco (cura d’almas) — mesma cūra, ofícios distintos; ver curar.',
        simpleEn:
          'Noun of curar (treatment) and homonym parish priest (cura d’almas) — same cūra, distinct offices; see curar.',
        simpleEs:
          'Sustantivo de curar (tratamiento) y homónimo párroco (cura de almas) — misma cūra, oficios distintos; ver curar.',
        group: 'lexico',
        fromTitle: false,
        href
      },
      ['curar']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (curar / cura)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const hrefC = '/posts/post-inspecao-palavra-curar.html';
    const entries = {
      curar:
        '    curar: { tone: "caution", category: "Ofício", mundane: "Tratar / sarar; também secar e conservar a colheita.", gloss: "Lat. cūrāre ← cūra — tratar × secar; ≠ cuidar (cōgitāre); curar a planta ≠ a planta cura; Valeu !!!", href: "' +
        hrefC +
        '", en: "to heal / to cure", es: "curar", fr: "guérir / soigner", it: "curare", de: "heilen / kuren", el: "θεραπεύω", la: "curare", yo: "wòsàn", sw: "kuponya", gez: "ḥawwäṣä", nl: "genezen", pl: "leczyć", ru: "лечить", uk: "лікувати", zh: "治愈", ja: "治す", ko: "치유하다", ar: "يشفي", he: "לרפא", hi: "ठीक करना", tr: "iyileştirmek", sv: "bota", da: "helbrede", no: "kurere", fi: "parantaa", cs: "léčit", ro: "a vindeca", hu: "gyógyítani", ca: "curar", gl: "curar", eu: "sendatu", gn: "pohãno", qu: "hampiy", eo: "kuraci", vi: "chữa", id: "menyembuhkan", th: "รักษา", hr: "liječiti", sk: "liečiť", ga: "leigheas", cy: "gwellhau", ha: "warkar", am: "መፈወስ", fa: "شفا دادن", bn: "সারানো", zu: "ukuphulukisa" },\n',
      cura:
        '    cura: { gloss: "Tratamento (de curar) ou pároco (cura d’almas) — mesma cūra, ofícios distintos; ver curar.", href: "' +
        hrefC +
        '", en: "cure / parish priest", es: "cura / párroco" },\n',
      curado:
        '    curado: { gloss: "Participio de curar — sarado ou conservado (carne/colheita); ver curar.", href: "' +
        hrefC +
        '", en: "cured / healed", es: "curado" },\n',
      curador:
        '    curador: { gloss: "Quem zela (museu, tutela) — cūra de um encargo; ver curar.", href: "' +
        hrefC +
        '", en: "curator / guardian", es: "curador" },\n',
      curandeiro:
        '    curandeiro: { gloss: "Agente popular de trato — mapa social, não protocolo; ver curar.", href: "' +
        hrefC +
        '", en: "healer (folk)", es: "curandero" },\n',
      curativo:
        '    curativo: { gloss: "Que serve ao trato — adjetivo da família; ver curar.", href: "' +
        hrefC +
        '", en: "healing / curative", es: "curativo" },\n'
    };

    const chain = [
      ['planta', 'curar'],
      ['curar', 'cura'],
      ['cura', 'curado'],
      ['curado', 'curador'],
      ['curador', 'curandeiro'],
      ['curandeiro', 'curativo']
    ];
    for (const [after, key] of chain) {
      if (glossHas(gloss, key)) gloss = replaceGloss(gloss, key, entries[key]);
      else gloss = insertAfterKey(gloss, after, entries[key]);
    }

    if (glossHas(gloss, 'cuidar')) {
      gloss = replaceGloss(
        gloss,
        'cuidar',
        '    cuidar: { gloss: "Lat. cōgitāre (pensar) — falso amigo de curar (cūrāre); ver ficha curar.", href: "' +
          hrefC +
          '", en: "to care", es: "cuidar", fr: "prendre soin", it: "prendersi cura", de: "sich kümmern", yo: "tọ́jú", sw: "kutunza", gez: "ḥälläyä", el: "φροντίζω", la: "cogitare", nl: "to care", pl: "to care", ru: "to care", uk: "to care", zh: "to care", ja: "to care", ko: "to care", ar: "to care", he: "to care", hi: "to care", tr: "to care", sv: "to care", da: "to care", no: "to care", fi: "to care", cs: "to care", ro: "to care", hu: "to care", ca: "to care", gl: "to care", eu: "to care", gn: "to care", qu: "to care", eo: "to care", vi: "to care", id: "to care", th: "to care", hr: "to care", sk: "to care", ga: "to care", cy: "to care", ha: "to care", am: "to care", fa: "to care", bn: "to care", zu: "to care" },\n'
      );
    }

    if (glossHas(gloss, 'procurar')) {
      gloss = replaceGloss(
        gloss,
        'procurar',
        '    procurar: { gloss: "Lat. prōcūrāre (pro + cūra) — tratar adiante → ir buscar; família de curar.", href: "' +
          hrefC +
          '", en: "to search", es: "buscar", fr: "recherche", it: "cerca", de: "Suche", yo: "wá", sw: "kutafuta", gez: "ḥäśäśä", el: "ψάχνω", la: "procurare", nl: "to search", pl: "to search", ru: "to search", uk: "to search", zh: "to search", ja: "to search", ko: "to search", ar: "to search", he: "to search", hi: "to search", tr: "to search", sv: "to search", da: "to search", no: "to search", fi: "to search", cs: "to search", ro: "to search", hu: "to search", ca: "to search", gl: "to search", eu: "to search", gn: "to search", qu: "to search", eo: "to search", vi: "to search", id: "to search", th: "to search", hr: "to search", sk: "to search", ga: "to search", cy: "to search", ha: "to search", am: "to search", fa: "to search", bn: "to search", zu: "to search" },\n'
      );
    }

    if (glossHas(gloss, 'cuidado')) {
      gloss = replaceGloss(
        gloss,
        'cuidado',
        '    cuidado: { gloss: "Atenção / trato — semântica de cūra; o verbo irmão de étimo é curar, não cuidar.", href: "' +
          hrefC +
          '", en: "care", es: "cuidado", fr: "soin", it: "cura", de: "Fürsorge", yo: "ìtọ́jú", sw: "utungaji", gez: "ḥəlləyo", el: "φροντίδα", la: "cura", nl: "zorg", pl: "opieka", ru: "уход", uk: "догляд", zh: "照料", ja: "世話", ko: "돌봄", ar: "رعاية", he: "טיפול", hi: "देखभाल", tr: "bakım", sv: "omsorg", da: "pleje", no: "pleie", fi: "hoito", cs: "péče", ro: "grijă", hu: "gondozás", ca: "cura", gl: "coidado", eu: "zaintza", gn: "ñangareko", qu: "qhaway", eo: "zorgo", vi: "cham soc", id: "perawatan", th: "การดูแล", hr: "briga", sk: "starostlivosť", ga: "cúram", cy: "gofal", ha: "kulawa", am: "enkibkabe", fa: "moraghebat", bn: "যত্ন", zu: "ukunakekela" },\n'
      );
    }

    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (curar · cura · cuidar · procurar)');
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
