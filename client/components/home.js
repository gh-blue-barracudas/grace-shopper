import React from 'react'
import {Link} from 'react-router-dom'
import AllProducts from './all-products'

class Home extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="header">
          <h1>This is Home</h1>
        </div>
        <Link to="/products" />
        <button type="button">All Products</button>
        <div className="body">
          <img className="hero" src="https://i.imgur.com/pxpNYHB.png" />
        </div>
        <AllProducts />
        <div className="footer">
          <h1>This is the footer</h1>
        </div>
      </div>
    )
  }
}

export default Home
