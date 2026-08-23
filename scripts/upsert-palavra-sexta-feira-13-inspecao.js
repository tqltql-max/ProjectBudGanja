'use strict';

/**
 * Injeta o composto «sexta-feira 13» na série Palavras.
 * Uso: node scripts/upsert-palavra-sexta-feira-13-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildSextaFeira13Post } = require('../lib/sexta-feira-13-inspecao-post.js');

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
  const post = stampFiles(buildSextaFeira13Post());
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
    const sugId = 'palavra-sexta-feira-13';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Sexta-feira 13 — apenas mais um dia qualquer',
      titleEn: 'Friday the 13th — just another ordinary day',
      titleEs: 'Viernes 13 — solo un día cualquiera',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: sexta-feira 13 — data, não azar; 13 nov. 2026; estreias da franquia no dia 13 = calendário.',
      whyEn:
        'Words: sexta-feira 13 (Friday the 13th) — a date, not a curse; 13 Nov 2026; franchise openings on the 13th = calendar.',
      whyEs:
        'Palabras: sexta-feira 13 — fecha, no mala suerte; 13 nov. 2026; estrenos de la franquicia el 13 = calendario.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wikipedia.org/wiki/Friday_the_13th',
        'https://en.wikipedia.org/wiki/Friday_the_13th_(franchise)',
        '/posts/post-inspecao-palavra-tempo.html',
        '/posts/post-inspecao-palavra-medo.html',
        '/posts/post-inspecao-palavra-risco.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — 13 nov. 2026 é sexta e é um dia qualquer; franquia = elo de estreia, não o objecto.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (palavra-sexta-feira-13)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'sexta-feira-13',
      word: 'sexta-feira 13',
      simple:
        'Data, não azar: quando o 13 cai à sexta; 13 de novembro de 2026 é um dia qualquer; estreias da franquia no dia 13 = calendário, não o objecto; Valeu !!!',
      simpleEn:
        'A date, not a curse: when the 13th falls on Friday; 13 November 2026 is an ordinary day; franchise openings on the 13th = calendar, not the object; Valeu !!!',
      simpleEs:
        'Fecha, no mala suerte: cuando el 13 cae en viernes; el 13 de noviembre de 2026 es un día cualquiera; estrenos de la franquicia el 13 = calendario, no el objeto; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Sexta-feira 13 nomeia a coincidência calendário (weekday + dia 13). A superstição é folclore; a franquia de terror usou algumas sextas-feiras 13 como data de estreia EUA — agenda comercial, não destino.',
      curiosities: 'Em 2026 o 13 cai à sexta em fevereiro, março e novembro. O laboratório trata os três como dias iguais.',
      historyEn:
        'Friday the 13th names a calendar coincidence (weekday + the 13th). Superstition is folklore; the horror franchise used some Friday the 13ths as US opening dates — a commercial calendar, not fate.',
      curiositiesEn: 'In 2026 the 13th falls on Friday in February, March and November. The lab treats all three as equal days.',
      historyEs:
        'Viernes 13 nombra la coincidencia de calendario (día de la semana + el 13). La superstición es folclore; la franquicia usó algunos viernes 13 como estreno EUA — agenda comercial, no destino.',
      curiositiesEs: 'En 2026 el 13 cae en viernes en febrero, marzo y noviembre. El laboratorio trata los tres como días iguales.'
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'sexta-feira 13');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'tempo' || x.id === 'medo' || x.id === 'risco');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (sexta-feira 13)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const mainLine =
      '    "sexta-feira 13": { tone: "caution", category: "Calendário", mundane: "Quando o dia 13 cai à sexta — só uma data.", gloss: "Data, não azar; 13 nov. 2026 é sexta e é um dia qualquer; estreias da franquia no dia 13 = calendário, não o objecto; Valeu !!!", href: "/posts/post-inspecao-palavra-sexta-feira-13.html", en: "Friday the 13th", es: "viernes 13", fr: "vendredi 13", it: "venerdì 13", de: "Freitag der 13.", el: "Paraskevi 13", la: "dies Veneris XIII", yo: "Friday 13", sw: "Ijumaa tarehe 13", gez: "Friday 13", nl: "vrijdag de 13e", pl: "piątek 13", ru: "pyatnitsa 13", uk: "pyatnytsia 13", zh: "13hao xingqiwu", ja: "13-nichi no kinyobi", ko: "13il geumyoil", ar: "aljumua 13", he: "yom shishi 13", hi: "shukravaar 13", tr: "cuma 13", sv: "fredagen den 13:e", da: "fredag den 13.", no: "fredag den 13.", fi: "perjantai 13.", cs: "patek 13.", ro: "vineri 13", hu: "pentek 13", ca: "divendres 13", gl: "venres 13", eu: "ostiral 13", gn: "aravo 13", qu: "ch\'askachaw 13", eo: "vendredo la 13-a", vi: "thu Sau ngay 13", id: "Jumat tanggal 13", th: "ศุกร์ 13", hr: "petak 13.", sk: "piatok 13.", ga: "Aoine an 13ú", cy: "Gwener y 13eg", ha: "Jumma\'a 13", am: "Arbe 13", fa: "jome 13", bn: "শুক্রবার ১৩", zu: "uLwesihlanu 13" },\n';
    if (/"sexta-feira 13":\s*\{/.test(gloss)) {
      gloss = gloss.replace(
        /    "sexta-feira 13":\s*\{[\s\S]*?\},/,
        mainLine.trimEnd().replace(/,$/, '') + ','
      );
      console.log('Glossário actualizado (sexta-feira 13 · existente)');
    } else {
      const inserted = insertAfterKey(gloss, 'tempo', mainLine);
      if (inserted) {
        gloss = inserted;
        console.log('Glossário actualizado (sexta-feira 13 · após tempo)');
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
