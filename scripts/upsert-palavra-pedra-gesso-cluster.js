'use strict';

/**
 * Injeta pedra e gesso na série Palavras.
 * Uso: node scripts/upsert-palavra-pedra-gesso-cluster.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildPedraPost } = require('../lib/pedra-inspecao-post.js');
const { buildGessoPost } = require('../lib/gesso-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF_PEDRA = '/posts/post-inspecao-palavra-pedra.html';
const HREF_GESSO = '/posts/post-inspecao-palavra-gesso.html';

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

async function syncSql(list) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  const hasRemote = !!(process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL);
  if (!fs.existsSync(dbPath) && !hasRemote) return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  list.forEach((p) => upsertPost(posts, p));
  await store.setPosts(posts);
  console.log('SQL store actualizado:', list.map((p) => p.slug).join(', '));
}

function patchGlossary(gloss) {
  const pedra =
    '    pedra: { tone: "craft", category: "Mineral", mundane: "Pedaço duro da terra; também locução e dureza.", gloss: "Gr. πέτρα / lat. petra — corpo duro; Pedro no mesmo tronco; a orelha cola perdão (perdonare); irmã gesso; Valeu !!!", href: "/posts/post-inspecao-palavra-pedra.html", en: "stone / rock", es: "piedra", fr: "pierre", it: "pietra", de: "Stein", el: "πέτρα", la: "petra", yo: "òkúta", sw: "jiwe", gez: "ǝbn", nl: "steen", pl: "kamień", ru: "камень", uk: "камінь", zh: "石头", ja: "石", ko: "돌", ar: "حجر", he: "אבן", hi: "पत्थर", tr: "taş", sv: "sten", da: "sten", no: "stein", fi: "kivi", cs: "kámen", ro: "piatră", hu: "kő", ca: "pedra", gl: "pedra", eu: "harri", gn: "ita", qu: "rumi", eo: "ŝtono", vi: "đá", id: "batu", th: "หิน", hr: "kamen", sk: "kameň", ga: "cloch", cy: "carreg", ha: "dutse", am: "ድንጋይ", fa: "سنگ", bn: "পাথর", zu: "itshe" },\n' +
    '    pedro: { gloss: "Gr. Πέτρος / lat. Petrus — o mesmo étimo de pedra; o nome é a pedra. Corte na ficha pedra.", href: "/posts/post-inspecao-palavra-pedra.html", en: "Peter", es: "Pedro" },\n' +
    '    perdão: { gloss: "Lat. perdonare — dar de lado a lado; ≠ pedra. A orelha cola PE-; o étimo corta. Corte na ficha pedra.", href: "/posts/post-inspecao-palavra-pedra.html", en: "pardon / forgiveness", es: "perdón" },\n' +
    '    perdao: { gloss: "Grafia sem til de perdão — ver ficha pedra.", href: "/posts/post-inspecao-palavra-pedra.html", en: "pardon (unaccented)", es: "perdón" },\n' +
    '    geologia: { gloss: "Gr. γῆ + λόγος — ciência da terra; o olho cola GE- de gesso; o étimo corta. Corte nas fichas pedra e gesso.", href: "/posts/post-inspecao-palavra-pedra.html", en: "geology", es: "geología" },\n' +
    '    petrologia: { gloss: "Gr. πέτρα + λόγος — ciência da pedra; irmã estreita. Corte na ficha pedra.", href: "/posts/post-inspecao-palavra-pedra.html", en: "petrology", es: "petrología" },\n';
  const gesso =
    '    gesso: { tone: "craft", category: "Mineral", mundane: "Pasta branca de obra, arte e molde ortopédico.", gloss: "Gr. γύψος / lat. gypsum — sulfato que pega; ≠ geologia (γῆ); quebrado → ingessado (gatilho ingessadado); braço direito; irmã pedra; Valeu !!!", href: "/posts/post-inspecao-palavra-gesso.html", en: "plaster / gypsum / gesso", es: "yeso", fr: "plâtre / gypse", it: "gesso", de: "Gips", el: "γύψος", la: "gypsum", yo: "gesso", sw: "plasta", gez: "gypsum", nl: "gips", pl: "gips", ru: "гипс", uk: "гіпс", zh: "石膏", ja: "石膏", ko: "석고", ar: "جبس", he: "גבס", hi: "जिप्सम", tr: "alçı", sv: "gips", da: "gips", no: "gips", fi: "kipsi", cs: "sádra", ro: "gips", hu: "gipsz", ca: "guix", gl: "xeso", eu: "igeltsu", gn: "ita morotĩ", qu: "yisu", eo: "gipso", vi: "thạch cao", id: "gips", th: "ปูนปลาสเตอร์", hr: "gips", sk: "sadra", ga: "plástar", cy: "plastr", ha: "allon gips", am: "ጂፕሰም", fa: "گچ", bn: "জিপসাম", zu: "udaka olumhlophe" },\n' +
    '    quebrado: { gloss: "Part. de quebrar ← lat. crepāre — fender; o osso quebra, o gesso segura. Corte na ficha gesso.", href: "/posts/post-inspecao-palavra-gesso.html", en: "broken", es: "quebrado / roto" },\n' +
    '    quebrar: { gloss: "Verbo de quebrado — fender. Corte na ficha gesso.", href: "/posts/post-inspecao-palavra-gesso.html", en: "to break", es: "quebrar" },\n' +
    '    ingessado: { gloss: "in- + gesso + -ado — posto em gesso. Corte na ficha gesso.", href: "/posts/post-inspecao-palavra-gesso.html", en: "in a plaster cast", es: "enyesado" },\n' +
    '    ingessadado: { gloss: "Lapso de ingessado — a sílaba -da- duplicou. Gatilho de ofício, não étimo.", href: "/posts/post-inspecao-palavra-gesso.html", en: "slip for ingessado", es: "lapsus de enyesado" },\n' +
    '    "braço direito": { gloss: "Três cortes: membro direito; locução (pessoa de confiança); sítio do gesso no ofício. Corte na ficha gesso.", href: "/posts/post-inspecao-palavra-gesso.html", en: "right arm / right-hand person", es: "brazo derecho" },\n' +
    '    "braco direito": { gloss: "Grafia sem cedilha de braço direito — ver gesso.", href: "/posts/post-inspecao-palavra-gesso.html", en: "right arm (unaccented)", es: "brazo derecho" },\n' +
    '    diretto: { gloss: "Lapso de direito (tt a mais). Gatilho na ficha gesso.", href: "/posts/post-inspecao-palavra-gesso.html", en: "slip for direito", es: "lapsus de derecho" },\n';

  if (/    pedra:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    pedra:\s*\{[\s\S]*?\},/, pedra.split('\n')[0]);
  } else if (/    passar:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    passar:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + pedra);
  } else {
    console.warn('Aviso: glossário — ponto pedra/passar não encontrado');
  }

  if (/    gesso:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    gesso:\s*\{[\s\S]*?\},/, gesso.split('\n')[0]);
  } else if (/    gesto:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    gesto:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + gesso);
  } else {
    console.warn('Aviso: glossário — ponto gesso/gesto não encontrado');
  }
  return gloss;
}

async function main() {
  for (const script of ['generate-pedra-palavra-cover.js', 'generate-gesso-palavra-cover.js']) {
    try {
      execFileSync(process.execPath, [path.join(__dirname, script)], {
        cwd: ROOT,
        stdio: 'inherit',
        timeout: 45000
      });
    } catch (e) {
      console.warn('Aviso capa', script, e.message);
    }
  }

  const list = [stampFiles(buildPedraPost()), stampFiles(buildGessoPost())];
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  list.forEach((p) => upsertPost(posts, p));
  await writeJsonRetry(POSTS_FILE, posts);

  list.forEach((p) => {
    try {
      writeHtml(p);
    } catch (e) {
      console.warn('Aviso HTML', p.slug, e.message);
    }
  });

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  list.forEach((p) => writeI18n(i18n, p));
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(items, {
      id: 'palavra-pedra',
      title: 'Pedra — πέτρα; Pedro no mesmo tronco; a orelha cola perdão',
      titleEn: 'Pedra — πέτρα; Pedro same stem; the ear glues perdão',
      titleEs: 'Pedra — πέτρα; Pedro el mismo tronco; el oído pega perdão',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: pedra ← πέτρα / petra. Pedro mesmo étimo. Perdão (perdonare) é cola de orelha. Irmã gesso.',
      whyEn: 'Words: pedra ← πέτρα / petra. Pedro same etymon. Perdão (perdonare) is ear-glue. Sister gesso.',
      whyEs: 'Palabras: pedra ← πέτρα / petra. Pedro el mismo étimo. Perdão es cola de oído. Hermana gesso.',
      suggestedSlug: 'inspecao-palavra-pedra',
      doneHref: HREF_PEDRA,
      seriesHint: 'palavras-origem',
      sources: ['https://pt.wiktionary.org/wiki/pedra', HREF_GESSO],
      notes: 'Cap. ' + list[0].seriesOrder + ' — par gesso.'
    });
    upsertItem(items, {
      id: 'palavra-gesso',
      title: 'Gesso — γύψος; braço direito quebrado → ingessado',
      titleEn: 'Gesso — γύψος; broken right arm → in plaster',
      titleEs: 'Gesso — γύψος; brazo derecho quebrado → enyesado',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: gesso ← γύψος. ≠ geologia (γῆ). Quebrado → ingessado (gatilho ingessadado). Braço direito. Irmã pedra.',
      whyEn: 'Words: gesso ← γύψος. ≠ geology (γῆ). Broken → in plaster (slip ingessadado). Right arm. Sister pedra.',
      whyEs: 'Palabras: gesso ← γύψος. ≠ geología (γῆ). Quebrado → enyesado (lapsus ingessadado). Brazo derecho. Hermana pedra.',
      suggestedSlug: 'inspecao-palavra-gesso',
      doneHref: HREF_GESSO,
      seriesHint: 'palavras-origem',
      sources: ['https://pt.wiktionary.org/wiki/gesso', HREF_PEDRA],
      notes: 'Cap. ' + list[1].seriesOrder + ' — par pedra.'
    });
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (pedra · gesso)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'pedra',
        word: 'pedra',
        simple:
          'Gr. πέτρα / lat. petra — corpo duro. Pedro no mesmo tronco. A orelha cola perdão. Irmã gesso. Valeu !!!',
        simpleEn:
          'Gk. πέτρα / Lat. petra — hard body. Pedro same stem. The ear glues perdão. Sister gesso. Valeu !!!',
        simpleEs:
          'Gr. πέτρα / lat. petra — cuerpo duro. Pedro el mismo tronco. El oído pega perdão. Hermana gesso. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_PEDRA
      },
      ['passar', 'patente', 'paz']
    );
    upsertItem(
      items,
      {
        id: 'pedro',
        word: 'Pedro',
        simple: 'Gr. Πέτρος — o mesmo étimo de pedra. O nome é a pedra. Corte na ficha pedra. Valeu !!!',
        simpleEn: 'Gk. Πέτρος — same etymon as pedra. The name is the rock. Cut on the pedra sheet. Valeu !!!',
        simpleEs: 'Gr. Πέτρος — el mismo étimo que pedra. El nombre es la piedra. Corte en la ficha pedra. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_PEDRA
      },
      ['pedra']
    );
    upsertItem(
      items,
      {
        id: 'perdao',
        word: 'perdão',
        simple: 'Lat. perdonare — ≠ pedra. A orelha cola PE-. Corte na ficha pedra. Valeu !!!',
        simpleEn: 'Lat. perdonare — ≠ pedra. The ear glues PE-. Cut on the pedra sheet. Valeu !!!',
        simpleEs: 'Lat. perdonare — ≠ pedra. El oído pega PE-. Corte en la ficha pedra. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_PEDRA
      },
      ['pedro', 'pedra']
    );
    upsertItem(
      items,
      {
        id: 'geologia',
        word: 'geologia',
        simple: 'Gr. γῆ + λόγος — o olho cola GE- de gesso; o étimo corta. Corte em pedra e gesso. Valeu !!!',
        simpleEn: 'Gk. γῆ + λόγος — the eye glues GE- of gesso; the etymon cuts. Cut on pedra and gesso. Valeu !!!',
        simpleEs: 'Gr. γῆ + λόγος — el ojo pega GE- de gesso; el étimo corta. Corte en pedra y gesso. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_PEDRA
      },
      ['gesso', 'pedra']
    );
    upsertItem(
      items,
      {
        id: 'gesso',
        word: 'gesso',
        simple:
          'Gr. γύψος — sulfato que pega. ≠ geologia. Quebrado → ingessado (ingessadado). Braço direito. Irmã pedra. Valeu !!!',
        simpleEn:
          'Gk. γύψος — sulfate that sets. ≠ geology. Broken → in plaster (ingessadado). Right arm. Sister pedra. Valeu !!!',
        simpleEs:
          'Gr. γύψος — sulfato que pega. ≠ geología. Quebrado → enyesado (ingessadado). Brazo derecho. Hermana pedra. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_GESSO
      },
      ['gesto', 'genial']
    );
    upsertItem(
      items,
      {
        id: 'quebrado',
        word: 'quebrado',
        simple: 'Lat. crepāre — fender. O osso quebra; o gesso segura. Corte na ficha gesso. Valeu !!!',
        simpleEn: 'Lat. crepāre — to crack. The bone breaks; plaster holds. Cut on the gesso sheet. Valeu !!!',
        simpleEs: 'Lat. crepāre — hender. El hueso se quiebra; el yeso sujeta. Corte en la ficha gesso. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_GESSO
      },
      ['gesso']
    );
    upsertItem(
      items,
      {
        id: 'ingessado',
        word: 'ingessado',
        simple: 'in- + gesso — posto em molde. Gatilho: ingessadado. Corte na ficha gesso. Valeu !!!',
        simpleEn: 'in- + gesso — placed in a cast. Slip: ingessadado. Cut on the gesso sheet. Valeu !!!',
        simpleEs: 'in- + gesso — puesto en molde. Lapsus: ingessadado. Corte en la ficha gesso. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_GESSO
      },
      ['quebrado', 'gesso']
    );
    upsertItem(
      items,
      {
        id: 'braco-direito',
        word: 'braço direito',
        simple:
          'Três cortes: membro; locução de confiança; sítio do gesso no ofício. Corte na ficha gesso. Valeu !!!',
        simpleEn:
          'Three cuts: limb; trusted-person locution; cast site on the working arm. Cut on the gesso sheet. Valeu !!!',
        simpleEs:
          'Tres cortes: miembro; locución de confianza; sitio del yeso en el oficio. Corte en la ficha gesso. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF_GESSO
      },
      ['ingessado', 'gesso']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (pedra · gesso)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(GLOSS_FILE, next, 'utf8');
      console.log('Glossário actualizado (pedra · gesso)');
    }
  }

  try {
    await syncSql(list);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  list.forEach((p) => console.log('OK Cap.', p.seriesOrder, p.title));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
