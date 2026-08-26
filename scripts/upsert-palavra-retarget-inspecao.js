'use strict';

/**
 * Injeta a palavra retarget (re- + target; cola rato + alvo).
 * Uso: node scripts/upsert-palavra-retarget-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildRetargetPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT
} = require('../lib/retarget-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-retarget.html';

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

function patchGlossary(gloss) {
  const main =
    '    retarget: { tone: "craft", category: "Léxico", mundane: "EN — voltar a apontar ao mesmo alvo (re- + target).", gloss: "re- + target (voltar a apontar); alvo ← albus (branco do centro); cola rato+alvo (rat+target) ≠ origem (letras re-, não rat); ≠ ads ≠ mouse; Valeu !!!", href: "' +
    HREF +
    '", en: "retarget", es: "retarget / volver a apuntar", fr: "recibler", it: "retarget", de: "retargeten", el: "retarget", la: "rursus petere", yo: "retarget", sw: "retarget", gez: "retarget", nl: "retargeten", pl: "retarget", ru: "retarget", uk: "retarget", zh: "再次瞄准", ja: "リターゲット", ko: "리타깃", ar: "إعادة الاستهداف", he: "retarget", hi: "retarget", tr: "yeniden hedeflemek", sv: "retargeta", da: "retargete", no: "retargete", fi: "retargetoida", cs: "retarget", ro: "retarget", hu: "retarget", ca: "retarget", gl: "retarget", eu: "retarget", gn: "retarget", qu: "retarget", eo: "re-celi", vi: "nhắm lại", id: "retarget", th: "retarget", hr: "retarget", sk: "retarget", ga: "retarget", cy: "retarget", ha: "retarget", am: "retarget", fa: "retarget", bn: "retarget", zu: "i-retarget" },\n';
  gloss = replaceOrInsertAfter(gloss, 'retarget', main, 'opsertar');
  const aliases = [
    [
      'retargeting',
      '    retargeting: { gloss: "Gerúndio / jargão de mercado — uso de retarget; ≠ étimo; ≠ tutorial; ver retarget.", href: "' +
        HREF +
        '", en: "retargeting", es: "retargeting" },\n'
    ],
    [
      'retargetar',
      '    retargetar: { gloss: "Calco BR de to retarget — voltar a apontar; ver retarget.", href: "' +
        HREF +
        '", en: "to retarget (BR calque)", es: "retargetar" },\n'
    ],
    [
      'alvo',
      '    alvo: { tone: "craft", category: "Objecto", mundane: "Objecto da pontaria — o branco do centro (albus).", gloss: "Lat. albus → branco do centro → objecto a atingir; peça PT de target; cola com rato em retarget; Valeu !!!", href: "' +
        HREF +
        '", en: "target / bullseye", es: "blanco / objetivo", fr: "cible", it: "bersaglio", de: "Ziel / Zielscheibe", el: "στόχος", la: "albus / scopus", yo: "àfojúsùn", sw: "shabaha", gez: "alvo", nl: "doelwit", pl: "cel", ru: "мишень", uk: "мішень", zh: "靶", ja: "的", ko: "표적", ar: "هدف", he: "מטרה", hi: "निशाना", tr: "hedef", sv: "mål", da: "mål", no: "mål", fi: "maali", cs: "cíl", ro: "țintă", hu: "cél", ca: "blanc", gl: "alvo", eu: "jauzi", gn: "alvo", qu: "tarpu", eo: "celo", vi: "bia", id: "sasaran", th: "เป้า", hr: "meta", sk: "cieľ", ga: "sprioc", cy: "targed", ha: "manufa", am: "ዒላማ", fa: "هدف", bn: "লক্ষ্য", zu: "ithagethi" },\n'
    ],
    [
      'rato',
      '    rato: { tone: "craft", category: "Animal", mundane: "Animal roedor (Rattus); cola EN rat em retarget — ≠ étimo.", gloss: "Lat. rattus; peça da cola rato+alvo; ≠ rato de computador (PT-PT); ≠ delator; ver retarget.", href: "' +
        HREF +
        '", en: "rat", es: "rata", fr: "rat", it: "ratto", de: "Ratte", el: "αρουραίος", la: "rattus", yo: "eku", sw: "panya", gez: "rato", nl: "rat", pl: "szczur", ru: "крыса", uk: "щур", zh: "鼠", ja: "ネズミ", ko: "쥐", ar: "جرذ", he: "חולדה", hi: "चूहा", tr: "sıçan", sv: "råtta", da: "rotte", no: "rotte", fi: "rotta", cs: "krysa", ro: "șobolan", hu: "patkány", ca: "rata", gl: "rato", eu: "arratoi", gn: "anguja", qu: "ukucha", eo: "rato", vi: "chuột", id: "tikus", th: "หนู", hr: "štakor", sk: "potkan", ga: "francach", cy: "llygoden fawr", ha: "bera", am: "አይጥ", fa: "موش", bn: "ইঁদুর", zu: "igundane" },\n'
    ],
    [
      'target',
      '    target: { gloss: "EN de alvo — peça de retarget (re- + target); ver retarget.", href: "' +
        HREF +
        '", en: "target", es: "target / blanco" },\n'
    ],
    [
      'remarketing',
      '    remarketing: { gloss: "Primo de mercado de retargeting — outro nome comercial; ver retarget (sala cortada).", href: "' +
        HREF +
        '", en: "remarketing", es: "remarketing" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'retarget');
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-retarget-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildRetargetPost());
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
        id: 'palavra-retarget',
        title: 'Retarget — re- + alvo; a orelha cola o rato',
        titleEn: 'Retarget — re- + target; the ear glues the rat',
        titleEs: 'Retarget — re- + blanco; el oído pega la rata',
        tipo: 'palavra',
        priority: 2,
        status: 'feita',
        why: 'Palavras: retarget (re- + target) — voltar a apontar; objecto alvo (albus); cola animal rato (rat+target) ≠ étimo; ≠ ads.',
        whyEn: 'Words: retarget (re- + target) — aim again; object alvo; rat glue ≠ etymon; ≠ ads.',
        whyEs: 'Palabras: retarget (re- + target) — apuntar de nuevo; objeto alvo; cola rata ≠ étimo; ≠ ads.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          HREF,
          WIKT,
          'https://en.wiktionary.org/wiki/targe',
          'https://en.wiktionary.org/wiki/albus#Latin',
          'https://pt.wiktionary.org/wiki/alvo',
          'https://pt.wiktionary.org/wiki/rato',
          'https://pt.wikipedia.org/wiki/Etimologia_popular',
          '/posts/post-inspecao-palavra-etimologia.html',
          '/posts/post-inspecao-palavra-objetos.html',
          '/posts/post-inspecao-palavra-animal.html',
          '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — étimo re-+target × albus × cola rat (≠ origem); sem tutorial de anúncio.'
      },
      ['palavra-upsert', 'palavra-pattern', 'palavra-skill']
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
        id: 'retarget',
        word: 'retarget',
        simple:
          'EN re- + target — voltar a apontar ao alvo. Cola da orelha: rato + alvo (rat + target) ≠ étimo. Objecto: alvo (albus, o branco). Animal: rato. ≠ ads ≠ mouse. Valeu !!!',
        simpleEn:
          'EN re- + target — aim again at the target. Ear-glue: rat + target ≠ etymon. Object: alvo (albus, the white). Animal: rato. ≠ ads ≠ mouse. Valeu !!!',
        simpleEs:
          'EN re- + target — apuntar de nuevo al blanco. Cola del oído: rata + blanco ≠ étimo. Objeto: alvo (albus). Animal: rato. ≠ ads ≠ ratón. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Retarget é inglês de oficina: prefixo re- («de novo / de volta», lat. re-) + target. Target vem do antigo francês targette, diminutivo de targe — o escudo pequeno (broquel) que virou disco a atingir (germ. *targō / nórd. targa). Em português o objecto chama-se alvo — do latim albus, o branco fosco do centro (ainda se diz «acertar no branco»). A orelha cola rato (EN rat) + alvo (target); as letras do verbo são re-, não rat. O étimo corta o animal da origem.',
        curiosities:
          'Três caminhos para o mesmo ofício: PT alvo veio da cor (albus); EN target veio do escudo (targe); ES blanco funde cor e objecto (germ. blank). Point-blank é «de pointe en blanc» — apontar ao branco. A cola rato+alvo é bilingue: em português rato+alvo não soa a retarget. Retargeting / remarketing são a sala do mercado. Em PT-PT rato também é o mouse; essa sala não entra. Calco: retargetar.',
        historyEn:
          'Retarget is workshop English: prefix re- (“again / back”, Lat. re-) + target. Target is from Old French targette, diminutive of targe — a small shield that became the disk to hit (Gmc *targō / ON targa). Portuguese names the object alvo — from Latin albus, the dull white of the centre (still “hit the white”). The ear glues rat + target; the letters of the verb are re-, not rat. The etymon cuts the animal from the origin.',
        curiositiesEn:
          'Three paths to the same craft: PT alvo came from the colour (albus); EN target came from the shield (targe); ES blanco fuses colour and object (Gmc blank). Point-blank is “de pointe en blanc”. The glue rato+alvo is bilingual: in Portuguese rato+alvo does not sound like retarget. Retargeting / remarketing are the market room. In European Portuguese rato is also the computer mouse. Calque: retargetar.',
        historyEs:
          'Retarget es inglés de oficio: prefijo re- («de nuevo / de vuelta», lat. re-) + target. Target viene del antiguo francés targette, diminutivo de targe — el escudo pequeño que viró disco a apuntar. En portugués el objeto se llama alvo — del latín albus, el blanco mate del centro. El oído pega rata (rat) + blanco (target); las letras del verbo son re-, no rat. El étimo corta el animal del origen.',
        curiositiesEs:
          'Tres caminos: PT alvo vino del color (albus); EN target del escudo (targe); ES blanco funde color y objeto (germ. blank). Point-blank es «de pointe en blanc». La cola rato+alvo es bilingüe. Retargeting / remarketing son la sala del mercado. En PT-PT rato también es el ratón. Calco: retargetar.'
      },
      ['upsert', 'pattern', 'skill']
    );
    upsertItem(
      items,
      {
        id: 'alvo',
        word: 'alvo',
        simple:
          'Lat. albus — o branco fosco do centro virou o objecto da pontaria (ainda se diz acertar no branco). Peça PT de target (que veio do escudo); cola com rato em retarget. Valeu !!!',
        simpleEn:
          'Lat. albus — the white of the centre became the object of aim. PT piece of target; glued with rato in retarget. Valeu !!!',
        simpleEs:
          'Lat. albus — el blanco del centro viró el objeto de la puntería. Pieza PT de target; cola con rato en retarget. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['retarget']
    );
    upsertItem(
      items,
      {
        id: 'rato',
        word: 'rato',
        simple:
          'Animal (lat. rattus). Cola EN rat + target = retarget — as letras do verbo são re-, não rat. ≠ étimo ≠ mouse ≠ delator. Valeu !!!',
        simpleEn:
          'Animal (Lat. rattus). On this sheet it enters as glue EN rat + target = retarget — ≠ etymon ≠ mouse ≠ snitch. Valeu !!!',
        simpleEs:
          'Animal (lat. rattus). En esta ficha entra como cola EN rat + target = retarget — ≠ étimo ≠ ratón ≠ soplón. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['alvo', 'retarget']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = patchGlossary(gloss);
    fs.writeFileSync(GLOSS_FILE, gloss);
    console.log('Glossário actualizado');
  }

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'retarget',
      slug: 'retarget',
      title: 'Retarget',
      titleEn: 'Retarget',
      titleEs: 'Retarget',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — voltar a apontar ao alvo; a orelha cola o rato, o étimo corta; Valeu !!!',
      teaserEn: 'BudGanja echo — aim again at the target; the ear glues the rat, the etymon cuts; Valeu !!!',
      teaserEs: 'Eco BudGanja — apuntar de nuevo al blanco; el oído pega la rata, el étimo corta; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'retarget', 'alvo', 'rato']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poema Vida actualizado');
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
