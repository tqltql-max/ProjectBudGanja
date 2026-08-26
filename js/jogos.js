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
      slugs: ['zangado', 'zangadoreview', 'tio-zangado'],
      href: '/jogos/zangado/',
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
      id: 'aleff',
      slugs: ['aleff', 'aleph', 'paulinho', 'paulinho-loko', 'paulinholoko'],
      href: '/jogos/aleff/',
      catalogUrl: '/content/channels/paulinholoko.json',
      hubId: 'paulinho',
      nameKey: 'pages.games.aleffTitle',
      nameFallback: 'Aleff',
      descKey: 'pages.games.paulinhoDesc',
      descFallback:
        'Live em kick.com/paulinholokobr. Arquivo de histórias no YouTube, na ordem de postagem. Crédito à pessoa: Aleff (Aliffe Henrique de Carvalho) — sem afiliação.',
      yt: 'https://www.youtube.com/@PaulinhoLOKOoficial',
      kick: 'https://kick.com/paulinholokobr',
      inspection: '/posts/post-inspecao-canal-paulinho.html',
      emptyKey: 'pages.games.emptyVideos',
      emptyFallback: 'Nenhum vídeo do Aleff no catálogo ainda.'
    },
    {
      id: 'hopejoy',
      slugs: ['hopejoy', 'hope-joy', 'hopejoyoficial'],
      href: '/jogos/hopejoy/',
      catalogUrl: '/content/channels/hopejoyoficial.json',
      hubId: 'hopejoy',
      nameKey: 'pages.games.hopejoyTitle',
      nameFallback: 'Hope Joy',
      descKey: 'pages.games.hopejoyDesc',
      descFallback:
        'Personagem do Jornal da Capital. Arquivo no YouTube, na ordem de postagem. Live no Kick. Sem afiliação. Ficção de jogo ≠ manual de crime.',
      yt: 'https://www.youtube.com/@hopejoyoficial',
      kick: 'https://kick.com/hopejoyoficial',
      emptyKey: 'pages.games.emptyHopejoy',
      emptyFallback: 'Nenhum vídeo da Hope Joy no catálogo ainda.'
    },
    {
      id: 'bagual',
      slugs: ['bagual', 'poderosobagual', 'todo-poderoso-bagual', 'todopoderosobagual'],
      href: '/jogos/bagual/',
      catalogUrl: '/content/channels/poderosobagual.json',
      hubId: 'bagual',
      nameKey: 'pages.games.bagualTitle',
      nameFallback: 'Todo Poderoso Bagual',
      descKey: 'pages.games.bagualDesc',
      descFallback:
        'Personagem de BOPE na Capital. Arquivo no YouTube, na ordem de postagem. Live no Kick. Sem afiliação. Personagem ≠ pessoa. Ficção de jogo ≠ manual de crime.',
      yt: 'https://www.youtube.com/@poderosobagual',
      kick: 'https://kick.com/poderosobagual',
      inspection: '/posts/post-inspecao-canal-bagual.html',
      emptyKey: 'pages.games.emptyBagual',
      emptyFallback: 'Nenhum vídeo do Bagual no catálogo ainda.'
    }
  ];

  var HUB_NAMES = [
    { href: '/jogos/aleff/', nameKey: 'pages.games.paulinhoTitle', nameFallback: 'Paulinho o LOKO' },
    { href: '/jogos/gtarp/', nameKey: 'pages.games.gtarpTitle', nameFallback: 'GTA RP' },
    { href: '/jogos/hopejoy/', nameKey: 'pages.games.hopejoyTitle', nameFallback: 'Hope Joy' },
    { href: '/jogos/bagual/', nameKey: 'pages.games.bagualTitle', nameFallback: 'Todo Poderoso Bagual' },
    { href: '/jogos/zangado/', nameKey: 'pages.games.zangadoTitle', nameFallback: 'Zangado' },
    { href: '/jogos/broto/', nameKey: 'pages.games.brotoTitle', nameFallback: 'Broto' },
    { href: '/jogos/cadernos/', nameKey: 'pages.games.notebooksTitle', nameFallback: 'Cadernos' }
  ];

  var catalog = null;
  var activeCreator = null;
  var activeCategory = '';
  var activeQuery = '';
  var visibleCount = 0;
  var searchTimer = null;
  var bound = false;

  function pageMode() {
    var attr = String(document.body.getAttribute('data-jogos') || '');
    if (attr) return attr;
    var parts = pathParts();
    if (parts[0] !== 'jogos') return 'hub';
    if (!parts[1] || parts[1] === 'index.html') return 'hub';
    if (parts[1] === 'video.html') return 'watch';
    if (parts[1] === 'broto') return 'broto';
    if (parts[1] === 'cadernos') return 'cadernos';
    if (parts[1] === 'gtarp') return 'gtarp';
    if (parts[2] && isValidVideoId(parts[2].replace(/\.html$/i, ''))) return 'watch';
    if (creatorBySlug(parts[1])) return 'catalog';
    return 'hub';
  }

  function creatorBySlug(raw) {
    var slug = String(raw || '').toLowerCase();
    for (var i = 0; i < CREATORS.length; i++) {
      if (CREATORS[i].id === slug) return CREATORS[i];
      if (CREATORS[i].slugs.indexOf(slug) !== -1) return CREATORS[i];
    }
    return null;
  }

  function creatorById(id) {
    return creatorBySlug(id) || CREATORS[0];
  }

  function pathParts() {
    return String(window.location.pathname || '')
      .replace(/\/+$/, '')
      .split('/')
      .filter(Boolean);
  }

  function queryParam(name) {
    try {
      return new URLSearchParams(window.location.search).get(name) || '';
    } catch (e) {
      return '';
    }
  }

  function resolveCreatorFromLocation() {
    var fromAttr = document.body.getAttribute('data-creator');
    var fromQuery = queryParam('canal') || queryParam('channel');
    var parts = pathParts();
    var fromPath = parts[0] === 'jogos' && parts[1] ? parts[1] : '';
    return creatorBySlug(fromAttr) || creatorBySlug(fromQuery) || creatorBySlug(fromPath);
  }

  function resolveVideoId() {
    var fromQuery = queryParam('id') || queryParam('v');
    if (isValidVideoId(fromQuery)) return fromQuery;
    var parts = pathParts();
    var last = parts[parts.length - 1] || '';
    if (last === 'video.html') return '';
    return isValidVideoId(last) ? last : '';
  }

  function videoHref(creator, id) {
    return creator.href + encodeURIComponent(id);
  }

  function redirectLegacyHub() {
    if (pageMode() !== 'hub') return false;
    var raw = String(queryParam('canal') || queryParam('channel') || '').toLowerCase();
    var creator = creatorBySlug(raw);
    if (!creator) return false;
    window.location.replace(creator.href);
    return true;
  }

  function renderHub() {
    var nav = document.getElementById('jogos-names');
    if (!nav) return;
    if (nav.getAttribute('data-static') === '1') return;
    nav.setAttribute('aria-label', i18n('pages.games.namesLabel', 'Nomes'));
    nav.innerHTML = HUB_NAMES.map(function (item) {
      return (
        '<a class="jogos-name" href="' +
        escapeHtml(item.href) +
        '">' +
        escapeHtml(i18n(item.nameKey, item.nameFallback)) +
        '</a>'
      );
    }).join('');
  }

  function gtarpKickLabel(c) {
    var handle = c.kickHandle || '';
    return handle
      ? i18n('pages.games.openKick', 'Live no Kick') + ' · ' + handle
      : i18n('pages.games.openKick', 'Live no Kick');
  }

  function gtarpYtLabel(c) {
    var handle = c.ytHandle || '';
    return handle
      ? i18n('pages.games.openChannel', 'Abrir no YouTube') + ' · ' + handle
      : i18n('pages.games.openChannel', 'Abrir no YouTube');
  }

  function renderGtarpHub() {
    var box = document.getElementById('gtarp-roster');
    var streamers = document.getElementById('gtarp-streamers-list');
    if (!box && !streamers) return;
    fetch('/content/gtarp-personagens.json')
      .then(function (r) {
        return r.ok ? r.json() : Promise.reject(new Error('roster'));
      })
      .then(function (doc) {
        var chars = (doc && doc.characters) || [];
        if (!chars.length) {
          var empty =
            '<p class="empty-message">' +
            escapeHtml(i18n('pages.games.gtarpEmpty', 'Ainda sem personagens com canal no catálogo.')) +
            '</p>';
          if (box) box.innerHTML = empty;
          if (streamers) streamers.innerHTML = empty;
          return;
        }
        if (streamers) {
          streamers.innerHTML = chars
            .map(function (c) {
              var featured = c.featured ? ' gtarp-streamer--featured' : '';
              var kick = c.kick
                ? '<a class="botao gtarp-kick-btn" href="' +
                  escapeHtml(c.kick) +
                  '" target="_blank" rel="noopener noreferrer">' +
                  escapeHtml(gtarpKickLabel(c)) +
                  '</a>'
                : '';
              var yt = c.yt
                ? '<a class="botao botao-outline" href="' +
                  escapeHtml(c.yt) +
                  '" target="_blank" rel="noopener noreferrer">' +
                  escapeHtml(gtarpYtLabel(c)) +
                  '</a>'
                : '';
              var twitch = c.twitch
                ? '<a class="botao botao-outline" href="' +
                  escapeHtml(c.twitch) +
                  '" target="_blank" rel="noopener noreferrer">Twitch' +
                  (c.twitchHandle ? ' · ' + escapeHtml(c.twitchHandle) : '') +
                  '</a>'
                : '';
              return (
                '<article class="gtarp-streamer' +
                featured +
                '">' +
                '<p class="gtarp-card-role">' +
                escapeHtml(c.name || '') +
                '</p>' +
                '<h3>' +
                escapeHtml(i18n('pages.games.gtarpStreamerOf', 'Canal de streamer')) +
                '</h3>' +
                '<p class="gtarp-streamer-actions">' +
                kick +
                yt +
                twitch +
                '</p>' +
                '</article>'
              );
            })
            .join('');
        }
        if (!box) return;
        box.innerHTML = chars
          .map(function (c) {
            var featured = c.featured ? ' gtarp-card--featured' : '';
            var kick = c.kick
              ? '<a class="botao gtarp-kick-btn" href="' +
                escapeHtml(c.kick) +
                '" target="_blank" rel="noopener noreferrer">' +
                escapeHtml(gtarpKickLabel(c)) +
                '</a>'
              : '';
            var yt = c.yt
              ? '<a class="botao botao-outline" href="' +
                escapeHtml(c.yt) +
                '" target="_blank" rel="noopener noreferrer">' +
                escapeHtml(gtarpYtLabel(c)) +
                '</a>'
              : '';
            var twitch = c.twitch
              ? '<a class="botao botao-outline" href="' +
                escapeHtml(c.twitch) +
                '" target="_blank" rel="noopener noreferrer">Twitch' +
                (c.twitchHandle ? ' · ' + escapeHtml(c.twitchHandle) : '') +
                '</a>'
              : '';
            var catalog = c.href && String(c.href).charAt(0) === '/'
              ? '<a class="gtarp-card-catalog" href="' +
                escapeHtml(c.href) +
                '">' +
                escapeHtml(i18n('pages.games.gtarpOpenCatalog', 'Arquivo no site')) +
                '</a>'
              : '';
            return (
              '<article class="gtarp-card' +
              featured +
              '">' +
              '<p class="gtarp-card-role">' +
              escapeHtml(c.role || '') +
              '</p>' +
              '<h2>' +
              escapeHtml(c.name || '') +
              '</h2>' +
              '<p class="gtarp-streamer-label">' +
              escapeHtml(i18n('pages.games.gtarpStreamersTitle', 'Canais de streamer')) +
              '</p>' +
              '<p class="gtarp-card-streamers">' +
              kick +
              yt +
              twitch +
              '</p>' +
              '<p class="gtarp-card-blurb">' +
              escapeHtml(c.blurb || '') +
              '</p>' +
              catalog +
              '</article>'
            );
          })
          .join('');
      })
      .catch(function () {
        var empty =
          '<p class="empty-message">' +
          escapeHtml(i18n('pages.games.gtarpEmpty', 'Ainda sem personagens com canal no catálogo.')) +
          '</p>';
        if (box) box.innerHTML = empty;
        if (streamers) streamers.innerHTML = empty;
      });
  }

  function renderChannelMeta(creator) {
    var title = document.getElementById('jogos-catalog-title');
    var desc = document.getElementById('jogos-catalog-desc');
    var yt = document.getElementById('jogos-channel-yt');
    var kick = document.getElementById('jogos-channel-kick');
    var insp = document.getElementById('jogos-channel-inspection');
    if (title) title.textContent = i18n(creator.nameKey, creator.nameFallback);
    if (desc) desc.textContent = i18n(creator.descKey, creator.descFallback);
    if (kick) {
      if (creator.kick) {
        kick.href = creator.kick;
        kick.hidden = false;
      } else {
        kick.hidden = true;
      }
    }
    if (yt) {
      yt.href = creator.yt;
      yt.hidden = !creator.yt;
    }
    if (insp) {
      if (creator.inspection) {
        insp.href = creator.inspection;
        insp.hidden = false;
      } else {
        insp.hidden = true;
      }
    }
    if (document.title && creator) {
      document.title = i18n(creator.nameKey, creator.nameFallback) + ' | ' + i18n('pages.games.docTitle', 'Jogos | Inspetor BudGanja');
    }
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

  function renderFilters() {
    var nav = document.getElementById('jogos-filters');
    if (!nav || !catalog) return;
    var cats = catalog.categories || [];
    nav.innerHTML =
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
  }

  function cardHtml(creator, v) {
    var title = v.title || '';
    var thumb = v.thumb || (isValidVideoId(v.id) ? 'https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg' : '');
    var href = videoHref(creator, v.id);
    return (
      '<article class="video-card card" data-video-id="' +
      escapeHtml(v.id) +
      '">' +
      '<a class="video-card-link" href="' +
      escapeHtml(href) +
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
      '</a>' +
      '</article>'
    );
  }

  function renderVideos() {
    var grid = document.getElementById('jogos-videos');
    var more = document.getElementById('jogos-load-more');
    if (!grid || !activeCreator) return;
    if (!catalog || !catalog.videos) {
      grid.innerHTML =
        '<p class="empty-message">' + escapeHtml(i18n(activeCreator.emptyKey, activeCreator.emptyFallback)) + '</p>';
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
    grid.innerHTML =
      '<div class="videos-grid">' +
      slice
        .map(function (v) {
          return cardHtml(activeCreator, v);
        })
        .join('') +
      '</div>';
    if (more) more.hidden = slice.length >= list.length;
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
        if (pageMode() === 'catalog') {
          renderFilters();
          renderVideos();
        }
        return doc;
      })
      .catch(function () {
        catalog = null;
        if (pageMode() === 'catalog') {
          renderFilters();
          renderVideos();
        }
        return null;
      });
  }

  function findVideo(id) {
    var list = (catalog && catalog.videos) || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function renderWatch(creator, video, id) {
    var box = document.getElementById('jogos-watch');
    var back = document.getElementById('jogos-back');
    if (back) {
      back.href = creator ? creator.href : '/jogos/';
      back.textContent = creator
        ? i18n(creator.nameKey, creator.nameFallback)
        : i18n('pages.games.backToGames', 'Jogos');
    }
    if (!box) return;
    if (!isValidVideoId(id)) {
      box.innerHTML =
        '<p class="empty-message">' +
        escapeHtml(i18n('pages.games.videoMissing', 'Vídeo não encontrado.')) +
        '</p>';
      return;
    }
    var title = (video && video.title) || i18n('pages.games.videoFallbackTitle', 'Vídeo');
    var date = video && video.published ? formatDate(video.published) : '';
    var yt = (video && video.url) || 'https://www.youtube.com/watch?v=' + id;
    document.title = title + ' | ' + i18n('pages.games.docTitle', 'Jogos | Inspetor BudGanja');
    box.innerHTML =
      '<div class="jogos-watch-player">' +
      '<div class="video-embed">' +
      '<iframe src="https://www.youtube-nocookie.com/embed/' +
      escapeHtml(id) +
      '?rel=0" title="' +
      escapeHtml(title) +
      '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
      '</div>' +
      '<h1 class="jogos-watch-title">' +
      escapeHtml(title) +
      '</h1>' +
      (date ? '<p class="jogos-watch-date">' + escapeHtml(date) + '</p>' : '') +
      '<p class="jogos-watch-actions">' +
      '<a class="botao botao-outline" href="' +
      escapeHtml(yt) +
      '" target="_blank" rel="noopener noreferrer">' +
      escapeHtml(i18n('pages.videos.continueOnYoutube', 'Continuar no YouTube')) +
      '</a>' +
      '</p>' +
      '</div>';
  }

  function setCategory(id) {
    activeCategory = id || '';
    visibleCount = PAGE_SIZE;
    renderFilters();
    renderVideos();
  }

  function bindCatalog() {
    if (bound) return;
    bound = true;
    var nav = document.getElementById('jogos-filters');
    var more = document.getElementById('jogos-load-more');
    var search = document.getElementById('jogos-search');
    if (nav) {
      nav.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-category]');
        if (!btn) return;
        setCategory(btn.getAttribute('data-category') || '');
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
          visibleCount = PAGE_SIZE;
          renderVideos();
        }, 180);
      });
    }
  }

  function loadNotebooks() {
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
  }

  function bindGtarpApply() {
    var form = document.getElementById('gtarp-apply-form');
    if (!form || form.getAttribute('data-bound')) return;
    form.setAttribute('data-bound', '1');
    var statusEl = document.getElementById('gtarp-apply-status');
    var btn = document.getElementById('gtarp-apply-submit');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (statusEl) statusEl.textContent = i18n('pages.games.gtarpApplySending', 'A enviar…');
      if (btn) btn.disabled = true;
      var payload = {
        characterName: (document.getElementById('gtarp-character') || {}).value || '',
        role: (document.getElementById('gtarp-role') || {}).value || '',
        youtubeUrl: (document.getElementById('gtarp-youtube') || {}).value || '',
        kickUrl: (document.getElementById('gtarp-kick') || {}).value || '',
        twitchUrl: (document.getElementById('gtarp-twitch') || {}).value || '',
        contactName: (document.getElementById('gtarp-contact-name') || {}).value || '',
        contactEmail: (document.getElementById('gtarp-contact-email') || {}).value || '',
        notes: (document.getElementById('gtarp-notes') || {}).value || '',
        adult: !!(document.getElementById('gtarp-adult') || {}).checked,
        terms: !!(document.getElementById('gtarp-terms') || {}).checked,
        website: (document.getElementById('gtarp-website') || {}).value || ''
      };
      fetch('/api/gtarp/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload)
      })
        .then(function (r) {
          return r.json().then(function (data) {
            return { ok: r.ok, status: r.status, data: data };
          });
        })
        .then(function (res) {
          if (btn) btn.disabled = false;
          if (!res.ok) {
            if (statusEl) {
              statusEl.textContent =
                (res.data && res.data.error) ||
                i18n('pages.games.gtarpApplyError', 'Não foi possível enviar. Tenta de novo.');
            }
            return;
          }
          form.reset();
          if (statusEl) {
            statusEl.textContent = i18n(
              'pages.games.gtarpApplyOk',
              'Candidatura recebida. O laboratório revê e, se entrar, a personagem aparece nesta página.'
            );
          }
        })
        .catch(function () {
          if (btn) btn.disabled = false;
          if (statusEl) {
            statusEl.textContent = i18n(
              'pages.games.gtarpApplyError',
              'Não foi possível enviar. Tenta de novo.'
            );
          }
        });
    });
  }

  function load() {
    if (redirectLegacyHub()) return;
    var mode = pageMode();
    if (mode === 'hub') {
      renderHub();
      return;
    }
    if (mode === 'gtarp') {
      renderGtarpHub();
      bindGtarpApply();
      return;
    }
    if (mode === 'cadernos') {
      loadNotebooks();
      return;
    }
    if (mode === 'catalog') {
      activeCreator = resolveCreatorFromLocation() || CREATORS[0];
      visibleCount = PAGE_SIZE;
      bindCatalog();
      renderChannelMeta(activeCreator);
      loadCatalog(activeCreator);
      return;
    }
    if (mode === 'watch') {
      activeCreator = resolveCreatorFromLocation();
      var videoId = resolveVideoId();
      if (activeCreator) {
        loadCatalog(activeCreator).then(function () {
          renderWatch(activeCreator, findVideo(videoId), videoId);
        });
      } else if (isValidVideoId(videoId)) {
        renderWatch(null, { id: videoId, title: '', url: 'https://www.youtube.com/watch?v=' + videoId }, videoId);
      } else {
        renderWatch(null, null, '');
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
