'use strict';

/**
 * Injeta a palavra «conjugação» (3 pessoas · elos e elas · sala com latim).
 * Uso: node scripts/upsert-palavra-conjugacao-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildConjugacaoPost, WIKI } = require('../lib/conjugacao-inspecao-post.js');
const { buildLatimPost } = require('../lib/latim-inspecao-post.js');
const { buildLinguaPortuguesaPost } = require('../lib/lingua-portuguesa-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-conjugacao.html';
const LATIM_HREF = '/posts/post-inspecao-palavra-latim.html';
const LINGUA_HREF = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
const LIGAR_HREF = '/posts/post-inspecao-palavra-ligar-desligar.html';
const ELO_HREF = '/posts/post-inspecao-expressao-elo-de-ligacao.html';

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

const CONJ_BLOCK =
  '    "conjugação": { tone: "craft", category: "Gramática", mundane: "Jugo do verbo às pessoas — 1.ª, 2.ª, 3.ª.", gloss: "Lat. coniugātiō ← coniugāre (iugum); 3 elos × 3 cores (branco/eu · amarelo/tu · vermelho/ele); elos ≠ eles/elas; Valeu !!!", href: "' +
  HREF +
  '", en: "conjugation", es: "conjugación", fr: "conjugaison", it: "coniugazione", de: "Konjugation", el: "κλίση ρήματος", la: "coniugatio", yo: "ìsopọ̀ ọ̀rọ̀-ìṣe", sw: "upambanuzi wa kitenzi", gez: "coniugatio", nl: "vervoeging", pl: "koniugacja", ru: "spryazhenie", uk: "diioslivna paradyhma", zh: "动词变位", ja: "活用", ko: "동사 활용", ar: "tasrif", he: "netiyat poal", hi: "kriya rupakaran", tr: "çekim", sv: "böjning", da: "bøjning", no: "bøying", fi: "taivutus", cs: "časování", ro: "conjugare", hu: "ige ragozas", ca: "conjugació", gl: "conxugación", eu: "aditz jokatzea", gn: "ñemoñe\'ẽ", qu: "rimay tikray", eo: "konjugacio", vi: "chia động từ", id: "konjugasi", th: "การผันกริยา", hr: "konjugacija", sk: "časovanie", ga: "réimniú", cy: "cyugiad", ha: "juyawa", am: "የግስ ለውጥ", fa: "صرف فعل", bn: "ক্রিয়ার রূপ", zu: "ukuguqulwa kwesenzo" },\n';

const EXTRA_BLOCK =
  '    conjugar: { gloss: "Verbo da conjugação — jungir o verbo à pessoa; lat. coniugāre; 3 elos; Valeu !!!", href: "' +
  HREF +
  '", en: "to conjugate", es: "conjugar" },\n' +
  '    "nós": { gloss: "1.ª pessoa do plural ← lat. nōs; ≠ nos (em+os); elo 1 da conjugação; Valeu !!!", href: "' +
  HREF +
  '", en: "we", es: "nosotros" },\n' +
  '    "vós": { gloss: "2.ª pessoa do plural ← lat. vōs; na fala BR, vocês toma a desinência de 3.ª; Valeu !!!", href: "' +
  HREF +
  '", en: "you (pl., archaic/formal)", es: "vosotros" },\n' +
  '    eles: { gloss: "3.ª pessoa do plural masculino; ≠ elos (anéis); corte na ficha conjugação; Valeu !!!", href: "' +
  HREF +
  '", en: "they (masc.)", es: "ellos" },\n' +
  '    elas: { gloss: "3.ª pessoa do plural feminino; ligar elas = 3.º elo no feminino; Valeu !!!", href: "' +
  HREF +
  '", en: "they (fem.)", es: "ellas" },\n' +
  '    "elos e elas": { gloss: "Corte: elos = anéis (elo de ligação); eles/elas = 3.ª pl.; 3 elos da conjugação; Valeu !!!", href: "' +
  HREF +
  '", en: "links and they (fem.) — ear-glue cut", es: "eslabones y ellas" },\n' +
  '    vocês: { gloss: "Tratamento BR de 2.ª com desinência de 3.ª (*vocês ligam*); mapa na ficha conjugação.", href: "' +
  HREF +
  '", en: "you (pl., BR)", es: "ustedes" },\n';

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
  gloss = replaceOrInsertAfter(gloss, '"conjugação"', CONJ_BLOCK, 'latim');
  if (!gloss.includes('href: "' + HREF + '"')) {
    const afterLatim = new RegExp('(    latim:\\s*\\{[\\s\\S]*?' + ZU_TAIL.source + ')');
    if (afterLatim.test(gloss)) gloss = gloss.replace(afterLatim, '$1' + CONJ_BLOCK);
    else console.warn('Aviso: conjugação não inserida no glossário');
  }
  if (!gloss.includes('    "nós":')) {
    const extra = replaceOrInsertAfter(gloss, 'conjugar', EXTRA_BLOCK, '"conjugação"');
    if (extra) gloss = extra;
    else {
      const afterConj = new RegExp('(    "conjugação":\\s*\\{[\\s\\S]*?' + ZU_TAIL.source + ')');
      if (afterConj.test(gloss)) gloss = gloss.replace(afterConj, '$1' + EXTRA_BLOCK);
      else console.warn('Aviso: nós/vós/eles não inseridos');
    }
  }
  const pessoaLine =
    '    pessoa: { tone: "craft", category: "Gramática", mundane: "Quem fala, com quem se fala, de quem se fala — ou a pessoa humana.", gloss: "Gramática: 1.ª/2.ª/3.ª da conjugação (ficha conjugação). ≠ série Pessoas (biografias). Lat. persona. Valeu !!!", href: "' +
    HREF +
    '", en: "person (grammar / human)", es: "persona", fr: "personne", it: "persona", de: "Person", yo: "ènìyàn", sw: "mtu", gez: "säbʾ", el: "πρόσωπο", la: "persona", nl: "persoon", pl: "osoba", ru: "litso", uk: "osoba", zh: "人称", ja: "人称", ko: "인칭", ar: "shakhs", he: "guf", hi: "purush", tr: "kişi", sv: "person", da: "person", no: "person", fi: "persoona", cs: "osoba", ro: "persoană", hu: "szemely", ca: "persona", gl: "persoa", eu: "pertsona", gn: "ava", qu: "runa", eo: "persono", vi: "ngôi", id: "persona", th: "บุรุษ", hr: "osoba", sk: "osoba", ga: "pearsa", cy: "person", ha: "mutum", am: "ሰው", fa: "شخص", bn: "পুরুষ", zu: "umuntu" },\n';
  gloss = replaceOrInsertAfter(gloss, 'pessoa', pessoaLine, 'gente');
  return gloss;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'palavra-conjugacao';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Conjugação — as 3 pessoas; elos e elas; nós, vós, eles',
    titleEn: 'Conjugação — the 3 persons; elos e elas; nós, vós, eles',
    titleEs: 'Conjugação — las 3 personas; elos e elas; nós, vós, eles',
    tipo: 'palavra',
    priority: 1,
    status: 'feita',
    why: 'Palavras: conjugação ← coniugātiō; 3 elos × 3 cores (branco/eu · amarelo/tu · vermelho/ele); elos ≠ eles/elas; Valeu !!!',
    whyEn: 'Words: conjugação ← coniugātiō; 3 links × 3 colors; elos ≠ eles/elas; Valeu !!!',
    whyEs: 'Palabras: conjugação ← coniugātiō; 3 eslabones × 3 colores; elos ≠ eles/elas; ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'palavras-origem',
    sources: [WIKI, LATIM_HREF, LINGUA_HREF, LIGAR_HREF, ELO_HREF],
    notes: 'Cap. ' + post.seriesOrder + ' — 3 pessoas; plurais; partilha sala com latim.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  upsertItem(
    items,
    {
      id: 'conjugacao',
      word: 'conjugação',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        'Lat. coniugātiō ← coniugāre (jugo). 3 elos × 3 cores: branco/eu·nós · amarelo/tu·vós · vermelho/ele·elas. Elos ≠ eles/elas. Valeu !!!',
      simpleEn:
        'Lat. coniugātiō ← coniugāre (yoke). 3 links × 3 colors: white/I·we · yellow/you · red/he·they. Elos ≠ eles/elas. Valeu !!!',
      simpleEs:
        'Lat. coniugātiō ← coniugāre (yugo). 3 eslabones × 3 colores. Elos ≠ eles/elas. ¡Valeu !!!',
      history:
        'Conjugação vem do latim coniugātiō, de coniugāre — pôr no mesmo jugo (iugum), ninho de iungere (juntos). As pessoas do verbo português herdam ego, tū, nōs, vōs do latim.',
      curiosities:
        'Cruzamento: branco=atenção=1.ª; amarelo=cuidado=2.ª; vermelho=perigo=3.ª. A orelha cola elos em eles. No BR, vocês pede desinência de 3.ª. Valeu !!!',
      historyEn:
        'Portuguese conjugação comes from Latin coniugātiō, from coniugāre — to yoke together (iugum), kin to iungere (juntos). The persons inherit ego, tū, nōs, vōs.',
      curiositiesEn:
        'Cross: white=attention=1st; yellow=care=2nd; red=danger=3rd. The ear glues elos to eles. In BR, vocês takes 3rd-person endings. Valeu !!!',
      historyEs:
        'Conjugação viene del latín coniugātiō, de coniugāre — uncir al mismo yugo (iugum), nido de iungere (juntos). Las personas heredan ego, tū, nōs, vōs.',
      curiositiesEs:
        'Cruce: blanco=atención=1.ª; amarillo=cuidado=2.ª; rojo=peligro=3.ª. El oído pega elos en eles. En BR, vocês pide desinencia de 3.ª. ¡Valeu !!!'
    },
    ['latim', 'lingua-portuguesa', 'etimologia']
  );
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-conjugacao-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildConjugacaoPost());
  const latimPost = stampFiles(buildLatimPost());
  const linguaPost = stampFiles(buildLinguaPortuguesaPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  upsertPost(posts, latimPost);
  upsertPost(posts, linguaPost);
  await writeJsonRetry(POSTS_FILE, posts);

  try {
    writeHtml(post);
    writeHtml(latimPost);
    writeHtml(linguaPost);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  writeI18n(i18n, latimPost);
  writeI18n(i18n, linguaPost);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    upsertSug(sug, post);
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (palavra-conjugacao)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    upsertGuia(guia);
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (conjugação)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = patchGlossary(gloss);
    fs.writeFileSync(GLOSS_FILE, gloss, 'utf8');
    console.log('Glossário actualizado (conjugação · nós · vós · eles · elas)');
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
