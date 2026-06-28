(function () {
  'use strict';

  function formatDate(iso) {
    if (!iso) return '';
    try {
      return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
      return iso;
    }
  }

  function renderVideos(container, feed) {
    var videos = (feed && feed.videos) || [];
    if (!videos.length) {
      container.innerHTML =
        '<div class="empty-state">' +
        '<p class="empty-message">Não foi possível carregar os vídeos agora.</p>' +
        '<a href="https://www.youtube.com/@InspetorBudGanja" class="botao botao-home" target="_blank" rel="noopener noreferrer">Abrir canal no YouTube</a>' +
        '</div>';
      return;
    }

    container.innerHTML = videos.map(function (v) {
      return (
        '<article class="video-card card">' +
        '<a href="' + v.url + '" target="_blank" rel="noopener noreferrer" class="video-card-link">' +
        (v.thumb ? '<img src="' + v.thumb + '" alt="" class="video-card-thumb" loading="lazy">' : '') +
        '<div class="video-card-body">' +
        '<h2 class="video-card-title">' + escapeHtml(v.title) + '</h2>' +
        (v.summary ? '<p class="video-card-summary">' + escapeHtml(v.summary) + '</p>' : '') +
        '<span class="video-card-date">' + escapeHtml(formatDate(v.published)) + '</span>' +
        '</div></a></article>'
      );
    }).join('');

    injectVideoJsonLd(videos);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  function injectVideoJsonLd(videos) {
    if (document.getElementById('jsonld-videos')) return;
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'jsonld-videos';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: videos.slice(0, 8).map(function (v, i) {
        return {
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'VideoObject',
            name: v.title,
            description: v.summary || '',
            thumbnailUrl: v.thumb,
            uploadDate: v.published,
            url: v.url
          }
        };
      })
    });
    document.head.appendChild(script);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('videos-grid');
    var channelLink = document.getElementById('videos-channel-link');
    if (!grid) return;

    fetch('/api/youtube-feed')
      .catch(function () { return fetch('content/youtube-feed.json'); })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (feed) {
        if (channelLink && feed && feed.channelUrl) {
          channelLink.href = feed.channelUrl;
          channelLink.textContent = '▶ ' + (feed.channelName || 'Canal YouTube');
        }
        renderVideos(grid, feed);
      })
      .catch(function () {
        renderVideos(grid, null);
      });
  });
})();
