'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { ASSET_VERSION } = require('../lib/asset-version.js');
const {
  readPlantas,
  getPlantUrl,
  listTags,
  escapeHtml
} = require('../lib/plantas-service.js');
const { plantLocalePayload } = require('../lib/plantas-i18n.js');

const GENERATED_MARKER = '<!-- generated:plantas -->';
const OUT_DIR = path.join(ROOT, 'plantas');

const ICON_HEAD = `    <link rel="icon" href="/imagens/favicon-32.v${ASSET_VERSION}.png" sizes="32x32" type="image/png">
    <link rel="icon" href="/imagens/favicon-48.v${ASSET_VERSION}.png" sizes="48x48" type="image/png">
    <link rel="icon" href="/imagens/favicon-16.v${ASSET_VERSION}.png" sizes="16x16" type="image/png">
    <link rel="icon" href="/imagens/icon-192.v${ASSET_VERSION}.png" sizes="192x192" type="image/png">
    <link rel="shortcut icon" href="/favicon.v${ASSET_VERSION}.ico" sizes="any">
    <link rel="icon" href="/favicon.v${ASSET_VERSION}.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/imagens/apple-touch-icon.v${ASSET_VERSION}.png">
    <link rel="manifest" href="/manifest.json?v=${ASSET_VERSION}">
    <meta name="theme-color" content="#a68628">`;

const SCRIPTS = `  <script src="/js/app-version-check.js?v=${ASSET_VERSION}"></script>
    <script src="/js/i18n-data.js?v=${ASSET_VERSION}"></script>
    <script src="/js/i18n.js?v=${ASSET_VERSION}"></script>
    <script src="/js/ferramentas-nav-data.js?v=${ASSET_VERSION}"></script>
    <script src="/js/layout.js?v=${ASSET_VERSION}"></script>`;

function pageShell(opts) {
  const {
    title,
    description,
    canonical,
    bodyPage,
    mainClass,
    bodyHtml,
    extraScripts
  } = opts;
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

function buildHub(catalog) {
  const tags = listTags(catalog.plants);
  const tagOptions = ['<option value="" data-i18n="pages.plantas.allTags">Todas as tags</option>']
    .concat(tags.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`))
    .join('\n                    ');

  const cards = catalog.plants
    .slice()
    .sort((a, b) => a.nomePopular.localeCompare(b.nomePopular, 'pt'))
    .map((p) => {
      const loc = plantLocalePayload(p);
      const tagAttrs = (p.tags || []).join(' ');
      const searchBlob = [
        loc['pt-BR'].nomePopular,
        loc.en.nomePopular,
        loc.es.nomePopular,
        p.nomeCientifico,
        p.familia,
        ...(p.tags || [])
      ]
        .join(' ')
        .toLowerCase();
      const unifesp = p.relatedUnifesp
        ? '<span class="planta-card-badge">UNIFESP</span>'
        : '';
      return `                <article class="planta-card" data-tags="${escapeHtml(tagAttrs)}" data-search="${escapeHtml(searchBlob)}" data-nome-pt="${escapeHtml(loc['pt-BR'].nomePopular)}" data-nome-en="${escapeHtml(loc.en.nomePopular)}" data-nome-es="${escapeHtml(loc.es.nomePopular)}" data-summary-pt="${escapeHtml(loc['pt-BR'].summary)}" data-summary-en="${escapeHtml(loc.en.summary)}" data-summary-es="${escapeHtml(loc.es.summary)}">
                    <a class="planta-card-link" href="${escapeHtml(getPlantUrl(p))}">
                        <h2 class="planta-card-title" data-planta-nome>${escapeHtml(p.nomePopular)}</h2>
                        <p class="planta-card-sci"><em>${escapeHtml(p.nomeCientifico)}</em></p>
                        <p class="planta-card-summary" data-planta-summary>${escapeHtml(p.summary)}</p>
                        ${unifesp}
                    </a>
                </article>`;
    })
    .join('\n');

  const body = `        <header class="plantas-hub-header">
            <p class="article-eyebrow" data-i18n="pages.plantas.eyebrow">Catálogo</p>
            <h1 data-i18n="pages.plantas.title">Plantas fitoterápicas</h1>
            <p class="secao-subtitulo" data-i18n="pages.plantas.subtitle">Fichas educacionais de espécies usadas na medicina popular e na fitoterapia brasileira — usos tradicionais, partes usadas e cuidados editoriais.</p>
        </header>

        <aside class="plantas-disclaimer" role="note">
            <strong data-i18n="pages.plantas.disclaimerStrong">Aviso educacional.</strong> <span data-i18n="pages.plantas.disclaimer">${escapeHtml(catalog.disclaimer)}</span>
        </aside>

        <div class="plantas-toolbar">
            <label class="plantas-search-label" for="plantas-search" data-i18n="pages.plantas.searchLabel">Buscar</label>
            <input type="search" id="plantas-search" class="plantas-search" placeholder="Nome popular, científico ou tag…" data-i18n-placeholder="pages.plantas.searchPlaceholder" autocomplete="off">
            <label class="plantas-filter-label" for="plantas-tag" data-i18n="pages.plantas.tagLabel">Tag</label>
            <select id="plantas-tag" class="plantas-tag-filter">
                    ${tagOptions}
            </select>
            <p class="plantas-count" id="plantas-count" aria-live="polite"></p>
        </div>

        <div class="plantas-grid" id="plantas-grid">
${cards}
        </div>

        <p class="plantas-empty" id="plantas-empty" hidden data-i18n="pages.plantas.empty">Nenhuma planta corresponde aos filtros.</p>

        <p class="plantas-related"><a href="/biblioteca/unifesp/" data-i18n="pages.plantas.relatedCourse">Curso UNIFESP</a> · <a href="/biblioteca/inspecoes/" data-i18n="pages.plantas.relatedInspections">Inspeções</a> · <a href="/cultivo/" data-i18n="pages.plantas.relatedDiary">Diário de pesquisas</a></p>`;

  return pageShell({
    title: 'Plantas fitoterápicas | Inspetor BudGanja',
    description:
      'Catálogo curado de plantas medicinais e fitoterápicas do Brasil — fichas educacionais com usos tradicionais e cuidados.',
    canonical: '/plantas/',
    bodyPage: 'plantas',
    mainClass: 'conteudo-interno plantas-hub',
    bodyHtml: body,
    extraScripts: `    <script src="/js/plantas-hub.js?v=${ASSET_VERSION}"></script>\n`
  });
}

function buildPlantPage(plant, catalog) {
  const tags = (plant.tags || [])
    .map((t) => `<span class="planta-tag">${escapeHtml(t)}</span>`)
    .join(' ');
  const localeJson = JSON.stringify(plantLocalePayload(plant)).replace(/</g, '\\u003c');

  const relatedInspections = Array.isArray(plant.relatedInspections)
    ? plant.relatedInspections.filter((r) => r && r.href && r.label)
    : [];
  const relatedScienceBlock = relatedInspections.length
    ? `            <div class="planta-related-science">
                <h3 data-i18n="pages.plantas.relatedScience">Leituras inspecionadas no laboratório</h3>
                <ul class="info-list">
${relatedInspections
  .map((r) => {
    const labelEn = escapeHtml(r.labelEn || r.label);
    const labelEs = escapeHtml(r.labelEs || r.label);
    return `                    <li><a href="${escapeHtml(r.href)}" data-planta-related-label data-label-pt="${escapeHtml(r.label)}" data-label-en="${labelEn}" data-label-es="${labelEs}">${escapeHtml(r.label)}</a></li>`;
  })
  .join('\n')}
                </ul>
            </div>`
    : '';

  const unifespBlock = plant.relatedUnifesp
    ? `        <section class="info-panel">
            <h2 data-i18n="pages.plantas.unifespTitle">Formação UNIFESP</h2>
            <p data-i18n="pages.plantas.unifespBody">Esta espécie está ligada ao eixo do curso de extensão UNIFESP sobre cannabis medicinal.</p>
            <div class="home-pillar-actions">
                <a class="botao botao-home" href="/biblioteca/unifesp/" data-i18n="pages.plantas.unifespHub">Hub UNIFESP</a>
                <a class="botao botao-home botao-home--secondary" href="/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html" data-i18n="pages.plantas.unifespCourse">Inspeção do curso</a>
            </div>
        </section>`
    : '';

  const body = `        <script type="application/json" id="planta-i18n-data">${localeJson}</script>
        <nav class="planta-breadcrumb" data-i18n-aria="pages.plantas.breadcrumb" aria-label="Navegação">
            <a href="/plantas/" data-i18n="pages.plantas.plantsLink">Plantas</a>
            <span aria-hidden="true">/</span>
            <span data-planta-nome>${escapeHtml(plant.nomePopular)}</span>
        </nav>

        <header class="article-header planta-header">
            <p class="article-eyebrow">${escapeHtml(plant.familia || 'Fitoterapia')}</p>
            <h1 data-planta-nome>${escapeHtml(plant.nomePopular)}</h1>
            <p class="planta-sci"><em>${escapeHtml(plant.nomeCientifico)}</em></p>
            <p class="page-intro" data-planta-summary>${escapeHtml(plant.summary)}</p>
            <div class="planta-tags">${tags}</div>
        </header>

        <aside class="plantas-disclaimer" role="note">
            <strong data-i18n="pages.plantas.disclaimerStrong">Aviso educacional.</strong> <span data-i18n="pages.plantas.disclaimer">${escapeHtml(catalog.disclaimer)}</span>
        </aside>

        <section class="info-panel">
            <h2 data-i18n="pages.plantas.partsUsed">Partes usadas</h2>
            <ul class="info-list" data-planta-parts></ul>
        </section>

        <section class="info-panel">
            <h2 data-i18n="pages.plantas.traditionalUses">Usos tradicionais</h2>
            <ul class="info-list" data-planta-uses></ul>
        </section>

        <section class="info-panel" id="planta-cuidados">
            <h2 data-i18n="pages.plantas.cautions">Cuidados</h2>
            <p data-planta-cautions>${escapeHtml(plant.cautions)}</p>
${relatedScienceBlock}
        </section>

${unifespBlock}

        <section class="info-panel">
            <h2 data-i18n="pages.plantas.continueLab">Continuar no laboratório</h2>
            <ul class="info-list">
                <li><a href="/cultivo/?plant=${escapeHtml(plant.slug)}" data-i18n="pages.plantas.startDiary">Iniciar pesquisa no diário</a><span data-i18n="pages.plantas.startDiaryHint"> — criar ou abrir o diário desta espécie</span></li>
                <li><a href="/plantas/" data-i18n="pages.plantas.backCatalog">Voltar ao catálogo</a></li>
                <li><a href="/biblioteca/unifesp/" data-i18n="pages.plantas.relatedCourse">Curso UNIFESP</a></li>
                <li><a href="/biblioteca/inspecoes/" data-i18n="pages.plantas.relatedInspections">Inspeções</a></li>
                <li><a href="/calculadoras/" data-i18n="pages.plantas.relatedTools">Ferramentas de cultivo</a></li>
            </ul>
        </section>`;

  const desc =
    plant.summary ||
    plant.nomePopular + ' (' + plant.nomeCientifico + ') — ficha educacional de fitoterapia.';

  return pageShell({
    title: plant.nomePopular + ' | Inspetor BudGanja',
    description: desc.slice(0, 160),
    canonical: getPlantUrl(plant),
    bodyPage: 'planta',
    mainClass: 'article-page relatorio-container planta-ficha',
    bodyHtml: body,
    extraScripts: ''
  });
}

function cleanGenerated(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      const indexPath = path.join(full, 'index.html');
      if (fs.existsSync(indexPath)) {
        const head = fs.readFileSync(indexPath, 'utf8').slice(0, 200);
        if (head.includes(GENERATED_MARKER)) {
          fs.rmSync(full, { recursive: true, force: true });
        }
      }
    } else if (ent.name === 'index.html') {
      const head = fs.readFileSync(full, 'utf8').slice(0, 200);
      if (head.includes(GENERATED_MARKER)) fs.unlinkSync(full);
    }
  }
}

function buildPlantas() {
  const catalog = readPlantas();
  if (!catalog.plants.length) {
    console.warn('build:plantas — nenhum registo em content/plantas.json');
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  cleanGenerated(OUT_DIR);

  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), buildHub(catalog), 'utf8');

  catalog.plants.forEach((plant) => {
    const dir = path.join(OUT_DIR, plant.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), buildPlantPage(plant, catalog), 'utf8');
  });

  console.log('build:plantas — hub +', catalog.plants.length, 'fichas em /plantas/');
}

buildPlantas();
