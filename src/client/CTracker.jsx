import React from 'react'

import NavHeader from './CMainNav'
import CFooter from './CFooter'

function CTracker() {

  return (
    <div className='h-[100vh]'>
      <NavHeader />
      <div className='flex-inline mx-10 my-10 w-[100%]'>
        <h1 className='font-extrabold text-[30px] text-[#1D5B79]'>Task Tracker</h1>
      </div>
      <CFooter />
    </div>
  )
}

export default CTracker