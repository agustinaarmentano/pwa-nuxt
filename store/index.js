export const state = () => ({
  post_success: false,
  sync: false
})

export const mutations = {
  SET_POST_SUCCESS (state, data) {
    state.post_success = data
  },
  SET_SYNC (state, data) {
    state.sync = data
  }
}
