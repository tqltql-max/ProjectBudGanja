/**
 * Sala de aula Vida — trilha de prática estilo Duolingo (PT → EN/ES).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'budganja_sala_pratica_v1';
  var LANG_KEY = 'budganja_sala_pratica_lang';
  var DATA_URL = '/content/sala-duolingo.json';

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

  function t(key, fallback) {
    if (window.BudGanjaI18n && typeof window.BudGanjaI18n.t === 'function') {
      var val = window.BudGanjaI18n.t('pages.salaPratica.' + key);
      if (val && val !== 'pages.salaPratica.' + key) return val;
    }
    return fallback || key;
  }

  function getSiteLocale() {
    if (window.BudGanjaI18n && typeof window.BudGanjaI18n.getLocale === 'function') {
      return window.BudGanjaI18n.getLocale();
    }
    return 'pt-BR';
  }

  function loadProgress() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { done: {}, hearts: null, streak: 0 };
      var data = JSON.parse(raw);
      if (!data || typeof data !== 'object') return { done: {}, hearts: null, streak: 0 };
      if (!data.done || typeof data.done !== 'object') data.done = {};
      return data;
    } catch (e) {
      return { done: {}, hearts: null, streak: 0 };
    }
  }

  function saveProgress(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* ignore */ }
  }

  function getTargetLang() {
    try {
      var saved = localStorage.getItem(LANG_KEY);
      if (saved === 'en' || saved === 'es') return saved;
    } catch (e) { /* ignore */ }
    var loc = getSiteLocale();
    if (loc === 'en') return 'en';
    if (loc === 'es') return 'es';
    return 'en';
  }

  function setTargetLang(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) { /* ignore */ }
  }

  function flattenLessons(curriculum) {
    var list = [];
    (curriculum.units || []).forEach(function (unit) {
      (unit.lessons || []).forEach(function (lesson) {
        list.push({ unit: unit, lesson: lesson });
      });
    });
    list.sort(function (a, b) {
      var oa = a.unit.order || 0;
      var ob = b.unit.order || 0;
      if (oa !== ob) return oa - ob;
      return String(a.lesson.id).localeCompare(String(b.lesson.id));
    });
    return list;
  }

  function findLesson(curriculum, lessonId) {
    var all = flattenLessons(curriculum);
    for (var i = 0; i < all.length; i++) {
      if (all[i].lesson.id === lessonId) return all[i];
    }
    return null;
  }

  function nextLessonId(curriculum, lessonId) {
    var all = flattenLessons(curriculum);
    for (var i = 0; i < all.length; i++) {
      if (all[i].lesson.id === lessonId && all[i + 1]) return all[i + 1].lesson.id;
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

  function isUnitUnlocked(curriculum, progress, unit, unitIndex) {
    if (unit && (unit.open === true || unit.unlockedByDefault === true)) return true;
    if (unitIndex === 0) return true;
    var prev = curriculum.units[unitIndex - 1];
    if (!prev || !prev.lessons || !prev.lessons.length) return true;
    var lastLesson = prev.lessons[prev.lessons.length - 1];
    return !!(lastLesson && progress.done[lastLesson.id]);
  }

  function renderProgressBar(el, curriculum, progress) {
    if (!el) return;
    var stats = countDone(curriculum, progress);
    var pct = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;
    el.innerHTML =
      '<div class="sala-progress-label">' +
      '<span>' +
      escapeHtml(t('progressLabel', 'Progresso')) +
      '</span>' +
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

  function renderLangPicker() {
    var lang = getTargetLang();
    return (
      '<div class="pratica-lang" role="group" aria-label="' +
      escapeHtml(t('langPickerAria', 'Idioma de prática')) +
      '">' +
      '<span class="pratica-lang-label">' +
      escapeHtml(t('langLabel', 'Praticar para')) +
      '</span>' +
      '<button type="button" class="pratica-lang-btn' +
      (lang === 'en' ? ' is-active' : '') +
      '" data-pratica-lang="en">English</button>' +
      '<button type="button" class="pratica-lang-btn' +
      (lang === 'es' ? ' is-active' : '') +
      '" data-pratica-lang="es">Español</button>' +
      '</div>'
    );
  }

  function bindLangPicker(root, curriculum, rerender) {
    if (!root) return;
    root.querySelectorAll('[data-pratica-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = btn.getAttribute('data-pratica-lang');
        if (lang !== 'en' && lang !== 'es') return;
        setTargetLang(lang);
        rerender();
      });
    });
  }

  function renderHub(curriculum, progress) {
    var root = $('#pratica-root');
    if (!root) return;

    renderProgressBar($('#pratica-progress'), curriculum, progress);

    var html =
      renderLangPicker() +
      '<section class="pratica-skill" aria-labelledby="pratica-skill-title">' +
      '<p class="pratica-skill-kicker">' +
      escapeHtml(curriculum.skill && curriculum.skill.title ? curriculum.skill.title : '') +
      '</p>' +
      '<h2 id="pratica-skill-title">' +
      escapeHtml(t('pathTitle', 'Trilha de prática')) +
      '</h2>' +
      '<p class="pratica-skill-lead">' +
      escapeHtml((curriculum.skill && curriculum.skill.lead) || curriculum.subtitle || '') +
      '</p>' +
      '<ol class="pratica-path">';

    (curriculum.units || []).forEach(function (unit, ui) {
      var unlocked = isUnitUnlocked(curriculum, progress, unit, ui);
      var unitDone = (unit.lessons || []).every(function (l) {
        return !!progress.done[l.id];
      });
      html +=
        '<li class="pratica-unit' +
        (unlocked ? '' : ' is-locked') +
        (unitDone ? ' is-done' : '') +
        '">' +
        '<div class="pratica-unit-head">' +
        '<span class="pratica-unit-num">' +
        escapeHtml(String(unit.order || ui + 1)) +
        '</span>' +
        '<div class="pratica-unit-copy">' +
        '<h3>' +
        escapeHtml(unit.title) +
        '</h3>' +
        '<p>' +
        escapeHtml(unit.summary || '') +
        '</p>' +
        '</div>' +
        (unitDone ? '<span class="pratica-unit-badge">' + escapeHtml(t('unitDone', 'Completo')) + '</span>' : '') +
        '</div>' +
        '<ul class="pratica-lessons">';

      (unit.lessons || []).forEach(function (lesson, li) {
        var lessonUnlocked = unlocked && (li === 0 || progress.done[unit.lessons[li - 1].id]);
        var done = !!progress.done[lesson.id];
        var exCount = (lesson.exercises || []).length;
        html +=
          '<li>' +
          (lessonUnlocked
            ? '<a class="pratica-lesson-link' +
              (done ? ' is-done' : '') +
              '" href="/vida/sala/pratica.html?lesson=' +
              encodeURIComponent(lesson.id) +
              '">' +
              '<span class="pratica-lesson-title">' +
              escapeHtml(lesson.title) +
              '</span>' +
              '<span class="pratica-lesson-meta">' +
              exCount +
              ' ' +
              escapeHtml(t('exercisesShort', 'exercícios')) +
              (done ? ' · ' + escapeHtml(t('lessonDone', 'Feito')) : '') +
              '</span>' +
              '</a>'
            : '<span class="pratica-lesson-link is-locked" aria-disabled="true">' +
              '<span class="pratica-lesson-title">' +
              escapeHtml(lesson.title) +
              '</span>' +
              '<span class="pratica-lesson-meta">' +
              escapeHtml(t('locked', 'Complete a lição anterior')) +
              '</span>' +
              '</span>') +
          '</li>';
      });

      html += '</ul></li>';
    });

    html += '</ol></section>';
    root.innerHTML = html;
    bindLangPicker(root, curriculum, function () {
      renderHub(curriculum, progress);
    });
  }

  function promptForExercise(ex, lang) {
    var key = ex.promptKey || 'promptTranslate';
    if (key === 'promptTranslate') {
      var langName = lang === 'es' ? 'Español' : 'English';
      return t('promptTranslate', 'Como se diz «{word}» em {lang}?')
        .replace('{word}', ex.pt || '')
        .replace('{lang}', langName);
    }
    if (key === 'promptTap') return t('promptTap', 'Toque a palavra certa.');
    if (key === 'promptMatch') {
      var ln = lang === 'es' ? 'Español' : 'English';
      return t('promptMatch', 'Ligue cada palavra ao {lang}.').replace('{lang}', ln);
    }
    if (key === 'promptRead' || ex.type === 'read_pass') {
      return ex.prompt || t('promptRead', 'Leia com calma — depois continue.');
    }
    return '';
  }

  function optionsForMc(ex, lang) {
    return lang === 'es' ? ex.optionsEs || [] : ex.optionsEn || [];
  }

  function renderExercise(ex, index, total, lang) {
    var prompt = promptForExercise(ex, lang);
    var html =
      '<div class="pratica-exercise" data-exercise-index="' +
      index +
      '">' +
      '<p class="pratica-exercise-step">' +
      escapeHtml(t('stepOf', 'Passo {n} de {total}'))
        .replace('{n}', String(index + 1))
        .replace('{total}', String(total)) +
      '</p>' +
      '<h2 class="pratica-exercise-prompt">' +
      escapeHtml(prompt) +
      '</h2>';

    if (ex.type === 'translate_mc') {
      html += '<div class="pratica-mc-options">';
      optionsForMc(ex, lang).forEach(function (opt, oi) {
        html +=
          '<button type="button" class="pratica-option" data-mc-opt="' +
          oi +
          '">' +
          escapeHtml(opt) +
          '</button>';
      });
      html += '</div>';
    } else if (ex.type === 'tap_word') {
      var parts = String(ex.sentencePt || '').split(ex.blankToken || '___');
      html += '<p class="pratica-tap-sentence">';
      if (parts[0]) html += '<span>' + escapeHtml(parts[0]) + '</span>';
      html += '<span class="pratica-tap-blank" data-tap-blank>___</span>';
      if (parts[1]) html += '<span>' + escapeHtml(parts[1]) + '</span>';
      html += '</p><div class="pratica-tap-options">';
      (ex.optionsPt || []).forEach(function (opt) {
        html +=
          '<button type="button" class="pratica-chip" data-tap-word="' +
          escapeHtml(opt) +
          '">' +
          escapeHtml(opt) +
          '</button>';
      });
      html += '</div>';
    } else if (ex.type === 'match_pairs') {
      html += '<div class="pratica-match" data-match-root>';
      html += '<div class="pratica-match-col" data-match-pt>';
      (ex.pairs || []).forEach(function (pair, pi) {
        html +=
          '<button type="button" class="pratica-match-item" data-match-side="pt" data-match-i="' +
          pi +
          '">' +
          escapeHtml(pair.pt) +
          '</button>';
      });
      html += '</div><div class="pratica-match-col" data-match-target>';
      var shuffled = (ex.pairs || [])
        .map(function (p, i) {
          return { i: i, label: lang === 'es' ? p.es : p.en };
        })
        .sort(function () {
          return Math.random() - 0.5;
        });
      shuffled.forEach(function (item) {
        html +=
          '<button type="button" class="pratica-match-item" data-match-side="target" data-match-i="' +
          item.i +
          '">' +
          escapeHtml(item.label) +
          '</button>';
      });
      html += '</div></div>';
      html += '<p class="pratica-match-hint">' + escapeHtml(t('matchHint', 'Toque um par de cada lado.')) + '</p>';
    } else if (ex.type === 'read_pass') {
      var lines = Array.isArray(ex.lines) ? ex.lines : [];
      var body = ex.body || '';
      html += '<article class="pratica-read-card" data-learn-root>';
      if (ex.kicker) {
        html += '<p class="pratica-read-kicker">' + escapeHtml(ex.kicker) + '</p>';
      }
      if (ex.title) {
        html += '<h3 class="pratica-read-title">' + escapeHtml(ex.title) + '</h3>';
      }
      if (lines.length) {
        html += '<div class="pratica-read-poem">';
        lines.forEach(function (line) {
          html += '<p>' + escapeHtml(line) + '</p>';
        });
        html += '</div>';
      } else if (body) {
        html += '<p class="pratica-read-body">' + escapeHtml(body) + '</p>';
      }
      if (ex.credit) {
        html += '<p class="pratica-read-credit">' + escapeHtml(ex.credit) + '</p>';
      }
      if (ex.legal) {
        html += '<p class="pratica-read-legal">' + escapeHtml(ex.legal) + '</p>';
      }
      if (ex.linkHref && ex.linkLabel) {
        html +=
          '<p class="pratica-read-link"><a href="' +
          escapeHtml(ex.linkHref) +
          '">' +
          escapeHtml(ex.linkLabel) +
          '</a></p>';
      }
      html += '</article>';
    }

    var continueHidden = ex.type === 'read_pass' ? '' : ' hidden';
    html +=
      '<p class="pratica-feedback" aria-live="polite" hidden></p>' +
      '<button type="button" class="botao botao-home pratica-continue"' +
      continueHidden +
      '>' +
      escapeHtml(ex.type === 'read_pass' ? t('readContinue', 'Li — continuar') : t('continueBtn', 'Continuar')) +
      '</button>' +
      '</div>';
    return html;
  }

  function renderLessonSession(curriculum, progress, lessonId) {
    var mount = $('#pratica-root');
    if (!mount) return;

    var found = findLesson(curriculum, lessonId);
    if (!found) {
      mount.innerHTML =
        '<p class="sala-empty">' +
        escapeHtml(t('notFound', 'Lição não encontrada.')) +
        ' <a class="sala-back" href="/vida/sala/pratica.html">' +
        escapeHtml(t('backPath', 'Voltar à trilha')) +
        '</a></p>';
      return;
    }

    var lesson = found.lesson;
    var unit = found.unit;
    var exercises = lesson.exercises || [];
    var maxHearts = curriculum.maxHearts || 5;
    if (progress.hearts == null || progress.hearts <= 0) {
      progress.hearts = maxHearts;
      saveProgress(progress);
    }

    var state = {
      index: 0,
      correct: 0,
      hearts: progress.hearts == null ? maxHearts : progress.hearts,
      streak: 0,
      matchSelected: null,
      matchDone: {}
    };

    function renderSessionHeader() {
      var pct = exercises.length ? Math.round((state.index / exercises.length) * 100) : 0;
      var heartsHtml = '';
      for (var h = 0; h < maxHearts; h++) {
        heartsHtml +=
          '<span class="pratica-heart' +
          (h < state.hearts ? ' is-full' : '') +
          '" aria-hidden="true"></span>';
      }
      return (
        '<div class="pratica-session-top">' +
        '<a class="sala-back" href="/vida/sala/pratica.html">' +
        escapeHtml(t('backPath', '← Trilha')) +
        '</a>' +
        '<div class="pratica-session-meta">' +
        '<div class="pratica-hearts" aria-label="' +
        escapeHtml(t('heartsAria', 'Vidas')) +
        '">' +
        heartsHtml +
        '</div>' +
        (state.streak > 1
          ? '<span class="pratica-streak">' +
            state.streak +
            ' ' +
            escapeHtml(t('streakLabel', 'seguidas')) +
            '</span>'
          : '') +
        '</div>' +
        '</div>' +
        '<div class="pratica-lesson-bar" aria-hidden="true">' +
        '<div class="pratica-lesson-bar-fill" style="width:' +
        pct +
        '%"></div>' +
        '</div>' +
        '<p class="pratica-lesson-kicker">' +
        escapeHtml(unit.title) +
        '</p>' +
        '<h1 class="pratica-lesson-title">' +
        escapeHtml(lesson.title) +
        '</h1>'
      );
    }

    function showComplete() {
      progress.done[lesson.id] = {
        at: new Date().toISOString(),
        score: state.correct + '/' + exercises.length
      };
      progress.hearts = maxHearts;
      saveProgress(progress);

      var nextId = nextLessonId(curriculum, lesson.id);
      mount.innerHTML =
        renderSessionHeader() +
        '<section class="pratica-complete">' +
        '<div class="pratica-complete-badge" aria-hidden="true"></div>' +
        '<h2>' +
        escapeHtml(t('completeTitle', 'Lição completa!')) +
        '</h2>' +
        '<p>' +
        escapeHtml(
          t('completeBody', 'Você acertou {n} de {total}. Muito bem!')
            .replace('{n}', String(state.correct))
            .replace('{total}', String(exercises.length))
        ) +
        '</p>' +
        '<div class="sala-lesson-nav">' +
        '<a class="botao botao-home botao-home--secondary" href="/vida/sala/pratica.html">' +
        escapeHtml(t('backPath', 'Trilha')) +
        '</a>' +
        (nextId
          ? '<a class="botao botao-home" href="/vida/sala/pratica.html?lesson=' +
            encodeURIComponent(nextId) +
            '">' +
            escapeHtml(t('nextLesson', 'Próxima lição')) +
            '</a>'
          : '<a class="botao botao-home" href="/vida/sala/">' +
            escapeHtml(t('backSala', 'Voltar à sala')) +
            '</a>') +
        '</div></section>';
    }

    function renderCurrent() {
      if (state.index >= exercises.length) {
        showComplete();
        return;
      }
      var lang = getTargetLang();
      mount.innerHTML =
        renderSessionHeader() + renderExercise(exercises[state.index], state.index, exercises.length, lang);
      bindCurrent(exercises[state.index]);
    }

    function showFeedback(ok, msg) {
      var fb = $('.pratica-feedback', mount);
      var cont = $('.pratica-continue', mount);
      if (fb) {
        fb.hidden = false;
        fb.className = 'pratica-feedback ' + (ok ? 'is-ok' : 'is-bad');
        fb.textContent = msg;
      }
      if (cont) cont.hidden = false;
    }

    function bindCurrent(ex) {
      var cont = $('.pratica-continue', mount);
      if (cont) {
        cont.addEventListener('click', function () {
          if (ex.type === 'read_pass' && mount.getAttribute('data-locked') !== '1') {
            mount.setAttribute('data-locked', '1');
            state.correct += 1;
            state.streak += 1;
          }
          state.index += 1;
          state.matchSelected = null;
          state.matchDone = {};
          mount.removeAttribute('data-locked');
          renderCurrent();
        });
      }

      if (ex.type === 'read_pass') {
        return;
      }

      if (ex.type === 'translate_mc') {
        mount.querySelectorAll('[data-mc-opt]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            if (mount.getAttribute('data-locked') === '1') return;
            var oi = parseInt(btn.getAttribute('data-mc-opt'), 10);
            var ok = oi === ex.answer;
            mount.querySelectorAll('[data-mc-opt]').forEach(function (b) {
              b.disabled = true;
              var idx = parseInt(b.getAttribute('data-mc-opt'), 10);
              if (idx === ex.answer) b.classList.add('is-correct');
              else if (b === btn) b.classList.add('is-wrong');
            });
            handleAnswer(ok, false);
          });
        });
      } else if (ex.type === 'tap_word') {
        mount.querySelectorAll('[data-tap-word]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            if (mount.getAttribute('data-locked') === '1') return;
            var word = btn.getAttribute('data-tap-word');
            var ok = word === ex.answerPt;
            var blank = $('[data-tap-blank]', mount);
            if (blank) blank.textContent = word;
            mount.querySelectorAll('[data-tap-word]').forEach(function (b) {
              b.disabled = true;
              if (b.getAttribute('data-tap-word') === ex.answerPt) b.classList.add('is-correct');
              else if (b === btn) b.classList.add('is-wrong');
            });
            handleAnswer(ok, false);
          });
        });
      } else if (ex.type === 'match_pairs') {
        var matchRoot = $('[data-match-root]', mount);
        if (!matchRoot) return;
        matchRoot.querySelectorAll('.pratica-match-item').forEach(function (btn) {
          btn.addEventListener('click', function () {
            if (mount.getAttribute('data-locked') === '1') return;
            if (btn.classList.contains('is-matched')) return;
            var side = btn.getAttribute('data-match-side');
            var idx = btn.getAttribute('data-match-i');
            if (state.matchSelected && state.matchSelected.side === side) {
              state.matchSelected.el.classList.remove('is-selected');
              state.matchSelected = null;
            }
            if (!state.matchSelected) {
              btn.classList.add('is-selected');
              state.matchSelected = { side: side, idx: idx, el: btn };
              return;
            }
            if (state.matchSelected.side === side) {
              state.matchSelected.el.classList.remove('is-selected');
              btn.classList.add('is-selected');
              state.matchSelected = { side: side, idx: idx, el: btn };
              return;
            }
            var first = state.matchSelected;
            var matchOk = first.idx === idx;
            first.el.classList.remove('is-selected');
            state.matchSelected = null;
            if (matchOk) {
              first.el.classList.add('is-matched');
              btn.classList.add('is-matched');
              state.matchDone[idx] = true;
              var totalPairs = (ex.pairs || []).length;
              if (Object.keys(state.matchDone).length >= totalPairs) {
                mount.setAttribute('data-locked', '1');
                handleAnswer(true, false);
              }
            } else {
              first.el.classList.add('is-wrong');
              btn.classList.add('is-wrong');
              setTimeout(function () {
                first.el.classList.remove('is-wrong');
                btn.classList.remove('is-wrong');
              }, 500);
              handleAnswer(false, true);
            }
          });
        });
      }

      function handleAnswer(ok, partial) {
        if (!ok && partial) {
          state.streak = 0;
          state.hearts = Math.max(0, state.hearts - 1);
          progress.hearts = state.hearts;
          saveProgress(progress);
          var heartsWrap = $('.pratica-hearts', mount);
          if (heartsWrap) {
            heartsWrap.innerHTML = '';
            for (var hi = 0; hi < maxHearts; hi++) {
              heartsWrap.innerHTML +=
                '<span class="pratica-heart' +
                (hi < state.hearts ? ' is-full' : '') +
                '" aria-hidden="true"></span>';
            }
          }
          if (state.hearts <= 0) {
            setTimeout(function () {
              mount.innerHTML =
                renderSessionHeader() +
                '<section class="pratica-empty-hearts">' +
                '<h2>' +
                escapeHtml(t('noHeartsTitle', 'Pausa para respirar')) +
                '</h2>' +
                '<p>' +
                escapeHtml(t('noHeartsBody', 'Sem vidas agora. Volte à trilha e tente de novo.')) +
                '</p>' +
                '<a class="botao botao-home" href="/vida/sala/pratica.html">' +
                escapeHtml(t('backPath', 'Voltar à trilha')) +
                '</a></section>';
            }, 600);
          }
          return;
        }

        mount.setAttribute('data-locked', '1');
        if (ok) {
          state.correct += 1;
          state.streak += 1;
          showFeedback(true, t('feedbackOk', 'Muito bem!'));
        } else {
          state.streak = 0;
          state.hearts = Math.max(0, state.hearts - 1);
          progress.hearts = state.hearts;
          saveProgress(progress);
          showFeedback(false, t('feedbackBad', 'Quase! Tenta outra vez na próxima.'));
          if (state.hearts <= 0) {
            setTimeout(function () {
              mount.innerHTML =
                renderSessionHeader() +
                '<section class="pratica-empty-hearts">' +
                '<h2>' +
                escapeHtml(t('noHeartsTitle', 'Pausa para respirar')) +
                '</h2>' +
                '<p>' +
                escapeHtml(t('noHeartsBody', 'Sem vidas agora. Volte à trilha e tente de novo.')) +
                '</p>' +
                '<a class="botao botao-home" href="/vida/sala/pratica.html">' +
                escapeHtml(t('backPath', 'Voltar à trilha')) +
                '</a></section>';
            }, 800);
          }
        }
      }
    }

    renderCurrent();
  }

  function boot() {
    var page = (document.body && document.body.dataset.page) || '';
    if (page !== 'sala-pratica') return;

    fetch(DATA_URL + '?_=' + Date.now(), { cache: 'no-store', credentials: 'same-origin' })
      .then(function (res) {
        return res.ok ? res.json() : null;
      })
      .then(function (curriculum) {
        if (!curriculum) {
          var fail = $('#pratica-root');
          if (fail) fail.innerHTML = '<p class="sala-empty">' + escapeHtml(t('loadError', 'Não foi possível carregar.')) + '</p>';
          return;
        }
        var progress = loadProgress();
        var params = new URLSearchParams(window.location.search || '');
        var lessonId = params.get('lesson') || '';
        if (lessonId) {
          renderLessonSession(curriculum, progress, lessonId);
        } else {
          renderHub(curriculum, progress);
        }
      })
      .catch(function () {
        var fail = $('#pratica-root');
        if (fail) fail.innerHTML = '<p class="sala-empty">' + escapeHtml(t('loadError', 'Não foi possível carregar.')) + '</p>';
      });
  }

  function getHubSnippet() {
    return fetch(DATA_URL, { cache: 'default', credentials: 'same-origin' })
      .then(function (res) {
        return res.ok ? res.json() : null;
      })
      .then(function (curriculum) {
        if (!curriculum) return null;
        var progress = loadProgress();
        return countDone(curriculum, progress);
      })
      .catch(function () {
        return null;
      });
  }

  window.BudGanjaSalaPratica = { getHubSnippet: getHubSnippet, loadProgress: loadProgress, countDone: countDone };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
