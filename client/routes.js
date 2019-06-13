import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  Checkout,
  Home,
  AllProducts,
  SingleProduct,
  ConnectedCart,
  OrderConfirm,
  NotFound,
  AboutUs
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div className="routes_parent">
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={AllProducts} />
          <Route path="/products/:id" component={SingleProduct} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/products/:id/cart" component={ConnectedCart} />
          <Route path="/cart" component={ConnectedCart} />
          <Route path="/complete" component={OrderConfirm} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/about" component={AboutUs} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in - should later add user profile page and order history here */}
            </Switch>
          )}
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
