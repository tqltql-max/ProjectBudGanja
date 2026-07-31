(function () {
  'use strict';

  function i18n(key, fallback) {
    return window.BudGanjaI18n ? window.BudGanjaI18n.t(key, fallback) : (fallback || '');
  }

  function videoLocale() {
    return (window.BudGanjaI18n && window.BudGanjaI18n.getLocale()) || 'pt-BR';
  }

  function formatDate(iso) {
    if (!iso) return '';
    try {
      return new Date(iso).toLocaleDateString(videoLocale(), { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
      return iso;
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  function localizedField(v, field) {
    var loc = videoLocale();
    if (loc === 'en' && v[field + 'En']) return v[field + 'En'];
    if (loc === 'es' && v[field + 'Es']) return v[field + 'Es'];
    return v[field] || '';
  }

  function isValidVideoId(id) {
    return /^[a-zA-Z0-9_-]{11}$/.test(String(id || ''));
  }

  function videoThumb(v) {
    if (!v) return '';
    if (v.thumb) return String(v.thumb);
    if (isValidVideoId(v.id)) return 'https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg';
    return '';
  }

  function readRequestedId() {
    try {
      var params = new URLSearchParams(window.location.search);
      var fromQuery = params.get('v');
      if (isValidVideoId(fromQuery)) return fromQuery;
    } catch (e) { /* ignore */ }

    var hash = String(window.location.hash || '').replace(/^#/, '');
    if (hash.indexOf('v=') === 0) hash = hash.slice(2);
    if (hash.indexOf('video-') === 0) hash = hash.slice(6);
    return isValidVideoId(hash) ? hash : '';
  }

  function setUrlForVideo(id, replace) {
    if (!isValidVideoId(id)) return;
    var next = '#' + id;
    if (window.location.hash === next) return;
    if (replace) history.replaceState(null, '', next);
    else history.pushState(null, '', next);
  }

  function embedSrc(id, autoplay) {
    var src =
      'https://www.youtube-nocookie.com/embed/' +
      encodeURIComponent(id) +
      '?rel=0&modestbranding=1&playsinline=1';
    try {
      src += '&origin=' + encodeURIComponent(window.location.origin);
    } catch (e) { /* ignore */ }
    if (autoplay) src += '&autoplay=1';
    return src;
  }

  function renderEmbed(id, title, autoplay) {
    var safeTitle = escapeHtml(title || i18n('pages.videos.nowPlaying', 'Vídeo do YouTube'));
    return (
      '<div class="video-embed">' +
      '<iframe src="' +
      escapeHtml(embedSrc(id, autoplay)) +
      '" title="' +
      safeTitle +
      '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ' +
      'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' +
      '</div>'
    );
  }

  var cachedFeed = null;
  var selectedId = '';
  var playerEl = null;
  var gridEl = null;

  function findVideo(videos, id) {
    for (var i = 0; i < videos.length; i++) {
      if (videos[i].id === id) return videos[i];
    }
    return null;
  }

  function syncActiveCards() {
    if (!gridEl) return;
    var cards = gridEl.querySelectorAll('.video-card');
    for (var i = 0; i < cards.length; i++) {
      var active = cards[i].getAttribute('data-video-id') === selectedId;
      cards[i].classList.toggle('is-active', active);
      var btn = cards[i].querySelector('.video-card-link');
      if (btn) btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    }
  }

  function updatePlayer(video, autoplay) {
    if (!playerEl || !video || !isValidVideoId(video.id)) return;
    selectedId = video.id;
    var title = localizedField(video, 'title');
    var summary = localizedField(video, 'summary');

    playerEl.hidden = false;
    playerEl.innerHTML =
      renderEmbed(video.id, title, !!autoplay) +
      '<div class="videos-player-meta">' +
      '<h2 class="videos-player-title">' +
      escapeHtml(title) +
      '</h2>' +
      (summary ? '<p class="videos-player-summary">' + escapeHtml(summary) + '</p>' : '') +
      '<p class="videos-player-actions">' +
      '<time datetime="' +
      escapeHtml(video.published || '') +
      '">' +
      escapeHtml(formatDate(video.published)) +
      '</time>' +
      ' · <a href="' +
      escapeHtml(video.url) +
      '" target="_blank" rel="noopener noreferrer">' +
      escapeHtml(i18n('pages.videos.openOnYoutube', 'Abrir no YouTube')) +
      '</a>' +
      '</p>' +
      '</div>';

    syncActiveCards();
  }

  function renderVideos(player, grid, feed) {
    cachedFeed = feed;
    playerEl = player;
    gridEl = grid;
    var videos = (feed && feed.videos) || [];

    if (!videos.length) {
      player.hidden = true;
      player.innerHTML = '';
      grid.innerHTML =
        '<div class="empty-state">' +
        '<p class="empty-message">' +
        escapeHtml(i18n('pages.videos.empty', 'Nenhum vídeo disponível.')) +
        '</p>' +
        '<a href="https://www.youtube.com/@InspetorBudGanja" class="botao botao-home" target="_blank" rel="noopener noreferrer">@InspetorBudGanja</a>' +
        '</div>';
      return;
    }

    var requested = readRequestedId();
    var initial = findVideo(videos, requested) || findVideo(videos, selectedId) || videos[0];
    selectedId = initial.id;
    setUrlForVideo(selectedId, true);
    updatePlayer(initial, false);

    grid.innerHTML =
      '<p class="videos-list-heading">' +
      escapeHtml(i18n('pages.videos.playlist', 'Todos os vídeos')) +
      '</p>' +
      '<div class="videos-grid">' +
      videos
        .map(function (v) {
          var title = localizedField(v, 'title');
          var summary = localizedField(v, 'summary');
          var thumb = videoThumb(v);
          var active = v.id === selectedId;
          return (
            '<article class="video-card card' +
            (active ? ' is-active' : '') +
            '" data-video-id="' +
            escapeHtml(v.id) +
            '">' +
            '<button type="button" class="video-card-link" aria-pressed="' +
            (active ? 'true' : 'false') +
            '" aria-label="' +
            escapeHtml(i18n('pages.videos.watchHere', 'Assistir') + ': ' + title) +
            '">' +
            '<span class="video-card-media">' +
            (thumb
              ? '<img src="' + escapeHtml(thumb) + '" alt="" class="video-card-thumb" loading="lazy" decoding="async">'
              : '<span class="video-card-thumb video-card-thumb--empty"></span>') +
            '<span class="video-card-play" aria-hidden="true"></span>' +
            '</span>' +
            '<span class="video-card-body">' +
            '<span class="video-card-title">' +
            escapeHtml(title) +
            '</span>' +
            (summary ? '<span class="video-card-summary">' + escapeHtml(summary) + '</span>' : '') +
            '<span class="video-card-date">' +
            escapeHtml(formatDate(v.published)) +
            '</span>' +
            '</span>' +
            '</button>' +
            '</article>'
          );
        })
        .join('') +
      '</div>';

    injectVideoJsonLd(videos);
  }

  function injectVideoJsonLd(videos) {
    var existing = document.getElementById('jsonld-videos');
    if (existing) existing.remove();
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
            thumbnailUrl: videoThumb(v),
            uploadDate: v.published,
            url: 'https://inspetorbudganja.com.br/videos/#' + v.id,
            embedUrl: 'https://www.youtube.com/embed/' + v.id,
            contentUrl: v.url
          }
        };
      })
    });
    document.head.appendChild(script);
  }

  function selectById(id, autoplay) {
    if (!cachedFeed) return;
    playerEl = document.getElementById('videos-player') || playerEl;
    gridEl = document.getElementById('videos-list') || gridEl;
    if (!playerEl) return;

    var video = findVideo(cachedFeed.videos || [], id);
    if (!video) return;

    updatePlayer(video, autoplay);
    setUrlForVideo(id, false);

    if (autoplay && playerEl.scrollIntoView) {
      playerEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var player = document.getElementById('videos-player');
    var grid = document.getElementById('videos-list');
    var channelLink = document.getElementById('videos-channel-link');
    if (!player || !grid) return;

    playerEl = player;
    gridEl = grid;

    grid.addEventListener('click', function (e) {
      var btn = e.target.closest('.video-card-link');
      if (!btn || !grid.contains(btn)) return;
      e.preventDefault();
      var card = btn.closest('.video-card');
      if (!card) return;
      var id = card.getAttribute('data-video-id');
      if (!id) return;
      selectById(id, true);
    });

    window.addEventListener('hashchange', function () {
      var id = readRequestedId();
      if (id && id !== selectedId) selectById(id, false);
    });

    window.addEventListener('popstate', function () {
      var id = readRequestedId();
      if (id && id !== selectedId) selectById(id, false);
    });

    function load() {
      fetch('/api/youtube-feed')
        .then(function (r) {
          return r.ok ? r.json() : Promise.reject(new Error('api'));
        })
        .catch(function () {
          return fetch('/content/youtube-feed.json').then(function (r) {
            return r.ok ? r.json() : null;
          });
        })
        .then(function (feed) {
          if (channelLink && feed && feed.channelUrl) {
            channelLink.href = feed.channelUrl;
            channelLink.textContent = '▶ ' + (feed.channelName || 'YouTube');
          }
          playerEl = document.getElementById('videos-player') || player;
          gridEl = document.getElementById('videos-list') || grid;
          renderVideos(playerEl, gridEl, feed);
        })
        .catch(function () {
          renderVideos(player, grid, null);
        });
    }

    load();
    window.addEventListener('budganja:locale-change', function () {
      playerEl = document.getElementById('videos-player') || playerEl;
      gridEl = document.getElementById('videos-list') || gridEl;
      if (cachedFeed && playerEl && gridEl) renderVideos(playerEl, gridEl, cachedFeed);
      else load();
    });
  });
})();
