function formatDatePtBR(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
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
  if (category === 'inspecao') return 'Inspeção';
  if (category === 'equipamento') return 'Equipamento';
  return 'Pesquisa';
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
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  } catch (e) {
    return iso;
  }
}

function renderHomePostCards(container, posts) {
  if (!posts.length) {
    container.innerHTML =
      '<li class="home-latest-item home-latest-item--empty">' +
      '<span class="empty-message">Novas publicações em breve.</span>' +
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

  if (titleEl) titleEl.textContent = config.titulo || 'Sorteio ativo';
  if (prizeEl && config.premios && config.premios.length) {
    prizeEl.textContent = config.premios.map((p) => p.label).join(' · ');
  }
  if (dateEl && config.dataSorteio) {
    dateEl.textContent = 'Sorteio em ' + config.dataSorteio;
  }

  banner.hidden = false;
}

const YT_BUBBLE_KEY = 'budganja-home-yt-bubble-dismissed';
const YT_CHANNEL_URL = 'https://www.youtube.com/@InspetorBudGanja';
const YT_CHANNEL_LABEL = '@InspetorBudGanja';

function initHomeYoutubeBubble() {
  try {
    if (localStorage.getItem(YT_BUBBLE_KEY) === '1') return;
  } catch (e) { /* ignore */ }

  const bubble = document.createElement('aside');
  bubble.className = 'home-yt-bubble';
  bubble.setAttribute('role', 'dialog');
  bubble.setAttribute('aria-labelledby', 'home-yt-bubble-title');
  bubble.innerHTML =
    '<button type="button" class="home-yt-bubble-close" aria-label="Fechar convite do YouTube">×</button>' +
    '<p class="home-yt-bubble-icon" aria-hidden="true">▶</p>' +
    '<p id="home-yt-bubble-title" class="home-yt-bubble-title">Visite nosso canal no YouTube!</p>' +
    '<p class="home-yt-bubble-text">Vídeos, inspeções e tutoriais do laboratório em ' + escapeHtml(YT_CHANNEL_LABEL) + '.</p>' +
    '<a href="' + escapeHtml(YT_CHANNEL_URL) + '" class="home-yt-bubble-cta botao botao-sm" target="_blank" rel="noopener noreferrer">Abrir canal</a>';

  document.body.appendChild(bubble);

  const close = () => {
    bubble.classList.remove('is-visible');
    window.setTimeout(() => bubble.remove(), 280);
    try { localStorage.setItem(YT_BUBBLE_KEY, '1'); } catch (e) { /* ignore */ }
  };

  bubble.querySelector('.home-yt-bubble-close').addEventListener('click', close);

  window.setTimeout(() => {
    bubble.classList.add('is-visible');
  }, 1800);
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page !== 'home') return;
  loadSorteioBanner();
  loadLatestPosts();
  initHomeYoutubeBubble();
});
