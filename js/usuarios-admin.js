document.addEventListener('DOMContentLoaded', async () => {
  const logoutBtn = document.getElementById('logout-btn');
  const searchEl = document.getElementById('users-search');
  const tableBody = document.getElementById('users-table-body');
  const countEl = document.getElementById('users-count');
  const statsEl = document.getElementById('users-stats');
  const listPanel = document.getElementById('users-list-panel');
  const detailPanel = document.getElementById('user-detail-panel');
  const backBtn = document.getElementById('user-back-btn');
  const identityEl = document.getElementById('user-identity');
  const detailStatsEl = document.getElementById('user-detail-stats');
  const profileFieldsEl = document.getElementById('user-profile-fields');
  const profileEmptyEl = document.getElementById('user-profile-empty');
  const adminBadge = document.getElementById('user-admin-badge');
  const isAdminEl = document.getElementById('user-is-admin');
  const adminSourceEl = document.getElementById('user-admin-source');
  const saveAdminBtn = document.getElementById('user-save-admin-btn');
  const growsBody = document.getElementById('user-grows-body');
  const submissionsBody = document.getElementById('user-submissions-body');
  const sorteiosBody = document.getElementById('user-sorteios-body');
  const lojaBody = document.getElementById('user-loja-body');
  const resultEl = document.getElementById('user-result');

  let currentId = null;
  let currentUser = null;
  let searchTimer = null;

  try {
    const me = await fetch('/api/me', { credentials: 'include' });
    if (!me.ok) {
      window.location.href = '/login.html?returnTo=/usuarios-admin.html';
      return;
    }
  } catch (e) {
    window.location.href = '/login.html?returnTo=/usuarios-admin.html';
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

  function formatDateShort(iso) {
    if (!iso) return '—';
    try {
      return new Date(iso).toLocaleDateString('pt-BR');
    } catch (e) {
      return iso;
    }
  }

  function adminLabel(user) {
    if (!user.isAdmin) return '—';
    if (user.adminSource === 'env') return 'Env';
    if (user.adminSource === 'db+env' || user.adminSource === 'db') return 'Sim';
    return 'Sim';
  }

  function submissionLabel(status) {
    if (status === 'approved') return 'Aprovada';
    if (status === 'rejected') return 'Rejeitada';
    return 'Pendente';
  }

  function renderStats(list) {
    if (!statsEl) return;
    const total = list.length;
    const admins = list.filter((u) => u.isAdmin).length;
    const complete = list.filter((u) => u.profileComplete).length;
    const active = list.filter((u) => (u.growCount || 0) > 0).length;
    statsEl.innerHTML =
      '<div class="admin-stat-card"><span class="admin-stat-value">' + total + '</span><span class="admin-stat-label">Contas</span></div>' +
      '<div class="admin-stat-card"><span class="admin-stat-value">' + complete + '</span><span class="admin-stat-label">Perfil completo</span></div>' +
      '<div class="admin-stat-card"><span class="admin-stat-value">' + active + '</span><span class="admin-stat-label">Com pesquisas</span></div>' +
      '<div class="admin-stat-card"><span class="admin-stat-value">' + admins + '</span><span class="admin-stat-label">Administradores</span></div>';
  }

  function showList() {
    currentId = null;
    currentUser = null;
    if (listPanel) listPanel.hidden = false;
    if (detailPanel) detailPanel.hidden = true;
  }

  function showDetail() {
    if (listPanel) listPanel.hidden = true;
    if (detailPanel) detailPanel.hidden = false;
  }

  async function loadUsers() {
    const q = searchEl ? searchEl.value.trim() : '';
    const qs = q ? '?q=' + encodeURIComponent(q) : '';
    if (tableBody) tableBody.innerHTML = '<tr><td colspan="8">A carregar…</td></tr>';
    try {
      const res = await fetch('/api/admin/users' + qs, { credentials: 'include' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (tableBody) tableBody.innerHTML = '<tr><td colspan="8">' + escapeHtml(data.error || 'Erro ao carregar.') + '</td></tr>';
        return;
      }
      const list = data.users || [];
      renderStats(list);
      if (countEl) countEl.textContent = list.length + ' utilizador(es)';
      if (!list.length) {
        if (tableBody) tableBody.innerHTML = '<tr><td colspan="8">Nenhum utilizador encontrado.</td></tr>';
        return;
      }
      if (tableBody) {
        tableBody.innerHTML = list.map((row) => {
          const avatar = row.picture
            ? '<img src="' + escapeHtml(row.picture) + '" alt="" class="usuarios-admin-avatar" width="36" height="36" loading="lazy">'
            : '<span class="usuarios-admin-avatar usuarios-admin-avatar--empty" aria-hidden="true">?</span>';
          const profile = row.profileComplete ? 'Completo' : 'Incompleto';
          const status = row.accountStatus || 'pending_profile';
          return '<tr>' +
            '<td><div class="usuarios-admin-usercell">' + avatar + '<span>' + escapeHtml(row.displayName || row.name || '—') + '</span></div></td>' +
            '<td>' + escapeHtml(row.email || '—') + '</td>' +
            '<td>' + escapeHtml(profile) + (row.age ? ' · ' + row.age + 'a' : '') + ' · ' + escapeHtml(status) + '</td>' +
            '<td>' + escapeHtml(adminLabel(row)) + '</td>' +
            '<td>' + escapeHtml(String(row.growCount || 0)) + '</td>' +
            '<td>' + escapeHtml(String(row.entryCount || 0)) + '</td>' +
            '<td>' + escapeHtml(formatDateShort(row.createdAt)) + '</td>' +
            '<td><button type="button" class="botao botao-outline botao-sm" data-user-id="' + escapeHtml(row.id) + '">Ver</button></td>' +
            '</tr>';
        }).join('');
        tableBody.querySelectorAll('[data-user-id]').forEach((btn) => {
          btn.addEventListener('click', () => openUser(btn.getAttribute('data-user-id')));
        });
      }
    } catch (e) {
      if (tableBody) tableBody.innerHTML = '<tr><td colspan="8">Erro de rede.</td></tr>';
    }
  }

  function renderDetailStats(user) {
    if (!detailStatsEl || !user.stats) return;
    const s = user.stats;
    detailStatsEl.innerHTML =
      '<div class="admin-stat-card"><span class="admin-stat-value">' + s.grows + '</span><span class="admin-stat-label">Pesquisas</span></div>' +
      '<div class="admin-stat-card"><span class="admin-stat-value">' + s.entries + '</span><span class="admin-stat-label">Registos</span></div>' +
      '<div class="admin-stat-card"><span class="admin-stat-value">' + s.submissions + '</span><span class="admin-stat-label">Submissões</span></div>' +
      '<div class="admin-stat-card"><span class="admin-stat-value">' + s.lojaOrders + '</span><span class="admin-stat-label">Encomendas</span></div>';
  }

  function renderProfileFields(user) {
    if (!profileFieldsEl) return;
    const fields = user.profileFields || {};
    const keys = Object.keys(fields);
    if (!keys.length) {
      profileFieldsEl.innerHTML = '';
      if (profileEmptyEl) profileEmptyEl.hidden = false;
      return;
    }
    if (profileEmptyEl) profileEmptyEl.hidden = true;
    profileFieldsEl.innerHTML = keys.map((key) => {
      const item = fields[key];
      return '<div><dt>' + escapeHtml(item.label) + '</dt><dd>' + escapeHtml(String(item.value)) + '</dd></div>';
    }).join('');
  }

  function renderTableRows(tbody, rows, cols, builder) {
    if (!tbody) return;
    if (!rows || !rows.length) {
      tbody.innerHTML = '<tr><td colspan="' + cols + '">Nenhum registo.</td></tr>';
      return;
    }
    tbody.innerHTML = rows.map(builder).join('');
  }

  async function openUser(id) {
    if (!id) return;
    currentId = id;
    if (resultEl) resultEl.textContent = '';
    showDetail();
    if (identityEl) identityEl.innerHTML = '<p class="field-hint">A carregar…</p>';
    try {
      const res = await fetch('/api/admin/users/' + encodeURIComponent(id), { credentials: 'include' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (identityEl) identityEl.innerHTML = '<p class="field-hint">' + escapeHtml(data.error || 'Erro.') + '</p>';
        return;
      }
      currentUser = data.user;
      const user = currentUser;
      if (adminBadge) adminBadge.textContent = user.isAdmin ? 'Administrador' : 'Utilizador';
      if (identityEl) {
        const avatar = user.picture
          ? '<img src="' + escapeHtml(user.picture) + '" alt="" class="usuarios-admin-avatar usuarios-admin-avatar--lg" width="72" height="72">'
          : '';
        identityEl.innerHTML =
          '<div class="usuarios-admin-identity-inner">' + avatar +
          '<div><h2 class="usuarios-admin-name">' + escapeHtml(user.name || user.email) + '</h2>' +
          '<p class="field-hint"><a href="mailto:' + escapeHtml(user.email) + '">' + escapeHtml(user.email) + '</a></p>' +
          '<p class="field-hint">@' + escapeHtml(user.username || 'sem-username') +
          ' · e-mail verificado: ' + (user.emailVerified ? 'sim' : 'não') +
          ' · status: ' + escapeHtml(user.accountStatus || 'pending_profile') +
          ' · onboarding: ' + escapeHtml(user.onboardingStage || 'initial') + '</p>' +
          '<p class="field-hint">ID: <code>' + escapeHtml(user.id) + '</code> · ' +
          (user.profileComplete ? 'Perfil completo' : 'Perfil incompleto') +
          (user.cultivoPhase ? ' · Fase diário: ' + escapeHtml(user.cultivoPhase) : '') +
          '</p>' +
          '<p class="field-hint">Cadastro: ' + escapeHtml(formatDate(user.createdAt)) +
          ' · Actualização: ' + escapeHtml(formatDate(user.updatedAt)) + '</p>' +
          '<p class="field-hint">IP cadastro: ' + escapeHtml(user.registrationIp || '—') +
          ' · Último login: ' + escapeHtml(formatDate(user.lastLoginAt)) +
          ' · IP login: ' + escapeHtml(user.lastLoginIp || '—') + '</p>' +
          (user.sorteioAlert ? '<p class="field-hint">Alertas sorteio: inscrito em ' + escapeHtml(formatDate(user.sorteioAlert.subscribedAt)) + '</p>' : '') +
          '</div></div>';
      }
      renderDetailStats(user);
      renderProfileFields(user);
      if (isAdminEl) isAdminEl.checked = !!user.adminGranted;
      if (adminSourceEl) {
        let src = 'Sem permissão de admin na base de dados.';
        if (user.adminSource === 'db') src = 'Admin concedido neste painel.';
        else if (user.adminSource === 'env') src = 'Admin via ADMIN_EMAILS no servidor (não removível aqui).';
        else if (user.adminSource === 'db+env') src = 'Admin na BD e em ADMIN_EMAILS.';
        adminSourceEl.textContent = src;
      }
      renderTableRows(growsBody, user.grows, 5, (g) =>
        '<tr><td>' + escapeHtml(g.name) + '</td><td>' + escapeHtml(g.species || '—') + '</td><td>' +
        escapeHtml(g.phase || '—') + '</td><td>' + g.entryCount + '</td><td>' + escapeHtml(formatDateShort(g.plantedAt)) + '</td></tr>'
      );
      renderTableRows(submissionsBody, user.submissions, 4, (s) =>
        '<tr><td>' + escapeHtml(formatDateShort(s.submittedAt)) + '</td><td>' + escapeHtml(s.title) + '</td><td>' +
        escapeHtml(submissionLabel(s.status)) + '</td><td>' +
        (s.postUrl ? '<a href="' + escapeHtml(s.postUrl) + '" target="_blank" rel="noopener">Ver</a>' : '—') + '</td></tr>'
      );
      renderTableRows(sorteiosBody, user.sorteioEntries, 3, (s) =>
        '<tr><td>' + escapeHtml(formatDateShort(s.createdAt)) + '</td><td>' + escapeHtml(s.premioLabel || '—') + '</td><td>' +
        escapeHtml((s.cidade || '—') + '/' + (s.estado || '—')) + '</td></tr>'
      );
      renderTableRows(lojaBody, user.lojaOrders, 3, (o) =>
        '<tr><td>' + escapeHtml(formatDateShort(o.createdAt)) + '</td><td>' + escapeHtml(o.productTitle || '—') + '</td><td>' +
        escapeHtml(o.status || o.estado || '—') + '</td></tr>'
      );
    } catch (e) {
      if (identityEl) identityEl.innerHTML = '<p class="field-hint">Erro de rede.</p>';
    }
  }

  if (backBtn) backBtn.addEventListener('click', showList);

  if (saveAdminBtn) {
    saveAdminBtn.addEventListener('click', async () => {
      if (!currentId) return;
      saveAdminBtn.disabled = true;
      if (resultEl) resultEl.textContent = 'A guardar…';
      try {
        const res = await fetch('/api/admin/users/' + encodeURIComponent(currentId) + '/admin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ isAdmin: !!(isAdminEl && isAdminEl.checked) })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (resultEl) resultEl.textContent = data.error || 'Não foi possível guardar.';
          if (isAdminEl && currentUser) isAdminEl.checked = !!currentUser.adminGranted;
          saveAdminBtn.disabled = false;
          return;
        }
        if (resultEl) resultEl.textContent = 'Permissão actualizada.';
        await openUser(currentId);
        await loadUsers();
      } catch (e) {
        if (resultEl) resultEl.textContent = 'Erro de rede.';
      }
      saveAdminBtn.disabled = false;
    });
  }

  if (searchEl) {
    searchEl.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(loadUsers, 280);
    });
  }

  showList();
  await loadUsers();
});
