'use strict';

/**
 * Injeta a palavra «eminente» na série Palavras.
 * Uso: node scripts/upsert-palavra-eminente-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildEminentePost } = require('../lib/eminente-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-eminente.html';

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

function patchGlossary(gloss) {
  const block =
    '    eminente: { tone: "craft", category: "Relevo", mundane: "Adjetivo — que sobressai, excelente.", gloss: "Lat. eminens ← ēminēre (ē- + minēre) — salta para fora; ≠ iminente (imminēre); a orelha cola, o étimo corta; Valeu !!!", href: "/posts/post-inspecao-palavra-eminente.html", en: "eminent / outstanding", es: "eminente", fr: "éminent", it: "eminente", de: "hervorragend", el: "εξέχων", la: "eminens", yo: "olókìkí", sw: "maarufu", gez: "kəbur", nl: "eminent", pl: "wybitny", ru: "выдающийся", uk: "видатний", zh: "杰出的", ja: "卓越した", ko: "저명한", ar: "بارز", he: "בולט", hi: "प्रख्यात", tr: "seçkin", sv: "framstående", da: "fremragende", no: "fremstående", fi: "etevä", cs: "vynikající", ro: "eminent", hu: "kiváló", ca: "eminent", gl: "eminente", eu: "nabarmen", gn: "tuicháva", qu: "hatun", eo: "eminenta", vi: "lỗi lạc", id: "terkemuka", th: "โดดเด่น", hr: "ugledan", sk: "vynikajúci", ga: "oirirc", cy: "nodedig", ha: "fitaccen", am: "ታዋቂ", fa: "برجسته", bn: "বিশিষ্ট", zu: "ovelele" },\n' +
    '    eminência: { gloss: "Substantivo de eminente — relevo / Sua Eminência; ver ficha eminente.", href: "/posts/post-inspecao-palavra-eminente.html", en: "eminence", es: "eminencia" },\n' +
    '    eminencia: { gloss: "Grafia sem acento de eminência — ver eminente.", href: "/posts/post-inspecao-palavra-eminente.html", en: "eminence (unaccented)", es: "eminencia" },\n' +
    '    iminente: { gloss: "Lat. imminens ← imminēre — paira / está a chegar; ≠ eminente (ēminēre). Corte na ficha eminente.", href: "/posts/post-inspecao-palavra-eminente.html", en: "imminent (not eminent)", es: "inminente (no eminente)", fr: "imminent", it: "imminente", de: "unmittelbar bevorstehend", el: "επικείμενος", la: "imminens" },\n' +
    '    proeminente: { gloss: "Lat. prominens — salta para a frente; primo de eminente, não sinónimo de iminente.", href: "/posts/post-inspecao-palavra-eminente.html", en: "prominent", es: "prominente" },\n';

  if (/    eminente:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    eminente:\s*\{[\s\S]*?\},/, block.split('\n')[0] + ',');
  } else if (/    eletrizante:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    eletrizante:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + block);
  } else if (/    incrivel:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    incrivel:\s*\{[\s\S]*?\},?\r?\n)/, block + '$1');
  } else {
    console.warn('Aviso: glossário — ponto eletrizante/incrivel não encontrado');
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-eminente-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildEminentePost());
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
    const sugId = 'palavra-eminente';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Eminente — sobressai; a orelha cola iminente',
      titleEn: 'Eminente — stands out; the ear glues iminente',
      titleEs: 'Eminente — sobresale; el oído pega iminente',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: eminente ← eminens / ēminēre (salta para fora). Par ilusório iminente (imminēre). A orelha cola; o étimo corta.',
      whyEn: 'Words: eminente ← eminens / ēminēre (juts out). False pair iminente (imminēre). The ear glues; the etymon cuts.',
      whyEs: 'Palabras: eminente ← eminens / ēminēre (salta hacia fuera). Par ilusorio iminente (imminēre). El oído pega; el étimo corta.',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/iminente',
        '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html',
        '/posts/post-inspecao-palavra-etimologia.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — ē-minēre × in-minēre; truque E/I de ofício.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (palavra-eminente)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'eminente',
      word: 'eminente',
      simple:
        'Lat. eminens ← ēminēre — salta para fora / sobressai. ≠ iminente (imminēre, está a chegar). A orelha cola; o étimo corta. Valeu !!!',
      simpleEn:
        'Lat. eminens ← ēminēre — juts out / stands out. ≠ iminente (imminēre, about to happen). The ear glues; the etymon cuts. Valeu !!!',
      simpleEs:
        'Lat. eminens ← ēminēre — salta hacia fuera / sobresale. ≠ iminente (imminēre, a punto de ocurrir). El oído pega; el étimo corta. ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'eletrizante' || x.id === 'especial' || x.id === 'etimologia'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    const imi = {
      id: 'iminente',
      word: 'iminente',
      simple:
        'Lat. imminens ← imminēre — paira / está a chegar. ≠ eminente. Corte na ficha eminente. Valeu !!!',
      simpleEn:
        'Lat. imminens ← imminēre — hangs over / about to happen. ≠ eminente. Cut on the eminente sheet. Valeu !!!',
      simpleEs:
        'Lat. imminens ← imminēre — se echa encima / a punto de ocurrir. ≠ eminente. Corte en la ficha eminente. ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    const ii = items.findIndex((x) => x.id === imi.id);
    if (ii >= 0) items[ii] = Object.assign({}, items[ii], imi);
    else {
      const afterE = items.findIndex((x) => x.id === 'eminente');
      if (afterE >= 0) items.splice(afterE + 1, 0, imi);
      else items.push(imi);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (eminente · iminente)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(GLOSS_FILE, next, 'utf8');
      console.log('Glossário actualizado (eminente)');
    }
  }

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK Cap.', post.seriesOrder, post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
