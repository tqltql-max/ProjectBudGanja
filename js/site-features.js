(function () {
  'use strict';

  var HOME = '/';

  var BREADCRUMBS = {
    'guia/cultivo-basico.html': [{ label: 'Início', href: HOME }, { label: 'Guia de Cultivo' }],
    'biblioteca/pesquisas/index.html': [{ label: 'Início', href: HOME }, { label: 'Pesquisas' }],
    'biblioteca/inspecoes/index.html': [{ label: 'Início', href: HOME }, { label: 'Inspeções' }],
    'equipamentos/index.html': [{ label: 'Início', href: HOME }, { label: 'Equipamentos' }],
    'loja/index.html': [{ label: 'Início', href: HOME }, { label: 'Loja' }],
    'index.html': [{ label: 'Início' }],
    'calculadoras/index.html': [{ label: 'Início', href: HOME }, { label: 'Ferramentas' }],
    'calculadoras/luximetro.html': [{ label: 'Início', href: HOME }, { label: 'Ferramentas', href: '/calculadoras/' }, { label: 'Luxímetro' }],
    'sorteios/index.html': [{ label: 'Início', href: HOME }, { label: 'Sorteios' }],
    'cultivo/index.html': [{ label: 'Início', href: HOME }, { label: 'Diário de Cultivo' }],
    'perfil.html': [{ label: 'Início', href: HOME }, { label: 'Minha conta' }],
    'login.html': [{ label: 'Início', href: HOME }, { label: 'Admin' }],
    'videos/index.html': [{ label: 'Início', href: HOME }, { label: 'Últimos vídeos' }],
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
      btn.setAttribute('aria-label', light ? 'Ativar tema escuro' : 'Ativar tema claro');
      btn.title = light ? 'Tema escuro' : 'Tema claro';
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
      'Loja': 'nav.shop',
      'Calculadoras': 'nav.calculators',
      'Ferramentas': 'nav.calculators',
      'Sorteios': 'nav.giveaways',
      'Admin': 'common.panel',
      'Últimos vídeos': 'nav.videos',
      'Sobre': 'nav.about',
      'Contato': 'nav.contact',
      'Privacidade': 'nav.privacy',
      'Clonadora de 6 estacas': 'menu.clonadora-6.label',
      'Clonadora de 12 estacas': 'menu.clonadora-12.label',
      'Clonadoras': 'menu.clonadoras.label',
      'Substratos': 'menu.substratos.tileLabel'
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
        { label: 'Calculadoras', href: '/calculadoras/' },
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
      : 'Buscar (Ctrl+K)';

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
      els.results.innerHTML = '<li class="site-search-hint">Digite para buscar páginas e artigos</li>';
      return;
    }
    var matches = (searchIndex || []).filter(function (item) {
      var hay = (item.title + ' ' + item.excerpt + ' ' + item.text).toLowerCase();
      return hay.indexOf(query) >= 0;
    }).slice(0, 8);

    if (!matches.length) {
      els.results.innerHTML = '<li class="site-search-hint">Nenhum resultado para “' + escapeHtml(query) + '”</li>';
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
        name: 'Últimos vídeos — Inspetor BudGanja',
        url: window.location.href.split('#')[0]
      });
      head.appendChild(script);
    }
  }

  function boot() {
    initTheme();
    injectBreadcrumbs();
    initSearch();
    injectJsonLd();
  }

  window.budganjaReinitChrome = function () {
    initTheme();
    initSearch();
  };

  window.budganjaSetSearchOpen = function (open) {
    setSearchOpen(open);
  };

  window.addEventListener('budganja:locale-change', function () {
    document.querySelectorAll('.site-breadcrumbs').forEach(function (el) { el.remove(); });
    injectBreadcrumbs();
    if (window.BudGanjaI18n) window.BudGanjaI18n.apply();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
