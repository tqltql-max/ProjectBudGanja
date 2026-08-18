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

  function localizedField(obj, field) {
    var loc = locale();
    if (loc === 'en' && obj[field + 'En']) return obj[field + 'En'];
    if (loc === 'es' && obj[field + 'Es']) return obj[field + 'Es'];
    return obj[field] || '';
  }

  function normalize(s) {
    return String(s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  var catalog = null;
  var activeGroup = 'all';
  var activeQuery = '';
  var searchTimer = null;

  var filtersEl = null;
  var searchEl = null;
  var listEl = null;
  var leadEl = null;
  var countEl = null;

  function groupLabel(id) {
    if (id === 'all') return i18n('pages.guiaPalavras.filterAll', 'Todas');
    var groups = (catalog && catalog.groups) || [];
    for (var i = 0; i < groups.length; i++) {
      if (groups[i].id === id) return localizedField(groups[i], 'label');
    }
    return id;
  }

  function filteredItems() {
    var items = (catalog && catalog.items) || [];
    var q = normalize(activeQuery);
    return items.filter(function (item) {
      if (activeGroup !== 'all' && item.group !== activeGroup) return false;
      if (!q) return true;
      var hay = normalize(
        [item.word, item.simple, item.simpleEn, item.simpleEs, item.id].join(' ')
      );
      return hay.indexOf(q) >= 0;
    });
  }

  function renderFilters() {
    if (!filtersEl || !catalog) return;
    var groups = [{ id: 'all' }].concat(catalog.groups || []);
    var counts = {};
    counts.all = (catalog.items || []).length;
    (catalog.groups || []).forEach(function (g) {
      counts[g.id] = 0;
    });
    (catalog.items || []).forEach(function (item) {
      if (counts[item.group] != null) counts[item.group] += 1;
    });

    filtersEl.innerHTML =
      '<div class="videos-filters" role="toolbar" aria-label="' +
      escapeHtml(i18n('pages.guiaPalavras.filtersLabel', 'Filtrar por grupo')) +
      '">' +
      groups
        .map(function (g) {
          var pressed = activeGroup === g.id;
          var n = counts[g.id] != null ? counts[g.id] : 0;
          return (
            '<button type="button" class="videos-filter-chip' +
            (pressed ? ' is-active' : '') +
            '" data-group="' +
            escapeHtml(g.id) +
            '" aria-pressed="' +
            (pressed ? 'true' : 'false') +
            '">' +
            escapeHtml(groupLabel(g.id)) +
            ' <span class="videos-filter-count">' +
            n +
            '</span></button>'
          );
        })
        .join('') +
      '</div>';

    var chips = filtersEl.querySelectorAll('[data-group]');
    for (var i = 0; i < chips.length; i++) {
      chips[i].addEventListener('click', function (ev) {
        var btn = ev.currentTarget;
        activeGroup = btn.getAttribute('data-group') || 'all';
        renderFilters();
        renderList();
        syncUrl();
      });
    }
  }

  function renderList() {
    if (!listEl) return;
    var items = filteredItems();
    if (countEl) {
      countEl.textContent =
        items.length +
        ' ' +
        (items.length === 1
          ? i18n('pages.guiaPalavras.countOne', 'palavra')
          : i18n('pages.guiaPalavras.countMany', 'palavras'));
    }

    if (!items.length) {
      listEl.innerHTML =
        '<div class="empty-state"><p class="empty-message">' +
        escapeHtml(
          activeQuery
            ? i18n('pages.guiaPalavras.emptySearch', 'Nenhuma palavra com essas letras.')
            : i18n('pages.guiaPalavras.emptyFilter', 'Nenhuma palavra neste grupo.')
        ) +
        '</p></div>';
      return;
    }

    listEl.innerHTML =
      '<ul class="guia-palavras-list">' +
      items
        .map(function (item) {
          var word = escapeHtml(item.word || item.id);
          var meaning = escapeHtml(localizedField(item, 'simple'));
          var group = escapeHtml(groupLabel(item.group));
          var titleBadge = item.fromTitle
            ? '<span class="guia-palavras-badge">' +
              escapeHtml(i18n('pages.guiaPalavras.badgeTitle', 'Título')) +
              '</span>'
            : '';
          var link = '';
          if (item.href) {
            var isDeep = /\/posts\/post-inspecao-palavra-/i.test(item.href);
            link =
              '<a class="guia-palavras-link" href="' +
              escapeHtml(item.href) +
              '">' +
              escapeHtml(
                isDeep
                  ? i18n('pages.guiaPalavras.openInspection', 'Ver inspeção')
                  : i18n('pages.guiaPalavras.openPage', 'Abrir página')
              ) +
              '</a>';
          }
          return (
            '<li class="guia-palavras-item' +
            (item.group === 'aviso' ? ' guia-palavras-item--aviso' : '') +
            '" data-group="' +
            escapeHtml(item.group || '') +
            '">' +
            '<div class="guia-palavras-item-head">' +
            '<strong class="guia-palavras-word">' +
            word +
            '</strong>' +
            titleBadge +
            '<span class="guia-palavras-group">' +
            group +
            '</span>' +
            '</div>' +
            '<p class="guia-palavras-simple">' +
            meaning +
            '</p>' +
            (link ? '<p class="guia-palavras-actions">' + link + '</p>' : '') +
            '</li>'
          );
        })
        .join('') +
      '</ul>';
  }

  function syncUrl() {
    try {
      var url = new URL(window.location.href);
      if (activeGroup && activeGroup !== 'all') url.searchParams.set('group', activeGroup);
      else url.searchParams.delete('group');
      if (activeQuery) url.searchParams.set('q', activeQuery);
      else url.searchParams.delete('q');
      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    } catch (e) {
      /* ignore */
    }
  }

  function readUrl() {
    try {
      var params = new URLSearchParams(window.location.search);
      var g = String(params.get('group') || '').trim();
      if (g) activeGroup = g;
      var q = String(params.get('q') || '').trim();
      if (q) activeQuery = q;
    } catch (e) {
      /* ignore */
    }
  }

  function bindSearch() {
    if (!searchEl) return;
    searchEl.value = activeQuery;
    searchEl.addEventListener('input', function () {
      var value = searchEl.value || '';
      if (searchTimer) clearTimeout(searchTimer);
      searchTimer = setTimeout(function () {
        activeQuery = value.trim();
        renderList();
        syncUrl();
      }, 160);
    });
  }

  function applyLead() {
    if (!leadEl || !catalog) return;
    leadEl.textContent = localizedField(catalog, 'lead');
  }

  function load() {
    filtersEl = document.getElementById('guia-palavras-filters');
    searchEl = document.getElementById('guia-palavras-search');
    listEl = document.getElementById('guia-palavras-list');
    leadEl = document.getElementById('guia-palavras-lead');
    countEl = document.getElementById('guia-palavras-count');
    if (!listEl) return;

    readUrl();
    listEl.innerHTML =
      '<p class="empty-message">' +
      escapeHtml(i18n('pages.guiaPalavras.loading', 'Carregando palavras…')) +
      '</p>';

    fetch('/content/guia-palavras.json', { credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (doc) {
        catalog = doc || { groups: [], items: [] };
        var known = { all: true };
        (catalog.groups || []).forEach(function (g) {
          known[g.id] = true;
        });
        if (!known[activeGroup]) activeGroup = 'all';
        applyLead();
        bindSearch();
        renderFilters();
        renderList();
      })
      .catch(function () {
        listEl.innerHTML =
          '<div class="empty-state"><p class="empty-message">' +
          escapeHtml(
            i18n('pages.guiaPalavras.loadError', 'Não foi possível carregar o glossário.')
          ) +
          '</p></div>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }

  document.addEventListener('budganja:localechange', function () {
    if (!catalog) return;
    applyLead();
    renderFilters();
    renderList();
  });
})();
