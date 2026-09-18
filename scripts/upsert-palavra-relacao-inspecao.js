'use strict';

/**
 * Injeta palavra «relação» na série Palavras.
 * Uso: node scripts/upsert-palavra-relacao-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildRelacaoPost } = require('../lib/relacao-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-relacao');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildRelacaoPost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-relacao';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Relação — o entre, o relato e a proporção',
      titleEn: 'Relação — the between, the report, and the ratio',
      titleEs: 'Relação — el entre, el relato y la proporción',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: relação (lat. relatĭō) — vínculo/relato/proporção; elos simbiose/respeito/gesto; Faça o melhor!',
      whyEn: 'Words: relação (Lat. relatĭō) — bond/report/ratio; links simbiose/respeito/gesto; Do your best!',
      whyEs: 'Palabras: relação (lat. relatĭō) — vínculo/relato/proporción; vínculos simbiose/respeito/gesto; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-simbiose.html',
        '/posts/post-inspecao-palavra-respeito.html',
        '/posts/post-inspecao-palavra-gesto.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — relatĭō = reportar; palavra ≠ terapia.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-relacao)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'relacao',
      word: 'relação',
      simple:
        'Lat. relatĭō — vínculo, relato e proporção; elos simbiose/respeito/gesto; Faça o melhor!',
      simpleEn:
        'Lat. relatĭō — bond, report and ratio; links simbiose/respeito/gesto; Do your best!',
      simpleEs:
        'Lat. relatĭō — vínculo, relato y proporción; vínculos simbiose/respeito/gesto; ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex(
      (x) => x.id === entry.id || x.word === 'relação' || x.word === 'relacao'
    );
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'simbiose' || x.id === 'respeito' || x.id === 'gesto'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (relação)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    relacao: { tone: "bond", gloss: "Lat. relatĭō — vínculo × relato × proporção; elos simbiose/respeito/gesto; Faça o melhor!", href: "/posts/post-inspecao-palavra-relacao.html", en: "relation / relationship", es: "relacion", fr: "relation", it: "relazione", de: "Beziehung", el: "schesi", la: "relatio", yo: "ibasepo", sw: "uhusiano", gez: "gənuñña", nl: "relatie", pl: "relacja", ru: "otnoshenie", uk: "vidnosyny", zh: "guanxi", ja: "kankei", ko: "gwangye", ar: "alaqa", he: "yahas", hi: "sambandh", tr: "iliski", sv: "relation", da: "relation", no: "relasjon", fi: "suhde", cs: "vztah", ro: "relatie", hu: "kapcsolat", ca: "relacio", gl: "relacion", eu: "harreman", gn: "joaju", qu: "rimanakuy", eo: "rilato", vi: "quan he", id: "hubungan", th: "khwam samphan", hr: "odnos", sk: "vztah", ga: "caidreamh", cy: "perthynas", ha: "alaqa", am: "gənñənət", fa: "rabete", bn: "samparka", zu: "ubudlelwano" },';
    const entryAccent =
      '    relação: { tone: "bond", gloss: "Lat. relatĭō — vínculo × relato × proporção; elos simbiose/respeito/gesto.", href: "/posts/post-inspecao-palavra-relacao.html", en: "relation / relationship", es: "relacion", fr: "relation", it: "relazione", de: "Beziehung", el: "schesi", la: "relatio", yo: "ibasepo", sw: "uhusiano", gez: "gənuñña", nl: "relatie", pl: "relacja", ru: "otnoshenie", uk: "vidnosyny", zh: "guanxi", ja: "kankei", ko: "gwangye", ar: "alaqa", he: "yahas", hi: "sambandh", tr: "iliski", sv: "relation", da: "relation", no: "relasjon", fi: "suhde", cs: "vztah", ro: "relatie", hu: "kapcsolat", ca: "relacio", gl: "relacion", eu: "harreman", gn: "joaju", qu: "rimanakuy", eo: "rilato", vi: "quan he", id: "hubungan", th: "khwam samphan", hr: "odnos", sk: "vztah", ga: "caidreamh", cy: "perthynas", ha: "alaqa", am: "gənñənət", fa: "rabete", bn: "samparka", zu: "ubudlelwano" },';
    if (/relacao:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    relacao:\s*\{[\s\S]*?\},/, entryLine);
      if (/relação:\s*\{/.test(gloss)) {
        gloss = gloss.replace(/    relação:\s*\{[\s\S]*?\},/, entryAccent);
      } else {
        gloss = gloss.replace(/(relacao:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + entryAccent + '\n');
      }
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (relacao · existente)');
    } else {
      const reSimbiose = /(simbiose:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reSimbiose.test(gloss)) {
        gloss = gloss.replace(reSimbiose, '$1' + entryLine + '\n' + entryAccent + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (relação · após simbiose)');
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
