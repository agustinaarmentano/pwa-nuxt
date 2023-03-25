importScripts('./js/inter.js');

// const STATIC_CACHE = "my-cache";

// const APP_SHELL = [
//   "/",
//   "index.html",
//   "icon.png"
// ];

if (!self.IDBKeyRange) {
  console.log('no existe IDKeyRange')
  self.IDBKeyRange = self.IDBKeyRange || self.webkitIDBKeyRange || self.msIDBKeyRange;
}

self.addEventListener("install", (e) => {
  // const cacheStatic = caches
  //   .open(STATIC_CACHE)
  //   .then((cache) => cache.addAll(APP_SHELL));

  // e.waitUntil(cacheStatic);
  console.log('se capto el evento install', e)
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
    const data = indexedDB.open('workbox-background-sync')
    data.onsuccess = function(event) {
      const db = event.target.result;
      console.log("Base de datos abierta con éxito", db);

      const transaction = db.transaction('requests', 'readonly');
      console.log(transaction, 'transaction')

      const objectStore = transaction.objectStore('requests');
      console.log(objectStore, 'objectStore')

      objectStore.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
          console.log('cursor')
          console.log(cursor.value);
          cursor.continue();
        } else {
          console.log("No hay más objetos en la base de datos");
        }
      };
    };
    alertarSync()
  }
  if(e.tag === 'post-send'){
    alertarSync()
  }
})
