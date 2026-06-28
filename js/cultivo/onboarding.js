(function (global) {
  'use strict';

  var Shared = global.BudGanjaCultivoShared || {};

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

  global.BudGanjaCultivoOnboarding = {
    isDone: isCultivoOnboardingDone,
    markDone: markCultivoOnboardingDone,
    defaultReminderDate: defaultReminderDate
  };
})(window);
