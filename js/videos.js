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

  var CHANNEL_ALIASES = {
    inspetor: 'inspetor',
    'inspetor-budganja': 'inspetor',
    'canal-inspetor': 'inspetor',
    movrecam: 'movrecam',
    'canal-movrecam': 'movrecam',
    canabinall: 'canabinall',
    'canal-canabinall': 'canabinall',
    all: 'all',
    todos: 'all'
  };

  var SERIES_ALIASES = {
    xiv: 'xiv',
    'xiv-edicao': 'xiv',
    'xiv-edição': 'xiv',
    conceitos: 'conceitos',
    'conceitos-basicos': 'conceitos',
    'conceitos-básicos': 'conceitos',
    'plantas-sagradas': 'plantas-sagradas',
    'plantas sagradas': 'plantas-sagradas'
  };

  var CHANNEL_ORDER = ['movrecam', 'canabinall', 'inspetor'];

  var cachedHub = null;
  var selectedId = '';
  var activeChannel = 'all';
  var activeSeries = '';
  var activeQuery = '';
  var searchTimer = null;
  var playerEl = null;
  var gridEl = null;
  var filtersEl = null;
  var searchEl = null;
  var channelLink = null;
  var inspectionLink = null;

  function resolveChannel(raw) {
    var key = String(raw || '')
      .trim()
      .toLowerCase();
    if (!key) return '';
    if (CHANNEL_ALIASES[key]) return CHANNEL_ALIASES[key];
    return '';
  }

  function resolveSeries(raw) {
    var key = String(raw || '')
      .trim()
      .toLowerCase();
    if (!key) return '';
    if (SERIES_ALIASES[key]) return SERIES_ALIASES[key];
    // series=canal-movrecam → channel alias handled separately
    if (CHANNEL_ALIASES[key] && CHANNEL_ALIASES[key] !== 'all') return '';
    return key;
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

  function readFilterFromUrl() {
    var channel = 'all';
    var series = '';
    var q = '';
    try {
      var params = new URLSearchParams(window.location.search);
      var chRaw = params.get('channel') || '';
      var seriesRaw = params.get('series') || '';
      var resolvedCh = resolveChannel(chRaw);
      var resolvedSeriesAsChannel = resolveChannel(seriesRaw);
      var resolvedSeries = resolveSeries(seriesRaw);

      if (resolvedCh) channel = resolvedCh;
      else if (!chRaw && resolvedSeriesAsChannel) channel = resolvedSeriesAsChannel;

      if (resolvedSeries && !resolvedSeriesAsChannel) series = resolvedSeries;

      if (!resolvedCh && !resolvedSeriesAsChannel && series) {
        if (series === 'xiv') channel = 'movrecam';
        else if (series === 'conceitos' || series === 'plantas-sagradas') channel = 'canabinall';
      }
      q = String(params.get('q') || '').trim();
    } catch (e) { /* ignore */ }
    return { channel: channel, series: series, q: q };
  }

  function writeFilterToUrl(channel, series, videoId, replace) {
    var params = new URLSearchParams();
    if (channel && channel !== 'all') params.set('channel', channel);
    if (series) params.set('series', series);
    if (activeQuery) params.set('q', activeQuery);
    var qs = params.toString();
    var next = window.location.pathname + (qs ? '?' + qs : '');
    if (isValidVideoId(videoId)) next += '#' + videoId;
    var current = window.location.pathname + window.location.search + window.location.hash;
    if (current === next) return;
    if (replace) history.replaceState(null, '', next);
    else history.pushState(null, '', next);
  }

  function foldText(s) {
    return String(s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function tokenizeQuery(q) {
    return foldText(q)
      .split(/[^a-z0-9]+/)
      .filter(Boolean);
  }

  function videoSearchBlob(v) {
    if (!v) return '';
    return foldText(
      [
        v.title,
        v.titleEn,
        v.titleEs,
        v.summary,
        v.summaryEn,
        v.summaryEs,
        channelLabel(v.channel),
        ((v.series || []) || []).join(' ')
      ].join(' ')
    );
  }

  function videoMatchesQuery(v, tokens) {
    if (!tokens || !tokens.length) return true;
    var blob = videoSearchBlob(v);
    for (var i = 0; i < tokens.length; i++) {
      if (blob.indexOf(tokens[i]) < 0) return false;
    }
    return true;
  }

  function embedSrc(id, autoplay) {
    var src =
      'https://www.youtube-nocookie.com/embed/' +
      encodeURIComponent(id) +
      '?rel=0&modestbranding=1&playsinline=1' +
      // Preferir legendas em inglês quando existirem no YouTube
      '&cc_load_policy=1&cc_lang_pref=en';
    try {
      src += '&origin=' + encodeURIComponent(window.location.origin);
    } catch (e) { /* ignore */ }
    if (autoplay) src += '&autoplay=1';
    return src;
  }

  function youtubeWatchUrl(id) {
    return 'https://www.youtube.com/watch?v=' + encodeURIComponent(id);
  }

  function videoPageShareUrl(id) {
    var path = '/videos/#' + encodeURIComponent(id);
    try {
      if (/localhost|127\.0\.0\.1/i.test(window.location.hostname || '')) {
        return 'https://inspetorbudganja.com.br' + path;
      }
      return window.location.origin + path;
    } catch (e) {
      return 'https://inspetorbudganja.com.br' + path;
    }
  }

  function bindCopyVideoLinkButton(root) {
    if (!root) return;
    var btn = root.querySelector('[data-copy-video-link]');
    if (!btn || btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-copy-video-link') || '';
      if (!isValidVideoId(id)) return;
      var url = videoPageShareUrl(id);
      var label = btn.querySelector('[data-copy-label]') || btn;
      var original = i18n('pages.videos.copyLink', 'Copiar link');
      var done = function () {
        label.textContent = i18n('pages.videos.linkCopied', 'Link copiado!');
        btn.classList.add('is-copied');
        window.setTimeout(function () {
          label.textContent = original;
          btn.classList.remove('is-copied');
        }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(function () {
          try {
            if (window.prompt) window.prompt(original + ':', url);
          } catch (e) { /* ignore */ }
          done();
        });
        return;
      }
      try {
        if (window.prompt) window.prompt(original + ':', url);
      } catch (e) { /* ignore */ }
      done();
    });
  }

  function bindPlayVideoButton(root) {
    if (!root) return;
    var btn = root.querySelector('[data-play-video]');
    if (!btn || btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', function () {
      var facade = root.querySelector('.yt-facade[data-youtube-id]');
      if (!facade) return;
      if (window.BudGanjaYoutubeFacade && typeof window.BudGanjaYoutubeFacade.load === 'function') {
        window.BudGanjaYoutubeFacade.load(facade, true);
      } else {
        facade.click();
      }
      btn.hidden = true;
    });
  }

  function bindShareVideoButton(root, title) {
    if (!root) return;
    var btn = root.querySelector('[data-share-video]');
    if (!btn || btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-share-video') || '';
      if (!isValidVideoId(id)) return;
      var url = videoPageShareUrl(id);
      var shareTitle = title || i18n('pages.videos.nowPlaying', 'Vídeo do YouTube');
      var label = btn.querySelector('[data-share-label]') || btn;
      var original = i18n('common.share', 'Compartilhar');
      var markCopied = function () {
        label.textContent = i18n('common.shareCopied', 'Link copiado!');
        btn.classList.add('is-copied');
        window.setTimeout(function () {
          label.textContent = original;
          btn.classList.remove('is-copied');
        }, 1800);
      };
      var copyFallback = function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(markCopied).catch(function () {
            try {
              if (window.prompt) window.prompt(original + ':', url);
            } catch (e) { /* ignore */ }
            markCopied();
          });
          return;
        }
        try {
          if (window.prompt) window.prompt(original + ':', url);
        } catch (e) { /* ignore */ }
        markCopied();
      };
      if (typeof navigator.share === 'function') {
        navigator
          .share({ title: shareTitle, text: shareTitle, url: url })
          .catch(function () {
            copyFallback();
          });
        return;
      }
      copyFallback();
    });
  }

  /** Tenta abrir a app YouTube (melhor para áudio com ecrã desligado). */
  function openYouTubeAppOrWeb(id) {
    if (!isValidVideoId(id)) return;
    var web = youtubeWatchUrl(id);
    var ua = navigator.userAgent || '';
    if (/Android/i.test(ua)) {
      window.location.href =
        'intent://www.youtube.com/watch?v=' +
        encodeURIComponent(id) +
        '#Intent;package=com.google.android.youtube;scheme=https;S.browser_fallback_url=' +
        encodeURIComponent(web) +
        ';end';
      return;
    }
    if (/iPhone|iPad|iPod/i.test(ua)) {
      var started = Date.now();
      window.location.href = 'youtube://www.youtube.com/watch?v=' + encodeURIComponent(id);
      window.setTimeout(function () {
        if (Date.now() - started < 1600 && !document.hidden) {
          window.open(web, '_blank', 'noopener,noreferrer');
        }
      }, 750);
      return;
    }
    window.open(web, '_blank', 'noopener,noreferrer');
  }

  function bindContinueYouTubeButton(root) {
    if (!root) return;
    var btn = root.querySelector('[data-continue-youtube]');
    if (!btn || btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', function (ev) {
      var id = btn.getAttribute('data-continue-youtube') || '';
      if (!isValidVideoId(id)) return;
      ev.preventDefault();
      openYouTubeAppOrWeb(id);
    });
  }

  function renderEmbed(id, title, autoplay) {
    var safeTitle = escapeHtml(title || i18n('pages.videos.nowPlaying', 'Vídeo do YouTube'));
    if (autoplay) {
      return (
        '<div class="video-embed is-playing">' +
        '<iframe src="' +
        escapeHtml(embedSrc(id, true)) +
        '" title="' +
        safeTitle +
        '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ' +
        'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' +
        '</div>'
      );
    }
    var facade =
      window.BudGanjaYoutubeFacade && typeof window.BudGanjaYoutubeFacade.html === 'function'
        ? window.BudGanjaYoutubeFacade.html(id, title || i18n('pages.videos.nowPlaying', 'Vídeo do YouTube'))
        : '';
    if (facade) {
      return '<div class="video-embed">' + facade + '</div>';
    }
    return (
      '<div class="video-embed">' +
      '<iframe src="' +
      escapeHtml(embedSrc(id, false)) +
      '" title="' +
      safeTitle +
      '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ' +
      'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' +
      '</div>'
    );
  }

  function findVideo(videos, id) {
    for (var i = 0; i < videos.length; i++) {
      if (videos[i].id === id) return videos[i];
    }
    return null;
  }

  function findChannelMeta(id) {
    var channels = (cachedHub && cachedHub.channels) || [];
    for (var i = 0; i < channels.length; i++) {
      if (channels[i].id === id) return channels[i];
    }
    return null;
  }

  function filterVideos(videos, channel, series, query) {
    var list = videos || [];
    if (channel && channel !== 'all') {
      list = list.filter(function (v) {
        return v.channel === channel;
      });
    }
    if (series) {
      list = list.filter(function (v) {
        return (v.series || []).indexOf(series) >= 0;
      });
    }
    var tokens = tokenizeQuery(query != null ? query : activeQuery);
    if (tokens.length) {
      list = list.filter(function (v) {
        return videoMatchesQuery(v, tokens);
      });
    }
    return list;
  }

  function aulaNumber(title) {
    var m = String(title || '').match(/(\d+)\s*ª?\s*Aula|Aula\s+(\d+)/i);
    if (!m) return 999;
    return Number(m[1] || m[2] || 999);
  }

  function sortChannelVideos(list, channelId) {
    if (channelId === 'movrecam') {
      return list.slice().sort(function (a, b) {
        var na = aulaNumber(a.title);
        var nb = aulaNumber(b.title);
        var aXiv = (a.series || []).indexOf('xiv') >= 0;
        var bXiv = (b.series || []).indexOf('xiv') >= 0;
        if (aXiv !== bXiv) return aXiv ? -1 : 1;
        if (aXiv && bXiv && na !== nb) return na - nb;
        var da = a.published ? new Date(a.published).getTime() : 0;
        var db = b.published ? new Date(b.published).getTime() : 0;
        if (db !== da) return db - da;
        return String(a.title || '').localeCompare(String(b.title || ''), 'pt-BR');
      });
    }
    if (channelId === 'inspetor') return list.slice();
    return list.slice().sort(function (a, b) {
      var da = a.published ? new Date(a.published).getTime() : 0;
      var db = b.published ? new Date(b.published).getTime() : 0;
      if (db !== da) return db - da;
      return String(a.title || '').localeCompare(String(b.title || ''), 'pt-BR');
    });
  }

  function sortForView(list, channel, series) {
    if (channel === 'all') {
      var grouped = [];
      for (var i = 0; i < CHANNEL_ORDER.length; i++) {
        var id = CHANNEL_ORDER[i];
        var chunk = list.filter(function (v) {
          return v.channel === id;
        });
        grouped = grouped.concat(sortChannelVideos(chunk, id));
      }
      var rest = list.filter(function (v) {
        return CHANNEL_ORDER.indexOf(v.channel) < 0;
      });
      return grouped.concat(sortChannelVideos(rest, ''));
    }
    if (channel === 'movrecam' && series === 'xiv') {
      return list.slice().sort(function (a, b) {
        var na = aulaNumber(a.title);
        var nb = aulaNumber(b.title);
        if (na !== nb) return na - nb;
        return String(a.published || '').localeCompare(String(b.published || ''));
      });
    }
    return sortChannelVideos(list, channel);
  }

  function channelLabel(id) {
    if (id === 'all') return i18n('pages.videos.filterAll', 'Todos');
    var meta = findChannelMeta(id);
    if (meta && meta.label) return meta.label;
    if (id === 'inspetor') return 'Inspetor BudGanja';
    if (id === 'movrecam') return 'MovReCam';
    if (id === 'canabinall') return 'CANABinALL';
    return id;
  }

  function seriesLabel(id) {
    if (id === 'xiv') return i18n('pages.videos.seriesXiv', 'XIV edição');
    if (id === 'conceitos') return i18n('pages.videos.seriesBasics', 'Conceitos básicos');
    if (id === 'plantas-sagradas') return i18n('pages.videos.seriesSacred', 'Plantas Sagradas');
    var opts = (cachedHub && cachedHub.seriesOptions) || [];
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].id === id) return opts[i].label;
    }
    return id;
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

  function updateChrome() {
    if (activeChannel === 'all') {
      if (channelLink) {
        channelLink.href = '/biblioteca/inspecoes/';
        channelLink.removeAttribute('target');
        channelLink.removeAttribute('rel');
        channelLink.hidden = false;
        channelLink.textContent = i18n('pages.videos.viewInspections', 'Ver inspeções de canais');
      }
      if (inspectionLink) inspectionLink.hidden = true;
      return;
    }

    var meta = findChannelMeta(activeChannel);
    if (channelLink) {
      if (meta && meta.channelUrl) {
        channelLink.href = meta.channelUrl;
        channelLink.target = '_blank';
        channelLink.rel = 'noopener noreferrer';
        channelLink.hidden = false;
        channelLink.textContent =
          '▶ ' +
          i18n('pages.videos.subscribe', 'Inscrever-se no') +
          ' ' +
          (meta.label || channelLabel(activeChannel));
      } else {
        channelLink.hidden = true;
      }
    }
    if (inspectionLink) {
      if (meta && meta.inspectionUrl) {
        inspectionLink.href = meta.inspectionUrl;
        inspectionLink.hidden = false;
        inspectionLink.textContent =
          i18n('pages.videos.viewInspection', 'Ver inspeção') + ' · ' + (meta.label || '');
      } else {
        inspectionLink.hidden = true;
      }
    }
  }

  function updatePlayer(video, autoplay) {
    if (!playerEl || !video || !isValidVideoId(video.id)) return;
    selectedId = video.id;
    var title = localizedField(video, 'title');
    var summary = localizedField(video, 'summary');
    var chLabel = channelLabel(video.channel);
    var watchUrl = video.url && String(video.url).indexOf('http') === 0
      ? String(video.url)
      : youtubeWatchUrl(video.id);

    playerEl.hidden = false;
    playerEl.innerHTML =
      renderEmbed(video.id, title, !!autoplay) +
      '<div class="videos-player-meta">' +
      '<p class="videos-player-channel">' +
      escapeHtml(chLabel) +
      '</p>' +
      '<h2 class="videos-player-title">' +
      escapeHtml(title) +
      '</h2>' +
      (summary ? '<p class="videos-player-summary">' + escapeHtml(summary) + '</p>' : '') +
      '<div class="videos-player-actions">' +
      '<button type="button" class="botao botao-sm videos-play-btn" data-play-video="' +
      escapeHtml(video.id) +
      '"' +
      (autoplay ? ' hidden' : '') +
      '>' +
      escapeHtml(i18n('pages.videos.watchHere', 'Assistir')) +
      '</button>' +
      '<button type="button" class="botao botao-outline botao-sm videos-copy-link" data-copy-video-link="' +
      escapeHtml(video.id) +
      '"><span data-copy-label>' +
      escapeHtml(i18n('pages.videos.copyLink', 'Copiar link')) +
      '</span></button>' +
      '<button type="button" class="botao botao-outline botao-sm videos-share-btn" data-share-video="' +
      escapeHtml(video.id) +
      '" aria-label="' +
      escapeHtml(i18n('common.shareAria', 'Compartilhar esta publicação')) +
      '"><span data-share-label>' +
      escapeHtml(i18n('common.share', 'Compartilhar')) +
      '</span></button>' +
      '<a class="botao botao-outline botao-sm videos-continue-yt" href="' +
      escapeHtml(watchUrl) +
      '" data-continue-youtube="' +
      escapeHtml(video.id) +
      '" target="_blank" rel="noopener noreferrer">' +
      escapeHtml(i18n('pages.videos.continueOnYoutube', 'Continuar no YouTube')) +
      '</a>' +
      '<p class="videos-continue-yt-hint">' +
      escapeHtml(
        i18n(
          'pages.videos.continueOnYoutubeHint',
          'Para ouvir com o ecrã desligado, abra na app YouTube.'
        )
      ) +
      '</p>' +
      (video.published
        ? '<p class="videos-player-meta-line"><time datetime="' +
          escapeHtml(video.published) +
          '">' +
          escapeHtml(formatDate(video.published)) +
          '</time></p>'
        : '') +
      '</div>' +
      '</div>';

    bindContinueYouTubeButton(playerEl);
    bindCopyVideoLinkButton(playerEl);
    bindPlayVideoButton(playerEl);
    bindShareVideoButton(playerEl, title);
    if (window.BudGanjaYoutubeFacade && typeof window.BudGanjaYoutubeFacade.enhance === 'function') {
      window.BudGanjaYoutubeFacade.enhance(playerEl);
    }
    var facadeBtn = playerEl.querySelector('.yt-facade');
    if (facadeBtn && autoplay && window.BudGanjaYoutubeFacade && typeof window.BudGanjaYoutubeFacade.load === 'function') {
      window.BudGanjaYoutubeFacade.load(facadeBtn, true);
    }
    // Esconde o play overlay só no player principal; o botão Assistir fica abaixo.
    var overlayPlay = playerEl.querySelector('.yt-facade .video-card-play');
    if (overlayPlay) overlayPlay.hidden = true;
    // Se o utilizador clicar na thumbnail, esconde o botão Assistir.
    if (facadeBtn && !autoplay) {
      facadeBtn.addEventListener(
        'click',
        function () {
          var playBtn = playerEl.querySelector('[data-play-video]');
          if (playBtn) playBtn.hidden = true;
        },
        { once: true }
      );
    }
    if (autoplay && playerEl.scrollIntoView) {
      window.setTimeout(function () {
        playerEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 80);
    }
    syncActiveCards();
  }

  function seriesChipsForChannel(channel) {
    var opts = (cachedHub && cachedHub.seriesOptions) || [];
    return opts.filter(function (o) {
      return o.channel === channel;
    });
  }

  function orderedChannels() {
    var byId = {};
    var list = (cachedHub && cachedHub.channels) || [];
    for (var i = 0; i < list.length; i++) byId[list[i].id] = list[i];
    var ordered = [];
    for (var j = 0; j < CHANNEL_ORDER.length; j++) {
      if (byId[CHANNEL_ORDER[j]]) ordered.push(byId[CHANNEL_ORDER[j]]);
    }
    for (var k = 0; k < list.length; k++) {
      if (CHANNEL_ORDER.indexOf(list[k].id) < 0) ordered.push(list[k]);
    }
    return ordered;
  }

  function renderFilters() {
    if (!filtersEl || !cachedHub) return;
    var channels = [{ id: 'all', label: i18n('pages.videos.filterAll', 'Todos'), count: (cachedHub.videos || []).length }]
      .concat(orderedChannels());

    var seriesOpts = seriesChipsForChannel(activeChannel);

    filtersEl.innerHTML =
      '<div class="videos-filters" role="toolbar" aria-label="' +
      escapeHtml(i18n('pages.videos.filtersLabel', 'Filtrar por canal')) +
      '">' +
      channels
        .map(function (ch) {
          var pressed = activeChannel === ch.id;
          return (
            '<button type="button" class="videos-filter-chip' +
            (pressed ? ' is-active' : '') +
            '" data-channel="' +
            escapeHtml(ch.id) +
            '" aria-pressed="' +
            (pressed ? 'true' : 'false') +
            '">' +
            escapeHtml(ch.label || channelLabel(ch.id)) +
            (typeof ch.count === 'number' ? ' <span class="videos-filter-count">' + ch.count + '</span>' : '') +
            '</button>'
          );
        })
        .join('') +
      '</div>' +
      (seriesOpts.length
        ? '<div class="videos-series-filters" role="toolbar" aria-label="' +
          escapeHtml(i18n('pages.videos.seriesLabel', 'Filtrar por série')) +
          '">' +
          '<button type="button" class="videos-filter-chip videos-filter-chip--series' +
          (!activeSeries ? ' is-active' : '') +
          '" data-series="" aria-pressed="' +
          (!activeSeries ? 'true' : 'false') +
          '">' +
          escapeHtml(i18n('pages.videos.seriesAll', 'Todas as séries')) +
          '</button>' +
          seriesOpts
            .map(function (opt) {
              var pressed = activeSeries === opt.id;
              return (
                '<button type="button" class="videos-filter-chip videos-filter-chip--series' +
                (pressed ? ' is-active' : '') +
                '" data-series="' +
                escapeHtml(opt.id) +
                '" aria-pressed="' +
                (pressed ? 'true' : 'false') +
                '">' +
                escapeHtml(seriesLabel(opt.id)) +
                '</button>'
              );
            })
            .join('') +
          '</div>'
        : '');
  }

  function renderVideoCard(v) {
    var title = localizedField(v, 'title');
    var summary = localizedField(v, 'summary');
    var thumb = videoThumb(v);
    var active = v.id === selectedId;
    return (
      '<article class="video-card card' +
      (active ? ' is-active' : '') +
      '" data-video-id="' +
      escapeHtml(v.id) +
      '" data-channel="' +
      escapeHtml(v.channel || '') +
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
  }

  function renderChannelSection(channelId, videos) {
    if (!videos.length) return '';
    var meta = findChannelMeta(channelId);
    var label = channelLabel(channelId);
    var inspect =
      meta && meta.inspectionUrl
        ? ' <a class="videos-channel-inspect" href="' +
          escapeHtml(meta.inspectionUrl) +
          '">' +
          escapeHtml(i18n('pages.videos.viewInspection', 'Ver inspeção')) +
          '</a>'
        : '';
    return (
      '<section class="videos-channel-section" data-channel-section="' +
      escapeHtml(channelId) +
      '">' +
      '<header class="videos-channel-section-head">' +
      '<h2 class="videos-list-heading">' +
      escapeHtml(label) +
      ' <span class="videos-list-count">(' +
      videos.length +
      ')</span></h2>' +
      inspect +
      '</header>' +
      '<div class="videos-grid">' +
      videos.map(renderVideoCard).join('') +
      '</div>' +
      '</section>'
    );
  }

  function renderGrid(videos) {
    if (!gridEl) return;
    if (!videos.length) {
      var emptyMsg = activeQuery
        ? i18n('pages.videos.emptySearch', 'Nenhum vídeo com essas palavras.')
        : i18n('pages.videos.emptyFilter', 'Nenhum vídeo neste filtro.');
      gridEl.innerHTML =
        '<div class="empty-state">' +
        '<p class="empty-message">' +
        escapeHtml(emptyMsg) +
        '</p>' +
        '</div>';
      return;
    }

    if (activeChannel === 'all') {
      var html = '';
      for (var i = 0; i < CHANNEL_ORDER.length; i++) {
        var id = CHANNEL_ORDER[i];
        var chunk = videos.filter(function (v) {
          return v.channel === id;
        });
        html += renderChannelSection(id, chunk);
      }
      var other = videos.filter(function (v) {
        return CHANNEL_ORDER.indexOf(v.channel) < 0;
      });
      if (other.length) html += renderChannelSection('other', other);
      gridEl.innerHTML = html;
      return;
    }

    var heading = channelLabel(activeChannel);
    if (activeSeries) heading += ' · ' + seriesLabel(activeSeries);

    gridEl.innerHTML =
      '<p class="videos-list-heading">' +
      escapeHtml(heading) +
      ' <span class="videos-list-count">(' +
      videos.length +
      ')</span></p>' +
      '<div class="videos-grid">' +
      videos.map(renderVideoCard).join('') +
      '</div>';
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

  function applyView(opts) {
    opts = opts || {};
    if (!cachedHub || !playerEl || !gridEl) return;

    var all = cachedHub.videos || [];
    var requested = opts.requestedId || readRequestedId();
    var filtered = sortForView(filterVideos(all, activeChannel, activeSeries), activeChannel, activeSeries);

    if (requested) {
      var inView = findVideo(filtered, requested);
      if (!inView) {
        var anywhere = findVideo(all, requested);
        if (anywhere) {
          if (activeChannel !== 'all') {
            activeChannel = anywhere.channel || 'all';
            activeSeries = '';
          }
          filtered = sortForView(filterVideos(all, activeChannel, activeSeries), activeChannel, activeSeries);
        }
      }
    }

    var initial =
      findVideo(filtered, requested) ||
      findVideo(filtered, selectedId) ||
      filtered[0] ||
      null;

    renderFilters();
    updateChrome();

    if (!filtered.length || !initial) {
      selectedId = '';
      playerEl.hidden = true;
      playerEl.innerHTML = '';
      renderGrid([]);
      writeFilterToUrl(activeChannel, activeSeries, '', opts.replaceUrl !== false);
      return;
    }

    selectedId = initial.id;
    updatePlayer(initial, !!opts.autoplay);
    renderGrid(filtered);
    injectVideoJsonLd(filtered);
    writeFilterToUrl(activeChannel, activeSeries, selectedId, opts.replaceUrl !== false);
  }

  function selectById(id, autoplay) {
    if (!cachedHub) return;
    playerEl = document.getElementById('videos-player') || playerEl;
    gridEl = document.getElementById('videos-list') || gridEl;
    if (!playerEl) return;

    var all = cachedHub.videos || [];
    var video = findVideo(filterVideos(all, activeChannel, activeSeries), id) || findVideo(all, id);
    if (!video) return;

    if (video.channel && video.channel !== activeChannel && activeChannel !== 'all') {
      activeChannel = video.channel;
      activeSeries = '';
      applyView({ requestedId: id, autoplay: autoplay, replaceUrl: false });
      if (autoplay && playerEl.scrollIntoView) {
        playerEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      return;
    }

    updatePlayer(video, autoplay);
    writeFilterToUrl(activeChannel, activeSeries, id, false);
    syncActiveCards();

    if (autoplay && playerEl.scrollIntoView) {
      playerEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function setChannel(channel, series) {
    activeChannel = channel || 'all';
    activeSeries = series || '';
    if (activeChannel === 'all') activeSeries = '';
    var seriesOpts = seriesChipsForChannel(activeChannel);
    var validSeries = false;
    for (var i = 0; i < seriesOpts.length; i++) {
      if (seriesOpts[i].id === activeSeries) validSeries = true;
    }
    if (!validSeries) activeSeries = '';
    applyView({ replaceUrl: false, autoplay: false });
  }

  function setSearchQuery(raw, opts) {
    opts = opts || {};
    var next = String(raw || '').trim();
    if (next === activeQuery && !opts.force) return;
    activeQuery = next;
    if (searchEl && searchEl.value.trim() !== activeQuery) {
      searchEl.value = activeQuery;
    }
    applyView({
      replaceUrl: opts.replaceUrl !== false,
      autoplay: false,
      requestedId: opts.keepSelection ? selectedId || readRequestedId() : undefined
    });
  }

  function renderHub(player, grid, hub) {
    cachedHub = hub;
    playerEl = player;
    gridEl = grid;
    filtersEl = document.getElementById('videos-filters');
    searchEl = document.getElementById('videos-search') || searchEl;
    channelLink = document.getElementById('videos-channel-link');
    inspectionLink = document.getElementById('videos-inspection-link');

    var fromUrl = readFilterFromUrl();
    activeChannel = fromUrl.channel || 'all';
    activeSeries = fromUrl.series || '';
    activeQuery = fromUrl.q || activeQuery || '';
    if (searchEl) searchEl.value = activeQuery;

    if (!(hub && hub.videos && hub.videos.length)) {
      player.hidden = true;
      player.innerHTML = '';
      if (filtersEl) filtersEl.innerHTML = '';
      grid.innerHTML =
        '<div class="empty-state">' +
        '<p class="empty-message">' +
        escapeHtml(i18n('pages.videos.empty', 'Nenhum vídeo disponível.')) +
        '</p>' +
        '</div>';
      return;
    }

    applyView({ replaceUrl: true, autoplay: !!readRequestedId() });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var player = document.getElementById('videos-player');
    var grid = document.getElementById('videos-list');
    filtersEl = document.getElementById('videos-filters');
    searchEl = document.getElementById('videos-search');
    channelLink = document.getElementById('videos-channel-link');
    inspectionLink = document.getElementById('videos-inspection-link');
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

    if (filtersEl) {
      filtersEl.addEventListener('click', function (e) {
        var chip = e.target.closest('[data-channel], [data-series]');
        if (!chip || !filtersEl.contains(chip)) return;
        if (chip.hasAttribute('data-channel')) {
          setChannel(chip.getAttribute('data-channel'), '');
        } else if (chip.hasAttribute('data-series')) {
          setChannel(activeChannel, chip.getAttribute('data-series') || '');
        }
      });
    }

    if (searchEl) {
      searchEl.addEventListener('input', function () {
        var value = searchEl.value;
        if (searchTimer) window.clearTimeout(searchTimer);
        searchTimer = window.setTimeout(function () {
          searchTimer = null;
          setSearchQuery(value, { replaceUrl: true, keepSelection: true });
        }, 180);
      });
      searchEl.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          searchEl.value = '';
          if (searchTimer) window.clearTimeout(searchTimer);
          searchTimer = null;
          setSearchQuery('', { replaceUrl: true, keepSelection: true });
        }
      });
    }

    function onNavChange() {
      var next = readFilterFromUrl();
      var id = readRequestedId();
      var qChanged = (next.q || '') !== activeQuery;
      if (next.channel !== activeChannel || next.series !== activeSeries || qChanged) {
        activeChannel = next.channel;
        activeSeries = next.series;
        activeQuery = next.q || '';
        if (searchEl) searchEl.value = activeQuery;
        applyView({ requestedId: id, replaceUrl: true, autoplay: !!id });
        return;
      }
      if (id && id !== selectedId) selectById(id, true);
    }

    window.addEventListener('hashchange', onNavChange);
    window.addEventListener('popstate', onNavChange);

    function load() {
      fetch('/api/videos-hub')
        .then(function (r) {
          return r.ok ? r.json() : Promise.reject(new Error('api'));
        })
        .catch(function () {
          return fetch('/content/videos-hub.json').then(function (r) {
            return r.ok ? r.json() : null;
          });
        })
        .catch(function () {
          return fetch('/api/youtube-feed')
            .then(function (r) {
              return r.ok ? r.json() : Promise.reject(new Error('feed'));
            })
            .then(function (feed) {
              return {
                channels: [
                  {
                    id: 'inspetor',
                    label: (feed && feed.channelName) || 'Inspetor BudGanja',
                    channelUrl: (feed && feed.channelUrl) || 'https://www.youtube.com/@InspetorBudGanja',
                    inspectionUrl: null,
                    count: ((feed && feed.videos) || []).length
                  }
                ],
                videos: ((feed && feed.videos) || []).map(function (v) {
                  return {
                    id: v.id,
                    title: v.title,
                    titleEn: v.titleEn,
                    titleEs: v.titleEs,
                    summary: v.summary,
                    summaryEn: v.summaryEn,
                    summaryEs: v.summaryEs,
                    published: v.published,
                    url: v.url,
                    thumb: v.thumb,
                    channel: 'inspetor',
                    series: []
                  };
                }),
                seriesOptions: []
              };
            });
        })
        .then(function (hub) {
          playerEl = document.getElementById('videos-player') || player;
          gridEl = document.getElementById('videos-list') || grid;
          filtersEl = document.getElementById('videos-filters') || filtersEl;
          renderHub(playerEl, gridEl, hub);
        })
        .catch(function () {
          renderHub(player, grid, null);
        });
    }

    load();
    window.addEventListener('budganja:locale-change', function () {
      playerEl = document.getElementById('videos-player') || playerEl;
      gridEl = document.getElementById('videos-list') || gridEl;
      filtersEl = document.getElementById('videos-filters') || filtersEl;
      if (cachedHub && playerEl && gridEl) applyView({ replaceUrl: true, autoplay: false });
      else load();
    });
  });
})();
