'use strict';

/**
 * Injeta a homenagem a Robson Gonçalves de Oliveira e à família (série Pessoas).
 * Uso: node scripts/upsert-figura-robson-oliveira.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildRobsonOliveiraPost,
  poemRobsonPt,
  poemRobsonEn,
  poemRobsonEs
} = require('../lib/robson-oliveira-inspecao-post.js');
const { buildPostHtml, normalizePosts } = require('../lib/posts-service.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-figura-robson-oliveira.html';
const SLUG = 'inspecao-figura-robson-oliveira';

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

function nextOrder(posts, series) {
  const orders = posts
    .filter((p) => p.series === series)
    .map((p) => Number(p.seriesOrder) || 0);
  return (orders.length ? Math.max(...orders) : 0) + 1;
}

function stampFiles(post) {
  if (!post.filename) post.filename = 'posts/post-' + post.slug + '.html';
  if (!post.url) post.url = '/' + String(post.filename).replace(/^\/+/, '');
  return post;
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

function writeHtml(post) {
  const [normalized] = normalizePosts([post]);
  const out = path.join(ROOT, normalized.filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buildPostHtml(normalized), 'utf8');
  console.log('HTML escrito', normalized.filename);
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

function upsertGloss(glossPath, keyPattern, entryLine, afterKey) {
  if (!fs.existsSync(glossPath)) return;
  let gloss = fs.readFileSync(glossPath, 'utf8');
  const line = entryLine.endsWith('\n') ? entryLine : entryLine + '\n';
  const reKey = new RegExp(keyPattern);
  if (reKey.test(gloss)) {
    gloss = gloss.replace(reKey, line);
    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (existente)');
    return;
  }
  const reAfterZu = new RegExp(
    '(    ' + afterKey + ':\\s*\\{[\\s\\S]*?zu:\\s*"[^"]*"\\s*\\},?\\r?\\n)'
  );
  const reAfterSimple = new RegExp(
    '(    ' + afterKey + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n)'
  );
  if (reAfterZu.test(gloss)) {
    gloss = gloss.replace(reAfterZu, '$1' + line);
    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (após ' + afterKey + ')');
    return;
  }
  if (reAfterSimple.test(gloss)) {
    gloss = gloss.replace(reAfterSimple, '$1' + line);
    fs.writeFileSync(glossPath, gloss);
    console.log('Glossário actualizado (após ' + afterKey + ')');
    return;
  }
  console.warn('Aviso: glossário — inserção falhou para', afterKey);
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
    execFileSync(process.execPath, [path.join(__dirname, 'generate-robson-oliveira-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 60000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const existing = posts.find((p) => p.slug === SLUG);
  const order = existing
    ? Number(existing.seriesOrder) || nextOrder(posts, 'pessoas-historia')
    : nextOrder(posts, 'pessoas-historia');
  const post = stampFiles(buildRobsonOliveiraPost(order));
  upsertPost(posts, post);

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);

  writeHtml(post);

  const sug = fs.existsSync(SUG_FILE)
    ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'))
    : { items: [] };
  upsertItem(
    sug.items || (sug.items = []),
    {
      id: 'figura-robson-oliveira',
      title: 'Robson Oliveira — a casa, Boston e dois são mais fortes que um',
      titleEn: 'Robson Oliveira — the house, Boston and two are stronger than one',
      titleEs: 'Robson Oliveira — la casa, Boston y dos son más fuertes que uno',
      tipo: 'pessoas',
      priority: 1,
      status: 'feita',
      why: 'Pessoas: homenagem a Robson Gonçalves de Oliveira e à família; gesto de Boston 2026; elo juntos / Faça o seu melhor; Valeu !!!',
      whyEn:
        'People: homage to Robson Gonçalves de Oliveira and family; Boston 2026 gesture; juntos / do-your-best link; Valeu !!!',
      whyEs:
        'Personas: homenaje a Robson Gonçalves de Oliveira y a la familia; gesto de Boston 2026; vínculo juntos / haz lo mejor; ¡Valeu !!!',
      suggestedSlug: post.slug,
      doneHref: HREF,
      seriesHint: 'pessoas-historia',
      sources: [
        post.sourceUrl,
        '/posts/post-inspecao-palavra-juntos.html',
        '/posts/post-inspecao-expressao-faca-o-melhor.html',
        '/posts/post-inspecao-palavra-valeu.html',
        'https://www.instagram.com/oliveirarobson89'
      ],
      notes:
        'Cap. ' +
        post.seriesOrder +
        ' Pessoas — pessoa viva: não inventar nomes da família; Corsuié = orelha de Gonçalves é.'
    },
    ['figura-ayrton-senna', 'ayrton-senna']
  );
  sug.updatedAt = new Date().toISOString();

  const guia = fs.existsSync(GUIA_FILE)
    ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'))
    : { items: [] };
  upsertItem(
    guia.items || (guia.items = []),
    {
      id: 'robson-oliveira',
      word: 'Robson Oliveira',
      group: 'lexico',
      fromTitle: false,
      href: HREF,
      simple:
        'Maratonista amador de São Bernardo do Campo; homenagem em Pessoas à casa e ao gesto de Boston 2026 — dois são mais fortes que um; Valeu !!!',
      simpleEn:
        'Amateur marathoner from São Bernardo do Campo; People homage to the house and the Boston 2026 gesture — two are stronger than one; Valeu !!!',
      simpleEs:
        'Maratonista aficionado de São Bernardo do Campo; homenaje en Personas a la casa y al gesto de Boston 2026 — dos son más fuertes que uno; ¡Valeu !!!',
      history:
        'Robson Gonçalves de Oliveira (São Bernardo do Campo) é operador de máquinas e maratonista amador. Em 20 abr. 2026, na Maratona de Boston, abriu mão do recorde pessoal para, com Aaron Beggs, amparar Ajay Haridasse. Filho de pedreiro e trabalhadora doméstica migrantes do Ceará; a ficha honra também a família, só com rasto público.',
      curiosities:
        'O pedido chegou «Robson Corsuié» — a orelha ouviu Gonçalves é. Tempo em Boston: 2h44min26s. Instagram @oliveirarobson89. Fecho: Valeu !!!',
      historyEn:
        'Robson Gonçalves de Oliveira (São Bernardo do Campo) is a machine operator and amateur marathoner. On 20 Apr 2026 at Boston he gave up a personal-best chase to help Ajay Haridasse with Aaron Beggs. Son of a bricklayer and a domestic worker who migrated from Ceará; the sheet honours the family from the public record only.',
      curiositiesEn:
        'The request arrived as “Robson Corsuié” — the ear heard Gonçalves é. Boston time: 2:44:26. Instagram @oliveirarobson89. Close: Valeu !!!',
      historyEs:
        'Robson Gonçalves de Oliveira (São Bernardo do Campo) es operador de máquinas y maratonista aficionado. El 20 abr. 2026 en Boston dejó el récord personal para, con Aaron Beggs, amparar a Ajay Haridasse. Hijo de albañil y trabajadora doméstica migrantes de Ceará; la ficha honra también a la familia, solo con rastro público.',
      curiositiesEs:
        'El pedido llegó como «Robson Corsuié» — el oído oyó Gonçalves é. Tiempo en Boston: 2:44:26. Instagram @oliveirarobson89. Cierre: ¡Valeu !!!'
    },
    ['ayrton-senna']
  );
  guia.updatedAt = new Date().toISOString();

  if (fs.existsSync(VIDA_FILE)) {
    const vida = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
    upsertVidaPoem(vida, {
      id: 'dois-sao-mais-fortes',
      slug: 'dois-sao-mais-fortes',
      title: 'Dois são mais fortes',
      titleEn: 'Two Are Stronger',
      titleEs: 'Dos son más fuertes',
      author: 'Laboratório BudGanja',
      authorEn: 'BudGanja Lab',
      authorEs: 'Laboratorio BudGanja',
      teaser:
        'Homenagem a Robson Oliveira e à família — a casa que acorda no turno, Boston, dois são mais fortes que um.',
      teaserEn:
        'Homage to Robson Oliveira and his family — the house that wakes on the shift, Boston, two are stronger than one.',
      teaserEs:
        'Homenaje a Robson Oliveira y a la familia — la casa que despierta en el turno, Boston, dos son más fuertes que uno.',
      body: poemRobsonPt(),
      bodyEn: poemRobsonEn(),
      bodyEs: poemRobsonEs(),
      inspectionHref: HREF,
      tags: ['poesia', 'vida', 'robson', 'família', 'juntos', 'boston']
    });
    await writeJsonRetry(VIDA_FILE, vida);
    console.log('Poema Vida actualizado (dois-sao-mais-fortes)');
  }

  const glossLine =
    '    "robson oliveira": { tone: "warm", category: "Pessoas", mundane: "Robson Gonçalves de Oliveira — maratonista amador de São Bernardo; gesto de Boston 2026.", gloss: "Homenagem à casa e ao par (dois são mais fortes que um); pessoa viva; ≠ Corsuié; Valeu !!!", href: "' +
    HREF +
    '", en: "Robson Oliveira", es: "Robson Oliveira", fr: "Robson Oliveira", it: "Robson Oliveira", de: "Robson Oliveira", el: "Ρόμπσον Ολιβέιρα", la: "Robson Oliveira", yo: "Robson Oliveira", sw: "Robson Oliveira", gez: "Robson Oliveira", nl: "Robson Oliveira", pl: "Robson Oliveira", ru: "Робсон Оливейра", uk: "Робсон Олівейра", zh: "罗布森·奥利维拉", ja: "ロブソン・オリベイラ", ko: "호브송 올리베이라", ar: "روبسون أوليفيرا", he: "רובסון אוליביירה", hi: "रॉब्सन ओलिवेरा", tr: "Robson Oliveira", sv: "Robson Oliveira", da: "Robson Oliveira", no: "Robson Oliveira", fi: "Robson Oliveira", cs: "Robson Oliveira", ro: "Robson Oliveira", hu: "Robson Oliveira", ca: "Robson Oliveira", gl: "Robson Oliveira", eu: "Robson Oliveira", gn: "Robson Oliveira", qu: "Robson Oliveira", eo: "Robson Oliveira", vi: "Robson Oliveira", id: "Robson Oliveira", th: "รอบสัน โอลิเวียรา", hr: "Robson Oliveira", sk: "Robson Oliveira", ga: "Robson Oliveira", cy: "Robson Oliveira", ha: "Robson Oliveira", am: "ሮብሰን ኦሊቬራ", fa: "رابسون الیویرا", bn: "রবসন অলিভেইরা", zu: "uRobson Oliveira" },\n';
  upsertGloss(
    GLOSS_FILE,
    '    "robson oliveira":\\s*\\{[\\s\\S]*?\\},',
    glossLine,
    'senna'
  );
  upsertGloss(
    GLOSS_FILE,
    '    "robson gonçalves de oliveira":\\s*\\{[\\s\\S]*?\\},',
    '    "robson gonçalves de oliveira": { gloss: "Nome completo — ver Robson Oliveira; homenagem à família e a Boston 2026.", href: "' +
      HREF +
      '", en: "Robson Gonçalves de Oliveira", es: "Robson Gonçalves de Oliveira" },\n',
    '"robson oliveira"'
  );

  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  await writeJsonRetry(SUG_FILE, sug);
  await writeJsonRetry(GUIA_FILE, guia);

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
