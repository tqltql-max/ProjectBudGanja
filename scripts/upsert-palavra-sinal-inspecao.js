'use strict';

/**
 * Injeta palavra «sinal» na série Palavras.
 * Uso: node scripts/upsert-palavra-sinal-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildSinalPost } = require('../lib/sinal-inspecao-post.js');

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
  // Re-read shared files at write time (other agents may land concurrently).
  const post = buildSinalPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

  // Avoid Cap collision if another agent just claimed seriesOrder.
  const taken = new Set(
    posts
      .filter((p) => p.slug !== post.slug && typeof p.seriesOrder === 'number')
      .map((p) => p.seriesOrder)
  );
  let order = post.seriesOrder;
  while (taken.has(order) && order < 160) order += 1;
  if (order !== post.seriesOrder) {
    post.seriesOrder = order;
    console.log('seriesOrder ajustado para Cap.', order, '(evitar colisão)');
  }

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-sinal';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Sinal — marca, aviso, gesto e dar sinal',
      titleEn: 'Sinal — mark, warning, gesture and giving a signal',
      titleEs: 'Sinal — marca, aviso, gesto y dar señal',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: sinal (lat. signum) — marca, trânsito, corpo, aviso e «dar sinal»; tipografia singlam → sinal; elos gesto, risco, verdade.',
      whyEn: 'Words: sinal (Lat. signum) — mark, traffic, body, warning and “dar sinal”; typed singlam → sinal; links gesto, risco, verdade.',
      whyEs: 'Palabras: sinal (lat. signum) — marca, tráfico, cuerpo, aviso y «dar sinal»; tipografía singlam → sinal; vínculos gesto, risco, verdade.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wiktionary.org/wiki/signum#Latin',
        '/posts/post-inspecao-palavra-gesto.html',
        '/posts/post-inspecao-palavra-risco.html',
        '/posts/post-inspecao-palavra-verdade.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — signum; trânsito/corpo/aviso; «dar sinal»; tipografia singlam → sinal (não slang).'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-sinal)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'sinal',
      word: 'sinal',
      simple:
        'Lat. signum — marca, aviso, trânsito e «dar sinal»; elos gesto, risco, verdade; Faça o melhor!',
      simpleEn:
        'Lat. signum — mark, warning, traffic and “dar sinal”; links gesto, risco, verdade; Do your best!',
      simpleEs:
        'Lat. signum — marca, aviso, tráfico y «dar sinal»; vínculos gesto, risco, verdade; ¡Haz lo mejor!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'gesto' || x.id === 'risco' || x.id === 'verdade'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (sinal)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const rich =
      '    sinal: { gloss: "Lat. signum — marca, aviso, trânsito e «dar sinal»; elos gesto, risco, verdade; Faça o melhor!", href: "/posts/post-inspecao-palavra-sinal.html", en: "signal / sign", es: "señal / signo", fr: "signal / signe", it: "segnale / segno", de: "Signal / Zeichen", el: "σήμα", la: "signum", yo: "àmì", sw: "ishara", gez: "təʾəmərt", nl: "signaal / teken", pl: "sygnał / znak", ru: "сигнал / знак", uk: "сигнал / знак", zh: "信号 / 记号", ja: "信号 / しるし", ko: "신호 / 표지", ar: "إشارة", he: "אות / סימן", hi: "संकेत", tr: "sinyal / işaret", sv: "signal / tecken", da: "signal / tegn", no: "signal / tegn", fi: "signaali / merkki", cs: "signál / znamení", ro: "semnal / semn", hu: "jel / szignal", ca: "senyal / signe", gl: "sinal / signo", eu: "seinale", gn: "señál", qu: "unancha", eo: "signalo / signo", vi: "tín hiệu / dấu hiệu", id: "sinyal / tanda", th: "สัญญาณ", hr: "signal / znak", sk: "signál / znamenie", ga: "comhartha", cy: "arwydd", ha: "alama", am: "ምልክት", fa: "نشانه / سیگنال", bn: "সংকেত", zu: "uphawu" },';
    if (/sinal: \{[^}]*href: "\/posts\/post-inspecao-palavra-sinal\.html"/.test(gloss)) {
      console.log('Glossário já tinha sinal enriquecido');
    } else if (/sinal: \{[\s\S]*?zu: "[^"]*" },/.test(gloss)) {
      gloss = gloss.replace(/sinal: \{[\s\S]*?zu: "[^"]*" },/, rich);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (sinal enriquecido)');
    } else {
      const reGesto = /(gesto: \{[\s\S]*?zu: "[^"]*" },\r?\n)/;
      const reRisco = /(risco: \{[\s\S]*?zu: "[^"]*" },\r?\n)/;
      if (reGesto.test(gloss)) {
        gloss = gloss.replace(reGesto, '$1' + rich + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (sinal · após gesto)');
      } else if (reRisco.test(gloss)) {
        gloss = gloss.replace(reRisco, '$1' + rich + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (sinal · após risco)');
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

  console.log('OK:', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
