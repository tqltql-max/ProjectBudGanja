/* jshint esversion:6 */
'use strict';

(function () {
  const PAGE_SIZE = 50;
  let state = {
    tables: [],
    current: null,
    schema: [],
    rows: [],
    total: 0,
    offset: 0,
    search: '',
    editingPk: null   // null = create, value = editing
  };

  // ---------- Auth ----------

  async function checkAuth() {
    try {
      const res = await fetch('/api/me', { credentials: 'include' });
      if (!res.ok) { window.location.href = '/login.html?returnTo=/admin-db.html'; return false; }
      const data = await res.json();
      const el = document.getElementById('admin-user');
      if (el) el.textContent = data.username || 'admin';
      return true;
    } catch (e) {
      window.location.href = '/login.html?returnTo=/admin-db.html';
      return false;
    }
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) logoutBtn.addEventListener('click', async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    window.location.href = '/login.html';
  });

  // ---------- API helpers ----------

  async function api(method, path, body) {
    const opts = { method, credentials: 'include', headers: {} };
    if (body !== undefined) {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    }
    const res = await fetch(path, opts);
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.error || 'Erro ' + res.status);
    return json;
  }

  // ---------- Table list ----------

  async function loadTables() {
    const listEl = document.getElementById('db-table-list');
    try {
      state.tables = await api('GET', '/api/admin/tables');
      renderTableList();
    } catch (e) {
      listEl.innerHTML = '<p class="db-sidebar-error">Erro: ' + esc(e.message) + '</p>';
    }
  }

  function renderTableList() {
    const listEl = document.getElementById('db-table-list');
    if (!state.tables.length) { listEl.innerHTML = '<p class="db-sidebar-error">Sem tabelas.</p>'; return; }
    listEl.innerHTML = state.tables.map((t) =>
      '<button class="db-table-btn' + (state.current === t.name ? ' is-active' : '') + '" data-table="' + esc(t.name) + '">' +
        '<span>' + esc(t.name) + '</span>' +
        '<span class="db-count">' + t.count + '</span>' +
      '</button>'
    ).join('');
    listEl.querySelectorAll('.db-table-btn').forEach((btn) => {
      btn.addEventListener('click', () => selectTable(btn.dataset.table));
    });
  }

  // ---------- Table data ----------

  async function selectTable(name) {
    state.current = name;
    state.offset = 0;
    state.search = '';
    renderTableList();
    renderMain('<div class="db-loading">A carregar…</div>');
    await loadTableData();
  }

  async function loadTableData() {
    try {
      const url = '/api/admin/tables/' + encodeURIComponent(state.current) +
        '?limit=' + PAGE_SIZE + '&offset=' + state.offset;
      const data = await api('GET', url);
      state.schema = data.schema || [];
      state.rows = data.rows || [];
      state.total = data.total || 0;
      renderTable();
      // Update count in sidebar
      const t = state.tables.find((x) => x.name === state.current);
      if (t) { t.count = state.total; renderTableList(); }
    } catch (e) {
      renderMain('<div class="db-empty">Erro: ' + esc(e.message) + '</div>');
    }
  }

  // ---------- Render table ----------

  function renderMain(html) {
    document.getElementById('db-main').innerHTML = html;
  }

  function renderTable() {
    const pkCol = (state.schema.find((c) => c.pk) || state.schema[0] || {}).name || 'id';
    const cols = state.schema;
    const rows = state.rows;

    // Filtro local por search
    const q = state.search.toLowerCase();
    const filtered = q ? rows.filter((r) => JSON.stringify(r).toLowerCase().includes(q)) : rows;

    const thead = '<tr>' +
      cols.map((c) => '<th>' + esc(c.name) + '</th>').join('') +
      '<th>Ações</th>' +
      '</tr>';

    const tbody = !filtered.length
      ? '<tr><td colspan="' + (cols.length + 1) + '" class="db-empty">Sem registos.</td></tr>'
      : filtered.map((row) => {
          const pkVal = row[pkCol];
          const tds = cols.map((c) => {
            const v = row[c.name];
            const disp = v == null ? '<span style="opacity:.4">null</span>' : esc(String(v).slice(0, 80));
            return '<td title="' + esc(String(v == null ? '' : v)) + '">' + disp + '</td>';
          }).join('');
          return '<tr>' + tds +
            '<td><div class="db-actions">' +
              '<button class="db-btn-edit" data-pk="' + esc(String(pkVal)) + '">Editar</button>' +
              '<button class="db-btn-del" data-pk="' + esc(String(pkVal)) + '">Eliminar</button>' +
            '</div></td></tr>';
        }).join('');

    const total = state.total;
    const page = Math.floor(state.offset / PAGE_SIZE) + 1;
    const pages = Math.ceil(total / PAGE_SIZE) || 1;

    const html =
      '<div class="db-toolbar">' +
        '<h2>' + esc(state.current) + '</h2>' +
        '<span class="db-total">' + total + ' registos</span>' +
        '<input class="db-search" type="search" placeholder="Filtrar…" value="' + esc(state.search) + '" id="db-search-input">' +
        '<button class="botao botao-sm" id="db-new-btn">+ Novo</button>' +
      '</div>' +
      '<div class="db-grid-wrap"><table class="db-grid"><thead>' + thead + '</thead><tbody>' + tbody + '</tbody></table></div>' +
      '<div class="db-pagination">' +
        '<button class="db-page-btn" id="db-prev-btn"' + (state.offset === 0 ? ' disabled' : '') + '>← Anterior</button>' +
        '<span>Página ' + page + ' / ' + pages + '</span>' +
        '<button class="db-page-btn" id="db-next-btn"' + (state.offset + PAGE_SIZE >= total ? ' disabled' : '') + '>Seguinte →</button>' +
      '</div>';

    renderMain(html);

    document.getElementById('db-new-btn').addEventListener('click', () => openModal(null));
    document.getElementById('db-search-input').addEventListener('input', (e) => {
      state.search = e.target.value;
      renderTable();
    });
    const prevBtn = document.getElementById('db-prev-btn');
    const nextBtn = document.getElementById('db-next-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => { state.offset = Math.max(0, state.offset - PAGE_SIZE); loadTableData(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { state.offset += PAGE_SIZE; loadTableData(); });

    document.querySelectorAll('.db-btn-edit').forEach((btn) => {
      btn.addEventListener('click', () => openModal(btn.dataset.pk));
    });
    document.querySelectorAll('.db-btn-del').forEach((btn) => {
      btn.addEventListener('click', () => openDeleteModal(btn.dataset.pk));
    });
  }

  // ---------- Modal create/edit ----------

  function fieldType(col) {
    if (col.bool) return 'checkbox';
    if (col.textarea) return 'textarea';
    const n = col.name.toLowerCase();
    if (n.endsWith('_at') || n === 'date' || n.endsWith('_date')) return 'datetime-local';
    if (col.type === 'INTEGER') return 'number';
    return 'text';
  }

  function renderForm(values) {
    const schema = state.schema;
    const pkCol = (schema.find((c) => c.pk) || schema[0] || {}).name;
    const isEdit = state.editingPk !== null;

    return schema.map((col) => {
      const isAutoIntPk = col.pk && col.type === 'INTEGER';
      if (isAutoIntPk && !isEdit) return ''; // Ocultar PK auto em create
      const val = values ? (values[col.name] != null ? values[col.name] : '') : (col.dflt || '');
      const ft = fieldType(col);
      const required = col.notnull && !col.dflt && !col.pk ? ' required' : '';
      const readonly = (col.pk && isEdit) ? ' readonly style="opacity:.5"' : '';

      let input;
      if (ft === 'checkbox') {
        input = '<label><input type="checkbox" id="f_' + esc(col.name) + '" ' + (val ? 'checked' : '') + '> ' + esc(col.name) + '</label>';
        return '<div class="db-field">' + input + '</div>';
      } else if (ft === 'textarea') {
        input = '<textarea id="f_' + esc(col.name) + '"' + required + readonly + '>' + esc(String(val)) + '</textarea>';
      } else if (ft === 'datetime-local') {
        const dtVal = val ? String(val).replace(' ', 'T').slice(0, 16) : '';
        input = '<input type="datetime-local" id="f_' + esc(col.name) + '" value="' + esc(dtVal) + '"' + required + readonly + '>';
      } else if (ft === 'number') {
        input = '<input type="number" id="f_' + esc(col.name) + '" value="' + esc(String(val)) + '"' + required + readonly + '>';
      } else {
        input = '<input type="text" id="f_' + esc(col.name) + '" value="' + esc(String(val)) + '"' + required + readonly + '>';
      }

      const pkHint = col.pk ? '<div class="db-field-hint">Chave primária' + (isAutoIntPk ? ' (auto)' : '') + '</div>' : '';
      return '<div class="db-field"><label for="f_' + esc(col.name) + '">' + esc(col.name) + ' <span style="font-weight:400;text-transform:none;letter-spacing:0">(' + col.type + ')</span></label>' + input + pkHint + '</div>';
    }).join('');
  }

  function getFormValues() {
    const schema = state.schema;
    const payload = {};
    schema.forEach((col) => {
      const el = document.getElementById('f_' + col.name);
      if (!el) return;
      if (col.bool) {
        payload[col.name] = el.checked ? 1 : 0;
      } else if (fieldType(col) === 'datetime-local') {
        payload[col.name] = el.value ? el.value.replace('T', ' ') : '';
      } else {
        payload[col.name] = el.value;
      }
    });
    return payload;
  }

  async function openModal(pkVal) {
    state.editingPk = pkVal;
    const modal = document.getElementById('db-modal');
    const title = document.getElementById('db-modal-title');
    const body = document.getElementById('db-modal-body');

    let values = null;
    if (pkVal !== null) {
      title.textContent = 'Editar registo';
      const row = state.rows.find((r) => {
        const pkCol = (state.schema.find((c) => c.pk) || state.schema[0] || {}).name;
        return String(r[pkCol]) === String(pkVal);
      });
      values = row || null;
    } else {
      title.textContent = 'Novo registo — ' + state.current;
    }

    body.innerHTML = renderForm(values);
    modal.hidden = false;
    modal.querySelector('input, textarea, select') && modal.querySelector('input, textarea, select').focus();
  }

  function closeModal() {
    document.getElementById('db-modal').hidden = true;
  }

  document.getElementById('db-modal-close').addEventListener('click', closeModal);
  document.getElementById('db-modal-cancel').addEventListener('click', closeModal);

  document.getElementById('db-modal-save').addEventListener('click', async () => {
    const payload = getFormValues();
    const saveBtn = document.getElementById('db-modal-save');
    saveBtn.textContent = 'A guardar…';
    saveBtn.disabled = true;
    try {
      if (state.editingPk !== null) {
        await api('PUT', '/api/admin/tables/' + encodeURIComponent(state.current) + '/' + encodeURIComponent(state.editingPk), payload);
      } else {
        await api('POST', '/api/admin/tables/' + encodeURIComponent(state.current), payload);
      }
      closeModal();
      await loadTableData();
    } catch (e) {
      alert('Erro: ' + e.message);
    } finally {
      saveBtn.textContent = 'Guardar';
      saveBtn.disabled = false;
    }
  });

  // ---------- Modal delete ----------

  let pendingDeletePk = null;

  function openDeleteModal(pkVal) {
    pendingDeletePk = pkVal;
    document.getElementById('db-del-msg').textContent =
      'Eliminar o registo com chave "' + pkVal + '" da tabela "' + state.current + '"? Esta acção é irreversível.';
    document.getElementById('db-del-modal').hidden = false;
  }

  function closeDeleteModal() {
    pendingDeletePk = null;
    document.getElementById('db-del-modal').hidden = true;
  }

  document.getElementById('db-del-close').addEventListener('click', closeDeleteModal);
  document.getElementById('db-del-cancel').addEventListener('click', closeDeleteModal);

  document.getElementById('db-del-confirm').addEventListener('click', async () => {
    if (pendingDeletePk === null) return;
    const btn = document.getElementById('db-del-confirm');
    btn.textContent = 'A eliminar…';
    btn.disabled = true;
    try {
      await api('DELETE', '/api/admin/tables/' + encodeURIComponent(state.current) + '/' + encodeURIComponent(pendingDeletePk));
      closeDeleteModal();
      await loadTableData();
    } catch (e) {
      alert('Erro: ' + e.message);
    } finally {
      btn.textContent = 'Eliminar';
      btn.disabled = false;
    }
  });

  // Close modal on backdrop click
  ['db-modal', 'db-del-modal'].forEach((id) => {
    document.getElementById(id).addEventListener('click', (e) => {
      if (e.target.id === id) { closeModal(); closeDeleteModal(); }
    });
  });

  // ---------- Utils ----------

  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ---------- Init ----------

  document.addEventListener('DOMContentLoaded', async () => {
    const ok = await checkAuth();
    if (!ok) return;
    await loadTables();

    // Deep-link: abrir tabela directamente via ?table=nome
    const tableParam = new URLSearchParams(location.search).get('table');
    if (tableParam) selectTable(tableParam);

    // SSE — actualizar contagens em tempo real
    if (window.EventSource) {
      const es = new EventSource('/api/admin/stream', { withCredentials: true });
      es.addEventListener('stats', () => { if (state.current) loadTableData(); });
      es.addEventListener('post_changed', () => { if (state.current === 'posts') loadTableData(); });
    }

    // Atalhos de teclado
    document.addEventListener('keydown', (e) => {
      const modal = !document.getElementById('db-modal').hidden || !document.getElementById('db-del-modal').hidden;
      const inInput = ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement && document.activeElement.tagName);

      if (e.key === 'Escape') { closeModal(); closeDeleteModal(); return; }
      if (modal || inInput) return;

      // N = novo registo
      if (e.key === 'n' || e.key === 'N') { if (state.current) { e.preventDefault(); openModal(null); } return; }
      // R = recarregar
      if (e.key === 'r' || e.key === 'R') { if (state.current) { e.preventDefault(); loadTableData(); } return; }
    });
  });

})();
