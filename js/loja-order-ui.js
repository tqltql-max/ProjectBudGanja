(function () {
  'use strict';

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  function findProject(catalog, projectId) {
    if (!catalog || !Array.isArray(catalog.projects)) return null;
    return catalog.projects.find(function (p) {
      return p && p.id === projectId && p.orderOffer && p.orderOffer.enabled !== false;
    }) || null;
  }

  function renderOrderOfferCompactHTML(project) {
    const offer = project && project.orderOffer;
    if (!offer || offer.enabled === false) return '';
    const href = '/loja/encomenda.html?produto=' + encodeURIComponent(project.id);
    return (
      '<a href="' + escapeHtml(href) + '" class="loja-order-link">' +
      escapeHtml(offer.buttonLabel || 'Encomendar montada') + ' <span aria-hidden="true">→</span></a>'
    );
  }

  function renderOrderOfferHTML(project, options) {
    options = options || {};
    if (options.compact) return renderOrderOfferCompactHTML(project);

    const offer = project && project.orderOffer;
    if (!offer || offer.enabled === false) return '';
    const href = '/loja/encomenda.html?produto=' + encodeURIComponent(project.id);
    const note = offer.formNote
      ? '<p class="loja-order-note">' + escapeHtml(offer.formNote) + '</p>'
      : '';
    return (
      '<aside class="loja-order-card">' +
      '<div class="loja-order-card-inner">' +
      '<div class="loja-order-brand" aria-hidden="true">' +
      '<img src="/imagens/icon-192.png" alt="" class="loja-order-brand-icon" width="40" height="40" loading="lazy">' +
      '<span class="loja-order-brand-name">Inspetor BudGanja</span>' +
      '</div>' +
      '<p class="loja-order-badge">' + escapeHtml(offer.badge || 'Montagem no laboratório') + '</p>' +
      '<h3 class="loja-order-headline">' + escapeHtml(offer.headline || 'Encomendar montada') + '</h3>' +
      '<p class="loja-order-summary">' + escapeHtml(offer.summary || '') + '</p>' +
      note +
      '<a href="' + escapeHtml(href) + '" class="loja-order-btn botao">' +
      '<span class="loja-order-btn-label">' + escapeHtml(offer.buttonLabel || 'Fazer encomenda') + '</span>' +
      '<span class="loja-order-btn-arrow" aria-hidden="true">→</span>' +
      '</a>' +
      '</div></aside>'
    );
  }

  window.LojaOrderUi = {
    escapeHtml: escapeHtml,
    findProject: findProject,
    renderOrderOfferHTML: renderOrderOfferHTML,
    renderOrderOfferCompactHTML: renderOrderOfferCompactHTML
  };
})();
