const CACHE_NAME = "v1_cache_PWA";

const urlsToCache = [
    './',
    './css/normalize.css',
    './css/style.css',
    './images/hero.jpg',
    './images/logo_16.jpg',
    './images/logo_32.jpg',
    './images/logo_64.jpg',
    './images/logo_96.jpg',
    './images/logo_128.jpg',
    './images/logo_192.jpg',
    './images/logo_256.jpg',
    './images/logo_384.jpg',
    './images/logo_512.jpg',
    './images/logo_1024.jpg'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() =>{
                        self.skipWaiting();
                    })
                    .catch(err => {
                        console.log(`Not loaded successfully ${err}`);
                    });
            })
            .catch(err => {
                console.log('Something went wrong');
            })
    );
});

self.addEventListener("activate", e => {
    // Add all elements in the cache
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if(cacheWhiteList.indexOf(cacheName) === -1){
                            // Delete all elements that are no longer in the cache
                            return caches.delete(cacheName);
                        }
                    })
                )
            })
            .then(() => {
                // Active device cache
                self.clients.claim();
            })
    );
});

self.addEventListener('fetch', e=> {
    e.respondWith (
        caches.match (e.request)
        .then(res => {
            if(res){
                return res;
            }
            
            return fetch(e.request);
        })
    );
});