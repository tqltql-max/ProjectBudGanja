let entriesCache = [];
let alertsCache = [];
let configCache = null;

const U = window.SorteioUtils || {};

function formatDateTime(iso) {
  return U.formatAdminTableDate ? U.formatAdminTableDate(iso) : (iso || '—');
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatCpfDisplay(entry) {
  if (entry.cpfFormatado) return entry.cpfFormatado;
  const digits = String(entry.cpf || '').replace(/\D/g, '');
  if (digits.length !== 11) return entry.cpf || '—';
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function statusFromConfig(config) {
  if (!config) return 'em-breve';
  if (config.ativo) return 'aberto';
  if (config.emBreve) return 'em-breve';
  return 'encerrado';
}

function configFromStatus(status) {
  if (status === 'aberto') return { ativo: true, emBreve: false };
  if (status === 'encerrado') return { ativo: false, emBreve: false };
  return { ativo: false, emBreve: true };
}

function statusLabel(status) {
  if (status === 'aberto') return 'Inscrições abertas';
  if (status === 'encerrado') return 'Encerrado';
  return 'Em breve';
}

function slugify(label, index) {
  return U.slugifyPremio ? U.slugifyPremio(label, index) : ('premio-' + (index + 1));
}

function renderStats(config) {
  const grid = document.getElementById('sorteio-admin-stats');
  if (!grid) return;
  const status = statusFromConfig(config);
  const premios = (config && config.premios) || [];
  grid.innerHTML =
    '<article class="admin-stat-card admin-stat-card--live">' +
    '<p class="admin-stat-value admin-stat-value--sm">' + escapeHtml(statusLabel(status)) + '</p>' +
    '<p class="admin-stat-label">Estado actual</p></article>' +
    '<article class="admin-stat-card">' +
    '<p class="admin-stat-value">' + entriesCache.length + '</p>' +
    '<p class="admin-stat-label">Inscrições no sorteio</p></article>' +
    '<article class="admin-stat-card">' +
    '<p class="admin-stat-value">' + alertsCache.length + '</p>' +
    '<p class="admin-stat-label">Avisos por e-mail</p></article>' +
    '<article class="admin-stat-card">' +
    '<p class="admin-stat-value">' + premios.length + '</p>' +
    '<p class="admin-stat-label">Prémios configurados</p></article>';
}

function updateStatusPill(config) {
  const pill = document.getElementById('sorteio-status-pill');
  if (!pill) return;
  const status = statusFromConfig(config);
  pill.textContent = statusLabel(status);
  pill.className = 'admin-editor-badge sorteio-status-pill sorteio-status-pill--' + status;
}

function renderPremioRow(premio, index) {
  const row = document.createElement('div');
  row.className = 'sorteio-premio-row';
  row.dataset.index = String(index);
  row.innerHTML =
    '<label class="sorteio-premio-label-field">Nome do prémio ' + (index + 1) +
    '<input type="text" class="sorteio-premio-input select-dark" value="' + escapeHtml(premio.label || '') + '" maxlength="200" required placeholder="Ex: Clonadora caseira com pote de sorvete">' +
    '</label>' +
    '<input type="hidden" class="sorteio-premio-id" value="' + escapeHtml(premio.id || '') + '">' +
    '<button type="button" class="admin-danger sorteio-premio-remove" title="Remover prémio" aria-label="Remover prémio">×</button>';
  return row;
}

function getPremiosFromForm() {
  const rows = document.querySelectorAll('.sorteio-premio-row');
  const premios = [];
  rows.forEach((row, index) => {
    const label = row.querySelector('.sorteio-premio-input').value.trim();
    if (!label) return;
    let id = row.querySelector('.sorteio-premio-id').value.trim();
    if (!id) id = slugify(label, index);
    premios.push({ id, label });
  });
  return premios;
}

function renderPremiosList(premios) {
  const list = document.getElementById('sorteio-premios-list');
  if (!list) return;
  list.innerHTML = '';
  const items = premios && premios.length ? premios : [{ id: '', label: '' }];
  items.forEach((p, i) => list.appendChild(renderPremioRow(p, i)));
  updatePreview();
}

function updatePreview() {
  const titulo = document.getElementById('sorteio-titulo');
  const desc = document.getElementById('sorteio-descricao');
  const data = document.getElementById('sorteio-data');
  const statusInput = document.querySelector('input[name="sorteio-status"]:checked');
  const premios = getPremiosFromForm();

  const badge = document.getElementById('preview-badge');
  const titleEl = document.getElementById('preview-title');
  const descEl = document.getElementById('preview-desc');
  const prizeEl = document.getElementById('preview-prize');
  const dateEl = document.getElementById('preview-date');
  const comboNote = document.getElementById('preview-combobox-note');
  const comboCount = document.getElementById('preview-premio-count');

  const status = statusInput ? statusInput.value : 'em-breve';
  if (badge) badge.textContent = statusLabel(status);
  if (titleEl) titleEl.textContent = (titulo && titulo.value.trim()) || 'Título do sorteio';
  if (descEl) descEl.textContent = (desc && desc.value.trim()) || 'Descrição do sorteio…';

  if (prizeEl) {
    if (!premios.length) {
      prizeEl.textContent = '';
      prizeEl.hidden = true;
    } else if (premios.length === 1) {
      prizeEl.innerHTML = '<strong>Prémio:</strong> ' + escapeHtml(premios[0].label);
      prizeEl.hidden = false;
    } else {
      prizeEl.innerHTML = '<strong>Prémios:</strong> ' + premios.map((p) => escapeHtml(p.label)).join(' · ');
      prizeEl.hidden = false;
    }
  }

  if (dateEl && data) {
    const iso = U.fromDatetimeLocalValue ? U.fromDatetimeLocalValue(data.value) : '';
    const formatted = U.formatSorteioDateTime
      ? U.formatSorteioDateTime(iso || '')
      : (data.value || '');
    if (formatted) {
      dateEl.textContent = (status === 'aberto' ? 'Sorteio previsto para ' : 'Previsão: ') + formatted + '.';
      dateEl.hidden = false;
    } else {
      dateEl.textContent = '';
      dateEl.hidden = true;
    }
  }

  if (comboNote && comboCount) {
    const show = premios.length > 1 && status === 'aberto';
    comboNote.hidden = !show;
    comboCount.textContent = String(premios.length);
  }
}

function renderTable(entries) {
  const tbody = document.getElementById('sorteios-table-body');
  const countEl = document.getElementById('sorteios-count');
  if (!tbody) return;

  if (countEl) {
    countEl.textContent = entries.length === 1
      ? '1 inscrição'
      : entries.length + ' inscrições';
  }

  if (!entries.length) {
    tbody.innerHTML = '<tr><td colspan="8">Nenhuma inscrição ainda.</td></tr>';
    return;
  }

  tbody.innerHTML = entries.map((entry) => {
    const location = [entry.cidade, entry.estado].filter(Boolean).join(' / ') || '—';
    return (
      '<tr>' +
      '<td class="sorteio-table-date">' + escapeHtml(formatDateTime(entry.createdAt)) + '</td>' +
      '<td>' + escapeHtml(entry.nome) + '</td>' +
      '<td>' + escapeHtml(formatCpfDisplay(entry)) + '</td>' +
      '<td>' + escapeHtml(entry.email) + '</td>' +
      '<td>' + escapeHtml(entry.telefone) + '</td>' +
      '<td>' + escapeHtml(entry.premio || '—') + '</td>' +
      '<td>' + escapeHtml(location) + '</td>' +
      '<td><button type="button" class="admin-danger sorteios-delete-btn" data-id="' + escapeHtml(entry.id) + '">Remover</button></td>' +
      '</tr>'
    );
  }).join('');
}

function exportCsv(entries) {
  const headers = ['Data', 'Nome', 'CPF', 'E-mail', 'Telefone', 'Prémio', 'Cidade', 'Estado', 'Instagram'];
  const rows = entries.map((entry) => [
    formatDateTime(entry.createdAt),
    entry.nome,
    formatCpfDisplay(entry),
    entry.email,
    entry.telefone,
    entry.premio || '',
    entry.cidade || '',
    entry.estado || '',
    entry.instagram ? '@' + entry.instagram : ''
  ]);
  const csv = [headers].concat(rows)
    .map((row) => row.map((cell) => '"' + String(cell).replace(/"/g, '""') + '"').join(','))
    .join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sorteios-inscricoes.csv';
  link.click();
  URL.revokeObjectURL(url);
}

async function loadEntries() {
  const res = await fetch('/api/sorteios', { credentials: 'include' });
  if (!res.ok) throw new Error('failed');
  entriesCache = await res.json();
  renderTable(entriesCache);
  renderStats(configCache);
}

function renderAlertsTable(entries) {
  const tbody = document.getElementById('sorteio-alerts-table-body');
  const countEl = document.getElementById('sorteio-alerts-count');
  if (!tbody) return;

  if (countEl) {
    countEl.textContent = entries.length === 1
      ? '1 pessoa inscrita em avisos'
      : entries.length + ' pessoas inscritas em avisos';
  }

  if (!entries.length) {
    tbody.innerHTML = '<tr><td colspan="3">Ninguém inscrito em avisos ainda.</td></tr>';
    return;
  }

  tbody.innerHTML = entries.map((entry) => (
    '<tr>' +
    '<td class="sorteio-table-date">' + escapeHtml(formatDateTime(entry.subscribedAt)) + '</td>' +
    '<td>' + escapeHtml(entry.name || '—') + '</td>' +
    '<td>' + escapeHtml(entry.email) + '</td>' +
    '</tr>'
  )).join('');
}

function exportAlertsCsv(entries) {
  const headers = ['Data', 'Nome', 'E-mail'];
  const rows = entries.map((entry) => [
    formatDateTime(entry.subscribedAt),
    entry.name || '',
    entry.email
  ]);
  const csv = [headers].concat(rows)
    .map((row) => row.map((cell) => '"' + String(cell).replace(/"/g, '""') + '"').join(','))
    .join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sorteios-avisos.csv';
  link.click();
  URL.revokeObjectURL(url);
}

async function loadAlertSubscribers() {
  const res = await fetch('/api/sorteio-alerts', { credentials: 'include' });
  if (!res.ok) throw new Error('alerts failed');
  alertsCache = await res.json();
  renderAlertsTable(alertsCache);
  renderStats(configCache);
}

function fillConfigForm(config) {
  configCache = config;
  const status = statusFromConfig(config);
  const statusRadio = document.querySelector('input[name="sorteio-status"][value="' + status + '"]');
  if (statusRadio) statusRadio.checked = true;

  document.getElementById('sorteio-titulo').value = config.titulo || '';
  document.getElementById('sorteio-descricao').value = config.descricao || '';
  document.getElementById('sorteio-google-form').value = config.googleFormUrl || '';
  document.getElementById('sorteio-manual-url').value = config.manualUrl || '';

  const dataInput = document.getElementById('sorteio-data');
  if (dataInput && U.toDatetimeLocalValue) {
    dataInput.value = U.toDatetimeLocalValue(config.dataSorteio || '');
  }

  renderPremiosList(config.premios || []);
  toggleInternalAdmin(config);
  updateStatusPill(config);
  updatePreview();
}

function toggleInternalAdmin(config) {
  const usesGoogle = !!(config && config.googleFormUrl);
  const internalAdmin = document.getElementById('sorteios-internal-admin');
  const googleNote = document.getElementById('sorteios-google-admin-note');
  if (internalAdmin) internalAdmin.hidden = usesGoogle;
  if (googleNote) googleNote.hidden = !usesGoogle;
}

async function loadConfig() {
  const res = await fetch('/api/sorteio', { credentials: 'include' });
  if (!res.ok) throw new Error('config failed');
  const config = await res.json();
  fillConfigForm(config);
  return config;
}

async function sendBroadcastAlerts() {
  const msgEl = document.getElementById('sorteio-broadcast-msg');
  const btn = document.getElementById('sorteio-broadcast-btn');
  if (msgEl) {
    msgEl.textContent = '';
    msgEl.className = 'sorteios-message';
  }

  const count = alertsCache.length;
  if (!count) {
    if (msgEl) {
      msgEl.textContent = 'Ninguém inscrito na lista de avisos ainda.';
      msgEl.classList.add('is-error');
    }
    return { ok: false };
  }

  if (!configCache || configCache.ativo !== true) {
    if (msgEl) {
      msgEl.textContent = 'Abra as inscrições do sorteio antes de enviar avisos.';
      msgEl.classList.add('is-error');
    }
    return { ok: false };
  }

  if (!window.confirm('Enviar e-mail de aviso para ' + count + ' pessoa(s) inscrita(s)?')) {
    return { ok: false, cancelled: true };
  }

  if (btn) {
    btn.disabled = true;
    btn.textContent = 'A enviar…';
  }

  try {
    const res = await fetch('/api/sorteio-alerts/broadcast', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: '{}'
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Falha no envio');

    if (msgEl) {
      msgEl.textContent = data.message || ('Enviados ' + data.sent + ' avisos.');
      msgEl.classList.add(data.failed ? 'is-error' : 'is-success');
    }
    return { ok: true, data };
  } catch (err) {
    if (msgEl) {
      msgEl.textContent = err.message || 'Não foi possível enviar os avisos.';
      msgEl.classList.add('is-error');
    }
    return { ok: false, error: err.message };
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Enviar aviso aos inscritos';
    }
  }
}

function maybeOfferBroadcastAfterPublish(status) {
  if (status !== 'aberto' || !alertsCache.length) return;
  setTimeout(() => {
    if (!window.confirm(
      'Sorteio publicado com inscrições abertas.\n\n' +
      'Deseja enviar e-mail de aviso para ' + alertsCache.length + ' pessoa(s) inscrita(s) na lista?'
    )) return;
    activateTab('avisos');
    sendBroadcastAlerts();
  }, 300);
}

function activateTab(tabId) {
  document.querySelectorAll('.admin-tab').forEach((btn) => {
    const active = btn.dataset.tab === tabId;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  document.querySelectorAll('.admin-tab-panel').forEach((panel) => {
    const show = panel.id === 'tab-' + tabId;
    panel.hidden = !show;
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const logoutBtn = document.getElementById('logout-btn');
  const exportBtn = document.getElementById('sorteios-export-btn');
  const alertsExportBtn = document.getElementById('sorteio-alerts-export-btn');
  const tbody = document.getElementById('sorteios-table-body');
  const configForm = document.getElementById('sorteio-config-form');
  const configMsg = document.getElementById('sorteio-config-msg');
  const broadcastBtn = document.getElementById('sorteio-broadcast-btn');
  const addPremioBtn = document.getElementById('sorteio-add-premio');
  const premiosList = document.getElementById('sorteio-premios-list');

  try {
    const me = await fetch('/api/me', { credentials: 'include' });
    if (!me.ok) {
      window.location.href = '/login.html?returnTo=/sorteios-admin.html';
      return;
    }
  } catch (e) {
    window.location.href = '/login.html?returnTo=/sorteios-admin.html';
    return;
  }

  document.querySelectorAll('.admin-tab').forEach((btn) => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' });
      window.location.href = '/login.html';
    });
  }

  if (exportBtn) exportBtn.addEventListener('click', () => exportCsv(entriesCache));
  if (alertsExportBtn) alertsExportBtn.addEventListener('click', () => exportAlertsCsv(alertsCache));

  if (broadcastBtn) {
    broadcastBtn.addEventListener('click', () => sendBroadcastAlerts());
  }

  if (addPremioBtn) {
    addPremioBtn.addEventListener('click', () => {
      const list = document.getElementById('sorteio-premios-list');
      const index = list ? list.children.length : 0;
      if (list) list.appendChild(renderPremioRow({ id: '', label: '' }, index));
      updatePreview();
    });
  }

  if (premiosList) {
    premiosList.addEventListener('click', (e) => {
      const btn = e.target.closest('.sorteio-premio-remove');
      if (!btn) return;
      const row = btn.closest('.sorteio-premio-row');
      const list = document.getElementById('sorteio-premios-list');
      if (list && list.children.length <= 1) {
        row.querySelector('.sorteio-premio-input').value = '';
        updatePreview();
        return;
      }
      row.remove();
      updatePreview();
    });
    premiosList.addEventListener('input', () => updatePreview());
  }

  ['sorteio-titulo', 'sorteio-descricao', 'sorteio-data'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updatePreview);
  });
  document.querySelectorAll('input[name="sorteio-status"]').forEach((el) => {
    el.addEventListener('change', updatePreview);
  });

  if (configForm) {
    configForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (configMsg) {
        configMsg.textContent = '';
        configMsg.className = 'sorteios-message';
      }

      const premios = getPremiosFromForm();
      if (!premios.length) {
        if (configMsg) {
          configMsg.textContent = 'Adicione pelo menos um prémio.';
          configMsg.classList.add('is-error');
        }
        return;
      }

      const status = document.querySelector('input[name="sorteio-status"]:checked').value;
      const flags = configFromStatus(status);
      const dataLocal = document.getElementById('sorteio-data').value;
      const dataSorteio = U.fromDatetimeLocalValue
        ? U.fromDatetimeLocalValue(dataLocal)
        : dataLocal.trim();

      const payload = Object.assign({}, flags, {
        titulo: document.getElementById('sorteio-titulo').value.trim(),
        descricao: document.getElementById('sorteio-descricao').value.trim(),
        dataSorteio: dataSorteio,
        googleFormUrl: document.getElementById('sorteio-google-form').value.trim(),
        manualUrl: document.getElementById('sorteio-manual-url').value.trim(),
        premios
      });

      try {
        const res = await fetch('/api/sorteio', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload)
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Erro ao salvar');
        if (data.config) {
          fillConfigForm(data.config);
          toggleInternalAdmin(data.config);
        }
        if (configMsg) {
          configMsg.textContent = 'Sorteio publicado com sucesso.';
          configMsg.classList.add('is-success');
        }
        maybeOfferBroadcastAfterPublish(status);
      } catch (err) {
        if (configMsg) {
          configMsg.textContent = err.message || 'Não foi possível salvar.';
          configMsg.classList.add('is-error');
        }
      }
    });
  }

  if (tbody) {
    tbody.addEventListener('click', async (e) => {
      const btn = e.target.closest('.sorteios-delete-btn');
      if (!btn) return;
      const id = btn.getAttribute('data-id');
      if (!id || !window.confirm('Remover esta inscrição?')) return;
      btn.disabled = true;
      try {
        const res = await fetch('/api/sorteios/' + encodeURIComponent(id), {
          method: 'DELETE',
          credentials: 'include'
        });
        if (!res.ok) throw new Error('delete failed');
        await loadEntries();
      } catch (err) {
        btn.disabled = false;
        alert('Não foi possível remover a inscrição.');
      }
    });
  }

  try {
    await loadAlertSubscribers();
  } catch (e) {
    const alertsBody = document.getElementById('sorteio-alerts-table-body');
    if (alertsBody) alertsBody.innerHTML = '<tr><td colspan="3">Erro ao carregar lista de avisos.</td></tr>';
  }

  try {
    const config = await loadConfig();
    renderStats(config);
    if (!config.googleFormUrl) await loadEntries();
  } catch (e) {
    if (tbody) tbody.innerHTML = '<tr><td colspan="8">Erro ao carregar dados.</td></tr>';
  }
});
