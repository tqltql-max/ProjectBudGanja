'use strict';

/**
 * Injeta palavra «mequetrefe» na série Palavras (página só desta palavra).
 * Uso: node scripts/upsert-palavra-mequetrefe-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildMequetrefePost } = require('../lib/mequetrefe-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const HREF = '/posts/post-inspecao-palavra-mequetrefe.html';
const YT = 'https://www.youtube.com/watch?v=4Ot7Mqlhlbo';

function upsertPost(posts, post) {
  const idx = posts.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = Object.assign({}, posts[idx], post);
    console.log('Actualizado', post.slug);
    return;
  }
  const afterLingua = posts.findIndex((p) => p.slug === 'inspecao-palavra-lingua-portuguesa');
  if (afterLingua >= 0) {
    posts.splice(afterLingua + 1, 0, post);
    console.log('Inserido', post.slug, 'após língua portuguesa');
    return;
  }
  posts.unshift(post);
  console.log('Inserido', post.slug);
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

function patchGlossary(gloss) {
  const main =
    '    mequetrefe: { tone: "warm", category: "Léxico", mundane: "Intrometido / patife / joão-ninguém; também coisa ordinária.", gloss: "Vocábulo caduco no brechó; âncora Porta Palavra #5 (Gregorio); étimo em disputa; elos língua/Duvivier; Faça o melhor!", href: "/posts/post-inspecao-palavra-mequetrefe.html", en: "busybody / nobody / rascal", es: "mequetrefe", fr: "freluquet / vaurien", it: "mezzocalzone", de: "Wichtigtuer / Niemand", el: "ασήμαντος", la: "nugator", yo: "eniyan lasan", sw: "mtu wa bure", gez: "mequetrefe", nl: "bemoeial / niemendal", pl: "nicpoń", ru: "ничтожество", uk: "нікчема", zh: "无名小卒", ja: "つまらぬ人", ko: "하찮은 사람", ar: "تافه", he: "אפס", hi: "तुच्छ व्यक्ति", tr: "zıpır / hiçe sayılan", sv: "betydelselös", da: "ubetydelig", no: "ubetydelig", fi: "mitätön", cs: "nula", ro: "fleac de om", hu: "senkiházi", ca: "mequetrefe", gl: "mequetrefe", eu: "jende kaskarra", gn: "ava ndaha\'éi", qu: "mana valeq", eo: "sensignifulo", vi: "kẻ vô danh", id: "orang tak berarti", th: "คนไม่มีค่า", hr: "ništarija", sk: "nula", ga: "duine suarach", cy: "dim byd", ha: "marar amfani", am: "ከንቱ", fa: "آدم بی‌مقدار", bn: "তুচ্ছ লোক", zu: "umuntu ongeyilutho" },\n';
  const aliases =
    '    meqyetrefe: { gloss: "Lapso escrito de mequetrefe (*y* por *u*) — ver Porta Palavra #5.", href: "/posts/post-inspecao-palavra-mequetrefe.html", en: "slip of mequetrefe", es: "lapsus de mequetrefe" },\n' +
    '    mequetrefes: { gloss: "Plural de mequetrefe — ver Porta Palavra #5.", href: "/posts/post-inspecao-palavra-mequetrefe.html", en: "busybodies / nobodies", es: "mequetrefes" },\n' +
    '    jururu: { gloss: "Tristeza miúda — peça do brechó Porta Palavra #5.", href: "/posts/post-inspecao-palavra-mequetrefe.html", en: "down in the dumps", es: "jururu" },\n' +
    '    borococho: { gloss: "Tristeza mais funda — Porta Palavra #5 (grafia borocochô).", href: "/posts/post-inspecao-palavra-mequetrefe.html", en: "glum", es: "borocochô" },\n' +
    '    pinimba: { gloss: "Birra / rancor miúdo — Porta Palavra #5; vizinha de ranço.", href: "/posts/post-inspecao-palavra-mequetrefe.html", en: "petty grudge", es: "pinimba" },\n' +
    '    lambisgoia: { gloss: "Pessoa caduca / senil — Porta Palavra #5 (lambisgóia).", href: "/posts/post-inspecao-palavra-mequetrefe.html", en: "old fuddy-duddy", es: "lambisgóia" },\n';

  if (/mequetrefe:\s*\{/.test(gloss)) {
    gloss = gloss.replace(
      /    mequetrefe:\s*\{[\s\S]*?\},/,
      main.trimEnd().replace(/,$/, '') + ','
    );
  }
  if (!/mequetrefe:\s*\{/.test(gloss)) {
    const reMeneia = /(    meneia:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
    if (reMeneia.test(gloss)) {
      gloss = gloss.replace(reMeneia, '$1' + main + aliases);
    } else {
      console.warn('Aviso: glossário — ponto de inserção (meneia) não encontrado');
      return gloss;
    }
  } else if (!/meqyetrefe:\s*\{/.test(gloss)) {
    const reMain = /(    mequetrefe:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
    if (reMain.test(gloss)) gloss = gloss.replace(reMain, '$1' + aliases);
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-mequetrefe-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = buildMequetrefePost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-mequetrefe';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Porta Palavra #5 — mequetrefe e o brechó do dicionário',
      titleEn: 'Porta Palavra #5 — mequetrefe and the dictionary thrift shop',
      titleEs: 'Porta Palavra #5 — mequetrefe y el rastro del diccionario',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: todas as peças de Porta Palavra #5 nesta página — mequetrefe, jururu, pinimba, cooper, lorota, brechó.',
      whyEn: 'Words: every Porta Palavra #5 piece on one page — mequetrefe, jururu, pinimba, cooper, lorota, thrift shop.',
      whyEs: 'Palabras: todas las piezas de Porta Palavra #5 en una página — mequetrefe, jururu, pinimba, cooper, lorota, rastro.',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        YT,
        'https://pt.wiktionary.org/wiki/mequetrefe',
        'https://www.dicio.com.br/mequetrefe/',
        '/posts/post-inspecao-figura-duvivier.html',
        '/posts/post-inspecao-palavra-lingua-portuguesa.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — todas as palavras do vídeo nesta página; âncora 4Ot7Mqlhlbo.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);

    const duvIdx = items.findIndex((x) => x.id === 'figura-duvivier' || x.id === 'duvivier');
    if (duvIdx >= 0) {
      const p = items[duvIdx];
      const sources = Array.isArray(p.sources) ? p.sources.slice() : [];
      if (!sources.includes(HREF)) sources.push(HREF);
      items[duvIdx] = Object.assign({}, p, { sources });
    }

    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-mequetrefe)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'mequetrefe',
      word: 'Mequetrefe',
      simple:
        'Porta Palavra #5 (Gregorio): mequetrefe e todas as peças do vídeo nesta página — jururu, pinimba, cooper, lorota, brechó.',
      simpleEn:
        'Porta Palavra #5 (Gregorio): mequetrefe and every word from the video on this page.',
      simpleEs:
        'Porta Palavra #5 (Gregorio): mequetrefe y todas las piezas del vídeo en esta página.',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    const gi = items.findIndex(
      (x) => x.id === entry.id || x.word === 'Mequetrefe' || x.id === 'meqyetrefe'
    );
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'lingua-portuguesa' || x.id === 'meneia');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (Mequetrefe)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(glossPath, next);
      console.log('Glossário actualizado (mequetrefe · Porta Palavra #5)');
    } else {
      console.warn('Aviso: glossário sem alteração');
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
