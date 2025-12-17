// Service Worker para Guarubatão FC - Cache offline básico
const CACHE_NAME = 'guarubatao-fc-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/base.css',
  '/css/header.css',
  '/css/carousel.css',
  '/css/components.css',
  '/css/patrocinadores.css',
  '/css/futebol.css',
  '/css/noticias.css',
  '/css/contato.css',
  '/css/clube.css',
  '/css/elenco.css',
  '/css/galeria.css',
  '/css/footer.css',
  '/css/style.min.css',
  '/js/unified-carousel.min.js',
  '/js/menu.js',
  '/img/escudo/escudo06.png',
  // Adicionar outros recursos críticos
];

// Instalação
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativação
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna do cache se disponível
        if (response) {
          return response;
        }
        // Caso contrário, faz a requisição
        return fetch(event.request);
      })
  );
});