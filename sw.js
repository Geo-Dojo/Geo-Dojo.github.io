// Geo Dojo offline support. The page, data and libraries are cached on first visit, so the
// site keeps working without a connection. Bump happens automatically: each build stamps a new id.
const CACHE = "curious-atlas-mwqnxthc";
const LOCAL = ["./", "index.html", "vendor.js", "atlas.js", "facts.js", "countries-info.js", "countries-extra.js", "countries-50m.json", "countries-110m.json", "hydro.json", "manifest.webmanifest", "fonts/bricolage-grotesque-latin-opsz-normal.woff2", "fonts/source-serif-4-latin-opsz-normal.woff2", "fonts/ibm-plex-mono-latin-400-normal.woff2", "fonts/ibm-plex-mono-latin-500-normal.woff2", "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(LOCAL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith("curious-atlas-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Own files: cache first (each build gets a fresh cache). Libraries and fonts: use the network,
// fall back to the cached copy when offline. Visitor stats are never cached.
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.hostname.endsWith("goatcounter.com") || url.hostname === "gc.zgo.at") return;
  if (url.origin === location.origin) {
    e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request).then((res) => {
      // Files fetched later (like the deep-zoom map) are kept too, so they work offline next time.
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
      return res;
    })));
    return;
  }
  e.respondWith(
    fetch(e.request).then((res) => {
      if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request))
  );
});
