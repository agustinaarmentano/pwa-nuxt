importScripts('./js/inter.js');

const STATIC_CACHE = "static-v1";

const APP_SHELL = [
  "/",
  "index.html",
  "app.html",
  "icon.png"
];

self.addEventListener("install", (e) => {
  const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL));

  e.waitUntil(cacheStatic);
});
self.addEventListener("fetch", (e) => {
  console.log('se capto el evento fetch', e)
  e.respondWith(
    fetch(e.request).catch(() => {
      return new Response(JSON.stringify({ error: 'No internet connection' }), {
        headers: { 'Content-Type': 'application/json' }
      })
    })
  )
})
self.addEventListener("push", (e) => {
  console.log('se capto el evento push', e)
  console.log(e.result)

})
self.addEventListener("sync", async (e) => {
  console.log('evento sync')
  if(e.tag === 'post-send'){
    alertarSync()
    console.log('ejecuto la funcion que necesito')
  }
})
