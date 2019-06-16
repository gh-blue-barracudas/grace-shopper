import React from 'react'

import {Navbar, Footer} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div id="app_main">
      <Navbar />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
