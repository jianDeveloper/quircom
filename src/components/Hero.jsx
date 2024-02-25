import React from 'react'
import Mascot from '../assets/mascot.png'

const Hero = () => {
  return (
   
      <div className="max-w-[1240px] h-screen mx-auto flex flex-col mt-[20px] text-center justify-center">
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold py-3'>Multi-Service</h1>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold py-3'>Provider</h1>
        <p className='md:text-2xl text-xl text-[#1D5B79]'>Quircom is always on the lookout for like-minded visionaries and business es eager to make their mark in the world.</p>
        <hr className='w-[50%] bg-black-600 border-0 rounded'/>
        <div>
          <img src={Mascot} alt="" className='w-[100%] h-[100%] relative z-[5]' />
        </div>
      </div>
  )
  }
export default Hero