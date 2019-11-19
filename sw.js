const statictCacheName = "site_cache_v5";
const dynamicCacheName = "dynamic_cache_v1";
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    '/pages/fallback.html'
];

self.addEventListener("install", evt => {
    //console.log('Service Worker as been install');
    evt.waitUntil(
        caches.open(statictCacheName).then((cache) => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});


self.addEventListener("activate", evt => {
    //console.log('Service Worker as been activate')
    caches.keys().then(keys => {
        return Promise.all(keys
            .filter(key => key !== statictCacheName && key !== dynamicCacheName)
            .map(key => caches.delete(key)))
    })
});


self.addEventListener("fetch", evt => {
    //console.log('Service Worker as been fetch',evt)
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then((fetchRes) => {
                return caches.open(dynamicCacheName).then(cache => {
                    console.log(evt.request.url.indexOf('http'), evt.request.url);
                    if (evt.request.url.indexOf('http') === 0)
                        cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        }).catch(() => {
            if (evt.request.url.indexOf('.html') > -1)
                caches.match('/pages/fallback.html');
        })
    )

});
