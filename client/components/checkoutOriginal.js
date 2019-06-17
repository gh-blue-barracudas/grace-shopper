import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import {completeCheckout} from '../store/cart'
import {updateUserAddressThunk} from '../store/user'

const defaultState = {
  name: '',
  billingAddress1: '',
  billingAddress2: '',
  billingCity: '',
  billingState: '',
  billingZip: '',
  shippingAddress1: '',
  shippingAddress2: '',
  shippingCity: '',
  shippingState: '',
  shippingZip: ''
}

class Checkout extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  async handleSubmit(evt) {
    evt.preventDefault()
    await this.props.completeCheckout(this.props.id)
    this.props.history.push('/complete')
    this.props.updateAddress(this.state)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    return (
      <div className="checkout">
        <h1>CHECK OUT</h1>
        <form onSubmit={this.handleSubmit} name="checkout">
          <div className="billing">
            <h3>BILLING</h3>
            <div>
              <input
                onChange={this.handleChange}
                name="name"
                type="text"
                placeholder="NAME"
              />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                name="billingAddress1"
                defaultValue={this.state.billingAddress1}
                type="text"
                placeholder="ADDRESS 1"
              />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                name="billingAddress2"
                value={this.state.billingAddress2}
                type="text"
                placeholder="ADDRESS 2"
              />
            </div>
            <div>
              <div>
                <input
                  onChange={this.handleChange}
                  name="billingCity"
                  value={this.state.billingCity}
                  type="text"
                  placeholder="CITY"
                />
              </div>
              <div>
                <select
                  defaultValue={this.state.billingState}
                  onChange={this.handleChange}
                  name="billingState"
                >
                  <option default>STATE</option>
                  <option value="AL">AL</option>
                  <option value="AK">AK</option>
                  <option value="AR">AR</option>
                  <option value="AZ">AZ</option>
                  <option value="CA">CA</option>
                  <option value="CO">CO</option>
                  <option value="CT">CT</option>
                  <option value="DC">DC</option>
                  <option value="DE">DE</option>
                  <option value="FL">FL</option>
                  <option value="GA">GA</option>
                  <option value="HI">HI</option>
                  <option value="IA">IA</option>
                  <option value="ID">ID</option>
                  <option value="IL">IL</option>
                  <option value="IN">IN</option>
                  <option value="KS">KS</option>
                  <option value="KY">KY</option>
                  <option value="LA">LA</option>
                  <option value="MA">MA</option>
                  <option value="MD">MD</option>
                  <option value="ME">ME</option>
                  <option value="MI">MI</option>
                  <option value="MN">MN</option>
                  <option value="MO">MO</option>
                  <option value="MS">MS</option>
                  <option value="MT">MT</option>
                  <option value="NC">NC</option>
                  <option value="NE">NE</option>
                  <option value="NH">NH</option>
                  <option value="NJ">NJ</option>
                  <option value="NM">NM</option>
                  <option value="NV">NV</option>
                  <option value="NY">NY</option>
                  <option value="ND">ND</option>
                  <option value="OH">OH</option>
                  <option value="OK">OK</option>
                  <option value="OR">OR</option>
                  <option value="PA">PA</option>
                  <option value="RI">RI</option>
                  <option value="SC">SC</option>
                  <option value="SD">SD</option>
                  <option value="TN">TN</option>
                  <option value="TX">TX</option>
                  <option value="UT">UT</option>
                  <option value="VT">VT</option>
                  <option value="VA">VA</option>
                  <option value="WA">WA</option>
                  <option value="WI">WI</option>
                  <option value="WV">WV</option>
                  <option value="WY">WY</option>
                </select>
              </div>
            </div>
            <div>
              <input
                onChange={this.handleChange}
                name="billingZip"
                value={this.state.billingZip}
                type="text"
                inputMode="numeric"
                // pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"
                placeholder="ZIP CODE"
              />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                name="cardNumber"
                type="text"
                inputMode="numeric"
                // pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"
                placeholder="CREDIT CARD NUMBER"
              />
            </div>
            <select
              defaultValue={this.state.expiryMonth}
              onChange={this.handleChange}
              name="expiryMonth"
            >
              <option value="January">EXP MONTH</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <div>
              <div>
                <input
                  onChange={this.handleChange}
                  name="expYear"
                  type="text"
                  inputMode="numeric"
                  placeholder="EXP YEAR"
                />
              </div>
              <div>
                <input
                  onChange={this.handleChange}
                  name="cvv"
                  type="text"
                  inputMode="numeric"
                  placeholder="CVV"
                />
              </div>
            </div>
          </div>
          <div className="shipping">
            <h3>SHIPPING</h3>
            <div>
              <input name="name" type="text" placeholder="NAME" />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                name="shippingAddress1"
                value={this.state.shippingAddress1}
                type="text"
                placeholder="ADDRESS 1"
              />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                name="shippingAddress2"
                value={this.state.shippingAddress2}
                type="text"
                placeholder="ADDRESS 2"
              />
            </div>
            <div>
              <div>
                <input
                  onChange={this.handleChange}
                  name="shippingCity"
                  type="text"
                  placeholder="CITY"
                />
              </div>
              <div>
                <select
                  onChange={this.handleChange}
                  defaultValue={this.state.shippingState}
                  name="shippingState"
                >
                  <option value="AL">STATE</option>
                  <option value="AL">AL</option>
                  <option value="AK">AK</option>
                  <option value="AR">AR</option>
                  <option value="AZ">AZ</option>
                  <option value="CA">CA</option>
                  <option value="CO">CO</option>
                  <option value="CT">CT</option>
                  <option value="DC">DC</option>
                  <option value="DE">DE</option>
                  <option value="FL">FL</option>
                  <option value="GA">GA</option>
                  <option value="HI">HI</option>
                  <option value="IA">IA</option>
                  <option value="ID">ID</option>
                  <option value="IL">IL</option>
                  <option value="IN">IN</option>
                  <option value="KS">KS</option>
                  <option value="KY">KY</option>
                  <option value="LA">LA</option>
                  <option value="MA">MA</option>
                  <option value="MD">MD</option>
                  <option value="ME">ME</option>
                  <option value="MI">MI</option>
                  <option value="MN">MN</option>
                  <option value="MO">MO</option>
                  <option value="MS">MS</option>
                  <option value="MT">MT</option>
                  <option value="NC">NC</option>
                  <option value="NE">NE</option>
                  <option value="NH">NH</option>
                  <option value="NJ">NJ</option>
                  <option value="NM">NM</option>
                  <option value="NV">NV</option>
                  <option value="NY">NY</option>
                  <option value="ND">ND</option>
                  <option value="OH">OH</option>
                  <option value="OK">OK</option>
                  <option value="OR">OR</option>
                  <option value="PA">PA</option>
                  <option value="RI">RI</option>
                  <option value="SC">SC</option>
                  <option value="SD">SD</option>
                  <option value="TN">TN</option>
                  <option value="TX">TX</option>
                  <option value="UT">UT</option>
                  <option value="VT">VT</option>
                  <option value="VA">VA</option>
                  <option value="WA">WA</option>
                  <option value="WI">WI</option>
                  <option value="WV">WV</option>
                  <option value="WY">WY</option>
                </select>
              </div>
            </div>
            <div>
              <input
                onChange={this.handleChange}
                name="shippingZip"
                value={this.state.shippingZip}
                type="text"
                inputMode="numeric"
                //regex pattern throwing error
                // pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"
                placeholder="ZIP CODE"
              />
            </div>
          </div>
        </form>
        <div>
          <h3>ORDER REVIEW</h3>
          <div>Placeholder product here!</div>
        </div>
        <Button
          style={{
            opacity: '50%',
            backgroundColor: '#fff2ab',
            marginTop: '20px',
            width: '15vw'
          }}
          onClick={this.handleSubmit}
          type="submit"
        >
          Complete Order
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  id: state.cart.id
})

const mapDispatchToProps = dispatch => ({
  updateAddress: address => dispatch(updateUserAddressThunk(address)),
  completeCheckout: cartId => dispatch(completeCheckout(cartId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
