/**
 * Drone de inspeção — segue o ponteiro em qualquer página,
 * sublinha a vermelho as palavras do glossário e mostra o significado
 * no idioma do site (ou no idioma do modo Aprender, se estiver ligado).
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'budganja-drone';
  var SIZE = 104;
  var CATCH = 72;
  var SKIP_SEL = 'script, style, textarea, input, select, option, code, pre, svg, button, a.botao, .site-drone, .inverno-drone, .learn-toolbar, #site-header, #site-footer, .header-bar, .mobile-menu';
  var WORD_CHARS = /[A-Za-zÀ-ÿ]/;
  var LANG_NAMES = {
    en: 'English', es: 'español', fr: 'français', it: 'italiano', de: 'Deutsch',
    yo: 'Yoruba', sw: 'Kiswahili', gez: "Ge'ez", el: 'Ellenika', la: 'Latina',
    nl: 'Nederlands', pl: 'polski', ru: 'russkiy', uk: 'ukrainska', zh: 'Zhongwen',
    ja: 'Nihongo', ko: 'Hangugeo', ar: 'Arabiyya', he: 'Ivrit', hi: 'Hindi',
    tr: 'Turkce', sv: 'svenska', da: 'dansk', no: 'norsk', fi: 'suomi',
    cs: 'cestina', ro: 'romana', hu: 'magyar', ca: 'catala', gl: 'galego',
    eu: 'euskara', gn: 'guarani', qu: 'runasimi', eo: 'Esperanto', vi: 'tiếng Việt',
    id: 'bahasa Indonesia', th: 'ไทย', hr: 'hrvatski', sk: 'slovenčina',
    ga: 'Gaeilge', cy: 'Cymraeg', ha: 'Hausa', am: 'Amharic', fa: 'فارسی',
    bn: 'বাংলা', zu: 'isiZulu', pt: 'português', 'pt-BR': 'português'
  };

  var state = {
    on: false,
    drone: null,
    tip: null,
    flying: false,
    following: false,
    caught: false,
    paused: false,
    reduced: false,
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    currentWord: null,
    currentSrc: '',
    wrapping: false
  };

  function t(key, fallback) {
    if (global.BudGanjaI18n && typeof global.BudGanjaI18n.t === 'function') {
      return global.BudGanjaI18n.t(key, fallback);
    }
    return fallback;
  }

  function assetVersion() {
    var scripts = document.querySelectorAll('script[src*="site-drone.js"], script[src*="layout.js"]');
    for (var i = 0; i < scripts.length; i++) {
      var m = String(scripts[i].src || '').match(/[?&]v=([^&]+)/);
      if (m) return m[1];
    }
    return '315';
  }

  function loadFlag() {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function saveFlag(on) {
    try {
      if (on) localStorage.setItem(STORAGE_KEY, '1');
      else localStorage.removeItem(STORAGE_KEY);
    } catch (e) { /* ignore */ }
  }

  function targetLang() {
    if (global.BudGanjaLearnTranslate && typeof global.BudGanjaLearnTranslate.getLang === 'function') {
      var learn = global.BudGanjaLearnTranslate.getLang();
      if (learn) return learn;
    }
    var loc = 'pt-BR';
    try {
      if (global.BudGanjaI18n && typeof global.BudGanjaI18n.getLocale === 'function') {
        loc = global.BudGanjaI18n.getLocale() || loc;
      }
    } catch (e) { /* ignore */ }
    if (loc === 'en') return 'en';
    if (loc === 'es') return 'es';
    return 'pt';
  }

  function isPt(lang) {
    return !lang || lang === 'pt' || lang === 'pt-BR';
  }

  function glossary() {
    return global.BudGanjaLearnGlossary || null;
  }

  function ensureGlossary(done) {
    if (glossary()) {
      done();
      return;
    }
    if (document.querySelector('script[src*="learn-glossary.js"]')) {
      var tries = 0;
      var wait = global.setInterval(function () {
        tries += 1;
        if (glossary() || tries > 40) {
          global.clearInterval(wait);
          done();
        }
      }, 50);
      return;
    }
    var script = document.createElement('script');
    script.src = '/js/learn-glossary.js?v=' + assetVersion();
    script.onload = done;
    script.onerror = done;
    document.body.appendChild(script);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function droneSvg() {
    return (
      '<svg class="site-drone-body" viewBox="0 0 120 88" width="120" height="88" aria-hidden="true">' +
      '<defs>' +
      '<linearGradient id="site-drone-hull" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#eef3f8"/>' +
      '<stop offset="42%" stop-color="#9aa7b6"/>' +
      '<stop offset="100%" stop-color="#2b333c"/>' +
      '</linearGradient>' +
      '<radialGradient id="site-drone-disc" cx="50%" cy="50%" r="50%">' +
      '<stop offset="0%" stop-color="rgba(244,247,251,0.06)"/>' +
      '<stop offset="62%" stop-color="rgba(226,193,90,0.16)"/>' +
      '<stop offset="100%" stop-color="rgba(226,193,90,0.55)"/>' +
      '</radialGradient>' +
      '</defs>' +
      '<ellipse cx="60" cy="80" rx="26" ry="5" fill="#05080c" opacity="0.42"/>' +
      '<g class="site-drone-craft">' +
      '<path d="M44 40 L26 24 M76 40 L94 24 M42 48 L20 60 M78 48 L100 60" fill="none" stroke="#3a4450" stroke-width="4.2" stroke-linecap="round"/>' +
      '<g transform="translate(26 24)"><circle r="13.5" fill="url(#site-drone-disc)"/><g class="site-drone-prop"><path d="M-12 0 H12 M0 -12 V12" fill="none" stroke="#f4e08a" stroke-width="1.35" stroke-linecap="round"/></g><circle r="3.4" fill="#12181f" stroke="#e2c15a" stroke-width="1.1"/></g>' +
      '<g transform="translate(94 24)"><circle r="13.5" fill="url(#site-drone-disc)"/><g class="site-drone-prop site-drone-prop--rev"><path d="M-12 0 H12 M0 -12 V12" fill="none" stroke="#f4e08a" stroke-width="1.35" stroke-linecap="round"/></g><circle r="3.4" fill="#12181f" stroke="#e2c15a" stroke-width="1.1"/></g>' +
      '<g transform="translate(20 60)"><circle r="13.5" fill="url(#site-drone-disc)"/><g class="site-drone-prop site-drone-prop--rev"><path d="M-12 0 H12 M0 -12 V12" fill="none" stroke="#f4e08a" stroke-width="1.35" stroke-linecap="round"/></g><circle r="3.4" fill="#12181f" stroke="#e2c15a" stroke-width="1.1"/></g>' +
      '<g transform="translate(100 60)"><circle r="13.5" fill="url(#site-drone-disc)"/><g class="site-drone-prop"><path d="M-12 0 H12 M0 -12 V12" fill="none" stroke="#f4e08a" stroke-width="1.35" stroke-linecap="round"/></g><circle r="3.4" fill="#12181f" stroke="#e2c15a" stroke-width="1.1"/></g>' +
      '<ellipse cx="60" cy="44" rx="23" ry="12" fill="url(#site-drone-hull)" stroke="#e2c15a" stroke-width="1.15"/>' +
      '<rect x="46" y="38" width="28" height="11" rx="4" fill="#10161c"/>' +
      '<path d="M49 43.5 H71" fill="none" stroke="#f0d24a" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M54 34 L60 26 L66 34" fill="#c9d3de" stroke="#e2c15a" stroke-width="0.9" stroke-linejoin="round"/>' +
      '<circle cx="74" cy="39" r="1.7" fill="#7ec8ff"/>' +
      '<g class="site-drone-cam"><circle cx="60" cy="58" r="7" fill="#0b1218" stroke="#e2c15a" stroke-width="1.7"/><circle cx="60" cy="58" r="3.6" fill="#1a3c4e"/><circle cx="58.2" cy="56.2" r="1.15" fill="#f4e08a" opacity="0.75"/></g>' +
      '</g></svg>'
    );
  }

  function meaningOf(src) {
    var g = glossary();
    if (!g || !src) return null;
    var entry = typeof g.findEntry === 'function' ? g.findEntry(src) : null;
    if (!entry) return null;
    var lang = targetLang();
    var translation = isPt(lang) ? '' : (g.lookup(src, lang, true) || '');
    return {
      src: src,
      lang: lang,
      translation: translation,
      gloss: entry.gloss || '',
      mundane: entry.mundane || '',
      category: entry.category || '',
      href: entry.href || '',
      tone: entry.tone || ''
    };
  }

  function fillTip(info) {
    if (!state.tip) return;
    if (!info) {
      state.tip.hidden = true;
      state.tip.innerHTML = '';
      return;
    }
    var langName = LANG_NAMES[info.lang] || info.lang;
    var parts = [];
    parts.push('<p class="site-drone-tip-word">' + escapeHtml(info.src) + '</p>');
    if (info.translation) {
      parts.push(
        '<p class="site-drone-tip-tr"><span>' + escapeHtml(langName) + '</span> ' +
        escapeHtml(info.translation) + '</p>'
      );
    } else if (!isPt(info.lang)) {
      parts.push(
        '<p class="site-drone-tip-missing">' +
        escapeHtml(t('common.droneNoTranslation', 'Sem tradução neste idioma — fica o sentido em português.')) +
        '</p>'
      );
    }
    if (info.category) {
      parts.push('<p class="site-drone-tip-cat">' + escapeHtml(info.category) + '</p>');
    }
    if (info.mundane) {
      parts.push(
        '<p class="site-drone-tip-mundane"><span>' +
        escapeHtml(t('pages.vida.learnMundane', 'Comum')) +
        '</span> ' + escapeHtml(info.mundane) + '</p>'
      );
    }
    if (info.gloss) {
      parts.push(
        '<p class="site-drone-tip-gloss"><span>' +
        escapeHtml(info.mundane ? t('pages.vida.learnLabGloss', 'BudGanja') : t('common.droneMeaning', 'Significado')) +
        '</span> ' + escapeHtml(info.gloss) + '</p>'
      );
    }
    if (!info.translation && !info.gloss && !info.mundane) {
      parts.push(
        '<p class="site-drone-tip-missing">' +
        escapeHtml(t('common.droneNoMeaning', 'Ainda não há ficha para esta palavra.')) +
        '</p>'
      );
    }
    if (info.href) {
      parts.push(
        '<a class="site-drone-tip-link" href="' + escapeHtml(info.href) + '">' +
        escapeHtml(t('common.droneOpenFicha', 'Abrir ficha')) + '</a>'
      );
    }
    state.tip.innerHTML = parts.join('');
    state.tip.hidden = false;
  }

  function shouldSkipNode(node) {
    var el = node.nodeType === 1 ? node : node.parentElement;
    if (!el || !el.closest) return true;
    if (el.closest(SKIP_SEL)) return true;
    if (el.closest('[data-learn-skip]')) return true;
    return false;
  }

  function rangeFromPoint(x, y) {
    if (document.caretRangeFromPoint) return document.caretRangeFromPoint(x, y);
    if (document.caretPositionFromPoint) {
      var pos = document.caretPositionFromPoint(x, y);
      if (!pos) return null;
      var range = document.createRange();
      range.setStart(pos.offsetNode, pos.offset);
      range.collapse(true);
      return range;
    }
    return null;
  }

  function wordBounds(text, offset) {
    var start = offset;
    var end = offset;
    while (start > 0 && WORD_CHARS.test(text.charAt(start - 1))) start -= 1;
    while (end < text.length && WORD_CHARS.test(text.charAt(end))) end += 1;
    if (start === end) return null;
    return { start: start, end: end, word: text.slice(start, end) };
  }

  function wrapAt(textNode, start, end, src) {
    var parent = textNode.parentNode;
    if (!parent) return null;
    var text = textNode.nodeValue;
    var span = document.createElement('span');
    span.className = 'learn-word learn-word--danger site-drone-mark';
    span.setAttribute('data-learn-src', src);
    span.setAttribute('data-drone-own', 'hover');
    span.textContent = text.slice(start, end);
    var before = text.slice(0, start);
    var after = text.slice(end);
    if (before) parent.insertBefore(document.createTextNode(before), textNode);
    parent.insertBefore(span, textNode);
    if (after) parent.insertBefore(document.createTextNode(after), textNode);
    parent.removeChild(textNode);
    return span;
  }

  function nearestMarked(clientX, clientY) {
    var nodes = document.querySelectorAll('.learn-word--danger, .learn-word[data-learn-tone="danger"], .site-drone-mark');
    var best = null;
    var bestD = CATCH;
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var r = el.getBoundingClientRect();
      if (!r.width && !r.height) continue;
      var cx = r.left + r.width / 2;
      var cy = r.top + r.height / 2;
      var d = Math.hypot(clientX - cx, clientY - cy);
      if (d < bestD) {
        bestD = d;
        best = el;
      }
    }
    return best;
  }

  function wordAtPointer(clientX, clientY) {
    var hit = document.elementFromPoint(clientX, clientY);
    if (hit && hit.closest) {
      var wrapped = hit.closest('.learn-word');
      if (wrapped) return wrapped;
      if (shouldSkipNode(hit)) return null;
    }
    var range = rangeFromPoint(clientX, clientY);
    if (!range || !range.startContainer || range.startContainer.nodeType !== 3) return null;
    if (shouldSkipNode(range.startContainer)) return null;
    var text = range.startContainer.nodeValue || '';
    var bounds = wordBounds(text, range.startOffset);
    if (!bounds) return null;
    var g = glossary();
    if (!g || !g.findEntry(bounds.word)) return null;
    var parent = range.startContainer.parentElement;
    if (parent && parent.closest && parent.closest('.learn-word')) return parent.closest('.learn-word');
    return wrapAt(range.startContainer, bounds.start, bounds.end, bounds.word);
  }

  function clearHoverMarks(except) {
    document.querySelectorAll('[data-drone-own="hover"]').forEach(function (el) {
      if (el === except) return;
      var text = el.getAttribute('data-learn-src') || el.textContent || '';
      el.replaceWith(document.createTextNode(text));
    });
  }

  function clearOwnMarks() {
    document.querySelectorAll('[data-drone-own]').forEach(function (el) {
      var text = el.getAttribute('data-learn-src') || el.textContent || '';
      el.replaceWith(document.createTextNode(text));
    });
  }

  function inspectAt(clientX, clientY) {
    if (!state.on) return;
    var wordEl = nearestMarked(clientX, clientY) || wordAtPointer(clientX, clientY);
    if (!wordEl) {
      if (state.currentWord) {
        clearHoverMarks(null);
        state.currentWord = null;
        state.currentSrc = '';
        fillTip(null);
      }
      return;
    }
    var src = wordEl.getAttribute('data-learn-src') || wordEl.textContent || '';
    if (state.currentSrc === src && state.currentWord === wordEl) return;
    clearHoverMarks(wordEl);
    wordEl.classList.add('site-drone-mark');
    state.currentWord = wordEl;
    state.currentSrc = src;
    fillTip(meaningOf(src));
  }

  function pad() {
    return {
      left: 16,
      top: 88,
      right: window.innerWidth - SIZE - 16,
      bottom: window.innerHeight - SIZE - 88
    };
  }

  function clampToPad(px, py) {
    var p = pad();
    return {
      x: Math.min(Math.max(px, p.left), p.right),
      y: Math.min(Math.max(py, p.top), p.bottom)
    };
  }

  function applyPose() {
    if (!state.drone) return;
    var bank = Math.max(-18, Math.min(18, (state.tx - state.x) * 0.14));
    state.drone.style.setProperty('--drone-x', Math.round(state.x) + 'px');
    state.drone.style.setProperty('--drone-y', Math.round(state.y) + 'px');
    state.drone.style.setProperty('--drone-rot', bank.toFixed(1) + 'deg');
  }

  function tick() {
    if (!state.on || !state.flying) return;
    global.requestAnimationFrame(tick);
    if (state.paused || state.caught || state.reduced) return;
    var ease = state.following ? 0.09 : 0.018;
    state.x += (state.tx - state.x) * ease;
    state.y += (state.ty - state.y) * ease;
    applyPose();
  }

  function aimAtPointer(clientX, clientY) {
    if (!state.on || state.reduced) return;
    state.following = true;
    var near = Math.hypot(clientX - (state.x + SIZE / 2), clientY - (state.y + SIZE / 2)) < 58;
    state.caught = near || state.paused;
    if (!state.caught) {
      var next = clampToPad(clientX - SIZE * 0.28, clientY - SIZE * 0.92);
      state.tx = next.x;
      state.ty = next.y;
    }
    inspectAt(clientX, clientY);
  }

  function mountDrone() {
    if (state.drone && state.drone.isConnected) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'site-drone';
    btn.className = 'site-drone';
    btn.setAttribute('aria-label', t('common.droneAria', 'Drone de inspeção — voa até uma palavra vermelha para ler o significado'));
    btn.innerHTML = '<div class="site-drone-tip" hidden></div>' + droneSvg();
    document.body.appendChild(btn);
    state.drone = btn;
    state.tip = btn.querySelector('.site-drone-tip');
    var p = pad();
    state.x = Math.min(window.innerWidth * 0.78, p.right);
    state.y = Math.min(window.innerHeight * 0.58, p.bottom);
    state.tx = state.x;
    state.ty = state.y;
    applyPose();
    btn.addEventListener('click', function (event) {
      if (event.target && event.target.closest && event.target.closest('.site-drone-tip-link')) return;
      if (state.currentWord) {
        var info = meaningOf(state.currentSrc);
        if (info && info.href) {
          window.location.href = info.href;
          return;
        }
      }
    });
    btn.addEventListener('mouseenter', function () { state.paused = true; });
    btn.addEventListener('mouseleave', function () { state.paused = false; });
  }

  function unmountDrone() {
    if (state.drone && state.drone.parentNode) state.drone.parentNode.removeChild(state.drone);
    state.drone = null;
    state.tip = null;
    state.currentWord = null;
    state.currentSrc = '';
    clearOwnMarks();
  }

  function wrapDangerWords() {
    var g = glossary();
    var root = document.getElementById('main-content') || document.body;
    if (!g || !root || state.wrapping) return;
    state.wrapping = true;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (shouldSkipNode(node)) return NodeFilter.FILTER_REJECT;
        if (node.parentElement && node.parentElement.closest && node.parentElement.closest('.learn-word')) {
          return NodeFilter.FILTER_REJECT;
        }
        if (!node.nodeValue || !/\S/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    var n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var text = node.nodeValue;
      var re = /[A-Za-zÀ-ÿ]+(?:['’-][A-Za-zÀ-ÿ]+)*/g;
      var m;
      var parts = [];
      var last = 0;
      var changed = false;
      while ((m = re.exec(text)) !== null) {
        if (g.toneOf(m[0]) !== 'danger') continue;
        changed = true;
        if (m.index > last) parts.push({ t: text.slice(last, m.index) });
        parts.push({ w: m[0] });
        last = m.index + m[0].length;
      }
      if (!changed) return;
      if (last < text.length) parts.push({ t: text.slice(last) });
      var frag = document.createDocumentFragment();
      parts.forEach(function (part) {
        if (part.t) {
          frag.appendChild(document.createTextNode(part.t));
          return;
        }
        var span = document.createElement('span');
        span.className = 'learn-word learn-word--danger site-drone-mark';
        span.setAttribute('data-learn-src', part.w);
        span.setAttribute('data-drone-own', 'page');
        span.textContent = part.w;
        frag.appendChild(span);
      });
      if (node.parentNode) node.parentNode.replaceChild(frag, node);
    });
    state.wrapping = false;
  }

  function syncButtons() {
    var onLabel = t('common.droneOff', 'Desativar drone');
    var offLabel = t('common.droneOn', 'Ativar drone');
    var label = state.on ? onLabel : offLabel;
    document.querySelectorAll('[data-drone-toggle]').forEach(function (btn) {
      btn.classList.toggle('is-active', state.on);
      btn.setAttribute('aria-pressed', state.on ? 'true' : 'false');
      btn.setAttribute('aria-label', label);
      btn.title = label;
      var text = btn.querySelector('[data-drone-toggle-label]');
      if (text) text.textContent = label;
    });
  }

  function setOn(on) {
    var next = !!on;
    if (next === state.on && state.drone) {
      syncButtons();
      return;
    }
    state.on = next;
    saveFlag(next);
    document.body.classList.toggle('site-drone-on', next);
    syncButtons();
    if (!next) {
      state.flying = false;
      unmountDrone();
      try {
        global.dispatchEvent(new CustomEvent('budganja:drone-change', { detail: { on: false } }));
      } catch (e) { /* ignore */ }
      return;
    }
    ensureGlossary(function () {
      if (!state.on) return;
      mountDrone();
      wrapDangerWords();
      state.reduced = !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);
      state.flying = true;
      applyPose();
      if (!state.reduced) global.requestAnimationFrame(tick);
      try {
        global.dispatchEvent(new CustomEvent('budganja:drone-change', { detail: { on: true } }));
      } catch (err) { /* ignore */ }
    });
  }

  function onPointerMove(event) {
    if (!state.on) return;
    aimAtPointer(event.clientX, event.clientY);
  }

  function onPointerDown(event) {
    if (!state.on) return;
    if (event.pointerType === 'touch' || event.pointerType === 'pen') {
      aimAtPointer(event.clientX, event.clientY);
    }
  }

  function onToggleClick(event) {
    var btn = event.target && event.target.closest ? event.target.closest('[data-drone-toggle]') : null;
    if (!btn) return;
    event.preventDefault();
    setOn(!state.on);
  }

  function boot() {
    state.reduced = !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);
    document.addEventListener('click', onToggleClick);
    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.documentElement.addEventListener('mouseleave', function () {
      state.following = false;
      state.caught = false;
    });
    global.addEventListener('resize', function () {
      var p = pad();
      state.x = Math.min(Math.max(state.x, p.left), p.right);
      state.y = Math.min(Math.max(state.y, p.top), p.bottom);
      applyPose();
    });
    document.addEventListener('visibilitychange', function () {
      state.flying = state.on && document.visibilityState !== 'hidden';
      if (state.flying && !state.reduced) global.requestAnimationFrame(tick);
    });
    global.addEventListener('budganja:locale-change', function () {
      syncButtons();
      if (state.currentSrc) fillTip(meaningOf(state.currentSrc));
      if (state.drone) {
        state.drone.setAttribute(
          'aria-label',
          t('common.droneAria', 'Drone de inspeção — voa até uma palavra vermelha para ler o significado')
        );
      }
    });
    setOn(loadFlag());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  global.BudGanjaDrone = {
    setOn: setOn,
    isOn: function () { return state.on; }
  };
})(typeof window !== 'undefined' ? window : globalThis);
