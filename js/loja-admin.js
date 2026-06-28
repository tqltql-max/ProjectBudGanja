let ordersCache = [];

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function formatDateTime(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return iso;
  }
}

function renderStats(orders) {
  const grid = document.getElementById('loja-admin-stats');
  if (!grid) return;
  const six = orders.filter(function (o) { return o.productId === 'clonadora-6'; }).length;
  const twelve = orders.filter(function (o) { return o.productId === 'clonadora-12'; }).length;
  grid.innerHTML =
    '<article class="admin-stat-card admin-stat-card--live">' +
    '<p class="admin-stat-value">' + orders.length + '</p>' +
    '<p class="admin-stat-label">Encomendas totais</p></article>' +
    '<article class="admin-stat-card">' +
    '<p class="admin-stat-value">' + six + '</p>' +
    '<p class="admin-stat-label">Clonadora 6 estacas</p></article>' +
    '<article class="admin-stat-card">' +
    '<p class="admin-stat-value">' + twelve + '</p>' +
    '<p class="admin-stat-label">Clonadora 12 estacas</p></article>';
}

function renderTable(orders) {
  const tbody = document.getElementById('loja-orders-table-body');
  const countEl = document.getElementById('loja-orders-count');
  if (!tbody) return;

  if (countEl) {
    countEl.textContent = orders.length === 1
      ? '1 encomenda recebida'
      : orders.length + ' encomendas recebidas';
  }

  if (!orders.length) {
    tbody.innerHTML = '<tr><td colspan="8">Nenhuma encomenda ainda.</td></tr>';
    return;
  }

  tbody.innerHTML = orders.map(function (order) {
    const pkg = order.packageLabel
      ? escapeHtml(order.packageLabel) + (order.packagePriceNote ? '<br><span class="field-hint">' + escapeHtml(order.packagePriceNote) + '</span>' : '')
      : '—';
    const msg = order.mensagem
      ? '<span class="loja-admin-msg">' + escapeHtml(order.mensagem) + '</span>'
      : '—';
    return (
      '<tr>' +
      '<td class="sorteio-table-date">' + escapeHtml(formatDateTime(order.createdAt)) + '</td>' +
      '<td>' + escapeHtml(order.productTitle || order.productId || '—') + '</td>' +
      '<td>' + pkg + '</td>' +
      '<td>' + escapeHtml(order.nome || '—') + '</td>' +
      '<td><a href="mailto:' + escapeHtml(order.email || '') + '">' + escapeHtml(order.email || '—') + '</a></td>' +
      '<td>' + escapeHtml(order.telefone || '—') + '</td>' +
      '<td>' + escapeHtml((order.cidade || '—') + '/' + (order.estado || '—')) + '</td>' +
      '<td>' + msg + '</td>' +
      '</tr>'
    );
  }).join('');
}

function exportCsv(orders) {
  const headers = ['Data', 'Produto', 'Opção', 'Preço indicado', 'Nome', 'E-mail', 'Telefone', 'Cidade', 'Estado', 'Mensagem', 'ID'];
  const rows = orders.map(function (order) {
    return [
      formatDateTime(order.createdAt),
      order.productTitle || order.productId || '',
      order.packageLabel || '',
      order.packagePriceNote || '',
      order.nome || '',
      order.email || '',
      order.telefone || '',
      order.cidade || '',
      order.estado || '',
      order.mensagem || '',
      order.id || ''
    ];
  });
  const csv = [headers].concat(rows)
    .map(function (row) {
      return row.map(function (cell) {
        return '"' + String(cell).replace(/"/g, '""') + '"';
      }).join(',');
    })
    .join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'loja-encomendas.csv';
  link.click();
  URL.revokeObjectURL(url);
}

async function loadOrders() {
  const res = await fetch('/api/loja/encomendas', { credentials: 'include' });
  if (!res.ok) throw new Error('failed');
  ordersCache = await res.json();
  renderTable(ordersCache);
  renderStats(ordersCache);
}

document.addEventListener('DOMContentLoaded', async function () {
  const logoutBtn = document.getElementById('logout-btn');
  const exportBtn = document.getElementById('loja-orders-export-btn');
  const tbody = document.getElementById('loja-orders-table-body');

  try {
    const me = await fetch('/api/me', { credentials: 'include' });
    if (!me.ok) {
      window.location.href = '/login.html?returnTo=/loja-admin.html';
      return;
    }
  } catch (e) {
    window.location.href = '/login.html?returnTo=/loja-admin.html';
    return;
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async function () {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' });
      window.location.href = '/login.html';
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', function () {
      exportCsv(ordersCache);
    });
  }

  try {
    await loadOrders();
  } catch (e) {
    if (tbody) tbody.innerHTML = '<tr><td colspan="8">Erro ao carregar encomendas.</td></tr>';
  }
});
