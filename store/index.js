export const state = () => ({
  post_success: false,
  post_loading: false,
  post_pending: '',
  sync: false
})

export const mutations = {
  SET_POST_SUCCESS (state, data) {
    state.post_success = data
  },
  SET_POST_LOADING (state, data) {
    state.post_loading = data
  },
  SET_DATA_PENDING (state, data) {
    state.post_pending = data
  },
  SET_SYNC (state, data) {
    state.sync = data
  }
}

export const actions = {
  syncPost({ commit }){
    const datos = localStorage.getItem('postPending');
    const datosParceados = JSON.parse(datos);
    this.$postSync(datosParceados)
    .then(() => {
      commit('SET_POST_SUCCESS', true);
      setTimeout(() => {
        commit('SET_POST_SUCCESS', false);
      }, "4000");
      console.log('peticion ok')
    })
  }
}
