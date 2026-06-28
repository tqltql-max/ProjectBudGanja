(function () {
  'use strict';

  var Shared = window.BudGanjaCultivoShared || {};
  var SELECTED_GROW_KEY = Shared.SELECTED_GROW_KEY || 'budganja_selected_grow_id';

  var CALC_LABELS = {
    ph: 'Calculadora pH',
    ec: 'Calculadora EC',
    vpd: 'Calculadora VPD',
    dli: 'Calculadora DLI',
    diluicao: 'Calculadora de diluição',
    'super-solo': 'Calculadora Super Solo',
    'volume-vaso': 'Volume do vaso',
    energia: 'Custo de energia',
    'watts-m2': 'Watts por m²',
    'cultivo-lab': 'Super Calculadora de Cultivo'
  };

  function todayDate() {
    return new Date().toISOString().slice(0, 10);
  }

  function newEntryId() {
    return 'e' + Date.now() + Math.random().toString(36).slice(2, 6);
  }

  function newGrowId() {
    return 'g' + Date.now();
  }

  function readPreferredGrowId() {
    try {
      var params = new URLSearchParams(window.location.search);
      var fromUrl = params.get('grow');
      if (fromUrl) return fromUrl;
      return sessionStorage.getItem(SELECTED_GROW_KEY) || '';
    } catch (e) {
      return '';
    }
  }

  async function getSessionUser() {
    try {
      var res = await fetch('/api/user/me', { credentials: 'include' });
      if (!res.ok) return null;
      var data = await res.json().catch(function () { return {}; });
      return data.authenticated ? data.user : null;
    } catch (e) {
      return null;
    }
  }

  function ensureTargetGrow(cultivo) {
    var logs = Array.isArray(cultivo.growLogs) ? cultivo.growLogs.slice() : [];
    var preferId = readPreferredGrowId();
    var activeId = cultivo.activeGrowLogId || '';
    var log = preferId ? logs.find(function (item) { return item.id === preferId; }) : null;
    if (!log && activeId) log = logs.find(function (item) { return item.id === activeId; });
    if (!log && logs.length) {
      log = logs[0];
      activeId = log.id;
    }
    if (!log) {
      log = {
        id: newGrowId(),
        name: 'Minha pesquisa',
        plantedAt: new Date().toISOString(),
        phase: cultivo.phase || 'germinacao',
        entries: [],
        createdAt: new Date().toISOString()
      };
      logs.unshift(log);
      activeId = log.id;
    }
    if (!Array.isArray(log.entries)) log.entries = [];
    return {
      cultivo: Object.assign({}, cultivo, { growLogs: logs, activeGrowLogId: activeId }),
      log: log
    };
  }

  function buildEntry(payload) {
    var metrics = payload.metrics && typeof payload.metrics === 'object' ? payload.metrics : {};
    if (payload.calculator) metrics.calculator = payload.calculator;
    return {
      id: newEntryId(),
      date: payload.date || todayDate(),
      text: String(payload.text || '').trim().slice(0, 2000) || 'Registo de calculadora.',
      source: 'calculator',
      actionType: payload.actionType || 'obs',
      metrics: metrics,
      photos: [],
      createdAt: new Date().toISOString()
    };
  }

  async function saveToDiary(payload) {
    var me = await getSessionUser();
    if (!me) {
      var returnTo = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = '/entrar.html?returnTo=' + returnTo;
      return { ok: false, reason: 'login' };
    }

    var cultivoRes = await fetch('/api/cultivo', { credentials: 'include' });
    var cultivoData = await cultivoRes.json().catch(function () { return {}; });
    if (!cultivoRes.ok) {
      return { ok: false, reason: 'load', error: cultivoData.error };
    }

    var state = ensureTargetGrow(cultivoData.cultivo || {});
    var entry = buildEntry(payload);
    state.log.entries.unshift(entry);
    if (state.log.entries.length > 300) {
      state.log.entries = state.log.entries.slice(0, 300);
    }

    var putRes = await fetch('/api/cultivo', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(state.cultivo)
    });
    var putData = await putRes.json().catch(function () { return {}; });
    if (!putRes.ok) {
      return { ok: false, reason: 'save', error: putData.error };
    }
    return { ok: true, entry: entry, growName: state.log.name, growId: state.log.id };
  }

  function attachSaveBar(container, payload) {
    if (!container) return;
    var bar = container.querySelector('.diary-save-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'diary-save-bar';
      container.appendChild(bar);
    }
    var calcLabel = payload.calculator ? (CALC_LABELS[payload.calculator] || 'Calculadora') : 'Calculadora';
    bar.innerHTML =
      '<button type="button" class="botao botao-outline botao-sm diary-save-btn">📓 Guardar no diário</button>' +
      '<span class="diary-save-status" role="status" aria-live="polite"></span>';
    var btn = bar.querySelector('.diary-save-btn');
    var status = bar.querySelector('.diary-save-status');
    btn.onclick = async function () {
      btn.disabled = true;
      status.textContent = 'A guardar…';
      var result = await saveToDiary(payload);
      if (result.ok) {
        status.textContent = 'Guardado em «' + result.growName + '».';
        btn.textContent = 'Ver diário';
        btn.disabled = false;
        btn.onclick = function () {
          var growParam = result.growId ? 'grow=' + encodeURIComponent(result.growId) + '&' : '';
          window.location.href = '/cultivo/?' + growParam + 'tab=diario&saved=1';
        };
        return;
      }
      if (result.reason === 'login') return;
      status.textContent = result.error || 'Não foi possível guardar.';
      btn.disabled = false;
    };
    bar.setAttribute('aria-label', 'Guardar resultado da ' + calcLabel + ' no diário de pesquisas');
  }

  window.BudGanjaDiaryBridge = {
    saveToDiary: saveToDiary,
    attachSaveBar: attachSaveBar,
    calcLabels: CALC_LABELS
  };
})();
