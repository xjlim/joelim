const C_SHELL = "cShell-v2";

const ASSETS = ["/favicon.ico", "/img/faceshot.jpg"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(C_SHELL).then(cache => {
      console.log("[ServiceWorker] Caching App Shell");
      return cache.addAll(ASSETS);
    })
  );
});
