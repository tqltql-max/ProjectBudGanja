'use strict';

/**
 * Injeta / actualiza «Alive» (Artes · Pearl Jam) e fecha a playlist da rádio.
 * Uso: node scripts/upsert-arte-alive.js
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { writeFileRetrySync } = require('../lib/fs-write-retry.js');
const {
  buildAlivePost,
  poemAlivePt,
  poemAliveEn,
  poemAliveEs,
  YT,
  SPOTIFY
} = require('../lib/alive-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const VIDA_FILE = path.join(ROOT, 'content', 'vida-poemas.json');
const RADIO_DIR = path.join(ROOT, 'radio');

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

function ensureExtraYoutubeTrack() {
  const extraFile = path.join(RADIO_DIR, 'extra-tracks.json');
  let extra = { tracks: [] };
  try {
    extra = JSON.parse(fs.readFileSync(extraFile, 'utf8'));
  } catch (_) {
    /* start empty */
  }
  if (!Array.isArray(extra.tracks)) extra.tracks = [];
  const entry = {
    title: 'Alive (Official Video)',
    artist: 'Pearl Jam',
    url: YT
  };
  const exists = extra.tracks.findIndex((t) => String((t && t.url) || '') === YT);
  if (exists >= 0) extra.tracks.splice(exists, 1);
  extra.tracks.push(entry);
  writeFileRetrySync(extraFile, JSON.stringify(extra, null, 2) + '\n', 'utf8');
  console.log('Rádio extra-tracks: Alive (Pearl Jam) — fecho');
}

function rebuildRadioPlaylist() {
  const script = path.join(__dirname, 'build-radio-playlist.js');
  const run = spawnSync(process.execPath, [script], { cwd: ROOT, stdio: 'inherit' });
  if (run.status !== 0) throw new Error('build-radio-playlist falhou');
}

function upsertVidaPoem() {
  if (!fs.existsSync(VIDA_FILE)) return;
  const data = JSON.parse(fs.readFileSync(VIDA_FILE, 'utf8'));
  const items = Array.isArray(data.poems) ? data.poems : Array.isArray(data.items) ? data.items : null;
  if (!items) return;
  const href = '/posts/post-inspecao-arte-alive.html';
  const entry = {
    id: 'alive',
    slug: 'alive',
    title: 'Alive',
    titleEn: 'Alive',
    titleEs: 'Alive',
    author: 'Laboratório BudGanja',
    authorEn: 'BudGanja Lab',
    authorEs: 'Laboratorio BudGanja',
    teaser: 'Eco BudGanja do Pearl Jam — ficar; o refrão pesa e a sala o vira canto; fecho da rádio.',
    teaserEn: 'BudGanja echo of Pearl Jam — staying; the chorus is heavy and the room turns it into a song; radio closer.',
    teaserEs: 'Eco BudGanja de Pearl Jam — quedarse; el estribillo pesa y la sala lo vuelve canto; cierre de la radio.',
    body: poemAlivePt(),
    bodyEn: poemAliveEn(),
    bodyEs: poemAliveEs(),
    inspectionHref: href,
    tags: ['poesia', 'vida', 'pearl jam', 'ficar', 'rádio']
  };
  const vi = items.findIndex((x) => x.id === 'alive');
  if (vi >= 0) items[vi] = Object.assign({}, items[vi], entry);
  else {
    const after = items.findIndex((x) => x.id === 'back-door-man' || x.id === 'wake-up');
    if (after >= 0) items.splice(after + 1, 0, entry);
    else items.push(entry);
  }
  if (Array.isArray(data.poems)) data.poems = items;
  else if (Array.isArray(data.items)) data.items = items;
  data.updatedAt = new Date().toISOString();
  writeFileRetrySync(VIDA_FILE, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('Vida poemas actualizado (alive)');
}

async function main() {
  try {
    spawnSync(process.execPath, [path.join(__dirname, 'generate-alive-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  try {
    ensureExtraYoutubeTrack();
    rebuildRadioPlaylist();
  } catch (e) {
    console.warn('Aviso playlist rádio:', e.message);
  }

  const post = buildAlivePost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  writeFileRetrySync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  writeFileRetrySync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'arte-alive';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Alive — Pearl Jam e o ofício de ficar',
      titleEn: 'Alive — Pearl Jam and the craft of staying',
      titleEs: 'Alive — Pearl Jam y el oficio de quedarse',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Canção 1991: Ten, 1.º single; refrão peso × hino; fecho da rádio.',
      whyEn: '1991 song: Ten, first single; chorus as burden × anthem; radio closer.',
      whyEs: 'Canción 1991: Ten, 1.er single; estribillo carga × himno; cierre de la radio.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [
        href,
        YT,
        SPOTIFY,
        'https://en.wikipedia.org/wiki/Alive_(Pearl_Jam_song)',
        '/radio/'
      ],
      notes: 'Pedido Spotify 1L94M3KIu7QluZe63g64rv; clipe oficial ao vivo; última faixa da playlist.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    writeFileRetrySync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (arte-alive)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'alive',
      word: 'Alive',
      simple:
        'Canção Pearl Jam (1991, Ten): ficar; refrão que nasceu peso e a sala virou hino; fecho da rádio.',
      simpleEn:
        'Pearl Jam song (1991, Ten): staying; chorus born as burden, the room turned into an anthem; radio closer.',
      simpleEs:
        'Canción Pearl Jam (1991, Ten): quedarse; estribillo nacido como carga, la sala lo volvió himno; cierre de la radio.',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Alive, de Pearl Jam (álbum Ten, 1991; primeiro single). Música de Stone Gossard (*Dollar Short*); letra de Eddie Vedder. O refrão foi relido pela sala.',
      curiosities:
        'A ficha de Artes liga a faixa a vida/verdade, a Wake Up e a Killing in the Name — sem colar a letra. Fecha a playlist da rádio.',
      historyEn:
        'Alive, by Pearl Jam (Ten, 1991; first single). Music by Stone Gossard (*Dollar Short*); lyric by Eddie Vedder. The room reread the chorus.',
      curiositiesEn:
        'The Arts sheet links the track to life/truth, Wake Up and Killing in the Name — without pasting the lyric. It closes the radio playlist.',
      historyEs:
        'Alive, de Pearl Jam (álbum Ten, 1991; primer single). Música de Stone Gossard (*Dollar Short*); letra de Eddie Vedder. La sala releyó el estribillo.',
      curiositiesEs:
        'La ficha de Artes liga el tema a vida/verdad, Wake Up y Killing in the Name — sin pegar la letra. Cierra la playlist de la radio.'
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'back-door-man' || x.id === 'wake-up');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    writeFileRetrySync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (alive)');
  }

  upsertVidaPoem();

  try {
    await syncSql(post);
  } catch (e) {
    console.warn('Aviso SQL store:', e.message);
  }

  console.log('OK:', post.title);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
