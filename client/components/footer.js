import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className="footer_parent">
      <Link to="/about" className="nav_link">
        ABOUT
      </Link>
      <div>
        <h2 className="nav_link">CONTACT US</h2>
        dreaming@graceshopper.com
      </div>
    </div>
  )
}

export default Footer
