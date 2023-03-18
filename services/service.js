
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
  post(datos) {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(async (response) => {
        localStorage.removeItem('postPending')
        this.$store.commit('SET_POST_SUCCESS', true);
        const data = await response.json()
        setTimeout(() => {
          this.$store.commit('SET_POST_SUCCESS', false);
        }, "4000");
        console.log(data)
      })
      .catch(async (err) => {
        console.log(err);
        registerBackgroundSync();
      });
  },
  postSync(body){
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(async (response) => {
      localStorage.removeItem('postPending');
      const data = await response.json();
      console.log(data);
    })
    .catch(async (err) => {
      console.log(err);
    });
  },
  getImage(){
    return fetch('https://patio.dev.cintelink.com.ar/back/images', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      const datos = data.map(item => {
        const buffer = Buffer.from(item.image.data)
        return {
          type: item.image.contentType,
          data: buffer
        }
      })
      return datos
    });
  },
  postImage(formData){
    return fetch('https://patio.dev.cintelink.com.ar/back/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData,
    })
    .then(async (response) => {
      const data = await response.json();
      console.log(data);
    })
    .catch(async (err) => {
      console.log(err);
    });
  }
})
