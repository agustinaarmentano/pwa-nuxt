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
  if(e.tag === 'my-post-queue'){
    // const queue = self.workbox.backgroundSync.getQueue('myQueueName');
    // console.log('my queueses', queue)
    // const failedRequests = await queue.getAll();
    // console.log(failedRequests, 'failed queseses')
    console.log('evento sync con el tag de my-sync-image-post')
    alertarSync()
  }
  if(e.tag === 'post-send'){
    alertarSync()
  }
})
