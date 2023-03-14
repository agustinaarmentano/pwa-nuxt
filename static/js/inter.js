function alertarSync() {
  console.log('hubo un sync')
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage('¡Hola desde el Service Worker!');
    });
  });
}
