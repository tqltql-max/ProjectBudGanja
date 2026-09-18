'use strict';

/**
 * Injeta palavra «pular» (+ derivações) na série Palavras.
 * Uso: node scripts/upsert-palavra-pular-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildPularPost } = require('../lib/pular-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextPalavrasOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'palavras-origem')
    .map((p) => Number(p.seriesOrder) || 0);
  const max = orders.length ? Math.max(...orders) : 0;
  return max + 1;
}

function upsertPost(posts, post) {
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

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-pular');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildPularPost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-pular';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Pular — salto, omissão e derivações',
      titleEn: 'Pular — jump, skip and derivatives',
      titleEs: 'Pular — salto, omisión y derivaciones',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: pular (lat. pullāre) — salto × omitir; pulo/pulinho/pulada; passar/backspace/já; Faça o melhor!',
      whyEn: 'Words: pular (Lat. pullāre) — jump × skip; pulo/pulinho/pulada; passar/backspace/já; Do your best!',
      whyEs: 'Palabras: pular (lat. pullāre) — salto × omitir; pulo/pulinho/pulada; passar/backspace/já; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/pulo',
        '/posts/post-inspecao-palavra-passar.html',
        '/posts/post-inspecao-palavra-backspace.html',
        '/posts/post-inspecao-palavra-ja.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — inclui derivações; gatilho lab skip inspecao → pular.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-pular)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'pular',
      word: 'pular',
      simple:
        'Lat. pullāre — salto × omitir BR; derivações pulo/pulinho/pulada; elos passar/backspace/já; Faça o melhor com o pulo certo.',
      simpleEn:
        'Lat. pullāre — jump × skip BR; derivatives pulo/pulinho/pulada; links passar/backspace/já; Do your best with the right leap.',
      simpleEs:
        'Lat. pullāre — salto × omitir BR; derivaciones pulo/pulinho/pulada; vínculos passar/backspace/já; Haz lo mejor con el salto correcto.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'pular');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'passar' || x.id === 'backspace' || x.id === 'ja' || x.id === 'caminho'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (pular)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryMain =
      '    pular: { gloss: "Lat. pullāre — salto × omitir BR; derivações pulo/pulinho/pulada; elos passar/backspace/já; Faça o melhor!", href: "/posts/post-inspecao-palavra-pular.html", en: "to jump / to skip", es: "saltar / omitir", fr: "sauter", it: "saltare", de: "springen", el: "πηδώ", la: "pullare", yo: "fo", sw: "ruka", gez: "nafasa", nl: "springen", pl: "skakac", ru: "prygat", uk: "strybaty", zh: "jump", ja: "tobu", ko: "ttuida", ar: "yaqfiz", he: "likfotz", hi: "kudna", tr: "atlamak", sv: "hoppa", da: "springe", no: "hoppe", fi: "hypata", cs: "skakat", ro: "sari", hu: "ugrani", ca: "saltar", gl: "saltar", eu: "salto", gn: "poka", qu: "pawa", eo: "salti", vi: "nhay", id: "lompat", th: "jump", hr: "skakati", sk: "skakat", ga: "leim", cy: "neidio", ha: "tsalle", am: "mezlel", fa: "paridan", bn: "lafano", zu: "gxuma" },';
    const entryDerivs =
      '    pulo: { gloss: "Derivação de pular — o salto; dar um pulo.", href: "/posts/post-inspecao-palavra-pular.html", en: "jump / leap", es: "salto" },\n' +
      '    pulinho: { gloss: "Diminutivo — salto pequeno / leveza.", href: "/posts/post-inspecao-palavra-pular.html", en: "little jump", es: "saltico" },\n' +
      '    pulada: { gloss: "Acto de pular; salto brusco / evento.", href: "/posts/post-inspecao-palavra-pular.html", en: "leap (act)", es: "salto (acto)" },';
    const entryLine = entryMain + '\n' + entryDerivs;
    if (/pular:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    pular:\s*\{[\s\S]*?\},/, entryMain);
      if (!/pulo:\s*\{/.test(gloss)) {
        gloss = gloss.replace(/(pular:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + entryDerivs + '\n');
      }
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (pular · entrada existente enriquecida)');
    } else {
      const rePassar = /(passar:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reBack = /(backspace:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (rePassar.test(gloss)) {
        gloss = gloss.replace(rePassar, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (pular · após passar)');
      } else if (reBack.test(gloss)) {
        gloss = gloss.replace(reBack, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (pular · após backspace)');
      } else {
        console.warn('Aviso: glossário — ponto de inserção não encontrado');
      }
    }
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
