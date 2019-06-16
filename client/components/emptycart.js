import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'

class EmptyCart extends Component {
  constructor() {
    super()
    this.handleBrowseClick = this.handleBrowseClick.bind(this)
  }
  handleBrowseClick() {
    this.props.history.push('/products')
  }
  render() {
    return (
      <div className="cart">
        <div className="cartName">
          <h1>SHOPPING CART</h1>
        </div>
        <div>
          <img
            className="imgEmptyCart"
            src="https://png.pngtree.com/svg/20170913/bacb8f1c9c.svg"
          />
          <p className="pEmptyCart">Please add something to your cart first.</p>
          <div>
            <Link to="/products">
              <Button
                style={{
                  opacity: '50%',
                  backgroundColor: '#fff2ab',
                  marginTop: '20px',
                  width: '15vw'
                }}
              >
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default EmptyCart
