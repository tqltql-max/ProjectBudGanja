'use strict';

/**
 * Injeta tónos, vomitar e commitar (comitar) na série Palavras.
 * Uso: node scripts/upsert-palavra-tonos-vomitar-commitar-cluster.js
 */

const fs = require('fs');
const path = require('path');
const { buildTonosPost } = require('../lib/tonos-inspecao-post.js');
const { buildVomitarPost } = require('../lib/vomitar-inspecao-post.js');
const { buildCommitarPost } = require('../lib/commitar-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');

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

const ZU_TAIL = /zu:\s*"[^"]*"\s*\},?\r?\n/;

function insertAfterKey(gloss, key, block) {
  const re = new RegExp(
    '(    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?' + ZU_TAIL.source + ')'
  );
  if (!re.test(gloss)) return null;
  return gloss.replace(re, '$1' + block);
}

function patchGlossary(gloss, mainKey, mainLine, aliases, afterKey) {
  if (new RegExp('    ' + mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{').test(gloss)) {
    gloss = gloss.replace(
      new RegExp('    ' + mainKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},'),
      mainLine.trimEnd().replace(/,$/, '') + ','
    );
  } else {
    const inserted = insertAfterKey(gloss, afterKey, mainLine + aliases);
    if (inserted) gloss = inserted;
    else console.warn('Aviso: glossário — inserção falhou para', mainKey);
  }
  return gloss;
}

const ITEMS = [
  {
    build: buildTonosPost,
    sugId: 'palavra-tonos',
    sugTitle: 'Tónos — a raiz grega da tensão, distinta de tônico',
    sugTitleEn: 'Tónos — the Greek root of tension, distinct from tônico',
    sugTitleEs: 'Tónos — la raíz griega de la tensión, distinta de tônico',
    why: 'Palavras: tónos (τόνος) — raiz da tensão; ≠ mapa PT tônico; tríade vomitar / commitar; Faça o melhor!',
    whyEn: 'Words: tónos (τόνος) — root of tension; ≠ PT map tônico; triad vomitar / commitar; Do your best!',
    whyEs: 'Palabras: tónos (τόνος) — raíz de la tensión; ≠ mapa PT tônico; tríada vomitar / commitar; ¡Haz lo mejor!',
    guiaId: 'tonos',
    guiaWord: 'tónos',
    guiaAfter: ['tonico', 'isotonico', 'lingua-portuguesa'],
    guiaEntry: {
      simple:
        'Gr. τόνος — tensão, tom, corda; raiz de tônico; ≠ mapa PT; tríade vomitar / commitar; Faça o melhor sem fundir a raiz.',
      simpleEn:
        'Gr. τόνος — tension, pitch, string; root of tônico; ≠ PT map; triad vomitar / commitar; Do your best without fusing the root.',
      simpleEs:
        'Gr. τόνος — tensión, tono, cuerda; raíz de tônico; ≠ mapa PT; tríada vomitar / commitar; ¡Haz lo mejor sin fusionar la raíz!',
      history:
        'Tónos é o substantivo grego da tensão (de teínō, esticar). Passou ao latim tonus e ao português tônico. No laboratório a raiz fica nesta ficha; os nove ofícios portugueses ficam na ficha tônico.',
      curiosities:
        'No glossário, gez: “tonos” sob tônico é convénção de lab, não étimo ge\'ez. A tríade de ofício: segurar (tónos) → largar (vomitar) → gravar (commitar).',
      historyEn:
        'Tónos is the Greek noun for tension (from teínō, to stretch). It passed into Latin tonus and Portuguese tônico. The lab keeps the root on this sheet; the nine Portuguese offices stay on tônico.',
      curiositiesEn:
        'In the glossary, gez: “tonos” under tônico is a lab convention, not a Ge’ez etymon. Office triad: hold (tónos) → release (vomitar) → record (commitar).',
      historyEs:
        'Tónos es el sustantivo griego de la tensión (de teínō, estirar). Pasó al latín tonus y al portugués tônico. En el laboratorio la raíz queda en esta ficha; los nueve oficios portugueses, en tônico.',
      curiositiesEs:
        'En el glosario, gez: “tonos” bajo tônico es convención de lab, no étimo ge\'ez. Tríada: sostener (tónos) → soltar (vomitar) → grabar (commitar).'
    },
    glossKey: 'tonos',
    glossAfter: 'tonico',
    glossMain:
      '    tonos: { tone: "caution", category: "Tensão", mundane: "Grego τόνος — tensão, tom, corda; teclado tonos.", gloss: "Raiz de tônico; ≠ mapa PT; tríade vomitar / commitar; Faça o melhor sem fundir a raiz.", href: "/posts/post-inspecao-palavra-tonos.html", en: "tónos / tension", es: "tónos / tensión", fr: "tónos", it: "tónos", de: "tónos", el: "τόνος", la: "tonus", yo: "tónos", sw: "tónos", gez: "tonos", nl: "tónos", pl: "tónos", ru: "tonos", uk: "tonos", zh: "tonos", ja: "tonos", ko: "tonos", ar: "tonos", he: "tonos", hi: "tonos", tr: "tonos", sv: "tónos", da: "tónos", no: "tónos", fi: "tónos", cs: "tónos", ro: "tónos", hu: "tónos", ca: "tónos", gl: "tónos", eu: "tonos", gn: "tonos", qu: "tonos", eo: "tonoso", vi: "tonos", id: "tonos", th: "tonos", hr: "tonos", sk: "tónos", ga: "tónos", cy: "tonos", ha: "tonos", am: "tonos", fa: "tonos", bn: "tonos", zu: "i-tonos" },\n',
    glossAliases:
      '    tónos: { gloss: "Grafia com acento de tonos — a mesma raiz grega.", href: "/posts/post-inspecao-palavra-tonos.html", en: "tónos (accented)", es: "tónos (con acento)" },\n' +
      '    "τόνος": { gloss: "Forma grega — ver tónos (raiz da tensão).", href: "/posts/post-inspecao-palavra-tonos.html", en: "τόνος", es: "τόνος" },\n'
  },
  {
    build: buildVomitarPost,
    sugId: 'palavra-vomitar',
    sugTitle: 'Vomitar — largar o que não fica, antes do commit',
    sugTitleEn: 'Vomitar — release what must not stay, before the commit',
    sugTitleEs: 'Vomitar — soltar lo que no queda, antes del commit',
    why: 'Palavras: vomitar (lat. vomitare) — corpo × metáfora × mito XIV; tríade tónos / commitar; Faça o melhor!',
    whyEn: 'Words: vomitar (Lat. vomitare) — body × metaphor × XIV myth; triad tónos / commitar; Do your best!',
    whyEs: 'Palabras: vomitar (lat. vomitare) — cuerpo × metáfora × mito XIV; tríada tónos / commitar; ¡Haz lo mejor!',
    guiaId: 'vomitar',
    guiaWord: 'vomitar',
    guiaAfter: ['tonos', 'tonico', 'risco'],
    guiaEntry: {
      simple:
        'Lat. vomitare — largar o que não fica (corpo × metáfora × mito XIV); tríade tónos / commitar; ≠ protocolo clínico; Faça o melhor!',
      simpleEn:
        'Lat. vomitare — release what must not stay (body × metaphor × XIV myth); triad tónos / commitar; ≠ clinical protocol; Do your best!',
      simpleEs:
        'Lat. vomitare — soltar lo que no queda (cuerpo × metáfora × mito XIV); tríada tónos / commitar; ≠ protocolo clínico; ¡Haz lo mejor!',
      history:
        'Vomitar vem do latim vomitare, frequentativo de vomere (expulsar pela boca). No português cobre o corpo, a metáfora de despejar fala/código e, no curso XIV, o mito da cobra que ia vomitar veneno.',
      curiosities:
        'No laboratório vomitar é o gesto do meio da tríade: depois de nomear a tensão (tónos) e antes de gravar o rasto (commitar). Ficha ≠ bula antiemética.',
      historyEn:
        'Portuguese vomitar comes from Latin vomitare, frequentative of vomere (to expel by mouth). It covers the body, the metaphor of dumping speech/code, and, in UNIFESP XIV, the myth of the snake about to vomit poison.',
      curiositiesEn:
        'In the lab vomitar is the middle gesture of the triad: after naming tension (tónos) and before recording the trace (commitar). Sheet ≠ antiemetic leaflet.',
      historyEs:
        'Vomitar viene del latín vomitare, frecuentativo de vomere (expulsar por la boca). En portugués cubre el cuerpo, la metáfora de volcar habla/código y, en el XIV, el mito de la serpiente que iba a vomitar veneno.',
      curiositiesEs:
        'En el laboratorio vomitar es el gesto del medio de la tríada: después de nombrar la tensión (tónos) y antes de grabar el rastro (commitar). Ficha ≠ prospecto.'
    },
    glossKey: 'vomitar',
    glossAfter: 'tonos',
    glossMain:
      '    vomitar: { tone: "caution", category: "Corpo", mundane: "Verbo — expulsar pela boca; também metáfora de despejo.", gloss: "Lat. vomitare — largar o que não fica; tríade tónos / commitar; ≠ protocolo; Faça o melhor!", href: "/posts/post-inspecao-palavra-vomitar.html", en: "to vomit / to spew", es: "vomitar", fr: "vomir", it: "vomitare", de: "erbrechen", el: "εμετώ", la: "vomitare", yo: "èèbì", sw: "tapika", gez: "vomitare", nl: "braken", pl: "wymiotować", ru: "blevat", uk: "blyuvaty", zh: "vomit", ja: "haku", ko: "to-hada", ar: "qaa", he: "lehakki", hi: "ulti", tr: "kusmak", sv: "kräkas", da: "kaste op", no: "kaste opp", fi: "oksentaa", cs: "zvracet", ro: "vomita", hu: "hány", ca: "vomitar", gl: "vomitar", eu: "oka egin", gn: "vomitar", qu: "vomitar", eo: "vomiti", vi: "non", id: "muntah", th: "vomit", hr: "povracati", sk: "vracat", ga: "aiseag", cy: "chwydu", ha: "toya", am: "vomit", fa: "estefragh", bn: "bomi", zu: "ukuhlanza" },\n',
    glossAliases:
      '    vomito: { gloss: "Substantivo irmão (vómito / vômito) — ver vomitar.", href: "/posts/post-inspecao-palavra-vomitar.html", en: "vomit (n.)", es: "vómito" },\n' +
      '    "vómito": { gloss: "Substantivo com acento — ver vomitar.", href: "/posts/post-inspecao-palavra-vomitar.html", en: "vomit (n.)", es: "vómito" },\n'
  },
  {
    build: buildCommitarPost,
    sugId: 'palavra-commitar',
    sugTitle: 'Commitar — gravar o rasto (comitar ≠ cometer)',
    sugTitleEn: 'Commitar — record the trace (comitar ≠ cometer)',
    sugTitleEs: 'Commitar — grabar el rastro (comitar ≠ cometer)',
    why: 'Palavras: commitar (comitar) — calco git; ≠ cometer; tríade tónos / vomitar; Faça o melhor depois do snapshot!',
    whyEn: 'Words: commitar (comitar) — git calque; ≠ cometer; triad tónos / vomitar; Do your best after the snapshot!',
    whyEs: 'Palabras: commitar (comitar) — calco git; ≠ cometer; tríada tónos / vomitar; ¡Haz lo mejor después del snapshot!',
    guiaId: 'commitar',
    guiaWord: 'commitar',
    guiaAfter: ['vomitar', 'tonos', 'genial'],
    guiaEntry: {
      simple:
        'Calco BR de to commit (git) — gravar o rasto; grafia viva comitar; ≠ cometer; ≠ push/PR; tríade tónos / vomitar; Faça o melhor depois do snapshot!',
      simpleEn:
        'BR calque of to commit (git) — record the trace; live spelling comitar; ≠ cometer; ≠ push/PR; triad tónos / vomitar; Do your best after the snapshot!',
      simpleEs:
        'Calco BR de to commit (git) — grabar el rastro; grafía viva comitar; ≠ cometer; ≠ push/PR; tríada tónos / vomitar; ¡Haz lo mejor después del snapshot!',
      history:
        'Commitar é calco brasileiro do inglês to commit no git (do latim committere, juntar/confiar). No laboratório nomeia o snapshot do rasto — distinto de cometer (crime/erro) e dos gestos seguintes push e PR.',
      curiosities:
        'A boca escreve comitar (um m); a ficha ancora commitar pelo mm de commit. Genial e irmãs elogiam depois do commit, não antes do trabalho.',
      historyEn:
        'Portuguese commitar is a Brazilian calque of English to commit in git (from Latin committere, to join/entrust). In the lab it names the snapshot of the trace — distinct from cometer (crime/error) and from later gestures push and PR.',
      curiositiesEn:
        'Speech writes comitar (one m); the sheet anchors commitar to the mm of commit. Genial and its sisters praise after the commit, not before the work.',
      historyEs:
        'Commitar es calco brasileño del inglés to commit en git (del latín committere, juntar/confiar). En el laboratorio nombra la instantánea del rastro — distinto de cometer (delito/error) y de los gestos siguientes push y PR.',
      curiositiesEs:
        'La boca escribe comitar (una m); la ficha ancla commitar al mm de commit. Genial y hermanas elogian después del commit, no antes del trabajo.'
    },
    glossKey: 'commitar',
    glossAfter: 'vomitar',
    glossMain:
      '    commitar: { tone: "caution", category: "Ofício", mundane: "Verbo BR — gravar snapshot git; grafia viva comitar.", gloss: "Calco de commit; ≠ cometer; ≠ push/PR; tríade tónos / vomitar; Faça o melhor depois do snapshot.", href: "/posts/post-inspecao-palavra-commitar.html", en: "to commit (git)", es: "hacer commit", fr: "commiter", it: "committare", de: "committen", el: "commit", la: "committere", yo: "commit", sw: "commit", gez: "commit", nl: "committen", pl: "commitowac", ru: "kommit", uk: "komit", zh: "commit", ja: "commit", ko: "commit", ar: "commit", he: "commit", hi: "commit", tr: "commit", sv: "commita", da: "committe", no: "commite", fi: "commitoida", cs: "commitnout", ro: "commit", hu: "commit", ca: "fer commit", gl: "commitar", eu: "commit", gn: "commitar", qu: "commit", eo: "commit", vi: "commit", id: "commit", th: "commit", hr: "commitati", sk: "commitnut", ga: "commit", cy: "commit", ha: "commit", am: "commit", fa: "commit", bn: "commit", zu: "i-commit" },\n',
    glossAliases:
      '    comitar: { gloss: "Grafia viva (um m) de commitar — o mesmo gesto git; ≠ cometer.", href: "/posts/post-inspecao-palavra-commitar.html", en: "commitar (live spelling)", es: "commitar (grafía viva)" },\n' +
      '    commit: { gloss: "Substantivo / verbo EN de ofício — ver commitar; ≠ push/PR.", href: "/posts/post-inspecao-palavra-commitar.html", en: "commit (n./v.)", es: "commit" },\n'
  }
];

function upsertSug(sug, post, cfg) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const href = '/posts/post-' + post.slug + '.html';
  const si = items.findIndex((x) => x.id === cfg.sugId);
  const entry = {
    id: cfg.sugId,
    title: cfg.sugTitle,
    titleEn: cfg.sugTitleEn,
    titleEs: cfg.sugTitleEs,
    tipo: 'palavra',
    priority: 2,
    status: 'feita',
    why: cfg.why,
    whyEn: cfg.whyEn,
    whyEs: cfg.whyEs,
    suggestedSlug: post.slug,
    doneHref: href,
    seriesHint: 'palavras-origem',
    sources: [
      post.sourceUrl,
      '/posts/post-inspecao-palavra-tonico.html',
      '/posts/post-inspecao-expressao-faca-o-melhor.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — tríade tónos / vomitar / commitar.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia, post, cfg) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const href = '/posts/post-' + post.slug + '.html';
  const entry = Object.assign(
    {
      id: cfg.guiaId,
      word: cfg.guiaWord,
      group: 'lexico',
      fromTitle: false,
      href
    },
    cfg.guiaEntry || {}
  );
  const gi = items.findIndex((x) => x.id === cfg.guiaId || x.word === cfg.guiaWord);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    let after = -1;
    for (const id of cfg.guiaAfter || []) {
      after = items.findIndex((x) => x.id === id);
      if (after >= 0) break;
    }
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE)
    ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'))
    : { items: [] };
  const guia = fs.existsSync(GUIA_FILE)
    ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'))
    : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';

  for (const cfg of ITEMS) {
    const post = stampFiles(cfg.build());
    upsertPost(posts, post);
    await writeJsonRetry(POSTS_FILE, posts);
    try {
      writeHtml(post);
    } catch (e) {
      console.warn('Aviso HTML:', e.message);
    }
    writeI18n(i18n, post);
    upsertSug(sug, post, cfg);
    upsertGuia(guia, post, cfg);
    if (gloss) {
      gloss = patchGlossary(
        gloss,
        cfg.glossKey,
        cfg.glossMain,
        cfg.glossAliases || '',
        cfg.glossAfter
      );
    }
    try {
      await syncSql(post);
    } catch (e) {
      console.warn('Aviso SQL store:', e.message);
    }
    console.log('OK:', post.title, '· Cap.', post.seriesOrder);
  }

  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  sug.updatedAt = new Date().toISOString();
  await writeJsonRetry(SUG_FILE, sug);
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(GUIA_FILE, guia);
  if (gloss) {
    await writeJsonRetry(GLOSS_FILE, gloss);
    console.log('Glossário actualizado (tónos · vomitar · commitar)');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
