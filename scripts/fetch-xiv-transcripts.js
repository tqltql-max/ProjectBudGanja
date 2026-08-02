'use strict';

/**
 * Baixa legendas PT das aulas XIV (MovReCam) e grava content/transcripts/xiv/.
 * Uso: node scripts/fetch-xiv-transcripts.js
 */

const fs = require('fs');
const path = require('path');

async function loadYoutubeTranscript() {
  try {
    return require('youtube-transcript');
  } catch (e) {
    console.error('Instala a dependência: npm install youtube-transcript');
    process.exit(1);
  }
}

const {
  TRANSCRIPTS_DIR,
  MANIFEST_FILE,
  aulaNumber,
  shortHeading,
  loadXivVideosFromHub,
  cleanCaptionText,
  ensureDirs
} = require('../lib/xiv-transcript-book.js');

const DELAY_MS = 900;
const LANGS = ['pt', 'pt-BR', 'pt-PT'];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchSegments(YoutubeTranscript, videoId) {
  let lastErr;
  for (let i = 0; i < LANGS.length; i++) {
    try {
      const segments = await YoutubeTranscript.fetchTranscript(videoId, { lang: LANGS[i] });
      if (segments && segments.length) {
        return { segments, lang: LANGS[i] };
      }
    } catch (e) {
      lastErr = e;
    }
  }
  try {
    const segments = await YoutubeTranscript.fetchTranscript(videoId);
    if (segments && segments.length) {
      return { segments, lang: (segments[0] && segments[0].lang) || 'auto' };
    }
  } catch (e) {
    lastErr = e;
  }
  throw lastErr || new Error('Sem legendas');
}

async function main() {
  const { YoutubeTranscript } = await loadYoutubeTranscript();
  ensureDirs();
  const videos = loadXivVideosFromHub();
  if (!videos.length) {
    console.error('Nenhuma aula XIV no videos-hub.json — corre npm run build primeiro.');
    process.exit(1);
  }

  console.log('XIV aulas:', videos.length);
  const chapters = [];

  for (let i = 0; i < videos.length; i++) {
    const v = videos[i];
    const n = aulaNumber(v.title);
    const heading = shortHeading(v.title);
    const rawFile = path.join(TRANSCRIPTS_DIR, String(n).padStart(2, '0') + '-' + v.id + '.json');
    process.stdout.write('[' + (i + 1) + '/' + videos.length + '] Aula ' + n + ' ' + v.id + ' … ');
    try {
      const { segments, lang } = await fetchSegments(YoutubeTranscript, v.id);
      const body = cleanCaptionText(segments);
      const chapter = {
        aulaNumber: n,
        videoId: v.id,
        title: v.title,
        heading,
        url: v.url || 'https://www.youtube.com/watch?v=' + v.id,
        published: v.published || '',
        lang,
        status: 'ok',
        segmentCount: segments.length,
        charCount: body.length,
        body
      };
      fs.writeFileSync(
        rawFile,
        JSON.stringify(
          {
            videoId: v.id,
            title: v.title,
            lang,
            fetchedAt: new Date().toISOString(),
            segments,
            body
          },
          null,
          2
        ) + '\n',
        'utf8'
      );
      chapters.push(chapter);
      console.log('OK', body.length, 'chars ·', lang);
    } catch (e) {
      const msg = (e && e.message) || String(e);
      chapters.push({
        aulaNumber: n,
        videoId: v.id,
        title: v.title,
        heading,
        url: v.url || 'https://www.youtube.com/watch?v=' + v.id,
        published: v.published || '',
        status: 'error',
        error: msg.slice(0, 200),
        body: ''
      });
      console.log('FAIL', msg.slice(0, 100));
    }
    if (i < videos.length - 1) await sleep(DELAY_MS);
  }

  chapters.sort((a, b) => a.aulaNumber - b.aulaNumber);
  const manifest = {
    edition: 'xiv',
    channel: 'movrecam',
    source: 'youtube-captions',
    builtAt: new Date().toISOString(),
    videoCount: videos.length,
    okCount: chapters.filter((c) => c.status === 'ok').length,
    failCount: chapters.filter((c) => c.status !== 'ok').length,
    chapters
  };
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log(
    'Manifest:',
    MANIFEST_FILE,
    '· OK',
    manifest.okCount,
    '/',
    manifest.videoCount
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
