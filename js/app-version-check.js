(function () {
  'use strict';

  var LOCAL_VERSION = '321';
  var VERSION_KEY = 'budganja_app_version';
  var MAX_RELOADS = 3;
  var CHECK_MIN_MS = 5000;
  var CHECK_INTERVAL_MS = 20000;
  var lastCheckAt = 0;
  var checkInFlight = false;
  var updatePromptEl = null;
  var updatePromptVersion = null;
  var DISMISS_KEY = 'budganja_update_prompt_dismissed';

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

  function reloadForVersion(remote) {
    var guardKey = 'budganja_early_reload_' + remote;
    var attempts = 0;
    try {
      attempts = parseInt(sessionStorage.getItem(guardKey) || '0', 10);
    } catch (e) { /* ignore */ }
    if (attempts >= MAX_RELOADS) return;
    try {
      sessionStorage.setItem(guardKey, String(attempts + 1));
      localStorage.setItem(VERSION_KEY, remote);
    } catch (e) { /* ignore */ }

    function go() {
      var url = new URL(window.location.href);
      url.searchParams.set('_budv', remote);
      url.hash = '';
      window.location.replace(url.toString());
    }

    var tasks = [];
    if ('caches' in window) {
      tasks.push(
        caches.keys().then(function (keys) {
          return Promise.all(keys.map(function (key) { return caches.delete(key); }));
        })
      );
    }
    if ('serviceWorker' in navigator) {
      tasks.push(
        navigator.serviceWorker.getRegistrations().then(function (regs) {
          return Promise.all(regs.map(function (reg) { return reg.unregister(); }));
        })
      );
    }
    Promise.all(tasks).then(go).catch(go);
  }

  function wasDismissed(version) {
    try {
      return localStorage.getItem(DISMISS_KEY) === String(version);
    } catch (e) {
      return false;
    }
  }

  function rememberDismissed(version) {
    try {
      localStorage.setItem(DISMISS_KEY, String(version));
    } catch (e) { /* ignore */ }
  }

  function clearDismissed() {
    try {
      localStorage.removeItem(DISMISS_KEY);
    } catch (e) { /* ignore */ }
  }

  function hideUpdatePrompt() {
    if (!updatePromptEl) return;
    updatePromptEl.style.display = 'none';
  }

  function showUpdatePrompt(remote, updateInfo) {
    if (!remote || wasDismissed(remote)) return;
    // Evita sobrepor o banner de cookies/novidades do analytics.
    if (document.getElementById('budganja-cookie-consent')) return;

    updatePromptVersion = String(remote);

    var whatTitle = pickLocalized(
      updateInfo && updateInfo.title,
      t('common.siteUpdateTitle', 'O que está a ser atualizado')
    );
    var whatText = pickLocalized(updateInfo && updateInfo.text, '');

    if (!updatePromptEl) {
      updatePromptEl = document.createElement('div');
      updatePromptEl.id = 'budganja-update-prompt';
      updatePromptEl.className = 'cookie-consent cookie-consent--update-only';
      updatePromptEl.setAttribute('role', 'status');
      updatePromptEl.setAttribute('aria-live', 'polite');
      updatePromptEl.setAttribute(
        'aria-label',
        t('common.updateAvailableTitle', 'Nova versão disponível')
      );

      updatePromptEl.addEventListener('click', function (event) {
        var nowBtn = event.target && event.target.closest
          ? event.target.closest('[data-update-now]')
          : null;
        if (nowBtn) {
          clearDismissed();
          reloadForVersion(updatePromptVersion);
          return;
        }
        var laterBtn = event.target && event.target.closest
          ? event.target.closest('[data-update-later]')
          : null;
        if (laterBtn) {
          rememberDismissed(updatePromptVersion);
          hideUpdatePrompt();
        }
      });

      document.body.appendChild(updatePromptEl);
    }

    var detailsHtml = '';
    if (whatText) {
      var whatLabel = pickLocalized(
        updateInfo && updateInfo.label,
        t('common.siteUpdateAria', 'Novidades do site')
      );
      var whatQuote = pickLocalized(updateInfo && updateInfo.quote, '');
      var whatCredit = pickLocalized(updateInfo && updateInfo.quoteCredit, '');
      var voice = updateInfo && updateInfo.voice ? String(updateInfo.voice) : '';
      var avatar = updateInfo && updateInfo.avatar ? String(updateInfo.avatar) : '';
      var quoteHtml = whatQuote
        ? '<blockquote class="cookie-consent-update-quote"><p>«' +
          escapeHtml(whatQuote) +
          '»</p>' +
          (whatCredit ? '<cite>' + escapeHtml(whatCredit) + '</cite>' : '') +
          '</blockquote>'
        : '';
      var avatarHtml = avatar
        ? '<div class="cookie-consent-update-media"><img class="cookie-consent-update-avatar" src="' +
          escapeHtml(avatar) +
          '" alt="" width="56" height="56" decoding="async"></div>'
        : '';
      var updClass =
        'cookie-consent-update' +
        (voice === 'dj-brisa' ? ' cookie-consent-update--brisa' : '');
      detailsHtml =
        '<div class="' +
        updClass +
        '">' +
        avatarHtml +
        '<div class="cookie-consent-update-body">' +
        '<span class="cookie-consent-update-label">' +
        escapeHtml(whatLabel) +
        '</span>' +
        '<p class="cookie-consent-update-title">' +
        escapeHtml(whatTitle) +
        '</p>' +
        '<p class="cookie-consent-update-text">' +
        escapeHtml(whatText) +
        '</p>' +
        quoteHtml +
        '</div></div>';
    }

    updatePromptEl.innerHTML =
      '<div class="cookie-consent-inner">' +
      '<div class="cookie-consent-copy">' +
      detailsHtml +
      '<p class="cookie-consent-text"><strong>' +
      escapeHtml(t('common.updateAvailableTitle', 'Nova versão disponível')) +
      '</strong></p>' +
      '</div>' +
      '<div class="cookie-consent-actions">' +
      '<button type="button" class="botao botao-outline" data-update-later="1">' +
      escapeHtml(t('common.updateLater', 'Depois')) +
      '</button>' +
      '<button type="button" class="botao" data-update-now="1">' +
      escapeHtml(t('common.updateNow', 'Atualizar agora')) +
      '</button>' +
      '</div>' +
      '</div>';

    updatePromptEl.style.display = 'block';
  }

  function runVersionCheck(force) {
    var now = Date.now();
    if (!force && (now - lastCheckAt) < CHECK_MIN_MS) return;
    if (checkInFlight) return;
    checkInFlight = true;
    lastCheckAt = now;

    fetch('/version.json?_=' + Date.now(), { cache: 'no-store', credentials: 'same-origin' })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (data) {
        if (!data || data.version == null) return;
        var remote = String(data.version);
        if (remote === LOCAL_VERSION) {
          clearDismissed();
          hideUpdatePrompt();
          try { localStorage.setItem(VERSION_KEY, remote); } catch (e) { /* ignore */ }
          return;
        }
        showUpdatePrompt(remote, data.update || null);
      })
      .catch(function () { /* offline — layout.js tenta depois */ })
      .finally(function () {
        checkInFlight = false;
      });
  }

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') runVersionCheck(true);
  });
  window.addEventListener('pageshow', function () {
    runVersionCheck(true);
  });
  window.addEventListener('focus', function () {
    runVersionCheck(true);
  });
  window.addEventListener('online', function () {
    runVersionCheck(true);
  });

  window.setInterval(function () {
    if (document.visibilityState === 'visible') runVersionCheck(false);
  }, CHECK_INTERVAL_MS);

  runVersionCheck(true);
})();
