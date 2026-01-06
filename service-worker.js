const CACHE_NAME = 'veleshkon-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style/main.css',
  '/js/app.js',
  '/manifest.webmanifest',
  '/assets/icons/light.png',
  '/assets/messages.json',
  '/game/game.html',
  '/game/game.js',
  '/game/game.css',
  '/music-player.html'
];

// نصب سرویس ورکر
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('✅ کش باز شد');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        console.log('✅ سرویس ورکر نصب شد');
        return self.skipWaiting();
      })
  );
});

// فعال‌سازی سرویس ورکر
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ حذف کش قدیمی:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('🚀 سرویس ورکر فعال شد');
      return self.clients.claim();
    })
  );
});

// مدیریت درخواست‌ها
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // اگر در کش موجود باشد، از کش برمی‌گردانیم
        if (response) {
          return response;
        }

        // در غیر این صورت از شبکه درخواست می‌کنیم
        return fetch(event.request).then(
          function(response) {
            // بررسی اعتبار پاسخ
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // کپی کردن پاسخ برای کش
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        ).catch(function() {
          // اگر آفلاین باشیم و فایل در کش نباشد، صفحه آفلاین را نمایش می‌دهیم
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        });
      })
  );
});
  