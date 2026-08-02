/**
 * Modo Aprender — traduz palavra a palavra com morph letra a letra
 * + tip de frase. Auto-ativa em Vida e posts de inspeção.
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
    scope: null,
    toolbar: null,
    tip: null,
    activeWord: null,
    timers: new WeakMap(),
    reducedMotion: false,
    forcedPtBody: false
  };

  var TITLE_SEL =
    '.vida-hero-brand, .vida-hero h1, .vida-hero-sub, .vida-note, ' +
    '.article-header h1, .article-header [data-post-title], .article-header .article-eyebrow, ' +
    '#main-content > h1, .conteudo > h1, .conteudo-interno > h1, ' +
    'h1, h2, h3, h4, h5';

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

  function ensureTip() {
    if (state.tip) return state.tip;
    var tip = document.createElement('div');
    tip.className = 'learn-phrase-tip';
    tip.setAttribute('role', 'status');
    tip.setAttribute('aria-live', 'polite');
    tip.hidden = true;
    document.body.appendChild(tip);
    state.tip = tip;
    return tip;
  }

  function hideTip() {
    if (!state.tip) return;
    state.tip.classList.remove('is-visible');
    state.tip.hidden = true;
  }

  function showPhraseTip(wordEl) {
    var g = glossary();
    if (!g || !state.lang) return;
    var block = wordEl.closest(
      'p, li, h1, h2, h3, h4, h5, blockquote, td, th, .vida-quote, .vida-section-lead, .vida-lesson, figcaption'
    );
    if (!block) return;
    var src =
      block.getAttribute('data-learn-phrase-src') ||
      block.textContent ||
      '';
    src = String(src).replace(/\s+/g, ' ').trim();
    if (!src || src.length < 2) return;

    var phrase = g.translatePhrase ? g.translatePhrase(src, state.lang) : '';
    if (!phrase || phrase === src) return;

    var tip = ensureTip();
    var label = state.lang === 'es' ? 'Español' : 'English';
    tip.innerHTML =
      '<strong>' +
      label +
      '</strong>' +
      '<span></span>';
    tip.querySelector('span').textContent = phrase;
    tip.hidden = false;

    var rect = wordEl.getBoundingClientRect();
    var tipW = Math.min(448, global.innerWidth - 24);
    var left = Math.max(12, Math.min(rect.left, global.innerWidth - tipW - 12));
    var top = rect.bottom + 8;
    if (top + 96 > global.innerHeight) top = Math.max(12, rect.top - 96);
    tip.style.width = tipW + 'px';
    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
    tip.classList.add('is-visible');
  }

  function markPhraseSources(root) {
    root
      .querySelectorAll(
        'p, li, h1, h2, h3, h4, h5, blockquote, td, th, .vida-quote, .vida-section-lead, .vida-lesson, figcaption'
      )
      .forEach(function (el) {
        if (el.getAttribute('data-learn-phrase-src')) return;
        if (el.closest('[data-learn-skip], .learn-toolbar, a.botao')) return;
        var text = (el.textContent || '').replace(/\s+/g, ' ').trim();
        if (text) el.setAttribute('data-learn-phrase-src', text);
      });
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
      showPhraseTip(wordEl);
      return;
    }

    var chars = Array.from(splitWordChars(wordEl));
    var maxLen = Math.max(src.length, target.length);
    var charset = scrambleCharset(state.lang);

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
      var steps = finalCh ? 1 + (i % 2) : 0;
      var step = 0;
      var delay = i * 12;

      schedule(wordEl, function tick() {
        if (step < steps && finalCh) {
          var upper = finalCh !== finalCh.toLowerCase();
          span.textContent = /[A-Za-zÀ-ÿ]/.test(finalCh)
            ? randomChar(charset, upper)
            : finalCh;
          step += 1;
          schedule(wordEl, tick, 14);
          return;
        }
        span.textContent = finalCh;
        if (!finalCh) span.classList.add('learn-char--fade');
        if (i === maxLen - 1) {
          schedule(wordEl, function () {
            setPlainText(wordEl, target);
            wordEl.classList.add('is-translated');
            showPhraseTip(wordEl);
          }, 20);
        }
      }, delay);
    });
  }

  function revertWord(wordEl) {
    var src = wordEl.getAttribute('data-learn-src') || '';
    if (!src) return;
    if (
      (wordEl.getAttribute('data-learn-shown') || src) === src &&
      !wordEl.classList.contains('is-translated')
    ) {
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
    schedule(wordEl, function () {
      setPlainText(wordEl, src);
      wordEl.removeAttribute('data-learn-shown');
      wordEl.removeAttribute('aria-label');
    }, 40);
  }

  function activateWord(wordEl) {
    if (!wordEl || !state.lang) return;
    if (state.activeWord === wordEl) {
      showPhraseTip(wordEl);
      return;
    }
    if (state.activeWord) revertWord(state.activeWord);
    state.activeWord = wordEl;
    var src = wordEl.getAttribute('data-learn-src') || '';
    var g = glossary();
    var translated = g ? g.lookup(src, state.lang) : '';
    if (!translated) {
      wordEl.classList.add('is-sheen', 'is-unknown');
      showPhraseTip(wordEl);
      schedule(wordEl, function () {
        wordEl.classList.remove('is-sheen');
      }, 160);
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
    if (
      el.closest &&
      el.closest(
        '.learn-toolbar, .learn-word, .learn-phrase-tip, a.botao, .vida-hero-actions, .vida-cta-row, .article-share, .voltar-link'
      )
    ) {
      return true;
    }
    if (el.closest && el.closest('[data-learn-skip]')) return true;
    return false;
  }

  function walk(root) {
    if (!root) return;
    markPhraseSources(root);
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentNode;
        if (!parent || shouldSkip(parent)) return NodeFilter.FILTER_REJECT;
        if (parent.closest && parent.closest('.learn-toolbar')) {
          return NodeFilter.FILTER_REJECT;
        }
        if (!node.nodeValue || !/\S/.test(node.nodeValue)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    var n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(wrapTextNode);
  }

  function collectWalkRoots() {
    var roots = [];
    var seen = typeof WeakSet !== 'undefined' ? new WeakSet() : null;

    function add(el) {
      if (!el || el.nodeType !== 1) return;
      if (el.closest && el.closest('.learn-toolbar, [data-learn-skip], a.botao')) return;
      if (seen) {
        if (seen.has(el)) return;
        seen.add(el);
      } else if (roots.indexOf(el) !== -1) {
        return;
      }
      roots.push(el);
    }

    add(state.root);

    // Títulos e cabeçalhos (hero, posts, secções) — mesmo fora do data-learn-root.
    var scope = state.scope || document.getElementById('main-content') || document.body;
    if (scope && scope.querySelectorAll) {
      scope.querySelectorAll(TITLE_SEL).forEach(add);
    }

    return roots;
  }

  function walkAll() {
    collectWalkRoots().forEach(walk);
    if (state.scope) state.scope.classList.add('learn-mode-on');
    if (state.root) state.root.classList.add('learn-mode-on');
  }

  function unwrapAll() {
    var scope = state.scope || state.root || document;
    scope.querySelectorAll('.learn-word').forEach(function (el) {
      clearTimers(el);
      var text = el.getAttribute('data-learn-src') || el.textContent || '';
      el.replaceWith(document.createTextNode(text));
    });
    if (scope.normalize) scope.normalize();
    if (state.scope) state.scope.classList.remove('learn-mode-on');
    if (state.root) state.root.classList.remove('learn-mode-on');
  }

  function forcePtTitles() {
    document.querySelectorAll('[data-post-title]').forEach(function (el) {
      var pt = (el.getAttribute('data-title-pt') || '').trim();
      if (pt) el.textContent = pt;
    });
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
          'Passe pelas palavras: o brilho traduz e mostra a frase em español.'
        );
      } else {
        hint.textContent = t(
          'pages.vida.learnHintEn',
          'Pass over words: the gold sheen translates and shows the English phrase.'
        );
      }
    }
    var label = state.toolbar.querySelector('[data-learn-label]');
    if (label) {
      label.textContent = t('pages.vida.learnLabel', 'Aprender idiomas');
    }
  }

  function forcePtPostBody() {
    var bodies = document.querySelectorAll('[data-post-body]');
    if (!bodies.length) return null;
    var pt = document.querySelector('[data-post-body][data-locale="pt-BR"]');
    if (!pt) return null;
    bodies.forEach(function (b) {
      var show = b === pt;
      b.hidden = !show;
      if (show) b.removeAttribute('hidden');
      else b.setAttribute('hidden', '');
    });
    state.forcedPtBody = true;
    return pt;
  }

  function restorePostBodies() {
    if (!state.forcedPtBody) return;
    state.forcedPtBody = false;
    if (global.BudGanjaI18n && typeof global.BudGanjaI18n.apply === 'function') {
      global.BudGanjaI18n.apply();
    }
  }

  function setLang(lang) {
    var next = lang === 'en' || lang === 'es' ? lang : '';
    if (next === state.lang) return;
    state.lang = next;
    saveLang(next);
    state.activeWord = null;
    state.reducedMotion = prefersReducedMotion();
    hideTip();

    if (!state.root && !state.scope) return;

    if (!next) {
      document.body.classList.remove('learn-mode-active');
      unwrapAll();
      restorePostBodies();
    } else {
      if (state.root && (state.root.getAttribute('data-post-body') != null || document.querySelector('[data-post-body]'))) {
        var pt = forcePtPostBody();
        if (pt && pt !== state.root) {
          state.root = pt;
          if (!pt.hasAttribute('data-learn-root')) pt.setAttribute('data-learn-root', '');
        }
        forcePtTitles();
      }
      unwrapAll();
      walkAll();
      document.body.classList.add('learn-mode-active');
    }
    syncToolbar();
  }

  function wordFromEvent(e) {
    if (!state.lang) return null;
    var word = e.target && e.target.closest ? e.target.closest('.learn-word') : null;
    if (!word) return null;
    if (state.scope && !state.scope.contains(word) && state.root && !state.root.contains(word)) {
      return null;
    }
    return word;
  }

  function clearTextSelection() {
    try {
      var sel = global.getSelection && global.getSelection();
      if (sel && sel.removeAllRanges) sel.removeAllRanges();
    } catch (err) { /* ignore */ }
  }

  function isLearnContentTarget(target) {
    if (!target || !target.closest) return false;
    return !!(
      target.closest('.learn-word') ||
      target.closest('.learn-mode-on') ||
      target.closest('[data-learn-root]')
    );
  }

  function onSelectStart(e) {
    if (!state.lang) return;
    if (isLearnContentTarget(e.target)) e.preventDefault();
  }

  function onCopyCutPaste(e) {
    if (!state.lang) return;
    if (isLearnContentTarget(e.target)) e.preventDefault();
  }

  function onContextMenu(e) {
    if (!state.lang) return;
    if (isLearnContentTarget(e.target)) e.preventDefault();
  }

  function onPointerDown(e) {
    var word = wordFromEvent(e);
    if (!word) return;
    // Limpa seleção nativa para o toque traduzir em vez de abrir Copiar/Colar.
    clearTextSelection();
    activateWord(word);
  }

  function onPointerOver(e) {
    var word = wordFromEvent(e);
    if (!word) return;
    activateWord(word);
  }

  function onPointerOut(e) {
    if (!state.lang || !state.activeWord) return;
    var related = e.relatedTarget;
    if (related && state.activeWord.contains(related)) return;
    if (related && related.closest && related.closest('.learn-word') === state.activeWord) {
      return;
    }
    var leaving = state.activeWord;
    schedule(leaving, function () {
      if (state.activeWord === leaving) {
        revertWord(leaving);
        state.activeWord = null;
        hideTip();
      }
    }, 80);
  }

  function onFocusIn(e) {
    if (!state.lang) return;
    var word = e.target && e.target.closest ? e.target.closest('.learn-word') : null;
    if (word) activateWord(word);
  }

  function onFocusOut() {
    if (!state.lang || !state.activeWord) return;
    var leaving = state.activeWord;
    schedule(leaving, function () {
      if (state.activeWord === leaving) {
        revertWord(leaving);
        state.activeWord = null;
        hideTip();
      }
    }, 80);
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

  function resolveRoot() {
    var explicit = document.querySelector('[data-learn-root]');
    if (explicit) return explicit;

    var page = (document.body && document.body.dataset.page) || '';
    var slug = (document.body && document.body.dataset.postSlug) || '';
    var isInspecao = page === 'inspecao' || slug.indexOf('inspecao') === 0;

    if (isInspecao) {
      var pt = document.querySelector('[data-post-body][data-locale="pt-BR"]');
      if (pt) {
        pt.setAttribute('data-learn-root', '');
        return pt;
      }
      var main = document.querySelector('#main-content');
      if (main) {
        main.setAttribute('data-learn-root', '');
        return main;
      }
    }

    if (page === 'vida') {
      var vida = document.querySelector('#main-content');
      if (vida) {
        vida.setAttribute('data-learn-root', '');
        return vida;
      }
    }

    return null;
  }

  function placeToolbar(root) {
    var mount = document.querySelector('[data-learn-toolbar]');
    if (mount) {
      mount.appendChild(state.toolbar);
      return;
    }
    if (root.getAttribute('data-post-body') != null) {
      var main = document.getElementById('main-content');
      var header = main && main.querySelector('.article-header');
      if (header && header.parentNode) {
        header.parentNode.insertBefore(state.toolbar, header.nextSibling);
        return;
      }
    }
    root.insertBefore(state.toolbar, root.firstChild);
  }

  function init() {
    var root = resolveRoot();
    if (!root) return;

    state.root = root;
    state.scope = document.getElementById('main-content') || root;
    state.reducedMotion = prefersReducedMotion();
    state.toolbar = buildToolbar();
    placeToolbar(root);

    state.toolbar.addEventListener('click', onToolbarClick);
    // Eventos no main: cobre corpo + títulos do hero/header.
    state.scope.addEventListener('pointerover', onPointerOver);
    state.scope.addEventListener('pointerout', onPointerOut);
    state.scope.addEventListener('pointerdown', onPointerDown);
    state.scope.addEventListener('focusin', onFocusIn);
    state.scope.addEventListener('focusout', onFocusOut);
    state.scope.addEventListener('selectstart', onSelectStart);
    state.scope.addEventListener('copy', onCopyCutPaste);
    state.scope.addEventListener('cut', onCopyCutPaste);
    state.scope.addEventListener('paste', onCopyCutPaste);
    state.scope.addEventListener('contextmenu', onContextMenu);

    global.addEventListener('budganja:locale-change', function () {
      if (state.lang) {
        var keep = state.lang;
        state.lang = '';
        unwrapAll();
        state.lang = keep;
        if (document.querySelector('[data-post-body]')) {
          var pt = forcePtPostBody();
          if (pt) state.root = pt;
          forcePtTitles();
        }
        walkAll();
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
