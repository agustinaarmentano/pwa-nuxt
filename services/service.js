
const registerBackgroundSync = () => {
  navigator.serviceWorker.ready
  .then(swRegistration => swRegistration.sync.register("my-post-queue"))
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
        }, "5000");
        console.log(data)
      })
      .catch(async (err) => {
        console.log(err);
        // registerBackgroundSync();
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
  // images
  getImage(){
    return fetch('https://patio.dev.cintelink.com.ar/back/images', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data, 'datas')
      const datos = data.map(item => {
        const buffer = Buffer.from(item.image.data)
        const blob = new Blob([buffer], { type: item.image.contentType });
        return URL.createObjectURL(blob);
      })
      return datos
    });
  },
  postImage(image){
    const formData = new FormData()
    formData.append('image_data', image)

    return fetch('https://patio.dev.cintelink.com.ar/back/images', {
      method: 'POST',
      body: formData
    })
    .then((response) => {
      // const STATIC_CACHE = "our-cache";
      // caches.open(STATIC_CACHE)
      // .then(
      //   (result)=> {
      //     result.delete('https://patio.dev.cintelink.com.ar/back/images')
      //     .then((result) => console.log('cache eliminado', result))
      //   }
      // )
    })
    .catch(error => {
      registerBackgroundSync();
      console.log(error)
    })
  }
})
