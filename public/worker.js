var CACHE_NAME = 'pwa-task-manager'
var urlsToCache = [
    '/',
    '/completed'
];

//Install service worker
self.addEventListener('install', event=>{
    //Perform Install Steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache){
            console.log('Opened cache');
            return cache.addAll(urlsToCache)
        })
    );
});

//Cache and return requests
self.addEventListener('fetch', event =>{
    event.respondWith(
        caches.match(event.request).then(function(responsek) {
            if(response){
                return response
            }
            return fetch(event.request);
        })
    );
});

//Update a service worker
self.addEventListener('activate', event =>{
    var cacheWhitelist = ['pwa-task-manager'];
    event.waitUntil(
        caches.keys().then(cachesNames => {
            return Promise.all(
                cahceNames.map(cacheName => {
                    if(cacheWhitelist.indexOf(cacheName) === -1){
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})

