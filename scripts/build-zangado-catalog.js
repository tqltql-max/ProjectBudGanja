'use strict';

/**
 * Catálogo do canal @zangadoreview para a página Games.
 * Uso: node scripts/build-zangado-catalog.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { categorizeTitle, seriesOptionsFromVideos } = require('../lib/zangado-categories.js');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'content', 'channels', 'zangadoreview.json');

const CHANNEL_HANDLE = '@zangadoreview';
const CHANNEL_URL = 'https://www.youtube.com/@zangadoreview';
const CHANNEL_VIDEOS_URL = CHANNEL_URL + '/videos';
const FALLBACK_CHANNEL_ID = 'UCuVIWETFdxzwlHEHMbhm2_w';
const MAX_VIDEOS = 4000;
const PAGE_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 BudGanjaBuild/1.0';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function approxIsoFromRelative(rel, nowMs) {
  const s = String(rel || '').trim().toLowerCase();
  if (!s) return '';
  const now = typeof nowMs === 'number' ? nowMs : Date.now();
  let match = s.match(/(\d+)\s*(second|minute|hour|day|week|month|year)s?\s+ago/);
  if (!match) {
    match = s.match(/h[aá]\s+(\d+)\s+(segundo|minuto|hora|dia|semana|m[eê]s|meses|ano)s?/);
  }
  if (match) {
    const n = Number(match[1]);
    const unit = String(match[2]);
    const ms =
      /second|segundo/.test(unit)
        ? n * 1000
        : /minute|minuto/.test(unit)
          ? n * 60 * 1000
          : /hour|hora/.test(unit)
            ? n * 3600 * 1000
            : /day|dia/.test(unit)
              ? n * 86400 * 1000
              : /week|semana/.test(unit)
                ? n * 7 * 86400 * 1000
                : /month|m[eê]s/.test(unit)
                  ? n * 30.44 * 86400 * 1000
                  : n * 365.25 * 86400 * 1000;
    return new Date(now - ms).toISOString();
  }
  if (/(^| )(a|an|um)\s+(year|ano)s?\s+ago/.test(s) || /h[aá]\s+um\s+ano/.test(s)) {
    return new Date(now - 365.25 * 86400 * 1000).toISOString();
  }
  if (/(^| )(a|an|um)\s+(month|m[eê]s)\s+ago/.test(s) || /h[aá]\s+um\s+m[eê]s/.test(s)) {
    return new Date(now - 30.44 * 86400 * 1000).toISOString();
  }
  return '';
}

function fetchText(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: Object.assign({ 'User-Agent': PAGE_UA, 'Accept-Language': 'pt-BR,pt;q=0.9' }, headers) }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchText(res.headers.location, headers).then(resolve).catch(reject);
          return;
        }
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) resolve(data);
          else reject(new Error('HTTP ' + res.statusCode + ' ' + url));
        });
      })
      .on('error', reject);
  });
}

function fetchJsonPost(url, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'User-Agent': PAGE_UA }
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(e);
            }
          } else {
            reject(new Error('HTTP ' + res.statusCode + ' ' + url));
          }
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function parseRssVideos(xml) {
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => m[1]);
  return entries
    .map((entry) => {
      const id = (entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1];
      const title = (entry.match(/<title>([^<]+)<\/title>/) || [])[1] || '';
      const published = (entry.match(/<published>([^<]+)<\/published>/) || [])[1] || '';
      return {
        id,
        title: title.trim(),
        published,
        url: id ? 'https://www.youtube.com/watch?v=' + id : ''
      };
    })
    .filter((v) => v.id);
}

function parseLockupItem(item) {
  const lock = item.richItemRenderer?.content?.lockupViewModel;
  if (!lock) return null;
  const src = lock.contentImage?.thumbnailViewModel?.image?.sources?.[0]?.url || '';
  const id = (src.match(/\/vi\/([^/]+)\//) || [])[1];
  if (!id) return null;
  const meta = lock.metadata?.lockupMetadataViewModel;
  const title = String(meta?.title?.content || meta?.title?.simpleText || '').trim();
  const parts = meta?.metadata?.contentMetadataViewModel?.metadataRows?.[0]?.metadataParts || [];
  const publishedRelative = parts[1]?.text?.content || '';
  return {
    id,
    title,
    url: 'https://www.youtube.com/watch?v=' + id,
    publishedRelative: publishedRelative || undefined
  };
}

function parseVideoRenderer(item) {
  const r =
    item.richItemRenderer?.content?.videoRenderer ||
    item.gridVideoRenderer ||
    item.videoRenderer;
  if (!r || !r.videoId) return null;
  const title = r.title?.runs?.[0]?.text || r.title?.simpleText || '';
  const publishedRelative = r.publishedTimeText?.simpleText || '';
  return {
    id: r.videoId,
    title: String(title).trim(),
    url: 'https://www.youtube.com/watch?v=' + r.videoId,
    publishedRelative: publishedRelative || undefined
  };
}

function parseAnyVideo(item) {
  return parseLockupItem(item) || parseVideoRenderer(item);
}

function extractVideosTab(data) {
  const tabs = data.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
  const tab =
    tabs.find((t) => String(t.tabRenderer?.title || '').toLowerCase() === 'vídeos') ||
    tabs.find((t) => String(t.tabRenderer?.title || '').toLowerCase() === 'videos') ||
    tabs[1];
  const grid = tab?.tabRenderer?.content?.richGridRenderer?.contents || [];
  const videos = grid.map(parseAnyVideo).filter(Boolean);
  const token =
    grid.find((x) => x.continuationItemRenderer)?.continuationItemRenderer?.continuationEndpoint
      ?.continuationCommand?.token || null;
  return { videos, token };
}

async function fetchAllChannelVideos() {
  const html = await fetchText(CHANNEL_VIDEOS_URL);
  const apiKey = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/)?.[1];
  const clientVersion = html.match(/"INNERTUBE_CONTEXT_CLIENT_VERSION":"([^"]+)"/)?.[1];
  const match = html.match(/var ytInitialData = ({.+?});<\/script>/);
  if (!match) throw new Error('ytInitialData não encontrado');

  const initial = JSON.parse(match[1]);
  let { videos, token } = extractVideosTab(initial);
  const all = [...videos];

  while (token && apiKey && all.length < MAX_VIDEOS) {
    const body = JSON.stringify({
      context: { client: { clientName: 'WEB', clientVersion: clientVersion || '2.20240613.00.00' } },
      continuation: token
    });
    const resp = await fetchJsonPost('https://www.youtube.com/youtubei/v1/browse?key=' + apiKey, body);
    const items =
      resp.onResponseReceivedActions?.[0]?.appendContinuationItemsAction?.continuationItems || [];
    const more = items.map(parseAnyVideo).filter(Boolean);
    token =
      items.find((x) => x.continuationItemRenderer)?.continuationItemRenderer?.continuationEndpoint
        ?.continuationCommand?.token || null;
    if (!more.length) break;
    all.push(...more);
    if (all.length % 120 === 0) console.log('  …', all.length, 'vídeos');
    await sleep(120);
  }

  const seen = new Set();
  return all.filter((v) => {
    if (seen.has(v.id)) return false;
    seen.add(v.id);
    return true;
  });
}

async function resolveChannelId() {
  try {
    const html = await fetchText(CHANNEL_URL);
    const m =
      html.match(/"channelId":"(UC[^"]+)"/) ||
      html.match(/"externalId":"(UC[^"]+)"/) ||
      html.match(/"browseId":"(UC[^"]+)"/);
    if (m) return m[1];
  } catch (e) { /* fallback */ }
  return FALLBACK_CHANNEL_ID;
}

async function buildCatalog() {
  let catalog = {};
  if (fs.existsSync(OUT)) {
    try {
      catalog = JSON.parse(fs.readFileSync(OUT, 'utf8'));
    } catch (e) { /* fresh */ }
  }

  const channelId = await resolveChannelId();
  let pageVideos = [];
  try {
    pageVideos = await fetchAllChannelVideos();
  } catch (e) {
    console.warn('Página /videos falhou:', e.message);
  }
  let rssVideos = [];
  try {
    const xml = await fetchText('https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId);
    rssVideos = parseRssVideos(xml);
  } catch (e) {
    console.warn('RSS indisponível para', channelId + ':', e.message);
  }

  const byId = new Map();
  (catalog.videos || []).forEach((v) => {
    if (v && v.id) byId.set(v.id, v);
  });
  pageVideos.forEach((v, index) => {
    const prev = byId.get(v.id) || {};
    byId.set(v.id, Object.assign({}, prev, v, { pageIndex: index }));
  });
  rssVideos.forEach((v) => {
    const prev = byId.get(v.id) || {};
    byId.set(v.id, Object.assign({}, prev, v, {
      title: v.title || prev.title,
      published: v.published || prev.published
    }));
  });

  let videos = [...byId.values()].map((v) => {
    const title = v.title || v.id;
    const published =
      v.published || approxIsoFromRelative(v.publishedRelative) || '';
    return Object.assign({}, v, {
      title,
      published: published || undefined,
      url: v.url || 'https://www.youtube.com/watch?v=' + v.id,
      thumb: v.thumb || 'https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg',
      category: categorizeTitle(title)
    });
  });

  videos.sort((a, b) => {
    const da = a.published ? Date.parse(a.published) : 0;
    const db = b.published ? Date.parse(b.published) : 0;
    if (da && db && da !== db) return db - da;
    if (da && !db) return -1;
    if (!da && db) return 1;
    const ia = Number.isFinite(a.pageIndex) ? a.pageIndex : 999999;
    const ib = Number.isFinite(b.pageIndex) ? b.pageIndex : 999999;
    if (ia !== ib) return ia - ib;
    return 0;
  });

  videos = videos.map((v, index) => Object.assign({}, v, { pageIndex: index }));

  const next = {
    channelId,
    channelUrl: CHANNEL_URL,
    channelName: 'Zangado',
    handle: CHANNEL_HANDLE,
    inspectedAt: new Date().toISOString(),
    videoCount: videos.length,
    mission:
      'Canal 100% gamer — reviews, sagas e primeira meia hora com método. No BudGanja entra na página Games. Crédito: Thiago / Zangado — sem afiliação.',
    categories: seriesOptionsFromVideos(videos),
    videos
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(next, null, 2) + '\n', 'utf8');
  const counts = {};
  videos.forEach((v) => {
    counts[v.category] = (counts[v.category] || 0) + 1;
  });
  console.log('zangadoreview.json:', videos.length, 'vídeos (canal', channelId + ')');
  console.log('categorias:', JSON.stringify(counts));
}

buildCatalog().catch((e) => {
  console.error('build:zangado falhou:', e.message);
  if (fs.existsSync(OUT)) {
    console.warn('Mantendo catálogo existente.');
    process.exit(0);
  }
  process.exit(1);
});
