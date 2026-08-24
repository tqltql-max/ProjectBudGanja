'use strict';

/**
 * Injeta / actualiza «Wake Up» (Artes · RATM) e mete a faixa na rádio.
 * Uso: node scripts/upsert-arte-wake-up.js
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');
const {
  buildWakeUpPost,
  YT,
  YT_ID
} = require('../lib/wake-up-inspecao-post.js');
const { buildKillingInTheNamePost } = require('../lib/killing-in-the-name-inspecao-post.js');
const { buildTheMatrixPost } = require('../lib/artes-inspecoes-posts.js');

const ROOT = path.join(__dirname, '..');
const POSTS_FILE = path.join(ROOT, 'posts.json');
const I18N_FILE = path.join(ROOT, 'content', 'post-i18n.json');
const SUG_FILE = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');
const GUIA_FILE = path.join(ROOT, 'content', 'guia-palavras.json');
const RADIO_DIR = path.join(ROOT, 'radio');
const TOOL_DIR = path.join(os.tmpdir(), 'budganja-ytdlp');
const YT_DLP_EXE = path.join(TOOL_DIR, 'yt-dlp.exe');
const SEARCH_Q = 'Rage Against The Machine Wake Up official audio';

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
  if (/vevo|topic|official audio|official|epic\/legacy|sony/i.test(blob)) return true;
  if (/rage against the machine/i.test(ch) && /wake\s*up/i.test(title)) return true;
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
    return { id: YT_ID, title: 'Rage Against The Machine - Wake Up (Official Audio)', uploader: 'Rage Against The Machine' };
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
    title: permitted.title || 'Wake Up',
    uploader: permitted.uploader || permitted.channel || 'youtube'
  };
}

function sanitizeRadioBase(title, uploader) {
  const raw = String(title || 'Wake Up') + ' - ' + String(uploader || 'youtube') + ' (youtube)';
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
    const found = fs.readdirSync(RADIO_DIR).filter((n) => /wake\s*up/i.test(n) && /\.mp3$/i.test(n));
    if (found[0]) return path.join(RADIO_DIR, found[0]);
    throw new Error('MP3 da rádio não apareceu em radio/');
  }
  return mp3;
}

function rebuildRadioPlaylist() {
  const script = path.join(__dirname, 'build-radio-playlist.js');
  const run = spawnSync(process.execPath, [script], { cwd: ROOT, stdio: 'inherit' });
  if (run.status !== 0) throw new Error('build-radio-playlist falhou');
}

async function main() {
  try {
    spawnSync(process.execPath, [path.join(__dirname, 'generate-wake-up-cover.js')], {
      cwd: ROOT,
      stdio: 'inherit',
      timeout: 45000
    });
  } catch (e) {
    console.warn('Aviso capa:', e.message);
  }

  let radioFile = '';
  try {
    const ytDlp = findYtDlp();
    const hit = searchFirstPublicTrack(ytDlp);
    radioFile = downloadRadioTrack(ytDlp, hit);
    rebuildRadioPlaylist();
    console.log('Rádio:', path.relative(ROOT, radioFile));
  } catch (e) {
    console.warn('Aviso rádio:', e.message);
  }

  const post = buildWakeUpPost();
  const killing = buildKillingInTheNamePost();
  const matrix = buildTheMatrixPost();
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  upsertPost(posts, post);
  upsertPost(posts, killing);
  upsertPost(posts, matrix);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');

  const i18n = JSON.parse(fs.readFileSync(I18N_FILE, 'utf8'));
  writeI18n(i18n, post);
  writeI18n(i18n, killing);
  writeI18n(i18n, matrix);
  fs.writeFileSync(I18N_FILE, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const href = '/posts/post-' + post.slug + '.html';

  if (fs.existsSync(SUG_FILE)) {
    const sug = JSON.parse(fs.readFileSync(SUG_FILE, 'utf8'));
    const items = Array.isArray(sug.items) ? sug.items : [];
    const sugId = 'arte-wake-up';
    const si = items.findIndex((x) => x.id === sugId);
    const entry = {
      id: sugId,
      title: 'Wake Up — RATM e o ofício de acordar',
      titleEn: 'Wake Up — RATM and the craft of waking',
      titleEs: 'Wake Up — RATM y el oficio de despertar',
      tipo: 'arte',
      priority: 2,
      status: 'feita',
      why: 'Canção 1992: acordar contra a máquina × Killing in the Name, Matrix e rádio.',
      whyEn: '1992 song: wake against the machine × Killing in the Name, Matrix and radio.',
      whyEs: 'Canción 1992: despertar contra la máquina × Killing in the Name, Matrix y radio.',
      suggestedSlug: post.slug,
      doneHref: href,
      seriesHint: 'artes-cultura',
      sources: [
        href,
        YT,
        'https://en.wikipedia.org/wiki/Rage_Against_the_Machine_(album)',
        '/posts/post-inspecao-arte-killing-in-the-name.html',
        '/posts/post-inspecao-filme-the-matrix.html',
        '/radio/'
      ],
      notes: 'Obra primeiro (1992); rádio = primeira faixa pública permitida; eco poético ≠ letra RATM.'
    };
    if (si >= 0) items[si] = Object.assign({}, items[si], entry);
    else items.push(entry);
    sug.items = items;
    sug.updatedAt = new Date().toISOString();
    fs.writeFileSync(SUG_FILE, JSON.stringify(sug, null, 2) + '\n', 'utf8');
    console.log('Sugestões actualizadas (arte-wake-up)');
  }

  if (fs.existsSync(GUIA_FILE)) {
    const guia = JSON.parse(fs.readFileSync(GUIA_FILE, 'utf8'));
    const items = Array.isArray(guia.items) ? guia.items : [];
    const entry = {
      id: 'wake-up',
      word: 'Wake Up',
      simple:
        'Canção RATM (1992): acordar contra a máquina; irmã de Killing in the Name; afterlife Matrix; rádio como adaptação.',
      simpleEn:
        'RATM song (1992): wake against the machine; sister of Killing in the Name; Matrix afterlife; radio as adaptation.',
      simpleEs:
        'Canción RATM (1992): despertar contra la máquina; hermana de Killing in the Name; afterlife Matrix; radio como adaptación.',
      group: 'lexico',
      fromTitle: false,
      href,
      history:
        'Wake Up, do Rage Against the Machine (álbum homónimo, 1992, faixa 7), nomeia o acordar contra a máquina. O fecho de The Matrix (1999) é afterlife, não origem.',
      curiosities:
        'A ficha de Artes liga a faixa a Killing in the Name, sonhar/verdade e à rádio — sem colar a letra.',
      historyEn:
        'Wake Up, by Rage Against the Machine (self-titled album, 1992, track 7), names waking against the machine. The Matrix (1999) ending is afterlife, not origin.',
      curiositiesEn:
        'The Arts sheet links the track to Killing in the Name, dream/truth and the radio — without pasting the lyric.',
      historyEs:
        'Wake Up, de Rage Against the Machine (álbum homónimo, 1992, pista 7), nombra el despertar contra la máquina. El cierre de The Matrix (1999) es afterlife, no origen.',
      curiositiesEs:
        'La ficha de Artes liga el tema a Killing in the Name, soñar/verdad y la radio — sin pegar la letra.'
    };
    const gi = items.findIndex((x) => x.id === entry.id);
    if (gi >= 0) items[gi] = Object.assign({}, items[gi], entry);
    else {
      const after = items.findIndex((x) => x.id === 'killing-in-the-name');
      if (after >= 0) items.splice(after + 1, 0, entry);
      else items.push(entry);
    }
    guia.items = items;
    guia.updatedAt = new Date().toISOString();
    fs.writeFileSync(GUIA_FILE, JSON.stringify(guia, null, 2) + '\n', 'utf8');
    console.log('Guia de palavras actualizado (wake-up)');
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
