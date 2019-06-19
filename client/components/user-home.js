import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'
import {Link} from 'react-router-dom'
import {updateUserThunk} from '../store/user'

/**
 * COMPONENT
 */

export class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editStatus: false,
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleClick() {
    let currentEditState = this.state.editStatus
    this.setState({editStatus: !currentEditState})
  }
  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    })
  }
  async handleSubmit(evt) {
    evt.preventDefault()
    this.props.updateUserThunk({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    })
    await this.setState({
      editStatus: false,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email
    })
  }
  render() {
    const {email, firstName, lastName} = this.props

    return (
      <div className="userHome">
        <div id="userHomeInfo">
          <h1>Welcome, Dreamer </h1>
          <h2>Account Information</h2>
          <Fab aria-label="Edit" onClick={this.handleClick}>
            <Icon>edit_icon</Icon>
          </Fab>

          {this.state.editStatus ? (
            <div>
              <form onSubmit={this.handleSubmit}>
                <div className="field_parent">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    required
                    title="First Name Required"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field_parent">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    required
                    title="Last Name Required"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field_parent">
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    type="text"
                    required
                    title="E-mail Required"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
                <div id="auth_button_error_parent">
                  <div id="user_button">
                    <button type="submit">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h3>
                Name: {firstName} {lastName}
              </h3>
              <h3>Email: {email}</h3>
            </div>
          )}
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
        {/* <img src="https://www.success.com/wp-content/uploads/legacy/sites/default/files/main/articles/inspiringquotesaboutbeingadreamer.jpg" /> */}
      </div>
    )
  }
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

const mapDispatchToProps = dispatch => ({
  updateUserThunk: userInfo => dispatch(updateUserThunk(userInfo))
})

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

export default connect(mapState, mapDispatchToProps)(UserHome)
