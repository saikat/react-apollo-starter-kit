import 'babel-polyfill'
import bodyParser from 'body-parser'
import express from 'express'
import log from './log'
import appRenderer from './middleware/app-renderer'
import { apolloServer } from 'apollo-server'
import { schema, resolvers } from './api/schema'
import mocks from './api/mocks'

process.on('uncaughtException', (ex) => {
  log.error(ex)
  process.exit(1)
})

const app = express()
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : process.env.EXPRESS_PORT
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

app.use('/graphql', apolloServer(() => ({
  graphiql: true,
  pretty: true,
  schema,
  mocks,
  resolvers,
  allowUndefinedInResolve: false
})))
// This middleware should be last. Return the React app only if no other route is hit.
app.use(appRenderer)
app.listen(port, () => {
  log.info(`Node app is running on port ${port}`)
})
