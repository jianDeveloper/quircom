import React from 'react'

import Header from './Header'
import CNav from './CNav'
import mpTop from '../assets/mpTop.jpg'

function CMarketplace() {

  return (
    <div className=''>
      <Header />
      <div className='flex'>
      <CNav />
      <main className='flex-inline mx-10 my-10 w-[100%]'>
        <h1 className='font-extrabold text-[30px] text-[#1D5B79]' >MARKETPLACE</h1>
        <div className="w-full h-[300px] relative rounded-lg" style={{background: `url(${mpTop})`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
          <div className="absolute bottom-10 left-10 text-white p-2">
            <h1 className='text-xl font-bold mb-5'>Freelancing Services</h1>
            <a href="#" className='bg-orange-600 p-2 rounded-md'>Hire now!</a>
          </div>
        </div>
        <h1 className='mt-10 font-extrabold text-[30px] text-[#1D5B79]'>Top Services</h1>
        <div className='w-full overflow-auto hover:overflow-scroll'>
        
        </div>
      </main>
      </div>
      <div className="flex justify-center h-[5vh] z-[5] bg-[#163646] text-gray-300 font-bolds">
        <h1 className='py-1'>QUIRCOM © 2024 | All Rights Reserved</h1>
      </div>
    </div>
  )
}

export default CMarketplace