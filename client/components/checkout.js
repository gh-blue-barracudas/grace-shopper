import React, {Component} from 'react'
import {connect} from 'react-redux'
import REACTDOM from 'react-dom'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {toast} from 'react-toastify'

toast.configure()

function Stripe() {
  const [product] = React.useState({
    name: 'Tesla Roadster',
    price: 68.67
  })

  async function handleToken(token, addresses) {
    const res = await axios.post('/api/users/checkout', {
      token,
      product
    })
    console.log(res)
    const {status} = res.data
    if (status === 'success') {
      toast('Success! Check emails for details', {type: 'success'})
    } else {
      toast('Something went wrong', {type: 'error'})
    }
  }
  return (
    <div className="checkout">
      <StripeCheckout
        stripeKey="pk_test_6fRtJpRvChRUMT0bzzpk1v2q00ygHe3DSQ"
        token={handleToken}
        billingAddress
        shippingAddress
        amount={product.price * 100}
        name={product.name}
      />
      <h1>CHECK OUT</h1>
      <div>
        <h3>ORDER REVIEW</h3>
        <div>Placeholder product here!</div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  id: state.cart.id
})

export default connect(mapStateToProps)(Stripe)
