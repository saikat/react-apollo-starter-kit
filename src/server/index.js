import 'babel-polyfill'
import bodyParser from 'body-parser'
import express from 'express'
import log from '../log'
import appRenderer from './middleware/app-renderer'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import schema from './api/schema'
import mocks from './api/mocks'

process.on('uncaughtException', (ex) => {
  log.error(ex)
  process.exit(1)
})

const app = express()
// Heroku requires you to use process.env.PORT
const port = process.env.DEV_APP_PORT || process.env.PORT
// Don't rate limit heroku
app.enable('trust proxy')

// Parse bodies as JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// In development, we use webpack server
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(process.env.PUBLIC_DIR, {
    maxAge: '180 days'
  }))
}

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

app.use('/graphql', graphqlExpress({
  graphiql: true,
  pretty: true,
  schema,
  mocks,
  allowUndefinedInResolve: false
}))
// This middleware should be last. Return the React app only if no other route is hit.
app.use(appRenderer)
app.listen(port, () => {
  log.info(`Node app is running on port ${port}`)
})
