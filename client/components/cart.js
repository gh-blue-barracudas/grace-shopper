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
    this.handleEditQuantity = this.handleEditQuantity.bind(this)
  }
  componentDidMount() {
    this.props.getCart()
  }
  handleCheckoutClick() {
    this.props.history.push('/checkout')
  }
  handleEditQuantity(cartId, prodId, quantityEvt) {
    this.props.editProdQuant(cartId, prodId, quantityEvt)
  }
  handleClick(cartId, prodId) {
    this.props.deleteProd(cartId, prodId)
  }
  render() {
    //console.log('CART: ', this.props.cart[0])
    console.log('MY CART: ', this.props.cart[0])
    if (this.props.cart[0]) {
      const cart = this.props.cart[0].products
      return (
        <div className="cart">
          <div className="cartName">
            <h1>SHOPPING CART</h1>
          </div>
          <div className="orderContainer">
            <table className="orderTable">
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>MODIFY</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {cart.map(cartItem => (
                  <tr key={cartItem.id}>
                    <td>{cartItem.productName}</td>
                    <td>${cartItem.price}</td>
                    <td>{cartItem.orderPrd.quantity}</td>
                    <td>
                      <select
                        onChange={() =>
                          this.handleEditQuantity(
                            this.props.id,
                            cartItem.id,
                            event.target.value
                          )
                        }
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </td>
                    <td>
                      <img
                        src="https://img.icons8.com/plasticine/2x/cancel.png"
                        onClick={() =>
                          this.handleClick(this.props.id, cartItem.id)
                        }
                        className="deleteIcon"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="total">
              <p>TOTAL: ${this.props.total}.00</p>
            </div>
            <div className="checkout">
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
    total: state.cart.total,
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
