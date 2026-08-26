(function () {
  var grid = document.getElementById('tecnologia-grid');
  var search = document.getElementById('tecnologia-search');
  var tagSelect = document.getElementById('tecnologia-tag');
  var catSelect = document.getElementById('tecnologia-category');
  var countEl = document.getElementById('tecnologia-count');
  var emptyEl = document.getElementById('tecnologia-empty');
  if (!grid) return;

  function i18n(key, fallback) {
    return window.BudGanjaI18n ? window.BudGanjaI18n.t(key, fallback) : fallback || '';
  }

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.planta-card'));

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
      countEl.textContent = i18n('pages.tecnologia.count', '{n} fichas').replace('{n}', String(visible));
    }
    if (emptyEl) {
      emptyEl.hidden = visible > 0;
      emptyEl.textContent = i18n('pages.tecnologia.empty', 'Nenhuma ficha corresponde aos filtros.');
    }
    if (window.BudGanjaI18n) window.BudGanjaI18n.apply();
  }

  if (search) search.addEventListener('input', applyFilters);
  if (tagSelect) tagSelect.addEventListener('change', applyFilters);
  if (catSelect) catSelect.addEventListener('change', applyFilters);
  applyFilters();
  window.addEventListener('budganja:locale-change', applyFilters);

  var ifOut = document.getElementById('tech-lab-if-out');
  var wetBtn = document.getElementById('tech-lab-wet');
  var dryBtn = document.getElementById('tech-lab-dry');
  var forBtn = document.getElementById('tech-lab-for-run');
  var forOut = document.getElementById('tech-lab-for-out');

  function setIfBranch(wet) {
    if (!ifOut) return;
    ifOut.textContent = wet
      ? i18n('pages.tecnologia.labIfWet', 'if → não regar')
      : i18n('pages.tecnologia.labIfDry', 'else → regar');
  }

  if (wetBtn) wetBtn.addEventListener('click', function () { setIfBranch(true); });
  if (dryBtn) dryBtn.addEventListener('click', function () { setIfBranch(false); });
  if (forBtn && forOut) {
    forBtn.addEventListener('click', function () {
      forOut.textContent = '';
      var tmpl = i18n('pages.tecnologia.labForItem', 'vaso {n} inspecionado');
      var i;
      for (i = 1; i <= 4; i += 1) {
        var li = document.createElement('li');
        li.textContent = tmpl.replace('{n}', String(i));
        forOut.appendChild(li);
      }
    });
  }
})();
