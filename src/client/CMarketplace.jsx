import React from 'react'

import Header from './Header'
import CNav from './CNav'
import mpTop from '../assets/topmp.jpg';
function CMarketplace() {
  return (
    <div className='grid-container'>
        <Header />
        <CNav />
        <main className='main-container'>
            <h1 className='font-extrabold text-[30px] text-[#1D5B79]' >BROWSE</h1>
            <div className="w-full h-[300px]" style={{background: `url(${mpTop})`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
                <h1 className=''>Freelancing Services</h1>
                <a href="#">Browsers</a>
            </div>
        </main>
    </div>
    
  )
}

export default CMarketplace