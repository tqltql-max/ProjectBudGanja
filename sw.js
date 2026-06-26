// Service Worker para PWA - Inspetor BudGanja
const CACHE_NAME = 'budganja-v6';
const urlsToCache = [
    '/',
    '/index.html',
    '/inspecoes.html',
    '/pesquisas.html',
    '/equipamentos.html',
    '/calculadoras.html',
    '/sobre.html',
    '/luximetro.html',
    '/contato.html',
    '/manual-clonadora.html',
    '/manual-hidrocloradora.html',
    '/pesquisa-substratos.html',
    '/style.css',
    '/luximetro.css',
    '/js/layout.js',
    '/js/posts.js',
    '/js/calculadoras.js',
    '/js/luximetro.js',
    '/js/youtube.js',
    '/posts-public.json',
    '/manifest.json',
    '/favicon.svg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.includes('/api/')) return;

    const path = new URL(event.request.url).pathname;
    if (path.endsWith('/pesquisas.html') || path.endsWith('/pesquisas.html/')) {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            )
        )
    );
});
