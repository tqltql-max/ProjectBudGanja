(function () {
  'use strict';

  function mountCallouts() {
    const ui = window.LojaOrderUi;
    const catalog = window.__LOJA_CATALOG__;
    if (!ui || !catalog) return;

    document.querySelectorAll('[data-loja-order]').forEach(function (host) {
      const projectId = String(host.getAttribute('data-loja-order') || '').trim();
      const project = ui.findProject(catalog, projectId);
      if (!project) {
        host.hidden = true;
        return;
      }
      host.innerHTML = ui.renderOrderOfferHTML(project, { compact: true });
      host.hidden = false;
    });
  }

  document.addEventListener('DOMContentLoaded', mountCallouts);
})();
