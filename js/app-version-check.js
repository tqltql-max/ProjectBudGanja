(function () {
  'use strict';

  var LOCAL_VERSION = '202';
  var VERSION_KEY = 'budganja_app_version';
  var MAX_RELOADS = 3;

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

  fetch('/version.json?_=' + Date.now(), { cache: 'no-store', credentials: 'same-origin' })
    .then(function (res) { return res.ok ? res.json() : null; })
    .then(function (data) {
      if (!data || data.version == null) return;
      var remote = String(data.version);
      if (remote === LOCAL_VERSION) {
        try { localStorage.setItem(VERSION_KEY, remote); } catch (e) { /* ignore */ }
        return;
      }
      reloadForVersion(remote);
    })
    .catch(function () { /* offline — layout.js tenta depois */ });
})();
