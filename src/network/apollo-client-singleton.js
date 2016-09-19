import ApolloClient, { addQueryMerging } from 'apollo-client'
import ResponseMiddlewareNetworkInterface from './response-middleware-network-interface'
import log from '../log'

const responseMiddlewareNetworkInterface = new ResponseMiddlewareNetworkInterface()

// Sample error handling middleware
responseMiddlewareNetworkInterface.use({
  applyResponseMiddleware: (response, next) => {
    if (response.errors) {
      if (typeof window !== 'undefined') {
        log.error(JSON.stringify(response.errors))
        alert(`There was an error in your GraphQL request: ${response.errors[0].message}`)
      }
    }
    next()
  }
})

const networkInterface = addQueryMerging(responseMiddlewareNetworkInterface)

const ApolloClientSingleton = new ApolloClient({
  networkInterface,
  shouldBatch: true,
  dataIdFromObject: obj => obj.id
})
export default ApolloClientSingleton
