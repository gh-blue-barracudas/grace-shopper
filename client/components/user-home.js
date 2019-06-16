import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, firstName, lastName} = props

  return (
    <div className="userHome">
      <h1>Welcome, Dreamer </h1>
      <img src="https://www.success.com/wp-content/uploads/legacy/sites/default/files/main/articles/inspiringquotesaboutbeingadreamer.jpg" />
      <h2>Account Information</h2>
      <h3>
        Name: {firstName} {lastName}
      </h3>
      <h3>Email: {email}</h3>
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
