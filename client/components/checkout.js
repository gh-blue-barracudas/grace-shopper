import React from 'react'
import {connect} from 'react-redux'
import REACTDOM from 'react-dom'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import '../../secrets'

import {completeCheckout} from '../store/cart'

function completeCheckoutFnc(props) {
  props.completeCheckout(props.id)
  props.history.push('/complete')
}

function Stripe(props) {
  const [product] = React.useState({
    price: props.total
  })

  async function handleToken(token, addresses) {
    await axios.post('/api/users/checkout', {
      token,
      addresses,
      product
    })
    completeCheckoutFnc(props)
  }
  return (
    <div className="cart">
      <div className="cartName">
        <h1>CHECK OUT</h1>
      </div>
      <div>
        <h3>ORDER REVIEW</h3>
        <div className="orderContainer">
          <table className="orderTable">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {props.cart.map(cartItem => (
                <tr key={cartItem.id}>
                  <td>{cartItem.productName}</td>
                  <td>${cartItem.price}</td>
                  <td>{cartItem.orderPrd.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
        </div>
      </div>
      <div className="total_parent">
        <div>
          <p>TOTAL: ${props.total}.00</p>
          <div>
            <StripeCheckout
              name="Grace Shopper"
              image="https://i.imgur.com/4gYfWAx.png"
              stripeKey={process.env.STRIPE_PUB}
              token={handleToken}
              billingAddress
              shippingAddress
              amount={props.total * 100}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  id: state.cart.id,
  cart: state.cart.cart,
  total: state.cart.total
})

const mapDispatchToProps = dispatch => ({
  completeCheckout: cartId => dispatch(completeCheckout(cartId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Stripe)
