function postsLocale() {
  return (window.BudGanjaI18n && window.BudGanjaI18n.getLocale()) || 'pt-BR';
}

function localizedPostTitle(p) {
  var loc = postsLocale();
  if (loc === 'en' && p.titleEn) return p.titleEn;
  if (loc === 'es' && p.titleEs) return p.titleEs;
  return p.title || '';
}

function localizedPostExcerpt(p) {
  var loc = postsLocale();
  if (loc === 'en' && p.excerptEn) return p.excerptEn;
  if (loc === 'es' && p.excerptEs) return p.excerptEs;
  return p.excerpt || '';
}

function formatDatePtBR(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(postsLocale(), { day: '2-digit', month: 'long', year: 'numeric' });
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
  'guia-ferramenta': 'Guia de ferramenta',
  'pesquisa-laboratorio': 'Laboratório',
  'pesquisa-comunidade': 'Comunidade',
  'canal-movrecam': 'Canal MovReCam',
  'canal-canabinall': 'Canal CANABinALL',
  'verificacao-equipamento': 'Equipamentos',
  'formacao-academica': 'Extensão académica',
  'loja-cultivo': 'Lojas de cultivo',
  'insumos-cultivo': 'Insumos de cultivo',
  'artigos-cientificos': 'Artigos científicos',
  'legado-pessoas': 'Legado',
  'plantas-medicinais': 'Plantas medicinais',
  'plantas-derivados-risco': 'Derivados de risco',
  'palavras-origem': 'Palavras',
  'pessoas-historia': 'Pessoas',
  'divulgacao-saude': 'Divulgação',
  'artes-cultura': 'Artes',
  '': 'Todas as séries'
};

function seriesBadgeHtml(post, options) {
  if (!post.series) return '';
  options = options || {};
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
  if (options.hub && (post.series === 'loja-cultivo' || post.series.indexOf('loja-') === 0)) {
    var loja = post.seriesLabel || 'Loja';
    return '<span class="post-card-series" data-series="' + post.series + '">' + loja + '</span>';
  }
  if (options.hub && (post.series === 'insumos-cultivo' || post.series.indexOf('insumo') === 0)) {
    var insumo = post.seriesLabel || 'Insumo';
    return '<span class="post-card-series" data-series="' + post.series + '">' + insumo + '</span>';
  }
  if (options.hub && (post.series === 'artigos-cientificos' || post.series.indexOf('artigo') === 0)) {
    var artigo = post.seriesLabel || 'Artigo';
    return '<span class="post-card-series" data-series="' + post.series + '">' + artigo + '</span>';
  }
  if (options.hub && (post.series === 'legado-pessoas' || post.series.indexOf('legado') === 0)) {
    var legado = post.seriesLabel || 'Legado';
    return '<span class="post-card-series" data-series="' + post.series + '">' + legado + '</span>';
  }
  if (options.hub && (post.series === 'plantas-medicinais' || /inspecao-planta-/i.test(post.slug || ''))) {
    var planta = post.seriesLabel || 'Planta';
    return '<span class="post-card-series" data-series="' + post.series + '">' + planta + '</span>';
  }
  if (options.hub && (post.series === 'palavras-origem' || /inspecao-palavra-/i.test(post.slug || ''))) {
    var palavra = post.seriesLabel || 'Palavra';
    return '<span class="post-card-series" data-series="' + post.series + '">' + palavra + '</span>';
  }
  if (options.hub && (post.series === 'pessoas-historia' || /inspecao-figura-/i.test(post.slug || ''))) {
    var figura = post.seriesLabel || 'Pessoa';
    return '<span class="post-card-series" data-series="' + post.series + '">' + figura + '</span>';
  }
  if (options.hub && (post.series === 'divulgacao-saude' || /inspecao-divulgacao-/i.test(post.slug || ''))) {
    var div = post.seriesLabel || 'Divulgação';
    return '<span class="post-card-series" data-series="' + post.series + '">' + div + '</span>';
  }
  if (options.hub && (post.series === 'artes-cultura' || /inspecao-arte-|inspecao-filme-|inspecao-serie-/i.test(post.slug || ''))) {
    var arte = post.seriesLabel || 'Arte';
    return '<span class="post-card-series" data-series="' + post.series + '">' + arte + '</span>';
  }
  var label = post.seriesLabel || SERIES_LABELS[post.series] || post.series;
  var order = post.seriesOrder != null ? ' · Cap. ' + post.seriesOrder : '';
  return '<span class="post-card-series" data-series="' + post.series + '">' + label + order + '</span>';
}

/** Título limpo para cards do hub (sem prefixo “Inspeção:”). */
function hubCardTitle(post) {
  var t = String(localizedPostTitle(post) || '').trim();
  t = t.replace(/^Inspe[cç][aã]o:\s*/i, '');
  t = t.replace(/^Inspection:\s*/i, '');
  t = t.replace(/^Inspecci[oó]n:\s*/i, '');
  t = t.replace(/^Canal\s+/i, '');
  t = t.replace(/^Channel\s+/i, '');
  return t;
}

function resolveInspecaoTipo(post) {
  var series = String((post && post.series) || '');
  var slug = String((post && post.slug) || '');
  if (series.indexOf('canal-') === 0 || /inspecao-canal-/i.test(slug)) return 'canal';
  if (series === 'verificacao-equipamento' || /equipamento|marshydro/i.test(series + slug)) return 'equipamento';
  if (series === 'formacao-academica' || /curso|unifesp|formacao/i.test(series + slug)) return 'curso';
  if (series === 'loja-cultivo' || series.indexOf('loja-') === 0 || /inspecao-loja-/i.test(slug)) return 'loja';
  if (series === 'insumos-cultivo' || series.indexOf('insumo') === 0 || /inspecao-insumo-/i.test(slug)) return 'insumo';
  if (series === 'artigos-cientificos' || series.indexOf('artigo') === 0 || /inspecao-artigo-/i.test(slug)) return 'artigo';
  if (
    series === 'plantas-derivados-risco' ||
    series.indexOf('derivado') === 0 ||
    /inspecao-derivado-/i.test(slug)
  ) {
    return 'derivado';
  }
  if (
    series === 'palavras-origem' ||
    series.indexOf('palavra') === 0 ||
    /inspecao-palavra-/i.test(slug)
  ) {
    return 'palavra';
  }
  if (
    series === 'pessoas-historia' ||
    /inspecao-figura-/i.test(slug)
  ) {
    return 'pessoas';
  }
  if (
    series === 'divulgacao-saude' ||
    series.indexOf('divulgacao') === 0 ||
    /inspecao-divulgacao-/i.test(slug)
  ) {
    return 'divulgacao';
  }
  if (
    series === 'artes-cultura' ||
    series.indexOf('arte') === 0 ||
    /inspecao-arte-|inspecao-filme-|inspecao-serie-/i.test(slug)
  ) {
    return 'arte';
  }
  if (
    series === 'legado-pessoas' ||
    series.indexOf('legado') === 0 ||
    /inspecao-padre-|inspecao-elisaldo-|inspecao-pessoa-/i.test(slug)
  ) {
    return 'pessoa';
  }
  if (series === 'plantas-medicinais' || /inspecao-planta-/i.test(slug)) return 'planta';
  if (/^inspecao-canal-/i.test(slug)) return 'canal';
  return 'canal';
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
      pesquisa: { text: 'Abrir diário de pesquisas', href: '/cultivo/' },
      inspecao: { text: 'Ver vídeos', href: '/videos/', external: false },
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
    if (document.body.dataset.page === 'pesquisas') {
      card.dataset.pesquisasSource = isPesquisaComunidadePost(p) ? 'comunidade' : 'lab';
      card.dataset.pesquisasQ = [
        localizedPostTitle(p),
        localizedPostExcerpt(p),
        p.seriesLabel || '',
        p.series || '',
        p.slug || ''
      ].join(' ').toLowerCase();
    }

    var link = document.createElement('a');
    link.href = normalizePostUrl(p.url);
    link.style.textDecoration = 'none';
    link.style.color = 'inherit';
    var tip = localizedPostExcerpt(p);
    if (tip) link.setAttribute('data-tip', tip);

    appendCoverTo(link, p.coverImage);

    if (p.series) {
      var badgeWrap = document.createElement('div');
      badgeWrap.className = 'post-card-badges';
      badgeWrap.innerHTML = seriesBadgeHtml(p, options);
      link.appendChild(badgeWrap);
    }

    var title = document.createElement('h3');
    title.textContent = options.hub ? hubCardTitle(p) : localizedPostTitle(p);

    var excerpt = document.createElement('p');
    excerpt.textContent = localizedPostExcerpt(p);

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
  canal: 'canais',
  equipamento: 'equipamentos',
  curso: 'cursos',
  loja: 'lojas',
  insumo: 'insumos',
  artigo: 'artigos',
  pessoa: 'pessoas',
  planta: 'plantas',
  derivado: 'derivados',
  palavra: 'palavras',
  pessoas: 'pessoas-historia',
  divulgacao: 'divulgacao',
  arte: 'artes'
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

function postsT(key, fallback) {
  return window.BudGanjaI18n ? window.BudGanjaI18n.t(key, fallback) : fallback;
}

/** Agrupa inspeções de plantas num <details> compacto (fecha por defeito). */
function renderPlantasDropGroup(container, posts) {
  container.innerHTML = '';

  var details = document.createElement('details');
  details.className = 'card inspecoes-drop-group inspecoes-drop-group--plantas';
  if (location.hash === '#inspecoes-plantas') details.open = true;

  var summary = document.createElement('summary');
  summary.className = 'inspecoes-drop-summary';

  var coverPost = null;
  for (var i = 0; i < posts.length; i++) {
    if (posts[i] && posts[i].coverImage) {
      coverPost = posts[i];
      break;
    }
  }
  if (!coverPost) coverPost = posts[0];
  appendCoverTo(summary, coverPost && coverPost.coverImage);

  var badges = document.createElement('div');
  badges.className = 'post-card-badges';
  var badge = document.createElement('span');
  badge.className = 'post-card-series';
  badge.dataset.series = 'plantas-medicinais';
  badge.textContent = postsT('pages.inspections.sectionPlants', 'Plantas');
  badges.appendChild(badge);
  summary.appendChild(badges);

  var title = document.createElement('h3');
  title.textContent = postsT(
    'pages.inspections.plantsDropTitle',
    'Catálogo de plantas medicinais'
  );
  summary.appendChild(title);

  var blurb = document.createElement('p');
  blurb.textContent = postsT(
    'pages.inspections.plantsDropDesc',
    'Fichas e relatórios por espécie — toque para expandir a lista.'
  );
  summary.appendChild(blurb);

  var meta = document.createElement('div');
  meta.className = 'inspecoes-drop-meta';
  var countEl = document.createElement('span');
  countEl.className = 'inspecoes-drop-count';
  countEl.textContent = postsT('pages.inspections.plantsDropCount', '{n} espécies')
    .replace('{n}', String(posts.length));
  var caret = document.createElement('span');
  caret.className = 'inspecoes-drop-caret';
  caret.setAttribute('aria-hidden', 'true');
  meta.appendChild(countEl);
  meta.appendChild(caret);
  summary.appendChild(meta);

  details.appendChild(summary);

  var chapters = document.createElement('div');
  chapters.className = 'inspecoes-drop-chapters';
  details.appendChild(chapters);
  container.appendChild(details);

  renderPostCards(chapters, posts, { hub: true, append: true });
}

function renderInspecoesHub(allPosts) {
  var tipos = [
    { id: 'pessoa', section: '#inspecoes-pessoas', sort: 'seriesOrder' },
    { id: 'canal', section: '#inspecoes-canais', sort: 'label' },
    { id: 'curso', section: '#inspecoes-cursos', sort: 'seriesOrder' },
    { id: 'artigo', section: '#inspecoes-artigos', sort: 'seriesOrder' },
    { id: 'planta', section: '#inspecoes-plantas', sort: 'seriesOrder' },
    { id: 'derivado', section: '#inspecoes-derivados', sort: 'seriesOrder' },
    { id: 'palavra', section: '#inspecoes-palavras', sort: 'seriesOrder' },
    { id: 'pessoas', section: '#inspecoes-pessoas-historia', sort: 'seriesOrder' },
    { id: 'divulgacao', section: '#inspecoes-divulgacao', sort: 'seriesOrder' },
    { id: 'arte', section: '#inspecoes-artes', sort: 'seriesOrder', keepVisible: true }
  ];

  tipos.forEach(function (t) {
    var section = document.querySelector(t.section);
    var grid = document.querySelector('[data-inspecao-grid="' + t.id + '"]');
    if (!section || !grid) return;

    var list = filterByInspecaoTipo(allPosts, t.id);
    if (!list.length) {
      if (t.keepVisible) {
        section.hidden = false;
        setHubChipVisibility(t.id, true);
        grid.hidden = true;
        grid.innerHTML = '';
      } else {
        section.hidden = true;
        setHubChipVisibility(t.id, false);
      }
      return;
    }

    section.hidden = false;
    setHubChipVisibility(t.id, true);
    grid.hidden = false;
    var sorted = t.sort === 'seriesOrder' ? sortBySeriesOrder(list) : sortCanaisPosts(list);
    if (t.id === 'planta') renderPlantasDropGroup(grid, sorted);
    else renderPostCards(grid, sorted, { hub: true });
  });

  if (!window.__budganjaPlantasDropHashBound) {
    window.__budganjaPlantasDropHashBound = true;
    window.addEventListener('hashchange', function () {
      if (location.hash !== '#inspecoes-plantas') return;
      var drop = document.querySelector('#inspecoes-plantas .inspecoes-drop-group--plantas');
      if (drop) drop.open = true;
    });
  }
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
    (opts.cta || 'Abrir diário de pesquisas') +
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
    card.dataset.pesquisasSource = 'andamento';
    card.dataset.pesquisasQ = [
      log.name || '',
      species,
      phaseLabel,
      badge,
      'dia ' + dayNum
    ].join(' ').toLowerCase();

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
              cta: 'Abrir diário de pesquisas',
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

  loadPesquisasEmAndamento().then(function () {
    initPesquisasFilter();
  });
}

function normalizePesquisasQuery(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function applyPesquisasFilter() {
  var qInput = document.getElementById('pesquisas-q');
  var sourceSelect = document.getElementById('pesquisas-source');
  var statusEl = document.getElementById('pesquisas-filter-status');
  var emptyEl = document.getElementById('pesquisas-filter-empty');
  if (!qInput && !sourceSelect) return;

  var query = normalizePesquisasQuery(qInput && qInput.value);
  var source = sourceSelect ? String(sourceSelect.value || '') : '';
  var sections = document.querySelectorAll('.pesquisas-section');
  var visibleCards = 0;
  var totalCards = 0;

  sections.forEach(function (section) {
    var sectionSource = '';
    if (section.id === 'pesquisas-andamento') sectionSource = 'andamento';
    else if (section.id === 'pesquisas-lab') sectionSource = 'lab';
    else if (section.id === 'pesquisas-comunidade') sectionSource = 'comunidade';

    var sourceMatch = !source || source === sectionSource;
    var cards = section.querySelectorAll('.card.post-card, .empty-state');
    var sectionVisible = 0;

    cards.forEach(function (card) {
      if (card.classList.contains('empty-state')) {
        card.hidden = !sourceMatch || !!query;
        return;
      }
      totalCards += 1;
      var hay = normalizePesquisasQuery(card.dataset.pesquisasQ || card.textContent || '');
      var textOk = !query || hay.indexOf(query) !== -1;
      var srcOk = !source || (card.dataset.pesquisasSource || sectionSource) === source;
      var show = sourceMatch && textOk && srcOk;
      card.hidden = !show;
      if (show) {
        sectionVisible += 1;
        visibleCards += 1;
      }
    });

    var showSection = sourceMatch && (sectionVisible > 0 || (!query && section.querySelector('.empty-state')));
    if (!sourceMatch) showSection = false;
    if (query && sectionVisible === 0) showSection = false;
    section.hidden = !showSection;
  });

  if (emptyEl) emptyEl.hidden = !(totalCards > 0 && visibleCards === 0);
  if (statusEl) {
    if (!query && !source) statusEl.textContent = '';
    else if (visibleCards === 0) statusEl.textContent = '0 resultados';
    else statusEl.textContent = visibleCards + (visibleCards === 1 ? ' resultado' : ' resultados');
  }
}

function initPesquisasFilter() {
  if (document.body.dataset.page !== 'pesquisas') return;
  var qInput = document.getElementById('pesquisas-q');
  var sourceSelect = document.getElementById('pesquisas-source');
  if (!qInput && !sourceSelect) return;
  if (qInput && qInput.dataset.filterBound) return;
  if (qInput) qInput.dataset.filterBound = '1';

  var timer = null;
  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(applyPesquisasFilter, 80);
  }

  if (qInput) {
    qInput.addEventListener('input', schedule);
    qInput.addEventListener('search', schedule);
  }
  if (sourceSelect) sourceSelect.addEventListener('change', applyPesquisasFilter);
  applyPesquisasFilter();
}

function prependSubstratosCard(container, replaceEmpty) {
  if (!container || container.querySelector('[data-post-slug="substratos-static"]')) return;
  var card = document.createElement('div');
  card.className = 'card post-card';
  card.dataset.postSlug = 'substratos-static';
  card.dataset.pesquisasSource = 'lab';
  card.dataset.pesquisasQ = 'substratos biodegradáveis relatório técnico propagação vegetal laboratório';
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
  var cachedPosts = null;

  function bindLocaleRerender(renderFn) {
    window.addEventListener('budganja:locale-change', function () {
      if (cachedPosts) renderFn(cachedPosts);
    });
  }

  if (config.hub) {
    loadPostsFromApi(config.category)
      .catch(function () { return loadPostsFromStaticFile(config.category); })
      .then(function (posts) {
        cachedPosts = posts || [];
        renderInspecoesHub(cachedPosts);
        if (typeof window.renderInspecoesSugestoes === 'function') {
          window.renderInspecoesSugestoes(cachedPosts);
        }
        bindLocaleRerender(function (all) {
          renderInspecoesHub(all);
          if (typeof window.renderInspecoesSugestoes === 'function') {
            window.renderInspecoesSugestoes(all);
          }
        });
      })
      .catch(function () {
        document.querySelectorAll('[data-inspecao-grid]').forEach(function (grid) {
          if (grid.querySelector('.card')) return;
          var emptyKey = config.category === 'inspecao' ? 'pages.inspections.empty' : 'pages.research.empty';
          var emptyMsg = window.BudGanjaI18n
            ? window.BudGanjaI18n.t(emptyKey, 'Nenhuma publicação disponível.')
            : 'Nenhuma publicação disponível.';
          grid.innerHTML = '<p class="empty-message">' + emptyMsg + '</p>';
        });
        if (typeof window.renderInspecoesSugestoes === 'function') {
          window.renderInspecoesSugestoes([]);
        }
      });
    return;
  }

  if (config.pesquisasHub) {
    loadPostsFromApi(config.category)
      .catch(function () { return loadPostsFromStaticFile(config.category); })
      .then(function (posts) {
        cachedPosts = posts || [];
        renderPesquisasHub(cachedPosts);
        bindLocaleRerender(renderPesquisasHub);
      })
      .catch(function () {
        document.querySelectorAll('[data-pesquisas-grid]').forEach(function (grid) {
          if (grid.querySelector('.card')) return;
          var emptyMsg = window.BudGanjaI18n
            ? window.BudGanjaI18n.t('pages.research.empty', 'Nenhuma publicação disponível.')
            : 'Nenhuma publicação disponível.';
          grid.innerHTML = '<p class="empty-message">' + emptyMsg + '</p>';
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
      cachedPosts = posts || [];
      renderPostCards(container, cachedPosts);
      bindLocaleRerender(function (list) { renderPostCards(container, list); });
    })
    .catch(function () {
      if (container.querySelector('.card')) return;
      if (container.querySelector('.empty-message') && !container.innerHTML.includes('npm start')) return;
      var emptyMsg = window.BudGanjaI18n
        ? window.BudGanjaI18n.t('pages.research.empty', 'Nenhuma publicação disponível.')
        : 'Nenhuma publicação disponível.';
      container.innerHTML = '<p class="empty-message">' + emptyMsg + '</p>';
    });
});
