'use strict';

/** Grava data-i18n nos HTML dos hubs (fonte de verdade do sync:pages). */
const fs = require('fs');
const path = require('path');
const { buildHtmlFromPage } = require('../lib/page-html.js');
const { ROOT } = require('../lib/paths.js');

function wireFile(rel, mutator) {
  const fp = path.join(ROOT, rel);
  if (!fs.existsSync(fp)) {
    console.log('skip missing', rel);
    return;
  }
  const before = fs.readFileSync(fp, 'utf8');
  const after = mutator(before);
  if (after !== before) {
    fs.writeFileSync(fp, after);
    console.log('wired', rel);
  } else {
    console.log('unchanged', rel);
  }
}

function ensureAttr(html, tagRe, attr) {
  return html.replace(tagRe, (full, open, rest) => {
    if (open.includes(attr.split('=')[0])) return full;
    return open.replace(/>$/, ' ' + attr + '>') + rest;
  });
}

wireFile('jogos/index.html', (h) => {
  let out = h;
  out = out.replace(
    /<p class="guia-badge">Jogos<\/p>/,
    '<p class="guia-badge" data-i18n="pages.games.eyebrow">Jogos</p>'
  );
  out = out.replace(/<h1>Jogos<\/h1>/, '<h1 data-i18n="pages.games.title">Jogos</h1>');
  out = out.replace(
    /<p class="secao-subtitulo">([\s\S]*?)<\/p>/,
    (m) => m.includes('data-i18n') ? m : '<p class="secao-subtitulo" data-i18n="pages.games.subtitle">$1</p>'.replace('$1', m.replace(/<\/?p[^>]*>/g, ''))
  );
  return out;
});

// videos
wireFile('videos/index.html', (h) => {
  let out = h;
  out = out.replace(
    /<p class="guia-badge">Canal YouTube<\/p>/,
    '<p class="guia-badge" data-i18n="pages.videos.eyebrow">Canal YouTube</p>'
  );
  out = out.replace(/<h1>Vídeos<\/h1>/, '<h1 data-i18n="pages.videos.title">Vídeos</h1>');
  out = out.replace(
    /<p class="secao-subtitulo">Inspeções, tutoriais e novidades publicadas no canal\.<\/p>/,
    '<p class="secao-subtitulo" data-i18n="pages.videos.subtitle">Inspeções, tutoriais e novidades publicadas no canal.</p>'
  );
  out = out.replace(
    /<p class="empty-message">Carregando vídeos\.\.\.<\/p>/,
    '<p class="empty-message" data-i18n="pages.videos.loading">Carregando vídeos...</p>'
  );
  return out;
});

// inspecoes
wireFile('biblioteca/inspecoes/index.html', (h) => {
  let out = h;
  out = out.replace(/<h1>Inspeções<\/h1>/, '<h1 data-i18n="pages.inspections.title">Inspeções</h1>');
  out = out.replace(
    /<h1 data-i18n="pages\.inspections\.title">Inspeções<\/h1>/,
    '<h1 data-i18n="pages.inspections.title">Inspeções</h1>'
  );
  out = out.replace(
    /<p class="secao-subtitulo inspecoes-hub-lead">([\s\S]*?)<\/p>/,
    '<p class="secao-subtitulo inspecoes-hub-lead" data-i18n="pages.inspections.subtitle">$1</p>'
  );
  out = out.replace(
    /<p class="empty-message">Carregando…<\/p>/,
    '<p class="empty-message" data-i18n="pages.inspections.loading">Carregando…</p>'
  );
  return out;
});

// pesquisas
wireFile('biblioteca/pesquisas/index.html', (h) => {
  let out = h;
  out = out.replace(/<h1>Pesquisas<\/h1>/, '<h1 data-i18n="pages.research.title">Pesquisas</h1>');
  out = out.replace(
    /<p class="secao-subtitulo secao-subtitulo--spaced">([\s\S]*?)<\/p>/,
    '<p class="secao-subtitulo secao-subtitulo--spaced" data-i18n="pages.research.subtitle">$1</p>'
  );
  return out;
});

// calculadoras
wireFile('calculadoras/index.html', (h) => {
  let out = h;
  out = out.replace(/<h1>Ferramentas<\/h1>/, '<h1 data-i18n="pages.tools.title">Ferramentas</h1>');
  if (!out.includes('pages.tools.subtitle')) {
    out = out.replace(
      /<h1 data-i18n="pages\.tools\.title">Ferramentas<\/h1>/,
      '<h1 data-i18n="pages.tools.title">Ferramentas</h1>\n' +
        '        <p class="secao-subtitulo" data-i18n="pages.tools.subtitle">Calculadoras e utilitários para otimizar o cultivo.</p>'
    );
  }
  return out;
});

// equipamentos
wireFile('equipamentos/index.html', (h) => {
  let out = h;
  out = out.replace(/<h1>Equipamentos<\/h1>/, '<h1 data-i18n="pages.equipment.title">Equipamentos</h1>');
  out = out.replace(
    /<p class="secao-subtitulo">([\s\S]*?)<\/p>/,
    (m, text) => {
      if (m.includes('data-i18n')) return m;
      return '<p class="secao-subtitulo" data-i18n="pages.equipment.subtitle">' + text + '</p>';
    }
  );
  return out;
});

// cultivo
wireFile('cultivo/index.html', (h) => {
  return h.replace(
    /<h1 id="perfil-name">Diário de Pesquisas<\/h1>/,
    '<h1 id="perfil-name" data-i18n="pages.cultivo.title">Diário de Pesquisas</h1>'
  ).replace(
    /<h1 id="perfil-name"([^>]*)>Diário de Pesquisas<\/h1>/,
    (m, attrs) => attrs.includes('data-i18n') ? m : '<h1 id="perfil-name"' + attrs + ' data-i18n="pages.cultivo.title">Diário de Pesquisas</h1>'
  );
});

// comunidade
wireFile('comunidade/index.html', (h) => {
  let out = h;
  out = out.replace(/<h1>Comunidade<\/h1>/, '<h1 data-i18n="pages.community.title">Comunidade</h1>');
  out = out.replace(
    /<p class="secao-subtitulo">([\s\S]*?)<\/p>/,
    (m, text) => m.includes('data-i18n') ? m : '<p class="secao-subtitulo" data-i18n="pages.community.subtitle">' + text + '</p>'
  );
  return out;
});

// sorteios
wireFile('sorteios/index.html', (h) => {
  let out = h;
  out = out.replace(/<h1>Sorteios<\/h1>/, '<h1 data-i18n="pages.giveaways.title">Sorteios</h1>');
  out = out.replace(
    /<p class="secao-subtitulo sorteios-intro">([\s\S]*?)<\/p>/,
    '<p class="secao-subtitulo sorteios-intro" data-i18n="pages.giveaways.subtitle">$1</p>'
  );
  return out;
});

// entrar
wireFile('entrar.html', (h) => {
  let out = h;
  out = out.replace(
    /<h1>Criar conta no site<\/h1>/,
    '<h1 data-i18n="pages.login.title">Criar conta no site</h1>'
  );
  out = out.replace(
    /<p class="login-subtitle">([\s\S]*?)<\/p>/,
    '<p class="login-subtitle" data-i18n="pages.login.subtitle">$1</p>'
  );
  return out;
});

// perfil
wireFile('perfil.html', (h) => {
  return h.replace(
    /<h1 id="perfil-name">Conta<\/h1>/,
    '<h1 id="perfil-name" data-i18n="pages.profile.title">Conta</h1>'
  );
});

// info pages
wireFile('info/sobre.html', (h) => {
  let out = h;
  out = out.replace(
    /<p class="article-eyebrow">Sobre<\/p>/,
    '<p class="article-eyebrow" data-i18n="pages.about.eyebrow">Sobre</p>'
  );
  out = out.replace(
    /<h1>Sobre o Inspetor BudGanja<\/h1>/,
    '<h1 data-i18n="pages.about.title">Sobre o Inspetor BudGanja</h1>'
  );
  out = out.replace(
    /<p class="page-intro">([\s\S]*?)<\/p>/,
    (m, t) => m.includes('data-i18n') ? m : '<p class="page-intro" data-i18n="pages.about.subtitle">' + t + '</p>'
  );
  return out;
});

wireFile('info/contato.html', (h) => {
  let out = h;
  out = out.replace(
    /<p class="article-eyebrow">Contato<\/p>/,
    '<p class="article-eyebrow" data-i18n="pages.contact.eyebrow">Contato</p>'
  );
  out = out.replace(
    /<h1>Contato com o Inspetor BudGanja<\/h1>/,
    '<h1 data-i18n="pages.contact.title">Contato com o Inspetor BudGanja</h1>'
  );
  out = out.replace(
    /<p class="page-intro">([\s\S]*?)<\/p>/,
    (m, t) => m.includes('data-i18n') ? m : '<p class="page-intro" data-i18n="pages.contact.subtitle">' + t + '</p>'
  );
  return out;
});

wireFile('info/privacidade.html', (h) => {
  let out = h;
  out = out.replace(
    /<p class="article-eyebrow">Legal<\/p>/,
    '<p class="article-eyebrow" data-i18n="pages.privacy.eyebrow">Legal</p>'
  );
  out = out.replace(
    /<h1>Política de Privacidade<\/h1>/,
    '<h1 data-i18n="pages.privacy.title">Política de Privacidade</h1>'
  );
  out = out.replace(
    /<p class="page-intro">([\s\S]*?)<\/p>/,
    (m, t) => m.includes('data-i18n') ? m : '<p class="page-intro" data-i18n="pages.privacy.subtitle">' + t + '</p>'
  );
  return out;
});

wireFile('biblioteca/unifesp/index.html', (h) => {
  let out = h;
  out = out.replace(
    /<p class="article-eyebrow">Extensão académica<\/p>/,
    '<p class="article-eyebrow" data-i18n="pages.unifesp.eyebrow">Extensão académica</p>'
  );
  out = out.replace(
    /<h1>XIV Curso — Cannabis sativa L\. medicinal<\/h1>/,
    '<h1 data-i18n="pages.unifesp.title">XIV Curso — Cannabis sativa L. medicinal</h1>'
  );
  out = out.replace(
    /<p class="page-intro">([\s\S]*?)<\/p>/,
    (m, t) => m.includes('data-i18n') ? m : '<p class="page-intro" data-i18n="pages.unifesp.subtitle">' + t + '</p>'
  );
  return out;
});

// Also ensure calculadoras generator keeps title+subtitle
const gen = path.join(ROOT, 'scripts', 'generate-calculadoras-pages.js');
let genSrc = fs.readFileSync(gen, 'utf8');
if (!genSrc.includes('pages.tools.subtitle')) {
  genSrc = genSrc.replace(
    /<h1 data-i18n="pages\.tools\.title">Ferramentas<\/h1>/,
    '<h1 data-i18n="pages.tools.title">Ferramentas</h1>\n' +
      '        <p class="secao-subtitulo" data-i18n="pages.tools.subtitle">Calculadoras e utilitários para otimizar o cultivo.</p>'
  );
  if (!genSrc.includes('pages.tools.title')) {
    genSrc = genSrc.replace(
      /<h1>Ferramentas<\/h1>/,
      '<h1 data-i18n="pages.tools.title">Ferramentas</h1>\n' +
        '        <p class="secao-subtitulo" data-i18n="pages.tools.subtitle">Calculadoras e utilitários para otimizar o cultivo.</p>'
    );
  }
  fs.writeFileSync(gen, genSrc);
  console.log('generator calculadoras updated');
}

console.log('HTML wire done. Run sync-pages next.');
