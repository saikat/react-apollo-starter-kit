import { schema as countSchema, resolvers as countResolvers } from './count'
import Data from './data'

const rootSchema = `
  type RootQuery {
    count: Count
  }

  type RootMutation {
    addCount(amount: Int!): Count
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
    }
  }
}

export const schema = [
  rootSchema,
  countSchema
]

export const resolvers = {
  ...rootResolvers,
  ...countResolvers
}
