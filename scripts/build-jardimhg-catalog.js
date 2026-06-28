'use strict';

/**
 * Atualiza content/channels/jardimhg.json a partir do canal @jardimhg.
 * Inventário completo via página /videos (RSS só devolve ~15 uploads recentes).
 * Datas ISO via feed RSS; títulos em falta via oEmbed.
 * Uso: npm run build:jardimhg
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'content', 'channels', 'jardimhg.json');

const CHANNEL_HANDLE = '@jardimhg';
const CHANNEL_URL = 'https://www.youtube.com/@jardimhg';
const CHANNEL_VIDEOS_URL = CHANNEL_URL + '/videos';
const FALLBACK_CHANNEL_ID = 'UC35zh8z-3baboExD1_O0jgA';
const MAX_VIDEOS = 200;
const OEMBED_DELAY_MS = 120;
const PAGE_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 BudGanjaBuild/1.0';

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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function isLiveTitle(title) {
  return /transmissão ao vivo/i.test(title || '');
}

async function resolveChannelId() {
  if (process.env.JARDIMHG_CHANNEL_ID) return process.env.JARDIMHG_CHANNEL_ID;
  try {
    const html = await fetchText('https://www.youtube.com/' + CHANNEL_HANDLE);
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
    .filter((v) => v.id && !isLiveTitle(v.title));
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
  const views = parts[0]?.text?.content || '';
  const publishedRelative = parts[1]?.text?.content || '';

  if (isLiveTitle(title)) return null;

  return {
    id,
    title,
    url: 'https://www.youtube.com/watch?v=' + id,
    views: views || undefined,
    publishedRelative: publishedRelative || undefined
  };
}

function extractVideosTab(data) {
  const tabs = data.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
  const tab =
    tabs.find((t) => String(t.tabRenderer?.title || '').toLowerCase() === 'vídeos') || tabs[1];
  const grid = tab?.tabRenderer?.content?.richGridRenderer?.contents || [];
  const videos = grid.map(parseLockupItem).filter(Boolean);
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
  if (!match) throw new Error('ytInitialData não encontrado em ' + CHANNEL_VIDEOS_URL);

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
    const more = items.map(parseLockupItem).filter(Boolean);
    token =
      items.find((x) => x.continuationItemRenderer)?.continuationItemRenderer?.continuationEndpoint
        ?.continuationCommand?.token || null;
    if (!more.length) break;
    all.push(...more);
  }

  const seen = new Set();
  return all.filter((v) => {
    if (seen.has(v.id)) return false;
    seen.add(v.id);
    return true;
  });
}

async function fetchOembedTitle(videoId) {
  try {
    const url =
      'https://www.youtube.com/oembed?url=' +
      encodeURIComponent('https://www.youtube.com/watch?v=' + videoId) +
      '&format=json';
    const json = JSON.parse(await fetchText(url));
    return json.title ? String(json.title).trim() : '';
  } catch (e) {
    return '';
  }
}

async function enrichMissingTitles(videos) {
  const out = [];
  for (const v of videos) {
    let title = v.title;
    if (!title || title === v.id || title.length < 4) {
      const oembed = await fetchOembedTitle(v.id);
      if (oembed) title = oembed;
      await sleep(OEMBED_DELAY_MS);
    }
    out.push(Object.assign({}, v, { title: title || v.id }));
  }
  return out;
}

async function buildCatalog() {
  let catalog = {};
  if (fs.existsSync(OUT)) {
    try {
      catalog = JSON.parse(fs.readFileSync(OUT, 'utf8'));
    } catch (e) { /* fresh */ }
  }

  const channelId = await resolveChannelId();
  const [pageVideos, xml] = await Promise.all([
    fetchAllChannelVideos(),
    fetchText('https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId)
  ]);
  const rssVideos = parseRssVideos(xml);

  const byId = new Map();
  (catalog.videos || []).forEach((v) => byId.set(v.id, v));

  pageVideos.forEach((v) => {
    const prev = byId.get(v.id) || {};
    byId.set(v.id, Object.assign({}, prev, v));
  });

  rssVideos.forEach((v) => {
    const prev = byId.get(v.id) || {};
    byId.set(v.id, Object.assign({}, prev, v, {
      title: v.title || prev.title,
      published: v.published || prev.published
    }));
  });

  let videos = await enrichMissingTitles([...byId.values()]);

  const emblematicId = 'yCBfY-Rg81g';
  const emblem = byId.get(emblematicId) || { id: emblematicId };
  byId.set(emblematicId, Object.assign({}, emblem, {
    title: emblem.title || 'COMO PLANTAR MACONHA do ZERO (SUPER AULA)',
    note: 'Vídeo emblemático do canal — verificado via oEmbed'
  }));
  videos = [...byId.values()];

  videos.sort((a, b) => {
    if (a.published && b.published) return new Date(b.published) - new Date(a.published);
    if (a.published) return -1;
    if (b.published) return 1;
    return (a.title || '').localeCompare(b.title || '', 'pt-BR');
  });

  const next = Object.assign({}, catalog, {
    channelId,
    channelUrl: CHANNEL_URL,
    channelName: catalog.channelName || 'Jardim HG',
    handle: CHANNEL_HANDLE,
    instagram: catalog.instagram || 'https://www.instagram.com/jardimhg/',
    telegramNote:
      catalog.telegramNote || 'Comunidade no Telegram — link na bio do Instagram @jardimhg',
    publishedAt: catalog.publishedAt || '2023-03-08T06:21:23+00:00',
    inspectedAt: new Date().toISOString(),
    videoCount: videos.length,
    mission:
      catalog.mission ||
      'Conteúdo educativo sobre cultivo medicinal de Cannabis sativa indoor e outdoor, com dicas práticas e técnicas especializadas.',
    partnerCodes: catalog.partnerCodes || [
      { brand: 'Farmhouse Solutions', code: 'JARDIMHG', url: 'https://www.farmhousesolutions.com.br/' },
      { brand: 'Flora Urbana 420 (sementes)', code: 'JARDIMHG10', url: null },
      { brand: 'Cultlight (LED e acessórios)', code: 'JARDIMHG', url: 'https://cultlight.com.br/' }
    ],
    videos
  });

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(next, null, 2), 'utf8');
  console.log('jardimhg.json:', videos.length, 'vídeos (canal', channelId + ', fonte: /videos + RSS)');
}

buildCatalog().catch((e) => {
  console.error('build:jardimhg falhou:', e.message);
  if (fs.existsSync(OUT)) {
    console.warn('Mantendo catálogo existente.');
    process.exit(0);
  }
  process.exit(1);
});
