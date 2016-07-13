import React from 'react'
import gql from 'graphql-tag'
import { connect } from 'react-apollo'
import { addCount } from '../store/actions'
import { Link } from 'react-router'

function RemoteCounter({ data, addCount, mutations }) {
  if (data.loading) {
    return (
      <div>
        Loading...
      </div>
    )
  } else {
    return (
      <div>
        <div>
          Current count is {data.count.amount}. This is being stored server-side in the database and using Apollo to update.
        </div>
        <button onClick={async () => {
          // This is temporary until https://github.com/apollostack/react-apollo/issues/93 is done
          let mutationResult = await mutations.addCount(1)
          if (mutationResult)
            data.refetch()
        }}>
          Click to increase count
        </button>
        <br />
        <button onClick={async () => {
          // This is temporary until https://github.com/apollostack/react-apollo/issues/93 is done
          let mutationResult = await mutations.induceError()
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
}

RemoteCounter.propTypes = {
  data: React.PropTypes.object.isRequired,
  addCount: React.PropTypes.object.isRequired,
  mutations: React.PropTypes.object.isRequired
}

const mapQueriesToProps = () => ({
  data: {
    query: gql`
      {
        count {
          amount
        }
      }
    `,
    forcFetch: true
  }
})


const mapMutationsToProps = () => ({
  addCount: (amount) => ({
    mutation: gql`
      mutation addCount(
        $amount: Int!
      ) {
        addCount(amount: $amount) {
          amount
        }
      }
    `,
    variables: {
      amount
    }
  }),
  induceError: () => ({
    mutation: gql`
      mutation induceError {
        induceError
      }
    `
  })
})

export default connect({
  mapQueriesToProps,
  mapMutationsToProps
})(RemoteCounter)
