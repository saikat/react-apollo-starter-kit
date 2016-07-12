import { schema as countSchema, resolvers as countResolvers } from './count'
import Data from './data'

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
      throw new Error('Error message')
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
