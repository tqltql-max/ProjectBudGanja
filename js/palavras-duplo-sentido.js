/**
 * Catálogo «duplo sentido prejudicial» — /biblioteca/inspecoes/#inspecoes-palavras
 * Fonte: /content/palavras-duplo-sentido.json
 */
(function (global) {
  'use strict';

  var DATA_URL = '/content/palavras-duplo-sentido.json';
  var cached = null;

  function t(key, fallback) {
    if (global.BudGanjaI18n && typeof global.BudGanjaI18n.t === 'function') {
      return global.BudGanjaI18n.t(key, fallback);
    }
    return fallback;
  }

  function locale() {
    if (global.BudGanjaI18n && typeof global.BudGanjaI18n.getLocale === 'function') {
      return String(global.BudGanjaI18n.getLocale() || 'pt-BR');
    }
    return 'pt-BR';
  }

  function field(obj, base) {
    var loc = locale();
    if (loc.indexOf('en') === 0 && obj[base + 'En']) return obj[base + 'En'];
    if (loc.indexOf('es') === 0 && obj[base + 'Es']) return obj[base + 'Es'];
    return obj[base] || '';
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderItem(item) {
    var word = escapeHtml(item.word || item.id || '');
    var href = item.href ? String(item.href) : '';
    var title = href
      ? '<a class="palavras-duplo-word" href="' + escapeHtml(href) + '">' + word + '</a>'
      : '<span class="palavras-duplo-word">' + word + '</span>';
    var mapaOnly = !href
      ? '<span class="palavras-duplo-mapa">' +
        escapeHtml(t('pages.inspections.wordsMapOnly', 'mapa')) +
        '</span>'
      : '';

    return (
      '<article class="palavras-duplo-item" data-palavra-id="' +
      escapeHtml(item.id || '') +
      '">' +
      '<header class="palavras-duplo-item-head">' +
      '<h3 class="palavras-duplo-item-title">' +
      title +
      mapaOnly +
      '</h3>' +
      '</header>' +
      '<dl class="palavras-duplo-dl">' +
      '<div><dt>' +
      escapeHtml(t('pages.inspections.wordsOriginal', 'Originalidade')) +
      '</dt><dd>' +
      escapeHtml(field(item, 'original')) +
      '</dd></div>' +
      '<div><dt>' +
      escapeHtml(t('pages.inspections.wordsPrejudiced', 'Sentido prejudicial')) +
      '</dt><dd>' +
      escapeHtml(field(item, 'prejudicado')) +
      '</dd></div>' +
      '<div><dt>' +
      escapeHtml(t('pages.inspections.wordsChange', 'Mudança')) +
      '</dt><dd>' +
      escapeHtml(field(item, 'mudanca')) +
      '</dd></div>' +
      '</dl>' +
      '</article>'
    );
  }

  function paint(root, data) {
    if (!root || !data) return;
    var leadEl = root.querySelector('[data-palavras-duplo-lead]');
    var listEl = root.querySelector('[data-palavras-duplo-list]');
    if (leadEl) leadEl.textContent = field(data, 'lead');
    if (!listEl) return;
    var items = Array.isArray(data.items) ? data.items : [];
    if (!items.length) {
      listEl.innerHTML =
        '<p class="empty-message">' +
        escapeHtml(t('pages.inspections.wordsCatalogEmpty', 'Catálogo vazio.')) +
        '</p>';
      return;
    }
    listEl.innerHTML = items.map(renderItem).join('');
  }

  function load() {
    if (cached) return Promise.resolve(cached);
    return fetch(DATA_URL, { credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) throw new Error('duplo-sentido ' + res.status);
        return res.json();
      })
      .then(function (data) {
        cached = data && typeof data === 'object' ? data : { items: [] };
        return cached;
      });
  }

  function renderPalavrasDuploSentido() {
    var roots = Array.prototype.slice.call(
      document.querySelectorAll('[data-palavras-duplo-sentido]')
    );
    if (!roots.length) return Promise.resolve();
    return load()
      .then(function (data) {
        roots.forEach(function (root) {
          paint(root, data);
        });
      })
      .catch(function () {
        roots.forEach(function (root) {
          var listEl = root.querySelector('[data-palavras-duplo-list]');
          if (listEl) {
            listEl.innerHTML =
              '<p class="empty-message">' +
              escapeHtml(
                t(
                  'pages.inspections.wordsCatalogError',
                  'Não foi possível carregar o catálogo de palavras.'
                )
              ) +
              '</p>';
          }
        });
      });
  }

  if (global.BudGanjaI18n && typeof global.BudGanjaI18n.onLocaleChange === 'function') {
    global.BudGanjaI18n.onLocaleChange(function () {
      if (cached) {
        document.querySelectorAll('[data-palavras-duplo-sentido]').forEach(function (root) {
          paint(root, cached);
        });
      }
    });
  }

  global.renderPalavrasDuploSentido = renderPalavrasDuploSentido;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      renderPalavrasDuploSentido();
    });
  } else {
    renderPalavrasDuploSentido();
  }
})(typeof window !== 'undefined' ? window : globalThis);
