(function () {
  'use strict';

  function i18n(key, fallback) {
    return window.BudGanjaI18n ? window.BudGanjaI18n.t(key, fallback) : fallback || '';
  }

  function locale() {
    return (window.BudGanjaI18n && window.BudGanjaI18n.getLocale()) || 'pt-BR';
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  function formatDate(iso) {
    if (!iso) return '';
    try {
      return new Date(iso).toLocaleDateString(locale(), { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
      return iso;
    }
  }

  function isValidVideoId(id) {
    return /^[a-zA-Z0-9_-]{11}$/.test(String(id || ''));
  }

  var PAGE_SIZE = 24;
  var CREATORS = [
    {
      id: 'zangado',
      catalogUrl: '/content/channels/zangadoreview.json',
      hubId: 'zangado',
      nameKey: 'pages.games.zangadoTitle',
      nameFallback: 'Zangado',
      descKey: 'pages.games.zangadoDesc',
      descFallback:
        'Reviews, sagas e primeira meia hora — o ofício de crítico gamer. Crédito: Zangado — sem afiliação.',
      yt: 'https://www.youtube.com/@zangadoreview',
      inspection: '/posts/post-inspecao-canal-zangado.html',
      emptyKey: 'pages.games.emptyZangado',
      emptyFallback: 'Nenhum vídeo do Zangado no catálogo ainda.'
    },
    {
      id: 'paulinho',
      catalogUrl: '/content/channels/paulinholoko.json',
      hubId: 'paulinho',
      nameKey: 'pages.games.paulinhoTitle',
      nameFallback: 'Paulinho o LOKO',
      descKey: 'pages.games.paulinhoDesc',
      descFallback: 'Todos os vídeos na ordem de postagem, separados por história. Crédito: Paulinho o LOKO — sem afiliação.',
      yt: 'https://www.youtube.com/@PaulinhoLOKOoficial',
      inspection: '',
      emptyKey: 'pages.games.emptyVideos',
      emptyFallback: 'Nenhum vídeo do Paulinho no catálogo ainda.'
    }
  ];

  var catalog = null;
  var activeCreator = 'zangado';
  var activeCategory = '';
  var activeQuery = '';
  var playingId = '';
  var visibleCount = 0;
  var searchTimer = null;
  var bound = false;

  function creatorById(id) {
    for (var i = 0; i < CREATORS.length; i++) {
      if (CREATORS[i].id === id) return CREATORS[i];
    }
    return CREATORS[0];
  }

  function readCreatorFromUrl() {
    try {
      var params = new URLSearchParams(window.location.search);
      var raw = String(params.get('canal') || params.get('channel') || '').toLowerCase();
      if (raw === 'zangado' || raw === 'zangadoreview' || raw === 'tio-zangado') return 'zangado';
      if (raw === 'paulinho' || raw === 'paulinho-loko' || raw === 'paulinholoko') return 'paulinho';
    } catch (e) { /* ignore */ }
    var hash = String(window.location.hash || '').replace(/^#/, '').toLowerCase();
    if (hash === 'zangado' || hash === 'jogos-zangado') return 'zangado';
    if (hash === 'paulinho' || hash === 'jogos-paulinho') return 'paulinho';
    return 'zangado';
  }

  function categoryLabel(id) {
    var cats = (catalog && catalog.categories) || [];
    for (var i = 0; i < cats.length; i++) {
      if (cats[i].id === id) {
        var loc = locale();
        if (loc === 'en' && cats[i].labelEn) return cats[i].labelEn;
        if (loc === 'es' && cats[i].labelEs) return cats[i].labelEs;
        return cats[i].label;
      }
    }
    return id;
  }

  function filteredVideos() {
    var list = (catalog && catalog.videos) || [];
    if (activeCategory) {
      list = list.filter(function (v) {
        return v.category === activeCategory;
      });
    }
    var q = activeQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(function (v) {
        return String(v.title || '').toLowerCase().indexOf(q) >= 0;
      });
    }
    return list.slice().sort(function (a, b) {
      var da = a.published ? Date.parse(a.published) : 0;
      var db = b.published ? Date.parse(b.published) : 0;
      if (da && db && da !== db) return db - da;
      if (da && !db) return -1;
      if (!da && db) return 1;
      var ia = Number.isFinite(a.pageIndex) ? a.pageIndex : 999999;
      var ib = Number.isFinite(b.pageIndex) ? b.pageIndex : 999999;
      if (ia !== ib) return ia - ib;
      return 0;
    });
  }

  function renderNotebooks(posts) {
    var box = document.getElementById('jogos-cadernos-list');
    if (!box) return;
    var loc = locale();
    var jogos = (posts || []).filter(function (p) {
      return p.series === 'cadernos-jogo' || /inspecao-jogo-/i.test(p.slug || '');
    });
    if (!jogos.length) return;
    box.innerHTML = jogos
      .map(function (p) {
        var title = p.title || '';
        if (loc === 'en' && p.titleEn) title = p.titleEn;
        if (loc === 'es' && p.titleEs) title = p.titleEs;
        var excerpt = p.excerpt || '';
        if (loc === 'en' && p.excerptEn) excerpt = p.excerptEn;
        if (loc === 'es' && p.excerptEs) excerpt = p.excerptEs;
        var href = p.url || '/posts/post-' + p.slug + '.html';
        var cover = p.coverImage
          ? '<img class="post-card-cover" src="' +
            escapeHtml(p.coverImage) +
            '" alt="" loading="lazy" decoding="async">'
          : '';
        return (
          '<article class="card post-card">' +
          '<a href="' +
          escapeHtml(href) +
          '">' +
          cover +
          '<h3>' +
          escapeHtml(title) +
          '</h3>' +
          '<p>' +
          escapeHtml(excerpt) +
          '</p>' +
          '<span class="post-card-date">' +
          escapeHtml(formatDate(p.date)) +
          '</span>' +
          '</a>' +
          '</article>'
        );
      })
      .join('');
  }

  function renderCreators() {
    var nav = document.getElementById('jogos-creators');
    if (!nav) return;
    nav.innerHTML =
      '<div class="videos-filters jogos-creator-chips" role="tablist" aria-label="' +
      escapeHtml(i18n('pages.games.creatorsLabel', 'Escolher canal')) +
      '">' +
      CREATORS.map(function (c) {
        var on = activeCreator === c.id;
        return (
          '<button type="button" class="videos-filter-chip' +
          (on ? ' is-active' : '') +
          '" role="tab" data-creator="' +
          escapeHtml(c.id) +
          '" aria-selected="' +
          (on ? 'true' : 'false') +
          '">' +
          escapeHtml(i18n(c.nameKey, c.nameFallback)) +
          '</button>'
        );
      }).join('') +
      '</div>';
  }

  function renderChannelMeta() {
    var c = creatorById(activeCreator);
    var desc = document.getElementById('jogos-channel-desc');
    var yt = document.getElementById('jogos-channel-yt');
    var insp = document.getElementById('jogos-channel-inspection');
    var title = document.getElementById('jogos-paulinho-title');
    if (title) title.textContent = i18n(c.nameKey, c.nameFallback);
    if (desc) desc.textContent = i18n(c.descKey, c.descFallback);
    if (yt) {
      yt.href = c.yt;
      yt.hidden = !c.yt;
    }
    if (insp) {
      if (c.inspection) {
        insp.href = c.inspection;
        insp.hidden = false;
      } else {
        insp.hidden = true;
      }
    }
  }

  function renderFilters() {
    var nav = document.getElementById('jogos-filters');
    if (!nav || !catalog) return;
    var cats = catalog.categories || [];
    var chips =
      '<div class="videos-filters" role="toolbar" aria-label="' +
      escapeHtml(i18n('pages.games.filtersLabel', 'Filtrar por tipo')) +
      '">' +
      '<button type="button" class="videos-filter-chip' +
      (!activeCategory ? ' is-active' : '') +
      '" data-category="" aria-pressed="' +
      (!activeCategory ? 'true' : 'false') +
      '">' +
      escapeHtml(i18n('pages.games.filterAll', 'Todos')) +
      ' (' +
      ((catalog.videos || []).length) +
      ')</button>' +
      cats
        .map(function (c) {
          var on = activeCategory === c.id;
          return (
            '<button type="button" class="videos-filter-chip' +
            (on ? ' is-active' : '') +
            '" data-category="' +
            escapeHtml(c.id) +
            '" aria-pressed="' +
            (on ? 'true' : 'false') +
            '">' +
            escapeHtml(categoryLabel(c.id)) +
            ' (' +
            c.count +
            ')</button>'
          );
        })
        .join('') +
      '</div>';
    nav.innerHTML = chips;
  }

  function embedHtml(id) {
    return (
      '<div class="video-embed">' +
      '<iframe src="https://www.youtube-nocookie.com/embed/' +
      escapeHtml(id) +
      '?autoplay=1&rel=0" title="YouTube" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
      '</div>'
    );
  }

  function cardHtml(v, playing) {
    var title = v.title || '';
    var thumb = v.thumb || (isValidVideoId(v.id) ? 'https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg' : '');
    if (playing) {
      return (
        '<article class="video-card card is-playing" data-video-id="' +
        escapeHtml(v.id) +
        '">' +
        embedHtml(v.id) +
        '<div class="video-card-body">' +
        '<h2 class="video-card-title videos-player-title">' +
        escapeHtml(title) +
        '</h2>' +
        '<span class="video-card-date">' +
        escapeHtml(formatDate(v.published)) +
        '</span>' +
        '</div>' +
        '<div class="video-card-actions">' +
        '<button type="button" class="botao botao-outline botao-sm" data-stop-video>' +
        escapeHtml(i18n('pages.videos.closePlayer', 'Fechar vídeo')) +
        '</button>' +
        '<a class="botao botao-outline botao-sm" href="' +
        escapeHtml(v.url || 'https://www.youtube.com/watch?v=' + v.id) +
        '" target="_blank" rel="noopener noreferrer">' +
        escapeHtml(i18n('pages.videos.continueOnYoutube', 'Continuar no YouTube')) +
        '</a>' +
        '</div>' +
        '</article>'
      );
    }
    return (
      '<article class="video-card card" data-video-id="' +
      escapeHtml(v.id) +
      '">' +
      '<button type="button" class="video-card-link" aria-label="' +
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
      '<span class="video-card-date">' +
      escapeHtml(formatDate(v.published)) +
      '</span>' +
      '</span>' +
      '</button>' +
      '</article>'
    );
  }

  function renderVideos() {
    var grid = document.getElementById('jogos-videos');
    var more = document.getElementById('jogos-load-more');
    if (!grid) return;
    var c = creatorById(activeCreator);
    if (!catalog || !catalog.videos) {
      grid.innerHTML =
        '<p class="empty-message">' + escapeHtml(i18n(c.emptyKey, c.emptyFallback)) + '</p>';
      if (more) more.hidden = true;
      return;
    }
    var list = filteredVideos();
    if (!list.length) {
      grid.innerHTML =
        '<p class="empty-message">' +
        escapeHtml(
          activeQuery
            ? i18n('pages.games.emptySearch', 'Nenhum vídeo com essas palavras.')
            : i18n('pages.games.emptyFilter', 'Nenhum vídeo neste filtro.')
        ) +
        '</p>';
      if (more) more.hidden = true;
      return;
    }
    var slice = list.slice(0, visibleCount);
    grid.innerHTML = slice
      .map(function (v) {
        return cardHtml(v, v.id === playingId);
      })
      .join('');
    if (more) more.hidden = slice.length >= list.length;
  }

  function setCategory(id) {
    activeCategory = id || '';
    playingId = '';
    visibleCount = PAGE_SIZE;
    renderFilters();
    renderVideos();
  }

  function catalogFromHub(hub, creator) {
    if (!hub || !hub.videos) return null;
    var videos = hub.videos.filter(function (v) {
      return v.channel === creator.hubId;
    });
    return {
      channelName: i18n(creator.nameKey, creator.nameFallback),
      videos: videos.map(function (v) {
        return {
          id: v.id,
          title: v.title,
          published: v.published,
          url: v.url,
          thumb: v.thumb,
          category: (v.series && v.series[0]) || 'outros'
        };
      }),
      categories: (hub.seriesOptions || []).filter(function (s) {
        return s.channel === creator.hubId;
      })
    };
  }

  function loadCatalog(creator) {
    var grid = document.getElementById('jogos-videos');
    if (grid) {
      grid.innerHTML =
        '<p class="empty-message">' +
        escapeHtml(i18n('pages.games.loadingVideos', 'A carregar vídeos…')) +
        '</p>';
    }
    catalog = null;
    return fetch(creator.catalogUrl)
      .then(function (r) {
        return r.ok ? r.json() : Promise.reject(new Error('catalog'));
      })
      .catch(function () {
        return fetch('/content/videos-hub.json')
          .then(function (r) {
            return r.ok ? r.json() : null;
          })
          .then(function (hub) {
            return catalogFromHub(hub, creator);
          });
      })
      .then(function (doc) {
        catalog = doc;
        renderFilters();
        renderVideos();
      })
      .catch(function () {
        catalog = null;
        renderFilters();
        renderVideos();
      });
  }

  function setCreator(id, pushUrl) {
    var next = creatorById(id).id;
    activeCreator = next;
    activeCategory = '';
    playingId = '';
    visibleCount = PAGE_SIZE;
    if (pushUrl) {
      try {
        var url = new URL(window.location.href);
        url.searchParams.set('canal', next);
        window.history.replaceState({}, '', url.pathname + url.search + url.hash);
      } catch (e) { /* ignore */ }
    }
    renderCreators();
    renderChannelMeta();
    loadCatalog(creatorById(next));
  }

  function bind() {
    if (bound) return;
    bound = true;
    var creators = document.getElementById('jogos-creators');
    var nav = document.getElementById('jogos-filters');
    var grid = document.getElementById('jogos-videos');
    var more = document.getElementById('jogos-load-more');
    var search = document.getElementById('jogos-search');

    if (creators) {
      creators.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-creator]');
        if (!btn) return;
        setCreator(btn.getAttribute('data-creator') || 'zangado', true);
      });
    }

    if (nav) {
      nav.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-category]');
        if (!btn) return;
        setCategory(btn.getAttribute('data-category') || '');
      });
    }

    if (grid) {
      grid.addEventListener('click', function (e) {
        var stop = e.target.closest('[data-stop-video]');
        if (stop) {
          playingId = '';
          renderVideos();
          return;
        }
        var btn = e.target.closest('.video-card-link');
        if (!btn) return;
        var card = btn.closest('[data-video-id]');
        if (!card) return;
        playingId = card.getAttribute('data-video-id') || '';
        renderVideos();
      });
    }

    if (more) {
      more.addEventListener('click', function () {
        visibleCount += PAGE_SIZE;
        renderVideos();
      });
    }

    if (search) {
      search.addEventListener('input', function () {
        window.clearTimeout(searchTimer);
        searchTimer = window.setTimeout(function () {
          activeQuery = search.value || '';
          playingId = '';
          visibleCount = PAGE_SIZE;
          renderVideos();
        }, 180);
      });
    }
  }

  function load() {
    visibleCount = PAGE_SIZE;
    bind();
    activeCreator = readCreatorFromUrl();
    renderCreators();
    renderChannelMeta();

    fetch('/posts-public.json')
      .then(function (r) {
        return r.ok ? r.json() : [];
      })
      .then(function (posts) {
        renderNotebooks(Array.isArray(posts) ? posts : []);
      })
      .catch(function () {
        renderNotebooks([]);
      });

    loadCatalog(creatorById(activeCreator));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
