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
  '': 'Todas as séries'
};

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

    var placeholderHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
    if (p.coverImage) {
      var img = document.createElement('img');
      var cover = String(p.coverImage).trim();
      img.src = cover.startsWith('/') || /^(?:https?:)?\/\//i.test(cover) ? cover : '/' + cover.replace(/^\/+/, '');
      img.alt = '';
      img.className = 'post-card-cover';
      img.loading = 'lazy';
      img.onerror = function() {
        var ph = document.createElement('div');
        ph.className = 'post-card-cover post-card-cover-placeholder';
        ph.setAttribute('aria-hidden', 'true');
        ph.innerHTML = placeholderHtml;
        this.parentNode.replaceChild(ph, this);
      };
      link.appendChild(img);
    } else {
      var placeholder = document.createElement('div');
      placeholder.className = 'post-card-cover post-card-cover-placeholder';
      placeholder.setAttribute('aria-hidden', 'true');
      placeholder.innerHTML = placeholderHtml;
      link.appendChild(placeholder);
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
    return { category: 'inspecao', container: '.publications-inspecoes', seriesFilter: '#inspecoes-series-filter' };
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
  return fetch('/api/posts?category=' + encodeURIComponent(category))
    .then(function (r) {
      if (!r.ok) throw new Error('API ' + r.status);
      return r.json();
    });
}

function loadPostsFromStaticFile(category) {
  return fetch('posts-public.json')
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
