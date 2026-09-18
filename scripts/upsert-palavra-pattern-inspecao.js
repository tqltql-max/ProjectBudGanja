'use strict';

/**
 * Injeta palavra «pattern» na série Palavras.
 * Uso: node scripts/upsert-palavra-pattern-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildPatternPost } = require('../lib/pattern-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function nextPalavrasOrder(posts) {
  const orders = posts
    .filter((p) => p.series === 'palavras-origem')
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-pattern');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildPatternPost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  i18n[post.slug] = {
    titleEn: post.titleEn,
    titleEs: post.titleEs,
    excerptEn: post.excerptEn,
    excerptEs: post.excerptEs,
    contentEn: post.contentEn,
    contentEs: post.contentEs
  };
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-pattern';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Pattern — molde, padrão e repetição',
      titleEn: 'Pattern — mold, template and repetition',
      titleEs: 'Pattern — molde, plantilla y repetición',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: pattern (EN) — molde/padrão/design pattern; gesto/caminho/risco; Faça o melhor!',
      whyEn: 'Words: pattern (EN) — mold/template/design pattern; gesto/caminho/risco; Do your best!',
      whyEs: 'Palabras: pattern (EN) — molde/plantilla/design pattern; gesto/caminho/risco; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-gesto.html',
        '/posts/post-inspecao-palavra-caminho.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — loan EN; padrão PT em texto formal.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-pattern)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'pattern',
      word: 'pattern',
      simple:
        'EN — molde / padrão / design pattern no BR; repetição reconhecível; elos gesto/caminho; Faça o melhor com o molde certo.',
      simpleEn:
        'EN — mold / template / design pattern in BR; recognizable repetition; links gesto/caminho; Do your best with the right mold.',
      simpleEs:
        'EN — molde / plantilla / design pattern en BR; repetición reconocible; vínculos gesto/caminho; Haz lo mejor con el molde correcto.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'pattern');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'nap' || x.id === 'gesto' || x.id === 'caminho');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (pattern)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    pattern: { gloss: "EN — molde / padrão / design pattern; repetição reconhecível; elos gesto/caminho; Faça o melhor!", href: "/posts/post-inspecao-palavra-pattern.html", en: "pattern", es: "patron / molde", fr: "motif / modele", it: "schema / modello", de: "Muster", el: "motivo", la: "exemplar", yo: "apẹẹrẹ", sw: "muundo", gez: "məsal", nl: "patroon", pl: "wzorzec", ru: "шаблон", uk: "шаблон", zh: "模式", ja: "パターン", ko: "패턴", ar: "نمط", he: "תבנית", hi: "पैटर्न", tr: "desen / kalıp", sv: "monster", da: "monster", no: "monster", fi: "kuvio", cs: "vzor", ro: "model", hu: "minta", ca: "patro", gl: "patron", eu: "eredu", gn: "ta\'anga", qu: "rikchay", eo: "sxablono", vi: "mau", id: "pola", th: "รูปแบบ", hr: "uzorak", sk: "vzor", ga: "patrún", cy: "patrwm", ha: "tsari", am: "ስርዓት", fa: "الگو", bn: "প্যাটার্ন", zu: "iphethini" },';
    if (/pattern:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    pattern:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (pattern · existente)');
    } else {
      const reNap = /(nap:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reGesto = /(gesto:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reNap.test(gloss)) {
        gloss = gloss.replace(reNap, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (pattern · após nap)');
      } else if (reGesto.test(gloss)) {
        gloss = gloss.replace(reGesto, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (pattern · após gesto)');
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
