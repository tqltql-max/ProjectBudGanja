(function () {
  var grid = document.getElementById('plantas-grid');
  var search = document.getElementById('plantas-search');
  var tagSelect = document.getElementById('plantas-tag');
  var countEl = document.getElementById('plantas-count');
  var emptyEl = document.getElementById('plantas-empty');
  if (!grid) return;

  function i18n(key, fallback) {
    return window.BudGanjaI18n ? window.BudGanjaI18n.t(key, fallback) : (fallback || '');
  }

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.planta-card'));

  function applyFilters() {
    var q = (search && search.value ? search.value : '').trim().toLowerCase();
    var tag = tagSelect && tagSelect.value ? tagSelect.value : '';
    var visible = 0;
    cards.forEach(function (card) {
      var blob = card.getAttribute('data-search') || '';
      var tags = (card.getAttribute('data-tags') || '').split(/\s+/);
      var matchQ = !q || blob.indexOf(q) !== -1;
      var matchTag = !tag || tags.indexOf(tag) !== -1;
      var show = matchQ && matchTag;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (countEl) {
      countEl.textContent = i18n('pages.plantas.count', '{n} plantas').replace('{n}', String(visible));
    }
    if (emptyEl) {
      emptyEl.hidden = visible > 0;
      emptyEl.textContent = i18n('pages.plantas.empty', 'Nenhuma planta encontrada.');
    }
    if (window.BudGanjaI18n) window.BudGanjaI18n.apply();
  }

  if (search) search.addEventListener('input', applyFilters);
  if (tagSelect) tagSelect.addEventListener('change', applyFilters);
  applyFilters();
  window.addEventListener('budganja:locale-change', applyFilters);
})();
