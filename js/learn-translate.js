/**
 * Modo Aprender — traduz palavra a palavra com morph letra a letra
 * + tip de frase. Auto-ativa em Vida e posts de inspeção.
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'budganja-learn-lang';
  var LEARN_LANGS = { en: 1, es: 1, fr: 1, it: 1, de: 1, yo: 1, sw: 1, gez: 1, el: 1, la: 1, nl: 1, pl: 1, ru: 1, uk: 1, zh: 1, ja: 1, ko: 1, ar: 1, he: 1, hi: 1, tr: 1, sv: 1, da: 1, no: 1, fi: 1, cs: 1, ro: 1, hu: 1, ca: 1, gl: 1, eu: 1, gn: 1, qu: 1, eo: 1, vi: 1, id: 1, th: 1, hr: 1, sk: 1, ga: 1, cy: 1, ha: 1, am: 1, fa: 1, bn: 1, zu: 1 };
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
      if (LEARN_LANGS[saved]) return saved;
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
    if (lang === 'es') return 'abcdefghijklmnopqrstuvwxyzáéíóúñ';
    if (lang === 'fr') return 'abcdefghijklmnopqrstuvwxyzàâçéèêëîïôùûü';
    if (lang === 'it') return 'abcdefghijklmnopqrstuvwxyzàèéìòù';
    if (lang === 'de') return 'abcdefghijklmnopqrstuvwxyzäöüß';
    if (lang === 'yo') return 'abcdefghijklmnopqrstuvwxyzàáèéẹ̀ẹ́ìíòóọ̀ọ́ùúṣṣ́';
    if (lang === 'sw') return 'abcdefghijklmnopqrstuvwxyz';
    if (lang === 'gez') return 'abcdefghijklmnopqrstuvwxyzʾʿäəḥḥśṣṭ';
    if (lang === 'el') return 'αβγδεζηθικλμνξοπρστυφχψωάέήίόύώϊϋΐΰς';
    if (lang === 'la') return 'abcdefghijklmnopqrstuvwxyzæœ';
    if (lang === 'nl') return 'abcdefghijklmnopqrstuvwxyzáéíóúäëïöü';
    if (lang === 'pl') return 'aąbcćdeęfghijklłmnńoóprsśtuwyzźż';
    if (lang === 'ru') return 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    if (lang === 'uk') return 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя';
    if (lang === 'zh') return '的一是不了人我在有他这为之大来以个中上们';
    if (lang === 'ja') return 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
    if (lang === 'ko') return '가나다라마바사아자차카타파하';
    if (lang === 'ar') return 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي';
    if (lang === 'he') return 'אבגדהוזחטיכלמנסעפצקרשת';
    if (lang === 'hi') return 'अआइईउऊएऐओऔकखगघचछजझटठडढणतथदधनपफबभमयरलवशषसह';
    if (lang === 'tr') return 'abcçdefgğhıijklmnoöprsştuüvyz';
    if (lang === 'sv' || lang === 'da' || lang === 'no') return 'abcdefghijklmnopqrstuvwxyzåäöæø';
    if (lang === 'fi') return 'abcdefghijklmnopqrstuvwxyzäö';
    if (lang === 'cs' || lang === 'sk') return 'aáäbcčdďeéěfghiíjklĺľmnňoóôpqrřŕsštťuúůvwxyýzž';
    if (lang === 'ro') return 'aăâbcdefghiîjlmnopqrsștțuvwxyz';
    if (lang === 'hu') return 'aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz';
    if (lang === 'ca' || lang === 'gl' || lang === 'eu' || lang === 'gn' || lang === 'qu') {
      return 'abcdefghijklmnopqrstuvwxyzáéíóúñüàçèïò';
    }
    if (lang === 'vi') return 'aáàảãạăâbcdđeéèẻẽẹêghiíìỉĩịklmnoóòỏõọôơpqrstuúùủũụưvyýỳỷỹỵ';
    if (lang === 'th') return 'กขคฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ';
    if (lang === 'hr') return 'abcčćdđefghijklmnoprsštuvzž';
    if (lang === 'ga' || lang === 'cy') return 'aábcdeéfghiílmnoóprstuúvwyz';
    if (lang === 'fa') return 'ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی';
    if (lang === 'bn') return 'অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ';
    return 'abcdefghijklmnopqrstuvwxyz';
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
          span.textContent = /[\s\d\.,;:!?\-'"()]/.test(finalCh)
            ? finalCh
            : randomChar(charset, upper);
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

  function noTranslationLabel() {
    return t('pages.vida.learnNoTranslation', 'Sem tradução neste idioma');
  }

  function toneDangerLabel() {
    return t('pages.vida.learnToneDanger', 'Palavra perigosa — uso com cuidado');
  }

  function toneCautionLabel() {
    return t('pages.vida.learnToneCaution', 'Uso cauteloso');
  }

  function wordHasTranslation(g, src) {
    if (!g || !src || !state.lang) return false;
    if (typeof g.hasInLang === 'function') return g.hasInLang(src, state.lang);
    return !!g.lookup(src, state.lang, true);
  }

  function wordTone(g, src) {
    if (!g || !src) return '';
    if (typeof g.toneOf === 'function') return g.toneOf(src) || '';
    var entry = typeof g.findEntry === 'function' ? g.findEntry(src) : null;
    return (entry && entry.tone) || '';
  }

  function wordGloss(g, src) {
    if (!g || !src) return '';
    if (typeof g.glossOf === 'function') return g.glossOf(src) || '';
    var entry = typeof g.findEntry === 'function' ? g.findEntry(src) : null;
    return (entry && entry.gloss) || '';
  }

  function shortenMeaning(text) {
    var cut = String(text || '').trim();
    if (!cut) return '';
    cut = cut.split(/\s+[—–]\s+/)[0];
    cut = cut.split(';')[0].trim();
    if (cut.length > 80) {
      var space = cut.lastIndexOf(' ', 80);
      cut = (space > 28 ? cut.slice(0, space) : cut.slice(0, 80)).replace(/[.,;:]+$/, '') + '…';
    }
    return cut;
  }

  function meaningForDisplay(g, src) {
    return shortenMeaning(wordMundane(g, src) || wordGloss(g, src));
  }

  function wordMundane(g, src) {
    if (!g || !src) return '';
    if (typeof g.mundaneOf === 'function') return g.mundaneOf(src) || '';
    var entry = typeof g.findEntry === 'function' ? g.findEntry(src) : null;
    return (entry && entry.mundane) || '';
  }

  function wordCategory(g, src) {
    if (!g || !src) return '';
    if (typeof g.categoryOf === 'function') return g.categoryOf(src) || '';
    var entry = typeof g.findEntry === 'function' ? g.findEntry(src) : null;
    return (entry && entry.category) || '';
  }

  function mundaneLabel() {
    return t('pages.vida.learnMundane', 'Comum');
  }

  function labGlossLabel() {
    return t('pages.vida.learnLabGloss', 'BudGanja');
  }

  function buildWordTip(src, known, gloss, tone, mundane, category) {
    var parts = [];
    if (category) parts.push(category);
    if (mundane) parts.push(mundaneLabel() + ': ' + mundane);
    if (gloss) {
      parts.push(mundane ? labGlossLabel() + ': ' + gloss : gloss);
    }
    if (tone === 'danger') parts.push(toneDangerLabel());
    else if (tone === 'caution') parts.push(toneCautionLabel());
    if (!known) parts.push(noTranslationLabel());
    return parts.join(' · ');
  }

  function wordHref(g, src) {
    if (!g || !src) return '';
    if (typeof g.hrefOf === 'function') return g.hrefOf(src) || '';
    var entry = typeof g.findEntry === 'function' ? g.findEntry(src) : null;
    return (entry && entry.href) || '';
  }

  function markWordCoverage(span, src) {
    var g = glossary();
    var known = wordHasTranslation(g, src);
    var tone = wordTone(g, src);
    var gloss = wordGloss(g, src);
    var mundane = wordMundane(g, src);
    var category = wordCategory(g, src);
    var href = wordHref(g, src);
    span.classList.toggle('learn-word--known', known);
    span.classList.toggle('learn-word--unknown', !known);
    span.classList.toggle('learn-word--danger', tone === 'danger');
    span.classList.toggle('learn-word--caution', tone === 'caution');
    if (tone) span.setAttribute('data-learn-tone', tone);
    else span.removeAttribute('data-learn-tone');
    if (gloss) span.setAttribute('data-learn-gloss', gloss);
    else span.removeAttribute('data-learn-gloss');
    if (mundane) span.setAttribute('data-learn-mundane', mundane);
    else span.removeAttribute('data-learn-mundane');
    if (category) span.setAttribute('data-learn-category', category);
    else span.removeAttribute('data-learn-category');
    if (href) span.setAttribute('data-learn-href', href);
    else span.removeAttribute('data-learn-href');
    var tip = buildWordTip(src, known, gloss, tone, mundane, category);
    if (href) {
      tip = (tip ? tip + ' · ' : '') + t('pages.vida.learnOpenLink', 'Duplo clique para abrir a referência');
    }
    if (tip) span.setAttribute('title', tip);
    else span.removeAttribute('title');
  }

  function refreshWordCoverage() {
    var scope = state.scope || state.root || document;
    if (!scope.querySelectorAll) return;
    scope.querySelectorAll('.learn-word').forEach(function (el) {
      markWordCoverage(el, el.getAttribute('data-learn-src') || '');
    });
  }

  function activateWord(wordEl) {
    if (!wordEl || !state.lang) return;
    if (state.activeWord === wordEl) return;
    if (state.activeWord) revertWord(state.activeWord);
    state.activeWord = wordEl;
    var src = wordEl.getAttribute('data-learn-src') || '';
    var g = glossary();
    var translated = g ? g.lookup(src, state.lang, true) : '';
    var tone = wordTone(g, src);
    var gloss = wordGloss(g, src);
    var mundane = wordMundane(g, src);
    var category = wordCategory(g, src);
    var meaning = tone === 'danger' ? meaningForDisplay(g, src) : '';
    var shown = meaning || translated;
    var tip = buildWordTip(src, !!(translated || meaning), gloss, tone, mundane, category);
    if (!shown) {
      wordEl.classList.add('is-sheen', 'is-unknown', 'learn-word--unknown');
      wordEl.classList.remove('learn-word--known');
      if (tip) wordEl.setAttribute('title', tip);
      else wordEl.setAttribute('title', noTranslationLabel());
      wordEl.setAttribute('aria-label', src + ' — ' + (tip || noTranslationLabel()));
      schedule(wordEl, function () {
        wordEl.classList.remove('is-sheen');
      }, 160);
      return;
    }
    wordEl.classList.remove('is-unknown', 'learn-word--unknown');
    wordEl.classList.add('learn-word--known');
    if (tip) wordEl.setAttribute('title', tip);
    else wordEl.removeAttribute('title');
    morphTo(wordEl, shown);
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
        markWordCoverage(span, m[1]);
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
        '.learn-toolbar, .learn-word, a.botao, .vida-hero-actions, .vida-cta-row, .article-share, .voltar-link'
      )
    ) {
      return true;
    }
    if (el.closest && el.closest('[data-learn-skip]')) return true;
    return false;
  }

  function walk(root) {
    if (!root) return;
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
    refreshWordCoverage();
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
          'Escolhe um idioma — depois passa o rato/dedo por uma palavra de cada vez.'
        );
      } else {
        var names = {
          en: 'English',
          es: 'español',
          fr: 'français',
          it: 'italiano',
          de: 'Deutsch',
          yo: 'Yoruba',
          sw: 'Kiswahili',
          gez: "Ge'ez",
          el: 'Ellenika',
          la: 'Latina',
          nl: 'Nederlands',
          pl: 'polski',
          ru: 'russkiy',
          uk: 'ukrainska',
          zh: 'Zhongwen',
          ja: 'Nihongo',
          ko: 'Hangugeo',
          ar: 'Arabiyya',
          he: 'Ivrit',
          hi: 'Hindi',
          tr: 'Turkce',
          sv: 'svenska',
          da: 'dansk',
          no: 'norsk',
          fi: 'suomi',
          cs: 'cestina',
          ro: 'romana',
          hu: 'magyar',
          ca: 'catala',
          gl: 'galego',
          eu: 'euskara',
          gn: 'guarani',
          qu: 'runasimi',
          eo: 'Esperanto',
          vi: 'tiếng Việt',
          id: 'bahasa Indonesia',
          th: 'ไทย',
          hr: 'hrvatski',
          sk: 'slovenčina',
          ga: 'Gaeilge',
          cy: 'Cymraeg',
          ha: 'Hausa',
          am: 'Amharic',
          fa: 'فارسی',
          bn: 'বাংলা',
          zu: 'isiZulu'
        };
        var name = names[state.lang] || state.lang;
        hint.textContent = t(
          'pages.vida.learnHintOn',
          'Passe numa palavra: o brilho dourado traduz para {lang}. Traço pontilhado = sem tradução.'
        ).replace('{lang}', name);
      }
    }
    var label = state.toolbar.querySelector('[data-learn-label]');
    if (label) {
      label.textContent = t('pages.vida.learnLabel', 'Aprender idiomas');
    }
    var legendDanger = state.toolbar.querySelector('[data-learn-legend-danger]');
    if (legendDanger) {
      legendDanger.textContent = t(
        'pages.vida.learnLegendDanger',
        'Traço vermelho: palavra de aviso — retaliação, dano, toxina ou afecto que cobra o preço em quem o cultiva. Não é proibição: é literacia (sentido comum + leitura BudGanja).'
      );
    }
    var legendLink = state.toolbar.querySelector('[data-learn-legend-link]');
    if (legendLink) {
      legendLink.textContent = t(
        'pages.vida.learnLegendLink',
        'Abrir categoria Palavras de aviso'
      );
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
    var next = LEARN_LANGS[lang] ? lang : '';
    if (next === state.lang) return;
    state.lang = next;
    saveLang(next);
    state.activeWord = null;
    state.reducedMotion = prefersReducedMotion();
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

  function openWordHref(wordEl) {
    if (!wordEl) return false;
    var href = wordEl.getAttribute('data-learn-href') || '';
    if (!href) {
      var g = glossary();
      href = wordHref(g, wordEl.getAttribute('data-learn-src') || '');
    }
    if (!href) return false;
    try {
      if (href.charAt(0) === '/') {
        global.location.href = href;
      } else {
        global.open(href, '_blank', 'noopener,noreferrer');
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  function onPointerDown(e) {
    var word = wordFromEvent(e);
    if (!word) return;
    // Limpa seleção nativa para o toque traduzir em vez de abrir Copiar/Colar.
    clearTextSelection();
    activateWord(word);
  }

  function onWordDblClick(e) {
    var word = wordFromEvent(e);
    if (!word) return;
    if (openWordHref(word)) {
      e.preventDefault();
      e.stopPropagation();
    }
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
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="en" aria-pressed="false" title="English">EN</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="es" aria-pressed="false" title="Español">ES</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="fr" aria-pressed="false" title="Français">FR</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="it" aria-pressed="false" title="Italiano">IT</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="de" aria-pressed="false" title="Deutsch">DE</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="yo" aria-pressed="false" title="Yorùbá">YO</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="sw" aria-pressed="false" title="Kiswahili">SW</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="gez" aria-pressed="false" title="Geʽez">GEZ</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="el" aria-pressed="false" title="Ελληνικά (Grego)">EL</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="la" aria-pressed="false" title="Latina (Latim)">LA</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="nl" aria-pressed="false" title="Nederlands">NL</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="pl" aria-pressed="false" title="Polski">PL</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="ru" aria-pressed="false" title="Русский">RU</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="uk" aria-pressed="false" title="Українська">UK</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="zh" aria-pressed="false" title="中文">ZH</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="ja" aria-pressed="false" title="日本語">JA</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="ko" aria-pressed="false" title="한국어">KO</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="ar" aria-pressed="false" title="العربية">AR</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="he" aria-pressed="false" title="עברית">HE</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="hi" aria-pressed="false" title="हिन्दी">HI</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="tr" aria-pressed="false" title="Türkçe">TR</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="sv" aria-pressed="false" title="Svenska">SV</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="da" aria-pressed="false" title="Dansk">DA</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="no" aria-pressed="false" title="Norsk">NO</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="fi" aria-pressed="false" title="Suomi">FI</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="cs" aria-pressed="false" title="Čeština">CS</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="ro" aria-pressed="false" title="Română">RO</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="hu" aria-pressed="false" title="Magyar">HU</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="ca" aria-pressed="false" title="Català">CA</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="gl" aria-pressed="false" title="Galego">GL</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="eu" aria-pressed="false" title="Euskara">EU</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="gn" aria-pressed="false" title="Avañe\'ẽ (Guarani)">GN</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="qu" aria-pressed="false" title="Runasimi (Quechua)">QU</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="eo" aria-pressed="false" title="Esperanto">EO</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="vi" aria-pressed="false" title="Tiếng Việt">VI</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="id" aria-pressed="false" title="Bahasa Indonesia">ID</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="th" aria-pressed="false" title="ไทย">TH</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="hr" aria-pressed="false" title="Hrvatski">HR</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="sk" aria-pressed="false" title="Slovenčina">SK</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="ga" aria-pressed="false" title="Gaeilge">GA</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="cy" aria-pressed="false" title="Cymraeg">CY</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="ha" aria-pressed="false" title="Hausa">HA</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="am" aria-pressed="false" title="Amharic">AM</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="fa" aria-pressed="false" title="فارسی">FA</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="bn" aria-pressed="false" title="বাংলা">BN</button>' +
      '<button type="button" class="learn-toolbar-btn" data-learn-lang="zu" aria-pressed="false" title="isiZulu">ZU</button>' +
      '</div>' +
      '</div>' +
      '<p class="learn-toolbar-hint" data-learn-hint></p>' +
      '<p class="learn-toolbar-legend">' +
      '<span class="learn-legend-swatch learn-legend-swatch--danger" aria-hidden="true"></span>' +
      '<span data-learn-legend-danger></span> ' +
      '<a class="learn-toolbar-legend-link" href="/guia/palavras.html?group=aviso" data-learn-legend-link></a>' +
      '</p>';
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

    if (page === 'vida' || page === 'apresentacao-unifesp') {
      var mainVida = document.querySelector('#main-content');
      if (mainVida) {
        mainVida.setAttribute('data-learn-root', '');
        return mainVida;
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

  var bound = false;
  var localeBound = false;

  function bindScopeEvents() {
    if (!state.scope || bound) return;
    state.scope.addEventListener('pointerover', onPointerOver);
    state.scope.addEventListener('pointerout', onPointerOut);
    state.scope.addEventListener('pointerdown', onPointerDown);
    state.scope.addEventListener('dblclick', onWordDblClick);
    state.scope.addEventListener('focusin', onFocusIn);
    state.scope.addEventListener('focusout', onFocusOut);
    state.scope.addEventListener('selectstart', onSelectStart);
    state.scope.addEventListener('copy', onCopyCutPaste);
    state.scope.addEventListener('cut', onCopyCutPaste);
    state.scope.addEventListener('paste', onCopyCutPaste);
    state.scope.addEventListener('contextmenu', onContextMenu);
    bound = true;
  }

  function mount(root) {
    if (!root) return false;
    state.root = root;
    state.scope = document.getElementById('main-content') || root;
    state.reducedMotion = prefersReducedMotion();

    if (!state.toolbar) {
      state.toolbar = buildToolbar();
      state.toolbar.addEventListener('click', onToolbarClick);
    }
    if (!state.toolbar.isConnected) placeToolbar(root);

    bindScopeEvents();

    if (!localeBound) {
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
      localeBound = true;
    }

    var initial = state.lang || loadLang();
    if (initial) {
      state.lang = '';
      setLang(initial);
    } else {
      syncToolbar();
    }
    return true;
  }

  function init() {
    mount(resolveRoot());
  }

  function remount() {
    var root = document.querySelector('[data-learn-root]') || resolveRoot();
    if (!root) return false;
    // Se o DOM da aula foi reinjetado, o toolbar antigo pode ter sido apagado.
    if (state.toolbar && !state.toolbar.isConnected) state.toolbar = null;
    bound = false;
    return mount(root);
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
    },
    remount: remount
  };
})(typeof window !== 'undefined' ? window : globalThis);
