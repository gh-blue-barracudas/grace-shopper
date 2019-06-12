import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteProd, editProdQuant} from '../store/cart'

class Cart extends Component {
  componentDidMount() {
    // this.props.THUNKPLACEHOLDER
  }
  render() {
    return this.props.cart ? <div>Cart</div> : <div>no product</div>
  }
}

const mapStateProps = state => {
  return {
    id: state.cart.id,
    cart: state.cart.cart
  }
}

const mapDispatchToProps = dispatch => ({
  deleteProd: (cartId, prodId) => dispatch(deleteProd(cartId, prodId)),
  editProdQuant: (cartId, prodId, quantity) =>
    dispatch(editProdQuant(cartId, prodId, quantity))
})

const ConnectedCart = connect(mapStateProps, mapDispatchToProps)(Cart)

export default ConnectedCart
