import React from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../store/product'
import {Link} from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    const products = this.props.products
    return (
      <div className="product_parent">
        {products.map(product => (
          <Card key={product.id} className="product_card">
            <Link to={`/products/${product.id}`}>
              <CardMedia
                component="img"
                alt={`${product.productName}`}
                height="auto"
                image={`${product.imageUrl}`}
                title={`${product.productName}`}
                className="product_card"
              />
              {/* <Link to={`/products/${product.id}`}>
                <img className="product_image" src={product.imageUrl} />
              </Link> */}
            </Link>
            <Button color="secondary" className="product_btn">
              <Link to={`/products/${product.id}`}>{product.productName}</Link>
            </Button>
          </Card>
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
