'use strict';

/**
 * Injeta a palavra «Save Game» na série Palavras.
 * Uso: node scripts/upsert-palavra-save-game-inspecao.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildSaveGamePost,
  poemPt,
  poemEn,
  poemEs
} = require('../lib/save-game-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const HREF = '/posts/post-inspecao-palavra-save-game.html';

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

function upsertItem(items, entry, afterIds) {
  const i = items.findIndex((x) => x.id === entry.id);
  if (i >= 0) items[i] = Object.assign({}, items[i], entry);
  else {
    const after = (afterIds || []).map((id) => items.findIndex((x) => x.id === id)).find((n) => n >= 0);
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
  const re = new RegExp('    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n');
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
    '    "save game": { tone: "craft", category: "Menu", mundane: "Composto EN de menu — gravar a partida.", gloss: "save + game; voz viva salve tudo; salvar/gravar/guardar; ≠ Load/New/backspace; Valeu !!!", href: "' +
    HREF +
    '", en: "save game", es: "guardar partida", fr: "sauvegarder", it: "salva partita", de: "Spiel speichern", el: "αποθήκευση", la: "ludum serva", yo: "fi eré pamọ́", sw: "hifadhi mchezo", gez: "save game", nl: "spel opslaan", pl: "zapisz grę", ru: "сохранить игру", uk: "зберегти гру", zh: "保存游戏", ja: "セーブ", ko: "게임 저장", ar: "حفظ اللعبة", he: "שמור משחק", hi: "गेम सेव", tr: "oyunu kaydet", sv: "spara spelet", da: "gem spil", no: "lagre spill", fi: "tallenna peli", cs: "uložit hru", ro: "salvează jocul", hu: "játék mentése", ca: "desa la partida", gl: "gardar a partida", eu: "partida gorde", gn: "ñongatu ñembosarái", qu: "pukllayta waqaychay", eo: "konservi ludon", vi: "lưu game", id: "simpan permainan", th: "เซฟเกม", hr: "spremi igru", sk: "uložiť hru", ga: "sábháil an cluiche", cy: "cadw gêm", ha: "ajiye wasa", am: "ጨዋታ አስቀምጥ", fa: "ذخیره بازی", bn: "সেভ গেম", zu: "gcina umdlalo" },\n';
  const aliases = [
    '    savegame: { gloss: "Grafia colada — ver Save Game.", href: "' + HREF + '", en: "savegame", es: "savegame" },\n',
    '    "save-game": { gloss: "Hífen — ver Save Game.", href: "' + HREF + '", en: "save-game", es: "save-game" },\n',
    '    "salve tudo": { gloss: "Oral BR — gravar o conjunto; ver Save Game.", href: "' + HREF + '", en: "save all", es: "guarda todo" },\n',
    '    "salvar o jogo": { gloss: "Irmã PT de Save Game — pôr a partida a salvo.", href: "' + HREF + '", en: "save the game", es: "salvar el juego" },\n',
    '    "gravar o jogo": { gloss: "Irmã PT de Save Game — inscrever a partida.", href: "' + HREF + '", en: "save the game (record)", es: "grabar el juego" },\n',
    '    "load game": { gloss: "Porta de volta — ver Save Game (o rasto que se lê).", href: "' + HREF + '", en: "load game", es: "cargar partida" },\n'
  ].join('');

  gloss = replaceOrInsertAfter(gloss, '"save game"', main, 'skill');
  for (const line of aliases.split('\n').filter(Boolean)) {
    const key = line.match(/^\s+("[^"]+"|[a-z0-9-]+):/)[1];
    gloss = replaceOrInsertAfter(gloss, key, line + '\n', '"save game"');
  }
  return gloss;
}

async function main() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'generate-save-game-palavra-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  const post = stampFiles(buildSaveGamePost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  const sug = fs.existsSync(SUG_FILE) ? JSON.parse(fs.readFileSync(SUG_FILE, 'utf8')) : { items: [] };
  const guia = fs.existsSync(GUIA_FILE) ? JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8')) : { items: [] };
  let gloss = fs.existsSync(GLOSS_FILE) ? fs.readFileSync(GLOSS_FILE, 'utf8') : '';
  const vida = fs.existsSync(VIDA_FILE) ? JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8')) : { poems: [] };

  upsertPost(posts, post);
  try {
    writeHtml(post);
  } catch (e) {
    console.warn('Aviso HTML', e.message);
  }
  writeI18n(i18n, post);
  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  const sugItems = Array.isArray(sug.items) ? sug.items : [];
  upsertItem(sugItems, {
    id: 'palavra-save-game',
    title: 'Save Game — gravar a partida; o rasto, não o milagre',
    titleEn: 'Save Game — persist the match; the trail, not the miracle',
    titleEs: 'Save Game — grabar la partida; el rastro, no el milagro',
    tipo: 'palavra',
    priority: 1,
    status: 'feita',
    why: 'Palavras: Save Game = save + game; salve tudo; ≠ Load/New/backspace; Valeu !!!',
    whyEn: 'Words: Save Game = save + game; living salve tudo; Valeu !!!',
    whyEs: 'Palabras: Save Game = save + game; salve tudo; ¡Valeu !!!',
    suggestedSlug: post.slug,
    doneHref: HREF,
    seriesHint: 'palavras-origem',
    sources: [post.sourceUrl, '/posts/post-inspecao-palavra-skill.html', '/jogos/'],
    notes: 'Cap. ' + post.seriesOrder + ' — pedido Save Game / salve tudo.'
  });
  sug.items = sugItems;
  sug.updatedAt = new Date().toISOString();

  const guiaItems = Array.isArray(guia.items) ? guia.items : [];
  upsertItem(
    guiaItems,
    {
      id: 'save-game',
      word: 'Save Game',
      simple:
        'EN save + game — gravar a partida. Voz viva: salve tudo. Irmãs: salvar / gravar / guardar. ≠ Load, New, backspace. Valeu !!!',
      simpleEn:
        'EN save + game — persist the match. Living voice: salve tudo. ≠ Load, New, backspace. Valeu !!!',
      simpleEs:
        'EN save + game — grabar la partida. Voz viva: salve tudo. ≠ Load, New, backspace. ¡Valeu !!!',
      group: 'lexico',
      fromTitle: false,
      href: HREF
    },
    ['skill', 'buguei']
  );
  guia.items = guiaItems;
  guia.updatedAt = new Date().toISOString();

  gloss = patchGlossary(gloss);

  upsertVidaPoem(vida, {
    id: 'save-game',
    slug: 'save-game',
    title: 'Save Game',
    titleEn: 'Save Game',
    titleEs: 'Save Game',
    author: 'Laboratório BudGanja',
    authorEn: 'BudGanja Lab',
    authorEs: 'Laboratorio BudGanja',
    teaser: 'Duas peças inglesas no menu — salve tudo; o rasto, não o milagre.',
    teaserEn: 'Two English pieces on the menu — save all; the trail, not the miracle.',
    teaserEs: 'Dos piezas inglesas en el menú — salve tudo; el rastro, no el milagro.',
    body: poemPt(),
    bodyEn: poemEn(),
    bodyEs: poemEs(),
    inspectionHref: HREF,
    tags: ['poesia', 'vida', 'save', 'jogo']
  });

  await writeJsonRetry(POSTS_FILE, posts);
  await writeJsonRetry(I18N_FILE, i18n);
  await writeJsonRetry(SUG_FILE, sug);
  await writeJsonRetry(GUIA_FILE, guia);
  await writeJsonRetry(GLOSS_FILE, gloss);
  await writeJsonRetry(VIDA_FILE, vida);

  console.log('OK', post.title, '· Cap.', post.seriesOrder);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
