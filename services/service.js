
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
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(async (response) => {
        console.log(context, 'context')
        console.log(this.$store, 'store')
        this.$store.commit('SET_POST_SUCCESS', true);
        setTimeout(() => {
          this.$store.commit('SET_POST_SUCCESS', false);
        }, "4000");
        const data = await response.json()
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
        registerBackgroundSync();
      });
  }
})
