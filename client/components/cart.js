import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteProd, editProdQuant, cartProd} from '../store/cart'
import {EmptyCart} from './emptycart'

class Cart extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id)
    this.props.cartProd(this.props.match.params.id)
  }
  render() {
    const cart = this.props.cart
    console.log('this is the cart', this.props)
    return this.props.cart ? (
      <div>
        <h3>Cart</h3>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Qty</th>
                <th>T</th>
              </tr>
              {cart.map(cartItem => (
                <tr key={cartItem.id}>
                  <td>{cartItem.products.productName}</td>
                  <td>{cartItem.products.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <div>No Cart</div>
    )
  }
}

const mapStateProps = state => {
  return {
    id: state.cart.id,
    cart: state.cart.cart,
    selectedProduct: state.product.selectedProduct
  }
}

const mapDispatchToProps = dispatch => ({
  cartProd: cart => dispatch(cartProd(cart)),
  deleteProd: (cartId, prodId) => dispatch(deleteProd(cartId, prodId)),
  editProdQuant: (cartId, prodId, quantity) =>
    dispatch(editProdQuant(cartId, prodId, quantity))
})

const ConnectedCart = connect(mapStateProps, mapDispatchToProps)(Cart)

export default ConnectedCart
