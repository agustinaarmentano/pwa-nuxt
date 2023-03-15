export const state = () => ({
  post_success: false,
  post_loading: false,
  sync: false
})

export const mutations = {
  SET_POST_SUCCESS (state, data) {
    state.post_success = data
  },
  SET_POST_LOADING (state, data) {
    state.post_loading = data
  },
  SET_SYNC (state, data) {
    state.sync = data
  }
}
