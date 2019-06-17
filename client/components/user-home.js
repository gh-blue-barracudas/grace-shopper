import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */

const UserHome = props => {
  const {email, firstName, lastName} = props

  return (
    <div>
      <h3>
        Welcome, {firstName} {lastName}
      </h3>
      <h4>Email: {email}</h4>
      <Link to="/orderHistory">
        <Button
          style={{
            opacity: '50%',
            backgroundColor: '#fff2ab',
            marginTop: '20px',
            width: '15vw'
          }}
        >
          Order History
        </Button>
      </Link>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
