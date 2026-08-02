/**
 * Sala de aula Vida — hub, lições, quiz e progresso local.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'budganja_sala_progress_v1';
  var DATA_URL = '/content/sala-aula.json';

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function loadProgress() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { done: {} };
      var data = JSON.parse(raw);
      if (!data || typeof data !== 'object') return { done: {} };
      if (!data.done || typeof data.done !== 'object') data.done = {};
      return data;
    } catch (e) {
      return { done: {} };
    }
  }

  function saveProgress(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* ignore */ }
  }

  function flattenLessons(curriculum) {
    var list = [];
    (curriculum.modules || []).forEach(function (mod) {
      (mod.lessons || []).forEach(function (lesson) {
        list.push({
          moduleId: mod.id,
          moduleTitle: mod.title,
          lesson: lesson
        });
      });
    });
    list.sort(function (a, b) {
      return (a.lesson.order || 0) - (b.lesson.order || 0);
    });
    return list;
  }

  function findLesson(curriculum, id) {
    var all = flattenLessons(curriculum);
    for (var i = 0; i < all.length; i++) {
      if (all[i].lesson.id === id) return all[i];
    }
    return null;
  }

  function nextLessonId(curriculum, id) {
    var all = flattenLessons(curriculum);
    for (var i = 0; i < all.length; i++) {
      if (all[i].lesson.id === id && all[i + 1]) return all[i + 1].lesson.id;
    }
    return '';
  }

  function countDone(curriculum, progress) {
    var all = flattenLessons(curriculum);
    var n = 0;
    all.forEach(function (item) {
      if (progress.done[item.lesson.id]) n += 1;
    });
    return { done: n, total: all.length };
  }

  function renderProgress(el, curriculum, progress) {
    if (!el) return;
    var stats = countDone(curriculum, progress);
    var pct = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;
    el.innerHTML =
      '<div class="sala-progress-label">' +
      '<span>Progresso</span>' +
      '<span>' +
      stats.done +
      ' / ' +
      stats.total +
      '</span>' +
      '</div>' +
      '<div class="sala-progress-bar" aria-hidden="true">' +
      '<div class="sala-progress-fill" style="width:' +
      pct +
      '%"></div>' +
      '</div>';
  }

  function renderHub(curriculum, progress) {
    var root = $('#sala-hub');
    if (!root) return;

    renderProgress($('#sala-progress'), curriculum, progress);

    var note = $('#sala-note');
    if (note && curriculum.note) note.textContent = curriculum.note;

    var html = '';
    (curriculum.modules || []).forEach(function (mod) {
      html +=
        '<section class="sala-section" aria-labelledby="mod-' +
        escapeHtml(mod.id) +
        '">' +
        '<h2 id="mod-' +
        escapeHtml(mod.id) +
        '">' +
        escapeHtml(mod.title) +
        '</h2>' +
        '<p class="sala-section-lead">' +
        escapeHtml(mod.lead || '') +
        '</p>' +
        '<div class="sala-lesson-grid">';

      (mod.lessons || []).forEach(function (lesson) {
        var done = !!progress.done[lesson.id];
        html +=
          '<a class="sala-lesson-card' +
          (done ? ' is-done' : '') +
          '" href="/vida/sala/aula.html?id=' +
          encodeURIComponent(lesson.id) +
          '">' +
          '<div class="sala-lesson-meta">' +
          '<span>Aula ' +
          escapeHtml(String(lesson.order || '')) +
          '</span>' +
          '<span>' +
          escapeHtml(String(lesson.minutes || 4)) +
          ' min</span>' +
          '</div>' +
          '<h3>' +
          escapeHtml(lesson.title) +
          '</h3>' +
          '<p>' +
          escapeHtml(lesson.summary || '') +
          '</p>' +
          (done ? '<span class="sala-lesson-status">Concluída ✓</span>' : '') +
          '</a>';
      });

      html += '</div></section>';
    });

    root.innerHTML = html || '<p class="sala-empty">Ainda sem aulas.</p>';
  }

  function bindQuiz(lesson, progress) {
    var quizRoot = $('#sala-quiz');
    if (!quizRoot || !lesson.quiz || !lesson.quiz.length) return;

    var answers = {};
    quizRoot.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-quiz-opt]') : null;
      if (!btn) return;
      var qi = parseInt(btn.getAttribute('data-quiz-i'), 10);
      var oi = parseInt(btn.getAttribute('data-quiz-opt'), 10);
      if (isNaN(qi) || isNaN(oi)) return;
      var item = lesson.quiz[qi];
      if (!item) return;

      var wrap = btn.closest('.sala-quiz-item');
      if (!wrap || wrap.getAttribute('data-locked') === '1') return;

      var buttons = wrap.querySelectorAll('[data-quiz-opt]');
      buttons.forEach(function (b) {
        b.disabled = true;
        var idx = parseInt(b.getAttribute('data-quiz-opt'), 10);
        if (idx === item.answer) b.classList.add('is-correct');
        else if (idx === oi) b.classList.add('is-wrong');
      });

      var ok = oi === item.answer;
      answers[qi] = ok;
      var fb = wrap.querySelector('.sala-quiz-feedback');
      if (fb) {
        fb.className = 'sala-quiz-feedback ' + (ok ? 'is-ok' : 'is-bad');
        fb.textContent = ok ? 'Muito bem!' : 'Quase! Olha a resposta dourada.';
      }
      wrap.setAttribute('data-locked', '1');

      var total = lesson.quiz.length;
      var answered = Object.keys(answers).length;
      if (answered >= total) {
        var correct = 0;
        Object.keys(answers).forEach(function (k) {
          if (answers[k]) correct += 1;
        });
        if (correct >= Math.ceil(total * 0.5)) {
          progress.done[lesson.id] = {
            at: new Date().toISOString(),
            score: correct + '/' + total
          };
          saveProgress(progress);
          var badge = $('#sala-done-badge');
          if (badge) {
            badge.hidden = false;
            badge.textContent = 'Aula concluída! (' + correct + '/' + total + ')';
          }
        }
      }
    });
  }

  function renderLesson(curriculum, progress, id) {
    var mount = $('#sala-lesson');
    if (!mount) return;

    var found = findLesson(curriculum, id);
    if (!found) {
      mount.innerHTML =
        '<p class="sala-empty">Aula não encontrada. <a class="sala-back" href="/vida/sala/">Voltar à sala</a></p>';
      return;
    }

    var lesson = found.lesson;
    var nextId = nextLessonId(curriculum, lesson.id);
    var bodyHtml = (lesson.body || [])
      .map(function (p) {
        return '<p>' + escapeHtml(p) + '</p>';
      })
      .join('');

    var wordsHtml = (lesson.focusWords || [])
      .map(function (w) {
        return '<li>' + escapeHtml(w) + '</li>';
      })
      .join('');

    var quizHtml = '';
    if (lesson.quiz && lesson.quiz.length) {
      quizHtml =
        '<section class="sala-quiz" id="sala-quiz" aria-label="Perguntas da aula">' +
        '<h2>Hora das perguntas</h2>';
      lesson.quiz.forEach(function (item, qi) {
        quizHtml +=
          '<div class="sala-quiz-item" data-quiz-item="' +
          qi +
          '">' +
          '<p>' +
          (qi + 1) +
          '. ' +
          escapeHtml(item.q) +
          '</p>' +
          '<div class="sala-quiz-options">';
        (item.options || []).forEach(function (opt, oi) {
          quizHtml +=
            '<button type="button" data-quiz-i="' +
            qi +
            '" data-quiz-opt="' +
            oi +
            '">' +
            escapeHtml(opt) +
            '</button>';
        });
        quizHtml +=
          '</div><p class="sala-quiz-feedback" aria-live="polite"></p></div>';
      });
      quizHtml += '</section>';
    }

    var done = progress.done[lesson.id];
    mount.innerHTML =
      '<a class="sala-back" href="/vida/sala/">← Sala de aula</a>' +
      '<header class="sala-lesson-head">' +
      '<p class="sala-hero-brand">' +
      escapeHtml(found.moduleTitle) +
      ' · Aula ' +
      escapeHtml(String(lesson.order || '')) +
      '</p>' +
      '<h1>' +
      escapeHtml(lesson.title) +
      '</h1>' +
      '<p class="sala-lesson-summary">' +
      escapeHtml(lesson.summary || '') +
      '</p>' +
      '</header>' +
      '<div data-learn-toolbar></div>' +
      '<div data-learn-root class="sala-lesson-body">' +
      bodyHtml +
      '</div>' +
      (wordsHtml
        ? '<aside class="sala-focus"><strong>Palavras para praticar</strong><ul class="sala-focus-words">' +
          wordsHtml +
          '</ul></aside>'
        : '') +
      '<p id="sala-done-badge" class="sala-lesson-status" ' +
      (done ? '' : 'hidden') +
      '>' +
      (done ? 'Aula já concluída ✓' : '') +
      '</p>' +
      quizHtml +
      '<div class="sala-lesson-nav" data-learn-skip>' +
      '<a class="botao botao-home botao-home--secondary" href="/vida/sala/">Todas as aulas</a>' +
      (nextId
        ? '<a class="botao botao-home" href="/vida/sala/aula.html?id=' +
          encodeURIComponent(nextId) +
          '">Próxima aula</a>'
        : '<a class="botao botao-home" href="/vida/">Voltar à Vida</a>') +
      '</div>';

    bindQuiz(lesson, progress);

    // Reinicia o modo Aprender depois de injetar o DOM da aula.
    if (window.BudGanjaLearnTranslate && typeof window.BudGanjaLearnTranslate.remount === 'function') {
      window.BudGanjaLearnTranslate.remount();
    } else if (window.BudGanjaLearnTranslate && typeof window.BudGanjaLearnTranslate.setLang === 'function') {
      var lang = window.BudGanjaLearnTranslate.getLang ? window.BudGanjaLearnTranslate.getLang() : '';
      if (lang) {
        window.BudGanjaLearnTranslate.setLang('');
        window.BudGanjaLearnTranslate.setLang(lang);
      }
    }
  }

  function boot() {
    var page = (document.body && document.body.dataset.page) || '';
    if (page !== 'sala' && page !== 'sala-aula') return;

    fetch(DATA_URL + '?_=' + Date.now(), { cache: 'no-store', credentials: 'same-origin' })
      .then(function (res) {
        return res.ok ? res.json() : null;
      })
      .then(function (curriculum) {
        if (!curriculum) {
          var fail = $('#sala-hub') || $('#sala-lesson');
          if (fail) fail.innerHTML = '<p class="sala-empty">Não foi possível carregar a sala de aula.</p>';
          return;
        }
        var progress = loadProgress();
        var params = new URLSearchParams(window.location.search || '');
        var lessonId = params.get('id') || '';
        if (lessonId || $('#sala-lesson')) {
          renderLesson(curriculum, progress, lessonId);
        } else {
          renderHub(curriculum, progress);
        }
      })
      .catch(function () {
        var fail = $('#sala-hub') || $('#sala-lesson');
        if (fail) fail.innerHTML = '<p class="sala-empty">Não foi possível carregar a sala de aula.</p>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
