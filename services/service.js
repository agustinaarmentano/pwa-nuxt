
const registerBackgroundSync = () => {
  navigator.serviceWorker.ready
  .then(swRegistration => swRegistration.sync.register("post-send"))
  .catch(err => console.log(err))
}

export default (context) => ({
  get() {
    return fetch('https://jsonplaceholder.typicode.com/posts/')
    .then(response => response.json())
    .then(data => data);
  },
  post(data) {
    const local = localStorage.getItem('AccessToken');
    let body = (!data && local) ? local : data
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(async (response) => {
        if(local) localStorage.removeItem('POST_PENDING');
        this.$store.commit('SET_POST_SUCCESS', true);
        setTimeout(() => {
          this.$store.commit('SET_POST_SUCCESS', false);
        }, "4000");
        const data = await response.json()
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
        localStorage.setItem('POST_PENDING', data);
        registerBackgroundSync();
      });
  }
})
