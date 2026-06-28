(function () {
  'use strict';

  const CALC_LABELS = {
    ph: 'Calculadora pH',
    ec: 'Calculadora EC',
    vpd: 'Calculadora VPD',
    dli: 'Calculadora DLI',
    diluicao: 'Calculadora de diluição',
    'super-solo': 'Calculadora Super Solo',
    'volume-vaso': 'Volume do vaso',
    energia: 'Custo de energia',
    'watts-m2': 'Watts por m²'
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

  async function getSessionUser() {
    try {
      const res = await fetch('/api/user/me', { credentials: 'include' });
      if (!res.ok) return null;
      const data = await res.json().catch(() => ({}));
      return data.authenticated ? data.user : null;
    } catch (e) {
      return null;
    }
  }

  function ensureActiveGrow(cultivo) {
    const logs = Array.isArray(cultivo.growLogs) ? cultivo.growLogs.slice() : [];
    let activeId = cultivo.activeGrowLogId || '';
    let log = logs.find((item) => item.id === activeId);
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
    return { cultivo: Object.assign({}, cultivo, { growLogs: logs, activeGrowLogId: activeId }), log: log };
  }

  function buildEntry(payload) {
    const metrics = payload.metrics && typeof payload.metrics === 'object' ? payload.metrics : {};
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
    const me = await getSessionUser();
    if (!me) {
      const returnTo = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = '/entrar.html?returnTo=' + returnTo;
      return { ok: false, reason: 'login' };
    }

    const cultivoRes = await fetch('/api/cultivo', { credentials: 'include' });
    const cultivoData = await cultivoRes.json().catch(() => ({}));
    if (!cultivoRes.ok) {
      return { ok: false, reason: 'load', error: cultivoData.error };
    }

    const state = ensureActiveGrow(cultivoData.cultivo || {});
    const entry = buildEntry(payload);
    state.log.entries.unshift(entry);
    if (state.log.entries.length > 300) {
      state.log.entries = state.log.entries.slice(0, 300);
    }

    const putRes = await fetch('/api/cultivo', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(state.cultivo)
    });
    const putData = await putRes.json().catch(() => ({}));
    if (!putRes.ok) {
      return { ok: false, reason: 'save', error: putData.error };
    }
    return { ok: true, entry: entry, growName: state.log.name };
  }

  function attachSaveBar(container, payload) {
    if (!container) return;
    let bar = container.querySelector('.diary-save-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'diary-save-bar';
      container.appendChild(bar);
    }
    const calcLabel = payload.calculator ? (CALC_LABELS[payload.calculator] || 'Calculadora') : 'Calculadora';
    bar.innerHTML =
      '<button type="button" class="botao botao-outline botao-sm diary-save-btn">📓 Guardar no diário</button>' +
      '<span class="diary-save-status" role="status" aria-live="polite"></span>';
    const btn = bar.querySelector('.diary-save-btn');
    const status = bar.querySelector('.diary-save-status');
    btn.onclick = async function () {
      btn.disabled = true;
      status.textContent = 'A guardar…';
      const result = await saveToDiary(payload);
      if (result.ok) {
        status.textContent = 'Guardado em «' + result.growName + '».';
        btn.textContent = 'Ver diário';
        btn.disabled = false;
        btn.onclick = function () {
          window.location.href = '/cultivo/?tab=diario&saved=1';
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
