// Service Worker para PWA - Inspetor BudGanja
const APP_VERSION = '269';
const CACHE_NAME = 'budganja-v' + APP_VERSION;
const urlsToCache = [
    '/',
    '/index.html',
    '/biblioteca/pesquisas/',
    '/biblioteca/inspecoes/',
    '/equipamentos/',
    '/calculadoras/',
    '/calculadoras/cultivo-lab.html',
    '/calculadoras/luximetro.html',
    '/calculadoras/super-solo.html',
    '/guia/cultivo-basico.html',
    '/info/sobre.html',
    '/info/contato.html',
    '/info/privacidade.html',
    '/sorteios/',
    '/comunidade/',
    '/cultivo/',
    '/planejamento/',
    '/js/planejamento.js',
    '/js/cultivo.js',
    '/js/cultivo/shared.js',
    '/js/cultivo/onboarding.js',
    '/js/cultivo-phase-weeks-data.js',
    '/css/pages/cultivo-perfil.css',
    '/videos/',
    '/robots.txt',
    '/sitemap.xml',
    '/search-index.json',
    '/equipamentos/clonadora-6-estacas.html',
    '/equipamentos/clonadora-12-estacas.html',
    '/equipamentos/manual-clonadora.html',
    '/equipamentos/manual-hidrocloradora.html',
    '/biblioteca/pesquisas/substratos.html',
    '/js/posts.js',
    '/js/calculadoras/cultivo-lab-engine.js',
    '/js/calculadoras/cultivo-lab.js',
    '/js/calculadoras/super-solo.js',
    '/js/luximetro.js',
    '/js/youtube.js',
    '/js/sorteios.js',
    '/js/videos.js',
    '/js/guia-cultivo.js',
    '/content/guia-cultivo.json',
    '/content/youtube-feed.json',
    '/content/sorteio.json',
    '/content/loja.json',
    '/js/loja.js',
    '/js/loja-data.js',
    '/js/loja-order-ui.js',
    '/js/loja-order-callout.js',
    '/js/equip-loja-materials.js',
    '/js/loja-encomenda.js',
    '/js/i18n-data.js',
    '/js/i18n.js',
    '/posts-public.json',
    '/manifest.json',
    '/favicon.ico',
    '/favicon.svg',
    '/imagens/app-icon.png?v=' + APP_VERSION,
    '/imagens/icon-192.png?v=' + APP_VERSION,
    '/imagens/icon-512.png?v=' + APP_VERSION,
    '/imagens/icon-512-maskable.png?v=' + APP_VERSION,
    '/imagens/apple-touch-icon.png?v=' + APP_VERSION,
    '/imagens/favicon-48.png?v=' + APP_VERSION,
    '/imagens/favicon-32.png?v=' + APP_VERSION,
    '/imagens/favicon-16.png?v=' + APP_VERSION,
    '/imagens/iconsite.png?v=' + APP_VERSION
];

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache).catch(() => {}))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

function networkFirstWithCache(request) {
    return fetch(request)
        .then((response) => {
            if (response && response.ok) {
                const copy = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            }
            return response;
        })
        .catch(() => caches.match(request));
}

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/api/')) return;

    const url = new URL(event.request.url);
    // Não interceptar cross-origin (ex.: miniaturas i.ytimg.com nos cards).
    // Caso contrário o cache-first abaixo pode devolver respostas opacas/falhadas
    // e as capas dos posts ficam em branco (net::ERR_FAILED).
    if (url.origin !== self.location.origin) return;

    const path = url.pathname;

    if (path === '/version.json' || path === '/sw.js' || path.indexOf('/sw.js') === 0) {
        event.respondWith(fetch(event.request, { cache: 'no-store' }));
        return;
    }

    // Fotos/vídeos do diário: sempre rede (nunca cache-first, senão a foto nova não aparece).
    if (path.startsWith('/uploads/')) {
        event.respondWith(fetch(event.request, { cache: 'no-store' }));
        return;
    }

    if (path.startsWith('/js/') || path.startsWith('/css/')) {
        event.respondWith(
            fetch(event.request, { cache: 'no-store' })
                .then((response) => {
                    if (response && response.ok) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                    }
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    const isHtml = path.endsWith('.html') || path === '/' || path.endsWith('/');
    const offlineFirst = [
        '/calculadoras/',
        '/calculadoras/luximetro.html',
        '/guia/cultivo-basico.html',
        '/search-index.json',
        '/content/guia-cultivo.json',
        '/content/youtube-feed.json'
    ];

    if (offlineFirst.some((p) => path === p || path.endsWith(p))) {
        event.respondWith(
            caches.match(event.request).then((cached) => cached || fetch(event.request))
        );
        return;
    }

    if (isHtml) {
        event.respondWith(
            fetch(event.request, { cache: 'no-store' })
                .then((response) => {
                    if (response && response.ok) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                    }
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    if (path.startsWith('/biblioteca/pesquisas') || path.startsWith('/biblioteca/inspecoes')) {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
        return;
    }

    if (path.startsWith('/content/') && path.endsWith('.json')) {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
