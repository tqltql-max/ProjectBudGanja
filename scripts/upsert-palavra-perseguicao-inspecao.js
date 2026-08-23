'use strict';

/**
 * Injeta palavra «perseguição» na série Palavras.
 * Uso: node scripts/upsert-palavra-perseguicao-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildPerseguicaoPost } = require('../lib/perseguicao-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-perseguicao');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildPerseguicaoPost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-perseguicao';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Perseguição — caça, opressão e o seguir que aperta',
      titleEn: 'Perseguição — chase, oppression, and the follow that squeezes',
      titleEs: 'Perseguição — caza, opresión y el seguir que aprieta',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: perseguição (lat. persequī) — caça/opressão/obsessão; contraste prosseguir; caminho/risco/EXIT; Valeu !!!',
      whyEn: 'Words: perseguição (Lat. persequī) — chase/oppression/obsession; contrast prosseguir; caminho/risco/EXIT; Valeu !!!',
      whyEs: 'Palabras: perseguição (lat. persequī) — caza/opresión/obsesión; contraste prosseguir; caminho/risco/EXIT; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-prosseguir.html',
        '/posts/post-inspecao-palavra-caminho.html',
        '/posts/post-inspecao-palavra-risco.html',
        '/posts/post-inspecao-palavra-exit.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — per- ≠ pro-; palavra ≠ relatório clínico.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-perseguicao)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'perseguicao',
      word: 'perseguição',
      simple:
        'Lat. persequī — caça, opressão e obsessão; contraste prosseguir; elos caminho/risco/EXIT; Valeu !!!',
      simpleEn:
        'Lat. persequī — chase, oppression and obsession; contrast prosseguir; links caminho/risco/EXIT; Valeu !!!',
      simpleEs:
        'Lat. persequī — caza, opresión y obsesión; contraste prosseguir; vínculos caminho/risco/EXIT; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex(
      (x) => x.id === entry.id || x.word === 'perseguição' || x.word === 'perseguicao'
    );
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'prosseguir' || x.id === 'risco' || x.id === 'caminho'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (perseguição)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    perseguicao: { tone: "caution", gloss: "Lat. persequī — caça × opressão × obsessão; contraste prosseguir; elos caminho/risco/EXIT; Valeu !!!", href: "/posts/post-inspecao-palavra-perseguicao.html", en: "persecution / pursuit", es: "persecucion", fr: "persecution", it: "persecuzione", de: "Verfolgung", el: "diogmos", la: "persecutio", yo: "ininile", sw: "udhalimu", gez: "säddätä", nl: "vervolging", pl: "prześladowanie", ru: "presledovanie", uk: "peresliduvannya", zh: "pohai", ja: "hakugai", ko: "bakhae", ar: "idtibad", he: "redifah", hi: "utpiran", tr: "zulum", sv: "forfoljelse", da: "forfolgelse", no: "forfolgelse", fi: "vaino", cs: "pronasledovani", ro: "persecutie", hu: "uldozes", ca: "persecucio", gl: "persecucion", eu: "jazarpen", gn: "jopyhy", qu: "qatikachay", eo: "persekuto", vi: "dan ap", id: "penganiayaan", th: "kan khaengkhied", hr: "progon", sk: "pronasledovanie", ga: "gearran", cy: "erlid", ha: "zalunci", am: "sitot", fa: "azit", bn: "nirjaton", zu: "ukushushiswa" },';
    const entryAccent =
      '    perseguição: { tone: "caution", gloss: "Lat. persequī — caça × opressão × obsessão; contraste prosseguir; elos caminho/risco/EXIT.", href: "/posts/post-inspecao-palavra-perseguicao.html", en: "persecution / pursuit", es: "persecucion", fr: "persecution", it: "persecuzione", de: "Verfolgung", el: "diogmos", la: "persecutio", yo: "ininile", sw: "udhalimu", gez: "säddätä", nl: "vervolging", pl: "prześladowanie", ru: "presledovanie", uk: "peresliduvannya", zh: "pohai", ja: "hakugai", ko: "bakhae", ar: "idtibad", he: "redifah", hi: "utpiran", tr: "zulum", sv: "forfoljelse", da: "forfolgelse", no: "forfolgelse", fi: "vaino", cs: "pronasledovani", ro: "persecutie", hu: "uldozes", ca: "persecucio", gl: "persecucion", eu: "jazarpen", gn: "jopyhy", qu: "qatikachay", eo: "persekuto", vi: "dan ap", id: "penganiayaan", th: "kan khaengkhied", hr: "progon", sk: "pronasledovanie", ga: "gearran", cy: "erlid", ha: "zalunci", am: "sitot", fa: "azit", bn: "nirjaton", zu: "ukushushiswa" },';
    if (/perseguicao:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    perseguicao:\s*\{[\s\S]*?\},/, entryLine);
      if (/perseguição:\s*\{/.test(gloss)) {
        gloss = gloss.replace(/    perseguição:\s*\{[\s\S]*?\},/, entryAccent);
      } else {
        gloss = gloss.replace(/(perseguicao:\s*\{[\s\S]*?\},?\r?\n)/, '$1' + entryAccent + '\n');
      }
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (perseguicao · existente)');
    } else {
      const reProsseguir = /(prosseguir:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reProsseguir.test(gloss)) {
        gloss = gloss.replace(reProsseguir, '$1' + entryLine + '\n' + entryAccent + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (perseguição · após prosseguir)');
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
