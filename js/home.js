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

var HOME_PINNED_SLUGS = [
  'inspecao-palavra-teologia',
  'inspecao-expressao-quem-nao-arrisca-nao-petisca',
  'inspecao-palavra-teoria-das-cordas',
  'inspecao-arte-bom-dia-inverno',
  'inspecao-canal-paulinho'
];

/**
 * Últimas do laboratório: ordena por data, mas garante diversidade de categorias
 * (ex.: uma pesquisa não fica enterrada sob várias inspeções do mesmo dia).
 * Destaques (teoria das cordas, Bom dia, Inverno e Paulinho) ficam no início.
 */
function pickHomeLatestPosts(posts, limit) {
  const max = Math.max(1, Number(limit) || 4);
  const sorted = (posts || []).slice().sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  if (!sorted.length) return [];

  const pinned = HOME_PINNED_SLUGS.map(function (slug) {
    return sorted.find(function (p) {
      return p && p.slug === slug;
    });
  }).filter(Boolean);
  const windowSize = Math.min(sorted.length, 36);
  const window = sorted.slice(0, windowSize);
  const picked = [];
  const used = Object.create(null);

  function catOf(p) {
    return String((p && p.category) || 'pesquisa');
  }

  function take(p) {
    if (!p || !p.slug || used[p.slug]) return;
    used[p.slug] = true;
    picked.push(p);
  }

  pinned.forEach(take);

  ['pesquisa', 'inspecao', 'equipamento'].forEach(function (cat) {
    if (picked.length >= max) return;
    const hit = window.find(function (p) {
      return catOf(p) === cat && !used[p.slug];
    });
    if (hit) take(hit);
  });

  sorted.forEach(function (p) {
    if (picked.length >= max) return;
    take(p);
  });

  const rest = picked.filter(function (p) {
    return HOME_PINNED_SLUGS.indexOf(p.slug) < 0;
  }).sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  return pinned.concat(rest);
}

function renderHomePostCards(container, posts) {
  if (!posts.length) {
    container.innerHTML =
      '<li class="home-latest-item home-latest-item--empty">' +
      '<span class="empty-message">' + escapeHtml(i18nHome('pages.home.latestEmpty', 'Novas publicações em breve.')) + '</span>' +
      '</li>';
    return;
  }

  container.innerHTML = posts.map((p) => {
    const href = normalizeAssetUrl(p.url);
    const loc = homeLocale();
    const title =
      (loc === 'en' && p.titleEn) ||
      (loc === 'es' && p.titleEs) ||
      p.title ||
      '';
    return (
      '<li class="home-latest-item post-card"' + (p.slug ? ' data-post-slug="' + escapeHtml(p.slug) + '"' : '') + '>' +
      '<a href="' + escapeHtml(href) + '" class="home-latest-row">' +
      '<span class="home-latest-badge">' + escapeHtml(categoryLabel(p.category)) + '</span>' +
      '<span class="home-latest-title">' + escapeHtml(title) + '</span>' +
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
      const res = await fetch('/posts-public.json');
      if (res.ok) posts = await res.json();
    } catch (e) { /* ignore */ }
  }

  renderHomePostCards(container, pickHomeLatestPosts(posts, 4));
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
  var page = document.body.dataset.page;
  if (page !== 'home' && page !== 'laboratorio') return;
  loadSorteioBanner();
  loadLatestPosts();
  window.addEventListener('budganja:locale-change', function () {
    loadSorteioBanner();
    loadLatestPosts();
  });
});
