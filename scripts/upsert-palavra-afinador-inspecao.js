'use strict';

/**
 * Injeta objecto «afinador» (de cordas de violão) na série Palavras (catálogo Objetos).
 * Uso: node scripts/upsert-palavra-afinador-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildAfinadorPost } = require('../lib/afinador-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');

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

function upsertGuia(items, entry, afterIds) {
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) {
    items[gi] = Object.assign({}, items[gi], entry);
    return;
  }
  const after = items.findIndex((x) => afterIds.indexOf(x.id) >= 0);
  if (after >= 0) items.splice(after + 1, 0, entry);
  else items.push(entry);
}

function glossHas(src, key) {
  return new RegExp('    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ': \\{').test(src);
}

function replaceGloss(src, key, line) {
  const re = new RegExp('    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ': \\{[\\s\\S]*?\\},\\r?\\n');
  if (re.test(src)) return src.replace(re, line);
  return src;
}

function insertAfterKey(src, afterKey, line) {
  const re = new RegExp('(    ' + afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ': \\{[\\s\\S]*?\\},\\r?\\n)');
  if (re.test(src)) return src.replace(re, '$1' + line);
  return src + line;
}

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find((p) => p.slug === 'inspecao-palavra-afinador');
  const taken = new Set(posts.map((p) => Number(p.seriesOrder) || 0));
  let seriesOrder = existing && typeof existing.seriesOrder === 'number' ? existing.seriesOrder : 199;
  if (!existing) {
    while (taken.has(seriesOrder) && seriesOrder < 320) seriesOrder += 1;
  }
  const post = buildAfinadorPost(seriesOrder);

  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';
  const hrefViolao = '/posts/post-inspecao-palavra-violao.html';
  const hrefAfinar = '/posts/post-inspecao-palavra-afinar.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'objeto-afinador';
    const si = items.findIndex((x) => x.id === sugId || x.id === 'palavra-afinador');
    const entry = {
      id: sugId,
      title: 'Afinador — o objecto que lê a corda do violão',
      titleEn: 'Afinador — the object that reads the guitar string',
      titleEs: 'Afinador — el objeto que lee la cuerda del violão',
      tipo: 'objeto',
      priority: 2,
      status: 'feita',
      why: 'Objecto: afinador (afinar + -dor) — clip / diapasão / app lê a corda do violão; tarraxa escreve tónos; muleta, não dono.',
      whyEn: 'Object: tuner (afinar + -dor) — clip / fork / app reads the guitar string; peg writes tónos; crutch, not owner.',
      whyEs: 'Objeto: afinador (afinar + -dor) — clip / diapasón / app lee la cuerda del violão; clavija escribe tónos; muleta, no dueño.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wikipedia.org/wiki/Afinador',
        hrefAfinar,
        hrefViolao,
        '/posts/post-inspecao-palavra-corda.html',
        '/objetos/',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes: 'Cap. ' + post.seriesOrder + ' — objecto-leitor; ≠ verbo afinar ≠ tarraxa ≠ passarinho.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (objeto-afinador)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertGuia(
      items,
      {
        id: 'afinador',
        word: 'afinador',
        simple:
          'Afinar + -dor — objecto que lê a corda do violão (clip / diapasão / app); a tarraxa escreve o tónos; muleta, não dono; Valeu !!!',
        simpleEn:
          'Afinar + -dor — object that reads the guitar string (clip / fork / app); the peg writes tónos; crutch, not owner; Valeu !!!',
        simpleEs:
          'Afinar + -dor — objeto que lee la cuerda del violão (clip / diapasón / app); la clavija escribe el tónos; muleta, no dueño; ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href
      },
      ['afinar', 'violao', 'corda']
    );
    upsertGuia(
      items,
      {
        id: 'diapasao',
        word: 'diapasão',
        simple:
          'Garfo (A 440) ou escala — avô do afinador; no lab o passarinho é diapasão vivo; ver afinador / afinar.',
        simpleEn:
          'Tuning fork (A 440) or range — ancestor of the tuner; in the lab the bird is a living fork; see afinador / afinar.',
        simpleEs:
          'Diapasón (A 440) o registro — abuelo del afinador; en el lab el pajarito es diapasón vivo; ver afinador / afinar.',
        group: 'lexico',
        fromTitle: false,
        href
      },
      ['afinador']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (afinador / diapasão)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const entries = {
      afinador:
        '    afinador: { tone: "craft", category: "Objecto", mundane: "Peça que lê o tom das cordas do violão (clip, diapasão, app).", gloss: "Afinar + -dor — lê a frequência; a tarraxa escreve o tónos; muleta, não dono; Valeu !!!", href: "/posts/post-inspecao-palavra-afinador.html", en: "tuner (clip-on / pitch)", es: "afinador", fr: "accordeur électronique", it: "accordatore", de: "Stimmgerät", el: "χορδιστήρι", la: "temperator", yo: "ẹ̀rọ ìtún", sw: "kirekebisha sauti", gez: "māqänay", nl: "stemapparaat", pl: "tuner", ru: "тюнер", uk: "тюнер", zh: "调音器", ja: "チューナー", ko: "튜너", ar: "جهاز دوزنة", he: "מכוון", hi: "ट्यूनर", tr: "akort aleti", sv: "stämapparat", da: "stemmeapparat", no: "stemmeapparat", fi: "viritysmittari", cs: "ladička (přístroj)", ro: "acordor", hu: "hangoló", ca: "afinador", gl: "afinador", eu: "afinagailu", gn: "mba\'e moĩ porã", qu: "tunana", eo: "agordilo", vi: "máy lên dây", id: "tuner", th: "เครื่องตั้งสาย", hr: "štimer", sk: "tuner", ga: "tiúnóir", cy: "tiwniwr", ha: "na\'urar daidaita", am: "ማስተካከያ", fa: "تیونر", bn: "টিউনার", zu: "isilungisi" },\n',
      diapasão:
        '    diapasão: { gloss: "Garfo A 440 / escala — avô do afinador; passarinho = diapasão vivo; ver afinador.", href: "/posts/post-inspecao-palavra-afinador.html", en: "tuning fork / range", es: "diapasón" },\n',
      diapasao:
        '    diapasao: { gloss: "Grafia sem til — ver diapasão / afinador.", href: "/posts/post-inspecao-palavra-afinador.html", en: "diapasao (unaccented)", es: "diapasao (sin til)" },\n',
      tarraxa:
        '    tarraxa: { gloss: "Peça do violão onde se escreve o tónos — o afinador só lê; ver violão / afinador.", href: "/posts/post-inspecao-palavra-afinador.html", en: "tuning peg / machine head", es: "clavija" },\n',
      cravelha:
        '    cravelha: { gloss: "Sinónimo de tarraxa no violão — ver afinador.", href: "/posts/post-inspecao-palavra-afinador.html", en: "tuning peg", es: "clavija" },\n'
    };

    const chain = [
      ['afinar', 'afinador'],
      ['afinador', 'diapasão'],
      ['diapasão', 'diapasao'],
      ['diapasao', 'tarraxa'],
      ['tarraxa', 'cravelha']
    ];
    for (const [after, key] of chain) {
      if (glossHas(gloss, key)) gloss = replaceGloss(gloss, key, entries[key]);
      else gloss = insertAfterKey(gloss, after, entries[key]);
    }

    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (afinador · diapasão · tarraxa)');
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
