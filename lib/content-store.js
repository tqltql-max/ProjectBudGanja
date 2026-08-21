const fs = require('fs');
const path = require('path');
const { buildPrimaryNav } = require('./biblioteca-nav.js');
const { buildHtmlFromPage, sanitizeHeadExtra } = require('./page-html.js');
const { writeFileRetrySync } = require('./fs-write-retry.js');

const { CALCULADORAS } = require('./calculadoras-registry.js');

const PAGE_REGISTRY = [
  { file: 'index.html', label: 'Início' },
  { file: 'laboratorio/index.html', label: 'Mapa do laboratório' },
  { file: 'entrar.html', label: 'Entrar' },
  { file: 'perfil.html', label: 'Meu perfil' },
  { file: 'radio/index.html', label: 'Rádio' },
  { file: 'vida/index.html', label: 'Vida' },
  { file: 'inverno/index.html', label: 'Bom dia, Inverno' },
  { file: 'vida/diario/index.html', label: 'Diário da Sementinha' },
  { file: 'cultivo/index.html', label: 'Diário de Pesquisas' },
  { file: 'guia/cultivo-basico.html', label: 'Guia de Cultivo' },
  { file: 'guia/palavras.html', label: 'Guia de Palavras' },
  { file: 'videos/index.html', label: 'Últimos vídeos' },
  { file: 'jogos/index.html', label: 'Jogos' },
  { file: 'jogos/aleff/index.html', label: 'Jogos · Aleff' },
  { file: 'jogos/zangado/index.html', label: 'Jogos · Zangado' },
  { file: 'jogos/broto/index.html', label: 'Jogos · Broto' },
  { file: 'jogos/cadernos/index.html', label: 'Jogos · Cadernos' },
  { file: 'biblioteca/index.html', label: 'Biblioteca' },
  { file: 'biblioteca/inspecoes/index.html', label: 'Inspeções' },
  { file: 'biblioteca/unifesp/index.html', label: 'Curso UNIFESP' },
  { file: 'biblioteca/cadernos/index.html', label: 'Cadernos de Engenharia' },
  { file: 'biblioteca/unifesp/livro-xiv.html', label: 'Rascunhos das aulas XIV' },
  { file: 'info/sobre.html', label: 'Sobre' },
  { file: 'info/apresentacao-unifesp.html', label: 'Apresentação UNIFESP' },
  { file: 'info/contato.html', label: 'Contato' },
  { file: 'info/privacidade.html', label: 'Privacidade' },
  { file: 'sorteios/index.html', label: 'Sorteios' },
  { file: 'comunidade/index.html', label: 'Comunidade' },
  { file: 'comunidade-admin.html', label: 'Admin Comunidade' },
  { file: 'comunidade/index.html', label: 'Comunidade' },
  { file: 'comunidade-admin.html', label: 'Admin Comunidade' },
  { file: 'objetos/index.html', label: 'Objetos' },
  { file: 'equipamentos/index.html', label: 'Objetos' },
  { file: 'pesquisas-admin.html', label: 'Admin submissões de pesquisas' },
  { file: 'usuarios-admin.html', label: 'Admin utilizadores' },
  { file: 'biblioteca/pesquisas/index.html', label: 'Pesquisas' },
  { file: 'calculadoras/index.html', label: 'Ferramentas' },
  ...CALCULADORAS.map((c) => ({
    file: c.customPage ? 'calculadoras/' + c.slug + '.html' : 'calculadoras/' + c.slug + '.html',
    label: c.shortTitle || c.title
  })),
  { file: 'equipamentos/clonadora-6-estacas.html', label: 'Guia: Clonadora 6 estacas' },
  { file: 'equipamentos/clonadora-12-estacas.html', label: 'Guia: Clonadora 12 estacas' },
  { file: 'equipamentos/manual-clonadora.html', label: 'Manual: Clonadoras (redirecionamento)' },
  { file: 'equipamentos/manual-hidrocloradora.html', label: 'Manual: Clonadoras (redirecionamento)' },
  { file: 'admin-db.html', label: 'Admin Base de Dados' },
  { file: 'biblioteca/pesquisas/substratos.html', label: 'Pesquisa: Substratos' }
];

const DEFAULT_SITE = {
  siteName: 'Inspetor BudGanja',
  siteTagline: 'Laboratório de fitoterapia brasileira',
  footerText: '© 2026 Inspetor BudGanja. Conteúdo educacional sobre plantas medicinais do Brasil.',
  privacyUpdated: '1 de agosto de 2026',
  gaMeasurementId: 'G-Q47PEYEXX6',
  ogImage: '/imagens/og-default.jpg',
  contactEmail: 'tql.tql@gmail.com',
  youtubeChannelUrl: '/videos/',
  youtubeChannelLabel: 'Canal @InspetorBudGanja',
  spotifyPodcastUrl: 'https://open.spotify.com/show/033yuLDWnN84xOcfHyJ1FZ',
  spotifyPodcastLabel: 'Podcast Inspetor BudGanja',
  nav: buildPrimaryNav(),
  footerLinks: [
    { label: 'Início', href: '/inverno/' },
    { label: 'Laboratório', href: '/laboratorio/' },
    { label: 'Plantas', href: '/plantas/' },
    { label: 'Animais', href: '/animais/' },
    { label: 'Curso UNIFESP', href: '/biblioteca/unifesp/' },
    { label: 'Cadernos de Engenharia', href: '/biblioteca/cadernos/' },
    { label: 'Pesquisas', href: '/biblioteca/pesquisas/' },
    { label: 'Inspeções', href: '/biblioteca/inspecoes/' },
    { label: 'Vídeos', href: '/videos/' },
    { label: 'Objetos', href: '/objetos/' },
    { label: 'Ferramentas', href: '/calculadoras/' },
    { label: 'Comunidade', href: '/comunidade/' },
    { label: 'BudGanja Radio', href: '/radio/' },
    { label: 'Sorteios', href: '/sorteios/' }
  ],
  footerGroups: [
    {
      title: 'Biblioteca',
      links: [
        { label: 'Plantas', href: '/plantas/' },
        { label: 'Animais', href: '/animais/' },
        { label: 'Curso UNIFESP', href: '/biblioteca/unifesp/' },
        { label: 'Cadernos de Engenharia', href: '/biblioteca/cadernos/' },
        { label: 'Inspeções', href: '/biblioteca/inspecoes/' },
        { label: 'Pesquisas', href: '/biblioteca/pesquisas/' },
        { label: 'Guia de Palavras', href: '/guia/palavras.html' },
        { label: 'Vídeos', href: '/videos/' },
        { label: 'Objetos', href: '/objetos/' }
      ]
    },
    {
      title: 'Ferramentas',
      links: [
        { label: 'Ferramentas', href: '/calculadoras/' },
        { label: 'Luxímetro', href: '/calculadoras/luximetro.html' },
        { label: 'Solo', href: '/calculadoras/super-solo.html' }
      ]
    },
    {
      title: 'Comunidade',
      links: [
        { label: 'Feed Vivo', href: '/comunidade/' },
        { label: 'BudGanja Radio', href: '/radio/' },
        { label: 'Sorteios', href: '/sorteios/' }
      ]
    },
    {
      title: 'Sobre nós',
      links: [
        { label: 'Mapa do laboratório', href: '/laboratorio/' },
        { label: 'Sobre o projeto', href: '/info/sobre.html' },
        { label: 'Contato', href: '/info/contato.html' },
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
    writeFileRetrySync(pagesPath, JSON.stringify(pages, null, 2), 'utf8');
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
    writeFileRetrySync(sitePath, JSON.stringify(site, null, 2), 'utf8');
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
    writeFileRetrySync(filePath, html, 'utf8');
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
