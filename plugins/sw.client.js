export default (context) => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const worker of registrations) {
        console.log('Service worker desde el client:', worker)
      }
    });
    navigator.serviceWorker.addEventListener('message', async (event) => {
      const workbox = await window.$workbox

      if (workbox) {
        console.log('existe workbox window', workbox)
      }
      // const bgSyncQueue = new window.$workbox.backgroundSync.Queue('myQueueName');
      // const requests = await bgSyncQueue.getAll();
      // console.log(requests, 'requests de backgroundSync')

      console.log('Mensaje recibido desde el Service Worker:', event.data);
      context.store.commit('SET_POST_SUCCESS', true);
      // context.store.dispatch('syncPost');
      setTimeout(() => {
        context.store.commit('SET_POST_SUCCESS', false);
      }, "5000");
    });
  }
}
