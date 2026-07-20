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
  'guia-ferramenta': 'Guia de ferramenta',
  'pesquisa-laboratorio': 'Laboratório',
  'pesquisa-comunidade': 'Comunidade',
  'canal-jardimhg': 'Canal Jardim HG',
  'canal-plantamemo': 'Canal Plantamemo',
  'canal-inspetorbudganja': 'Canal Inspetor BudGanja',
  'verificacao-equipamento': 'Equipamentos',
  'formacao-academica': 'Cursos',
  '': 'Todas as séries'
};

var GUIA_CULTIVO_SERIES = 'guia-cultivo-basico';

function seriesBadgeHtml(post, options) {
  if (!post.series) return '';
  options = options || {};
  if (options.hub && post.series === GUIA_CULTIVO_SERIES && post.seriesOrder != null) {
    return '<span class="post-card-series" data-series="' + post.series + '">Cap. ' + post.seriesOrder + '</span>';
  }
  if (options.hub && post.series.indexOf('canal-') === 0) {
    var canal = post.seriesLabel || SERIES_LABELS[post.series] || 'Canal';
    canal = String(canal).replace(/^Canal\s+/i, '');
    return '<span class="post-card-series" data-series="' + post.series + '">' + canal + '</span>';
  }
  if (options.hub && post.series === 'verificacao-equipamento') {
    var eq = post.seriesLabel || 'Equipamento';
    return '<span class="post-card-series" data-series="' + post.series + '">' + eq + '</span>';
  }
  if (options.hub && (post.series.indexOf('formacao') === 0 || post.series.indexOf('curso') === 0)) {
    var curso = post.seriesLabel || 'Curso';
    return '<span class="post-card-series" data-series="' + post.series + '">' + curso + '</span>';
  }
  var label = post.seriesLabel || SERIES_LABELS[post.series] || post.series;
  var order = post.seriesOrder != null ? ' · Cap. ' + post.seriesOrder : '';
  return '<span class="post-card-series" data-series="' + post.series + '">' + label + order + '</span>';
}

/** Título limpo para cards do hub (sem prefixo “Inspeção:”). */
function hubCardTitle(post) {
  var t = String((post && post.title) || '').trim();
  t = t.replace(/^Inspe[cç][aã]o:\s*/i, '');
  t = t.replace(/^Canal\s+/i, '');
  return t;
}

function resolveInspecaoTipo(post) {
  var series = String((post && post.series) || '');
  var slug = String((post && post.slug) || '');
  if (series === GUIA_CULTIVO_SERIES || series.indexOf('guia-') === 0) return 'guia';
  if (series.indexOf('canal-') === 0 || /inspecao-canal-/i.test(slug)) return 'canal';
  if (series === 'verificacao-equipamento' || /equipamento|marshydro/i.test(series + slug)) return 'equipamento';
  if (series === 'formacao-academica' || /curso|unifesp|formacao/i.test(series + slug)) return 'curso';
  if (/^inspecao-canal-/i.test(slug)) return 'canal';
  return 'guia';
}

function sortBySeriesOrder(posts) {
  return posts.slice().sort(function (a, b) {
    var ao = a.seriesOrder == null ? 999 : Number(a.seriesOrder);
    var bo = b.seriesOrder == null ? 999 : Number(b.seriesOrder);
    if (ao !== bo) return ao - bo;
    return new Date(b.date || 0) - new Date(a.date || 0);
  });
}

function coverPlaceholderHtml() {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
}

function appendCoverTo(parent, coverImage) {
  var placeholderHtml = coverPlaceholderHtml();
  if (coverImage) {
    var img = document.createElement('img');
    var cover = String(coverImage).trim();
    img.src = cover.startsWith('/') || /^(?:https?:)?\/\//i.test(cover) ? cover : '/' + cover.replace(/^\/+/, '');
    img.alt = '';
    img.className = 'post-card-cover';
    img.loading = 'lazy';
    img.onerror = function () {
      var ph = document.createElement('div');
      ph.className = 'post-card-cover post-card-cover-placeholder';
      ph.setAttribute('aria-hidden', 'true');
      ph.innerHTML = placeholderHtml;
      this.parentNode.replaceChild(ph, this);
    };
    parent.appendChild(img);
    return;
  }
  var placeholder = document.createElement('div');
  placeholder.className = 'post-card-cover post-card-cover-placeholder';
  placeholder.setAttribute('aria-hidden', 'true');
  placeholder.innerHTML = placeholderHtml;
  parent.appendChild(placeholder);
}

function isPesquisaComunidadePost(post) {
  return String((post && post.series) || '') === 'pesquisa-comunidade';
}

function renderPostCards(container, posts, options) {
  options = options || {};
  if (!posts.length) {
    var page = document.body.dataset.page;
    var category = page === 'inspecoes' ? 'inspecao' : page === 'equipamentos' ? 'equipamento' : 'pesquisa';
    var ctas = {
      pesquisa: { text: 'Abrir diário de cultivo', href: '/cultivo/' },
      inspecao: { text: 'Ver canal no YouTube', href: 'https://www.youtube.com/@InspetorBudGanja', external: true },
      equipamento: { text: 'Ver guia da clonadora', href: '/equipamentos/clonadora-6-estacas.html' }
    };
    var cta = options.cta || ctas[category] || ctas.pesquisa;
    var emptyMsg = options.message || 'Nenhuma publicação nesta secção ainda.';
    var ext = cta.external ? ' target="_blank" rel="noopener noreferrer"' : '';
    container.innerHTML =
      '<div class="empty-state">' +
      '<p class="empty-message">' + emptyMsg + '</p>' +
      '<a href="' + cta.href + '" class="botao botao-home"' + ext + '>' + cta.text + '</a>' +
      '</div>';
    return;
  }

  if (!options.append) container.innerHTML = '';
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

    appendCoverTo(link, p.coverImage);

    if (p.series) {
      var badgeWrap = document.createElement('div');
      badgeWrap.className = 'post-card-badges';
      badgeWrap.innerHTML = seriesBadgeHtml(p, options);
      link.appendChild(badgeWrap);
    }

    var title = document.createElement('h3');
    title.textContent = options.hub ? hubCardTitle(p) : (p.title || '');

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

function filterByInspecaoTipo(posts, tipo) {
  return (posts || []).filter(function (p) { return resolveInspecaoTipo(p) === tipo; });
}

var HUB_CHIP_ANCHOR = {
  guia: 'guia',
  canal: 'canais',
  equipamento: 'equipamentos',
  curso: 'cursos'
};

function setHubChipVisibility(tipo, visible) {
  var anchor = HUB_CHIP_ANCHOR[tipo];
  if (!anchor) return;
  var chip = document.querySelector('.inspecoes-hub-chip[href="#inspecoes-' + anchor + '"]');
  if (!chip) return;
  chip.hidden = !visible;
  chip.setAttribute('aria-hidden', visible ? 'false' : 'true');
}

function sortCanaisPosts(posts) {
  return posts.slice().sort(function (a, b) {
    var la = a.seriesLabel || SERIES_LABELS[a.series] || a.title || '';
    var lb = b.seriesLabel || SERIES_LABELS[b.series] || b.title || '';
    return String(la).localeCompare(String(lb), 'pt-BR');
  });
}

function formatDropCount(count, nounSingular, nounPlural) {
  return count + ' ' + (count === 1 ? nounSingular : nounPlural);
}

function renderInspecoesDropdown(container, posts, opts) {
  opts = opts || {};
  var sorted = opts.sort === 'seriesOrder' ? sortBySeriesOrder(posts) : sortCanaisPosts(posts);
  if (!sorted.length) return null;

  var coverPost = opts.coverPost || sorted[0];
  var label = opts.label || 'Inspeções';
  var badge = opts.badge || label;
  var seriesKey = opts.seriesKey || '';
  var count = sorted.length;
  var countText = formatDropCount(count, opts.nounSingular || 'item', opts.nounPlural || 'itens');

  var details = document.createElement('details');
  details.className = 'card post-card inspecoes-drop-group';
  if (seriesKey) details.dataset.series = seriesKey;

  var summary = document.createElement('summary');
  summary.className = 'inspecoes-drop-summary';

  appendCoverTo(summary, coverPost.coverImage);

  var badgeWrap = document.createElement('div');
  badgeWrap.className = 'post-card-badges';
  badgeWrap.innerHTML = '<span class="post-card-series"' +
    (seriesKey ? ' data-series="' + seriesKey + '"' : '') + '>' + badge + '</span>';
  summary.appendChild(badgeWrap);

  var title = document.createElement('h3');
  title.textContent = label;

  var excerpt = document.createElement('p');
  excerpt.textContent = opts.excerpt || ('Clique para expandir — ' + countText + '.');

  var meta = document.createElement('span');
  meta.className = 'post-card-date inspecoes-drop-meta';
  meta.innerHTML = '<span class="inspecoes-drop-count">' + countText + '</span>' +
    '<span class="inspecoes-drop-caret" aria-hidden="true"></span>';

  summary.appendChild(title);
  summary.appendChild(excerpt);
  summary.appendChild(meta);
  details.appendChild(summary);

  var chapters = document.createElement('div');
  chapters.className = 'container-cards inspecoes-drop-chapters';
  chapters.setAttribute('role', 'list');
  if (opts.chaptersAttr) chapters.setAttribute(opts.chaptersAttr, '');
  renderPostCards(chapters, sorted, { hub: true });
  details.appendChild(chapters);

  container.appendChild(details);
  return details;
}

function renderGuiaGrid(grid, list) {
  grid.innerHTML = '';
  if (!list.length) {
    renderPostCards(grid, [], { hub: true });
    return;
  }
  var count = list.length;
  renderInspecoesDropdown(grid, list, {
    sort: 'seriesOrder',
    seriesKey: GUIA_CULTIVO_SERIES,
    label: 'Guia de Cultivo Básico',
    badge: 'Guia',
    nounSingular: 'capítulo',
    nounPlural: 'capítulos',
    chaptersAttr: 'data-inspecao-guia-chapters',
    excerpt: 'Trilha técnica do início à floração — ' +
      formatDropCount(count, 'capítulo', 'capítulos') + ' com checklist e critérios mensuráveis.'
  });
}

function renderCanaisGrid(grid, list) {
  grid.innerHTML = '';
  if (!list.length) {
    renderPostCards(grid, [], { hub: true });
    return;
  }
  var count = list.length;
  var coverPost = list.filter(function (p) { return p.series === 'canal-inspetorbudganja'; })[0] || list[0];
  renderInspecoesDropdown(grid, list, {
    sort: 'label',
    seriesKey: 'canais',
    coverPost: coverPost,
    label: 'Canais de referência',
    badge: 'Canais',
    nounSingular: 'canal',
    nounPlural: 'canais',
    chaptersAttr: 'data-inspecao-canal-chapters',
    excerpt: 'Auditoria de catálogo, foco temático e utilidade prática — ' +
      formatDropCount(count, 'canal', 'canais') + '.'
  });
}

function renderEquipamentosGrid(grid, list) {
  grid.innerHTML = '';
  if (!list.length) {
    renderPostCards(grid, [], { hub: true });
    return;
  }
  var count = list.length;
  var coverPost = list.filter(function (p) { return p.slug === 'inspecao-marshydro-brasil'; })[0]
    || sortBySeriesOrder(list)[0];
  renderInspecoesDropdown(grid, list, {
    sort: 'seriesOrder',
    seriesKey: 'verificacao-equipamento',
    coverPost: coverPost,
    label: 'Equipamentos do laboratório',
    badge: 'Equipamentos',
    nounSingular: 'item',
    nounPlural: 'itens',
    chaptersAttr: 'data-inspecao-equipamento-chapters',
    excerpt: 'Desempenho, limites e recomendações de uso — ' +
      formatDropCount(count, 'verificação', 'verificações') + '.'
  });
}

function renderCursosGrid(grid, list) {
  grid.innerHTML = '';
  if (!list.length) {
    renderPostCards(grid, [], { hub: true });
    return;
  }
  var count = list.length;
  var coverPost = sortBySeriesOrder(list)[0];
  renderInspecoesDropdown(grid, list, {
    sort: 'seriesOrder',
    seriesKey: 'formacao-academica',
    coverPost: coverPost,
    label: 'Formação académica',
    badge: 'Cursos',
    nounSingular: 'curso',
    nounPlural: 'cursos',
    chaptersAttr: 'data-inspecao-curso-chapters',
    excerpt: 'Grade, acesso e valor prático da formação — ' +
      formatDropCount(count, 'curso', 'cursos') + '.'
  });
}

function renderInspecoesHub(allPosts) {
  var tipos = [
    { id: 'guia', section: '#inspecoes-guia' },
    { id: 'canal', section: '#inspecoes-canais' },
    { id: 'equipamento', section: '#inspecoes-equipamentos' },
    { id: 'curso', section: '#inspecoes-cursos' }
  ];

  tipos.forEach(function (t) {
    var section = document.querySelector(t.section);
    var grid = document.querySelector('[data-inspecao-grid="' + t.id + '"]');
    if (!section || !grid) return;

    var list = filterByInspecaoTipo(allPosts, t.id);
    if (!list.length) {
      section.hidden = true;
      setHubChipVisibility(t.id, false);
      return;
    }

    section.hidden = false;
    setHubChipVisibility(t.id, true);
    if (t.id === 'guia') renderGuiaGrid(grid, list);
    else if (t.id === 'canal') renderCanaisGrid(grid, list);
    else if (t.id === 'equipamento') renderEquipamentosGrid(grid, list);
    else if (t.id === 'curso') renderCursosGrid(grid, list);
    else renderPostCards(grid, list, { hub: true });
  });
}

function isPesquisaPost(post) {
  return String((post && post.category) || 'pesquisa') === 'pesquisa';
}

var PESQUISA_PHASE_LABELS = {
  planejamento: 'Planejamento',
  germinacao: 'Germinação',
  vegetativo: 'Vegetativo',
  floracao: 'Floração',
  colheita: 'Colheita'
};

function formatPesquisaPhase(phase) {
  var key = String(phase || 'germinacao');
  return PESQUISA_PHASE_LABELS[key] || key;
}

function daysSincePlanted(plantedAt) {
  if (!plantedAt) return 0;
  var start = new Date(plantedAt);
  if (isNaN(start.getTime())) return 0;
  var diff = Date.now() - start.getTime();
  return Math.max(0, Math.floor(diff / 86400000));
}

function coverFromGrowLog(log) {
  var entries = Array.isArray(log && log.entries) ? log.entries : [];
  for (var i = entries.length - 1; i >= 0; i--) {
    var photos = Array.isArray(entries[i].photos) ? entries[i].photos : [];
    for (var j = 0; j < photos.length; j++) {
      var url = typeof photos[j] === 'string' ? photos[j] : (photos[j] && (photos[j].url || photos[j].src)) || '';
      url = String(url).trim();
      if (url && !/\.(mp4|webm|mov)(\?|#|$)/i.test(url)) return url;
    }
  }
  return '';
}

function submissionStatusByGrow(submissions) {
  var map = {};
  (submissions || []).forEach(function (sub) {
    if (!sub || !sub.growId) return;
    var prev = map[sub.growId];
    if (!prev) {
      map[sub.growId] = sub;
      return;
    }
    var prevAt = new Date(prev.submittedAt || prev.reviewedAt || 0).getTime();
    var nextAt = new Date(sub.submittedAt || sub.reviewedAt || 0).getTime();
    if (nextAt >= prevAt) map[sub.growId] = sub;
  });
  return map;
}

function isGrowEmAndamento(log, statusMap) {
  var sub = statusMap && statusMap[log.id];
  if (!sub) return true;
  return String(sub.status || '') !== 'approved';
}

function renderAndamentoEmpty(grid, opts) {
  opts = opts || {};
  grid.innerHTML =
    '<div class="empty-state">' +
    '<p class="empty-message">' + (opts.message || 'Ainda não tem pesquisas em andamento.') + '</p>' +
    '<a href="' + (opts.href || '/cultivo/') + '" class="botao botao-home">' +
    (opts.cta || 'Abrir diário de cultivo') +
    '</a></div>';
}

function renderPesquisasEmAndamentoCards(grid, growLogs, statusMap) {
  grid.innerHTML = '';
  growLogs.forEach(function (log) {
    var phase = String(log.phase || 'germinacao');
    var phaseLabel = formatPesquisaPhase(phase);
    var entryCount = Array.isArray(log.entries) ? log.entries.length : 0;
    var dayNum = daysSincePlanted(log.plantedAt);
    var species = String(log.species || '').trim();
    var cover = coverFromGrowLog(log);
    var sub = statusMap[log.id];
    var badge = 'Em andamento';
    if (sub && sub.status === 'pending') badge = 'Em revisão';
    else if (sub && sub.status === 'rejected') badge = 'Rejeitada — pode reenviar';

    var card = document.createElement('div');
    card.className = 'card post-card pesquisas-andamento-card';
    card.dataset.growId = log.id || '';

    var link = document.createElement('a');
    link.href = '/cultivo/?grow=' + encodeURIComponent(log.id || '');
    link.style.textDecoration = 'none';
    link.style.color = 'inherit';

    appendCoverTo(link, cover || null);

    var badgeWrap = document.createElement('div');
    badgeWrap.className = 'post-card-badges';
    badgeWrap.innerHTML =
      '<span class="post-card-series" data-series="pesquisa-andamento">' + badge + '</span>' +
      '<span class="post-card-series" data-series="pesquisa-fase">' + phaseLabel + '</span>';
    link.appendChild(badgeWrap);

    var title = document.createElement('h3');
    title.textContent = log.name || 'Pesquisa sem nome';

    var excerpt = document.createElement('p');
    excerpt.textContent = (species ? species + ' · ' : '') +
      'Dia ' + dayNum + ' · ' + entryCount + (entryCount === 1 ? ' registo' : ' registos');

    var date = document.createElement('span');
    date.className = 'post-card-date';
    date.textContent = 'Continuar no diário →';

    link.appendChild(title);
    link.appendChild(excerpt);
    link.appendChild(date);
    card.appendChild(link);
    grid.appendChild(card);
  });
}

function loadPesquisasEmAndamento() {
  var section = document.getElementById('pesquisas-andamento');
  var grid = document.querySelector('[data-pesquisas-grid="andamento"]');
  if (!section || !grid) return Promise.resolve();

  return fetch('/api/cultivo', { credentials: 'include' })
    .then(function (res) {
      if (res.status === 401) {
        renderAndamentoEmpty(grid, {
          message: 'Entre na sua conta para ver as pesquisas em andamento no diário.',
          cta: 'Entrar',
          href: '/entrar.html?returnTo=' + encodeURIComponent('/biblioteca/pesquisas/')
        });
        section.hidden = false;
        return null;
      }
      if (!res.ok) throw new Error('cultivo ' + res.status);
      return res.json();
    })
    .then(function (cultivoData) {
      if (!cultivoData) return null;
      var cultivo = cultivoData.cultivo || cultivoData;
      var growLogs = Array.isArray(cultivo.growLogs) ? cultivo.growLogs.slice() : [];

      return fetch('/api/cultivo/submissions', { credentials: 'include' })
        .then(function (res) {
          if (!res.ok) return { submissions: [] };
          return res.json().catch(function () { return { submissions: [] }; });
        })
        .then(function (subData) {
          var statusMap = submissionStatusByGrow(subData && subData.submissions);
          var active = growLogs.filter(function (log) {
            return log && log.id && isGrowEmAndamento(log, statusMap);
          });
          active.sort(function (a, b) {
            return new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0);
          });

          section.hidden = false;
          if (!active.length) {
            renderAndamentoEmpty(grid, {
              message: growLogs.length
                ? 'Todas as suas pesquisas já foram publicadas. Comece uma nova no diário.'
                : 'Ainda não tem pesquisas em andamento. Abra o diário para iniciar uma.',
              cta: 'Abrir diário de cultivo',
              href: '/cultivo/'
            });
            return;
          }
          renderPesquisasEmAndamentoCards(grid, active, statusMap);
        });
    })
    .catch(function () {
      section.hidden = false;
      renderAndamentoEmpty(grid, {
        message: 'Não foi possível carregar as suas pesquisas em andamento.',
        cta: 'Abrir diário',
        href: '/cultivo/'
      });
    });
}

function renderPesquisasHub(posts) {
  var list = (posts || []).filter(isPesquisaPost);
  var lab = [];
  var community = [];
  list.forEach(function (p) {
    if (isPesquisaComunidadePost(p)) community.push(p);
    else lab.push(p);
  });

  var labGrid = document.querySelector('[data-pesquisas-grid="lab"]');
  var communityGrid = document.querySelector('[data-pesquisas-grid="comunidade"]');

  if (labGrid) {
    if (lab.length) {
      renderPostCards(labGrid, lab);
      prependSubstratosCard(labGrid);
    } else {
      labGrid.innerHTML = '';
      prependSubstratosCard(labGrid, true);
    }
  }

  if (communityGrid) {
    renderPostCards(communityGrid, community, {
      message: 'Ainda não há pesquisas da comunidade aprovadas.',
      cta: { text: 'Submeter pelo diário', href: '/cultivo/' }
    });
  }

  loadPesquisasEmAndamento();
}

function prependSubstratosCard(container, replaceEmpty) {
  if (!container || container.querySelector('[data-post-slug="substratos-static"]')) return;
  var card = document.createElement('div');
  card.className = 'card post-card';
  card.dataset.postSlug = 'substratos-static';
  card.innerHTML =
    '<a href="/biblioteca/pesquisas/substratos.html" style="text-decoration:none;color:inherit">' +
    '<div class="post-card-badges"><span class="post-card-series">Laboratório</span></div>' +
    '<h3>Substratos biodegradáveis</h3>' +
    '<p>Relatório técnico: otimização da propagação vegetal via substratos biodegradáveis.</p>' +
    '<span class="post-card-date">Relatório completo</span>' +
    '</a>';
  if (replaceEmpty) {
    container.innerHTML = '';
    container.appendChild(card);
    return;
  }
  container.insertBefore(card, container.firstChild);
}

function getPublicationConfig() {
  var page = document.body.dataset.page;
  if (page === 'pesquisas') {
    return { category: 'pesquisa', pesquisasHub: true };
  }
  if (page === 'equipamentos') {
    return { category: 'equipamento', container: '.publications-equipamentos' };
  }
  if (page === 'inspecoes') {
    return { category: 'inspecao', hub: true };
  }
  return null;
}

function filterByCategory(posts, category) {
  return posts.filter(function (p) { return (p.category || 'pesquisa') === category; });
}

function loadPostsFromApi(category) {
  return fetch('/api/posts?category=' + encodeURIComponent(category))
    .then(function (r) {
      if (!r.ok) throw new Error('API ' + r.status);
      return r.json();
    });
}

function loadPostsFromStaticFile(category) {
  return fetch('/posts-public.json')
    .then(function (r) {
      if (!r.ok) throw new Error('static ' + r.status);
      return r.json();
    })
    .then(function (all) { return filterByCategory(all, category); });
}

document.addEventListener('DOMContentLoaded', function () {
  var config = getPublicationConfig();
  if (!config) return;

  if (config.hub) {
    loadPostsFromApi(config.category)
      .catch(function () { return loadPostsFromStaticFile(config.category); })
      .then(function (posts) {
        renderInspecoesHub(posts || []);
      })
      .catch(function () {
        document.querySelectorAll('[data-inspecao-grid]').forEach(function (grid) {
          if (grid.querySelector('.card')) return;
          grid.innerHTML = '<p class="empty-message">Nenhuma publicação disponível.</p>';
        });
      });
    return;
  }

  if (config.pesquisasHub) {
    loadPostsFromApi(config.category)
      .catch(function () { return loadPostsFromStaticFile(config.category); })
      .then(function (posts) {
        renderPesquisasHub(posts || []);
      })
      .catch(function () {
        document.querySelectorAll('[data-pesquisas-grid]').forEach(function (grid) {
          if (grid.querySelector('.card')) return;
          grid.innerHTML = '<p class="empty-message">Nenhuma publicação disponível.</p>';
        });
      });
    return;
  }

  var container = document.querySelector(config.container);
  if (!container) return;
  if (container.querySelector('.card')) return;

  loadPostsFromApi(config.category)
    .catch(function () { return loadPostsFromStaticFile(config.category); })
    .then(function (posts) {
      renderPostCards(container, posts);
    })
    .catch(function () {
      if (container.querySelector('.card')) return;
      if (container.querySelector('.empty-message') && !container.innerHTML.includes('npm start')) return;
      container.innerHTML = '<p class="empty-message">Nenhuma publicação disponível.</p>';
    });
});
