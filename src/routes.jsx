import { Route, IndexRedirect } from 'react-router'
import LocalCounter from './containers/LocalCounter'
import RemoteCounter from './containers/RemoteCounter'
import App from './components/App'
import React from 'react'

export default (
  <Route path='/' component={App}>
    <IndexRedirect to='/remote-counter' />
    <Route path='local-counter' component={LocalCounter} />
    <Route path='remote-counter' component={RemoteCounter} />
  </Route>
)
