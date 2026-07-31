(function (global) {
  'use strict';

  // v2: limpa preferências antigas presas em EN durante o período com default errado.
  var STORAGE_KEY = 'budganja-lang-v2';
  var LEGACY_STORAGE_KEY = 'budganja-lang';
  var SUPPORTED = ['en', 'pt-BR', 'es'];
  var LOCALES = global.__I18N_LOCALES__ || {};
  var currentLocale = 'pt-BR';

  function normalizeLocale(input) {
    var raw = String(input || '').trim().toLowerCase();
    if (!raw) return '';
    if (raw === 'pt' || raw.indexOf('pt-') === 0) return 'pt-BR';
    if (raw.indexOf('en') === 0) return 'en';
    if (raw.indexOf('es') === 0) return 'es';
    return '';
  }

  function detectLocale() {
    try {
      var params = new URLSearchParams((global.location && global.location.search) || '');
      var rawQuery = params.get('lang') || params.get('locale') || '';
      // Só usa a query quando há valor real (ex.: link partilhado ?lang=en).
      if (rawQuery) {
        var fromQuery = normalizeLocale(rawQuery);
        if (fromQuery && SUPPORTED.indexOf(fromQuery) !== -1) return fromQuery;
      }
    } catch (e) { /* ignore */ }

    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) { /* ignore */ }

    // Padrão do site: português.
    return 'pt-BR';
  }

  function clearLocaleFromUrl() {
    try {
      if (!global.history || !global.history.replaceState || !global.location) return;
      var url = new URL(global.location.href);
      if (!url.searchParams.has('lang') && !url.searchParams.has('locale')) return;
      url.searchParams.delete('lang');
      url.searchParams.delete('locale');
      var search = url.searchParams.toString();
      global.history.replaceState({}, '', url.pathname + (search ? '?' + search : '') + url.hash);
    } catch (e) { /* ignore */ }
  }

  function getBundle(locale) {
    return LOCALES[locale] || LOCALES['pt-BR'] || LOCALES.en || {};
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
    return bundle.meta || { name: locale, short: (locale || 'pt-BR').slice(0, 2).toUpperCase() };
  }

  function setLocale(locale, options) {
    var next = SUPPORTED.indexOf(locale) !== -1 ? locale : 'pt-BR';
    if (next === currentLocale && !(options && options.force)) return;
    currentLocale = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch (e) { /* ignore */ }
    if (document.documentElement) document.documentElement.lang = next;
    // Não grava ?lang= na URL (ficava preso em EN). Limpa query antiga ao escolher no seletor.
    if (!(options && options.skipUrl)) clearLocaleFromUrl();
    applyDomTranslations();
    global.dispatchEvent(new CustomEvent('budganja:locale-change', { detail: { locale: next } }));
  }

  function syncPostI18nNotes() {
    document.querySelectorAll('[data-post-i18n-note]').forEach(function (note) {
      var hasBodyEn = note.getAttribute('data-has-body-en') === '1';
      var hasBodyEs = note.getAttribute('data-has-body-es') === '1';
      // Corpo completo no idioma actual → esconder nota de resumo.
      if (
        (currentLocale === 'en' && hasBodyEn) ||
        (currentLocale === 'es' && hasBodyEs) ||
        currentLocale === 'pt-BR'
      ) {
        note.hidden = true;
        note.setAttribute('hidden', '');
        return;
      }

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

  function formatPostDate(iso) {
    if (!iso) return '';
    var d = new Date(iso.length === 10 ? iso + 'T12:00:00' : iso);
    if (Number.isNaN(d.getTime())) return iso;
    try {
      return new Intl.DateTimeFormat(currentLocale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'America/Sao_Paulo'
      }).format(d);
    } catch (e) {
      return iso;
    }
  }

  function applyPostPageTranslations() {
    if (!document.body || !document.body.dataset.postSlug) return;

    var categoryKeyFallback = {
      'posts.categoryInspection': 'Inspections',
      'posts.categoryEquipment': 'Equipment',
      'posts.categoryResearch': 'Research'
    };

    document.querySelectorAll('[data-post-category]').forEach(function (el) {
      var key = el.getAttribute('data-category-key') || 'posts.categoryResearch';
      el.textContent = t(key, categoryKeyFallback[key] || el.textContent);
    });

    document.querySelectorAll('[data-post-back]').forEach(function (el) {
      var key = el.getAttribute('data-category-key') || 'posts.categoryResearch';
      var label = t(key, categoryKeyFallback[key] || '');
      el.textContent = t('posts.backTo', '← Back to {label}').replace('{label}', label);
    });

    var titleEl = document.querySelector('[data-post-title]');
    if (titleEl) {
      var attr =
        currentLocale === 'en'
          ? 'data-title-en'
          : currentLocale === 'es'
            ? 'data-title-es'
            : 'data-title-pt';
      var localized = (titleEl.getAttribute(attr) || '').trim();
      // Fallback: menu.i18n do mega-menu (slug do post com prefixo post-)
      if (!localized && currentLocale !== 'pt-BR') {
        var postSlug = document.body.dataset.postSlug || '';
        var menuSlug = postSlug.indexOf('post-') === 0 ? postSlug : 'post-' + postSlug;
        localized = tMenu(menuSlug, 'label', '') || tMenu(postSlug, 'label', '');
      }
      if (!localized) {
        localized =
          (titleEl.getAttribute('data-title-pt') || '').trim() ||
          titleEl.textContent;
      }
      if (localized) titleEl.textContent = localized;
      var docTitle = localized + ' | Inspetor BudGanja';
      if (document.title !== docTitle) document.title = docTitle;
    }

    document.querySelectorAll('[data-post-date]').forEach(function (el) {
      var iso = el.getAttribute('data-date-iso') || '';
      var formatted = formatPostDate(iso);
      if (formatted) {
        el.textContent = t('posts.publishedOn', 'Published on {date}').replace('{date}', formatted);
      }
    });

    var header = document.querySelector('[data-post-header]');
    if (header) {
      var excerptAttr =
        currentLocale === 'en'
          ? 'data-excerpt-en'
          : currentLocale === 'es'
            ? 'data-excerpt-es'
            : 'data-excerpt-pt';
      var excerpt =
        (header.getAttribute(excerptAttr) || '').trim() ||
        (header.getAttribute('data-excerpt-pt') || '').trim();
      if (excerpt) {
        var metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', excerpt);
      }
    }

    var bodies = document.querySelectorAll('[data-post-body]');
    if (bodies.length) {
      var shown = false;
      bodies.forEach(function (el) {
        var loc = el.getAttribute('data-locale') || 'pt-BR';
        var match = loc === currentLocale;
        if (!match && currentLocale === 'en' && loc === 'pt-BR') {
          // fallback abaixo
        }
        if (match) {
          el.hidden = false;
          el.removeAttribute('hidden');
          shown = true;
        } else {
          el.hidden = true;
          el.setAttribute('hidden', '');
        }
      });
      if (!shown) {
        bodies.forEach(function (el) {
          if ((el.getAttribute('data-locale') || '') === 'pt-BR') {
            el.hidden = false;
            el.removeAttribute('hidden');
          }
        });
      }
    }
  }

  function applyDomTranslations() {
    applyPageBodyTranslations();

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

    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-alt');
      if (!key) return;
      var value = t(key, el.getAttribute('alt') || '');
      if (value) el.setAttribute('alt', value);
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

    applyPostPageTranslations();
    applyPlantPageTranslations();
    applyPlantHubTranslations();
    applyHubPageTranslations();
    syncPostI18nNotes();
  }

  function resolvePageTranslationKey() {
    var path = (global.location && global.location.pathname) || '';
    path = path.replace(/^\//, '');
    if (!path || path.endsWith('/')) path = path + 'index.html';
    if (path.indexOf('.html') === -1 && path.slice(-1) !== '/') path = path + '/index.html';
    return path;
  }

  function applyPageBodyTranslations() {
    var map = global.__PAGE_TRANSLATIONS__;
    if (!map) return;
    var main = document.getElementById('main-content');
    if (!main) return;
    // Hubs com conteúdo dinâmico (posts/loja) — não substituir o main inteiro.
    if (
      main.querySelector('.publications-equipamentos') ||
      main.querySelector('[data-equip-loja]') ||
      main.querySelector('[data-inspecao-grid]') ||
      main.querySelector('#plantas-grid') ||
      document.body.dataset.page === 'equipamentos' ||
      document.body.dataset.page === 'cultivo' ||
      document.body.dataset.page === 'comunidade' ||
      document.body.dataset.postSlug
    ) {
      return;
    }

    var key = resolvePageTranslationKey();
    var entry = map[key];
    if (!entry) {
      // aliases comuns
      if (key === 'biblioteca/unifesp/') entry = map['biblioteca/unifesp/index.html'];
      if (key === 'equipamentos/') entry = map['equipamentos/index.html'];
    }
    if (!entry) return;

    if (!global.__PAGE_BODY_PT__) {
      global.__PAGE_BODY_PT__ = main.innerHTML;
    }

    if (currentLocale === 'pt-BR') {
      main.innerHTML = global.__PAGE_BODY_PT__;
      return;
    }

    var loc = entry[currentLocale];
    if (!loc || !loc.bodyHtml) return;
    main.innerHTML = loc.bodyHtml;
    if (loc.title) document.title = loc.title;
  }

  function fillList(ul, items) {
    if (!ul) return;
    ul.innerHTML = '';
    (items || []).forEach(function (item) {
      var li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
    if (!ul.children.length) {
      var empty = document.createElement('li');
      empty.textContent = '—';
      ul.appendChild(empty);
    }
  }

  function applyPlantPageTranslations() {
    if (!document.body || document.body.dataset.page !== 'planta') return;
    var dataEl = document.getElementById('planta-i18n-data');
    if (!dataEl) return;
    var payload = null;
    try {
      payload = JSON.parse(dataEl.textContent || '{}');
    } catch (e) {
      return;
    }
    var fields = payload[currentLocale] || payload['pt-BR'] || null;
    if (!fields) return;

    document.querySelectorAll('[data-planta-nome]').forEach(function (el) {
      el.textContent = fields.nomePopular || el.textContent;
    });
    document.querySelectorAll('[data-planta-summary]').forEach(function (el) {
      el.textContent = fields.summary || el.textContent;
    });
    document.querySelectorAll('[data-planta-cautions]').forEach(function (el) {
      el.textContent = fields.cautions || el.textContent;
    });
    fillList(document.querySelector('[data-planta-parts]'), fields.partsUsed);
    fillList(document.querySelector('[data-planta-uses]'), fields.traditionalUses);

    if (fields.nomePopular) {
      document.title = fields.nomePopular + ' | Inspetor BudGanja';
    }
    if (fields.summary) {
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', fields.summary.slice(0, 160));
    }
  }

  function applyPlantHubTranslations() {
    if (!document.body || document.body.dataset.page !== 'plantas') return;
    var attrNome =
      currentLocale === 'en' ? 'data-nome-en' : currentLocale === 'es' ? 'data-nome-es' : 'data-nome-pt';
    var attrSummary =
      currentLocale === 'en'
        ? 'data-summary-en'
        : currentLocale === 'es'
          ? 'data-summary-es'
          : 'data-summary-pt';
    document.querySelectorAll('.planta-card').forEach(function (card) {
      var nome =
        (card.getAttribute(attrNome) || '').trim() ||
        (card.getAttribute('data-nome-pt') || '').trim();
      var summary =
        (card.getAttribute(attrSummary) || '').trim() ||
        (card.getAttribute('data-summary-pt') || '').trim();
      var titleEl = card.querySelector('[data-planta-nome]');
      var summaryEl = card.querySelector('[data-planta-summary]');
      if (titleEl && nome) titleEl.textContent = nome;
      if (summaryEl && summary) summaryEl.textContent = summary;
    });
  }

  var PAGE_I18N_MAP = {
    plantas: 'plantas',
    videos: 'videos',
    inspecoes: 'inspections',
    pesquisas: 'research',
    calculadora: 'tools',
    equipamentos: 'equipment',
    cultivo: 'cultivo',
    comunidade: 'community',
    sorteios: 'giveaways',
    loja: 'shop',
    unifesp: 'unifesp',
    sobre: 'about',
    contato: 'contact',
    privacidade: 'privacy',
    entrar: 'login',
    perfil: 'profile',
    home: 'home'
  };

  function applyHubPageTranslations() {
    if (!document.body) return;
    var page = document.body.dataset.page || '';
    var hubKey = PAGE_I18N_MAP[page];
    if (!hubKey || hubKey === 'home') return;
    // Não sobrescrever título de posts (já tratado em applyPostPageTranslations).
    if (document.body.dataset.postSlug) return;
    var docTitle = t('pages.' + hubKey + '.docTitle', '');
    if (docTitle) document.title = docTitle;
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
    try {
      localStorage.setItem(STORAGE_KEY, currentLocale);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch (e) { /* ignore */ }
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
