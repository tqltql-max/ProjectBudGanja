document.addEventListener('DOMContentLoaded', async () => {
  const logoutBtn = document.getElementById('logout-btn');
  const processBtn = document.getElementById('email-process-btn');
  const statsEl = document.getElementById('email-stats');
  const bannerEl = document.getElementById('email-smtp-banner');
  const templatesEl = document.getElementById('email-templates');
  const countEl = document.getElementById('email-queue-count');
  const tableBody = document.getElementById('email-queue-body');
  const resultEl = document.getElementById('email-result');

  try {
    const me = await fetch('/api/me', { credentials: 'include' });
    if (!me.ok) {
      window.location.href = '/login.html?returnTo=/emails-admin.html';
      return;
    }
  } catch (e) {
    window.location.href = '/login.html?returnTo=/emails-admin.html';
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
    if (status === 'sent') return 'Enviado';
    if (status === 'failed') return 'Falhou';
    if (status === 'pending') return 'Pendente';
    return status || '—';
  }

  function renderStats(data) {
    if (!statsEl) return;
    const s = data.stats || {};
    statsEl.innerHTML =
      '<div class="admin-stat-card"><span class="admin-stat-value">' + (s.pending || 0) + '</span><span class="admin-stat-label">Pendentes</span></div>' +
      '<div class="admin-stat-card"><span class="admin-stat-value">' + (s.sent || 0) + '</span><span class="admin-stat-label">Enviados</span></div>' +
      '<div class="admin-stat-card"><span class="admin-stat-value">' + (s.failed || 0) + '</span><span class="admin-stat-label">Falhas</span></div>' +
      '<div class="admin-stat-card"><span class="admin-stat-value">' + (data.queueAvailable ? 'Sim' : 'Não') + '</span><span class="admin-stat-label">Fila SQL</span></div>';
  }

  function renderBanner(data) {
    if (!bannerEl) return;
    if (data.smtp && data.smtp.configured) {
      bannerEl.hidden = true;
      bannerEl.textContent = '';
      return;
    }
    bannerEl.hidden = false;
    bannerEl.innerHTML =
      '<strong>SMTP não configurado.</strong> Defina <code>GMAIL_USER</code> e <code>GMAIL_APP_PASSWORD</code> no <code>.env</code> e reinicie o servidor. ' +
      'Sem isto, nenhum e-mail (boas-vindas, encomendas, sorteios) será enviado.';
  }

  async function loadStatus() {
    if (resultEl) resultEl.textContent = '';
    try {
      const res = await fetch('/api/admin/email/status', { credentials: 'include' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (tableBody) tableBody.innerHTML = '<tr><td colspan="5">' + escapeHtml(data.error || 'Erro.') + '</td></tr>';
        return;
      }
      renderBanner(data);
      renderStats(data);
      if (templatesEl && data.templates) {
        templatesEl.textContent = data.templates.join(', ');
      }
      const recent = data.recent || [];
      if (countEl) countEl.textContent = recent.length + ' registo(s) recentes';
      if (!tableBody) return;
      if (!recent.length) {
        tableBody.innerHTML = '<tr><td colspan="5">Nenhum e-mail na fila ainda.</td></tr>';
        return;
      }
      tableBody.innerHTML = recent.map((row) =>
        '<tr>' +
        '<td>' + escapeHtml(formatDate(row.createdAt)) + '</td>' +
        '<td><code>' + escapeHtml(row.template) + '</code></td>' +
        '<td>' + escapeHtml(row.toEmail) + '</td>' +
        '<td>' + escapeHtml(row.subject || '—') + '</td>' +
        '<td>' + escapeHtml(statusLabel(row.status)) + (row.lastError ? ' · ' + escapeHtml(row.lastError) : '') + '</td>' +
        '</tr>'
      ).join('');
    } catch (e) {
      if (tableBody) tableBody.innerHTML = '<tr><td colspan="5">Erro de rede.</td></tr>';
    }
  }

  if (processBtn) {
    processBtn.addEventListener('click', async () => {
      processBtn.disabled = true;
      if (resultEl) resultEl.textContent = 'A processar fila…';
      try {
        const res = await fetch('/api/admin/email/process', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ limit: 25 })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (resultEl) resultEl.textContent = data.error || 'Não foi possível processar.';
          processBtn.disabled = false;
          return;
        }
        if (resultEl) {
          resultEl.textContent = 'Processados ' + (data.processed || 0) + ' · enviados ' + (data.sent || 0) + ' · falhas ' + (data.failed || 0) + ' · pendentes ' + (data.remaining || 0);
        }
        await loadStatus();
      } catch (e) {
        if (resultEl) resultEl.textContent = 'Erro de rede.';
      }
      processBtn.disabled = false;
    });
  }

  await loadStatus();
});
