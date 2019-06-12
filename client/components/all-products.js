import React from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../store/product'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    const products = this.props.products
    return (
      <div>
        {products.map(product => (
          <div key={product.id}>
            <h1>{product.productName}</h1>
            <h2>{product.description}</h2>
            <h3>{product.price}</h3>
            <img src={product.imageUrl} />
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.product.products
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
