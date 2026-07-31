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
  const badgesEl = document.getElementById('user-badges');
  const detailStatsEl = document.getElementById('user-detail-stats');
  const profileFieldsEl = document.getElementById('user-profile-fields');
  const profileEmptyEl = document.getElementById('user-profile-empty');
  const isAdminEl = document.getElementById('user-is-admin');
  const adminSourceEl = document.getElementById('user-admin-source');
  const saveAdminBtn = document.getElementById('user-save-admin-btn');
  const deleteBtn = document.getElementById('user-delete-btn');
  const growsBody = document.getElementById('user-grows-body');
  const submissionsBody = document.getElementById('user-submissions-body');
  const sorteiosBody = document.getElementById('user-sorteios-body');
  const lojaBody = document.getElementById('user-loja-body');
  const resultEl = document.getElementById('user-result');

  let currentId = null;
  let currentUser = null;
  let searchTimer = null;
  let deleting = false;

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

  function providerLabel(provider) {
    if (provider === 'hybrid') return 'Google + local';
    if (provider === 'local') return 'Local';
    return 'Google';
  }

  function statusLabel(status) {
    if (status === 'active' || status === 'complete') return 'Activa';
    if (status === 'pending_profile' || status === 'profile_pending') return 'Cadastro pendente';
    return status || 'Pendente';
  }

  function chip(text, tone) {
    return '<span class="usuarios-admin-chip usuarios-admin-chip--' + tone + '">' + escapeHtml(text) + '</span>';
  }

  function avatarHtml(picture, sizeClass) {
    if (picture) {
      return '<img src="' + escapeHtml(picture) + '" alt="" class="usuarios-admin-avatar' +
        (sizeClass ? ' ' + sizeClass : '') + '" width="36" height="36" loading="lazy" referrerpolicy="no-referrer">';
    }
    return '<span class="usuarios-admin-avatar usuarios-admin-avatar--empty' +
      (sizeClass ? ' ' + sizeClass : '') + '" aria-hidden="true">?</span>';
  }

  function setResult(message, isError) {
    if (!resultEl) return;
    resultEl.textContent = message || '';
    resultEl.classList.toggle('is-error', !!isError);
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
    setResult('');
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
    if (tableBody) tableBody.innerHTML = '<tr><td colspan="7">A carregar…</td></tr>';
    try {
      const res = await fetch('/api/admin/users' + qs, { credentials: 'include' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (tableBody) tableBody.innerHTML = '<tr><td colspan="7">' + escapeHtml(data.error || 'Erro ao carregar.') + '</td></tr>';
        return;
      }
      const list = data.users || [];
      renderStats(list);
      if (countEl) countEl.textContent = list.length + ' utilizador(es)';
      if (!list.length) {
        if (tableBody) tableBody.innerHTML = '<tr><td colspan="7">Nenhum utilizador encontrado.</td></tr>';
        return;
      }
      if (tableBody) {
        tableBody.innerHTML = list.map((row) => {
          const name = row.displayName || row.name || '—';
          const profileChip = row.profileComplete
            ? chip('Completo', 'ok')
            : chip('Incompleto', 'warn');
          const accessChip = row.isAdmin
            ? chip(row.adminSource === 'env' ? 'Admin (env)' : 'Admin', 'admin')
            : chip(providerLabel(row.provider), 'muted');
          const activity = (row.growCount || 0) + ' pesquisas · ' + (row.entryCount || 0) + ' registos';
          return '<tr>' +
            '<td><div class="usuarios-admin-usercell">' + avatarHtml(row.picture) +
            '<div><strong>' + escapeHtml(name) + '</strong>' +
            (row.username ? '<span class="usuarios-admin-meta">@' + escapeHtml(row.username) + '</span>' : '') +
            '</div></div></td>' +
            '<td>' + escapeHtml(row.email || '—') + '</td>' +
            '<td><div class="usuarios-admin-chip-row">' + profileChip + '</div></td>' +
            '<td><div class="usuarios-admin-chip-row">' + accessChip + '</div></td>' +
            '<td>' + escapeHtml(activity) + '</td>' +
            '<td>' + escapeHtml(formatDateShort(row.createdAt)) + '</td>' +
            '<td class="usuarios-admin-actions-cell">' +
            '<button type="button" class="botao botao-outline botao-sm" data-user-id="' + escapeHtml(row.id) + '">Abrir</button>' +
            '</td></tr>';
        }).join('');
        tableBody.querySelectorAll('[data-user-id]').forEach((btn) => {
          btn.addEventListener('click', () => openUser(btn.getAttribute('data-user-id')));
        });
      }
    } catch (e) {
      if (tableBody) tableBody.innerHTML = '<tr><td colspan="7">Erro de rede.</td></tr>';
    }
  }

  function renderBadges(user) {
    if (!badgesEl) return;
    const bits = [];
    bits.push(user.isAdmin ? chip('Administrador', 'admin') : chip('Utilizador', 'muted'));
    bits.push(user.profileComplete ? chip('Perfil completo', 'ok') : chip('Perfil incompleto', 'warn'));
    bits.push(chip(providerLabel(user.provider), 'muted'));
    badgesEl.innerHTML = bits.join('');
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
    setResult('');
    showDetail();
    if (identityEl) identityEl.innerHTML = '<p class="field-hint">A carregar…</p>';
    if (badgesEl) badgesEl.innerHTML = '';
    try {
      const res = await fetch('/api/admin/users/' + encodeURIComponent(id), { credentials: 'include' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (identityEl) identityEl.innerHTML = '<p class="field-hint">' + escapeHtml(data.error || 'Erro.') + '</p>';
        return;
      }
      currentUser = data.user;
      const user = currentUser;
      renderBadges(user);
      if (identityEl) {
        identityEl.innerHTML =
          '<div class="usuarios-admin-identity-inner">' + avatarHtml(user.picture, 'usuarios-admin-avatar--lg') +
          '<div class="usuarios-admin-identity-copy">' +
          '<h2 class="usuarios-admin-name">' + escapeHtml(user.name || user.email) + '</h2>' +
          '<p class="usuarios-admin-email"><a href="mailto:' + escapeHtml(user.email) + '">' + escapeHtml(user.email) + '</a></p>' +
          '<dl class="usuarios-admin-meta-grid">' +
          '<div><dt>Username</dt><dd>@' + escapeHtml(user.username || 'sem-username') + '</dd></div>' +
          '<div><dt>Estado</dt><dd>' + escapeHtml(statusLabel(user.accountStatus)) + '</dd></div>' +
          '<div><dt>Cadastro</dt><dd>' + escapeHtml(formatDate(user.createdAt)) + '</dd></div>' +
          '<div><dt>Último login</dt><dd>' + escapeHtml(formatDate(user.lastLoginAt)) + '</dd></div>' +
          '<div><dt>ID</dt><dd><code>' + escapeHtml(user.id) + '</code></dd></div>' +
          '<div><dt>IP login</dt><dd>' + escapeHtml(user.lastLoginIp || '—') + '</dd></div>' +
          '</dl>' +
          (user.sorteioAlert
            ? '<p class="field-hint">Alertas de sorteio activos desde ' + escapeHtml(formatDate(user.sorteioAlert.subscribedAt)) + '.</p>'
            : '') +
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
      if (deleteBtn) {
        deleteBtn.disabled = false;
        deleteBtn.textContent = 'Remover conta';
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
      setResult('A guardar…');
      try {
        const res = await fetch('/api/admin/users/' + encodeURIComponent(currentId) + '/admin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ isAdmin: !!(isAdminEl && isAdminEl.checked) })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setResult(data.error || 'Não foi possível guardar.', true);
          if (isAdminEl && currentUser) isAdminEl.checked = !!currentUser.adminGranted;
          saveAdminBtn.disabled = false;
          return;
        }
        setResult('Permissão actualizada.');
        await openUser(currentId);
        await loadUsers();
      } catch (e) {
        setResult('Erro de rede.', true);
      }
      saveAdminBtn.disabled = false;
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener('click', async () => {
      if (!currentId || !currentUser || deleting) return;
      const label = currentUser.email || currentUser.name || currentId;
      const ok = window.confirm(
        'Remover permanentemente a conta «' + label + '»?\n\n' +
        'Será apagado: diário, sessões e conteúdo da comunidade.\n' +
        'Mantém-se: sorteios e encomendas da loja.\n\n' +
        'Esta acção não pode ser desfeita.'
      );
      if (!ok) return;
      deleting = true;
      deleteBtn.disabled = true;
      deleteBtn.textContent = 'A remover…';
      setResult('A remover conta…');
      try {
        const res = await fetch('/api/admin/users/' + encodeURIComponent(currentId), {
          method: 'DELETE',
          credentials: 'include'
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setResult(data.error || 'Não foi possível remover a conta.', true);
          deleteBtn.disabled = false;
          deleteBtn.textContent = 'Remover conta';
          deleting = false;
          return;
        }
        setResult('Conta removida.');
        showList();
        await loadUsers();
      } catch (e) {
        setResult('Erro de rede.', true);
        deleteBtn.disabled = false;
        deleteBtn.textContent = 'Remover conta';
      }
      deleting = false;
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
