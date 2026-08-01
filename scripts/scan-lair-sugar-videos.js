'use strict';

/**
 * Varredura do canal Dr. Lair Ribeiro Oficial por vídeos sobre
 * açúcar / cana / riscos metabólicos relacionados.
 *
 * Uso: node scripts/scan-lair-sugar-videos.js
 * Saídas:
 *   content/channels/drlairribeirooficiall.json  (catálogo)
 *   content/channels/lair-sugar-hits.json         (hits filtrados)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { ROOT } = require('../lib/paths.js');

const CHANNEL_HANDLE = '@DrLairRibeiroOficiall';
const CHANNEL_ID = 'UCk9mgpQVdJ5oKQWkM1UPBaQ';
const CHANNEL_URL = 'https://www.youtube.com/' + CHANNEL_HANDLE;
const MAX_VIDEOS = 2500;
const PAGE_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 BudGanjaScan/1.0';

const SEARCH_QUERIES = [
  'açúcar',
  'acucar',
  'cana',
  'cana-de-açúcar',
  'sacarose',
  'frutose',
  'glicose',
  'diabetes',
  'insulina',
  'refrigerante',
  'refrigerantes',
  'adoçante',
  'adocante',
  'metabólico',
  'metabolico',
  'obesidade',
  'açúcar refinado',
  'açúcar branco',
  'xarope',
  'melaço',
  'caldo de cana'
];

const HIT_RE =
  /a[cç][uú]car|cana(?:[\s-]?de[\s-]?a[cç][uú]car)?|sacarose|frutose|glicose|diabet|insulin|refrigerante|ado[cç]ante|metab[oó]lic|obesidade|xarope|mela[cç]o|sacar|glicemia|hiperglic|soda|soft\s*drink|sugar|fructose|sucrose/i;

const PAGE_UA_HEADERS = {
  'User-Agent': PAGE_UA,
  'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8'
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: PAGE_UA_HEADERS }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchText(res.headers.location).then(resolve).catch(reject);
          return;
        }
        let data = '';
        res.on('data', (c) => (data += c));
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
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': PAGE_UA,
          'Accept-Language': 'pt-BR,pt;q=0.9'
        }
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(e);
            }
          } else reject(new Error('HTTP ' + res.statusCode + ' ' + url));
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function isLiveTitle(title) {
  return /^\s*(ao\s*vivo|live|estreando|streaming)\b/i.test(String(title || ''));
}

function parseLockupItem(item) {
  const lock = item.richItemRenderer?.content?.lockupViewModel;
  if (!lock) {
    // fallback videoRenderer (search)
    const vr = item.richItemRenderer?.content?.videoRenderer || item.videoRenderer;
    if (!vr) return null;
    const id = vr.videoId;
    const title = String(
      vr.title?.runs?.map((r) => r.text).join('') || vr.title?.simpleText || ''
    ).trim();
    if (!id || isLiveTitle(title)) return null;
    return {
      id,
      title,
      url: 'https://www.youtube.com/watch?v=' + id
    };
  }

  const src = lock.contentImage?.thumbnailViewModel?.image?.sources?.[0]?.url || '';
  const id = (src.match(/\/vi\/([^/]+)\//) || [])[1];
  if (!id) return null;
  const meta = lock.metadata?.lockupMetadataViewModel;
  const title = String(meta?.title?.content || meta?.title?.simpleText || '').trim();
  if (isLiveTitle(title)) return null;
  const parts = meta?.metadata?.contentMetadataViewModel?.metadataRows?.[0]?.metadataParts || [];
  return {
    id,
    title,
    url: 'https://www.youtube.com/watch?v=' + id,
    views: parts[0]?.text?.content || undefined,
    publishedRelative: parts[1]?.text?.content || undefined
  };
}

function walkCollectVideoRenderers(node, acc) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    node.forEach((n) => walkCollectVideoRenderers(n, acc));
    return;
  }
  if (node.videoRenderer?.videoId) {
    const vr = node.videoRenderer;
    const title = String(
      vr.title?.runs?.map((r) => r.text).join('') || vr.title?.simpleText || ''
    ).trim();
    if (!isLiveTitle(title)) {
      acc.push({
        id: vr.videoId,
        title,
        url: 'https://www.youtube.com/watch?v=' + vr.videoId
      });
    }
  }
  if (node.lockupViewModel) {
    const fake = { richItemRenderer: { content: { lockupViewModel: node.lockupViewModel } } };
    const parsed = parseLockupItem(fake);
    if (parsed) acc.push(parsed);
  }
  Object.keys(node).forEach((k) => {
    if (k === 'videoRenderer' || k === 'lockupViewModel') return;
    walkCollectVideoRenderers(node[k], acc);
  });
}

function extractVideosTab(data) {
  const tabs = data.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
  const tab =
    tabs.find((t) => /v[ií]deos/i.test(String(t.tabRenderer?.title || ''))) || tabs[1];
  const grid = tab?.tabRenderer?.content?.richGridRenderer?.contents || [];
  const videos = grid.map(parseLockupItem).filter(Boolean);
  const token =
    grid.find((x) => x.continuationItemRenderer)?.continuationItemRenderer?.continuationEndpoint
      ?.continuationCommand?.token || null;
  return { videos, token };
}

async function fetchAllChannelVideos() {
  const html = await fetchText(CHANNEL_URL + '/videos');
  const apiKey = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/)?.[1];
  const clientVersion = html.match(/"INNERTUBE_CONTEXT_CLIENT_VERSION":"([^"]+)"/)?.[1];
  const match = html.match(/var ytInitialData = ({.+?});<\/script>/);
  if (!match) throw new Error('ytInitialData não encontrado');

  const initial = JSON.parse(match[1]);
  let { videos, token } = extractVideosTab(initial);
  const all = [...videos];
  console.log('Página inicial:', all.length, 'vídeos · apiKey', apiKey ? 'ok' : 'missing');

  let page = 1;
  while (token && apiKey && all.length < MAX_VIDEOS) {
    page += 1;
    const body = JSON.stringify({
      context: {
        client: { clientName: 'WEB', clientVersion: clientVersion || '2.20240613.00.00' }
      },
      continuation: token
    });
    const resp = await fetchJsonPost(
      'https://www.youtube.com/youtubei/v1/browse?key=' + apiKey,
      body
    );
    const items =
      resp.onResponseReceivedActions?.[0]?.appendContinuationItemsAction?.continuationItems ||
      resp.onResponseReceivedEndpoints?.[0]?.appendContinuationItemsAction?.continuationItems ||
      [];
    const more = items.map(parseLockupItem).filter(Boolean);
    token =
      items.find((x) => x.continuationItemRenderer)?.continuationItemRenderer?.continuationEndpoint
        ?.continuationCommand?.token || null;
    if (!more.length) {
      console.log('Página', page, '— sem novos itens; fim.');
      break;
    }
    all.push(...more);
    if (page % 5 === 0 || !token) {
      console.log('Página', page, '· total', all.length, token ? '(continua)' : '(fim)');
    }
    await sleep(80);
  }

  return { all, apiKey, clientVersion, html };
}

async function searchChannel(query, apiKey, clientVersion) {
  const url =
    CHANNEL_URL + '/search?query=' + encodeURIComponent(query);
  try {
    const html = await fetchText(url);
    const match = html.match(/var ytInitialData = ({.+?});<\/script>/);
    const key = apiKey || html.match(/"INNERTUBE_API_KEY":"([^"]+)"/)?.[1];
    const ver =
      clientVersion || html.match(/"INNERTUBE_CONTEXT_CLIENT_VERSION":"([^"]+)"/)?.[1];
    const acc = [];
    if (match) {
      const data = JSON.parse(match[1]);
      walkCollectVideoRenderers(data, acc);
    }

    // Tentativa innertube search com restricção ao canal
    if (key) {
      const body = JSON.stringify({
        context: {
          client: { clientName: 'WEB', clientVersion: ver || '2.20240613.00.00' }
        },
        query: query,
        params: Buffer.from('\x12\x08' + 'EgZzZWFyY2g%3D', 'utf8').toString('base64') // may fail; also try channel scoped via browse
      });
      try {
        // Channel search continuation via browse params is brittle; rely on HTML walk + site search page
        void body;
      } catch (e) {
        /* ignore */
      }
    }

    const seen = new Set();
    return acc.filter((v) => {
      if (!v.id || seen.has(v.id)) return false;
      seen.add(v.id);
      return true;
    });
  } catch (e) {
    console.warn('search fail', query, e.message);
    return [];
  }
}

function scoreHit(title) {
  const t = String(title || '').toLowerCase();
  let score = 0;
  if (/a[cç][uú]car/.test(t)) score += 5;
  if (/cana/.test(t)) score += 4;
  if (/sacarose|frutose|glicose/.test(t)) score += 3;
  if (/diabet|insulin|glicemia/.test(t)) score += 3;
  if (/refrigerante|ado[cç]ante|xarope|mela[cç]o/.test(t)) score += 2;
  if (/metab[oó]lic|obesidade/.test(t)) score += 1;
  if (/sugar|fructose|sucrose/.test(t)) score += 3;
  return score;
}

function classifyHit(title) {
  const t = String(title || '');
  const tags = [];
  if (/a[cç][uú]car/i.test(t)) tags.push('açúcar');
  if (/cana/i.test(t)) tags.push('cana');
  if (/sacarose|frutose|glicose|glicemia/i.test(t)) tags.push('açúcar-simples');
  if (/diabet|insulin/i.test(t)) tags.push('diabetes-insulina');
  if (/refrigerante|soda|soft\s*drink/i.test(t)) tags.push('refrigerante');
  if (/ado[cç]ante/i.test(t)) tags.push('adoçante');
  if (/metab[oó]lic|obesidade/i.test(t)) tags.push('metabólico');
  if (/xarope|mela[cç]o/i.test(t)) tags.push('xarope-melaço');
  return tags;
}

async function main() {
  console.log('=== Scan Lair Ribeiro · açúcar / cana / riscos ===');
  console.log('Canal:', CHANNEL_URL, CHANNEL_ID);

  const { all, apiKey, clientVersion } = await fetchAllChannelVideos();
  const byId = new Map();
  all.forEach((v) => byId.set(v.id, v));
  console.log('Catálogo /videos:', byId.size);

  for (const q of SEARCH_QUERIES) {
    process.stdout.write('Search «' + q + '»… ');
    const found = await searchChannel(q, apiKey, clientVersion);
    let added = 0;
    found.forEach((v) => {
      if (!byId.has(v.id)) {
        byId.set(v.id, v);
        added += 1;
      } else if (v.title && (!byId.get(v.id).title || byId.get(v.id).title.length < 4)) {
        byId.set(v.id, Object.assign({}, byId.get(v.id), { title: v.title }));
      }
    });
    console.log(found.length, 'resultados · +' + added + ' novos');
    await sleep(200);
  }

  // RSS recentes
  try {
    const xml = await fetchText(
      'https://www.youtube.com/feeds/videos.xml?channel_id=' + CHANNEL_ID
    );
    const entries = xml.split('<entry>').slice(1);
    entries.forEach((entry) => {
      const id = (entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1];
      const title = (entry.match(/<title>([^<]+)<\/title>/) || [])[1] || '';
      const published = (entry.match(/<published>([^<]+)<\/published>/) || [])[1] || '';
      if (!id) return;
      const prev = byId.get(id) || {};
      byId.set(
        id,
        Object.assign({}, prev, {
          id,
          title: title.trim() || prev.title,
          published: published || prev.published,
          url: 'https://www.youtube.com/watch?v=' + id
        })
      );
    });
  } catch (e) {
    console.warn('RSS:', e.message);
  }

  const videos = [...byId.values()].sort((a, b) =>
    String(a.title || '').localeCompare(String(b.title || ''), 'pt-BR')
  );

  const hits = videos
    .filter((v) => HIT_RE.test(v.title || ''))
    .map((v) =>
      Object.assign({}, v, {
        score: scoreHit(v.title),
        tags: classifyHit(v.title)
      })
    )
    .sort((a, b) => b.score - a.score || String(a.title).localeCompare(String(b.title), 'pt-BR'));

  const outDir = path.join(ROOT, 'content', 'channels');
  fs.mkdirSync(outDir, { recursive: true });

  const catalog = {
    channelId: CHANNEL_ID,
    channelUrl: CHANNEL_URL,
    channelName: 'Dr. Lair Ribeiro Oficial',
    handle: CHANNEL_HANDLE,
    inspectedAt: new Date().toISOString(),
    videoCount: videos.length,
    scan: 'lair-sugar-cana',
    videos
  };
  const catalogPath = path.join(outDir, 'drlairribeirooficiall.json');
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n', 'utf8');

  const hitsDoc = {
    channelId: CHANNEL_ID,
    handle: CHANNEL_HANDLE,
    scannedAt: new Date().toISOString(),
    catalogVideoCount: videos.length,
    hitCount: hits.length,
    method:
      'Paginação completa da aba /videos + buscas no canal por palavras-chave (açúcar, cana, diabetes, etc.) + RSS. Filtro por título.',
    queries: SEARCH_QUERIES,
    hits
  };
  const hitsPath = path.join(outDir, 'lair-sugar-hits.json');
  fs.writeFileSync(hitsPath, JSON.stringify(hitsDoc, null, 2) + '\n', 'utf8');

  console.log('\n=== RESULTADO ===');
  console.log('Total vídeos catalogados:', videos.length);
  console.log('Hits açúcar/cana/riscos:', hits.length);
  console.log('Catálogo:', path.relative(ROOT, catalogPath));
  console.log('Hits:', path.relative(ROOT, hitsPath));
  console.log('\nTop hits:');
  hits.slice(0, 40).forEach((h, i) => {
    console.log(
      String(i + 1).padStart(2) + '.',
      '[' + h.score + ']',
      h.tags.join(','),
      '|',
      h.title,
      '|',
      h.id
    );
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
