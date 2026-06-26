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
  return String(url).replace(/^\//, '');
}

function renderPostCards(container, posts) {
  if (!posts.length) {
    container.innerHTML = '<p class="empty-message">Nenhuma publicação ainda.</p>';
    return;
  }

  container.innerHTML = '';
  posts.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'card post-card';

    const link = document.createElement('a');
    link.href = normalizePostUrl(p.url);
    link.style.textDecoration = 'none';
    link.style.color = 'inherit';

    if (p.coverImage) {
      const img = document.createElement('img');
      img.src = p.coverImage;
      img.alt = '';
      img.className = 'post-card-cover';
      img.loading = 'lazy';
      link.appendChild(img);
    }

    const title = document.createElement('h3');
    title.textContent = p.title || '';

    const excerpt = document.createElement('p');
    excerpt.textContent = p.excerpt || '';

    const date = document.createElement('span');
    date.className = 'post-card-date';
    date.textContent = formatDatePtBR(p.date);

    link.appendChild(title);
    link.appendChild(excerpt);
    link.appendChild(date);
    card.appendChild(link);
    container.appendChild(card);
  });
}

function getPublicationConfig() {
  const page = document.body.dataset.page;
  if (page === 'pesquisas') {
    return { category: 'pesquisa', container: '.container-cards' };
  }
  if (page === 'equipamentos') {
    return { category: 'equipamento', container: '.publications-equipamentos' };
  }
  if (page === 'inspecoes') {
    return { category: 'inspecao', container: '.publications-inspecoes' };
  }
  return null;
}

function filterByCategory(posts, category) {
  return posts.filter((p) => (p.category || 'pesquisa') === category);
}

function loadPostsFromApi(category) {
  return fetch('/api/posts?category=' + encodeURIComponent(category))
    .then((r) => {
      if (!r.ok) throw new Error('API ' + r.status);
      return r.json();
    });
}

function loadPostsFromStaticFile(category) {
  return fetch('posts-public.json')
    .then((r) => {
      if (!r.ok) throw new Error('static ' + r.status);
      return r.json();
    })
    .then((all) => filterByCategory(all, category));
}

document.addEventListener('DOMContentLoaded', () => {
  const config = getPublicationConfig();
  if (!config) return;

  const container = document.querySelector(config.container);
  if (!container) return;

  if (container.querySelector('.card')) return;

  loadPostsFromApi(config.category)
    .catch(() => loadPostsFromStaticFile(config.category))
    .then((posts) => renderPostCards(container, posts))
    .catch(() => {
      if (container.querySelector('.card')) return;
      if (container.querySelector('.empty-message') && !container.innerHTML.includes('npm start')) return;
      container.innerHTML = '<p class="empty-message">Nenhuma publicação disponível.</p>';
    });
});
