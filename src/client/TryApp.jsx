import { useState } from 'react'

import Header from './Header'
import Home from './Home'
import CNav from './CNav'

function TryApp() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <h1> Hello</h1>
      <Header OpenSidebar={OpenSidebar}/>
      <CNav openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
    </div>
  )
}

export default TryApp