/**
 * Drone de inspeção — segue o ponteiro em qualquer página, traduz a
 * palavra no texto (no idioma do Aprender ou do site) e mostra o
 * significado no popup.
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'budganja-drone';
  var SIZE = 54;
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
    currentSrc: '',
    wrapping: false,
    rush: false,
    abductHit: null,
    abductEl: null,
    pendingAbduct: null,
    abductHold: false,
    drawnX: null,
    drawnY: null,
    drawnRot: null,
    inspectX: 0,
    inspectY: 0,
    inspectQueued: false,
    heldEl: null,
    litButton: null
  };

  var BUTTON_SEL = 'a.botao, .botao, .botao-home';

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

  function isDismissed() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'hidden';
    } catch (e) {
      return false;
    }
  }

  function saveFlag(on) {
    try {
      if (on) localStorage.setItem(STORAGE_KEY, '1');
      else if (localStorage.getItem(STORAGE_KEY) !== 'hidden') localStorage.removeItem(STORAGE_KEY);
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

  function morphLang() {
    var lang = targetLang();
    if (!isPt(lang)) return lang;
    return 'en';
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

  function ensureLearnTranslate(done) {
    if (global.BudGanjaLearnTranslate && typeof global.BudGanjaLearnTranslate.revealWord === 'function') {
      done();
      return;
    }
    if (document.querySelector('script[src*="learn-translate.js"]')) {
      var tries = 0;
      var wait = global.setInterval(function () {
        tries += 1;
        if ((global.BudGanjaLearnTranslate && global.BudGanjaLearnTranslate.revealWord) || tries > 40) {
          global.clearInterval(wait);
          done();
        }
      }, 50);
      return;
    }
    done();
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
      '<svg class="site-drone-body" viewBox="0 0 120 88" width="53" height="38" aria-hidden="true">' +
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
      '<circle class="site-drone-led" cx="74" cy="39" r="1.7" fill="#3a5560"/>' +
      '<g class="site-drone-cam"><circle cx="60" cy="58" r="7" fill="#0b1218" stroke="#e2c15a" stroke-width="1.7"/><circle class="site-drone-lens" cx="60" cy="58" r="3.6" fill="#1a3c4e"/><circle cx="58.2" cy="56.2" r="1.15" fill="#f4e08a" opacity="0.75"/></g>' +
      '</g></svg>'
    );
  }

  function emotionOf(src) {
    var g = glossary();
    if (g && typeof g.emotionOf === 'function') return g.emotionOf(src) || '';
    return '';
  }

  function emotionLabel(emotion) {
    if (emotion === 'alegria') return t('common.emotionAlegria', 'Alegria');
    if (emotion === 'tristeza') return t('common.emotionTristeza', 'Tristeza');
    if (emotion === 'raiva') return t('common.emotionRaiva', 'Raiva');
    if (emotion === 'medo') return t('common.emotionMedo', 'Medo');
    if (emotion === 'nojinho') return t('common.emotionNojinho', 'Nojinho');
    if (emotion === 'emocao') return t('common.emotionEmocao', 'Emoção');
    return '';
  }

  function meaningOf(src) {
    var g = glossary();
    if (!g || !src) return null;
    var entry = typeof g.findEntry === 'function' ? g.findEntry(src) : null;
    if (!entry) return null;
    var lang = morphLang();
    var translation = g.lookup(src, lang, true) || '';
    return {
      src: src,
      lang: lang,
      translation: translation,
      gloss: entry.gloss || '',
      mundane: entry.mundane || '',
      category: entry.category || '',
      href: entry.href || '',
      tone: entry.tone || '',
      emotion: emotionOf(src)
    };
  }

  function fillTip(info) {
    if (!state.tip) return;
    if (!info) {
      state.tip.hidden = true;
      state.tip.innerHTML = '';
      state.tip.removeAttribute('data-emotion');
      return;
    }
    var langName = LANG_NAMES[info.lang] || info.lang;
    var emotion = info.emotion || emotionOf(info.src) || '';
    var emotionName = emotionLabel(emotion);
    state.tip.setAttribute('data-emotion', emotion);
    var parts = [];
    parts.push('<p class="site-drone-tip-word">' + escapeHtml(info.src) + '</p>');
    if (emotionName) {
      parts.push('<p class="site-drone-tip-emotion">' + escapeHtml(emotionName) + '</p>');
    }
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

  function wordAtPointer(clientX, clientY) {
    var hit = wordHitAt(clientX, clientY);
    if (!hit || !hit.word) return '';
    var g = glossary();
    if (g && g.findEntry(hit.word)) return hit.word;
    return '';
  }

  function fallbackRect(clientX, clientY) {
    return { left: clientX - 18, top: clientY - 10, width: 36, height: 18 };
  }

  function wordHitAt(clientX, clientY) {
    var hit = document.elementFromPoint(clientX, clientY);
    if (hit && hit.closest) {
      var wrapped = hit.closest('.learn-word, .site-drone-emotion, .site-drone-word');
      if (wrapped) {
        return {
          word: (wrapped.getAttribute('data-learn-src') || wrapped.textContent || '').trim(),
          rect: wrapped.getBoundingClientRect(),
          el: wrapped
        };
      }
      if (shouldSkipNode(hit)) return null;
    }
    var range = rangeFromPoint(clientX, clientY);
    if (!range || !range.startContainer || range.startContainer.nodeType !== 3) return null;
    if (shouldSkipNode(range.startContainer)) return null;
    var text = range.startContainer.nodeValue || '';
    var bounds = wordBounds(text, range.startOffset);
    if (!bounds) return null;
    var wordRange = document.createRange();
    try {
      wordRange.setStart(range.startContainer, bounds.start);
      wordRange.setEnd(range.startContainer, bounds.end);
    } catch (e) {
      return { word: bounds.word, rect: fallbackRect(clientX, clientY), node: range.startContainer, start: bounds.start, end: bounds.end };
    }
    var rect = wordRange.getBoundingClientRect();
    if (!rect.width && !rect.height) rect = fallbackRect(clientX, clientY);
    return {
      word: bounds.word,
      rect: rect,
      node: range.startContainer,
      start: bounds.start,
      end: bounds.end
    };
  }

  function clearAbductGhost() {
    if (state.abductEl && state.abductEl.parentNode) {
      state.abductEl.parentNode.removeChild(state.abductEl);
    }
    state.abductEl = null;
  }

  function spawnAbductGhost(word, rect, emotion) {
    clearAbductGhost();
    if (!rect) return;
    var el = document.createElement('span');
    el.className = 'site-drone-abduct' + (emotion ? ' site-drone-abduct--' + emotion : '');
    el.textContent = word;
    el.style.left = Math.round(rect.left) + 'px';
    el.style.top = Math.round(rect.top) + 'px';
    el.style.minWidth = Math.max(8, Math.round(rect.width)) + 'px';
    el.style.height = Math.max(14, Math.round(rect.height)) + 'px';
    el.style.fontSize = Math.max(13, Math.round(rect.height * 0.88)) + 'px';
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    var dx = state.x + SIZE * 0.5 - cx;
    var dy = state.y + SIZE * 0.52 - cy;
    el.style.setProperty('--abduct-dx', Math.round(dx) + 'px');
    el.style.setProperty('--abduct-dy', Math.round(dy) + 'px');
    document.body.appendChild(el);
    state.abductEl = el;
    el.addEventListener('animationend', function () {
      if (el.parentNode) el.parentNode.removeChild(el);
      if (state.abductEl === el) state.abductEl = null;
    });
  }

  function wrapWordHit(hit) {
    if (!hit || !hit.word) return null;
    if (hit.el && hit.el.isConnected) return hit.el;
    if (!hit.node || hit.start == null || hit.end == null || !hit.node.parentNode) return null;
    var range = document.createRange();
    try {
      range.setStart(hit.node, hit.start);
      range.setEnd(hit.node, hit.end);
      var span = document.createElement('span');
      span.className = 'learn-word site-drone-word';
      span.setAttribute('data-learn-src', hit.word);
      span.setAttribute('data-drone-own', 'page');
      range.surroundContents(span);
      hit.el = span;
      hit.node = null;
      return span;
    } catch (e) {
      return null;
    }
  }

  function releaseHeldWord() {
    var el = state.heldEl;
    state.heldEl = null;
    if (!el || !el.isConnected) return;
    el.removeAttribute('data-drone-held');
    var src = el.getAttribute('data-learn-src') || '';
    var api = global.BudGanjaLearnTranslate;
    if (api && typeof api.revertWord === 'function') {
      api.revertWord(el);
      return;
    }
    if (src) el.textContent = src;
    el.classList.remove('is-translated', 'is-sheen', 'learn-word--known');
    el.removeAttribute('data-learn-shown');
  }

  function revealHit(hit) {
    if (!hit || !hit.word) return;
    var lang = morphLang();
    if (!lang) return;
    var g = glossary();
    if (!g || !g.findEntry || !g.findEntry(hit.word)) return;
    var el = wrapWordHit(hit);
    if (!el) return;
    if (state.heldEl && state.heldEl !== el) releaseHeldWord();
    state.heldEl = el;
    el.setAttribute('data-drone-held', '1');
    var api = global.BudGanjaLearnTranslate;
    if (api && typeof api.revealWord === 'function') {
      api.revealWord(el, { lang: lang });
      return;
    }
    var translated = g.lookup(hit.word, lang, true) || '';
    if (translated && translated !== hit.word) {
      el.textContent = translated;
      el.classList.add('is-translated', 'learn-word--known');
      el.setAttribute('data-learn-shown', translated);
    }
  }

  function finishAbduct() {
    state.rush = false;
    state.caught = true;
    state.abductHold = true;
    var hit = state.abductHit;
    if (hit && hit.word) {
      if (!state.reduced) spawnAbductGhost(hit.word, hit.rect, emotionOf(hit.word));
      var info = meaningOf(hit.word);
      if (!info) {
        info = {
          src: hit.word,
          lang: targetLang(),
          translation: '',
          gloss: '',
          mundane: '',
          category: '',
          href: '',
          tone: '',
          emotion: emotionOf(hit.word)
        };
      }
      state.currentSrc = hit.word;
      fillTip(info);
    }
    global.setTimeout(function () {
      if (state.drone) state.drone.classList.remove('is-abducting');
      state.caught = false;
      state.abductHold = false;
    }, 880);
  }

  function abductAt(clientX, clientY) {
    if (!state.drone || !state.on) return;
    var hit = wordHitAt(clientX, clientY);
    revealHit(hit);
    var next = clampToPad(clientX - SIZE * 0.28, clientY - SIZE * 0.95);
    state.rush = true;
    state.following = true;
    state.caught = false;
    state.paused = false;
    state.tx = next.x;
    state.ty = next.y;
    state.abductHit = hit;
    state.drone.classList.add('is-abducting', 'is-lit');
    if (state.reduced) {
      state.x = next.x;
      state.y = next.y;
      applyPose();
      finishAbduct();
      return;
    }
    if (!state.flying) {
      state.flying = true;
      global.requestAnimationFrame(tick);
    }
  }

  function unwrapOwnMarks() {
    document.querySelectorAll('[data-drone-own]').forEach(function (el) {
      var text = el.getAttribute('data-learn-src') || el.textContent || '';
      el.replaceWith(document.createTextNode(text));
    });
  }

  function wrapNodeEmotions(node, g) {
    if (!node || !node.parentNode) return;
    var text = node.nodeValue;
    var re = /[A-Za-zÀ-ÿ]+(?:['’-][A-Za-zÀ-ÿ]+)*/g;
    var m;
    var parts = [];
    var last = 0;
    var changed = false;
    while ((m = re.exec(text)) !== null) {
      var emotion = emotionOf(m[0]);
      if (!emotion) continue;
      if (m[0].length < 4 && !(g.hqEmotionOf && g.hqEmotionOf(m[0]))) continue;
      changed = true;
      if (m.index > last) parts.push({ t: text.slice(last, m.index) });
      parts.push({ w: m[0], emotion: emotion });
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
      span.className = 'site-drone-emotion site-drone-emotion--' + part.emotion;
      span.setAttribute('data-learn-src', part.w);
      span.setAttribute('data-drone-own', 'page');
      span.setAttribute('data-emotion', part.emotion);
      span.textContent = part.w;
      frag.appendChild(span);
    });
    node.parentNode.replaceChild(frag, node);
  }

  function wrapEmotionWords() {
    var g = glossary();
    var root = document.getElementById('main-content') || document.body;
    if (!g || !root || state.wrapping) return;
    state.wrapping = true;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (shouldSkipNode(node)) return NodeFilter.FILTER_REJECT;
        if (node.parentElement && node.parentElement.closest && node.parentElement.closest('.learn-word, .site-drone-emotion, .site-drone-word')) {
          return NodeFilter.FILTER_REJECT;
        }
        if (!node.nodeValue || !/\S/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    var n;
    while ((n = walker.nextNode())) nodes.push(n);
    var i = 0;
    function step() {
      if (!state.on) {
        state.wrapping = false;
        return;
      }
      var end = Math.min(i + 28, nodes.length);
      for (; i < end; i++) wrapNodeEmotions(nodes[i], g);
      if (i < nodes.length) {
        global.requestAnimationFrame(step);
        return;
      }
      state.wrapping = false;
    }
    global.requestAnimationFrame(step);
  }

  function inspectAt(clientX, clientY) {
    if (!state.on) return;
    var hit = document.elementFromPoint(clientX, clientY);
    if (hit && hit.closest && hit.closest('#site-drone, .site-drone')) return;
    var src = wordAtPointer(clientX, clientY);
    if (!src) {
      if (state.currentSrc) {
        state.currentSrc = '';
        fillTip(null);
      }
      return;
    }
    if (state.currentSrc === src) return;
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
    var bank = Math.max(-14, Math.min(14, (state.tx - state.x) * 0.16));
    var x = Math.round(state.x);
    var y = Math.round(state.y);
    var rot = bank.toFixed(1);
    if (state.drawnX === x && state.drawnY === y && state.drawnRot === rot) return;
    state.drawnX = x;
    state.drawnY = y;
    state.drawnRot = rot;
    state.drone.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) rotate(' + rot + 'deg)';
    state.drone.style.setProperty('--drone-rot', rot + 'deg');
  }

  function setLitButton(el) {
    if (state.litButton === el) return;
    if (state.litButton) state.litButton.classList.remove('is-drone-over');
    state.litButton = el || null;
    if (state.litButton) state.litButton.classList.add('is-drone-over');
  }

  function buttonAtPoint(clientX, clientY) {
    if (!document.elementsFromPoint) {
      var hit = document.elementFromPoint(clientX, clientY);
      if (!hit || !hit.closest) return null;
      if (hit.closest('#site-drone, .site-drone')) return null;
      return hit.closest(BUTTON_SEL);
    }
    var stack = document.elementsFromPoint(clientX, clientY);
    for (var i = 0; i < stack.length; i++) {
      var node = stack[i];
      if (!node || !node.closest) continue;
      if (node.closest('#site-drone, .site-drone, .site-drone-tip')) continue;
      var btn = node.closest(BUTTON_SEL);
      if (btn) return btn;
    }
    return null;
  }

  function lightButtonsNearDrone() {
    if (!state.on || !state.drone) {
      setLitButton(null);
      return;
    }
    var btn = buttonAtPoint(state.inspectX, state.inspectY)
      || buttonAtPoint(state.x + SIZE * 0.5, state.y + SIZE * 0.55)
      || buttonAtPoint(state.x + SIZE * 0.5, state.y + SIZE + 24);
    setLitButton(btn);
  }

  function tick() {
    if (!state.on || !state.flying) return;
    global.requestAnimationFrame(tick);
    if ((state.paused || state.caught) && !state.rush) {
      lightButtonsNearDrone();
      return;
    }
    if (state.reduced && !state.rush) {
      lightButtonsNearDrone();
      return;
    }
    var ease = state.rush ? 0.26 : (state.following ? 0.09 : 0.018);
    state.x += (state.tx - state.x) * ease;
    state.y += (state.ty - state.y) * ease;
    applyPose();
    lightButtonsNearDrone();
    if (state.rush && Math.hypot(state.tx - state.x, state.ty - state.y) < 12) {
      finishAbduct();
    }
  }

  function aimAtPointer(clientX, clientY) {
    if (!state.on || state.reduced || state.rush || state.abductHold) return;
    state.following = true;
    var near = Math.hypot(clientX - (state.x + SIZE / 2), clientY - (state.y + SIZE / 2)) < 36;
    state.caught = near || state.paused;
    if (!state.caught) {
      var next = clampToPad(clientX - SIZE * 0.28, clientY - SIZE * 0.92);
      state.tx = next.x;
      state.ty = next.y;
    }
  }

  function mountDrone() {
    if (state.drone && state.drone.isConnected) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'site-drone';
    btn.className = 'site-drone';
    btn.setAttribute('aria-pressed', 'false');
    var aria = t('common.droneAria', 'Drone de inspeção — clique para ligar a luz; botão do meio esconde o drone');
    btn.setAttribute('aria-label', aria);
    btn.title = aria;
    btn.innerHTML = '<div class="site-drone-tip" hidden></div><span class="site-drone-light" aria-hidden="true"></span>' + droneSvg();
    document.body.appendChild(btn);
    document.body.classList.add('site-drone-ready');
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
      event.preventDefault();
      event.stopPropagation();
      setOn(!state.on);
    });
    btn.addEventListener('auxclick', function (event) {
      if (event.button !== 1) return;
      event.preventDefault();
      event.stopPropagation();
      dismissDrone();
    });
    btn.addEventListener('mouseup', function (event) {
      if (event.button !== 1) return;
      event.preventDefault();
      event.stopPropagation();
      dismissDrone();
    });
    btn.addEventListener('mousedown', function (event) {
      if (event.button === 1) event.preventDefault();
    });
    btn.addEventListener('pointerdown', function (event) {
      if (event.button === 1) event.preventDefault();
    });
    btn.addEventListener('mouseenter', function () { state.paused = true; });
    btn.addEventListener('mouseleave', function () { state.paused = false; });
  }

  function dimDrone() {
    fillTip(null);
    state.currentSrc = '';
    state.rush = false;
    state.abductHit = null;
    state.pendingAbduct = null;
    state.abductHold = false;
    clearAbductGhost();
    releaseHeldWord();
    unwrapOwnMarks();
    setLitButton(null);
    if (state.drone) {
      state.drone.classList.remove('is-lit', 'is-abducting');
      state.drone.setAttribute('aria-pressed', 'false');
    }
  }

  function dismissDrone() {
    try {
      localStorage.setItem(STORAGE_KEY, 'hidden');
    } catch (e) { /* ignore */ }
    state.on = false;
    state.flying = false;
    state.following = false;
    state.caught = false;
    document.body.classList.remove('site-drone-on');
    dimDrone();
    if (state.drone && state.drone.parentNode) {
      state.drone.parentNode.removeChild(state.drone);
    }
    state.drone = null;
    state.tip = null;
    document.body.classList.remove('site-drone-ready');
    syncButtons();
    try {
      global.dispatchEvent(new CustomEvent('budganja:drone-change', { detail: { on: false } }));
    } catch (err) { /* ignore */ }
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
    mountDrone();
    if (next === state.on) {
      if (state.drone) {
        state.drone.classList.toggle('is-lit', next);
        state.drone.setAttribute('aria-pressed', next ? 'true' : 'false');
      }
      syncButtons();
      return;
    }
    state.on = next;
    saveFlag(next);
    document.body.classList.toggle('site-drone-on', next);
    if (state.drone) {
      state.drone.classList.toggle('is-lit', next);
      state.drone.setAttribute('aria-pressed', next ? 'true' : 'false');
      state.drone.setAttribute(
        'aria-label',
        next
          ? t('common.droneOff', 'Desativar drone')
          : t('common.droneOn', 'Ativar drone')
      );
    }
    syncButtons();
    if (!next) {
      state.flying = false;
      state.following = false;
      state.caught = false;
      dimDrone();
      try {
        global.dispatchEvent(new CustomEvent('budganja:drone-change', { detail: { on: false } }));
      } catch (e) { /* ignore */ }
      return;
    }
    ensureGlossary(function () {
      if (!state.on) return;
      ensureLearnTranslate(function () {
        if (!state.on) return;
        unwrapOwnMarks();
        wrapEmotionWords();
        state.reduced = !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);
        state.flying = true;
        applyPose();
        if (!state.reduced) global.requestAnimationFrame(tick);
        if (state.pendingAbduct) {
          var pending = state.pendingAbduct;
          state.pendingAbduct = null;
          abductAt(pending.x, pending.y);
        }
        try {
          global.dispatchEvent(new CustomEvent('budganja:drone-change', { detail: { on: true } }));
        } catch (err) { /* ignore */ }
      });
    });
  }

  function onPointerMove(event) {
    if (!state.on) return;
    state.inspectX = event.clientX;
    state.inspectY = event.clientY;
    aimAtPointer(event.clientX, event.clientY);
    if (state.inspectQueued || state.rush || state.abductHold) return;
    state.inspectQueued = true;
    global.requestAnimationFrame(function () {
      state.inspectQueued = false;
      if (!state.on || state.rush || state.abductHold) return;
      inspectAt(state.inspectX, state.inspectY);
      lightButtonsNearDrone();
    });
  }

  function onPointerDown(event) {
    if (!state.on) return;
    state.inspectX = event.clientX;
    state.inspectY = event.clientY;
    if (event.pointerType === 'touch' || event.pointerType === 'pen') {
      aimAtPointer(event.clientX, event.clientY);
      inspectAt(event.clientX, event.clientY);
    }
    lightButtonsNearDrone();
  }

  function onPageClick(event) {
    if (event.button !== 0) return;
    if (!state.drone || !state.drone.isConnected) return;
    var el = event.target;
    if (!el || !el.closest) return;
    if (el.closest('[data-drone-toggle], #site-drone, .site-drone, input, textarea, select, label, .mobile-menu, #site-header, #site-footer, .learn-toolbar, .site-drone-tip')) {
      return;
    }
    var wordEl = el.closest('.learn-word, .site-drone-emotion, .site-drone-word');
    if (wordEl) {
      event.preventDefault();
    } else if (el.closest('a, button')) {
      return;
    }
    if (!state.on) return;
    abductAt(event.clientX, event.clientY);
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
    document.addEventListener('click', onPageClick);
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
          state.on
            ? t('common.droneOff', 'Desativar drone')
            : t('common.droneOn', 'Ativar drone')
        );
      }
    });
    if (!isDismissed()) {
      mountDrone();
      setOn(loadFlag());
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  global.BudGanjaDrone = {
    setOn: setOn,
    dismiss: dismissDrone,
    isOn: function () { return state.on; }
  };
})(typeof window !== 'undefined' ? window : globalThis);
