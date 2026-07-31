function i18nHome(key, fallback) {
  return window.BudGanjaI18n ? window.BudGanjaI18n.t(key, fallback) : (fallback || '');
}

function homeLocale() {
  return (window.BudGanjaI18n && window.BudGanjaI18n.getLocale()) || 'pt-BR';
}

function formatDatePtBR(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(homeLocale(), { day: '2-digit', month: 'long', year: 'numeric' });
  } catch (e) {
    return iso;
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function categoryLabel(category) {
  if (category === 'inspecao') return i18nHome('pages.home.catInspection', 'Inspeção');
  if (category === 'equipamento') return i18nHome('pages.home.catEquipment', 'Equipamento');
  return i18nHome('pages.home.catResearch', 'Pesquisa');
}

function normalizeAssetUrl(value) {
  const raw = String(value || '').trim();
  if (!raw || raw === '#') return '#';
  if (/^(?:https?:)?\/\//i.test(raw) || raw.startsWith('data:')) return raw;
  return raw.startsWith('/') ? raw : '/' + raw.replace(/^\/+/, '');
}

function formatDateCompact(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(homeLocale(), { day: '2-digit', month: 'short' });
  } catch (e) {
    return iso;
  }
}

function renderHomePostCards(container, posts) {
  if (!posts.length) {
    container.innerHTML =
      '<li class="home-latest-item home-latest-item--empty">' +
      '<span class="empty-message">' + escapeHtml(i18nHome('pages.home.latestEmpty', 'Novas publicações em breve.')) + '</span>' +
      '</li>';
    return;
  }

  container.innerHTML = posts.slice(0, 3).map((p) => {
    const href = normalizeAssetUrl(p.url);
    return (
      '<li class="home-latest-item post-card"' + (p.slug ? ' data-post-slug="' + escapeHtml(p.slug) + '"' : '') + '>' +
      '<a href="' + escapeHtml(href) + '" class="home-latest-row">' +
      '<span class="home-latest-badge">' + escapeHtml(categoryLabel(p.category)) + '</span>' +
      '<span class="home-latest-title">' + escapeHtml(p.title || '') + '</span>' +
      '<time class="home-latest-date" datetime="' + escapeHtml(p.date || '') + '">' + escapeHtml(formatDateCompact(p.date)) + '</time>' +
      '</a></li>'
    );
  }).join('');

  if (window.budganjaEnhanceAdminPostCards) window.budganjaEnhanceAdminPostCards();
}

async function loadLatestPosts() {
  const container = document.getElementById('home-latest-posts');
  if (!container) return;

  let posts = [];
  try {
    const res = await fetch('/api/posts');
    if (res.ok) posts = await res.json();
  } catch (e) { /* static fallback */ }

  if (!posts.length) {
    try {
      const res = await fetch('posts-public.json');
      if (res.ok) posts = await res.json();
    } catch (e) { /* ignore */ }
  }

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  renderHomePostCards(container, posts);
}

async function loadSorteioBanner() {
  const banner = document.getElementById('home-sorteio-banner');
  if (!banner) return;

  let config = null;
  try {
    const res = await fetch('/api/sorteio');
    if (res.ok) config = await res.json();
  } catch (e) { /* static */ }

  if (!config) {
    try {
      const res = await fetch('content/sorteio.json');
      if (res.ok) config = await res.json();
    } catch (e) { /* ignore */ }
  }

  if (!config || !config.ativo) return;

  const titleEl = document.getElementById('home-sorteio-title');
  const prizeEl = document.getElementById('home-sorteio-prize');
  const dateEl = document.getElementById('home-sorteio-date');
  const badgeEl = banner.querySelector('.home-announcement-badge');
  const joinEl = banner.querySelector('a.botao-home');

  if (badgeEl) badgeEl.textContent = i18nHome('pages.home.giveawayBadge', '🎁 Sorteio ativo');
  if (titleEl) {
    // Título da API é PT; em EN/ES preferir string i18n genérica.
    if (homeLocale() === 'pt-BR' && config.titulo) {
      titleEl.textContent = config.titulo;
    } else {
      titleEl.textContent = i18nHome('pages.home.giveawayTitle', config.titulo || 'Sorteio do laboratório');
    }
  }
  if (prizeEl && config.premios && config.premios.length) {
    prizeEl.textContent = config.premios.map((p) => p.label).join(' · ');
  }
  if (dateEl && config.dataSorteio) {
    dateEl.textContent = i18nHome('pages.home.giveawayOn', 'Sorteio em') + ' ' + config.dataSorteio;
  }
  if (joinEl) joinEl.textContent = i18nHome('pages.home.giveawayJoin', 'Participar agora');

  banner.hidden = false;
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page !== 'home') return;
  loadSorteioBanner();
  loadLatestPosts();
  window.addEventListener('budganja:locale-change', function () {
    loadSorteioBanner();
    loadLatestPosts();
  });
});
