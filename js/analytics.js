/**
 * Google Analytics 4 (GA4) + Consent Mode v2 + banner LGPD.
 * Measurement ID vem de site.gaMeasurementId (fallback G-Q47PEYEXX6).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'budganja_analytics_consent';
  var DEFAULT_ID = 'G-Q47PEYEXX6';
  var BANNER_ID = 'budganja-cookie-consent';
  var SCRIPT_ID = 'budganja-gtag-js';
  var loaded = false;
  var measurementId = DEFAULT_ID;

  function t(key, fallback) {
    try {
      if (window.BudGanjaI18n && typeof window.BudGanjaI18n.t === 'function') {
        return window.BudGanjaI18n.t(key, fallback);
      }
    } catch (e) { /* ignore */ }
    return fallback;
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

  function showBanner() {
    if (document.getElementById(BANNER_ID)) return;

    var root = document.createElement('div');
    root.id = BANNER_ID;
    root.className = 'cookie-consent';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-live', 'polite');
    root.setAttribute('aria-label', t('common.cookieConsentAria', 'Consentimento de cookies e métricas'));

    root.innerHTML =
      '<div class="cookie-consent-inner">' +
        '<p class="cookie-consent-text">' +
          t(
            'common.cookieConsentText',
            'Usamos o Google Analytics (GA4) para entender o uso do site. Cookies de publicidade ficam desligados. Pode aceitar ou recusar — detalhes na política de privacidade.'
          ) +
          ' <a href="/info/privacidade.html">' +
          t('common.footerPrivacy', 'Privacidade') +
          '</a>.' +
        '</p>' +
        '<div class="cookie-consent-actions">' +
          '<button type="button" class="botao botao-outline cookie-consent-deny" data-consent="denied">' +
            t('common.cookieConsentDeny', 'Recusar') +
          '</button>' +
          '<button type="button" class="botao cookie-consent-accept" data-consent="granted">' +
            t('common.cookieConsentAccept', 'Aceitar métricas') +
          '</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(root);

    root.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-consent]');
      if (!btn) return;
      var value = btn.getAttribute('data-consent');
      if (value !== 'granted' && value !== 'denied') return;
      writeConsent(value);
      updateConsent(value === 'granted');
      if (value === 'granted') loadGtag();
      removeBanner();
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
      return;
    }
    if (consent === 'denied') {
      updateConsent(false);
      return;
    }
    // Ainda sem escolha: carrega gtag com storage denied (Consent Mode) + banner.
    loadGtag();
    showBanner();
  }

  function resetConsent() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) { /* ignore */ }
    updateConsent(false);
    showBanner();
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
    measurementId: function () { return measurementId; }
  };
})();
