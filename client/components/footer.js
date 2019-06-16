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
        <a href="mailto: dreaming@graceshopper.com">
          dreaming@graceshopper.com
        </a>
      </div>
    </div>
  )
}

export default Footer
