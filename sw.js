const CACHE = 'billares-v54-fresh';
const FILES = ['/', '/index.html', '/manifest.json', '/icon-192.png', '/icon-512.png'];
self.addEventListener('install', e => { 
  self.skipWaiting(); 
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); 
});
self.addEventListener('activate', e => { 
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => caches.delete(k)) // borrar TODOS los cachés anteriores
    ))
  ); 
  self.clients.claim(); 
});
self.addEventListener('fetch', e => { 
  // Siempre red primero, caché solo como fallback
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request))); 
});
