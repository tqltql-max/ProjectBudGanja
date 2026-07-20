'use strict';

/**
 * Catálogo YouTube genérico a partir de URL / @handle.
 * Reutiliza a abordagem dos scrapers build-*-catalog.js.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { ROOT } = require('./paths.js');

const MAX_VIDEOS = 200;
const OEMBED_DELAY_MS = 120;
const PAGE_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 BudGanjaBuild/1.0';

function fetchText(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: Object.assign(
            { 'User-Agent': PAGE_UA, 'Accept-Language': 'pt-BR,pt;q=0.9' },
            headers
          )
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            fetchText(res.headers.location, headers).then(resolve).catch(reject);
            return;
          }
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) resolve(data);
            else reject(new Error('HTTP ' + res.statusCode + ' ' + url));
          });
        }
      )
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
        res.on('data', (chunk) => {
          data += chunk;
        });
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

/**
 * Parse YouTube channel URL or @handle into { handle, channelUrl, slug }.
 */
function parseChannelInput(input) {
  const raw = String(input || '').trim();
  if (!raw) return { error: 'URL ou @handle obrigatório' };

  let handle = '';
  let channelUrl = '';

  if (/^@[\w.-]+$/i.test(raw)) {
    handle = '@' + raw.slice(1);
    channelUrl = 'https://www.youtube.com/' + handle;
  } else {
    let url;
    try {
      url = new URL(raw.startsWith('http') ? raw : 'https://' + raw);
    } catch (e) {
      return { error: 'URL inválida' };
    }
    if (!/(^|\.)youtube\.com$/i.test(url.hostname) && !/^youtu\.be$/i.test(url.hostname)) {
      return { error: 'Só são aceites links do YouTube' };
    }
    const pathParts = url.pathname.split('/').filter(Boolean);
    if (pathParts[0] && pathParts[0].startsWith('@')) {
      handle = '@' + pathParts[0].slice(1).replace(/[^\w.-]/g, '');
    } else if (pathParts[0] === 'channel' && pathParts[1]) {
      // UC… — handle derived later from page; slug from id
      channelUrl = 'https://www.youtube.com/channel/' + pathParts[1];
      return {
        handle: '',
        channelUrl,
        channelIdHint: pathParts[1],
        slug: slugifyHandle(pathParts[1])
      };
    } else if (pathParts[0] === 'c' && pathParts[1]) {
      handle = '@' + pathParts[1].replace(/[^\w.-]/g, '');
    } else if (pathParts[0] === 'user' && pathParts[1]) {
      handle = '@' + pathParts[1].replace(/[^\w.-]/g, '');
    } else {
      return { error: 'Não foi possível identificar o canal na URL' };
    }
    channelUrl = 'https://www.youtube.com/' + handle;
  }

  const slug = slugifyHandle(handle.replace(/^@/, ''));
  if (!slug) return { error: 'Handle do canal inválido' };
  return { handle, channelUrl, slug };
}

function slugifyHandle(s) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

async function resolveChannelId(channelUrl, hintId) {
  if (hintId && /^UC[\w-]{20,}$/.test(hintId)) return hintId;
  const html = await fetchText(channelUrl);
  const patterns = [
    /"channelId":"(UC[^"]+)"/,
    /"externalId":"(UC[^"]+)"/,
    /"browseId":"(UC[^"]+)"/
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1];
  }
  throw new Error('Não foi possível obter o ID do canal');
}

function extractChannelName(html, fallback) {
  const m =
    html.match(/<meta property="og:title" content="([^"]+)"/) ||
    html.match(/"channelMetadataRenderer":\{"title":"([^"]+)"/);
  if (!m) return fallback;
  return String(m[1] || '')
    .replace(/\s*-\s*YouTube\s*$/i, '')
    .trim() || fallback;
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

async function fetchAllChannelVideos(channelVideosUrl) {
  const html = await fetchText(channelVideosUrl);
  const apiKey = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/)?.[1];
  const clientVersion = html.match(/"INNERTUBE_CONTEXT_CLIENT_VERSION":"([^"]+)"/)?.[1];
  const match = html.match(/var ytInitialData = ({.+?});<\/script>/);
  if (!match) throw new Error('ytInitialData não encontrado — canal inacessível ou página alterada');

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

function catalogPath(slug) {
  return path.join(ROOT, 'content', 'channels', slug + '.json');
}

function loadExistingCatalog(slug) {
  const file = catalogPath(slug);
  if (!fs.existsSync(file)) return {};
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    return {};
  }
}

function saveCatalog(slug, catalog) {
  const file = catalogPath(slug);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(catalog, null, 2), 'utf8');
  return file;
}

/**
 * Build and persist a channel catalog from a YouTube URL or @handle.
 * @returns {Promise<{ catalog: object, slug: string, path: string }>}
 */
async function buildChannelCatalogFromUrl(input, options) {
  options = options || {};
  const parsed = parseChannelInput(input);
  if (parsed.error) {
    const err = new Error(parsed.error);
    err.code = 'INVALID_URL';
    throw err;
  }

  let { handle, channelUrl, slug, channelIdHint } = parsed;

  const homeHtml = await fetchText(channelUrl);
  const channelId = await resolveChannelId(channelUrl, channelIdHint);
  let channelName = extractChannelName(homeHtml, handle || channelId);

  if (!handle) {
    const handleMatch = homeHtml.match(/"vanityChannelUrl":"http[^"]*\/(@[\w.-]+)"/);
    if (handleMatch) handle = handleMatch[1];
    else handle = '@' + (slug || channelId);
  }
  if (!slug) slug = slugifyHandle(handle.replace(/^@/, '')) || slugifyHandle(channelId);
  channelUrl = 'https://www.youtube.com/' + handle;

  const videosUrl = channelUrl + '/videos';
  const prevCatalog = options.mergeExisting === false ? {} : loadExistingCatalog(slug);
  if (!channelName || channelName === channelId) {
    channelName = prevCatalog.channelName || handle;
  }

  const [pageVideos, xml] = await Promise.all([
    fetchAllChannelVideos(videosUrl),
    fetchText('https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId)
  ]);
  const rssVideos = parseRssVideos(xml);

  const byId = new Map();
  (prevCatalog.videos || []).forEach((v) => byId.set(v.id, v));
  pageVideos.forEach((v) => {
    const prev = byId.get(v.id) || {};
    byId.set(v.id, Object.assign({}, prev, v));
  });
  rssVideos.forEach((v) => {
    const prev = byId.get(v.id) || {};
    byId.set(
      v.id,
      Object.assign({}, prev, v, {
        title: v.title || prev.title,
        published: v.published || prev.published
      })
    );
  });

  let videos = await enrichMissingTitles([...byId.values()]);
  videos.sort((a, b) => {
    if (a.published && b.published) return new Date(b.published) - new Date(a.published);
    if (a.published) return -1;
    if (b.published) return 1;
    return (a.title || '').localeCompare(b.title || '', 'pt-BR');
  });

  if (!videos.length) {
    const err = new Error('Nenhum vídeo encontrado neste canal');
    err.code = 'EMPTY_CATALOG';
    throw err;
  }

  const catalog = Object.assign({}, prevCatalog, {
    channelId,
    channelUrl,
    channelName,
    handle,
    inspectedAt: new Date().toISOString(),
    videoCount: videos.length,
    mission: prevCatalog.mission || '',
    partnerCodes: prevCatalog.partnerCodes || [],
    videos
  });

  const outPath = saveCatalog(slug, catalog);
  return { catalog, slug, path: outPath };
}

module.exports = {
  parseChannelInput,
  slugifyHandle,
  buildChannelCatalogFromUrl,
  loadExistingCatalog,
  saveCatalog,
  catalogPath
};
