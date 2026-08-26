'use strict';

/**
 * Fecho vivo do lab.
 * Valeu !!! fica; «eu amo a vida» entra **automaticamente** como alteração.
 * Um sítio só — markdown-render, preview e poemas lêem daqui.
 */

const VALEU_HREF = '/posts/post-inspecao-palavra-valeu.html';
const ALTERACAO_HREF = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
const ALTERACAO_PT = 'eu amo a vida';
const ALTERACAO_EN = 'I love life';
const ALTERACAO_ES = 'amo la vida';

const VALEU_LINK_RE =
  /<a href="\/posts\/post-inspecao-palavra-valeu\.html">((?:¡)?Valeu !!!)<\/a>(?:\s*·\s*<a href="\/posts\/post-inspecao-expressao-eu-amo-a-vida\.html">[^<]*<\/a>)?/g;

function applyValeuAlteracaoHtml(html) {
  return String(html || '').replace(VALEU_LINK_RE, function (_, label) {
    return (
      '<a href="' +
      VALEU_HREF +
      '">' +
      label +
      '</a> · <a href="' +
      ALTERACAO_HREF +
      '">' +
      ALTERACAO_PT +
      '</a>'
    );
  });
}

function normalizeMantraStanza(stanza) {
  return String(stanza || '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/^[¡!]+/, '')
    .replace(/[!¡.]+$/g, '');
}

function isValeuOnlyStanza(stanza) {
  const t = normalizeMantraStanza(stanza);
  return (
    t === 'valeu' ||
    t === 'faça o melhor' ||
    t === 'faca o melhor' ||
    t === 'do your best' ||
    t === 'haz lo mejor'
  );
}

function isEuAmoAVidaStanza(stanza) {
  const t = normalizeMantraStanza(stanza);
  return t === 'eu amo a vida' || t === 'i love life' || t === 'amo la vida';
}

function isMantraStanza(stanza) {
  const t = normalizeMantraStanza(stanza);
  if (isValeuOnlyStanza(stanza) || isEuAmoAVidaStanza(stanza)) return true;
  return (
    t === 'valeu · eu amo a vida' ||
    t === 'valeu !!! · eu amo a vida' ||
    (t.indexOf('eu amo a vida') >= 0 && t.indexOf('valeu') >= 0)
  );
}

function expandPoemMantraStanzas(stanzas) {
  const src = Array.isArray(stanzas) ? stanzas : [];
  const out = [];
  for (let i = 0; i < src.length; i++) {
    out.push(src[i]);
    if (isValeuOnlyStanza(src[i]) && !isEuAmoAVidaStanza(src[i + 1])) {
      out.push(ALTERACAO_PT);
    }
  }
  return out;
}

module.exports = {
  VALEU_HREF,
  ALTERACAO_HREF,
  ALTERACAO_PT,
  ALTERACAO_EN,
  ALTERACAO_ES,
  applyValeuAlteracaoHtml,
  isMantraStanza,
  isValeuOnlyStanza,
  isEuAmoAVidaStanza,
  expandPoemMantraStanzas
};
