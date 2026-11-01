const CACHE_NAME = 'veleshkon-v2';
const CORE = [
  './', './index.html', './offline.html', './style/main.css', './js/app.js',
  './manifest.webmanifest', './assets/icons/light.png', './assets/messages.json',
  './game/game.html', './game/game.js', './game/game.css',
  './music-player.html', './music/bubble-pop.mp3', './music/game-bonus.mp3'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(key => key.startsWith('veleshkon-') && key !== CACHE_NAME)
      .map(key => caches.delete(key)))
  ).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (response.ok && response.type === 'basic') {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)));
      }
      return response;
    }).catch(() => event.request.mode === 'navigate'
      ? caches.match(new URL('./offline.html', self.registration.scope).href)
      : Response.error()))
  );
});
