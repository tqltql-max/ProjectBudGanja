(function (global) {
  'use strict';

  function createAutosave(options) {
    var opts = options || {};
    var timer = null;
    var dirty = false;
    var saving = false;
    var lastSavedAt = null;
    var debounceMs = opts.debounceMs || 3000;

    function setIndicator(state, detail) {
      var el = typeof opts.statusEl === 'function' ? opts.statusEl() : opts.statusEl;
      if (!el) return;
      el.classList.remove('is-saving', 'is-saved', 'is-offline', 'is-error', 'is-pending');
      if (state === 'saving') {
        el.hidden = false;
        el.classList.add('is-saving');
        el.textContent = 'A guardar…';
      } else if (state === 'saved') {
        el.hidden = false;
        el.classList.add('is-saved');
        var when = lastSavedAt ? new Date(lastSavedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '';
        el.textContent = when ? 'Guardado às ' + when : 'Guardado';
      } else if (state === 'offline') {
        el.hidden = false;
        el.classList.add('is-offline');
        el.textContent = detail || 'Offline — alterações serão guardadas quando voltar a ligar';
      } else if (state === 'error') {
        el.hidden = false;
        el.classList.add('is-error');
        el.textContent = detail || 'Não foi possível guardar automaticamente';
      } else if (state === 'pending') {
        el.hidden = false;
        el.classList.add('is-pending');
        el.textContent = 'Alterações por guardar…';
      } else {
        el.hidden = true;
        el.textContent = '';
      }
    }

    function scheduleSave() {
      if (opts.isActive && !opts.isActive()) return;
      dirty = true;
      if (!navigator.onLine) {
        setIndicator('offline');
        return;
      }
      setIndicator('pending');
      clearTimeout(timer);
      timer = setTimeout(function () { flush(); }, debounceMs);
    }

    async function flush() {
      if (!dirty || saving) return;
      if (opts.isActive && !opts.isActive()) return;
      if (!navigator.onLine) {
        setIndicator('offline');
        return;
      }
      saving = true;
      setIndicator('saving');
      try {
        var ok = await opts.save();
        // Só limpar dirty em sucesso explícito (true). null/undefined = ocupado/adiado.
        if (ok === true) {
          dirty = false;
          lastSavedAt = Date.now();
          setIndicator('saved');
        } else if (ok === false) {
          setIndicator('error');
        } else {
          // Outro guardado em curso — remarcar e tentar de novo em breve.
          dirty = true;
          clearTimeout(timer);
          timer = setTimeout(function () { flush(); }, Math.min(debounceMs, 1200));
          setIndicator('pending');
        }
      } catch (e) {
        setIndicator('error');
      }
      saving = false;
    }

    function bind() {
      (opts.watchSelectors || []).forEach(function (selector) {
        document.querySelectorAll(selector).forEach(function (el) {
          el.addEventListener('input', scheduleSave);
          el.addEventListener('change', scheduleSave);
        });
      });
      window.addEventListener('online', function () {
        if (dirty) flush();
      });
      window.addEventListener('offline', function () {
        if (dirty) setIndicator('offline');
      });
      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden' && dirty) flush();
      });
    }

    function pause() {
      clearTimeout(timer);
      timer = null;
    }

    function resume() {
      if (dirty) scheduleSave();
    }

    return {
      bind: bind,
      flush: flush,
      scheduleSave: scheduleSave,
      setIndicator: setIndicator,
      pause: pause,
      resume: resume
    };
  }

  global.BudGanjaCultivoAutosave = {
    create: createAutosave
  };
})(window);
