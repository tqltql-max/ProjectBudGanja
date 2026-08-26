'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { ASSET_VERSION } = require('../lib/asset-version.js');
const {
  readMitologia,
  listTags,
  listCategories,
  escapeHtml
} = require('../lib/mitologia-service.js');

const GENERATED_MARKER = '<!-- generated:mitologia -->';
const OUT_DIR = path.join(ROOT, 'mitologia');

const ICON_HEAD = `    <link rel="icon" href="/imagens/favicon-32.v${ASSET_VERSION}.png" sizes="32x32" type="image/png">
    <link rel="icon" href="/imagens/favicon-48.v${ASSET_VERSION}.png" sizes="48x48" type="image/png">
    <link rel="icon" href="/imagens/favicon-16.v${ASSET_VERSION}.png" sizes="16x16" type="image/png">
    <link rel="icon" href="/imagens/icon-192.v${ASSET_VERSION}.png" sizes="192x192" type="image/png">
    <link rel="shortcut icon" href="/favicon.v${ASSET_VERSION}.ico" sizes="any">
    <link rel="icon" href="/favicon.v${ASSET_VERSION}.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/imagens/apple-touch-icon.v${ASSET_VERSION}.png">
    <link rel="manifest" href="/manifest.json?v=${ASSET_VERSION}">
    <meta name="theme-color" content="#0a2230">`;

const SCRIPTS = `  <script src="/js/app-version-check.js?v=${ASSET_VERSION}"></script>
    <script src="/js/i18n-data.js?v=${ASSET_VERSION}"></script>
    <script src="/js/i18n.js?v=${ASSET_VERSION}"></script>
    <script src="/js/ferramentas-nav-data.js?v=${ASSET_VERSION}"></script>
    <script src="/js/layout.js?v=${ASSET_VERSION}"></script>`;

function pageShell(opts) {
  const { title, description, canonical, bodyPage, mainClass, bodyHtml, extraScripts } = opts;
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    ${GENERATED_MARKER}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${escapeHtml(description)}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://inspetorbudganja.com.br${canonical}">
    <meta property="og:image" content="https://inspetorbudganja.com.br/imagens/inspecoes/mitologia-palavra-cover.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <link rel="canonical" href="https://inspetorbudganja.com.br${canonical}">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="BudGanja">
${ICON_HEAD}
    <link rel="stylesheet" href="/css/style.css?v=${ASSET_VERSION}">
    <title>${escapeHtml(title)}</title>
</head>
<body data-page="${escapeHtml(bodyPage)}">
    <div id="site-header"></div>

    <main id="main-content" class="${escapeHtml(mainClass)}">
${bodyHtml}
    </main>

    <div id="site-footer"></div>
${SCRIPTS}
${extraScripts || ''}
</body>
</html>
`;
}

function catI18nKey(id) {
  const map = {
    lema: 'catLema',
    egito: 'catEgito',
    grego: 'catGrego',
    lexico: 'catLexico',
    ceu: 'catCeu'
  };
  return map[id] || 'catLexico';
}

function buildHub(catalog) {
  const tags = listTags(catalog.items);
  const cats = listCategories(catalog.items);
  const tagOptions = ['<option value="" data-i18n="pages.mitologia.allTags">Todas as tags</option>']
    .concat(tags.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`))
    .join('\n                    ');
  const catOptions = ['<option value="" data-i18n="pages.mitologia.allCategories">Todos</option>']
    .concat(
      cats.map(
        (c) =>
          `<option value="${escapeHtml(c.id)}" data-i18n="pages.mitologia.${catI18nKey(c.id)}">${escapeHtml(c.label)}</option>`
      )
    )
    .join('\n                ');

  const cards = catalog.items
    .slice()
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.nome.localeCompare(b.nome, 'pt');
    })
    .map((it) => {
      const tagAttrs = (it.tags || []).join(' ');
      const searchBlob = [
        it.nome,
        it.nomeEn,
        it.nomeEs,
        it.kicker,
        it.summary,
        it.summaryEn,
        it.summaryEs,
        it.category,
        ...(it.tags || [])
      ]
        .join(' ')
        .toLowerCase();
      const featuredClass = it.featured ? ' planta-card--featured' : '';
      return `                <article class="planta-card${featuredClass}" data-tags="${escapeHtml(tagAttrs)}" data-category="${escapeHtml(it.category)}" data-search="${escapeHtml(searchBlob)}" data-nome-pt="${escapeHtml(it.nome)}" data-nome-en="${escapeHtml(it.nomeEn)}" data-nome-es="${escapeHtml(it.nomeEs)}" data-summary-pt="${escapeHtml(it.summary)}" data-summary-en="${escapeHtml(it.summaryEn)}" data-summary-es="${escapeHtml(it.summaryEs)}" data-kicker-pt="${escapeHtml(it.kicker)}" data-kicker-en="${escapeHtml(it.kickerEn)}" data-kicker-es="${escapeHtml(it.kickerEs)}">
                    <a class="planta-card-link" href="${escapeHtml(it.href)}">
                        <p class="objetos-catalog-kicker" data-myth-kicker>${escapeHtml(it.kicker)}</p>
                        <h2 class="planta-card-title" data-myth-nome>${escapeHtml(it.nome)}</h2>
                        <p class="planta-card-summary" data-myth-summary>${escapeHtml(it.summary)}</p>
                    </a>
                </article>`;
    })
    .join('\n');

  const body = `        <header class="plantas-hub-header">
            <p class="article-eyebrow" data-i18n="pages.mitologia.eyebrow">Catálogo</p>
            <h1 data-i18n="pages.mitologia.title">Mitologia</h1>
            <p class="secao-subtitulo" data-i18n-html="pages.mitologia.subtitle">Ofício de contar os deuses — nomes, relatos e elos já inspecionados. Léxico: <a href="/posts/post-inspecao-palavra-mitologia.html">mitologia</a>. Primeiro deus: <a href="/posts/post-inspecao-palavra-anubis.html">Anúbis</a>.</p>
        </header>

        <aside class="plantas-disclaimer" role="note">
            <strong data-i18n="pages.mitologia.disclaimerStrong">Aviso educacional.</strong> <span data-i18n="pages.mitologia.disclaimer">${escapeHtml(catalog.disclaimer)}</span>
        </aside>

        <div class="plantas-toolbar">
            <label class="plantas-search-label" for="mitologia-search" data-i18n="pages.mitologia.searchLabel">Buscar</label>
            <input type="search" id="mitologia-search" class="plantas-search" placeholder="Nome, tag ou eixo…" data-i18n-placeholder="pages.mitologia.searchPlaceholder" autocomplete="off">
            <label class="plantas-filter-label" for="mitologia-category" data-i18n="pages.mitologia.categoryLabel">Eixo</label>
            <select id="mitologia-category" class="plantas-tag-filter">
                ${catOptions}
            </select>
            <label class="plantas-filter-label" for="mitologia-tag" data-i18n="pages.mitologia.tagLabel">Tag</label>
            <select id="mitologia-tag" class="plantas-tag-filter">
                    ${tagOptions}
            </select>
            <p class="plantas-count" id="mitologia-count" aria-live="polite"></p>
        </div>

        <div class="plantas-grid" id="mitologia-grid">
${cards}
        </div>

        <p class="plantas-empty" id="mitologia-empty" hidden data-i18n="pages.mitologia.empty">Nenhuma ficha corresponde aos filtros.</p>

        <p class="plantas-related"><a href="/posts/post-inspecao-palavra-mitologia.html" data-i18n="pages.mitologia.relatedLemma">Lema mitologia</a> · <a href="/posts/post-inspecao-palavra-anubis.html" data-i18n="pages.mitologia.relatedAnubis">Anúbis</a> · <a href="/guia/astrologia.html" data-i18n="pages.mitologia.relatedAstrologia">Astrologia</a> · <a href="/biblioteca/inspecoes/#inspecoes-palavras" data-i18n="pages.mitologia.relatedInspections">Inspeções</a></p>`;

  return pageShell({
    title: 'Mitologia | Inspetor BudGanja',
    description:
      'Catálogo de mitologia do Inspetor BudGanja — nomes, deuses e elos. Anúbis (chacal que pesa o coração) e o lema mitologia.',
    canonical: '/mitologia/',
    bodyPage: 'mitologia',
    mainClass: 'conteudo-interno plantas-hub mitologia-hub',
    bodyHtml: body,
    extraScripts: `    <script src="/js/mitologia-hub.js?v=${ASSET_VERSION}"></script>\n`
  });
}

function buildMitologia() {
  const catalog = readMitologia();
  if (!catalog.items.length) {
    console.warn('build:mitologia — nenhum registo em content/mitologia.json');
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), buildHub(catalog), 'utf8');
  console.log('build:mitologia — hub com', catalog.items.length, 'fichas em /mitologia/');
}

buildMitologia();
