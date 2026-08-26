'use strict';

const fs = require('fs');
const path = require('path');

const { ROOT } = require('../lib/paths.js');
const OUT = path.join(ROOT, 'content', 'youtube-feed.json');

const CHANNEL_HANDLE = '@InspetorBudGanja';
const CHANNEL_URL = 'https://www.youtube.com/@InspetorBudGanja';
const CHANNEL_NAME = 'Inspetor BudGanja';
const FALLBACK_CHANNEL_ID = 'UCv6U48NA-zeDCRxmegfe7NQ';
const MAX_VIDEOS = 12;
// Fora da listagem /videos (mantém-se no guia se existir).
const EXCLUDED_VIDEO_IDS = new Set(['zwKXgqZMPro']);

function summarize(desc) {
  const line = String(desc || '').replace(/<[^>]+>/g, ' ').split('\n').map((l) => l.trim()).find(Boolean) || '';
  return line.slice(0, 220);
}

async function resolveChannelId() {
  if (process.env.YOUTUBE_CHANNEL_ID) return process.env.YOUTUBE_CHANNEL_ID;
  try {
    const res = await fetch('https://www.youtube.com/' + CHANNEL_HANDLE);
    if (!res.ok) return FALLBACK_CHANNEL_ID;
    const html = await res.text();
    const patterns = [
      /"channelId":"(UC[^"]+)"/,
      /"externalId":"(UC[^"]+)"/,
      /"browseId":"(UC[^"]+)"/
    ];
    for (const re of patterns) {
      const m = html.match(re);
      if (m) return m[1];
    }
  } catch (e) { /* fallback */ }
  return FALLBACK_CHANNEL_ID;
}

function loadPreviousLocaleFields() {
  try {
    const prev = JSON.parse(fs.readFileSync(OUT, 'utf8'));
    const map = new Map();
    (prev.videos || []).forEach((v) => {
      if (!v || !v.id) return;
      map.set(v.id, {
        titleEn: v.titleEn || '',
        titleEs: v.titleEs || '',
        summaryEn: v.summaryEn || '',
        summaryEs: v.summaryEs || ''
      });
    });
    return map;
  } catch (e) {
    return new Map();
  }
}

function loadYoutubeI18nFile() {
  const file = path.join(ROOT, 'content', 'youtube-i18n.json');
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    return {};
  }
}

async function buildFeed() {
  const channelId = await resolveChannelId();
  const res = await fetch('https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId);
  if (!res.ok) throw new Error('RSS YouTube HTTP ' + res.status);
  const xml = await res.text();
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => m[1]);
  const prevLocale = loadPreviousLocaleFields();
  const fileLocale = loadYoutubeI18nFile();
  const videos = entries.map((entry) => {
    const id = (entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1];
    const title = (entry.match(/<title>([^<]+)<\/title>/) || [])[1];
    const published = (entry.match(/<published>([^<]+)<\/published>/) || [])[1];
    const desc = (entry.match(/<media:description>([\s\S]*?)<\/media:description>/) || [])[1] || '';
    const kept = prevLocale.get(id) || {};
    const fromFile = fileLocale[id] || {};
    return {
      id,
      title,
      published,
      summary: summarize(desc),
      url: 'https://www.youtube.com/watch?v=' + id,
      thumb: id ? 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg' : '',
      titleEn: fromFile.titleEn || kept.titleEn || '',
      titleEs: fromFile.titleEs || kept.titleEs || '',
      summaryEn: fromFile.summaryEn || kept.summaryEn || '',
      summaryEs: fromFile.summaryEs || kept.summaryEs || ''
    };
  }).filter((v) => v.id && !EXCLUDED_VIDEO_IDS.has(v.id) && !/transmissão ao vivo/i.test(v.title));

  // Ordem da série: do mais antigo para o mais recente (RSS vem invertido).
  videos.sort(function (a, b) {
    return String(a.published || '').localeCompare(String(b.published || ''));
  });
  const limited = videos.slice(0, MAX_VIDEOS);

  const data = {
    channelId,
    channelUrl: CHANNEL_URL,
    channelName: CHANNEL_NAME,
    updatedAt: new Date().toISOString(),
    videos: limited
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(data, null, 2), 'utf8');
  console.log('youtube-feed.json:', limited.length, 'vídeos (canal', channelId + ')');

  const { persistJsonPayloadToDb } = require('../lib/sync-db-files.js');
  await persistJsonPayloadToDb(ROOT, 'youtube', data);
}

buildFeed().catch((e) => {
  console.warn('Aviso build youtube-feed:', e.message);
  if (fs.existsSync(OUT)) {
    console.warn('Mantendo ficheiro existente.');
    process.exit(0);
  }
  fs.writeFileSync(OUT, JSON.stringify({
    channelId: FALLBACK_CHANNEL_ID,
    channelUrl: CHANNEL_URL,
    channelName: CHANNEL_NAME,
    updatedAt: new Date().toISOString(),
    videos: []
  }, null, 2), 'utf8');
  process.exit(0);
});
