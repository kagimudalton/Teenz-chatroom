const CACHE_NAME = 'teenz-chatroom-cache-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json',
  './service-worker.js',
  // Add your raw video links here
  'https://raw.githubusercontent.com/kagimudalton/Teenz-chatroom-videos/main/Warner_Bros_Pictures_Intro__2025_(360p).mp4',
  'https://raw.githubusercontent.com/kagimudalton/Teenz-chatroom-videos/main/Universal_Intro_4K(360p).mp4',
  'https://raw.githubusercontent.com/kagimudalton/Teenz-chatroom-videos/main/Stranger_Things_Season_6_-_Trailer__2026__Netflix(360p).mp4',
  'https://raw.githubusercontent.com/kagimudalton/Teenz-chatroom-videos/main/No_Copyright%2C_Copyright_Free_Videos%2C_sunset%2C_beach%2C_sea%2C_waves(360p).mp4',
  'https://raw.githubusercontent.com/kagimudalton/Teenz-chatroom-videos/main/Marvel_Opening_Theme(360p).mp4',
  'https://raw.githubusercontent.com/kagimudalton/Teenz-chatroom-videos/main/FPV_Drone_Flight_through_Beautiful_Iceland_Canyon(360p).mp4'
];

// Install event - caching assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event - serve cached assets if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});