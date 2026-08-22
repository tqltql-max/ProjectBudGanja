'use strict';

/**
 * Injeta palavra «Grok» na série Palavras.
 * Uso: node scripts/upsert-palavra-grok-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildGrokPost } = require('../lib/grok-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-grok');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildGrokPost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-grok';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Grok — compreender por dentro × falar limpo (Deus × tom)',
      titleEn: 'Grok — understand deeply × speak clean (Deus × tone)',
      titleEs: 'Grok — comprender por dentro × hablar limpio (Deus × tono)',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: Grok (Heinlein to grok) — compreensão íntima × tom de ofício; relação de forma de se expressar com Deus; Valeu !!!',
      whyEn: 'Words: Grok (Heinlein to grok) — deep understanding × craft tone; expression link to Deus; Valeu !!!',
      whyEs: 'Palabras: Grok (Heinlein to grok) — comprensión íntima × tono de oficio; vínculo de expresión con Deus; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-simbiose.html',
        '/posts/post-inspecao-expressao-deus-abencoe.html',
        '/posts/post-inspecao-expressao-filho-de-deus.html',
        '/posts/post-inspecao-expressao-meudeusdoceu.html',
        '/posts/post-inspecao-expressao-jesusamado.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — grock→Grok; relacionar Deus×Grok na forma de se expressar; ficha ≠ catecismo.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-grok)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'grok',
      word: 'Grok',
      simple:
        'Heinlein *to grok* — compreender por dentro × tom de ofício; elo oral com Deus (abençoe / dignidade / assombro); humano decide.',
      simpleEn:
        'Heinlein *to grok* — understand deeply × craft tone; oral link to Deus; human decides.',
      simpleEs:
        'Heinlein *to grok* — comprender por dentro × tono de oficio; vínculo oral con Deus; decide el humano.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex(
      (x) => x.id === entry.id || x.word === 'Grok' || x.word === 'grok'
    );
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'simbiose' || x.id === 'relacao' || x.id === 'gesto'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (Grok)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    grok: { tone: "craft", gloss: "Heinlein to grok — compreender por dentro × tom limpo; elo oral com Deus; Valeu !!!", href: "/posts/post-inspecao-palavra-grok.html", en: "grok", es: "grok", fr: "grok", it: "grok", de: "grok", el: "grok", la: "intellegere intime", yo: "ye jinle", sw: "elewa kwa undani", gez: "ammer", nl: "grok", pl: "grok", ru: "grok", uk: "grok", zh: "grok", ja: "grok", ko: "grok", ar: "grok", he: "grok", hi: "grok", tr: "grok", sv: "grok", da: "grok", no: "grok", fi: "grok", cs: "grok", ro: "grok", hu: "grok", ca: "grok", gl: "grok", eu: "grok", gn: "grok", qu: "grok", eo: "groki", vi: "grok", id: "grok", th: "grok", hr: "grok", sk: "grok", ga: "grok", cy: "grok", ha: "grok", am: "grok", fa: "grok", bn: "grok", zu: "grok" },';
    if (/grok:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    grok:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (grok · existente)');
    } else {
      const reSimbiose = /(simbiose:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reSimbiose.test(gloss)) {
        gloss = gloss.replace(reSimbiose, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (grok · após simbiose)');
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
