import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client'
import log from '../log'

const networkInterface = createBatchingNetworkInterface({
  uri: '/graphql',
  batchInterval: 10
})

// Sample error handling middleware
networkInterface.useAfter([{
  applyAfterware({ response }, next) {
    if (response.errors) {
      if (typeof window !== 'undefined') {
        log.error(JSON.stringify(response.errors))
        alert(`There was an error in your GraphQL request: ${response.errors[0].message}`)
      }
    }
    next()
  }
}])

const ApolloClientSingleton = new ApolloClient({
  networkInterface,
  shouldBatch: true,
  dataIdFromObject: obj => obj.id
})
export default ApolloClientSingleton
