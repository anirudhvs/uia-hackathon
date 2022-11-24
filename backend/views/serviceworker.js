/* eslint-disable no-restricted-globals */
const cacheName = 'pwa-demo-v1';

const filesToCache = [
  '/',
  '/index.ejs',
  '/partials/header.ejs',
  '/partials/footer.ejs',
  '/css/style.css',
  '/js/app.js',
  '/js/menu.js',
  '/images/refresh.svg',
  '/images/pwa.png',
];

// Install Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing....');

  event.waitUntil(

    // Open the Cache
    caches.open(cacheName).then((cache) => {
      console.log('Service Worker: Caching App Shell at the moment......');

      // Add Files to the Cache
      return cache.addAll(filesToCache);
    }),
  );
});
