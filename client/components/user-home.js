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
    <div className="userHome">
      <h1>Welcome, Dreamer </h1>
      <img src="https://www.success.com/wp-content/uploads/legacy/sites/default/files/main/articles/inspiringquotesaboutbeingadreamer.jpg" />
      <h2>Account Information</h2>
      {firstName ? (
        <h3>
          Hello {firstName} {lastName}
        </h3>
      ) : (
        <h3>Hello!</h3>
      )}
      <h3>Email: {email}</h3>
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
