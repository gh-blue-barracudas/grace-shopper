import React from 'react'
import {Link} from 'react-router-dom'
import AllProducts from './all-products'

class Home extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="container">
          <img className="hero" src="https://i.imgur.com/pxpNYHB.png" />
          <Link to="/products">
            <h1>what dreams are made of</h1>
            <button className="btn" type="button">
              Shop All
            </button>
          </Link>
        </div>
        <div className="footer">
          <h1>This is the footer</h1>
        </div>
      </div>
    )
  }
}

export default Home
