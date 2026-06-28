'use strict';

const EMPTY_CTAS = {
  pesquisa: { text: 'Explorar o guia de cultivo', href: '/guia/cultivo-basico.html' },
  inspecao: { text: 'Ver inspeções no YouTube', href: 'https://www.youtube.com/@InspetorBudGanja', external: true },
  equipamento: { text: 'Ver guia da clonadora', href: '/equipamentos/clonadora-6-estacas.html' }
};

function buildEmptyStateHtml(category) {
  const cta = EMPTY_CTAS[category] || EMPTY_CTAS.pesquisa;
  const ext = cta.external ? ' target="_blank" rel="noopener noreferrer"' : '';
  return (
    '<div class="empty-state">' +
    '<p class="empty-message">Nenhuma publicação nesta secção ainda.</p>' +
    '<a href="' + cta.href + '" class="botao botao-home"' + ext + '>' + cta.text + '</a>' +
    '</div>'
  );
}

module.exports = { buildEmptyStateHtml, EMPTY_CTAS };
