import React, {Component} from 'react'
import {connect} from 'react-redux'

class Checkout extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(evt) {
    evt.preventDefault()
  }
  render() {
    return (
      <div className="checkout">
        <h1>CHECK OUT</h1>
        <form onSubmit={this.handleSubmit} name="checkout">
          <div className="billing">
            <h3>BILLING</h3>
            <div>
              <input name="name" type="text" placeholder="NAME" />
            </div>
            <div>
              <input name="address1" type="text" placeholder="ADDRESS 1" />
            </div>
            <div>
              <input name="address2" type="text" placeholder="ADDRESS 2" />
            </div>
            <div>
              <div>
                <input name="city" type="text" placeholder="CITY" />
              </div>
              <div>
                <select>
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
                name="zip"
                type="text"
                inputMode="numeric"
                pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"
                placeholder="ZIP CODE"
              />
            </div>
            <div>
              <input
                name="cardNumber"
                type="text"
                inputMode="numeric"
                pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"
                placeholder="CREDIT CARD NUMBER"
              />
            </div>
            <select>
              <option value="" disabled selected>
                EXP MONTH
              </option>
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
                  name="expYear"
                  type="text"
                  inputMode="numeric"
                  placeholder="EXP YEAR"
                />
              </div>
              <div>
                <input
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
              <input name="address1" type="text" placeholder="ADDRESS 1" />
            </div>
            <div>
              <input name="address2" type="text" placeholder="ADDRESS 2" />
            </div>
            <div>
              <div>
                <input name="city" type="text" placeholder="CITY" />
              </div>
              <div>
                <select>
                  <option value="" disabled selected>
                    STATE
                  </option>
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
                name="zip"
                type="text"
                inputMode="numeric"
                pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"
                placeholder="ZIP CODE"
              />
            </div>
          </div>
        </form>
        <div>
          <h3>ORDER REVIEW</h3>
          <div>Placeholder product here!</div>
        </div>
      </div>
    )
  }
}

const mapStateProps = state => {
  return {
    //
  }
}

const mapDispatchToProps = dispatch => ({
  //
})

export default connect(mapStateProps, mapDispatchToProps)(Checkout)
