import React from 'react'

import NavHeader from './CMainNav'


function CSettings() {

  return (
    <div className=''>
      <NavHeader />
      <div className='flex'>
              <main className='flex-inline mx-10 my-10 w-[100%]'>
        <h1 className='font-extrabold text-[30px] text-[#1D5B79]'>Settings</h1>   
      </main>
      </div>
      <div className="flex justify-center h-[5vh] z-[5] bg-[#163646] text-gray-300 font-bolds">
        <h1 className='py-1'>QUIRCOM © 2024 | All Rights Reserved</h1>
      </div>
    </div>
  )
}

export default CSettings