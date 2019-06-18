import React, {Component} from 'react'
import Button from '@material-ui/core/Button'

class OrderConfirm extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.props.history.push('/')
  }
  render() {
    return (
      <div id="orderConfirm">
        <h1>ORDER COMPLETED</h1>
        <h3>Thank you for your order!</h3>
        <Button
          style={{
            opacity: '50%',
            backgroundColor: '#fff2ab',
            marginTop: '20px',
            width: '15vw'
          }}
          onClick={this.handleClick}
        >
          Return to Homepage
        </Button>
      </div>
    )
  }
}

export default OrderConfirm
