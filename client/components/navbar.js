import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar'

const Navbar = ({handleClick, isLoggedIn}) => (
  <AppBar position="static" color="default">
    <div className="nav_bar_parent">
      <div className="nav_bar_logo">
        <Link to="/">
          <div>
            <img className="navImg" src="https://i.imgur.com/LGuTXqS.png" />
          </div>
        </Link>
      </div>
      <div className="nav_bar_items">
        {isLoggedIn ? (
          <div className="nav_bar_item">
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              logout
            </a>
          </div>
        ) : (
          <div className="nav_bar_item">
            {/* The navbar will show these links before you log in */}
            <Link to="/login">
              {' '}
              <div className="nav_bar_child">login </div>
            </Link>
            <Link to="/signup">
              {' '}
              <div className="nav_bar_child">sign up </div>
            </Link>
            <Link to="/cart">
              <div className="nav_bar_child">cart </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  </AppBar>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
