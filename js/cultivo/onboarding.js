(function (global) {
  'use strict';

  var Shared = global.BudGanjaCultivoShared || {};
  var ONBOARDING_STEPS = [
    {
      title: 'Bem-vindo ao Diário de Cultivo',
      body: 'Aqui documenta cada cultivo como um caderno de campo — com diário, roteiro semanal e plano numa só página.',
      cta: 'Seguinte'
    },
    {
      title: 'Crie a sua primeira pesquisa',
      body: 'Toque em «Iniciar nova pesquisa», dê um nome e indique a espécie. Cada pesquisa fica isolada com os seus registos e roteiro.',
      cta: 'Seguinte',
      highlight: '#cultivo-hub-new-btn'
    },
    {
      title: 'Três secções numa página',
      body: 'Diário (registos e fotos), Roteiro (semanas da fase) e Plano (lembretes). Use a barra fixa para saltar entre elas.',
      cta: 'Seguinte'
    },
    {
      title: 'Publicar no laboratório',
      body: 'Quando tiver registos suficientes, submeta ao laboratório. A equipa revê e publica em Pesquisas na biblioteca do site.',
      cta: 'Começar'
    }
  ];

  function isCultivoOnboardingDone() {
    try {
      return localStorage.getItem(Shared.CULTIVO_ONBOARDING_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function markCultivoOnboardingDone() {
    try {
      localStorage.setItem(Shared.CULTIVO_ONBOARDING_KEY, '1');
    } catch (e) { /* ignore */ }
  }

  function defaultReminderDate(daysAhead) {
    var date = new Date();
    date.setDate(date.getDate() + (daysAhead || 3));
    return date.toISOString().slice(0, 10);
  }

  function clearHighlight() {
    document.querySelectorAll('.cultivo-onboarding-highlight').forEach(function (el) {
      el.classList.remove('cultivo-onboarding-highlight');
    });
  }

  function applyHighlight(selector) {
    clearHighlight();
    if (!selector) return;
    var el = document.querySelector(selector);
    if (el) {
      el.classList.add('cultivo-onboarding-highlight');
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function renderStep(root, stepIndex) {
    var step = ONBOARDING_STEPS[stepIndex];
    if (!step || !root) return;
    var dots = ONBOARDING_STEPS.map(function (_, i) {
      var cls = 'cultivo-onboarding-dot';
      if (i < stepIndex) cls += ' is-done';
      if (i === stepIndex) cls += ' is-active';
      return '<span class="' + cls + '" aria-hidden="true"></span>';
    }).join('');
    root.innerHTML =
      '<div class="cultivo-onboarding-card info-panel highlight-card">' +
      '<div class="cultivo-onboarding-progress" aria-hidden="true">' + dots + '</div>' +
      '<div class="cultivo-onboarding-step">' +
      '<p class="cultivo-onboarding-eyebrow">Passo ' + (stepIndex + 1) + ' de ' + ONBOARDING_STEPS.length + '</p>' +
      '<h2>' + Shared.escapeHtml(step.title) + '</h2>' +
      '<p class="page-intro">' + Shared.escapeHtml(step.body) + '</p>' +
      '</div>' +
      '<div class="cultivo-onboarding-actions">' +
      (stepIndex > 0
        ? '<button type="button" class="botao botao-outline" data-onboard-prev>Anterior</button>'
        : '<button type="button" class="botao botao-outline" data-onboard-skip>Saltar</button>') +
      '<button type="button" class="botao" data-onboard-next>' + Shared.escapeHtml(step.cta) + '</button>' +
      '</div></div>';
    applyHighlight(step.highlight);
    var nextBtn = root.querySelector('[data-onboard-next]');
    var prevBtn = root.querySelector('[data-onboard-prev]');
    var skipBtn = root.querySelector('[data-onboard-skip]');
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (stepIndex >= ONBOARDING_STEPS.length - 1) {
          finishTour(root);
          return;
        }
        renderStep(root, stepIndex + 1);
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        renderStep(root, stepIndex - 1);
      });
    }
    if (skipBtn) {
      skipBtn.addEventListener('click', function () {
        finishTour(root);
      });
    }
  }

  function finishTour(root) {
    clearHighlight();
    markCultivoOnboardingDone();
    if (root) {
      root.hidden = true;
      root.innerHTML = '';
    }
  }

  function maybeStartTour(rootEl, options) {
    var opts = options || {};
    if (!rootEl || isCultivoOnboardingDone()) return false;
    if (opts.onlyWhenEmpty && opts.growCount > 0) return false;
    rootEl.hidden = false;
    renderStep(rootEl, 0);
    return true;
  }

  global.BudGanjaCultivoOnboarding = {
    isDone: isCultivoOnboardingDone,
    markDone: markCultivoOnboardingDone,
    defaultReminderDate: defaultReminderDate,
    maybeStartTour: maybeStartTour,
    finishTour: finishTour
  };
})(window);
