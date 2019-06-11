import React, {Component} from 'react'
import {connect} from 'react-redux'
// import { THUNK PLACEHOLDERS } from 'PRODUCT REDUCER';
// import Nav from './Nav';
// import Loading from './loading';

class SingleProduct extends Component {
  componentDidMount() {
    // this.props.THUNKPLACEHOLDER(this.props.match.params.studentId);
  }
  render() {
    return !this.props.loading ? (
      <div>
        {/* <Nav /> PLACEHOLDER */}
        {this.props.selProduct.id ? (
          <div>
            <img src={`${this.props.selProduct.imageUrl}`} />
            <div>
              <h1>{this.props.selProduct.productName}</h1>
              <h2>{this.props.selProduct.selProduct.price}</h2>
              <p>{this.props.selProduct.description}</p>
              <button type="submit" onClick="thunk for cart add!">Add to Cart</button>
            </div>
          </div>
        ) : (
          <div>
            <h1>Lost? Page Not Found</h1>
          </div>
        )}
      </div>
    ) : (
      <div>Loading State Placeholder</div>
      // <Loading />
    )
  }
}

const mapStateProps = state => {
  return {
    // selProduct: state.products.selProduct,
    // loading: state.products.selLoading,
  }
}

const mapDispatchToProps = dispatch => ({
  // fetchProduct: selProduct => dispatch(fetchProduct(selProduct)),
  // add to cart functionality
})

const ConnectedSingleProduct = connect(
  mapStateProps,
  mapDispatchToProps
)(SingleProduct)

export default ConnectedSingleProduct
