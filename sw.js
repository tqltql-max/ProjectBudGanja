// Service Worker para PWA - Inspetor BudGanja
const APP_VERSION = '339';
const CACHE_NAME = 'budganja-v' + APP_VERSION;
const urlsToCache = [
    '/',
    '/index.html',
    '/biblioteca/pesquisas/',
    '/biblioteca/inspecoes/',
    '/biblioteca/cadernos/',
    '/js/cadernos-engenharia.js',
    '/js/cadernos-engenharia-data.js',
    '/css/pages/cadernos-engenharia.css',
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
    '/js/media-upload.js',
    '/js/comunidade.js',
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
    '/content/videos-hub.json',
    '/content/inspecoes-sugestoes.json',
    '/content/sorteio.json',
    '/js/i18n-data.js',
    '/js/i18n.js',
    '/posts-public.json',
    '/manifest.json',
    '/favicon.v' + APP_VERSION + '.ico',
    '/favicon.v' + APP_VERSION + '.svg',
    '/imagens/app-icon.v' + APP_VERSION + '.png',
    '/imagens/icon-192.v' + APP_VERSION + '.png',
    '/imagens/icon-512.v' + APP_VERSION + '.png',
    '/imagens/icon-512-maskable.v' + APP_VERSION + '.png',
    '/imagens/apple-touch-icon.v' + APP_VERSION + '.png',
    '/imagens/favicon-48.v' + APP_VERSION + '.png',
    '/imagens/favicon-32.v' + APP_VERSION + '.png',
    '/imagens/favicon-16.v' + APP_VERSION + '.png',
    '/imagens/iconsite.png?v=' + APP_VERSION
];

self.addEventListener('message', (event) => {
    const data = event.data || {};
    if (data.type === 'SKIP_WAITING') {
        self.skipWaiting();
        return;
    }
    if (data.type === 'VIDA_DIARIO_NOTIFY' && data.title) {
        event.waitUntil(
            self.registration.showNotification(String(data.title), {
                body: String(data.body || ''),
                icon: '/imagens/icon-192.v' + APP_VERSION + '.png',
                badge: '/imagens/favicon-48.v' + APP_VERSION + '.png',
                tag: String(data.tag || 'vida-diario'),
                renotify: true,
                data: { url: data.url || '/vida/diario/' }
            }).catch(() => {})
        );
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const target = (event.notification && event.notification.data && event.notification.data.url) || '/vida/diario/';
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
            for (const client of list) {
                if (client.url && client.url.indexOf('/vida/diario') !== -1 && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) return clients.openWindow(target);
            return undefined;
        })
    );
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
        '/content/youtube-feed.json',
        '/content/videos-hub.json',
        '/content/inspecoes-sugestoes.json'
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
