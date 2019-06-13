import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteProd, editProdQuant} from '../store/cart'

class Cart extends Component {
  componentDidMount() {
    // this.props.THUNKPLACEHOLDER
  }
  render() {
    const cart = this.props.cart
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
                  <td>{cartItem.productName}</td>
                  <td>{cartItem.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <div>
        <h1>No Products to Show</h1>
      </div>
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
  deleteProd: (cartId, prodId) => dispatch(deleteProd(cartId, prodId)),
  editProdQuant: (cartId, prodId, quantity) =>
    dispatch(editProdQuant(cartId, prodId, quantity))
})

const ConnectedCart = connect(mapStateProps, mapDispatchToProps)(Cart)

export default ConnectedCart
