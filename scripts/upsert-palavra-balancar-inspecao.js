'use strict';

/**
 * Injeta palavra-objecto «balançar» (relação balança × peso).
 * Uso: node scripts/upsert-palavra-balancar-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildBalancarPost } = require('../lib/balancar-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-balancar.html';

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
  const entry =
    '    balançar: { tone: "craft", category: "Gesto", mundane: "Oscilar de um lado ao outro — rede, corpo, barco.", gloss: "De balanço/balança ← lat. bilanx; elos balança (instrumento) e peso (pendere); gatilho BAÇANÇAR; ≠ balancear ≠ dieta ≠ meneia; Valeu !!!", href: "/posts/post-inspecao-palavra-balancar.html", en: "to swing / rock", es: "balancear / mecer", fr: "balancer", it: "dondolare", de: "schaukeln", el: "κουνώ", la: "agitare", yo: "yí", sw: "tikisa", gez: "näqäṭä", nl: "schommelen", pl: "kołysać", ru: "качать", uk: "гойдати", zh: "摇摆", ja: "揺らす", ko: "흔들다", ar: "يهز", he: "לנדנד", hi: "झूलना", tr: "sallamak", sv: "gunga", da: "gyngе", no: "gynge", fi: "keinuа", cs: "houpat", ro: "a legăna", hu: "hintázni", ca: "balancejar", gl: "abalar", eu: "kulunkatu", gn: "mýi", qu: "tamyay", eo: "balanci", vi: "đu đưa", id: "mengayun", th: "แกว่ง", hr: "njihati", sk: "hojdať", ga: "luascadh", cy: "siglo", ha: "rawa", am: "ማወዛወዝ", fa: "تاب دادن", bn: "দোলানো", zu: "ukuzulazula" },\n' +
    '    balancar: { gloss: "Grafia sem cedilha → ver balançar (gesto × balança × peso).", href: "/posts/post-inspecao-palavra-balancar.html", en: "see balançar", es: "ver balançar" },\n' +
    '    balança: { gloss: "Instrumento de dois pratos (lat. bilanx); não é o verbo balançar nem o peso.", href: "/posts/post-inspecao-palavra-balancar.html", en: "scale / balance", es: "báscula / balanza" },\n' +
    '    balanca: { gloss: "Grafia sem cedilha → ver balança (instrumento), ficha balançar.", href: "/posts/post-inspecao-palavra-balancar.html", en: "see balança", es: "ver balança" },\n' +
    '    peso: { gloss: "Lat. pendere / pensum — o quanto pende; elo da ficha balançar × balança; ≠ dieta ≠ moeda peso.", href: "/posts/post-inspecao-palavra-balancar.html", en: "weight", es: "peso" },\n';

  if (/    balançar:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    balançar:\s*\{[\s\S]*?\},/, entry.split('\n')[0].replace(/,\s*$/, '') + ',');
  } else if (/    meneia:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    meneia:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + entry);
  } else if (/    gesto:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    gesto:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + entry);
  } else {
    console.warn('Aviso: glossário — ponto meneia/gesto não encontrado');
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-balancar-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildBalancarPost());
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
    const sugId = 'palavra-balancar';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Balançar — o gesto, a balança e o peso',
      titleEn: 'Balançar — the gesture, the scale, and the weight',
      titleEs: 'Balançar — el gesto, la báscula y el peso',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: balançar (gesto, bilanx) × balança × peso (pendere); gatilho BAÇANÇAR; ≠ dieta ≠ meneia; Valeu !!!',
      whyEn: 'Words: balançar (gesture, bilanx) × scale × weight (pendere); slip BAÇANÇAR; ≠ diet ≠ meneia; Valeu !!!',
      whyEs: 'Palabras: balançar (gesto, bilanx) × báscula × peso (pendere); lapsus BAÇANÇAR; ≠ dieta ≠ meneia; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/balan%C3%A7a',
        'https://pt.wiktionary.org/wiki/peso',
        '/posts/post-inspecao-palavra-meneia.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — gesto ≠ instrumento ≠ kg.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas (palavra-balancar)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'balancar',
      word: 'balançar',
      simple:
        'Gesto de oscilar (bilanx). Elos: balança (instrumento) e peso (pendere). Gatilho BAÇANÇAR. ≠ dieta ≠ meneia. Valeu !!!',
      simpleEn:
        'Swing/rock gesture (bilanx). Links: scale and weight (pendere). Slip BAÇANÇAR. ≠ diet ≠ meneia. Valeu !!!',
      simpleEs:
        'Gesto de oscilar (bilanx). Vínculos: báscula y peso (pendere). Lapsus BAÇANÇAR. ≠ dieta ≠ meneia. ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'meneia' || x.id === 'gesto');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado (balançar)');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(GLOSS_FILE, next, 'utf8');
      console.log('Glossário actualizado (balançar)');
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
