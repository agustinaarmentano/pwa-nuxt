export default (context) => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const worker of registrations) {
        console.log('Service worker desde el client:', worker)
      }
    });
    navigator.serviceWorker.addEventListener('message', event => {
      console.log('Mensaje recibido desde el Service Worker:', event.data);
      context.store.commit('SET_SYNC', true);
      setTimeout(() => {
        context.store.commit('SET_SYNC', false);
      }, "5000");
    });
  }
}
