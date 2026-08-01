(function () {
  var grid = document.getElementById('animais-grid');
  var search = document.getElementById('animais-search');
  var tagSelect = document.getElementById('animais-tag');
  var catSelect = document.getElementById('animais-category');
  var countEl = document.getElementById('animais-count');
  var emptyEl = document.getElementById('animais-empty');
  if (!grid) return;

  function i18n(key, fallback) {
    return window.BudGanjaI18n ? window.BudGanjaI18n.t(key, fallback) : (fallback || '');
  }

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.animal-card'));

  function applyFilters() {
    var q = (search && search.value ? search.value : '').trim().toLowerCase();
    var tag = tagSelect && tagSelect.value ? tagSelect.value : '';
    var cat = catSelect && catSelect.value ? catSelect.value : '';
    var visible = 0;
    cards.forEach(function (card) {
      var blob = card.getAttribute('data-search') || '';
      var tags = (card.getAttribute('data-tags') || '').split(/\s+/);
      var category = card.getAttribute('data-category') || '';
      var matchQ = !q || blob.indexOf(q) !== -1;
      var matchTag = !tag || tags.indexOf(tag) !== -1;
      var matchCat = !cat || category === cat;
      var show = matchQ && matchTag && matchCat;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (countEl) {
      countEl.textContent = i18n('pages.animais.count', '{n} animais').replace('{n}', String(visible));
    }
    if (emptyEl) {
      emptyEl.hidden = visible > 0;
      emptyEl.textContent = i18n('pages.animais.empty', 'Nenhum animal encontrado.');
    }
    if (window.BudGanjaI18n) window.BudGanjaI18n.apply();
  }

  if (search) search.addEventListener('input', applyFilters);
  if (tagSelect) tagSelect.addEventListener('change', applyFilters);
  if (catSelect) catSelect.addEventListener('change', applyFilters);
  applyFilters();
  window.addEventListener('budganja:locale-change', applyFilters);
})();
