function parseYouTubeStartSeconds(input) {
  const raw = String(input || '').trim();
  if (!raw) return null;

  const startParam = raw.match(/[?&]start=(\d+)\b/i);
  if (startParam) return Number(startParam[1]);

  const tParam = raw.match(/[?&]t=([^&#]+)/i);
  if (!tParam) return null;
  const t = decodeURIComponent(tParam[1]).replace(/s$/i, '');
  if (/^\d+$/.test(t)) return Number(t);
  const fancy = t.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?$/i);
  if (!fancy) return null;
  const h = Number(fancy[1] || 0);
  const m = Number(fancy[2] || 0);
  const s = Number(fancy[3] || 0);
  const total = h * 3600 + m * 60 + s;
  return total > 0 ? total : null;
}

function parseYouTubeId(input) {
  const raw = String(input || '').trim();
  if (!raw) return null;
  const bareId = raw.split(/[?&#]/)[0];
  if (/^[a-zA-Z0-9_-]{11}$/.test(bareId)) return bareId;

  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0];
      return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      const fromQuery = url.searchParams.get('v');
      if (fromQuery && /^[a-zA-Z0-9_-]{11}$/.test(fromQuery)) return fromQuery;

      const parts = url.pathname.split('/').filter(Boolean);
      const embedIdx = parts.indexOf('embed');
      if (embedIdx >= 0 && parts[embedIdx + 1]) {
        const id = parts[embedIdx + 1];
        return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
      }
      const shortsIdx = parts.indexOf('shorts');
      if (shortsIdx >= 0 && parts[shortsIdx + 1]) {
        const id = parts[shortsIdx + 1];
        return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
      }
    }
  } catch (e) { /* not a URL */ }

  return null;
}

function renderYouTubeEmbed(videoId, title) {
  const id = parseYouTubeId(videoId);
  if (!id) return '<p class="embed-error">Link do YouTube inválido.</p>';
  const start = parseYouTubeStartSeconds(videoId);
  const startQ = start != null ? '?start=' + start : '';
  const safeTitle = String(title || 'Vídeo do YouTube').replace(/"/g, '&quot;');
  return (
    '<div class="video-embed">' +
    '<iframe src="https://www.youtube-nocookie.com/embed/' + id + startQ + '" ' +
    'title="' + safeTitle + '" loading="lazy" ' +
    'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ' +
    'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' +
    '</div>'
  );
}

function isYouTubeUrl(text) {
  return !!parseYouTubeId(text);
}

function renderYouTubeLine(line) {
  const trimmed = String(line || '').trim();
  const directive = trimmed.match(/^@youtube\s+(.+)$/i);
  if (directive) return renderYouTubeEmbed(directive[1]);

  if (/^https?:\/\//i.test(trimmed) && isYouTubeUrl(trimmed)) {
    return renderYouTubeEmbed(trimmed);
  }

  return null;
}

module.exports = {
  parseYouTubeId,
  parseYouTubeStartSeconds,
  renderYouTubeEmbed,
  isYouTubeUrl,
  renderYouTubeLine
};
