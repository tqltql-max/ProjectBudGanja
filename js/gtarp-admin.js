document.addEventListener('DOMContentLoaded', async () => {
  const logoutBtn = document.getElementById('logout-btn');
  const filterStatus = document.getElementById('gtarp-filter-status');
  const tableBody = document.getElementById('gtarp-table-body');
  const countEl = document.getElementById('gtarp-count');
  const statsEl = document.getElementById('gtarp-stats');
  const listPanel = document.getElementById('gtarp-list-panel');
  const detailPanel = document.getElementById('gtarp-detail-panel');
  const backBtn = document.getElementById('gtarp-back-btn');
  const reviewForm = document.getElementById('gtarp-review-form');
  const nameEl = document.getElementById('gtarp-edit-name');
  const roleEl = document.getElementById('gtarp-edit-role');
  const noteEl = document.getElementById('gtarp-edit-note');
  const rejectBtn = document.getElementById('gtarp-reject-btn');
  const resultEl = document.getElementById('gtarp-result');
  const metaEl = document.getElementById('gtarp-meta');
  const detailMeta = document.getElementById('gtarp-detail-meta');
  const statusBadge = document.getElementById('gtarp-status-badge');

  let currentId = null;
  let cached = [];

  try {
    const me = await fetch('/api/me', { credentials: 'include' });
    if (!me.ok) {
      window.location.href = '/login.html?returnTo=/gtarp-admin.html';
      return;
    }
  } catch (e) {
    window.location.href = '/login.html?returnTo=/gtarp-admin.html';
    return;
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' });
      window.location.href = '/login.html';
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
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

  async function loadList() {
    const status = filterStatus ? filterStatus.value : 'pending';
    const qs = status ? '?status=' + encodeURIComponent(status) : '';
    const res = await fetch('/api/admin/gtarp-streamers' + qs, { credentials: 'include' });
    if (!res.ok) {
      if (tableBody) tableBody.innerHTML = '<tr><td colspan="6">Sem permissão ou sessão expirada.</td></tr>';
      return;
    }
    const data = await res.json();
    cached = data.applications || [];
    renderStats(cached);
    if (countEl) countEl.textContent = cached.length + ' candidatura(s)';
    if (!tableBody) return;
    if (!cached.length) {
      tableBody.innerHTML = '<tr><td colspan="6">Nenhuma candidatura neste filtro.</td></tr>';
      return;
    }
    tableBody.innerHTML = cached
      .map(function (row) {
        return (
          '<tr>' +
          '<td>' + escapeHtml(formatDate(row.submittedAt)) + '</td>' +
          '<td>' + escapeHtml(row.characterName) + '</td>' +
          '<td>' + escapeHtml(row.youtubeHandle || row.youtubeUrl) + '</td>' +
          '<td>' + escapeHtml(row.kickHandle || row.kickUrl || '—') + '</td>' +
          '<td>' + escapeHtml(statusLabel(row.status)) + '</td>' +
          '<td><button type="button" class="botao botao-outline botao-sm" data-open="' +
          escapeHtml(row.id) +
          '">Abrir</button></td>' +
          '</tr>'
        );
      })
      .join('');
  }

  async function openDetail(id) {
    const res = await fetch('/api/admin/gtarp-streamers/' + encodeURIComponent(id), { credentials: 'include' });
    if (!res.ok) {
      if (resultEl) resultEl.textContent = 'Não foi possível abrir a candidatura.';
      return;
    }
    const data = await res.json();
    const row = data.application;
    currentId = row.id;
    if (nameEl) nameEl.value = row.characterName || '';
    if (roleEl) roleEl.value = row.role || '';
    if (noteEl) noteEl.value = row.reviewerNote || '';
    if (statusBadge) statusBadge.textContent = statusLabel(row.status);
    if (metaEl) {
      metaEl.textContent =
        (row.contactName || '') +
        ' · ' +
        (row.contactEmail || '') +
        ' · ' +
        formatDate(row.submittedAt);
    }
    if (detailMeta) {
      detailMeta.innerHTML =
        '<div><dt>YouTube</dt><dd><a href="' + escapeHtml(row.youtubeUrl) + '" target="_blank" rel="noopener">' + escapeHtml(row.youtubeUrl) + '</a></dd></div>' +
        '<div><dt>Kick</dt><dd>' + (row.kickUrl ? '<a href="' + escapeHtml(row.kickUrl) + '" target="_blank" rel="noopener">' + escapeHtml(row.kickUrl) + '</a>' : '—') + '</dd></div>' +
        '<div><dt>Twitch</dt><dd>' + (row.twitchUrl ? '<a href="' + escapeHtml(row.twitchUrl) + '" target="_blank" rel="noopener">' + escapeHtml(row.twitchUrl) + '</a>' : '—') + '</dd></div>' +
        '<div><dt>Notas</dt><dd>' + escapeHtml(row.notes || '—') + '</dd></div>';
    }
    if (resultEl) resultEl.textContent = '';
    showDetail();
  }

  if (tableBody) {
    tableBody.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-open]');
      if (!btn) return;
      openDetail(btn.getAttribute('data-open'));
    });
  }
  if (backBtn) backBtn.addEventListener('click', showList);
  if (filterStatus) filterStatus.addEventListener('change', loadList);

  if (reviewForm) {
    reviewForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (!currentId) return;
      if (resultEl) resultEl.textContent = 'A aprovar…';
      const res = await fetch('/api/admin/gtarp-streamers/' + encodeURIComponent(currentId) + '/approve', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characterName: nameEl ? nameEl.value : '',
          role: roleEl ? roleEl.value : '',
          reviewerNote: noteEl ? noteEl.value : ''
        })
      });
      const data = await res.json().catch(function () { return {}; });
      if (!res.ok) {
        if (resultEl) resultEl.textContent = data.error || 'Falha ao aprovar.';
        return;
      }
      if (resultEl) resultEl.textContent = 'Publicada em /jogos/gtarp/.';
      await loadList();
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener('click', async function () {
      if (!currentId) return;
      if (resultEl) resultEl.textContent = 'A rejeitar…';
      const res = await fetch('/api/admin/gtarp-streamers/' + encodeURIComponent(currentId) + '/reject', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewerNote: noteEl ? noteEl.value : '' })
      });
      const data = await res.json().catch(function () { return {}; });
      if (!res.ok) {
        if (resultEl) resultEl.textContent = data.error || 'Falha ao rejeitar.';
        return;
      }
      if (resultEl) resultEl.textContent = 'Rejeitada.';
      await loadList();
      showList();
    });
  }

  await loadList();
});
