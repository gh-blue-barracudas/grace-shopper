import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSelectedProduct} from '../store/product'
import {addProd, createCart} from '../store/cart'

class SingleProduct extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getSelectedProduct(this.props.match.params.id)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    console.log('the button is working!')
    try {
      const cart = this.props.cart
      const product = this.props.selectedProduct
      if (cart.id) {
        this.props.addProd(cart.id, product.id)
      } else {
        this.props.createCart()
        this.props.addProd(cart.id, product.id)
      }
    } catch (error) {
      console.error(error)
    }
  }
  render() {
    return this.props.selectedProduct ? (
      <div>
        <img src={this.props.selectedProduct.imageUrl} />
        <div>
          <h1>{this.props.selectedProduct.productName}</h1>
          <h2>{this.props.selectedProduct.price}</h2>
          <p>{this.props.selectedProduct.description}</p>
          <button onSubmit={this.handleSubmit} type="submit">
            Add to Cart
          </button>
        </div>
      </div>
    ) : (
      <div>
        <h1>Prop did not load</h1>
      </div>
    )
  }
}

const mapStateProps = state => {
  return {
    cart: state.cart.cart,
    selectedProduct: state.product.selectedProduct
  }
}

const mapDispatchToProps = dispatch => ({
  createCart: () => dispatch(createCart()),
  addProd: (cartId, prodId) => dispatch(addProd(cartId, prodId)),
  getSelectedProduct: selProduct => dispatch(getSelectedProduct(selProduct))
})

export default connect(mapStateProps, mapDispatchToProps)(SingleProduct)
