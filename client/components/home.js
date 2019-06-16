import React from 'react'
import {Link} from 'react-router-dom'
import Footer from './footer'
import AllProducts from './all-products'

class Home extends React.Component {
  render() {
    return (
      <div id="main">
        <div className="container">
          <img className="hero" src="https://i.imgur.com/PYQYmxj.jpg" />
          <Link to="/products">
            <h1>what dreams are made of</h1>
            <button className="btn" type="button">
              Shop All
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
