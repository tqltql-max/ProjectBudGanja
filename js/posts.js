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
  'plantas-frutos': 'Frutos',
  'plantas-derivados-risco': 'Produtos nocivos',
  'animais-catalogo': 'Animais',
  'animais-producao': 'Produção animal',
  'animais-derivados-risco': 'Produtos nocivos',
  'palavras-origem': 'Palavras',
  'pessoas-historia': 'Pessoas',
  'divulgacao-saude': 'Divulgação',
  'artes-cultura': 'Artes',
  'vida-contos': 'Vida',
  'expressoes-ditados': 'Expressões',
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
  if (options.hub && post.series === 'plantas-frutos') {
    var fruto = post.seriesLabel || 'Fruto';
    return '<span class="post-card-series" data-series="' + post.series + '">' + fruto + '</span>';
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
  if (options.hub && (post.series === 'vida-contos' || /inspecao-conto-|inspecao-personagem-/i.test(post.slug || ''))) {
    var vida = post.seriesLabel || 'Vida';
    return '<span class="post-card-series" data-series="' + post.series + '">' + vida + '</span>';
  }
  if (
    options.hub &&
    (post.series === 'expressoes-ditados' || /inspecao-expressao-|inspecao-ditado-/i.test(post.slug || ''))
  ) {
    var expressao = post.seriesLabel || 'Expressão';
    return '<span class="post-card-series" data-series="' + post.series + '">' + expressao + '</span>';
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
    series === 'animais-derivados-risco' ||
    series.indexOf('derivado') === 0 ||
    /inspecao-derivado-/i.test(slug)
  ) {
    return 'derivado';
  }
  if (series === 'animais-producao') return 'producao';
  if (series === 'animais-catalogo' || /inspecao-animal-/i.test(slug)) return 'animal';
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
    series === 'vida-contos' ||
    series.indexOf('vida') === 0 ||
    /inspecao-conto-|inspecao-personagem-/i.test(slug)
  ) {
    return 'conto';
  }
  if (
    series === 'expressoes-ditados' ||
    series.indexOf('expressao') === 0 ||
    series.indexOf('ditado') === 0 ||
    /inspecao-expressao-|inspecao-ditado-/i.test(slug)
  ) {
    return 'expressao';
  }
  if (
    series === 'legado-pessoas' ||
    series.indexOf('legado') === 0 ||
    /inspecao-padre-|inspecao-elisaldo-|inspecao-pessoa-/i.test(slug)
  ) {
    return 'pessoa';
  }
  if (series === 'plantas-frutos') return 'fruto';
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

    var tipo = resolveInspecaoTipo(p);
    var fichaHref = '';
    if ((tipo === 'planta' || tipo === 'fruto') && p.sourceUrl && String(p.sourceUrl).indexOf('/plantas/') === 0) {
      fichaHref = String(p.sourceUrl);
    } else if (tipo === 'planta' || tipo === 'fruto') {
      var slugMatch = String(p.slug || '').match(/^inspecao-planta-(.+)$/i);
      if (slugMatch) fichaHref = '/plantas/' + slugMatch[1] + '/';
    }
    if (fichaHref) {
      var ficha = document.createElement('a');
      ficha.className = 'post-card-ficha';
      ficha.href = fichaHref;
      ficha.textContent = (window.BudGanjaI18n && typeof window.BudGanjaI18n.t === 'function')
        ? window.BudGanjaI18n.t('pages.inspections.openFicha', 'Abrir ficha')
        : 'Abrir ficha';
      card.appendChild(ficha);
    }

    container.appendChild(card);
  });

  if (window.budganjaEnhanceAdminPostCards) window.budganjaEnhanceAdminPostCards();
  if (window.budganjaEnhanceHoverTips) window.budganjaEnhanceHoverTips(container);
}

function filterByInspecaoTipo(posts, tipo) {
  return (posts || []).filter(function (p) { return resolveInspecaoTipo(p) === tipo; });
}

/** Âncora hash → id de filtro (modelo /videos/). */
var HUB_CHIP_ANCHOR = {
  canal: 'canais',
  equipamento: 'equipamentos',
  curso: 'cursos',
  loja: 'lojas',
  insumo: 'insumos',
  artigo: 'artigos',
  pessoa: 'pessoas',
  planta: 'plantas',
  fruto: 'frutos',
  derivado: 'derivados',
  palavra: 'palavras',
  pessoas: 'pessoas-historia',
  divulgacao: 'divulgacao',
  arte: 'artes',
  conto: 'vida',
  expressao: 'expressoes',
  sugestoes: 'sugestoes'
};

var HUB_ANCHOR_TO_TIPO = {
  pessoas: 'pessoa',
  'pessoas-historia': 'pessoas',
  canais: 'canal',
  cursos: 'curso',
  artigos: 'artigo',
  plantas: 'planta',
  frutos: 'fruto',
  derivados: 'derivado',
  palavras: 'palavra',
  divulgacao: 'divulgacao',
  artes: 'arte',
  vida: 'conto',
  contos: 'conto',
  expressoes: 'expressao',
  ditados: 'expressao',
  sugestoes: 'sugestoes'
};

var INSPECAO_HUB_TIPOS = [
  { id: 'pessoa', labelKey: 'pages.inspections.chipPeople', fallback: 'Legado', sort: 'seriesOrder' },
  { id: 'pessoas', labelKey: 'pages.inspections.chipPeopleHistory', fallback: 'Pessoas', sort: 'seriesOrder' },
  { id: 'canal', labelKey: 'pages.inspections.chipChannels', fallback: 'Canais', sort: 'label' },
  { id: 'curso', labelKey: 'pages.inspections.chipCourses', fallback: 'Cursos', sort: 'seriesOrder' },
  { id: 'artigo', labelKey: 'pages.inspections.chipArticles', fallback: 'Artigos', sort: 'seriesOrder' },
  { id: 'planta', labelKey: 'pages.inspections.chipPlants', fallback: 'Plantas', sort: 'seriesOrder' },
  { id: 'fruto', labelKey: 'pages.inspections.chipFruits', fallback: 'Frutos', sort: 'seriesOrder', keepVisible: true },
  { id: 'animal', labelKey: 'pages.inspections.chipAnimals', fallback: 'Animais', sort: 'seriesOrder', keepVisible: true },
  { id: 'producao', labelKey: 'pages.inspections.chipAnimalProduction', fallback: 'Produção animal', sort: 'seriesOrder', keepVisible: true },
  { id: 'derivado', labelKey: 'pages.inspections.chipDerivatives', fallback: 'Produtos nocivos', sort: 'seriesOrder' },
  { id: 'palavra', labelKey: 'pages.inspections.chipWords', fallback: 'Palavras', sort: 'seriesOrder', keepVisible: true },
  { id: 'divulgacao', labelKey: 'pages.inspections.chipOutreach', fallback: 'Divulgação', sort: 'seriesOrder' },
  { id: 'arte', labelKey: 'pages.inspections.chipArts', fallback: 'Artes', sort: 'seriesOrder', keepVisible: true },
  { id: 'conto', labelKey: 'pages.inspections.chipVida', fallback: 'Vida', sort: 'seriesOrder', keepVisible: true },
  {
    id: 'expressao',
    labelKey: 'pages.inspections.chipExpressions',
    fallback: 'Expressões',
    sort: 'seriesOrder',
    keepVisible: true
  },
  { id: 'sugestoes', labelKey: 'pages.inspections.chipSuggestions', fallback: 'Sugestões', special: true, keepVisible: true }
];

var inspecoesHubPosts = [];
var inspecoesActiveTipo = 'all';
var inspecoesActiveQuery = '';
var inspecoesSearchTimer = null;
var INSPECOES_PAGE_SIZE = 12;
var inspecoesVisibleCount = 0;
var inspecoesLastFiltered = [];
var inspecoesLoadingMore = false;
var inspecoesScrollObserver = null;

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

function escapeHubHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function hubTipoMeta(tipo) {
  for (var i = 0; i < INSPECAO_HUB_TIPOS.length; i++) {
    if (INSPECAO_HUB_TIPOS[i].id === tipo) return INSPECAO_HUB_TIPOS[i];
  }
  return null;
}

function countHubTipo(posts, tipo) {
  if (tipo === 'sugestoes') return null;
  return filterByInspecaoTipo(posts, tipo).length;
}

function readInspecoesFilterFromHash() {
  var hash = String(location.hash || '').replace(/^#/, '');
  if (hash.indexOf('inspecoes-') !== 0) return '';
  var anchor = hash.replace(/^inspecoes-/, '');
  return HUB_ANCHOR_TO_TIPO[anchor] || '';
}

function writeInspecoesHash(tipo) {
  var anchor = HUB_CHIP_ANCHOR[tipo];
  var next = anchor ? '#inspecoes-' + anchor : '';
  if (!next) {
    if (location.hash) {
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { location.hash = ''; }
    }
    return;
  }
  if (location.hash !== next) {
    try { history.replaceState(null, '', next); } catch (e) { location.hash = next; }
  }
}

function postMatchesHubQuery(post, q) {
  if (!q) return true;
  var blob = [
    localizedPostTitle(post),
    post.excerpt,
    post.series,
    post.seriesLabel,
    post.slug
  ].join(' ').toLowerCase();
  return blob.indexOf(q) !== -1;
}

function sortedHubPosts(posts, tipo) {
  var meta = hubTipoMeta(tipo);
  var sort = meta && meta.sort === 'label' ? 'label' : 'seriesOrder';
  return sort === 'label' ? sortCanaisPosts(posts) : sortBySeriesOrder(posts);
}

function setInspecoesPanels(tipo) {
  var artes = document.getElementById('inspecoes-artes');
  var palavras = document.getElementById('inspecoes-palavras');
  var expressoes = document.getElementById('inspecoes-expressoes');
  var sugs = document.getElementById('inspecoes-sugestoes');
  var list = document.getElementById('inspecoes-list');
  var searchWrap = document.querySelector('.inspecoes-search-wrap');

  if (artes) artes.hidden = tipo !== 'arte';
  if (palavras) palavras.hidden = tipo !== 'palavra';
  if (expressoes) expressoes.hidden = tipo !== 'expressao';
  if (sugs) sugs.hidden = tipo !== 'sugestoes';
  if (list) {
    list.hidden = tipo === 'sugestoes';
  }
  if (searchWrap) {
    searchWrap.hidden = tipo === 'sugestoes';
  }
  if (tipo === 'palavra' && typeof window.renderPalavrasDuploSentido === 'function') {
    window.renderPalavrasDuploSentido();
  }
}

function renderInspecoesFilters(posts) {
  var filtersEl = document.getElementById('inspecoes-filters');
  if (!filtersEl) return;

  var chips = [{ id: 'all', label: postsT('pages.inspections.filterAll', 'Todas'), count: (posts || []).length }];
  INSPECAO_HUB_TIPOS.forEach(function (t) {
    var n = countHubTipo(posts, t.id);
    if (t.special || t.keepVisible || (n && n > 0)) {
      chips.push({ id: t.id, label: postsT(t.labelKey, t.fallback), count: n });
    }
  });

  // Modelo /videos/: com série activa, só «Todas» + activa.
  if (inspecoesActiveTipo && inspecoesActiveTipo !== 'all') {
    chips = chips.filter(function (ch) {
      return ch.id === 'all' || ch.id === inspecoesActiveTipo;
    });
  }

  filtersEl.innerHTML =
    '<div class="videos-filters" role="toolbar" aria-label="' +
    escapeHubHtml(postsT('pages.inspections.filtersLabel', 'Filtrar por série')) +
    '">' +
    chips
      .map(function (ch) {
        var pressed = inspecoesActiveTipo === ch.id;
        return (
          '<button type="button" class="videos-filter-chip' +
          (pressed ? ' is-active' : '') +
          '" data-inspecao-tipo="' +
          escapeHubHtml(ch.id) +
          '" aria-pressed="' +
          (pressed ? 'true' : 'false') +
          '">' +
          escapeHubHtml(ch.label) +
          (typeof ch.count === 'number'
            ? ' <span class="videos-filter-count">' + ch.count + '</span>'
            : '') +
          '</button>'
        );
      })
      .join('') +
    '</div>';
}

function inspecoesContentTipoCount() {
  var n = 0;
  for (var i = 0; i < INSPECAO_HUB_TIPOS.length; i++) {
    if (!INSPECAO_HUB_TIPOS[i].special) n++;
  }
  return Math.max(1, n);
}

function perInspecaoTipoTake(count) {
  var pages = Math.max(1, Math.ceil(count / INSPECOES_PAGE_SIZE));
  var per = Math.max(1, Math.ceil(INSPECOES_PAGE_SIZE / inspecoesContentTipoCount()));
  return pages * per;
}

function hasMoreInspecoes(posts) {
  if (!posts || !posts.length) return false;
  if (inspecoesActiveTipo === 'sugestoes') return false;
  if (inspecoesActiveTipo !== 'all') {
    return inspecoesVisibleCount < posts.length;
  }
  var take = perInspecaoTipoTake(inspecoesVisibleCount);
  for (var i = 0; i < INSPECAO_HUB_TIPOS.length; i++) {
    var t = INSPECAO_HUB_TIPOS[i];
    if (t.special) continue;
    var list = filterByInspecaoTipo(posts, t.id);
    if (list.length > take) return true;
  }
  return false;
}

function syncInspecoesLoadMore(posts) {
  var btn = document.getElementById('inspecoes-load-more');
  if (!btn) return;
  var list = posts || inspecoesLastFiltered || [];
  var hasMore = hasMoreInspecoes(list);
  btn.hidden = !hasMore;
  btn.disabled = inspecoesLoadingMore;
  btn.textContent = postsT('pages.inspections.loadMore', 'Carregar mais');
  if (hasMore) ensureInspecoesScrollObserver();
}

function inspecoesLoadMoreNearViewport() {
  var btn = document.getElementById('inspecoes-load-more');
  if (!btn || btn.hidden) return false;
  var rect = btn.getBoundingClientRect();
  var margin = 240;
  return rect.top < window.innerHeight + margin && rect.bottom > -margin;
}

function maybeAutoLoadMoreInspecoes() {
  if (inspecoesLoadingMore) return;
  if (!hasMoreInspecoes(inspecoesLastFiltered)) return;
  if (!inspecoesLoadMoreNearViewport()) return;
  loadMoreInspecoes();
}

function ensureInspecoesScrollObserver() {
  var btn = document.getElementById('inspecoes-load-more');
  if (!btn || !('IntersectionObserver' in window)) return;
  if (inspecoesScrollObserver) return;
  inspecoesScrollObserver = new IntersectionObserver(
    function (entries) {
      var entry = entries && entries[0];
      if (!entry || !entry.isIntersecting) return;
      maybeAutoLoadMoreInspecoes();
    },
    { root: null, rootMargin: '240px 0px', threshold: 0 }
  );
  inspecoesScrollObserver.observe(btn);
}

function renderInspecoesGroupedList(container, posts, take) {
  container.innerHTML = '';
  var any = false;
  var limit = typeof take === 'number' ? take : Infinity;
  INSPECAO_HUB_TIPOS.forEach(function (t) {
    if (t.special) return;
    var list = sortedHubPosts(filterByInspecaoTipo(posts, t.id), t.id);
    if (!list.length) return;
    any = true;
    var visible = list.slice(0, limit);
    var section = document.createElement('section');
    section.className = 'videos-channel-section inspecoes-tipo-section';
    // Não reutilizar #inspecoes-<série>: esses IDs pertencem aos painéis
    // (Artes / Sugestões) e a chips via hash.
    section.setAttribute('data-inspecao-grupo', t.id);
    var head = document.createElement('header');
    head.className = 'videos-channel-section-head';
    var h2 = document.createElement('h2');
    h2.className = 'videos-list-heading';
    h2.textContent = postsT(t.labelKey, t.fallback);
    var count = document.createElement('span');
    count.className = 'videos-list-count';
    count.textContent = String(list.length);
    head.appendChild(h2);
    head.appendChild(count);
    section.appendChild(head);
    var grid = document.createElement('div');
    grid.className = 'container-cards publications-inspecoes';
    section.appendChild(grid);
    container.appendChild(section);
    renderPostCards(grid, visible, { hub: true });
  });
  if (!any) {
    container.innerHTML =
      '<p class="empty-message">' +
      escapeHubHtml(postsT('pages.inspections.empty', 'Nenhuma inspeção publicada ainda.')) +
      '</p>';
  }
}

function applyInspecoesHubView(opts) {
  opts = opts || {};
  var listEl = document.getElementById('inspecoes-list');
  if (!listEl) return;
  var posts = inspecoesHubPosts || [];
  var q = String(inspecoesActiveQuery || '').trim().toLowerCase();
  var resetPage = opts.resetPage !== false;

  renderInspecoesFilters(posts);
  setInspecoesPanels(inspecoesActiveTipo);

  if (inspecoesActiveTipo === 'sugestoes') {
    listEl.innerHTML = '';
    inspecoesLastFiltered = [];
    inspecoesVisibleCount = 0;
    syncInspecoesLoadMore([]);
    return;
  }

  var filtered = posts.filter(function (p) {
    if (inspecoesActiveTipo !== 'all' && resolveInspecaoTipo(p) !== inspecoesActiveTipo) return false;
    return postMatchesHubQuery(p, q);
  });

  inspecoesLastFiltered = filtered;
  if (resetPage) {
    inspecoesVisibleCount = Math.min(INSPECOES_PAGE_SIZE, filtered.length);
  } else if (inspecoesVisibleCount < 1 && filtered.length) {
    inspecoesVisibleCount = Math.min(INSPECOES_PAGE_SIZE, filtered.length);
  }

  if (inspecoesActiveTipo === 'arte' || inspecoesActiveTipo === 'palavra') {
    // Cards publicados da série + painel (Artes sugestões / Palavras catálogo+sugestões).
    listEl.hidden = !filtered.length;
    if (filtered.length) {
      var sortedArte = sortedHubPosts(filtered, inspecoesActiveTipo);
      var sliceArte = sortedArte.slice(0, inspecoesVisibleCount);
      var grid = document.createElement('div');
      grid.className = 'container-cards publications-inspecoes';
      listEl.innerHTML = '';
      listEl.appendChild(grid);
      renderPostCards(grid, sliceArte, { hub: true });
    } else {
      listEl.innerHTML = '';
      inspecoesVisibleCount = 0;
    }
    syncInspecoesLoadMore(filtered);
    return;
  }

  listEl.hidden = false;
  if (!filtered.length) {
    listEl.innerHTML =
      '<p class="empty-message">' +
      escapeHubHtml(
        q
          ? postsT('pages.inspections.searchEmpty', 'Nenhuma inspeção neste filtro.')
          : postsT('pages.inspections.empty', 'Nenhuma inspeção publicada ainda.')
      ) +
      '</p>';
    inspecoesVisibleCount = 0;
    syncInspecoesLoadMore([]);
    return;
  }

  if (inspecoesActiveTipo === 'all') {
    renderInspecoesGroupedList(listEl, filtered, perInspecaoTipoTake(inspecoesVisibleCount));
  } else {
    var sorted = sortedHubPosts(filtered, inspecoesActiveTipo);
    inspecoesVisibleCount = Math.min(inspecoesVisibleCount, sorted.length);
    var wrap = document.createElement('div');
    wrap.className = 'container-cards publications-inspecoes';
    listEl.innerHTML = '';
    listEl.appendChild(wrap);
    renderPostCards(wrap, sorted.slice(0, inspecoesVisibleCount), { hub: true });
  }
  syncInspecoesLoadMore(filtered);
}

function loadMoreInspecoes() {
  if (inspecoesLoadingMore) return;
  if (!inspecoesLastFiltered.length) return;
  if (!hasMoreInspecoes(inspecoesLastFiltered)) {
    syncInspecoesLoadMore(inspecoesLastFiltered);
    return;
  }
  inspecoesLoadingMore = true;
  var btn = document.getElementById('inspecoes-load-more');
  if (btn) btn.disabled = true;
  inspecoesVisibleCount += INSPECOES_PAGE_SIZE;
  applyInspecoesHubView({ resetPage: false });
  inspecoesLoadingMore = false;
  syncInspecoesLoadMore(inspecoesLastFiltered);
  // Se o sentinela continuar na zona de scroll, carrega a página seguinte.
  if (hasMoreInspecoes(inspecoesLastFiltered) && inspecoesLoadMoreNearViewport()) {
    setTimeout(maybeAutoLoadMoreInspecoes, 80);
  }
}

function bindInspecoesHubFilters() {
  if (window.__budganjaInspecoesFiltersBound) return;
  window.__budganjaInspecoesFiltersBound = true;

  var filtersEl = document.getElementById('inspecoes-filters');
  var searchEl = document.getElementById('inspecoes-search');
  var loadMoreBtn = document.getElementById('inspecoes-load-more');

  if (filtersEl) {
    filtersEl.addEventListener('click', function (ev) {
      var chip = ev.target.closest('[data-inspecao-tipo]');
      if (!chip || !filtersEl.contains(chip)) return;
      var next = chip.getAttribute('data-inspecao-tipo') || 'all';
      if (next === inspecoesActiveTipo && next !== 'all') {
        inspecoesActiveTipo = 'all';
      } else {
        inspecoesActiveTipo = next;
      }
      writeInspecoesHash(inspecoesActiveTipo === 'all' ? '' : inspecoesActiveTipo);
      applyInspecoesHubView({ resetPage: true });
    });
  }

  if (searchEl) {
    searchEl.addEventListener('input', function () {
      var value = searchEl.value || '';
      clearTimeout(inspecoesSearchTimer);
      inspecoesSearchTimer = setTimeout(function () {
        inspecoesActiveQuery = value;
        applyInspecoesHubView({ resetPage: true });
      }, 160);
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      loadMoreInspecoes();
    });
    ensureInspecoesScrollObserver();
  }

  window.addEventListener('hashchange', function () {
    var fromHash = readInspecoesFilterFromHash();
    if (fromHash) inspecoesActiveTipo = fromHash;
    else if (!location.hash) inspecoesActiveTipo = 'all';
    applyInspecoesHubView({ resetPage: true });
  });
}

function renderInspecoesHub(allPosts) {
  inspecoesHubPosts = allPosts || [];
  inspecoesVisibleCount = 0;
  bindInspecoesHubFilters();

  var fromHash = readInspecoesFilterFromHash();
  if (fromHash) inspecoesActiveTipo = fromHash;

  var searchEl = document.getElementById('inspecoes-search');
  if (searchEl && inspecoesActiveQuery) searchEl.value = inspecoesActiveQuery;

  applyInspecoesHubView({ resetPage: true });
}

window.applyInspecoesHubView = applyInspecoesHubView;

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
        var listEl = document.getElementById('inspecoes-list');
        if (listEl && !listEl.querySelector('.card')) {
          var emptyMsg = window.BudGanjaI18n
            ? window.BudGanjaI18n.t('pages.inspections.empty', 'Nenhuma inspeção publicada ainda.')
            : 'Nenhuma inspeção publicada ainda.';
          listEl.innerHTML = '<p class="empty-message">' + emptyMsg + '</p>';
        }
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
