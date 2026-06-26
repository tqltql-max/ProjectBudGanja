// Layout.js - Dynamic header and footer injection

async function isServerAvailable() {
  try {
    const res = await fetch('/api/me', { credentials: 'include' });
    const type = res.headers.get('content-type') || '';
    if (!type.includes('application/json')) return false;
    await res.json();
    return res.status === 401 || res.status === 200;
  } catch (e) {
    return false;
  }
}

const DEFAULT_SITE = {
  siteName: 'Inspetor BudGanja',
  footerText: '© 2026 Inspetor BudGanja. Conteúdo educacional.',
  youtubeChannelUrl: 'https://www.youtube.com/@InspetorBudGanja',
  youtubeChannelLabel: 'Canal @InspetorBudGanja',
  nav: [
    { label: 'Inspeções', href: 'inspecoes.html' },
    { label: 'Pesquisas', href: 'pesquisas.html' },
    { label: 'Equipamentos', href: 'equipamentos.html' },
    { label: 'Calculadoras', href: 'calculadoras.html' },
    { label: 'Sobre', href: 'sobre.html' },
    { label: 'Contato', href: 'contato.html' }
  ]
};

function buildHeaderHTML(site, authLink) {
  const navLinks = (site.nav || DEFAULT_SITE.nav).map((item) =>
    '<li><a href="' + item.href + '">' + item.label + '</a></li>'
  ).join('\n                ');

  const authItem = authLink
    ? '\n                <li><a href="' + authLink.href + '" class="nav-auth-link">' + authLink.label + '</a></li>'
    : '';

  return `
    <a class="skip-link" href="#main-content">Ir para o conteúdo</a>
    <header>
        <div class="logo">
            <a href="index.html" class="logo-link">${site.siteName || DEFAULT_SITE.siteName}</a>
        </div>
        <button type="button" class="menu-toggle" aria-label="Abrir menu de navegação" aria-expanded="false">☰</button>
        <nav aria-label="Navegação principal">
            <ul>
                ${navLinks}${authItem}
            </ul>
        </nav>
    </header>
`;
}

function buildFooterHTML(site) {
  const config = site || DEFAULT_SITE;
  const ytUrl = config.youtubeChannelUrl || DEFAULT_SITE.youtubeChannelUrl;
  const ytLabel = config.youtubeChannelLabel || DEFAULT_SITE.youtubeChannelLabel;
  const youtubeLink = ytUrl
    ? '<p class="footer-social"><a href="' + ytUrl + '" class="footer-youtube" target="_blank" rel="noopener noreferrer">▶ ' + ytLabel + '</a></p>'
    : '';

  return `
    <footer>
        <p>${config.footerText || DEFAULT_SITE.footerText}</p>
        ${youtubeLink}
    </footer>
`;
}

async function fetchSiteConfig() {
  try {
    const res = await fetch('/api/site');
    if (res.ok) return await res.json();
  } catch (e) { /* fallback */ }
  return DEFAULT_SITE;
}

async function fetchAuthLink() {
  const serverOk = await isServerAvailable();
  if (!serverOk) return null;

  try {
    const res = await fetch('/api/me', { credentials: 'include' });
    if (res.ok) return { label: 'Admin', href: 'admin.html' };
  } catch (e) { /* not logged in */ }
  return { label: 'Login', href: 'login.html' };
}

function injectLayout(site, authLink) {
  const headerContainer = document.getElementById('site-header');
  const footerContainer = document.getElementById('site-footer');
  const headerHTML = buildHeaderHTML(site, authLink);
  const footerHTML = buildFooterHTML(site);

  if (headerContainer) {
    headerContainer.innerHTML = headerHTML;

    const menuToggle = headerContainer.querySelector('.menu-toggle');
    const navUl = headerContainer.querySelector('nav ul');

    if (menuToggle && navUl) {
      menuToggle.addEventListener('click', function () {
        const isActive = navUl.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive);
        menuToggle.textContent = isActive ? '✕' : '☰';
      });
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    headerContainer.querySelectorAll('nav ul li a').forEach((link) => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
  }

  if (footerContainer) {
    footerContainer.innerHTML = footerHTML;
  }
}

function showAdminEditBar() {
  if (document.body.dataset.page === 'admin' || document.body.dataset.page === 'login') return;

  const postSlug = document.body.dataset.postSlug;
  if (document.body.dataset.page !== 'pesquisa' || !postSlug) return;

  const bar = document.createElement('div');
  bar.className = 'admin-edit-bar';
  bar.innerHTML = '<a href="admin.html?slug=' + encodeURIComponent(postSlug) + '">✏️ Editar publicação</a>';
  document.body.appendChild(bar);
}

document.addEventListener('DOMContentLoaded', async function () {
  const [site, authLink] = await Promise.all([fetchSiteConfig(), fetchAuthLink()]);
  injectLayout(site, authLink);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if (authLink && authLink.href === 'admin.html') showAdminEditBar();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then((registration) => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch((error) => {
        console.log('Falha ao registrar Service Worker:', error);
      });
  }

  let deferredPrompt;
  const installButton = document.createElement('button');
  installButton.textContent = '\uD83D\uDCF2 Instalar App';
  installButton.className = 'install-prompt is-hidden';
  document.body.appendChild(installButton);

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installButton.classList.remove('is-hidden');
  });

  installButton.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') installButton.classList.add('is-hidden');
      deferredPrompt = null;
    }
  });

  window.addEventListener('appinstalled', () => {
    installButton.classList.add('is-hidden');
  });
});
