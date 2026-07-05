/* Command Palette global — Ctrl+K em qualquer página admin */
(function () {
  'use strict';

  /* ── CSS ── */
  const STYLE = `
  #cmd-backdrop { display:none; position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,.55); backdrop-filter:blur(4px); align-items:flex-start; justify-content:center; padding:80px 16px 40px; }
  #cmd-backdrop.is-open { display:flex; animation:cmdFadeIn .12s ease; }
  @keyframes cmdFadeIn { from{opacity:0} to{opacity:1} }
  #cmd-box { background:var(--color-card,#1a2212); border:1px solid var(--color-accent,#5ab43c); border-radius:12px; width:100%; max-width:580px; box-shadow:0 24px 60px rgba(0,0,0,.6); overflow:hidden; animation:cmdSlideIn .14s cubic-bezier(.16,1,.3,1); }
  @keyframes cmdSlideIn { from{transform:translateY(-16px) scale(.97)} to{transform:none} }
  #cmd-search-row { display:flex; align-items:center; gap:10px; padding:14px 16px; border-bottom:1px solid rgba(255,255,255,.08); }
  #cmd-icon { font-size:1.1rem; color:var(--color-accent,#5ab43c); flex-shrink:0; }
  #cmd-input { flex:1; background:none; border:none; outline:none; color:var(--color-text,#e8f5e0); font-size:1rem; }
  #cmd-input::placeholder { color:var(--color-text-muted,#7a9968); }
  #cmd-esc-hint { font-size:.7rem; color:var(--color-text-muted,#7a9968); background:rgba(255,255,255,.08); border-radius:4px; padding:2px 6px; flex-shrink:0; }
  #cmd-results { max-height:380px; overflow-y:auto; padding:6px 0; }
  .cmd-section { font-size:.65rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--color-text-muted,#7a9968); padding:10px 16px 4px; }
  .cmd-item { display:flex; align-items:center; gap:10px; padding:9px 16px; cursor:pointer; transition:background .1s; }
  .cmd-item:hover, .cmd-item.is-selected { background:rgba(90,180,60,.14); }
  .cmd-item-icon { font-size:.95rem; width:20px; text-align:center; flex-shrink:0; }
  .cmd-item-label { flex:1; font-size:.88rem; color:var(--color-text,#e8f5e0); }
  .cmd-item-label em { color:var(--color-accent,#5ab43c); font-style:normal; font-weight:600; }
  .cmd-item-hint { font-size:.72rem; color:var(--color-text-muted,#7a9968); flex-shrink:0; }
  #cmd-footer { display:flex; gap:16px; padding:8px 16px; border-top:1px solid rgba(255,255,255,.06); font-size:.68rem; color:var(--color-text-muted,#7a9968); }
  #cmd-footer kbd { background:rgba(255,255,255,.1); border-radius:3px; padding:1px 5px; font-size:.65rem; }

  /* Toast */
  #toast-container { position:fixed; bottom:24px; right:24px; z-index:10000; display:flex; flex-direction:column; gap:8px; pointer-events:none; }
  .toast { background:var(--color-card,#1a2212); border:1px solid var(--color-border,#2a3d1a); border-radius:8px; padding:10px 16px; font-size:.85rem; color:var(--color-text,#e8f5e0); box-shadow:0 8px 24px rgba(0,0,0,.4); animation:toastIn .2s ease; max-width:300px; }
  .toast.toast-ok { border-color:var(--color-accent,#5ab43c); }
  .toast.toast-err { border-color:#e05; }
  @keyframes toastIn { from{transform:translateX(20px);opacity:0} to{transform:none;opacity:1} }
  @keyframes toastOut { to{transform:translateX(20px);opacity:0} }
  `;

  /* ── NAV COMMANDS ── */
  const NAV = [
    { icon: '📝', label: 'Publicações', hint: '/admin.html', href: '/admin.html' },
    { icon: '🗄️', label: 'Base de Dados', hint: '/admin-db.html', href: '/admin-db.html' },
    { icon: '👥', label: 'Utilizadores', hint: '/usuarios-admin.html', href: '/usuarios-admin.html' },
    { icon: '🎁', label: 'Sorteios', hint: '/sorteios-admin.html', href: '/sorteios-admin.html' },
    { icon: '🛒', label: 'Encomendas', hint: '/loja-admin.html', href: '/loja-admin.html' },
    { icon: '📊', label: 'Submissões', hint: '/pesquisas-admin.html', href: '/pesquisas-admin.html' }
  ];

  /* ── State ── */
  let items = [];
  let selected = 0;
  let searchTimer = null;
  let tables = [];

  /* ── Init CSS & DOM ── */
  const styleEl = document.createElement('style');
  styleEl.textContent = STYLE;
  document.head.appendChild(styleEl);

  const backdrop = document.createElement('div');
  backdrop.id = 'cmd-backdrop';
  backdrop.innerHTML = `
    <div id="cmd-box" role="dialog" aria-modal="true" aria-label="Paleta de comandos">
      <div id="cmd-search-row">
        <span id="cmd-icon">⌕</span>
        <input id="cmd-input" autocomplete="off" spellcheck="false" placeholder="Procurar publicações, tabelas, ações…" aria-label="Procurar">
        <span id="cmd-esc-hint">Esc</span>
      </div>
      <div id="cmd-results" role="listbox"></div>
      <div id="cmd-footer">
        <span><kbd>↑↓</kbd> navegar</span>
        <span><kbd>↵</kbd> abrir</span>
        <span><kbd>Esc</kbd> fechar</span>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const toastContainer = document.createElement('div');
  toastContainer.id = 'toast-container';
  document.body.appendChild(toastContainer);

  const input = document.getElementById('cmd-input');
  const results = document.getElementById('cmd-results');

  /* ── Toast ── */
  window.adminToast = function(msg, type) {
    const t = document.createElement('div');
    t.className = 'toast toast-' + (type || 'ok');
    t.textContent = msg;
    toastContainer.appendChild(t);
    setTimeout(() => {
      t.style.animation = 'toastOut .2s ease forwards';
      setTimeout(() => t.remove(), 220);
    }, 3000);
  };

  /* ── Open / Close ── */
  function open() {
    backdrop.classList.add('is-open');
    input.value = '';
    input.focus();
    buildItems('');
    render();
  }

  function close() {
    backdrop.classList.remove('is-open');
  }

  /* ── Build items ── */
  function buildItems(q) {
    const qLow = q.toLowerCase();
    items = [];

    if (!q) {
      items.push({ _section: 'Navegação' });
      NAV.forEach((n) => items.push({ type: 'nav', ...n }));
      if (tables.length) {
        items.push({ _section: 'Tabelas BD' });
        tables.forEach((t) => items.push({ type: 'table', icon: '🗃️', label: t.name, hint: t.count + ' regs', table: t.name }));
      }
    } else {
      const navMatches = NAV.filter((n) => n.label.toLowerCase().includes(qLow));
      if (navMatches.length) {
        items.push({ _section: 'Navegação' });
        navMatches.forEach((n) => items.push({ type: 'nav', ...n, _q: q }));
      }
      const tblMatches = tables.filter((t) => t.name.toLowerCase().includes(qLow));
      if (tblMatches.length) {
        items.push({ _section: 'Tabelas' });
        tblMatches.forEach((t) => items.push({ type: 'table', icon: '🗃️', label: t.name, hint: t.count + ' regs', table: t.name, _q: q }));
      }
    }
    selected = items.findIndex((i) => !i._section);
  }

  function highlight(label, q) {
    if (!q) return esc(label);
    const idx = label.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return esc(label);
    return esc(label.slice(0, idx)) + '<em>' + esc(label.slice(idx, idx + q.length)) + '</em>' + esc(label.slice(idx + q.length));
  }

  function esc(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function render() {
    if (!items.length) { results.innerHTML = '<div style="padding:20px;text-align:center;color:var(--color-text-muted);font-size:.85rem;">Sem resultados</div>'; return; }
    results.innerHTML = items.map((item, i) => {
      if (item._section) return '<div class="cmd-section">' + esc(item._section) + '</div>';
      return '<div class="cmd-item' + (i === selected ? ' is-selected' : '') + '" data-idx="' + i + '" role="option" aria-selected="' + (i === selected) + '">' +
        '<span class="cmd-item-icon">' + (item.icon || '▸') + '</span>' +
        '<span class="cmd-item-label">' + highlight(item.label, item._q || '') + '</span>' +
        '<span class="cmd-item-hint">' + esc(item.hint || '') + '</span>' +
        '</div>';
    }).join('');

    // Scroll selected into view
    const sel = results.querySelector('.is-selected');
    if (sel) sel.scrollIntoView({ block: 'nearest' });
  }

  function execute(i) {
    const item = items[i];
    if (!item || item._section) return;
    close();
    if (item.type === 'nav') { window.location.href = item.href; return; }
    if (item.type === 'table') { window.location.href = '/admin-db.html?table=' + encodeURIComponent(item.table); return; }
    if (item.href) { window.location.href = item.href; }
  }

  /* ── Events ── */
  input.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      buildItems(input.value.trim());
      render();
    }, 120);
  });

  results.addEventListener('click', (e) => {
    const item = e.target.closest('.cmd-item');
    if (item) execute(Number(item.dataset.idx));
  });

  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      backdrop.classList.contains('is-open') ? close() : open();
      return;
    }
    if (!backdrop.classList.contains('is-open')) return;

    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      do { selected = (selected + 1) % items.length; } while (items[selected] && items[selected]._section);
      render(); return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      do { selected = (selected - 1 + items.length) % items.length; } while (items[selected] && items[selected]._section);
      render(); return;
    }
    if (e.key === 'Enter') { e.preventDefault(); execute(selected); }
  });

  /* ── Load tables async (for table list) ── */
  fetch('/api/admin/tables', { credentials: 'include' })
    .then((r) => r.ok ? r.json() : [])
    .then((list) => { tables = list || []; })
    .catch(() => {});

  /* ── Deep-link: open palette if ?cmd=1 ── */
  if (new URLSearchParams(location.search).get('cmd') === '1') {
    document.addEventListener('DOMContentLoaded', open);
  }

  /* ── Keyboard shortcut hint button ── */
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.admin-nav');
    if (!nav) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'admin-nav-link';
    btn.style.cssText = 'background:none;border:none;cursor:pointer;opacity:.7;';
    btn.title = 'Paleta de comandos (Ctrl+K)';
    btn.textContent = '⌕ Pesquisar';
    btn.addEventListener('click', open);
    nav.appendChild(btn);
  });

})();
