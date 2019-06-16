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
            <div id="buttonContainer">
              <button className="btn" type="button">
                Shop All
              </button>
              <div className="overlay">
                <div className="cover">
                  <img
                    id="overlayBtnImg"
                    src="https://i.imgur.com/IKRTjrs.png"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
