/**
 * Hub ESAPP — pinta a matriz dos cadernos na página do curso.
 * Fonte: js/cadernos-engenharia-data.js (matriz pública 2024).
 */
(function () {
  'use strict';

  var root = document.getElementById('esapp-grade');
  if (!root) return;

  var data = window.BudGanjaCadernosData;
  if (!data || !Array.isArray(data.TERMS)) {
    root.innerHTML = '<p class="unifesp-note">A matriz não carregou. Abra os <a href="/biblioteca/cadernos/">cadernos</a>.</p>';
    return;
  }

  var frag = document.createDocumentFragment();
  data.TERMS.forEach(function (term) {
    var details = document.createElement('details');
    details.className = 'esapp-term';
    if (term.termo === 1) details.open = true;

    var summary = document.createElement('summary');
    var visible = (term.subjects || []).filter(function (s) { return !s.skip; });
    summary.textContent = term.label + ' · ' + visible.length + ' matérias';
    details.appendChild(summary);

    var list = document.createElement('ul');
    list.className = 'esapp-term-list';
    visible.forEach(function (s) {
      var li = document.createElement('li');
      var icon = document.createElement('span');
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = s.icon ? s.icon + ' ' : '';
      li.appendChild(icon);
      var name = document.createElement('span');
      name.textContent = s.name;
      li.appendChild(name);
      if (s.hours) {
        var hours = document.createElement('span');
        hours.className = 'esapp-term-hours';
        hours.textContent = s.hours + ' h';
        li.appendChild(hours);
      }
      list.appendChild(li);
    });
    details.appendChild(list);
    frag.appendChild(details);
  });
  root.appendChild(frag);
})();
