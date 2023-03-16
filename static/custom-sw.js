importScripts('./js/inter.js');

const STATIC_CACHE = "my-cache";

const APP_SHELL = [
  "/",
  "index.html",
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
})
self.addEventListener("push", (e) => {
  console.log('se capto el evento push', e)
  console.log(e.result)

})
self.addEventListener("sync", async (e) => {
  if(e.tag === 'post-send'){
    alertarSync()
  }
})
