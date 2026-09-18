'use strict';

/**
 * Injeta palavra «esquerdo» na série Palavras.
 * Uso: node scripts/upsert-palavra-esquerdo-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildEsquerdoPost } = require('../lib/esquerdo-inspecao-post.js');

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
  const post = buildEsquerdoPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';
  const maosHref = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-esquerdo';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Esquerdo — objeto, criação, finalidade e Faça o melhor!',
      titleEn: 'Esquerdo — object, creation, purpose and Do your best!',
      titleEs: 'Esquerdo — objeto, creación, finalidad y ¡Haz lo mejor!',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: «esquerdo» — objeto/criação/finalidade; anti-estigma; elo mãos e Faça o melhor!',
      whyEn: 'Words: “esquerdo” — object/creation/purpose; anti-stigma; hands + Do your best!',
      whyEs: 'Palabras: «esquerdo» — objeto/creación/finalidad; anti-estigma; manos + ¡Haz lo mejor!',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        'https://pt.wiktionary.org/wiki/esquerdo',
        maosHref,
        '/posts/post-inspecao-expressao-faca-o-melhor.html',
        '/posts/post-inspecao-palavra-gesto.html'
      ],
      notes: 'Cap. 31 — quatro eixos; complementar mão esquerda×direita.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-esquerdo)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'esquerdo',
      word: 'esquerdo',
      simple:
        'Lado / ofício (esquerda); no BudGanja: objeto, criação e finalidade sem estigma; Faça o melhor nesta mão.',
      simpleEn:
        'Side / craft (left); in BudGanja: object, creation and purpose without stigma; Do your best with this hand.',
      simpleEs:
        'Lado / oficio (izquierda); en BudGanja: objeto, creación y finalidad sin estigma; Haz lo mejor con esta mano.',
      group: 'lexico',
      fromTitle: false,
      href
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex(
        (x) => x.id === 'mao-esquerda-direita' || x.id === 'gesto' || x.id === 'genial'
      );
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (esquerdo)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    if (!gloss.includes('esquerdo: {') && !gloss.includes('esquerda: {')) {
      const re = /(genial: \{[\s\S]*?zu: "uhlakaniphile" },\r?\n)/;
      const entry =
        '    esquerdo: { gloss: "Lado de ofício (esquerda) — objeto, criação, finalidade; anti-estigma; Faça o melhor nesta mão.", href: "/posts/post-inspecao-palavra-esquerdo.html", en: "left", es: "izquierdo", fr: "gauche", it: "sinistro", de: "links", el: "αριστερός", la: "sinister", yo: "òsì", sw: "kushoto", gez: "ṣägäm", nl: "links", pl: "lewy", ru: "левый", uk: "лівий", zh: "左", ja: "左", ko: "왼쪽", ar: "يسار", he: "שמאל", hi: "बायाँ", tr: "sol", sv: "vänster", da: "venstre", no: "venstre", fi: "vasen", cs: "levý", ro: "stâng", hu: "bal", ca: "esquerre", gl: "esquerdo", eu: "ezker", gn: "asaje", qu: "lluq\'i", eo: "maldekstra", vi: "trái", id: "kiri", th: "ซ้าย", hr: "lijevi", sk: "ľavý", ga: "clé", cy: "chwith", ha: "hagu", am: "ግራ", fa: "چپ", bn: "বাম", zu: "kwesokunxele" },\n' +
        '    esquerda: { gloss: "Forma feminina / lado — ver ficha esquerdo.", href: "/posts/post-inspecao-palavra-esquerdo.html", en: "left", es: "izquierda", fr: "gauche", it: "sinistra", de: "Linke", el: "αριστερά", la: "sinistra", yo: "òsì", sw: "kushoto", gez: "ṣägäm", nl: "links", pl: "lewa", ru: "левая", uk: "ліва", zh: "左边", ja: "左", ko: "왼쪽", ar: "يسار", he: "שמאל", hi: "बायाँ", tr: "sol", sv: "vänster", da: "venstre", no: "venstre", fi: "vasen", cs: "levá", ro: "stângă", hu: "bal", ca: "esquerra", gl: "esquerda", eu: "ezker", gn: "asaje", qu: "lluq\'i", eo: "maldekstro", vi: "bên trái", id: "kiri", th: "ซ้าย", hr: "lijevo", sk: "ľavá", ga: "clé", cy: "chwith", ha: "hagu", am: "ግራ", fa: "چپ", bn: "বাম", zu: "kwesokunxele" },\n';
      if (re.test(gloss)) {
        gloss = gloss.replace(re, '$1' + entry);
        fs.writeFileSync(glossPath, gloss);
        console.log('Glossário actualizado (esquerdo / esquerda)');
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

  console.log('OK:', post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
