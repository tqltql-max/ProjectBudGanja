'use strict';

/**
 * Injeta palavra «insana» na série Palavras.
 * Uso: node scripts/upsert-palavra-insana-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildInsanaPost } = require('../lib/insana-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-insana');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildInsanaPost(seriesOrder);

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
    const sugId = 'palavra-insana';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Insana — intensidade, juízo e cuidado',
      titleEn: 'Insana — intensity, judgment and care',
      titleEs: 'Insana — intensidad, juicio y cuidado',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: insana (in-+sanus) — intensidade BR; ≠ diagnóstico; verdade/respeito; Valeu !!!',
      whyEn: 'Words: insana (in-+sanus) — BR intensity; ≠ diagnosis; truth/respect; Valeu !!!',
      whyEs: 'Palabras: insana (in-+sanus) — intensidad BR; ≠ diagnóstico; verdad/respeto; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-verdade.html',
        '/posts/post-inspecao-palavra-respeito.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — hipérbole ≠ insulto ≠ clínica.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-insana)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'insana',
      word: 'insana',
      simple:
        'Lat. insanus (in- + sanus) — intensidade/excesso no BR; ≠ diagnóstico; verdade e respeito; Valeu !!!',
      simpleEn:
        'Lat. insanus (in- + sanus) — intensity/excess in BR; ≠ diagnosis; truth and respect; Valeu !!!',
      simpleEs:
        'Lat. insanus (in- + sanus) — intensidad/exceso en BR; ≠ diagnóstico; verdad y respeto; Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'insana' || x.word === 'insano');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'incrivel' || x.id === 'respeito');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (insana)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    insana: { gloss: "Lat. insanus (in-+sanus) — intensidade/excesso BR; ≠ diagnóstico; verdade/respeito; Valeu !!!", href: "/posts/post-inspecao-palavra-insana.html", en: "insane (intensifier)", es: "insana", fr: "insensee", it: "insana", de: "wahnsinnig", el: "paraphron", la: "insana", yo: "asin", sw: "kichaa", gez: "dənsas", nl: "krankzinnig", pl: "szalona", ru: "bezumnaya", uk: "nenormalna", zh: "fengkuang", ja: "kichigai-kei", ko: "michin", ar: "majnuuna", he: "meshugaat", hi: "paagal", tr: "deli", sv: "vansinnig", da: "vanvittig", no: "vanvittig", fi: "hullu", cs: "silena", ro: "nebuneasca", hu: "orul", ca: "insana", gl: "insá", eu: "eroa", gn: "tavaí", qu: "muspha", eo: "freneza", vi: "dien", id: "gila", th: "บ้า", hr: "luda", sk: "silena", ga: "gealtach", cy: "gwallgof", ha: "hauka", am: "እብድ", fa: "divane", bn: "পাগল", zu: "uhlanya" },';
    if (/insana:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    insana:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (insana · existente)');
    } else {
      const reResp = /(respeito:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reResp.test(gloss)) {
        gloss = gloss.replace(reResp, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (insana · após respeito)');
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
