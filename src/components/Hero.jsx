import React from 'react'
import Mascot from '../assets/mascot.png'

const Hero = () => {
  return (
   
      <div className="max-w-[1240px] h-screen mx-auto flex flex-col mt-6 text-start justify-normal">
        <div className='flex flex-row'>
          <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold pl-6 pr-3 text-[#1D5B79]'>Multi -</h1>
          <span className='md:text-7xl sm:text-6xl text-4xl font-bold  text-orange-600'>Service</span>
        </div>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold px-6 text-[#1D5B79]'>Provider</h1>
        <p className='max-w-[470px] px-6 mt-10 text-[#1D5B79]'>
          Quircom is always on the lookout for like-minded visionaries and business es eager to make their mark in the world.
        </p>
        <div className='flex-1 w-[150px] h-[50px] p-[2px] m-[20px] text-'>
          <p className='font-bold text-[18px]'>Learn More!</p>
        </div>
        <hr className='w-[50%] bg-black-600 border-0 rounded'/>
      </div>
  )
  }
export default Hero