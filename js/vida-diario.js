/**
 * Diário da Sementinha — planta-pet local (água, comida, dormir).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'budganja_vida_diario_v1';
  var MAX_ENTRIES = 40;
  var NEED_ALERT = 35;
  var NOTIFY_COOLDOWN_MS = 2 * 60 * 60 * 1000;
  var DECAY_PER_HOUR = { water: 4, food: 3, energy: 2, mood: 2 };
  var PHASES = ['seed', 'sprout', 'plant', 'happy'];

  var state = null;
  var reminderTimers = [];
  var pollTimer = null;

  function t(key, fallback) {
    if (window.BudGanjaI18n && typeof window.BudGanjaI18n.t === 'function') {
      var val = window.BudGanjaI18n.t('pages.vidaDiario.' + key);
      if (val && val !== 'pages.vidaDiario.' + key) return val;
    }
    return fallback || key;
  }

  function clamp(n) {
    return Math.max(0, Math.min(100, Math.round(n)));
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function defaultState() {
    return {
      name: 'Sementinha',
      phase: 'seed',
      needs: { water: 65, food: 65, energy: 80, mood: 75 },
      lastTick: nowIso(),
      sleeping: false,
      careCount: 0,
      notifyEnabled: false,
      lastNotified: {},
      entries: []
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      var data = JSON.parse(raw);
      if (!data || !data.needs) return defaultState();
      data.name = String(data.name || 'Sementinha').slice(0, 24);
      data.phase = PHASES.indexOf(data.phase) >= 0 ? data.phase : 'seed';
      data.needs = {
        water: clamp(data.needs.water),
        food: clamp(data.needs.food),
        energy: clamp(data.needs.energy),
        mood: clamp(data.needs.mood)
      };
      data.lastTick = data.lastTick || nowIso();
      data.sleeping = !!data.sleeping;
      data.careCount = Number(data.careCount) || 0;
      data.notifyEnabled = !!data.notifyEnabled;
      data.lastNotified = data.lastNotified && typeof data.lastNotified === 'object' ? data.lastNotified : {};
      data.entries = Array.isArray(data.entries) ? data.entries.slice(0, MAX_ENTRIES) : [];
      return data;
    } catch (e) {
      return defaultState();
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* ignore quota */ }
    scheduleReminders();
  }

  function hoursSince(iso) {
    var t0 = Date.parse(iso || '') || Date.now();
    return Math.max(0, (Date.now() - t0) / 3600000);
  }

  function tick() {
    var h = hoursSince(state.lastTick);
    if (h < 0.05) {
      state.lastTick = nowIso();
      return;
    }
    var factor = Math.min(h, 48);
    if (state.sleeping) {
      state.needs.energy = clamp(state.needs.energy + factor * 6);
      state.needs.mood = clamp(state.needs.mood + factor * 1.5);
      state.needs.water = clamp(state.needs.water - factor * 1.5);
      state.needs.food = clamp(state.needs.food - factor * 1);
    } else {
      state.needs.water = clamp(state.needs.water - factor * DECAY_PER_HOUR.water);
      state.needs.food = clamp(state.needs.food - factor * DECAY_PER_HOUR.food);
      state.needs.energy = clamp(state.needs.energy - factor * DECAY_PER_HOUR.energy);
      var avg = (state.needs.water + state.needs.food + state.needs.energy) / 3;
      if (avg < 40) state.needs.mood = clamp(state.needs.mood - factor * DECAY_PER_HOUR.mood);
      else if (avg > 70) state.needs.mood = clamp(state.needs.mood + factor * 0.8);
    }
    state.lastTick = nowIso();
    updatePhase();
  }

  function updatePhase() {
    var c = state.careCount || 0;
    var mood = state.needs.mood;
    var next = 'seed';
    if (c >= 12 && mood >= 55) next = 'happy';
    else if (c >= 6) next = 'plant';
    else if (c >= 2) next = 'sprout';
    if (next !== state.phase) {
      state.phase = next;
      pushEntry('grow', t('logGrow', 'A Sementinha cresceu um pouquinho!').replace(/Sementinha/g, state.name));
    }
  }

  function pushEntry(action, text) {
    state.entries.unshift({
      at: nowIso(),
      action: action,
      text: text
    });
    if (state.entries.length > MAX_ENTRIES) state.entries.length = MAX_ENTRIES;
  }

  function speechForState() {
    if (state.sleeping) return t('speechSleep', 'Zzz… a plantinha está a descansar.');
    if (state.needs.water < 30) return t('speechThirsty', 'Tenho sede! Pode dar-me água?');
    if (state.needs.food < 30) return t('speechHungry', 'Queria uma folhinha de comida…');
    if (state.needs.energy < 30) return t('speechTired', 'Estou cansada… hora de dormir?');
    if (state.needs.mood > 75) return t('speechHappy', 'Estou tão feliz consigo!');
    return t('speechOk', 'Olá! Cuide de mim com carinho.');
  }

  function phaseLabel() {
    var map = {
      seed: t('phaseSeed', 'Semente'),
      sprout: t('phaseSprout', 'Brotinho'),
      plant: t('phasePlant', 'Plantinha'),
      happy: t('phaseHappy', 'Planta feliz')
    };
    return map[state.phase] || map.seed;
  }

  function petMoodClass() {
    if (state.sleeping) return 'is-sleeping';
    if (state.needs.energy < 30) return 'is-sleepy';
    if (state.needs.water < 30) return 'is-thirsty';
    if (state.needs.mood > 70) return 'is-happy';
    return 'is-ok';
  }

  function $(id) {
    return document.getElementById(id);
  }

  function flashFx(id, ms) {
    var el = $(id);
    if (!el) return;
    el.classList.remove('is-on');
    void el.offsetWidth;
    el.classList.add('is-on');
    setTimeout(function () {
      el.classList.remove('is-on');
    }, ms || 900);
  }

  function render() {
    var pet = $('vd-pet');
    var page = document.querySelector('.vida-diario-page');
    if (pet) {
      pet.setAttribute('data-phase', state.phase);
      pet.className = 'vd-pet ' + petMoodClass();
    }
    if (page) page.classList.toggle('is-night', !!state.sleeping);

    ['water', 'food', 'energy', 'mood'].forEach(function (k) {
      var bar = $('vd-bar-' + k);
      if (bar) bar.style.width = clamp(state.needs[k]) + '%';
    });

    var speech = $('vd-speech');
    if (speech) speech.textContent = speechForState();

    var phaseEl = $('vd-phase-label');
    if (phaseEl) phaseEl.textContent = phaseLabel();

    var nameInput = $('vd-name');
    if (nameInput && document.activeElement !== nameInput) nameInput.value = state.name;

    var sleepLabel = $('vd-sleep-label');
    if (sleepLabel) {
      sleepLabel.textContent = state.sleeping
        ? t('actWake', 'Acordar')
        : t('actSleep', 'Dormir');
    }

    var waterBtn = $('vd-water');
    var foodBtn = $('vd-food');
    if (waterBtn) waterBtn.disabled = !!state.sleeping;
    if (foodBtn) foodBtn.disabled = !!state.sleeping;

    var notifyBtn = $('vd-notify-toggle');
    var notifyLabel = $('vd-notify-label');
    var notifyOn = !!state.notifyEnabled && notificationsAllowed();
    if (notifyBtn) {
      notifyBtn.classList.toggle('is-on', notifyOn);
      notifyBtn.setAttribute('aria-pressed', notifyOn ? 'true' : 'false');
    }
    if (notifyLabel) {
      notifyLabel.textContent = notifyOn
        ? t('notifyOn', 'Lembretes ligados')
        : t('notifyOff', 'Lembretes desligados');
    }

    var log = $('vd-log');
    if (log) {
      if (!state.entries.length) {
        log.innerHTML = '<li class="vd-log-empty">' + escapeHtml(t('logEmpty', 'Ainda não há cuidados. Comece por dar água!')) + '</li>';
      } else {
        log.innerHTML = state.entries
          .map(function (e) {
            var when = formatWhen(e.at);
            return (
              '<li data-action="' +
              escapeAttr(e.action || '') +
              '"><time datetime="' +
              escapeAttr(e.at || '') +
              '">' +
              escapeHtml(when) +
              '</time> <span>' +
              escapeHtml(e.text || '') +
              '</span></li>'
            );
          })
          .join('');
      }
    }
  }

  function formatWhen(iso) {
    try {
      var d = new Date(iso);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleString(undefined, {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return '';
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, '&#39;');
  }

  function clearNeedNotify(need) {
    if (state.lastNotified && state.lastNotified[need]) {
      delete state.lastNotified[need];
    }
  }

  function doWater() {
    if (state.sleeping) return;
    state.needs.water = clamp(state.needs.water + 28);
    state.needs.mood = clamp(state.needs.mood + 8);
    state.careCount += 1;
    clearNeedNotify('water');
    pushEntry(
      'water',
      t('logWater', 'Hoje reguei a Sementinha.').replace(/Sementinha/g, state.name)
    );
    updatePhase();
    flashFx('vd-fx-drops');
    save();
    render();
  }

  function doFood() {
    if (state.sleeping) return;
    state.needs.food = clamp(state.needs.food + 28);
    state.needs.mood = clamp(state.needs.mood + 8);
    state.careCount += 1;
    clearNeedNotify('food');
    pushEntry(
      'food',
      t('logFood', 'Hoje dei comida à Sementinha.').replace(/Sementinha/g, state.name)
    );
    updatePhase();
    flashFx('vd-fx-food');
    save();
    render();
  }

  function doSleepToggle() {
    if (state.sleeping) {
      state.sleeping = false;
      state.needs.energy = clamp(state.needs.energy + 10);
      pushEntry(
        'wake',
        t('logWake', 'A Sementinha acordou com o sol.').replace(/Sementinha/g, state.name)
      );
    } else {
      state.sleeping = true;
      clearNeedNotify('energy');
      pushEntry(
        'sleep',
        t('logSleep', 'A Sementinha foi dormir.').replace(/Sementinha/g, state.name)
      );
      flashFx('vd-fx-zzz', 1200);
    }
    state.careCount += 1;
    updatePhase();
    save();
    render();
  }

  function exportJson() {
    var blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'diario-sementinha.json';
    a.click();
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
    }, 500);
  }

  function resetAll() {
    var ok = window.confirm(
      t('resetConfirm', 'Apagar o diário da Sementinha neste aparelho?')
    );
    if (!ok) return;
    clearReminderTimers();
    state = defaultState();
    save();
    render();
  }

  function notificationsSupported() {
    return typeof window !== 'undefined' && 'Notification' in window;
  }

  function notificationsAllowed() {
    return notificationsSupported() && Notification.permission === 'granted';
  }

  function clearReminderTimers() {
    reminderTimers.forEach(function (id) {
      clearTimeout(id);
    });
    reminderTimers = [];
  }

  function notifyCopy(need) {
    var name = state.name || 'Sementinha';
    if (need === 'water') {
      return {
        title: t('notifyTitleWater', 'Hora de dar água!'),
        body: t('notifyBodyWater', '{name} tem sede. Vamos regar?').replace('{name}', name),
        tag: 'vida-diario-water'
      };
    }
    if (need === 'food') {
      return {
        title: t('notifyTitleFood', 'Hora de dar comida!'),
        body: t('notifyBodyFood', '{name} quer uma folhinha de comida.').replace('{name}', name),
        tag: 'vida-diario-food'
      };
    }
    return {
      title: t('notifyTitleSleep', 'Hora de dormir!'),
      body: t('notifyBodySleep', '{name} está cansada. Vamos deitar?').replace('{name}', name),
      tag: 'vida-diario-energy'
    };
  }

  function canNotifyNeed(need) {
    if (!state.notifyEnabled || !notificationsAllowed()) return false;
    var last = Date.parse(state.lastNotified[need] || '') || 0;
    return Date.now() - last >= NOTIFY_COOLDOWN_MS;
  }

  function showNeedNotification(need) {
    if (!canNotifyNeed(need)) return;
    var copy = notifyCopy(need);
    state.lastNotified[need] = nowIso();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* ignore */ }

    var payload = {
      type: 'VIDA_DIARIO_NOTIFY',
      title: copy.title,
      body: copy.body,
      tag: copy.tag,
      url: '/vida/diario/'
    };

    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(payload);
      return;
    }
    if (navigator.serviceWorker && navigator.serviceWorker.ready) {
      navigator.serviceWorker.ready
        .then(function (reg) {
          if (reg && reg.showNotification) {
            var iconLink = document.querySelector('link[rel="icon"][sizes="192x192"]');
            var badgeLink = document.querySelector('link[rel="icon"][sizes="48x48"]');
            return reg.showNotification(copy.title, {
              body: copy.body,
              icon: (iconLink && iconLink.getAttribute('href')) || '/imagens/icon-192.png',
              badge: (badgeLink && badgeLink.getAttribute('href')) || '/imagens/favicon-48.png',
              tag: copy.tag,
              renotify: true,
              data: { url: '/vida/diario/' }
            });
          }
          return undefined;
        })
        .catch(function () {
          try {
            new Notification(copy.title, { body: copy.body, tag: copy.tag });
          } catch (err) { /* ignore */ }
        });
      return;
    }
    try {
      new Notification(copy.title, { body: copy.body, tag: copy.tag });
    } catch (err) { /* ignore */ }
  }

  function hoursUntilNeed(need) {
    var value = state.needs[need];
    if (value <= NEED_ALERT) return 0;
    var rate = DECAY_PER_HOUR[need] || 1;
    if (state.sleeping) {
      if (need === 'energy') return Infinity;
      if (need === 'water') rate = 1.5;
      if (need === 'food') rate = 1;
    }
    if (rate <= 0) return Infinity;
    return (value - NEED_ALERT) / rate;
  }

  function msUntilReminder(need) {
    if (state.sleeping && need === 'energy') return null;
    var hours = hoursUntilNeed(need);
    if (!isFinite(hours)) return null;
    var ms = Math.round(hours * 3600000);
    if (ms <= 0) {
      var last = Date.parse(state.lastNotified[need] || '') || 0;
      var remain = NOTIFY_COOLDOWN_MS - (Date.now() - last);
      return remain > 0 ? remain : 1500;
    }
    return Math.min(ms, 12 * 3600000);
  }

  function checkDueNeedsNow() {
    if (!state.notifyEnabled || !notificationsAllowed()) return;
    if (state.needs.water <= NEED_ALERT) showNeedNotification('water');
    if (state.needs.food <= NEED_ALERT) showNeedNotification('food');
    if (!state.sleeping && state.needs.energy <= NEED_ALERT) showNeedNotification('energy');
  }

  function scheduleReminders() {
    clearReminderTimers();
    if (!state || !state.notifyEnabled || !notificationsAllowed()) return;

    checkDueNeedsNow();

    ['water', 'food', 'energy'].forEach(function (need) {
      var ms = msUntilReminder(need);
      if (ms == null) return;
      var id = setTimeout(function () {
        tick();
        checkDueNeedsNow();
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) { /* ignore */ }
        render();
        scheduleReminders();
      }, Math.max(1500, ms));
      reminderTimers.push(id);
    });
  }

  function startNotifyPoll() {
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = setInterval(function () {
      if (!state || !state.notifyEnabled) return;
      tick();
      checkDueNeedsNow();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) { /* ignore */ }
      render();
      scheduleReminders();
    }, 5 * 60 * 1000);
  }

  function toggleNotifications() {
    if (!notificationsSupported()) {
      window.alert(
        t('notifyUnsupported', 'Este aparelho não permite notificações do navegador.')
      );
      return;
    }

    if (state.notifyEnabled) {
      state.notifyEnabled = false;
      clearReminderTimers();
      save();
      render();
      return;
    }

    var ask = window.confirm(
      t(
        'notifyConfirm',
        'Com um adulto: permitir avisos quando for hora de cuidar da planta?'
      )
    );
    if (!ask) return;

    var applyOn = function () {
      state.notifyEnabled = true;
      save();
      render();
      scheduleReminders();
      startNotifyPoll();
      // Feedback imediato de que ficou ligado
      if (notificationsAllowed()) {
        var copy = {
          title: t('notifyTitleReady', 'Lembretes ligados'),
          body: t(
            'notifyBodyReady',
            'Vamos avisar quando {name} precisar de cuidado.'
          ).replace('{name}', state.name || 'Sementinha'),
          tag: 'vida-diario-ready'
        };
        if (navigator.serviceWorker && navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: 'VIDA_DIARIO_NOTIFY',
            title: copy.title,
            body: copy.body,
            tag: copy.tag,
            url: '/vida/diario/'
          });
        } else {
          try {
            new Notification(copy.title, { body: copy.body, tag: copy.tag });
          } catch (e) { /* ignore */ }
        }
      }
    };

    if (Notification.permission === 'granted') {
      applyOn();
      return;
    }
    if (Notification.permission === 'denied') {
      window.alert(
        t(
          'notifyDenied',
          'As notificações estão bloqueadas neste navegador. Um adulto pode activá-las nas definições do site.'
        )
      );
      return;
    }

    Notification.requestPermission().then(function (perm) {
      if (perm === 'granted') applyOn();
      else {
        window.alert(
          t('notifyDenied', 'Não foi possível activar os lembretes neste aparelho.')
        );
      }
    });
  }

  function bind() {
    var w = $('vd-water');
    var f = $('vd-food');
    var s = $('vd-sleep');
    if (w) w.addEventListener('click', doWater);
    if (f) f.addEventListener('click', doFood);
    if (s) s.addEventListener('click', doSleepToggle);

    var nameInput = $('vd-name');
    if (nameInput) {
      nameInput.addEventListener('change', function () {
        state.name = String(nameInput.value || 'Sementinha').trim().slice(0, 24) || 'Sementinha';
        save();
        render();
      });
    }

    var exp = $('vd-export');
    var rst = $('vd-reset');
    if (exp) exp.addEventListener('click', exportJson);
    if (rst) rst.addEventListener('click', resetAll);

    var notifyBtn = $('vd-notify-toggle');
    if (notifyBtn) notifyBtn.addEventListener('click', toggleNotifications);

    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible' && state && state.notifyEnabled) {
        tick();
        checkDueNeedsNow();
        save();
        render();
      }
    });
  }

  function boot() {
    var isDiary =
      document.body &&
      (document.body.dataset.page === 'vida-diario' ||
        document.querySelector('.vida-diario-page'));
    if (!isDiary) return;
    state = load();
    tick();
    save();
    bind();
    render();
    if (state.notifyEnabled && notificationsAllowed()) {
      scheduleReminders();
      startNotifyPoll();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
