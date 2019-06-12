import React from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../store/product'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
    console.log(this.props.products)
  }
  render() {
    const products = this.props.products
    return (
      <div className="product_parent">
        {products.map(product => (
          <div key={product.id}>
            <div>
              <Link to={`/products/${product.id}`}>
                <img className="product_image" src={product.imageUrl} />
              </Link>
            </div>
            <div className="product_info">
              <Link to={`/products/${product.id}`}>
                <h3>{product.productName}</h3>
              </Link>
              <h3>{product.price}</h3>
            </div>
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
