const fs = require('fs');
const path = require('path');

const { ROOT } = require('../lib/paths.js');
const {
  CHANNEL_ID,
  CHANNEL_URL,
  CHANNEL_NAME,
  GUIA_SUBTITLE
} = require('../lib/youtube-channel.js');

const ROOT_DIR = ROOT;
const OUT = path.join(ROOT_DIR, 'content', 'guia-cultivo.json');

function summarize(desc) {
  const line = String(desc || '').split('\n').map((l) => l.trim()).find(Boolean) || '';
  return line.slice(0, 200);
}

function chapterIdFromTitle(title, index) {
  const base = String(title || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
  return base || ('video-' + (index + 1));
}

function buildChaptersFromVideos(videos) {
  const sorted = [...videos].sort((a, b) => new Date(a.published) - new Date(b.published));
  return sorted.map((v, i) => ({
    id: chapterIdFromTitle(v.title, i),
    title: v.title,
    description: v.summary || 'Vídeo do canal @InspetorBudGanja.',
    videoIds: [v.id]
  }));
}

fetch('https://www.youtube.com/feeds/videos.xml?channel_id=' + CHANNEL_ID)
  .then((r) => r.text())
  .then((xml) => {
    let existingVideos = {};
    try {
      const existing = JSON.parse(fs.readFileSync(OUT, 'utf8'));
      existingVideos = existing.videos || {};
    } catch (e) { /* first run */ }

    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => m[1]);
    const videos = entries.map((entry) => {
      const id = (entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1];
      const title = (entry.match(/<title>([^<]+)<\/title>/) || [])[1];
      const published = (entry.match(/<published>([^<]+)<\/published>/) || [])[1];
      const desc = (entry.match(/<media:description>([\s\S]*?)<\/media:description>/) || [])[1] || '';
      const prev = existingVideos[id] || {};
      const video = {
        id,
        title,
        published,
        summary: prev.summary || summarize(desc),
        url: 'https://www.youtube.com/watch?v=' + id
      };
      if (prev.customTitle) video.customTitle = prev.customTitle;
      return video;
    }).filter((v) => v.id && !/transmissão ao vivo/i.test(v.title));

    const chapters = buildChaptersFromVideos(videos);

    const data = {
      title: 'Guia de Cultivo Básico',
      subtitle: GUIA_SUBTITLE,
      channelUrl: CHANNEL_URL,
      channelName: CHANNEL_NAME,
      channelId: CHANNEL_ID,
      updatedAt: new Date().toISOString(),
      chapters,
      videos: Object.fromEntries(videos.map((v) => [v.id, v]))
    };

    fs.writeFileSync(OUT, JSON.stringify(data, null, 2), 'utf8');
    console.log('Updated', OUT, '—', videos.length, 'videos,', chapters.length, 'chapters (@InspetorBudGanja)');

    const { persistJsonPayloadToDb } = require('../lib/sync-db-files.js');
    persistJsonPayloadToDb(ROOT_DIR, 'guia', data).then((ok) => {
      if (ok) console.log('Guia gravado na base de dados SQLite');
    }).catch(() => {});

    require('child_process').execSync('node "' + path.join(ROOT_DIR, 'scripts', 'inject-guia-inline.js') + '"', { stdio: 'inherit' });
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
