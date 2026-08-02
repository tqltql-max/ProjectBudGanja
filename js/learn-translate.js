/**
 * Modo Aprender — traduz palavra a palavra com morph letra a letra
 * inspirado no brilho dourado (heroGoldSheen) que percorre o texto.
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'budganja-learn-lang';
  var WORD_RE = /([A-Za-zÀ-ÿ]+(?:['’-][A-Za-zÀ-ÿ]+)?)|([^A-Za-zÀ-ÿ]+)/g;
  var SKIP_TAGS = {
    SCRIPT: 1,
    STYLE: 1,
    TEXTAREA: 1,
    INPUT: 1,
    SELECT: 1,
    OPTION: 1,
    CODE: 1,
    PRE: 1,
    SVG: 1,
    BUTTON: 1
  };

  var state = {
    lang: '',
    root: null,
    toolbar: null,
    activeWord: null,
    timers: new WeakMap(),
    reducedMotion: false
  };

  function glossary() {
    return global.BudGanjaLearnGlossary || null;
  }

  function t(key, fallback) {
    if (global.BudGanjaI18n && typeof global.BudGanjaI18n.t === 'function') {
      return global.BudGanjaI18n.t(key, fallback);
    }
    return fallback;
  }

  function prefersReducedMotion() {
    try {
      return global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {
      return false;
    }
  }

  function loadLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY) || '';
      if (saved === 'en' || saved === 'es') return saved;
    } catch (e) { /* ignore */ }
    return '';
  }

  function saveLang(lang) {
    try {
      if (lang) localStorage.setItem(STORAGE_KEY, lang);
      else localStorage.removeItem(STORAGE_KEY);
    } catch (e) { /* ignore */ }
  }

  function clearTimers(el) {
    var bag = state.timers.get(el);
    if (!bag) return;
    bag.forEach(function (id) {
      global.clearTimeout(id);
    });
    state.timers.delete(el);
  }

  function schedule(el, fn, ms) {
    var id = global.setTimeout(fn, ms);
    var bag = state.timers.get(el);
    if (!bag) {
      bag = [];
      state.timers.set(el, bag);
    }
    bag.push(id);
    return id;
  }

  function scrambleCharset(lang) {
    return lang === 'es'
      ? 'abcdefghijklmnopqrstuvwxyzáéíóúñ'
      : 'abcdefghijklmnopqrstuvwxyz';
  }

  function randomChar(charset, preferUpper) {
    var ch = charset.charAt(Math.floor(Math.random() * charset.length));
    return preferUpper ? ch.toUpperCase() : ch;
  }

  function splitWordChars(wordEl) {
    var text = wordEl.getAttribute('data-learn-src') || wordEl.textContent || '';
    wordEl.textContent = '';
    wordEl.classList.add('learn-word--chars');
    var frag = document.createDocumentFragment();
    for (var i = 0; i < text.length; i++) {
      var span = document.createElement('span');
      span.className = 'learn-char';
      span.textContent = text.charAt(i);
      span.setAttribute('aria-hidden', 'true');
      frag.appendChild(span);
    }
    wordEl.appendChild(frag);
    return wordEl.querySelectorAll('.learn-char');
  }

  function setPlainText(wordEl, text) {
    clearTimers(wordEl);
    wordEl.classList.remove('learn-word--chars', 'is-sheen', 'is-translated');
    wordEl.textContent = text;
  }

  function morphTo(wordEl, target) {
    var src = wordEl.getAttribute('data-learn-src') || '';
    if (!target || target === src) return;

    clearTimers(wordEl);
    wordEl.classList.add('is-sheen');
    wordEl.setAttribute('data-learn-shown', target);
    wordEl.setAttribute('aria-label', src + ' → ' + target);

    if (state.reducedMotion) {
      wordEl.textContent = target;
      wordEl.classList.add('is-translated');
      wordEl.classList.remove('is-sheen');
      return;
    }

    var chars = Array.from(splitWordChars(wordEl));
    var maxLen = Math.max(src.length, target.length);
    var charset = scrambleCharset(state.lang);

    // Expand / shrink char spans to target length
    while (chars.length < maxLen) {
      var extra = document.createElement('span');
      extra.className = 'learn-char learn-char--grow';
      extra.textContent = '';
      extra.setAttribute('aria-hidden', 'true');
      wordEl.appendChild(extra);
      chars.push(extra);
    }

    chars.forEach(function (span, i) {
      var finalCh = i < target.length ? target.charAt(i) : '';
      var steps = 3 + (i % 4);
      var step = 0;
      var delay = i * 42;

      schedule(wordEl, function tick() {
        if (step < steps && finalCh) {
          var upper = finalCh !== finalCh.toLowerCase();
          span.textContent = /[A-Za-zÀ-ÿ]/.test(finalCh)
            ? randomChar(charset, upper)
            : finalCh;
          step += 1;
          schedule(wordEl, tick, 28);
          return;
        }
        span.textContent = finalCh;
        if (!finalCh) span.classList.add('learn-char--fade');
        if (i === maxLen - 1) {
          schedule(wordEl, function () {
            setPlainText(wordEl, target);
            wordEl.classList.add('is-translated');
          }, 80);
        }
      }, delay);
    });
  }

  function revertWord(wordEl) {
    var src = wordEl.getAttribute('data-learn-src') || '';
    if (!src) return;
    if ((wordEl.getAttribute('data-learn-shown') || src) === src && !wordEl.classList.contains('is-translated')) {
      return;
    }
    clearTimers(wordEl);
    wordEl.classList.add('is-sheen');
    if (state.reducedMotion) {
      setPlainText(wordEl, src);
      wordEl.removeAttribute('data-learn-shown');
      wordEl.removeAttribute('aria-label');
      return;
    }
    // Snap back with a short sheen (no full scramble on revert — keeps it snappy)
    schedule(wordEl, function () {
      setPlainText(wordEl, src);
      wordEl.removeAttribute('data-learn-shown');
      wordEl.removeAttribute('aria-label');
    }, 180);
  }

  function activateWord(wordEl) {
    if (!wordEl || !state.lang) return;
    if (state.activeWord === wordEl) return;
    if (state.activeWord) revertWord(state.activeWord);
    state.activeWord = wordEl;
    var src = wordEl.getAttribute('data-learn-src') || '';
    var g = glossary();
    var translated = g ? g.lookup(src, state.lang) : '';
    if (!translated) {
      wordEl.classList.add('is-sheen', 'is-unknown');
      schedule(wordEl, function () {
        wordEl.classList.remove('is-sheen');
      }, 500);
      return;
    }
    wordEl.classList.remove('is-unknown');
    morphTo(wordEl, translated);
  }

  function wrapTextNode(node) {
    var text = node.nodeValue;
    if (!text || !/\S/.test(text)) return;
    var g = glossary();
    if (!g) return;

    var frag = document.createDocumentFragment();
    var m;
    WORD_RE.lastIndex = 0;
    while ((m = WORD_RE.exec(text)) !== null) {
      if (m[1]) {
        var span = document.createElement('span');
        span.className = 'learn-word';
        span.setAttribute('data-learn-src', m[1]);
        span.setAttribute('tabindex', '0');
        if (g.has(m[1])) span.classList.add('learn-word--known');
        span.textContent = m[1];
        frag.appendChild(span);
      } else if (m[2]) {
        frag.appendChild(document.createTextNode(m[2]));
      }
    }
    if (node.parentNode) node.parentNode.replaceChild(frag, node);
  }

  function shouldSkip(el) {
    if (!el || el.nodeType !== 1) return true;
    if (SKIP_TAGS[el.tagName]) return true;
    if (el.closest && el.closest('.learn-toolbar, .learn-word, a.botao, .vida-hero-actions, .vida-cta-row')) {
      return true;
    }
    if (el.closest && el.closest('[data-learn-skip]')) return true;
    return false;
  }

  function walk(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentNode;
        if (!parent || shouldSkip(parent)) return NodeFilter.FILTER_REJECT;
        if (parent.closest && parent.closest('.learn-toolbar')) return NodeFilter.FILTER_REJECT;
        if (!node.nodeValue || !/\S/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    var n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(wrapTextNode);
  }

  function unwrapRoot(root) {
    if (!root) return;
    root.querySelectorAll('.learn-word').forEach(function (el) {
      clearTimers(el);
      var text = el.getAttribute('data-learn-src') || el.textContent || '';
      el.replaceWith(document.createTextNode(text));
    });
    root.normalize();
  }

  function syncToolbar() {
    if (!state.toolbar) return;
    state.toolbar.querySelectorAll('[data-learn-lang]').forEach(function (btn) {
      var lang = btn.getAttribute('data-learn-lang') || '';
      var on = lang === state.lang;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    var hint = state.toolbar.querySelector('[data-learn-hint]');
    if (hint) {
      if (!state.lang) {
        hint.textContent = t(
          'pages.vida.learnHintOff',
          'Escolhe English ou Español — depois passa o rato/dedo pelas palavras.'
        );
      } else if (state.lang === 'es') {
        hint.textContent = t(
          'pages.vida.learnHintEs',
          'Passe pelas palavras: o brilho dourado traduz para español, uma a uma.'
        );
      } else {
        hint.textContent = t(
          'pages.vida.learnHintEn',
          'Pass over the words: the gold sheen translates to English, one by one.'
        );
      }
    }
    var label = state.toolbar.querySelector('[data-learn-label]');
    if (label) {
      label.textContent = t('pages.vida.learnLabel', 'Aprender idiomas');
    }
  }

  function setLang(lang) {
    var next = lang === 'en' || lang === 'es' ? lang : '';
    if (next === state.lang) return;
    state.lang = next;
    saveLang(next);
    state.activeWord = null;
    state.reducedMotion = prefersReducedMotion();

    if (!state.root) return;

    if (!next) {
      state.root.classList.remove('learn-mode-on');
      document.body.classList.remove('learn-mode-active');
      unwrapRoot(state.root);
    } else {
      unwrapRoot(state.root);
      walk(state.root);
      state.root.classList.add('learn-mode-on');
      document.body.classList.add('learn-mode-active');
    }
    syncToolbar();
  }

  function onPointerOver(e) {
    if (!state.lang) return;
    var word = e.target && e.target.closest ? e.target.closest('.learn-word') : null;
    if (!word || !state.root.contains(word)) return;
    activateWord(word);
  }

  function onPointerOut(e) {
    if (!state.lang || !state.activeWord) return;
    var related = e.relatedTarget;
    if (related && state.activeWord.contains(related)) return;
    if (related && related.closest && related.closest('.learn-word') === state.activeWord) return;
    var leaving = state.activeWord;
    schedule(leaving, function () {
      if (state.activeWord === leaving) {
        revertWord(leaving);
        state.activeWord = null;
      }
    }, 220);
  }

  function onFocusIn(e) {
    if (!state.lang) return;
    var word = e.target && e.target.closest ? e.target.closest('.learn-word') : null;
    if (word) activateWord(word);
  }

  function onFocusOut(e) {
    if (!state.lang || !state.activeWord) return;
    var leaving = state.activeWord;
    schedule(leaving, function () {
      if (state.activeWord === leaving) {
        revertWord(leaving);
        state.activeWord = null;
      }
    }, 220);
  }

  function onToolbarClick(e) {
    var btn = e.target && e.target.closest ? e.target.closest('[data-learn-lang]') : null;
    if (!btn) return;
    e.preventDefault();
    var lang = btn.getAttribute('data-learn-lang') || '';
    setLang(lang === state.lang ? '' : lang);
  }

  function buildToolbar() {
    var bar = document.createElement('div');
    bar.className = 'learn-toolbar';
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', t('pages.vida.learnLabel', 'Aprender idiomas'));
    bar.innerHTML =
      '<div class="learn-toolbar-row">' +
      '<span class="learn-toolbar-label" data-learn-label></span>' +
      '<div class="learn-toolbar-actions">' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="" aria-pressed="true">Off</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="en" aria-pressed="false">English</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="es" aria-pressed="false">Español</button>' +
      '</div>' +
      '</div>' +
      '<p class="learn-toolbar-hint" data-learn-hint></p>';
    return bar;
  }

  function init() {
    var root = document.querySelector('[data-learn-root]');
    if (!root) return;

    state.root = root;
    state.reducedMotion = prefersReducedMotion();
    state.toolbar = buildToolbar();

    var mount = document.querySelector('[data-learn-toolbar]') || root;
    if (mount.hasAttribute && mount.hasAttribute('data-learn-toolbar')) {
      mount.appendChild(state.toolbar);
    } else {
      root.insertBefore(state.toolbar, root.firstChild);
    }

    state.toolbar.addEventListener('click', onToolbarClick);
    root.addEventListener('pointerover', onPointerOver);
    root.addEventListener('pointerout', onPointerOut);
    root.addEventListener('focusin', onFocusIn);
    root.addEventListener('focusout', onFocusOut);

    global.addEventListener('budganja:locale-change', function () {
      // Reaplica wraps se o i18n reescreveu texto no DOM.
      if (state.lang) {
        var keep = state.lang;
        state.lang = '';
        unwrapRoot(state.root);
        state.lang = keep;
        walk(state.root);
        state.root.classList.add('learn-mode-on');
      }
      syncToolbar();
    });

    var initial = loadLang();
    if (initial) setLang(initial);
    else syncToolbar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  global.BudGanjaLearnTranslate = {
    setLang: setLang,
    getLang: function () {
      return state.lang;
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
