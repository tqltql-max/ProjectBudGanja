(function (global) {
  'use strict';

  var STORAGE_KEY = 'budganja-lang';
  var SUPPORTED = ['en', 'pt-BR', 'es'];
  var LOCALES = global.__I18N_LOCALES__ || {};
  var currentLocale = 'en';

  function normalizeLocale(input) {
    var raw = String(input || '').trim().toLowerCase();
    if (!raw) return 'en';
    if (raw === 'pt' || raw.indexOf('pt-') === 0) return 'pt-BR';
    if (raw.indexOf('en') === 0) return 'en';
    if (raw.indexOf('es') === 0) return 'es';
    return 'en';
  }

  function detectLocale() {
    try {
      var params = new URLSearchParams((global.location && global.location.search) || '');
      var fromQuery = normalizeLocale(params.get('lang') || params.get('locale') || '');
      if (fromQuery && SUPPORTED.indexOf(fromQuery) !== -1) return fromQuery;
    } catch (e) { /* ignore */ }

    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) { /* ignore */ }

    // Padrão do site: inglês (domínio EN e .com.br).
    return 'en';
  }

  function getBundle(locale) {
    return LOCALES[locale] || LOCALES.en || LOCALES['pt-BR'] || {};
  }

  function lookup(obj, path) {
    if (!obj || !path) return '';
    var parts = String(path).split('.');
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (!cur || typeof cur !== 'object') return '';
      cur = cur[parts[i]];
    }
    return typeof cur === 'string' ? cur : '';
  }

  function t(key, fallback) {
    var value = lookup(getBundle(currentLocale), key);
    if (value) return value;
    if (currentLocale !== 'en') {
      value = lookup(getBundle('en'), key);
      if (value) return value;
    }
    if (fallback != null) return String(fallback);
    return lookup(getBundle('pt-BR'), key) || String(key || '');
  }

  function tMenu(slug, field, fallback) {
    var menu = getBundle(currentLocale).menu || {};
    var entry = menu[slug];
    if (entry && entry[field]) return entry[field];
    if (currentLocale !== 'en') {
      var en = (LOCALES.en && LOCALES.en.menu && LOCALES.en.menu[slug]) || {};
      if (en[field]) return en[field];
    }
    var pt = (LOCALES['pt-BR'] && LOCALES['pt-BR'].menu && LOCALES['pt-BR'].menu[slug]) || {};
    if (pt[field]) return pt[field];
    return fallback != null ? String(fallback) : '';
  }

  function getLocale() {
    return currentLocale;
  }

  function getLocaleMeta(locale) {
    var bundle = getBundle(locale || currentLocale);
    return bundle.meta || { name: locale, short: (locale || 'en').slice(0, 2).toUpperCase() };
  }

  function setLocale(locale, options) {
    var next = SUPPORTED.indexOf(locale) !== -1 ? locale : 'en';
    if (next === currentLocale && !(options && options.force)) return;
    currentLocale = next;
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* ignore */ }
    if (document.documentElement) document.documentElement.lang = next;
    applyDomTranslations();
    global.dispatchEvent(new CustomEvent('budganja:locale-change', { detail: { locale: next } }));
  }

  function syncPostI18nNotes() {
    document.querySelectorAll('[data-post-i18n-note]').forEach(function (note) {
      var show = currentLocale === 'en' || currentLocale === 'es';
      var hasEn = note.getAttribute('data-has-en') === '1';
      var hasEs = note.getAttribute('data-has-es') === '1';
      if (currentLocale === 'en' && !hasEn) show = hasEs;
      if (currentLocale === 'es' && !hasEs) show = hasEn;
      note.hidden = !show;
      if (show) note.removeAttribute('hidden');
      else note.setAttribute('hidden', '');

      note.querySelectorAll('[data-i18n-locale]').forEach(function (p) {
        var locale = p.getAttribute('data-i18n-locale');
        var active = locale === currentLocale;
        if (!active && currentLocale === 'en' && !hasEn && locale === 'es') active = true;
        if (!active && currentLocale === 'es' && !hasEs && locale === 'en') active = true;
        p.hidden = !active;
        if (active) p.removeAttribute('hidden');
        else p.setAttribute('hidden', '');
      });
    });
  }

  function applyDomTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!key) return;
      var value = t(key, el.textContent);
      if (value) el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (!key) return;
      var value = t(key, '');
      if (value) el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (!key) return;
      var value = t(key, el.getAttribute('placeholder') || '');
      if (value) el.setAttribute('placeholder', value);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (!key) return;
      var value = t(key, el.getAttribute('aria-label') || '');
      if (value) el.setAttribute('aria-label', value);
    });

    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-title');
      if (!key) return;
      var value = t(key, el.getAttribute('title') || '');
      if (value) el.setAttribute('title', value);
    });

    document.querySelectorAll('[data-i18n-tip]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-tip');
      if (!key) return;
      var value = t(key, el.getAttribute('data-tip') || '');
      if (!value) return;
      el.setAttribute('data-tip', value);
      var tipEl = el.querySelector('.app-tile-tip');
      if (tipEl) tipEl.textContent = value;
    });

    syncPostI18nNotes();
  }

  function mountLanguageSwitcher(root) {
    if (!root || root.getAttribute('data-lang-mounted') === '1') return;
    root.setAttribute('data-lang-mounted', '1');

    var btn = root.querySelector('.lang-switcher-btn');
    var menu = root.querySelector('.lang-switcher-menu');
    if (!btn || !menu) return;

    function syncActive() {
      var meta = getLocaleMeta(currentLocale);
      var code = meta.short || currentLocale.slice(0, 2).toUpperCase();
      var codeEl = btn.querySelector('.lang-switcher-code');
      if (codeEl) codeEl.textContent = code;
      else btn.textContent = code;
      btn.setAttribute('aria-label', t('common.langChoose', 'Choose language'));
      btn.setAttribute('title', t('common.langChoose', 'Choose language'));
      menu.querySelectorAll('[data-lang]').forEach(function (opt) {
        var active = opt.getAttribute('data-lang') === currentLocale;
        opt.classList.toggle('is-active', active);
        opt.setAttribute('aria-selected', active ? 'true' : 'false');
      });
    }

    function closeMenu() {
      menu.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = menu.hidden;
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    menu.querySelectorAll('[data-lang]').forEach(function (opt) {
      opt.addEventListener('click', function (e) {
        e.preventDefault();
        setLocale(opt.getAttribute('data-lang'));
        closeMenu();
      });
    });

    document.addEventListener('click', function (e) {
      if (!root.contains(e.target)) closeMenu();
    });

    global.addEventListener('budganja:locale-change', syncActive);
    syncActive();
  }

  function initLanguageSwitcher() {
    document.querySelectorAll('.lang-switcher').forEach(mountLanguageSwitcher);
  }

  function init() {
    currentLocale = detectLocale();
    if (document.documentElement) document.documentElement.lang = currentLocale;
    applyDomTranslations();
    initLanguageSwitcher();
  }

  currentLocale = detectLocale();
  if (document.documentElement) document.documentElement.lang = currentLocale;

  global.BudGanjaI18n = {
    SUPPORTED: SUPPORTED,
    t: t,
    tMenu: tMenu,
    getLocale: getLocale,
    getLocaleMeta: getLocaleMeta,
    setLocale: setLocale,
    apply: applyDomTranslations,
    init: init,
    initLanguageSwitcher: initLanguageSwitcher,
    localizeNavTree: localizeNavTree
  };

  function localizeNavTree(items) {
    if (!Array.isArray(items)) return items;
    return items.map(function (item) {
      var copy = Object.assign({}, item);
      var slug = copy.slug || String(copy.label || '').toLowerCase();
      if (copy.label === 'Biblioteca') copy.label = t('nav.library', copy.label);
      else if (copy.label === 'Ferramentas') copy.label = t('nav.tools', copy.label);
      else if (copy.label === 'Loja') copy.label = t('nav.shop', copy.label);
      if (copy.megaHeader === 'Biblioteca') copy.megaHeader = t('nav.library', copy.megaHeader);
      if (copy.megaHeader === 'Ferramentas') copy.megaHeader = t('nav.tools', copy.megaHeader);

      var menuSlug = copy.slug || slug;
      if (menuSlug) {
        copy.label = tMenu(menuSlug, 'label', copy.label) || copy.label;
        if (copy.tileLabel) copy.tileLabel = tMenu(menuSlug, 'tileLabel', copy.tileLabel) || copy.tileLabel;
        if (copy.description) copy.description = tMenu(menuSlug, 'description', copy.description) || copy.description;
      }

      if (copy.children) copy.children = localizeNavTree(copy.children);
      if (copy.groups) {
        copy.groups = copy.groups.map(function (group) {
          var g = Object.assign({}, group);
          if (g.items) g.items = localizeNavTree(g.items);
          return g;
        });
      }
      return copy;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
