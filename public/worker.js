importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js');

var CACHE_NAME = 'pwa-task-manager';
var urlsToCache = [
  '/',
  '/completed'
];

// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  var cacheWhitelist = ['pwa-task-manager'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
messaging.requestPermission()
.then(function() {
  console.log('Have permission');
})
.catch(function(err){
  console.log('Error Occured.')
})

/*
let msg = []
self.addEventListener('message', event =>{
  msg = event.data
})

setInterval(()=>{
  let now = new Date();
  for(let i in msg){
    if(msg[i].name.substring(0,1) === "a"){
      let notifHour = parseInt(msg[i].time.substr(0, msg[i].time.length - 5))
      let notifMinute = parseInt(msg[i].time.substring(msg[i].time.length-4, msg[i].time.length-2))
      if(now.getHours() === notifHour && now.getMinutes() === notifMinute && now.getSeconds() === 1){
        self.registration.showNotification("Its time for your " + msg[i].substr(0, msg[i].time.length - 5) + " practice routine!",  {body:" Bitch"})
        console.log("notification sent")
      }
    }
   
  }
}, 1000);
*/
