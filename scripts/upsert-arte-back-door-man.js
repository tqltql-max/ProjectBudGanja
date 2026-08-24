'use strict';

/**
 * Injeta / actualiza «Back Door Man» (Artes · The Doors) e mete a faixa na rádio.
 * Uso: node scripts/upsert-arte-back-door-man.js
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');
const { writeFileRetrySync } = require('../lib/fs-write-retry.js');
const {
  buildBackDoorManPost,
  YT,
  YT_ID
} = require('../lib/back-door-man-inspecao-post.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const RADIO_DIR = path.join(ROOT, 'radio');
const TOOL_DIR = path.join(os.tmpdir(), 'budganja-ytdlp');
const YT_DLP_EXE = path.join(TOOL_DIR, 'yt-dlp.exe');
const SEARCH_Q = 'The Doors Back Door Man official audio';

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

function findFfmpeg() {
  const fromPath = spawnSync('where.exe', ['ffmpeg'], { encoding: 'utf8' });
  if (fromPath.status === 0) {
    const line = String(fromPath.stdout || '')
      .split(/\r?\n/)
      .map((s) => s.trim())
      .find(Boolean);
    if (line && fs.existsSync(line)) return line;
  }
  try {
    const bin = require('ffmpeg-static');
    if (bin && fs.existsSync(bin)) return bin;
  } catch (_) {
    /* optional */
  }
  return '';
}

function findYtDlp() {
  const which = spawnSync('where.exe', ['yt-dlp'], { encoding: 'utf8' });
  if (which.status === 0) {
    const line = String(which.stdout || '')
      .split(/\r?\n/)
      .map((s) => s.trim())
      .find(Boolean);
    if (line && fs.existsSync(line)) return line;
  }
  const winget = path.join(
    process.env.LOCALAPPDATA || '',
    'Microsoft',
    'WinGet',
    'Packages',
    'yt-dlp.yt-dlp_Microsoft.Winget.Source_8wekyb3d8bbwe',
    'yt-dlp.exe'
  );
  if (fs.existsSync(winget)) return winget;
  if (fs.existsSync(YT_DLP_EXE)) return YT_DLP_EXE;
  fs.mkdirSync(TOOL_DIR, { recursive: true });
  const url = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe';
  console.log('A descarregar yt-dlp…');
  const curl = spawnSync(
    'curl.exe',
    ['-L', '--fail', '--retry', '3', '-o', YT_DLP_EXE, url],
    { stdio: 'inherit' }
  );
  if (curl.status !== 0 || !fs.existsSync(YT_DLP_EXE)) {
    throw new Error('Não foi possível obter yt-dlp.exe');
  }
  return YT_DLP_EXE;
}

function isPermittedHit(row) {
  const up = String((row && row.uploader) || '');
  const title = String((row && row.title) || '');
  const ch = String((row && row.channel) || up);
  const blob = (up + ' ' + ch + ' ' + title).toLowerCase();
  if (/vevo|topic|official audio|official|elektra|rhino/i.test(blob)) return true;
  if (/the doors/i.test(ch) && /back\s*door\s*man/i.test(title)) return true;
  return false;
}

function searchFirstPublicTrack(ytDlp) {
  const raw = spawnSync(
    ytDlp,
    [
      'ytsearch8:' + SEARCH_Q,
      '--dump-json',
      '--no-download',
      '--flat-playlist',
      '--skip-download'
    ],
    { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }
  );
  if (raw.status !== 0) {
    console.warn('Aviso pesquisa YouTube:', raw.stderr && String(raw.stderr).slice(0, 400));
  }
  const rows = String(raw.stdout || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch (_) {
        return null;
      }
    })
    .filter(Boolean);

  const first = rows[0];
  const permitted = rows.find(isPermittedHit) || first;
  if (!permitted) {
    return {
      id: YT_ID,
      title: 'Back Door Man',
      uploader: 'The Doors - Topic'
    };
  }
  const id = permitted.id || permitted.url || YT_ID;
  console.log(
    'Pesquisa rádio:',
    permitted.title || id,
    '/',
    permitted.uploader || permitted.channel || '?'
  );
  return {
    id: String(id).replace(/^https?:\/\/(www\.)?youtube\.com\/watch\?v=/, ''),
    title: permitted.title || 'Back Door Man',
    uploader: permitted.uploader || permitted.channel || 'youtube'
  };
}

function sanitizeRadioBase(title, uploader) {
  const raw = String(title || 'Back Door Man') + ' - ' + String(uploader || 'youtube') + ' (youtube)';
  return raw.replace(/[<>:"/\\|?*]/g, ' ').replace(/\s+/g, ' ').trim();
}

function downloadRadioTrack(ytDlp, hit) {
  const ffmpeg = findFfmpeg();
  fs.mkdirSync(RADIO_DIR, { recursive: true });
  const base = sanitizeRadioBase(hit.title, hit.uploader);
  const outTpl = path.join(RADIO_DIR, base + '.%(ext)s');
  const args = [
    'https://www.youtube.com/watch?v=' + hit.id,
    '-x',
    '--audio-format',
    'mp3',
    '--audio-quality',
    '5',
    '--no-playlist',
    '-o',
    outTpl
  ];
  if (ffmpeg) args.push('--ffmpeg-location', path.dirname(ffmpeg));
  console.log('A descarregar áudio oficial para a rádio…');
  const run = spawnSync(ytDlp, args, { stdio: 'inherit' });
  if (run.status !== 0) {
    throw new Error('Falha a descarregar a faixa da rádio (código ' + run.status + ')');
  }
  const mp3 = path.join(RADIO_DIR, base + '.mp3');
  if (!fs.existsSync(mp3)) {
    const found = fs.readdirSync(RADIO_DIR).filter((n) => /back\s*door\s*man/i.test(n) && /\.mp3$/i.test(n));
    if (found[0]) return path.join(RADIO_DIR, found[0]);
    throw new Error('MP3 da rádio não apareceu em radio/');
  }
  return mp3;
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
  const url = YT;
  const exists = extra.tracks.some((t) => String((t && t.url) || '') === url);
  if (!exists) {
    extra.tracks.push({
      title: 'Back Door Man (Official Audio)',
      artist: 'The Doors',
      url
    });
    writeFileRetrySync(extraFile, JSON.stringify(extra, null, 2) + '\n', 'utf8');
    console.log('Rádio extra-tracks: Back Door Man (YouTube oficial)');
  }
}

function rebuildRadioPlaylist() {
  const script = path.join(__dirname, 'build-radio-playlist.js');
  const run = spawnSync(process.execPath, [script], { cwd: ROOT, stdio: 'inherit' });
  if (run.status !== 0) throw new Error('build-radio-playlist falhou');
}

async function main() {
  try {
    spawnSync(process.execPath, [path.join(__dirname, 'generate-back-door-man-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  let radioFile = '';
  if (process.env.SKIP_RADIO === '1') {
    console.log('Rádio: skip download (SKIP_RADIO=1)');
  } else {
    try {
      const ytDlp = findYtDlp();
      const hit = searchFirstPublicTrack(ytDlp);
      radioFile = downloadRadioTrack(ytDlp, hit);
      console.log('Rádio MP3:', path.relative(ROOT, radioFile));
    } catch (e) {
      console.warn('Aviso rádio MP3:', e.message);
    }
  }
  try {
    ensureExtraYoutubeTrack();
    rebuildRadioPlaylist();
  } catch (e) {
    console.warn('Aviso playlist rádio:', e.message);
  }

  const post = buildBackDoorManPost();
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
    const sugId = 'arte-back-door-man';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Back Door Man — The Doors, Jim e a porta de trás',
      titleEn: 'Back Door Man — The Doors, Jim and the back door',
      titleEs: 'Back Door Man — The Doors, Jim y la puerta de atrás',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Canção: Dixon/Wolf 1960 → The Doors 1967 (Jim); porta de trás × maçaneta.',
      whyEn: 'Song: Dixon/Wolf 1960 → The Doors 1967 (Jim); back door × doorknob.',
      whyEs: 'Canción: Dixon/Wolf 1960 → The Doors 1967 (Jim); puerta de atrás × pomo.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [
        href,
        YT,
        'https://en.wikipedia.org/wiki/Back_Door_Man',
        '/posts/post-inspecao-palavra-macaneta.html',
        '/radio/'
      ],
      notes: 'Obra primeiro (Dixon 1960; Doors 1967); Jim = voz, não biografia; eco poético ≠ letra.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    writeFileRetrySync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (arte-back-door-man)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'back-door-man',
      word: 'Back Door Man',
      simple:
        'Canção Dixon/Wolf (1960) na versão The Doors (1967, Jim na voz): porta de trás × maçaneta/verdade; rádio como adaptação.',
      simpleEn:
        'Dixon/Wolf song (1960) in The Doors version (1967, Jim on vocals): back door × doorknob/truth; radio as adaptation.',
      simpleEs:
        'Canción Dixon/Wolf (1960) en la versión The Doors (1967, Jim a la voz): puerta de atrás × pomo/verdad; radio como adaptación.',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Back Door Man, de Willie Dixon, gravada por Howlin\' Wolf (1960). The Doors cobriram-na no álbum homónimo (1967); Jim Morrison é a voz da capa, não o autor.',
      curiosities:
        'A ficha de Artes liga a faixa à maçaneta, à gíria e à proibição — sem colar a letra. O nome The Doors (Huxley/Blake) é outra porta.',
      historyEn:
        'Back Door Man, by Willie Dixon, recorded by Howlin\' Wolf (1960). The Doors covered it on their debut album (1967); Jim Morrison is the cover’s voice, not the author.',
      curiositiesEn:
        'The Arts sheet links the track to the doorknob, slang and prohibition — without pasting the lyric. The Doors name (Huxley/Blake) is another door.',
      historyEs:
        'Back Door Man, de Willie Dixon, grabada por Howlin\' Wolf (1960). The Doors la versionaron en el álbum homónimo (1967); Jim Morrison es la voz de la tapa, no el autor.',
      curiositiesEs:
        'La ficha de Artes liga el tema al pomo, la jerga y la prohibición — sin pegar la letra. El nombre The Doors (Huxley/Blake) es otra puerta.'
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'wake-up');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    writeFileRetrySync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (back-door-man)');
  }

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
