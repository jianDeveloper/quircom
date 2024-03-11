import React from 'react'

import Header from './Header'
import CNav from './CNav'

function CSettings() {
  return (
    <div className='grid-container'>
        <Header />
        <CNav />
        <main className='main-container'>
            <h1 className='font-extrabold text-[30px] text-[#1D5B79]'>SETTINGS</h1>
        </main>
    </div>
  )
}

export default CSettings