/**
 * Fila editorial de sugestões — /biblioteca/inspecoes/#inspecoes-sugestoes
 * Fonte: /content/inspecoes-sugestoes.json
 */
(function (global) {
  'use strict';

  var DATA_URL = '/content/inspecoes-sugestoes.json';
  var STATUS_ORDER = { 'a-fazer': 0, ideia: 1, feita: 2 };
  var TIPO_I18N = {
    pessoa: 'pages.inspections.sugTipoPessoa',
    canal: 'pages.inspections.sugTipoCanal',
    curso: 'pages.inspections.sugTipoCurso',
    artigo: 'pages.inspections.sugTipoArtigo',
    equipamento: 'pages.inspections.sugTipoEquipamento',
    divulgacao: 'pages.inspections.sugTipoDivulgacao',
    loja: 'pages.inspections.sugTipoLoja',
    insumo: 'pages.inspections.sugTipoInsumo'
  };
  var STATUS_I18N = {
    ideia: 'pages.inspections.sugStatusIdeia',
    'a-fazer': 'pages.inspections.sugStatusAFazer',
    feita: 'pages.inspections.sugStatusFeita'
  };

  var cachedPayload = null;
  var cachedPosts = null;
  var activeFilter = 'abertas';

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

  function localizedField(item, base) {
    var loc = locale();
    if (loc.indexOf('en') === 0 && item[base + 'En']) return item[base + 'En'];
    if (loc.indexOf('es') === 0 && item[base + 'Es']) return item[base + 'Es'];
    return item[base] || '';
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalizeHref(href) {
    var s = String(href || '').trim();
    if (!s) return '';
    try {
      if (s.charAt(0) === '/') return s.split('#')[0].split('?')[0];
      var u = new URL(s, 'https://inspetorbudganja.com.br');
      return u.pathname;
    } catch (e) {
      return s;
    }
  }

  function postLookup(posts) {
    var bySlug = Object.create(null);
    var byHref = Object.create(null);
    (posts || []).forEach(function (p) {
      if (!p) return;
      if (p.slug) bySlug[String(p.slug)] = p;
      var href = p.href || (p.slug ? '/posts/post-' + p.slug + '.html' : '');
      var norm = normalizeHref(href);
      if (norm) byHref[norm] = p;
      if (p.slug) byHref['/posts/post-' + p.slug + '.html'] = p;
    });
    return { bySlug: bySlug, byHref: byHref };
  }

  function resolveItem(item, lookup) {
    var status = String(item.status || 'ideia');
    var doneHref = item.doneHref ? normalizeHref(item.doneHref) : '';
    var slug = item.suggestedSlug ? String(item.suggestedSlug) : '';
    var published = null;

    if (doneHref && lookup.byHref[doneHref]) published = lookup.byHref[doneHref];
    if (!published && slug && lookup.bySlug[slug]) published = lookup.bySlug[slug];
    if (!published && slug) {
      var guess = '/posts/post-' + slug + '.html';
      if (lookup.byHref[guess]) published = lookup.byHref[guess];
    }

    if (published) {
      status = 'feita';
      doneHref = normalizeHref(published.href || ('/posts/post-' + published.slug + '.html'));
    }

    return {
      id: item.id,
      title: localizedField(item, 'title'),
      why: localizedField(item, 'why'),
      tipo: String(item.tipo || 'pessoa'),
      priority: Number(item.priority) || 3,
      status: status,
      sources: Array.isArray(item.sources) ? item.sources.filter(Boolean) : [],
      suggestedSlug: slug,
      doneHref: doneHref,
      notes: item.notes || '',
      seriesHint: item.seriesHint || ''
    };
  }

  function sortItems(items) {
    return items.slice().sort(function (a, b) {
      var sa = STATUS_ORDER[a.status] != null ? STATUS_ORDER[a.status] : 9;
      var sb = STATUS_ORDER[b.status] != null ? STATUS_ORDER[b.status] : 9;
      if (sa !== sb) return sa - sb;
      if (a.priority !== b.priority) return a.priority - b.priority;
      return String(a.title).localeCompare(String(b.title), 'pt-BR');
    });
  }

  function matchesFilter(item, filter) {
    if (filter === 'todas') return true;
    if (filter === 'feitas') return item.status === 'feita';
    if (filter === 'abertas') return item.status !== 'feita';
    return true;
  }

  function tipoLabel(tipo) {
    var key = TIPO_I18N[tipo];
    var fallbacks = {
      pessoa: 'Legado',
      canal: 'Canal',
      curso: 'Curso',
      artigo: 'Artigo',
      equipamento: 'Equipamento',
      divulgacao: 'Divulgação',
      loja: 'Loja',
      insumo: 'Insumo'
    };
    return key ? t(key, fallbacks[tipo] || tipo) : tipo;
  }

  function statusLabel(status) {
    var key = STATUS_I18N[status];
    var fallbacks = {
      ideia: 'Ideia',
      'a-fazer': 'A fazer',
      feita: 'Feita'
    };
    return key ? t(key, fallbacks[status] || status) : status;
  }

  function sourceLinksHtml(sources) {
    if (!sources.length) return '';
    var label = t('pages.inspections.sugSources', 'Fontes');
    var links = sources.map(function (url, i) {
      var safe = escapeHtml(url);
      var n = i + 1;
      return '<a class="inspecoes-sug-source" href="' + safe + '" target="_blank" rel="noopener noreferrer">' +
        escapeHtml(label) + ' ' + n + '</a>';
    }).join(' · ');
    return '<p class="inspecoes-sug-sources">' + links + '</p>';
  }

  function renderItem(item) {
    var openHref = item.status === 'feita' && item.doneHref ? item.doneHref : '';
    var cta = '';
    if (openHref) {
      cta = '<a class="inspecoes-sug-cta" href="' + escapeHtml(openHref) + '">' +
        escapeHtml(t('pages.inspections.sugOpenReport', 'Abrir relatório')) + '</a>';
    }

    var notes = item.notes
      ? '<p class="inspecoes-sug-notes">' + escapeHtml(item.notes) + '</p>'
      : '';

    return (
      '<article class="inspecoes-sug-item" data-status="' + escapeHtml(item.status) + '" data-tipo="' + escapeHtml(item.tipo) + '" data-id="' + escapeHtml(item.id || '') + '">' +
        '<div class="inspecoes-sug-meta">' +
          '<span class="inspecoes-sug-badge inspecoes-sug-badge--status">' + escapeHtml(statusLabel(item.status)) + '</span>' +
          '<span class="inspecoes-sug-badge inspecoes-sug-badge--tipo">' + escapeHtml(tipoLabel(item.tipo)) + '</span>' +
          '<span class="inspecoes-sug-priority" title="' + escapeHtml(t('pages.inspections.sugPriority', 'Prioridade')) + '">P' + escapeHtml(String(item.priority)) + '</span>' +
        '</div>' +
        '<h3 class="inspecoes-sug-title">' + escapeHtml(item.title) + '</h3>' +
        '<p class="inspecoes-sug-why">' + escapeHtml(item.why) + '</p>' +
        notes +
        sourceLinksHtml(item.sources) +
        (cta ? '<div class="inspecoes-sug-actions">' + cta + '</div>' : '') +
      '</article>'
    );
  }

  function setFilterButtons(root) {
    var buttons = root.querySelectorAll('[data-sug-filter]');
    buttons.forEach(function (btn) {
      var on = btn.getAttribute('data-sug-filter') === activeFilter;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function paint(root, posts) {
    var listEl = root.querySelector('[data-inspecoes-sugestoes-list]');
    if (!listEl || !cachedPayload) return;

    var lookup = postLookup(posts || cachedPosts || []);
    var resolved = sortItems(
      (cachedPayload.items || []).map(function (raw) { return resolveItem(raw, lookup); })
    );
    var visible = resolved.filter(function (it) { return matchesFilter(it, activeFilter); });

    setFilterButtons(root);

    if (!visible.length) {
      listEl.innerHTML = '<p class="empty-message">' +
        escapeHtml(t('pages.inspections.sugEmpty', 'Nenhuma sugestão neste filtro.')) +
        '</p>';
      return;
    }

    listEl.innerHTML = visible.map(renderItem).join('');
  }

  function bindFilters(root) {
    if (root.getAttribute('data-sug-bound') === '1') return;
    root.setAttribute('data-sug-bound', '1');
    root.addEventListener('click', function (ev) {
      var btn = ev.target.closest('[data-sug-filter]');
      if (!btn || !root.contains(btn)) return;
      activeFilter = btn.getAttribute('data-sug-filter') || 'abertas';
      paint(root, cachedPosts);
    });
  }

  function loadPayload() {
    if (cachedPayload) return Promise.resolve(cachedPayload);
    return fetch(DATA_URL, { credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) throw new Error('sugestoes ' + res.status);
        return res.json();
      })
      .then(function (data) {
        cachedPayload = data && typeof data === 'object' ? data : { items: [] };
        if (!Array.isArray(cachedPayload.items)) cachedPayload.items = [];
        return cachedPayload;
      });
  }

  function renderInspecoesSugestoes(posts) {
    var root = document.getElementById('inspecoes-sugestoes');
    if (!root) return Promise.resolve();

    cachedPosts = posts || [];
    bindFilters(root);

    return loadPayload()
      .then(function () {
        root.hidden = false;
        var chip = document.querySelector('.inspecoes-hub-chip[href="#inspecoes-sugestoes"]');
        if (chip) {
          chip.hidden = false;
          chip.setAttribute('aria-hidden', 'false');
        }
        paint(root, cachedPosts);
      })
      .catch(function () {
        var listEl = root.querySelector('[data-inspecoes-sugestoes-list]');
        if (listEl) {
          listEl.innerHTML = '<p class="empty-message">' +
            escapeHtml(t('pages.inspections.sugLoadError', 'Não foi possível carregar as sugestões.')) +
            '</p>';
        }
        root.hidden = false;
      });
  }

  global.renderInspecoesSugestoes = renderInspecoesSugestoes;
})(typeof window !== 'undefined' ? window : globalThis);
