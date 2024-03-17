import React from 'react'

import Header from './Header'
import CNav from './CNav'

function CMarketplace() {

  return (
    <div className=''>
      <Header />
      <div className='flex'>
      <CNav />
      <main className='flex-inline mx-10 my-10 w-[100%]'>
        <h1 className='font-extrabold text-[30px] text-[#1D5B79]'>Marketplace</h1>   
      </main>
      </div>
      <div className="flex justify-center h-[50vh] z-[5] bg-[#163646] text-gray-300 font-bolds">
      <h1 className='py-1'>QUIRCOM © 2024 | All Rights Reserved</h1>
    </div>
    </div>
  )
}

export default CMarketplace