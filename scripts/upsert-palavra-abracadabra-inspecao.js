'use strict';

/**
 * Injeta palavra «abracadabra» na série Palavras (âncora; alias abacadabra).
 * Uso: node scripts/upsert-palavra-abracadabra-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { buildAbracadabraPost } = require('../lib/abracadabra-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const HREF = '/posts/post-inspecao-palavra-abracadabra.html';

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

function patchGlossary(gloss) {
  const main =
    '    abracadabra: { tone: "caution", category: "Fórmula", mundane: "Fórmula de palco / amuleto; no BR também «abacadabra» (lapso oral).", gloss: "Âncora escrita abracadabra; abacadabra = boca; cue ≠ feito; elos gesto/skill/verdade; Valeu !!! sem atalho.", href: "/posts/post-inspecao-palavra-abracadabra.html", en: "abracadabra", es: "abracadabra", fr: "abracadabra", it: "abracadabra", de: "Abrakadabra", el: "αμπρακατάμπρα", la: "abracadabra", yo: "abracadabra", sw: "abracadabra", gez: "abracadabra", nl: "abracadabra", pl: "abrakadabra", ru: "абракадабра", uk: "абракадабра", zh: "咒语", ja: "アブラカダブラ", ko: "아브라카다브라", ar: "أبراكادابرا", he: "אברקדברה", hi: "अब्राकादबरा", tr: "abrakadabra", sv: "abrakadabra", da: "abracadabra", no: "abrakadabra", fi: "hokuspokos", cs: "abrakadabra", ro: "abracadabra", hu: "abrakadabra", ca: "abracadabra", gl: "abracadabra", eu: "abrakadabra", gn: "abracadabra", qu: "abracadabra", eo: "abrakadabra", vi: "abracadabra", id: "abrakadabra", th: "อาบราคาดาบรา", hr: "abrakadabra", sk: "abrakadabra", ga: "abracadabra", cy: "abracadabra", ha: "abracadabra", am: "አብራካዳብራ", fa: "ابراکادابرا", bn: "আব্রাকাডাব্রা", zu: "abracadabra" },\n';
  const aliases =
    '    abacadabra: { gloss: "Lapso oral / grafia de abracadabra — ver ficha da fórmula.", href: "/posts/post-inspecao-palavra-abracadabra.html", en: "slip of abracadabra", es: "lapsus de abracadabra" },\n' +
    '    "abra cadabra": { gloss: "Forma partida de abracadabra — ver ficha da fórmula.", href: "/posts/post-inspecao-palavra-abracadabra.html", en: "split spelling of abracadabra", es: "forma partida de abracadabra" },\n' +
    '    abrakadabra: { gloss: "Grafia com k — mesma fórmula; ver ficha abracadabra.", href: "/posts/post-inspecao-palavra-abracadabra.html", en: "abrakadabra", es: "abrakadabra" },\n';

  if (/abracadabra:\s*\{/.test(gloss)) {
    gloss = gloss.replace(
      /    abracadabra:\s*\{[\s\S]*?\},/,
      main.trimEnd().replace(/,$/, '') + ','
    );
  }
  if (/abacadabra:\s*\{/.test(gloss)) {
    gloss = gloss.replace(
      /    abacadabra:\s*\{[\s\S]*?\},/,
      aliases.split('\n')[0].replace(/,$/, '').trim() + ','
    );
  }

  if (!/abracadabra:\s*\{/.test(gloss)) {
    const reAff = /(aff:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
    if (!reAff.test(gloss)) {
      console.warn('Aviso: glossário — ponto de inserção (aff) não encontrado');
      return gloss;
    }
    gloss = gloss.replace(reAff, '$1' + main + aliases);
  } else if (!/abacadabra:\s*\{/.test(gloss)) {
    const reMain = /(abracadabra:\s*\{[\s\S]*?zu:\s*"[^"]*"\s*\},?\r?\n)/;
    if (reMain.test(gloss)) gloss = gloss.replace(reMain, '$1' + aliases);
  }
  return gloss;
}

async function main() {
  const post = buildAbracadabraPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'palavra-abracadabra';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Abracadabra — fórmula, palco e o lapso abacadabra',
      titleEn: 'Abracadabra — formula, stage, and the slip abacadabra',
      titleEs: 'Abracadabra — fórmula, escenario y el lapsus abacadabra',
      tipo: 'palavra',
      priority: 2,
      status: 'feita',
      why: 'Palavras: abracadabra (âncora) × abacadabra (oral); amuleto × palco × anti-atalho; elos gesto/skill/verdade; Valeu !!!',
      whyEn: 'Words: abracadabra (anchor) × abacadabra (oral); amulet × stage × anti-shortcut; links gesture/skill/truth; Valeu !!!',
      whyEs: 'Palabras: abracadabra (ancla) × abacadabra (oral); amuleto × escenario × anti-atajo; vínculos gesto/skill/verdad; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'palavras-origem',
      sources: [
        post.sourceUrl,
        'https://pt.wiktionary.org/wiki/abracadabra',
        'https://en.wikipedia.org/wiki/Abracadabra',
        '/posts/post-inspecao-palavra-gesto.html',
        '/posts/post-inspecao-palavra-skill.html',
        '/posts/post-inspecao-palavra-verdade.html',
        '/posts/post-inspecao-palavra-valeu.html'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' — âncora abracadabra; alias abacadabra; ficha ≠ grimório.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (palavra-abracadabra)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'abracadabra',
      word: 'Abracadabra',
      simple:
        'Fórmula de palco / amuleto; «abacadabra» é lapso oral da mesma palavra; a boca encena, as mãos fazem; elos gesto e skill; Valeu !!!',
      simpleEn:
        'Stage formula / amulet; “abacadabra” is the oral slip of the same word; speech cues, hands do; links gesture and skill; Valeu !!!',
      simpleEs:
        'Fórmula de escenario / amuleto; «abacadabra» es el lapsus oral de la misma palabra; la boca señala, las manos hacen; vínculos gesto y skill; ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    };
    const gi = items.findIndex(
      (x) =>
        x.id === entry.id ||
        x.word === 'Abracadabra' ||
        x.word === 'Abacadabra' ||
        x.id === 'abacadabra'
    );
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'aff');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (Abracadabra)');
  }

  const glossPath = path.join(ROOT, 'js', 'learn-glossary.js');
  if (fs.existsSync(glossPath)) {
    let gloss = fs.readFileSync(glossPath, 'utf8');
    const next = patchGlossary(gloss);
    if (next !== gloss) {
      fs.writeFileSync(glossPath, next);
      console.log('Glossário actualizado (abracadabra · abacadabra)');
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
