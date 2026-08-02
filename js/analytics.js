/**
 * Google Analytics 4 (GA4) + Consent Mode v2 + banner LGPD.
 * O mesmo popup anuncia o que está a ser atualizado (content/site-update.json → version.json).
 * Measurement ID vem de site.gaMeasurementId (fallback G-Q47PEYEXX6).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'budganja_analytics_consent';
  var UPDATE_DISMISS_KEY = 'budganja_site_update_dismissed';
  var DEFAULT_ID = 'G-Q47PEYEXX6';
  var BANNER_ID = 'budganja-cookie-consent';
  var SCRIPT_ID = 'budganja-gtag-js';
  var loaded = false;
  var measurementId = DEFAULT_ID;
  var cachedUpdate = null;
  var updateLoaded = false;
  var updateFetchStarted = false;
  var updateWaiters = [];

  function t(key, fallback) {
    try {
      if (window.BudGanjaI18n && typeof window.BudGanjaI18n.t === 'function') {
        return window.BudGanjaI18n.t(key, fallback);
      }
    } catch (e) { /* ignore */ }
    return fallback;
  }

  function currentLocale() {
    try {
      if (window.BudGanjaI18n && typeof window.BudGanjaI18n.getLocale === 'function') {
        return window.BudGanjaI18n.getLocale() || 'pt-BR';
      }
    } catch (e) { /* ignore */ }
    var htmlLang = (document.documentElement.getAttribute('lang') || '').trim();
    if (htmlLang === 'en' || htmlLang.indexOf('en-') === 0) return 'en';
    if (htmlLang === 'es' || htmlLang.indexOf('es-') === 0) return 'es';
    return 'pt-BR';
  }

  function pickLocalized(map, fallback) {
    if (!map) return fallback || '';
    if (typeof map === 'string') return map;
    var loc = currentLocale();
    return map[loc] || map['pt-BR'] || map.en || map.es || fallback || '';
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function readConsent() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (v === 'granted' || v === 'denied') return v;
    } catch (e) { /* private mode */ }
    return null;
  }

  function writeConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) { /* ignore */ }
  }

  function wasUpdateDismissed(id) {
    if (!id) return true;
    try {
      return localStorage.getItem(UPDATE_DISMISS_KEY) === String(id);
    } catch (e) {
      return false;
    }
  }

  function rememberUpdateDismissed(id) {
    if (!id) return;
    try {
      localStorage.setItem(UPDATE_DISMISS_KEY, String(id));
    } catch (e) { /* ignore */ }
  }

  function ensureDataLayer() {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== 'function') {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }
  }

  function applyDefaultConsent() {
    ensureDataLayer();
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
      wait_for_update: 500
    });
    window.gtag('set', 'ads_data_redaction', true);
  }

  function updateConsent(granted) {
    ensureDataLayer();
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  }

  function loadGtag() {
    if (loaded || document.getElementById(SCRIPT_ID)) {
      loaded = true;
      return;
    }
    ensureDataLayer();
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      anonymize_ip: true,
      send_page_view: true
    });
    var s = document.createElement('script');
    s.id = SCRIPT_ID;
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(s);
    loaded = true;
  }

  function removeBanner() {
    var el = document.getElementById(BANNER_ID);
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function buildUpdateHtml(update) {
    if (!update || !update.id || wasUpdateDismissed(update.id)) return '';
    var title = pickLocalized(update.title, '');
    var text = pickLocalized(update.text, '');
    if (!title && !text) return '';
    return (
      '<div class="cookie-consent-update cookie-consent-update--minimal" data-update-id="' +
      escapeHtml(update.id) +
      '">' +
      (title
        ? '<p class="cookie-consent-update-title cookie-consent-update-title--whisper">' +
          escapeHtml(title) +
          '</p>'
        : '') +
      (text
        ? '<p class="cookie-consent-update-text">' + escapeHtml(text) + '</p>'
        : '') +
      '</div>'
    );
  }

  function cookieTextHtml() {
    return (
      '<p class="cookie-consent-text">' +
      escapeHtml(
        t(
          'common.cookieConsentText',
          'Usamos o Google Analytics (GA4) para entender o uso do site. Cookies de publicidade ficam desligados. Pode aceitar ou recusar — detalhes na política de privacidade'
        )
      ) +
      ' <a href="/info/privacidade.html">' +
      escapeHtml(t('common.footerPrivacy', 'Privacidade')) +
      '</a>.' +
      '</p>'
    );
  }

  function paintBanner(mode, update) {
    removeBanner();

    var updateHtml = buildUpdateHtml(update);
    var showCookies = mode === 'consent' || mode === 'both';
    var showUpdateOnly = mode === 'update' && !!updateHtml;
    if (!showCookies && !showUpdateOnly) return;
    if (mode === 'both' && !updateHtml) mode = 'consent';

    var root = document.createElement('div');
    root.id = BANNER_ID;
    root.className =
      'cookie-consent cookie-consent--center cookie-consent--gold' +
      (mode === 'update' ? ' cookie-consent--update-only' : '');
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-live', 'polite');
    root.setAttribute(
      'aria-label',
      mode === 'update'
        ? t('common.siteUpdateAria', 'Novidades do site')
        : t('common.cookieConsentAria', 'Consentimento de cookies e métricas')
    );

    var actions;
    if (mode === 'update') {
      actions =
        '<div class="cookie-consent-actions">' +
        '<button type="button" class="botao cookie-consent-accept" data-update-dismiss="1">' +
        escapeHtml(pickLocalized(update && update.cta, t('common.siteUpdateGotIt', 'Aceitar'))) +
        '</button>' +
        '</div>';
    } else {
      actions =
        '<div class="cookie-consent-actions">' +
        '<button type="button" class="botao botao-outline cookie-consent-deny" data-consent="denied">' +
        escapeHtml(t('common.cookieConsentDeny', 'Recusar')) +
        '</button>' +
        '<button type="button" class="botao cookie-consent-accept" data-consent="granted">' +
        escapeHtml(t('common.cookieConsentAccept', 'Aceitar métricas')) +
        '</button>' +
        '</div>';
    }

    root.innerHTML =
      '<div class="cookie-consent-backdrop" aria-hidden="true"></div>' +
      '<div class="cookie-consent-inner">' +
      '<span class="cookie-consent-ornament" aria-hidden="true"></span>' +
      '<div class="cookie-consent-copy">' +
      updateHtml +
      (mode === 'update' ? '' : cookieTextHtml()) +
      '</div>' +
      actions +
      '</div>';

    document.body.appendChild(root);

    root.addEventListener('click', function (e) {
      var dismissBtn = e.target.closest('[data-update-dismiss]');
      if (dismissBtn) {
        var block = root.querySelector('[data-update-id]');
        var id = block && block.getAttribute('data-update-id');
        rememberUpdateDismissed(id || (update && update.id));
        removeBanner();
        return;
      }

      var btn = e.target.closest('[data-consent]');
      if (!btn) return;
      var value = btn.getAttribute('data-consent');
      if (value !== 'granted' && value !== 'denied') return;
      writeConsent(value);
      updateConsent(value === 'granted');
      if (value === 'granted') loadGtag();
      // Ao aceitar/recusar cookies, marca a novidade como vista (já estava no popup).
      if (update && update.id) rememberUpdateDismissed(update.id);
      removeBanner();
    });
  }

  function showBanner(update) {
    paintBanner('both', update || cachedUpdate);
  }

  function showUpdateBanner(update) {
    paintBanner('update', update || cachedUpdate);
  }

  function applyUpdateToOpenBanner(update) {
    var root = document.getElementById(BANNER_ID);
    if (!root || root.classList.contains('cookie-consent--update-only')) return;
    var copy = root.querySelector('.cookie-consent-copy');
    if (!copy) return;
    if (copy.querySelector('.cookie-consent-update')) return;
    var html = buildUpdateHtml(update);
    if (!html) return;
    copy.insertAdjacentHTML('afterbegin', html);
  }

  function loadSiteUpdate(cb) {
    if (updateLoaded) {
      if (cb) cb(cachedUpdate);
      return;
    }
    if (cb) updateWaiters.push(cb);
    if (updateFetchStarted) return;
    updateFetchStarted = true;
    fetch('/version.json?_=' + Date.now(), { cache: 'no-store', credentials: 'same-origin' })
      .then(function (res) {
        return res.ok ? res.json() : null;
      })
      .then(function (data) {
        cachedUpdate = (data && data.update) || null;
      })
      .catch(function () {
        cachedUpdate = null;
      })
      .finally(function () {
        updateLoaded = true;
        updateFetchStarted = false;
        var waiters = updateWaiters.slice();
        updateWaiters = [];
        for (var i = 0; i < waiters.length; i++) {
          try {
            waiters[i](cachedUpdate);
          } catch (e) { /* ignore */ }
        }
      });
  }

  function init(site) {
    var id = site && site.gaMeasurementId ? String(site.gaMeasurementId).trim() : '';
    if (id) measurementId = id;
    if (!measurementId) return;

    applyDefaultConsent();

    var consent = readConsent();
    if (consent === 'granted') {
      updateConsent(true);
      loadGtag();
      loadSiteUpdate(function (update) {
        if (update && update.id && !wasUpdateDismissed(update.id)) {
          showUpdateBanner(update);
        }
      });
      return;
    }
    if (consent === 'denied') {
      updateConsent(false);
      loadSiteUpdate(function (update) {
        if (update && update.id && !wasUpdateDismissed(update.id)) {
          showUpdateBanner(update);
        }
      });
      return;
    }
    // Ainda sem escolha: carrega gtag com storage denied (Consent Mode) + banner.
    loadGtag();
    showBanner(null);
    loadSiteUpdate(function (update) {
      if (!update) return;
      applyUpdateToOpenBanner(update);
      // Se o banner ainda não existe (race), reabre com ambos.
      if (!document.getElementById(BANNER_ID) && !readConsent()) {
        showBanner(update);
      }
    });
  }

  function resetConsent() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) { /* ignore */ }
    updateConsent(false);
    loadSiteUpdate(function (update) {
      showBanner(update);
    });
  }

  // Delegação: o botão na página de privacidade pode ser reinjetado pelo i18n.
  document.addEventListener('click', function (e) {
    var btn = e.target && e.target.closest ? e.target.closest('#privacy-reset-analytics') : null;
    if (!btn) return;
    e.preventDefault();
    resetConsent();
  });

  window.BudGanjaAnalytics = {
    init: init,
    resetConsent: resetConsent,
    getConsent: readConsent,
    measurementId: function () {
      return measurementId;
    },
    getSiteUpdate: function () {
      return cachedUpdate;
    }
  };
})();
