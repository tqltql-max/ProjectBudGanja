'use strict';

/**
 * Injeta palavra «tempo» na série Palavras.
 * Uso: node scripts/upsert-palavra-tempo-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildTempoPost } = require('../lib/tempo-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-tempo');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildTempoPost(seriesOrder);

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
    const sugId = 'palavra-tempo';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Tempo — cronologia, clima, compasso e o instante certo',
      titleEn: 'Tempo — chronology, weather, beat and the right moment',
      titleEs: 'Tempo — cronología, clima, compás y el instante justo',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: tempo (lat. tempus) — cronologia/clima/compasso; kairós × chronos; sempre/passado/vida/alma; Faça o melhor!',
      whyEn: 'Words: tempo (Lat. tempus) — chronology/weather/beat; kairós × chronos; sempre/passado/vida/alma; Do your best!',
      whyEs: 'Palabras: tempo (lat. tempus) — cronología/clima/compás; kairós × chronos; sempre/passado/vida/alma; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-sempre.html',
        '/posts/post-inspecao-palavra-passado.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — cronos/clima/compasso/posse; kairós comparação sem linhagem.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-tempo)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'tempo',
      word: 'tempo',
      simple:
        'Lat. tempus — cronologia, clima («tempo bom») e compasso musical na mesma palavra; kairós × chronos; elos sempre/passado/alma; Faça o melhor com o tempo que se tem.',
      simpleEn:
        'Lat. tempus — chronology, weather and musical beat share the same word; kairós × chronos; links sempre/passado/alma; Do your best with the time you have.',
      simpleEs:
        'Lat. tempus — cronología, clima y compás musical en la misma palabra; kairós × chronos; vínculos sempre/passado/alma; Haz lo mejor con el tiempo que tienes.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'tempo');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'passado' || x.id === 'sempre' || x.id === 'gesto'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (tempo)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    tempo: { gloss: "Lat. tempus — cronologia, clima e compasso musical na mesma palavra; kairós × chronos; elos sempre/passado/alma; Faça o melhor!", href: "/posts/post-inspecao-palavra-tempo.html", en: "time / weather / tempo", es: "tiempo", fr: "temps", it: "tempo", de: "Zeit / Wetter", el: "chronos", la: "tempus", yo: "akoko", sw: "wakati", gez: "gize", nl: "tijd", pl: "czas", ru: "vremya", uk: "chas", zh: "shijian", ja: "jikan", ko: "sigan", ar: "waqt", he: "zman", hi: "samay", tr: "zaman", sv: "tid", da: "tid", no: "tid", fi: "aika", cs: "cas", ro: "timp", hu: "ido", ca: "temps", gl: "tempo", eu: "denbora", gn: "ara", qu: "pacha", eo: "tempo", vi: "thoi gian", id: "waktu", th: "wela", hr: "vrijeme", sk: "cas", ga: "am", cy: "amser", ha: "lokaci", am: "gize", fa: "zaman", bn: "somoy", zu: "isikhathi" },';
    if (/tempo:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    tempo:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (tempo · existente)');
    } else {
      const rePassado = /(passado:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reSempre = /(sempre:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (rePassado.test(gloss)) {
        gloss = gloss.replace(rePassado, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (tempo · após passado)');
      } else if (reSempre.test(gloss)) {
        gloss = gloss.replace(reSempre, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (tempo · após sempre)');
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
