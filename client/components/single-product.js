import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSelectedProduct} from '../store/product'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getSelectedProduct(this.props.match.params.id)
  }
  render() {
    return this.props.selectedProduct ? (
      <div>
        <img src={this.props.selectedProduct.imageUrl} />
        <div>
          <h1>{this.props.selectedProduct.productName}</h1>
          <h2>{this.props.selectedProduct.price}</h2>
          <p>{this.props.selectedProduct.description}</p>
          <button type="submit">Add to Cart</button>
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
    selectedProduct: state.product.selectedProduct
  }
}

const mapDispatchToProps = dispatch => ({
  getSelectedProduct: selProduct => dispatch(getSelectedProduct(selProduct))
})

export default connect(mapStateProps, mapDispatchToProps)(SingleProduct)
