import React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { Link } from 'react-router'

function RemoteCounter({ data, addCount, induceError }) {
  if (data.loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  return (
    <div>
      <div>
        Current count is {data.count.amount}. This is being stored server-side in the database and using Apollo to update.
      </div>
      <button
        onClick={async () => {
          await addCount(1)
        }}
      >
        Click to increase count
      </button>
      <br />
      <button onClick={async () => {
        await induceError()
      }}>
        Click to induce a GraphQL error
      </button>
      <div>
        <Link to='/local-counter'>
          See a version using client-side memory
        </Link>
      </div>
    </div>
  )
}

RemoteCounter.propTypes = {
  data: React.PropTypes.object.isRequired
}

const CurrentCount = gql`
  query CurrentCount {
    count {
      id
      amount
    }
  }
`

const AddCount = gql`
  mutation AddCount($amount: Int!) {
    addCount(amount: $amount) {
      id
      amount
    }
  }
`

const InduceError = gql`
  mutation InduceError {
    induceError
  }
`

export default compose(
  graphql(CurrentCount),
  graphql(AddCount, {
    props: ({ mutate }) => ({
      addCount: (amount) => mutate({ variables: { amount } })
    })
  }),
  graphql(InduceError, {
    props: ({ mutate }) => ({
      induceError: () => mutate()
    })
  })
)(RemoteCounter)
