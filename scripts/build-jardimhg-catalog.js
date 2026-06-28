'use strict';

/**
 * Atualiza content/channels/jardimhg.json a partir do RSS do canal @jardimhg.
 * Enriquece títulos via oEmbed quando necessário. Self-contained (sem JSON temp).
 * Uso: npm run build:jardimhg
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'content', 'channels', 'jardimhg.json');

const CHANNEL_HANDLE = '@jardimhg';
const CHANNEL_URL = 'https://www.youtube.com/@jardimhg';
const FALLBACK_CHANNEL_ID = 'UC35zh8z-3baboExD1_O0jgA';
const MAX_VIDEOS = 80;
const OEMBED_DELAY_MS = 120;

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'BudGanjaBuild/1.0' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchText(res.headers.location).then(resolve).catch(reject);
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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
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
    .filter((v) => v.id && !/transmissão ao vivo/i.test(v.title));
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

async function enrichVideos(videos) {
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
  const channelId = await resolveChannelId();
  const xml = await fetchText('https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId);
  let videos = parseRssVideos(xml).slice(0, MAX_VIDEOS);
  videos = await enrichVideos(videos);

  const emblematicId = 'yCBfY-Rg81g';
  const emblemIdx = videos.findIndex((v) => v.id === emblematicId);
  if (emblemIdx >= 0) {
    videos[emblemIdx] = Object.assign({}, videos[emblemIdx], {
      title: videos[emblemIdx].title || 'COMO PLANTAR MACONHA do ZERO (SUPER AULA)',
      note: 'Vídeo emblemático do canal — verificado via oEmbed'
    });
  }

  videos.sort((a, b) => {
    if (a.published && b.published) return new Date(b.published) - new Date(a.published);
    return (a.title || '').localeCompare(b.title || '', 'pt-BR');
  });

  let catalog = {};
  if (fs.existsSync(OUT)) {
    try {
      catalog = JSON.parse(fs.readFileSync(OUT, 'utf8'));
    } catch (e) { /* fresh */ }
  }

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
  console.log('jardimhg.json:', videos.length, 'vídeos (canal', channelId + ')');
}

buildCatalog().catch((e) => {
  console.error('build:jardimhg falhou:', e.message);
  if (fs.existsSync(OUT)) {
    console.warn('Mantendo catálogo existente.');
    process.exit(0);
  }
  process.exit(1);
});
