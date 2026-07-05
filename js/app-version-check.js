(function () {
  'use strict';

  var LOCAL_VERSION = '207';
  var VERSION_KEY = 'budganja_app_version';
  var MAX_RELOADS = 3;
  var CHECK_MIN_MS = 5000;
  var CHECK_INTERVAL_MS = 20000;
  var lastCheckAt = 0;
  var checkInFlight = false;
  var updatePromptEl = null;
  var updatePromptVersion = null;
  var DISMISS_KEY = 'budganja_update_prompt_dismissed';

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

  function showUpdatePrompt(remote) {
    if (!remote || wasDismissed(remote)) return;
    updatePromptVersion = String(remote);

    if (!updatePromptEl) {
      updatePromptEl = document.createElement('div');
      updatePromptEl.id = 'budganja-update-prompt';
      updatePromptEl.setAttribute('role', 'status');
      updatePromptEl.setAttribute('aria-live', 'polite');
      updatePromptEl.style.position = 'fixed';
      updatePromptEl.style.left = '12px';
      updatePromptEl.style.right = '12px';
      updatePromptEl.style.bottom = '12px';
      updatePromptEl.style.zIndex = '9999';
      updatePromptEl.style.background = 'rgba(20,26,22,0.96)';
      updatePromptEl.style.color = '#f2fff6';
      updatePromptEl.style.border = '1px solid rgba(67,199,122,0.45)';
      updatePromptEl.style.borderRadius = '12px';
      updatePromptEl.style.padding = '12px';
      updatePromptEl.style.boxShadow = '0 8px 28px rgba(0,0,0,0.35)';
      updatePromptEl.innerHTML =
        '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;justify-content:space-between">' +
        '<strong style="font-size:14px">Nova versão disponível</strong>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
        '<button type="button" data-update-now="1" style="border:0;border-radius:10px;padding:8px 12px;background:#2ecc71;color:#0e2216;font-weight:700;cursor:pointer">Atualizar agora</button>' +
        '<button type="button" data-update-later="1" style="border:1px solid rgba(255,255,255,0.22);border-radius:10px;padding:8px 12px;background:transparent;color:#eaf7ee;cursor:pointer">Depois</button>' +
        '</div>' +
        '</div>';

      updatePromptEl.addEventListener('click', function (event) {
        var nowBtn = event.target && event.target.closest ? event.target.closest('[data-update-now]') : null;
        if (nowBtn) {
          clearDismissed();
          reloadForVersion(updatePromptVersion);
          return;
        }
        var laterBtn = event.target && event.target.closest ? event.target.closest('[data-update-later]') : null;
        if (laterBtn) {
          rememberDismissed(updatePromptVersion);
          hideUpdatePrompt();
        }
      });

      document.body.appendChild(updatePromptEl);
    }

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
        showUpdatePrompt(remote);
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
