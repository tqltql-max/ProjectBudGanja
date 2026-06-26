function parseYouTubeId(input) {
  const raw = String(input || '').trim();
  if (!raw) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw;

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
  const safeTitle = String(title || 'Vídeo do YouTube').replace(/"/g, '&quot;');
  return (
    '<div class="video-embed">' +
    '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '" ' +
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
