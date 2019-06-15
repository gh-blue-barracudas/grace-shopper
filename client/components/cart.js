import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteProd, editProdQuant, getCart} from '../store/cart'
import Button from '@material-ui/core/Button'
// import {EmptyCart} from './emptycart'

class Cart extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleCheckoutClick = this.handleCheckoutClick.bind(this)
  }
  componentDidMount() {
    this.props.getCart()
  }
  handleCheckoutClick() {
    this.props.history.push('/checkout')
  }
  handleClick(id, cartItem) {
    this.props.deleteProd(id, cartItem)
  }
  render() {
    if (this.props.cart[0]) {
      const cart = this.props.cart[0].products
      return (
        <div>
          <h3>Cart</h3>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Modify</th>
                  <th />
                </tr>
                {cart.map(cartItem => (
                  <tr key={cartItem.id}>
                    <td>{cartItem.productName}</td>
                    <td>{cartItem.price}</td>
                    <td>{cartItem.orderPrd.quantity}</td>
                    <td>
                      <select>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </td>
                    <td>
                      <img
                        src="https://cdn4.iconfinder.com/data/icons/epic-outlines/30/660989-delete_button-128.png"
                        onClick={() =>
                          this.handleClick(this.props.id, cartItem.id)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
              style={{
                opacity: '50%',
                backgroundColor: '#fff2ab',
                marginTop: '20px',
                width: '15vw'
              }}
              onClick={this.handleCheckoutClick}
            >
              Checkout
            </Button>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h1>No Cart</h1>
        </div>
      )
    }
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
    dispatch(editProdQuant(cartId, prodId, quantity)),
  getCart: () => dispatch(getCart())
})

const ConnectedCart = connect(mapStateProps, mapDispatchToProps)(Cart)

export default ConnectedCart
