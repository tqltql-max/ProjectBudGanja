'use strict';

/**
 * Injeta a expressão «que porra é essa !!!?» (relação porrada de boxe; lapso boxi).
 * Uso: node scripts/upsert-expressao-que-porra-e-essa.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildQuePorraEEssaPost,
  poemPt,
  poemEn,
  poemEs,
  WIKT_PORRA,
  WIKT_PORRADA,
  WIKT_BOXE
} = require('../lib/que-porra-e-essa-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-expressao-que-porra-e-essa.html';

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

function patchGlossary(gloss) {
  const main =
    '    "que porra é essa": { tone: "caution", category: "Pico", mundane: "Grito interrogativo BR — o peito não aceita o que viu.", gloss: "Válvula interrogativa; relação porrada de boxe (família, outro ofício); boxi = lapso; ≠ PQP ≠ Fight; Valeu !!!", href: "' +
    HREF +
    '", en: "what the hell is this", es: "qué coño es esto" },\n';
  gloss = replaceOrInsertAfter(gloss, '"que porra é essa"', main, 'puta');
  const aliases = [
    [
      '"que porra é essa!!!"',
      '    "que porra é essa!!!": { gloss: "Mesmo grito com calor gráfico — ver que porra é essa.", href: "' +
        HREF +
        '", en: "what the hell is this!", es: "¡qué coño es esto!" },\n'
    ],
    [
      'porra',
      '    porra: { tone: "caution", category: "Tabu", mundane: "Interjeição BR / tabu; nesta ficha, peça de que porra é essa.", gloss: "Válvula; ≠ porrada (pancada) ≠ boxe; ver que porra é essa; Valeu !!!", href: "' +
        HREF +
        '", en: "damn / (taboo)", es: "porra / taco" },\n'
    ],
    [
      'porrada',
      '    porrada: { gloss: "porra + -ada — pancada / sova / quantidade; porrada de boxe ≠ a pergunta que porra é essa.", href: "' +
        HREF +
        '", en: "beating / a bunch of", es: "paliza / montón" },\n'
    ],
    [
      '"porrada de boxe"',
      '    "porrada de boxe": { gloss: "Pancadas no ringue (fala BR) — família de porra, ofício do desporto; ver que porra é essa.", href: "' +
        HREF +
        '", en: "boxing blows", es: "paliza de boxeo" },\n'
    ],
    [
      'boxe',
      '    boxe: { gloss: "EN boxing — o desporto; lapso boxi; ≠ que porra é essa ≠ Fight do fliperama.", href: "' +
        HREF +
        '", en: "boxing", es: "boxeo" },\n'
    ],
    [
      'boxi',
      '    boxi: { gloss: "Lapso de boxe — cai o e; ver que porra é essa / porrada de boxe.", href: "' +
        HREF +
        '", en: "slip of boxe", es: "lapsus de boxeo" },\n'
    ]
  ];
  for (const [key, line] of aliases) {
    gloss = replaceOrInsertAfter(gloss, key, line, '"que porra é essa"');
  }
  return gloss;
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
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-que-porra-e-essa-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildQuePorraEEssaPost());
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
        id: 'expressao-que-porra-e-essa',
        title: 'que porra é essa !!!? — a pergunta, não a porrada de boxe',
        titleEn: 'que porra é essa !!!? — the question, not the boxing beating',
        titleEs: 'que porra é essa !!!? — la pregunta, no la paliza de boxeo',
        tipo: 'expressao',
        priority: 1,
        status: 'feita',
        why: 'Expressões: que porra é essa !!!? — válvula interrogativa; relação porrada de boxe (lapso boxi); ≠ PQP ≠ Fight.',
        whyEn: 'Sayings: que porra é essa !!!? — interrogative valve; boxing-blow link (slip boxi); ≠ PQP ≠ Fight.',
        whyEs: 'Dichos: que porra é essa !!!? — válvula interrogativa; vínculo paliza de boxeo (lapsus boxi); ≠ PQP ≠ Fight.',
        suggestedSlug: post.slug,
        doneHref: HREF,
        seriesHint: 'expressoes-ditados',
        sources: [
          HREF,
          WIKT_PORRA,
          WIKT_PORRADA,
          WIKT_BOXE,
          '/posts/post-inspecao-expressao-puta-que-pariu.html',
          '/posts/post-inspecao-palavra-fight.html',
          '/posts/post-inspecao-palavra-valeu.html'
        ],
        notes: 'Cap. ' + post.seriesOrder + ' — três salas: pergunta / porrada / boxe; boxi cai o e.'
      },
      ['expressao-puta-que-pariu', 'palavra-fight', 'palavra-caralhudo']
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
        id: 'que-porra-e-essa',
        word: 'que porra é essa',
        simple:
          'Válvula interrogativa BR. Relação: porrada de boxe (porra + -ada × EN boxing). Boxi cai o e. ≠ PQP ≠ Fight. Valeu !!!',
        simpleEn:
          'BR interrogative valve. Link: boxing blows (porra + -ada × EN boxing). Boxi drops the e. ≠ PQP ≠ Fight. Valeu !!!',
        simpleEs:
          'Válvula interrogativa BR. Vínculo: paliza de boxeo (porra + -ada × EN boxing). Boxi pierde la e. ≠ PQP ≠ Fight. ¡Valeu !!!',
        group: 'lexico',
        fromTitle: false,
        href: HREF,
        history:
          'Que porra é essa pergunta o absurdo. Porrada (porra + -ada) é a pancada; boxe é o desporto inglês. O BR cola «trocar porrada» no ringue. Boxi é lapso.',
        curiosities:
          'PQP explode; esta frase interroga. Fight! é o HUD do fliperama, não o boxe. Uma porrada de = quantidade — outra extensão da -ada.',
        historyEn:
          'Que porra é essa asks at the absurd. Porrada (porra + -ada) is the blow; boxe is English boxing. Spoken BR glues “trocar porrada” to the ring. Boxi is a slip.',
        curiositiesEn:
          'PQP explodes; this phrase interrogates. Fight! is arcade HUD, not boxing. Uma porrada de = a bunch — another -ada.',
        historyEs:
          'Que porra é essa pregunta el absurdo. Porrada (porra + -ada) es el golpe; boxe es el boxeo inglés. El BR pega «trocar porrada» al ring. Boxi es lapsus.',
        curiositiesEs:
          'PQP explota; esta frase interroga. Fight! es el HUD del fliperama, no el boxeo. Uma porrada de = cantidad — otra -ada.'
      },
      ['puta', 'pariu', 'caralhudo']
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
      id: 'que-porra-e-essa',
      slug: 'que-porra-e-essa',
      title: 'Que porra é essa !!!?',
      titleEn: 'Que porra é essa !!!?',
      titleEs: 'Que porra é essa !!!?',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser: 'Eco BudGanja — a pergunta, não a porrada de boxe; boxi cai o e; Valeu !!!',
      teaserEn: 'BudGanja echo — the question, not the boxing beating; boxi drops the e; Valeu !!!',
      teaserEs: 'Eco BudGanja — la pregunta, no la paliza de boxeo; boxi pierde la e; ¡Valeu !!!',
      body: poemPt(),
      bodyEn: poemEn(),
      bodyEs: poemEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'porra', 'porrada', 'boxe', 'expressao']
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
