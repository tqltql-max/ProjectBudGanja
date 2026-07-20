document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('community-admin-tbody');
  const countEl = document.getElementById('community-admin-count');
  const statusEl = document.getElementById('community-admin-status');
  const refreshBtn = document.getElementById('community-admin-refresh');
  const logoutBtn = document.getElementById('logout-btn');

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleString('pt-BR');
  }

  function setStatus(msg, isError) {
    if (!statusEl) return;
    statusEl.textContent = msg || '';
    statusEl.classList.toggle('is-error', !!isError);
  }

  async function ensureAdmin() {
    try {
      const res = await fetch('/api/me', { credentials: 'include' });
      if (!res.ok) {
        window.location.href = '/login.html?returnTo=' + encodeURIComponent('/comunidade-admin.html');
        return false;
      }
      return true;
    } catch (e) {
      window.location.href = '/login.html?returnTo=' + encodeURIComponent('/comunidade-admin.html');
      return false;
    }
  }

  async function loadPosts() {
    setStatus('');
    try {
      const res = await fetch('/api/admin/community/posts?limit=50', { credentials: 'include' });
      if (res.status === 401) {
        window.location.href = '/login.html?returnTo=' + encodeURIComponent('/comunidade-admin.html');
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (tbody) tbody.innerHTML = '<tr><td colspan="5">Erro ao carregar.</td></tr>';
        setStatus(data.error || 'Erro.', true);
        return;
      }
      const posts = data.posts || [];
      if (countEl) countEl.textContent = posts.length + ' publicação(ões)';
      if (!tbody) return;
      if (!posts.length) {
        tbody.innerHTML = '<tr><td colspan="5">Sem publicações.</td></tr>';
        return;
      }
      tbody.innerHTML = posts.map((post) => {
        const author = post.author && (post.author.username || post.author.name) || '—';
        const caption = String(post.caption || '').slice(0, 80);
        const canHide = post.status === 'published';
        return (
          '<tr>' +
          '<td>' + escapeHtml(formatDate(post.createdAt)) + '</td>' +
          '<td>' + escapeHtml(author) + '</td>' +
          '<td>' +
          (post.photoUrl ? '<a href="' + escapeHtml(post.photoUrl) + '" target="_blank" rel="noopener">foto</a> · ' : '') +
          escapeHtml(caption) +
          '</td>' +
          '<td>' + escapeHtml(post.status || '') + '</td>' +
          '<td>' +
          (canHide
            ? '<button type="button" class="botao botao-outline botao-sm community-hide-btn" data-id="' + escapeHtml(post.id) + '">Ocultar</button>'
            : '—') +
          '</td>' +
          '</tr>'
        );
      }).join('');
    } catch (e) {
      setStatus('Servidor indisponível.', true);
    }
  }

  if (tbody) {
    tbody.addEventListener('click', async (e) => {
      const btn = e.target.closest('.community-hide-btn');
      if (!btn) return;
      const id = btn.getAttribute('data-id');
      if (!id || !window.confirm('Ocultar esta publicação do feed?')) return;
      btn.disabled = true;
      try {
        const res = await fetch('/api/admin/community/posts/' + encodeURIComponent(id) + '/hide', {
          method: 'POST',
          credentials: 'include'
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setStatus(data.error || 'Falha ao ocultar.', true);
          btn.disabled = false;
          return;
        }
        setStatus('Publicação ocultada.');
        await loadPosts();
      } catch (err) {
        setStatus('Servidor indisponível.', true);
        btn.disabled = false;
      }
    });
  }

  if (refreshBtn) refreshBtn.addEventListener('click', () => { void loadPosts(); });

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' });
      window.location.href = '/login.html';
    });
  }

  void ensureAdmin().then((ok) => {
    if (ok) void loadPosts();
  });
});
