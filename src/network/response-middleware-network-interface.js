import { createNetworkInterface } from 'apollo-client'

class ResponseMiddlewareNetworkInterface {
  constructor(endpoint = '/graphql') {
    this.defaultNetworkInterface = createNetworkInterface(endpoint)
    this.middlewares = []
  }

  use(responseMiddleware) {
    let middlewares = responseMiddleware
    if (!Array.isArray(middlewares)) {
      middlewares = [middlewares]
    }
    middlewares.forEach((middleware) => {
      if (typeof middleware.applyMiddleware === 'function') {
        this.defaultNetworkInterface.use(middleware)
      } else if (typeof middleware.applyResponseMiddleware === 'function') {
        this.middlewares.push(middleware)
      } else {
        throw new Error('Middleware must implement the applyMiddleware or applyResponseMiddleware functions')
      }
    })
  }

  async applyResponseMiddlewares(response) {
    return new Promise((resolve) => {
      const queue = async (funcs) => {
        const next = async () => {
          if (funcs.length > 0) {
            const f = funcs.shift()
            f.applyResponseMiddleware(response, next)
          } else {
            resolve(response)
          }
        }
        next()
      }

      queue([...this.middlewares])
    })
  }

  async query(request) {
    let response = await this.defaultNetworkInterface.query(request)
    response = await this.applyResponseMiddlewares(response)
    return response
  }
}

export default ResponseMiddlewareNetworkInterface
