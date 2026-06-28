const fs = require('fs');
const path = require('path');
const { buildPrimaryNav } = require('./biblioteca-nav.js');
const { buildHtmlFromPage, sanitizeHeadExtra } = require('./page-html.js');

const { CALCULADORAS } = require('./calculadoras-registry.js');

const PAGE_REGISTRY = [
  { file: 'index.html', label: 'Início' },
  { file: 'entrar.html', label: 'Entrar' },
  { file: 'perfil.html', label: 'Meu perfil' },
  { file: 'cultivo/index.html', label: 'Diário de Pesquisas' },
  { file: 'guia/cultivo-basico.html', label: 'Guia de Cultivo' },
  { file: 'videos/index.html', label: 'Últimos vídeos' },
  { file: 'biblioteca/inspecoes/index.html', label: 'Inspeções' },
  { file: 'info/sobre.html', label: 'Sobre' },
  { file: 'info/contato.html', label: 'Contato' },
  { file: 'info/privacidade.html', label: 'Privacidade' },
  { file: 'sorteios/index.html', label: 'Sorteios' },
  { file: 'equipamentos/index.html', label: 'Equipamentos' },
  { file: 'loja/index.html', label: 'Loja parceira' },
  { file: 'loja/encomenda.html', label: 'Encomendar clonadora' },
  { file: 'loja-admin.html', label: 'Admin encomendas' },
  { file: 'pesquisas-admin.html', label: 'Admin submissões de pesquisas' },
  { file: 'usuarios-admin.html', label: 'Admin utilizadores' },
  { file: 'biblioteca/pesquisas/index.html', label: 'Pesquisas' },
  { file: 'calculadoras/index.html', label: 'Calculadoras' },
  ...CALCULADORAS.map((c) => ({
    file: c.customPage ? 'calculadoras/' + c.slug + '.html' : 'calculadoras/' + c.slug + '.html',
    label: c.shortTitle || c.title
  })),
  { file: 'equipamentos/clonadora-6-estacas.html', label: 'Guia: Clonadora 6 estacas' },
  { file: 'equipamentos/clonadora-12-estacas.html', label: 'Guia: Clonadora 12 estacas' },
  { file: 'equipamentos/manual-clonadora.html', label: 'Manual: Clonadoras (redirecionamento)' },
  { file: 'equipamentos/manual-hidrocloradora.html', label: 'Manual: Clonadoras (redirecionamento)' },
  { file: 'biblioteca/pesquisas/substratos.html', label: 'Pesquisa: Substratos' }
];

const DEFAULT_SITE = {
  siteName: 'Inspetor BudGanja',
  siteTagline: 'Laboratório de cultivo',
  footerText: '© 2026 Inspetor BudGanja. Conteúdo educacional.',
  privacyUpdated: '26 de junho de 2026',
  ogImage: '/imagens/background-hero.svg',
  contactEmail: 'inspetorbudganja@gmail.com',
  youtubeChannelUrl: 'https://www.youtube.com/@InspetorBudGanja',
  youtubeChannelLabel: 'Canal @InspetorBudGanja',
  nav: buildPrimaryNav(),
  footerLinks: [
    { label: 'Início', href: '/' },
    { label: 'Guia de Cultivo', href: '/biblioteca/inspecoes/' },
    { label: 'Pesquisas', href: '/biblioteca/pesquisas/' },
    { label: 'Inspeções', href: '/biblioteca/inspecoes/' },
    { label: 'Equipamentos', href: '/equipamentos/' },
    { label: 'Loja parceira', href: '/loja/' },
    { label: 'Calculadoras', href: '/calculadoras/' },
    { label: 'Luxímetro', href: '/calculadoras/luximetro.html' },
    { label: 'Últimos vídeos', href: '/videos/' }
  ],
  footerGroups: [
    {
      title: 'Biblioteca',
      links: [
        { label: 'Guia de Cultivo', href: '/biblioteca/inspecoes/' },
        { label: 'Pesquisas', href: '/biblioteca/pesquisas/' },
        { label: 'Inspeções', href: '/biblioteca/inspecoes/' },
        { label: 'Vídeos', href: '/videos/' }
      ]
    },
    {
      title: 'Ferramentas',
      links: [
        { label: 'Calculadoras', href: '/calculadoras/' },
        { label: 'Equipamentos', href: '/equipamentos/' },
        { label: 'Loja parceira', href: '/loja/' },
        { label: 'Luxímetro', href: '/calculadoras/luximetro.html' },
      ]
    },
    {
      title: 'Sobre nós',
      links: [
        { label: 'Sobre o projeto', href: '/info/sobre.html' },
        { label: 'Contato', href: '/info/contato.html' },
        { label: 'Sorteios', href: '/sorteios/' },
        { label: 'Privacidade', href: '/info/privacidade.html' }
      ]
    }
  ]
};

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function createContentStore(root) {
  const contentDir = path.join(root, 'content');
  const pagesPath = path.join(contentDir, 'pages.json');
  const sitePath = path.join(contentDir, 'site.json');

  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  function readPagesStore() {
    try {
      return JSON.parse(fs.readFileSync(pagesPath, 'utf8') || '{}');
    } catch (e) {
      return {};
    }
  }

  function writePagesStore(pages) {
    fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2), 'utf8');
  }

  function readSite() {
    try {
      const data = JSON.parse(fs.readFileSync(sitePath, 'utf8') || '{}');
      const site = Object.assign({}, DEFAULT_SITE, data, {
        nav: buildPrimaryNav(),
        footerGroups: data.footerGroups || DEFAULT_SITE.footerGroups
      });
      return site;
    } catch (e) {
      return Object.assign({}, DEFAULT_SITE, {
        nav: buildPrimaryNav()
      });
    }
  }

  function writeSite(site) {
    fs.writeFileSync(sitePath, JSON.stringify(site, null, 2), 'utf8');
  }

  function extractPageFromHtml(filePath) {
    const html = fs.readFileSync(filePath, 'utf8');
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const metaDesc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    const ogTitle = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i);
    const ogDesc = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i);
    const ogType = html.match(/<meta\s+property="og:type"\s+content="([^"]*)"/i);
    const dataPage = html.match(/<body[^>]*\sdata-page="([^"]*)"/i);

    const headerMarker = '<div id="site-header"></div>';
    const footerMarker = '<div id="site-footer"></div>';
    const hi = html.indexOf(headerMarker);
    const fi = html.indexOf(footerMarker);
    let body = '';
    if (hi >= 0 && fi > hi) {
      body = html.slice(hi + headerMarker.length, fi).trim();
    }

    let headExtra = '';
    const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
    if (headMatch) {
      headExtra = sanitizeHeadExtra(headMatch[1]);
    }

    let scripts = '';
    const layoutRe = /<script\s+src="(?:\/)?js\/layout\.js(?:\?v=[^"]*)?"><\/script>/i;
    const layoutMatch = html.match(layoutRe);
    if (layoutMatch) {
      const afterLayout = html.slice(html.indexOf(layoutMatch[0]) + layoutMatch[0].length);
      const bodyEnd = afterLayout.indexOf('</body>');
      if (bodyEnd > 0) scripts = afterLayout.slice(0, bodyEnd).trim();
    }

    return {
      title: titleMatch ? titleMatch[1].trim() : '',
      metaDescription: metaDesc ? metaDesc[1] : '',
      ogTitle: ogTitle ? ogTitle[1] : '',
      ogDescription: ogDesc ? ogDesc[1] : '',
      ogType: ogType ? ogType[1] : 'website',
      dataPage: dataPage ? dataPage[1] : 'page',
      headExtra,
      body,
      scripts
    };
  }

  function buildHtmlFromPageLocal(page) {
    return buildHtmlFromPage(page);
  }

  function writePageHtmlFile(page) {
    const html = buildHtmlFromPageLocal(page);
    const filePath = path.join(root, page.id);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, html, 'utf8');
  }

  function migratePagesIfNeeded() {
    const pages = fs.existsSync(pagesPath) ? readPagesStore() : {};
    let changed = !fs.existsSync(pagesPath);

    for (const entry of PAGE_REGISTRY) {
      const fp = path.join(root, entry.file);
      if (!fs.existsSync(fp)) continue;
      if (pages[entry.file]) continue;
      const extracted = extractPageFromHtml(fp);
      pages[entry.file] = Object.assign({
        id: entry.file,
        label: entry.label,
        updatedAt: new Date().toISOString()
      }, extracted);
      changed = true;
    }

    if (changed) writePagesStore(pages);
  }

  function migrateSiteIfNeeded() {
    if (fs.existsSync(sitePath)) return;
    writeSite(DEFAULT_SITE);
  }

  function listPagesMeta() {
    const pages = readPagesStore();
    return PAGE_REGISTRY
      .filter((entry) => pages[entry.file])
      .map((entry) => {
        const p = pages[entry.file];
        return {
          id: entry.file,
          label: entry.label,
          title: p.title,
          updatedAt: p.updatedAt
        };
      });
  }

  function getPage(id) {
    const pages = readPagesStore();
    return pages[id] || null;
  }

  function updatePage(id, payload) {
    if (!PAGE_REGISTRY.some((p) => p.file === id)) {
      return { error: 'page not found', status: 404 };
    }

    const pages = readPagesStore();
    const existing = pages[id];
    if (!existing) {
      return { error: 'page not found', status: 404 };
    }

    const updated = Object.assign({}, existing, {
      title: (payload.title != null ? String(payload.title) : existing.title).trim(),
      metaDescription: payload.metaDescription != null ? String(payload.metaDescription) : existing.metaDescription,
      ogTitle: payload.ogTitle != null ? String(payload.ogTitle) : existing.ogTitle,
      ogDescription: payload.ogDescription != null ? String(payload.ogDescription) : existing.ogDescription,
      ogType: payload.ogType != null ? String(payload.ogType) : existing.ogType,
      body: payload.body != null ? String(payload.body) : existing.body,
      scripts: payload.scripts != null ? String(payload.scripts) : existing.scripts,
      headExtra: payload.headExtra != null ? String(payload.headExtra) : existing.headExtra,
      updatedAt: new Date().toISOString()
    });

    pages[id] = updated;
    writePagesStore(pages);
    writePageHtmlFile(updated);
    return { ok: true, page: updated, status: 200 };
  }

  function isManagedPage(filename) {
    return PAGE_REGISTRY.some((p) => p.file === filename);
  }

  function renderManagedPage(filename, bodyTransform) {
    const page = getPage(filename);
    if (!page) return null;
    const rendered = Object.assign({}, page);
    if (bodyTransform) {
      rendered.body = bodyTransform(rendered.body || '');
    }
    return buildHtmlFromPage(rendered);
  }

  migratePagesIfNeeded();
  migrateSiteIfNeeded();

  return {
    PAGE_REGISTRY,
    readSite,
    writeSite,
    listPagesMeta,
    getPage,
    updatePage,
    isManagedPage,
    renderManagedPage,
    buildHtmlFromPage: buildHtmlFromPageLocal
  };
}

module.exports = { createContentStore, PAGE_REGISTRY, DEFAULT_SITE, buildHtmlFromPage };
