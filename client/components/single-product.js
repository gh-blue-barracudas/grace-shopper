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
  async handleSubmit(evt) {
    evt.preventDefault()
    try {
      const id = this.props.id
      const product = this.props.selectedProduct
      if (id) {
        this.props.addProd(id, product.id)
        console.log(this.props)
      } else {
        await this.props.createCart()
        this.props.addProd(this.props.id, product.id)
      }
    } catch (error) {
      console.error(error)
    }
  }
  render() {
    return this.props.selectedProduct ? (
      <div className="selected_product_parent">
        <img src={this.props.selectedProduct.imageUrl} />
        <div>
          <h1>{this.props.selectedProduct.productName}</h1>
          <h2>{this.props.selectedProduct.price}</h2>
          <p>{this.props.selectedProduct.description}</p>
          <button onClick={this.handleSubmit} type="submit">
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
    id: state.cart.id,
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
