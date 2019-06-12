import React from 'react'
import {Link} from 'react-router-dom'
import AllProducts from './all-products'

class Home extends React.Component {
  render() {
    return (
      <div className="main">
        <Link to="/products">
          <button type="button">All Products</button>
        </Link>
        <div className="body">
          <img className="hero" src="https://i.imgur.com/pxpNYHB.png" />
        </div>
        <div className="footer">
          <h1>This is the footer</h1>
        </div>
      </div>
    )
  }
}

export default Home
