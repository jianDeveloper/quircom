import React from 'react'
import { Link } from 'react-router-dom';

import navLogo from './assets/QRM1.png';


const CNav = () => {
  return (
    <div className='flex'>
      <div class={`w-72 h-screen bg-orange-600`}>
        <image className='h-[30px] bg-white' src={navLogo}/>
      </div>
      <div className='p-7 text-2xl font-semibold'>
        <h1>Client</h1>
      </div>
    </div>
  )
}

export default CNav