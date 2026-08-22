'use strict';

/**
 * Catálogo YouTube genérico a partir de URL / @handle.
 * Sync incremental (pára ao ver IDs já no JSON); full crawl a cada 7 dias
 * ou com YOUTUBE_CATALOG_FULL=1.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { ROOT } = require('./paths.js');

const MAX_VIDEOS = 8000;
const OEMBED_DELAY_MS = 80;
const PAGE_DELAY_MS = 160;
/** Vídeos seguidos já no JSON → pára o scroll (canais grandes no build diário). */
const KNOWN_STREAK_STOP = 12;
/** Revarre o arquivo completo para títulos/ordem em falta. */
const FULL_CRAWL_MS = 7 * 24 * 60 * 60 * 1000;
const MIN_VIDEOS_FOR_INCREMENTAL = 20;
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

function fetchJsonPost(url, body, extraHeaders) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: 'POST',
        headers: Object.assign(
          {
            'Content-Type': 'application/json',
            'User-Agent': PAGE_UA,
            Origin: 'https://www.youtube.com',
            Referer: 'https://www.youtube.com/',
            'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8'
          },
          extraHeaders || {}
        )
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

async function fetchJsonPostRetry(url, body, extraHeaders, tries) {
  const max = Number(tries) > 0 ? Number(tries) : 4;
  let lastErr;
  for (let i = 0; i < max; i++) {
    try {
      return await fetchJsonPost(url, body, extraHeaders);
    } catch (e) {
      lastErr = e;
      await sleep(400 * Math.pow(2, i));
    }
  }
  throw lastErr;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function envWantsFullCrawl() {
  const raw = String(process.env.YOUTUBE_CATALOG_FULL || '')
    .trim()
    .toLowerCase();
  return raw === '1' || raw === 'true' || raw === 'yes';
}

/**
 * Full crawl se o catálogo é pequeno, nunca foi varrido, ou passou a janela.
 * YOUTUBE_CATALOG_FULL=1 força; options.fullCrawl sobrescreve o automático.
 */
function wantFullCrawl(prevCatalog, options) {
  options = options || {};
  if (options.fullCrawl === true || envWantsFullCrawl()) return true;
  if (options.fullCrawl === false) return false;
  const existing = (prevCatalog && prevCatalog.videos) || [];
  const n = existing.filter((v) => v && v.id).length;
  if (n < MIN_VIDEOS_FOR_INCREMENTAL) return true;
  const at = (prevCatalog && (prevCatalog.fullCrawledAt || prevCatalog.inspectedAt)) || '';
  const ts = Date.parse(at);
  if (!Number.isFinite(ts)) return true;
  return Date.now() - ts >= FULL_CRAWL_MS;
}

function updateKnownStreak(streak, videos, knownIds) {
  let s = Number(streak) || 0;
  const ids = knownIds instanceof Set ? knownIds : new Set();
  const list = Array.isArray(videos) ? videos : [];
  for (let i = 0; i < list.length; i++) {
    const id = list[i] && list[i].id;
    if (id && ids.has(id)) s += 1;
    else s = 0;
  }
  return s;
}

function approxIsoFromRelative(rel, nowMs) {
  const s = String(rel || '')
    .trim()
    .toLowerCase();
  if (!s) return '';
  const now = typeof nowMs === 'number' ? nowMs : Date.now();
  let match = s.match(/(\d+)\s*(second|minute|hour|day|week|month|year)s?\s+ago/);
  if (!match) {
    match = s.match(/h[aá]\s+(\d+)\s+(segundo|minuto|hora|dia|semana|m[eê]s|meses|ano)s?/);
  }
  if (match) {
    const n = Number(match[1]);
    const unit = String(match[2]);
    const ms = /second|segundo/.test(unit)
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

function videoThumb(id) {
  return id ? 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg' : '';
}

function normalizeScrapedVideo(v) {
  if (!v || !v.id) return null;
  const published = v.published || approxIsoFromRelative(v.publishedRelative) || '';
  return Object.assign({}, v, {
    url: v.url || 'https://www.youtube.com/watch?v=' + v.id,
    thumb: v.thumb || videoThumb(v.id),
    published: published || v.published || undefined
  });
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
  const id =
    (src.match(/\/vi\/([^/]+)\//) || [])[1] ||
    lock.contentId ||
    lock.rendererContext?.commandContext?.onTap?.innertubeCommand?.watchEndpoint?.videoId ||
    '';
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

function parseVideoRenderer(item) {
  const r =
    item.richItemRenderer?.content?.videoRenderer ||
    item.gridVideoRenderer ||
    item.videoRenderer ||
    item.playlistVideoRenderer;
  if (!r || !r.videoId) return null;
  const title = r.title?.runs?.[0]?.text || r.title?.simpleText || '';
  if (isLiveTitle(title)) return null;
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

function continuationToken(items) {
  const list = Array.isArray(items) ? items : [];
  const hit = list.find((x) => x && x.continuationItemRenderer);
  return (
    hit?.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token ||
    hit?.continuationItemRenderer?.button?.buttonRenderer?.command?.continuationCommand?.token ||
    null
  );
}

function continuationItemsFromBrowse(resp) {
  const actions = resp.onResponseReceivedActions || resp.onResponseReceivedEndpoints || [];
  for (let i = 0; i < actions.length; i++) {
    const a = actions[i] || {};
    const items =
      a.appendContinuationItemsAction?.continuationItems ||
      a.reloadContinuationItemsCommand?.continuationItems ||
      [];
    if (items.length) return items;
  }
  return [];
}

function extractVideosTab(data) {
  const tabs = data.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
  const selected = tabs.find((t) => t.tabRenderer?.selected);
  const tab =
    selected ||
    tabs.find((t) => /^v[ií]deos$/i.test(String(t.tabRenderer?.title || '').trim())) ||
    tabs.find((t) => /^shorts$/i.test(String(t.tabRenderer?.title || '').trim())) ||
    tabs.find((t) => t.tabRenderer?.content?.richGridRenderer) ||
    tabs[1];
  const grid = tab?.tabRenderer?.content?.richGridRenderer?.contents || [];
  const videos = grid.map(parseAnyVideo).filter(Boolean);
  return { videos, token: continuationToken(grid) };
}

function extractPlaylistVideos(data) {
  const tabs = data.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
  const contents =
    tabs[0]?.tabRenderer?.content?.sectionListRenderer?.contents ||
    data.contents?.twoColumnBrowseResultsRenderer?.tabs?.[0]?.tabRenderer?.content?.sectionListRenderer
      ?.contents ||
    [];
  let items = [];
  contents.forEach((block) => {
    const inner = block.itemSectionRenderer?.contents || [];
    inner.forEach((c) => {
      const list = c.playlistVideoListRenderer?.contents || [];
      if (list.length) items = items.concat(list);
    });
  });
  const videos = items.map(parseAnyVideo).filter(Boolean);
  return { videos, token: continuationToken(items) };
}

function innertubeClient(html, clientVersion) {
  const visitor = html.match(/"visitorData":"([^"]+)"/)?.[1];
  const client = {
    clientName: 'WEB',
    clientVersion: clientVersion || '2.20240613.00.00',
    hl: 'pt',
    gl: 'BR'
  };
  if (visitor) client.visitorData = visitor;
  return client;
}

function dedupeVideos(list) {
  const seen = new Set();
  return (list || []).filter((v) => {
    if (!v || !v.id || seen.has(v.id)) return false;
    seen.add(v.id);
    return true;
  });
}

async function paginateBrowse(html, token, maxVideos, parseItem, crawlOpts) {
  crawlOpts = crawlOpts || {};
  const cap = Number(maxVideos) > 0 ? Number(maxVideos) : MAX_VIDEOS;
  const apiKey = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/)?.[1];
  const clientVersion = html.match(/"INNERTUBE_CONTEXT_CLIENT_VERSION":"([^"]+)"/)?.[1];
  const client = innertubeClient(html, clientVersion);
  const knownIds = crawlOpts.knownIds instanceof Set ? crawlOpts.knownIds : new Set();
  const stopAfter = Number(crawlOpts.stopAfterKnown) > 0 ? Number(crawlOpts.stopAfterKnown) : 0;
  const all = [];
  let next = token;
  let knownStreak = Number(crawlOpts.knownStreak) || 0;
  let incrementalStop = false;
  while (next && apiKey && all.length < cap) {
    const body = JSON.stringify({
      context: { client },
      continuation: next
    });
    const resp = await fetchJsonPostRetry(
      'https://www.youtube.com/youtubei/v1/browse?key=' + apiKey,
      body
    );
    const items = continuationItemsFromBrowse(resp);
    const more = items.map(parseItem).filter(Boolean);
    next = continuationToken(items);
    if (!more.length) break;
    all.push(...more);
    if (stopAfter && knownIds.size) {
      knownStreak = updateKnownStreak(knownStreak, more, knownIds);
      if (knownStreak >= stopAfter) {
        incrementalStop = true;
        console.log(
          '  sync incremental: ' + all.length + ' nesta aba · parado após ' + knownStreak + ' já no catálogo'
        );
        break;
      }
    }
    if (all.length % 120 === 0) console.log('  …', all.length, 'vídeos');
    await sleep(PAGE_DELAY_MS);
  }
  return { videos: all, incrementalStop, knownStreak };
}

async function fetchAllChannelVideos(channelVideosUrl, options) {
  const opts = typeof options === 'number' ? { maxVideos: options } : options || {};
  const cap = Number(opts.maxVideos) > 0 ? Number(opts.maxVideos) : MAX_VIDEOS;
  const html = await fetchText(channelVideosUrl);
  const match = html.match(/var ytInitialData = ({.+?});<\/script>/);
  if (!match) throw new Error('ytInitialData não encontrado — canal inacessível ou página alterada');

  const initial = JSON.parse(match[1]);
  let { videos, token } = extractVideosTab(initial);
  const knownIds = opts.knownIds instanceof Set ? opts.knownIds : new Set();
  const stopAfter = Number(opts.stopAfterKnown) > 0 ? Number(opts.stopAfterKnown) : 0;
  let knownStreak = stopAfter && knownIds.size ? updateKnownStreak(0, videos, knownIds) : 0;
  let incrementalStop = false;

  if (stopAfter && knownIds.size && knownStreak >= stopAfter) {
    incrementalStop = true;
    console.log(
      '  sync incremental: primeira página basta (' + videos.length + ' vistos, ' + knownStreak + ' já no catálogo)'
    );
  } else {
    const rest = await paginateBrowse(html, token, cap, parseAnyVideo, {
      knownIds,
      stopAfterKnown: stopAfter,
      knownStreak
    });
    videos = videos.concat(rest.videos);
    incrementalStop = rest.incrementalStop;
  }

  return { videos: dedupeVideos(videos).map(normalizeScrapedVideo).filter(Boolean), incrementalStop };
}

async function fetchUploadsPlaylist(channelId, options) {
  const opts = typeof options === 'number' ? { maxVideos: options } : options || {};
  if (!channelId || !/^UC[\w-]{20,}$/.test(channelId)) {
    return { videos: [], incrementalStop: false };
  }
  const playlistId = 'UU' + channelId.slice(2);
  const url = 'https://www.youtube.com/playlist?list=' + playlistId;
  const html = await fetchText(url);
  const match = html.match(/var ytInitialData = ({.+?});<\/script>/);
  if (!match) return { videos: [], incrementalStop: false };
  const initial = JSON.parse(match[1]);
  const { videos, token } = extractPlaylistVideos(initial);
  const rest = await paginateBrowse(html, token, opts.maxVideos, parseAnyVideo, {
    knownIds: opts.knownIds,
    stopAfterKnown: opts.stopAfterKnown
  });
  const all = videos.concat(rest.videos);
  return {
    videos: dedupeVideos(all).map(normalizeScrapedVideo).filter(Boolean),
    incrementalStop: rest.incrementalStop
  };
}

async function fetchRssVideos(channelId) {
  if (!channelId) return [];
  const xml = await fetchText('https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId);
  return parseRssVideos(xml).map(normalizeScrapedVideo).filter(Boolean);
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
  const body = JSON.stringify(catalog, null, 2);
  let lastErr;
  for (let i = 0; i < 4; i++) {
    try {
      fs.writeFileSync(file, body, 'utf8');
      return file;
    } catch (e) {
      lastErr = e;
      const code = e && e.code;
      if (code !== 'EPERM' && code !== 'EBUSY' && code !== 'UNKNOWN' && code !== 'EACCES') throw e;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 80 * (i + 1));
    }
  }
  throw lastErr;
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
  if (options.slug) slug = slugifyHandle(options.slug) || options.slug;
  channelUrl = 'https://www.youtube.com/' + handle;

  const videosUrl = channelUrl + '/videos';
  const prevCatalog = options.mergeExisting === false ? {} : loadExistingCatalog(slug);
  if (!channelName || channelName === channelId) {
    channelName = prevCatalog.channelName || handle;
  }

  const isFull = wantFullCrawl(prevCatalog, options);
  const knownIds = new Set(
    ((prevCatalog.videos || []).map((v) => v && v.id).filter(Boolean))
  );
  const crawlOpts = {
    maxVideos: options.maxVideos,
    knownIds,
    stopAfterKnown: isFull ? 0 : KNOWN_STREAK_STOP
  };
  console.log(isFull ? '  modo: full crawl' : '  modo: incremental');

  const includeShorts = options.includeShorts !== false;
  const [pageRes, rssVideos, shortsRes] = await Promise.all([
    fetchAllChannelVideos(videosUrl, crawlOpts).catch((e) => {
      console.warn('Página /videos falhou:', e.message);
      return { videos: [], incrementalStop: false };
    }),
    fetchRssVideos(channelId).catch((e) => {
      console.warn('RSS indisponível para', channelId + ':', e.message);
      return [];
    }),
    includeShorts
      ? fetchAllChannelVideos(channelUrl + '/shorts', crawlOpts).catch((e) => {
          console.warn('Aba Shorts falhou:', e.message);
          return { videos: [], incrementalStop: false };
        })
      : Promise.resolve({ videos: [], incrementalStop: false })
  ]);

  let pageVideos = pageRes.videos || [];
  const shorts = shortsRes.videos || [];
  if (shorts.length) {
    console.log('Aba Shorts:', shorts.length, 'itens');
    const seen = new Set(pageVideos.map((v) => v.id));
    shorts.forEach((v) => {
      if (!seen.has(v.id)) pageVideos.push(v);
    });
  }

  const incrementalStop = !!(pageRes.incrementalStop || shortsRes.incrementalStop);
  if (!incrementalStop && pageVideos.length < 80) {
    try {
      const playlistRes = await fetchUploadsPlaylist(channelId, crawlOpts);
      if ((playlistRes.videos || []).length > pageVideos.length) {
        console.log('Playlist de uploads:', playlistRes.videos.length, 'vídeos');
        pageVideos = playlistRes.videos;
      }
    } catch (e) {
      console.warn('Playlist de uploads falhou:', e.message);
    }
  }

  const byId = new Map();
  (prevCatalog.videos || []).forEach((v) => {
    if (v && v.id) byId.set(v.id, v);
  });
  pageVideos.forEach((v, index) => {
    const prev = byId.get(v.id) || {};
    const merged = Object.assign({}, prev, v, {
      title: v.title || prev.title,
      published: v.published || prev.published,
      pageIndex: Number.isFinite(v.pageIndex) ? v.pageIndex : index
    });
    byId.set(v.id, normalizeScrapedVideo(merged) || merged);
  });
  (rssVideos || []).forEach((v) => {
    const prev = byId.get(v.id) || {};
    const merged = Object.assign({}, prev, v, {
      title: v.title || prev.title,
      published: v.published || prev.published
    });
    byId.set(v.id, normalizeScrapedVideo(merged) || merged);
  });

  let videos = await enrichMissingTitles([...byId.values()]);
  videos.sort((a, b) => {
    const da = a.published ? Date.parse(a.published) : 0;
    const db = b.published ? Date.parse(b.published) : 0;
    if (da && db && da !== db) return db - da;
    if (da && !db) return -1;
    if (!da && db) return 1;
    const ia = Number.isFinite(a.pageIndex) ? a.pageIndex : 999999;
    const ib = Number.isFinite(b.pageIndex) ? b.pageIndex : 999999;
    if (ia !== ib) return ia - ib;
    return (a.title || '').localeCompare(b.title || '', 'pt-BR');
  });
  videos = videos.map((v, index) => Object.assign({}, v, { pageIndex: index }));

  const cap = Number(options.maxVideos) > 0 ? Number(options.maxVideos) : 0;
  if (cap && videos.length > cap) videos = videos.slice(0, cap);

  if (!videos.length) {
    if ((prevCatalog.videos || []).length) {
      console.warn('Nenhum vídeo novo; a manter o catálogo existente.');
      return { catalog: prevCatalog, slug, path: catalogPath(slug) };
    }
    const err = new Error('Nenhum vídeo encontrado neste canal');
    err.code = 'EMPTY_CATALOG';
    throw err;
  }

  const now = new Date().toISOString();
  const didFull = isFull && !incrementalStop && pageVideos.length > 0;
  const extras = Object.assign({}, options.extras || {});
  const catalog = {
    channelId,
    channelUrl,
    channelName,
    handle
  };
  const kickUrl = extras.kickUrl || prevCatalog.kickUrl;
  const kickHandle = extras.kickHandle || prevCatalog.kickHandle;
  if (kickUrl) catalog.kickUrl = kickUrl;
  if (kickHandle) catalog.kickHandle = kickHandle;
  catalog.inspectedAt = now;
  catalog.fullCrawledAt = didFull ? now : prevCatalog.fullCrawledAt || prevCatalog.inspectedAt || now;
  catalog.videoCount = videos.length;
  catalog.mission = extras.mission || prevCatalog.mission || '';
  if (prevCatalog.partnerCodes || extras.partnerCodes) {
    catalog.partnerCodes = extras.partnerCodes || prevCatalog.partnerCodes;
  }
  Object.keys(prevCatalog).forEach((key) => {
    if (catalog[key] === undefined && key !== 'videos' && extras[key] === undefined) {
      catalog[key] = prevCatalog[key];
    }
  });
  Object.keys(extras).forEach((key) => {
    if (catalog[key] === undefined && key !== 'videos') catalog[key] = extras[key];
  });
  catalog.videos = videos;

  const outPath = catalogPath(slug);
  if (options.persist !== false) saveCatalog(slug, catalog);
  return { catalog, slug, path: outPath, incremental: !didFull };
}

module.exports = {
  parseChannelInput,
  slugifyHandle,
  buildChannelCatalogFromUrl,
  loadExistingCatalog,
  saveCatalog,
  catalogPath,
  wantFullCrawl,
  updateKnownStreak,
  approxIsoFromRelative,
  KNOWN_STREAK_STOP,
  FULL_CRAWL_MS
};
