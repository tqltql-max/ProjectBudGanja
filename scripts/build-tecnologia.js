'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { ASSET_VERSION } = require('../lib/asset-version.js');
const {
  readTecnologia,
  listTags,
  listCategories,
  escapeHtml
} = require('../lib/tecnologia-service.js');

const GENERATED_MARKER = '<!-- generated:tecnologia -->';
const OUT_DIR = path.join(ROOT, 'tecnologia');

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
    <meta property="og:image" content="https://inspetorbudganja.com.br/imagens/og-default.jpg">
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
    hardware: 'catHardware',
    rede: 'catRede',
    software: 'catSoftware',
    programacao: 'catProgramacao',
    atividade: 'catAtividade',
    pessoas: 'catPessoas'
  };
  return map[id] || 'catSoftware';
}

function buildHub(catalog) {
  const tags = listTags(catalog.items);
  const cats = listCategories(catalog.items);
  const tagOptions = ['<option value="" data-i18n="pages.tecnologia.allTags">Todas as tags</option>']
    .concat(tags.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`))
    .join('\n                    ');
  const catOptions = ['<option value="" data-i18n="pages.tecnologia.allCategories">Todos</option>']
    .concat(
      cats.map(
        (c) =>
          `<option value="${escapeHtml(c.id)}" data-i18n="pages.tecnologia.${catI18nKey(c.id)}">${escapeHtml(c.label)}</option>`
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
                        <p class="objetos-catalog-kicker" data-tech-kicker>${escapeHtml(it.kicker)}</p>
                        <h2 class="planta-card-title" data-tech-nome>${escapeHtml(it.nome)}</h2>
                        <p class="planta-card-summary" data-tech-summary>${escapeHtml(it.summary)}</p>
                    </a>
                </article>`;
    })
    .join('\n');

  const body = `        <header class="plantas-hub-header">
            <p class="article-eyebrow" data-i18n="pages.tecnologia.eyebrow">Catálogo</p>
            <h1 data-i18n="pages.tecnologia.title">Tecnologia</h1>
            <p class="secao-subtitulo" data-i18n-html="pages.tecnologia.subtitle">Ofício dos aparelhos e métodos — vocábulos, hardware, rede, software e a aula 0 de programar. Léxico: <a href="/posts/post-inspecao-palavra-tecnologia.html">tecnologia</a>. Aula: <a href="/posts/post-inspecao-palavra-for-if-else.html">for / if / else</a>. Fundadora de hardware: <a href="/posts/post-inspecao-palavra-hd-escravo.html">HD escravo</a>.</p>
        </header>

        <section class="tech-lab" id="tecnologia-aula" aria-labelledby="tecnologia-aula-title">
            <p class="article-eyebrow" data-i18n="pages.tecnologia.labEyebrow">Aula 0</p>
            <h2 id="tecnologia-aula-title" data-i18n="pages.tecnologia.labTitle">For · If · Else</h2>
            <p class="tech-lab-lead" data-i18n-html="pages.tecnologia.labLead">Três palavras para começar a programar. <strong>If</strong> decide. <strong>Else</strong> é o outro caminho. <strong>For</strong> repete com fim. A inspeção explica; esta bancada mostra — sem executar texto livre.</p>
            <div class="tech-lab-panels">
                <article class="tech-lab-panel" data-lab="if">
                    <h3 data-i18n="pages.tecnologia.labIfTitle">if / else</h3>
                    <p data-i18n="pages.tecnologia.labIfQ">O vaso está húmido?</p>
                    <p class="tech-lab-actions">
                        <button type="button" class="tech-lab-btn" id="tech-lab-wet" data-i18n="pages.tecnologia.labIfYes">Sim, húmido</button>
                        <button type="button" class="tech-lab-btn" id="tech-lab-dry" data-i18n="pages.tecnologia.labIfNo">Não, seco</button>
                    </p>
                    <pre class="tech-lab-code" tabindex="0"><code>if (humido) {
  // não regar
} else {
  // regar
}</code></pre>
                    <p class="tech-lab-out" id="tech-lab-if-out" aria-live="polite">—</p>
                </article>
                <article class="tech-lab-panel" data-lab="for">
                    <h3 data-i18n="pages.tecnologia.labForTitle">for</h3>
                    <p data-i18n="pages.tecnologia.labForLead">Inspecionar 4 vasos, um a um, e parar.</p>
                    <p class="tech-lab-actions">
                        <button type="button" class="tech-lab-btn" id="tech-lab-for-run" data-i18n="pages.tecnologia.labForRun">Correr o for</button>
                    </p>
                    <pre class="tech-lab-code" tabindex="0"><code>for (var vaso = 1; vaso &lt;= 4; vaso++) {
  inspecionar(vaso);
}</code></pre>
                    <ol class="tech-lab-out-list" id="tech-lab-for-out" aria-live="polite"></ol>
                </article>
            </div>
            <p class="tech-lab-open"><a href="/posts/post-inspecao-palavra-for-if-else.html" data-i18n="pages.tecnologia.labOpen">Abrir a inspeção-aula</a></p>
        </section>

        <aside class="plantas-disclaimer" role="note">
            <strong data-i18n="pages.tecnologia.disclaimerStrong">Aviso educacional.</strong> <span data-i18n="pages.tecnologia.disclaimer">${escapeHtml(catalog.disclaimer)}</span>
        </aside>

        <div class="plantas-toolbar">
            <label class="plantas-search-label" for="tecnologia-search" data-i18n="pages.tecnologia.searchLabel">Buscar</label>
            <input type="search" id="tecnologia-search" class="plantas-search" placeholder="Nome, tag ou eixo…" data-i18n-placeholder="pages.tecnologia.searchPlaceholder" autocomplete="off">
            <label class="plantas-filter-label" for="tecnologia-category" data-i18n="pages.tecnologia.categoryLabel">Eixo</label>
            <select id="tecnologia-category" class="plantas-tag-filter">
                ${catOptions}
            </select>
            <label class="plantas-filter-label" for="tecnologia-tag" data-i18n="pages.tecnologia.tagLabel">Tag</label>
            <select id="tecnologia-tag" class="plantas-tag-filter">
                    ${tagOptions}
            </select>
            <p class="plantas-count" id="tecnologia-count" aria-live="polite"></p>
        </div>

        <div class="plantas-grid" id="tecnologia-grid">
${cards}
        </div>

        <p class="plantas-empty" id="tecnologia-empty" hidden data-i18n="pages.tecnologia.empty">Nenhuma ficha corresponde aos filtros.</p>

        <p class="plantas-related"><a href="/posts/post-inspecao-palavra-tecnologia.html" data-i18n="pages.tecnologia.relatedLemma">Lema tecnologia</a> · <a href="/posts/post-inspecao-palavra-for-if-else.html" data-i18n="pages.tecnologia.relatedAula">Aula for / if / else</a> · <a href="/posts/post-inspecao-palavra-hd-escravo.html" data-i18n="pages.tecnologia.relatedHd">HD escravo</a> · <a href="/objetos/" data-i18n="pages.tecnologia.relatedObjects">Objetos</a> · <a href="/biblioteca/inspecoes/#inspecoes-palavras" data-i18n="pages.tecnologia.relatedInspections">Inspeções</a></p>`;

  return pageShell({
    title: 'Tecnologia | Inspetor BudGanja',
    description:
      'Catálogo de tecnologia do Inspetor BudGanja — vocábulos, hardware, rede, software e a aula 0 de programar (for / if / else).',
    canonical: '/tecnologia/',
    bodyPage: 'tecnologia',
    mainClass: 'conteudo-interno plantas-hub tecnologia-hub',
    bodyHtml: body,
    extraScripts: `    <script src="/js/tecnologia-hub.js?v=${ASSET_VERSION}"></script>\n`
  });
}

function buildTecnologia() {
  const catalog = readTecnologia();
  if (!catalog.items.length) {
    console.warn('build:tecnologia — nenhum registo em content/tecnologia.json');
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), buildHub(catalog), 'utf8');
  console.log('build:tecnologia — hub com', catalog.items.length, 'fichas em /tecnologia/');
}

buildTecnologia();
