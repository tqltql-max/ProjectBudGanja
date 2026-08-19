(function () {
  'use strict';

  var STORAGE_KEY = 'budganja-cadernos-engenharia-v1';
  var data = window.BudGanjaCadernosData;
  if (!data) return;

  var state = loadState();
  var saveTimer = null;
  var view = { mode: 'hub', subjectId: '', query: '' };

  function uid() {
    return 'n' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function todayIso() {
    var d = new Date();
    var m = String(d.getMonth() + 1);
    var day = String(d.getDate());
    if (m.length < 2) m = '0' + m;
    if (day.length < 2) day = '0' + day;
    return d.getFullYear() + '-' + m + '-' + day;
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { version: 1, subjects: [] };
      var parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.subjects)) return { version: 1, subjects: [] };
      return parsed;
    } catch (e) {
      return { version: 1, subjects: [] };
    }
  }

  function persist(immediate) {
    var write = function () {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        setStatus('Guardado neste aparelho.');
      } catch (e) {
        setStatus('Não foi possível guardar. Espaço cheio ou modo privado.');
      }
    };
    if (immediate) {
      clearTimeout(saveTimer);
      write();
      return;
    }
    clearTimeout(saveTimer);
    saveTimer = setTimeout(write, 400);
  }

  function setStatus(text) {
    var el = document.getElementById('ce-status');
    if (el) el.textContent = text || '';
  }

  function parseHash() {
    var raw = (location.hash || '').replace(/^#/, '');
    var params = new URLSearchParams(raw);
    view.subjectId = params.get('m') || '';
    view.mode = view.subjectId ? 'subject' : 'hub';
  }

  function setHash(subjectId) {
    if (subjectId) {
      history.replaceState(null, '', '#m=' + encodeURIComponent(subjectId));
    } else if (location.hash) {
      history.replaceState(null, '', location.pathname + location.search);
    }
  }

  function findSubject(id) {
    var i;
    for (i = 0; i < state.subjects.length; i++) {
      if (state.subjects[i].id === id) return state.subjects[i];
    }
    return null;
  }

  function addSubject(spec) {
    var id = spec.id || data.slugify(spec.name);
    if (findSubject(id)) return findSubject(id);
    var subject = {
      id: id,
      name: spec.name,
      termo: spec.termo || 0,
      hours: spec.hours || 0,
      icon: spec.icon || '📓',
      formulas: '',
      lessons: []
    };
    state.subjects.push(subject);
    persist(true);
    return subject;
  }

  function addTerm(n) {
    data.subjectsForTerm(n).forEach(addSubject);
  }

  function lessonCount(subject) {
    return (subject.lessons || []).length;
  }

  function matchesQuery(subject, q) {
    if (!q) return true;
    var blob = (subject.name + ' ' + (subject.formulas || '')).toLowerCase();
    (subject.lessons || []).forEach(function (lesson) {
      blob += ' ' + [
        lesson.title,
        lesson.cues,
        lesson.notes,
        lesson.questions,
        lesson.summary
      ].join(' ');
    });
    return blob.indexOf(q) !== -1;
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function render() {
    parseHash();
    var hub = document.getElementById('ce-hub');
    var subjectView = document.getElementById('ce-subject');
    if (!hub || !subjectView) return;

    if (view.mode === 'subject' && findSubject(view.subjectId)) {
      hub.hidden = true;
      subjectView.hidden = false;
      renderSubject(findSubject(view.subjectId));
    } else {
      hub.hidden = false;
      subjectView.hidden = true;
      view.subjectId = '';
      renderHub();
    }
  }

  function renderHub() {
    var list = document.getElementById('ce-grid');
    var empty = document.getElementById('ce-empty');
    var q = (view.query || '').trim().toLowerCase();
    var shown = state.subjects.filter(function (s) { return matchesQuery(s, q); });

    if (!list) return;
    list.innerHTML = shown.map(function (s) {
      var meta = [];
      if (s.termo) meta.push(s.termo + 'º termo');
      meta.push(lessonCount(s) === 1 ? '1 aula' : lessonCount(s) + ' aulas');
      return (
        '<button type="button" class="ce-card" data-open="' + escapeHtml(s.id) + '">' +
          '<span class="ce-card-icon" aria-hidden="true">' + escapeHtml(s.icon || '📓') + '</span>' +
          '<h3>' + escapeHtml(s.name) + '</h3>' +
          '<p class="ce-card-meta">' + escapeHtml(meta.join(' · ')) + '</p>' +
        '</button>'
      );
    }).join('');

    if (empty) empty.hidden = state.subjects.length > 0;
  }

  function renderSubject(subject) {
    var title = document.getElementById('ce-subject-title');
    var meta = document.getElementById('ce-subject-meta');
    var formulas = document.getElementById('ce-formulas');
    var lessons = document.getElementById('ce-lessons');
    if (title) title.textContent = subject.name;
    if (meta) {
      var bits = [];
      if (subject.termo) bits.push(subject.termo + 'º termo');
      if (subject.hours) bits.push(subject.hours + ' h');
      bits.push(lessonCount(subject) === 1 ? '1 aula' : lessonCount(subject) + ' aulas');
      meta.textContent = bits.join(' · ');
    }
    if (formulas) formulas.value = subject.formulas || '';
    if (!lessons) return;
    if (!subject.lessons.length) {
      lessons.innerHTML = '<p class="ce-empty">Ainda sem aula neste caderno. Toque em «Nova aula» depois da aula, no mesmo dia.</p>';
      return;
    }
    lessons.innerHTML = subject.lessons.map(function (lesson, index) {
      return (
        '<article class="ce-lesson" data-lesson="' + escapeHtml(lesson.id) + '">' +
          '<div class="ce-lesson-top">' +
            '<p><label for="ce-title-' + index + '">Título da aula</label>' +
            '<input id="ce-title-' + index + '" data-field="title" value="' + escapeHtml(lesson.title || '') + '"></p>' +
            '<p><label for="ce-date-' + index + '">Data</label>' +
            '<input id="ce-date-' + index + '" type="date" data-field="date" value="' + escapeHtml(lesson.date || '') + '"></p>' +
            '<div class="ce-lesson-actions">' +
              '<button type="button" class="botao botao-outline botao-sm" data-delete-lesson="' + escapeHtml(lesson.id) + '">Apagar aula</button>' +
            '</div>' +
          '</div>' +
          '<div class="ce-cornell">' +
            '<p><label for="ce-cues-' + index + '">Ideias-chave / perguntas</label>' +
            '<textarea id="ce-cues-' + index + '" data-field="cues" placeholder="Palavras, fórmulas, o que vai cair na prova">' + escapeHtml(lesson.cues || '') + '</textarea></p>' +
            '<p><label for="ce-notes-' + index + '">Notas da aula</label>' +
            '<textarea id="ce-notes-' + index + '" data-field="notes" placeholder="O que o professor explicou, exemplos, desenhos em palavras">' + escapeHtml(lesson.notes || '') + '</textarea></p>' +
          '</div>' +
          '<p><label for="ce-questions-' + index + '">Dúvidas para tirar</label>' +
          '<textarea id="ce-questions-' + index + '" data-field="questions" rows="2">' + escapeHtml(lesson.questions || '') + '</textarea></p>' +
          '<p class="ce-summary"><label for="ce-summary-' + index + '">Resumo (3–5 linhas, no mesmo dia)</label>' +
          '<textarea id="ce-summary-' + index + '" data-field="summary" placeholder="Se não consegue resumir, ainda não entendeu — volte às notas.">' + escapeHtml(lesson.summary || '') + '</textarea></p>' +
        '</article>'
      );
    }).join('');
  }

  function openSubject(id) {
    view.subjectId = id;
    view.mode = 'subject';
    setHash(id);
    render();
    window.scrollTo(0, 0);
  }

  function closeSubject() {
    view.subjectId = '';
    view.mode = 'hub';
    setHash('');
    render();
  }

  function currentSubject() {
    return findSubject(view.subjectId);
  }

  function addLesson() {
    var subject = currentSubject();
    if (!subject) return;
    var n = subject.lessons.length + 1;
    subject.lessons.unshift({
      id: uid(),
      title: 'Aula ' + n,
      date: todayIso(),
      cues: '',
      notes: '',
      questions: '',
      summary: '',
      updatedAt: new Date().toISOString()
    });
    persist(true);
    render();
  }

  function updateLesson(lessonId, field, value) {
    var subject = currentSubject();
    if (!subject) return;
    var lesson = subject.lessons.filter(function (item) { return item.id === lessonId; })[0];
    if (!lesson) return;
    lesson[field] = value;
    lesson.updatedAt = new Date().toISOString();
    persist();
  }

  function deleteLesson(lessonId) {
    var subject = currentSubject();
    if (!subject) return;
    if (!window.confirm('Apagar esta aula?')) return;
    subject.lessons = subject.lessons.filter(function (item) { return item.id !== lessonId; });
    persist(true);
    render();
  }

  function deleteSubject() {
    var subject = currentSubject();
    if (!subject) return;
    if (!window.confirm('Apagar o caderno de «' + subject.name + '» e todas as aulas?')) return;
    state.subjects = state.subjects.filter(function (item) { return item.id !== subject.id; });
    persist(true);
    closeSubject();
  }

  function fillPicker() {
    var host = document.getElementById('ce-picker-list');
    if (!host) return;
    host.innerHTML = data.TERMS.map(function (term) {
      var buttons = term.subjects.map(function (s) {
        var exists = !!findSubject(s.id);
        return (
          '<button type="button" class="botao botao-outline botao-sm" data-add-catalog="' + escapeHtml(s.id) + '"' +
          (exists ? ' disabled' : '') + '>' +
          escapeHtml(s.icon + ' ' + s.name) + (exists ? ' · já está' : '') +
          '</button>'
        );
      }).join('');
      return '<h3>' + escapeHtml(term.label) + '</h3>' + buttons;
    }).join('');
  }

  function openPicker() {
    var picker = document.getElementById('ce-picker');
    if (!picker) return;
    fillPicker();
    picker.hidden = false;
    var closeBtn = document.getElementById('ce-picker-close');
    if (closeBtn) closeBtn.focus();
  }

  function closePicker() {
    var picker = document.getElementById('ce-picker');
    if (picker) picker.hidden = true;
  }

  function catalogById(id) {
    var list = data.allSubjects();
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function exportJson() {
    var blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'cadernos-engenharia-budganja.json';
    a.click();
    URL.revokeObjectURL(a.href);
    setStatus('Cópia descarregada.');
  }

  function importJson(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var parsed = JSON.parse(String(reader.result || ''));
        if (!parsed || !Array.isArray(parsed.subjects)) throw new Error('formato');
        state = parsed;
        persist(true);
        closeSubject();
        setStatus('Cadernos importados.');
      } catch (e) {
        setStatus('Ficheiro inválido.');
      }
    };
    reader.readAsText(file);
  }

  function onClick(event) {
    var open = event.target.closest('[data-open]');
    if (open) {
      openSubject(open.getAttribute('data-open'));
      return;
    }
    var addCatalog = event.target.closest('[data-add-catalog]');
    if (addCatalog) {
      var spec = catalogById(addCatalog.getAttribute('data-add-catalog'));
      if (spec) {
        addSubject(spec);
        fillPicker();
        renderHub();
      }
      return;
    }
    var delLesson = event.target.closest('[data-delete-lesson]');
    if (delLesson) {
      deleteLesson(delLesson.getAttribute('data-delete-lesson'));
    }
  }

  function onInput(event) {
    var lessonEl = event.target.closest('[data-lesson]');
    if (lessonEl && event.target.dataset.field) {
      updateLesson(lessonEl.getAttribute('data-lesson'), event.target.dataset.field, event.target.value);
      return;
    }
    if (event.target.id === 'ce-formulas') {
      var subject = currentSubject();
      if (!subject) return;
      subject.formulas = event.target.value;
      persist();
      return;
    }
    if (event.target.id === 'ce-search') {
      view.query = event.target.value;
      renderHub();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('ce-start-t1') && document.getElementById('ce-start-t1').addEventListener('click', function () {
      addTerm(1);
      render();
    });
    document.getElementById('ce-add-subject') && document.getElementById('ce-add-subject').addEventListener('click', openPicker);
    document.getElementById('ce-picker-close') && document.getElementById('ce-picker-close').addEventListener('click', closePicker);
    document.getElementById('ce-picker') && document.getElementById('ce-picker').addEventListener('click', function (event) {
      if (event.target.id === 'ce-picker') closePicker();
    });
    document.getElementById('ce-add-custom') && document.getElementById('ce-add-custom').addEventListener('click', function () {
      var input = document.getElementById('ce-custom-name');
      var name = input && input.value.trim();
      if (!name) return;
      var created = addSubject({ name: name, icon: '📓' });
      if (input) input.value = '';
      closePicker();
      openSubject(created.id);
    });
    document.getElementById('ce-back') && document.getElementById('ce-back').addEventListener('click', closeSubject);
    document.getElementById('ce-new-lesson') && document.getElementById('ce-new-lesson').addEventListener('click', addLesson);
    document.getElementById('ce-delete-subject') && document.getElementById('ce-delete-subject').addEventListener('click', deleteSubject);
    document.getElementById('ce-print') && document.getElementById('ce-print').addEventListener('click', function () { window.print(); });
    document.getElementById('ce-export') && document.getElementById('ce-export').addEventListener('click', exportJson);
    var file = document.getElementById('ce-import-file');
    document.getElementById('ce-import') && document.getElementById('ce-import').addEventListener('click', function () {
      if (file) file.click();
    });
    if (file) {
      file.addEventListener('change', function () {
        if (file.files && file.files[0]) importJson(file.files[0]);
        file.value = '';
      });
    }
    document.addEventListener('click', onClick);
    document.addEventListener('input', onInput);
    window.addEventListener('hashchange', render);
    render();
  });
})();
