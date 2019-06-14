import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSelectedProduct} from '../store/product'
import {addProd, createCart} from '../store/cart'
import Button from '@material-ui/core/Button'

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
      } else {
        await this.props.createCart()
        this.props.addProd(this.props.id, product.id)
      }
      this.props.history.push('/cart')
    } catch (error) {
      console.error(error)
    }
  }
  render() {
    return this.props.selectedProduct ? (
      <div id="selected_product_parent">
        <img id="selImage" src={this.props.selectedProduct.imageUrl} />
        <div id="sel_info">
          <h1>{this.props.selectedProduct.productName}</h1>
          <h2>${this.props.selectedProduct.price}</h2>
          <p>{this.props.selectedProduct.description}</p>
          <Button
            style={{
              opacity: '50%',
              backgroundColor: '#fff2ab',
              'margin-top': '20px'
            }}
            className="sel_prod_btn"
            onClick={this.handleSubmit}
          >
            Add to Cart
          </Button>
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
