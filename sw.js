
const CACHE_NAME = 'qcbe-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  // NOTE: The esm.sh URLs are dynamically generated and may change.
  // For a production app, it's better to vendor these dependencies.
  // For this environment, we will cache the main entry points we know.
  'https://esm.sh/react@^19.2.3',
  'https://esm.sh/react-dom@^19.2.3/client',
  'https://esm.sh/@google/genai@^1.34.0',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
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

        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              if (event.request.url.startsWith('https://esm.sh/')) {
                 // Don't cache opaque responses from esm.sh
                 return response;
              }
            }
            
            // Do not cache chrome extension requests
            if(event.request.url.indexOf('chrome-extension') !== -1) {
                return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
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
