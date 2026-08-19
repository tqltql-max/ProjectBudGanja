(function () {
  var grid = document.getElementById('fungos-grid');
  var search = document.getElementById('fungos-search');
  var tagSelect = document.getElementById('fungos-tag');
  var countEl = document.getElementById('fungos-count');
  var emptyEl = document.getElementById('fungos-empty');
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
      countEl.textContent = i18n('pages.fungos.count', '{n} fungos').replace('{n}', String(visible));
    }
    if (emptyEl) {
      emptyEl.hidden = visible > 0;
      emptyEl.textContent = i18n('pages.fungos.empty', 'Nenhum fungo encontrado.');
    }
    if (window.BudGanjaI18n) window.BudGanjaI18n.apply();
  }

  if (search) search.addEventListener('input', applyFilters);
  if (tagSelect) tagSelect.addEventListener('change', applyFilters);
  applyFilters();
  window.addEventListener('budganja:locale-change', applyFilters);
})();
