/**
 * Diário da Sementinha — planta-pet local (água, comida, dormir).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'budganja_vida_diario_v1';
  var MAX_ENTRIES = 40;
  var DECAY_PER_HOUR = { water: 4, food: 3, energy: 2, mood: 2 };
  var PHASES = ['seed', 'sprout', 'plant', 'happy'];

  var state = null;

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

  function doWater() {
    if (state.sleeping) return;
    state.needs.water = clamp(state.needs.water + 28);
    state.needs.mood = clamp(state.needs.mood + 8);
    state.careCount += 1;
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
    state = defaultState();
    save();
    render();
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
