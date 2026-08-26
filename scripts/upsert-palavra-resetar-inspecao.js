'use strict';

/**
 * Injeta a palavra «resetar» (pedido Reseta).
 * Uso: node scripts/upsert-palavra-resetar-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildResetarPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT_RESETAR
} = require('../lib/resetar-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-resetar.html';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeJsonRetry(file, data, tries = 8) {
  const payload = typeof data === 'string' ? data : JSON.stringify(data, null, 2) + '\n';
  let last;
  for (let i = 0; i < tries; i += 1) {
    try {
      fs.writeFileSync(file, payload, 'utf8');
      return;
    } catch (e) {
      last = e;
      await sleep(250 * (i + 1));
    }
  }
  throw last;
}

function stampFiles(post) {
  if (!post.filename) post.filename = 'posts/post-' + post.slug + '.html';
  if (!post.url) post.url = '/' + String(post.filename).replace(/^\/+/, '');
  return post;
}

function writeHtml(post) {
  const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
}

function upsertPost(posts, post) {
  stampFiles(post);
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

function upsertItem(items, entry, afterIds) {
  const i = items.findIndex((x) => x.id === entry.id);
  if (i >= 0) items[i] = Object.assign({}, items[i], entry);
  else {
    const after = (afterIds || [])
      .map((id) => items.findIndex((x) => x.id === id))
      .find((n) => n >= 0);
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
}

function upsertVidaPoem(vida, entry) {
  const poems = Array.isArray(vida.poems) ? vida.poems : [];
  const i = poems.findIndex((p) => p.id === entry.id || p.slug === entry.slug);
  if (i >= 0) poems[i] = Object.assign({}, poems[i], entry);
  else poems.unshift(entry);
  vida.poems = poems;
  vida.updatedAt = new Date().toISOString();
}

function replaceOrInsertAfter(gloss, key, line, afterKey) {
  const re = new RegExp(
    '    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n'
  );
  if (re.test(gloss)) return gloss.replace(re, line);
  const afterRe = new RegExp(
    '(    ' + afterKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n)'
  );
  if (afterRe.test(gloss)) return gloss.replace(afterRe, '$1' + line);
  console.warn('Aviso glossário: falhou', key);
  return gloss;
}

function langsResetar() {
  return 'en: "to reset", es: "resetear / reiniciar", fr: "réinitialiser", it: "resettare", de: "zurücksetzen", el: "epanafero", la: "denuo ponere", yo: "tun to", sw: "seti upya", gez: "ʼanbəra", nl: "resetten", pl: "resetowac", ru: "sbrosit", uk: "skynuty", zh: "chongzhi", ja: "resetto", ko: "rijeseteu", ar: "iade taeyin", he: "leaset", hi: "reset karna", tr: "sifirlamak", sv: "aterstalla", da: "nulstille", no: "tilbakestille", fi: "nollata", cs: "resetovat", ro: "a reseta", hu: "visszaallit", ca: "reiniciar", gl: "resetear", eu: "berrezarri", gn: "moñepyrũjey", qu: "musuqyachiy", eo: "restarigi", vi: "dat lai", id: "reset", th: "reset", hr: "resetirati", sk: "resetovat", ga: "athshocraigh", cy: "ailosod", ha: "sake saita", am: "mels", fa: "reset", bn: "reset", zu: "qala kabusha"';
}

function patchGlossary(gloss) {
  const main =
    '    resetar: { tone: "craft", category: "Ofício", mundane: "Empréstimo EN reset — pôr outra vez no começo.", gloss: "EN re- + set; Reseta = forma de campo; ≠ receita ≠ receta ≠ restore; Valeu !!!", href: "' +
    HREF +
    '", ' +
    langsResetar() +
    ' },\n';
  gloss = replaceOrInsertAfter(gloss, 'resetar', main, 'restore');
  const aliases = [
    [
      'reseta',
      '    reseta: { gloss: "3.ª pessoa / pedido de campo Reseta — ver resetar; ≠ receita ≠ receta.", href: "' +
        HREF +
        '", en: "he/she resets", es: "resetea" },\n'
    ],
    [
      'reset',
      '    reset: { gloss: "EN re- + set — o núcleo do verbo resetar; ≠ restore ≠ receita.", href: "' +
        HREF +
        '", en: "reset", es: "reset" },\n'
    ],
    [
      'receita',
      '    receita: { gloss: "Cola da orelha em Reseta — lat. recepta (fórmula); âncora resetar. Guia de chás: receitas de plantas.", href: "' +
        HREF +
        '", en: "recipe / prescription (glue, not the verb)", es: "receta (cola, no el verbo)" },\n'
    ],
    [
      'receta',
      '    receta: { gloss: "ES — fórmula; o pedido palabra Reseta cola aqui; âncora resetar.", href: "' +
        HREF +
        '", en: "Spanish receta (glue)", es: "receta (cola)" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, 'resetar');
  }
  return gloss;
}

async function syncSql(post) {
  require('../lib/load-env.js');
  if (String(process.env.STORE_BACKEND || '').toLowerCase() === 'fs') return;
  const { createSqlStore } = require('../lib/store-sql.js');
  const store = await createSqlStore(ROOT);
  const posts = await store.getPosts();
  upsertPost(posts, post);
  await store.setPosts(posts);
  console.log('SQL store actualizado:', post.slug);
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-resetar-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildResetarPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  await writeJsonRetry(POSTS_FILE, posts);

  try {
    writeHtml(post);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    upsertItem(
      items,
      {
        id: 'palavra-resetar',
        title: 'Resetar — Reseta não é receita; re- + set',
        titleEn: 'Resetar — Reseta is not a recipe; re- + set',
        titleEs: 'Resetar — Reseta no es receta; re- + set',
        tipo: 'palavra',
        priority: 1,
        status: 'feita',
        why: 'Palavras: resetar ← EN re- + set; Reseta = forma de campo; ≠ receita ≠ receta ≠ restore; Valeu !!!',
        whyEn: 'Words: resetar ← EN re- + set; Reseta = field form; ≠ recipe ≠ receta ≠ restore; Valeu !!!',
        whyEs: 'Palabras: resetar ← EN re- + set; Reseta = forma de campo; ≠ receita ≠ receta ≠ restore; ¡Valeu !!!',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'palavras-origem',
        sources: [
          WIKT_RESETAR,
          'https://en.wiktionary.org/wiki/reset',
          '/posts/post-inspecao-palavra-restore.html',
          '/posts/post-inspecao-palavra-ligar-desligar.html',
          '/posts/post-inspecao-guia-receitas-plantas.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — pedido Reseta; âncora resetar; cola receita/receta; irmã restore.'
      },
      ['palavra-restore', 'palavra-internet', 'palavra-ligar-desligar']
    );
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    await writeJsonRetry(SUG_FILE, sug);
    console.log('Sugestões actualizadas');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    upsertItem(
      items,
      {
        id: 'resetar',
        word: 'resetar',
        simple:
          'EN re- + set — pôr outra vez no começo. Reseta é a forma de campo. ≠ receita ≠ receta ≠ restore. Valeu !!!',
        simpleEn:
          'EN re- + set — put again at the start. Reseta is the field form. ≠ recipe ≠ receta ≠ restore. Valeu !!!',
        simpleEs:
          'EN re- + set — poner otra vez en el comienzo. Reseta es la forma de campo. ≠ receita ≠ receta ≠ restore. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Do inglês reset (re- «outra vez» + set «pôr»). O português faz o verbo resetar. Reseta é a 3.ª pessoa e o pedido de campo. Receita / receta (lat. recepta) só colam na orelha.',
        curiosities:
          'Restore põe de pé o que estava; resetar devolve ao zero. Ficha ≠ tutorial de factory reset ≠ receita médica. O guia de receitas de plantas é outra sala.',
        historyEn:
          'English reset (re- “again” + set). Portuguese makes the verb resetar. Reseta is 3rd person and the field request. Recipe / receta (Lat. recepta) only glue at the ear.',
        curiositiesEn:
          'Restore sets back on its feet; resetar returns to zero. Sheet ≠ factory-reset tutorial ≠ medical prescription.',
        historyEs:
          'Del inglés reset (re- «otra vez» + set). El portugués hace el verbo resetar. Reseta es la 3.ª persona y el pedido de campo. Receta (lat. recepta) solo pega en el oído.',
        curiositiesEs:
          'Restore pone de pie lo que estaba; resetar vuelve al cero. Ficha ≠ tutorial de factory reset ≠ receta médica.'
      },
      ['restore', 'internet', 'ligar']
    );
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    await writeJsonRetry(GUIA_FILE, guia);
    console.log('Guia de palavras actualizado');
  }

  if (fs.existsSync(GLOSS_FILE)) {
    let gloss = fs.readFileSync(GLOSS_FILE, 'utf8');
    gloss = patchGlossary(gloss);
    fs.writeFileSync(GLOSS_FILE, gloss);
    console.log('Glossário actualizado');
  }

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'resetar',
      slug: 'resetar',
      title: 'Reseta',
      titleEn: 'Reseta',
      titleEs: 'Reseta',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — resetar ← re- + set; Reseta ≠ receita; ≠ restore; Valeu !!!',
      teaserEn: 'BudGanja echo — resetar ← re- + set; Reseta ≠ recipe; ≠ restore; Valeu !!!',
      teaserEs: 'Eco BudGanja — resetar ← re- + set; Reseta ≠ receta; ≠ restore; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'resetar', 'reseta', 'reset', 'palavra']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poema Vida actualizado');
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
