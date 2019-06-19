import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class Home extends React.Component {
  render() {
    return (
      <div id="main">
        {this.props.user.id ? (
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
        ) : (
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
        )}
      </div>
    )
  }
}

const mapState = state => ({
  isLoggedIn: !!state.user.id,
  user: state.user
})

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

export default connect(mapState)(Home)
