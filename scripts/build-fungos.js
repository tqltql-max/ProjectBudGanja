'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { ASSET_VERSION } = require('../lib/asset-version.js');
const {
  readFungos,
  getFungoUrl,
  listTags,
  escapeHtml
} = require('../lib/fungos-service.js');
const { fungoLocalePayload } = require('../lib/fungos-i18n.js');

const GENERATED_MARKER = '<!-- generated:fungos -->';
const OUT_DIR = path.join(ROOT, 'fungos');

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
  const {
    title,
    description,
    canonical,
    bodyPage,
    mainClass,
    bodyHtml,
    extraScripts,
    ogImage
  } = opts;
  const og = ogImage || '/imagens/og-default.jpg';
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
    <meta property="og:image" content="https://inspetorbudganja.com.br${og}">
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
  const tags = listTags(catalog.fungi);
  const tagOptions = ['<option value="" data-i18n="pages.fungos.allTags">Todas as tags</option>']
    .concat(tags.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`))
    .join('\n                    ');

  const cards = catalog.fungi
    .slice()
    .sort((a, b) => a.nomePopular.localeCompare(b.nomePopular, 'pt'))
    .map((p) => {
      const loc = fungoLocalePayload(p);
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
      const inspecaoHref = '/posts/post-inspecao-fungo-' + p.slug + '.html';
      return `                <article class="planta-card" data-tags="${escapeHtml(tagAttrs)}" data-search="${escapeHtml(searchBlob)}" data-nome-pt="${escapeHtml(loc['pt-BR'].nomePopular)}" data-nome-en="${escapeHtml(loc.en.nomePopular)}" data-nome-es="${escapeHtml(loc.es.nomePopular)}" data-summary-pt="${escapeHtml(loc['pt-BR'].summary)}" data-summary-en="${escapeHtml(loc.en.summary)}" data-summary-es="${escapeHtml(loc.es.summary)}">
                    <a class="planta-card-link" href="${escapeHtml(getFungoUrl(p))}">
                        <h2 class="planta-card-title" data-planta-nome>${escapeHtml(p.nomePopular)}</h2>
                        <p class="planta-card-sci"><em>${escapeHtml(p.nomeCientifico)}</em></p>
                        <p class="planta-card-summary" data-planta-summary>${escapeHtml(p.summary)}</p>
                        ${unifesp}
                    </a>
                    <a class="planta-card-inspection" href="${escapeHtml(inspecaoHref)}" data-i18n="pages.fungos.cardInspection">Fungo inspecionado</a>
                </article>`;
    })
    .join('\n');

  const body = `        <header class="plantas-hub-header">
            <p class="article-eyebrow" data-i18n="pages.fungos.eyebrow">Catálogo</p>
            <h1 data-i18n="pages.fungos.title">Fungos</h1>
            <p class="secao-subtitulo" data-i18n="pages.fungos.subtitle">Fichas educacionais de espécies fúngicas — identificação, enquadramento e cuidados. Não é cultivo nem uso.</p>
        </header>

        <aside class="plantas-disclaimer" role="note">
            <strong data-i18n="pages.fungos.disclaimerStrong">Aviso educacional.</strong> <span data-i18n="pages.fungos.disclaimer">${escapeHtml(catalog.disclaimer)}</span>
        </aside>

        <div class="plantas-toolbar">
            <label class="plantas-search-label" for="fungos-search" data-i18n="pages.fungos.searchLabel">Buscar</label>
            <input type="search" id="fungos-search" class="plantas-search" placeholder="Nome popular, científico ou tag…" data-i18n-placeholder="pages.fungos.searchPlaceholder" autocomplete="off">
            <label class="plantas-filter-label" for="fungos-tag" data-i18n="pages.fungos.tagLabel">Tag</label>
            <select id="fungos-tag" class="plantas-tag-filter">
                    ${tagOptions}
            </select>
            <p class="plantas-count" id="fungos-count" aria-live="polite"></p>
        </div>

        <div class="plantas-grid" id="fungos-grid">
${cards}
        </div>

        <p class="plantas-empty" id="fungos-empty" hidden data-i18n="pages.fungos.empty">Nenhum fungo corresponde aos filtros.</p>

        <p class="plantas-related"><a href="/biblioteca/unifesp/" data-i18n="pages.fungos.relatedCourse">Curso UNIFESP</a> · <a href="/biblioteca/inspecoes/#inspecoes-fungos" data-i18n="pages.fungos.relatedInspections">Inspeções de fungos</a> · <a href="/plantas/" data-i18n="pages.fungos.relatedPlants">Catálogo de plantas</a></p>`;

  return pageShell({
    title: 'Fungos | Inspetor BudGanja',
    description:
      'Catálogo educacional de fungos do Inspetor BudGanja — identificação, enquadramento e cuidados. Não é protocolo de cultivo nem de uso.',
    canonical: '/fungos/',
    bodyPage: 'fungos',
    mainClass: 'conteudo-interno plantas-hub',
    bodyHtml: body,
    extraScripts: `    <script src="/js/fungos-hub.js?v=${ASSET_VERSION}"></script>\n`
  });
}

function buildFungoPage(fungo, catalog) {
  const tags = (fungo.tags || [])
    .map((t) => `<span class="planta-tag">${escapeHtml(t)}</span>`)
    .join(' ');
  const localeJson = JSON.stringify(fungoLocalePayload(fungo)).replace(/</g, '\\u003c');

  const ownInspectionHref = '/posts/post-inspecao-fungo-' + fungo.slug + '.html';
  const ownInspectionLabel = 'Inspeção: ' + (fungo.nomePopular || fungo.slug);
  const relatedInspections = Array.isArray(fungo.relatedInspections)
    ? fungo.relatedInspections.filter((r) => r && r.href && r.label)
    : [];
  const hasOwnInspectionLink = relatedInspections.some(
    (r) => String(r.href || '').indexOf('inspecao-fungo-' + fungo.slug) !== -1
  );
  const scienceLinks = hasOwnInspectionLink
    ? relatedInspections
    : [
        {
          href: ownInspectionHref,
          label: ownInspectionLabel,
          labelEn: 'Inspection: ' + (fungo.nomePopular || fungo.slug),
          labelEs: 'Inspección: ' + (fungo.nomePopular || fungo.slug)
        }
      ].concat(relatedInspections);
  const relatedScienceBlock = scienceLinks.length
    ? `            <div class="planta-related-science">
                <h3 data-i18n="pages.fungos.relatedScience">Leituras inspecionadas no laboratório</h3>
                <ul class="info-list">
${scienceLinks
  .map((r) => {
    const labelEn = escapeHtml(r.labelEn || r.label);
    const labelEs = escapeHtml(r.labelEs || r.label);
    return `                    <li><a href="${escapeHtml(r.href)}" data-planta-related-label data-label-pt="${escapeHtml(r.label)}" data-label-en="${labelEn}" data-label-es="${labelEs}">${escapeHtml(r.label)}</a></li>`;
  })
  .join('\n')}
                </ul>
            </div>`
    : '';

  const unifespBlock = fungo.relatedUnifesp
    ? `        <section class="info-panel">
            <h2 data-i18n="pages.fungos.unifespTitle">Formação UNIFESP</h2>
            <p data-i18n="pages.fungos.unifespBody">Esta espécie está ligada ao eixo do curso de extensão UNIFESP sobre cannabis medicinal (aula de psicadélicos).</p>
            <div class="home-pillar-actions">
                <a class="botao botao-home" href="/biblioteca/unifesp/" data-i18n="pages.fungos.unifespHub">Hub UNIFESP</a>
                <a class="botao botao-home botao-home--secondary" href="/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html" data-i18n="pages.fungos.unifespCourse">Inspeção do curso</a>
            </div>
        </section>`
    : '';

  const body = `        <script type="application/json" id="planta-i18n-data">${localeJson}</script>
        <nav class="planta-breadcrumb" data-i18n-aria="pages.fungos.breadcrumb" aria-label="Navegação">
            <a href="/fungos/" data-i18n="pages.fungos.fungiLink">Fungos</a>
            <span aria-hidden="true">/</span>
            <span data-planta-nome>${escapeHtml(fungo.nomePopular)}</span>
        </nav>

        <header class="article-header planta-header">
            <p class="article-eyebrow">${escapeHtml(fungo.familia || 'Fungi')}</p>
            <h1 data-planta-nome>${escapeHtml(fungo.nomePopular)}</h1>
            <p class="planta-sci"><em>${escapeHtml(fungo.nomeCientifico)}</em></p>
            <p class="page-intro" data-planta-summary>${escapeHtml(fungo.summary)}</p>
            <div class="planta-tags">${tags}</div>
        </header>

        <aside class="plantas-disclaimer" role="note">
            <strong data-i18n="pages.fungos.disclaimerStrong">Aviso educacional.</strong> <span data-i18n="pages.fungos.disclaimer">${escapeHtml(catalog.disclaimer)}</span>
        </aside>

        <section class="info-panel">
            <h2 data-i18n="pages.fungos.partsUsed">Partes / caracteres de ofício</h2>
            <ul class="info-list" data-planta-parts></ul>
        </section>

        <section class="info-panel">
            <h2 data-i18n="pages.fungos.traditionalUses">Contexto tradicional e formativo</h2>
            <ul class="info-list" data-planta-uses></ul>
        </section>

        <section class="info-panel" id="planta-cuidados">
            <h2 data-i18n="pages.fungos.cautions">Cuidados</h2>
            <p data-planta-cautions>${escapeHtml(fungo.cautions)}</p>
${relatedScienceBlock}
        </section>

${unifespBlock}

        <section class="info-panel">
            <h2 data-i18n="pages.fungos.continueLab">Continuar no laboratório</h2>
            <ul class="info-list">
                <li><a href="${escapeHtml(ownInspectionHref)}" data-i18n="pages.fungos.openInspection">Abrir inspeção deste fungo</a></li>
                <li><a href="/fungos/" data-i18n="pages.fungos.backCatalog">Voltar ao catálogo</a></li>
                <li><a href="/plantas/" data-i18n="pages.fungos.relatedPlants">Catálogo de plantas</a></li>
                <li><a href="/biblioteca/unifesp/" data-i18n="pages.fungos.relatedCourse">Curso UNIFESP</a></li>
                <li><a href="/biblioteca/inspecoes/#inspecoes-fungos" data-i18n="pages.fungos.relatedInspections">Inspeções de fungos</a></li>
            </ul>
        </section>`;

  const desc =
    fungo.summary ||
    fungo.nomePopular + ' (' + fungo.nomeCientifico + ') — ficha educacional de fungos.';

  return pageShell({
    title: fungo.nomePopular + ' | Inspetor BudGanja',
    description: desc.slice(0, 160),
    canonical: getFungoUrl(fungo),
    bodyPage: 'fungo',
    mainClass: 'article-page relatorio-container planta-ficha',
    bodyHtml: body,
    extraScripts: '',
    ogImage: fungo.cover || '/imagens/og-default.jpg'
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

function buildFungos() {
  const catalog = readFungos();
  if (!catalog.fungi.length) {
    console.warn('build:fungos — nenhum registo em content/fungos.json');
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  cleanGenerated(OUT_DIR);

  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), buildHub(catalog), 'utf8');

  catalog.fungi.forEach((fungo) => {
    const dir = path.join(OUT_DIR, fungo.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), buildFungoPage(fungo, catalog), 'utf8');
  });

  console.log('build:fungos — hub +', catalog.fungi.length, 'fichas em /fungos/');
}

buildFungos();
