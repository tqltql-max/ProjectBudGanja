'use strict';

/**
 * Injeta a palavra juntos (cruzada com elos).
 * Uso: node scripts/upsert-palavra-juntos-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildJuntosPost } = require('../lib/juntos-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const HREF = '/posts/post-inspecao-palavra-juntos.html';
const ELO_HREF = '/posts/post-inspecao-expressao-elo-de-ligacao.html';

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

const JUNTOS_BLOCK =
  '    juntos: { tone: "craft", category: "Léxico", mundane: "Estado de estar junto — adjectivo/advérbio.", gloss: "Lat. iunctus ← iungere; cruza com elos (anel ≠ slogan); ≠ sozinho ≠ simbiose; Valeu !!!", href: "' +
  HREF +
  '", en: "together", es: "juntos", fr: "ensemble", it: "insieme", de: "zusammen", el: "μαζί", la: "iuncti / una", yo: "pọ̀", sw: "pamoja", gez: "əntä", nl: "samen", pl: "razem", ru: "вместе", uk: "разом", zh: "一起", ja: "一緒に", ko: "함께", ar: "معا", he: "יחד", hi: "साथ", tr: "birlikte", sv: "tillsammans", da: "sammen", no: "sammen", fi: "yhdessä", cs: "spolu", ro: "împreună", hu: "együtt", ca: "junts", gl: "xuntos", eu: "elkarrekin", gn: "oñondive", qu: "kuska", eo: "kune", vi: "cùng nhau", id: "bersama", th: "ด้วยกัน", hr: "zajedno", sk: "spolu", ga: "le chéile", cy: "gyda\'i gilydd", ha: "tare", am: "አብረው", fa: "با هم", bn: "একসাথে", zu: "ndawonye" },\n';

const EXTRA_BLOCK =
  '    junto: { gloss: "Singular de juntos — lat. iunctus; proximidade ou estado; ver ficha juntos.", href: "' +
  HREF +
  '", en: "together / nearby", es: "junto" },\n' +
  '    juntas: { gloss: "Feminino plural de juntos — ≠ juntas (articulações) ≠ junta (órgão); ver ficha.", href: "' +
  HREF +
  '", en: "together (fem. pl.)", es: "juntas" },\n' +
  '    juntar: { gloss: "Verbo da família de juntos — o gesto de pôr junto; estado = juntos; Valeu !!!", href: "' +
  HREF +
  '", en: "to join / gather", es: "juntar" },\n' +
  '    elos: { tone: "craft", category: "Léxico", mundane: "Anéis da corrente — o que segura o juntos.", gloss: "Plural de elo (lat. anellus); cruza com juntos; locução elo de ligação; Valeu !!!", href: "' +
  HREF +
  '", en: "links / chain-rings", es: "eslabones", fr: "maillons", it: "anelli", de: "Glieder", el: "κρίκοι", la: "anelli", yo: "àwọn òrùka", sw: "viungo", gez: "ʕəqəbat", nl: "schakels", pl: "ogniwa", ru: "звенья", uk: "ланки", zh: "链环", ja: "輪", ko: "고리", ar: "حلقات", he: "חוליות", hi: "कड़ियाँ", tr: "halkalar", sv: "länkar", da: "led", no: "lenker", fi: "lenkit", cs: "články", ro: "zăle", hu: "szemek", ca: "baules", gl: "elos", eu: "katebegiak", gn: "joaju", qu: "t\'inkikuna", eo: "ligiloj", vi: "mắt xích", id: "mata rantai", th: "ข้อโซ่", hr: "članci", sk: "články", ga: "naisc", cy: "dolenni", ha: "mahadan", am: "አገናኞች", fa: "حلقه‌ها", bn: "কড়া", zu: "izixhumanisi" },\n' +
  '    elo: { gloss: "Anel da corrente — lat. anellus; locução elo de ligação; cruza com juntos.", href: "' +
  ELO_HREF +
  '", en: "link / chain-ring", es: "eslabón" },\n';

function replaceJuntosStub(gloss) {
  const re = new RegExp(
    '    juntos:\\s*\\{[\\s\\S]*?' + ZU_TAIL.source
  );
  if (!re.test(gloss)) return null;
  return gloss.replace(re, JUNTOS_BLOCK);
}

function insertAfterKey(gloss, key, block) {
  const re = new RegExp(
    '(    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?' + ZU_TAIL.source + ')'
  );
  if (!re.test(gloss)) return null;
  return gloss.replace(re, '$1' + block);
}

function patchGlossary(gloss) {
  if (gloss.includes('href: "' + HREF + '"')) {
    return gloss;
  }
  const replaced = replaceJuntosStub(gloss);
  let out = replaced || gloss;
  if (!out.includes('href: "' + HREF + '"')) {
    const inserted = insertAfterKey(out, 'relação', JUNTOS_BLOCK);
    if (inserted) out = inserted;
    else console.warn('Aviso: glossário — juntos não inserido');
  }
  if (!out.includes('    elos:')) {
    const extra = insertAfterKey(out, 'juntos', EXTRA_BLOCK);
    if (extra) out = extra;
    else console.warn('Aviso: glossário — elos/junto não inseridos');
  }
  return out;
}

function upsertSug(sug, post) {
  const items = Array.isArray(sug.items) ? sug.items : [];
  const sugId = 'palavra-juntos';
  const si = items.findIndex((x) => x.id === sugId);
  const entry = {
    id: sugId,
    title: 'Juntos — o estado, cruzado com os elos',
    titleEn: 'Juntos — the state, crossed with the links',
    titleEs: 'Juntos — el estado, cruzado con los eslabones',
    tipo: 'palavra',
    priority: 2,
    status: 'feita',
    why: 'Palavras: juntos (lat. iunctus ← iungere) — estado; cruza com elos (anel ≠ slogan); Valeu !!!',
    whyEn: 'Words: juntos (Lat. iunctus ← iungere) — state; crosses with elos (ring ≠ slogan); Valeu !!!',
    whyEs: 'Palabras: juntos (lat. iunctus ← iungere) — estado; cruza con elos (anillo ≠ eslogan); ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'palavras-origem',
    sources: [
      post.sourceUrl,
      'https://en.wiktionary.org/wiki/iunctus#Latin',
      ELO_HREF,
      '/posts/post-inspecao-palavra-relacao.html',
      '/posts/post-inspecao-palavra-sozna.html',
      '/posts/post-inspecao-palavra-valeu.html'
    ],
    notes: 'Cap. ' + post.seriesOrder + ' — estado × anel; juntos sem elo = pose; cruzamento com elo de ligação.'
  };
  if (si >= 0) items[si] = Object.assign({}, items[si], entry);
  else items.push(entry);
  sug.items = items;
}

function upsertGuia(guia) {
  const items = Array.isArray(guia.items) ? guia.items : [];
  const entry = {
    id: 'juntos',
    word: 'Juntos',
    group: 'lexico',
    fromTitle: false,
    href: HREF,
    simple:
      'Lat. iunctus ← iungere — estado de estar junto; cruza com elos (anel ≠ slogan); ≠ sozinho ≠ simbiose; Valeu !!!',
    simpleEn:
      'Lat. iunctus ← iungere — state of being together; crosses with elos (ring ≠ slogan); ≠ alone ≠ symbiosis; Valeu !!!',
    simpleEs:
      'Lat. iunctus ← iungere — estado de estar junto; cruza con elos (anillo ≠ eslogan); ≠ sozinho ≠ simbiose; ¡Valeu !!!',
    history:
      'Juntos vem do latim iunctus (← iungere, unir). No laboratório o estado cruza com os elos: o anel que segura. Sem elo, juntos pode ser só slogan.',
    curiosities:
      'Junto a é proximidade, nem sempre companhia. Juntas (fem.) ≠ juntas (articulações) ≠ junta (órgão). Fecho: Valeu !!!',
    historyEn:
      'Portuguese juntos comes from Latin iunctus (← iungere, to join). In the lab the state crosses with elos: the ring that holds. Without a ring, juntos can be only a slogan.',
    curiositiesEn:
      'Junto a is nearness, not always company. Juntas (fem. pl.) ≠ anatomical joints ≠ a governing board. Close: Valeu !!!',
    historyEs:
      'Juntos viene del latín iunctus (← iungere, unir). En el laboratorio el estado cruza con los elos: el anillo que sujeta. Sin eslabón, juntos puede ser solo eslogan.',
    curiositiesEs:
      'Junto a es proximidad, no siempre compañía. Juntas (fem.) ≠ articulaciones ≠ junta de gobierno. Cierre: ¡Valeu !!!'
  };
  const gi = items.findIndex((x) => x.id === entry.id || x.word === entry.word);
  if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'conexao' || x.word === 'conexão');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  guia.items = items;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-juntos-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit'
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE)
    ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'))
    : { items: [] };
  const guia = fs.existsSync(GUIA_FILE)
    ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'))
    : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';

  const post = stampFiles(buildJuntosPost());
  upsertPost(posts, post);
  writeHtml(post);
  writeI18n(i18n, post);
  upsertSug(sug, post);
  upsertGuia(guia);
  if (gloss) gloss = patchGlossary(gloss);

  sug.updatedAt = new Date().toISOString();
  guia.updatedAt = new Date().toISOString();
  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  await writeJsonRetry(SUG_FILE, sug);
  await writeJsonRetry(GUIA_FILE, guia);
  if (gloss) {
    fs.writeFileSync(GLOSS_FILE, gloss, 'utf8');
    console.log('Glossário actualizado (juntos × elos)');
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
