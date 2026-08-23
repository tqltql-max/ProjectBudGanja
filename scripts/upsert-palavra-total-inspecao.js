'use strict';

/**
 * Injeta palavra «total» na série Palavras.
 * Uso: node scripts/upsert-palavra-total-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildTotalPost } = require('../lib/total-inspecao-post.js');

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
  // Re-read shared files at write time (lote passado/skill + agentes concorrentes).
  const post = buildTotalPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

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
    const sugId = 'palavra-total';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Total — tōtus, completude e gíria BR «total!»',
      titleEn: 'Total — tōtus, completeness and BR slang “total!”',
      titleEs: 'Total — tōtus, completud y jerga BR «¡total!»',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: total (lat. tōtus) — correcção de toal; completo/soma e gíria BR «total!»; escala legal/fantástico.',
      whyEn: 'Words: total (Lat. tōtus) — typo fix from toal; whole/sum and BR slang “total!”; scale legal/fantástico.',
      whyEs: 'Palabras: total (lat. tōtus) — corrección de toal; entero/suma y jerga BR «¡total!»; escala legal/fantástico.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://en.wiktionary.org/wiki/totus#Latin',
        '/posts/post-inspecao-palavra-legal.html',
        '/posts/post-inspecao-palavra-fantastico.html',
        '/posts/post-inspecao-palavra-genial.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — toal → total; lote passado/skill/total; escala de elogio/acordo.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-total)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'total',
      word: 'total',
      simple:
        'Lat. tōtus — inteiro/soma; gíria BR «total!» (acordo/louvor); escala com legal e fantástico; Valeu !!!',
      simpleEn:
        'Lat. tōtus — whole/sum; BR slang “total!” (agreement/praise); scale with legal and fantástico; Valeu !!!',
      simpleEs:
        'Lat. tōtus — entero/suma; jerga BR «¡total!» (acuerdo/elogio); escala con legal y fantástico; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) =>
          x.id === 'fantastico' ||
          x.id === 'legal' ||
          x.id === 'genial' ||
          x.id === 'maravilhoso'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (total)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const rich =
      '    total: { gloss: "Lat. tōtus — inteiro/soma; gíria BR «total!» (acordo/louvor); escala legal/fantástico; Valeu !!!", href: "/posts/post-inspecao-palavra-total.html", en: "total / totally (BR agreement)", es: "total", fr: "total", it: "totale", de: "total", el: "συνολικός", la: "totus", yo: "gbogbo", sw: "jumla", gez: "kʷəllu", nl: "totaal", pl: "całkowity", ru: "полный / итого", uk: "повний / підсумок", zh: "全部 / 总计", ja: "合計 / 完全", ko: "전체 / 합계", ar: "إجمالي", he: "סה״כ", hi: "कुल", tr: "toplam", sv: "total", da: "total", no: "total", fi: "kokonais-", cs: "celkový", ro: "total", hu: "teljes", ca: "total", gl: "total", eu: "guztizko", gn: "opaite", qu: "llapan", eo: "tuta", vi: "tổng", id: "total", th: "ทั้งหมด", hr: "ukupan", sk: "celkový", ga: "iomlán", cy: "cyfanswm", ha: "jimilla", am: "ጠቅላላ", fa: "کل", bn: "মোট", zu: "isonke" },';
    if (/total: \{[^}]*href: "\/posts\/post-inspecao-palavra-total\.html"/.test(gloss)) {
      console.log('Glossário já tinha total enriquecido');
    } else if (/total: \{[\s\S]*?zu: "[^"]*" },/.test(gloss)) {
      gloss = gloss.replace(/total: \{[\s\S]*?zu: "[^"]*" },/, rich);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (total enriquecido)');
    } else {
      const reLegal = /(legal: \{[\s\S]*?zu: "[^"]*" },\r?\n)/;
      const reFant = /(fantástico: \{[\s\S]*?zu: "[^"]*" },\r?\n)/;
      if (reLegal.test(gloss)) {
        gloss = gloss.replace(reLegal, '$1' + rich + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (total · após legal)');
      } else if (reFant.test(gloss)) {
        gloss = gloss.replace(reFant, '$1' + rich + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (total · após fantástico)');
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

  console.log('OK Cap.', post.seriesOrder, '—', post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
