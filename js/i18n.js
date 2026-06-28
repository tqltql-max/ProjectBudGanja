(function (global) {
  'use strict';

  var STORAGE_KEY = 'budganja-lang';
  var SUPPORTED = ['pt-BR', 'en', 'es'];
  var LOCALES = global.__I18N_LOCALES__ || {};
  var currentLocale = 'pt-BR';

  function normalizeLocale(input) {
    var raw = String(input || '').trim().toLowerCase();
    if (!raw) return 'pt-BR';
    if (raw === 'pt' || raw.indexOf('pt-') === 0) return 'pt-BR';
    if (raw.indexOf('en') === 0) return 'en';
    if (raw.indexOf('es') === 0) return 'es';
    return 'pt-BR';
  }

  function detectLocale() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) { /* ignore */ }

    var list = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language || 'pt-BR'];
    for (var i = 0; i < list.length; i++) {
      var norm = normalizeLocale(list[i]);
      if (SUPPORTED.indexOf(norm) !== -1) return norm;
    }
    return 'pt-BR';
  }

  function getBundle(locale) {
    return LOCALES[locale] || LOCALES['pt-BR'] || {};
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
    if (fallback != null) return String(fallback);
    return lookup(getBundle('pt-BR'), key) || String(key || '');
  }

  function tMenu(slug, field, fallback) {
    var menu = getBundle(currentLocale).menu || {};
    var entry = menu[slug];
    if (entry && entry[field]) return entry[field];
    var pt = (LOCALES['pt-BR'] && LOCALES['pt-BR'].menu && LOCALES['pt-BR'].menu[slug]) || {};
    if (pt[field]) return pt[field];
    return fallback != null ? String(fallback) : '';
  }

  function getLocale() {
    return currentLocale;
  }

  function getLocaleMeta(locale) {
    var bundle = getBundle(locale || currentLocale);
    return bundle.meta || { name: locale, short: (locale || 'pt').slice(0, 2).toUpperCase() };
  }

  function setLocale(locale, options) {
    var next = SUPPORTED.indexOf(locale) !== -1 ? locale : 'pt-BR';
    if (next === currentLocale && !(options && options.force)) return;
    currentLocale = next;
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* ignore */ }
    if (document.documentElement) document.documentElement.lang = next;
    applyDomTranslations();
    global.dispatchEvent(new CustomEvent('budganja:locale-change', { detail: { locale: next } }));
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
  }

  function mountLanguageSwitcher(root) {
    if (!root || root.getAttribute('data-lang-mounted') === '1') return;
    root.setAttribute('data-lang-mounted', '1');

    var btn = root.querySelector('.lang-switcher-btn');
    var menu = root.querySelector('.lang-switcher-menu');
    if (!btn || !menu) return;

    function syncActive() {
      var meta = getLocaleMeta(currentLocale);
      btn.textContent = meta.short || currentLocale.slice(0, 2).toUpperCase();
      btn.setAttribute('aria-label', t('common.langChoose', 'Choose language'));
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
