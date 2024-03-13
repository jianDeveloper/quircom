import React from 'react'

import Header from './Header'
import CNav from './CNav'

import '../client/profile.css'

import profile from '../assets/profile.jpg'

function CProfile() {

  return (
    <div className=''>
      <Header />
      <div className='flex'>
      <CNav />
      <main className='flex-inline mx-10 my-10 w-[100%]'>
        <h1 className='font-extrabold text-[30px] text-[#1D5B79]'>Profile</h1> 
        <div className="profileBorder">
          <div className="profileInfo flex flex-row">
            <div className='pictureBorder p-5'>
              <img className="profilePicture" src={profile} alt="Profile Picture" />
            </div>
            <div className='profileName flex flex-col justify-center'> 
              <h4 className='font-extrabold text-[30px] text-[#1D5B79] my-1'>John Doe</h4>
              <p className='text-[15px] text-[black] my-1'>Address</p>
            </div>
            <div className='profileSettings justify-end'>
              <button className='manageProfile'></button>
            </div>
          </div>
          <div className="profileContent">

          </div>
        </div>
      </main>
      </div>
      <div className="flex justify-center h-8 z-[5] bg-[#163646] text-gray-300 font-bolds">
      <h1 className='py-1'>QUIRCOM © 2024 | All Rights Reserved</h1>
    </div>
    </div>
  )
}

export default CProfile