export const schema = `
  type Count {
    amount: Int!
  }
`

export const resolvers = {
  Count: {
    amount: (count) => count
  }
}
