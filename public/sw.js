// High-Speed Service Worker for Wedding Invitation Assets
const CACHE_NAME = 'wedding-invitation-cache-v2';

const ASSETS_TO_PRECACHE = [
  './assets/page 1.webp',
  './assets/page 2(oct 29).webp',
  './assets/page3( 30 oct).webp',
  './assets/page 4 (2 Nov).webp',
  './assets/SSG09645-C19LQ60y.webp',
  './assets/SSG00440-Dz91S7X0.webp',
  './assets/012-B2BcXKfQ.webp',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_PRECACHE).catch(() => {
        // Continue if some fail to precache
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Cache-first for images, fonts, and assets
  if (
    url.pathname.includes('/assets/') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.includes('/fonts/')
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
    );
  }
});
