(function (global) {
  'use strict';

  // v2: limpa preferências antigas presas em EN durante o período com default errado.
  var STORAGE_KEY = 'budganja-lang-v2';
  var LEGACY_STORAGE_KEY = 'budganja-lang';
  var LOCALES = global.__I18N_LOCALES__ || {};
  var PREFERRED_ORDER = [
    'pt-BR', 'en', 'es', 'fr', 'de', 'it', 'nl', 'pl', 'ru', 'tr',
    'ar', 'hi', 'id', 'vi', 'ja', 'ko', 'zh-CN'
  ];
  var RTL_LOCALES = { ar: 1, he: 1, fa: 1, ur: 1 };
  var SUPPORTED = Object.keys(LOCALES).length
    ? Object.keys(LOCALES).sort(function (a, b) {
        var ia = PREFERRED_ORDER.indexOf(a);
        var ib = PREFERRED_ORDER.indexOf(b);
        if (ia === -1 && ib === -1) return a.localeCompare(b);
        if (ia === -1) return 1;
        if (ib === -1) return -1;
        return ia - ib;
      })
    : ['pt-BR', 'en', 'es', 'fr'];
  var currentLocale = 'pt-BR';

  function isSupported(locale) {
    return SUPPORTED.indexOf(locale) !== -1;
  }

  function pickSupported(code) {
    return isSupported(code) ? code : '';
  }

  function normalizeLocale(input) {
    var raw = String(input || '').trim().replace(/_/g, '-').toLowerCase();
    if (!raw) return '';
    var i;
    for (i = 0; i < SUPPORTED.length; i++) {
      if (SUPPORTED[i].toLowerCase() === raw) return SUPPORTED[i];
    }
    if (
      raw.indexOf('zh-hant') === 0 ||
      raw.indexOf('zh-tw') === 0 ||
      raw.indexOf('zh-hk') === 0 ||
      raw.indexOf('zh-mo') === 0
    ) {
      return pickSupported('zh-TW') || pickSupported('zh-CN');
    }
    if (raw.indexOf('zh') === 0) return pickSupported('zh-CN');
    var lang = raw.split('-')[0];
    if (lang === 'pt') return pickSupported('pt-BR');
    for (i = 0; i < SUPPORTED.length; i++) {
      var s = SUPPORTED[i].toLowerCase();
      if (s === lang || s.indexOf(lang + '-') === 0) return SUPPORTED[i];
    }
    return '';
  }

  function defaultLocaleForHost() {
    try {
      var host = String((global.location && global.location.hostname) || '').toLowerCase();
      // Domínio EN: inglês por padrão.
      if (host === 'www.inspectorbudganja.com' || host === 'inspectorbudganja.com') {
        return 'en';
      }
      // Domínio PT (.com.br): português por padrão.
      if (
        host === 'inspetorbudganja.com.br' ||
        host === 'www.inspetorbudganja.com.br'
      ) {
        return 'pt-BR';
      }
    } catch (e) { /* ignore */ }
    // localhost / hosts desconhecidos: português.
    return 'pt-BR';
  }

  function persistLocale(locale) {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch (e) { /* ignore */ }
  }

  function detectFromNavigator() {
    var list = [];
    try {
      if (global.navigator && global.navigator.languages && global.navigator.languages.length) {
        list = Array.prototype.slice.call(global.navigator.languages);
      } else if (global.navigator && global.navigator.language) {
        list = [global.navigator.language];
      }
    } catch (e) { /* ignore */ }
    var i;
    for (i = 0; i < list.length; i++) {
      var loc = normalizeLocale(list[i]);
      if (loc && isSupported(loc)) return loc;
    }
    return '';
  }

  function detectLocale() {
    try {
      var params = new URLSearchParams((global.location && global.location.search) || '');
      var rawQuery = params.get('lang') || params.get('locale') || '';
      // Só usa a query quando há valor real (ex.: link partilhado ?lang=en).
      if (rawQuery) {
        var fromQuery = normalizeLocale(rawQuery);
        if (fromQuery && isSupported(fromQuery)) {
          persistLocale(fromQuery);
          return fromQuery;
        }
      }
    } catch (e) { /* ignore */ }

    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && isSupported(saved)) return saved;
    } catch (e) { /* ignore */ }

    var fromBrowser = detectFromNavigator();
    if (fromBrowser) return fromBrowser;

    // Padrão por domínio: .com.br → PT, inspectorbudganja.com → EN.
    return defaultLocaleForHost();
  }

  function applyDocumentLang(locale) {
    if (!document.documentElement) return;
    document.documentElement.lang = locale;
    var rtl = !!(RTL_LOCALES[locale] || String(locale).indexOf('ar') === 0);
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
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
    var next = isSupported(locale) ? locale : 'pt-BR';
    if (next === currentLocale && !(options && options.force)) return;
    currentLocale = next;
    persistLocale(next);
    applyDocumentLang(next);
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
      'posts.categoryEquipment': 'Objects',
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
    applyAnimalPageTranslations();
    applyAnimalHubTranslations();
    applyTecnologiaHubTranslations();
    applyMitologiaHubTranslations();
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
    // Hubs com conteúdo dinâmico — não substituir o main inteiro.
    if (
      main.querySelector('.publications-equipamentos') ||
      main.querySelector('#objetos-catalog') ||
      main.querySelector('[data-inspecao-grid]') ||
      main.querySelector('#plantas-grid') ||
      main.querySelector('#animais-grid') ||
      main.querySelector('#fungos-grid') ||
      main.querySelector('#tecnologia-grid') ||
      main.querySelector('#mitologia-grid') ||
      main.querySelector('#videos-player') ||
      document.body.dataset.page === 'equipamentos' ||
      document.body.dataset.page === 'objetos' ||
      document.body.dataset.page === 'cultivo' ||
      document.body.dataset.page === 'comunidade' ||
      document.body.dataset.page === 'videos' ||
      document.body.dataset.page === 'animais' ||
      document.body.dataset.page === 'animal' ||
      document.body.dataset.page === 'fungos' ||
      document.body.dataset.page === 'fungo' ||
      document.body.dataset.page === 'tecnologia' ||
      document.body.dataset.page === 'mitologia' ||
      document.body.dataset.postSlug
    ) {
      return;
    }

    var key = resolvePageTranslationKey();
    var entry = map[key];
    if (!entry) {
      // aliases comuns
      if (key === 'equipamentos/') entry = map['equipamentos/index.html'];
      if (key === 'objetos/') entry = map['objetos/index.html'] || map['equipamentos/index.html'];
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
    if (!document.body || (document.body.dataset.page !== 'planta' && document.body.dataset.page !== 'fungo')) return;
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
    document.querySelectorAll('[data-planta-related-label]').forEach(function (el) {
      var key = currentLocale === 'en' ? 'labelEn' : currentLocale === 'es' ? 'labelEs' : 'labelPt';
      var attr =
        key === 'labelEn'
          ? 'data-label-en'
          : key === 'labelEs'
            ? 'data-label-es'
            : 'data-label-pt';
      var next = el.getAttribute(attr);
      if (next) el.textContent = next;
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
    if (!document.body || (document.body.dataset.page !== 'plantas' && document.body.dataset.page !== 'fungos')) return;
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

  function applyTecnologiaHubTranslations() {
    if (!document.body || document.body.dataset.page !== 'tecnologia') return;
    var loc = currentLocale === 'en' ? 'en' : currentLocale === 'es' ? 'es' : 'pt';
    document.querySelectorAll('#tecnologia-grid .planta-card').forEach(function (card) {
      var nome =
        (card.getAttribute('data-nome-' + loc) || '').trim() ||
        (card.getAttribute('data-nome-pt') || '').trim();
      var summary =
        (card.getAttribute('data-summary-' + loc) || '').trim() ||
        (card.getAttribute('data-summary-pt') || '').trim();
      var kicker =
        (card.getAttribute('data-kicker-' + loc) || '').trim() ||
        (card.getAttribute('data-kicker-pt') || '').trim();
      var titleEl = card.querySelector('[data-tech-nome]');
      var summaryEl = card.querySelector('[data-tech-summary]');
      var kickerEl = card.querySelector('[data-tech-kicker]');
      if (titleEl && nome) titleEl.textContent = nome;
      if (summaryEl && summary) summaryEl.textContent = summary;
      if (kickerEl && kicker) kickerEl.textContent = kicker;
    });
  }

  function applyMitologiaHubTranslations() {
    if (!document.body || document.body.dataset.page !== 'mitologia') return;
    var loc = currentLocale === 'en' ? 'en' : currentLocale === 'es' ? 'es' : 'pt';
    document.querySelectorAll('#mitologia-grid .planta-card').forEach(function (card) {
      var nome =
        (card.getAttribute('data-nome-' + loc) || '').trim() ||
        (card.getAttribute('data-nome-pt') || '').trim();
      var summary =
        (card.getAttribute('data-summary-' + loc) || '').trim() ||
        (card.getAttribute('data-summary-pt') || '').trim();
      var kicker =
        (card.getAttribute('data-kicker-' + loc) || '').trim() ||
        (card.getAttribute('data-kicker-pt') || '').trim();
      var titleEl = card.querySelector('[data-myth-nome]');
      var summaryEl = card.querySelector('[data-myth-summary]');
      var kickerEl = card.querySelector('[data-myth-kicker]');
      if (titleEl && nome) titleEl.textContent = nome;
      if (summaryEl && summary) summaryEl.textContent = summary;
      if (kickerEl && kicker) kickerEl.textContent = kicker;
    });
  }

  function applyAnimalPageTranslations() {
    if (!document.body || document.body.dataset.page !== 'animal') return;
    var dataEl = document.getElementById('animal-i18n-data');
    if (!dataEl) return;
    var payload = null;
    try {
      payload = JSON.parse(dataEl.textContent || '{}');
    } catch (e) {
      return;
    }
    var fields = payload[currentLocale] || payload['pt-BR'] || null;
    if (!fields) return;

    document.querySelectorAll('[data-animal-nome]').forEach(function (el) {
      el.textContent = fields.nomePopular || el.textContent;
    });
    document.querySelectorAll('[data-animal-summary]').forEach(function (el) {
      el.textContent = fields.summary || el.textContent;
    });
    document.querySelectorAll('[data-animal-cautions]').forEach(function (el) {
      el.textContent = fields.cautions || el.textContent;
    });
    document.querySelectorAll('[data-animal-related-label]').forEach(function (el) {
      var key = currentLocale === 'en' ? 'labelEn' : currentLocale === 'es' ? 'labelEs' : 'labelPt';
      var attr =
        key === 'labelEn'
          ? 'data-label-en'
          : key === 'labelEs'
            ? 'data-label-es'
            : 'data-label-pt';
      var next = el.getAttribute(attr);
      if (next) el.textContent = next;
    });
    fillList(document.querySelector('[data-animal-parts]'), fields.partsUsed);
    fillList(document.querySelector('[data-animal-uses]'), fields.traditionalUses);

    if (fields.nomePopular) {
      document.title = fields.nomePopular + ' | Inspetor BudGanja';
    }
    if (fields.summary) {
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', fields.summary.slice(0, 160));
    }
  }

  function applyAnimalHubTranslations() {
    if (!document.body || document.body.dataset.page !== 'animais') return;
    var attrNome =
      currentLocale === 'en' ? 'data-nome-en' : currentLocale === 'es' ? 'data-nome-es' : 'data-nome-pt';
    var attrSummary =
      currentLocale === 'en'
        ? 'data-summary-en'
        : currentLocale === 'es'
          ? 'data-summary-es'
          : 'data-summary-pt';
    document.querySelectorAll('.animal-card').forEach(function (card) {
      var nome =
        (card.getAttribute(attrNome) || '').trim() ||
        (card.getAttribute('data-nome-pt') || '').trim();
      var summary =
        (card.getAttribute(attrSummary) || '').trim() ||
        (card.getAttribute('data-summary-pt') || '').trim();
      var titleEl = card.querySelector('[data-animal-nome]');
      var summaryEl = card.querySelector('[data-animal-summary]');
      if (titleEl && nome) titleEl.textContent = nome;
      if (summaryEl && summary) summaryEl.textContent = summary;
    });
  }

  var PAGE_I18N_MAP = {
    plantas: 'plantas',
    animais: 'animais',
    animal: 'animais',
    fungos: 'fungos',
    fungo: 'fungos',
    tecnologia: 'tecnologia',
    mitologia: 'mitologia',
    videos: 'videos',
    inspecoes: 'inspections',
    pesquisas: 'research',
    calculadora: 'tools',
    equipamentos: 'equipment',
    objetos: 'equipment',
    cultivo: 'cultivo',
    comunidade: 'community',
    sorteios: 'giveaways',
    unifesp: 'unifesp',
    'cadernos-engenharia': 'cadernosEngenharia',
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

  function localeOptionsHtml() {
    return SUPPORTED.map(function (code) {
      var meta = getLocaleMeta(code);
      var name = (meta && meta.name) || code;
      return (
        '<li><button type="button" class="lang-switcher-option" data-lang="' +
        code +
        '" role="option">' +
        name +
        '</button></li>'
      );
    }).join('');
  }

  function mountLanguageSwitcher(root) {
    if (!root || root.getAttribute('data-lang-mounted') === '1') return;
    root.setAttribute('data-lang-mounted', '1');

    var btn = root.querySelector('.lang-switcher-btn');
    var menu = root.querySelector('.lang-switcher-menu');
    if (!btn || !menu) return;
    menu.innerHTML = localeOptionsHtml();

    function syncActive() {
      var meta = getLocaleMeta(currentLocale);
      var code = meta.short || currentLocale.slice(0, 2).toUpperCase();
      var codeEl = btn.querySelector('.lang-switcher-code');
      if (codeEl) codeEl.textContent = code;
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

    menu.addEventListener('wheel', function (e) {
      e.stopPropagation();
    }, { passive: true });
    menu.addEventListener('touchmove', function (e) {
      e.stopPropagation();
    }, { passive: true });

    menu.querySelectorAll('[data-lang]').forEach(function (opt) {
      opt.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
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
    applyDocumentLang(currentLocale);
    applyDomTranslations();
    initLanguageSwitcher();
  }

  currentLocale = detectLocale();
  applyDocumentLang(currentLocale);

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
    localizeNavTree: localizeNavTree,
    normalizeLocale: normalizeLocale
  };

  function localizeNavTree(items) {
    if (!Array.isArray(items)) return items;
    return items.map(function (item) {
      var copy = Object.assign({}, item);
      var slug = copy.slug || String(copy.label || '').toLowerCase();
      if (copy.label === 'Biblioteca') copy.label = t('nav.library', copy.label);
      else if (copy.label === 'Ferramentas') copy.label = t('nav.tools', copy.label);
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
