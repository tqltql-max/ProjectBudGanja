'use strict';

/**
 * Injeta a palavra «dor» na série Palavras
 * (doer · doído / doido · pain ≠ poena · labravra).
 * Uso: node scripts/upsert-palavra-dor-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildDorPost } = require('../lib/dor-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-dor.html';

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
    '    dor: { tone: "caution", category: "Dor", mundane: "O peso que se sente no corpo ou no ânimo.", gloss: "Lat. dolōrem ← dolēre — doer; doído × doido; pain ← poena (pena), não esta casa; labravra = lab colado; Valeu !!!", href: "/posts/post-inspecao-palavra-dor.html", en: "pain", es: "dolor", fr: "douleur", it: "dolore", de: "Schmerz", yo: "ìrora", sw: "maumivu", gez: "ḥəmäm", el: "πόνος", la: "dolor", nl: "pijn", pl: "ból", ru: "боль", uk: "біль", zh: "痛", ja: "痛み", ko: "통증", ar: "ألم", he: "כאב", hi: "दर्द", tr: "acı", sv: "smärta", da: "smerte", no: "smerte", fi: "kipu", cs: "bolest", ro: "durere", hu: "fájdalom", ca: "dolor", gl: "dor", eu: "min", gn: "hasy", qu: "nanay", eo: "doloro", vi: "đau", id: "nyeri", th: "ความเจ็บ", hr: "bol", sk: "bolesť", ga: "pian", cy: "poen", ha: "ciwo", am: "ህመም", fa: "درد", bn: "ব্যথা", zu: "ubuhlungu" },\n' +
    '    doer: { gloss: "Verbo de dor ← dolēre — dói; ≠ ing. doer (quem faz). Corte na ficha dor.", href: "/posts/post-inspecao-palavra-dor.html", en: "to hurt / to ache", es: "doler" },\n' +
    '    doido: { gloss: "Particípio de doer mandado ao juízo; × doído (corpo). Mesma raiz, dois ofícios. Corte na ficha dor.", href: "/posts/post-inspecao-palavra-dor.html", en: "mad / crazy (from aching)", es: "loco (participio de doer)" },\n' +
    '    "doído": { gloss: "Particípio de doer — o corpo que dói; × doido (juízo). Corte na ficha dor.", href: "/posts/post-inspecao-palavra-dor.html", en: "aching / sore", es: "adolorido" },\n' +
    '    doente: { gloss: "Quem dói — família dolēre. Corte na ficha dor.", href: "/posts/post-inspecao-palavra-dor.html", en: "ill / sick person", es: "enfermo" },\n' +
    '    labravra: { gloss: "Lapso de palavra — o lab cola no vocábulo. Pedido de campo da ficha dor.", href: "/posts/post-inspecao-palavra-dor.html", en: "slip for palavra (lab glued on)", es: "lapsus de palavra (lab pegado)" },\n';

  const lines = block.split('\n').filter((l) => l.trim());
  const dorLine = lines[0] + '\n';

  if (/    dor:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    dor:\s*\{[\s\S]*?\},/, lines[0]);
  } else if (/    calma:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    calma:\s*\{)/, dorLine + '$1');
  } else {
    console.warn('Aviso: glossário — ponto dor/calma não encontrado');
    return gloss;
  }

  const siblings = [
    ['doer', lines[1] + '\n'],
    ['doido', lines[2] + '\n'],
    ['"doído"', lines[3] + '\n'],
    ['doente', lines[4] + '\n'],
    ['labravra', lines[5] + '\n']
  ];
  for (const [key, line] of siblings) {
    const re = new RegExp('    ' + key + ':\\s*\\{[\\s\\S]*?\\},');
    if (re.test(gloss)) gloss = gloss.replace(re, line.replace(/\s+$/, ''));
    else if (/    dor:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/(    dor:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + line);
    }
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-dor-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildDorPost());
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
    const entry = {
      id: 'palavra-dor',
      title: 'Dor — dolōrem; doer; pain é poena',
      titleEn: 'Dor — dolōrem; doer; pain is poena',
      titleEs: 'Dor — dolōrem; doer; pain es poena',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: dor ← dolōrem ← dolēre. Doer / doído / doido. Pain ← poena (pena). Pedido labravra. Valeu !!!',
      whyEn: 'Words: dor ← dolōrem ← dolēre. Doer / doído / doido. Pain ← poena. Field slip labravra. Valeu !!!',
      whyEs: 'Palabras: dor ← dolōrem ← dolēre. Doer / doído / doido. Pain ← poena. Pedido labravra. ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/doer',
        'https://en.wiktionary.org/wiki/poena#Latin',
        '/posts/post-inspecao-palavra-alivio.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — dolor × poena × álgos; gatilho labravra / inspção.'
    };
    upsertItem(items, entry, ['palavra-alivio', 'palavra-curar']);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (palavra-dor)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'dor',
        word: 'dor',
        simple:
          'Lat. dolōrem ← dolēre — doer; doído × doido; pain ← poena (pena). Labravra = lab colado. Valeu !!!',
        simpleEn:
          'Lat. dolōrem ← dolēre — to ache; doído × doido; pain ← poena (penalty). Labravra = lab glued on. Valeu !!!',
        simpleEs:
          'Lat. dolōrem ← dolēre — doler; doído × doido; pain ← poena (pena). Labravra = lab pegado. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['droga', 'diamba', 'alivio']
    );
    upsertItem(
      items,
      {
        id: 'doer',
        word: 'doer',
        simple: 'Verbo de dor ← dolēre — dói. ≠ ing. doer. Corte na ficha dor. Valeu !!!',
        simpleEn: 'Verb of dor ← dolēre — it aches. ≠ Eng. doer. Cut on the dor sheet. Valeu !!!',
        simpleEs: 'Verbo de dor ← dolēre — duele. ≠ ing. doer. Corte en la ficha dor. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['dor']
    );
    upsertItem(
      items,
      {
        id: 'labravra',
        word: 'labravra',
        simple: 'Lapso de palavra — o lab cola no vocábulo. Pedido da ficha dor. Valeu !!!',
        simpleEn: 'Slip for palavra — the lab glues onto the word. Field request on the dor sheet. Valeu !!!',
        simpleEs: 'Lapsus de palavra — el lab se pega al vocablo. Pedido de la ficha dor. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF
      },
      ['doer', 'dor']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (dor · doer · labravra)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(GLOSS_FILE, next, 'utf8');
      console.log('Glossário actualizado (dor)');
    } else {
      console.warn('Aviso: glossário sem alteração detectável');
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
