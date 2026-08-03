'use strict';

/**
 * Injeta locução «pedi a mão» (pedimao) na série Palavras.
 * Uso: node scripts/upsert-palavra-pedi-mao-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildPediMaoPost } = require('../lib/pedi-mao-inspecao-post.js');

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
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-pedi-mao');
  const seriesOrder = existing
    ? Number(existing.seriesOrder) || nextPalavrasOrder(posts)
    : nextPalavrasOrder(posts);
  const post = buildPediMaoPost(seriesOrder);

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
    const sugId = 'palavra-pedi-mao';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Pedi a mão — ajuda, pedido e gesto aberto',
      titleEn: 'Pedi a mão — help, asking and open gesture',
      titleEs: 'Pedi a mão — ayuda, pedido y gesto abierto',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: pedi a mão (pedimao) — ajuda ou compromisso; mãos/gesto/respeito; Faça o melhor!',
      whyEn: 'Words: pedi a mão (pedimao) — help or commitment; hands/gesture/respect; Do your best!',
      whyEs: 'Palabras: pedi a mão (pedimao) — ayuda o compromiso; manos/gesto/respeto; ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-mao-esquerda-direita.html',
        '/posts/post-inspecao-palavra-gesto.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — uma mão = ajuda; a mão = compromisso.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-pedi-mao)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'pedi-mao',
      word: 'pedi a mão',
      simple:
        'Pedir + mão — ajuda («uma mão») ou compromisso («a mão»); elos mãos/gesto; Faça o melhor ao pedir e ao dar.',
      simpleEn:
        'Ask + hand — help (“uma mão”) or commitment (“a mão”); links hands/gesture; Do your best asking and giving.',
      simpleEs:
        'Pedir + mano — ayuda («uma mão») o compromiso («a mão»); vínculos manos/gesto; Haz lo mejor al pedir y dar.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id || x.word === 'pedi a mão' || x.word === 'pedimao');
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'mao' || x.word === 'mão' || x.id === 'gesto');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (pedi a mão)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entryLine =
      '    pedimao: { gloss: "Pedi a mão — pedir ajuda ou compromisso; elos mãos/gesto/respeito; Faça o melhor!", href: "/posts/post-inspecao-palavra-pedi-mao.html", en: "ask for a hand / propose", es: "pedir la mano / una mano", fr: "demander la main / coup de main", it: "chiedere la mano / una mano", de: "um die Hand anhalten / helfen", el: "zito cheri", la: "manum petere", yo: "beere owo", sw: "omba msaada", gez: "äsätən", nl: "om hand vragen / helpen", pl: "prosic o reke", ru: "prosit ruku", uk: "prosyty ruku", zh: "qiu hun / bangmang", ja: "te wo kariru", ko: "son butak", ar: "talab yad", he: "levakesh yad", hi: "hath mangna", tr: "el istemek", sv: "fria / be om hjalp", da: "fri / bede om hjaelp", no: "fri / be om hjelp", fi: "kosia / pyytaa apua", cs: "zadat o ruku", ro: "cere mana", hu: "kezet ker", ca: "demanar la ma", gl: "pedir a man", eu: "eskua eskatu", gn: "jerure po", qu: "maki mañakuy", eo: "peti manon", vi: "cau hon / xin tay", id: "minta tangan", th: "ขอมือ", hr: "zaprositi", sk: "ziadat o ruku", ga: "iaraidh lamh", cy: "gofyn am law", ha: "nemi hannu", am: "እጅ መጠየቅ", fa: "khastegari", bn: "হাত চাওয়া", zu: "cela isandla" },';
    if (/pedimao:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/    pedimao:\s*\{[\s\S]*?\},/, entryLine);
      fs.writeFileSync(glossPath, gloss);
      console.log('Glossário actualizado (pedimao · existente)');
    } else {
      const reMao = /(mão:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      const reMaoAscii = /(mao:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
      if (reMao.test(gloss)) {
        gloss = gloss.replace(reMao, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (pedimao · após mão)');
      } else if (reMaoAscii.test(gloss)) {
        gloss = gloss.replace(reMaoAscii, '$1' + entryLine + '\n');
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (pedimao · após mao)');
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
