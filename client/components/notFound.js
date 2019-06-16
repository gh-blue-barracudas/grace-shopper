import React from 'react'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div id="notFoundPage">
      <img src="https://i.imgur.com/KYnQYGz.png" width="700px" height="auto" />
      <Button
        style={{
          opacity: '50%',
          backgroundColor: '#fff2ab',
          marginTop: '20px',
          width: '15vw'
        }}
      >
        <Link to="/products/">SHOP ALL </Link>
      </Button>
    </div>
  )
}

export default NotFound
