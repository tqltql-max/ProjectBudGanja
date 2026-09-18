'use strict';

/**
 * Injeta a família «cola / colar» na série Palavras.
 * Uso: node scripts/upsert-palavra-cola-colar-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildColaColarPost } = require('../lib/cola-colar-inspecao-post.js');

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

function upsertGuiaItem(items, entry) {
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'aglutinacao' || x.id === 'risco');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
}

async function main() {
  const post = stampFiles(buildColaColarPost());
  const href = '/posts/post-' + post.slug + '.html';

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
    const sugId = 'palavra-cola-colar';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Cola · Colar — Brasil com P de Perigo',
      titleEn: 'Cola · Colar — Brazil with P for Danger',
      titleEs: 'Cola · Colar — Brasil con P de Peligro',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: cola/colar + colante, cortante, cerol, pipa, linha; Brasil com P de Perigo; ficha ≠ receita.',
      whyEn: 'Words: cola/colar + sticky, cutting, cerol, kite, line; Brazil with P for Danger; not a recipe.',
      whyEs: 'Palabras: cola/colar + colante, cortante, cerol, cometa, línea; Brasil con P de Peligro; no es receta.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wikipedia.org/wiki/Cerol',
        'https://pt.wikipedia.org/wiki/Pipa_(brinquedo)',
        '/posts/post-inspecao-palavra-risco.html',
        '/posts/post-inspecao-palavra-aglutinacao.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — kólla ≠ collum ≠ Cola; pipa sem linha cortante = brinquedo; cerol = literacia, sem fabrico.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (palavra-cola-colar)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const shared = {
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Cola vem do grego kólla via latim vulgar colla (grude). Colar de pescoço vem de collum — outro étimo. No Brasil a mesma família desemboca na linha de pipa: colante, cortante, cerol.',
      curiosities:
        'O laboratório carimba Brasil com P de Perigo: pipa fica, linha cortante não. Ficha ≠ receita. Cola de sapateiro é outro P (tolueno), só literacia.',
      historyEn:
        'Cola comes from Greek kólla via Vulgar Latin colla (glue). The necklace colar comes from collum — another etymon. In Brazil the glue family meets the kite line: sticky, cutting, cerol.',
      curiositiesEn:
        'The lab stamps Brazil with P for Perigo: the kite stays, the cutting line does not. Sheet ≠ recipe. Shoe glue is another P (toluene), literacy only.',
      historyEs:
        'Cola viene del griego kólla vía latín vulgar colla. El collar viene de collum — otro étimo. En Brasil la familia desemboca en la línea de cometa: colante, cortante, cerol.',
      curiositiesEs:
        'El laboratorio sella Brasil con P de Perigo: la cometa queda, la línea cortante no. Ficha ≠ receta. Cola de zapatero es otro P, solo literacia.'
    };
    const family = [
      {
        id: 'cola',
        word: 'cola',
        simple:
          'Grude (gr. kólla); no BR também cola de prova e, na rua, o início da cadeia cerol/pipa; ≠ refrigerante; Brasil com P de Perigo.',
        simpleEn: 'Glue (Gr. kólla); in BR also a cheat sheet and the start of the cerol/kite chain; ≠ soda; P for Danger.',
        simpleEs: 'Pegamento (gr. kólla); en BR también chuleta y el inicio de la cadena cerol/cometa; ≠ refresco; P de Peligro.',
        ...shared
      },
      {
        id: 'colar',
        word: 'colar',
        simple:
          'Verbo: pegar / copiar na prova / andar junto; substantivo jóia = collum (pescoço) — outro étimo; cadeia pipa nesta ficha.',
        simpleEn: 'Verb: to glue / to cheat / to hang out; necklace noun = collum — other etymon; kite chain on this sheet.',
        simpleEs: 'Verbo: pegar / copiar / juntarse; collar = collum — otro étimo; cadena de cometa en esta ficha.',
        ...shared
      },
      {
        id: 'colante',
        word: 'colante',
        simple: 'Que cola. Na pipa BR: a linha que pega — par do cortante; elo cerol.',
        simpleEn: 'That which sticks. On the BR kite: the line that grips — pair of cutting; cerol link.',
        simpleEs: 'Que pega. En la cometa BR: la línea que adhiere — par de lo cortante; elo cerol.',
        ...shared
      },
      {
        id: 'cortante',
        word: 'cortante',
        simple: 'Que corta. Na pipa BR: a linha que corta outra — e, na rua, vira P de Perigo.',
        simpleEn: 'That which cuts. On the BR kite: the line that cuts another — and in the street becomes P for Danger.',
        simpleEs: 'Que corta. En la cometa BR: la línea que corta otra — y en la calle vira P de Peligro.',
        ...shared
      },
      {
        id: 'cerol',
        word: 'cerol',
        simple:
          'Nome BR do revestimento que torna a linha de pipa colante e cortante; literacia de dano, não receita; leis locais; Brasil com P.',
        simpleEn: 'BR name for the coating that makes a kite line sticky and cutting; harm literacy, not a recipe; P for Danger.',
        simpleEs: 'Nombre BR del revestimiento que hace la línea colante y cortante; literacia de daño, no receta; P de Peligro.',
        ...shared
      },
      {
        id: 'pipa',
        word: 'pipa',
        simple:
          'Brinquedo aéreo (papagaio, raia). Sem linha cortante continua pipa; o perigo é o cerol, não o papel no céu.',
        simpleEn: 'Kite. Without a cutting line it remains a toy; the danger is cerol, not paper in the sky.',
        simpleEs: 'Cometa. Sin línea cortante sigue siendo juguete; el peligro es el cerol, no el papel.',
        ...shared
      },
      {
        id: 'linha-pipa',
        word: 'linha',
        simple:
          'Nesta ficha: o fio da pipa. Linha cortante / cerol = P de Perigo. Outros sentidos (fila, verso, pesca) = outro mapa.',
        simpleEn: 'On this sheet: the kite string. Cutting line / cerol = P for Danger. Queue / verse / fishing = other maps.',
        simpleEs: 'En esta ficha: el hilo de la cometa. Línea cortante / cerol = P de Peligro. Fila / verso / pesca = otro mapa.',
        ...shared
      },
      {
        id: 'perigo-cola',
        word: 'perigo',
        simple:
          'Ameaça imediata (periculum). Caso desta ficha: linha de pipa com cerol — Brasil com P. O mapa calculado é risco.',
        simpleEn: 'Immediate threat. This sheet’s case: cerol kite line — Brazil with P. The calculated map is risco.',
        simpleEs: 'Amenaza inmediata. Caso de esta ficha: línea con cerol — Brasil con P. El mapa calculado es risco.',
        ...shared
      }
    ];
    family.forEach((entry) => upsertGuiaItem(items, entry));
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (cola/colar + cadeia)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const hrefGloss = '/posts/post-inspecao-palavra-cola-colar.html';
    const block =
      '    cola: { tone: "caution", category: "Grude", mundane: "Substância que pega; no BR também cola de prova.", gloss: "Gr. kólla — grude; cadeia BR colante/cortante/cerol/pipa/linha; Brasil com P de Perigo; ≠ refrigerante ≠ jóia; ficha ≠ receita; Faça o melhor!", href: "' +
      hrefGloss +
      '", en: "glue", es: "pegamento", fr: "colle", it: "colla", de: "Kleber", el: "κόλλα", la: "colla", yo: "lemọ", sw: "gundi", gez: "cola", nl: "lijm", pl: "klej", ru: "клей", uk: "клей", zh: "胶水", ja: "のり", ko: "풀", ar: "صمغ", he: "דבק", hi: "गोंद", tr: "tutkal", sv: "lim", da: "lim", no: "lim", fi: "liima", cs: "lepidlo", ro: "clei", hu: "ragaszto", ca: "cola", gl: "cola", eu: "kola", gn: "kyta", qu: "qata", eo: "gluo", vi: "keo", id: "lem", th: "กาว", hr: "ljepilo", sk: "lepidlo", ga: "gliu", cy: "glud", ha: "manya", am: "ማጣበቂያ", fa: "چسب", bn: "আঠা", zu: "iglu" },\n' +
      '    colar: { tone: "caution", gloss: "Verbo: pegar / copiar / andar junto; jóia = collum (outro étimo); cadeia pipa nesta ficha; P de Perigo.", href: "' +
      hrefGloss +
      '", en: "to glue / necklace", es: "pegar / collar", fr: "coller / collier", it: "incollare / collana", de: "kleben / Kette", el: "κολλάω / κολιέ", la: "collare", yo: "lemọ", sw: "gundi", gez: "colar", nl: "lijmen / ketting", pl: "kleic / naszyjnik", ru: "клеить / ожерелье", uk: "клеїти / намисто", zh: "粘 / 项链", ja: "貼る / ネックレス", ko: "붙이다 / 목걸이", ar: "يلصق / قلادة", he: "להדביק / שרשרת", hi: "चिपकाना / हार", tr: "yapistirmak / kolye", sv: "limma / halsband", da: "lime / halskaede", no: "lime / halskjede", fi: "liimata / kaulakoru", cs: "lepit / nahrdelnik", ro: "lipi / colier", hu: "ragasztani / nyaklanc", ca: "engar / collaret", gl: "colar / colar", eu: "itsatsi / lepoko", gn: "mbojyta", qu: "k\'askay", eo: "glui / koliero", vi: "dan / day chuyen", id: "merekat / kalung", th: "ติดกาว / สร้อย", hr: "lijepiti / ogrlica", sk: "lepit / nahrdelnik", ga: "greamaigh / muince", cy: "gludo / cadwyn", ha: "manya / abin wuya", am: "መለጠፍ", fa: "چسباندن / گردنبند", bn: "আঠা লাগানো", zu: "namathisela" },\n' +
      '    colante: { gloss: "Que cola — na pipa BR, a linha que pega; par do cortante; ver cola/colar.", href: "' +
      hrefGloss +
      '", en: "adhesive / sticky (kite line)", es: "adhesivo / pegajoso" },\n' +
      '    cortante: { tone: "caution", gloss: "Que corta — na pipa BR, a linha que corta; P de Perigo; ver cola/colar.", href: "' +
      hrefGloss +
      '", en: "cutting (kite line)", es: "cortante" },\n' +
      '    cerol: { tone: "caution", category: "Perigo", mundane: "Revestimento BR da linha de pipa.", gloss: "Linha colante e cortante; literacia de dano, não receita; Brasil com P de Perigo; pipa sem isto continua brinquedo.", href: "' +
      hrefGloss +
      '", en: "cerol (cutting kite line coating)", es: "cerol", fr: "cerol", it: "cerol", de: "Cerol", el: "cerol", la: "cerol", yo: "cerol", sw: "cerol", gez: "cerol", nl: "cerol", pl: "cerol", ru: "церол", uk: "церол", zh: "风筝割线", ja: "セロル", ko: "세를", ar: "سيرول", he: "סרול", hi: "सेरोल", tr: "cerol", sv: "cerol", da: "cerol", no: "cerol", fi: "cerol", cs: "cerol", ro: "cerol", hu: "cerol", ca: "cerol", gl: "cerol", eu: "cerol", gn: "cerol", qu: "cerol", eo: "cerol", vi: "cerol", id: "cerol", th: "เซรอล", hr: "cerol", sk: "cerol", ga: "cerol", cy: "cerol", ha: "cerol", am: "cerol", fa: "سرول", bn: "সেরোল", zu: "cerol" },\n' +
      '    pipa: { gloss: "Brinquedo aéreo; o perigo é a linha cortante/cerol, não o papel no céu; ver cola/colar.", href: "' +
      hrefGloss +
      '", en: "kite", es: "cometa", fr: "cerf-volant", it: "aquilone", de: "Drachen", el: "χαρταετός", la: "draco", yo: "pipa", sw: "kite", gez: "pipa", nl: "vlieger", pl: "latawiec", ru: "воздушный змей", uk: "повітряний змій", zh: "风筝", ja: "凧", ko: "연", ar: "طائرة ورقية", he: "עפיפון", hi: "पतंग", tr: "ucurtma", sv: "drake", da: "drage", no: "drake", fi: "leija", cs: "drak", ro: "zmeu", hu: "sarkany", ca: "estel", gl: "papaventos", eu: "kometa", gn: "pipa", qu: "wayra kuyusqa", eo: "kajto", vi: "dieu", id: "layang-layang", th: "ว่าว", hr: "zmaj", sk: "sarkan", ga: "eitleog", cy: "barcud", ha: "kited", am: "የወረቀት አውሮፕላን", fa: "بادبادک", bn: "ঘুড়ি", zu: "iqhude lomoya" },\n' +
      '    "linha cortante": { tone: "caution", gloss: "Linha de pipa com cerol ou afim — P de Perigo; ver cola/colar.", href: "' +
      hrefGloss +
      '", en: "cutting kite line", es: "línea cortante" },\n' +
      '    "brasil com p": { tone: "caution", gloss: "Carimbo lab: Brasil com P de Perigo — cerol/linha cortante; pipa fica; ficha ≠ receita.", href: "' +
      hrefGloss +
      '", en: "Brazil with P for Danger", es: "Brasil con P de Peligro" },\n' +
      '    perigo: { tone: "caution", gloss: "Ameaça imediata (periculum). Caso cola/colar: cerol na linha. O mapa calculado é risco.", href: "' +
      hrefGloss +
      '", en: "danger", es: "peligro", fr: "danger", it: "pericolo", de: "Gefahr", el: "κίνδυνος", la: "periculum", yo: "ewu", sw: "hatari", gez: "አደጋ", nl: "gevaar", pl: "niebezpieczenstwo", ru: "опасность", uk: "небезпека", zh: "危险", ja: "危険", ko: "위험", ar: "خطر", he: "סכנה", hi: "खतरा", tr: "tehlike", sv: "fara", da: "fare", no: "fare", fi: "vaara", cs: "nebezpeci", ro: "pericol", hu: "veszely", ca: "perill", gl: "perigo", eu: "arrisku", gn: "kyhyje", qu: "chhikchi", eo: "dangxero", vi: "nguy hiem", id: "bahaya", th: "อันตราย", hr: "opasnost", sk: "nebezpecenstvo", ga: "contuirt", cy: "perygl", ha: "hadari", am: "አደጋ", fa: "خطر", bn: "বিপদ", zu: "ingozi" },\n';

    const keys = ['cola', 'colar', 'colante', 'cortante', 'cerol', 'pipa', 'perigo'];
    let replaced = 0;
    for (const key of keys) {
      const re = new RegExp('    ' + key + ':\\s*\\{[\\s\\S]*?\\},');
      if (re.test(gloss)) {
        const line = block.split('\n').find((l) => l.trim().startsWith(key + ':') || l.trim().startsWith(key + ' '));
        if (line) {
          gloss = gloss.replace(re, line.trimEnd().replace(/,$/, '') + ',');
          replaced += 1;
        }
      }
    }
    if (replaced < keys.length) {
      const inserted = insertAfterKey(gloss, 'aglutinação', block);
      if (inserted) {
        gloss = inserted;
        console.log('Glossário actualizado (cola/colar · após aglutinação)');
      } else {
        const inserted2 = insertAfterKey(gloss, 'risco', block);
        if (inserted2) {
          gloss = inserted2;
          console.log('Glossário actualizado (cola/colar · após risco)');
        } else {
          console.warn('Aviso: glossário — ponto de inserção não encontrado');
        }
      }
    } else {
      console.log('Glossário actualizado (cola/colar · existentes)', replaced);
    }
    // quoted keys
    if (!/"linha cortante":\s*\{/.test(gloss) || !/"brasil com p":\s*\{/.test(gloss)) {
      if (!/"linha cortante":\s*\{/.test(gloss)) {
        const extra =
          '    "linha cortante": { tone: "caution", gloss: "Linha de pipa com cerol ou afim — P de Perigo; ver cola/colar.", href: "' +
          hrefGloss +
          '", en: "cutting kite line", es: "línea cortante" },\n' +
          '    "brasil com p": { tone: "caution", gloss: "Carimbo lab: Brasil com P de Perigo — cerol/linha cortante; pipa fica; ficha ≠ receita.", href: "' +
          hrefGloss +
          '", en: "Brazil with P for Danger", es: "Brasil con P de Peligro" },\n';
        const ins = insertAfterKey(gloss, 'cerol', extra) || insertAfterKey(gloss, 'cola', extra);
        if (ins) gloss = ins;
      }
    }
    await writeJsonRetry(GLOSS_FILE, gloss);
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
