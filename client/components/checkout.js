import React, {Component} from 'react'
import {connect} from 'react-redux'
import REACTDOM from 'react-dom'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import {getCart} from '../store/cart'

toast.configure()

function Stripe(props) {
  const [product] = React.useState({
    price: props.total
  })

  async function handleToken(token, addresses) {
    const res = await axios.post('/api/users/checkout', {
      token,
      product
    })
    console.log('COMING FROM CLIENT: ', {token, addresses})
    const {status} = res.data
    if (status === 'success') {
      toast('Success! Check emails for details', {type: 'success'})
    } else {
      toast('Something went wrong', {type: 'error'})
    }
  }
  return (
    <div className="checkout">
      <ToastContainer />
      <StripeCheckout
        stripeKey="pk_test_6fRtJpRvChRUMT0bzzpk1v2q00ygHe3DSQ"
        token={handleToken}
        billingAddress
        shippingAddress
        amount={props.total * 100}
      />
      <h1>CHECK OUT</h1>
      <div>
        <h3>ORDER REVIEW</h3>
        <div>
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
          <div>
            <p>TOTAL: ${props.total}.00</p>
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

export default connect(mapStateToProps)(Stripe)
