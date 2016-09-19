import { schema as countSchema, resolvers as countResolvers } from './count'
import Data from './data'
import { makeExecutableSchema } from 'graphql-tools'

const rootSchema = `
  type RootQuery {
    count: Count
  }

  type RootMutation {
    addCount(amount: Int!): Count
    induceError: String
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`

const rootResolvers = {
  RootQuery: {
    count: () => Data.count
  },
  RootMutation: {
    addCount(_, { amount }) {
      Data.count += amount
      return Data.count
    },
    induceError() {
      throw new Error('Custom error message')
    }
  }
}

const schema = [
  rootSchema,
  countSchema
]

const resolvers = {
  ...rootResolvers,
  ...countResolvers
}

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
})

export default executableSchema
