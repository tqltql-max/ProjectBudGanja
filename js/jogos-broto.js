(function () {
  'use strict';

  var STORAGE_KEY = 'budganja.broto.v1';
  var HOUR = 60 * 60 * 1000;
  var DECAY = { water: 8, sun: 6, mood: 5, clean: 4 };
  var COOLDOWN_MS = 7000;
  var STAGES = [
    { id: 'seed', xp: 0 },
    { id: 'sprout', xp: 18 },
    { id: 'leaf', xp: 80 },
    { id: 'tree', xp: 200 }
  ];

  function i18n(key, fallback) {
    return window.BudGanjaI18n ? window.BudGanjaI18n.t(key, fallback) : fallback || '';
  }

  function clamp(n) {
    return Math.max(0, Math.min(100, n));
  }

  function defaultState() {
    var now = Date.now();
    return {
      name: 'Broto',
      bornAt: now,
      lastTick: now,
      water: 82,
      sun: 78,
      mood: 88,
      clean: 86,
      xp: 0,
      sleeping: false,
      lastActions: {}
    };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      var data = JSON.parse(raw);
      var base = defaultState();
      Object.keys(base).forEach(function (key) {
        if (data[key] != null) base[key] = data[key];
      });
      return decay(base, Date.now());
    } catch (e) {
      return defaultState();
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* ignore quota */ }
  }

  function decay(state, now) {
    var elapsed = Math.max(0, now - (state.lastTick || now));
    var hours = elapsed / HOUR;
    if (hours <= 0) return state;
    var sleep = !!state.sleeping;
    state.water = clamp(state.water - DECAY.water * hours * (sleep ? 0.4 : 1));
    state.sun = clamp(state.sun - DECAY.sun * hours * (sleep ? -0.35 : 1));
    state.mood = clamp(state.mood - DECAY.mood * hours * (sleep ? 0.25 : 1));
    state.clean = clamp(state.clean - DECAY.clean * hours * (sleep ? 0.35 : 1));
    state.lastTick = now;
    return state;
  }

  function stageOf(state) {
    var current = STAGES[0];
    for (var i = 0; i < STAGES.length; i++) {
      if (state.xp >= STAGES[i].xp) current = STAGES[i];
    }
    return current.id;
  }

  function stageLabel(id) {
    var map = {
      seed: i18n('pages.games.brotoStageSeed', 'Semente'),
      sprout: i18n('pages.games.brotoStageSprout', 'Brotinho'),
      leaf: i18n('pages.games.brotoStageLeaf', 'Folha'),
      tree: i18n('pages.games.brotoStageTree', 'Arvorezinha')
    };
    return map[id] || map.sprout;
  }

  function moodOf(state) {
    if (state.sleeping) return 'sleep';
    if (state.water < 28) return 'thirsty';
    if (state.clean < 28) return 'dirty';
    if (state.mood < 32 || state.sun < 28) return 'sad';
    return 'happy';
  }

  function speechFor(mood) {
    var lines = {
      happy: [
        i18n('pages.games.brotoSayHappy1', 'Oi! Tô bem.'),
        i18n('pages.games.brotoSayHappy2', 'Mais um carinho?')
      ],
      sad: [
        i18n('pages.games.brotoSaySad1', 'Brinca comigo?'),
        i18n('pages.games.brotoSaySad2', 'Tô um pouco murcho.')
      ],
      thirsty: [
        i18n('pages.games.brotoSayThirsty1', 'Tô com sede…'),
        i18n('pages.games.brotoSayThirsty2', 'Uma aguinha, por favor.')
      ],
      dirty: [
        i18n('pages.games.brotoSayDirty1', 'Meu vaso tá sujo.'),
        i18n('pages.games.brotoSayDirty2', 'Limpa aqui, vai.')
      ],
      sleep: [i18n('pages.games.brotoSaySleep', 'Zzz…')]
    };
    var list = lines[mood] || lines.happy;
    return list[Math.floor(Math.random() * list.length)];
  }

  function ageText(state) {
    var days = Math.floor((Date.now() - state.bornAt) / (24 * HOUR));
    if (days <= 0) return i18n('pages.games.brotoAgeToday', 'Nasceu hoje');
    if (days === 1) return i18n('pages.games.brotoAgeOne', '1 dia');
    return i18n('pages.games.brotoAgeMany', '{n} dias').replace('{n}', String(days));
  }

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    var root = document.getElementById('broto-app');
    if (!root) return;

    var state = loadState();
    var speechTimer = null;
    var playTimer = null;
    var dropTimer = null;

    var nameEl = document.getElementById('broto-name');
    var stageEl = document.getElementById('broto-stage-label');
    var ageEl = document.getElementById('broto-age');
    var speechEl = document.getElementById('broto-speech');
    var hintEl = document.getElementById('broto-hint');
    var sleepBtn = document.getElementById('broto-sleep');
    var playfield = document.getElementById('broto-playfield');
    var petBtn = document.getElementById('broto-pet');

    function say(text, ms) {
      if (!speechEl) return;
      speechEl.hidden = !text;
      speechEl.textContent = text || '';
      clearTimeout(speechTimer);
      if (text) {
        speechTimer = setTimeout(function () {
          speechEl.hidden = true;
        }, ms || 2800);
      }
    }

    function hint(text) {
      if (hintEl) hintEl.textContent = text || '';
    }

    function renderBars() {
      ['water', 'sun', 'mood', 'clean'].forEach(function (key) {
        var row = root.querySelector('[data-stat="' + key + '"]');
        if (!row) return;
        var bar = row.querySelector('i');
        var value = clamp(state[key]);
        if (bar) bar.style.width = value + '%';
        row.classList.toggle('is-low', value < 30);
      });
    }

    function render() {
      var mood = moodOf(state);
      var stage = stageOf(state);
      root.dataset.mood = mood;
      root.dataset.stage = stage;
      if (nameEl && document.activeElement !== nameEl) nameEl.value = state.name || 'Broto';
      if (stageEl) stageEl.textContent = stageLabel(stage);
      if (ageEl) ageEl.textContent = ageText(state);
      if (sleepBtn) {
        sleepBtn.textContent = state.sleeping
          ? i18n('pages.games.brotoActWake', 'Acordar')
          : i18n('pages.games.brotoActSleep', 'Dormir');
      }
      var mouth = root.querySelector('.broto-mouth');
      if (mouth) {
        mouth.setAttribute(
          'd',
          mood === 'happy'
            ? 'M88 160c8 10 16 10 24 0'
            : 'M88 166c8-8 16-8 24 0'
        );
      }
      root.querySelectorAll('.broto-actions [data-action]').forEach(function (btn) {
        var action = btn.getAttribute('data-action');
        if (action === 'sleep') {
          btn.disabled = false;
          return;
        }
        btn.disabled = !!state.sleeping || !!root.classList.contains('is-playing');
      });
      renderBars();
    }

    function canAct(action) {
      var last = (state.lastActions && state.lastActions[action]) || 0;
      return Date.now() - last >= COOLDOWN_MS;
    }

    function applyAction(action) {
      if (state.sleeping && action !== 'sleep') {
        say(i18n('pages.games.brotoSaySleep', 'Zzz…'));
        return;
      }
      if (action !== 'sleep' && !canAct(action)) {
        hint(i18n('pages.games.brotoCooldown', 'Calma… Broto ainda tá digerindo isso.'));
        return;
      }
      state.lastActions = state.lastActions || {};
      state.lastActions[action] = Date.now();

      if (action === 'water') {
        state.water = clamp(state.water + 30);
        state.mood = clamp(state.mood + 6);
        state.xp += 2;
        say(i18n('pages.games.brotoSayWater', 'Ahh, gostoso.'));
      } else if (action === 'sun') {
        state.sun = clamp(state.sun + 30);
        state.mood = clamp(state.mood + 5);
        state.xp += 2;
        say(i18n('pages.games.brotoSaySun', 'Que calorzinho bom.'));
      } else if (action === 'clean') {
        state.clean = clamp(state.clean + 40);
        state.mood = clamp(state.mood + 4);
        state.xp += 2;
        say(i18n('pages.games.brotoSayCleaned', 'Vaso novinho.'));
      } else if (action === 'sleep') {
        state.sleeping = !state.sleeping;
        say(state.sleeping
          ? i18n('pages.games.brotoSaySleep', 'Zzz…')
          : i18n('pages.games.brotoSayWake', 'Bom dia!'));
      } else if (action === 'play') {
        startPlay();
        return;
      }

      state.lastTick = Date.now();
      saveState(state);
      render();
      hint('');
    }

    function startPlay() {
      if (!playfield || root.classList.contains('is-playing')) return;
      root.classList.add('is-playing');
      playfield.hidden = false;
      playfield.innerHTML = '';
      var score = 0;
      var left = 8;
      hint(i18n('pages.games.brotoPlayHint', 'Toque nas gotas de sol!'));
      render();

      function spawn() {
        var drop = document.createElement('button');
        drop.type = 'button';
        drop.className = 'broto-drop';
        drop.style.left = 12 + Math.random() * 72 + '%';
        drop.setAttribute('aria-label', i18n('pages.games.brotoDrop', 'Gota de sol'));
        drop.addEventListener('click', function (ev) {
          ev.preventDefault();
          score += 1;
          drop.remove();
        });
        playfield.appendChild(drop);
        setTimeout(function () {
          if (drop.parentNode) drop.remove();
        }, 2100);
      }

      spawn();
      dropTimer = setInterval(spawn, 700);
      playTimer = setTimeout(function () {
        clearInterval(dropTimer);
        playfield.innerHTML = '';
        playfield.hidden = true;
        root.classList.remove('is-playing');
        state.mood = clamp(state.mood + 10 + score * 3);
        state.sun = clamp(state.sun + 6);
        state.xp += 3 + score;
        state.lastTick = Date.now();
        saveState(state);
        say(i18n('pages.games.brotoPlayDone', 'Pegou {n} sóis!').replace('{n}', String(score)));
        hint('');
        render();
      }, left * 1000);
    }

    var actions = document.getElementById('broto-actions');
    if (actions) {
      actions.addEventListener('click', function (ev) {
        var btn = ev.target.closest('[data-action]');
        if (!btn) return;
        applyAction(btn.getAttribute('data-action'));
      });
    }

    if (petBtn) {
      petBtn.addEventListener('click', function () {
        if (state.sleeping) {
          say(i18n('pages.games.brotoSaySleep', 'Zzz…'));
          return;
        }
        if (root.classList.contains('is-playing')) return;
        root.classList.add('is-petting');
        state.mood = clamp(state.mood + 4);
        state.xp += 1;
        state.lastTick = Date.now();
        saveState(state);
        say(speechFor('happy'));
        render();
        setTimeout(function () {
          root.classList.remove('is-petting');
        }, 450);
      });
    }

    if (nameEl) {
      nameEl.addEventListener('change', function () {
        var next = String(nameEl.value || '').trim().slice(0, 18) || 'Broto';
        state.name = next;
        nameEl.value = next;
        saveState(state);
      });
    }

    render();
    say(speechFor(moodOf(state)), 3200);

    setInterval(function () {
      state = decay(state, Date.now());
      saveState(state);
      render();
    }, 15000);
  });
})();
