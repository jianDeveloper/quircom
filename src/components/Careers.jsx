import React from 'react'
import Laptop from '../assets/laptop.png'

const Careers = () => {
  return (
    <div className='w-full py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={Laptop} alt="" />
        <div className='flex flex-col justify-center'>
          <p className='text-[#1D5B79] font-bold'>IT and Graphic Designs</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-[#1D5B79]'>Let's work together</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          </p>
          <button className='bg-[#1D5B79] w-[200px] rounded-3xl font-medium my-6 mx-auto md:mx-0 py-3 text-white'>Get Started</button>
        </div>
      </div>
    </div>
  )

}

export default Careers