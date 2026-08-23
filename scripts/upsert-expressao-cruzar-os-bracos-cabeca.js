'use strict';

/**
 * Injeta a expressão «cruzar os braços em cima da cabeça» (sinal · pausa da cabeça).
 * Uso: node scripts/upsert-expressao-cruzar-os-bracos-cabeca.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildCruzarOsBracosCabecaPost } = require('../lib/cruzar-os-bracos-cabeca-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-expressao-cruzar-os-bracos-em-cima-da-cabeca.html';

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
  const quoted = mainKey.charAt(0) === '"';
  const existsRe = quoted
    ? new RegExp(mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{')
    : new RegExp('    ' + mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{');
  if (existsRe.test(gloss)) {
    gloss = gloss.replace(
      new RegExp(
        (quoted ? mainKey : '    ' + mainKey).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +
          ':\\s*\\{[\\s\\S]*?\\},'
      ),
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
  const sugId = 'expressao-cruzar-os-bracos-cabeca';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'cruzar os braços em cima da cabeça — pausa da cabeça',
    titleEn: 'arms crossed on top of the head — head pause',
    titleEs: 'cruzar los brazos encima de la cabeza — pausa de la cabeza',
    tipo: 'expressao',
    priority: 2,
    status: 'feita',
    why: 'Expressões / sinais: cruzar os braços em cima da cabeça — pausa da cabeça; ≠ X no peito; Valeu !!!',
    whyEn: 'Sayings / signs: arms crossed on the head — head pause; ≠ chest fold; Valeu !!!',
    whyEs: 'Dichos / señales: brazos cruzados en la cabeza — pausa de la cabeza; ≠ X en el pecho; ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'expressoes-ditados',
    sources: [
      post.sourceUrl,
      'https://pt.wiktionary.org/wiki/braço',
      'https://pt.wiktionary.org/wiki/cabeça',
      '/posts/post-inspecao-palavra-sinais.html',
      '/posts/post-inspecao-palavra-gesto.html',
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — gesto no mapa sinais; ≠ braços no peito.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'cruzar-os-bracos-em-cima-da-cabeca',
    word: 'cruzar os braços em cima da cabeça',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      'Gesto-sinal: X dos braços no cimo da cabeça — pausa da cabeça; ≠ braços cruzados no peito; mapa sinais; Valeu !!!',
    simpleEn:
      'Body signal: arms crossed on top of the head — head pause; ≠ chest fold; sinais map; Valeu !!!',
    simpleEs:
      'Señal: brazos cruzados encima de la cabeza — pausa de la cabeza; ≠ X en el pecho; mapa sinais; ¡Valeu !!!',
    history:
      'Cruzar (lat. crux) + braços + em cima da cabeça. O X muda de sala conforme o sítio: peito = fechamento; cimo do crânio = pausa da cabeça.',
    curiosities:
      'Pedido de campo: sinais. Não fundir com mãos na nuca (à vontade) nem com cruzar os dedos (sorte).',
    historyEn:
      'Portuguese cruzar (Lat. crux) + arms + on top of the head. The X changes room by place: chest = closed; crown = head pause.',
    curiositiesEn:
      'Field request: sinais. Do not merge with hands behind the neck (ease) or crossed fingers (luck).',
    historyEs:
      'Cruzar (lat. crux) + brazos + encima de la cabeza. La X cambia de sala según el sitio: pecho = cierre; cima del cráneo = pausa de la cabeza.',
    curiositiesEs:
      'Pedido de campo: sinais. No fundir con manos en la nuca (soltura) ni con cruzar los dedos (suerte).'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'sinais' || x.id === 'gesto');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(
      process.execPath,
      [path.join(ROOT, 'scripts', 'generate-cruzar-os-bracos-cabeca-cover.js')],
      { cwd: ROOT, stdio: 'inherit' }
    );
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

  const post = stampFiles(buildCruzarOsBracosCabecaPost());
  upsertPost(posts, post);
  writeHtml(post);
  writeI18n(i18n, post);
  upsertSug(sug, post);
  upsertGuia(guia);

  if (gloss) {
    gloss = patchGlossary(
      gloss,
      '"cruzar os braços em cima da cabeça"',
      '    "cruzar os braços em cima da cabeça": { tone: "craft", category: "Sinal", mundane: "Gesto: braços em X no cimo da cabeça.", gloss: "Sinal de pausa da cabeça — peito aberto, crânio abrigado; ≠ X no peito ≠ nuca ≠ cruzar os dedos; mapa sinais; Valeu !!!", href: "' +
        HREF +
        '", en: "arms crossed on top of the head", es: "brazos cruzados encima de la cabeza", fr: "bras croisés sur la tête", it: "braccia incrociate sulla testa", de: "Arme über dem Kopf gekreuzt", el: "χέρια σταυρωμένα στο κεφάλι", la: "bracchia in capite cruciata", yo: "apá tí a cà lórí", sw: "mikono kuvuka kichwani", gez: "ʾədäw bäraʾs", nl: "armen gekruist op het hoofd", pl: "ręce skrzyżowane na głowie", ru: "руки скрещены на голове", uk: "руки схрещені на голові", zh: "双臂交叉抱头", ja: "頭の上で腕を組む", ko: "머리 위로 팔짱", ar: "الذراعان فوق الرأس", he: "ידיים שלובות מעל הראש", hi: "सिर पर बाँहें क्रॉस", tr: "kafanın üstünde kollar kavuşuk", sv: "armar i kors ovanpå huvudet", da: "arme over kors oven på hovedet", no: "armer i kors oppå hodet", fi: "kädet ristissä pään päällä", cs: "ruce zkřížené na hlavě", ro: "brațe încrucișate pe cap", hu: "karok a fej tetején", ca: "braços creuats al cap", gl: "brazos cruzados na cabeza", eu: "besoak buru gainean gurutzaturik", gn: "jyva cruzado akã ári", qu: "makikuna uma hawanpi", eo: "brakoj krucitaj sur la kapo", vi: "khoanh tay trên đầu", id: "lengan silang di atas kepala", th: "กอดอกบนศีรษะ", hr: "ruke prekrižene na glavi", sk: "ruky prekrížené na hlave", ga: "lámha crosáilte ar an gceann", cy: "breichiau’n groes ar y pen", ha: "hannaye a kan kai", am: "እጆች በጭንቅላት ላይ", fa: "دست‌ها روی سر", bn: "মাথায় হাত ক্রস", zu: "izingalo ziphambene ekhanda" },\n',
      '    "braços em cima da cabeça": { gloss: "Forma curta do gesto — pausa da cabeça; ver cruzar os braços em cima da cabeça.", href: "' +
        HREF +
        '", en: "arms on top of the head", es: "brazos encima de la cabeza" },\n' +
        '    "braços cruzados na cabeça": { gloss: "Variante do X no crânio — pausa da cabeça; ≠ braços cruzados no peito.", href: "' +
        HREF +
        '", en: "arms crossed on the head", es: "brazos cruzados en la cabeza" },\n',
      'sinais'
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
    console.log('Glossário actualizado (cruzar os braços em cima da cabeça)');
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
