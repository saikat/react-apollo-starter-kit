export const schema = `
  type Count {
    id: String
    amount: Int
  }
`

export const resolvers = {
  Count: {
    id: () => 'count_identifier',
    amount: (count) => count
  }
}
