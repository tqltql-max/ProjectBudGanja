'use strict';

/**
 * Injeta o composto «sinais REM» na série Palavras.
 * Uso: node scripts/upsert-sinais-rem-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildSinaisRemPost } = require('../lib/sinais-rem-inspecao-post.js');

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

async function main() {
  const post = stampFiles(buildSinaisRemPost());
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
    const sugId = 'palavra-sinais-rem';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Sinais REM — o campo, o sono e a sigla do laboratório',
      titleEn: 'Sinais REM — the field, sleep, and the lab acronym',
      titleEs: 'Sinais REM — el campo, el sueño y la sigla del laboratorio',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: sinais REM — plural de sinal; sono Rapid Eye Movement × sigla lab Relaxamento·Endocanabinoide·Modular; elos gesto, nap, eCBome.',
      whyEn:
        'Words: sinais REM — plural of sinal; Rapid Eye Movement sleep × lab acronym Relaxation·Endocannabinoid·Modular; links gesto, nap, eCBome.',
      whyEs:
        'Palabras: sinais REM — plural de sinal; sueño Rapid Eye Movement × sigla lab Relajación·Endocanabinoide·Modular; vínculos gesto, nap, eCBome.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wikipedia.org/wiki/Rapid_eye_movement_sleep',
        '/posts/post-inspecao-palavra-sinal.html',
        '/posts/post-inspecao-palavra-nap.html',
        '/posts/post-inspecao-sidarta-ribeiro.html',
        '/posts/post-inspecao-neurociencia-endocanabinoidoma.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — dois REM (sono × sigla lab); sinais ≠ signo ≠ mensagem; ≠ polissonografia.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (palavra-sinais-rem)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'sinais-rem',
      word: 'sinais REM',
      simple:
        'Plural de sinal + dois REM: sono Rapid Eye Movement × sigla lab Relaxamento·Endocanabinoide·Modular; elos gesto, nap, eCBome; Faça o melhor!',
      simpleEn:
        'Plural of sinal + two REM: Rapid Eye Movement sleep × lab acronym Relaxation·Endocannabinoid·Modular; links gesto, nap, eCBome; Do your best!',
      simpleEs:
        'Plural de sinal + dos REM: sueño Rapid Eye Movement × sigla lab Relajación·Endocanabinoide·Modular; vínculos gesto, nap, eCBome; ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Sinais é o plural de sinal (lat. signum). REM científico = Rapid Eye Movement (Aserinsky & Kleitman, 1953). REM lab = Relaxamento · Endocanabinoide · Modular — mapa de ofício, não acrónimo clínico.',
      curiosities: 'As mesmas letras, dois objectos: misturar sono e sigla vira ruído.',
      historyEn:
        'Sinais is the plural of sinal (Lat. signum). Scientific REM = Rapid Eye Movement (1953). Lab REM = Relaxation · Endocannabinoid · Modular — a craft map, not a clinical acronym.',
      curiositiesEn: 'Same letters, two objects: mixing sleep and the acronym becomes noise.',
      historyEs:
        'Sinais es el plural de sinal (lat. signum). REM científico = Rapid Eye Movement (1953). REM lab = Relajación · Endocanabinoide · Modular — mapa de oficio, no acrónimo clínico.',
      curiositiesEs: 'Las mismas letras, dos objetos: mezclar sueño y sigla vira ruido.'
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'sinais REM');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'sinal' || x.id === 'nap' || x.id === 'gesto');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (sinais REM)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const mainLine =
      '    "sinais rem": { tone: "caution", category: "Campo", mundane: "Plural de sinal + sigla REM (sono × ofício).", gloss: "Campo de marcas — sono Rapid Eye Movement × sigla lab Relaxamento·Endocanabinoide·Modular; ≠ um único sinal ≠ mensagem; elos gesto, nap, eCBome; Faça o melhor!", href: "/posts/post-inspecao-palavra-sinais-rem.html", en: "REM signals / REM signs", es: "señales REM", fr: "signaux REM", it: "segnali REM", de: "REM-Zeichen", el: "símata REM", la: "signa REM", yo: "àwọn àmì REM", sw: "ishara za REM", gez: "təʾəmərt REM", nl: "REM-signalen", pl: "sygnały REM", ru: "znaki REM", uk: "sygnaly REM", zh: "REM xinhao", ja: "REM shingo", ko: "REM shinho", ar: "isharat REM", he: "otot REM", hi: "REM sanket", tr: "REM sinyalleri", sv: "REM-tecken", da: "REM-tegn", no: "REM-tegn", fi: "REM-merkit", cs: "signály REM", ro: "semnale REM", hu: "REM jelek", ca: "senyals REM", gl: "sinais REM", eu: "REM seinales", gn: "señál REM", qu: "unancha REM", eo: "REM signaloj", vi: "tin hieu REM", id: "sinyal REM", th: "สัญญาณ REM", hr: "REM signali", sk: "signály REM", ga: "comharthaí REM", cy: "arwyddion REM", ha: "alamomin REM", am: "የREM ምልክት", fa: "neshanehaye REM", bn: "REM সংকেত", zu: "izimpawu ze-REM" },\n';
    const aliases =
      '    rem: { gloss: "Duas leituras: Rapid Eye Movement (sono) × Relaxamento·Endocanabinoide·Modular (sigla lab); ver sinais REM.", href: "/posts/post-inspecao-palavra-sinais-rem.html", en: "REM", es: "REM" },\n' +
      '    sinais: { gloss: "Plural de sinal (lat. signum) — o campo de marcas; com REM ver a ficha sinais REM.", href: "/posts/post-inspecao-palavra-sinais-rem.html", en: "signals / signs", es: "señales" },\n';
    if (/"sinais rem":\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    "sinais rem":\s*\{[\s\S]*?\},/, mainLine.trimEnd().replace(/,$/, '') + ',');
      console.log('Glossário actualizado (sinais rem · existente)');
    } else {
      const inserted = insertAfterKey(gloss, 'sinal', mainLine + aliases);
      if (inserted) {
        gloss = inserted;
        console.log('Glossário actualizado (sinais rem · após sinal)');
      } else {
        console.warn('Aviso: glossário — ponto de inserção não encontrado');
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
