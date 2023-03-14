export const state = () => ({
  post_success: false,
})

export const mutations = {
  SET_POST_SUCCESS (state, data) {
    state.post_success = data
  }
}
