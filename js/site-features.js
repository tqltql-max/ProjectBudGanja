(function () {
  'use strict';

  var HOME = '/inverno/';

  var BREADCRUMBS = {
    'guia/cultivo-basico.html': [{ label: 'Início', href: HOME }, { label: 'Guia de Cultivo' }],
    'biblioteca/pesquisas/index.html': [{ label: 'Início', href: HOME }, { label: 'Pesquisas' }],
    'biblioteca/inspecoes/index.html': [{ label: 'Início', href: HOME }, { label: 'Inspeções' }],
    'objetos/index.html': [{ label: 'Início', href: HOME }, { label: 'Objetos' }],
    'equipamentos/index.html': [{ label: 'Início', href: HOME }, { label: 'Objetos', href: '/objetos/' }],
    'index.html': [{ label: 'Início', href: HOME }, { label: 'Laboratório', href: '/laboratorio/' }],
    'laboratorio/index.html': [{ label: 'Início', href: HOME }, { label: 'Laboratório' }],
    'inverno/index.html': [{ label: 'Bom dia, Inverno' }],
    'vida/index.html': [{ label: 'Início', href: HOME }, { label: 'Vida' }],
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
    'equipamentos/clonadora-6-estacas.html': [{ label: 'Início', href: HOME }, { label: 'Objetos', href: '/objetos/' }, { label: 'Clonadora de 6 estacas' }],
    'equipamentos/clonadora-12-estacas.html': [{ label: 'Início', href: HOME }, { label: 'Objetos', href: '/objetos/' }, { label: 'Clonadora de 12 estacas' }],
    'equipamentos/manual-clonadora.html': [{ label: 'Início', href: HOME }, { label: 'Objetos', href: '/objetos/' }, { label: 'Clonadoras' }],
    'equipamentos/manual-hidrocloradora.html': [{ label: 'Início', href: HOME }, { label: 'Objetos', href: '/objetos/' }, { label: 'Clonadora de 12 estacas', href: '/equipamentos/clonadora-12-estacas.html' }],
    'biblioteca/pesquisas/substratos.html': [{ label: 'Início', href: HOME }, { label: 'Pesquisas', href: '/biblioteca/pesquisas/' }, { label: 'Substratos' }]
  };

  var POST_PARENT = {
    pesquisa: { label: 'Pesquisas', href: '/biblioteca/pesquisas/' },
    inspecao: { label: 'Inspeções', href: '/biblioteca/inspecoes/' },
    equipamento: { label: 'Objetos', href: '/objetos/' }
  };

  function currentPage() {
    var path = window.location.pathname.replace(/^\/+/, '');
    if (!path) return 'index.html';
    if (path.endsWith('/')) return path + 'index.html';
    return path;
  }

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme, persist) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    if (persist) {
      try { localStorage.setItem('budganja-theme', theme); } catch (e) {}
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0a2230' : '#f3f7fb');
    syncThemeButtons();
  }

  function syncThemeButtons() {
    var dark = currentTheme() === 'dark';
    var darkLabel = window.BudGanjaI18n ? window.BudGanjaI18n.t('common.themeDark', 'Ativar tema escuro') : 'Ativar tema escuro';
    var lightLabel = window.BudGanjaI18n ? window.BudGanjaI18n.t('common.themeLight', 'Ativar tema claro') : 'Ativar tema claro';
    var label = dark ? lightLabel : darkLabel;
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-label', label);
      btn.title = label;
      btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    });
  }

  var themeClickBound = false;

  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem('budganja-theme'); } catch (e) {}
    applyTheme(stored === 'dark' ? 'dark' : 'light', false);

    if (themeClickBound) return;
    themeClickBound = true;
    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest && e.target.closest('[data-theme-toggle]');
      if (!btn) return;
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
    });
  }

  function crumbLabel(label) {
    var map = {
      'Início': 'common.home',
      'Guia de Cultivo': 'nav.growingGuide',
      'Pesquisas': 'nav.research',
      'Inspeções': 'nav.inspections',
      'Equipamentos': 'nav.equipment',
      'Objetos': 'nav.equipment',
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
      // Em local, usar a cópia no origin atual para o preview do painel.
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

  function sharePagePayload() {
    var h1 = document.querySelector('.article-header h1, main h1');
    var title = (h1 && h1.textContent.trim()) || document.title || 'Inspetor BudGanja';
    var descMeta = document.querySelector('meta[name="description"]');
    var desc = (descMeta && descMeta.getAttribute('content')) || '';
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (!desc && ogDesc) desc = ogDesc.getAttribute('content') || '';
    var url = canonicalShareUrl();
    return {
      title: title,
      text: desc || title,
      url: url,
      image: resolveShareImageUrl()
    };
  }

  function shareCaption(payload) {
    return String((payload && payload.title) || 'Inspetor BudGanja').replace(/\s+/g, ' ').trim();
  }

  function nativeShareData(payload) {
    return {
      title: shareCaption(payload),
      text: shareCaption(payload),
      url: payload.url
    };
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
    if (!btn || (result !== 'copied' && result !== 'fallback')) return;
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
      } else {
        btn.removeAttribute('data-tip');
      }
    }, 2200);
  }

  function preferNativeShare() {
    if (typeof navigator.share !== 'function') return false;
    var ua = navigator.userAgent || '';
    if (/Android|iPhone|iPad|iPod/i.test(ua)) return true;
    try {
      return window.matchMedia('(pointer: coarse) and (max-width: 900px)').matches;
    } catch (e) {
      return false;
    }
  }

  function nativeShare(payload) {
    var data = nativeShareData(payload);
    if (typeof navigator.share !== 'function') return copyShareUrl(data.url);
    return navigator.share(data).then(function () {
      return 'shared';
    }).catch(function (err) {
      if (err && err.name === 'AbortError') return 'shared';
      return copyShareUrl(data.url);
    });
  }

  function whatsappShareHref(payload) {
    return 'https://api.whatsapp.com/send?text=' +
      encodeURIComponent(shareCaption(payload) + '\n' + payload.url);
  }

  function telegramShareHref(payload) {
    return 'https://t.me/share/url?url=' + encodeURIComponent(payload.url) +
      '&text=' + encodeURIComponent(shareCaption(payload));
  }

  function emailShareHref(payload) {
    var body = payload.url;
    if (payload.text && payload.text !== payload.title) {
      body = payload.text + '\n\n' + payload.url;
    }
    return 'mailto:?subject=' + encodeURIComponent(shareCaption(payload)) +
      '&body=' + encodeURIComponent(body);
  }

  function openShareHref(href) {
    var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || '');
    if (isMobile || href.indexOf('mailto:') === 0) {
      window.location.assign(href);
      return;
    }
    var win = window.open(href, '_blank', 'noopener,noreferrer');
    if (!win) window.location.assign(href);
  }

  var ICON_COPY =
    '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>';
  var ICON_WA =
    '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.76 14.07c-.24.68-1.42 1.25-1.96 1.33-.5.07-1.14.1-1.84-.12-.42-.13-.97-.32-1.67-.62-2.94-1.27-4.85-4.24-5-4.44-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.41.26-.29.57-.36.76-.36h.55c.17 0 .41-.07.64.49.24.58.82 2 .89 2.15.07.14.12.32.02.51-.1.2-.14.32-.29.49-.14.17-.31.38-.44.51-.14.14-.29.29-.12.57.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.14.46.12.63-.07.17-.2.72-.84.91-1.13.19-.29.39-.24.64-.14.26.1 1.64.77 1.92.91.29.14.48.22.55.34.07.12.07.68-.17 1.36z"/></svg>';
  var ICON_TG =
    '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M9.78 15.44 9.5 19.3c.4 0 .57-.17.78-.37l1.87-1.8 3.88 2.85c.71.39 1.22.19 1.41-.66l2.56-12.05c.23-1.02-.37-1.42-1.06-1.17L3.74 10.4c-.98.38-.96.93-.17 1.18l4.43 1.38 10.3-6.5c.49-.3.93-.13.57.19z"/></svg>';
  var ICON_MAIL =
    '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>';
  var ICON_CLOSE =
    '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.3 9.17 12 2.89 5.71 4.3 4.29l6.29 6.3 6.3-6.3 1.41 1.42z"/></svg>';

  var shareSheet = null;
  var shareSheetPayload = null;
  var shareSheetTrigger = null;

  function clipShareText(s, n) {
    var t = String(s || '').replace(/\s+/g, ' ').trim();
    if (t.length <= n) return t;
    return t.slice(0, n - 1).replace(/\s+\S*$/, '') + '…';
  }

  function refreshShareSheetLabels() {
    if (!shareSheet) return;
    var heading = shareSheet.querySelector('#site-share-heading');
    var closeBtns = shareSheet.querySelectorAll('[data-site-share-close]');
    var copyBtn = shareSheet.querySelector('[data-site-share-copy]');
    var email = shareSheet.querySelector('[data-site-share-email]');
    var more = shareSheet.querySelector('[data-site-share-native]');
    if (heading) heading.textContent = tShare('common.share', 'Compartilhar');
    closeBtns.forEach(function (el) {
      el.setAttribute('aria-label', tShare('common.shareClose', 'Fechar'));
    });
    if (copyBtn) {
      copyBtn.innerHTML = ICON_COPY + '<span>' + tShare('common.shareCopy', 'Copiar link') + '</span>';
    }
    if (email) {
      email.innerHTML = ICON_MAIL + '<span>' + tShare('common.shareEmail', 'E-mail') + '</span>';
    }
    if (more) {
      more.innerHTML = SHARE_ICON_FLAT_SVG + '<span>' + tShare('common.shareMore', 'Mais opções') + '</span>';
    }
  }

  function fillShareSheet(payload) {
    shareSheetPayload = payload;
    var cover = shareSheet.querySelector('[data-site-share-cover]');
    var titleEl = shareSheet.querySelector('[data-site-share-title]');
    var descEl = shareSheet.querySelector('[data-site-share-desc]');
    var urlEl = shareSheet.querySelector('[data-site-share-url]');
    var wa = shareSheet.querySelector('[data-site-share-wa]');
    var tg = shareSheet.querySelector('[data-site-share-tg]');
    var email = shareSheet.querySelector('[data-site-share-email]');
    var nativeBtn = shareSheet.querySelector('[data-site-share-native]');
    if (cover) {
      if (payload.image) {
        cover.hidden = false;
        cover.src = payload.image;
        cover.alt = payload.title || '';
      } else {
        cover.hidden = true;
        cover.removeAttribute('src');
      }
    }
    if (titleEl) titleEl.textContent = payload.title || 'Inspetor BudGanja';
    if (descEl) descEl.textContent = clipShareText(payload.text, 160);
    if (urlEl) urlEl.textContent = payload.url;
    if (wa) wa.href = whatsappShareHref(payload);
    if (tg) tg.href = telegramShareHref(payload);
    if (email) email.href = emailShareHref(payload);
    if (nativeBtn) nativeBtn.hidden = typeof navigator.share !== 'function';
    refreshShareSheetLabels();
  }

  function closeShareSheet() {
    if (!shareSheet || shareSheet.hidden) return;
    shareSheet.hidden = true;
    document.body.classList.remove('site-share-open');
    var trigger = shareSheetTrigger;
    shareSheetTrigger = null;
    if (trigger && typeof trigger.focus === 'function') {
      try { trigger.focus(); } catch (e) { /* ignore */ }
    }
  }

  function ensureShareSheet() {
    if (shareSheet) return shareSheet;
    shareSheet = document.createElement('div');
    shareSheet.id = 'site-share-sheet';
    shareSheet.className = 'site-share-sheet';
    shareSheet.hidden = true;
    shareSheet.innerHTML =
      '<button type="button" class="site-share-backdrop" data-site-share-close></button>' +
      '<div class="site-share-panel" role="dialog" aria-modal="true" aria-labelledby="site-share-heading">' +
        '<div class="site-share-panel-top">' +
          '<p class="site-share-kicker" id="site-share-heading">Compartilhar</p>' +
          '<button type="button" class="site-share-close" data-site-share-close>' + ICON_CLOSE + '</button>' +
        '</div>' +
        '<div class="site-share-preview">' +
          '<img class="site-share-cover" data-site-share-cover alt="" width="1200" height="630" decoding="async">' +
          '<div class="site-share-preview-body">' +
            '<p class="site-share-brand">Inspetor BudGanja</p>' +
            '<strong data-site-share-title></strong>' +
            '<span data-site-share-desc></span>' +
          '</div>' +
        '</div>' +
        '<div class="site-share-actions">' +
          '<button type="button" class="site-share-chip site-share-chip--primary" data-site-share-copy></button>' +
          '<a class="site-share-chip site-share-chip--wa" data-site-share-wa href="#" rel="noopener noreferrer"></a>' +
          '<a class="site-share-chip site-share-chip--tg" data-site-share-tg href="#" rel="noopener noreferrer"></a>' +
          '<a class="site-share-chip" data-site-share-email href="#"></a>' +
          '<button type="button" class="site-share-chip" data-site-share-native hidden></button>' +
        '</div>' +
        '<p class="site-share-url" data-site-share-url></p>' +
      '</div>';
    document.body.appendChild(shareSheet);

    shareSheet.querySelector('[data-site-share-wa]').innerHTML = ICON_WA + '<span>WhatsApp</span>';
    shareSheet.querySelector('[data-site-share-tg]').innerHTML = ICON_TG + '<span>Telegram</span>';
    refreshShareSheetLabels();

    shareSheet.addEventListener('click', function (e) {
      if (e.target.closest('[data-site-share-close]')) {
        e.preventDefault();
        closeShareSheet();
        return;
      }
      var copyBtn = e.target.closest('[data-site-share-copy]');
      if (copyBtn && shareSheetPayload) {
        e.preventDefault();
        copyShareUrl(shareSheetPayload.url).then(function (result) {
          copyBtn.classList.add('is-copied');
          var span = copyBtn.querySelector('span');
          if (span) span.textContent = tShare('common.shareCopied', 'Link copiado!');
          showShareFeedback(shareSheetTrigger, result);
          window.setTimeout(function () {
            closeShareSheet();
            copyBtn.classList.remove('is-copied');
            refreshShareSheetLabels();
          }, 700);
        });
        return;
      }
      var nativeBtn = e.target.closest('[data-site-share-native]');
      if (nativeBtn && shareSheetPayload) {
        e.preventDefault();
        nativeShare(shareSheetPayload).then(function (result) {
          showShareFeedback(shareSheetTrigger, result);
          closeShareSheet();
        });
        return;
      }
      var dest = e.target.closest('[data-site-share-wa], [data-site-share-tg], [data-site-share-email]');
      if (dest && dest.getAttribute('href')) {
        e.preventDefault();
        closeShareSheet();
        openShareHref(dest.getAttribute('href'));
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && shareSheet && !shareSheet.hidden) {
        e.preventDefault();
        closeShareSheet();
      }
    });

    return shareSheet;
  }

  function openShareSheet(payload, trigger) {
    ensureShareSheet();
    shareSheetTrigger = trigger || document.activeElement;
    fillShareSheet(payload);
    shareSheet.hidden = false;
    document.body.classList.add('site-share-open');
    var focusEl = shareSheet.querySelector('[data-site-share-copy]');
    if (focusEl) focusEl.focus();
  }

  function openShare(payload, trigger) {
    if (!payload || !payload.url) return Promise.resolve();
    if (preferNativeShare()) {
      return nativeShare(payload).then(function (result) {
        showShareFeedback(trigger, result);
        return result;
      });
    }
    openShareSheet(payload, trigger);
    return Promise.resolve('sheet');
  }

  window.BudGanjaShare = {
    open: openShare,
    payloadFromPage: sharePagePayload
  };

  function bindShareButton(btn) {
    if (!btn || btn.dataset.shareBound === '1') return;
    btn.dataset.shareBound = '1';
    btn.addEventListener('click', function () {
      openShare(sharePagePayload(), btn);
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
    if (page === 'entrar' || page === 'login' || page === 'radio' || page === 'home' || page === 'vida') return true;
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
      openShare({
        title: title,
        text: title,
        url: url,
        image: youtubeThumbUrl(id)
      }, btn);
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
    syncThemeButtons();
    refreshShareSheetLabels();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
