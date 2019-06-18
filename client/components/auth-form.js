import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="auth_form_parent">
      <form id="auth_form" onSubmit={handleSubmit} name={name}>
        {props.name === 'signup' && (
          <div>
            <div className="field_parent" id="nameLabel">
              <label htmlFor="firstName">First Name</label>
              <input
                name="firstName"
                type="text"
                required
                title="First Name Required"
              />
            </div>
            <div className="field_parent">
              <label htmlFor="lastName">Last Name</label>
              <input
                name="lastName"
                type="text"
                required
                title="Last Name Required"
              />
            </div>
          </div>
        )}
        <div className="field_parent">
          <label htmlFor="email">Email</label>
          <input name="email" type="text" required title="E-mail Required" />
        </div>
        <div className="field_parent">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            pattern=".{8,}"
            required
            title="Password required, min 8 characters"
          />
        </div>
        <div id="auth_button_error_parent">
          <div id="auth_button">
            <button type="submit">{displayName}</button>
          </div>
          {error &&
            error.response && (
              <div id="auth_error"> {error.response.data} </div>
            )}
        </div>
      </form>
      <div id="auth_Google">
        <a href="/auth/google">
          {displayName} with
          <img id="googleImg" src="https://i.imgur.com/TbBFjBO.png" />
        </a>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'sign up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (formName === 'signup') {
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        dispatch(auth(email, password, formName, firstName, lastName))
      } else {
        dispatch(auth(email, password, formName))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
