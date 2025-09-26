const CACHE_NAME = "weekly-v5";
const urlsToCache = [
  "/Weekly-Timetable/",
  "/Weekly-Timetable/index.html",
  "/Weekly-Timetable/style.css",
  "/Weekly-Timetable/script.js",
  "/Weekly-Timetable/file/IOS 15 R SemiBold.ttf",
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).catch(() => {
        if (event.request.mode === "navigate") {
          return caches.match("/Weekly-Timetable/index.html");
        }
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
