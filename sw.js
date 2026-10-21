// Lets the installed app open offline. Network first, always: online you get the
// live site; offline, the last copy of each page and file you've seen.
// Bump VERSION to drop old copies.
const VERSION = 'v1';
const CACHE = `site-${VERSION}`;
const CORE = ['/', '/writing/', '/assets/style.css', '/assets/js/main.js', '/assets/js/bs.js', '/assets/js/bs-table.js', '/assets/icons.svg'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  // Same-site GETs only; the contact form, GitHub stars and reCAPTCHA go straight out.
  if (request.method !== 'GET' || new URL(request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(request)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(request, copy));
        }
        return res;
      })
      .catch(() => caches.match(request).then((hit) => hit || caches.match('/'))),
  );
});
