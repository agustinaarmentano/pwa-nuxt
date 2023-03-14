import services from "../services/service.js"

export default ({$config}, inject) => {
  const allMethods = {
    ...services($config),
  }
  const methods = Object.keys(allMethods)
  methods.forEach((method) => {
    inject(method, allMethods[method])
  })
}
