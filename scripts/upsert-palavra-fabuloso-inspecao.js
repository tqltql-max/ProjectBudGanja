'use strict';

/**
 * Injeta palavra «fabuloso» na série Palavras.
 * Uso: node scripts/upsert-palavra-fabuloso-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildFabulosoPost } = require('../lib/fabuloso-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
  } else {
    posts.unshift(post);
    console.log('Inserido', post.slug);
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
  // Re-ler Cap livre (agentes concorrentes) — só série palavras-origem
  const postsLive = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const used = new Set(
    postsLive
      .filter(
        (x) =>
          x.series === 'palavras-origem' &&
          x.slug !== 'inspecao-palavra-fabuloso' &&
          x.seriesOrder != null
      )
      .map((x) => x.seriesOrder)
  );
  const maxCap = used.size ? Math.max(...used) : 0;
  let nextCap = maxCap + 1;
  const existing = postsLive.find((p) => p.slug === 'inspecao-palavra-fabuloso');
  if (existing && existing.seriesOrder != null) {
    console.log('Slug já existe — Cap.', existing.seriesOrder, '(deepen/update)');
  }

  const post = buildFabulosoPost();
  if (used.has(post.seriesOrder) && !(existing && existing.seriesOrder === post.seriesOrder)) {
    post.seriesOrder = nextCap;
    console.log('seriesOrder ajustado para Cap.', nextCap, '(append após max', maxCap + ')');
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-fabuloso';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Fabuloso — fábula, elogio BR e Faça o melhor!',
      titleEn: 'Fabuloso — fable, BR praise and Do your best!',
      titleEs: 'Fabuloso — fábula, elogio BR y ¡Haz lo mejor!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: fabuloso (lat. fabula / fabulous) — elogio BR; escala genial/legal/especial; tipografia fabsulkaoso → fabuloso.',
      whyEn: 'Words: fabuloso (Lat. fabula / fabulous) — BR praise; scale genial/legal/especial; typo fabsulkaoso → fabuloso.',
      whyEs: 'Palabras: fabuloso (lat. fabula / fabulous) — elogio BR; escala genial/legal/especial; tipografía fabsulkaoso → fabuloso.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/f%C3%A1bula',
        'https://en.wiktionary.org/wiki/fabulous',
        '/posts/post-inspecao-palavra-genial.html',
        '/posts/post-inspecao-palavra-legal.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — elogio BR; rede só com slugs existentes.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-fabuloso)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'fabuloso',
      word: 'fabuloso',
      simple:
        'Lat. fābula / fabulous — elogio BR quotidiano («que demais!»); escala com genial, legal, especial; Faça o melhor com rasto.',
      simpleEn:
        'Lat. fābula / fabulous — everyday BR praise; scale with genial, legal, especial; Do your best with a trail.',
      simpleEs:
        'Lat. fābula / fabulous — elogio BR cotidiano; escala con genial, legal, especial; Haz lo mejor con rastro.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'fabuloso');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'genial' || x.id === 'legal' || x.id === 'especial'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (fabuloso)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    fabuloso: { gloss: "Lat. fabula / fabulous — elogio BR quotidiano; escala genial/legal/especial; Faça o melhor com rasto.", href: "/posts/post-inspecao-palavra-fabuloso.html", en: "fabulous / wonderful", es: "fabuloso", fr: "fabuleux", it: "favoloso", de: "fabelhaft", el: "μυθικός", la: "fabulosus", yo: "àgbàyanu", sw: "ajabu", gez: "mənkir", nl: "fabulous", pl: "bajeczny", ru: "сказочный", uk: "казковий", zh: "极好的", ja: "素晴らしい", ko: "굉장한", ar: "رائع", he: "אגדי", hi: "शानदार", tr: "masalsı", sv: "fantastisk", da: "fabellignende", no: "eventyrlig", fi: "upea", cs: "báječný", ro: "fabulos", hu: "mesés", ca: "fabulós", gl: "fabuloso", eu: "ipuin-antzeko", gn: "porãité", qu: "musphay", eo: "fabla", vi: "tuyệt vời", id: "luar biasa", th: "มหัศจรรย์", hr: "bajkovit", sk: "rozprávkový", ga: "fínscéalach", cy: "rhyfeddol", ha: "ban mamaki", am: "አስደናቂ", fa: "افسانه‌ای", bn: "অসাধারণ", zu: "okumangalisayo" },';
    if (/fabuloso:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    fabuloso:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (fabuloso · existente)');
    } else {
      const reGenial = /(genial:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reLegal = /(legal:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reGenial.test(gloss)) {
        gloss = gloss.replace(reGenial, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (fabuloso · após genial)');
      } else if (reLegal.test(gloss)) {
        gloss = gloss.replace(reLegal, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (fabuloso · após legal)');
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
