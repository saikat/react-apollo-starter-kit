import React from 'react'
import { connect } from 'react-redux'
import { addCount } from '../store/actions'
import { Link } from 'react-router'

function LocalCounter({ count, onAddCount }) {
  return (
    <div>
      <div>
        Current count is {count}. This is being stored client-side in src/store/reducers/count.js and using Redux action dispatchers.
      </div>
      <button onClick={() => onAddCount(1)}>
        Click to increase count
      </button>
      <div>
        <Link to='/remote-counter'>
          See a version using the database
        </Link>
      </div>
    </div>
  )
}

LocalCounter.propTypes = {
  count: React.PropTypes.number.isRequired,
  onAddCount: React.PropTypes.func.isRequired
}

const mapStateToProps = ({ count }) => ({
  count
})

const mapDispatchToProps = (dispatch) => ({
  onAddCount: (amount) => dispatch(addCount(amount))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocalCounter)
