(function () {
  'use strict';

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  function renderBuyLink(link) {
    if (!link) return '';
    const affiliateClass = link.affiliate ? ' loja-buy-link--magalu' : '';
    return (
      '<a href="' + escapeHtml(link.href) + '" class="loja-buy-link' + affiliateClass + '" target="_blank" rel="noopener noreferrer sponsored">' +
      'Comprar <span aria-hidden="true">↗</span></a>'
    );
  }

  function renderProduct(product) {
    const optional = product.optional
      ? ' <span class="loja-product-optional">(opc.)</span>'
      : '';
    const firstLink = product.links && product.links[0];
    const titleAttr = product.role
      ? ' title="' + escapeHtml(product.role) + '"'
      : '';
    return (
      '<li class="loja-product-row">' +
      '<span class="loja-product-name"' + titleAttr + '>' + escapeHtml(product.name) + optional + '</span>' +
      renderBuyLink(firstLink) +
      '</li>'
    );
  }

  function renderOrderOffer(project) {
    const ui = window.LojaOrderUi;
    if (ui && ui.renderOrderOfferHTML) {
      return ui.renderOrderOfferHTML(project, { compact: true });
    }
    return '';
  }

  function renderProject(project) {
    const productsHtml = (project.products || []).map(renderProduct).join('');
    const iconHtml = project.image
      ? '<img src="' + escapeHtml(project.image) + '" alt="" class="loja-project-icon" width="44" height="44" loading="lazy">'
      : '';
    return (
      '<section class="loja-project loja-project-card" id="' + escapeHtml(project.id) + '">' +
      '<header class="loja-project-head">' +
      '<div class="loja-project-head-top">' +
      iconHtml +
      '<div class="loja-project-title-wrap">' +
      '<h2 class="loja-project-title">' + escapeHtml(project.title) + '</h2>' +
      (project.badge ? '<span class="loja-project-badge">' + escapeHtml(project.badge) + '</span>' : '') +
      '</div>' +
      '</div>' +
      '<p class="loja-project-summary">' + escapeHtml(project.summary) + '</p>' +
      '<div class="loja-project-actions">' +
      '<a href="' + escapeHtml(project.manualHref) + '" class="loja-action-link">Guia de montagem</a>' +
      renderOrderOffer(project) +
      '</div>' +
      '</header>' +
      '<ul class="loja-product-list" aria-label="Materiais — ' + escapeHtml(project.title) + '">' +
      productsHtml +
      '</ul>' +
      '</section>'
    );
  }

  function renderCatalog(catalog) {
    const container = document.getElementById('loja-catalog');
    if (!container) return;

    const projects = catalog.projects || [];
    if (!projects.length) {
      container.innerHTML = '<p class="empty-message">Nenhum produto no catálogo por enquanto.</p>';
      return;
    }

    container.innerHTML = projects.map(renderProject).join('');

    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        requestAnimationFrame(function () {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    }
  }

  function loadCatalog() {
    if (window.__LOJA_CATALOG__) {
      renderCatalog(window.__LOJA_CATALOG__);
      return;
    }
    fetch('/content/loja.json')
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; })
      .then(function (data) {
        if (data) renderCatalog(data);
      });
  }

  document.addEventListener('DOMContentLoaded', loadCatalog);
})();
