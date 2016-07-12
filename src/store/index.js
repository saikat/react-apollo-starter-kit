import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import ReduxThunk from 'redux-thunk'
import ApolloClient from 'apollo-client'
import * as reducers from './reducers'

export default class Store {
  static apolloClient = new ApolloClient()

  constructor(history, initialState = {}) {
    const reducer = combineReducers({
      ...reducers,
      apollo: Store.apolloClient.reducer(),
      routing: routerReducer
    })

    this.data = createStore(
      reducer,
      initialState,
      compose(
        applyMiddleware(
          routerMiddleware(history),
          Store.apolloClient.middleware(),
          ReduxThunk.withExtraArgument(Store.apolloClient)
        ),
         typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
      )
    )
  }
}
