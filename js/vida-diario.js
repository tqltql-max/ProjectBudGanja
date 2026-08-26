(function () {
  'use strict';

  var DATA_URL = '/content/vida-cultivos.json';
  var activeSlug = null;

  function $(id) {
    return document.getElementById(id);
  }

  function locale() {
    try {
      if (window.BudGanjaI18n && typeof window.BudGanjaI18n.getLocale === 'function') {
        return window.BudGanjaI18n.getLocale() || 'pt-BR';
      }
    } catch (e) { /* ignore */ }
    return 'pt-BR';
  }

  function t(key, fallback) {
    try {
      if (window.BudGanjaI18n && typeof window.BudGanjaI18n.t === 'function') {
        var val = window.BudGanjaI18n.t('pages.vidaDiario.' + key);
        if (val && val !== 'pages.vidaDiario.' + key) return val;
      }
    } catch (e) { /* ignore */ }
    return fallback;
  }

  function pick(crop, base) {
    var loc = locale();
    if (loc === 'en' && crop[base + 'En']) return crop[base + 'En'];
    if (loc === 'es' && crop[base + 'Es']) return crop[base + 'Es'];
    return crop[base] || '';
  }

  function pickEntry(entry, base) {
    var loc = locale();
    if (loc === 'en' && entry[base + 'En']) return entry[base + 'En'];
    if (loc === 'es' && entry[base + 'Es']) return entry[base + 'Es'];
    return entry[base] || '';
  }

  function formatDate(iso) {
    if (!iso) return '';
    try {
      var d = new Date(iso + 'T12:00:00');
      return d.toLocaleDateString(locale() === 'en' ? 'en-GB' : locale() === 'es' ? 'es' : 'pt-BR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return iso;
    }
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderFeature(crop) {
    if (!crop) return;
    activeSlug = crop.slug;

    var eyebrow = $('vd-feature-eyebrow');
    var title = $('vd-feature-title');
    var sci = $('vd-feature-sci');
    var summary = $('vd-feature-summary');
    var art = $('vd-feature-art');
    var img = $('vd-feature-img');
    var actions = $('vd-feature-actions');

    if (eyebrow) {
      eyebrow.textContent =
        (pick(crop, 'statusLabel') || t('featureEyebrow', 'Inspeção em curso')) +
        (crop.inspector ? ' · ' + crop.inspector : '');
    }
    if (title) title.textContent = pick(crop, 'name');
    if (sci) {
      sci.textContent = crop.scientificName
        ? crop.scientificName +
          (crop.plantedAt
            ? ' · ' + t('plantedAt', 'Plantio') + ' ' + formatDate(crop.plantedAt)
            : '')
        : '';
    }
    if (summary) summary.textContent = pick(crop, 'summary');

    if (art && img) {
      if (crop.cover) {
        art.hidden = false;
        img.src = crop.cover;
        img.alt = pick(crop, 'name');
        img.onerror = function () {
          art.hidden = true;
        };
      } else {
        art.hidden = true;
      }
    }

    if (actions) {
      var bits = [];
      if (crop.inspectionHref) {
        bits.push(
          '<a class="botao botao-home" href="' +
            escapeHtml(crop.inspectionHref) +
            '">' +
            escapeHtml(t('openInspection', 'Abrir inspeção completa')) +
            '</a>'
        );
      }
      if (crop.plantHref) {
        bits.push(
          '<a class="botao botao-home botao-home--secondary" href="' +
            escapeHtml(crop.plantHref) +
            '">' +
            escapeHtml(t('openPlant', 'Ficha da planta')) +
            '</a>'
        );
      }
      actions.innerHTML = bits.join('');
    }

    renderStoryCards(crop);
  }

  function renderStoryCards(crop) {
    var root = $('vd-story-cards');
    if (!root) return;
    var list = Array.isArray(crop.entries) ? crop.entries.slice() : [];
    if (!list.length) {
      root.innerHTML =
        '<p class="vd-empty">' +
        escapeHtml(t('entriesEmpty', 'Ainda sem capítulos nesta história.')) +
        '</p>';
      return;
    }

    list.sort(function (a, b) {
      return String(a.date || '').localeCompare(String(b.date || ''));
    });

    root.innerHTML = list
      .map(function (entry, i) {
        return (
          '<article class="vd-story-card" style="--vd-i:' +
          i +
          '">' +
          '<div class="vd-story-card-meta">' +
          '<span class="vd-story-card-phase">' +
          escapeHtml(pickEntry(entry, 'phase')) +
          '</span>' +
          '<time datetime="' +
          escapeHtml(entry.date || '') +
          '">' +
          escapeHtml(formatDate(entry.date)) +
          '</time>' +
          '</div>' +
          '<h3>' +
          escapeHtml(pickEntry(entry, 'title')) +
          '</h3>' +
          '<p>' +
          escapeHtml(pickEntry(entry, 'body')) +
          '</p>' +
          '</article>'
        );
      })
      .join('');
  }

  function renderMore(cultivos) {
    var wrap = $('vd-more-wrap');
    var list = $('vd-cultivos-list');
    if (!wrap || !list) return;
    var others = cultivos.filter(function (c) {
      return c.slug !== activeSlug;
    });
    if (!others.length) {
      wrap.hidden = true;
      list.innerHTML = '';
      return;
    }
    wrap.hidden = false;
    list.innerHTML = others
      .map(function (crop) {
        return (
          '<button type="button" class="vd-crop-card" data-crop="' +
          escapeHtml(crop.slug) +
          '">' +
          '<span class="vd-crop-status">' +
          escapeHtml(pick(crop, 'statusLabel') || '') +
          '</span>' +
          '<strong class="vd-crop-name">' +
          escapeHtml(pick(crop, 'name')) +
          '</strong>' +
          '<span class="vd-crop-blurb">' +
          escapeHtml(pick(crop, 'summary')) +
          '</span>' +
          '</button>'
        );
      })
      .join('');

    list.querySelectorAll('[data-crop]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var crop = cultivos.find(function (c) {
          return c.slug === btn.getAttribute('data-crop');
        });
        if (!crop) return;
        renderFeature(crop);
        renderMore(cultivos);
        var feature = $('vd-feature');
        if (feature) feature.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function applyData(data) {
    var cultivos = Array.isArray(data && data.cultivos) ? data.cultivos : [];
    if (!cultivos.length) {
      var cards = $('vd-story-cards');
      if (cards) {
        cards.innerHTML =
          '<p class="vd-empty">' +
          escapeHtml(t('cultivosEmpty', 'Ainda não há cultivos publicados.')) +
          '</p>';
      }
      return;
    }
    var crop =
      cultivos.find(function (c) {
        return c.slug === activeSlug;
      }) || cultivos[0];
    renderFeature(crop);
    renderMore(cultivos);
  }

  function boot() {
    var isDiary =
      document.body &&
      (document.body.dataset.page === 'vida-diario' ||
        document.querySelector('.vida-diario-page'));
    if (!isDiary) return;

    var cards = $('vd-story-cards');
    if (cards) {
      cards.innerHTML =
        '<p class="vd-empty">' + escapeHtml(t('loading', 'A carregar a história…')) + '</p>';
    }

    fetch(DATA_URL, { credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(applyData)
      .catch(function () {
        if (cards) {
          cards.innerHTML =
            '<p class="vd-empty">' +
            escapeHtml(
              t('loadError', 'Não foi possível carregar a história agora. Tente novamente.')
            ) +
            '</p>';
        }
      });

    document.addEventListener('budganja:localechange', function () {
      fetch(DATA_URL, { credentials: 'same-origin' })
        .then(function (res) {
          return res.ok ? res.json() : null;
        })
        .then(function (data) {
          if (data) applyData(data);
        })
        .catch(function () { /* ignore */ });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
