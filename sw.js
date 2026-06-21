// Service Worker para PWA - Inspetor BudGanja
const CACHE_NAME = 'budganja-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/pesquisas.html',
    '/bugigangas.html',
    '/ferramentas.html',
    '/contato.html',
    '/manual-clonadora.html',
    '/manual-hidrocloradora.html',
    '/pesquisa-substratos.html',
    '/style.css',
    '/js/layout.js',
    '/manifest.json',
    '/favicon.svg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = ['budganja-v1'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
