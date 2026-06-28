document.addEventListener('DOMContentLoaded', async () => {
  const logoutBtn = document.getElementById('logout-btn');
  const filterStatus = document.getElementById('filter-submission-status');
  const tableBody = document.getElementById('submissions-table-body');
  const countEl = document.getElementById('submissions-count');
  const statsEl = document.getElementById('submissions-stats');
  const listPanel = document.getElementById('submissions-list-panel');
  const detailPanel = document.getElementById('submission-detail-panel');
  const backBtn = document.getElementById('submission-back-btn');
  const reviewForm = document.getElementById('submission-review-form');
  const titleEl = document.getElementById('submission-title');
  const excerptEl = document.getElementById('submission-excerpt');
  const contentEl = document.getElementById('submission-content');
  const publishedEl = document.getElementById('submission-published');
  const rejectBtn = document.getElementById('submission-reject-btn');
  const resultEl = document.getElementById('submission-result');
  const metaEl = document.getElementById('submission-meta');
  const statusBadge = document.getElementById('submission-status-badge');

  let currentId = null;
  let cached = [];

  try {
    const me = await fetch('/api/me', { credentials: 'include' });
    if (!me.ok) {
      window.location.href = '/login.html?returnTo=/pesquisas-admin.html';
      return;
    }
  } catch (e) {
    window.location.href = '/login.html?returnTo=/pesquisas-admin.html';
    return;
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' });
      window.location.href = '/login.html';
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function formatDate(iso) {
    if (!iso) return '—';
    try {
      return new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
    } catch (e) {
      return iso;
    }
  }

  function statusLabel(status) {
    if (status === 'approved') return 'Aprovada';
    if (status === 'rejected') return 'Rejeitada';
    return 'Pendente';
  }

  function renderStats(list) {
    if (!statsEl) return;
    const pending = list.filter((s) => s.status === 'pending').length;
    const approved = list.filter((s) => s.status === 'approved').length;
    const rejected = list.filter((s) => s.status === 'rejected').length;
    statsEl.innerHTML =
      '<div class="admin-stat-card"><span class="admin-stat-value">' + pending + '</span><span class="admin-stat-label">Pendentes</span></div>' +
      '<div class="admin-stat-card"><span class="admin-stat-value">' + approved + '</span><span class="admin-stat-label">Aprovadas</span></div>' +
      '<div class="admin-stat-card"><span class="admin-stat-value">' + rejected + '</span><span class="admin-stat-label">Rejeitadas</span></div>';
  }

  function showList() {
    currentId = null;
    if (listPanel) listPanel.hidden = false;
    if (detailPanel) detailPanel.hidden = true;
  }

  function showDetail() {
    if (listPanel) listPanel.hidden = true;
    if (detailPanel) detailPanel.hidden = false;
  }

  async function loadSubmissions() {
    const status = filterStatus ? filterStatus.value : 'pending';
    const qs = status ? '?status=' + encodeURIComponent(status) : '';
    const res = await fetch('/api/admin/cultivo-submissions' + qs, { credentials: 'include' });
    if (res.status === 401) {
      window.location.href = '/login.html?returnTo=/pesquisas-admin.html';
      return;
    }
    const data = await res.json().catch(() => ({}));
    cached = data.submissions || [];
    if (status === '') {
      const allRes = await fetch('/api/admin/cultivo-submissions', { credentials: 'include' });
      const allData = await allRes.json().catch(() => ({}));
      renderStats(allData.submissions || []);
    } else {
      renderStats(cached);
    }
    if (countEl) countEl.textContent = cached.length + ' submissão(ões)';
    if (!tableBody) return;
    if (!cached.length) {
      tableBody.innerHTML = '<tr><td colspan="6">Nenhuma submissão neste filtro.</td></tr>';
      return;
    }
    tableBody.innerHTML = cached.map((row) => {
      const action = row.status === 'pending'
        ? '<button type="button" class="botao botao-outline botao-sm" data-review-id="' + escapeHtml(row.id) + '">Rever</button>'
        : (row.postUrl ? '<a href="' + escapeHtml(row.postUrl) + '" class="botao botao-outline botao-sm" target="_blank" rel="noopener">Ver post</a>' : '—');
      return '<tr>' +
        '<td>' + escapeHtml(formatDate(row.submittedAt)) + '</td>' +
        '<td>' + escapeHtml(row.title) + '</td>' +
        '<td>' + escapeHtml(row.authorName || row.userEmail || '—') + '</td>' +
        '<td>' + escapeHtml(row.growName || '—') + '</td>' +
        '<td>' + escapeHtml(statusLabel(row.status)) + '</td>' +
        '<td>' + action + '</td></tr>';
    }).join('');
    tableBody.querySelectorAll('[data-review-id]').forEach((btn) => {
      btn.addEventListener('click', () => openDetail(btn.getAttribute('data-review-id')));
    });
  }

  async function openDetail(id) {
    const res = await fetch('/api/admin/cultivo-submissions/' + encodeURIComponent(id), { credentials: 'include' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.submission) {
      if (resultEl) resultEl.textContent = data.error || 'Não foi possível abrir a submissão.';
      return;
    }
    const sub = data.submission;
    currentId = sub.id;
    if (titleEl) titleEl.value = sub.title || '';
    if (excerptEl) excerptEl.value = sub.excerpt || '';
    if (contentEl) contentEl.value = sub.contentMd || '';
    if (publishedEl) publishedEl.checked = sub.status === 'pending';
    if (statusBadge) statusBadge.textContent = statusLabel(sub.status);
    if (metaEl) {
      metaEl.textContent = 'Autor: ' + (sub.authorName || sub.userEmail || '—') +
        ' · Pesquisa: ' + (sub.growName || '—') +
        ' · Enviada: ' + formatDate(sub.submittedAt);
    }
    if (resultEl) resultEl.textContent = '';
    const pending = sub.status === 'pending';
    if (rejectBtn) rejectBtn.hidden = !pending;
    if (reviewForm) reviewForm.querySelector('#submission-approve-btn').hidden = !pending;
    if (titleEl) titleEl.readOnly = !pending;
    if (excerptEl) excerptEl.readOnly = !pending;
    if (contentEl) contentEl.readOnly = !pending;
    if (publishedEl) publishedEl.disabled = !pending;
    showDetail();
  }

  if (filterStatus) filterStatus.addEventListener('change', loadSubmissions);
  if (backBtn) backBtn.addEventListener('click', showList);

  if (rejectBtn) {
    rejectBtn.addEventListener('click', async () => {
      if (!currentId) return;
      const note = window.prompt('Motivo da rejeição (opcional, visível ao autor):', '');
      if (note === null) return;
      rejectBtn.disabled = true;
      const res = await fetch('/api/admin/cultivo-submissions/' + encodeURIComponent(currentId) + '/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ note: note })
      });
      const data = await res.json().catch(() => ({}));
      rejectBtn.disabled = false;
      if (!res.ok) {
        if (resultEl) resultEl.textContent = data.error || 'Erro ao rejeitar.';
        return;
      }
      showList();
      await loadSubmissions();
    });
  }

  if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!currentId) return;
      const approveBtn = document.getElementById('submission-approve-btn');
      if (approveBtn) approveBtn.disabled = true;
      if (resultEl) resultEl.textContent = 'A publicar…';
      const res = await fetch('/api/admin/cultivo-submissions/' + encodeURIComponent(currentId) + '/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: titleEl ? titleEl.value.trim() : '',
          excerpt: excerptEl ? excerptEl.value.trim() : '',
          content: contentEl ? contentEl.value : '',
          published: publishedEl ? publishedEl.checked : true
        })
      });
      const data = await res.json().catch(() => ({}));
      if (approveBtn) approveBtn.disabled = false;
      if (!res.ok) {
        if (resultEl) resultEl.textContent = data.error || 'Erro ao aprovar.';
        return;
      }
      if (resultEl) {
        resultEl.textContent = 'Publicado: ' + (data.post && data.post.url ? data.post.url : 'ok');
      }
      setTimeout(async () => {
        showList();
        await loadSubmissions();
      }, 1200);
    });
  }

  await loadSubmissions();
});
