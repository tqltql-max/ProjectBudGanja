'use strict';

/**
 * Hub unificado de vídeos para /videos/ — Inspetor + canais parceiros inspecionados.
 * Expõe só campos públicos (sem e-mails dos catálogos de canal).
 */

const fs = require('fs');
const path = require('path');

const XIV_START = new Date('2026-06-16T00:00:00Z');

const CHANNEL_META = [
  {
    id: 'inspetor',
    label: 'Inspetor BudGanja',
    seriesAliases: ['canal-inspetor', 'inspetor', 'inspetor-budganja'],
    inspectionUrl: null,
    source: 'youtube-feed'
  },
  {
    id: 'movrecam',
    label: 'MovReCam',
    seriesAliases: ['canal-movrecam', 'movrecam'],
    inspectionUrl: '/posts/post-inspecao-canal-movrecam.html',
    catalogRel: path.join('content', 'channels', 'movrecam.json')
  },
  {
    id: 'canabinall',
    label: 'CANABinALL',
    seriesAliases: ['canal-canabinall', 'canabinall'],
    inspectionUrl: '/posts/post-inspecao-canal-canabinall.html',
    catalogRel: path.join('content', 'channels', 'canabinall.json')
  }
];

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    return fallback;
  }
}

function isXivAula(v) {
  const d = v.published ? new Date(v.published) : null;
  if (!d || Number.isNaN(d.getTime()) || d < XIV_START) return false;
  return /\d+ª?\s*Aula|Aula\s+\d+/i.test(String(v.title || ''));
}

function seriesFor(channelId, v) {
  const tags = [];
  if (channelId === 'movrecam' && isXivAula(v)) tags.push('xiv');
  if (channelId === 'canabinall') {
    const t = String(v.title || '');
    if (/plantas?\s*sagradas/i.test(t)) tags.push('plantas-sagradas');
    if (/conceitos?\s*b[aá]sicos/i.test(t)) tags.push('conceitos');
  }
  return tags;
}

function normalizeVideo(v, channelId) {
  const id = String(v.id || '').trim();
  if (!/^[a-zA-Z0-9_-]{11}$/.test(id)) return null;
  return {
    id,
    title: v.title || '',
    titleEn: v.titleEn || '',
    titleEs: v.titleEs || '',
    summary: v.summary || '',
    summaryEn: v.summaryEn || '',
    summaryEs: v.summaryEs || '',
    published: v.published || '',
    url: v.url || 'https://www.youtube.com/watch?v=' + id,
    thumb: v.thumb || 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg',
    channel: channelId,
    series: seriesFor(channelId, v)
  };
}

function sortNewestFirst(list) {
  return list.slice().sort((a, b) => {
    const da = a.published ? new Date(a.published).getTime() : 0;
    const db = b.published ? new Date(b.published).getTime() : 0;
    if (db !== da) return db - da;
    return String(a.title || '').localeCompare(String(b.title || ''), 'pt-BR');
  });
}

function loadInspetorVideos(root, youtubeFeed) {
  const feed =
    youtubeFeed ||
    readJson(path.join(root, 'content', 'youtube-feed.json'), { videos: [] });
  return {
    channelUrl: feed.channelUrl || 'https://www.youtube.com/@InspetorBudGanja',
    channelName: feed.channelName || 'Inspetor BudGanja',
    videos: (feed.videos || [])
      .map((v) => normalizeVideo(v, 'inspetor'))
      .filter(Boolean)
  };
}

function loadCatalogChannel(root, meta) {
  const raw = readJson(path.join(root, meta.catalogRel), null);
  if (!raw) {
    return {
      channelUrl: '',
      channelName: meta.label,
      videos: []
    };
  }
  return {
    channelUrl: raw.channelUrl || '',
    channelName: raw.channelName || meta.label,
    videos: sortNewestFirst(
      (raw.videos || [])
        .map((v) => normalizeVideo(v, meta.id))
        .filter(Boolean)
    )
  };
}

/**
 * @param {string} root
 * @param {{ youtubeFeed?: object } } [opts]
 */
function buildVideosHub(root, opts) {
  const options = opts || {};
  const channels = [];
  const videos = [];
  let updatedAt = new Date().toISOString();

  for (const meta of CHANNEL_META) {
    const loaded =
      meta.source === 'youtube-feed'
        ? loadInspetorVideos(root, options.youtubeFeed)
        : loadCatalogChannel(root, meta);

    if (meta.source === 'youtube-feed' && options.youtubeFeed && options.youtubeFeed.updatedAt) {
      updatedAt = options.youtubeFeed.updatedAt;
    }

    channels.push({
      id: meta.id,
      label: loaded.channelName || meta.label,
      channelUrl: loaded.channelUrl,
      inspectionUrl: meta.inspectionUrl,
      seriesAliases: meta.seriesAliases,
      count: loaded.videos.length
    });
    videos.push.apply(videos, loaded.videos);
  }

  return {
    updatedAt,
    channels,
    videos,
    seriesOptions: [
      {
        id: 'xiv',
        channel: 'movrecam',
        label: 'XIV edição'
      },
      {
        id: 'conceitos',
        channel: 'canabinall',
        label: 'Conceitos básicos'
      },
      {
        id: 'plantas-sagradas',
        channel: 'canabinall',
        label: 'Plantas Sagradas'
      }
    ]
  };
}

function resolveChannelAlias(value) {
  const raw = String(value || '')
    .trim()
    .toLowerCase();
  if (!raw) return '';
  if (raw === 'all' || raw === 'todos') return 'all';
  for (const meta of CHANNEL_META) {
    if (meta.id === raw || (meta.seriesAliases || []).includes(raw)) return meta.id;
  }
  return '';
}

module.exports = {
  CHANNEL_META,
  buildVideosHub,
  resolveChannelAlias,
  isXivAula
};
