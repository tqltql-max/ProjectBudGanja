'use strict';

/**
 * Página dedicada: Girassol (Cidade Negra) + palavra sorrir.
 * Uso: node scripts/upsert-arte-girassol-cidade-negra.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const {
  buildGirassolCidadeNegraPost,
  YT,
  YT_MUSIC,
  SPOTIFY,
  WIKI
} = require('../lib/girassol-cidade-negra-inspecao-post.js');
const { buildSorrirPost } = require('../lib/sorrir-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const GLOSS_FILE = path.join(ROOT, 'js', 'learn-glossary.js');
const SONG_HREF = '/posts/post-inspecao-arte-girassol.html';
const WORD_HREF = '/posts/post-inspecao-palavra-sorrir.html';

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
    const after = (afterIds || []).map((id) => items.findIndex((x) => x.id === id)).find((n) => n >= 0);
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
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
  const song =
    '    girassol: { tone: "craft", category: "Canção", mundane: "Planta que segue o sol; canção da Cidade Negra (2002).", gloss: "Artes · letra do Acústico MTV; fala viva girasol amamareco; ≠ horto; elo sorrir; Valeu !!!", href: "' +
    SONG_HREF +
    '", en: "sunflower / Girassol (song)", es: "girasol / Girassol (canción)" },\n';
  const aliases = [
    '    girasol: { gloss: "Fala viva (um s) — ver Girassol (Cidade Negra).", href: "' +
      SONG_HREF +
      '", en: "living spelling of girassol", es: "habla viva de girassol" },\n',
    '    amamareco: { gloss: "Fala viva de amarelo na letra de Girassol — a orelha cola ama + amarelo.", href: "' +
      SONG_HREF +
      '", en: "living yellow (Girassol)", es: "amarillo vivo (Girassol)" },\n',
    '    "cidade negra": { gloss: "Banda de reggae BR — página da canção Girassol.", href: "' +
      SONG_HREF +
      '", en: "Cidade Negra", es: "Cidade Negra" },\n',
    '    sorrir: { tone: "warm", category: "Gesto", mundane: "Abrir o rosto — menos que rir, mais que pose.", gloss: "Lat. subrīdēre (sub- + rīdēre); sorriso é o nome; na letra de Girassol é colectivo; Valeu !!!", href: "' +
      WORD_HREF +
      '", en: "to smile", es: "sonreír" },\n',
    '    sorriso: { gloss: "Nome do rasto de sorrir — ver sorrir.", href: "' +
      WORD_HREF +
      '", en: "smile (noun)", es: "sonrisa" },\n'
  ];

  if (/    girassol:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/    girassol:\s*\{[\s\S]*?\},\r?\n/, song);
  } else if (/    alegria:\s*\{/.test(gloss)) {
    gloss = gloss.replace(/(    alegria:\s*\{[\s\S]*?\},\r?\n)/, '$1' + song);
  }

  for (const line of aliases) {
    const key = line.match(/^\s+("[^"]+"|[a-zà-ú-]+):/)[1];
    const re = new RegExp(
      '    ' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*\\{[\\s\\S]*?\\},\\r?\\n'
    );
    if (re.test(gloss)) gloss = gloss.replace(re, line);
    else if (/    girassol:\s*\{/.test(gloss)) {
      gloss = gloss.replace(/(    girassol:\s*\{[\s\S]*?\},\r?\n)/, '$1' + line);
    }
  }

  if (/    amarelo:\s*\{/.test(gloss) && !/amamareco/.test(gloss.split('amarelo:')[1].slice(0, 80))) {
    gloss = gloss.replace(
      /    amarelo:\s*\{/,
      '    amarelo: { gloss: "Cor — na letra de Girassol (Cidade Negra) a fala viva é amamareco.", href: "' +
        SONG_HREF +
        '", '
    );
  }

  return gloss;
}

async function main() {
  for (const script of [
    'generate-girassol-cidade-negra-cover.js',
    'generate-sorrir-palavra-cover.js'
  ]) {
    try {
      execFileSync(process.execPath, [path.join(__dirname, script)], {
        cwd: ROOT,
        stdio: 'inherit',
        timeout: 45000
      });
    } catch (e) {
      console.warn('Aviso capa:', script, e.message);
    }
  }

  const song = stampFiles(buildGirassolCidadeNegraPost());
  const word = stampFiles(buildSorrirPost());
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, song);
  upsertPost(posts, word);
  await writeJsonRetry(POSTS_FILE, posts);

  try {
    writeHtml(song);
    writeHtml(word);
  } catch (e) {
    console.warn('Aviso HTML:', e.message);
  }

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, song);
  writeI18n(i18n, word);
  await writeJsonRetry(I18N_FILE, i18n);

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const songEntry = {
      id: 'arte-girassol-cidade-negra',
      title: 'Girassol — Cidade Negra, letra e ofício de virar para o sol',
      titleEn: 'Girassol — Cidade Negra, lyric and turning toward the sun',
      titleEs: 'Girassol — Cidade Negra, letra y volverse hacia el sol',
      tipo: 'arte',
      priority: 1,
      status: 'feita',
      why: 'Artes · canção 2002: Cidade Negra — Girassol; página dedicada; letra sem colar texto; girasol amamareco.',
      whyEn: 'Arts · 2002 song: Cidade Negra — Girassol; dedicated page; lyric without pasting text.',
      whyEs: 'Artes · canción 2002: Cidade Negra — Girassol; página dedicada; letra sin pegar texto.',
      suggestedSlug: song.slug,
      doneHref: SONG_HREF,
      seriesHint: 'artes-cultura',
      sources: [SONG_HREF, SPOTIFY, YT, YT_MUSIC, WIKI, WORD_HREF],
      notes: 'Cap. ' + song.seriesOrder + ' — Acústico MTV 2002; letra por motivos.'
    };
    const wordEntry = {
      id: 'palavra-sorrir',
      title: 'Sorrir — subrīdēre; elo na letra de Girassol',
      titleEn: 'Sorrir — subrīdēre; link in Girassol',
      titleEs: 'Sorrir — subrīdēre; vínculo en Girassol',
      tipo: 'palavra',
      priority: 1,
      status: 'feita',
      why: 'Palavras: sorrir ← subrīdēre; sorriso é o nome; na letra de Girassol é colectivo.',
      whyEn: 'Words: sorrir ← subrīdēre; noun is sorriso; collective in Girassol.',
      whyEs: 'Palabras: sorrir ← subrīdēre; el nombre es sorriso; colectivo en Girassol.',
      suggestedSlug: word.slug,
      doneHref: WORD_HREF,
      seriesHint: 'palavras-origem',
      sources: [WORD_HREF, SONG_HREF, 'https://pt.wiktionary.org/wiki/sorrir'],
      notes: 'Cap. ' + word.seriesOrder + ' — irmã da página da música.'
    };
    upsertItem(items, songEntry);
    upsertItem(items, wordEntry);
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
        id: 'girassol',
        word: 'Girassol',
        simple:
          'Canção Cidade Negra (Acústico MTV, 2002) — letra inspeccionada sem colar texto; fala viva girasol amamareco.',
        simpleEn:
          'Cidade Negra song (MTV Unplugged, 2002) — lyric inspected without pasting text; living girasol amamareco.',
        simpleEs:
          'Canción de Cidade Negra (Acústico MTV, 2002) — letra inspeccionada sin pegar texto; girasol amamareco.',
        group: 'lexico',
        fromTitle: false,
        href: SONG_HREF
      },
      ['how-bizarre', 'sorrir']
    );
    upsertItem(
      items,
      {
        id: 'sorrir',
        word: 'sorrir',
        simple:
          'Verbo ← lat. subrīdēre — gesto do rosto; sorriso é o nome; na letra de Girassol é colectivo.',
        simpleEn: 'Verb ← Lat. subrīdēre — face gesture; sorriso is the noun; collective in Girassol.',
        simpleEs: 'Verbo ← lat. subrīdēre — gesto del rostro; sorriso es el nombre; colectivo en Girassol.',
        group: 'lexico',
        fromTitle: false,
        href: WORD_HREF
      },
      ['alegria', 'girassol']
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

  try {
    await syncSql(song);
    await syncSql(word);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', song.title, '|', word.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
