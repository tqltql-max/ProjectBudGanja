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
      return p && p.id === projectId;
    }) || null;
  }

  function renderBuyLink(link) {
    if (!link || !link.href) return '';
    const affiliateClass = link.affiliate ? ' loja-buy-link--magalu' : '';
    return (
      '<a href="' + escapeHtml(link.href) + '" class="loja-buy-link' + affiliateClass + '" target="_blank" rel="noopener noreferrer sponsored">' +
      'Comprar <span aria-hidden="true">↗</span></a>'
    );
  }

  function renderProductRow(product, showRole) {
    const optional = product.optional
      ? ' <span class="loja-product-optional">(opc.)</span>'
      : '';
    const firstLink = product.links && product.links[0];
    const roleHtml = showRole && product.role
      ? '<span class="equip-loja-product-role">' + escapeHtml(product.role) + '</span>'
      : '';
    return (
      '<li class="loja-product-row equip-loja-product-row">' +
      '<div class="equip-loja-product-copy">' +
      '<span class="loja-product-name">' + escapeHtml(product.name) + optional + '</span>' +
      roleHtml +
      '</div>' +
      renderBuyLink(firstLink) +
      '</li>'
    );
  }

  function renderMaterialsHTML(project, options) {
    options = options || {};
    const compact = !!options.compact;
    const products = Array.isArray(project.products) ? project.products : [];
    if (!products.length) return '';

    const listHtml = products.map(function (product) {
      return renderProductRow(product, !compact);
    }).join('');

    const title = compact
      ? 'Materiais recomendados'
      : 'Materiais na loja parceira';
    const intro = compact
      ? 'Compre o que usamos neste projeto — links Magazine Inspetor BudGanja.'
      : 'Links para comprar o que usamos no laboratório neste guia. Cada item na vitrine aponta de volta para este manual.';

    return (
      '<aside class="equip-loja-materials highlight' + (compact ? ' equip-loja-materials--compact' : '') + '">' +
      '<p class="equip-loja-eyebrow">Loja parceira · ' + escapeHtml(project.title) + '</p>' +
      '<h3 class="equip-loja-title">' + escapeHtml(title) + '</h3>' +
      '<p class="equip-loja-intro">' + escapeHtml(intro) + '</p>' +
      '<ul class="loja-product-list equip-loja-product-list" aria-label="Materiais — ' + escapeHtml(project.title) + '">' +
      listHtml +
      '</ul>' +
      '<div class="equip-loja-footer">' +
      '<a href="/loja/#' + escapeHtml(project.id) + '" class="botao botao-outline botao-sm">Ver vitrine completa</a>' +
      '</div>' +
      '</aside>'
    );
  }

  function mountHosts() {
    const catalog = window.__LOJA_CATALOG__;
    if (!catalog) return;

    document.querySelectorAll('[data-equip-loja]').forEach(function (host) {
      const projectId = String(host.getAttribute('data-equip-loja') || '').trim();
      const compact = host.getAttribute('data-equip-loja-compact') === '1';
      const project = findProject(catalog, projectId);
      if (!project) {
        host.hidden = true;
        return;
      }
      host.innerHTML = renderMaterialsHTML(project, { compact: compact });
      host.hidden = false;
    });
  }

  document.addEventListener('DOMContentLoaded', mountHosts);

  window.EquipLojaMaterials = {
    findProject: findProject,
    renderMaterialsHTML: renderMaterialsHTML,
    mountHosts: mountHosts
  };
})();
