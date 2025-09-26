const CACHE_NAME = "school-app-v4";
const urlsToCache = [
  "/",
  "/index.html",
  "/file/IOS 15 R SemiBold.ttf",
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // لو لقى الملف في الكاش، يرجعو
      if (cachedResponse) {
        return cachedResponse;
      }
      // لو ما لقاوش، يجرب يجيب من الشبكة
      return fetch(event.request).catch(() => {
        // لو ما كاش نت والطلب صفحة HTML، يرجع index.html
        if (event.request.headers.get("accept").includes("text/html")) {
          return caches.match("/index.html");
        }
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
