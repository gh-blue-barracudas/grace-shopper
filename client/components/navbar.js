import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}, props) => (
  <div className="nav_bar_parent">
    <div className="nav_bar_logo">
      <Link to="/">
        <div>
          <img src="https://i.imgur.com/LGuTXqS.png" />
        </div>
      </Link>
    </div>
    <div className="nav_bar_items">
      {isLoggedIn ? (
        <div className="nav_bar_item">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="nav_bar_item">
          {/* The navbar will show these links before you log in */}
          <div className="nav_bar_child">
            <Link to="/login">
              <a>Login</a>
            </Link>
          </div>
          <div className="nav_bar_child">
            <Link to="/signup">
              <a>Sign Up</a>
            </Link>
          </div>
          <div className="nav_bar_child">
            <Link to="/cart">
              <button type="submit">
                <img
                  className="nav_bar_cart_image"
                  src="https://i.imgur.com/QLgfrML.png"
                />
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: !!state.user.id,
  cart: state.cart.cart
})

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
