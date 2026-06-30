function formatDatePtBR(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch (e) {
    return iso;
  }
}

function normalizePostUrl(url) {
  if (!url) return '#';
  const href = String(url).trim();
  return href || '#';
}

var SERIES_LABELS = {
  'guia-cultivo-basico': 'Guia de Cultivo Básico',
  'canal-jardimhg': 'Canal Jardim HG',
  'canal-movrecam': 'MovReCam · UNIFESP',
  'verificacao-equipamento': 'Verificação de equipamentos',
  'formacao-academica': 'Formação acadêmica',
  '': 'Todas as séries'
};

var INSPECOES_COLLECTIONS = [
  {
    id: 'guia-cultivo-basico',
    filterKey: 'guia-cultivo-basico',
    navLabel: 'Guia',
    icon: '📺',
    title: 'Guia de Cultivo Básico',
    kicker: 'Série @InspetorBudGanja',
    description: 'Capítulos do guia em vídeo — relatório científico, embed, materiais da <a href="/loja/#cultivo-indoor">loja parceira</a> e ligação ao <a href="/cultivo/">diário de pesquisas</a>.',
    layout: 'episodes',
    match: function (p) { return p.series === 'guia-cultivo-basico'; }
  },
  {
    id: 'canal-jardimhg',
    filterKey: 'canal-jardimhg',
    navLabel: 'Conteúdo',
    icon: '🌿',
    title: 'Conteúdo de referência',
    kicker: 'Auditorias editoriais',
    description: 'Acervos de criadores e conteúdo em português — mapeamento temático, catálogo de vídeos e créditos ao autor original.',
    layout: 'spotlight',
    match: function (p) { return p.series === 'canal-jardimhg' || p.series === 'canal-movrecam'; }
  },
  {
    id: 'verificacao-equipamento',
    filterKey: 'verificacao-equipamento',
    navLabel: 'Equipamentos',
    icon: '⚙️',
    title: 'Verificação de equipamentos',
    kicker: 'Laboratório e catálogos',
    description: 'Medições no laboratório e auditoria de equipamentos comercializados no Brasil — LED, tendas, ventilação e kits cruzados às <a href="/calculadoras/">calculadoras</a> do site.',
    layout: 'compact',
    match: function (p) { return p.series === 'verificacao-equipamento'; }
  },
  {
    id: 'formacao-academica',
    filterKey: 'formacao-academica',
    navLabel: 'Formação',
    icon: '🎓',
    title: 'Formação acadêmica',
    kicker: 'Universidades e extensão',
    description: 'Cursos e programas de formação em cannabis medicinal — grade, certificação, acesso e cruzamento com o laboratório BudGanja.',
    layout: 'spotlight',
    match: function (p) { return p.series === 'formacao-academica'; }
  }
];

function escapeHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function normalizeCoverUrl(cover) {
  if (!cover) return '';
  var href = String(cover).trim();
  if (!href) return '';
  if (href.startsWith('/') || /^(?:https?:)?\/\//i.test(href)) return href;
  return '/' + href.replace(/^\/+/, '');
}

function sortInspecoesPosts(posts) {
  return posts.slice().sort(function (a, b) {
    var oa = a.seriesOrder != null ? Number(a.seriesOrder) : 999;
    var ob = b.seriesOrder != null ? Number(b.seriesOrder) : 999;
    if (oa !== ob) return oa - ob;
    return String(b.date || '').localeCompare(String(a.date || ''));
  });
}

var INSPECOES_SERIES_FALLBACK = {
  'inspecao-marshydro-brasil': 'verificacao-equipamento',
  'inspecao-ventilacao-tenda': 'verificacao-equipamento',
  'inspecao-curso-unifesp-cannabis-medicinal': 'formacao-academica',
  'inspecao-canal-movrecam': 'canal-movrecam'
};

function resolveInspecaoSeries(post) {
  if (post.series) return post.series;
  return INSPECOES_SERIES_FALLBACK[post.slug] || '';
}

function groupInspecoesByCollection(posts) {
  var groups = {};
  INSPECOES_COLLECTIONS.forEach(function (col) {
    groups[col.id] = [];
  });
  posts.forEach(function (post) {
    var series = resolveInspecaoSeries(post);
    var enriched = series && !post.series ? Object.assign({}, post, { series: series }) : post;
    for (var i = 0; i < INSPECOES_COLLECTIONS.length; i++) {
      if (INSPECOES_COLLECTIONS[i].match(enriched)) {
        groups[INSPECOES_COLLECTIONS[i].id].push(enriched);
        return;
      }
    }
  });
  Object.keys(groups).forEach(function (key) {
    groups[key] = sortInspecoesPosts(groups[key]);
  });
  return groups;
}

function renderInspecoesEpisodeList(posts) {
  if (!posts.length) {
    return '<p class="inspecoes-collection-empty">Nenhum capítulo publicado.</p>';
  }
  return (
    '<ol class="inspecoes-episode-list">' +
    posts.map(function (post, index) {
      var num = post.seriesOrder != null ? String(post.seriesOrder).padStart(2, '0') : String(index + 1).padStart(2, '0');
      var cover = normalizeCoverUrl(post.coverImage);
      var thumb = cover
        ? '<img class="inspecoes-episode-thumb" src="' + escapeHtml(cover) + '" alt="" loading="lazy" width="88" height="50">'
        : '<span class="inspecoes-episode-thumb inspecoes-episode-thumb--placeholder" aria-hidden="true">📋</span>';
      return (
        '<li class="inspecoes-episode-item">' +
        '<span class="inspecoes-episode-num" aria-hidden="true">' + num + '</span>' +
        '<a class="inspecoes-episode-link" href="' + escapeHtml(normalizePostUrl(post.url)) + '">' +
        thumb +
        '<span class="inspecoes-episode-body">' +
        '<span class="inspecoes-episode-title">' + escapeHtml(post.title || '') + '</span>' +
        (post.excerpt ? '<span class="inspecoes-episode-excerpt">' + escapeHtml(post.excerpt) + '</span>' : '') +
        '</span></a></li>'
      );
    }).join('') +
    '</ol>'
  );
}

function renderInspecoesSpotlight(posts) {
  if (!posts.length) {
    return '<p class="inspecoes-collection-empty">Nenhuma auditoria publicada.</p>';
  }
  return (
    '<div class="inspecoes-spotlight-grid">' +
    posts.map(function (post) {
      var cover = normalizeCoverUrl(post.coverImage);
      var thumb = cover ? '<img class="inspecoes-spotlight-cover" src="' + escapeHtml(cover) + '" alt="" loading="lazy">' : '';
      return (
        '<article class="inspecoes-spotlight-card">' +
        '<a class="inspecoes-spotlight-link" href="' + escapeHtml(normalizePostUrl(post.url)) + '">' +
        (thumb ? '<div class="inspecoes-spotlight-media">' + thumb + '</div>' : '') +
        '<div class="inspecoes-spotlight-body">' +
        (post.seriesLabel ? '<span class="inspecoes-spotlight-badge">' + escapeHtml(post.seriesLabel) + '</span>' : '') +
        '<h3 class="inspecoes-spotlight-title">' + escapeHtml(post.title || '') + '</h3>' +
        (post.excerpt ? '<p class="inspecoes-spotlight-excerpt">' + escapeHtml(post.excerpt) + '</p>' : '') +
        '<span class="inspecoes-spotlight-cta">Abrir auditoria completa →</span>' +
        '</div></a></article>'
      );
    }).join('') +
    '</div>'
  );
}

function renderInspecoesCompactCards(posts) {
  if (!posts.length) {
    return '<p class="inspecoes-collection-empty">Nenhuma verificação publicada.</p>';
  }
  return (
    '<div class="inspecoes-compact-grid">' +
    posts.map(function (post) {
      var cover = normalizeCoverUrl(post.coverImage);
      return (
        '<article class="inspecoes-compact-card">' +
        '<a class="inspecoes-compact-link" href="' + escapeHtml(normalizePostUrl(post.url)) + '">' +
        (cover ? '<img class="inspecoes-compact-cover" src="' + escapeHtml(cover) + '" alt="" loading="lazy">' : '') +
        '<div class="inspecoes-compact-body">' +
        (post.seriesLabel ? '<span class="inspecoes-compact-label">' + escapeHtml(post.seriesLabel) + '</span>' : '') +
        '<h3 class="inspecoes-compact-title">' + escapeHtml(post.title || '') + '</h3>' +
        (post.excerpt ? '<p class="inspecoes-compact-excerpt">' + escapeHtml(post.excerpt) + '</p>' : '') +
        '</div></a></article>'
      );
    }).join('') +
    '</div>'
  );
}

function renderInspecoesCollectionHead(col, posts, opts) {
  opts = opts || {};
  var chevron = opts.collapsible
    ? '<span class="inspecoes-collection-chevron" aria-hidden="true">▼</span>'
    : '';
  var headClass = 'inspecoes-collection-head' + (opts.collapsible ? ' inspecoes-collection-toggle' : '');
  var headAttrs = opts.collapsible
    ? ' type="button" class="' + headClass + '" aria-expanded="' + (opts.expanded ? 'true' : 'false') + '" aria-controls="inspecoes-panel-' + escapeHtml(col.id) + '"'
    : ' class="' + headClass + '"';
  var tag = opts.collapsible ? 'button' : 'header';
  return (
    '<' + tag + headAttrs + '>' +
    '<div class="inspecoes-collection-icon" aria-hidden="true">' + col.icon + '</div>' +
    '<div class="inspecoes-collection-copy">' +
    '<p class="inspecoes-collection-kicker">' + escapeHtml(col.kicker) + '</p>' +
    '<h2 class="inspecoes-collection-title">' + escapeHtml(col.title) + '</h2>' +
    '<p class="inspecoes-collection-desc">' + col.description + '</p>' +
    '</div>' +
    '<span class="inspecoes-collection-count">' + posts.length + ' relatório' + (posts.length === 1 ? '' : 's') + '</span>' +
    chevron +
    '</' + tag + '>'
  );
}

function setInspecoesCollectionExpanded(section, expanded) {
  if (!section) return;
  var btn = section.querySelector('.inspecoes-collection-toggle');
  var panel = section.querySelector('.inspecoes-collection-panel');
  if (!btn || !panel) return;
  section.classList.toggle('is-expanded', expanded);
  section.classList.toggle('is-collapsed', !expanded);
  btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  panel.hidden = !expanded;
}

function collapseAllInspecoesCollections(root) {
  if (!root) return;
  root.querySelectorAll('.inspecoes-collection--collapsible').forEach(function (section) {
    setInspecoesCollectionExpanded(section, false);
  });
}

function findInspecoesCollectionMeta(filterKey) {
  if (!filterKey) return null;
  for (var i = 0; i < INSPECOES_COLLECTIONS.length; i++) {
    if (INSPECOES_COLLECTIONS[i].filterKey === filterKey) return INSPECOES_COLLECTIONS[i];
  }
  return null;
}

function filterKeyFromInspecoesHash() {
  var hash = (window.location.hash || '').replace(/^#/, '');
  if (!hash || hash.indexOf('inspecoes-') !== 0) return '';
  var colId = hash.slice('inspecoes-'.length);
  var col = INSPECOES_COLLECTIONS.find(function (c) { return c.id === colId; });
  return col ? col.filterKey : '';
}

function scrollToInspecoesSection(section) {
  if (!section) return;
  requestAnimationFrame(function () {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function openInspecoesCollection(root, filterKey, opts) {
  opts = opts || {};
  var col = findInspecoesCollectionMeta(filterKey);
  if (!col || !root) return null;
  var section = root.querySelector('#inspecoes-' + col.id);
  if (!section) return null;
  setInspecoesCollectionExpanded(section, true);
  if (opts.scroll !== false) scrollToInspecoesSection(section);
  if (opts.updateHash !== false) {
    history.replaceState(null, '', '#inspecoes-' + col.id);
  }
  return section;
}

function initInspecoesCollapsibles(root) {
  if (!root) return;
  root.querySelectorAll('.inspecoes-collection--collapsible').forEach(function (section) {
    var btn = section.querySelector('.inspecoes-collection-toggle');
    if (!btn || btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', function () {
      var panel = section.querySelector('.inspecoes-collection-panel');
      setInspecoesCollectionExpanded(section, !!(panel && panel.hidden));
    });
  });
}

function isCollectionCollapsible(col) {
  return col.collapsible !== false;
}

function renderInspecoesCollection(col, posts) {
  var body;
  if (col.layout === 'episodes') body = renderInspecoesEpisodeList(posts);
  else if (col.layout === 'spotlight') body = renderInspecoesSpotlight(posts);
  else if (col.id === 'verificacao-equipamento') {
    var featured = posts.filter(function (p) { return p.slug === 'inspecao-marshydro-brasil'; });
    var rest = posts.filter(function (p) { return p.slug !== 'inspecao-marshydro-brasil'; });
    body = renderInspecoesSpotlight(featured) + renderInspecoesCompactCards(rest);
  } else body = renderInspecoesCompactCards(posts);

  if (!isCollectionCollapsible(col)) {
    return (
      '<section class="inspecoes-collection inspecoes-collection--' + escapeHtml(col.id) + '" id="inspecoes-' + escapeHtml(col.id) + '" data-collection="' + escapeHtml(col.filterKey) + '">' +
      renderInspecoesCollectionHead(col, posts) +
      body +
      '</section>'
    );
  }

  var collapsed = col.collapsedByDefault !== false;
  return (
    '<section class="inspecoes-collection inspecoes-collection--collapsible inspecoes-collection--' + escapeHtml(col.id) + (collapsed ? ' is-collapsed' : ' is-expanded') + '" id="inspecoes-' + escapeHtml(col.id) + '" data-collection="' + escapeHtml(col.filterKey) + '">' +
    renderInspecoesCollectionHead(col, posts, { collapsible: true, expanded: !collapsed }) +
    '<div class="inspecoes-collection-panel" id="inspecoes-panel-' + escapeHtml(col.id) + '"' + (collapsed ? ' hidden' : '') + '>' + body + '</div>' +
    '</section>'
  );
}

function renderInspecoesOverview(groups) {
  return (
    '<div class="inspecoes-overview" id="inspecoes-overview">' +
    INSPECOES_COLLECTIONS.map(function (col) {
      var count = (groups[col.id] || []).length;
      if (!count) return '';
      return (
        '<a class="inspecoes-overview-card" href="#inspecoes-' + escapeHtml(col.id) + '" data-filter="' + escapeHtml(col.filterKey) + '">' +
        '<span class="inspecoes-overview-icon" aria-hidden="true">' + col.icon + '</span>' +
        '<span class="inspecoes-overview-title">' + escapeHtml(col.title) + '</span>' +
        '<span class="inspecoes-overview-meta">' + count + ' relatório' + (count === 1 ? '' : 's') + '</span>' +
        '</a>'
      );
    }).join('') +
    '</div>'
  );
}

function renderInspecoesHub(root, posts) {
  if (!root) return;
  if (!posts.length) {
    root.innerHTML =
      '<div class="empty-state"><p class="empty-message">Nenhuma inspeção publicada ainda.</p>' +
      '<a href="https://www.youtube.com/@InspetorBudGanja" class="botao botao-home" target="_blank" rel="noopener noreferrer">Ver canal no YouTube</a></div>';
    return;
  }
  var groups = groupInspecoesByCollection(posts);
  var sections = INSPECOES_COLLECTIONS
    .filter(function (col) { return (groups[col.id] || []).length > 0; })
    .map(function (col) { return renderInspecoesCollection(col, groups[col.id]); })
    .join('');
  root.innerHTML = renderInspecoesOverview(groups) + sections;
  initInspecoesCollapsibles(root);
  if (window.budganjaEnhanceHoverTips) window.budganjaEnhanceHoverTips(root);
}

function updateInspecoesHubStats(statsEl, posts) {
  if (!statsEl) return;
  var collections = INSPECOES_COLLECTIONS.filter(function (col) {
    return posts.some(col.match);
  }).length;
  statsEl.textContent = collections + ' coleções · ' + posts.length + ' relatórios';
  statsEl.hidden = false;
}

function initInspecoesHubNav(navEl, root) {
  if (!navEl || !root) return;

  function syncNavButtons(filterKey) {
    navEl.querySelectorAll('.inspecoes-hub-nav-btn').forEach(function (btn) {
      var active = btn.getAttribute('data-filter') === filterKey;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  function applyFilter(filterKey, opts) {
    opts = opts || {};
    var overview = root.querySelector('#inspecoes-overview');
    var sections = root.querySelectorAll('.inspecoes-collection');
    if (overview) overview.hidden = !!filterKey;
    sections.forEach(function (section) {
      section.hidden = !!(filterKey && section.getAttribute('data-collection') !== filterKey);
    });
    if (filterKey) {
      openInspecoesCollection(root, filterKey, {
        scroll: opts.scroll !== false,
        updateHash: opts.updateHash !== false
      });
    } else {
      collapseAllInspecoesCollections(root);
      if (!opts.keepHash && (window.location.hash || '').indexOf('#inspecoes-') === 0) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
    syncNavButtons(filterKey);
  }

  if (navEl.dataset.bound !== '1') {
    navEl.dataset.bound = '1';
    navEl.hidden = false;

    navEl.querySelectorAll('.inspecoes-hub-nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyFilter(btn.getAttribute('data-filter') || '', { scroll: true });
      });
    });

    root.addEventListener('click', function (e) {
      var card = e.target.closest('.inspecoes-overview-card');
      if (!card) return;
      e.preventDefault();
      applyFilter(card.getAttribute('data-filter') || '', { scroll: true });
    });

    window.addEventListener('hashchange', function () {
      applyFilter(filterKeyFromInspecoesHash(), { scroll: true, updateHash: false });
    });
  }

  applyFilter(filterKeyFromInspecoesHash(), { scroll: !!filterKeyFromInspecoesHash() });
}

function initInspecoesPage(config, posts) {
  var root = document.querySelector(config.hubRoot);
  renderInspecoesHub(root, posts);
  updateInspecoesHubStats(config.hubStats ? document.querySelector(config.hubStats) : null, posts);
  initInspecoesHubNav(config.hubNav ? document.querySelector(config.hubNav) : null, root);
}

function seriesBadgeHtml(post) {
  if (!post.series) return '';
  var label = post.seriesLabel || SERIES_LABELS[post.series] || post.series;
  var order = post.seriesOrder != null ? ' · Cap. ' + post.seriesOrder : '';
  return '<span class="post-card-series" data-series="' + post.series + '">' + label + order + '</span>';
}

function renderPostCards(container, posts) {
  if (!posts.length) {
    var page = document.body.dataset.page;
    var category = page === 'inspecoes' ? 'inspecao' : page === 'equipamentos' ? 'equipamento' : 'pesquisa';
    var ctas = {
      pesquisa: { text: 'Ver inspeções do guia de cultivo', href: '/biblioteca/inspecoes/' },
      inspecao: { text: 'Ver canal no YouTube', href: 'https://www.youtube.com/@InspetorBudGanja', external: true },
      equipamento: { text: 'Ver guia da clonadora', href: '/equipamentos/clonadora-6-estacas.html' }
    };
    var cta = ctas[category] || ctas.pesquisa;
    var ext = cta.external ? ' target="_blank" rel="noopener noreferrer"' : '';
    container.innerHTML =
      '<div class="empty-state">' +
      '<p class="empty-message">Nenhuma publicação nesta secção ainda.</p>' +
      '<a href="' + cta.href + '" class="botao botao-home"' + ext + '>' + cta.text + '</a>' +
      '</div>';
    return;
  }

  container.innerHTML = '';
  posts.forEach(function (p) {
    var card = document.createElement('div');
    card.className = 'card post-card';
    if (p.slug) card.dataset.postSlug = p.slug;
    if (p.series) card.dataset.series = p.series;

    var link = document.createElement('a');
    link.href = normalizePostUrl(p.url);
    link.style.textDecoration = 'none';
    link.style.color = 'inherit';
    if (p.excerpt) link.setAttribute('data-tip', p.excerpt);

    if (p.coverImage) {
      var img = document.createElement('img');
      var cover = String(p.coverImage).trim();
      img.src = cover.startsWith('/') || /^(?:https?:)?\/\//i.test(cover) ? cover : '/' + cover.replace(/^\/+/, '');
      img.alt = '';
      img.className = 'post-card-cover';
      img.loading = 'lazy';
      link.appendChild(img);
    }

    if (p.series) {
      var badgeWrap = document.createElement('div');
      badgeWrap.className = 'post-card-badges';
      badgeWrap.innerHTML = seriesBadgeHtml(p);
      link.appendChild(badgeWrap);
    }

    var title = document.createElement('h3');
    title.textContent = p.title || '';

    var excerpt = document.createElement('p');
    excerpt.textContent = p.excerpt || '';

    var date = document.createElement('span');
    date.className = 'post-card-date';
    date.textContent = formatDatePtBR(p.date);

    link.appendChild(title);
    link.appendChild(excerpt);
    link.appendChild(date);
    card.appendChild(link);
    container.appendChild(card);
  });

  if (window.budganjaEnhanceAdminPostCards) window.budganjaEnhanceAdminPostCards();
  if (window.budganjaEnhanceHoverTips) window.budganjaEnhanceHoverTips(container);
}

function getPublicationConfig() {
  var page = document.body.dataset.page;
  if (page === 'pesquisas') {
    return { category: 'pesquisa', container: '.container-cards' };
  }
  if (page === 'equipamentos') {
    return { category: 'equipamento', container: '.publications-equipamentos' };
  }
  if (page === 'inspecoes') {
    return {
      category: 'inspecao',
      hubRoot: '#inspecoes-hub-root',
      hubNav: '#inspecoes-hub-nav',
      hubStats: '#inspecoes-hub-stats'
    };
  }
  return null;
}

function filterByCategory(posts, category) {
  return posts.filter(function (p) { return (p.category || 'pesquisa') === category; });
}

function filterBySeries(posts, seriesId) {
  if (!seriesId) return posts;
  return posts.filter(function (p) { return p.series === seriesId; });
}

function loadPostsFromApi(category) {
  return fetch('/api/posts?category=' + encodeURIComponent(category), { cache: 'no-store' })
    .then(function (r) {
      if (!r.ok) throw new Error('API ' + r.status);
      return r.json();
    });
}

function mergeInspecoesPosts(local, remote) {
  if (!remote || !remote.length) return local || [];
  var bySlug = {};
  (local || []).forEach(function (p) { bySlug[p.slug] = p; });
  remote.forEach(function (p) {
    var prev = bySlug[p.slug];
    if (!prev) {
      bySlug[p.slug] = p;
      return;
    }
    bySlug[p.slug] = Object.assign({}, p, {
      series: p.series ? p.series : (prev.series || ''),
      seriesOrder: p.seriesOrder != null ? p.seriesOrder : prev.seriesOrder,
      seriesLabel: p.seriesLabel ? p.seriesLabel : (prev.seriesLabel || ''),
      excerptEn: p.excerptEn ? p.excerptEn : (prev.excerptEn || ''),
      excerptEs: p.excerptEs ? p.excerptEs : (prev.excerptEs || '')
    });
  });
  return Object.keys(bySlug).map(function (k) { return bySlug[k]; }).sort(function (a, b) {
    return new Date(b.date || 0) - new Date(a.date || 0);
  });
}

function loadInspecoesEmbeddedFeed() {
  var el = document.getElementById('inspecoes-initial-feed');
  if (!el) return null;
  try {
    var data = JSON.parse(el.textContent || '[]');
    return Array.isArray(data) && data.length ? data : null;
  } catch (e) {
    return null;
  }
}

function loadPostsFromStaticFile(category) {
  var version = '207';
  var vScript = document.querySelector('script[src*="/js/posts.js"]');
  if (vScript) {
    var vm = String(vScript.getAttribute('src') || '').match(/[?&]v=(\d+)/);
    if (vm) version = vm[1];
  }
  return fetch('/posts-public.json?v=' + encodeURIComponent(version), { cache: 'no-store' })
    .then(function (r) {
      if (!r.ok) throw new Error('static ' + r.status);
      return r.json();
    })
    .then(function (all) { return filterByCategory(all, category); });
}

function initInspecoesSeriesFilter(filterEl, container, allPosts) {
  if (!filterEl || filterEl.dataset.bound === '1') return;
  filterEl.dataset.bound = '1';

  var seriesSet = {};
  allPosts.forEach(function (p) {
    if (p.series) seriesSet[p.series] = p.seriesLabel || SERIES_LABELS[p.series] || p.series;
  });

  Object.keys(seriesSet).sort().forEach(function (id) {
    var opt = document.createElement('option');
    opt.value = id;
    opt.textContent = seriesSet[id];
    filterEl.appendChild(opt);
  });

  filterEl.addEventListener('change', function () {
    var filtered = filterBySeries(allPosts, filterEl.value);
    renderPostCards(container, filtered);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var config = getPublicationConfig();
  if (!config) return;

  if (config.hubRoot) {
    var hubRoot = document.querySelector(config.hubRoot);
    if (!hubRoot || hubRoot.querySelector('.inspecoes-collection')) return;

    var embedded = loadInspecoesEmbeddedFeed();

    function finishHub(posts) {
      initInspecoesPage(config, posts);
    }

    if (embedded) {
      finishHub(embedded);
      loadPostsFromStaticFile(config.category)
        .then(function (remote) {
          finishHub(mergeInspecoesPosts(embedded, remote));
        })
        .catch(function () { /* mantém embed */ });
      return;
    }

    loadPostsFromApi(config.category)
      .catch(function () { return loadPostsFromStaticFile(config.category); })
      .then(function (posts) {
        if (!posts.some(function (p) { return p.slug === 'inspecao-marshydro-brasil'; })) {
          return loadPostsFromStaticFile(config.category);
        }
        return posts;
      })
      .then(finishHub)
      .catch(function () {
        if (!hubRoot.querySelector('.inspecoes-collection')) {
          hubRoot.innerHTML = '<p class="empty-message">Nenhuma publicação disponível.</p>';
        }
      });
    return;
  }

  var container = document.querySelector(config.container);
  if (!container) return;
  if (container.querySelector('.card')) return;

  var filterEl = config.seriesFilter ? document.querySelector(config.seriesFilter) : null;

  loadPostsFromApi(config.category)
    .catch(function () { return loadPostsFromStaticFile(config.category); })
    .then(function (posts) {
      if (filterEl) initInspecoesSeriesFilter(filterEl, container, posts);
      renderPostCards(container, posts);
    })
    .catch(function () {
      if (container.querySelector('.card')) return;
      if (container.querySelector('.empty-message') && !container.innerHTML.includes('npm start')) return;
      container.innerHTML = '<p class="empty-message">Nenhuma publicação disponível.</p>';
    });
});
