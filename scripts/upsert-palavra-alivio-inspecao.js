'use strict';

/**
 * Injeta a palavra «alívio» na série Palavras
 * (aliviado · veado / viado · aninal).
 * Uso: node scripts/upsert-palavra-alivio-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildAlivioPost } = require('../lib/alivio-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-alivio.html';

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

function patchGlossary(gloss) {
  const block =
    '    alivio: { tone: "craft", category: "Alívio", mundane: "Diminuição de peso, dor ou aperto.", gloss: "Lat. alleviāre ← ad- + levis — tornar leve; aliviado = estado; a orelha cola veado (venātus); Valeu !!!", href: "/posts/post-inspecao-palavra-alivio.html", en: "relief", es: "alivio", fr: "soulagement", it: "sollievo", de: "Erleichterung", el: "ανακούφιση", la: "alleviatio", yo: "ìtura", sw: "nafsi", gez: "ʾastärʾayo", nl: "verlichting", pl: "ulga", ru: "облегчение", uk: "полегшення", zh: "宽慰", ja: "安堵", ko: "안도", ar: "ارتياح", he: "הקלה", hi: "राहत", tr: "rahatlama", sv: "lättnad", da: "lettelse", no: "lettelse", fi: "helpotus", cs: "úleva", ro: "ușurare", hu: "megkönnyebbülés", ca: "alleujament", gl: "alivio", eu: "lasaitasun", gn: "py\'aguapy", qu: "samay", eo: "reliefo", vi: "sự nhẹ nhõm", id: "keringanan", th: "ความโล่งใจ", hr: "olakšanje", sk: "úľava", ga: "faoiseamh", cy: "rhyddhad", ha: "sauki", am: "እፎታ", fa: "تسکین", bn: "স্বস্তি", zu: "ukukhululeka" },\n' +
    '    aliviar: { gloss: "Verbo de alívio — tornar leve. Corte na ficha alívio.", href: "/posts/post-inspecao-palavra-alivio.html", en: "to relieve / to lighten", es: "aliviar" },\n' +
    '    aliviado: { gloss: "Particípio — estado de quem foi tornado leve; a orelha cola veado/viado; o étimo corta. Corte na ficha alívio.", href: "/posts/post-inspecao-palavra-alivio.html", en: "relieved", es: "aliviado" },\n' +
    '    veado: { gloss: "Cervídeo ← lat. venātus (caçado); ≠ aliviado (levis). Animal primeiro; gíria BR indexada, sem ofício. Corte na ficha alívio.", href: "/posts/post-inspecao-palavra-alivio.html", en: "deer (animal)", es: "ciervo / venado" },\n' +
    '    viado: { gloss: "Grafia da orelha de veado; no BR também gíria — indexar; não é ofício da ficha alívio.", href: "/posts/post-inspecao-palavra-alivio.html", en: "ear-spelling of veado", es: "grafía de oído de veado" },\n' +
    '    cervo: { gloss: "Lat. cervus — o outro nome do cervídeo; veado é venātus. Corte na ficha alívio.", href: "/posts/post-inspecao-palavra-alivio.html", en: "stag / deer (cervus)", es: "ciervo" },\n' +
    '    aninal: { gloss: "Lapso de animal — gatilho de campo na ficha alívio (relação com veado).", href: "/posts/post-inspecao-palavra-alivio.html", en: "slip for animal", es: "lapsus de animal" },\n';

  if (/    alivio:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    alivio:\s*\{[\s\S]*?\},/, block.split('\n')[0]);
  } else if (/    alegria:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    alegria:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + block);
  } else {
    console.warn('Aviso: glossário — ponto alegria não encontrado');
  }

  const siblings = [
    ['aliviar', block.split('\n')[1] + '\n'],
    ['aliviado', block.split('\n')[2] + '\n'],
    ['veado', block.split('\n')[3] + '\n'],
    ['viado', block.split('\n')[4] + '\n'],
    ['cervo', block.split('\n')[5] + '\n'],
    ['aninal', block.split('\n')[6] + '\n']
  ];
  for (const [key, line] of siblings) {
    const re = new RegExp('    ' + key + ':\\s*\\{[\\s\\S]*?\\},');
    if (re.test(gloss)) gloss = gloss.replace(re, line.replace(/\s+$/, ''));
    else if (/    alivio:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/(    alivio:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + line);
    }
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-alivio-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildAlivioPost());
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
    const sugId = 'palavra-alivio';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Alívio — tornar leve; a orelha cola veado',
      titleEn: 'Alívio — making light; the ear glues veado',
      titleEs: 'Alívio — aligerar; el oído pega veado',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: alívio ← alleviāre (ad- + levis). Aliviado = estado. Veado ← venātus (animal). A orelha cola; o étimo corta.',
      whyEn: 'Words: alívio ← alleviāre (ad- + levis). Aliviado = state. Veado ← venātus (animal). The ear glues; the etymon cuts.',
      whyEs: 'Palabras: alívio ← alleviāre (ad- + levis). Aliviado = estado. Veado ← venātus (animal). El oído pega; el étimo corta.',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/veado',
        '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html',
        '/posts/post-inspecao-palavra-animal.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — levis × venātus; gatilho aninal; animal primeiro.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (palavra-alivio)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'alivio',
        word: 'alívio',
        simple:
          'Lat. alleviāre ← ad- + levis — tornar leve. Aliviado = estado. A orelha cola veado (venātus). Valeu !!!',
        simpleEn:
          'Lat. alleviāre ← ad- + levis — to make light. Aliviado = state. The ear glues veado (venātus). Valeu !!!',
        simpleEs:
          'Lat. alleviāre ← ad- + levis — aligerar. Aliviado = estado. El oído pega veado (venātus). ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['alegria', 'algodao']
    );
    upsertItem(
      items,
      {
        id: 'aliviado',
        word: 'aliviado',
        simple:
          'Particípio de aliviar — estado depois do peso baixar. ≠ veado. Corte na ficha alívio. Valeu !!!',
        simpleEn:
          'Participle of aliviar — state after the weight drops. ≠ veado. Cut on the alívio sheet. Valeu !!!',
        simpleEs:
          'Participio de aliviar — estado después de bajar el peso. ≠ veado. Corte en la ficha alívio. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['alivio']
    );
    upsertItem(
      items,
      {
        id: 'veado',
        word: 'veado',
        simple:
          'Lat. venātus — o caçado, o cervídeo. ≠ aliviado (levis). Animal primeiro. Corte na ficha alívio. Valeu !!!',
        simpleEn:
          'Lat. venātus — the hunted, the deer. ≠ aliviado (levis). Animal first. Cut on the alívio sheet. Valeu !!!',
        simpleEs:
          'Lat. venātus — el cazado, el cérvido. ≠ aliviado (levis). Animal primero. Corte en la ficha alívio. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['aliviado', 'alivio']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (alívio · aliviado · veado)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(GLOSS_FILE, next, 'utf8');
      console.log('Glossário actualizado (alívio)');
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
