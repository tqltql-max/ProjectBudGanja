// Layout.js - Dynamic header and footer injection

const ASSET_V = '217';

let deferredInstallPrompt = null;
let installFloatingBtn = null;
const PWA_INSTALL_STATE_KEY = 'budganja_pwa_install_state';

function isStandaloneApp() {
  return window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone === true;
}

function isIosInstallable() {
  if (isStandaloneApp()) return false;
  const ua = navigator.userAgent || '';
  const ios = /iPad|iPhone|iPod/.test(ua)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  return ios;
}

function isMobileUa() {
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || '');
}

/** Chrome / Edge / Opera no desktop — candidatos a instalar PWA. */
function isDesktopInstallCandidate() {
  if (isStandaloneApp() || isIosInstallable() || isMobileUa()) return false;
  if (!window.isSecureContext || !('serviceWorker' in navigator)) return false;
  const ua = navigator.userAgent || '';
  return /Chrome|Chromium|Edg|OPR/i.test(ua) && !/SamsungBrowser/i.test(ua);
}

function isInstallDismissedRecently() {
  try {
    const raw = localStorage.getItem(PWA_INSTALL_STATE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (data.dismissedUntil && Date.now() < data.dismissedUntil) return true;
    localStorage.removeItem(PWA_INSTALL_STATE_KEY);
  } catch (e) { /* ignore */ }
  return false;
}

function rememberInstallDismissed() {
  try {
    localStorage.setItem(PWA_INSTALL_STATE_KEY, JSON.stringify({
      dismissedUntil: Date.now() + 7 * 24 * 60 * 60 * 1000
    }));
  } catch (e) { /* ignore */ }
}

function canShowInstallUi() {
  if (isStandaloneApp()) return false;
  if (isInstallDismissedRecently()) return false;
  if (deferredInstallPrompt) return true;
  if (isIosInstallable()) return true;
  return false;
}

function showInstallButtons() {
  refreshInstallVisibility();
}

function hideInstallButtons() {
  if (installFloatingBtn) installFloatingBtn.classList.add('is-hidden');
}

function dismissInstallUi() {
  rememberInstallDismissed();
  deferredInstallPrompt = null;
  hideInstallButtons();
}

function refreshInstallVisibility() {
  if (!installFloatingBtn) return;
  if (canShowInstallUi()) {
    installFloatingBtn.classList.remove('is-hidden');
  } else {
    installFloatingBtn.classList.add('is-hidden');
  }
}

function showIosInstallSheet() {
  let sheet = document.getElementById('pwa-ios-install-sheet');
  if (!sheet) {
    sheet = document.createElement('div');
    sheet.id = 'pwa-ios-install-sheet';
    sheet.className = 'pwa-install-sheet';
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-modal', 'true');
    sheet.setAttribute('aria-labelledby', 'pwa-ios-install-title');
    sheet.innerHTML =
      '<div class="pwa-install-sheet-backdrop" data-close="1"></div>' +
      '<div class="pwa-install-sheet-panel">' +
      '<h2 id="pwa-ios-install-title">Instalar BudGanja</h2>' +
      '<p>No iPhone ou iPad: toque em <strong>Compartilhar</strong> ' +
      '<span class="pwa-ios-share-icon" aria-hidden="true">⎋</span> ' +
      'e depois em <strong>Adicionar à Tela de Início</strong>.</p>' +
      '<button type="button" class="botao pwa-install-sheet-close">Entendi</button>' +
      '</div>';
    sheet.querySelector('[data-close]').addEventListener('click', () => { sheet.hidden = true; });
    sheet.querySelector('.pwa-install-sheet-close').addEventListener('click', () => { sheet.hidden = true; });
    document.body.appendChild(sheet);
  }
  sheet.hidden = false;
}

function showDesktopInstallSheet() {
  let sheet = document.getElementById('pwa-desktop-install-sheet');
  if (!sheet) {
    sheet = document.createElement('div');
    sheet.id = 'pwa-desktop-install-sheet';
    sheet.className = 'pwa-install-sheet';
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-modal', 'true');
    sheet.setAttribute('aria-labelledby', 'pwa-desktop-install-title');
    sheet.innerHTML =
      '<div class="pwa-install-sheet-backdrop" data-close="1"></div>' +
      '<div class="pwa-install-sheet-panel">' +
      '<h2 id="pwa-desktop-install-title">Instalar BudGanja no computador</h2>' +
      '<p>No Chrome ou Edge: menu <strong>⋮ → Instalar Inspetor BudGanja…</strong> ' +
      '(ou o ícone ⊕ / computador na barra de endereço).</p>' +
      '<p>Na janela de instalação, marque <strong>Criar atalho na área de trabalho</strong> ' +
      '(ou “Create desktop shortcut”) para aparecer o ícone no ambiente de trabalho.</p>' +
      '<button type="button" class="botao pwa-install-sheet-close">Entendi</button>' +
      '</div>';
    const closeSheet = () => {
      sheet.hidden = true;
      dismissInstallUi();
    };
    sheet.querySelector('[data-close]').addEventListener('click', closeSheet);
    sheet.querySelector('.pwa-install-sheet-close').addEventListener('click', closeSheet);
    document.body.appendChild(sheet);
  }
  sheet.hidden = false;
}

function waitForInstallPrompt(timeoutMs) {
  if (deferredInstallPrompt) return Promise.resolve(deferredInstallPrompt);
  return new Promise((resolve) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      window.removeEventListener('beforeinstallprompt', onPrompt);
      resolve(null);
    }, timeoutMs);
    function onPrompt(e) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      e.preventDefault();
      deferredInstallPrompt = e;
      resolve(e);
    }
    window.addEventListener('beforeinstallprompt', onPrompt);
  });
}

async function runNativeInstallPrompt() {
  if (!deferredInstallPrompt) return false;
  try {
    await deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    if (choice.outcome === 'accepted') {
      hideInstallButtons();
      try { localStorage.removeItem(PWA_INSTALL_STATE_KEY); } catch (err) { /* ignore */ }
      return true;
    }
    // Fechou / cancelou → esconder o botão por uns dias
    dismissInstallUi();
    return false;
  } catch (e) {
    dismissInstallUi();
    return false;
  }
}

async function promptInstallApp() {
  const mainBtn = installFloatingBtn && installFloatingBtn.querySelector('.install-prompt-main');
  const labelEl = installFloatingBtn && installFloatingBtn.querySelector('.install-prompt-label');
  if (mainBtn) {
    mainBtn.disabled = true;
    mainBtn.setAttribute('aria-busy', 'true');
  }
  if (labelEl) labelEl.textContent = 'A preparar instalação…';

  try {
    // Preferir o diálogo nativo (cria app + opção de atalho no ambiente de trabalho).
    if (!deferredInstallPrompt && isDesktopInstallCandidate()) {
      await waitForInstallPrompt(4000);
    }

    if (deferredInstallPrompt) {
      return await runNativeInstallPrompt();
    }

    if (isIosInstallable()) {
      showIosInstallSheet();
      return false;
    }

    if (isDesktopInstallCandidate()) {
      showDesktopInstallSheet();
    }
    return false;
  } finally {
    if (mainBtn) {
      mainBtn.disabled = false;
      mainBtn.removeAttribute('aria-busy');
    }
    if (labelEl) labelEl.textContent = 'Instalar app';
  }
}

async function tryAutoInstallPrompt() {
  // Auto-prompt só no telemóvel — no desktop consome o evento e esconde o botão.
  if (isStandaloneApp() || isInstallDismissedRecently() || !deferredInstallPrompt) return;
  if (!isMobileUa()) return;
  try {
    if (sessionStorage.getItem('budganja_pwa_auto_prompt') === '1') return;
    sessionStorage.setItem('budganja_pwa_auto_prompt', '1');
  } catch (e) { /* ignore */ }
  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (deferredInstallPrompt) await promptInstallApp();
}

function initInstallUi() {
  if (!installFloatingBtn) {
    const wrap = document.createElement('div');
    wrap.className = 'install-prompt is-hidden';
    wrap.innerHTML =
      '<button type="button" class="install-prompt-main" aria-label="Instalar aplicativo BudGanja">' +
      '<span aria-hidden="true">\uD83D\uDCF2</span> ' +
      '<span class="install-prompt-label">Instalar app</span>' +
      '</button>' +
      '<button type="button" class="install-prompt-dismiss" aria-label="Fechar" title="Fechar">×</button>';
    wrap.querySelector('.install-prompt-main').addEventListener('click', () => { void promptInstallApp(); });
    wrap.querySelector('.install-prompt-dismiss').addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dismissInstallUi();
    });
    document.body.appendChild(wrap);
    installFloatingBtn = wrap;
  }

  refreshInstallVisibility();
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  showInstallButtons();
  void tryAutoInstallPrompt();
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  hideInstallButtons();
  try { localStorage.removeItem(PWA_INSTALL_STATE_KEY); } catch (err) { /* ignore */ }
});

const APP_VERSION_KEY = 'budganja_app_version';
const APP_UPDATE_DISMISS_KEY = 'budganja_update_prompt_dismissed';
let appUpdateReloading = false;
let swRegistration = null;
let updateCheckInFlight = false;
let lastUpdateCheckAt = 0;
const UPDATE_CHECK_MIN_MS = 5000;
let appUpdatePromptEl = null;
let appUpdatePromptVersion = null;

async function fetchServerAppVersion() {
  try {
    const res = await fetch('/version.json?_=' + Date.now(), { cache: 'no-store', credentials: 'same-origin' });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.version != null ? String(data.version) : null;
  } catch (e) {
    return null;
  }
}

async function clearAllAppCaches() {
  if (!('caches' in window)) return;
  const keys = await caches.keys();
  await Promise.all(keys.map((key) => caches.delete(key)));
}

async function getCachedAppVersion() {
  if (!('caches' in window)) return null;
  const keys = await caches.keys();
  const match = keys.find((key) => key.indexOf('budganja-v') === 0);
  return match ? match.replace('budganja-v', '') : null;
}

async function unregisterLegacyServiceWorkers() {
  if (!('serviceWorker' in navigator)) return;
  const regs = await navigator.serviceWorker.getRegistrations();
  const expected = '/sw.js?v=' + ASSET_V;
  await Promise.all(regs.map((reg) => {
    const scriptUrl = (reg.active && reg.active.scriptURL)
      || (reg.waiting && reg.waiting.scriptURL)
      || (reg.installing && reg.installing.scriptURL)
      || '';
    if (!scriptUrl.includes('/sw.js')) return Promise.resolve(false);
    if (scriptUrl.indexOf(expected) !== -1) return Promise.resolve(false);
    return reg.unregister();
  }));
}

async function unregisterAllServiceWorkers() {
  if (!('serviceWorker' in navigator)) return;
  const regs = await navigator.serviceWorker.getRegistrations();
  await Promise.all(regs.map((reg) => reg.unregister()));
}

function reloadForAppUpdate() {
  if (appUpdateReloading) return;
  appUpdateReloading = true;
  window.location.reload();
}

async function purgeAndReloadForVersion(serverVersion) {
  const guardKey = 'budganja_purge_attempts_' + serverVersion;
  let attempts = 0;
  try {
    attempts = parseInt(sessionStorage.getItem(guardKey) || '0', 10);
  } catch (e) { /* ignore */ }
  if (attempts >= 3) return;
  try {
    sessionStorage.setItem(guardKey, String(attempts + 1));
    localStorage.setItem(APP_VERSION_KEY, serverVersion);
  } catch (e) { /* ignore */ }

  await unregisterAllServiceWorkers();
  await clearAllAppCaches();

  const url = new URL(window.location.href);
  url.searchParams.set('_budv', serverVersion);
  url.hash = '';
  appUpdateReloading = true;
  window.location.replace(url.toString());
}

function wasUpdatePromptDismissed(version) {
  try {
    return localStorage.getItem(APP_UPDATE_DISMISS_KEY) === String(version);
  } catch (e) {
    return false;
  }
}

function rememberUpdatePromptDismissed(version) {
  try {
    localStorage.setItem(APP_UPDATE_DISMISS_KEY, String(version));
  } catch (e) { /* ignore */ }
}

function clearUpdatePromptDismissed() {
  try {
    localStorage.removeItem(APP_UPDATE_DISMISS_KEY);
  } catch (e) { /* ignore */ }
}

function hideUpdatePrompt() {
  if (!appUpdatePromptEl) return;
  appUpdatePromptEl.style.display = 'none';
}

function showUpdatePrompt(serverVersion) {
  if (!serverVersion || wasUpdatePromptDismissed(serverVersion)) return;
  appUpdatePromptVersion = String(serverVersion);

  if (!appUpdatePromptEl) {
    appUpdatePromptEl = document.getElementById('budganja-update-prompt');
    if (appUpdatePromptEl) {
      appUpdatePromptEl.style.display = 'block';
      return;
    }
    appUpdatePromptEl = document.createElement('div');
    appUpdatePromptEl.id = 'budganja-update-prompt';
    appUpdatePromptEl.className = 'cultivo-app-update-banner';
    appUpdatePromptEl.setAttribute('role', 'status');
    appUpdatePromptEl.setAttribute('aria-live', 'polite');
    appUpdatePromptEl.style.position = 'fixed';
    appUpdatePromptEl.style.left = '12px';
    appUpdatePromptEl.style.right = '12px';
    appUpdatePromptEl.style.bottom = '12px';
    appUpdatePromptEl.style.zIndex = '9999';
    appUpdatePromptEl.style.background = 'rgba(20,26,22,0.96)';
    appUpdatePromptEl.style.color = '#f2fff6';
    appUpdatePromptEl.style.border = '1px solid rgba(67,199,122,0.45)';
    appUpdatePromptEl.style.borderRadius = '12px';
    appUpdatePromptEl.style.padding = '12px';
    appUpdatePromptEl.style.boxShadow = '0 8px 28px rgba(0,0,0,0.35)';
    appUpdatePromptEl.innerHTML =
      '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;justify-content:space-between">' +
      '<strong style="font-size:14px">Nova versão disponível</strong>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
      '<button type="button" data-update-now="1" style="border:0;border-radius:10px;padding:8px 12px;background:#2ecc71;color:#0e2216;font-weight:700;cursor:pointer">Atualizar agora</button>' +
      '<button type="button" data-update-later="1" style="border:1px solid rgba(255,255,255,0.22);border-radius:10px;padding:8px 12px;background:transparent;color:#eaf7ee;cursor:pointer">Depois</button>' +
      '</div>' +
      '</div>';

    appUpdatePromptEl.addEventListener('click', async (event) => {
      const nowBtn = event.target && event.target.closest ? event.target.closest('[data-update-now]') : null;
      if (nowBtn) {
        clearUpdatePromptDismissed();
        await purgeAndReloadForVersion(appUpdatePromptVersion);
        return;
      }
      const laterBtn = event.target && event.target.closest ? event.target.closest('[data-update-later]') : null;
      if (laterBtn) {
        rememberUpdatePromptDismissed(appUpdatePromptVersion);
        hideUpdatePrompt();
      }
    });

    document.body.appendChild(appUpdatePromptEl);
  }

  appUpdatePromptEl.style.display = 'block';
}

async function checkAppVersionMismatch() {
  const serverVersion = await fetchServerAppVersion();
  if (!serverVersion) return false;

  let storedVersion = null;
  try { storedVersion = localStorage.getItem(APP_VERSION_KEY); } catch (e) { /* ignore */ }

  const cacheVersion = await getCachedAppVersion();

  if (!storedVersion) {
    if ((cacheVersion && cacheVersion !== serverVersion) || ASSET_V !== serverVersion) {
      showUpdatePrompt(serverVersion);
      return false;
    }
    clearUpdatePromptDismissed();
    hideUpdatePrompt();
    try { localStorage.setItem(APP_VERSION_KEY, serverVersion); } catch (e) { /* ignore */ }
    return false;
  }

  if (storedVersion !== serverVersion
      || (cacheVersion && cacheVersion !== serverVersion)
      || ASSET_V !== serverVersion) {
    showUpdatePrompt(serverVersion);
    return false;
  }
  clearUpdatePromptDismissed();
  hideUpdatePrompt();
  return false;
}

async function refreshUpdateChecks(options) {
  const force = !!(options && options.force);
  const now = Date.now();
  if (!force && now - lastUpdateCheckAt < UPDATE_CHECK_MIN_MS) return;
  if (updateCheckInFlight) return;
  updateCheckInFlight = true;
  lastUpdateCheckAt = now;
  try {
    if (await checkAppVersionMismatch()) return;
    if (swRegistration) {
      try { await swRegistration.update(); } catch (e) { /* ignore */ }
    }
  } finally {
    updateCheckInFlight = false;
  }
}

function bindAppUpdateTriggers() {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') refreshUpdateChecks({ force: true });
  });
  window.addEventListener('pageshow', () => {
    refreshUpdateChecks({ force: true });
  });
  window.addEventListener('focus', () => {
    refreshUpdateChecks({ force: true });
  });
  window.addEventListener('online', () => {
    refreshUpdateChecks({ force: true });
  });

  const onActivity = () => refreshUpdateChecks();
  document.addEventListener('pointerdown', onActivity, { passive: true });
  document.addEventListener('keydown', onActivity, { passive: true });

  window.setInterval(() => {
    if (document.visibilityState === 'visible') refreshUpdateChecks();
  }, 15000);
}

async function initAppUpdates() {
  await unregisterLegacyServiceWorkers();

  if (await checkAppVersionMismatch()) return;

  if ('serviceWorker' in navigator) {
    try {
      swRegistration = await navigator.serviceWorker.register('/sw.js?v=' + ASSET_V, { updateViaCache: 'none' });
    } catch (e) {
      swRegistration = null;
    }

    if (swRegistration) {
      swRegistration.addEventListener('updatefound', () => {
        const newWorker = swRegistration.installing;
        if (!newWorker) return;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            newWorker.postMessage({ type: 'SKIP_WAITING' });
            }
        });
    });

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        reloadForAppUpdate();
      });
    }
  }

  const serverVersion = await fetchServerAppVersion();
  if (serverVersion) {
    try { localStorage.setItem(APP_VERSION_KEY, serverVersion); } catch (e) { /* ignore */ }
  }

  bindAppUpdateTriggers();
  refreshUpdateChecks({ force: true });
}

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
  siteTagline: 'Laboratório de cultivo',
  footerText: '© 2026 Inspetor BudGanja. Conteúdo educacional.',
  privacyUpdated: '26 de junho de 2026',
  ogImage: '/imagens/background-hero.svg',
  contactEmail: 'inspetorbudganja@gmail.com',
  youtubeChannelUrl: 'https://www.youtube.com/@InspetorBudGanja',
  youtubeChannelLabel: 'Canal @InspetorBudGanja',
  spotifyPodcastUrl: 'https://open.spotify.com/show/033yuLDWnN84xOcfHyJ1FZ',
  spotifyPodcastLabel: 'Podcast Inspetor BudGanja',
  nav: [
    {
      label: 'Biblioteca',
      mega: true,
      megaCompact: true,
      megaAccordion: true,
      megaHeader: 'Biblioteca',
      megaHeaderHref: '/biblioteca/pesquisas/',
      groups: [{ title: '', items: [] }]
    },
    {
      label: 'Ferramentas',
      mega: true,
      megaCompact: true,
      megaAccordion: true,
      megaHeader: 'Ferramentas',
      megaHeaderHref: '/calculadoras/',
      groups: [{ title: '', items: [] }]
    },
    {
      label: 'Loja',
      href: '/loja/',
      navCta: true
    }
  ],
  footerLinks: [
    { label: 'Início', href: '/' },
    { label: 'Guia de Cultivo', href: '/biblioteca/inspecoes/' },
    { label: 'Últimos vídeos', href: '/videos/' },
    { label: 'Pesquisas', href: '/biblioteca/pesquisas/' },
    { label: 'Inspeções', href: '/biblioteca/inspecoes/' },
    { label: 'Equipamentos', href: '/equipamentos/' },
    { label: 'Ferramentas', href: '/calculadoras/' },
    { label: 'Luxímetro', href: '/calculadoras/luximetro.html' }
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
        { label: 'Ferramentas', href: '/calculadoras/' },
        { label: 'Equipamentos', href: '/equipamentos/' },
        { label: 'Luxímetro', href: '/calculadoras/luximetro.html' }
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

function i18n(key, fallback) {
  return window.BudGanjaI18n ? window.BudGanjaI18n.t(key, fallback) : (fallback || '');
}

function translateFooterLabel(label) {
  var map = {
    'Início': 'common.home',
    'Guia de Cultivo': 'nav.growingGuide',
    'Pesquisas': 'nav.research',
    'Inspeções': 'nav.inspections',
    'Equipamentos': 'nav.equipment',
    'Calculadoras': 'nav.calculators',
    'Ferramentas': 'nav.calculators',
    'Luxímetro': 'nav.luxMeter',
    'Últimos vídeos': 'nav.videos',
    'Vídeos': 'nav.videos',
    'Sorteios': 'nav.giveaways',
    'Sobre o projeto': 'nav.aboutProject',
    'Contato': 'nav.contact',
    'Privacidade': 'nav.privacy',
    'Loja parceira': 'nav.shop'
  };
  return map[label] ? i18n(map[label], label) : label;
}

function translateFooterGroupTitle(title) {
  if (title === 'Biblioteca') return i18n('footer.groupLibrary', title);
  if (title === 'Ferramentas') return i18n('footer.groupTools', title);
  if (title === 'Sobre nós') return i18n('footer.groupAbout', title);
  return title;
}

function buildLangSwitcherHTML() {
  if (!window.BudGanjaI18n) return '';
  var html =
    '<div class="lang-switcher">' +
    '<button type="button" class="header-icon-btn lang-switcher-btn" aria-haspopup="listbox" aria-expanded="false">PT</button>' +
    '<ul class="lang-switcher-menu" role="listbox" hidden>';
  window.BudGanjaI18n.SUPPORTED.forEach(function (code) {
    var meta = window.BudGanjaI18n.getLocaleMeta(code);
    html +=
      '<li role="presentation"><button type="button" class="lang-switcher-option" data-lang="' + escapeNavText(code) + '" role="option">' +
      escapeNavText(meta.name || code) +
      '</button></li>';
  });
  html += '</ul></div>';
  return html;
}

const OG_SITE_NAME = 'Inspetor BudGanja';

function escapeNavText(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function safeHref(value) {
  const href = String(value || '').trim();
  return href && href !== 'undefined' && href !== 'null' ? href : '';
}

function normalizeNavPath(href) {
  const raw = safeHref(href);
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) {
    try {
      return new URL(raw).pathname.replace(/\/$/, '') || '/';
    } catch (e) {
      return raw;
    }
  }
  let path = raw.split(/[?#]/)[0];
  if (!path.startsWith('/')) path = '/' + path;
  if (path.endsWith('/index.html')) {
    path = path.slice(0, -'/index.html'.length) || '/';
  }
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  return path;
}

function isNavLinkActive(href) {
  const target = normalizeNavPath(href);
  if (!target) return false;
  let current = normalizeNavPath(window.location.pathname);
  if (target === current) return true;
  if (target.endsWith('/') && current === target.slice(0, -1)) return true;
  if (!target.endsWith('/') && current === target + '/') return true;
  return false;
}

function markActiveNavLinks(root) {
  if (!root) return;
  root.querySelectorAll('a[href]').forEach(function (link) {
    const href = link.getAttribute('href');
    if (!isNavLinkActive(href)) return;
    link.classList.add('active', 'is-active');
    const dropdown = link.closest('.nav-dropdown');
    if (dropdown) {
      dropdown.classList.add('is-active');
      const toggle = dropdown.querySelector('.nav-dropdown-toggle');
      if (toggle) toggle.classList.add('active');
    }
  });
}

function markQuickNavActive(root) {
  if (!root) return;
  const current = normalizeNavPath(window.location.pathname);
  root.querySelectorAll('.header-quick-link').forEach(function (link) {
    const href = link.getAttribute('href');
    const prefixes = String(link.getAttribute('data-active-prefixes') || '')
      .split(',')
      .map(function (p) { return normalizeNavPath(p.trim()); })
      .filter(Boolean);
    const prefixMatch = prefixes.some(function (prefix) {
      return current === prefix || current.startsWith(prefix + '/');
    });
    const active = isNavLinkActive(href) || prefixMatch;
    link.classList.toggle('is-active', active);
  });
}

function initAccordionToggles(root, toggleSelector, wrapSelector) {
  if (!root) return;
  root.addEventListener('click', function (e) {
    const toggle = e.target.closest(toggleSelector);
    if (!toggle || !root.contains(toggle)) return;
        e.preventDefault();
    e.stopPropagation();
    const wrap = toggle.closest(wrapSelector);
    if (!wrap) return;
    const willOpen = !wrap.classList.contains('open');
    root.querySelectorAll(wrapSelector + '.open').forEach(function (other) {
      if (other === wrap) return;
      other.classList.remove('open');
      const otherBtn = other.querySelector(toggleSelector);
      if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
    });
    wrap.classList.toggle('open', willOpen);
    toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
  });
}

window.budganjaInitAccordion = initAccordionToggles;
window.budganjaIsNavLinkActive = isNavLinkActive;
window.buildAccordionListHTML = buildAccordionListHTML;

function navSlug(label) {
  return String(label || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function hoverTipMarkup(text) {
  const tip = String(text || '').trim();
  if (!tip) return { attrs: '', html: '' };
  const safe = escapeNavText(tip);
  return {
    attrs: ' data-tip="' + safe + '"',
    html: '<span class="app-tile-tip" role="tooltip">' + safe + '</span>'
  };
}

function enhanceHoverTips(root) {
  const scope = root || document;
  scope.querySelectorAll('[data-tip]:not([data-tip-done])').forEach(function (el) {
    const text = (el.getAttribute('data-tip') || '').trim();
    if (!text) return;
    el.classList.add('has-hover-tip');
    el.removeAttribute('title');
    if (!el.querySelector('.app-tile-tip')) {
      el.insertAdjacentHTML('beforeend', hoverTipMarkup(text).html);
    }
    el.setAttribute('data-tip-done', '1');
  });
}

window.budganjaEnhanceHoverTips = enhanceHoverTips;

function resolveNavTileSlug(child) {
  if (child.slug) return child.slug;
  const href = safeHref(child.href);
  if (href.includes('guia/cultivo')) return 'guia-cultivo';
  if (href.includes('/videos')) return 'videos';
  if (href.includes('pesquisas')) return 'pesquisas';
  if (href.includes('inspecoes')) return 'inspecoes';
  if (href.includes('clonadora-6')) return 'clonadora-6';
  if (href.includes('clonadora-12')) return 'clonadora-12';
  if (href.includes('manual-clonadora')) return 'manual-clonadora';
  if (href.includes('equipamentos')) return 'equipamentos';
  if (href.includes('sorteios')) return 'sorteios';
  if (href.includes('calculadoras')) return 'calculadoras';
  return navSlug(child.label);
}

function buildSubmenuTileHTML(child) {
  const href = safeHref(child.href);
  if (!href) return '';

  const slug = resolveNavTileSlug(child);
  const slugClass = slug ? ' nav-app-tile--' + slug : '';
  const featuredClass = child.featured ? ' nav-app-tile--featured' : '';
  const icon = child.icon ? escapeNavText(child.icon) : '🧮';
  const label = child.tileLabel || child.label || '';
  const tipText = child.description || child.desc || '';
  const tip = tipText ? escapeNavText(tipText) : '';

  return (
    '<li><a href="' + escapeNavText(href) + '" class="nav-app-tile' + slugClass + featuredClass + '">' +
    '<span class="nav-app-tile-icon-wrap" aria-hidden="true">' +
    '<span class="nav-app-tile-icon">' + icon + '</span>' +
    '</span>' +
    '<span class="nav-app-tile-label">' + escapeNavText(label) + '</span>' +
    (tip ? '<span class="app-tile-tip" role="tooltip">' + tip + '</span>' : '') +
    '</a></li>'
  );
}

function buildSubmenuLinkHTML(child) {
  const href = safeHref(child.href);
  if (!href) return '';

  const icon = child.icon
    ? '<span class="nav-item-icon" aria-hidden="true">' + escapeNavText(child.icon) + '</span>'
    : '';
  const desc = child.desc
    ? '<span class="nav-item-desc">' + escapeNavText(child.desc) + '</span>'
    : '';
  const featuredClass = child.featured ? ' nav-rich-link--featured' : '';
  const badge = child.featured ? '<span class="nav-item-badge">Destaque</span>' : '';
  const tipText = child.desc || child.description || '';
  const tip = hoverTipMarkup(tipText);

  if (icon || desc) {
    return (
      '<li' + (child.featured ? ' class="nav-mega-feature"' : '') + '>' +
      '<a href="' + escapeNavText(href) + '" class="nav-rich-link has-hover-tip' + featuredClass + '"' + tip.attrs + '>' +
      icon +
      '<span class="nav-item-copy">' +
      '<span class="nav-item-label-row">' +
      '<span class="nav-item-label">' + escapeNavText(child.label) + '</span>' +
      badge +
      '</span>' +
      desc +
      '</span>' +
      tip.html +
      '</a></li>'
    );
  }

  return '<li><a href="' + escapeNavText(href) + '">' + escapeNavText(child.label) + '</a></li>';
}

function buildMegaPanelHeaderHTML(item) {
  if (!item.megaHeader && !item.megaSubtitle) return '';
  const headerHref = safeHref(item.megaHeaderHref);
  let titleHtml = '';
  if (item.megaHeader) {
    if (headerHref) {
      titleHtml =
        '<a href="' + escapeNavText(headerHref) + '" class="nav-panel-title nav-panel-title-link">' +
        escapeNavText(item.megaHeader) +
        '</a>';
    } else {
      titleHtml = '<span class="nav-panel-title">' + escapeNavText(item.megaHeader) + '</span>';
    }
  }
  return (
    '<li class="nav-panel-header">' +
    titleHtml +
    (item.megaSubtitle ? '<span class="nav-panel-subtitle">' + escapeNavText(item.megaSubtitle) + '</span>' : '') +
    '</li>'
  );
}

function buildMegaGroupHeaderHTML(group) {
  if (!group || !group.title) return '';
  const icon = group.icon
    ? '<span class="nav-group-icon" aria-hidden="true">' + escapeNavText(group.icon) + '</span>'
    : '';
  return (
    '<li class="nav-mega-group" aria-hidden="true">' +
    icon +
    '<span class="nav-group-title">' + escapeNavText(group.title) + '</span>' +
    '</li>'
  );
}

function buildAccordionLinkHTML(child) {
  const href = safeHref(child.href);
  if (!href) return '';

  const slug = resolveNavTileSlug(child);
  const slugClass = slug ? ' nav-accordion-link--' + slug : '';
  const activeClass = isNavLinkActive(href) ? ' is-active' : '';
  const icon = child.icon ? escapeNavText(child.icon) : '•';
  const label = child.label || '';
  const external = /^https?:\/\//i.test(href);
  const externalAttrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';

  return (
    '<li class="nav-accordion-item">' +
    '<a href="' + escapeNavText(href) + '" class="nav-accordion-link' + slugClass + activeClass + '"' + externalAttrs + '>' +
    '<span class="nav-accordion-icon" aria-hidden="true">' + icon + '</span>' +
    '<span class="nav-accordion-label">' + escapeNavText(label) + '</span>' +
    '</a></li>'
  );
}

function buildNavTileSubmenuHTML(parent, accordion) {
  const icon = parent.icon ? escapeNavText(parent.icon) : '🌱';
  const label = parent.tileLabel || parent.label || 'Menu';
  const subTiles = (parent.children || [])
    .map(function (child) { return buildMegaPanelTileItemHTML(child, accordion); })
    .filter(Boolean)
    .join('');
  if (!subTiles) return '';

  const wrapClass = accordion ? ' nav-tile-submenu--accordion' : '';
  const toggleClass = accordion ? ' nav-tile-submenu-toggle--accordion' : '';
  const nestedClass = accordion ? ' nav-app-tiles--nested-accordion' : '';

  return (
    '<li class="nav-tile-submenu' + wrapClass + '">' +
    '<button type="button" class="nav-tile-submenu-toggle' + toggleClass + '" aria-expanded="false" aria-haspopup="true">' +
    '<span class="nav-app-tile-icon-wrap" aria-hidden="true">' +
    '<span class="nav-app-tile-icon">' + icon + '</span>' +
    '</span>' +
    '<span class="nav-tile-submenu-label">' + escapeNavText(label) + '</span>' +
    '<span class="nav-tile-submenu-chevron" aria-hidden="true">▾</span>' +
    '</button>' +
    '<ul class="nav-app-tiles nav-app-tiles--nested' + nestedClass + '">' + subTiles + '</ul>' +
    '</li>'
  );
}

function buildMegaPanelTileItemHTML(child, accordion) {
  if (child.submenu && child.children && child.children.length) {
    return buildNavTileSubmenuHTML(child, accordion);
  }
  if (accordion) {
    return buildAccordionLinkHTML(child);
  }
  return buildSubmenuTileHTML(child);
}

function buildAccordionListHTML(items) {
  if (!items || !items.length) return '';
  return (
    '<ul class="nav-accordion-list">' +
    items.map(function (child) { return buildMegaPanelTileItemHTML(child, true); }).filter(Boolean).join('') +
    '</ul>'
  );
}

function buildMegaPanelTilesHTML(items, accordion) {
  if (!items || !items.length) return '';
  if (accordion) {
    return '<li class="nav-accordion-wrap">' + buildAccordionListHTML(items) + '</li>';
  }
  return (
    '<li class="nav-app-tiles-wrap"><ul class="nav-app-tiles">' +
    items.map(function (child) { return buildMegaPanelTileItemHTML(child, false); }).filter(Boolean).join('') +
    '</ul></li>'
  );
}

function buildMegaPanelItemsHTML(item) {
  const accordion = !!item.megaAccordion;
  let html = '';
  if (item.featured && !item.megaCompact) {
    html += buildSubmenuLinkHTML(item.featured);
  }
  if (item.groups && item.groups.length) {
    item.groups.forEach(function (group) {
      if (!accordion && group.title) {
        html += buildMegaGroupHeaderHTML(group);
      }
      if (item.megaCompact) {
        html += buildMegaPanelTilesHTML(group.items, accordion);
      } else {
        html += (group.items || []).map(buildSubmenuLinkHTML).filter(Boolean).join('');
      }
    });
  } else if (item.children && item.children.length) {
    if (item.megaCompact) {
      html += buildMegaPanelTilesHTML(item.children, accordion);
    } else {
      html += item.children.map(buildSubmenuLinkHTML).filter(Boolean).join('');
    }
  }
  return html;
}

function buildNavItemHTML(item) {
  const hasPanel = (item.children && item.children.length) || (item.groups && item.groups.length) || item.featured;
  if (hasPanel) {
    const subs = buildMegaPanelItemsHTML(item);
    const megaClass = item.mega ? ' nav-dropdown-mega' : '';
    const panelClass = item.mega ? 'nav-submenu nav-mega-panel' : 'nav-submenu';
    const compactClass = item.mega && !item.groups && !item.megaWide && !item.megaCompact && item.children && item.children.length <= 2
      ? ' nav-mega-panel--compact'
      : '';
    const wideClass = item.megaWide && !item.megaCompact ? ' nav-mega-panel--wide' : '';
    const toolsClass = item.megaCompact && !item.megaAccordion ? ' nav-mega-panel--tools' : '';
    const accordionClass = item.megaAccordion ? ' nav-mega-panel--accordion' : '';
    const panelHeader = item.mega ? buildMegaPanelHeaderHTML(item) : '';
    const navKey = navSlug(item.label);
    return (
      '<li class="nav-dropdown' + megaClass + '" data-nav="' + escapeNavText(navKey) + '">' +
      '<button type="button" class="nav-dropdown-toggle nav-pill" aria-expanded="false" aria-haspopup="true">' +
      escapeNavText(item.label) +
      ' <span class="nav-caret" aria-hidden="true"><svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>' +
      '<ul class="' + panelClass + compactClass + wideClass + toolsClass + accordionClass + '">' + panelHeader + subs + '</ul></li>'
    );
  }

  const href = safeHref(item.href);
  if (!href) return '';

  const ctaClass = item.navCta ? ' nav-pill--cta' : '';

  return (
    '<li><a href="' + escapeNavText(href) + '" class="nav-top-link nav-pill' + ctaClass + '">' +
    escapeNavText(item.label) +
    '</a></li>'
  );
}

function buildHeaderProfileLink(userLink, hideAuthNav) {
  if (!userLink || hideAuthNav) return '';
  const href = escapeNavText(userLink.href);
  const label = escapeNavText(userLink.label || 'Entrar');
  if (userLink.isUser) {
    const pic = userLink.picture || '/imagens/avatars/leaf.svg';
    const displayName = userLink.name || label;
    const shortName = String(displayName).trim().split(/\s+/)[0] || label;
    return (
      '<a href="' + href + '" class="header-profile-link" title="Diário de cultivo" aria-label="Diário de cultivo">' +
      '<img src="' + escapeNavText(pic) + '" alt="" class="header-profile-avatar" width="32" height="32" loading="lazy">' +
      '<span class="header-profile-name">' + escapeNavText(shortName) + '</span>' +
      '</a>'
    );
  }
  return '<a href="' + href + '" class="header-profile-link header-profile-link--guest">' + label + '</a>';
}

function buildHeaderAdminIcon(adminLink, hideAuthNav) {
  if (!adminLink || hideAuthNav) return '';
  return (
    '<a href="' + escapeNavText(adminLink.href) + '" class="header-icon-btn header-icon-btn--admin" title="Painel administrativo" aria-label="Painel admin">' +
    '<span class="header-action-icon" aria-hidden="true">⚙</span></a>'
  );
}

function buildDesktopQuickNavHTML() {
  const items = [
    {
      href: '/biblioteca/pesquisas/',
      icon: '🔬',
      label: i18n('nav.technicalResearch', 'Pesquisas técnicas'),
      tip: i18n('nav.quickResearchTip', 'Relatórios e estudos do laboratório'),
      prefixes: '/biblioteca/pesquisas'
    },
    {
      href: '/biblioteca/inspecoes/',
      icon: '📋',
      label: i18n('nav.inspections', 'Inspeções'),
      tip: i18n('nav.quickInspectionsTip', 'Registos de campo e checklists'),
      prefixes: '/biblioteca/inspecoes'
    },
    {
      href: '/equipamentos/',
      icon: '⚙️',
      label: i18n('nav.equipment', 'Equipamentos'),
      tip: i18n('nav.quickEquipmentTip', 'Clonadoras e guias de montagem'),
      prefixes: '/equipamentos'
    },
    {
      href: '/calculadoras/',
      icon: '🧮',
      label: i18n('nav.calculators', 'Calculadoras'),
      tip: i18n('nav.quickCalculatorsTip', 'VPD, pH, EC, luxímetro e mais'),
      prefixes: '/calculadoras'
    },
    {
      href: '/sorteios/',
      icon: '🎁',
      label: i18n('nav.giveaways', 'Sorteios'),
      tip: i18n('nav.quickGiveawaysTip', 'Promoções ativas do laboratório'),
      prefixes: '/sorteios',
      tone: 'sorteios'
    },
    {
      href: '/loja/',
      icon: '🛒',
      label: i18n('nav.partnerShops', 'Lojas parceiras'),
      tip: i18n('nav.quickShopTip', 'Materiais das clonadoras'),
      prefixes: '/loja',
      tone: 'loja'
    }
  ];
  const links = items.map(function (item) {
    const cls = 'header-quick-link' + (item.tone ? ' header-quick-link--' + item.tone : '');
    return (
      '<a href="' + escapeNavText(item.href) + '" class="' + cls + '"' +
      ' data-active-prefixes="' + escapeNavText(item.prefixes) + '"' +
      ' data-tip="' + escapeNavText(item.tip) + '">' +
      '<span class="header-quick-link-icon" aria-hidden="true">' + item.icon + '</span>' +
      '<span class="header-quick-link-label">' + escapeNavText(item.label) + '</span>' +
      '</a>'
    );
  }).join('');
  return (
    '<nav class="header-quick-nav" aria-label="' + escapeNavText(i18n('nav.quickNav', 'Atalhos do laboratório')) + '">' +
    '<div class="header-quick-track">' + links + '</div></nav>'
  );
}

function buildHeaderHTML(site, authState) {
  const config = site || DEFAULT_SITE;
  const navItems = config.nav || DEFAULT_SITE.nav;
  const navLinks = navItems.map(buildNavItemHTML).join('\n                ');
  const ytUrl = config.youtubeChannelUrl || DEFAULT_SITE.youtubeChannelUrl;
  const spotifyUrl = config.spotifyPodcastUrl || DEFAULT_SITE.spotifyPodcastUrl;
  const tagline = config.siteTagline || DEFAULT_SITE.siteTagline || '';

  const hideAuthNav = document.body.dataset.page === 'admin'
    || document.body.dataset.page === 'sorteios-admin'
    || document.body.dataset.page === 'login'
    || document.body.dataset.page === 'entrar';

  const userLink = authState && authState.userLink;
  const adminLink = authState && authState.adminLink;
  const profileLink = buildHeaderProfileLink(userLink, hideAuthNav);
  const adminIcon = buildHeaderAdminIcon(adminLink, hideAuthNav);

  const jardimUrl = '';
  const jardimLabel = '';

  const headerSearch =
    '<div id="site-search" class="site-search" hidden role="dialog" aria-label="' + escapeNavText(i18n('common.searchTitle', 'Buscar no site')) + '">' +
    '<div class="site-search-header">' +
    '<span class="site-search-title">' + escapeNavText(i18n('common.searchTitle', 'Buscar no site')) + '</span>' +
    '<kbd class="site-search-kbd" aria-hidden="true">Ctrl+K</kbd>' +
    '</div>' +
    '<form class="site-search-form" role="search" onsubmit="return false;">' +
    '<input type="search" id="site-search-input" class="site-search-input" placeholder="' + escapeNavText(i18n('common.searchPlaceholder', 'Páginas, guias e artigos…')) + '" autocomplete="off" aria-label="' + escapeNavText(i18n('common.searchTitle', 'Buscar no site')) + '">' +
    '<button type="button" class="site-search-close" aria-label="' + escapeNavText(i18n('common.searchClose', 'Fechar busca')) + '">×</button>' +
    '</form>' +
    '<ul id="site-search-results" class="site-search-results"></ul>' +
    '</div>';

  const headerToolbar =
    '<div class="header-toolbar">' +
    buildLangSwitcherHTML() +
    '<button type="button" class="header-icon-btn" id="theme-toggle" aria-label="' + escapeNavText(i18n('common.themeToggle', 'Alternar tema')) + '" title="' + escapeNavText(i18n('common.themeToggle', 'Alternar tema')) + '">' +
    '<span class="header-action-icon" aria-hidden="true">◐</span></button>' +
    '<button type="button" class="header-icon-btn" id="search-toggle" aria-expanded="false" aria-label="' + escapeNavText(i18n('common.searchOpen', 'Buscar no site')) + '" title="Buscar (Ctrl+K)">' +
    '<span class="header-action-icon" aria-hidden="true">⌕</span></button>' +
    (ytUrl
      ? '<a href="' + escapeNavText(ytUrl) + '" class="header-icon-btn header-icon-btn--link" target="_blank" rel="noopener noreferrer" aria-label="Canal YouTube @InspetorBudGanja" title="YouTube">' +
        '<span class="header-action-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-5.8 31 31 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg></span></a>'
      : '') +
    (spotifyUrl
      ? '<a href="' + escapeNavText(spotifyUrl) + '" class="header-icon-btn header-icon-btn--link" target="_blank" rel="noopener noreferrer" aria-label="Podcast Spotify Inspetor BudGanja" title="Podcast Spotify">' +
        '<span class="header-action-icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg></span></a>'
      : '') +
    adminIcon +
    headerSearch +
    '</div>';

  const headerProfileSlot = profileLink
    ? '<div class="header-profile-slot">' + profileLink + '</div>'
    : '';

  const mobileNavFooter =
    '<div class="mobile-nav-footer">' +
    (ytUrl ? '<a href="' + escapeNavText(ytUrl) + '" class="mobile-nav-cta" target="_blank" rel="noopener noreferrer">▶ ' + escapeNavText(config.youtubeChannelLabel || 'Canal YouTube') + '</a>' : '') +
    (spotifyUrl ? '<a href="' + escapeNavText(spotifyUrl) + '" class="mobile-nav-cta mobile-nav-cta--secondary" target="_blank" rel="noopener noreferrer">♪ ' + escapeNavText(config.spotifyPodcastLabel || 'Podcast Spotify') + '</a>' : '') +
    (jardimUrl ? '<a href="' + escapeNavText(jardimUrl) + '" class="mobile-nav-cta mobile-nav-cta--secondary" target="_blank" rel="noopener noreferrer">▶ ' + escapeNavText(jardimLabel) + '</a>' : '') +
    '</div>';

  return (
    '<a class="skip-link" href="#main-content">' + escapeNavText(i18n('common.skipLink', 'Ir para o conteúdo')) + '</a>' +
    '<div class="logo">' +
    '<a href="/" class="logo-link">' +
    '<span class="logo-mark" aria-hidden="true">' +
    '<img class="logo-mark-img" src="/imagens/app-icon.png?v=' + ASSET_V + '" alt="" width="42" height="42" decoding="async">' +

    '</span>' +
    '<span class="logo-copy">' +
    '<span class="logo-name">' + escapeNavText(config.siteName || DEFAULT_SITE.siteName) + '</span>' +
    (tagline ? '<span class="logo-tagline">' + escapeNavText(tagline) + '</span>' : '') +
    '</span></a></div>' +
    buildDesktopQuickNavHTML() +
    '<nav id="primary-nav" class="primary-nav" aria-label="' + escapeNavText(i18n('common.mobileNav', 'Navegação principal')) + '">' +
    '<ul>' + navLinks + '</ul>' +
    '</nav>' +
    '<div class="header-right">' +
    '<div class="header-utilities">' +
    headerToolbar +
    headerProfileSlot +
    '</div>' +
    '<button type="button" class="menu-toggle" aria-label="' + escapeNavText(i18n('common.menuOpen', 'Abrir menu')) + '" aria-expanded="false" aria-controls="mobile-menu">' +
    '<span class="menu-toggle-bars" aria-hidden="true"><span></span><span></span><span></span></span>' +
    '</button></div>'
  );
}

function buildMobileNavSectionHTML(navItem) {
  const items = (navItem.groups && navItem.groups[0] && navItem.groups[0].items) || navItem.children || [];
  if (items.length) {
    return (
      '<div class="mobile-menu-section">' +
      '<p class="mobile-menu-section-title">' + escapeNavText(navItem.label || '') + '</p>' +
      buildAccordionListHTML(items) +
      '</div>'
    );
  }
  const href = safeHref(navItem.href);
  if (!href) return '';
  const ctaClass = navItem.navCta ? ' mobile-menu-link--cta' : '';
  return (
    '<div class="mobile-menu-section mobile-menu-section--flat">' +
    '<a href="' + escapeNavText(href) + '" class="mobile-menu-link' + ctaClass + '">' +
    escapeNavText(navItem.label || '') + '</a></div>'
  );
}

function buildMobileUtilsHTML(authState, hideAuthNav) {
  const links = [];
  links.push(
    '<button type="button" class="mobile-menu-util mobile-menu-util--search" data-mobile-search-open>' +
    '<span class="mobile-menu-util-icon" aria-hidden="true">⌕</span>' +
    '<span>Buscar no site</span></button>'
  );
  const adminLink = authState && authState.adminLink;
  if (adminLink && !hideAuthNav) {
    links.push(
      '<a href="' + escapeNavText(adminLink.href) + '" class="mobile-menu-util">' +
      '<span class="mobile-menu-util-icon" aria-hidden="true">⚙</span>' +
      '<span>' + escapeNavText(adminLink.label || 'Painel') + '</span></a>'
    );
  }
  const userLink = authState && authState.userLink;
  if (userLink && !hideAuthNav && !userLink.isUser) {
    links.push(
      '<a href="' + escapeNavText(userLink.href) + '" class="mobile-menu-util mobile-menu-util--cta">' +
      '<span class="mobile-menu-util-icon" aria-hidden="true">→</span>' +
      '<span>' + escapeNavText(userLink.label || 'Entrar') + '</span></a>'
    );
  }
  if (!links.length) return '';
  return '<div class="mobile-menu-utils">' + links.join('') + '</div>';
}

function buildMobileMenuHTML(site, authState) {
  const config = site || DEFAULT_SITE;
  const navItems = config.nav || DEFAULT_SITE.nav;
  const ytUrl = config.youtubeChannelUrl || DEFAULT_SITE.youtubeChannelUrl;
  const ytLabel = config.youtubeChannelLabel || DEFAULT_SITE.youtubeChannelLabel;
  const spotifyUrl = config.spotifyPodcastUrl || DEFAULT_SITE.spotifyPodcastUrl;
  const spotifyLabel = config.spotifyPodcastLabel || DEFAULT_SITE.spotifyPodcastLabel;

  const hideAuthNav = document.body.dataset.page === 'admin'
    || document.body.dataset.page === 'sorteios-admin'
    || document.body.dataset.page === 'login'
    || document.body.dataset.page === 'entrar';

  const userLink = authState && authState.userLink;
  let accountHtml = '';
  if (userLink && userLink.isUser && !hideAuthNav) {
    const pic = userLink.picture || '/imagens/avatars/leaf.svg';
    const avatar = '<img src="' + escapeNavText(pic) + '" alt="" class="mobile-menu-account-avatar" width="32" height="32" loading="lazy">';
    accountHtml =
      '<div class="mobile-menu-account">' +
      '<a href="' + escapeNavText(userLink.href) + '" class="mobile-menu-account-link">' +
      avatar +
      '<span>' + escapeNavText(userLink.label || 'Meu perfil') + '</span></a></div>';
  }

  const sectionsHtml = navItems.map(buildMobileNavSectionHTML).filter(Boolean).join('');
  const utilsHtml = buildMobileUtilsHTML(authState, hideAuthNav);

  const footLinks = [
    ytUrl
      ? '<a href="' + escapeNavText(ytUrl) + '" class="mobile-menu-foot-link" target="_blank" rel="noopener noreferrer">▶ ' + escapeNavText(ytLabel) + '</a>'
      : '',
    spotifyUrl
      ? '<a href="' + escapeNavText(spotifyUrl) + '" class="mobile-menu-foot-link" target="_blank" rel="noopener noreferrer">♪ ' + escapeNavText(spotifyLabel) + '</a>'
      : ''
  ].filter(Boolean).join('');

  return (
    '<div id="mobile-menu-scrim" class="mobile-menu-scrim" aria-hidden="true"></div>' +
    '<aside id="mobile-menu" class="mobile-menu" aria-hidden="true" aria-label="Menu de navegação">' +
    '<div class="mobile-menu-top">' +
    '<p class="mobile-menu-title">Navegação</p>' +
    '<button type="button" id="mobile-menu-close" class="mobile-menu-close" aria-label="Fechar menu">×</button>' +
    '</div>' +
    '<nav class="mobile-menu-body">' + accountHtml + utilsHtml + sectionsHtml + '</nav>' +
    (footLinks ? '<div class="mobile-menu-foot">' + footLinks + '</div>' : '') +
    '</aside>'
  );
}

function mountMobileMenu(site, authState, menuToggle) {
  document.getElementById('mobile-menu-scrim') && document.getElementById('mobile-menu-scrim').remove();
  document.getElementById('mobile-menu') && document.getElementById('mobile-menu').remove();

  const wrap = document.createElement('div');
  wrap.innerHTML = buildMobileMenuHTML(site, authState);
  while (wrap.firstChild) {
    document.body.appendChild(wrap.firstChild);
  }

  const scrim = document.getElementById('mobile-menu-scrim');
  const panel = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');
  if (!scrim || !panel) return;

  function setOpen(open) {
    scrim.classList.toggle('is-open', open);
    panel.classList.toggle('is-open', open);
    scrim.setAttribute('aria-hidden', open ? 'false' : 'true');
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.classList.toggle('mobile-menu-open', open);
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuToggle.classList.toggle('is-active', open);
      menuToggle.setAttribute('aria-label', open ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function (e) {
      if (!isMobileNav()) return;
      e.stopPropagation();
      setOpen(panel.getAttribute('aria-hidden') !== 'false');
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', function () { setOpen(false); });
  scrim.addEventListener('click', function () { setOpen(false); });

  initAccordionToggles(panel, '.nav-tile-submenu-toggle', '.nav-tile-submenu');
  markActiveNavLinks(panel);

  const searchOpenBtn = panel.querySelector('[data-mobile-search-open]');
  if (searchOpenBtn) {
    searchOpenBtn.addEventListener('click', function () {
      setOpen(false);
      if (typeof window.budganjaSetSearchOpen === 'function') {
        var searchPanel = document.getElementById('site-search');
        window.budganjaSetSearchOpen(searchPanel ? searchPanel.hidden : true);
        return;
      }
      const searchToggle = document.getElementById('search-toggle');
      if (searchToggle) searchToggle.click();
    });
  }

  panel.querySelectorAll('a[href]').forEach(function (link) {
    link.addEventListener('click', function () { setOpen(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.getAttribute('aria-hidden') === 'false') setOpen(false);
  });

  window.addEventListener('resize', function () {
    if (!isMobileNav() && panel.getAttribute('aria-hidden') === 'false') setOpen(false);
  }, { passive: true });
}

function buildFooterHTML(site) {
  const config = site || DEFAULT_SITE;
  const ytUrl = config.youtubeChannelUrl || DEFAULT_SITE.youtubeChannelUrl;
  const ytLabel = config.youtubeChannelLabel || DEFAULT_SITE.youtubeChannelLabel;
  const spotifyUrl = config.spotifyPodcastUrl || DEFAULT_SITE.spotifyPodcastUrl;
  const spotifyLabel = config.spotifyPodcastLabel || DEFAULT_SITE.spotifyPodcastLabel;
  const footerGroups = config.footerGroups || DEFAULT_SITE.footerGroups;
  const privacyDate = config.privacyUpdated || DEFAULT_SITE.privacyUpdated;

  const groupsHtml = footerGroups.map((group) =>
    '<div class="footer-col">' +
    '<p class="footer-col-title">' + escapeNavText(translateFooterGroupTitle(group.title)) + '</p>' +
    '<nav class="footer-col-links" aria-label="' + escapeNavText(translateFooterGroupTitle(group.title)) + '">' +
    (group.links || []).map((link) => {
      const href = safeHref(link.href);
      return href ? '<a href="' + escapeNavText(href) + '">' + escapeNavText(translateFooterLabel(link.label)) + '</a>' : '';
    }).filter(Boolean).join('') +
    '</nav></div>'
  ).join('');

  const brandHtml =
    '<div class="footer-brand">' +
    '<a href="/" class="footer-brand-link">' +
    '<img class="footer-brand-icon" src="/imagens/app-icon.png?v=' + ASSET_V + '" alt="" width="32" height="32" loading="lazy" decoding="async">' +
    '<span class="footer-brand-name">' + escapeNavText(config.siteName || DEFAULT_SITE.siteName) + '</span>' +
    '</a>' +
    '<p class="footer-brand-tagline">' + escapeNavText(i18n('footer.tagline', config.siteTagline || DEFAULT_SITE.siteTagline || '')) + '</p>' +
    (ytUrl
      ? '<a href="' + escapeNavText(ytUrl) + '" class="footer-yt-link" target="_blank" rel="noopener noreferrer">' +
        escapeNavText(ytLabel) + ' <span class="footer-ext" aria-hidden="true">↗</span></a>'
      : '') +
    (spotifyUrl
      ? '<a href="' + escapeNavText(spotifyUrl) + '" class="footer-yt-link" target="_blank" rel="noopener noreferrer">' +
        escapeNavText(spotifyLabel) + ' <span class="footer-ext" aria-hidden="true">↗</span></a>'
      : '') +
    '</div>';

  return (
    '<footer class="site-footer">' +
    '<div class="footer-shell">' +
    '<div class="footer-grid">' +
    brandHtml +
    groupsHtml +
    '</div>' +
    '<div class="footer-bar">' +
    '<p class="footer-copy">' + escapeNavText(i18n('footer.copy', config.footerText || DEFAULT_SITE.footerText)) + '</p>' +
    '<p class="footer-legal">' +
    escapeNavText(i18n('common.footerLegal', 'Conteúdo educacional.')) +
    ' · <a href="/info/privacidade.html">' + escapeNavText(i18n('common.footerPrivacy', 'Privacidade')) + '</a>' +
    ' · ' + escapeNavText(i18n('common.footerUpdated', 'atualizado em')) + ' ' + escapeNavText(privacyDate) +
    '</p>' +
    '</div>' +
    '</div></footer>'
  );
}

function absoluteUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const origin = window.location.origin;
  const base = path.startsWith('/') ? path : '/' + path.replace(/^\.\//, '');
  return origin + base;
}

function injectSeoMeta(site) {
  const ogImage = site.ogImage || DEFAULT_SITE.ogImage;
  const head = document.head;
  if (!head || !ogImage) return;

  const pageUrl = window.location.href.split('#')[0];
  const title = document.title || OG_SITE_NAME;
  const descMeta = head.querySelector('meta[name="description"]');
  const description = descMeta ? descMeta.getAttribute('content') : '';

  function ensureMeta(attr, key, value) {
    if (!value) return;
    let el = head.querySelector('meta[' + attr + '="' + key + '"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      head.appendChild(el);
    }
    el.setAttribute('content', value);
  }

  const imageUrl = absoluteUrl(ogImage);
  ensureMeta('property', 'og:image', imageUrl);
  ensureMeta('property', 'og:url', pageUrl);
  ensureMeta('property', 'og:site_name', OG_SITE_NAME);
  ensureMeta('name', 'twitter:card', 'summary_large_image');
  ensureMeta('name', 'twitter:title', title);
  ensureMeta('name', 'twitter:description', description);
  ensureMeta('name', 'twitter:image', imageUrl);

  if (!head.querySelector('link[rel="canonical"]')) {
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = pageUrl;
    head.appendChild(canonical);
  }

  if (document.body.dataset.page === 'home' && !document.getElementById('jsonld-org')) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'jsonld-org';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: OG_SITE_NAME,
      url: absoluteUrl('index.html'),
      description: description,
      sameAs: [
        site.youtubeChannelUrl || DEFAULT_SITE.youtubeChannelUrl,
        site.spotifyPodcastUrl || DEFAULT_SITE.spotifyPodcastUrl
      ].filter(Boolean)
    });
    head.appendChild(script);
  }
}

async function fetchSiteConfig() {
  let site = DEFAULT_SITE;
  try {
    const res = await fetch('/api/site');
    if (res.ok) site = await res.json();
  } catch (e) { /* fallback */ }
  return applyGeneratedNav(site);
}

function applyGeneratedNav(site) {
  if (!site || !Array.isArray(site.nav)) return site;
  const bib = typeof window !== 'undefined' ? window.__BIBLIOTECA_NAV__ : null;
  const fer = typeof window !== 'undefined' ? window.__FERRAMENTAS_NAV__ : null;
  const loja = typeof window !== 'undefined' ? window.__LOJA_NAV__ : null;
  if (!bib && !fer) return site;
  const next = Object.assign({}, site);
  const lojaItem = loja
    || site.nav.find(function (item) { return item && item.navCta && item.href; })
    || { label: 'Loja', href: '/loja/', navCta: true };
  if (bib && fer) {
    next.nav = [bib, fer, lojaItem];
  } else {
    next.nav = site.nav.map(function (item) {
      if (item && item.label === 'Biblioteca' && bib) return bib;
      if (item && item.label === 'Ferramentas' && fer) return fer;
      return item;
    });
    if (!next.nav.some(function (item) { return item && item.navCta; })) {
      next.nav = next.nav.concat([lojaItem]);
    }
  }
  if (window.BudGanjaI18n && window.BudGanjaI18n.localizeNavTree) {
    next.nav = window.BudGanjaI18n.localizeNavTree(next.nav);
  }
  return next;
}

function applyFerramentasNav(site) {
  return applyGeneratedNav(site);
}

async function fetchAuthState() {
  const userFallback = { label: 'Entrar', href: '/entrar.html', isUser: false };
  const state = { userLink: userFallback, adminLink: null, isAdmin: false, isUser: false };

  try {
    const serverOk = await isServerAvailable();
    if (!serverOk) return state;

    try {
      const res = await fetch('/api/user/me', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        state.userLink = {
          label: 'Diário de Cultivo',
          href: '/cultivo/',
          isUser: true,
          picture: data.picture || (data.profile && data.profile.avatarUrl) || '/imagens/avatars/leaf.svg',
          name: data.name || null
        };
        state.isUser = true;
      }
    } catch (e) { /* not logged in as user */ }

    try {
      const res = await fetch('/api/me', { credentials: 'include' });
      if (res.ok) {
        state.adminLink = { label: 'Painel', href: '/admin.html', isAdmin: true };
        state.isAdmin = true;
      }
    } catch (e) { /* not admin */ }

    return state;
  } catch (e) {
    return state;
  }
}

function slugFromPostUrl(href) {
  if (!href) return '';
  const match = String(href).match(/\/posts\/post-([^/?#]+)\.html/i)
    || String(href).match(/(?:^|\/)post-([^/?#]+)\.html/i);
  return match ? match[1] : '';
}

function adminEditUrl(slug) {
  return '/admin.html?slug=' + encodeURIComponent(slug);
}

function enhancePostCardEditButtons() {
  if (document.body.dataset.adminSession !== '1') return;

  document.querySelectorAll('.post-card:not([data-admin-enhanced])').forEach(function (card) {
    var slug = card.dataset.postSlug || '';
    if (!slug) {
      var link = card.querySelector('a[href]');
      slug = slugFromPostUrl(link && link.getAttribute('href'));
    }
    if (!slug) return;

    card.dataset.adminEnhanced = '1';
    card.dataset.postSlug = slug;
    card.classList.add('post-card--admin');

    var btn = document.createElement('a');
    btn.href = adminEditUrl(slug);
    btn.className = 'post-card-edit-btn';
    btn.title = 'Editar publicação';
    btn.setAttribute('aria-label', 'Editar publicação');
    btn.textContent = '✏️';
    card.appendChild(btn);
  });
}

function showAdminPostEditBar() {
  if (document.body.dataset.page === 'admin' || document.body.dataset.page === 'login' || document.body.dataset.page === 'sorteios-admin') return;

  var postSlug = document.body.dataset.postSlug;
  if (!postSlug) return;

  var main = document.querySelector('main');
  var h1 = main && main.querySelector('h1');
  if (!h1 || main.querySelector('.admin-edit-inline')) return;

  var link = document.createElement('a');
  link.href = adminEditUrl(postSlug);
  link.className = 'admin-edit-inline';
  link.textContent = '✏️ Editar publicação';
  h1.insertAdjacentElement('afterend', link);
}

function initAdminEditUi(authLink) {
  if (!authLink || !authLink.isAdmin) return;
  document.body.dataset.adminSession = '1';
  showAdminPostEditBar();
  enhancePostCardEditButtons();
  window.budganjaEnhanceAdminPostCards = enhancePostCardEditButtons;

  if (typeof MutationObserver !== 'undefined') {
    var observer = new MutationObserver(function () {
      enhancePostCardEditButtons();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

function syncHeaderOffset() {
  const header = document.getElementById('site-header');
  if (!header) return;
  document.documentElement.style.setProperty('--header-offset', header.offsetHeight + 'px');
}

function isMobileNav() {
  return window.matchMedia('(max-width: 1024px)').matches;
}

function closeAllDropdowns(navRoot, except) {
  if (!navRoot) return;
  navRoot.querySelectorAll('.nav-dropdown.open').forEach((dropdown) => {
    if (dropdown === except) return;
    dropdown.classList.remove('open');
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  });
}

function toggleNavDropdown(btn, navRoot) {
  const dropdown = btn.closest('.nav-dropdown');
  if (!dropdown) return;
  const willOpen = !dropdown.classList.contains('open');
  closeAllDropdowns(navRoot, willOpen ? dropdown : null);
  dropdown.classList.toggle('open', willOpen);
  btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
}

function initNavDropdowns(navPanel, setMobileNav) {
  if (!navPanel) return;

  navPanel.addEventListener('click', function (e) {
    const tileToggle = e.target.closest('.nav-tile-submenu-toggle');
    if (tileToggle && navPanel.contains(tileToggle)) {
      e.preventDefault();
      e.stopPropagation();
      const wrap = tileToggle.closest('.nav-tile-submenu');
      if (!wrap) return;
      const willOpen = !wrap.classList.contains('open');
      navPanel.querySelectorAll('.nav-tile-submenu.open').forEach(function (other) {
        if (other === wrap) return;
        other.classList.remove('open');
        const otherBtn = other.querySelector('.nav-tile-submenu-toggle');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });
      wrap.classList.toggle('open', willOpen);
      tileToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      return;
    }

    const toggle = e.target.closest('.nav-dropdown-toggle');
    if (toggle && navPanel.contains(toggle)) {
      e.preventDefault();
      e.stopPropagation();
      toggleNavDropdown(toggle, navPanel);
      return;
    }

    const link = e.target.closest('a[href]');
    if (link && navPanel.contains(link) && isMobileNav()) {
      return;
    }
  });

  navPanel.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const tileToggle = e.target.closest('.nav-tile-submenu-toggle');
    if (tileToggle && navPanel.contains(tileToggle)) {
      e.preventDefault();
      tileToggle.click();
      return;
    }
    const toggle = e.target.closest('.nav-dropdown-toggle');
    if (!toggle || !navPanel.contains(toggle)) return;
    e.preventDefault();
    toggleNavDropdown(toggle, navPanel);
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('.nav-dropdown')) return;
    closeAllDropdowns(navPanel);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAllDropdowns(navPanel);
    }
  });
}

async function enrichBibliotecaWithPosts(navPanel) {
  if (window.matchMedia('(min-width: 1025px)').matches) return;

  const dropdown = navPanel && navPanel.querySelector('[data-nav="biblioteca"] .nav-mega-panel');
  if (!dropdown) return;

  let posts = [];
  try {
    const res = await fetch('/api/posts');
    if (res.ok) posts = await res.json();
  } catch (e) { /* fallback */ }

  if (!posts.length) {
    try {
      const res = await fetch('/posts-public.json');
      if (res.ok) posts = await res.json();
    } catch (e) { /* ignore */ }
  }

  if (!posts.length) return;

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const categoryLabels = {
    pesquisa: 'Pesquisas',
    inspecao: 'Inspeções',
    equipamento: 'Equipamentos'
  };

  const grouped = { pesquisa: [], inspecao: [], equipamento: [] };
  posts.forEach((post) => {
    const cat = post.category || 'pesquisa';
    if (grouped[cat] && grouped[cat].length < 3) grouped[cat].push(post);
  });

  Object.keys(grouped).forEach((cat) => {
    if (!grouped[cat].length) return;

    const section = document.createElement('li');
    section.className = 'nav-recent-group';
    section.innerHTML =
      '<span class="nav-recent-title">' + escapeNavText(categoryLabels[cat] || cat) + ' — recentes</span>' +
      '<ul class="nav-recent-list">' +
      grouped[cat].map(function (post) {
        const href = safeHref(post.url || post.filename);
        if (!href) return '';
        const excerpt = String(post.excerpt || post.title || '').trim();
        const tip = hoverTipMarkup(excerpt);
        return (
          '<li><a href="' + escapeNavText(href) + '" class="nav-recent-link has-hover-tip"' + tip.attrs + '>' +
          escapeNavText(post.title || 'Publicação') +
          tip.html +
          '</a></li>'
        );
      }).filter(Boolean).join('') +
      '</ul>';

    dropdown.appendChild(section);
  });

  enhanceHoverTips(dropdown);
}

function applyUserPictureToDom(picture) {
  if (!picture) return;
  document.querySelectorAll('.header-profile-avatar, .nav-user-avatar, .mobile-menu-account-avatar').forEach(function (img) {
    img.src = picture;
  });
}

let cachedLayoutSite = null;
let cachedLayoutAuth = null;

function injectLayout(site, authState) {
  cachedLayoutSite = site;
  cachedLayoutAuth = authState;
  const headerContainer = document.getElementById('site-header');
  const footerContainer = document.getElementById('site-footer');
  const headerHTML = buildHeaderHTML(site, authState);
  const footerHTML = buildFooterHTML(site);

  if (headerContainer) {
    headerContainer.innerHTML = headerHTML;

    const menuToggle = headerContainer.querySelector('.menu-toggle');
    const navPanel = document.getElementById('primary-nav');
    const quickNav = headerContainer.querySelector('.header-quick-nav');

    mountMobileMenu(site, authState, menuToggle);
    initNavDropdowns(navPanel, function () {});

    if (window.BudGanjaI18n) {
      window.BudGanjaI18n.initLanguageSwitcher();
    }

    const updateHeaderState = function () {
      const scrolled = window.scrollY > 16;
      headerContainer.classList.toggle('is-scrolled', scrolled);
      syncHeaderOffset();
    };
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    window.addEventListener('resize', updateHeaderState, { passive: true });

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (navPanel) {
      markActiveNavLinks(navPanel);
      enhanceHoverTips(navPanel);
    }
    if (quickNav) {
      markQuickNavActive(quickNav);
      enhanceHoverTips(quickNav);
    }

    enhanceHoverTips(headerContainer);
  }

  if (footerContainer) {
    footerContainer.innerHTML = footerHTML;
    markActiveNavLinks(footerContainer);
  }
}


document.addEventListener('DOMContentLoaded', async function () {
  initInstallUi();
  initAppUpdates();

  window.addEventListener('budganja:user-profile', function (e) {
    if (e.detail && e.detail.picture) applyUserPictureToDom(e.detail.picture);
  });

  const [site, authState] = await Promise.all([fetchSiteConfig(), fetchAuthState()]);
  injectLayout(site, authState);
  if (window.BudGanjaI18n) window.BudGanjaI18n.apply();
  if (typeof window.budganjaReinitChrome === 'function') window.budganjaReinitChrome();
  enhanceHoverTips(document);
  initInstallUi();
  refreshInstallVisibility();
  injectSeoMeta(site);

  window.addEventListener('budganja:locale-change', function () {
    injectLayout(cachedLayoutSite, cachedLayoutAuth);
    if (window.BudGanjaI18n) window.BudGanjaI18n.apply();
    enhanceHoverTips(document);
    if (typeof window.budganjaReinitChrome === 'function') window.budganjaReinitChrome();
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if (authState && authState.isAdmin) initAdminEditUi(authState);

  if (!document.querySelector('script[src*="site-features.js"]')) {
    const feat = document.createElement('script');
    feat.id = 'site-features-js';
    feat.src = '/js/site-features.js?v=' + ASSET_V;
    document.body.appendChild(feat);
  }
});
