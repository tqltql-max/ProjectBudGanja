(function () {
  'use strict';

  var HOME = '/';

  var BREADCRUMBS = {
    'guia/cultivo-basico.html': [{ label: 'Início', href: HOME }, { label: 'Guia de Cultivo' }],
    'biblioteca/pesquisas/index.html': [{ label: 'Início', href: HOME }, { label: 'Pesquisas' }],
    'biblioteca/inspecoes/index.html': [{ label: 'Início', href: HOME }, { label: 'Inspeções' }],
    'equipamentos/index.html': [{ label: 'Início', href: HOME }, { label: 'Equipamentos' }],
    'index.html': [{ label: 'Início' }],
    'calculadoras/index.html': [{ label: 'Início', href: HOME }, { label: 'Ferramentas' }],
    'calculadoras/luximetro.html': [{ label: 'Início', href: HOME }, { label: 'Ferramentas', href: '/calculadoras/' }, { label: 'Luxímetro' }],
    'sorteios/index.html': [{ label: 'Início', href: HOME }, { label: 'Sorteios' }],
    'cultivo/index.html': [{ label: 'Início', href: HOME }, { label: 'Diário de Pesquisas' }],
    'perfil.html': [{ label: 'Início', href: HOME }, { label: 'Minha conta' }],
    'login.html': [{ label: 'Início', href: HOME }, { label: 'Admin' }],
    'videos/index.html': [{ label: 'Início', href: HOME }, { label: 'Vídeos' }],
    'radio/index.html': [{ label: 'Início', href: HOME }, { label: 'Rádio' }],
    'comunidade/index.html': [{ label: 'Início', href: HOME }, { label: 'Comunidade' }],
    'info/sobre.html': [{ label: 'Início', href: HOME }, { label: 'Sobre' }],
    'info/contato.html': [{ label: 'Início', href: HOME }, { label: 'Contato' }],
    'info/privacidade.html': [{ label: 'Início', href: HOME }, { label: 'Privacidade' }],
    'equipamentos/clonadora-6-estacas.html': [{ label: 'Início', href: HOME }, { label: 'Equipamentos', href: '/equipamentos/' }, { label: 'Clonadora de 6 estacas' }],
    'equipamentos/clonadora-12-estacas.html': [{ label: 'Início', href: HOME }, { label: 'Equipamentos', href: '/equipamentos/' }, { label: 'Clonadora de 12 estacas' }],
    'equipamentos/manual-clonadora.html': [{ label: 'Início', href: HOME }, { label: 'Equipamentos', href: '/equipamentos/' }, { label: 'Clonadoras' }],
    'equipamentos/manual-hidrocloradora.html': [{ label: 'Início', href: HOME }, { label: 'Equipamentos', href: '/equipamentos/' }, { label: 'Clonadora de 12 estacas', href: '/equipamentos/clonadora-12-estacas.html' }],
    'biblioteca/pesquisas/substratos.html': [{ label: 'Início', href: HOME }, { label: 'Pesquisas', href: '/biblioteca/pesquisas/' }, { label: 'Substratos' }]
  };

  var POST_PARENT = {
    pesquisa: { label: 'Pesquisas', href: '/biblioteca/pesquisas/' },
    inspecao: { label: 'Inspeções', href: '/biblioteca/inspecoes/' },
    equipamento: { label: 'Equipamentos', href: '/equipamentos/' }
  };

  function currentPage() {
    var path = window.location.pathname.replace(/^\/+/, '');
    if (!path) return 'index.html';
    if (path.endsWith('/')) return path + 'index.html';
    return path;
  }

  function initTheme() {
    var stored = localStorage.getItem('budganja-theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }

    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    function syncLabel() {
      var light = document.documentElement.getAttribute('data-theme') === 'light';
      var darkLabel = window.BudGanjaI18n ? window.BudGanjaI18n.t('common.themeDark', 'Ativar tema escuro') : 'Ativar tema escuro';
      var lightLabel = window.BudGanjaI18n ? window.BudGanjaI18n.t('common.themeLight', 'Ativar tema claro') : 'Ativar tema claro';
      btn.setAttribute('aria-label', light ? darkLabel : lightLabel);
      btn.title = light ? darkLabel : lightLabel;
    }

    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('budganja-theme', next);
      syncLabel();
    });

    syncLabel();
  }

  function crumbLabel(label) {
    var map = {
      'Início': 'common.home',
      'Guia de Cultivo': 'nav.growingGuide',
      'Pesquisas': 'nav.research',
      'Inspeções': 'nav.inspections',
      'Equipamentos': 'nav.equipment',
      'Calculadoras': 'nav.calculators',
      'Ferramentas': 'nav.calculators',
      'Sorteios': 'nav.giveaways',
      'Admin': 'common.panel',
      'Últimos vídeos': 'nav.videos',
      'Vídeos': 'nav.videos',
      'Sobre': 'nav.about',
      'Contato': 'nav.contact',
      'Privacidade': 'nav.privacy',
      'Diário de Pesquisas': 'nav.growDiary',
      'Diário de pesquisas': 'nav.growDiary',
      'Rádio': 'nav.radio',
      'Comunidade': 'nav.community',
      'Luxímetro': 'nav.luxMeter',
      'Minha conta': 'common.profile',
      'Clonadora de 6 estacas': 'menu.clonadora-6.label',
      'Clonadora de 12 estacas': 'menu.clonadora-12.label',
      'Clonadoras': 'menu.clonadoras.label',
      'Substratos': 'menu.substratos.tileLabel',
      'Plantas': 'nav.plants',
      'UNIFESP': 'nav.unifesp',
      'Curso UNIFESP': 'menu.unifesp.label'
    };
    if (window.BudGanjaI18n && map[label]) return window.BudGanjaI18n.t(map[label], label);
    return label;
  }

  function injectBreadcrumbs() {
    var page = document.body.dataset.page;
    if (!page || page === 'home' || page === 'login' || page === 'admin' || page === 'sorteios-admin') return;

    var file = currentPage();
    var crumbs = BREADCRUMBS[file] ? BREADCRUMBS[file].slice() : [{ label: 'Início', href: HOME }];

    var calcMatch = file.match(/^calculadoras\/([^/]+)\.html$/);
    if (calcMatch && calcMatch[1] !== 'index') {
      var calcTitle = document.querySelector('main h1');
      crumbs = [
        { label: 'Início', href: HOME },
        { label: 'Ferramentas', href: '/calculadoras/' },
        { label: calcTitle ? calcTitle.textContent.trim() : 'Calculadora' }
      ];
    } else if (document.body.dataset.postSlug && POST_PARENT[page]) {
      var h1 = document.querySelector('main h1');
      var title = h1 ? h1.textContent.trim() : 'Artigo';
      var parent = POST_PARENT[page];
      crumbs = [
        { label: 'Início', href: HOME },
        { label: parent.label, href: parent.href },
        { label: title }
      ];
    }

    if (crumbs.length <= 1) return;

    var nav = document.createElement('nav');
    nav.className = 'site-breadcrumbs';
    nav.setAttribute('aria-label', 'Breadcrumb');
    nav.innerHTML = '<ol class="site-breadcrumbs-list">' + crumbs.map(function (c, i) {
      var label = crumbLabel(c.label);
      var isLast = i === crumbs.length - 1;
      if (isLast || !c.href) {
        return '<li class="site-breadcrumbs-item" aria-current="page">' + escapeHtml(label) + '</li>';
      }
      return '<li class="site-breadcrumbs-item"><a href="' + escapeHtml(c.href) + '">' + escapeHtml(label) + '</a></li>';
    }).join('') + '</ol>';

    var header = document.getElementById('site-header');
    if (header) header.insertAdjacentElement('afterend', nav);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  var searchIndex = null;
  var searchOpen = false;

  function searchLabel(key, fallback) {
    if (window.BudGanjaI18n && typeof window.BudGanjaI18n.t === 'function') {
      return window.BudGanjaI18n.t(key, fallback);
    }
    return fallback;
  }

  function getSearchElements() {
    return {
      panel: document.getElementById('site-search'),
      toggle: document.getElementById('search-toggle'),
      input: document.getElementById('site-search-input'),
      results: document.getElementById('site-search-results')
    };
  }

  function setSearchOpen(open) {
    searchOpen = !!open;
    var els = getSearchElements();
    if (!els.panel || !els.toggle) return;

    els.panel.hidden = !searchOpen;
    els.toggle.setAttribute('aria-expanded', searchOpen ? 'true' : 'false');
    els.toggle.classList.toggle('is-active', searchOpen);
    els.toggle.setAttribute(
      'aria-label',
      searchOpen
        ? searchLabel('common.searchClose', 'Fechar busca')
        : searchLabel('common.searchOpen', 'Buscar no site')
    );
    els.toggle.title = searchOpen
      ? searchLabel('common.searchClose', 'Fechar busca')
      : searchLabel('common.searchShortcut', 'Buscar (Ctrl+K)');

    if (searchOpen && els.input) {
      els.input.focus();
      loadSearchIndex().then(function () { renderSearchResults(els.input.value); });
    }
  }

  function loadSearchIndex() {
    if (searchIndex) return Promise.resolve(searchIndex);
    return fetch('/search-index.json')
      .then(function (r) { return r.ok ? r.json() : { items: [] }; })
      .then(function (data) {
        searchIndex = data.items || [];
        return searchIndex;
      })
      .catch(function () {
        searchIndex = [];
        return searchIndex;
      });
  }

  function renderSearchResults(q) {
    var els = getSearchElements();
    if (!els.results) return;

    var query = String(q || '').trim().toLowerCase();
    if (!query) {
      els.results.innerHTML = '<li class="site-search-hint">' + escapeHtml(searchLabel('common.searchHint', 'Digite para buscar páginas e artigos')) + '</li>';
      return;
    }
    var matches = (searchIndex || []).filter(function (item) {
      var hay = (item.title + ' ' + item.excerpt + ' ' + item.text).toLowerCase();
      return hay.indexOf(query) >= 0;
    }).slice(0, 8);

    if (!matches.length) {
      var noResults = searchLabel('common.searchNoResults', 'Nenhum resultado para “{q}”').replace('{q}', query);
      els.results.innerHTML = '<li class="site-search-hint">' + escapeHtml(noResults) + '</li>';
      return;
    }

    els.results.innerHTML = matches.map(function (item) {
      var url = item.url && item.url.charAt(0) === '/' ? item.url : '/' + String(item.url || '').replace(/^\/+/, '');
      return (
        '<li><a href="' + escapeHtml(url) + '" class="site-search-hit">' +
        '<span class="site-search-hit-title">' + escapeHtml(item.title) + '</span>' +
        (item.excerpt ? '<span class="site-search-hit-excerpt">' + escapeHtml(item.excerpt) + '</span>' : '') +
        '</a></li>'
      );
    }).join('');
  }

  function initSearch() {
    var els = getSearchElements();
    if (!els.panel || !els.toggle || !els.input || !els.results) return;

    if (els.toggle.dataset.searchBound === '1') {
      setSearchOpen(searchOpen);
      return;
    }
    els.toggle.dataset.searchBound = '1';

    els.toggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      setSearchOpen(!searchOpen);
    });

    var closeBtn = els.panel.querySelector('.site-search-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        setSearchOpen(false);
      });
    }

    els.input.addEventListener('input', function () {
      renderSearchResults(els.input.value);
    });

    if (!window.__budganjaSearchDocBound) {
      window.__budganjaSearchDocBound = true;

      document.addEventListener('click', function (e) {
        if (!searchOpen) return;
        var current = getSearchElements();
        if (!current.panel || !current.toggle) return;
        if (current.panel.contains(e.target) || current.toggle.contains(e.target)) return;
        setSearchOpen(false);
      });

      document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          setSearchOpen(!searchOpen);
        }
        if (e.key === 'Escape' && searchOpen) setSearchOpen(false);
      });
    }

    setSearchOpen(false);
  }

  var SHARE_ICON_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>';

  /* Ícone Android/Material — o “oito deitado” clássico de partilha */
  var SHARE_ICON_FLAT_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11A2.99 2.99 0 0 0 18 7.91c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L7.96 9.81A2.99 2.99 0 0 0 6 9.09c-1.66 0-3 1.34-3 3s1.34 3 3 3c.76 0 1.44-.3 1.96-.77l7.12 4.16c-.05.21-.08.43-.08.61 0 1.61 1.31 2.91 2.92 2.91s2.92-1.3 2.92-2.91-1.31-2.91-2.92-2.91z"/></svg>';

  function tShare(key, fallback) {
    if (window.BudGanjaI18n && typeof window.BudGanjaI18n.t === 'function') {
      return window.BudGanjaI18n.t(key, fallback);
    }
    return fallback;
  }

  var PRODUCTION_ORIGIN = 'https://inspetorbudganja.com.br';

  function canonicalShareUrl() {
    var ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      var fromOg = String(ogUrl.getAttribute('content') || '').trim();
      if (fromOg) return fromOg.split('#')[0].split('?')[0];
    }
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && canonical.href) {
      return String(canonical.href).split('#')[0].split('?')[0];
    }
    var path = window.location.pathname || '/';
    if (/localhost|127\.0\.0\.1/i.test(window.location.hostname || '')) {
      return PRODUCTION_ORIGIN + path;
    }
    return window.location.origin + path;
  }

  function resolveShareImageUrl() {
    var dataImg = document.querySelector('[data-share-image]');
    if (dataImg) {
      var src = dataImg.getAttribute('data-share-image') || dataImg.getAttribute('src') || '';
      if (src) {
        if (/^https?:\/\//i.test(src)) return src;
        if (src.charAt(0) === '/') return window.location.origin + src;
        return window.location.origin + '/' + src.replace(/^\/+/, '');
      }
    }
    var og = document.querySelector('meta[property="og:image"]');
    var content = og && og.getAttribute('content');
    if (!content) return '';
    if (/^https?:\/\//i.test(content)) {
      // Em local, preferir a cópia no origin atual para anexar o ficheiro.
      try {
        var u = new URL(content);
        if (/localhost|127\.0\.0\.1/i.test(window.location.hostname || '') &&
            /inspetorbudganja\.com\.br$/i.test(u.hostname)) {
          return window.location.origin + u.pathname;
        }
      } catch (e) { /* ignore */ }
      return content;
    }
    if (content.charAt(0) === '/') return window.location.origin + content;
    return window.location.origin + '/' + content.replace(/^\/+/, '');
  }

  function sharePagePayload(files) {
    var h1 = document.querySelector('.article-header h1, main h1');
    var title = (h1 && h1.textContent.trim()) || document.title || 'Inspetor BudGanja';
    var descMeta = document.querySelector('meta[name="description"]');
    var desc = (descMeta && descMeta.getAttribute('content')) || title;
    var url = canonicalShareUrl();
    // Não incluir o URL em `text`: WhatsApp e outros apps concatenam text+url
    // e acabam a enviar o mesmo link duas vezes.
    var payload = {
      title: title,
      text: desc,
      url: url
    };
    if (files && files.length) payload.files = files;
    return payload;
  }

  function fetchShareImageFile() {
    var imageUrl = resolveShareImageUrl();
    if (!imageUrl) return Promise.resolve(null);
    return fetch(imageUrl, { credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) throw new Error('cover ' + res.status);
        return res.blob();
      })
      .then(function (blob) {
        if (!blob || !blob.type || blob.type.indexOf('image/') !== 0) return null;
        var ext = blob.type.indexOf('png') >= 0 ? 'png' : blob.type.indexOf('webp') >= 0 ? 'webp' : 'jpg';
        var file;
        try {
          file = new File([blob], 'capa-budganja.' + ext, { type: blob.type });
        } catch (e) {
          file = blob;
          file.name = 'capa-budganja.' + ext;
        }
        return file;
      })
      .catch(function () {
        return null;
      });
  }

  function copyShareUrl(url) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(url).then(function () {
        return 'copied';
      }).catch(function () {
        return fallbackSharePrompt(url);
      });
    }
    return Promise.resolve(fallbackSharePrompt(url));
  }

  function fallbackSharePrompt(url) {
    try {
      if (window.prompt) window.prompt(tShare('common.share', 'Compartilhar') + ':', url);
    } catch (e) { /* ignore */ }
    return 'fallback';
  }

  function showShareFeedback(btn, result) {
    if (result !== 'copied' && result !== 'fallback') return;
    var wrap = btn.closest('.article-share');
    var feedback = wrap && wrap.querySelector('[data-post-share-feedback]');
    var msg = tShare('common.shareCopied', 'Link copiado!');
    btn.classList.add('is-copied');
    if (feedback) {
      feedback.hidden = false;
      feedback.textContent = msg;
    } else {
      btn.setAttribute('data-tip', msg);
    }
    window.setTimeout(function () {
      btn.classList.remove('is-copied');
      if (feedback) {
        feedback.hidden = true;
        feedback.textContent = '';
      }
    }, 2200);
  }

  function canShareFiles(files) {
    if (!files || !files.length || typeof navigator.canShare !== 'function') return false;
    try {
      return navigator.canShare({ files: files });
    } catch (e) {
      return false;
    }
  }

  function bindShareButton(btn) {
    if (!btn || btn.dataset.shareBound === '1') return;
    btn.dataset.shareBound = '1';
    btn.addEventListener('click', function () {
      var run = fetchShareImageFile().then(function (file) {
        var files = file ? [file] : null;
        var withFiles = sharePagePayload(canShareFiles(files) ? files : null);
        var withoutFiles = sharePagePayload(null);

        if (typeof navigator.share !== 'function') {
          return copyShareUrl(withoutFiles.url);
        }

        return navigator.share(withFiles).then(function () {
          return 'shared';
        }).catch(function (err) {
          if (err && err.name === 'AbortError') return 'shared';
          // Alguns browsers rejeitam files — tentar só link.
          if (withFiles.files) {
            return navigator.share(withoutFiles).then(function () {
              return 'shared';
            }).catch(function (err2) {
              if (err2 && err2.name === 'AbortError') return 'shared';
              return copyShareUrl(withoutFiles.url);
            });
          }
          return copyShareUrl(withoutFiles.url);
        });
      });

      run.then(function (result) {
        showShareFeedback(btn, result);
      }).catch(function () { /* ignore */ });
    });
  }

  function buildShareWrap(ariaKey, ariaFallback) {
    var wrap = document.createElement('div');
    wrap.className = 'article-share';
    wrap.innerHTML =
      '<button type="button" class="article-share-btn" data-post-share data-i18n-aria="' + ariaKey + '" aria-label="' +
      tShare(ariaKey, ariaFallback) +
      '">' +
      '<span class="article-share-icon" aria-hidden="true">' + SHARE_ICON_SVG + '</span>' +
      '<span data-i18n="common.share">' + tShare('common.share', 'Compartilhar') + '</span>' +
      '</button>' +
      '<span class="article-share-feedback" data-post-share-feedback hidden aria-live="polite"></span>';
    return wrap;
  }

  function pageShareSkipped() {
    var page = (document.body && document.body.dataset.page) || '';
    if (/admin/i.test(page)) return true;
    if (page === 'entrar' || page === 'login' || page === 'radio' || page === 'home') return true;
    return false;
  }

  /** Insere o botão se a página de artigo ainda não tiver (manuais CMS, etc.). */
  function ensureArticleShareButton() {
    var header = document.querySelector('.article-page .article-header, .relatorio-container .article-header');
    if (!header || header.querySelector('[data-post-share]')) return;
    var h1 = header.querySelector('h1');
    if (!h1) return;

    var wrap = buildShareWrap('common.shareAria', 'Compartilhar esta publicação');
    var meta = header.querySelector('.meta-info');
    if (meta) header.insertBefore(wrap, meta);
    else h1.insertAdjacentElement('afterend', wrap);
  }

  /**
   * Botão Compartilhar nos hubs/páginas (não na home — o hero não deve ter este CTA).
   */
  function ensurePageShareButton() {
    if (pageShareSkipped()) return;
    if (document.querySelector('[data-post-share]')) return;

    var hubHeader = document.querySelector(
      '.plantas-hub-header, .inspecoes-hub-header, .videos-header, ' +
      '.pesquisas-hub-header, .equipamentos-page-header, .calculadoras-header, ' +
      '.unifesp-hub-header, .comunidade-header, .sorteios-header, ' +
      'main.conteudo-interno > header, main.conteudo > header, main > header'
    );
    var winterSlot = document.getElementById('inverno-share-slot');
    if (winterSlot && !winterSlot.querySelector('[data-post-share]')) {
      winterSlot.appendChild(buildShareWrap('common.sharePageAria', 'Compartilhar esta página'));
      return;
    }

    if (hubHeader && !hubHeader.querySelector('[data-post-share]')) {
      var hubH1 = hubHeader.querySelector('h1');
      if (hubH1) {
        hubH1.insertAdjacentElement(
          'afterend',
          buildShareWrap('common.sharePageAria', 'Compartilhar esta página')
        );
        return;
      }
    }

    var main = document.getElementById('main-content') || document.querySelector('main');
    if (!main) return;
    var h1 = main.querySelector('h1');
    if (!h1 || h1.closest('.card, .post-card, .home-pillar, .home-channel, .hero-content')) return;
    h1.insertAdjacentElement(
      'afterend',
      buildShareWrap('common.sharePageAria', 'Compartilhar esta página')
    );
  }

  function initPostShare() {
    ensureArticleShareButton();
    ensurePageShareButton();
    document.querySelectorAll('[data-post-share]').forEach(bindShareButton);
  }

  function absoluteVideosShareUrl(id) {
    var path = videosPageUrl(id);
    try {
      if (/localhost|127\.0\.0\.1/i.test(window.location.hostname || '')) {
        return PRODUCTION_ORIGIN + path;
      }
      return window.location.origin + path;
    } catch (e) {
      return PRODUCTION_ORIGIN + path;
    }
  }

  function bindHomeEmbedShareButton(btn) {
    if (!btn || btn.dataset.shareBound === '1') return;
    btn.dataset.shareBound = '1';
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var id = btn.getAttribute('data-youtube-id') || '';
      if (!YT_ID_RE.test(id)) return;
      var title = btn.getAttribute('data-share-title') || 'Vídeo — Inspetor BudGanja';
      var url = absoluteVideosShareUrl(id);
      var payload = { title: title, text: title, url: url };

      var run;
      if (typeof navigator.share === 'function') {
        run = navigator.share(payload).then(function () {
          return 'shared';
        }).catch(function (err) {
          if (err && err.name === 'AbortError') return 'shared';
          return copyShareUrl(url);
        });
      } else {
        run = copyShareUrl(url);
      }

      run.then(function (result) {
        if (result !== 'copied' && result !== 'fallback') return;
        btn.classList.add('is-copied');
        btn.setAttribute('data-tip', tShare('common.shareCopied', 'Link copiado!'));
        window.setTimeout(function () {
          btn.classList.remove('is-copied');
          btn.removeAttribute('data-tip');
        }, 2200);
      }).catch(function () { /* ignore */ });
    });
  }

  /** Só na home: botão partilhar (ícone) nos dois embeds de canal. */
  function ensureHomeEmbedShareButtons() {
    var page = (document.body && document.body.dataset.page) || '';
    if (page !== 'home') return;

    document.querySelectorAll('.home-channel-embed').forEach(function (wrap) {
      if (wrap.querySelector('[data-home-embed-share]')) return;

      var facade = wrap.querySelector('.yt-facade[data-youtube-id]');
      var iframe = wrap.querySelector('iframe[src*="youtube"]');
      var id = '';
      var title = 'YouTube';
      if (facade) {
        id = facade.getAttribute('data-youtube-id') || '';
        title = facade.getAttribute('data-youtube-title') || title;
      } else if (iframe) {
        id = parseYoutubeIdFromSrc(iframe.getAttribute('src') || '');
        title = iframe.getAttribute('title') || title;
      }
      if (!YT_ID_RE.test(id)) return;

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'home-embed-share';
      btn.setAttribute('data-home-embed-share', '');
      btn.setAttribute('data-youtube-id', id);
      btn.setAttribute('data-share-title', title);
      btn.setAttribute('aria-label', tShare('common.share', 'Compartilhar'));
      btn.innerHTML =
        '<span class="article-share-icon" aria-hidden="true">' + SHARE_ICON_FLAT_SVG + '</span>';
      wrap.appendChild(btn);
      bindHomeEmbedShareButton(btn);
    });
  }

  var YT_ID_RE = /^[a-zA-Z0-9_-]{11}$/;

  function youtubeThumbUrl(id) {
    return 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
  }

  function youtubeCcLangPref() {
    var lang = '';
    try {
      if (window.BudGanjaI18n && typeof window.BudGanjaI18n.getLocale === 'function') {
        lang = String(window.BudGanjaI18n.getLocale() || '');
      }
    } catch (e) { /* ignore */ }
    if (!lang && document.documentElement) lang = String(document.documentElement.lang || '');
    lang = lang.toLowerCase();
    if (lang.indexOf('en') === 0) return 'en';
    if (lang.indexOf('es') === 0) return 'es';
    return 'pt';
  }

  function youtubeEmbedSrc(id, autoplay) {
    var cc = youtubeCcLangPref();
    var src =
      'https://www.youtube-nocookie.com/embed/' +
      encodeURIComponent(id) +
      '?rel=0&modestbranding=1&playsinline=1&hl=' +
      encodeURIComponent(cc) +
      '&cc_load_policy=1&cc_lang_pref=' +
      encodeURIComponent(cc);
    try {
      src += '&origin=' + encodeURIComponent(window.location.origin);
    } catch (e) { /* ignore */ }
    if (autoplay) src += '&autoplay=1';
    return src;
  }

  function parseYoutubeIdFromSrc(src) {
    var m = String(src || '').match(/\/embed\/([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : '';
  }

  function videosPageUrl(id) {
    return '/videos/#' + encodeURIComponent(id);
  }

  function isVideosPage() {
    var page = (document.body && document.body.dataset.page) || '';
    if (page === 'videos') return true;
    try {
      return /^\/videos\/?$/.test(window.location.pathname || '');
    } catch (e) {
      return false;
    }
  }

  function loadYoutubeFacade(btn, autoplay) {
    if (!btn || btn.dataset.ytLoaded === '1') return;
    var id = btn.getAttribute('data-youtube-id') || '';
    if (!YT_ID_RE.test(id)) return;
    btn.dataset.ytLoaded = '1';
    var title = btn.getAttribute('data-youtube-title') || btn.getAttribute('aria-label') || 'YouTube';
    var iframe = document.createElement('iframe');
    iframe.src = youtubeEmbedSrc(id, !!autoplay);
    iframe.title = title;
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    iframe.setAttribute('allowfullscreen', '');
    iframe.loading = 'eager';
    var wrap = btn.closest('.video-embed, .yt-facade-host') || btn.parentElement;
    btn.replaceWith(iframe);
    if (wrap && !wrap.classList.contains('is-playing')) wrap.classList.add('is-playing');
  }

  function buildYoutubeFacadeButton(id, title) {
    var safeTitle = title || 'YouTube';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'yt-facade';
    btn.setAttribute('data-youtube-id', id);
    btn.setAttribute('data-youtube-title', safeTitle);
    btn.setAttribute('aria-label', 'Play: ' + safeTitle);
    btn.innerHTML =
      '<img class="yt-facade-thumb" src="' + youtubeThumbUrl(id) + '" alt="" loading="lazy" decoding="async" width="480" height="360">' +
      '<span class="video-card-play" aria-hidden="true"></span>';
    return btn;
  }

  function openYoutubeInVideosPlayer(id) {
    if (!YT_ID_RE.test(id)) return;
    window.location.href = videosPageUrl(id);
  }

  function bindYoutubeFacadeButton(btn) {
    if (!btn || btn.dataset.ytBound === '1') return;
    btn.dataset.ytBound = '1';
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-youtube-id') || '';
      // Home / sala de vídeo: play in-page com som (sem mute) + legendas CC.
      if (btn.closest('.home-vida-embed')) {
        loadYoutubeFacade(btn, true);
        return;
      }
      // Fora de /videos/: abrir o player da página de vídeos
      if (!isVideosPage()) {
        openYoutubeInVideosPlayer(id);
        return;
      }
      loadYoutubeFacade(btn, true);
    });
  }

  /** Troca iframes YouTube por thumbnail + play pequeno (como nos cards). */
  function enhanceYoutubeFacades(root) {
    var scope = root || document;
    scope.querySelectorAll('.video-embed > iframe[src*="youtube"], .home-channel-embed > iframe[src*="youtube"]').forEach(function (iframe) {
      if (iframe.closest('.yt-facade-skip')) return;
      var id = parseYoutubeIdFromSrc(iframe.getAttribute('src') || '');
      if (!YT_ID_RE.test(id)) return;
      var title = iframe.getAttribute('title') || 'YouTube';
      var btn = buildYoutubeFacadeButton(id, title);
      iframe.replaceWith(btn);
      bindYoutubeFacadeButton(btn);
    });
    scope.querySelectorAll('.yt-facade[data-youtube-id]').forEach(bindYoutubeFacadeButton);
  }

  function youtubeFacadeHtml(id, title) {
    if (!YT_ID_RE.test(id)) return '';
    var safeTitle = String(title || 'YouTube')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
    return (
      '<button type="button" class="yt-facade" data-youtube-id="' + id + '" data-youtube-title="' + safeTitle + '" aria-label="Play: ' + safeTitle + '">' +
      '<img class="yt-facade-thumb" src="' + youtubeThumbUrl(id) + '" alt="" loading="lazy" decoding="async" width="480" height="360">' +
      '<span class="video-card-play" aria-hidden="true"></span>' +
      '</button>'
    );
  }

  window.BudGanjaYoutubeFacade = {
    enhance: enhanceYoutubeFacades,
    html: youtubeFacadeHtml,
    load: loadYoutubeFacade,
    embedSrc: youtubeEmbedSrc
  };

  function injectJsonLd(site) {
    var page = document.body.dataset.page;
    var head = document.head;
    if (!head || document.getElementById('jsonld-page')) return;

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'jsonld-page';

    if (page === 'guia-cultivo') {
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Guia de Cultivo Básico',
        description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
        provider: { '@type': 'Organization', name: 'Inspetor BudGanja' },
        url: window.location.href.split('#')[0]
      });
      head.appendChild(script);
      return;
    }

    if (page === 'videos') {
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Vídeos — Inspetor BudGanja',
        url: window.location.href.split('#')[0]
      });
      head.appendChild(script);
    }
  }

  function boot() {
    initTheme();
    injectBreadcrumbs();
    initSearch();
    initPostShare();
    enhanceYoutubeFacades(document);
    ensureHomeEmbedShareButtons();
    injectJsonLd();
  }

  window.budganjaReinitChrome = function () {
    initTheme();
    initSearch();
    enhanceYoutubeFacades(document);
    ensureHomeEmbedShareButtons();
  };

  window.budganjaSetSearchOpen = function (open) {
    setSearchOpen(open);
  };

  window.addEventListener('budganja:locale-change', function () {
    // Aplicar i18n primeiro para o H1/título do post já estar no idioma certo nos breadcrumbs.
    if (window.BudGanjaI18n) window.BudGanjaI18n.apply();
    document.querySelectorAll('.site-breadcrumbs').forEach(function (el) { el.remove(); });
    injectBreadcrumbs();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
